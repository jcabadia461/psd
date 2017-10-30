/**
 * Created by igomez on 06/08/2014.
 */
(function(namespace){

    TopSkin_playser.prototype = new emic.top.ui.UISkinBase();

    namespace.ORDER_ENABLE_BUTTONS_ON = "order_enable_buttons_on";
    namespace.ORDER_ENABLE_BUTTONS_OFF = "order_enable_buttons_off";
    namespace.ORDER_TITLE = "order_title";


    namespace.EXTERNAL_ORDER_DETALLES = "external_order_detalles";
    namespace.EXTERNAL_ORDER_COMPARTIR = "external_order_compartir";
    namespace.EXTERNAL_ORDER_EMBEBER = "external_order_embeber";



    function TopSkin_playser (){
        emic.top.ui.UISkinBase.call(this);

        var TEXTO_PUBLI = "Contenido Publicitario";

        //elements
        var _prevButton,
            _nextButton,
            _playButton,
            _pauseButton,
            _volButton,
            _volPanel,
            _progressBar,
            _progressBarButton,
            _backProgressBar,
            _title;

        var _volBall,
            _volBack,
            _volBack2,
            _time,
            _boton_compartir,
            _boton_llevatelo,
            _boton_comentarios,
            _ncomentarios,
            _s1,
            _s2,
            botonesIzquierdaPlayserContainer,
            _botones_izquierda
            ;

        var _currentStateButton = null;

        //flags
        var _volSelected;

        var _container,
            _data;

        var moviendoVolumen = false;

        /////////////////////////////////////////////////////////
        //  CONSTANTES
        /////////////////////////////////////////////////////////

//        var _URL_TEMPLATE = "/top/player/src/modules/ui/skins/playser/assets/template.html",
        var _URL_TEMPLATE = "/psdmedia/media/top/skins/playser/assets/template.html",
//            _URL_STYLE = "/top/player/src/modules/ui/skins/playser/assets/estilos.css",
            _URL_STYLE = "/psdmedia/media/top/skins/playser/assets/estilos.css",
            _CODE_NUM_PARSER_OK = 0,
            _CODE_NUM_PARSER_ERROR = 1;


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
                url = _data.genericData.urlBase ? (_data.genericData.urlBase + _URL_TEMPLATE) : _URL_TEMPLATE;

            templateMediator.corsIE(true);

            //dmena quitar
            //url = _URL_TEMPLATE;

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

            botonesIzquierdaPlayserContainer = _getElementById("botones_izquierda_playser_container");
            _botones_izquierda = _getElementById("botones_izquierda");

            if(getDevice().mobile==true){
                var panelvolumen = _getElementById("panelVolumenOcultable");

                if(panelvolumen)
                    panelvolumen.style.display = "none";
                if(botonesIzquierdaPlayserContainer){
                    botonesIzquierdaPlayserContainer.style.left = "-70px";
                }
            }

            //TODO: Elementos configurables

            //DMENA QUITAR
            this.loadEskupInfo(_data.socialData.eskupData.idEskup);

            _prevButton = _getElementById("PlayerPrev");
            _nextButton = _getElementById("PlayerNext");
            _playButton = _getElementById("PlayerPlay");
            _pauseButton = _getElementById("PlayerPause");

            _currentStateButton = _playButton;

            this.hide(_pauseButton);
            _title = _getElementById("PlayerDesc");

            _volButton = _getElementById("PlayerVolume");
            //_volButtonOff = _getElementById("PlayerVolumeClose");
            _backProgressBar = _getElementById("PlayerProgressBack");
            _progressBar = _getElementById("PlayerProgress");
            _progressBarButton = _getElementById("PlayerProgressButton");
            //_volMute = _getElementById("PlayerVol0");
            //_vol20 = _getElementById("PlayerVol1");
            //_vol40 = _getElementById("PlayerVol2");
            //_vol60 = _getElementById("PlayerVol3");
            //_vol80 = _getElementById("PlayerVol4");
            //_vol100 = _getElementById("PlayerVol5");
            _volPanel = _getElementById("PlayerVolumePanel");
            this.hide(_volPanel);

            _volBall = _getElementById("playerVolumenMarca");
            _volBack = _getElementById("divPlayerVolumenMarca");
            _volBack2 = _getElementById("divPlayerVolumenMarca2");
            _time = _getElementById("time");

            _s1 = _getElementById("s1");
            _s2 = _getElementById("s2");

            _boton_llevatelo = _getElementById("botones_playser_llevatelo");
            _boton_comentarios = _getElementById("botones_playser_comentarios");
            _boton_compartir = _getElementById("botones_playser_conectar");

            _prevButton.onclick = (function(that){return function(){that.notifyOrderPrev();}})(this);
            _nextButton.onclick = (function(that){return function(){that.notifyOrderNext();}})(this);
            _playButton.onclick = (function(that){return function(){that.notifyOrderPlay();}})(this);
            _pauseButton.onclick = (function(that){return function(){that.notifyOrderPause();}})(this);

            _boton_comentarios.onclick = (function(that){return function(){that.notifyOrderExternal(namespace.EXTERNAL_ORDER_DETALLES)}})(this);
            _boton_llevatelo.onclick = (function(that){return function(){that.notifyOrderExternal(namespace.EXTERNAL_ORDER_EMBEBER)}})(this);
            _boton_compartir.onclick = (function(that){return function(){that.notifyOrderExternal(namespace.EXTERNAL_ORDER_COMPARTIR)}})(this);

            //TODO: Autohide tras X segundos
            _volButton.onmouseover = (function(that){return function(){
                if(_volPanel.style.display=="none"){
                    that.show(_volPanel);
                }
            }})(this);
            //_volButtonOff.onclick = (function(that){return function(){that.hide(_volPanel)}})(this);
            //_volMute.onclick = (function(that){return function(){that.notifyOrderMute();}})(this);
            //_vol20.onclick = (function(that){return function(){that.notifyOrderVolumeChange(.2);}})(this);
            //_vol40.onclick = (function(that){return function(){that.notifyOrderVolumeChange(.4);}})(this);
            //_vol60.onclick = (function(that){return function(){that.notifyOrderVolumeChange(.6);}})(this);
            //_vol80.onclick = (function(that){return function(){that.notifyOrderVolumeChange(.8);}})(this);
            //_vol100.onclick = (function(that){return function(){that.notifyOrderVolumeChange(1);}})(this);
            _progressBarButton.onclick = (function(that){
                return function(e){
                    var x, y, parentPosition;

                    parentPosition = that.getPosition(e.currentTarget);
                    x = e.clientX - parentPosition.x;
                    y = e.clientY - parentPosition.y;

                    var prop = x / _progressBarButton.offsetWidth;
                    that.notifyOrderSeekByProp(prop);


                }})(this);

            _title.innerHTML = _data.mediaData.title;

            //this.externalOrder(namespace.ORDER_ENABLE_BUTTONS_OFF,{});
            _enableButtons.apply(this,[false]);

            this.onVolumeChange(_data.mediaData.startVolume);

            //dmena nuevos elementos para el nuevo template
            _volPanel.onmouseover = (function(that){return function(){
                that.show(_volPanel);
                _volPanel.style.display = "block";
            }})(this);
            _volPanel.onmouseout = (function(that){return function(){
               if(!moviendoVolumen){
                    _volPanel.style.display = "none";
               }
            }})(this);

            _volBack.onmouseover = (function(that){return function(){
                that.show(_volPanel);
                _volPanel.style.display = "block";
            }})(this);

            _volBack.onclick = (function(that){
                return function(e){

                    parentPosition = that.getPosition(e.currentTarget);
                    x = e.clientX - parentPosition.x;
                    y = e.clientY - parentPosition.y;
                }})(this);

            _volBack2.onclick = (function(that){
                return function(e){
                    parentPosition = that.getPosition(e.currentTarget);
                    x = e.clientX - parentPosition.x;
                    y = e.clientY - parentPosition.y;

                    _ballpos = x-17;

                    if(_ballpos<9)
                        _ballpos=18;
                    if(_ballpos>60)
                        _ballpos = 60;

                    vol = _ballpos/60;
                    if(vol<=0.3)
                        vol = 0;
                    /*
                    _ballpos = x-10;

                    if(_ballpos<18)
                        _ballpos=18;
                    if(_ballpos>60)
                        _ballpos = 60;

                    vol = _ballpos/60;
                    if(vol<=0.3)
                        vol = 0;
                    */
                    if(vol>1)
                        vol=1;

                    that.notifyOrderVolumeChange(vol);
             }})(this);

            var _notifyOrderVolumeChange = (function(that){
               return function(vol){
                   that.notifyOrderVolumeChange(vol)
               }
            })(this);

            $('#playerVolumenMarca'+_data.genericData.id).each(
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
                                if(vol>1) vol = 1;
                                if(vol<0) vol = 0;
                                _notifyOrderVolumeChange(vol);
                                //_that.notifyOrderVolumeChange(vol);
                            },
                            drag : function(event, ui) {
                                var vol = ((parseInt($(this).css("left"))-27)/38);
                                if(vol>1) vol = 1;
                                if(vol<0) vol = 0;
                                _notifyOrderVolumeChange(vol);
//                                _that.notifyOrderVolumeChange(vol);
                            }
                        });
                });

            var ocultar = _getElementById("botones_ocultar_directo");

            if(_data.mediaData.isLive){
                this.hideBotonComentarios(true);
                _time.style.padding = "0 30px";
                //ocultar.style.visibility = "hidden";
                //ocultar.style.width = "100px";
            }else{
                this.hideBotonComentarios(false);
            }

            };

        this.loadNComentarios = function(){
            _ncomentarios = _getElementById("botones_playser_numero_comentarios");

            if(_ncomentarios){
                if(this.infoEskup.perfilesHilos["_" + this.idTop])
                    _ncomentarios.innerHTML = this.infoEskup.perfilesHilos["_" + this.idTop].numero_mensajes;
                else
                    _ncomentarios.innerHTML = "";
            }

            if(_ncomentarios.innerHTML=="0")
                _ncomentarios.innerHTML = "";
        };

        this.hideBotonCompartir = function(orden){

            if(orden==null)
                orden = true;

            if(_botones_izquierda.style.right=="")
                _botones_izquierda.style.right = "0px";

            if(orden){
                if(_boton_compartir.style.display == "none")
                    return;

                _boton_compartir.style.display = "none";

                _botones_izquierda.style.right = (parseInt(_botones_izquierda.style.right) - 37) + "px";
            }else{
                if(_boton_compartir.style.display != "none")
                    return;

                _boton_compartir.style.display = "block";
                _botones_izquierda.style.right = (parseInt(_botones_izquierda.style.right) + 37) + "px";
            }
        };

        this.hideBotonEmbeber = function(orden){

            if(orden==null)
                orden = true;

            if(_botones_izquierda.style.right=="")
                _botones_izquierda.style.right = "0px";

            if(orden){
                if(_s1.style.display == "none")
                    return;

                _s1.style.display = "none";
                _botones_izquierda.style.right = (parseInt(_botones_izquierda.style.right) - 37) + "px";
            }else{
                if(_s1.style.display != "none")
                    return;

                _s1.style.display = "block";
                _botones_izquierda.style.right = (parseInt(_botones_izquierda.style.right) + 37) + "px";
            }
        };

        this.hideBotonComentarios = function(orden){

            if(orden==null)
                orden = true;

            if(_botones_izquierda.style.right=="")
                _botones_izquierda.style.right = "0px";

            if(orden){
                if(_s2.style.display == "none")
                    return;

                _s2.style.display = "none";
                _botones_izquierda.style.right = (parseInt(_botones_izquierda.style.right) - 37) + "px";
            }else{
                if(_s2.style.display != "none")
                    return;

                _s2.style.display = "block";
                _botones_izquierda.style.right = (parseInt(_botones_izquierda.style.right) + 37) + "px";
            }
        }

        this.hideButtons = function(compartir,embeber,comentarios){

            if(compartir==null) compartir = true;
            if(embeber==null) embeber = true;
            if(comentarios==null) comentarios = true;

            this.hideBotonComentarios(comentarios);
            this.hideBotonCompartir(compartir);
            this.hideBotonEmbeber(embeber);
        }

        this.init = function(data) {
            _data = data;

            _container = document.getElementById(_data.internalData.skinContainer);

            _loadCSS.apply(this);
            _loadTemplate.apply(this);
        };
        this.reset = function () {
            if (_progressBar) _progressBar.style.width = "0%";
            if (_title) _title.innerHTML = _data.mediaData.title;
            if (_pauseButton) this.hide(_pauseButton);
            if (_playButton) this.show(_playButton);

            if (_time) _time.innerHTML = (_data.mediaData.isLive)? "DIRECTO":this.secondsAsTimeCode(0,"hh:mm:ss");

            var ocultar = _getElementById("botones_ocultar_directo");

            if(_data.mediaData.isLive){
                //ocultar.style.visibility = "hidden";
                //ocultar.style.width = "100px";
                this.hideBotonComentarios(true);
                _time.style.padding = "0 30px";
            }else{
                this.hideBotonComentarios(false);
                ocultar.style.visibility = "visible";
                ocultar.style.width = "216px";
            }
        };

        this.resize = function(width, height){};
        this.onProgress = function(data){
            _progressBar.style.width = ((data.currentTime / data.totalTime) * 100) + "%";
            _time.innerHTML = (_data.mediaData.isLive && _data.internalData.position == emic.top.TopPlayer.POSITION_MEDIA)? "DIRECTO":this.secondsAsTimeCode(data.currentTime,"hh:mm:ss");

            //TODO: Descargainner
        };

        this.onVolumeChange = function(offset){

            _volBall.style.left = (offset*46 + 22) + "px";

/*          var clases;

            if (_volSelected){
                clases = _volSelected.className;
                clases = clases.replace("volItemSelected","");
                _volSelected.className = clases;
            }

            if (offset == 0)
                _volSelected = _volMute;
            else if (offset <= 0.2)
                _volSelected = _vol20;
            else if (offset <= 0.4)
                _volSelected = _vol40;
            else if (offset <= 0.6)
                _volSelected = _vol60;
            else if (offset <= 0.8)
                _volSelected = _vol80;
            else
                _volSelected = _vol100;

            _volSelected.className += " volItemSelected";
*/
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
                    _playButton.className = _playButton.className.replace("iniciar","cargando");
                    _pauseButton.className = _pauseButton.className.replace("pausar","cargando_pause");
                }
            }else{
                if((psd.framework.ua.msie!=null)&&(psd.framework.ua.msie)&&(parseInt(psd.framework.ua.version)<10)){}
                else{
                    _playButton.className = _playButton.className.replace("cargando","iniciar");
                    _pauseButton.className = _pauseButton.className.replace("cargando_pause","pausar");
                }
            }
        };

        this.externalOrder = function(order, params){
            switch(order){
                case namespace.ORDER_ENABLE_BUTTONS_ON:
                    _enableButtons.apply(this, [true]);
                break;
                case namespace.ORDER_ENABLE_BUTTONS_OFF:
                    _enableButtons.apply(this, [false]);
                break;
                case namespace.ORDER_TITLE:
                    _title.innerHTML = params;
                break;
            }
        };

        var _enableButtons = function(value){
            if(value){
                _playButton.style.left = "74px";
                _pauseButton.style.left = "74px";
                _title.style.left = "112px";
                _nextButton.style.display = "block";
                _prevButton.style.display = "block";
            }else{
                _playButton.style.left = "0px";
                _pauseButton.style.left = "0px";
                _title.style.left = "40px";
                _nextButton.style.display = "none";
                _prevButton.style.display = "none";
            }
        };

        this.onStatusChange = function(status){

            switch (status){
                case emic.top.MediaModule.STATUS_STOP:
                case emic.top.MediaModule.STATUS_PAUSE:
                    this.hide(_pauseButton);
                    this.show(_playButton);
                    _currentStateButton = _playButton;
                break;
                case emic.top.MediaModule.STATUS_PLAY:
                    this.hide(_playButton);
                    this.show(_pauseButton);
                    _currentStateButton = _pauseButton;
                break;
                case emic.top.AdModule.STATUS_PAUSE:
                    this.hide(_pauseButton);
                    this.show(_playButton);
                    _currentStateButton = _playButton;
                break;
                case emic.top.AdModule.STATUS_PLAY:
                    this.hide(_playButton);
                    this.show(_pauseButton);
                    _currentStateButton = _pauseButton;
                    _title.innerHTML = TEXTO_PUBLI;
                break;
                case emic.top.AdModule.STATUS_STOP:
                    _title.innerHTML = _data.mediaData.title;
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
    namespace.TopSkin_playser = TopSkin_playser;

})(emic.top.ui);