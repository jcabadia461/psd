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
