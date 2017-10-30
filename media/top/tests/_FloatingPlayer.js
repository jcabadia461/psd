(function(namespace) {


    function FloatingPlayer(div_id,mediaTopEmbed) {
        
		var _that = this;
		var _mm = null;
		this._f = null;
		
		var css = document.createElement("style");
		css.type = "text/css";
		css.innerHTML = ".mm_floating{position:fixed !important;bottom:20px !important;left:20px !important;width:300px !important;height:169px !important;}.mm_floating_over_close{color:white;font-size:20px;cursor:pointer;text-shadow:0px 0px 5px black;}#" + div_id + "{transition:all 0.5s;}";
		document.body.appendChild(css);
		
		var script = document.createElement("script");
		script.src = 'http://localhost/psdmedia/media/top/tests/Floating.js';
		script.onload = function(){
			_that._f = new namespace.Floating(div_id,{
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
			});
		
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

    namespace.FloatingPlayer = FloatingPlayer;

}(window));