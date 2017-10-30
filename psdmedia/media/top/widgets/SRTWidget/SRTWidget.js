(function(namespace) {

    function SRTWidget(mediaTopEmbed) {
        
		var _that = this;
		var _mm = null;
		this.div_id = null;
		this.url_SRT = null;
		this.style = null;
		var _subtitles = [];
		var _cont = null;
		
		var _topembed = mediaTopEmbed;
		var _urlBase = mediaTopEmbed.iniSettings.topPlayer.generic.urlBase;
		
		this.init = function(conf){
			if(typeof(conf)!="undefined"){
				if(typeof(conf.div_id)!="undefined"){
					this.div_id = conf.div_id;
					
					_cont = document.createElement("div");
					_cont.className = "mm_srt";
					_cont.id = "contenedor_srt_" + (Math.random()*1000)||0;
					
					document.getElementById(this.div_id).appendChild(_cont);
				}
				if(typeof(conf.url_SRT)!="undefined"){
					this.url_SRT = conf.url_SRT;
				}else{
					this.url_SRT = "http://fapi-top.prisasd.com/api/v1/search/" + mediaTopEmbed.getSettings()["id_cuenta"] + "/transcription/idref/" + mediaTopEmbed.getSettings()["id_media"];
				}
				if(typeof(conf.style)!="undefined"){
					this.style = conf.style;
				}
			}
				
			loadCSS.apply(this);
			loadSRT.apply(this);
			
			_mm = mediaTopEmbed.getMediaPlayer().getMediaModule();
			_mm.addEventListener(emic.top.event.MediaEvent.ON_PROGRESS,onProgress);
		}
		
		var onProgress = function(ev){
			//console.log(ev);
			var time = ev.data.currentTime*1000;
			//console.log(time);
			
			var found = false;
			
			for(var i in _subtitles){
				if(i<_subtitles.length){
					if((_subtitles[i]['startm']<time)&&(_subtitles[i]['endm']>time)){
						//console.log(_subtitles[i].text);
						_cont.innerHTML = _subtitles[i].text;
						found = true;
					}
				}
			}
			
			if(!found){
				_cont.innerHTML = "";
			}
		}
		
		function isURL(str) {
			var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
			'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
			'((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
			'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
			'(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
			'(\\#[-a-z\\d_]*)?$','i'); // fragment locator
			
			return pattern.test(str);
		}
		
		var loadCSS = function(){
			var css = document.createElement("style");
			css.type = "text/css";
			//css.innerHTML = ".mm_floating{position:fixed;bottom:20px;left:20px;width:300px !important;height:169px !important;}.mm_floating_over_close{color:white;font-size:20px;cursor:pointer;text-shadow:0px 0px 5px black;}#" + _that.div_id + "{transition:all 0.5s;}";
			css.innerHTML = '\
				.mm_srt{ \
					position:absolute; \
					width:calc(100% - 20px); \
					text-align:center; \
					bottom: 15%; \
					font-weight:bold; \
					color:white; \
					text-shadow:0 0 10px black; \
					font-family: Arial; \
					font-size: 18px; \
					overflow:hidden; \
					padding-left:10px; \
					padding-right:10px; \
					pointer-events:none; \
				} \
			';

			if(this.style!=null)
				css.innerHTML += this.style;	
		
			document.body.appendChild(css);
		}
		
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
                        data = JSON.parse(xhr.responseText);
                        successHandler && successHandler(data);
                    } else {
                        errorHandler && errorHandler(status);
                    }
                }
            };
            xhr.send();
        };

		var loadSRT = function(){
			if(isURL(this.url_SRT)){
		        getJSON(this.url_SRT,
					function(data) {
						parseSRT(data);
					}
					,
					function(){
						console.log("Error leyendo datos");
					});
			}else{
				parseSRT(this.url_SRT)
			}
		}
		
		var parseSRT = function(data){

			_data = data;

            //gestión de frases del SRT
            function strip(s) {
                if(typeof(s)!="undefined")
                    return s.replace(/^\s+|\s+$/g,"");
                else
                    return "";
            }

            if(typeof(data['data'][0])=="undefined"){
                var event = new CustomEvent('notranscription',{});
                document.dispatchEvent(event);

                return "";
            }

            var event = new CustomEvent('transcriptionready',{});
            document.dispatchEvent(event);

            var _srt = data['data'][0]["srt"];

            if(_srt==null){
                var event = new CustomEvent('notranscription',{});
                document.dispatchEvent(event);

                return "";
            }

            srt = _srt.replace(/\r\n|\r|\n/g, '\n');
            srt = strip(srt);

            var srt_ = srt.replace('\n\n\n','\n\n').split('\n\n');

            for(jj=0;jj<srt_.length;jj++) {
                var s = jj;

                st = srt_[s].split('\n');

                if(st.length >=2) {
                    n = st[0];
                    i = strip(st[1].split(' --> ')[0]);
                    o = strip(st[1].split(' --> ')[1]);
                    t = st[2];

                    if(st.length > 2) {
                        for(j=3; j<st.length;j++)
                            t += '\n'+st[j];
                    }

                    _subtitles[jj] = {};
                    _subtitles[jj].number = n;
                    _subtitles[jj].start = i;
                    _subtitles[jj].end = o;
                    _subtitles[jj].text = t;

                    //convertimos en millis
                    var mstart0 = i.split(",");
                    var mstart1 = mstart0[0].split(":");
                    var mstartmillis = parseInt(mstart0[1]) + parseInt(mstart1[2])*1000 + parseInt(mstart1[1])*1000*60 + parseInt(mstart1[0])*1000*60*60;
                    var mend0 = o.split(",");
                    var mend1 = mend0[0].split(":");
                    var mendmillis = parseInt(mend0[1]) + parseInt(mend1[2])*1000 + parseInt(mend1[1])*1000*60 + parseInt(mend1[0])*1000*60*60;

                    _subtitles[jj].startm = mstartmillis;
                    _subtitles[jj].endm = mendmillis;
                }
            }

			//console.log(_subtitles);
		}
    }

    namespace.SRTWidget = SRTWidget;

}(window));