mm_publi_compilation= "18-10-2017 17:49:5";
(function(window) 
{
    // Generacion del namespace psd.framework
    if(window.emic==undefined) { window.emic = {}; }
    if(window.emic.publicidad==undefined) { window.emic.publicidad = {}; }
    if(window.emic.publicidad.events==undefined) { window.emic.publicidad.events = {}; }
    if(window.emic.publicidad.controllers==undefined) { window.emic.publicidad.controllers = {}; }

    window.emic.publicidad.debug = false;
    
    if(window.location.href.indexOf("debug")!=-1) { window.emic.publicidad.debug = true; }
    
})(window);(function(namespace) {
	
    // Inheritance class
    PubliEvent.prototype = new psd.framework.Event();

    /**
     * Evento PubliManager - publiReady
     */
    PubliEvent.MANAGER_READY = "managerReady";

    /**
     * Evento PubliManager - publiReady
     */
    PubliEvent.MANAGER_INIT_ERROR = "managerInitError";

    /**
     * Evento PubliManager - publiStarted
     */
    PubliEvent.PUBLI_STARTED = "publiStarted";

    /**
     * Evento PubliManager - publiPaused
     */
    PubliEvent.PUBLI_PAUSED = "publiPaused";

    /**
     * Evento PubliManager - publiResumed
     */
    PubliEvent.PUBLI_RESUMED = "publiResumed";

    /**
     * Evento PubliManager - publiEnded
     */
    PubliEvent.PUBLI_ENDED = "publiEnded";

    /**
     *
     */
    PubliEvent.PUBLI_SKIPPED = "publiSkipped";

    /**
     * Se activa cuando el administrador de anuncios finaliza la reproducción de todos los anuncios
     */
    PubliEvent.ALL_PUBLI_ENDED = "allPubliEnded";

    /**
     * Evento que indica que la publicidad se ha cargado. Este es el primer evento enviado para un anuncio
     */
    PubliEvent.PUBLI_LOADED = "publiLoaded";

    /**
     * Evento PubliManager - publiErrors
     */
    PubliEvent.PUBLI_ERROR = "publiErrors";

    /**
     * Evento PubliModel - publiModelComplete
     */
    PubliEvent.PUBLI_MODEL_COMPLETE = "publiModelComplete";

    /**
     * Evento PubliModel - publiModelError
     */
    PubliEvent.PUBLI_MODEL_ERROR = "publiModelError";

    /**
     * Evento que indica que el video debe pausarse
     */
    PubliEvent.CONTENT_PAUSE_REQUESTED = "contentPauseRequested";

    /**
     * Evento que indica que el video debe activarse
     */
    PubliEvent.CONTENT_RESUME_REQUESTED = "contentResumeRequested";

	 /**
     * Evento que indica que el controlador está listo
     */
    PubliEvent.CONTROLLER_LOADED = "controllerLoaded";
   
    /**
     * Datos adicionales del evento
     */
    this.data = {};

    /**
     * Eventos de estado de reproduccion de contenido multimedia
     * @constructor
     */
    function PubliEvent(type)
    {
        // Super
        psd.framework.Event.call(this, type);

        this.data = {};

    }
    
    // Incluimos la declaracion de la clase en el namespace emic.publicidad.events
    namespace.PubliEvent = PubliEvent;

})(emic.publicidad.events);(function(namespace) {
    
    // Inheritance class
    PubliModel.prototype = new psd.framework.EventDispatcher();

    /**
     * @constructor
     */

        /////////////////////////////////////////////////////////
        //  STATIC UTILS
        /////////////////////////////////////////////////////////

    PubliModel.loadDomDependence = function (src, onComplete, that) {

        var head, script, defComplete;

        //Añadimos la dependencia al DOM
        head = document.getElementsByTagName('head')[0];
        script = document.createElement('script');
        script.type = 'text/javascript';


        defComplete = (function (){
            return function(){
                onComplete.apply(that);
            }
        })();

        if (navigator.appName.indexOf("Microsoft") >= 0) {
            script.onreadystatechange = function() {
                if (this.readyState == "loaded" ||
                    this.readyState == "complete") {
                    defComplete();
                    script.onreadystatechange = null;
                }
            };
        }
        else {
            script.onload = defComplete;
        }

        script.src = src;
        head.appendChild(script);
    };

    /////////////////////////////////////////////////////////


    function PubliModel(urlConfPubli)
    {




        // Super
        psd.framework.EventDispatcher.call(this);
                
        /**
         * className emic.publicidad.PubliModel
         */
        this.className = "emic.publicidad.PubliModel";

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//    

        //POSICIONES DE PUBLICIDAD
        PubliModel.POSICION_PREROLL_HTML5 = "prerollHtml5";
        PubliModel.POSICION_PREROLL_FLASH = "prerollFlash";
        PubliModel.POSICION_POSTROLL_HTML5 = "postrollHtml5";
        PubliModel.POSICION_POSTROLL_FLASH = "postrollFlash";

        // TAG POSITION
        PubliModel.TAG_POSITION_PREROLL = "pre";
        PubliModel.TAG_POSITION_POSTROLL = "post";

        //CONTROLLERS
        PubliModel.IMA3FLASHCONTROLLER = "IMA3FlashController";
        PubliModel.IMA3HTML5CONTROLLER = "IMA3HTML5Controller";

        //CODE NUMBER PARSER
        CODE_NUM_PARSER_OK = 0;
        CODE_NUM_PARSER_ERROR = 1;

        var _urlConfPubli = urlConfPubli;
        var _currentPos;
		var _currentController;
        var _publiMediator;
		
		var _data;

        //Cargamos la url del confPubli
        this.init = function()
        {
            var _jsonParser = new psd.framework.parser.JSONParser();

            _publiMediator = new psd.framework.Mediator();
            _publiMediator.corsIE(true);
            _publiMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_COMPLETE, onDataComplete, this);
            _publiMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_ERROR, onDataError, this);
            _publiMediator.mediate(_urlConfPubli, _jsonParser, psd.framework.Mediator.RESPONSE_JSON);
        };

        //EVENTOS MEDIATOR
        var onDataComplete = function (evt)
        {
            if (evt.result.parserResult.code == CODE_NUM_PARSER_OK)
            {
                _data = evt.result.parserResult.result;
                this.dispatchEvent(new emic.publicidad.events.PubliEvent(emic.publicidad.events.PubliEvent.PUBLI_MODEL_COMPLETE));

            }
            else if (evt.result.parserResult.code == CODE_NUM_PARSER_ERROR)
            {
                this.dispatchEvent(new emic.publicidad.events.PubliEvent(emic.publicidad.events.PubliEvent.PUBLI_MODEL_ERROR));
            }
        };

        var onDataError = function (evt)
        {
            this.dispatchEvent(new emic.publicidad.events.PubliEvent(emic.publicidad.events.PubliEvent.PUBLI_MODEL_ERROR));
        };
        //EVENTOS MEDIATOR

        /**
         *
         * @param position
         * @param vars
         */
        this.getUrlByPos = function(position, vars, data)
        {
            var i;
            _currentPos = position;

            /*en caso de tener ADunit personalizado*/
            var _DataModel = data,
                CompareAdunit = "",
                resultAdunit = "",
                un_creacion, portal_creacion, seccion_creacion;

            /*Si en el obj tenemos disponible la propiedad comprobamos el ADpersonalizado*/
            if (typeof(_data.adUnitCustom != "undefined")) {

                if (typeof(_DataModel.mediaData != "undefined")) {


                        if (_DataModel.mediaData.un_creacion != "") {

                            un_creacion = _DataModel.mediaData.un_creacion + "_";
                            portal_creacion = (_DataModel.mediaData.portal_creacion != "") ? _DataModel.mediaData.portal_creacion + "_" : "";
                            seccion_creacion = _DataModel.mediaData.seccion_creacion;
                            CompareAdunit = un_creacion + portal_creacion + seccion_creacion;

                            for (var ad in _data.adUnitCustom) {

                                if (CompareAdunit == ad) {

                                    resultAdunit = _data.adUnitCustom[ad];
                                }
                            }
                        }


                }
            }


            if (typeof(_data.position[position]) != "undefined")
            {
                try{
                    _request = _data.position[position].request;
                    _returnUrl = _data.request[_request].src + "?";

                    var _vars = {};
                    for (j in _data.request[_request].vars)
                    {
                        _vars[j] = _data.request[_request].vars[j];
                    }

                    for(i in _vars){

                        /*Comprobamos si tiene customADunit si coincide lo sustituimos*/
                        if (resultAdunit != "" && i == "iu") {
                            _vars[i] = resultAdunit;

                        }

                        if((_vars[i] + "").match(/\$VARS/))
                        {
                            _fields = (_vars[i] + "").match(/\[[.]*[^\[]*\]/g);

                            for(j in _fields){
                                _field = _fields[j].replace("[","").replace("]","");
                                _vars[i] = _vars[i].replace("$VARS[" + _field + "]",vars[_field]);
                            }

                            if (_returnUrl.slice(-1) != "?"){_returnUrl += "&"}
                            _returnUrl += i + "=" + encodeURIComponent(_vars[i]);
                            //_returnUrl += "&" + i + "=" + encodeURIComponent(_vars[i]);

                        }
                        else if((_vars[i] + "").match(/\$RANDOM/)){
                            if (_returnUrl.slice(-1) != "?"){_returnUrl += "&"}
                            _returnUrl += i + "=" + (((((Math.random() + 1)*10000000000)%10000000000)|0) + "");
                            //_returnUrl += "&" + i + "=" + (((((Math.random() + 1)*10000000000)%10000000000)|0) + "");
                        }
                        else{
                            if (_returnUrl.slice(-1) != "?"){_returnUrl += "&"}
                            _returnUrl += i + "=" + encodeURIComponent(_vars[i]);
                            //_returnUrl += "&" + i + "=" + encodeURIComponent(_vars[i]);
                        }
                    }
                }
                catch (err){return undefined;}
            }
            else{return undefined;}

            return _returnUrl;
        };

        /**
         * Devuelve el tipo de controlador a partir de una posición de publicidad
         * @param position
         */
        this.getControllerByPos = function(position)
        {
            if (typeof(_data.position[position]) != "undefined")
            {
                try{
                    _request = _data.position[position].request;
                    _responseController = _data.request[_request].responseController;

                    _currentController = _responseController;
                }
                catch(err){return undefined;}
            }

			return _responseController;
        };

        this.getCarcasaByPos = function(position)
        {
            var _carcasaName, _carcasaConf;

            if ((typeof(_data.position[position]) != "undefined") && (typeof(_data.position[position].carcasa)!= "undefined"))
            {

                return _data.carcasa[_data.position[position].carcasa];
            }

            return undefined;
        };

        this.getCurrentPosition = function()
        {
            return _currentPos;
        };

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

    }
    
    // Incluimos la declaracion de la clase en el namespace emic.publicidad
    namespace.PubliModel = PubliModel;

}(emic.publicidad));(function(namespace) {
    
    // Inheritance class
    PubliManager.prototype = new psd.framework.EventDispatcher();

    /**
     * @constructor
     */
    function PubliManager()
    {

        PubliManager.CONTROLLER_IMA3_FLASH = "ima3_flash";
        PubliManager.CONTROLLER_IMA3_HTML5 = "ima3_html5";
        PubliManager.CONTROLLER_IMA3 = "ima3";

        // Super
        psd.framework.EventDispatcher.call(this);
                
        /**
         * className emic.publicidad.PubliManager
         */
        this.className = "emic.publicidad.PubliManager";

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//    

        var _publiModel;
        var _publiContainer;
        var _container;
        var _publiSettings;
        var _urlAdServer;
        var _controllerFactory;
        var _publiController;
        var _preloadController;
        var _id;
		var _urlBase;
        var _time;
        var _carcasa;
        var _confCarcasa
        var _intervalPubli;
        var _baseContainer;
        var _idContainerPubli;
        var _idContainerCarcasa;
        var _idBasePubliContainer;

        //CONSTANTES
        var _ID_BASE_PUBLI_CONTAINER = "basePubli_";
        var _ID_CONTAINER_PUBLI = "publi_";
        var _ID_CONTAINER_CARCASA = "carcasa_publi_";

        APIFRAMEWORK_VPAID = "VPAID";


        this.start = function(container, publiSettings, id, urlBase)
        {
            //TODO: Vaciar container
            //TODO: CRear container para el controller
            //TODO: Crear container para la carcasa

            _idBasePubliContainer = _ID_BASE_PUBLI_CONTAINER + id;
            _idContainerPubli = _ID_CONTAINER_PUBLI + id;
            _idContainerCarcasa = _ID_CONTAINER_CARCASA + id;

            _publiSettings = publiSettings;

            _container = document.getElementById(container);

            _baseContainer = document.createElement("div");
            _container.appendChild(_baseContainer);
            _baseContainer.setAttribute("id", _idBasePubliContainer);
            _baseContainer.setAttribute("class", "commonmm_baseExpand");


            //container publicidad
            _publiContainer = document.createElement("div");
            _baseContainer.appendChild(_publiContainer);
            _publiContainer.setAttribute("id", _idContainerPubli);
            _publiContainer.setAttribute("class", "commonmm_sonExpand_forceson");

			_urlBase = urlBase;

            if (id){
                _id =  id;
            }else{
                _id = Math.random() * 99999999999;
            }

            _controllerFactory = new emic.publicidad.controllers.PubliControllerFactory();

            _publiModel = new emic.publicidad.PubliModel(_publiSettings.urlConfPubli);
            _publiModel.addEventListener(emic.publicidad.events.PubliEvent.PUBLI_MODEL_COMPLETE, _onConfParserEvent, this);
            _publiModel.addEventListener(emic.publicidad.events.PubliEvent.PUBLI_MODEL_ERROR, _onConfParserEvent, this);
            _publiModel.init();

        };

        this.remainingTime = function()
        {
            _time = {};
            if (_publiController){_time = _publiController.remainingTime();}
            /*julian */
            if (_preloadController){_time = _preloadController.remainingTime();}
            //julian
            return _time;

        };

        this.resume = function()
        {
            if (_publiController){
                _publiController.resume();
            }
            /*julian*/
            if (_preloadController){
                _preloadController.resume();
            }
        };

        this.pause = function()
        {
            if (_publiController){
                _publiController.pause();
            }
            /*julian*/
            if (_preloadController){
                _preloadController.pause();
            }
        };

        /**
         *
         * @param offset Valor entre 0 y 1
         */
        this.setVolume = function(offset)
        {
            if (_publiController){_publiController.setVolume(offset);}
            /*julian*/
            if (_preloadController){_preloadController.setVolume(offset);}
            //julian
        };

        this.kill = function () {
            if (_publiController){
                _publiController.kill();
            }
            /*julian*/
            if (_preloadController){
                _preloadController.kill();
            }
        };

        this.closeAd = function()
        {
            if (_publiController){
                _publiController.closeAd();
            }
            //julian
            else if(_preloadController){
                _preloadController.closeAd();
            }
        }

        var _onConfParserEvent = function(evt)
        {
            switch(evt.type) {

                case emic.publicidad.events.PubliEvent.PUBLI_MODEL_COMPLETE:
                    this.dispatchEvent(new emic.publicidad.events.PubliEvent(emic.publicidad.events.PubliEvent.MANAGER_READY));
                    break;

                case emic.publicidad.events.PubliEvent.PUBLI_MODEL_ERROR:
                    this.dispatchEvent(new emic.publicidad.events.PubliEvent(emic.publicidad.events.PubliEvent.MANAGER_INIT_ERROR));

                    break;
            }

        };

        this.updateContentPublisher = function(prop, valor)
        {
            if (typeof(_publiController) != "undefined"){_publiController.updateContentPublisher(prop,valor);}
            /*julian*/
            if (typeof(_preloadController) != "undefined"){_preloadController.updateContentPublisher(prop,valor);}
        };

        this.preloadController = function (controller) {
            if (!_preloadController){
                _preloadController = _controllerFactory.getController(controller);
                _preloadController.addEventListener(emic.publicidad.events.PubliEvent.PUBLI_LOADED, onControllerEvent, this);
                _preloadController.addEventListener(emic.publicidad.events.PubliEvent.PUBLI_STARTED, onControllerEvent, this);
                _preloadController.addEventListener(emic.publicidad.events.PubliEvent.PUBLI_PAUSED, onControllerEvent, this);
                _preloadController.addEventListener(emic.publicidad.events.PubliEvent.PUBLI_RESUMED, onControllerEvent, this);
                _preloadController.addEventListener(emic.publicidad.events.PubliEvent.PUBLI_SKIPPED, onControllerEvent, this);
                _preloadController.addEventListener(emic.publicidad.events.PubliEvent.PUBLI_ENDED, onControllerEvent, this);
                _preloadController.addEventListener(emic.publicidad.events.PubliEvent.ALL_PUBLI_ENDED, onControllerEvent, this);
                _preloadController.addEventListener(emic.publicidad.events.PubliEvent.PUBLI_ERROR, onControllerEvent, this);
                _preloadController.addEventListener(emic.publicidad.events.PubliEvent.CONTENT_PAUSE_REQUESTED, onControllerEvent, this);
                _preloadController.addEventListener(emic.publicidad.events.PubliEvent.CONTENT_RESUME_REQUESTED, onControllerEvent, this);
                _preloadController.addEventListener(emic.publicidad.events.PubliEvent.CONTROLLER_LOADED, onControllerLoaded, this);
                _preloadController.handled = true;
                //_preloadController.addEventListener(emic.publicidad.events.PubliEvent.CONTROLLER_LOADED, onControllerLoaded, this);
            }

                _preloadController = _controllerFactory.getController(controller);
                _preloadController.addEventListener(emic.publicidad.events.PubliEvent.CONTROLLER_LOADED, onControllerLoaded, this);

            if (_publiSettings.objContentPublisher)
                _preloadController.objContentPublisher = _publiSettings.objContentPublisher;

            _preloadController.init(_idContainerPubli,_publiSettings.width, _publiSettings.height, _id,_urlBase);

        };

        this.notificaPubliOn = function(position, vars , data){
            _urlAdServer = _publiModel.getUrlByPos(position, vars, data);
            //una vez que obtengo la url la vamos a castear para quitar la declaración del protocolo
            _urlAdServer = castUrl(_urlAdServer);
            //_urlAdServer="https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dskippablelinear&correlator=";//--jacob campanna con aspa que siempre funciona
            //_urlAdServer="http://10.90.1.61:33399/psdmedia/media/top/tests/vast/vast_vpaid.xml"; //vpaid con pestaña
            //_urlAdServer="http://10.90.1.61:33399/psdmedia/media/top/tests/vast/vast_vpaid2.xml"; //vpaid que funciona

            /*En caso de tener una URL o VAST personalizado de PBS redirigimos la publicidad*/
            if (typeof(window.mm_AdServer) != 'undefined' && window.mm_AdServer != "") {

                _urlAdServer = mm_AdServer;
                //emic.top.debug('\n[PubliManager][*mm_AdServer: ', mm_AdServer ,']\n');
            }

            //No se permite la carga de posiciones si antes se ha iniciado una precarga
            if ((!_preloadController) && (typeof(_urlAdServer) != "undefined")){
                _publiController = _controllerFactory.getController(_publiModel.getControllerByPos(position));

                if (!_publiController.handled) {
                    _publiController.addEventListener(emic.publicidad.events.PubliEvent.PUBLI_LOADED, onControllerEvent, this);
                    _publiController.addEventListener(emic.publicidad.events.PubliEvent.PUBLI_STARTED, onControllerEvent, this);
                    _publiController.addEventListener(emic.publicidad.events.PubliEvent.PUBLI_PAUSED, onControllerEvent, this);
                    _publiController.addEventListener(emic.publicidad.events.PubliEvent.PUBLI_RESUMED, onControllerEvent, this);
                    _publiController.addEventListener(emic.publicidad.events.PubliEvent.PUBLI_SKIPPED, onControllerEvent, this);
                    _publiController.addEventListener(emic.publicidad.events.PubliEvent.PUBLI_ENDED, onControllerEvent, this);
                    _publiController.addEventListener(emic.publicidad.events.PubliEvent.ALL_PUBLI_ENDED, onControllerEvent, this);
                    _publiController.addEventListener(emic.publicidad.events.PubliEvent.PUBLI_ERROR, onControllerEvent, this);
                    _publiController.addEventListener(emic.publicidad.events.PubliEvent.CONTENT_PAUSE_REQUESTED, onControllerEvent, this);
                    _publiController.addEventListener(emic.publicidad.events.PubliEvent.CONTENT_RESUME_REQUESTED, onControllerEvent, this);
                    _publiController.addEventListener(emic.publicidad.events.PubliEvent.CONTROLLER_LOADED, onControllerLoaded, this);
                    _publiController.handled = true;
                }

                _publiController.init(_idContainerPubli,_publiSettings.width, _publiSettings.height, _id,_urlBase);
            }
            else if((_preloadController) && (typeof(_urlAdServer) != "undefined"))
            {
                //if (!_preloadController.handled) {
                    //_preloadController.addEventListener(emic.publicidad.events.PubliEvent.PUBLI_LOADED, onControllerEvent, this);
                    //_preloadController.addEventListener(emic.publicidad.events.PubliEvent.PUBLI_STARTED, onControllerEvent, this);
                    //_preloadController.addEventListener(emic.publicidad.events.PubliEvent.PUBLI_PAUSED, onControllerEvent, this);
                    //_preloadController.addEventListener(emic.publicidad.events.PubliEvent.PUBLI_RESUMED, onControllerEvent, this);
                    //_preloadController.addEventListener(emic.publicidad.events.PubliEvent.PUBLI_SKIPPED, onControllerEvent, this);
                    //_preloadController.addEventListener(emic.publicidad.events.PubliEvent.PUBLI_ENDED, onControllerEvent, this);
                    //_preloadController.addEventListener(emic.publicidad.events.PubliEvent.ALL_PUBLI_ENDED, onControllerEvent, this);
                    //_preloadController.addEventListener(emic.publicidad.events.PubliEvent.PUBLI_ERROR, onControllerEvent, this);
                    //_preloadController.addEventListener(emic.publicidad.events.PubliEvent.CONTENT_PAUSE_REQUESTED, onControllerEvent, this);
                    //_preloadController.addEventListener(emic.publicidad.events.PubliEvent.CONTENT_RESUME_REQUESTED, onControllerEvent, this);
                    //_preloadController.addEventListener(emic.publicidad.events.PubliEvent.CONTROLLER_LOADED, onControllerLoaded, this);
                    //_preloadController.handled = true;
                //}
                //_preloadController.init(_idContainerPubli,_publiSettings.width, _publiSettings.height, _id,_urlBase);
                _preloadController.loadPubli(_urlAdServer);
            }
            else{
                //TODO: Hacer más específico este error
                this.dispatchEvent(new emic.publicidad.events.PubliEvent(emic.publicidad.events.PubliEvent.PUBLI_ERROR));
            }
        };

        var castUrl = function(_url){
            if(typeof (_url)=="undefined"){
                return undefined;
            }

            if(_url.indexOf("http")!= -1){
                var arrayUrlBase;
                arrayUrlBase= _url.split("//");
                _url= "//" + arrayUrlBase[1];
            }
            return _url;
        }

		var onControllerLoaded = function(evt){
			if (_preloadController){
                _preloadController.removeEventListener(emic.publicidad.events.PubliEvent.CONTROLLER_LOADED, onControllerLoaded, this);
                //_preloadController = false;
                this.dispatchEvent(new emic.publicidad.events.PubliEvent(emic.publicidad.events.PubliEvent.CONTROLLER_LOADED));
            }else if (_publiController){
                _publiController.loadPubli(_urlAdServer);
            }
		};

        var onControllerEvent = function(evt)
        {


            switch(evt.type) {

                case emic.publicidad.events.PubliEvent.PUBLI_STARTED:

                    if (_publiController){_publiController.isSkipped(false);}
                    /*julian*/
                    if (_preloadController){_preloadController.isSkipped(false);}

                    //Sólo mostramos nuestra carcasa de publicidad cuando la campaña es de tipo Vpaid
                    if(evt.data.apiFramework == APIFRAMEWORK_VPAID) {
                        _confCarcasa = _publiModel.getCarcasaByPos(_publiModel.getCurrentPosition());
                    }


                    if(typeof(_confCarcasa) != "undefined")
                    {


                        if (typeof(_carcasa) == "undefined")
                        {
                            _carcasa = new emic.publicidad.Carcasa(_confCarcasa, _idBasePubliContainer);
                            _carcasa.addEventListener(emic.publicidad.events.PubliEvent.PUBLI_SKIPPED, onControllerEvent, this);
                            _carcasa.init();
                        }
                        else
                        {
                            _carcasa.setCarcasaVisible();
                        }

                        updateSkipPubli = function(){
                            if(typeof _publiController != "undefined") {/*julian*/
                                _carcasa.setProgress(Math.round(_publiController.remainingTime().currentTime) - 1, Math.round(_publiController.remainingTime().totalTime));
                            }
                            if(typeof _preloadController != "undefined") {/*julian*/
                                _carcasa.setProgress(Math.round(_preloadController.remainingTime().currentTime) - 1, Math.round(_preloadController.remainingTime().totalTime));
                            }
                        }

                        _intervalPubli = setInterval(updateSkipPubli,1000);
                    }

                break;

                case emic.publicidad.events.PubliEvent.ALL_PUBLI_ENDED:
                    if (_intervalPubli)clearInterval(_intervalPubli);
                break;

                case emic.publicidad.events.PubliEvent.PUBLI_ENDED:
                    if (_intervalPubli)clearInterval(_intervalPubli);
                    if (typeof(_carcasa) != "undefined") _carcasa.reset_skip();
                break;

                case emic.publicidad.events.PubliEvent.PUBLI_SKIPPED:
                    if (_intervalPubli) clearInterval(_intervalPubli);
                    if (_publiController)
                    {
                        //Incorporamos los siguientes valores ya que al hacer skipPubli con nuestra clase Carcasa, estos parámetros no los estábamos enviando.
                        evt.data.name = _publiController.getDataEvent().name;
                        evt.data.internalData = _publiController.getDataEvent().internalData;
                        evt.data.contentType = _publiController.getDataEvent().contentType;

                        _publiController.isSkipped(true);

                        //Nota: No quitar este dispatch, ya que tenemos que lanzar el evento de skip antes de el de close. Si lo quitamos, los eventos se
                        //lanzan al contrario y la gestión de eventos de estadísticas se haría incorrectamente.
                        this.dispatchEvent(evt); //Primero lanzamos evento y luego cerramos la publicidad

                        //julian
                        //vamos a cambiar el closeAd() por el stop, solo queremos parar la publi
                        //_publiController.closeAd();
                        _publiController.stopAd();

                    }
                    else if (_preloadController)//julian
                    {
                        //Incorporamos los siguientes valores ya que al hacer skipPubli con nuestra clase Carcasa, estos parámetros no los estábamos enviando.
                        evt.data.name = _preloadController.getDataEvent().name;
                        evt.data.internalData = _preloadController.getDataEvent().internalData;
                        evt.data.contentType = _preloadController.getDataEvent().contentType;

                        _preloadController.isSkipped(true);

                        //Nota: No quitar este dispatch, ya que tenemos que lanzar el evento de skip antes de el de close. Si lo quitamos, los eventos se
                        //lanzan al contrario y la gestión de eventos de estadísticas se haría incorrectamente.
                        this.dispatchEvent(evt); //Primero lanzamos evento y luego cerramos la publicidad

                        //julian
                        //vamos a cambiar el closeAd() por el stop, solo queremos parar la publi, no destruir
                        //_preloadController.closeAd();
                        _preloadController.stopAd();
                    }
                break;
            }

            if (evt.type != emic.publicidad.events.PubliEvent.PUBLI_SKIPPED)
            {
                this.dispatchEvent(evt);
            }

        };
		
        //NOTA: Parece que no hace falta matar la publicidad actual ya que la gestión la hace internamente el ima3
        this.notificaPubliOff = function(position, vars){}

        this.getCurrentPosition = function(){return _publiModel.getCurrentPosition();}

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//


    }
    
    // Incluimos la declaracion de la clase en el namespace emic.publicidad
    namespace.PubliManager = PubliManager;

}(emic.publicidad));/**
 * Created by dmena on 12/12/2014.
 */
