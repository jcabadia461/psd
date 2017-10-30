(function(namespace) {


    function FloatingPlayerWidget(div_id,mediaTopEmbed,conf,style) {
        
		var _that = this;
		var _mm = null;
		this._f = null;
		
		var css = document.createElement("style");
		css.type = "text/css";
		if(style!=null)
			css.innerHTML = style;
		else
			css.innerHTML = ".mm_floating{position:fixed;bottom:20px;left:20px;width:300px;height:169px;}.mm_floating_over_close{color:white;font-size:20px;cursor:pointer;text-shadow:0px 0px 5px black;}#" + div_id + "{transition:all 0.5s;}";
		
		document.body.appendChild(css);
		
		var defaultConf = {
				callback_in:function(){
					divui = document.getElementById("UISkin_" + div_id + "_TopPlayer");
					if(divui)divui.style.display = "block";
				},
				callback_out:function(){
					divui = document.getElementById("UISkin_" + div_id + "_TopPlayer");
					if(divui)divui.style.display = "none";
				},
				onclick:function(){
					_mm.playpause();
				},
				onclose:function(){
					_mm.pause();
					_that._f.activate(false);
				}
			};
			
		if(conf!=null){
			for(i in conf){
				defaultConf[i] = conf[i];				
			}
		}
		
		var script = document.createElement("script");
		script.src = '/psdmedia/resources/js/psd/Floating.js';
		script.onload = function(){
			_that._f = new namespace.Floating(div_id,defaultConf);
		
			_that._f.run(false);
		
			var onStatusChange = function(ev){
				if(ev.data.status=="play")
					_that._f.activate(true);	
			}

			_mm = mediaTopEmbed.getMediaPlayer().getMediaModule();
			_mm.addEventListener(emic.top.event.MediaEvent.ON_STATUS_CHANGE,onStatusChange);
		}
		
		document.head.appendChild(script);
    }

    namespace.FloatingPlayerWidget = FloatingPlayerWidget;

}(window));