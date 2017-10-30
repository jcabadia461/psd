(function(namespace) {

    function MarqueeWidget(mediaTopEmbed) {
        
		var _that = this;
		var _mm = null;
		
		this.div_id = null;
		this.url_marquee = null;
		this.style = null;
		this.reload_seconds = 10000;
		this.speed = 20;
		this.is_RSS = false;
		
		var _cont = null;
		var _marquee = null
		var _last_message = "";
		var _interval_ssdd = null;
		var _interval_move = null;
		var _paused = false;
				
		var _topembed = mediaTopEmbed;
				
		this.init = function(conf){
			if(typeof(conf)!="undefined"){
				if(typeof(conf.div_id)!="undefined"){
					this.div_id = conf.div_id;
					
					_cont = document.createElement("div");
					_cont.className = "mm_marquee_cont";
					_cont.id = "contenedor_marquee_" + (Math.random()*1000)||0;
					
					_marquee = document.createElement("div");
					_marquee.className = "mm_marquee";
					_marquee.id = "marquee_" + (Math.random()*1000)||0;
					
					_cont.appendChild(_marquee);
					
					document.getElementById(this.div_id).appendChild(_cont);
				}
				if(typeof(conf.url_marquee)!="undefined"){
					this.url_marquee = conf.url_marquee;
				}
				if(typeof(conf.style)!="undefined"){
					this.style = conf.style;
				}
				if(typeof(conf.reload_seconds)!="undefined"){
					this.reload_seconds = conf.reload_seconds*1000;
				}
				if(typeof(conf.is_RSS)!="undefined"){
					this.is_RSS = conf.is_RSS;
				}
				if(typeof(conf.speed)!="undefined"){
					this.speed = conf.speed;
				}
			}
				
			loadCSS.apply(this);
			loadSSDD.apply(this);
			
			_interval_ssdd = setInterval(loadSSDD,_that.reload_seconds)
			
			_mm = mediaTopEmbed.getMediaPlayer().getMediaModule();
		}
				
		var loadSSDD = function(){
			if(_that.is_RSS){
				getRSS(_that.url_marquee,
					function(data) {
						parseNews(data);
					}
					,
					function(){
						_cont.style.display = "none";
						console.log("Error leyendo datos");
					});
			}else{
				getJSON(_that.url_marquee,
					function(data) {
						parseNews(data);
					}
					,
					function(){
						_cont.style.display = "none";
						console.log("Error leyendo datos");
					});

			}
		}
		
		var parseNews = function(data){
			if((typeof(data)=="undefined")||(Object.keys(data).length==0)){
				_cont.style.display = "none";
			}else{
				_cont.style.display = "block";
			}
			
			var parsed = "";
			for(var i in data){
				parsed += data[i] + "<span class='mm_marquee_separador'> | </span>";
			}
			
			_marquee.innerHTML = parsed + parsed;
			
			clearInterval(_interval_move);
			_interval_move = setInterval(function(){
				if(!_paused){
					_marquee.style.left = (_marquee.offsetLeft - 1) + "px";
					if(-(parseInt(_marquee.style.left))>_marquee.offsetWidth/2){
						_marquee.style.left = 0;
					}
				}
			},_that.speed);
			
			_marquee.onmouseover = function(){
				_paused = true;
			}
			
			_marquee.onmouseout = function(){
				_paused = false;
			}
		}
				
		var loadCSS = function(){
			var css = document.createElement("style");
			css.type = "text/css";
			//css.innerHTML = ".mm_floating{position:fixed;bottom:20px;left:20px;width:300px !important;height:169px !important;}.mm_floating_over_close{color:white;font-size:20px;cursor:pointer;text-shadow:0px 0px 5px black;}#" + _that.div_id + "{transition:all 0.5s;}";
			css.innerHTML = '\
				.mm_marquee_cont {\
					position:absolute; \
					width:100%; \
					height:25px; \
					text-align:left; \
					top: 0; \
					background:rgba(0,0,0,0.4); \
					padding:10px; \
					z-index:1000; \
				}\
				.mm_marquee{ \
					font-family: Arial; \
					font-size: 15px; \
					white-space:nowrap; \
					overflow:hidden; \
					color:white; \
					position:absolute; \
				    --webkit-animation: marquee 30s linear infinite; \
					--moz-animation: marquee 30s linear infinite; \
					--o-animation: marquee 30s linear infinite; \
					--animation: marquee 30s linear infinite; \
					-webkit-animation-delay: .7s; \
					-moz-animation-delay: .7s; \
					-o-animation-delay: .7s; \
					animation-delay: .7s; \
					display: inline-block; \
				} \
				.mm_marquee:hover{ \
				    -webkit-animation-play-state: paused; \
					-moz-animation-play-state: paused; \
					-o-animation-play-state: paused; \
					animation-play-state: paused; \
				} \
				.mm_marquee_separador{ \
					color:#087490; \
				} \
				.mm_marquee img{ \
					display:inline-block !important; \
				} \
				.mm_marquee a{ \
					color:#ddd; \
				} \
				.mm_marquee a:hover{ \
					color:#fff; \
				} \
				@-webkit-keyframes marquee { \
				  0% { \
					transform: translate(0%, 0%); } \
				  100% { \
					transform: translate(calc(-50% - 10px), 0%); } } \
				@-moz-keyframes marquee { \
				  0% { \
					transform: translate(0%, 0%); } \
				  100% { \
					transform: translate(calc(-50% - 10px), 0%); } } \
				@-o-keyframes marquee { \
				  0% { \
					transform: translate(0%, 0%); } \
				  100% { \
					transform: translate(calc(-50% - 10px), 0%); } } \
				@keyframes marquee { \
				  0% { \
					transform: translate(0%, 0%); } \
				  100% { \
					transform: translate(calc(-50% - 10px), 0%); } } \
				} \
			';

			if(this.style!=null)
				css.innerHTML += this.style;	
		
			document.body.appendChild(css);
		};
		
		var getJSON = function(url, successHandler, errorHandler) {
            var xhr = typeof XMLHttpRequest != 'undefined'
                ? new XMLHttpRequest()
                : new ActiveXObject('Microsoft.XMLHTTP');

            xhr.open('get', url, true);
            xhr.onreadystatechange = function() {
                var status;
                var data;
                // https://xhr.spec.whatwg.org/#dom-xmlhttprequest-readystate
                if (xhr.readyState == 4) { // `DONE`
                    status = xhr.status;
                    if (status == 200) {
						try{
                        data = JSON.parse(xhr.responseText);
						}catch(ex){
							_cont.style.display = "none";
						}
                        successHandler && successHandler(data);
                    } else {
                        errorHandler && errorHandler(status);
                    }
                }
            };
            xhr.send();
        };
		
		var getRSS = function(url, successHandler, errorHandler){
			var xhr = typeof XMLHttpRequest != 'undefined'
                ? new XMLHttpRequest()
                : new ActiveXObject('Microsoft.XMLHTTP');

            xhr.open('get', url, true);
            xhr.onreadystatechange = function() {
                var status;
                var data = [];
                // https://xhr.spec.whatwg.org/#dom-xmlhttprequest-readystate
                if (xhr.readyState == 4) { // `DONE`
                    status = xhr.status;
                    if (status == 200) {
						try{
							var res = xhr.responseXML;
							var items = res.getElementsByTagName("item");
							xmlDOM = new DOMParser();
							for(i in items){
								var title = items[i].getElementsByTagName("title")[0].innerHTML.replace(/\<\!\[CDATA\[/g,"").replace(/\]\]\>/g,"");
								var link = items[i].getElementsByTagName("link")[0].innerHTML.replace(/\<\!\[CDATA\[/g,"").replace(/\]\]\>/g,"");
								
								data.push("<a target='_blank' href='" + link + "'>" + title + "</a>");
							}
						}catch(ex){
							_cont.style.display = "none";
						}
                        successHandler && successHandler(data);
                    } else {
                        errorHandler && errorHandler(status);
                    }
				};
			}
            xhr.send();
		}
	}

    namespace.MarqueeWidget = MarqueeWidget;

}(window));