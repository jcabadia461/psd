(function(namespace) {

    function FloatingPlayerWidget(mediaTopEmbed) {
        
		var _that = this;
		var _mm = null;
		this._f = null;
		this.div_id = null;
		var topembed = mediaTopEmbed;
		var _urlBase = mediaTopEmbed.iniSettings.topPlayer.generic.urlBase;
		this.strict = false;
		this.div_check = null;
		
		this.init = function(conf){
			if((typeof(conf)!="undefined")&&(typeof(conf.div_id)!="undefined"))
				this.div_id = conf.div_id;
			else
				this.div_id = topembed.iniSettings["id_container"];
			
			if((typeof(conf)!="undefined")&&(typeof(conf.strict)!="undefined")){
				this.strict = conf.strict;
			}
			if((typeof(conf)!="undefined")&&(typeof(conf.div_check)!="undefined")){
				this.div_check = conf.div_check;
			}else{
				this.div_check = this.div_id + "_base";
			}
			
			function wrap(el, wrapper) {
				el.parentNode.insertBefore(wrapper, el);
				wrapper.appendChild(el);
			}
			
			var css = document.createElement("style");
				css.type = "text/css";
				//css.innerHTML = ".mm_floating{position:fixed;bottom:20px;left:20px;width:300px !important;height:169px !important;}.mm_floating_over_close{color:white;font-size:20px;cursor:pointer;text-shadow:0px 0px 5px black;}#" + _that.div_id + "{transition:all 0.5s;}";
				css.innerHTML = '\
.mm_floating_check{ \
     position: relative; \
} \
.mm_floating_check .commonmm_baseExpand{ \
     position: absolute;width: 100%;height: 100%; \
} \
.mm_floating_check .mm_floating{ \
      -webkit-transform:translateZ(0); \
   transform:translateZ(0); \
   transform: translate3d(0,0,0); -webkit-transform: translateZ(0); \
   -webkit-backface-visibility:hidden; \
   backface-visibility:hidden; \
   -webkit-animation:mm_floating .7s 0s; \
   animation:mm_floating .7s 0s; \
bottom:10px;right:10px;position:fixed;display:block;z-index:1000;width:  \
180px;height: 101px; padding-top: 0!important; \
} \
@media(min-width: 768px){ \
     .mm_floating_check .mm_floating{ \
         width: 300px;height: 169px; \
         bottom:20px;right:20px; \
     } \
} \
@-webkit-keyframes mm_floating { \
	0% { -webkit-transform:translateX(110%);transform:translateX(110%)  } \
} \
@keyframes mm_floating { \
     0% {-webkit-transform:translateX(110%);transform:translateX(110%)} \
} \
.mm_floating_over_close{display: none; width: 26px; height: 26px; position:absolute; left:0; top:0;  z-index: 20; cursor: pointer; } \
.mm_floating_over_close:after{content: "✖"; font-size: 20px; width: 26px; height: 26px; display: block; position: absolute; top: 0; left: 0; vertical-align: middle; text-align: center; line-height: 26px; color: #fff; text-shadow: 1px 1px 0 rgba(0,0,0,.6);} \
.mm_floating_check .mm_floating .playerMRSTN_contenedor_progreso{ \
     display:none!important; \
   } \
.mm_floating_check .mm_floating  .playerMRSTN_controles_derecha{ \
     position:   absolute; \
     right: 0; \
     top: 0; \
   } \
   .mm_floating_check .mm_floating .playerMRSTN_calidad, \
   .mm_floating_check .mm_floating .playerMRSTN_volumen, \
   .mm_floating_check .mm_floating .playerMRSTN_compartir{display: none;} \
   .mm_floating_check .mm_floating .playerMRSTN_fullscreen{display:  \
block!important;} \
@media(min-width: 768px){ \
   /* .mm_floating_check .mm_floating .playerMRSTN_contenedor_progreso{ \
     display:block!important; \
   } */ \
   .mm_floating_check .mm_floating  .playerMRSTN_controles_derecha{ \
     position: static; \
   } \
   .mm_floating_check .mm_floating .playerMRSTN_calidad, \ \
   .mm_floating_check .mm_floating .playerMRSTN_volumen, \
   .mm_floating_check .mm_floating .playerMRSTN_compartir{display:  \
inline-block;} \
} \
.mm_floating_check .mm_floating.mm_floating_fullscreen{ \
   position: static; \
     width: 100%; \
    height: 100%; \
} \
.mm_floating_fullscreen .mm_floating_over_close {display:none!important;} \
.mm_floating .playerMRSTN_compartir, .mm_floating .playerMRSTN_calidad{display:none;} \
.mm_floating .playerMRSTN_progreso_volumen, \
.mm_floating playerMRSTN_mascara_volumen{display:none} \
.mm_floating .playerMRSTN_capa_volumen .playerMRSTN_nivel_volumen{margin: 0 14px 0} \
.mm_floating .playerMRSTN_capa_volumen .playerMRSTN_nivel_volumen, \
.mm_floating  .playerMRSTN_capa_volumen .playerMRSTN_mascara_volumen{ \
    height:0; \
} \
';

			if((typeof(conf)!="undefined")&&(conf.style!=null))
				css.innerHTML += style;	
		
			document.body.appendChild(css);
				
			var defaultConf = {
				callback_max:function(){
					//divui = document.getElementById("UISkin_" + _that.div_id + "_TopPlayer");
					//if(divui)divui.style.display = "block";
					//console.log("vuelve todo a la normalidad");
				},
				callback_min:function(){
					//divui = document.getElementById("UISkin_" + _that.div_id + "_TopPlayer");
					//if(divui)divui.style.display = "none";
					//console.log("guay, pongo estilos en otro");
				},
				onclick:function(){
					//_mm.playpause();
				},
				onclose:function(){
					_mm.pause();
					_that._f.activate(false);
				}
			};
			
			if((typeof(conf)!="undefined")&&(conf.listeners!=null)){
				for(i in conf[listeners]){
					defaultConf[i] = conf[listeners][i];				
				}
			}
			
			var script = document.createElement("script");
			script.src = _urlBase + '/psdmedia/resources/js/psd/Floating.js';
			script.onload = function(){
				_that._f = new namespace.Floating(_that.div_id,defaultConf,_that.div_check,_that.strict);
			
				_that._f.run(false);
				//_that._f.activate(true);
				
				var onStatusChange = function(ev){
					if(ev.data.status=="play"){
						_that._f.activate(true);		
					}
				}
				
				var onAdVideoStart = function(){
					_that._f.activate(true);		
				}
				
				var onFullScreen = function(ev){
					_that._f.fullscreen();
				}

				document.addEventListener('webkitfullscreenchange', onFullScreen);
				document.addEventListener('mozfullscreenchange', onFullScreen);
				document.addEventListener('msfullscreenchange', onFullScreen);
				document.addEventListener('fullscreenchange', onFullScreen);
		
				_mm = mediaTopEmbed.getMediaPlayer().getMediaModule();
				_mm.addEventListener(emic.top.event.MediaEvent.ON_STATUS_CHANGE,onStatusChange);
				_ad = mediaTopEmbed.getMediaPlayer().getAdModule();
				_ad.addEventListener(emic.top.event.AdEvent.ON_AD_VIDEO_START,onAdVideoStart);
			}
			
			document.head.appendChild(script);
		}
    }

    namespace.FloatingPlayerWidget = FloatingPlayerWidget;

}(window));