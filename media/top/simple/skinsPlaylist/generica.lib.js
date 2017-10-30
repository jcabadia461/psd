(function(namespace){


	function playListTpl(that){
		var _playlistContainer;

		this.setPlayListContainer = function(id){
            _playlistContainer = document.getElementById(id);
            if (_playlistContainer){
                var html = '\
					<div class="mm_playlist_container"></div>\
					<div class="mm_playlist_footer">\
						<div class="mm_playlist_prev">Anterior</div>\
						<div class="mm_playlist_next">Siguiente</div>\
					</div>\
                ';
                _playlistContainer.innerHTML = html;
                //seteamos footer
	   			var prev = _playlistContainer.getElementsByClassName('mm_playlist_prev')[0];
				prev.onclick = function(){
					that.prevOnclick();
				};
				var next = _playlistContainer.getElementsByClassName('mm_playlist_next')[0];
				next.onclick = function(){
					that.nextOnclick();
				};
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
			if((dataItem.description==undefined)||(dataItem.description==null))
				dataItem.description = "";
			var valueduration = that.secondsAsTimeCode((dataItem.length)/1000,"hh:mm:ss");

			var html = '\
				<div class="mm_playlist_cover">\
					<div class="mm_playlist_cuadrado"></div>\
					<div class="mm_playlist_center"></div>\
				</div>\
				<div class="mm_playlist_txt">\
					<div class="mm_playlist_center">\
						<div title="" alt="" class="mm_playlist_title"></div>\
						<div title="" alt="" class="mm_playlist_subtitle"></div>\
					</div>\
				</div>\
				<div class="mm_playlist_duration">\
					<div class="mm_playlist_center" title="'+valueduration+'" alt="'+valueduration+'">'+valueduration+'</div>\
				</div>\
			';
			var item_container = document.createElement("div");
			item_container.setAttribute("class", "mm_playlist_item_container");
			if(dataItem.islive==true)
				item_container.className = item_container.className + " mm_live";
			item_container.innerHTML = html;

			var cover = item_container.getElementsByClassName("mm_playlist_cover")[0];
			if((dataItem.url_thumbnail==null)||(dataItem.url_thumbnail==""))
				cover.style.background = "transparent";
			else{ 
				var imgcover = document.createElement("img");
				imgcover.setAttribute("src",dataItem.url_thumbnail)
				var covercenter = cover.getElementsByClassName("mm_playlist_center")[0];
				covercenter.appendChild(imgcover);
			}
			var title = item_container.getElementsByClassName("mm_playlist_title")[0];
			title.title = dataItem.name;
			title.alt = dataItem.name;
			title.innerHTML = dataItem.name;
			var descripcion = item_container.getElementsByClassName("mm_playlist_subtitle")[0];
			descripcion.title = dataItem.description;
			descripcion.alt = dataItem.description;
			descripcion.innerHTML = dataItem.description;

			item_container.noSelected = function(){
				this.className = this.className.replace(/ mm_playlist_item_selected/g,"");
				this.className = this.className.replace(/ mm_playlist_item_play/g,"");
				this.className = this.className.replace(/ mm_playlist_item_pause/g,"");
			}
			item_container.setSelected = function(){
				this.className += " mm_playlist_item_selected";
			}

			item_container.setIconPlay = function(){
				this.className = this.className.replace(/ mm_playlist_item_play/g,"").replace(/ mm_playlist_item_pause/g,"");
				this.className += " mm_playlist_item_play";
			}

			item_container.setIconPause = function(){
				this.className = this.className.replace(/ mm_playlist_item_play/g,"").replace(/ mm_playlist_item_pause/g,"");
				this.className += " mm_playlist_item_pause";
			}

			this.getItemsContainer().appendChild(item_container);

			return item_container;
		}

		this.doPostCreateTpl = function(){}

	}


	if(typeof namespace.skins == 'undefined'){
		namespace.skins = {};
	}

	namespace.skins.generica = playListTpl;

}(psd));

