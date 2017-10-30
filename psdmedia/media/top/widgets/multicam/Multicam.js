Multicam = function(confs,posters,autoplay){

	var idplayers = [];
	var items = [];

	for(i in confs){
		items[i] = confs[i];
		var divPlayer = document.createElement("div");
		divPlayer.id = "player_" + items[i].id_container;
		divPlayer.style.width = "100%";
		divPlayer.style.height = "100%";
		document.getElementById(items[i].id_container).appendChild(divPlayer);
        items[i].id = items[i].id_container;
		items[i].id_container = "player_" + items[i].id_container;
	
		idplayers[i] = items[i].id_container;
	}

	currentVolume = 1;
	currentIndex = 0;
	
	this.run = function() {
		
		var mediaTopEmbed = new psd.media.TopEmbed(items[currentIndex]);

		on_loaded = function(size){

			if(currentIndex==size){
				con = new Conmutador(items);
				return;
			}

			var mediaTopEmbed = new psd.media.TopEmbed(items[currentIndex]);

			document.getElementById(idplayers[currentIndex]).tag = mediaTopEmbed;		

			mediaTopEmbed.addEventListener(psd.media.TopEmbedEvent.EVENT_INI,function(){on_loaded(items.length)});

            currentIndex++;
		}

		mediaTopEmbed.addEventListener(psd.media.TopEmbedEvent.EVENT_INI,function(){on_loaded(items.length);});

		document.getElementById(idplayers[0]).tag = mediaTopEmbed;
	};

	var Conmutador = function(it){

		var items = [];
		document.volumeLevel = 1; 

		for(i in it){
			items[i] = document.getElementById(it[i].id_container);
		}

		selected = items[0];

		for(i in items){

				var layer = document.createElement("div");
				layer.style.zIndex = 1000;
				layer.style.width = "100%";
				layer.style.height = "100%";
				layer.style.position = "absolute";
				layer.style.left = 0;
				layer.style.top = 0;
				layer.id = "conmuta_" + i;

				if(i==0){
					layer.style.pointerEvents = "none";
				}else{
					document.getElementById("UIModule_" + items[i].id + "_TopPlayer").style.display = "none";
					document.getElementById(idplayers[i]).tag.getMediaPlayer().getMediaModule().setVolume(0);
					
					if ((getDevice().mobile == true) ||((getDevice().mobile == false)&&(confs[i].topPlayer!=undefined)&&(confs[i].topPlayer.media!=undefined)&&(confs[i].topPlayer.media.autoplay!=undefined)&&(confs[i].topPlayer.media.autoplay!=true)))
					{
						var _poster = null;
						if(posters.length = 1)
							_poster = posters[0];
						else{
							if(posters[i-1]!=undefined)
								_poster = posters[i-1]; 
						}
						
						layer.style.background = "url(" + _poster + ")";
						layer.style.backgroundSize = "cover";
					}
				}

				changeVol = function(ev){
					currentVolume = ev.data;
				}

				document.getElementById(idplayers[i]).tag.getMediaPlayer().getUIModule().addEventListener(emic.top.event.UIEvent.ON_ORDER_VOLUME_CHANGE,changeVol);
				items[i].tag = [i,items[i].id,items[i].tag];
				function run(cual) {
					return function(){

						if(selected==items[cual])
							return;

						layer.parent = items[cual];
						
						var uno = selected;
						var dos = layer.parent;

						var auxstyle = {};

						for(j in uno.style){
							auxstyle[j] = uno.parentNode.style[j];
						}

						for(j in dos.style){
							uno.parentNode.style[j] = dos.parentNode.style[j];
						}
						uno.parentNode.style.zIndex = 100;

						document.getElementById("conmuta_" + uno.tag[0]).style.pointerEvents = "visible";
						document.getElementById("UIModule_" + uno.tag[1] + "_TopPlayer").style.display = "none";
						if(/iPad/.test(navigator.userAgent)){
	                        uno.tag[2].getMediaPlayer().getMediaModule().stop();
						}

						uno.tag[2].getMediaPlayer().getMediaModule().setVolume(0);

						//document.getElementById(idplayers[cual]).tag[2].getMediaPlayer().getMediaModule().setVolume(0);
	
						for(j in auxstyle){
							dos.parentNode.style[j] = auxstyle[j];
						}
						dos.style.zIndex = 10;
						document.getElementById("conmuta_" + dos.tag[0]).style.pointerEvents = "none";
						document.getElementById("conmuta_" + dos.tag[0]).style.background = "none";

						document.getElementById("UIModule_" + dos.tag[1] + "_TopPlayer").style.display = "block";
						document.getElementById(dos.tag[1]).tag[2].getMediaPlayer().getMediaModule().setVolume(currentVolume);

						selected = layer.parent;						
					}
				}
				layer.onclick = run(i);

				items[i].style.zIndex = 100;
				items[i].appendChild(layer);
		}
	};
};
