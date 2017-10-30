/**
 * Created by igomez on 28/09/2014.
 */
(function(namespace){

    TopSkin_playser_det.prototype = new emic.top.ui.UISkinBase();

    function TopSkin_playser_det (){
        emic.top.ui.UISkinBase.call(this);

        var TEXTO_PUBLI = "Contenido Publicitario";

        //elements
        var _playButton,
            _pauseButton,
            _playLoading,
            _pauseLoading,
            _internalPlayer,
            _boton_llevatelo,
            _boton_compartir,
            _bumetroContainer,
            _imagen,
            _contenedorMini;

        var _overable = false;

        var _hashtag,
            _tipoNoticia,
            _titulo,
            _pie;

        var _typeSkin;
        var soypubli = false;

        var _bumetro = null;

        var _container,
            _data,
            _status,
            _conectar,
            _conectar_fb,
            _conectar_tw,
            _conectar_goo,
            _conectar_cerrar;

        var abiertas_rrss = false;

        var _volButton,
            _volPanel,
            _volBall,
            _volBack,
            _volBack2,
            _current_time;

        var moviendoVolumen = false;
        var _that = this;

        var _minSize = 520;

        /////////////////////////////////////////////////////////
        //  CONSTANTES
        /////////////////////////////////////////////////////////


        var _URL_TEMPLATE_BIG = "/psdmedia/media/top/skins/playser_det/assets/template_big.html",
            _URL_TEMPLATE_SMALL = "/psdmedia/media/top/skins/playser_det/assets/template_small.html",
            _URL_STYLE = "/psdmedia/media/top/skins/playser_det/assets/estilos.css",
            _CODE_NUM_PARSER_OK = 0,
            _CODE_NUM_PARSER_ERROR = 1,
            _TYPE_SKIN_BIG = "big",
            _TYPE_SKIN_SMALL = "small";


        //TODO: Responsivo, eliminar elementos si no caben, etc

        /////////////////////////////////////////////////////////
        //  INICIALIZACION
        /////////////////////////////////////////////////////////

        var _loadCSS = function(){


            var fileref=document.createElement("link"),
                filename = _data.genericData.urlBase ? (_data.genericData.urlBase + _URL_STYLE) : _URL_STYLE;

            //dmena quitar
            //filename = _URL_STYLE;

            fileref.setAttribute("rel", "stylesheet");
            fileref.setAttribute("type", "text/css");
            fileref.setAttribute("href", filename);
            if (typeof fileref!="undefined")
                document.getElementsByTagName("head")[0].appendChild(fileref)
        };

        var _loadTemplate = function() {

            var _parser = new psd.framework.Parser(),
                templateMediator = new psd.framework.Mediator(),
                url;

            if ((_data.uiData.skinData.type != _TYPE_SKIN_BIG) && (_data.uiData.skinData.type != _TYPE_SKIN_SMALL)){
                //default
                _typeSkin = _TYPE_SKIN_BIG;
            }else{
                _typeSkin = _data.uiData.skinData.type;
            }

            switch (_typeSkin){
                case _TYPE_SKIN_SMALL:
                    url = _data.genericData.urlBase ? (_data.genericData.urlBase + _URL_TEMPLATE_SMALL) : _URL_TEMPLATE_SMALL;
                break;

                case _TYPE_SKIN_BIG:
                    url = _data.genericData.urlBase ? (_data.genericData.urlBase + _URL_TEMPLATE_BIG) : _URL_TEMPLATE_BIG;
                break;
            }

            //console.log("dmenaquitar");
            templateMediator.corsIE(true);

            templateMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_COMPLETE, onDataComplete, this);
            templateMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_ERROR, onDataError, this);
            templateMediator.mediate(url, _parser, psd.framework.Mediator.RESPONSE_TEXT);
        };


        //EVENTOS MEDIATOR
        var onDataComplete = function (evt)
        {
            var template;
            if (evt.result.parserResult.code == _CODE_NUM_PARSER_OK)
            {
                template = evt.result.parserResult.result.replace(/{<-%ID%->}/g,_data.genericData.id);
                //template = evt.result.parserResult.result;
                _container.innerHTML = template;

                _asignElements.apply(this);
                _createPlayer.apply(this);
                this.recolocarIE8();
                //Es el player interno el que lanza el notifyInitComplete, pasa por el redispatch (por si no lo encuentras)

                //console.log("width ",_container.offsetWidth);

                if((_container.offsetWidth<_minSize)&&(_data.uiData.skinData.type == _TYPE_SKIN_BIG)){
                      _imagen.style.width = "0";
                    _contenedorMini.style.width = "calc(100% - 2px)";
                }
            }
            else if (evt.result.parserResult.code == _CODE_NUM_PARSER_ERROR)
            {
                //TODO: Error
            }

            if(_bumetroContainer){
                _bumetroContainer.onclick = (function(that){
                    return function(e){

                        if((psd.framework.ua.msie!=null)&&(psd.framework.ua.msie)&&(parseInt(psd.framework.ua.version)<9)){return false;}

                        if(_data.internalData.position!=emic.top.TopPlayer.POSITION_MEDIA){
                            return;
                        }

                        if((!_data.mediaData.isLive)&&(!soypubli)){
                            var x, y, parentPosition;

                            parentPosition = that.getPosition(e.currentTarget);
                            x = e.clientX - parentPosition.x;
                            y = e.clientY - parentPosition.y;

                            var prop = x / _bumetroContainer.offsetWidth;
                            that.notifyOrderSeekByProp(prop);

                            _bumetro.setProgress(prop * 100);

                            _bumetro.paint(true);
                        }
                    }})(this);

                if(!((psd.framework.ua.msie!=null)&&(psd.framework.ua.msie)&&(parseInt(psd.framework.ua.version)<9))){

                    _bumetro = new emic.top.ui.Bumetro();
                    _bumetro.init("bumetro"+_data.genericData.id,{"color1":"#aaa","color2":"#eee","colorover":"#feeaab","colorloaded":"#ccc","background":"#fff","lineWidth":3,"lineSeparation":2,"bottom":3});

                    _bumetro.setProfile(_bumetro.PROFILE_REAL);
                }

                _contenedorMini.onmousemove = (function(that){
                    return function(e){
                        if((psd.framework.ua.msie!=null)&&(psd.framework.ua.msie)&&(parseInt(psd.framework.ua.version)<9)){return false;}

                        if(_data.internalData.position!=emic.top.TopPlayer.POSITION_MEDIA){
                            return;
                        }

                        if((!_data.mediaData.isLive)&&(!soypubli)){
                            var x, y, parentPosition;

                            parentPosition = that.getPosition(e.currentTarget);
                            x = e.clientX - parentPosition.x;
                            y = e.clientY - parentPosition.y;

                            var prop = x / _bumetroContainer.offsetWidth;

                            if(_bumetro){
                                _bumetro.setProgressOver(prop * 100,-100);
                                if(_overable)
                                    _bumetro.paint(true);
                            }
                        }
                    }})(this);

                _contenedorMini.onmouseout = (function(that){
                    return function(e){

                        if(_bumetro)
                            _bumetro.setProgressOver(0);

                        if(_overable)
                            _bumetro.paint(true);
                    }
                })(this);
            }
        };

        var onDataError = function (evt)
        {
            //TODO: Error
        };

        var _getElementById = function(id){
            return document.getElementById(id+_data.genericData.id);
        };

        var _notifyOrderVolumeChange = (function(that){
            return function(vol){
                that.notifyOrderVolumeChange(vol)
            }
        })(this);

        var _asignElements = function(){

            _hashtag = _getElementById("playerDetalleHashtag");
            _tipoNoticia = _getElementById("playerDetalleTipo");
            _titulo = _getElementById("playerDetalleTitulo");
            _pie = _getElementById("playerDetallePie");
            //_boton_llevatelo = document.getElementById("playerDetalleConectar");
            //_boton_compartir = document.getElementById("playerDetalleCompartir");
            _imagen = _getElementById("imagen_det");
            _contenedorMini = _getElementById("contenedorMini");

            _bumetroContainer = _getElementById("bumetro");

            if(_data.uiData.skinData.type == _TYPE_SKIN_BIG){
                _volButton = _getElementById("PlayerVolume");
                _volBall = _getElementById("playerVolumenMarca");
                _volBack = _getElementById("divPlayerVolumenMarca");
                _volBack2 = _getElementById("divPlayerVolumenMarca2");
                _volPanel = _getElementById("PlayerVolumePanel");
                _current_time = _getElementById("currentTime");

                //_data.mediaData.duration = 234000;

                _current_time.innerHTML = "00:00";

                if(_data.mediaData.duration){
                    if((_data.mediaData.duration!="")&&(_data.mediaData.duration!=null)&&(_data.mediaData.duration>0)){
                        _data.mediaData.duration = _data.mediaData.duration/1000;
                        _current_time.innerHTML = "00:00 - " +  this.secondsAsTimeCode(_data.mediaData.duration,"hh:mm:ss");
                    }
                }
                /*
                if(_data.mediaData.isLive){
                    console.log("islive");
                    _current_time.innerHTML = "DIRECTO";
                }else
                    console.log("nooooo es live");
                */

                _volButton.onmouseover = (function(that){return function(){
                    that.show(_volPanel);
                    _volPanel.style.display = "block";
                    _volPanel.style.left = "auto";
                }})(this);

                _volBall.onclick = function(event){
                    if((psd.framework.ua.msie!=null)&&(psd.framework.ua.msie)&&(parseInt(psd.framework.ua.version)<9)){}
                    else
                        event.preventDefault();
                };

                _volBack.onmouseover = (function(that){return function(){
                    that.show(_volPanel);
                    _volPanel.style.display = "block";
                }})(this);
                _volPanel.onmouseover = (function(that){return function(){
                    that.show(_volPanel);
                    _volPanel.style.display = "block";
                }})(this);
                _volPanel.onmouseout = (function(that){return function(){
                    if(!moviendoVolumen)
                        _volPanel.style.display = "none";
                }})(this);

                _volBack2.onclick = (function(that, __currentTarget){
                    return function(e){

                        var ct = ((psd.framework.ua.msie!=null)&&(psd.framework.ua.msie)&&(parseInt(psd.framework.ua.version)<9))? __currentTarget: e.currentTarget;
                        var evento = e || window.event;

                        parentPosition = that.getPosition(ct);
                        x = evento.clientX - parentPosition.x;
                        y = evento.clientY - parentPosition.y;

                        var vvol = x/48;
                        if(vvol>1)
                            vvol = 1;
                        if(vvol<0)
                            vvol = 0;

                        that.notifyOrderVolumeChange(vvol);

                    }})(this, _volBack2);

                $('#playerVolumenMarca' + _data.genericData.id).each(
                    function() {
                        var objLimites = $(this).parent().children(
                            '.divPlayerVolumenMarcaHorizontal');
                        $(this).draggable(
                            {
                                axis : 'x',
                                containment : objLimites,
                                start : function(event, ui) {
                                    moviendoVolumen = true;
                                },
                                stop : function(event, ui) {
                                    moviendoVolumen = false;

                                    var vol = ((parseInt($(this).css("left"))-27)/38);

                                    if(vol>1)
                                        vol=1;
                                    if(vol<0)
                                        vol = 0;

                                    _notifyOrderVolumeChange(vol);
                                },
                                drag : function(event, ui) {
                                    var vol = ((parseInt($(this).css("left"))-27)/38);

                                    if(vol>1)
                                        vol=1;
                                    if(vol<0)
                                        vol = 0;

                                    _notifyOrderVolumeChange(vol);
                                }
                            });
                    });
            }

            if(((psd.framework.ua.msie!=null)&&(psd.framework.ua.msie)&&(parseInt(psd.framework.ua.version)<9))||(window.dmena)){
                _bumetroContainer = null;

                var _skininner = _getElementById("playerDetallePlayer");
                _skininner.style.display = "block";

                if(_data.uiData.skinData.type == _TYPE_SKIN_BIG){
                    //_skininner.style.width = "";
                }
            }else{
                var botones_SMALL = _getElementById("botones_SMALL_");
                if (botones_SMALL)
                    botones_SMALL.style.display = "block";
            }

            if(_data.uiData.poster!=""){
                if(_typeSkin==_TYPE_SKIN_BIG)
                    _imagen.style.backgroundImage = "url(" + _data.uiData.poster + ")";
            }

            _conectar = _getElementById("conectar_div_playser_det");
            _conectar_fb = _getElementById("conectar_fb");
            _conectar_tw = _getElementById("conectar_tw");
            _conectar_goo = _getElementById("conectar_goo");
            //_conectar_cerrar = _getElementById("conectar_cerrar");

            _conectar_fb.onclick = (function(that){return function(){that.notifyOrderShareFacebook();}})(this);
            _conectar_tw.onclick = (function(that){return function(){that.notifyOrderShareTwitter();}})(this);
            _conectar_goo.onclick = (function(that){return function(){that.notifyOrderShareGoogleplus();}})(this);
            //_conectar_cerrar.onclick = (function(that){return function(){_conectar_menu.style.display = "none";}})(this);

            _conectar.onclick = (function(that){return function(){

                if(abiertas_rrss){
                    abiertas_rrss = false;
                    _conectar.style.width = "24px"
                    _conectar.style.marginLeft = "0px";
                }else{
                    abiertas_rrss = true;
                    _conectar.style.width = "100px"
                    _conectar.style.marginLeft = "-73px";
                }
                //_conectar_menu.style.display = "inline-block";
            }})(this);

            _fillDataFields.apply(this);

            if (_typeSkin == _TYPE_SKIN_BIG){
                _playButton = _getElementById("playerDetallePlay");
                _pauseButton = _getElementById("playerDetallePause");
                _playLoading = _getElementById("playerDetallePlayCargando");
                _pauseLoading = _getElementById("playerDetallePauseCargando");

                _playButton.onclick = (function(that){return function(){ that.notifyOrderPlay();}})(this);
                _pauseButton.onclick = (function(that){return function(){that.notifyOrderPause();}})(this);
                _playLoading.onclick = (function(that){return function(){that.notifyOrderPlay();}})(this);
                _pauseLoading.onclick = (function(that){return function(){that.notifyOrderPause();}})(this);

                this.hide(_pauseButton);
            }

            //_boton_llevatelo.onclick = (function(that){return function(){that.notifyOrderEmbedExternal()}})(this);
            //_boton_compartir.onclick = (function(that){return function(){that.notifyOrderShareExternal()}})(this);

            if (_data.uiData.skinData.hideSocial){
                this.hide(_conectar);
            }
        };

        var _fillDataFields = function(){

            switch (_data.internalData.position){
                case emic.top.TopPlayer.POSITION_AD_PREROLL:
                case emic.top.TopPlayer.POSITION_AD_POSTROLL:
                    _titulo.innerHTML = TEXTO_PUBLI;
                    break;
                default:
                    _titulo.innerHTML = (_data.mediaData.title != undefined)? _data.mediaData.title:"";
                    break;
            }

            _tipoNoticia.innerHTML = (_data.uiData.skinData.tipoNoticia != undefined)? _data.uiData.skinData.tipoNoticia:"";
            _hashtag.innerHTML = (_data.uiData.skinData.hashtag != undefined)? _data.uiData.skinData.hashtag:"";

            _pie.innerHTML = "";
            if((_data.mediaData.author!=undefined)&&(_data.mediaData.author!=""))
                _pie.innerHTML += " " + _data.mediaData.author;

            if((_data.mediaData.date!=undefined)&&(_data.mediaData.date!="")){
                if(_pie.innerHTML!=""){
                    _pie.innerHTML += " | ";
                }
                _pie.innerHTML += _data.mediaData.date;
            }

            //_pie.innerHTML = (_data.uiData.skinData.pie != undefined)? _data.uiData.skinData.pie:"";
        };

        var _createPlayer = function(){

            var playerData = new emic.top.DataModel(),
                config;


            config = {};
            config.ui = {
                skin: emic.top.UIModule.SKIN_PLAYSER_PEP,
                overrideNativeControls: true,
                showPreview: false,
                skinData: {
                    hideSocial: "true"
                }
            };


            switch (_typeSkin){
                case _TYPE_SKIN_SMALL:
                    config.ui.skinData.hidePlaypause = false;
                break;
                case _TYPE_SKIN_BIG:
                    config.ui.skinData.hidePlaypause = true;
                break;
            }

            config.generic = {};
            config.generic.urlBase = _data.genericData.urlBase;
            config.generic.id = _data.genericData.id+"_son";

            config.media = _data.mediaData;
            playerData.config(config);
            playerData.internalData.skinContainer = "playerDetallePlayer" +_data.genericData.id;

            _internalPlayer = _data.internalData.UIFactory.getSkin(emic.top.UIModule.SKIN_PLAYSER_PEP);
            _internalPlayer.addEventListener(emic.top.event.UIEvent.ON_INIT_COMPLETE, _skinHandler, this);
            _internalPlayer.addEventListener(emic.top.event.UIEvent.ON_ORDER_BEGIN, _skinHandler, this);
            _internalPlayer.addEventListener(emic.top.event.UIEvent.ON_ORDER_PLAY, _skinHandler, this);
            _internalPlayer.addEventListener(emic.top.event.UIEvent.ON_ORDER_PAUSE, _skinHandler, this);
            _internalPlayer.addEventListener(emic.top.event.UIEvent.ON_ORDER_PLAYPAUSE, _skinHandler, this);
            _internalPlayer.addEventListener(emic.top.event.UIEvent.ON_ORDER_STOP, _skinHandler, this);
            _internalPlayer.addEventListener(emic.top.event.UIEvent.ON_ORDER_VOLUME_CHANGE, _skinHandler, this);
            _internalPlayer.addEventListener(emic.top.event.UIEvent.ON_ORDER_MUTE, _skinHandler, this);
            _internalPlayer.addEventListener(emic.top.event.UIEvent.ON_ORDER_FULLSCREEN, _skinHandler, this);
            _internalPlayer.addEventListener(emic.top.event.UIEvent.ON_ORDER_SEEK_BY_PROP, _skinHandler, this);
            _internalPlayer.addEventListener(emic.top.event.UIEvent.ON_ORDER_SEEK_BY_SECS, _skinHandler, this);
            _internalPlayer.init(playerData);

        };

        this.onPositionChange = function(position){

            _internalPlayer.onPositionChange(position);
        };

        var _skinHandler = function(ev){
            this.dispatchEvent(ev);
        };

        var _onLoading = function(flag){
            if (flag){

                if (_status == emic.top.MediaModule.STATUS_PLAY)
                    this.show(_pauseLoading);
                else
                    this.show(_playLoading);
            }else{
                this.hide(_pauseLoading);
                this.hide(_playLoading);
            }
        };

        this.init = function(data) {
            _data = data;
            _container = document.getElementById(_data.internalData.skinContainer);

            _loadCSS.apply(this);
            _loadTemplate.apply(this);
        };
        this.reset = function () {
            if (_pauseButton) this.hide(_pauseButton);
            if (_playButton) this.show(_playButton);
            _fillDataFields.apply(this);

            if(_data.uiData.poster!=""){
               // if(_typeSkin==_TYPE_SKIN_BIG)
                    _imagen.style.backgroundImage = "url(" + _data.uiData.poster + ")";
            }

            if (_internalPlayer)_internalPlayer.reset();

            if(_bumetroContainer){
                _bumetro.setProgress(0);
                if(!((psd.framework.ua.msie!=null)&&(psd.framework.ua.msie)&&(parseInt(psd.framework.ua.version)<9)))_bumetro.pause();
            }

            //embedmode
            var _embedmode = _data.uiData.skinData.embedMode;

            if(_embedmode){
                //_imagen.src = "http://urotrosfiles.media.streamtheworld.com/otrosfiles/objetos/logos/cadenaser-logo_01.png";
                _imagen.className += " embedmode";
                _imagen.onclick = (function(that){return function(){
                    //that.notifyOrderExternal(namespace.EXTERNAL_ORDER_EMBEDMODE);
                    window.open("http://cadenaser.com","_blank");
                }})(this);
            }
        };

        this.resize = function(width, height){};
        this.onProgress = function(data){
            if (_internalPlayer) _internalPlayer.onProgress(data);

            if(_current_time){
                if(!_data.mediaData.isLive)
                    _current_time.innerHTML = this.secondsAsTimeCode(data.currentTime,"hh:mm:ss") + " - " +  this.secondsAsTimeCode(data.totalTime,"hh:mm:ss");
                else
                    _current_time.innerHTML = "DIRECTO";
            }

            if(_bumetroContainer){
                var percent = data.currentTime*100/data.totalTime;

                _bumetro.setProgress(percent);
                //_bumetro.setProgressLoaded(percent*2);
            }
        };
        this.onVolumeChange = function(offset){
            if (_internalPlayer) _internalPlayer.onVolumeChange(offset);

            if(_volBall)
                _volBall.style.left = (27 + (offset*48) - 11/2) + "px";
        };
        this.onStatusChange = function(status){

            if (_typeSkin == _TYPE_SKIN_BIG)
                switch (status){
                    case emic.top.MediaModule.STATUS_STOP:
                    case emic.top.MediaModule.STATUS_PAUSE:
                        _overable = true;
                        _status = status;
                        this.hide(_pauseButton);
                        this.show(_playButton);

                        if(_bumetroContainer)
                            if(!((psd.framework.ua.msie!=null)&&(psd.framework.ua.msie)&&(parseInt(psd.framework.ua.version)<9)))
                                _bumetro.pause();
                    break;
                    case emic.top.MediaModule.STATUS_PLAY:
                        _overable = false;
                        _status = status;
                        this.hide(_playButton);
                        this.show(_pauseButton);
                        soypubli = false;

                        if(_bumetroContainer){
                            if(!((psd.framework.ua.msie!=null)&&(psd.framework.ua.msie)&&(parseInt(psd.framework.ua.version)<9)))_bumetro.play(150);
                            if(_data.mediaData.isLive)
                                if(!((psd.framework.ua.msie!=null)&&(psd.framework.ua.msie)&&(parseInt(psd.framework.ua.version)<9)))_bumetro.setdirecto(true);
                        }
                        break;
                    case emic.top.AdModule.STATUS_PAUSE:
                        _overable = true;
                        this.hide(_pauseButton);
                        this.show(_playButton);
                        _currentStateButton = _playButton;

                         if(_bumetroContainer)
                            if(!((psd.framework.ua.msie!=null)&&(psd.framework.ua.msie)&&(parseInt(psd.framework.ua.version)<9)))_bumetro.pause();

                        break;
                    case emic.top.AdModule.STATUS_PLAY:
                        _overable = false;
                        this.hide(_playButton);
                        this.show(_pauseButton);
                        soypubli = true;
                        _currentStateButton = _pauseButton;

                        if(_bumetroContainer)
                            if(!((psd.framework.ua.msie!=null)&&(psd.framework.ua.msie)&&(parseInt(psd.framework.ua.version)<9)))_bumetro.play(150);

                        break;
                }


            if (_internalPlayer){
                _internalPlayer.onStatusChange(status);
            }

        };
        this.onBufferEmpty = function(){
            _overable = true;
            if (_internalPlayer) _internalPlayer.onBufferEmpty();
            _onLoading.apply(this, [true]);

            if(_bumetroContainer)
                if(!((psd.framework.ua.msie!=null)&&(psd.framework.ua.msie)&&(parseInt(psd.framework.ua.version)<9))) _bumetro.pause();
        };
        this.onBufferFull = function(){
            _overable = false;
            if (_internalPlayer) _internalPlayer.onBufferFull();
            _onLoading.apply(this, [false]);

            if(_bumetroContainer)
                if(!((psd.framework.ua.msie!=null)&&(psd.framework.ua.msie)&&(parseInt(psd.framework.ua.version)<9)))
                    _bumetro.play(150);
        };

        this.showLoading = function (flag) {
            if (_internalPlayer) _internalPlayer.showLoading(flag);
            _onLoading.apply(this, [flag]);
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




    }
    namespace.TopSkin_playser_det = TopSkin_playser_det;

})(emic.top.ui);