(function (namespace){

    Carcasa.prototype = new psd.framework.EventDispatcher();
	
    function Carcasa(data, container){

        //CONSTANTS
        var TEXT_HEADER = "PUBLICIDAD";
        var TEXT_MESSAGE = "%s segundos para que comience el video";
        var TEXT_MESSAGE_SKIPPABLE = "%s segundos para saltar la publicidad";
        var TEXT_MESSAGE_SKIP = "Saltar anuncio";
        var TEXT_SECONDS_SKIP = 7;

        var _data = data;
		var _showed_skip = false;
		var _containerId = container;
		var _counter = null;
		var _btn_skip = null;
		var _title = null;
        var _skippable, _title_string,_message,_message_skippable,_message_skip,_seconds_skip,_css_title,_css_counter,_css_skip,_css_container, _container;
	
		var _css_default_title = {
				color: "white",
				top:"0px",
				left:"0px",
				fontFamily:"Arial",
                fontWeight: "bold",
                textAlign:"center",
                width: "100%",
                background:"#333"
			};
		var _css_default_counter = {
				color: "white",
				bottom:"5px",
				left:"5px",
				fontFamily:"Arial",
                fontSize:"12px",
                background:"#333"
			};
		var _css_default_skip = {
				color: "white",
				bottom:"5px",
				right:"5px",
				cursor:"pointer",
				fontFamily:"Arial",
                fontSize:"12px",
                background:"#333"
			};
	
        // Super
        psd.framework.EventDispatcher.call(this);

        this.init = function() {

            _skippable = (data.skippable != undefined)?data.skippable:false;
            _title_string = (data.titulo != undefined)?data.titulo:TEXT_HEADER;
            _message = (data.message!= undefined)?data.message:TEXT_MESSAGE;
            _message_skippable = (data.message_skippable!= undefined)?data.message_skippable:TEXT_MESSAGE_SKIPPABLE;
            _message_skip = (data.message_skip!= undefined)?data.message_skip:TEXT_MESSAGE_SKIP;
            _seconds_skip = (data.segundosSalto!= undefined)?data.segundosSalto:TEXT_SECONDS_SKIP;

            if (data.css != undefined)
            {
                _css_title = data.css.title;
                _css_counter = data.css.counter;
                _css_skip = data.css.skip;
                _css_container = data.css.container;
            }

			_container = document.getElementById(_containerId);
			
			for(i in _css_container){
				_container.style[i] = _css_container[i];
			}
			
			_counter = document.createElement("div");
            _counter.className = _counter.className + " mm_counter";
			_counter.style.position = "absolute";
			_apply_css(_counter,_css_counter,_css_default_counter);
			
			_btn_skip = document.createElement("div");
            _btn_skip.className = _btn_skip.className + " mm_message_skip";
			_btn_skip.innerHTML = _message_skip;
			_btn_skip.style.display = "none";
            _btn_skip.style.position = "absolute";
            _btn_skip.style.pointerEvents = "auto";
            _apply_css(_btn_skip,_css_skip,_css_default_skip);

            _btn_skip.onclick = _skipAd;

			_title = document.createElement("div");
            _title.className = _title.className + " mm_title_string";
			_title.innerHTML = _title_string;
			_title.style.position = "absolute";
			
			_apply_css(_title,_css_title,_css_default_title);
			
			_container.appendChild(_counter);
			_container.appendChild(_btn_skip);
			_container.appendChild(_title);
		};

        var _skipAd = (function(that){
            return function(){
                that.dispatchEvent(new emic.publicidad.events.PubliEvent(emic.publicidad.events.PubliEvent.PUBLI_SKIPPED));
                that.reset_skip.apply();
            };
        })(this);

		var _apply_css = function(element,css,css_default){
			var i;
            for(i in css_default){
				element.style[i] = css_default[i];
			}
			
			if(css!=undefined){
				for(i in css){
					element.style[i] = css[i];
				}			
			}
		};
		
		var _show_skip = function(){
			_btn_skip.style.display = "block";
			_counter.style.display = "none";
            _showed_skip = true;
		};

		//API
        this.reset_skip = function()
        {
            _btn_skip.style.display = "none";
            _counter.innerHTML = "";
            _counter.style.display = "block";
            _showed_skip = false;

            _container.style.visibility = "hidden"; //Ocultamos el contenedor porque cuando llegua el evento PUBLI_ERROR se muestra la carcasa durante unos segundos y se vuelve a ocultar.
        };

        this.setCarcasaVisible = function()
        {
            _container.style.visibility = "";
        };

        var CounterPubli=0;//--jacob saltar publi
        var NaNPubli=false;

        this.setProgress = function(elapsed,total){

            if (isNaN(elapsed)||isNaN(total)||(total<1)) {//--jacob

                CounterPubli++;
                //console.log("Counter=", CounterPubli, " Total=", _seconds_skip);
                elapsed = CounterPubli;
                total = _seconds_skip;
                NaNPubli=true;
            }

			if(_skippable){
				if((elapsed>=_seconds_skip)&&(!_showed_skip)){
					_show_skip();
				}else{
					_counter.innerHTML = _message_skippable.replace("%s",_seconds_skip - elapsed);
				}
			}
			else{
                if((elapsed>total)&&(!_showed_skip)){
                    _showed_skip = true;
                    if (NaNPubli) {
                        _show_skip()
                    }//-jacob
                }
                else{
                    if(!_showed_skip)
                        _counter.innerHTML = _message.replace("%s",total - elapsed);
                }
			}
		}
		
		this.setSecondsSkip = function(seconds){
			_seconds_skip = seconds;
		}
	}
    namespace.Carcasa = Carcasa;

})(emic.publicidad);(function(namespace) {

    // Inheritance class
    BasePubliController.prototype = new psd.framework.EventDispatcher();

    function BasePubliController()
    {
        // Super
        psd.framework.EventDispatcher.call(this);

        /**
         * className emic.publicidad.controllers.BasePubliController
         */
        this.className = "emic.publicidad.controllers.BasePubliController";

		this.isReady = false;

        //Indica si se están escuchando eventos de este controller desde PubliManager
        this.handled = false;

        this.objContentPublisher = {};
        this.objContentPublisher.currentTime;


        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        
        this.notifyPubliLoaded = function(){ this.dispatchEvent(new emic.publicidad.events.PubliEvent(emic.publicidad.events.PubliEvent.PUBLI_LOADED));};
        this.notifyPubliStarted = function (name, data, contentType, skippable, apiFramework) {
            var ev = new emic.publicidad.events.PubliEvent(emic.publicidad.events.PubliEvent.PUBLI_STARTED);
            ev.data.name = name;
            ev.data.internalData = data;
            ev.data.contentType = contentType;
            ev.data.skippable = skippable;
            ev.data.apiFramework = apiFramework;
            this.dispatchEvent(ev);
        };
        this.notifyPubliPaused = function(name, data, contentType)
        {
            var ev = new emic.publicidad.events.PubliEvent(emic.publicidad.events.PubliEvent.PUBLI_PAUSED);
            ev.data.name = name;
            ev.data.internalData = data;
            ev.data.contentType = contentType;
            this.dispatchEvent(ev);
        };
        this.notifyPubliResumed = function(name, data, contentType)
        {
            var ev = new emic.publicidad.events.PubliEvent(emic.publicidad.events.PubliEvent.PUBLI_RESUMED);
            ev.data.name = name;
            ev.data.internalData = data;
            ev.data.contentType = contentType;
            this.dispatchEvent(ev);
        };
        this.notifyPubliEnded = function(name, data, contentType) {
            var ev = new emic.publicidad.events.PubliEvent(emic.publicidad.events.PubliEvent.PUBLI_ENDED);
            ev.data.name = name;
            ev.data.internalData = data;
            ev.data.contentType = contentType;
            this.dispatchEvent(ev);
        };
        this.notifySkippedPubli = function(name, data, contentType) {
            var ev = new emic.publicidad.events.PubliEvent(emic.publicidad.events.PubliEvent.PUBLI_SKIPPED);
            ev.data.name = name;
            ev.data.internalData = data;
            ev.data.contentType = contentType;
            this.dispatchEvent(ev);
        };
        this.notifyAllPubliEnded = function(contentType)
        {
            var ev = new emic.publicidad.events.PubliEvent(emic.publicidad.events.PubliEvent.ALL_PUBLI_ENDED);
            ev.data.contentType = contentType;
            this.dispatchEvent(ev);
        };
        this.notifyPubliError = function(msg, code, data, vastcode){
            var ev = new emic.publicidad.events.PubliEvent(emic.publicidad.events.PubliEvent.PUBLI_ERROR);
            ev.data.code = code;
            ev.data.msg = msg;
            ev.data.internalData = data;
            ev.data.vastErrorCode = vastcode;
            this.dispatchEvent(ev);
        };
        this.notifyContentPauseRequested = function(){ this.dispatchEvent(new emic.publicidad.events.PubliEvent(emic.publicidad.events.PubliEvent.CONTENT_PAUSE_REQUESTED));};
        this.notifyContentResumeRequested = function(){ this.dispatchEvent(new emic.publicidad.events.PubliEvent(emic.publicidad.events.PubliEvent.CONTENT_RESUME_REQUESTED));};
		this.notifyControllerLoaded = function(name){
			this.isReady = true;
			this.dispatchEvent(new emic.publicidad.events.PubliEvent(emic.publicidad.events.PubliEvent.CONTROLLER_LOADED));
		};

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

		this.init = function(containerPubli, width, height, id){};

        this.kill = function(){};

        this.remainingTime = function(){};

        this.pause = function(){};

        this.resume = function(){};

        this.closeAd = function(){};

        this.setVolume = function(offset){};

		this.loadPubli = function(url){};

		this.requestAds = function(){};

        this.getDataEvent = function(){};

        this.updateContentPublisher = function(prop, valor)
        {
            this.objContentPublisher[prop] = valor;
        }
        //metodo agregado Julián
        this.stopAd = function(){};

    }

    // Incluimos la declaracion de la clase en el namespace emic.publicidad.controllers
    namespace.BasePubliController = BasePubliController;

})(emic.publicidad.controllers);(function(namespace) {

    // Inheritance class
    Ima3Controller.prototype = new emic.publicidad.controllers.BasePubliController();

    function Ima3Controller()
    {
		var _controller = null;
	
        // Super
        emic.publicidad.controllers.BasePubliController.call(this);

        /**
         * className emic.publicidad.controllers.Ima3Controller
         */
        this.className = "emic.publicidad.controllers.Ima3Controller";
		
        this.objContentPublisher = {};
        this.objContentPublisher.currentTime = undefined;

		var _createController = function(){
			//var controllerFactory = emic.publicidad.controllers.factory;
            var controllerFactory = new emic.publicidad.controllers.PubliControllerFactory();

            //NOTA: Detecta safari en Mac para servir la publicidad en html5
            var safariDetect = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

            //if (getDevice().mobile || !FlashDetect.installed || safariDetect)
				_controller =  controllerFactory.getController(emic.publicidad.PubliManager.CONTROLLER_IMA3_HTML5);
			//else
				//_controller = controllerFactory.getController(emic.publicidad.PubliManager.CONTROLLER_IMA3_FLASH);

            //"addListeners"
            if (!_controller.handled) {
                _controller.addEventListener(emic.publicidad.events.PubliEvent.PUBLI_STARTED, _controllerHandler, this);
                _controller.addEventListener(emic.publicidad.events.PubliEvent.PUBLI_PAUSED, _controllerHandler, this);
                _controller.addEventListener(emic.publicidad.events.PubliEvent.PUBLI_RESUMED, _controllerHandler, this);
                _controller.addEventListener(emic.publicidad.events.PubliEvent.PUBLI_ENDED, _controllerHandler, this);
                _controller.addEventListener(emic.publicidad.events.PubliEvent.PUBLI_SKIPPED, _controllerHandler, this);
                _controller.addEventListener(emic.publicidad.events.PubliEvent.ALL_PUBLI_ENDED, _controllerHandler, this);
                _controller.addEventListener(emic.publicidad.events.PubliEvent.PUBLI_LOADED, _controllerHandler, this);
                _controller.addEventListener(emic.publicidad.events.PubliEvent.PUBLI_ERROR, _controllerHandler, this);
                _controller.addEventListener(emic.publicidad.events.PubliEvent.CONTENT_PAUSE_REQUESTED, _controllerHandler, this);
                _controller.addEventListener(emic.publicidad.events.PubliEvent.CONTENT_RESUME_REQUESTED, _controllerHandler, this);
                _controller.addEventListener(emic.publicidad.events.PubliEvent.CONTROLLER_LOADED, _controllerHandler, this);
                _controller.handled = true;
            }
		};

		var _controllerHandler = function(event){
			//redispatch
			this.dispatchEvent(event);
		};
		
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

		this.init = function(containerPubli, width, height, id, urlBase){
            if (!_controller){
                _createController.apply(this);
			}
            _controller.init(containerPubli, width, height, id, urlBase);
		};

        this.kill = function () {
            if(_controller)
                _controller.kill();
        };

        this.remainingTime = function()
        {
            if(_controller)
                return _controller.remainingTime();
        }

		this.loadPubli = function(url){
			if(_controller)
				_controller.loadPubli(url);
		};

		this.requestAds = function(){
			if(_controller)
				_controller.requestAds();
		};

        this.pause = function()
        {
            if(_controller)
                _controller.pause();
        }

        this.resume = function()
        {
            if(_controller)
                _controller.resume();
        }

        this.setVolume = function(offset)
        {
            if(_controller)
                _controller.setVolume(offset);
        }

        this.closeAd = function()
        {
            if(_controller)
                _controller.closeAd();
        }

        this.getDataEvent = function()
        {
            if(_controller)
                return _controller.getDataEvent();
        }

        this.isSkipped = function(value)
        {
            if(_controller)
                _controller.isSkipped(value);
        }

        //método agregado julian
        this.stopAd = function(){
            if(_controller){
                _controller.stopAd();
            }
        }

    }

    // Incluimos la declaracion de la clase en el namespace emic.publicidad.controllers
    namespace.Ima3Controller = Ima3Controller;

})(emic.publicidad.controllers);(function(namespace) {
    
    // Inheritance class
    Ima3Html5Controller.prototype = new emic.publicidad.controllers.BasePubliController();


    /**
     * @constructor
     */
    function Ima3Html5Controller()
    {
        /**
         * className emic.publicidad.controllers.Ima3Html5Controller
         */
        this.className = "emic.publicidad.controllers.Ima3Html5Controller";

        // Super
        emic.publicidad.controllers.BasePubliController.call(this);

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//    
		
		var _adsManager;
		var _adsLoader;
		var _adDisplayContainer;
		var _durationTime;
        var _time;
        var _objTime;

		var _containerPubli;
		var _url;
		var _publi_width;
        var _publi_height;
        var _contentType;

		var _linearAdSlotWidth = 640;
		var _linearAdSlotHeight = 400;
		var _nonLinearAdSlotWidth = 640;
		var _nonLinearAdSlotHeight = 150;

        var _loaded = false;
        var _pendingRequest = false;
        var _pendingKill = false;

        var dataEvent = {};
        var _skipped = false;

        //  CONSTANTES
        var _LOAD_STATUS_LOADING = 1;
        var _LOAD_STATUS_NOT_LOADED = 0;
        var _LOAD_STATUS_LOADED = 2;
        var _IMA_LIB = "//s0.2mdn.net/instream/html5/ima3.js";


        _APIFRAMEWORK_VPAID = "VPAID";
        _AUDIO_MIMETYPE = "audio/mp4";
        _CONTENTTYPE_AUDIO = "audio";
        _CONTENTTYPE_VIDEO = "video";

        emic.miatajo = this;


		//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

		this.init = function(containerPubli, width, height, id, urlBase){
            if (_loaded == _LOAD_STATUS_NOT_LOADED){
                _loaded = _LOAD_STATUS_LOADING;
                _containerPubli = document.getElementById(containerPubli);
                _containerPubli.style.visibility = "hidden";

                //_publi_width = width;
                //_publi_height = height;
                _publi_width = _containerPubli.clientWidth;
                _publi_height = _containerPubli.clientHeight;


                //TODO: implementar timeout para esta petición
                emic.publicidad.PubliModel.loadDomDependence(_IMA_LIB, _onDependencesComplete, this)


            }else{
                if (_loaded == _LOAD_STATUS_LOADED)
                    this.notifyControllerLoaded();
            }
		};

        this.kill = function () {
            if (_loaded != _LOAD_STATUS_NOT_LOADED){
                if (_adDisplayContainer){
                    _adDisplayContainer.destroy();
                }else{
                    _pendingKill = true;
                }
            }
        };

        this.remainingTime = function()
        {
            _time = Number(_durationTime-_adsManager.getRemainingTime());
            _objTime = {};
            _objTime.currentTime = _time;
            _objTime.totalTime = _durationTime;

            return _objTime;
        };

        this.getDataEvent = function()
        {
            return dataEvent;
        };

        this.loadPubli = function(url)
        {
            if (_loaded == _LOAD_STATUS_LOADED){
                _url = url;
                //_url = "http://pubads.g.doubleclick.net/gampad/ads?ciu_szs=&correlator=[timestamp]&cust_params=paiskey%3Dalex_salmond_a%2Cindependencia_a%2Cindependentismo_a%2Cescocia_a%2Creino_unido_a%2Cconflictos_politicos_a%2Ceuropa_occidental_a%2Cideologias_a%2Ceuropa_a%2Cpolitica_a%2Celpais%2Cvideos%2Cagencia_reuters_live%26pos%3Dpre%26fpd%3Dvpaid&dt=1410939391675&env=vp&flash=11.8.800.94&frm=0&gdfp_req=1&ged=ta1_ve2_eb11_pt12.8.12_td12_tt1_pd1_bs10_tv1_is0_er421.302.781.942_sv2_sp1_vi228.0.989.1584_vp100_ct1_vb1_vl1_vr1&impl=s&iu=%2F7811748%2Foveron_player%2Felpais_web%2Fflash&osd=2&output=xml_vast2&scor=204212210237440&sdkv=3.0.155&sz=640x480&u_ah=856&u_asa=1&u_aw=1600&u_cd=24&u_h=900&u_his=3&u_java=true&u_nmime=109&u_nplug=13&u_tz=120&u_w=1600&unviewed_position_start=1&url=[referrer_url]";
                _adDisplayContainer.initialize();
                _requestAds.apply(this);
            }else{
                _pendingRequest = true;
            }

        };

        this.pause = function()
        {
            if (typeof (_adsManager) != "undefined"){_adsManager.pause();}
        }

        this.resume = function()
        {
            if (typeof (_adsManager) != "undefined"){_adsManager.resume();}
        }

        this.closeAd = function()
        {
            if (typeof (_adsManager) != "undefined"){_adsManager.stop();}
            if(typeof (_adDisplayContainer) != "undefined"){
                _adDisplayContainer.destroy();
                _createAdDisplayContainer.apply(this);
            }
        }

        this.setVolume = function(offset)
        {
            if (typeof (_adsManager) != "undefined"){_adsManager.setVolume(offset);}
        }

		var _onDependencesComplete = function() {

            /*cambiamos el idioma en funcion de lo que nos llega*/

            if (typeof(window.LANG) != "undefined") {
                google.ima.settings.setLocale(((window.LANG == "pt-br") ? "pt" : window.LANG));
            };

            if (!_pendingKill) {

                _createAdDisplayContainer.apply(this);
                _loaded = _LOAD_STATUS_LOADED;
                this.notifyControllerLoaded();
                if (_pendingRequest) {
                    _pendingRequest = false;
                    _requestAds.apply(this);
                }
            }else{
                _pendingKill = false;
                _loaded = _LOAD_STATUS_NOT_LOADED;
            }

		};
			
		var _onDependencesError = function() {
		};
		
		function _createAdDisplayContainer()
        {
            _adDisplayContainer = new google.ima.AdDisplayContainer(_containerPubli);
            // Este paso solo es necesario en dispositivos con iOS o Android.

            // Crear un cargador de anuncios.
            _adsLoader = new google.ima.AdsLoader(_adDisplayContainer);
            // Procesar eventos de error y del cargador de eventos, y darles una respuesta.
            _adsLoader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,_deferredOnAdsManagerLoaded,false);
            _adsLoader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR,_deferredOnAdError,false);
		}
		
        function _requestAds() {
			// Solicitar de anuncios de v�deo.
			var adsRequest = new google.ima.AdsRequest();

            adsRequest.adTagUrl = _url;
			adsRequest.adType = "video";
			
			// Especificar tama�os de espacios para anuncios lineales y no lineales. Esto ayuda al SDK a
			// seleccionar la creatividad correcta si se devuelven varias.
			adsRequest.linearAdSlotWidth = _linearAdSlotWidth;
			adsRequest.linearAdSlotHeight = _linearAdSlotHeight;
            adsRequest.nonLinearAdSlotWidth = _nonLinearAdSlotWidth;
			adsRequest.nonLinearAdSlotHeight = _nonLinearAdSlotHeight;
            //console.log(" Solicitar anuncios de vídeo.---- > _requestAds()");
            _adsLoader.requestAds(adsRequest);
            _adsLoader.contentComplete();
		}

		var _deferredOnAdsManagerLoaded = (function(that) {return function(adsManagerLoadedEvent) {onAdsManagerLoaded.apply(that, [adsManagerLoadedEvent]);}})(this);
        function onAdsManagerLoaded(adsManagerLoadedEvent)
        {
            // Obtener el administrador de anuncios.
			_adsManager = adsManagerLoadedEvent.getAdsManager(this.objContentPublisher);  // debe definirse en el elemento de v�deo del contenido.

			// A�adir procesadores a los eventos obligatorios.
            _adsManager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR,_deferredOnAdError);
            _adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,_deferredOnContentPauseRequested);
            _adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,_deferredOnContentResumeRequested);
            _adsManager.addEventListener(google.ima.AdEvent.Type.ALL_ADS_COMPLETED,_deferredOnAdEvent);
			
			// Procesar eventos adicionales (si resulta necesario).
            _adsManager.addEventListener(google.ima.AdEvent.Type.LOADED,_deferredOnAdEvent);
            _adsManager.addEventListener(google.ima.AdEvent.Type.STARTED,_deferredOnAdEvent);
            _adsManager.addEventListener(google.ima.AdEvent.Type.PAUSED,_deferredOnAdEvent);
            _adsManager.addEventListener(google.ima.AdEvent.Type.RESUMED,_deferredOnAdEvent);
            _adsManager.addEventListener(google.ima.AdEvent.Type.COMPLETE,_deferredOnAdEvent);
            _adsManager.addEventListener(google.ima.AdEvent.Type.SKIPPED,_deferredOnAdEvent);
            _adsManager.addEventListener(google.ima.AdEvent.Type.AD_METADATA,_deferredOnAdEvent);

			try {
                // Inicializar el administrador de anuncios. La lista de reproducci�n de reglas de anuncios se iniciar� en este momento.

                //NOTA: No podemos utilizar el _publi_width y _publi_height ya que es un valor dinámico dependiendo del dispositivo y se cambia después de llamar al resize.
                //A pesar de pasarle 100%, no aplicará este valor a la capa, ya que está esperando un valor en pixeles, con lo que forzaremos el 100% de la primera capa
                //que crea google a través de css.
                _adsManager.init("100%", "100%", google.ima.ViewMode.NORMAL);

                // Invocar el evento de reproducci�n para iniciar la visualizaci�n del anuncio. Los anuncios de v�deo y superposici�n �nicos
			    // se iniciar�n en este momento; la invocaci�n se ignorar� para las reglas de anuncios.
                //console.log("_adsManager.start();");
                _adsManager.start();
			} catch (adError) {
			  // Es posible que se genere un error si existe un problema con la respuesta de VAST.
			}
		}

        var _deferredOnAdEvent = (function(that) { return function(event) {onAdEvent.apply(that, [event]);}})(this);
		function onAdEvent(adEvent)
        {
            // Recuperar el anuncio del evento. Algunos eventos (p. ej. ALL_ADS_COMPLETED)
			// no cuentan con objetos de anuncios asociados.
			var ad = adEvent.getAd();

            switch (adEvent.type) {
			    case google.ima.AdEvent.Type.AD_METADATA:

				break;
                case google.ima.AdEvent.Type.LOADED:
                    // Este es el primer evento enviado para un anuncio; es posible
                    // determinar si el anuncio es de v�deo o de superposici�n.

                    this.notifyPubliLoaded();

                    if (!ad.isLinear()) {
                      // Colocar AdDisplayContainer correctamente para la superposici�n.
                      // Utilizar ad.width y ad.height.
                    }
				break;

                case google.ima.AdEvent.Type.STARTED:
                    // Este evento indica que el anuncio se ha iniciado; el reproductor de v�deo
                    // puede ajustar la interfaz de usuario, por ejemplo, mostrar un bot�n de detenci�n y
                    // el tiempo restante.
                    _durationTime = ad.getDuration();
                    if ((ad.getContentType() != _AUDIO_MIMETYPE) )
                    {
                        showPubliContainer();
                        _contentType = _CONTENTTYPE_VIDEO;
                    }
                    else
                    {
                        hidePubliContainer();
                        _contentType = _CONTENTTYPE_AUDIO;
                    }

                    dataEvent.name = ad.getTitle();
                    dataEvent.internalData = ad;
                    dataEvent.contentType = _contentType;

                    this.notifyPubliStarted(ad.getTitle(), ad, _contentType, ad.isSkippable());

				break;

			    case google.ima.AdEvent.Type.PAUSED:
                    this.notifyPubliPaused(ad.getTitle(), ad, _contentType);
                break;

			    case google.ima.AdEvent.Type.RESUMED:
                    this.notifyPubliResumed(ad.getTitle(), ad, _contentType);
                break;

			    case google.ima.AdEvent.Type.COMPLETE:
                    // Este evento indica que el anuncio ha finalizado; el reproductor de v�deo");
                    // puede realizar las acciones apropiadas de la interfaz de usuario, como suprimir el temporizador para
                    // detectar el tiempo restante.
                    if (!_skipped)
                    {
                        this.notifyPubliEnded(ad.getTitle(), ad, _contentType);
                    }
				break;

                case google.ima.AdEvent.Type.ALL_ADS_COMPLETED:
                    this.notifyAllPubliEnded(_contentType);
                break;

                case google.ima.AdEvent.Type.SKIPPED:
                    this.notifySkippedPubli(ad.getTitle(), ad, _contentType);
                    break;

			}
		}

        var _deferredOnAdError = (function(that) {return function(event) {onAdError.apply(that, [event]);}})(this);
		function onAdError(adErrorEvent) {
			// Gestionar el registro de errores.
            var er = adErrorEvent.getError();
            this.notifyPubliError(er.getMessage(), er.getErrorCode(), adErrorEvent, er.getVastErrorCode());
		}

        var _deferredOnContentPauseRequested = (function(that) {return function() {onContentPauseRequested.apply(that);}})(this);
		function onContentPauseRequested()
        {
            this.notifyContentPauseRequested();
		}

        var _deferredOnContentResumeRequested = (function(that) {return function() {onContentResumeRequested.apply(that);}})(this);
		function onContentResumeRequested()
        {
            this.notifyContentResumeRequested();
		}

        var showPubliContainer = function()
        {
            _containerPubli.style.visibility = "";

            //NOTA: No podemos utilizar el _publi_width y _publi_height ya que es un valor dinámico dependiendo del dispositivo y se cambia después de llamar al resize.
            //A pesar de pasarle 100%, no aplicará este valor a la capa, ya que está esperando un valor en pixeles, con lo que forzaremos el 100% de la primera capa
            //que crea google a través de css.
            //_adsManager.resize("100%", "100%", google.ima.ViewMode.NORMAL);
            //_adsManager.resize(_containerPubli.clientWidth, _containerPubli.clientHeight, google.ima.ViewMode.NORMAL);
        }

        var hidePubliContainer = function()
        {
            _containerPubli.style.visibility = "hidden";
        }

        this.isSkipped = function(value)
        {
            _skipped = value;
        }

        //julian
        this.stopAd = function()
        {
            if (typeof (_adsManager) != "undefined"){_adsManager.stop();}
        }

    }
    
    // Incluimos la declaracion de la clase en el namespace emic.publicidad.controllers
    namespace.Ima3Html5Controller = Ima3Html5Controller;

}(emic.publicidad.controllers));(function(namespace) {
    
    // Inheritance class
    Ima3FlashController.prototype = new emic.publicidad.controllers.BasePubliController();

    /**
     * @constructor
     */
    function Ima3FlashController()
    {

        /**
         * className emic.publicidad.controllers.Ima3FlashController
         */
        this.className = "emic.publicidad.controllers.Ima3FlashController";

        // Super
        emic.publicidad.controllers.BasePubliController.call(this);

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//    
		
		var _url;
        var _id;
        var _container;
		var _containerPubli;
		var _publi_width;
        var _publi_height;
		var _urlBase;
        var _objTime;
        var _skipped = false;

        var dataEvent = {};

        CONTENTTYPE_AUDIO = "audio";
        CONTENTTYPE_VIDEO = "video";

		//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//


		
		this.init = function(containerPubli, width, height, id, urlBase){
            _publi_width = width;
			_publi_height = height;
            _id = id;
            _updateThisShortcut.apply(this);
			_urlBase = urlBase;
			
			//element = document.getElementById("IMA");
			_containerPubli = document.getElementById(containerPubli);

			_createObject.apply(this);
		};

        this.kill = function () {
            //TODO: Parar publicidad
            if(_containerPubli)
            {
                while(_containerPubli.firstChild) {_containerPubli.removeChild(_containerPubli.firstChild);}
            }
        };

        this.remainingTime = function()
        {
            _objTime = {};
            _objTime.currentTime = _getFlashObject.apply(this).getTime().currentTime;
            _objTime.totalTime = _getFlashObject.apply(this).getTime().totalTime;

            return _objTime;

        };

        this.getDataEvent = function()
        {
            return dataEvent;
        };

        this.loadPubli = function(url)
        {
            this._url = url;
			this.requestAds();
		};

        this.resume = function()
        {
            try{
                _getFlashObject.apply(this).resume();
            }
            catch (err){
                //console.info(err);
            }
        }

        this.pause = function()
        {
            try{
                _getFlashObject.apply(this).pause();
            }
            catch (err){
                //console.info(err);
            }

        }

        this.setVolume = function(offset)
        {
            try{
                _getFlashObject.apply(this).setVolume(offset);
            }
            catch (err){
                //console.info(err);
            }
        }

        this.requestAds = function(){
            _updateThisShortcut.apply(this);
		
            try{
                _getFlashObject.apply(this).requestAdsJS(this._url);
            }
            catch (err){
				//console.info(err);
            }
        };

        var _updateThisShortcut = function(){
            emic["ima3flash_" + _id] = this;
        };

        var _getFlashObject = function(){
            return  document.getElementById("IMA3FlashController_" + _id);
        };

		var _createObject = function(){

            if (!this.isReady || psd.framework.ua.msie) {

                //Vaciamos el contenedor
                while(_containerPubli.firstChild) {_containerPubli.removeChild(_containerPubli.firstChild);}

                //Creamos una nueva capa para meter el flash dentro, ya que swfobj sustituye la capa por el objeto
                _container = document.createElement('div');
                _container.id = "IMA3FlashController_" + _id;
                _containerPubli.appendChild(_container);
                var defReady = (function(that){
					return function(e){
						_container = document.getElementById("IMA3FlashController_" + _id);

                        _container.style.width = "1px";
                        _container.style.height = "1px";

                        //that.notifyControllerLoaded();
					};				
				})(this);
			
            	var flashvars = {
                    id: _id
            	};
            	var params = {
                	menu: "false",
                	allowFullscreen: "true",
                	allowScriptAccess: "always",
                	bgcolor: "#000000",
                	wmode: "opaque",
                    scale:"noscale",
                    salign:"TL"
            	};
            	var attributes = {
                	id:_container.id
            	};
				
				var _URL_IMA3_FLASH_CONTROLLER = "/psdmedia/resources/swf/psd/IMA3FlashController.swf";
				var _URL_EXPRESS_INSTALL = "/player/bin/swf/expressInstall.swf";
				
				var urlFlashController = _urlBase ? (_urlBase + _URL_IMA3_FLASH_CONTROLLER) : _URL_IMA3_FLASH_CONTROLLER;
                var urlExpressInstall = _urlBase ? (_urlBase + _URL_EXPRESS_INSTALL) : _URL_EXPRESS_INSTALL;

                swfobject.embedSWF(
//                  "/psdmedia/resources/swf/psd/IMA3FlashController.swf",
                    urlFlashController,
                    _container.id, "100%", "100%", "10.0.0",
                	//"/static/javascript/IMA/bin/expressInstall.swf",
					//"/emicmedia/tests/publicidad/expressInstall.swf",
                    urlExpressInstall,
                	flashvars, params, attributes, defReady);

			}
			else {
                this.notifyControllerLoaded();
			}
        };


        var showPubliContainer = function()
        {
            _container.style.visibility = "";

            _container.style.width = "100%";
            _container.style.height = "100%";

        };

        var hidePubliContainer = function()
        {
            _container.style.visibility = "hidden";
        };

        /**
         * Call desde swf
         * @param type
         * @param name
         * @param contentType
         */
        this.adManagerHandlerSWF = function(type, name, contentType, skippable, apiFramework){

            //yes.core.log("tipo:", tipo);
            //TODO: Escuchar en el player un cambio en adSkippableState para habilitar el botón skip en futuras implementaciones de VAST 3.0.
            //Por el momento lo forzamos desde el player.

            switch (type){
                case "started":
                    //this.dispatchEvent(new emic.publicidad.events.PubliEvent(emic.publicidad.events.PubliEvent.PUBLI_STARTED));
                    if (contentType == CONTENTTYPE_VIDEO){showPubliContainer();}
                    else {hidePubliContainer();}

                    dataEvent.name = name;
                    dataEvent.internalData = {};
                    dataEvent.contentType = contentType;

                    this.notifyPubliStarted(name,{}, contentType, skippable,apiFramework);
                break;
                case "paused":
                    this.notifyPubliPaused(name,{}, contentType);
                break;
                case "resumed":
                    this.notifyPubliResumed(name,{}, contentType);
                break;
                case "skipped":
                    //this.dispatchEvent(new emic.publicidad.events.PubliEvent(emic.publicidad.events.PubliEvent.PUBLI_STARTED));
                    this.notifySkippedPubli(name, {}, contentType);
                break;
                case "completed":
                    //_saltaPubli.parentNode.style.display = "none";
                    //this.dispatchEvent(new emic.publicidad.PubliEvent(emic.publicidad.events.PubliEvent.PUBLI_ENDED));
                    if (!_skipped)
                    {
                        this.notifyPubliEnded(name,{}, contentType);
                    }
                break;
                case "allAdsCompleted":

					this.notifyAllPubliEnded(contentType);

                    //this.dispatchEvent(new emic.publicidad.PubliEvent(emic.publicidad.events.PubliEvent.ON_AD_POSITION_COMPLETE));
                break;
                case "contentPauseRequested":
                    //this.dispatchEvent(new emic.publicidad.PubliEvent(emic.publicidad.events.PubliEvent.ON_AD_PAUSE_REQ));//
					this.notifyContentPauseRequested();
                break;
                case "contentResumeRequested":
                    //this.dispatchEvent(new emic.publicidad.PubliEvent(emic.publicidad.events.PubliEvent.ON_AD_RESUME_REQ));//
					this.notifyContentResumeRequested();
                break;
				
            }
        };

        this.setAdSkippableStateSWF = function(flag){
            //yes.core.log("Skipable: ", flag);
            //Dejamos esto preparado para ocultar el Skip Publi cuando el adserver lo indique
            /**
            if (flag){
                _saltaPubli.style.display = "";
            }else{
                _saltaPubli.style.display = "none";
            }*/
        };

        this.adManagerHandlerErrorSWF = function (tipo, id, msg, code, vastcode) {
            //NOTA: Por alguna razon cuando llega error se pone la capa de publicidad visible, con lo que lo forzamos para que desaparezca
            _container.style.visibility = "";

            this.notifyPubliError(msg, code, tipo, vastcode);
        };

        this.adsLoaderErrorHandlerSWF = function (tipo, id, msg, code, vastcode) {
            //NOTA: Por alguna razon cuando llega error se pone la capa de publicidad visible, con lo que lo forzamos para que desaparezca
            _container.style.visibility = "";

            this.notifyPubliError(msg, code, tipo, vastcode);
        };

        this.onAdProgressSWF = function(progress){
            if (progress > 10){
                //_saltaPubli.parentNode.style.display = "";
            }
        };

        this.receivedFromJavaScript = function(){
        };

        var _skipAd = (function(that){
            return function(){
                that.dispatchEvent(new emic.publicidad.events.PubliEvent(emic.publicidad.events.PubliEvent.PUBLI_SKIPPED));
            };
            //_getFlashObject.apply(this).skipAdJS();
        })(this);

        /**
         * Call desde IMA.swf
         */
        this.readySWF = function(){
            //yes.core.log("Ready desde dentro");
            //_saltaPubli.onclick = _skipAd;
            this.notifyControllerLoaded();
        };

        this.closeAd = function(){
            try {
                _getFlashObject.apply(this).closeAdJS();
            }
            catch (e){
                //ERROR: Al acceder al objeto Flash
            }
        };

        this.stopAd = function () {
            try {
                _getFlashObject.apply(this).closeAdJS();
            }
            catch (e) {
                //ERROR: Al acceder al objeto Flash
            }
        };


        this.isSkipped = function(value)
        {
            _skipped = value;
        }

	}
    // Incluimos la declaracion de la clase en el namespace emic.publicidad.controllers
    namespace.Ima3FlashController = Ima3FlashController;

}(emic.publicidad.controllers));(function(namespace) {
    
    // Inheritance class
    PubliControllerFactory.prototype = new psd.framework.EventDispatcher();

    /**
     * @constructor
     */
    function PubliControllerFactory()
    {

        // Super
        psd.framework.EventDispatcher.call(this);
                
        /**
         * className emic.publicidad.controllers.PubliControllerFactory
         */
        this.className = "emic.publicidad.controllers.PubliControllerFactory";

        //Atajo para acceder desde fuera, requerido por controllador puente IMA3
        emic.publicidad.controllers.factory = this;

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//    

        var _controller;

        var _controllers = {};


        this.getController = function(controllerType)
        {
            var controller;

            if (_controllers[controllerType]){
                controller = _controllers[controllerType];
            }else{
                switch (controllerType)
                {

                    case emic.publicidad.PubliManager.CONTROLLER_IMA3_FLASH:
                        controller = new emic.publicidad.controllers.Ima3FlashController();
                        break;
                    case emic.publicidad.PubliManager.CONTROLLER_IMA3_HTML5:
                        controller = new emic.publicidad.controllers.Ima3Html5Controller();
                        break;
                    case emic.publicidad.PubliManager.CONTROLLER_IMA3:
                        controller = new emic.publicidad.controllers.Ima3Controller();
                        break;
                    default:
                        controller = new emic.publicidad.controllers.Ima3Controller();
                }

                _controllers[controllerType] = controller;
            }

            return controller;
        };

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

    }
    
    // Incluimos la declaracion de la clase en el namespace emic.publicidad.controllers
    namespace.PubliControllerFactory = PubliControllerFactory;

}(emic.publicidad.controllers));