(function(namespace){


	function playListTpl(that){
		var _playlistContainer;

		this.setPlayListContainer = function(id){
            _playlistContainer = document.getElementById(id);
            if (_playlistContainer){
                var html = '<div class="mm_AudioPlayer_audios mm_playlist_container"></div>';
				
                _playlistContainer.innerHTML = html;
                //seteamos footer
	   			/*var prev = _playlistContainer.getElementsByClassName('mm_playlist_prev')[0];
				prev.onclick = function(){
					that.prevOnclick();
				};
				var next = _playlistContainer.getElementsByClassName('mm_playlist_next')[0];
				next.onclick = function(){
					that.nextOnclick();
				};*/
            }
		}

		this.getPlayListContainer = function(){
			return _playlistContainer;
		}

		this.getItemsContainer = function(){
			var _contenedor = _playlistContainer.getElementsByClassName("mm_playlist_container")[0];
			return _contenedor;
		}


		this.addItem = function(dataItem){
			var html = dataItem.name;
			
			var item_container = document.createElement("div");
			item_container.innerHTML = html;
			
			item_container.className = "mm_AudioPlayer_audio";

			item_container.noSelected = function(){
				this.className = "mm_AudioPlayer_audio";
			}
			item_container.setSelected = function(){
				this.className = "mm_AudioPlayer_audio mm_AudioPlayer_audio--activo";
			}

			item_container.setIconPlay = function(){
				/*var tmp = this.getElementsByClassName('player_btn_play')[0];
				tmp.className = tmp.className.replace(/ fa-play/g,"").replace(/ fa-pause/g,"");
				tmp.className+=" fa-play";*/
			}
			item_container.setIconPause = function(){
				/*var tmp = this.getElementsByClassName('player_btn_play')[0];
				tmp.className = tmp.className.replace(/ fa-play/g,"").replace(/ fa-pause/g,"");
				tmp.className+=" fa-pause";*/
			}

			//elemento anterior y siguiente
			/*if(prevItem != ''){
				prevItem.playListNext = item_container;
				item_container.playListPrev = prevItem;
			}

			this.getItemsContainer().appendChild(item_container);

			prevItem = item_container;
			*/
			
			this.getItemsContainer().appendChild(item_container);

			return item_container;
		}

		this.doPostCreateTpl = function(){}

	}


	if(typeof namespace.skins == 'undefined'){
		namespace.skins = {};
	}

	psd.skins.eppodcast = playListTpl;

}(psd));

