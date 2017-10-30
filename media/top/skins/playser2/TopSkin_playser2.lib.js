/**
 * Created by igomez on 06/08/2014.
 */
(function(namespace){

    TopSkin_playser2.prototype = new emic.top.ui.UISkinBase();

    namespace.ORDER_TITLE_SUBTITLE_IMAGE = "order_title_subtitle_image";
    namespace.ORDER_SHOW_HIDE_SOCIAL = "order_show_hide_social";

    function TopSkin_playser2 (){
        emic.top.ui.UISkinBase.call(this);

        var TEXTO_PUBLI = "Contenido Publicitario";

        namespace.EXTERNAL_ORDER_COMPARTIR = "external_order_compartir";
        namespace.EXTERNAL_ORDER_EMBEBER = "external_order_embeber";

        //elements
        var _playButton,
            _pauseButton,
            _title,
            _subtitle,
            _imagen,
            _bumetroContainer,
            _contenedorMini,
            _dsprograma,
            _botonesMini,
            _time,
            _txtTiempo,
            _txtDirecto,
            _current_time,
            _total_time,
            _social,
            _btn_compartir,
            _btn_conectar,
            _overable = false,
            _imgExternalOrder;

        var _currentStateButton = null;

        var _bumetro = null;

        var soypubli = false;
        var playing = false;
        var _data;
        var _container;

        /////////////////////////////////////////////////////////
        //  CONSTANTES
        /////////////////////////////////////////////////////////

//        var _URL_TEMPLATE = "/top/player/src/modules/ui/skins/playser/assets/template.html",
        var _URL_TEMPLATE = "/psdmedia/media/top/skins/playser2/assets/template.html",
//            _URL_STYLE = "/top/player/src/modules/ui/skins/playser/assets/estilos.css",
            _URL_STYLE = "/psdmedia/media/top/skins/playser2/assets/estilos.css",
            _CODE_NUM_PARSER_OK = 0,
            _CODE_NUM_PARSER_ERROR = 1;

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
                url = _data.genericData.urlBase ? (_data.genericData.urlBase + _URL_TEMPLATE) : _URL_TEMPLATE;

            //console.log("dmena quitar");
            templateMediator.corsIE(true);

            //dmena quitar
            //url = _URL_TEMPLATE;

            templateMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_COMPLETE, onDataComplete, this);
            templateMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_ERROR, onDataError, this);
            templateMediator.mediate(url, _parser, psd.framework.Mediator.RESPONSE_TEXT);
        };

        this.externalOrder = function(order, params){
            switch(order){
                case namespace.ORDER_TITLE_SUBTITLE_IMAGE:
                    setTitleSubtitleImage(params);
                    break;
                case namespace.ORDER_SHOW_HIDE_SOCIAL:
                    showHideSocial(params);
                    break;
            }
        };

        var showHideSocial = function(params){
            if(params!=null){
                if(params){
                    _social.style.display = "block";
                    _time.style.right = "80px";
                }else{
                    _social.style.display = "none";
                    _time.style.right = "10px";
                }
            }else{
                if(_social.style.display!="none"){
                    _social.style.display = "none";
                    _time.style.right = "10px";
                }else{
                    _social.style.display = "block";
                    _time.style.right = "80px";
                }
            }
        }

        var setTitleSubtitleImage = function(params){
            _title.innerHTML = _data.mediaData.title = params.title;
            _subtitle.innerHTML = _data.mediaData.description = params.subtitle;

            if((params.image!="")&&(params.image!=undefined)){
                _imgExternalOrder = params.image;
                _imagen.className = _imagen.className.replace("byDefaultMini","");
                _imagen.className = _imagen.className.replace("byDefault","");

                _imagen.style.background = "";
                _imagen.style.backgroundSize = "auto 111";
                _imagen.style.backgroundPosition = "center center";
                _imagen.style.backgroundImage = "url(" + params.image + ")";
            }
            else{
                _imagen.style.background = "";
                if(_data.uiData.skinData.miniImage){
                    if (_imagen.className.indexOf("byDefaultMini") < 0){
                        _imagen.className+=" byDefaultMini";
                    }
                }
                else
                {
                    if (_imagen.className.indexOf("byDefault") < 0){
                        _imagen.className+=" byDefault";
                    }
                }
            }
        }

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
            _playButton = _getElementById("play");
            _pauseButton = _getElementById("pause");

            _dsprograma = _getElementById("dsprograma");

            _currentStateButton = _playButton;
            this.hide(_pauseButton);

            _title = _getElementById("titulo");
            _subtitle = _getElementById("subtitulo");
            _imagen = _getElementById("imagendirecto");

            if(_data.uiData.poster){

                _imagen.style.backgroundImage = "url('" + _data.uiData.poster + "')";
            }

            _bumetroContainer = _getElementById("bumetroContainer");

            _title.innerHTML = _data.mediaData.title;
            _subtitle.innerHTML = _data.mediaData.description;

            _playButton.onclick = (function(that){return function(){that.notifyOrderPlay();}})(this);
            _pauseButton.onclick = (function(that){return function(){that.notifyOrderPause();}})(this);

            _contenedorMini = _getElementById("contenedorMini");
            _botonesMini = _getElementById("botonesMini");

            _time = _getElementById("tiempo")
            _txtTiempo = _getElementById("txtTiempo");
            _txtDirecto = _getElementById("txtDirecto");
            _current_time = _getElementById("currentTime");
            _total_time = _getElementById("totalTime");

            //_data.mediaData.duration = 1303;

            //console.log(_data.mediaData.duration,"-----");

            _total_time.innerHTML = "";

            if(_data.mediaData.duration){
                if((_data.mediaData.duration!="")&&(_data.mediaData.duration!=null)&&(_data.mediaData.duration>0)){
                    _data.mediaData.duration = _data.mediaData.duration/1000;
                    _total_time.innerHTML = " - " + this.secondsAsTimeCode(_data.mediaData.duration,"hh:mm:ss");
                }
            }

            _btn_compartir = _getElementById("compartir_");
            _btn_conectar = _getElementById("conectar_");
            _social = _getElementById("social_");


            if(_data.uiData.skinData.hideSocial){
                showHideSocial(false);
            }

            if(_btn_compartir){
                _btn_compartir.onclick = (function(that){return function(){
                    that.notifyOrderExternal(namespace.EXTERNAL_ORDER_EMBEBER);
                }})(this);
            }

            if(_btn_conectar){
                _btn_conectar.onclick = (function(that){return function(){
                    that.notifyOrderExternal(namespace.EXTERNAL_ORDER_COMPARTIR);
                }})(this);
            }

            if(_data.uiData.skinData.miniImage){
                //_imagen.className += " imagenblancamini";
                //_imagen.className = _imagen.className.replace("imagenblanca","");
            }

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

                        if(_bumetro){
                            _bumetro.setProgress(prop * 100);
                            _bumetro.paint(true);
                        }
                    }
                }})(this);

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
                            _bumetro.setProgressOver(prop * 100);
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

            if(!((psd.framework.ua.msie!=null)&&(psd.framework.ua.msie)&&(parseInt(psd.framework.ua.version)<9))){
                _bumetro = new emic.top.ui.Bumetro();
                _bumetro.init("bumetroContainer"+_data.genericData.id,{"color1":"#aaa","color2":"#eee","colorover":"#feeaab","colorloaded":"#ccc","background":"#fff","lineWidth":3,"lineSeparation":2,"bottom":3});

                _bumetro.setProfile(_bumetro.PROFILE_REAL);
            }

            //_data.uiData.skinData.miniImage = true;
            //_data.uiData.skinData.tipoMiniAutorFecha = true;

           // _data.mediaData.author = "señor 1";
            //_data.mediaData.date = "01/05/2014";

            if(_data.uiData.skinData.miniImage){
                /*
                //_imagen.style.width = "111px !important";
                _contenedorMini.style.left = "111px";
                _contenedorMini.style.width = "calc(100% - 111px)";
                //_botonesMini.style.left = "-100px";
                _title.style.display = "none";
                _subtitle.style.left = "30px";
                _subtitle.style.margin = 0;
                _imagen.style.backgroundSize = "auto 111px";
                _imagen.style.backgroundPosition = "center center";
                _dsprograma.style.left = "160px";
                */
            }
            if(_data.uiData.skinData.tipoMiniAutorFecha){
                var _pie = "";
                if((_data.mediaData.author!=undefined)&&(_data.mediaData.author!=""))
                    _pie += _data.mediaData.author;

                if((_data.mediaData.date!=undefined)&&(_data.mediaData.date!="")){
                    if(_pie!=""){
                        _pie += " | ";
                    }

                    _pie += _data.mediaData.date;
                }

                _subtitle.innerHTML = _pie;
            }
        }

        this.init = function(data) {
            _data = data;
            _container = document.getElementById(_data.internalData.skinContainer);

            _loadCSS.apply(this);
            _loadTemplate.apply(this);
        };

        this.reset = function ()
        {

            if (_imgExternalOrder == undefined)
            {
                if(_data.uiData.poster != undefined)
                {
                    if (_data.uiData.poster == "")
                    {
                        if(_data.uiData.skinData.miniImage){
                            if (_imagen.className.indexOf("byDefaultMini") < 0)
                                _imagen.className+=" byDefaultMini";
                        }
                        else
                        {
                            if (_imagen.className.indexOf("byDefault") < 0)
                                _imagen.className+=" byDefault";
                        }
                    }
                    else
                    {
                        _imagen.className = _imagen.className.replace("byDefaultMini","");
                        _imagen.className = _imagen.className.replace("byDefault","");

                        _imagen.style.background = "";
                        _imagen.style.backgroundSize = "auto 111";
                        _imagen.style.backgroundPosition = "center center";
                        _imagen.style.backgroundImage = "url('" + _data.uiData.poster + "')";
                    }
                }
            }

            if (_title) _title.innerHTML = _data.mediaData.title;
            if (_pauseButton) this.hide(_pauseButton);
            if (_playButton) this.show(_playButton);

            if(!((psd.framework.ua.msie!=null)&&(psd.framework.ua.msie)&&(parseInt(psd.framework.ua.version)<9)))
            {
                _bumetro.setProgress(0);
                _bumetro.pause();
            }

            if(_data.mediaData.isLive){
                this.hide(_txtTiempo);
                this.show(_txtDirecto);
            }else{
                this.show(_txtTiempo);
                this.hide(_txtDirecto);
            }

            //embedmode

            var _embedmode = _data.uiData.skinData.embedMode;

            if(_embedmode){
                _imagen.className = _imagen.className.replace("byDefault","");
                _imagen.className += " embedmode";
                //_imagen.style.background = 'url("http://urotrosfiles.media.streamtheworld.com/otrosfiles/objetos/logos/cadenaser-logo_01.png") center center no-repeat auto 100%';
                _imagen.onclick = (function(that){return function(){
                    //that.notifyOrderExternal(namespace.EXTERNAL_ORDER_EMBEDMODE);
                    window.open("http://cadenaser.com","_blank");
                }})(this);
            }
        };

        this.resize = function(width, height){};

        this.onProgress = function(data){
            if((psd.framework.ua.msie!=null)&&(psd.framework.ua.msie)&&(parseInt(psd.framework.ua.version)<9)){return false;}

            var percent = data.currentTime*100/data.totalTime;
            _bumetro.setProgress(percent);
            //_bumetro.setProgressLoaded(percent*2);

            _current_time.innerHTML = this.secondsAsTimeCode(data.currentTime,"hh:mm:ss");
            _total_time.innerHTML = " - " +  this.secondsAsTimeCode(data.totalTime,"hh:mm:ss");
        };

        this.onVolumeChange = function(offset){
        };

        this.onBufferEmpty = function(){
            _overable = true;
            if(!((psd.framework.ua.msie!=null)&&(psd.framework.ua.msie)&&(parseInt(psd.framework.ua.version)<9))) _bumetro.pause();

            _showLoading.apply(this, [true]);
            /*
            if((psd.framework.ua.msie!=null)&&(psd.framework.ua.msie)&&(parseInt(psd.framework.ua.version)<10)){}
            else{
                _playButton.className = _playButton.className.replace("iniciar","cargando");
                _pauseButton.className = _pauseButton.className.replace("pausar","cargando_pause");
            }
            */
        };

        this.onBufferFull = function(){
            _overable = false;
            if(playing)
                if(!((psd.framework.ua.msie!=null)&&(psd.framework.ua.msie)&&(parseInt(psd.framework.ua.version)<9)))
                    _bumetro.play(150);

            _showLoading.apply(this, [false]);

            /*
            if((psd.framework.ua.msie!=null)&&(psd.framework.ua.msie)&&(parseInt(psd.framework.ua.version)<10)){}
            else{
                _playButton.className = _playButton.className.replace("cargando","iniciar");
                _pauseButton.className = _pauseButton.className.replace("cargando_pause","pausar");
            }
            */
        };

        this.showLoading = function (flag) {
            _showLoading.apply(this, [flag]);
        };

        var _showLoading = function(flag){
            if (flag){
                if((psd.framework.ua.msie!=null)&&(psd.framework.ua.msie)&&(parseInt(psd.framework.ua.version)<10)){}
                else{
                    _playButton.className = _playButton.className.replace("play52","player52PlayCargando");
                    _pauseButton.className = _pauseButton.className.replace("pause52","player52PauseCargando");
                }
            }else{
                if((psd.framework.ua.msie!=null)&&(psd.framework.ua.msie)&&(parseInt(psd.framework.ua.version)<10)){}
                else{
                    _playButton.className = _playButton.className.replace("player52PlayCargando","play52");
                    _pauseButton.className = _pauseButton.className.replace("player52PauseCargando","pause52");
                }
            }
        };

        this.onStatusChange = function(status){

            switch (status){
                case emic.top.MediaModule.STATUS_STOP:
                case emic.top.MediaModule.STATUS_PAUSE:
                    this.hide(_pauseButton);
                    this.show(_playButton);
                    _currentStateButton = _playButton;
                    _overable = true;
                    if(!((psd.framework.ua.msie!=null)&&(psd.framework.ua.msie)&&(parseInt(psd.framework.ua.version)<9)))
                        _bumetro.pause();

                    playing = false;
                break;
                case emic.top.MediaModule.STATUS_PLAY:
                    _overable = false;
                    this.hide(_playButton);
                    this.show(_pauseButton);
                    _currentStateButton = _pauseButton;
                    if(!((psd.framework.ua.msie!=null)&&(psd.framework.ua.msie)&&(parseInt(psd.framework.ua.version)<9)))_bumetro.play(150);
                    soypubli = false;
                    playing = true;

                    if(_data.mediaData.isLive)
                        if(!((psd.framework.ua.msie!=null)&&(psd.framework.ua.msie)&&(parseInt(psd.framework.ua.version)<9)))_bumetro.setdirecto(true);
                break;
                case emic.top.AdModule.STATUS_PAUSE:
                    _overable = true;
                    this.hide(_pauseButton);
                    this.show(_playButton);
                    _currentStateButton = _playButton;
                    if(!((psd.framework.ua.msie!=null)&&(psd.framework.ua.msie)&&(parseInt(psd.framework.ua.version)<9)))_bumetro.pause();
                break;
                case emic.top.AdModule.STATUS_PLAY:
                    _overable = false;
                    this.hide(_playButton);
                    this.show(_pauseButton);
                    _currentStateButton = _pauseButton;
                    _title.innerHTML = TEXTO_PUBLI;
                    if(!((psd.framework.ua.msie!=null)&&(psd.framework.ua.msie)&&(parseInt(psd.framework.ua.version)<9)))_bumetro.play(150);
                    soypubli = true;
                break;
                case emic.top.AdModule.STATUS_STOP:
                    _overable = true;
                    _title.innerHTML = _data.mediaData.title;
                    if(!((psd.framework.ua.msie!=null)&&(psd.framework.ua.msie)&&(parseInt(psd.framework.ua.version)<9)))_bumetro.pause();
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
    }
    namespace.TopSkin_playser2 = TopSkin_playser2;

})(emic.top.ui);