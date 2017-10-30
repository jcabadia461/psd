/**
 * Created by dmena
 */
(function(namespace){

    "use strict"

    TopSkin_EPpodcast.prototype = new emic.top.ui.UISkinBase();

    function TopSkin_EPpodcast (){

        emic.top.ui.UISkinBase.call(this);

		var _that = this;
        var _container,
            _data;

        var _URL_TEMPLATE = "/psdmedia/media/top/skins/eppodcast/assets/"
			,_URL_STYLE = 	"/psdmedia/media/top/skins/eppodcast/assets/"
            ,_CODE_NUM_PARSER_OK = 0
            ,_CODE_NUM_PARSER_ERROR = 1
            ;

        //elementos
		var _player
            ,_btn_play
            ,_barra_azul
            ,_manejador
            ,_progress
            ,_current_time
            ,_total_time
            ,_cont_volumen
            ,_btn_volumen
            ,_barra_volumen
            ,_percent_volumen
            ,_descarga
            ,_titulo
            ,_desc
            ,_cover
            ;
        
		//flags
		var _isplaying = false
            ,_last_volume = 0
            ,isDragingSeek = false
            ,_current_class_size = "mm_AudioPlayer_pequeno"
            ,_totaltime = 0
            ;

        var _template = "template.html";
        var _style = "podcast.css";

		var _loadCSS = function(){
            var fileref=document.createElement("link"),
				filename = _data.genericData.urlBase ? (_data.genericData.urlBase + _URL_STYLE + _style) : _URL_STYLE + _style;
				
			fileref.setAttribute("rel", "stylesheet");
			fileref.setAttribute("type", "text/css");
			fileref.setAttribute("href", filename);
			
			if (typeof fileref!="undefined")
				document.getElementsByTagName("head")[0].appendChild(fileref);
		};

		var _loadTemplate = function() {
			var _parser = new psd.framework.Parser(),
				templateMediator = new psd.framework.Mediator(),
				url = _data.genericData.urlBase ? (_data.genericData.urlBase + _URL_TEMPLATE + _template) : _URL_TEMPLATE + _template;
			//templateMediator.corsIE(true);

			templateMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_COMPLETE, onDataCompleteEPpodcast, this);
			templateMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_ERROR, onDataError, this);
			templateMediator.mediate(url, _parser, psd.framework.Mediator.RESPONSE_TEXT);
		};

        var onDataError = function (evt)
        {
        }

        var onDataCompleteEPpodcast = function (evt)
        {
            var template;
            if (evt.result.parserResult.code == _CODE_NUM_PARSER_OK)
            {
                template = evt.result.parserResult.result.replace(/{<-%ID%->}/g,_data.genericData.id);
                _container.innerHTML = template;
                _assignElements.apply(this);
                //this.recolocarIE8();
                this.notifyInitComplete();
            }
            else if (evt.result.parserResult.code == _CODE_NUM_PARSER_ERROR)
            {
                //TODO: Error
            }
        };

        var _getElementById = function(id){
            return document.getElementById(_data.genericData.id + id);
		};

		var _assignElements = function(){
			//asignamos los elementos
            _player = _getElementById("_player");
            _btn_play = _getElementById("_btn_play");
            _barra_azul = _getElementById("_barra_azul");
            _manejador = _getElementById("_manejador");
            _progress = _getElementById("_progress");
            _current_time = _getElementById("_current_time");
            _total_time = _getElementById("_total_time");
            _cont_volumen = _getElementById("_cont_volumen");
            _btn_volumen = _getElementById("_btn_volumen");
            _barra_volumen = _getElementById("_barra_volumen");
            _percent_volumen = _getElementById("_percent_volumen");
            _descarga = _getElementById("_descarga");
            _titulo = _getElementById("_titulo");
            _desc = _getElementById("_desc");
            _cover = _getElementById("_cover");

            if(!getDevice().mobile){
                _player.className = _player.className.replace("xxx","xxx mm_AudioPlayer--escritorio");
            }

            _btn_play.onclick = (function(that) {
                return function(){
                    if(_isplaying)
                        that.notifyOrderPause();
                    else
                        that.notifyOrderPlay();
                }
            })(this);

            _progress.onclick = (function(that) {
                return function(e){
                    if(isDragingSeek == true){
                        isDragingSeek = false;

                        if(!getDevice().mobile)
                            return;
                    }
                    isDragingSeek = false;

                    var prop;

                    if (e.offsetX) {
                        prop = e.offsetX/_progress.offsetWidth;
                    } else {
                        prop = e.layerX/_progress.offsetWidth;
                    }
                    that.notifyOrderSeekByProp(prop);
                }
            })(this);

            _barra_volumen.onclick = (function(that) {
                return function(e){
                    var prop;

                    if (e.offsetX) {
                        prop = e.offsetX/_barra_volumen.offsetWidth;
                    } else {
                        prop = e.layerX/_barra_volumen.offsetWidth;
                    }

                    that.notifyOrderVolumeChange(Math.min(Math.max(prop, 0), 100));
                }
            })(this);

            _btn_volumen.onclick = (function(that) {
                return function(e){
                    if((" " + _btn_volumen.className).indexOf("mm_boton_silencio")>0){
                        that.notifyOrderVolumeChange(_last_volume);
                    }else{
                        that.notifyOrderVolumeChange(0);
                    }
                }
            })(this);

            if(!((psd.framework.ua.msie!=null)&&(psd.framework.ua.msie)&&(parseInt(psd.framework.ua.version)<9))) {
                var _startDragSeek = function(){
                    _manejador.style.left = parseInt(_barra_azul.offsetWidth) + "px";
                    isDragingSeek = true;
                    _manejador.style.position = "absolute !important";
                };

                var _dragSeek = function(){
                    _barra_azul.style.width = parseInt(_manejador.style.left) + "px";
                    _manejador.style.position = "absolute";

                    var percent = parseInt(_manejador.offsetLeft)/parseInt(_progress.offsetWidth);

                    var auxtime = Math.min(_totaltime,(Math.max(_totaltime*percent,0)));
                    _current_time.innerHTML = _that.secondsAsTimeCode(auxtime,"hh:mm:ss");

                    return _progress.offsetWidth;
                };

                var _endDragSeek = (function(that) {
                    return function(){
                        _manejador.style.position = "absolute";

                        var percent = parseInt(_manejador.offsetLeft)/parseInt(_progress.offsetWidth);
                        that.notifyOrderSeekByProp(percent);
                    }
                })(this);

                if(getDevice().mobile){
                    var drag_mob = new emic.top.ui.DragContainer(_progress,_manejador,_startDragSeek,_dragSeek,_endDragSeek,0,_progress.offsetWidth);

                    drag_mob.registrarDrag();
                }else{
                    var drag = new emic.top.ui.Drag(_manejador,_progress,_startDragSeek, _dragSeek, _endDragSeek);
                    drag.registrarDragFromParent();

                    //var dragVol = new emic.top.ui.Drag(_dot_vol,_vol_back,_startDragVol, _dragVol, _endDragVol);
                    //dragVol.registrarDragFromParent();
                }
            }

            if (!getDevice().mobile && typeof(psd.framework.ua.firefox) != 'undefined') {
                _descarga.target = '_blank';
            }

            setSkin.apply(this);
            _that.calculateClassSize();
        };

		var setSkin = function()
		{
            if(_total_time)_total_time.innerHTML = this.secondsAsTimeCode(Math.ceil(_data.mediaData.duration/1000),"hh:mm:ss");
            _descarga.href = _data.mediaData.url;

            _titulo.innerHTML = _data.mediaData.title;
            _desc.innerHTML = _data.mediaData.description;
            _cover.src = _data.uiData.poster;

            if((_data.uiData.poster=="")||(_data.uiData.poster==null)||(typeof(_data.uiData.poster)=="undefined")){
                _cover.style.display = "none";
            }else{
                _cover.style.display = "block";
            }
        };

        this.init = function(data) {
            _data = data;
            _container = document.getElementById(_data.internalData.skinContainer);

            _loadTemplate.apply(this);
			_loadCSS.apply(this);
		};

        this.reset_skin = function(){
        }

		this.reset = function () {
            _isplaying = false;
            _btn_play.className = _btn_play.className.replace(/mm_boton_pausa/g,"mm_boton_play");
            _current_time.innerHTML = "0:00:00";
            _barra_azul.style.width = 0;
            _manejador.style.left = 0;
        };

		this.secondsAsTimeCode = function(time, format)
		{
			var hours = Math.floor(time/3600),
				minutes = Math.floor((time - (hours*3600))/60),
				seconds = Math.floor(time - (hours*3600) - (minutes*60)),
				timecode = "";

			//if(hours<10) {hours = hours;}
			if(minutes<10) {minutes = "0" + minutes;}
			if(seconds<10) {seconds = "0" + seconds;}

			if(format==null) {timecode = hours + ":" + minutes + ":" + seconds;}
			else
			{
				timecode = format.replace('hh', hours);
				timecode = timecode.replace('mm', minutes);
				timecode = timecode.replace('ss', seconds);
			}

			return timecode;
		}

		this.resize = function(width, height){};

		this.onProgress = function(data){
            var percent = (data.currentTime *100/data.totalTime);

            _totaltime = data.totalTime;

            if(!isDragingSeek){
                _barra_azul.style.width = percent + "%";
                _manejador.style.left = percent + "%";
            }

            _total_time.innerHTML = this.secondsAsTimeCode(data.totalTime,"hh:mm:ss");
            _current_time.innerHTML = this.secondsAsTimeCode(data.currentTime,"hh:mm:ss");
        };

		this.onVolumeChange = function(offset){
			var percent = offset*100;

            if(offset!=0){
                _last_volume = offset;
                _btn_volumen.className = _btn_volumen.className.replace(/mm_boton_silencio/g,"mm_boton_sonido");
            }else{
                _btn_volumen.className = _btn_volumen.className.replace(/mm_boton_sonido/g,"mm_boton_silencio");
            }

            _percent_volumen.style.width = percent + "%";

            _percent_volumen.setAttribute("aria-valuenow",percent);
            _percent_volumen.setAttribute("aria-valuetext",percent + "% volumen");

            if(offset==0){
            }else{
            }
        };

		this.onBufferEmpty = function(){
		};

		this.onBufferFull = function(){
		};

		this.showLoading = function (flag) {
			_showLoading.apply(this, [flag]);
		};

		var _showLoading = function(flag){
		};

		this.externalOrder = function(order, params){
		};

		var _enableButtons = function(value){
		};

        var _show_playing = function(){
        }

		this.onStatusChange = function(status){
            switch (status){
                case emic.top.MediaModule.STATUS_STOP:
                case emic.top.MediaModule.STATUS_PAUSE:
                case emic.top.AdModule.STATUS_PAUSE:
                     _isplaying = false;
                    _btn_play.className = _btn_play.className.replace(/mm_boton_pausa/g,"mm_boton_play");
                    break;
                case emic.top.MediaModule.STATUS_PLAY:
                    _isplaying = true;
                    _btn_play.className = _btn_play.className.replace(/mm_boton_play/g,"mm_boton_pausa");
                    break;
                case emic.top.AdModule.STATUS_PLAY:
                break;
                case emic.top.event.MediaEvent.ON_MEDIA_END:
                break;
                case emic.top.AdModule.STATUS_STOP:
                case emic.top.AdModule.PUBLI_SKIPPED:
                break;
            }
        };
		
        this.onPositionChange = function(position) {
			switch(position) {
				case emic.top.TopPlayer.POSITION_PREVIEW:
				break;
				case emic.top.TopPlayer.POSITION_AD_PREROLL:
				break;
				case emic.top.TopPlayer.POSITION_AD_POSTROLL:
				break;
			}
		};

		this.onMetadata = function(metadata){};
		this.onCue = function(data){};
		this.onError = function(msg, code){};
		this.onSwitchRequest = function(id){};
		this.onSwitchComplete = function(id){};
		this.requestFullScreen = function(){};
		this.cancelFullScreen = function(){};
		this.onSeekStart = function(offset){};
		this.onSeekComplete = function(offset){};

        this.calculateClassSize = function(){
            if(_player.offsetWidth<480){
                _player.className = _player.className.replace(new RegExp(_current_class_size,"g"),"mm_AudioPlayer_pequeno")
                _current_class_size = "mm_AudioPlayer_pequeno";
            }else{
                if(_player.offsetWidth<640){
                    _player.className = _player.className.replace(new RegExp(_current_class_size,"g"),"mm_AudioPlayer_mediano")
                    _current_class_size = "mm_AudioPlayer_mediano";
                }else{
                    _player.className = _player.className.replace(new RegExp(_current_class_size,"g"),"mm_AudioPlayer_grande")
                    _current_class_size = "mm_AudioPlayer_grande";
                }
            }
        }

        var pre_resize = window.onresize;

        if(typeof (pre_resize)=="function"){
            window.onresize = function(){
                pre_resize();
                _that.calculateClassSize();
            }
        }else{
            window.onresize = function(){
                _that.calculateClassSize();
            }
        }
	}

    namespace.TopSkin_EPpodcast = TopSkin_EPpodcast;

})(emic.top.ui);