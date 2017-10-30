(function(namespace){


	function playListTpl(that){
		var _playlistContainer;
		var _itemsContador = 0;
		var prevItem = '';

		this.setPlayListContainer = function(id){
            _playlistContainer = document.getElementById(id);
            if (_playlistContainer){
                _playlistContainer.innerHTML = "";
				var html='\
					<div class="mm_layerPlaylist list-hidden" style="display: display;">\
					    <div class="mm_box-encabezado">\
					        <div class="mm_box-title">\
					            <div class="mm_col-td mm_col-02">\
					                <p class="mm_titulo-audio">Lista de reproducción</p>\
					                <div class="mm_info-audio">\
					                    <p>Fecha</p>\
					                    <p>Duración</p>\
					                </div>\
					            </div>\
					        </div><!-- box-title -->\
					        <div id="content-7" class="mCustomScrollbar">\
						        <ul class="mm_audioplaylist"></ul>  \
					    	</div>\
						</div>\
					</div>\
					';
				_playlistContainer.innerHTML = html;
            }
		}

		this.getPlayListContainer = function(){
			return _playlistContainer;
		}


		this.getItemsContainer = function(){
			var _contenedor = _playlistContainer.getElementsByClassName('mm_audioplaylist')[0];
			return _contenedor;
		}


		this.addItem = function(dataItem){
			_itemsContador++;
			var html = '\
				<div class="mm_col-td mm_col-01"> \
			        <span class="mm_number">'+_itemsContador+'</span>\
			        <button class="mm_btn-ico">                                       \
			            <span class="player_btn_play fa fa-play"></span>\
			        </button>\
			    </div>\
			    <div class="mm_col-td mm_col-02">\
			        <p class="mm_titulo-audio"><a href="#" title="'+dataItem.name+'">'+dataItem.name+'</a></p>\
			        <div class="mm_info-audio">\
			            <p class="mm_fecha-audio">22/03/2016</p>\
			            <p class="mm_duracion-audio"><span class="mm_separador">-</span>25:20</p>\
			        </div>\
			    </div>  \
			';
			var item_container = document.createElement("li");
			item_container.innerHTML = html;

			var fecha = item_container.getElementsByClassName("mm_fecha-audio")[0];
			fecha.innerHTML = dataItem.created_at.substr(0,10);
			var duration = item_container.getElementsByClassName("mm_duracion-audio")[0];
			duration.innerHTML = that.secondsAsTimeCode((dataItem.length)/1000,"hh:mm:ss");


			item_container.noSelected = function(){
				if(typeof this.playListPrev == 'object')
					this.playListPrev.className = this.playListPrev.className.replace(/fa-playlist-previous/g, '');
				if(typeof this.playListNext == 'object')
					this.playListNext.className = this.playListNext.className.replace(/fa-playlist-next/g, '');
				this.className = "";
				item_container.setIconPlay();
			}
			item_container.setSelected = function(){
				if(typeof this.playListPrev == 'object')
					this.playListPrev.className+= ' fa-playlist-previous';
				if(typeof this.playListNext == 'object')
					this.playListNext.className+= ' fa-playlist-next';
				this.className = "active";
				item_container.setIconPlay();
			}

			item_container.setIconPlay = function(){
				var tmp = this.getElementsByClassName('player_btn_play')[0];
				tmp.className = tmp.className.replace(/ fa-play/g,"").replace(/ fa-pause/g,"");
				tmp.className+=" fa-play";
			}
			item_container.setIconPause = function(){
				var tmp = this.getElementsByClassName('player_btn_play')[0];
				tmp.className = tmp.className.replace(/ fa-play/g,"").replace(/ fa-pause/g,"");
				tmp.className+=" fa-pause";
			}

			//elemento anterior y siguiente
			if(prevItem != ''){
				prevItem.playListNext = item_container;
				item_container.playListPrev = prevItem;
			}

			this.getItemsContainer().appendChild(item_container);

			prevItem = item_container;

			return item_container;
		}

		this.doPostCreateTpl = function(){
			if(typeof jQuery == 'function'){
				$("#content-7").mCustomScrollbar();	
				$(".list-hidden").hide();
			} else {
				console.log('esta PlayList requiere que esté cargado la librería jQuery');
			}
		}
	}


	if(typeof namespace.skins == 'undefined'){
		namespace.skins = {};
	}
	namespace.skins.oneplayer = playListTpl;

}(psd));

