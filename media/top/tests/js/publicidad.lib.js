(function(window) 
{
    // Generacion del namespace psd.framework
    if(window.emic==undefined) { window.emic = {}; }
    if(window.emic.publicidad==undefined) { window.emic.publicidad = {}; }
    if(window.emic.publicidad.events==undefined) { window.emic.publicidad.events = {}; }
    if(window.emic.publicidad.model==undefined) { window.emic.publicidad.model = {}; }
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
        PubliModel.IMA3HTML5CONTROLLER = "IMA3HTML5Controller"

        //CODE NUMBER PARSER
        CODE_NUM_PARSER_OK = 0;
        CODE_NUM_PARSER_ERROR = 1;

        var _urlConfPubli = urlConfPubli;
        var _currentPos;
		var _currentController;
        var _publiMediator;
		
		var _data;

        //Cargamos la url del confPubli
        var _init = function()
        {
            var _jsonParser = new psd.framework.parser.JSONParser();

            _publiMediator = new psd.framework.Mediator();
            _publiMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_COMPLETE, onDataComplete, this);
            _publiMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_ERROR, onDataError, this);
            _publiMediator.mediate(_urlConfPubli, _jsonParser, psd.framework.Mediator.RESPONSE_JSON);
        }

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
        }

        var onDataError = function (evt)
        {
            this.dispatchEvent(new emic.publicidad.events.PubliEvent(emic.publicidad.events.PubliEvent.PUBLI_MODEL_ERROR));
        }
        //EVENTOS MEDIATOR

        /**
         *
         * @param position
         * @param vars
         */
        this.getUrlByPos = function(position, vars)
        {
            _currentPos = position;

            if (typeof(_data.position[position]) != "undefined")
            {
                try{
                    _request = _data.position[position].request;
                    _returnUrl = _data.request[_request].src + "?";
                    _vars = _data.request[_request].vars;

                    for(i in _vars){
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
        }

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

        this.getCurrentPosition = function()
        {
            return _currentPos;
        }

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//


        _init.apply(this);
    }
    
    // Incluimos la declaracion de la clase en el namespace emic.publicidad.model
    namespace.PubliModel = PubliModel;

}(emic.publicidad.model));(function(namespace) {
    
    // Inheritance class
    PubliManager.prototype = new psd.framework.EventDispatcher();

    /**
     * @constructor
     */
    function PubliManager()
    {

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
        var _publiSettings;
        var _urlAdServer;
        var _controllerFactory;
        var _publiController;
        var _id;

        this.start = function(container, publiSettings, id)
        {
            //TODO: Vaciar container
            //TODO: CRear container para el controller
            //TODO: Crear container para la carcasa


            _publiContainer = container;
            _publiSettings = publiSettings;

            if (id){
                _id =  id;
            }else{
                _id = Math.random() * 99999999999;
            }

            _controllerFactory = new emic.publicidad.controllers.PubliControllerFactory();

            _publiModel = new emic.publicidad.model.PubliModel(_publiSettings.urlConfPubli);
            _publiModel.addEventListener(emic.publicidad.events.PubliEvent.PUBLI_MODEL_COMPLETE, _onConfParserEvent, this);
            _publiModel.addEventListener(emic.publicidad.events.PubliEvent.PUBLI_MODEL_ERROR, _onConfParserEvent, this);

        };

        this.kill = function () {
            if (_publiController)
                _publiController.kill();
        };

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
        };

        this.notificaPubliOn = function(position, vars)
        {
            _urlAdServer = _publiModel.getUrlByPos(position, vars);
			
            if (typeof(_urlAdServer) != "undefined")
            {

                _publiController = _controllerFactory.getController(_publiModel.getControllerByPos(position));


                if (!_publiController.handled) {
                    _publiController.addEventListener(emic.publicidad.events.PubliEvent.PUBLI_LOADED, onControllerEvent, this);
                    _publiController.addEventListener(emic.publicidad.events.PubliEvent.PUBLI_STARTED, onControllerEvent, this);
                    _publiController.addEventListener(emic.publicidad.events.PubliEvent.PUBLI_SKIPPED, onControllerEvent, this);
                    _publiController.addEventListener(emic.publicidad.events.PubliEvent.PUBLI_ENDED, onControllerEvent, this);
                    _publiController.addEventListener(emic.publicidad.events.PubliEvent.ALL_PUBLI_ENDED, onControllerEvent, this);
                    _publiController.addEventListener(emic.publicidad.events.PubliEvent.PUBLI_ERROR, onControllerEvent, this);
                    _publiController.addEventListener(emic.publicidad.events.PubliEvent.CONTENT_PAUSE_REQUESTED, onControllerEvent, this);
                    _publiController.addEventListener(emic.publicidad.events.PubliEvent.CONTENT_RESUME_REQUESTED, onControllerEvent, this);
                    _publiController.addEventListener(emic.publicidad.events.PubliEvent.CONTROLLER_LOADED, onControllerLoaded, this);
                    _publiController.handled = true;
                }
				_publiController.init(_publiContainer,_publiSettings.width, _publiSettings.height, _id);
            }
            else
            {
                this.dispatchEvent(new emic.publicidad.events.PubliEvent(emic.publicidad.events.PubliEvent.PUBLI_ERROR));
            }
        };

		var onControllerLoaded = function(evt){
			_publiController.loadPubli(_urlAdServer)
		};
		
        var onControllerEvent = function(evt)
        {
           this.dispatchEvent(evt);
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

}(emic.publicidad));(function(namespace) {

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
        this.handled = false
		
        this.objContentPublisher = {};
        this.objContentPublisher.currentTime = undefined;


        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
		
        this.notifyPubliLoaded = function(){ this.dispatchEvent(new emic.publicidad.events.PubliEvent(emic.publicidad.events.PubliEvent.PUBLI_LOADED));};
        this.notifyPubliStarted = function(name, data){
            var ev = new emic.publicidad.events.PubliEvent(emic.publicidad.events.PubliEvent.PUBLI_STARTED);
            ev.data.name = name;
            ev.data.internalData = data;
            this.dispatchEvent(ev);
        };
        this.notifyPubliEnded = function(name, data) {
            var ev = new emic.publicidad.events.PubliEvent(emic.publicidad.events.PubliEvent.PUBLI_ENDED);
            ev.data.name = name;
            ev.data.internalData = data;
            this.dispatchEvent(ev);
        };
        this.notifySkippedPubli = function(name, data) {
            var ev = new emic.publicidad.events.PubliEvent(emic.publicidad.events.PubliEvent.PUBLI_SKIPPED);
            ev.data.name = name;
            ev.data.internalData = data;
            this.dispatchEvent(ev);
        };
        this.notifyAllPubliEnded = function(){ this.dispatchEvent(new emic.publicidad.events.PubliEvent(emic.publicidad.events.PubliEvent.ALL_PUBLI_ENDED));};
        this.notifyPubliError = function(msg, code, data){
            var ev = new emic.publicidad.events.PubliEvent(emic.publicidad.events.PubliEvent.PUBLI_ERROR);
            ev.data.code = code;
            ev.data.msg = msg;
            ev.data.internalData = data;
            this.dispatchEvent(ev);
        };
        this.notifyContentPauseRequested = function(){ this.dispatchEvent(new emic.publicidad.events.PubliEvent(emic.publicidad.events.PubliEvent.CONTENT_PAUSE_REQUESTED));};
        this.notifyContentResumeRequested = function(){ this.dispatchEvent(new emic.publicidad.events.PubliEvent(emic.publicidad.events.PubliEvent.CONTENT_RESUME_REQUESTED));};
		this.notifyControllerLoaded = function(){
			this.isReady = true;
			this.dispatchEvent(new emic.publicidad.events.PubliEvent(emic.publicidad.events.PubliEvent.CONTROLLER_LOADED));
		};

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

		this.init = function(containerPubli, width, height, id){};

        this.kill = function(){};

		this.loadPubli = function(url){};

		this.requestAds = function(){};
		
        this.updateContentPublisher = function(prop, valor)
        {
            this.objContentPublisher[prop] = valor;
        }
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
		
			if(getDevice().mobile)
				_controller = new emic.publicidad.controllers.Ima3Html5Controller();
			else
				_controller = new emic.publicidad.controllers.Ima3FlashController();
				
		    if (_controller){
				//"addListeners"
				_controller.addEventListener(emic.publicidad.events.PubliEvent.MANAGER_READY, _controllerHandler, this);
				_controller.addEventListener(emic.publicidad.events.PubliEvent.PUBLI_STARTED, _controllerHandler, this);
				_controller.addEventListener(emic.publicidad.events.PubliEvent.PUBLI_ENDED, _controllerHandler, this);
				_controller.addEventListener(emic.publicidad.events.PubliEvent.PUBLI_SKIPPED, _controllerHandler, this);
				_controller.addEventListener(emic.publicidad.events.PubliEvent.ALL_PUBLI_ENDED, _controllerHandler, this);
				_controller.addEventListener(emic.publicidad.events.PubliEvent.PUBLI_LOADED, _controllerHandler, this);
				_controller.addEventListener(emic.publicidad.events.PubliEvent.PUBLI_ERROR, _controllerHandler, this);
				_controller.addEventListener(emic.publicidad.events.PubliEvent.PUBLI_MODEL_COMPLETE, _controllerHandler, this);
				_controller.addEventListener(emic.publicidad.events.PubliEvent.PUBLI_MODEL_ERROR, _controllerHandler, this);
				_controller.addEventListener(emic.publicidad.events.PubliEvent.CONTENT_PAUSE_REQUESTED, _controllerHandler, this);
				_controller.addEventListener(emic.publicidad.events.PubliEvent.CONTENT_RESUME_REQUESTED, _controllerHandler, this);
				_controller.addEventListener(emic.publicidad.events.PubliEvent.CONTROLLER_LOADED, _controllerHandler, this);
			}
		};

		var _controllerHandler = function(event){
			//redispatch
			this.dispatchEvent(event);
		};

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

		this.init = function(containerPubli, width, height, id){
			if (!_controller)
                _createController.apply(this);
			
			if(_controller){
				_controller.init(containerPubli, width, height, id);
			}
		};

        this.kill = function () {
            if(_controller)
                _controller.kill();
        };

		this.loadPubli = function(url){
			if(_controller)
				_controller.loadPubli(url);
		};

		this.requestAds = function(){
			if(_controller)
				_controller.requestAds();
		};
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
		var _intervalTimer;
		
		var _containerPubli;
		var _url;
		var _publi_width;
        var _publi_height;

		var _interval = 300;
		var _linearAdSlotWidth = 640;
		var _linearAdSlotHeight = 400;
		var _nonLinearAdSlotWidth = 640;
		var _nonLinearAdSlotHeight = 150;

        var _loaded = false;
        var _pendingRequest = false;
        var _pendingKill = false;

        //  CONSTANTES
        var _LOAD_STATUS_LOADING = 1;
        var _LOAD_STATUS_NOT_LOADED = 0;
        var _LOAD_STATUS_LOADED = 2;
        var _IMA_LIB = "http://s0.2mdn.net/instream/html5/ima3.js";



		//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

		this.init = function(containerPubli, width, height, id){
            if (_loaded == _LOAD_STATUS_NOT_LOADED){
                _loaded = _LOAD_STATUS_LOADING;
                _containerPubli = document.getElementById(containerPubli);

                _publi_width = width;
                _publi_height = height;

                var dependencesUrls = [];
                dependencesUrls.push(_IMA_LIB);

                var libraryParams = {depends: dependencesUrls
                    , success: _onDependencesComplete
                    , error: _onDependencesError
                    , scope: this
                };

                LibraryManager.load(libraryParams);
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



        this.loadPubli = function(url)
        {
            if (_loaded == _LOAD_STATUS_LOADED){
                _url = url;
                _requestAds.apply(this);
            }else{
                _pendingRequest = true;
            }

        };

		var _onDependencesComplete = function() {

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
            // Suponemos que adContainer es el ID de DOM del elemento que acogerá los anuncios.
			_adDisplayContainer = new google.ima.AdDisplayContainer(_containerPubli);
            // Este paso solo es necesario en dispositivos con iOS o Android.
            _adDisplayContainer.initialize();
            // Crear un cargador de anuncios.
            _adsLoader = new google.ima.AdsLoader(_adDisplayContainer);
            // Procesar eventos de error y del cargador de eventos, y darles una respuesta.
            _adsLoader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,_deferredOnAdsManagerLoaded,false);
            _adsLoader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR,_deferredOnAdError,false);



		}
		
        function _requestAds() {
			// Solicitar de anuncios de vídeo.
			var adsRequest = new google.ima.AdsRequest();
            adsRequest.adTagUrl = _url;
			adsRequest.adType = "video";
			
			// Especificar tamaños de espacios para anuncios lineales y no lineales. Esto ayuda al SDK a
			// seleccionar la creatividad correcta si se devuelven varias.
			adsRequest.linearAdSlotWidth = _linearAdSlotWidth;
			adsRequest.linearAdSlotHeight = _linearAdSlotHeight;
            adsRequest.nonLinearAdSlotWidth = _nonLinearAdSlotWidth;
			adsRequest.nonLinearAdSlotHeight = _nonLinearAdSlotHeight;
			_adsLoader.requestAds(adsRequest);

		}

		var _deferredOnAdsManagerLoaded = (function(that) {return function(adsManagerLoadedEvent) {onAdsManagerLoaded.apply(that, [adsManagerLoadedEvent]);}})(this);
        function onAdsManagerLoaded(adsManagerLoadedEvent)
        {
            // Obtener el administrador de anuncios.
			_adsManager = adsManagerLoadedEvent.getAdsManager(this.objContentPublisher);  // debe definirse en el elemento de vídeo del contenido.

			// Añadir procesadores a los eventos obligatorios.
            _adsManager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR,_deferredOnAdError);
            _adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,_deferredOnContentPauseRequested);
            _adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,_deferredOnContentResumeRequested);
            _adsManager.addEventListener(google.ima.AdEvent.Type.ALL_ADS_COMPLETED,_deferredOnAdEvent);
			
			// Procesar eventos adicionales (si resulta necesario).
            _adsManager.addEventListener(google.ima.AdEvent.Type.LOADED,_deferredOnAdEvent);
            _adsManager.addEventListener(google.ima.AdEvent.Type.STARTED,_deferredOnAdEvent);
            _adsManager.addEventListener(google.ima.AdEvent.Type.COMPLETE,_deferredOnAdEvent);
            _adsManager.addEventListener(google.ima.AdEvent.Type.SKIPPED,_deferredOnAdEvent);
            _adsManager.addEventListener(google.ima.AdEvent.Type.AD_METADATA,_deferredOnAdEvent);

			try {
			    // Inicializar el administrador de anuncios. La lista de reproducción de reglas de anuncios se iniciará en este momento.
                _adsManager.init(_publi_width, _publi_height, google.ima.ViewMode.NORMAL);
                // Invocar el evento de reproducción para iniciar la visualización del anuncio. Los anuncios de vídeo y superposición únicos
			    // se iniciarán en este momento; la invocación se ignorará para las reglas de anuncios.
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
                    // determinar si el anuncio es de vídeo o de superposición.

                    this.notifyPubliLoaded();

                    if (!ad.isLinear()) {
                      // Colocar AdDisplayContainer correctamente para la superposición.
                      // Utilizar ad.width y ad.height.
                    }
				break;

                case google.ima.AdEvent.Type.STARTED:
                    // Este evento indica que el anuncio se ha iniciado; el reproductor de vídeo
                    // puede ajustar la interfaz de usuario, por ejemplo, mostrar un botón de detención y
                    // el tiempo restante.

                    this.notifyPubliStarted(ad.getTitle(), ad);

                    if (ad.isLinear()) {
                      // En el caso de anuncios lineales, puede iniciarse un temporizador para realizar un sondeo del
                      // tiempo restante.
                      _intervalTimer = setInterval(function() {var remainingTime = _adsManager.getRemainingTime();},_interval); // Cada 300 milésimas de segundo
                    }
				break;

			    case google.ima.AdEvent.Type.COMPLETE:
                    // Este evento indica que el anuncio ha finalizado; el reproductor de vídeo
                    // puede realizar las acciones apropiadas de la interfaz de usuario, como suprimir el temporizador para
                    // detectar el tiempo restante.
                    this.notifyPubliEnded(ad.getTitle(), ad);
					
                    if (ad.isLinear()) {
                      clearInterval(_intervalTimer);
                    }
				break;

                case google.ima.AdEvent.Type.ALL_ADS_COMPLETED:
                    this.notifyAllPubliEnded();
                    break;

                case google.ima.AdEvent.Type.SKIPPED:
                    this.notifySkippedPubli(ad.getTitle(), ad);
                    break;

			}
		}

        var _deferredOnAdError = (function(that) {return function(event) {onAdError.apply(that, [event]);}})(this);
		function onAdError(adErrorEvent) {
			// Gestionar el registro de errores.
            var er = adErrorEvent.getError();
            this.notifyPubliError(er.getMessage(), er.getErrorCode(), adErrorEvent);
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
		var _containerPubli;
		var _publi_width;
        var _publi_height;

		//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//


		
		this.init = function(containerPubli, width, height, id){
            _publi_width = width;
			_publi_height = height;
            _id = id;
            _updateThisShortcut.apply(this);

			//element = document.getElementById("IMA");
			_containerPubli = document.getElementById(containerPubli);

			_createObject.apply(this);
		};

        this.kill = function () {
            //TODO: Parar publicidad
            if(_containerPubli)
            {
                while(_container.firstChild) {_container.removeChild(_container.firstChild);}
            }
        };

        this.loadPubli = function(url)
        {
			this._url = url;
			this.requestAds();
		};
		
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

			if (!this.isReady) {

                //Vaciamos el contenedor
                while(_containerPubli.firstChild) {_containerPubli.removeChild(_containerPubli.firstChild);}

                //Creamos una nueva capa para meter el flash dentro, ya que swfobj sustituye la capa por el objeto
                container = document.createElement('div');
                container.id = "IMA3FlashController_" + _id;
                _containerPubli.appendChild(container);

                var defReady = (function(that){
					return function(e){
						console.log("ready");
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
                	bgcolor: "",
                	wmode: "window"
            	};
            	var attributes = {
                	id:container.id
            	};
				
            	swfobject.embedSWF(
//                    "/psdmedia/resources/swf/psd/IMA3FlashController.swf",
                    "/psdmedia/resources/swf/psd/IMA3FlashController.swf",
                    container.id, _publi_width, _publi_height, "10.0.0",
                	//"/static/javascript/IMA/bin/expressInstall.swf",
					//"/emicmedia/tests/publicidad/expressInstall.swf",
                    "/player/bin/swf/expressInstall.swf",
                	flashvars, params, attributes, defReady);
			}
			else {
                this.notifyControllerLoaded();
			}
        };

        /**
         * Call desde swf
         * @param type
         * @param name
         */
        this.adManagerHandlerSWF = function(type, name){
            //yes.core.log("tipo:", tipo);
            //TODO: Escuchar en el player un cambio en adSkippableState para habilitar el botón skip en futuras implementaciones de VAST 3.0.
            //Por el momento lo forzamos desde el player.

            switch (type){
                case "started":
                    //this.dispatchEvent(new emic.publicidad.events.PubliEvent(emic.publicidad.events.PubliEvent.PUBLI_STARTED));
					this.notifyPubliStarted(name);
                break;
                case "skipped":
                    //this.dispatchEvent(new emic.publicidad.events.PubliEvent(emic.publicidad.events.PubliEvent.PUBLI_STARTED));
					this.notifySkippedPubli(name);
                break;
                case "completed":
                    //_saltaPubli.parentNode.style.display = "none";
                    //this.dispatchEvent(new emic.publicidad.PubliEvent(emic.publicidad.events.PubliEvent.PUBLI_ENDED));
					this.notifyPubliEnded(name);
                break;
                case "allAdsCompleted":
					this.notifyAllPubliEnded();
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

        this.adManagerHandlerErrorSWF = function(tipo, id){
            var ev = new emic.publicidad.events.PubliEvent();
            ev.type = emic.publicidad.events.PubliEvent.PUBLI_ERROR;
            ev.id = id;
            this.dispatchEvent(ev);
        };

        this.adsLoaderErrorHandlerSWF = function(tipo, id){
            var ev = new emic.publicidad.events.PubliEvent();
            ev.type = emic.publicidad.events.PubliEvent.PUBLI_ERROR;
            ev.id = id;
            this.dispatchEvent(ev);
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
            _getFlashObject.apply(this).closeAdJS();
        };

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

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//    

        CONTROLLER_IMA3_FLASH = "ima_flash";
        CONTROLLER_IMA3_HTML5 = "ima_html5";
		CONTROLLER_IMA3 = "ima3";

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

                    case CONTROLLER_IMA3_FLASH:
                        controller = new emic.publicidad.controllers.Ima3FlashController();
                        break;
                    case CONTROLLER_IMA3_HTML5:
                        controller = new emic.publicidad.controllers.Ima3Html5Controller();
                        break;
                    case CONTROLLER_IMA3:
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