/**
 * Created by igomez on 06/08/2014.
 */
(function(namespace){

    TopSkin_playser_pep.prototype = new emic.top.ui.UISkinBase();

    function TopSkin_playser_pep (){
        emic.top.ui.UISkinBase.call(this);

        //elements
        var
            _skin_pep,
            _player_pep,
            _player_progress,
            _playButton,
            _pauseButton,
            _cargandoButton,
            _volButton,
            _volPanel,
            _volBall,
            _volBack,
            _volBack2,
            _progressBar,
            _time,
            _progress_mark,
            _backProgressBar,
            _conectar,
            _conectar_fb,
            _conectar_tw,
            _conectar_goo,
            _conectar_cerrar,
            _conectar_menu,
            _currentStateButton,
            _fondo_progress_clickable;

            var _position = "";

            var _currentCounter = true;

			var _min_width = "250px";

            var moviendoproceso = false;
            moviendoVolumen = false;
            abiertas_rrss = false;

        var _container,
            _data;

        /////////////////////////////////////////////////////////
        //  CONSTANTES
        /////////////////////////////////////////////////////////

        var _URL_TEMPLATE = "/psdmedia/media/top/skins/playser_pep/assets/template.html",
            _URL_STYLE = "/psdmedia/media/top/skins/playser_pep/assets/estilos.css",
            _CODE_NUM_PARSER_OK = 0,
            _CODE_NUM_PARSER_ERROR = 1;


        //TODO: Responsivo, eliminar elementos si no caben, etc

        /////////////////////////////////////////////////////////
        //  INICIALIZACION
        /////////////////////////////////////////////////////////

        var _loadCSS = function(){


            var fileref=document.createElement("link"),
                filename = _data.genericData.urlBase ? (_data.genericData.urlBase + _URL_STYLE) : _URL_STYLE;

            fileref.setAttribute("rel", "stylesheet");
            fileref.setAttribute("type", "text/css");
            fileref.setAttribute("href", filename);
            if (typeof fileref!="undefined")
                document.getElementsByTagName("head")[0].appendChild(fileref)
        };



        var _loadTemplate = function() {

            var _parser = new psd.framework.Parser(),
                templateMediator = new psd.framework.Mediator(),
                url = _data.genericData.urlBase ? (_data.genericData.urlBase + _URL_TEMPLATE) : _URL_TEMPLATE;

            //console.log("dmenaquitar!");
            templateMediator.corsIE(true);

            templateMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_COMPLETE, onDataComplete, this);
            templateMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_ERROR, onDataError, this);
            templateMediator.mediate(url, _parser, psd.framework.Mediator.RESPONSE_TEXT);
        };


        //EVENTOS MEDIATOR
        var onDataComplete = function (evt)
        {
            var template;
            if (evt.result.parserResult.code == _CODE_NUM_PARSER_OK)
            {

                template = evt.result.parserResult.result.replace(/{<-%ID%->}/g,_data.genericData.id);
                _container.innerHTML = template;

                _asignElements.apply(this);
                this.recolocarIE8();

                this.notifyInitComplete();
            }
            else if (evt.result.parserResult.code == _CODE_NUM_PARSER_ERROR)
            {
                //TODO: Error
            }
        };

        var onDataError = function (evt)
        {
            //TODO: Error
        };

        var _getElementById = function(id){
            return document.getElementById(id+_data.genericData.id);
        };

        var _asignElements = function(){

            //TODO: Elementos configurables

            _skin_pep = _getElementById("skin_pep");
            _player_pep = _getElementById("player_pep");
            _player_progress = _getElementById("playerProgressContainer");
            _playButton = _getElementById("PlayerPlay");
            _pauseButton = _getElementById("PlayerPause");
            _cargandoButton = _getElementById("cargando");

            if(getDevice().mobile==true){
                var panelvolumen = _getElementById("PlayerVolume");

                if(panelvolumen)
                    panelvolumen.style.display = "none";

                _player_progress.style.width = "calc(100% - 65px)";
            }

            _currentStateButton = _playButton;

            this.hide(_pauseButton);
            _volButton = _getElementById("PlayerVolume");
            _volBall = _getElementById("playerVolumenMarca");
            _volBack = _getElementById("divPlayerVolumenMarca");
            _volBack2 = _getElementById("divPlayerVolumenMarca2");
            _backProgressBar = _getElementById("PlayerProgressBack");
            _progressBar = _getElementById("PlayerProgress");
            _fondo_progress_clickable = _getElementById("fondo_process_clickable");
            _time = _getElementById("time");
            _volPanel = _getElementById("PlayerVolumePanel");
            this.hide(_volPanel);


            _time.onclick = (function(that){return function(){ _currentCounter = !_currentCounter}})(this);

            _conectar = _getElementById("conectar");
            _conectar_fb = _getElementById("conectar_fb");
            _conectar_tw = _getElementById("conectar_tw");
            _conectar_goo = _getElementById("conectar_goo");
            _conectar_cerrar = _getElementById("conectar_cerrar");
            _conectar_menu = _getElementById("conectar_menu");

            _conectar_fb.onclick = (function(that){return function(){that.notifyOrderShareFacebook();}})(this);
            _conectar_tw.onclick = (function(that){return function(){that.notifyOrderShareTwitter();}})(this);
            _conectar_goo.onclick = (function(that){return function(){that.notifyOrderShareGoogleplus();}})(this);
            _conectar_cerrar.onclick = (function(that){return function(){
                _conectar.style.width = "24px"
                _conectar.style.marginLeft = "0px";
            }})(this);

            _progress_mark = _getElementById("progress_mark");

            _conectar.onclick = (function(that){return function(){

                if(abiertas_rrss){
                    abiertas_rrss = false;
                    _conectar.style.width = "24px"
                    _conectar.style.marginLeft = "0px";
                }else{
                    abiertas_rrss = true;
                    _conectar.style.width = "100px"
                    _conectar.style.marginLeft = "-73px";
                }
                //_conectar_menu.style.display = "inline-block";
            }})(this);

            /*_conectar.onmouseout = (function(that){return function(){
                _conectar.style.width = "24px"
                _conectar.style.marginLeft = "0px";
                //_conectar_menu.style.display = "inline-block";
            }})(this);*/

            _playButton.onclick = (function(that){return function(){
                that.notifyOrderPlay();
            }})(this);
            _pauseButton.onclick = (function(that){return function(){
                that.notifyOrderPause();}})(this);
            _volButton.onmouseover = (function(that){return function(){
                that.show(_volPanel);
                _volPanel.style.display = "block";
                _volPanel.style.left = "auto";
            }})(this);
            _volBall.onclick = function(event){
                if((psd.framework.ua.msie!=null)&&(psd.framework.ua.msie)&&(parseInt(psd.framework.ua.version)<9)){}
                else
                    event.preventDefault();
            };

            _volBack.onmouseover = (function(that){return function(){
                that.show(_volPanel);
                _volPanel.style.display = "block";
            }})(this);
            _volPanel.onmouseover = (function(that){return function(){
                that.show(_volPanel);
                _volPanel.style.display = "block";
            }})(this);
            _volPanel.onmouseout = (function(that){return function(){
                if(!moviendoVolumen)
                    _volPanel.style.display = "none";
            }})(this);

            _volBack.onclick = (function(that){
                return function(e){
/*
                    parentPosition = that.getPosition(e.currentTarget);
                    x = e.clientX - parentPosition.x;
                    y = e.clientY - parentPosition.y;

                    that.notifyOrderVolumeChange(vol);
                    */
                }})(this);

            _volBack2.onclick = (function(that, __currentTarget){
                return function(e){

                    var ct = ((psd.framework.ua.msie!=null)&&(psd.framework.ua.msie)&&(parseInt(psd.framework.ua.version)<9))? __currentTarget: e.currentTarget;
                    var evento = e || window.event;

                    parentPosition = that.getPosition(ct);
                    x = evento.clientX - parentPosition.x;
                    y = evento.clientY - parentPosition.y;

                    var vvol = x/48;
                    if(vvol>1)
                        vvol = 1;
                    if(vvol<0)
                        vvol = 0;

                    that.notifyOrderVolumeChange(vvol);
                }})(this, _volBack2);

            _backProgressBar.onclick = (function(that,__currentTarget){
                return function(e){

                    if(moviendoproceso==false){

                        //dmena quitado seek de ie8
                        if((psd.framework.ua.msie!=null)&&(psd.framework.ua.msie)&&(parseInt(psd.framework.ua.version)<9)){
                            return false;
                        }

                        var ct = ((psd.framework.ua.msie!=null)&&(psd.framework.ua.msie)&&(parseInt(psd.framework.ua.version)<9))? __currentTarget: e.currentTarget;
                        var evento = e || window.event;

                        parentPosition = that.getPosition(ct);
                        //ÑAPAAAAAAAAAAAAAAAAAA
                        //parentPosition.x = 30;

                        x = evento.clientX - parentPosition.x;
                        y = evento.clientY - parentPosition.y;

                        var prop = x / _backProgressBar.offsetWidth;
                        that.notifyOrderSeekByProp(prop);
                    }
                }})(this);

            _fondo_progress_clickable.onclick = (function(that,__currentTarget){
                return function(e){
                    if(moviendoproceso==false){

                        //dmena quitado seek de ie8
                        if((psd.framework.ua.msie!=null)&&(psd.framework.ua.msie)&&(parseInt(psd.framework.ua.version)<9)){
                            return false;
                        }

                        var x, y, parentPosition;

                        var ct = ((psd.framework.ua.msie!=null)&&(psd.framework.ua.msie)&&(parseInt(psd.framework.ua.version)<9))? __currentTarget: e.currentTarget;
                        var evento = e || window.event;

                        parentPosition = that.getPosition(ct);
                        //ÑAPAAAAAAAAAAAAAAAAAA
                        //parentPosition.x = 30;

                        x = evento.clientX - parentPosition.x;
                        y = evento.clientY - parentPosition.y;

                        var prop = x / _backProgressBar.offsetWidth;
                        that.notifyOrderSeekByProp(prop);
                    }
                }})(this);

            _backProgressBar.onclick = (function(that,__currentTarget){
                return function(e){

                    //dmena quitado seek de ie8
                    if((psd.framework.ua.msie!=null)&&(psd.framework.ua.msie)&&(parseInt(psd.framework.ua.version)<9)){
                        return false;
                    }

                    if(moviendoproceso==false){

                        var x, y, parentPosition;

                        var ct = ((psd.framework.ua.msie!=null)&&(psd.framework.ua.msie)&&(parseInt(psd.framework.ua.version)<9))? __currentTarget: e.currentTarget;
                        var evento = e || window.event;

                        parentPosition = that.getPosition(ct);
                        x = evento.clientX - parentPosition.x;
                        y = evento.clientY - parentPosition.y;

                    var prop = x / _backProgressBar.offsetWidth;
                    that.notifyOrderSeekByProp(prop);
                    }
                }})(this);

            if(parseInt(document.getElementById(_data.internalData.skinContainer).style.offsetWidth)<parseInt(_min_width)){
                _player_progress.style.display = "none";
                _player_pep.style.width = "auto";
            }

            //Personalización de vista por opciones

            if (_data.uiData.skinData.hidePlaypause){
                _playButton.style.visibility = "hidden";
                _pauseButton.style.visibility = "hidden";
                _pauseButton.style.visibility = "hidden";
            }

            if (_data.uiData.skinData.hideSocial){
                this.hide(_conectar);
                //TODO: Cambiar esto por una clase css
                _player_pep.style.width = "100%";
            }

            this.onPositionChange = function(position){
                //_data.internalData.position = position;
                _position = position;

            };

            this.onVolumeChange(_data.mediaData.startVolume);

            var _notifyOrderVolumeChange = (function(that){
                return function(vol){
                    that.notifyOrderVolumeChange(vol)
                }
            })(this);

            var _notifyOrderSeekByProp = (function(that){
                return function(seek){
                    that.notifyOrderSeekByProp(seek)
                }
            })(this);

            //DRAG!!!!!!!!!!!!!!!!!!!!!! (_data.internalData.position==emic.top.TopPlayer.POSITION_MEDIA)
            $('#progress_mark' + _data.genericData.id).each(
                function() {
                    var objLimites = $(this).parent().children(
                        '.divPlayerProgresoLimites');
                    $(this).draggable(
                        {
                            axis : 'x',
                            containment : objLimites,
                            start : function(event, ui) {
                                moviendoproceso = true;
                            },
                            stop : function(event, ui) {

                                moviendoproceso = false;

                                var pos = $(this).position();
                                var pos2 = objLimites.position();
                                var altoMaximo = objLimites.width()
                                    - $(this).width();
                                var posicion = pos.left - pos2.left;
                                var porcentaje = 100 * posicion / altoMaximo; // valor
                                // del
                                // volumen
                                $(this).parent().children(".divPlayerProgreso")
                                    .css(
                                        'width',
                                        (pos.left + ($(this).width() / 2))
                                            + 'px');
                                _notifyOrderSeekByProp((pos.left + ($(this).width() / 2))/_backProgressBar.offsetWidth);
                                /*
                                var x, y, parentPosition;

                                parentPosition = that.getPosition(e.currentTarget);
                                x = e.clientX - parentPosition.x;
                                y = e.clientY - parentPosition.y;

                                var prop = x / _backProgressBar.offsetWidth;
                                that.notifyOrderSeekByProp(prop);*/
                            },
                            drag : function(event, ui) {
                                if(_position!=emic.top.TopPlayer.POSITION_MEDIA){
                                    return false;
                                }
                                else{
                                }
                            }
                        });
                });

            $('#playerVolumenMarca' + _data.genericData.id).each(
                function() {
                    var objLimites = $(this).parent().children(
                        '.divPlayerVolumenMarcaHorizontal');
                    $(this).draggable(
                        {
                            axis : 'x',
                            containment : objLimites,
                            start : function(event, ui) {
                                moviendoVolumen = true;
                            },
                            stop : function(event, ui) {
                                moviendoVolumen = false;

                                var vol = ((parseInt($(this).css("left"))-27)/38);

                                if(vol>1)
                                    vol=1;
                                if(vol<0)
                                    vol = 0;

                                _notifyOrderVolumeChange(vol);
                            },
                            drag : function(event, ui) {
                                var vol = ((parseInt($(this).css("left"))-27)/38);

                                if(vol>1)
                                    vol=1;
                                if(vol<0)
                                    vol = 0;

                                _notifyOrderVolumeChange(vol);
                            }
                        });
                });

        };

        this.init = function(data) {
            _data = data;

            _container = document.getElementById(_data.internalData.skinContainer);

            _loadCSS.apply(this);
            _loadTemplate.apply(this);
        };

        this.externalOrder = function(order,params){
        };

        this.reset = function () {
            _progressBar.style.width = "0%";
            _progress_mark.style.left = "0px";
            if (_pauseButton) this.hide(_pauseButton);
            if (_playButton) this.show(_playButton);
            if (_time) _time.innerHTML = (_data.mediaData.isLive)? "DIRECTO":this.secondsAsTimeCode(0,"mm:ss");

            if(_data.mediaData.isLive){
                _time.className += " directos_pep";
            }
            else{
                _time.className = _time.className.replace("directos_pep","");
            }
        };
        this.resize = function(width, height){};
        this.onProgress = function(data){
            _progressBar.style.width = ((data.currentTime / data.totalTime) * 100) + "%";

            if(!moviendoproceso)
                _progress_mark.style.left = _progressBar.style.width;

            //_time.innerHTML = (_data.mediaData.isLive && _position == emic.top.TopPlayer.POSITION_MEDIA)? "DIRECTO":this.secondsAsTimeCode(data.totalTime-data.currentTime,"mm:ss");

            if(_data.mediaData.isLive && _position == emic.top.TopPlayer.POSITION_MEDIA){
                _time.innerHTML = "DIRECTO";
            }else{
                //if(_currentCounter)
                    _time.innerHTML = this.secondsAsTimeCode(data.currentTime,"mm:ss");
                //else
                //    _time.innerHTML = this.secondsAsTimeCode(data.totalTime-data.currentTime,"mm:ss");
            }

            if(_data.mediaData.isLive){
                _time.className += " directos_pep";
            }
            else{
                _time.className = _time.className.replace("directos_pep","");
            }
        };
        this.onVolumeChange = function(offset){
            var clases;

            _volBall.style.left = (27 + (offset*48) - 11/2) + "px";

            /*if((parseInt( _volBall.style.left))>48)
                _volBall.style.left = (parseInt(_volBall.style.left) - 10) + "px";
            */

        };
        this.onStatusChange = function(status){

            switch (status){
                case emic.top.MediaModule.STATUS_STOP:
                case emic.top.MediaModule.STATUS_PAUSE:
                case emic.top.AdModule.STATUS_PAUSE:
                    this.hide(_pauseButton);
                    this.show(_playButton);
                    _currentStateButton = _playButton;
                    break;
                case emic.top.MediaModule.STATUS_PLAY:
                    _position = emic.top.TopPlayer.POSITION_MEDIA;
                case emic.top.AdModule.STATUS_PLAY:
                    this.hide(_playButton);
                    this.show(_pauseButton);
                    _currentStateButton = _pauseButton;
                    _pauseButton.style.display = "block";
                    break;
            }
        };

        this.onBufferEmpty = function(){
            _showLoading.apply(this, [true]);
        };

        this.onBufferFull = function(){
            _showLoading.apply(this, [false]);
        };

        this.showLoading = function (flag) {
            _showLoading.apply(this, [flag]);
        };

        var _showLoading = function(flag){
            if (flag){
                if((psd.framework.ua.msie!=null)&&(psd.framework.ua.msie)&&(parseInt(psd.framework.ua.version)<10)){}
                else{
                    _playButton.className = _playButton.className.replace("playcontinue","cargando");
                    _pauseButton.className = _pauseButton.className.replace("playpause","cargandopause");
                }
            }else{
                if((psd.framework.ua.msie!=null)&&(psd.framework.ua.msie)&&(parseInt(psd.framework.ua.version)<10)){}
                else{
                    _playButton.className = _playButton.className.replace("cargando","playcontinue");
                    _pauseButton.className = _pauseButton.className.replace("cargandopause","playpause");
                }
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
    }
    namespace.TopSkin_playser_pep = TopSkin_playser_pep;

})(emic.top.ui);
