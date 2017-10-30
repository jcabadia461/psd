mm_simple_compilation= "27-10-2017 12:43:47";
(function(window) 
{
    // Generacion del namespace psd.framework
    if(window.psd==undefined) { window.psd = {}; }
    if(window.psd.framework==undefined) { window.psd.framework = {}; }
    if(window.psd.framework.events==undefined) { window.psd.framework.events = {}; }
    if(window.psd.framework.parser==undefined) { window.psd.framework.parser = {}; }
    if(window.psd.framework.mediator==undefined) { window.psd.framework.mediator = {}; }
    if(window.psd.framework.mediator.jsonp==undefined) { window.psd.framework.mediator.jsonp = {}; }
    if(window.psd.framework.utils==undefined) { window.psd.framework.utils = {}; }
    
    window.psd.framework.debug = false;
    
    if(window.location.href.indexOf("debug")!=-1) { window.psd.framework.debug = true; }
    
})(window);(function()
{
    // Generacion del namespace psd.framework (por si no esta creado)
    if(window.psd==undefined) { window.psd = {}; }
    if(window.psd.framework==undefined) { window.psd.framework = {}; }

    /**
     * navigator.userAgent =>
     * Chrome:  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_7) AppleWebKit/534.24 (KHTML, like Gecko) Chrome/11.0.696.57 Safari/534.24"
     * Opera:   "Opera/9.80 (Macintosh; Intel Mac OS X 10.6.7; U; en) Presto/2.7.62 Version/11.01"
     * Safari:  "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_7; en-us) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1"
     * IE:      "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C)"
     * Firefox: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:2.0) Gecko/20100101 Firefox/4.0"
     * iPhone:  "Mozilla/5.0 (iPhone Simulator; U; CPU iPhone OS 4_3_2 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8H7 Safari/6533.18.5"
     * iPad:    "Mozilla/5.0 (iPad; U; CPU OS 4_3_2 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8H7 Safari/6533.18.5",
     * Android: "Mozilla/5.0 (Linux; U; Android 2.3.4; en-us; T-Mobile G2 Build/GRJ22) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1"
    */

    var ua = navigator.userAgent
        , t = true
        , ie = /msie/i.test(ua)
        , ie11 = /.NET/i.test(ua)
        , chrome = /chrome/i.test(ua)
        , safari = /safari/i.test(ua) && !chrome
        , iphone = /iphone/i.test(ua)
        , ipad = /ipad/i.test(ua)
        , android = /android/i.test(ua)
        , opera = /opera/i.test(ua)
        , firefox = /firefox/i.test(ua)
        , gecko = /gecko\//i.test(ua)
        , seamonkey = /seamonkey\//i.test(ua)
        , webkitVersion = /version\/(\d+(\.\d+)?)/i
        , o;

    checkWIN7orHigher = function(min){
		var ua = window.navigator.userAgent.match(/NT [0-9.]+/g);
		var version = "";

        if(ua==null)
            return false;

        ua = ua[0];

		for(i=0;i<ua.length;i++){
			if((!isNaN(ua[i]))||(ua[i]=="."))
				version+=ua[i];
		}
	
		version = parseFloat(version);
	
		if(version>=min)
			return true;
		else
			return false;
	}	
		
    //Sistema operativo
    var appVersion = window.navigator.userAgent
        , win7 = checkWIN7orHigher("6.1") //Windows NT 6.1/i.test(appVersion)
        , winVista = /Windows NT 6.0/i.test(appVersion)
        , ubuntu = /Ubuntu/i.test(appVersion)
        , linux = /Linux/i.test(appVersion)
        , oSX = /Mac OS X/i.test(appVersion);
		
    // Completa la información sobre el user agent
    function detect() 
    {
		if (ie11){ o = { msie: t, version: 11 }; }
        if (ie) { o = { msie: t, version: ua.match(/msie (\d+(\.\d+)?);/i)[1] }; }
       
        if (chrome) { o = { webkit: t, chrome: t, version: ua.match(/chrome\/(\d+(\.\d+)?)/i)[1]}; }
        
        if (iphone || ipad) 
        {
            o = {webkit: t, mobile: t, ios: t, iphone: iphone, ipad: ipad };
            // WTF: version is not part of user agent in web apps
            if (webkitVersion.test(ua)) { o.version = ua.match(webkitVersion)[1];}
        }
        
        if (android) { o = { webkit: t, android: t, mobile: t, version: "0"/*ua.match(webkitVersion)[1]*/ }; }
        
		if (safari) {  
			var aux = ua.match(webkitVersion);
			if (aux){
				o = { webkit: t, safari: t, version: aux[1] };
			}			
		}  
        
		if (opera) {  
			var aux = ua.match(webkitVersion);
			if (aux){
				o = { opera: t, version: aux[1] };
			}			
		}
        
        if (gecko) 
        {
            o = { gecko: t, mozilla: t, version: ua.match(/firefox\/(\d+(\.\d+)?)/i)[1] };
            if (firefox) { o.firefox = t; }
        }
        
        if (seamonkey) { o = { seamonkey: t, version: ua.match(/seamonkey\/(\d+(\.\d+)?)/i)[1] }; }
        
        return o;
    }
    
    // Completa la información sobre el modo de compatibilidad
    function detectCompatibility(ua)
    {
        if (ua.msie && ua.version<9) { return 1; }
        return 0;
    }

    function detectMp3AudioCompatible(ua){
        //explorer > 9
        if(ua.msie && ua.version>8) return true;
        if(chrome) return true;
        if (ua.safari && ua.version >= 3.1) return true;
        if ((ua.firefox && ua.version >= 21 && win7) || (ua.firefox && ua.version >= 22 && winVista) || (ua.firefox && ua.version >= 22 && oSX) || (ua.firefox && ua.version >= 22 && linux) || (ua.firefox && ua.version >= 22 && ubuntu)) return true;

        return false;
    }

    function detectMp4AudioCompatible(ua){

        return detectMp3AudioCompatible(ua);
    }

    function detectAacAudioCompatible(ua){

        return detectMp3AudioCompatible(ua);;
    }

    function detectMp4VideoCompatible(ua){
        //explorer > 9
        if(ua.msie && ua.version>8) return true;
        if(chrome) return true;
        if (ua.safari && ua.version >= 3.1) return true;
        if ((ua.firefox && ua.version >= 21 && win7) || (ua.firefox && ua.version >= 22 && winVista) || (ua.firefox && ua.version >= 22 && oSX) || (ua.firefox && ua.version >= 22 && linux) || (ua.firefox && ua.version >= 22 && ubuntu)) return true;

        return false;
    }

    function detectOggVideoCompatible(ua){
        if(chrome) return true;
        if (ua.firefox && ua.version >= 3.5) return true;
        if (ua.gecko && ua.version > 1.9) return true;
        if (ua.opera && ua.version >= 10.50) return true;

        return false;
    }

    function detectWebmVideoCompatible(ua){
        //explorer > 9
        if(chrome) return true;
        if (ua.firefox && ua.version >= 4.2) return true;
        if (ua.gecko && ua.version >= 2.0) return true;
        if (ua.opera && ua.version >= 10.60) return true;

        return false;
    }


    function detectAndroidNative(){

        var versionMin = 5.0;


        if (android && safari) {

            var nativeBrowser,
                compatible,
                androidVersion = ua.match(/Android\s(\d+(\.\d+)?)/i)[1];

            // Comprobamos si es navegador nativo
            if (!ie11 && !ie && !chrome && !opera && !gecko && !seamonkey) {

                nativeBrowser = true;

            } else {

                nativeBrowser = false;

            }

            //Comprobamos si la version de android es menor de versionMin
            if (nativeBrowser && androidVersion >= versionMin) {
                compatible = false;
            } else {
                compatible = true;
            }

            return {compatible: compatible, nativeBrowser: nativeBrowser, androidVersion: androidVersion};

        } else {

            return {compatible: false};
        }

    }

    // Inicializamos la información de user agent
    psd.framework.ua = detect();

    // Detectamos si ejecutamos con navegador nativo Android
    psd.framework.androidNativeBrowser = detectAndroidNative();

    
    // Detectamos el modo de compatibilidad
    psd.framework.compatibility = detectCompatibility(psd.framework.ua);

    psd.framework.mp3AudioCompatible = detectMp3AudioCompatible(psd.framework.ua);
    psd.framework.mp4AudioCompatible = detectMp4AudioCompatible(psd.framework.ua);
    psd.framework.aacAudioCompatible = detectAacAudioCompatible(psd.framework.ua);

    psd.framework.mp4VideoCompatible = detectMp4VideoCompatible(psd.framework.ua);
    psd.framework.oggVideoCompatible = detectOggVideoCompatible(psd.framework.ua);
    psd.framework.webmVideoCompatible = detectWebmVideoCompatible(psd.framework.ua);

})();function getDevice()
{
	var device = {};
            device.agent = navigator.userAgent;
            device.mobile = is_MobileDevice(device.agent);
		 
	return device;
}

function is_MobileDevice(agent)
{
    var isMobile = (
        (agent.indexOf('iPhone') != -1) ||
        (agent.indexOf('iPod') != -1) ||
		(agent.indexOf('iPad') != -1) ||
		(agent.indexOf('Android') != -1)
    );
    return isMobile;
}

// TODO - Externalizar utilidad de control de version de flash
var FlashDetect = new function(){
	var self = this;
	self.release = "1.0.2";
	self.installed = false;
	self.major = -1;
	self.minor = -1;
	self.revision = -1;
	self.revisionStr = "";
	self.activeXVersion = "";
	
	var activeXDetectRules = [
		{
			"name":"ShockwaveFlash.ShockwaveFlash.7",
			"version":function(obj){
				return getActiveXVersion(obj);
			}
		},
		{
			"name":"ShockwaveFlash.ShockwaveFlash.6",
			"version":function(obj){
				var version = "6,0,21";
				try{
					obj.AllowScriptAccess = "always";
					version = getActiveXVersion(obj);
				}catch(err){}
				return version;
			}
		},
		{
			"name":"ShockwaveFlash.ShockwaveFlash",
			"version":function(obj){
				return getActiveXVersion(obj);
			}
		}
	];
	
	var getActiveXVersion = function(activeXObj){
		var version = -1;
		try{
			version = activeXObj.GetVariable("$version");
		}catch(err){}
		return version;
	};
	
	var getActiveXObject = function(name){
		var obj = -1;
		try{
			obj = new ActiveXObject(name);
		}catch(err){}
		return obj;
	};
	
	var parseActiveXVersion = function(str){
		var versionArray = str.split(",");//replace with regex
		return {
			"major":parseInt(versionArray[0].split(" ")[1], 10),
			"minor":parseInt(versionArray[1], 10),
			"revision":parseInt(versionArray[2], 10),
			"revisionStr":versionArray[2]
		};
	};
	
	var parseRevisionStrToInt = function(str){
		return parseInt(str.replace(/[a-zA-Z]/g, ""), 10) || self.revision;
	};
	
	self.majorAtLeast = function(version){
		return self.major >= version;
	};
	
	self.FlashDetect = function(){
		if(navigator.plugins && navigator.plugins.length>0){
			var type = 'application/x-shockwave-flash';
			var mimeTypes = navigator.mimeTypes;
			if(mimeTypes && mimeTypes[type] && mimeTypes[type].enabledPlugin && mimeTypes[type].enabledPlugin.description){
				var desc = mimeTypes[type].enabledPlugin.description;
				var descParts = desc.split(' ');//replace with regex
				var majorMinor = descParts[2].split('.');
				self.major = parseInt(majorMinor[0], 10);
				self.minor = parseInt(majorMinor[1], 10); 
				self.revisionStr = descParts[3];
				self.revision = parseRevisionStrToInt(self.revisionStr);
				self.installed = true;
			}
		}else if(navigator.appVersion.indexOf("Mac")==-1 && window.execScript){
			var version = -1;
			for(var i=0; i<activeXDetectRules.length && version==-1; i++){
				var obj = getActiveXObject(activeXDetectRules[i].name);
				if(typeof obj == "object"){
					self.installed = true;
					version = activeXDetectRules[i].version(obj);
					if(version!=-1){
						var versionObj = parseActiveXVersion(version);
						self.major = versionObj.major;
						self.minor = versionObj.minor; 
						self.revision = versionObj.revision;
						self.revisionStr = versionObj.revisionStr;
						self.activeXVersion = version;
					}
				}
			}
		}
	}();
};(function(namespace) {
	
    // Statics const parametters
    Log.LEVEL_LOG = 0;
    Log.LEVEL_DEBUG = 1;
    Log.LEVEL_INFO = 2;
    Log.LEVEL_WARNING = 3;
    Log.LEVEL_ERROR = 4;
    Log.LEVEL_FATAL = 5;
	
    // Static public variables
    Log.enabled = true;
    Log.level = Log.LEVEL_LOG;

    // Static private const
    Log._LEVEL_LOG_NAME = "log";
    Log._LEVEL_DEBUG_NAME = "debug";
    Log._LEVEL_INFO_NAME = "info";
    Log._LEVEL_WARNING_NAME = "warning";
    Log._LEVEL_ERROR_NAME = "error";
    Log._LEVEL_FATAL_NAME = "fatal";
	
    // Static private variables
    Log._counter = 0;
		
    // Construct
    function Log() {
        throw "Log cannot be instantiated";
    }

    // Static public methods
    Log.log = function() {
        if (window.console && Log.enabled && arguments.length > 0) {
            if (Log.level <= Log.LEVEL_LOG) {
                _print(Log._LEVEL_LOG_NAME, Log._counter++, arguments);
            }
        }
    };
	
    Log.debug = function() {
        if (window.console && Log.enabled && arguments.length > 0) {
            if (Log.level <= Log.LEVEL_DEBUG) {
                _print(Log._LEVEL_DEBUG_NAME, Log._counter++, arguments);
            }
        }
    };
	
    Log.info = function() {
        if (window.console && Log.enabled && arguments.length > 0) {
            if (Log.level <= Log.LEVEL_INFO) {
                _print(Log._LEVEL_INFO_NAME, Log._counter++, arguments);
            }
        }
    };
	
    Log.warn = function() {
        if (window.console && Log.enabled && arguments.length > 0) {
            if (Log.level <= Log.LEVEL_WARNING) {
                _print(Log._LEVEL_WARNING_NAME, Log._counter++, arguments);
            }
        }
    };
	
    Log.error = function() {
        if (window.console && Log.enabled && arguments.length > 0) {
            if (Log.level <= Log.LEVEL_ERROR) {
                _print(Log._LEVEL_ERROR_NAME, Log._counter++, arguments);
            }
        }
    };
	
    Log.fatal = function() {
        if (window.console && Log.enabled && arguments.length > 0) {
            if (Log.level <= Log.LEVEL_FATAL) {
                _print(Log._LEVEL_FATAL_NAME, Log._counter++, arguments);
            }
        }
    };
	
    Log.clear = function() {
        Log._counter = 0;
    };
	
    // Static private methods
    function _print(type, counter, arguments) {
        var data = "";
        var i = 0;
        for (i=0; i < arguments.length; i++) {
            data += " " + (arguments[i]);
            data += i == arguments.length - 1 ? "" : ",";
        }
        if(psd.framework.debug) {console.log("[" + counter + "] " + type + " -> " + data);}
    }
	
    // Ad window context
    namespace.Log = Log;
	
}(window));(function(namespace) {

    /**
     * Clase base para todos los eventos
     * @constructor
     */
    function Event(type) {
        
        /**
         * Tipo de evento
         */
        this.type = type;
        
        /**
         * Objeto que produce el evento
         */
        this.target = null;
    }

    // Incluimos la declaracion de la clase en el namespace psd.framework
    namespace.Event = Event;

}(psd.framework));(function(namespace) {

    /**
     * Clase base para todas las clases que lanzan eventos
     * @constructor
     */
    function EventDispatcher() {
		
        // Mapa de listeners registrados
        var _eventListeners = {};
		
        /**
         * Registra un objeto para que pueda recibir notificaciones del evento deseado
         * @param type El tipo de evento
         * @param listener La funcion que procesa el evento
         * @param scope Scope opcional para la ejecución del listener. Si no se recibe,
         *              el listener se ejecutará dentro del contexto "window"
         */
        this.addEventListener = function(type, listener, scope) 
        {
            if (!_eventListeners[type]) { _eventListeners[type] = []; }            
            _eventListeners[type].push({listener: listener, scope: scope});
        };

        /**
         * Elimina un objeto para que deje de recibir notificaciones del evento deseado
         * @param type El tipo de evento
         * @param listener La funcion que procesa el evento
         * @param scope Scope opcional para la ejecución del listener. Si no se recibe,
         *              el listener se ejecutará dentro del contexto "window"
         */
        this.removeEventListener = function(type, listener, scope) 
        {
            var i = 0, 
                listeners = _eventListeners[type].length,
                eventListeners = [];
                
            for (i = 0; i < listeners; i++) 
            {
                if (_eventListeners[type][i].listener !== listener || _eventListeners[type][i].scope !== scope) { 
                    eventListeners.push(_eventListeners[type][i]);
                }
            }

            _eventListeners[type] = eventListeners;
        };
	
        /**
         * Dispara un evento
         * @param event El evento que se quiere disparar
         */
        this.dispatchEvent = function(event) 
        {
            var i = 0;
            if(typeof(event.type)!="undefined")
            {
                event.target = this;
                if (_eventListeners[event.type]) {
                    for (i = 0; i < _eventListeners[event.type].length; i++) {
                        _eventListeners[event.type][i].listener.apply(_eventListeners[event.type][i].scope, [event]);
                    }
                }
            }
        };

    }

    // Incluimos la declaracion de la clase en el namespace psd.framework
    namespace.EventDispatcher = EventDispatcher;

}(psd.framework));(function(namespace) {
    
    // Inheritance class
    ErrorEvent.prototype = new psd.framework.Event();
    
     /**
     * Clase base para todos los eventos de tipo Error
     * @constructor
     */
    function ErrorEvent(type, error) {
        
        psd.framework.Event.call(this, type);
        var errorValid = typeof(error) != "undefined" && error != null;
        
        /**
         * Id del error
         */
        this.id = errorValid && error.id ? error.id : "";
        
        /**
         * Mensaje asociado al error
         */
        this.message = errorValid && error.message ? error.message : "";
    }
    
    // Incluimos la declaracion de la clase en el namespace psd.framework
    namespace.ErrorEvent = ErrorEvent;

}(psd.framework));
(function(namespace) {
    
    // Inheritance class
    TimerEvent.prototype = new psd.framework.Event();

    /**
     * Define el valor de la constante TIMER
     */
    TimerEvent.TIMER = "timer";
    
    /**
     * Define el valor de la constante TIMER_COMPLETE
     */
    TimerEvent.TIMER_COMPLETE = "timerComplete";
    
    /**
     * Un objeto Timer dispara un TimerEvent cada vez que completa el intervalo 
     * de tiempo definido en la propiedad Timer.delay
     * @constructor
     */
    function TimerEvent(type) 
    {
        // Super
        psd.framework.Event.call(this, type);
    }
    
    // Incluimos la declaracion de la clase en el namespace psd.fenix	
    namespace.TimerEvent = TimerEvent;

})(psd.framework.events);(function(namespace) {

    // Inheritance class
    Mediator.prototype = new psd.framework.EventDispatcher();

    // Constants
    Mediator._REQUEST_OK_CODE = 200;
    Mediator._REQUEST_ERROR_CODE = 404;
    
    Mediator._STATE_REQUEST_NOT_INITIALIZED_CODE = 0;
    Mediator._STATE_SERVER_CONECTION_STABLISHED_CODE = 1;
    Mediator._STATE_REQUEST_RECEIVED_CODE = 2;
    Mediator._STATE_REQUEST_PROCESSING_CODE = 3;
    Mediator._STATE_REQUEST_FINISHED_CODE = 4;
    
    Mediator.REQUEST_GET  = "GET";
    Mediator.REQUEST_POST = "POST";
    Mediator.REQUEST_HEAD = "HEAD";
    
    Mediator.RESPONSE_TEXT = "text";
    Mediator.RESPONSE_XML = "xml";
    Mediator.RESPONSE_JSON = "json";
    Mediator.RESPONSE_JSONP = "jsonp";
    
    /**
     * ID autoincremental de las peticiones realizadas por este mediator
     */
    Mediator._nextID = 0;
    
    /**
     * Devuelve el siguiente id de peticion para este mediator
     */
    Mediator.getNextKey = function() {
        return Mediator._nextID++;
    };
	
    /**
     * Mediator es una clase generica que puede ser utilizada para interactuar
     * con servicios de datos de manera asincrona
     * @constructor
     */
    function Mediator() 
    {
        // Super
        psd.framework.EventDispatcher.call(this);
		
        // Id de la peticion actual
        var _id = "0";
        
        // Url de la peticion actual
        var _url = "";
        
        // Parser de la peticion actual
        var _parser = null;

        //Indica si se utilizará XDomainRequest en navegadores Explorer <= 9 para la carga Ajaz con CORS
        //Por defecto está inhabilidado debido a los problemas que ocasiona esta clase
        var _corsIE = false;

        // Tipo de respuesta de la peticion actual
        var _type = Mediator.RESPONSE_XML;
        
        // Referencia dinamica a la instancia para no perder el contexto dentro
        // de las respuestas asincronas del XMLHttpRequest
        var _mediatorInstance = this;

        //Nombre de la función que se llama en JSONP
        var _customJSONPCallback = null;
        //Parámetro que se pasará a la url para solicitar JSONP
        var _customCallbackParam = null;

        var _deferredJSONP = (function(mediator) {return function(data) {_jsonp.apply(mediator,[data]);}})(this);
        var _jsonp = function(responseData)
        {
            var parserResult = responseData,
                mediatorResult = new psd.framework.MediatorResult( psd.framework.MediatorResult.MEDIATOR_SUCCESS_CODE
                                                    , psd.framework.MediatorResult.MEDIATOR_SUCCESS
                                                    , parserResult );
                                                    
            _mediatorInstance.dispatchEvent(new psd.framework.MediatorEvent(psd.framework.MediatorEvent.MEDIATE_COMPLETE, _id, mediatorResult));
        };

        this.corsIE = function(value){
            if(value && value!=_corsIE) {_corsIE = value;}
            return _corsIE;
        };

        this.setCustomCallback = function(customCallback){
            _customJSONPCallback = customCallback;
        };

        /**
         * Inicia la mediacion solicitada
         * @param url La url de los datos
         * @param parser El parser que se utiliza para analizar la respuesta
         * @param type El tipo de respuesta (TEXT, XML, JSON)
         */
         this.mediate = function(url, parser, type) 
        {
            var xmlhttp, script,src, separator
                responseData = "",
                mediationID = Mediator.getNextKey();
            
            _id = "mediate_" + mediationID;
            _url = url;
            _parser = parser;
            if (type && (type == Mediator.RESPONSE_TEXT || 
                        type == Mediator.RESPONSE_XML || 
                        type == Mediator.RESPONSE_JSON ||
                        type == Mediator.RESPONSE_JSONP)) 
            {
                _type = type;
            }

            if(_type == Mediator.RESPONSE_JSONP)
            {
                script = document.createElement('script');
                script.setAttribute("type", "text/javascript");
                if (_customJSONPCallback){
                    script.setAttribute("src", url);
                    window[_customJSONPCallback] = _deferredJSONP;
                }else{
                    separator = (url.indexOf("?")>-1)? "&":"?";
                    script.setAttribute("src", url + separator + "jsonp=psd.framework.mediator.jsonp." + _id);
                    psd.framework.mediator.jsonp[_id] = _deferredJSONP;
                }
                document.getElementsByTagName("head")[0].appendChild(script);
            } else {

				if ((window.XDomainRequest) && _corsIE){ //IE 8, modo no estándar de realizar peticiones Ajax que soporten CORS
					xmlhttp = new XDomainRequest();
					xmlhttp.onerror = function(){
                        mediatorResult = new psd.framework.MediatorResult( psd.framework.MediatorResult.MEDIATOR_ERROR_CODE
                            , psd.framework.MediatorResult.MEDIATOR_ERROR
                            , null
                        );
                        _mediatorInstance.dispatchEvent(new psd.framework.MediatorEvent(psd.framework.MediatorEvent.MEDIATE_ERROR
                            , _id
                            , mediatorResult));
                    };
                    xmlhttp.onload = function(){

						//creación del xml a partir del string

                        switch (_type) {
                            case Mediator.RESPONSE_TEXT:
                                responseData = xmlhttp.responseText;
                                break;

                            case Mediator.RESPONSE_XML:
                                responseData = new ActiveXObject('Microsoft.XMLDOM');
                                responseData.async='false';
                                responseData.loadXML(xmlhttp.responseText);
                                break;

                            case Mediator.RESPONSE_JSON:
                                responseData = xmlhttp.responseText;
                                break;
                        }

						var parserResult = _parser.parse(responseData);
							mediatorResult = new psd.framework.MediatorResult( psd.framework.MediatorResult.MEDIATOR_SUCCESS_CODE
								, psd.framework.MediatorResult.MEDIATOR_SUCCESS
								, parserResult
								);
							_mediatorInstance.dispatchEvent(new psd.framework.MediatorEvent(psd.framework.MediatorEvent.MEDIATE_COMPLETE
																									, _id
																									, mediatorResult));
					}
				}else{

					// Code for Firefox, Chrome, Opera, Safari
					if (window.XMLHttpRequest) {
						xmlhttp = new XMLHttpRequest();
					}
					else { // code IE6 (no soporta CORS)
						xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
					}

					xmlhttp.onreadystatechange = function() {

						switch (xmlhttp.readyState) {
							case Mediator._STATE_REQUEST_NOT_INITIALIZED_CODE:
								break;

							case Mediator._STATE_SERVER_CONECTION_STABLISHED_CODE:
								break;

							case Mediator._STATE_REQUEST_RECEIVED_CODE:
								break;

							case Mediator._STATE_REQUEST_PROCESSING_CODE:
								break;

							case Mediator._STATE_REQUEST_FINISHED_CODE:
								var mediatorResult;

								if (xmlhttp.status == Mediator._REQUEST_OK_CODE) {
									switch (_type) {
										case Mediator.RESPONSE_TEXT:
											responseData = xmlhttp.responseText;
											break;

										case Mediator.RESPONSE_XML:
											responseData = xmlhttp.responseXML;
											break;

										case Mediator.RESPONSE_JSON:
											responseData = xmlhttp.responseText;
											break;
									}

									var parserResult = _parser.parse(responseData);
									mediatorResult = new psd.framework.MediatorResult( psd.framework.MediatorResult.MEDIATOR_SUCCESS_CODE
										, psd.framework.MediatorResult.MEDIATOR_SUCCESS
										, parserResult
										);
									_mediatorInstance.dispatchEvent(new psd.framework.MediatorEvent(psd.framework.MediatorEvent.MEDIATE_COMPLETE
																									, _id
																									, mediatorResult));
								}
								else {
									mediatorResult = new psd.framework.MediatorResult( psd.framework.MediatorResult.MEDIATOR_ERROR_CODE
										, psd.framework.MediatorResult.MEDIATOR_ERROR
										, null
										);
									_mediatorInstance.dispatchEvent(new psd.framework.MediatorEvent(psd.framework.MediatorEvent.MEDIATE_ERROR
																									, _id
																									, mediatorResult));
								}
								break;
						};
					};
				};

                xmlhttp.open(Mediator.REQUEST_GET, _url, true);
                xmlhttp.send();
            }
        };
		
        return _id;
    }
	
    // Incluimos la declaracion de la clase en el namespace psd.framework
    namespace.Mediator = Mediator;
	
}(psd.framework));(function(namespace) {
    
    // Inheritance class
    MediatorEvent.prototype = new psd.framework.Event();
    
    /**
     * La peticion ha concluido correctamente
     */
    MediatorEvent.MEDIATE_COMPLETE = "mediate_complete";
    
    /**
     * Ha sucedido un error durante la peticion
     */
    MediatorEvent.MEDIATE_ERROR = "mediate_error";
    
    /**
     * MediatorEvent es el evento general que todo Mediator dispara como resultado
     * de sus peticiones
     * @param type Tipo del evento
     * @param id Id de la peticion
     * @param mediatorResult Resultado de la peticion
     * @constructor
     */
    function MediatorEvent(type, id, mediatorResult) 
    {
        // Super
        psd.framework.Event.call(this, type);

        this.id = id;
        this.result = mediatorResult;
    }
	
    // Incluimos la declaracion de la clase en el namespace psd.framework
    namespace.MediatorEvent = MediatorEvent;

}(psd.framework));(function(namespace) {
	
    // Constants
    MediatorResult.MEDIATOR_SUCCESS_CODE = 0;
    MediatorResult.MEDIATOR_ERROR_CODE = 1;
    MediatorResult.MEDIATOR_SECURITY_ERROR = 2;
    MediatorResult.MEDIATOR_IO_ERROR = 3;
    
    MediatorResult.MEDIATOR_SUCCESS = "mediator_success";
    MediatorResult.MEDIATOR_ERROR = "mediator_error";
    MediatorResult.MEDIATOR_SECURITY_ERROR = "mediator_security_error";
    MediatorResult.MEDIATOR_IO_ERROR = "mediator_io_error";

    /**
     * MediatorResult es una clase que empaqueta de manera general el resultado
     * de una peticion a un servicio a traves de un Mediator
     * @param code Codigo de respuesta
     * @param msg Mensaje de respuesta
     * @param parserResult Resultado del parseo de los datos recibidos
     * @constructor
     */
    function MediatorResult(code, msg, parserResult) 
    {
        this.code = code;
        this.msg = msg;
        this.parserResult = parserResult;
    }
	
    // Incluimos la declaracion de la clase en el namespace psd.framework
    namespace.MediatorResult = MediatorResult;

}(psd.framework));(function(namespace) {

    /**
     * Parser es la clase basica de la que extiende cualquier Parser para el
     * tratamiento del resultado de una peticion de datos
     * @constructor
     */
    function Parser() {
		
        /**
         * Analiza los datos recibidos y los devuelve en el formato deseado. Por
         * defecto, el parser se limita a devolver los datos sin tratarlos.
         * @param data Los datos recibidos
         * @return Un ParserResult con el resultado del parseo
         */
        this.parse = function(data) 
        {
            return new psd.framework.ParserResult(psd.framework.ParserResult.PARSER_SUCCESS_CODE
                                                    , psd.framework.ParserResult.PARSER_SUCCESS
                                                    , data);
        };
    }
	
    // Incluimos la declaracion de la clase en el namespace psd.framework
    namespace.Parser = Parser;

}(psd.framework));(function(namespace) {

    // Inheritance class
    JSONParser.prototype = new psd.framework.Parser();

    /**
     * JSONParser es un parser para datos en formato JSON. Si está disponible, 
     * aplica la función nativa JSON.parse al resultado recibido.
     * @constructor
     */
    function JSONParser() {
        
        // Super
        psd.framework.Parser.call(this);

        /**
         * className psd.framework.parser.JSONParser
         */
        this.className = "psd.framework.parser.JSONParser";        
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

        /**
         * Convierte los datos recibidos en un objeto de js
         * @param data Los datos recibidos
         * @return Un ParserResult con el resultado del parseo
         */
        this.parse = function(data) 
        {
            var parserResult = new psd.framework.ParserResult(psd.framework.ParserResult.PARSER_ERROR_CODE
                                                        , psd.framework.ParserResult.PARSER_ERROR
                                                        , data);
                                                        
            if(typeof(JSON)!="undefined" && typeof(JSON.parse)!="undefined") {
                try {
                    if(typeof(data)=="object")
                        parserResult.result = data;
                    else
                        parserResult.result = JSON.parse(data);

                    parserResult.code = psd.framework.ParserResult.PARSER_SUCCESS_CODE;
                    parserResult.msg = psd.framework.ParserResult.PARSER_SUCCESS;
                }catch(err){ parserResult.msg = err.message; }
            }
            
            return parserResult;
        };
    }
	
    // Incluimos la declaracion de la clase en el namespace psd.framework
    namespace.JSONParser = JSONParser;

}(psd.framework.parser));(function(namespace) {
	
    // Constantes
    ParserResult.PARSER_SUCCESS_CODE = 0;
    ParserResult.PARSER_ERROR_CODE = 1;
    
    ParserResult.PARSER_SUCCESS = "parser_success";
    ParserResult.PARSER_ERROR = "parser_error";
    
    /**
     * ParserResult es la clase general que encapsula el resultado generado por
     * un Parser
     * @param code Codigo del resultado del parseo
     * @param msg Mensaje del resultado del parseo
     * @param parserResult Resultado del parseo
     * @constructor
     */
    function ParserResult(code, msg, parserResult) 
    {
        this.code = code;
        this.msg = msg;
        this.result = parserResult;
    }
	
    // Incluimos la declaracion de la clase en el namespace psd.framework
    namespace.ParserResult = ParserResult;

}(psd.framework));(function(namespace) {
	
	ObjectUtil.merge = function(obj1, obj2) {
            var obj3 = {};
            for (var attrName in obj1) { obj3[attrName] = obj1[attrName]; }
            for (var attrName in obj2) { obj3[attrName] = obj2[attrName]; }
            return obj3;
	}
        
	function ObjectUtil() {}

	// Add context window
	namespace.ObjectUtil = ObjectUtil;

}(psd.framework));(function(namespace) {
	
	StringUtil.trim = function trim(str) {
		return str.replace(/^\s+/g,'').replace(/\s+$/g,'');
	};
		
	function StringUtil() {}

	// Add context window
	namespace.StringUtil = StringUtil;

}(psd.framework));(function(namespace) {

    // Inheritance class
    Timer.prototype = new psd.framework.EventDispatcher();

    /**
     * Timer es una clase que permite ejecutar código siguiendo una determinada
     * secuencia temporal
     * @constructor
     */
    function Timer(delay, repeatCount) 
    {
        // Super
        psd.framework.EventDispatcher.call(this);
        
        /**
         * className psd.framework.utils.Timer
         */
        this.className = "psd.framework.utils.Timer";
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        
        // ID de la actual llamada setInterval
        var _intervalID = null;
        
        // Callback para los eventos de setinterval
        var _deferredIntervalCallback = (function(timer) {return function() {_intervalCallback.apply(timer);}})(this);
        var _intervalCallback = function()
        {
            _currentCount++;
            this.dispatchEvent(new psd.framework.events.TimerEvent(psd.framework.events.TimerEvent.TIMER));
            if(_repeatCount != 0)
            {
                if(_repeatCount == _currentCount)
                {
                    this.reset();
                    this.dispatchEvent(new psd.framework.events.TimerEvent(psd.framework.events.TimerEvent.TIMER_COMPLETE));
                }
            }
        };
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        
        /**
         * Número de veces que el timer se ha disparado desde que se inició
         */
        var _currentCount = 0;
        this.currentCount = function() { return _currentCount; };
        
        /**
         * El retardo, en milisegundos, entre eventos del timer
         */
        var _delay = delay!=undefined?delay:1000;
        this.delay = function(value)
        {
            if(value!=undefined && value>0) { _delay = value; }
            return _delay;
        };
        
        /**
         * El número total de repeticiones que debe ejecutarse el timer
         */
        var _repeatCount = repeatCount!=undefined?repeatCount:0;
        this.repeatCount = function(value)
        {
            if(value!=undefined && value>0) { _repeatCount = value; }
            return _repeatCount;
        };
        
        /**
         * El estado actual del timer.
         */
        var _running = false;
        this.running = function() { return _running; };
        
        /**
         * Ejecuta el timer si no está en marcha
         */
        this.start = function()
        {
            if(!_running)
            {
                _intervalID = setInterval(_deferredIntervalCallback, _delay);
                _running = true;
            }
        };
        
        /**
         * Detiene el timer
         */
        this.stop = function()
        {
            if(_running)
            {
                clearInterval(_intervalID);
                _running = false;
            }
        };
        
        /**
         * Detiene el timer si está en marcha y resetea la propiedad currentCount a 0
         */
        this.reset = function()
        {
            this.stop();
            _currentCount = 0;
        };
    }
	
    // Incluimos la declaracion de la clase en el namespace psd.framework.utils
    namespace.Timer = Timer;
	
}(psd.framework.utils));(function(namespace) {

    /**
     * Gestor de cargas de dependencias de javascript.
     * Permite la carga de múltiples dependencias simultáneas y una cola
     * de cargas para peticiones diferentes
     * @constructor
     */
    function LibraryManager() 
    {
        // Array de librerías ya cargadas por el gestor
        var _loadedDependencies = [];
        
        // Cola de carga
        var _loadingQueue = [];
        
        // Elemento de carga actual
        var _loading = null;
        
        // Dependencia de carga actual
        var _loadingDependency = null;
        
        /**
         * Carga librerias de manera dinamica
         * @param loadItem Elemento con información de la carga. Consta de:
         *          .depends: Array de dependencias a cargar
         *          .success: Callback para cuando se completa la carga correctamente
         *          .error: Callback para cuando falla la carga
         *          .scope: Scope a aplicar para las llamadas de los callbacks
         */
        this.load = function(loadItem) 
        {
            var itemValidation = _validateItem(loadItem);
            
            if(itemValidation!="") { if(psd.framework.debug) {console.log('Invalid load item: ' +itemValidation);} return; }
            
            if( _checkDependencies(loadItem.depends)) { loadItem.success.apply(loadItem.scope); }
            else{ _loadDependencies(loadItem); }
        };
        
        // Valida que un elemento que se quiere cargar es valido
        _validateItem = function(loadItem)
        {
            var validation = "";
            
            if(typeof(loadItem)=='undefined') { validation = "null loaditem"; }
            if(typeof(loadItem.depends)=='undefined') { validation = "null depends"; }
            if(loadItem.depends!=null && typeof(loadItem.depends)!='string' && typeof(loadItem.depends)!='object') { validation = "illegal depends type "+typeof(loadItem.depends); }
            if(typeof(loadItem.success)!='function') { validation = "success is not a function"; }
            if(typeof(loadItem.error)!='function') { validation = "error is not a function"; }
            
            // Si el elemento src es un unico string, lo convertimos en array
            if(typeof(loadItem.depends)=='string') { loadItem.depends = [loadItem.depends]; }
            
            return validation;
        };
        
        // Comprueba si una lista de dependencias ya ha sido cargada por completo
        _checkDependencies = function(dependencies)
        {
            var i, dependenciesReady = true;
         
            for(i in dependencies)
            {
                dependenciesReady = dependenciesReady && _checkDependency(dependencies[i]);
                if(!dependenciesReady) { break; }
            }
            
            return dependenciesReady;
        };
        
        // Comprueba si una depencia ya ha sido cargada
        _checkDependency = function(dependency)
        {
            var i;
            for(i in _loadedDependencies) { if(_loadedDependencies[i] == dependency) { return true; } }
            return false;
        };
                
        // Inicia la carga de una lista de dependencias
        _loadDependencies = function(loadingItem)
        {
            var i;
            
            if((_loading==null && _loadingQueue.length==0)||_loading==loadingItem)
            {
                _loading = loadingItem;

                if(_checkDependencies(loadingItem.depends)) { _dependencyLoaded(); }
                else{
                    for(i in loadingItem.depends)
                    {
                        if(!_checkDependency(loadingItem.depends[i])) { _loadDependency(loadingItem.depends[i]); break; }
                    }
                }
                
            }else{ _loadingQueue.push(loadingItem); }
        };
        
        // Inicia la carga de una dependencia
        _loadDependency = function(dependency)
        {
            if(psd.framework.debug) {console.log("loading dependency "+dependency);}  
            _loadingDependency = dependency;
            
            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');
            script.type = 'text/javascript';

            if (navigator.appName.indexOf("Microsoft") >= 0) {
                script.onreadystatechange = function() {
                    if (this.readyState == "loaded" ||
                        this.readyState == "complete") {
                        _dependencyLoaded();
                        script.onreadystatechange = null;
                    }
                };
            }
            else {
                script.onload = _dependencyLoaded;
            }
            
            script.src = _loadingDependency;

            head.appendChild(script);                        
        };
        
        // Detecta la carga completa de una dependencia y continua con el proceso
        // de carga de la lista de dependencias actual
        _dependencyLoaded = function()
        {
            if(psd.framework.debug) {console.log("successfully loaded dependency " + _loadingDependency);}
            _loadedDependencies.push(_loadingDependency);
            _loadingDependency = "";
            
            if(!_checkDependencies(_loading.depends)) { _loadDependencies(_loading); }
            else { 
                _loading.success.apply(_loading.scope); 
                _loading=null;
                
                if(_loadingQueue.length>0) 
                { 
                    _loading = _loadingQueue.shift();
                    _loadDependencies(_loading); 
                }
            }
        };
    }

    // Incluimos la declaracion de la clase en el namespace psd.framework
    namespace.LibraryManager = new LibraryManager();

}(window));(function(window) 
{
    // Generacion del namespace psd.media
    if(window.psd==undefined) { window.psd = {}; }
    if(window.psd.media==undefined) { window.psd.media = {}; }
    if(window.psd.media.skins==undefined) { window.psd.media.skins = {}; }
    if(window.psd.media.skins.generic==undefined) { window.psd.media.skins.generic = {}; }
    if(window.psd.media.wrappers==undefined) { window.psd.media.wrappers = {}; }

    if(window.emic==undefined) { window.emic = {}; }
    if(window.emic.top==undefined) { window.emic.top = {}; }

})(window);(function(namespace) {
    
    // Inheritance class
    SimpleMediaPlayer.prototype = new psd.framework.EventDispatcher();

    /**
     * Reproductor multimedia de uso generico. Permite la reproduccion tanto de 
     * contenido audio como video. Soporta ademas diferentes plataformas como
     * Brightcove o StreamTheWorld
     * @constructor
     */
    function SimpleMediaPlayer(settings) 
    {
        // Super
        psd.framework.EventDispatcher.call(this);
        
        /**
         * className psd.media.SimpleMediaPlayer
         */
        this.className = "psd.media.SimpleMediaPlayer";
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        
        // Libreria swfobject
        var _SWFOBJECT_LIBRARY = "/psdmedia/resources/js/ext/swfobject/swfobject.js";
        
        // Librería brightcove
        var _BRIGHTCOVE_EXPERIENCE_LIBRARY = "http://admin.brightcove.com/js/BrightcoveExperiences.js";
        
        
        // Post-fijo identificativo del container del player
        var _SIMPLE = "_simple";
        
        /**
         * Configuracion actual del reproductor
         */
        var _settings = settings;
        
        // Instancia responsable de la reproducción
        var _player = null;
        
        // Muestra un mensaje generico de error en el contenedor del reproductor
        var _showError = function ()
        {
            playerContainer.innerHTML = '<p>Ha sucedido un error inesperado. Por favor, vuelva a intentarlo m&aacute;s tarde.</p>';
        };
        
        // Limpia el contenedor del mediaplayer
        var _clearContainer = function()
        {
            var playerContainer = document.getElementById(_settings.player.container);
            
            if(playerContainer)
            {
                while(playerContainer.firstChild) {playerContainer.removeChild(playerContainer.firstChild);}
            }
        };
        
        // Inserta el reproductor flash
        var _embedSWF = function () {
            _player = new psd.media.wrappers.FlashMediaPlayerWrapper(_settings);
            _addListeners.apply(this);
        };
        
        // Inserta el reproductor de HTML5        
        var _embedHTML5 = function() {
            _player = new psd.media.wrappers.HTML5MediaPlayerWrapper(_settings);
            _addListeners.apply(this);
        };
        
        // Inserta el reproductor de brightcove para HTML5
        var _embedBrightcoveHTML5 = function() {
            _player = new psd.media.wrappers.BCMediaPlayerWrapper(_settings);
            _addListeners.apply(this);
        };
        
        // 
        var _addListeners = function() {
            _player.addEventListener(psd.media.MediaEvent.INITIALIZED, _onPlayerEvent, this);      
            _player.addEventListener(psd.media.MediaEvent.MEDIA_BEGIN, _onPlayerEvent, this);
            _player.addEventListener(psd.media.MediaEvent.MEDIA_START, _onPlayerEvent, this);
            _player.addEventListener(psd.media.MediaEvent.MEDIA_STOP, _onPlayerEvent, this);
            _player.addEventListener(psd.media.MediaEvent.MEDIA_FIRST_QUART, _onPlayerEvent, this);            
            _player.addEventListener(psd.media.MediaEvent.MEDIA_HALF, _onPlayerEvent, this);
            _player.addEventListener(psd.media.MediaEvent.MEDIA_THIRD_QUART, _onPlayerEvent, this);
            _player.addEventListener(psd.media.MediaEvent.MEDIA_COMPLETE, _onPlayerEvent, this);            
            _player.addEventListener(psd.media.MediaEvent.MEDIA_PREVIOUS, _onPlayerEvent, this);
            _player.addEventListener(psd.media.MediaEvent.MEDIA_NEXT, _onPlayerEvent, this);
            _player.addEventListener(psd.media.MediaEvent.AD_START, _onPlayerEvent, this);
            _player.addEventListener(psd.media.MediaEvent.AD_SKIP, _onPlayerEvent, this);            
            _player.addEventListener(psd.media.MediaEvent.AD_COMPLETE, _onPlayerEvent, this);      
            _player.addEventListener(psd.media.MediaEvent.CUEPOINT_DATA, _onPlayerEvent, this); 
            _player.addEventListener(psd.media.MediaEvent.ESTADO_BUFFER_FULL, _onPlayerEvent, this); 
            _player.addEventListener(psd.media.MediaEvent.ESTADO_BUFFER_EMPTY, _onPlayerEvent, this); 
            _player.addEventListener(psd.media.MediaEvent.MEDIA_PROGRESS, _onPlayerEvent, this); 
            _player.addEventListener(psd.media.MediaEvent.AD_COMPANION_ON, _onPlayerEvent, this);      
            _player.addEventListener(psd.media.MediaEvent.AD_COMPANION_OFF, _onPlayerEvent, this);  
        };
        
        /***********************************/
        /*      EVENTOS DE REPRODUCCION    */
        /*                                 */
        /* onMediaBegin()                  */
        /* onMediaComplete()               */
        /* onCuePointData()                */
        /*                                 */
        /***********************************/

        //
        var _onPlayerEvent = function(evt) {

            evt.data = evt.data || {};

            evt.data.name = _settings.media.title;
            evt.data.idTop = _settings.id;

            if (_settings.extra !== undefined) {

                if (_settings.extra.description !== undefined) {

                    evt.data.playerName = _settings.extra.description;
                }
            }

            evt.data.mediaType = (_settings.media.live) ? "streaming" : (_settings.media.type.indexOf("video") != -1) ? "vod" : "aod";
            evt.data.mediaTypeMode = (_settings.ws.mediaType.indexOf("video") != -1) ? "video" : "audio";
            evt.data.progressTime = (parseInt(evt.data.time) == 0) ? "0" : parseInt(evt.data.time);
            evt.data.live = _settings.media.live;
            evt.data.topPageTitle = encodeURIComponent(window.document.location.href);
            evt.data.trafficsource = encodeURIComponent(window.document.referrer);
            evt.data.agency = "propio";

        this.dispatchEvent(evt);

        };

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

        /**
         * Reinicia la reproduccion (FLASH ONLY)
         */
        this.play = function() {if(typeof(_player)!="undefined" && _player!=null) {_player.play();}};

        /**
         * Pausa la reproduccion (FLASH ONLY)
         */
        this.pause = function() {if(typeof(_player)!="undefined" && _player!=null) {_player.pause();}};

        /**
         *
         */
        this.requestFullScreen = function() 
        {
            if(typeof(_player)!="undefined" && _player!=null )
            {
                _player.requestFullScreen();
            }
        };
        
        /**
         *
         */
        this.cancelFullScreen = function()
        {
            if(typeof(_player)!="undefined" && _player!=null )
            {
                _player.cancelFullScreen();
            }        
        };
        
        
        /**
         *
         */
        this.requestTheatreMode = function() 
        {
            if (typeof(_player)!="undefined" && _player!=null)
            {
                document.getElementById(_settings.id + _SIMPLE).setAttribute("class", "theatre");
            } 
        };
        
        
        /**
         *
         */
        this.cancelTheatreMode = function() 
        {
            if (typeof(_player)!="undefined" && _player!=null) 
            {
                document.getElementById(_settings.id + _SIMPLE).removeAttribute("class");
            }
        };
        
        
        /**
         * Indica el estado de reproducción del player
         * @returns Un boolean indicando si el contenido se está reproduciendo o no
         */
        this.isPlaying = function() 
        {
            var playing = false;
            
            // Obtenemos el estado de reproducción a partir de las APIS isPlaying() para
            // los reproductores flash de psd y paused para los reproductores html5
            if(_player!=null && typeof(_player)!="undefined")
            {
                try {if(typeof(_player.isPlaying)!="undefined") {playing = _player.isPlaying();}}catch(err){}
                try {if(typeof(_player.paused)!="undefined") {playing = !_player.paused;}}catch(err){}
            }
            
            return playing;
        };
        
        /**
         * SetVolume
         */
        this.setVolume = function(volume){if(typeof(_player)!="undefined" && _player!=null) {_player.volume(volume);}};
        
         /**
         * SetMute
         */
        this.setMute = function(){if(typeof(_player)!="undefined" && _player!=null) {_player.mute();}};
       
        /**
         * setAvance
         */
        //this.setAvance = function(position){if(typeof(_player)!="undefined" && _player!=null) {_player.setAvance(position);}};
        this.setCurrentTime = function(position){if(typeof(_player)!="undefined" && _player!=null) {_player.currentTime(position);}};
        
        /**
         *
         */
        this.setProgressEvent = function(value)
        {
            if(typeof(_player)!="undefined" && _player!=null){_player.setProgressEvent(value);};
        };
        
        /**
         * Carga un nuevo elemento (FLASH ONLY)
         */
        this.load = function(mediaItem)
        {
            var cdnParam, mediaObject = {};
            
            if(typeof(mediaItem)!="undefined")
            {
                // Datos de media
                if(typeof(mediaItem.type)!="undefined") {
                    mediaObject.mediaType = mediaItem.type;
                }
                if(typeof(mediaItem.title)!="undefined") {
                    mediaObject.mediaTitle = mediaItem.title;
                }
                if(typeof(mediaItem.desc)!="undefined") {
                    mediaObject.mediaDescription = mediaItem.desc;
                }
                if(typeof(mediaItem.poster)!="undefined") {
                    mediaObject.poster = mediaItem.poster;
                }
                if(typeof(mediaItem.src)!="undefined") {
                    mediaObject.mediaSrc = mediaItem.src;
                }
                if(typeof(mediaItem.srcHtml5)!="undefined") {
                    mediaObject.mediaSrcHtml5 = mediaItem.srcHtml5;
                }

                if(typeof(mediaItem.live)!="undefined") {
                    mediaObject.mediaLive = mediaItem.live;
                }

                //Renditions
                if (typeof(mediaItem.renditions)!="undefined")
                {
                    var renditions = "";
                    for(var i=0; i<mediaItem.renditions.length; i++)
                    {
                        if (i == mediaItem.renditions.length - 1){renditions += mediaItem.renditions[i]}
                        else {renditions += mediaItem.renditions[i] + ",";}
                    }
                    mediaObject.renditions = renditions;
                }

                // Datos de cdn
                if(typeof(mediaItem.cdn)!="undefined")
                {
                    for(cdnParam in mediaItem.cdn)
                    {
                        mediaObject["cdn_" + cdnParam] = mediaItem.cdn[cdnParam];
                    }
                }
            }
            
            if(typeof(_player)!="undefined" && _player!=null) {_player.load(mediaObject);}
        };
        
     
        
        /**
         * Inicializa el reproductor
         */
        this.init = function()
        {
            var playerContainer, device, urlBase, 
                playerConfig, 
                swfobjectLibrary, brightcoveExperienceLibrary, modesStr, arrayMode, backupMode;
            
				
			//Incluimos el cookie-match Pixel en el caso de ser provider = streamtheworld
            /*
			if (_settings.media.cdn.provider == "streamtheworld");
            {
                var body = document.getElementsByTagName('body')[0];
                var script = document.createElement('script');
                script.setAttribute('type','text/javascript');
                script.setAttribute('src','http://assets.streamtheworld.com/js/a2x.php');
                body.appendChild(script);
            }
			*/
			
            _clearContainer.apply(this);
            
            playerConfig = _settings;
            urlBase = typeof(playerConfig.base)!="undefined"?playerConfig.base:"";

            // Comprobamos que hemos recibido un parametro de contenedor para incrustar el reproductor
            if(playerConfig.player == null || playerConfig.player.container == null)
            {
                if(psd.media.debug) {console.log("Player container is not defined. Aborting instantiation of player " + playerConfig.id);}
                return;
            }

            // Comprobamos que hemos recibido un contenedor valido
            playerContainer = document.getElementById(playerConfig.player.container);
            if(playerContainer==null)
            {
                if(psd.media.debug) {console.log("Player container is missing. Aborting instantiation of player " + playerConfig.id);}
                return;		
            }

            // Device information
            device = getDevice();
            if(psd.media.debug) {console.log("Instantiating media player in: " + device.agent);}

            if (!playerConfig.player.mode)
            {
                // Si detectamos el dispositivo y no es movil, intentamos la carga flash. Lanzamos la carga de html5 en cualquier otro caso
                if(device!=null && !device.mobile){insertFlash.apply(this, [playerContainer, urlBase, true]);} 
                else {insertHTML5.apply(this, [playerConfig]);}
            }
            else
            {
                modesStr = playerConfig.player.mode;
                arrayMode = modesStr.split(",");
                
                for (i=0;i<arrayMode.length;i++)
                {
                    if (arrayMode[i] == "directlink")
                    {
                        paintDirectLink.apply(this, [playerContainer, playerConfig]);
                        break;
                    }
                    else 
                    {
                         if (arrayMode[i] == "flash")
                         {
                             //Si en el orden de prioridades, flash es el último, usaremos backup en caso de no poder cargar el player de flash
                             if (i == (arrayMode.length - 1)){backupMode = true;}
                             else {backupMode = false;}

                             if (!insertFlash.apply(this, [playerContainer, urlBase, backupMode])){continue;}
                             else {break;}

                         }
                         else if (arrayMode[i] == "html5")
                         {
                            insertHTML5.apply(this, [playerConfig]);
                            break;
                         }
                    }

                }
            }  
        }; 
        
        var paintDirectLink = function(playerContainer, playerConfig)
        {
            var urlDirect;
            
            // Si no hay valor en directLinkUrl, cogemos la url de media.src
            if (playerConfig.media.directLinkUrl == undefined){urlDirect = playerConfig.media.src;}
            else {urlDirect = playerConfig.media.directLinkUrl;}
            
            playerContainer.innerHTML='<div><a target="_blank" href="' + urlDirect + '">Ver video</a></div>'; 
        }
        
        var insertFlash = function(playerContainer, urlBase, backup)
        {
            var flash;
            
            if(psd.media.debug) {console.log("Initializing standard configuration...");}


            // Mostramos el mensaje de instalacion del plugin de Flash para versiones inferiores a FP_10.0.0 y el player para versiones superiores
            if(FlashDetect.major<10) 
            { 
                if (backup)
                {
                    flash = true;
                    playerContainer.innerHTML='<div id="noFlash" style="font: 11px Verdana,Arial,Sans Serif; color: white; vertical-align: middle; background-color: black;"><p>Para visualizar este contenido es necesaria una versión actualizada de Flash Player</p><a target="_blank" href="http://get.adobe.com/flashplayer/"><img border="0" src="http://www.adobe.com/misc/images/160x41_get_flashplayer.gif"></a></div>'; 
                }
                else {flash = false;}
                

            } else {
                flash = true;
                swfobjectLibrary = {depends: urlBase + _SWFOBJECT_LIBRARY
                                    , success: _embedSWF
                                    , error: _showError
                                    , scope: this
                };

               LibraryManager.load(swfobjectLibrary);

            }
           
            
            return flash;
        }
        
        var insertHTML5 = function(playerConfig)
        {          
            
            //TODO: Detectar de algún modo si el dispositivo soporta html5
            
            if(psd.media.debug) {console.log("Initializing html5 configuration...");}

            // Instanciamos un player de brightcove si es necesario, o el respaldo tradicional en caso contrario
            if( typeof(playerConfig.media)!="undefined" && 
                typeof(playerConfig.media.cdn)!="undefined" && 
                typeof(playerConfig.media.cdn.provider)!="undefined" &&
                playerConfig.media.cdn.provider=="brightcove")
            {                
            
                if(psd.media.debug) {console.log("Initializing Brightcove player...");}

                brightcoveExperienceLibrary = {depends: _BRIGHTCOVE_EXPERIENCE_LIBRARY
                                              , success: _embedBrightcoveHTML5
                                              , error: _showError
                                              , scope: this
                };

                LibraryManager.load(brightcoveExperienceLibrary);
                 
            } else {_embedHTML5.apply(this);}            
        }
        
        //Style Fullscreen
        var css = '.theatre{position:absolute; width:100%; height:100%; top:0; left:0; z-index:10000}',
            style = document.createElement('style');

        style.type = 'text/css';

        if (style.styleSheet) {style.styleSheet.cssText = css;}
        else {style.appendChild(document.createTextNode(css));}

        document.getElementsByTagName('head')[0].appendChild(style);     
    }


    var check_mmdebug = function(level){
        var ret = false;

        if((typeof(window.mm_debug)!="undefined")&&(window.mm_debug!="")&&(window.mm_debug!=0)&&(window.mm_debug!="0")){
            ret = true;

            window.mm_debug += "";

            var mm_debug_split = window.mm_debug.split("|");

            if(typeof(level)!="undefined"){
                level = level.split("|");

                ret = false;

                for(var i in level){
                    for(var j in mm_debug_split){
                        if((level[i]==mm_debug_split[j])||(mm_debug_split[j]=="all")){
                            ret = true;
                        }
                    }
                }
            }else{
                ret = false;

                for(var j in mm_debug_split){
                    if(mm_debug_split[j]=="all"){
                        ret = true;
                    }
                }
            }
        }

        return ret;
    }

    emic.top.debug = function (msg, params, level) {
        if ((emic.top.debugTop)||(check_mmdebug(level))) {
            var d = new Date(),
                output = "[" + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + "]" + msg;

            if (typeof(console)!=undefined)
                if (console.debug)
                    console.debug(output,  params ? params : "");
                else if (console.log)
                    console.log(output,  params ? params : "");

            var consola = document.getElementById(emic.top.externalConsole);
            if (consola) {
                var auxText;
                if (typeof(params) == "object") {
                    auxText = "\n";
                    for (var i in params) {
                        auxText += "  --> " + i + ": " + params[i] + "\n";
                    }
                } else {
                    auxText = (params==undefined)? "":params;
                }

                consola.innerHTML = consola.innerHTML + "[" + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + "]" + msg + auxText + "\n";
            }
        }
    };

    // Incluimos la declaracion de la clase en el namespace psd.media
    namespace.SimpleMediaPlayer = SimpleMediaPlayer;

}(psd.media));(function(namespace) {
	
    // Inheritance class
    MediaEvent.prototype = new psd.framework.Event();

    /**
     * Define el evento MEDIA_BEGIN
     */
    MediaEvent.MEDIA_BEGIN = "mediaBegin";
    
    /**
     * Define el evento MEDIA_BEGIN
     */
    MediaEvent.MEDIA_START = "mediaStart";
    
    /**
     * Define el evento MEDIA_BEGIN
     */
    MediaEvent.MEDIA_STOP = "mediaStop";
    
    /**
     *
     */
    MediaEvent.MEDIA_FIRST_QUART = "mediaFirstQuart";
    
    /**
     *
     */
    MediaEvent.MEDIA_HALF = "mediaHalf";
    
    /**
     *
     */
    MediaEvent.MEDIA_THIRD_QUART = "mediaThirdQuart";
    
    /**
     *
     */
    MediaEvent.AD_START = "adStart";
    
    /**
     *
     */
    MediaEvent.AD_SKIP = "adSkip";
    
    /**
     *
     */
    MediaEvent.AD_COMPLETE = "adComplete";
    
    /**
     * Define el evento MEDIA_COMPLETE
     */
    MediaEvent.MEDIA_COMPLETE = "mediaComplete";

    /**
     * Define el evento MEDIA_PREVIOUS
     */
    MediaEvent.MEDIA_PREVIOUS = "mediaPrevious";

    /**
     * Define el evento MEDIA_NEXT
     */
    MediaEvent.MEDIA_NEXT = "mediaNext";
    
    /**
     *
     */
    MediaEvent.ESTADO_BUFFER_FULL = "estadoBufferFull";
    
    /**
     *
     */
    MediaEvent.ESTADO_BUFFER_EMPTY = "estadoBufferEmpty";
    
    /**
     *
     */
    MediaEvent.MEDIA_PROGRESS = "mediaProgress";
    
    /**
     * Define el evento CUEPOINT_DATA
     */
    MediaEvent.CUEPOINT_DATA = "CUEPOINT_DATA";
    
    /**
     * Define el evento MEDIA_COMPLETE
     */
    MediaEvent.INITIALIZED  = "INITIALIZED";
    
    /**
     * Define el evento AD_COMPANION_ON
     */
    MediaEvent.AD_COMPANION_ON  = "adCompanionOn"; 
    
     /**
     * Define el evento AD_COMPANION_OFF
     */
    MediaEvent.AD_COMPANION_OFF  = "adCompanionOff";
    
   
    /**
     * Datos adicionales del evento
     */
    this.data = null;
    
    /**
     * Eventos de estado de reproduccion de contenido multimedia
     * @constructor
     */
    function MediaEvent(type, data) 
    {
        // Super
        psd.framework.Event.call(this, type);
        
        this.data = data;
    }
    
    // Incluimos la declaracion de la clase en el namespace psd.media	
    namespace.MediaEvent = MediaEvent;

})(psd.media);(function(namespace) {

    // Inheritance class
    TopEmbedEvent.prototype = new psd.framework.Event();

    /**
     * Evento Playlist - dataComplete
     */
    TopEmbedEvent.EVENT_INI = "TopLauncherInitialized";
    TopEmbedEvent.EVENT_ERROR = "TopEmbedError";

    /**
     * Datos adicionales del evento
     */
    this.data = null;

    /**
     * Eventos de estado de reproduccion de contenido multimedia
     * @constructor
     */
    function TopEmbedEvent(type, data)
    {
        // Super
        psd.framework.Event.call(this, type);

        this.data = data;
    }

    // Incluimos la declaracion de la clase en el namespace psd.publicidad.events
    namespace.TopEmbedEvent = TopEmbedEvent;

})(psd.media);(function(namespace) {

    // Inheritance class
    TopEmbedEventPlaylist.prototype = new psd.framework.Event();

    /**
     * Evento Playlist - dataComplete
     */
    TopEmbedEventPlaylist.EVENT_INIT = "TopEventPlaylistInitialized";
    TopEmbedEventPlaylist.EVENT_ERROR = "TopEmbedPlaylistError";

    /**
     * Datos adicionales del evento
     */
    this.data = null;

    /**
     * Eventos de estado de reproduccion de contenido multimedia
     * @constructor
     */
    function TopEmbedEventPlaylist(type, data)
    {
        // Super
        psd.framework.Event.call(this, type);

        this.data = data;
    }

    namespace.TopEmbedEventPlaylist = TopEmbedEventPlaylist;

})(psd.media);(function(namespace) {

    // Inheritance class
    PlaylistEvent.prototype = new psd.framework.Event();

    /**
     * Evento Playlist - dataComplete
     */
    PlaylistEvent.EVENT_ERROR = "eventError";
    PlaylistEvent.DATA_REQUEST = "dataRequest";
    PlaylistEvent.DATA_COMPLETE = "dataComplete";
    PlaylistEvent.MEDIA_CHANGE = "mediaChange";
    PlaylistEvent.PLAYLIST_COMPLETE =   "playlistComplete";


    /**
     * Datos adicionales del evento
     */
    this.data = null;

    /**
     * Eventos de estado de reproduccion de contenido multimedia
     * @constructor
     */
    function PlaylistEvent(type, data)
    {
        // Super
        psd.framework.Event.call(this, type);

        this.data = data;
    }

    // Incluimos la declaracion de la clase en el namespace psd.publicidad.events
    namespace.PlaylistEvent = PlaylistEvent;

})(psd.media);(function(namespace) {

    // Inheritance class
    TopLauncherEvent.prototype = new psd.framework.Event();

    /**
     * Evento Playlist - dataComplete
     */
    TopLauncherEvent.EVENT_INI = "MediaPlayerInitialized";
    TopLauncherEvent.EVENT_ERROR = "TopLauncheError";


    /**
     * Datos adicionales del evento
     */
    this.data = null;

    /**
     * Eventos de estado de reproduccion de contenido multimedia
     * @constructor
     */
    function TopLauncherEvent(type, data)
    {
        // Super
        psd.framework.Event.call(this, type);

        this.data = data;
    }

    // Incluimos la declaracion de la clase en el namespace psd.publicidad.events
    namespace.TopLauncherEvent = TopLauncherEvent;

})(psd.media);(function(namespace){

    function InfoPanel(){

        var _that = this;

        this.onclick = null;

        this.paint = function(container,message,append){
            _container = document.getElementById(container);
            _message = message;

            _container.style.position = "relative";

            var back = document.createElement("div");
            back.style.width = "100%";
            back.style.height = "100%";
            back.style.position = "absolute";
            back.style.textAlign = "center";
            back.style.top = 0;
            back.style.left = 0;
            back.style.backgroundColor = "rgba(0,0,0,0.9)";
            back.style.display = "table";
            back.className = "mm_infopanel_background";
            back.style.zIndex = 1000;
            back.style.cursor = "pointer";

            var msg = document.createElement("div");
            msg.style.margin = "auto";
            msg.className = "mm_infopanel_message";
            msg.style.color = "white";
            msg.style.fontFamily = "Arial";
            msg.style.display = "table-cell";
            msg.style.verticalAlign = "middle";

            msg.innerHTML = message;

            back.appendChild(msg);

            if(this.onclick!=null){
                back.onclick = function(){
                    _that.onclick(back);
                }
            }

            if(!append){
                _container.innerHTML = "";
            }

            _container.appendChild(back);
        };
    }
    namespace.InfoPanel = InfoPanel;

})(psd.media);
(function(namespace){

    function Lang(){

        var translations = {
            "es":{
                "contenido_no_disponible": "Contenido no disponible",
                "trans_no_disponible":"No disponible para este dispositivo",
                "trans_no_comenzado" : "La retransmisión aún no ha comenzado",
                "trans_reanudara" : "La retransmisión se reanudará en breve",
                "trans_finalizada" : "La retransmisión ha finalizado",
                "publicidad" : "Publicidad",
                "actualizar_plugin" : "Necesitas actualizar tu plugin de Flash",
                "no_mp4" : "El navegador no admite vídeo HTML5/MP4",
                "no_mp3" : "El navegador no admite audio HTML5/MP3",
                "geobloqueado" : "Contenido no disponible en su zona geográfica",
                "bloqueado" : "Contenido compartido bloqueado",
                "aun_no_disponible" : "El contenido no está disponible todavía",
                "no_disponible" : "El contenido no está disponible",
                "audio_geobloqueado" : "Audio no disponible en su zona geográfica",
                "audio_aun_no_disponible" : "Audio no disponible todavía",
                "audio_no_disponible" : "Audio ya no disponible",
                "audio_no_encontrado": "Audio no encontrado",
                "necesita_plugin" : "Necesita instalar el plugin de flash para ver este contenido",
                "no_encontrado": "Contenido no encontrado",
                "cerrar" : "Cerrar",
                "tamanio_real" : "Tamaño real",
                "ver_perfil_eskup" : "Ver perfil en Eskup",
                "teclear_usuario" : "Tienes que teclear usuario y contraseña",
                "error_correo" : "El campo 'usuario' no parece un correo electrónico. Por favor, revísalo.",
                "foto" : "Foto",
                "tamanio_ventana" : "Tamaño ventana",
                "ver_perfil_completo" : "Ver perfil completo",
                "avatar" : "Avatar",
                "ver_video": "Ver vídeo",
                "vervideo_svg": "//ep00.epimg.net/reproductores/vervideo.svg",
                "directo":"EMISIÓN EN DIRECTO",
                "siguiente_noticia": "Siguiente noticia",
                "anterior_noticia": "Noticia anterior",
                "primera_noticia": "No hay noticia anterior",
                "ultima_noticia": "No hay más noticias"
            },
            "en":{
            },
            "ca":{
                "contenido_no_disponible": "Contingut no disponible",
                "trans_no_disponible":"Transmissió no disponible per a aquest dispositiu",
                "trans_no_comenzado" : "La retransmissió encara no ha començat",
                "trans_reanudara" : "La retransmissió es reprendrà aviat",
                "trans_finalizada" : "La retransmissió ha finalitzat",
                "publicidad" : "Publicitat",
                "actualizar_plugin" : "Necessites actualitzar el teu plugin de Flash",
                "no_mp4" : "El navegador no admet vídeo HTML5/MP4",
                "no_mp3" : "El navegador no admet HTML5/MP3",
                "geobloqueado" : "Contingut no disponible en la seva zona geogràfica",
                "bloqueado" : "Contingut compartit bloquejat",
                "aun_no_disponible" : "El contingut encara no està disponible",
                "no_disponible" : "El contingut no està disponible",
                "audio_geobloqueado" : "Áudio no disponible en la seva zona geogràfica",
                "audio_aun_no_disponible" : "Àudio no disponible encara",
                "audio_no_disponible" : "Àudio ja no disponible",
                "audio_no_encontrado": "Áudio no trobat",
                "necesita_plugin" : "Necessita instal·lar el plugin de Flash per veure aquest contingut",
                "no_encontrado": "Contingut no trobat",
                "cerrar" : "Tancar",
                "tamanio_real" : "Mida real",
                "ver_perfil_eskup" : "Veure perfil en Eskup",
                "teclear_usuario" : "Has de teclejar usuari i contrasenya",
                "error_correo" : "El camp 'usuari' no sembla un correu electrònic. Sisplau, revisa'l",
                "foto" : "Foto",
                "tamanio_ventana" : "Mida finestra",
                "ver_perfil_completo" : "Veure perfil complet",
                "avatar" : "Avatar",
                "ver_video": "Veure Vídeo",
                "vervideo_svg": "//ep00.epimg.net/reproductores/vervideo_ca.svg",
                "directo":"EMISSIÓ EN DIRECTE",
                "siguiente_noticia": "Propera notícia",
                "anterior_noticia": "Notícia anterior",
                "primera_noticia": "No hi ha notícia anterior",
                "ultima_noticia": "No hi ha més notícies"
            },
            "pt-br":{
                "contenido_no_disponible": "Contenido não disponível",
                "trans_no_disponible":"Indisponível para este dispositivo",
                "trans_no_comenzado" : "La retransmisión aún no ha comenzado",
                "trans_reanudara" : "La retransmisión se reanudará en breve",
                "trans_finalizada" : "La retransmisión ha finalizado",
                "publicidad" : "Publicidade",
                "actualizar_plugin" : "Você precisa atualizar seu plugin Flash",
                "no_mp4" : "O navegador não suporta vídeo HTML5/MP4",
                "no_mp3" : "O navegador não suporta HTML5/MP3",
                "geobloqueado" : "Contenido não disponível para sua região",
                "bloqueado" : "Contenido compartido bloqueado",
                "aun_no_disponible" : "O contenido ainda não está disponível",
                "no_disponible" : "O contenido não está disponível",
                "audio_geobloqueado" : "Audio no disponible en su zona geográfica",
                "audio_aun_no_disponible" : "Audio no disponible todavía",
                "audio_no_disponible" : "Audio ya no disponible",
                "audio_no_encontrado": "Audio no encontrado",
                "necesita_plugin" : "Você precisa instalar o plugin flash para ver este conteúdo",
                "no_encontrado": "Contenido não encontrado",
                "cerrar" : "Fechar",
                "tamanio_real" : "Tamanho real",
                "ver_perfil_eskup" : "Ver perfil em Eskup",
                "teclear_usuario" : "Digite usuário e senha",
                "error_correo" : "O campo 'usuário' não parece ser um e-mail. Por favor, verifique",
                "foto" : "Foto",
                "tamanio_ventana" : "Tamanho Janela",
                "ver_perfil_completo" : "Ver perfil completo",
                "avatar" : "Avatar",
                "ver_video": "Ver vídeo",
                "vervideo_svg": "//ep00.epimg.net/reproductores/vervideo_pt-br.svg",
                "directo":"AO VIVO",
                "siguiente_noticia": "Próxima notícia",
                "anterior_noticia": "Notícias anteriores",
                "primera_noticia": "Nenhuma notícia anterior",
                "ultima_noticia": "Sem mais notícias"
            }
        };

        var UNICODEfrom = [
                            "À","Á","Â","Ã","Ä",
                            "à","á","â","ã","ä",
                            "È","É","Ê","Ë",
                            "è","é","ê","ë",
                            "Ì","Í","Î","Ï",
                            "ì","í","î","ï",
                            "Ò","Ó","Ô","Õ","Ö",
                            "ò","ó","ô","õ","ö",
                            "Ù","Ú","Û","Ü",
                            "ù","ú","û","ü",
                            "Ñ","ñ","Ç","ç"
                        ];
        var UNICODEto   = [
                            "\u00C0","\u00C1","\u00C2","\u00C3","\u00C4",
                            "\u00E0","\u00E1","\u00E2","\u00E3","\u00E4",
                            "\u00C8","\u00C9","\u00CA","\u00CB",
                            "\u00E8","\u00E9","\u00EA","\u00EB",
                            "\u00CC","\u00CD","\u00CE","\u00CF",
                            "\u00EC","\u00ED","\u00EE","\u00EF",
                            "\u00D2","\u00D3","\u00D4","\u00D5","\u00D6",
                            "\u00F2","\u00F3","\u00F4","\u00F5","\u00F6",
                            "\u00D9","\u00DA","\u00DB","\u00DC",
                            "\u00F9","\u00FA","\u00FB","\u00FC",
                            "\u00D1","\u00F1","\u00C7","\u00E7"
                        ];

        this.translate = function(lang,key){
            if(typeof(translations[lang])=="undefined"){
                return "";
            }
            if(translations[lang][key]==null){
                if(translations["es"][key]!=null)
                    return translations["es"][key];
                else
                    return "";
            }

            return translations[lang][key];
        }

        this.translateText = function(lang,text){
            var exp = /{{lang:[A-Za-z0-9\_\-]*}}/g;
            var match = text.match(exp);

            for(var i in match){
                var key = match[i].replace("{{lang:","").replace("}}","");
                text = text.replace(match[i],this.translate(lang,key));
            }

            return text;
        }

        this.addTranslation = function(lang,key,value){
            if(typeof(translations[lang]=="undefined"))
                translations[lang] = {};

            translations[lang][key] = value;
        }

        this.addTranslations = function(translations_array){
            for(var i in translations_array){

                if(typeof(translations[i])=="undefined")
                    translations[i] = {};

                for(var j in translations_array[i]){
                    translations[i][j] = translations_array[i][j];
                }
            }
        }

        this.UNICODE = function(text){
            for(var i in UNICODEfrom){
                var regex = new RegExp(UNICODEfrom[i], "g");
                text = text.replace(regex,UNICODEto[i]);
            }

            return text;
        }
    }
    namespace.Lang = Lang;

})(psd.media);
/*Panel next generico para aceder desde PlayList generadas*/
(function(namespace) {


    function NextPanel(timer,skin,skinContainer,urlBase,IdMedia) {


        var _that = this;

        /*Configuracion*/
        var _nextPlayer,                              //funcion siguiente
            _repeatPlayer,                            //funciones repetir
            _timer = timer,                           //tiempo de visualizacion del panel
            _skin = skin,                             //configuracion del skin del panel
            _skinContainer = skinContainer,           //Contenedor donde hira en el nextpanel
            _urlBase = urlBase,                       //URL base donde estan ubicados los assets
            _IdMedia = IdMedia,                       //Identificador unico para parsear el template
            _template;                                //Template

        /*visualizacion*/
        var _nextPanel,                               //panel de siguiente video
            _nextMedia,                               //Siguiente video
            _repeatMedia,                             //Repetir video
            _nextTime,                                //mostrar tiempo en el panel
            _next_counter, _counter, _counterTime,    //funciones de la cuenta atras
            _nextThumb,                               //Imagen del siguiente elemento de la lista
            _nextText,                                //texto del siguiente elemento de la lista
            _getSettings,                             //Settings
            _isShowPanel = false;                     //Verifica el estado del panel


        var _URL_TEMPLATE = "/psdmedia/media/simple/skinsNextPanel/{UDN}/assets/template.html",   // template
            _URL_STYLE = "/psdmedia/media/simple/skinsNextPanel/{UDN}/assets/style.css";       // main style


        _CODE_NUM_PARSER_OK = 0,
        _CODE_NUM_PARSER_ERROR = 1;


            var _udn = _skin;

            var _urlBaseData = _urlBase;


            var _loadTemplate = function () {


                _URL_TEMPLATE = _URL_TEMPLATE.replace("{UDN}", _udn);

                var _parser = new psd.framework.Parser(),
                    templateMediator = new psd.framework.Mediator(),
                    url = _urlBaseData ? (_urlBaseData + _URL_TEMPLATE) : _URL_TEMPLATE;
                templateMediator.corsIE(true);
                templateMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_COMPLETE, onDataComplete, this);
                templateMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_ERROR, onDataError, this);
                templateMediator.mediate(url, _parser, psd.framework.Mediator.RESPONSE_TEXT);
            };

            /*----------------------------------------------------------------------*/

            /*Cargamos el skin*/
            var _loadCSS = function () {                             // Loading CSS main file

                _URL_STYLE = _URL_STYLE.replace("{UDN}", _udn);

                var fileref = document.createElement("link"),
                    filename = _urlBaseData ? (_urlBaseData + _URL_STYLE) : _URL_STYLE;
                fileref.setAttribute("rel", "stylesheet");
                fileref.setAttribute("type", "text/css");
                fileref.setAttribute("href", filename);
                if (typeof fileref != "undefined") {
                    document.getElementsByTagName("head")[0].appendChild(fileref);
                }
            };


            var onDataComplete = function (evt) {
                var  dataHTML, elementHTML;
                if (evt.result.parserResult.code == _CODE_NUM_PARSER_OK) {
                    _template = evt.result.parserResult.result.replace(/{<-%ID%->}/g, _IdMedia);


                }
                else if (evt.result.parserResult.code == _CODE_NUM_PARSER_ERROR) {
                    //TODO: Error
                }
            };

            var onDataError = function (evt) {
                //TODO: Error
            };

            _loadTemplate();
            _loadCSS();



        this.showPanel = function (url_thumbnail,title,nextPlayer,repeatPlayer) {

            var _skinContainerData = document.getElementById(_skinContainer);

            /*Comprobamos si existe el panel*/
            if (!document.getElementById('mm_next_panel_' + _IdMedia)) {

                elementHTML = document.createElement('div');
                elementHTML.id = 'mm_next_panel_' + _IdMedia;
                elementHTML.className = 'mm_nextpanel';
                elementHTML.style.display = "none";
                elementHTML.innerHTML = _template;
                _skinContainerData.appendChild(elementHTML);
            }

            var _getElementById = function (id) {
                return document.getElementById(id + _IdMedia);
            };

            _nextPanel = _getElementById("mm_next_panel_");
            _nextMedia = _getElementById("mm_nextMedia_");
            _repeatMedia = _getElementById("mm_repeatMedia_");
            _nextTime = _getElementById("mm_nextTime_");
            _nextThumb = _getElementById("mm_nextThumb_");
            _nextText = _getElementById("mm_nextText_");


            /*recuperamos los datos del siguiente elemento*/
            _nextThumb.src = url_thumbnail;
            _nextText.innerHTML = title;


            /*Si tenemos los elementos del panel disponible escuchamos sus eventos*/
            _counterTime = _timer;
            _nextTime.innerHTML = _timer;


            _nextMedia.onclick = (function (that) {
                return function () {
                    /*boton panel, siguiente*/
                    _that.killPanel();
                    nextPlayer();
                };

            })(this);


            _nextThumb.onclick = (function (that) {
                return function () {
                    /*Thumb panel, siguiente*/
                    _that.killPanel();
                    nextPlayer();

                };

            })(this);


            _nextText.onclick = (function (that) {
                return function () {
                    /*Texto panel, siguiente*/
                    _that.killPanel();
                    nextPlayer();
                };

            })(this);


            _repeatMedia.onclick = (function (that) {
                return function () {
                    /*boton panel, repetir*/
                    _that.killPanel();
                    _nextTime.innerHTML = _counterTime;
                    repeatPlayer();

                };

            })(this);

            _next_counter = (function (that) {
                return function () {
                    var TotalTime = _counterTime;

                    _counter = setInterval(function () {

                        if (TotalTime != 0) {

                            TotalTime--;
                            _nextTime.innerHTML = TotalTime;

                        } else {
                            _that.killPanel();

                            nextPlayer();


                        }

                    }, 1000);

                }

            })(this);
            _that.viewPanel();
        };

        /*mostrar panel*/
        this.viewPanel = function (data) {
            _isShowPanel = true;
            _next_counter();
            _nextPanel.style.display = "";
        };


        /*testeamos si devuelve panel*/
        this.isShowPanel = function () {
            return _isShowPanel;
        };

       /*Destruimos el panel*/
        this.killPanel = function () {
            if (typeof(_nextPanel) != "undefined") {
                _nextPanel.style.display = "none";
            }
            clearInterval(_counter);
            _isShowPanel = false;
        }

    }


    namespace.NextPanel = NextPanel;

}(psd.media));(function(namespace) {
    
    // Inheritance class
    BCMediaPlayerWrapper.prototype = new psd.framework.EventDispatcher();

    /**
     * Wrapper que permite la compatibilidad del reproductor multimedia.
     * @constructor
     */
    function BCMediaPlayerWrapper(settings)
    {
        // Super
        psd.framework.EventDispatcher.call(this);
        
        /**
         * className psd.media.wrappers.BCMediaPlayerWrapper
         */
        this.className = "psd.media.wrappers.BCMediaPlayerWrapper";
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

        // 
        var _settings = settings;

        // 
        var _playbackStarted = false;
        
        //
        var _videoPlayerModule;
        
        //
        var _adModule;
        
        //
        var _cuePointsModule;

        // Post-fijo identificativo del container del player
        var _SIMPLE = "_simple";
        
        // Utilidad para la creacion de nodos <param name="" value="">
        var _createParam = function(name, value)
        {
            var param = document.createElement("param");
                param.setAttribute("name", name);
                param.setAttribute("value", value);
                
            return param;
        };
        
        // Evento onTemplateLoaded de brightcove
        namespace._deferredOnBCTemplateLoaded = (function(bcWrapper) {return function(experienceID) {_onTemplateLoaded.apply(bcWrapper,[experienceID]);}})(this);
        var _onTemplateLoaded = function(experienceID)
        {
            var player, brightcoveExperience;

            player = brightcove.api.getExperience(experienceID);
            brightcoveExperience = player.getModule(brightcove.api.modules.APIModules.EXPERIENCE);
            brightcoveExperience.addEventListener(brightcove.api.events.ExperienceEvent.TEMPLATE_READY, _deferredOnBCTemplateReady);            
        };
        
        // Evento onTemplateReady de brightcove
        var _deferredOnBCTemplateReady = (function(bcWrapper) {return function() {_onTemplateReady.apply(bcWrapper);}})(this);        
        var _onTemplateReady = function()
        {
            var player;

            player = brightcove.api.getExperience(_settings.id + _SIMPLE);
            _videoPlayerModule = player.getModule(brightcove.api.modules.APIModules.VIDEO_PLAYER);
            _videoPlayerModule.addEventListener(brightcove.api.events.MediaEvent.PLAY, _deferredOnMediaEvent);
            _videoPlayerModule.addEventListener(brightcove.api.events.MediaEvent.STOP, _deferredOnMediaEvent);

            _adModule = player.getModule(brightcove.api.modules.APIModules.ADVERTISING);
            _adModule.addEventListener(brightcove.api.events.AdEvent.COMPLETE, _deferredOnAdEvent);
            _adModule.addEventListener(brightcove.api.events.AdEvent.START, _deferredOnAdEvent);

            _cuePointsModule = player.getModule(brightcove.api.modules.APIModules.CUE_POINTS);
            _cuePointsModule.addEventListener(brightcove.api.events.CuePointEvent.CUE, _deferredOnCuePointEvent);

            _videoPlayerModule.getCurrentVideo(function(media){
                _cuePointsModule.addCuePoints(media.id, 
                    [ {time: 0.25*media.length/1000, name: psd.media.MediaEvent.MEDIA_FIRST_QUART, type: brightcove.api.modules.CuePointsModule.CuePointType.CODE},
                        {time: 0.5*media.length/1000, name: psd.media.MediaEvent.MEDIA_HALF, type: brightcove.api.modules.CuePointsModule.CuePointType.CODE},
                        {time: 0.75*media.length/1000, name: psd.media.MediaEvent.MEDIA_THIRD_QUART, type: brightcove.api.modules.CuePointsModule.CuePointType.CODE}]);
            });
        };
        
        var _deferredOnMediaEvent = (function(bcWrapper) {return function(event) {_onMediaEvent.apply(bcWrapper, [event]);}})(this);        
        var _onMediaEvent = function(evt) { 
           switch(evt.type) {
                
                case brightcove.api.events.MediaEvent.PLAY:
                    if(!_playbackStarted) {
                        _playbackStarted = true;
                        this.dispatchEvent(new psd.media.MediaEvent(psd.media.MediaEvent.MEDIA_BEGIN, {duration: evt.duration}));
                    }
                    break;
                        
                case brightcove.api.events.MediaEvent.STOP:
                    if(_playbackStarted && evt.position>=0.98*evt.duration){
                        _playbackStarted = false;
                        this.dispatchEvent(new psd.media.MediaEvent(psd.media.MediaEvent.MEDIA_COMPLETE, {duration: evt.duration}));
                    }
                    break;
            }
        };
        
        var _deferredOnAdEvent = (function(bcWrapper) {return function(event) {_onAdEvent.apply(bcWrapper, [event]);}})(this);        
        var _onAdEvent = function(evt) {
            var bcWrapper = this;
            _videoPlayerModule.getCurrentVideo(function(media){
                bcWrapper.dispatchEvent(new psd.media.MediaEvent(evt.type, {}));
            });
        };
        
        var _deferredOnCuePointEvent = (function(bcWrapper) {return function(event) {_onCuePointEvent.apply(bcWrapper, [event]);}})(this);        
        var _onCuePointEvent = function(evt) {
            var bcWrapper = this;
            _videoPlayerModule.getCurrentVideo(function(media){
                bcWrapper.dispatchEvent(new psd.media.MediaEvent(evt.cuePoint.name, {duration: media.length/1000}));
            });
        };
        
        //
        var _init = function() {
            var playerContainer, playerTag,
                playerWidth = "100%", playerHeight = "100%", adServer = "";
            
            playerContainer = document.getElementById(_settings.player.container);
            
            if(typeof(_settings.player.width)!="undefined") {playerWidth = _settings.player.width;}
            if(typeof(_settings.player.height)!="undefined") {playerHeight = _settings.player.height;}
            
            var bc_playerId = _settings.media.cdn.playerId;
            var bc_playerKey = _settings.media.cdn.playerKey;
            var bc_refId = _settings.media.src;
            
            if(typeof(_settings.ads)!="undefined"){adServer = _settings.ads.urlHtml5;}
            
            playerTag = document.createElement("object");
            playerTag.setAttribute("id", _settings.id + _SIMPLE);
            playerTag.setAttribute("class", "BrightcoveExperience");
            playerTag.appendChild(_createParam("bgColor", "#000000"));
            playerTag.appendChild(_createParam("width", playerWidth));
            playerTag.appendChild(_createParam("height", playerHeight));
            playerTag.appendChild(_createParam("playerID", bc_playerId));
            playerTag.appendChild(_createParam("playerKey", bc_playerKey));
            playerTag.appendChild(_createParam("isVid", "true"));
            playerTag.appendChild(_createParam("isUI", "true"));
            playerTag.appendChild(_createParam("dynamicStreaming", "true"));
            playerTag.appendChild(_createParam("includeAPI", "true"));
            playerTag.appendChild(_createParam("wmode", "opaque"));
            playerTag.appendChild(_createParam("@videoPlayer", "ref:"+bc_refId));
            playerTag.appendChild(_createParam("templateLoadHandler", "psd.media.wrappers._deferredOnBCTemplateLoaded"));
            playerTag.appendChild(_createParam("adServerURL", adServer));
            
            playerContainer.appendChild(playerTag);

            brightcove.createExperiences(); 
        };        
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

        /**
         * 
         */
        this.play = function() {
            _videoPlayerModule.play();
        }
        
        /**
         * 
         */
        this.pause = function() {
            _videoPlayerModule.pause();
        }

        _init.apply(this);
    }
        
    // Incluimos la declaracion de la clase en el namespace psd.media
    namespace.BCMediaPlayerWrapper = BCMediaPlayerWrapper;

}(psd.media.wrappers));(function(namespace) {
    
    // Inheritance class
    FlashMediaPlayerWrapper.prototype = new psd.framework.EventDispatcher();

    /**
     * Wrapper que permite la compatibilidad del reproductor multimedia.
     * @constructor
     */
    function FlashMediaPlayerWrapper(settings) 
    {    
        // Super
        psd.framework.EventDispatcher.call(this);
        
        /**
         * className psd.media.wrappers.FlashMediaPlayerWrapper
         */
        this.className = "psd.media.wrappers.FlashMediaPlayerWrapper";
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        
        // 
        var _settings = settings;

        // Post-fijo identificativo del container del player
        var _SIMPLE = "_simple";
        
        /**
         * Variables internas
         */
        var _flashPlayer;
        
        // Detecta si el player de flash se ha cargado para guardar una referencia y 
        // poder utilizarla luego para interactuar directamente con él
        var _deferredOnSWFObjectStatus = (function(mediaPlayer) {return function(evt) {_onSWFObjectStatus.apply(mediaPlayer,[evt]);}})(this);
        var _onSWFObjectStatus = function(e)
        {
            if(e.success) 
            {
                _flashPlayer = document.getElementById(e.id);
                this.dispatchEvent(new psd.media.MediaEvent(psd.media.MediaEvent.INITIALIZED));
            }
        };        
        
        var _init = function() {
            var playerContainer, flashvars, params, attributes, urlBase, skinParam, playerConfig, cdnParam,
                playerWidth = "100%", playerHeight = "100%";
            
            //_clearContainer.apply(this);
            
            playerConfig = _settings;
            playerContainer = document.getElementById(playerConfig.player.container);
            
            flashvars = {
                id: playerConfig.id
            };

            if(typeof(playerConfig.media)!="undefined")
            {
                // Datos de media
                if(typeof(playerConfig.media.type)!="undefined") {
                    flashvars.mediaType = playerConfig.media.type;
                }
                if(typeof(playerConfig.media.title)!="undefined") {
                    flashvars.mediaTitle = playerConfig.media.title;
                }
                if(typeof(playerConfig.media.desc)!="undefined") {
                    flashvars.mediaDescription = playerConfig.media.desc;
                }
                if(typeof(playerConfig.media.src)!="undefined") {
                    flashvars.mediaSrc = playerConfig.media.src;
                }
                if(typeof(playerConfig.media.live)!="undefined") {
                    flashvars.mediaLive = playerConfig.media.live;
                }
                
                if(typeof(playerConfig.media.clipBegin)!="undefined") {
                    flashvars.mediaClipBegin = playerConfig.media.clipBegin;
                }
                
                if(typeof(playerConfig.media.clipEnd)!="undefined") {
                    flashvars.mediaClipEnd = playerConfig.media.clipEnd;
                }
                
                if(typeof(playerConfig.media.absolute)!="undefined") {
                    flashvars.absolute = playerConfig.media.absolute;
                }
                
                if(typeof(playerConfig.media.absoluteTime)!="undefined") {
                    flashvars.absoluteTime = playerConfig.media.absoluteTime;
                }

                if (typeof(playerConfig.media.renditions)!="undefined")
                {
                    var renditions = "";
                    for(var i=0; i<playerConfig.media.renditions.length; i++)
                    {
                        if (i == playerConfig.media.renditions.length - 1){renditions += playerConfig.media.renditions[i]}
                        else {renditions += playerConfig.media.renditions[i] + ",";}
                    }
                    flashvars.renditions = renditions;
                }

                // Datos de cdn
                if(typeof(playerConfig.media.cdn)!="undefined")
                {
                    for(cdnParam in playerConfig.media.cdn)
                    {
                        flashvars["cdn_" + cdnParam] = playerConfig.media.cdn[cdnParam];
                    }
                }
             
            }

            if(typeof(playerConfig.ads)!="undefined")
            {
                if(typeof(playerConfig.ads.conf)!="undefined") {
                    flashvars.advertisingConf = playerConfig.ads.conf;
                }
                if(typeof(playerConfig.ads.tags)!="undefined") {
                    flashvars.advertisingTags = playerConfig.ads.tags;
                }
            }
            
            //Datos de securidad - Token y AuthMode
            if(typeof(playerConfig.security)!="undefined")
            {
                if(typeof(playerConfig.security.authParams)!="undefined") {
                    flashvars.authParams = playerConfig.security.authParams;
                }
                if(typeof(playerConfig.security.authParamsHTML5)!="undefined") {
                    flashvars.authParamsHTML5 = playerConfig.security.authParamsHTML5;
                }
                if(typeof(playerConfig.security.authMode)!="undefined") {
                    flashvars.authMode = playerConfig.security.authMode;
                }
            }

            if(typeof(playerConfig.player.width)!="undefined") {playerWidth = playerConfig.player.width;}
            if(typeof(playerConfig.player.height)!="undefined") {playerHeight = playerConfig.player.height;}
            
            if(typeof(playerConfig.player.autoplay)!="undefined") {
                flashvars.autoplay = playerConfig.player.autoplay;
            }
            
            if(typeof(playerConfig.player.controls)!="undefined") {
                flashvars.controls = playerConfig.player.controls;
            }
            
            if(typeof(playerConfig.media.poster)!="undefined") {
                flashvars.poster = playerConfig.media.poster;
            }

            if (typeof(playerConfig.player.referrer)!="undefined"){
                flashvars.referrer = playerConfig.player.referrer;
            }

            for(skinParam in playerConfig.skin)
            {
                flashvars["skin_" + skinParam] = playerConfig.skin[skinParam];
            }

            params = {
                allowScriptAccess:"always"
                , allowFullScreen:"true" 
                , bgcolor: typeof(playerConfig.player)!="undefined" && typeof(playerConfig.player.bgColor)!="undefined" ? playerConfig.player.bgColor : "#FFFFFF"
                , wmode: typeof(playerConfig.player)!="undefined" && typeof(playerConfig.player.wmode)!="undefined" ? playerConfig.player.wmode : "opaque"                    
            };

            attributes = {};
            
            urlBase = typeof(playerConfig.base)!="undefined"?playerConfig.base:"";
            playerContainer.innerHTML = '<div id=' + playerConfig.id + _SIMPLE + ' style="width:'+playerWidth+'; height:'+playerHeight+'"></div>';

            swfobject.embedSWF(urlBase + '/psdmedia/media/simple/skins/' + playerConfig.skin.id + "/MediaSimple_" + playerConfig.skin.id + ".swf", playerConfig.id + _SIMPLE /*"_swf"*/, playerWidth, playerHeight, "10.0.0", false, flashvars, params, attributes, _deferredOnSWFObjectStatus);            
            
        };
        
        // Evento onTemplateLoaded de brightcove
        //Concatenamos al nombre del evento el identificador del player para evitar que se machaquen las funciones cuando se instancien 2 players
        namespace["_deferredOnFlashMediaEvent_"+_settings.id] = (function(flashWrapper) {return function(event) {_onFlashMediaEvent.apply(flashWrapper,[event]);}})(this);
        var _onFlashMediaEvent = function(event) {
            
            this.dispatchEvent(new psd.media.MediaEvent(event.type, 
                                {   adName: event.adName,
                                    duration: event.duration,
                                    bytesLoaded: event.bytesLoaded,
                                    bytesTotal: event.bytesTotal,
                                    time:event.time, 
                                    typeAd: event.mymeType,
                                    companionAd: event.companionAd,
                                    width: event.width,
                                    height: event.height
                                }
                               ));
        };        
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
         
        /**
         *
         */
        this.load = function(mediaObject) {
            _flashPlayer.loadJS(mediaObject);
        }

        /**
         * 
         */
        this.play = function() {
            _flashPlayer.playJS();
        }
        
        /**
         * 
         */
        this.pause = function() {
            _flashPlayer.pauseJS();
        }
                
        /**
         *
         */
        this.volume = function(volume){
            _flashPlayer.setVolumeJS(volume);
        }
        
        
        /**
         *
         */
        this.mute = function(){
            _flashPlayer.setMuteJS();
        }
        
        /**
         *
         */
        this.currentTime = function(position){
            _flashPlayer.setCurrentTimeJS(position);
        }
        
        /**
         *
         */
        this.setProgressEvent = function(value){
            _flashPlayer.setProgressEventJS(value);
        }
        
        /** 
         *
         */
        this.isPlaying = function() {
            return _flashPlayer.isPlayingJS();
        }       
        
        _init.apply(this);
    }
    
    // Incluimos la declaracion de la clase en el namespace psd.media
    namespace.FlashMediaPlayerWrapper = FlashMediaPlayerWrapper;

}(psd.media.wrappers));
(function(namespace) {
    
    // Inheritance class
    HTML5MediaPlayerWrapper.prototype = new psd.framework.EventDispatcher();

    /**
     * Wrapper que permite la compatibilidad del reproductor multimedia.
     * @constructor
     */
    function HTML5MediaPlayerWrapper(settings)
    {
        // Super
        psd.framework.EventDispatcher.call(this); 
        
        /**
         * className psd.media.wrappers.HTML5MediaPlayerWrapper
         */
        this.className = "psd.media.wrappers.HTML5MediaPlayerWrapper";
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

        // 
        var _settings = settings;
        
        var _playing = false;

        // 
        var _playbackStarted = false;
        var _percentil25Tracked = false;
        var _percentil50Tracked = false;
        var _percentil75Tracked = false;
        
         var _activeProgressEvent = false;
        
        // Post-fijo identificativo del container del player
        var _SIMPLE = "_simple";
        
        // 
        var _mediaTag;
        
        //
        var _skin = false;
        
        //
        var _lastVoume = 1;
        
        //
        var _muted = false;
        
        namespace._deferredOnHTML5MediaEvent = (function(html5Wrapper) {return function(event) {_onMediaEvent.apply(html5Wrapper, [event]);}})(this);        
        var _onMediaEvent = function(evt) {
            switch(evt.type) {
                
                case "playing":
                    if(!_playbackStarted) {
                        _playbackStarted = true;
                        this.dispatchEvent(new psd.media.MediaEvent(psd.media.MediaEvent.MEDIA_BEGIN, {duration: _mediaTag.duration, time:_mediaTag.currentTime}));
                    }
                    
                    if (!_playing){
                        _playing = true;
                        this.dispatchEvent(new psd.media.MediaEvent(psd.media.MediaEvent.MEDIA_START, {duration: _mediaTag.duration}));
                    }
                    
                    this.dispatchEvent(new psd.media.MediaEvent(psd.media.MediaEvent.ESTADO_BUFFER_FULL, {duration: _mediaTag.duration}));
                    
                    break;
                
                case "pause":
                    if (_playing){
                        _playing = false;
                        this.dispatchEvent(new psd.media.MediaEvent(psd.media.MediaEvent.MEDIA_STOP, {duration: _mediaTag.duration}));
                    }
                    break;
                
                case "ended":
                    if(_playbackStarted){
                        _playbackStarted = false;
                        _percentil25Tracked = false;
                        _percentil50Tracked = false;
                        _percentil75Tracked = false;                        
                        this.dispatchEvent(new psd.media.MediaEvent(psd.media.MediaEvent.MEDIA_COMPLETE, {duration: _mediaTag.duration, time:_mediaTag.currentTime}));
                    }
                    break;
                    
                case "timeupdate":
                    
                    if(!_percentil25Tracked && _mediaTag.currentTime>0.25*_mediaTag.duration) {
                        _percentil25Tracked = true;
                        this.dispatchEvent(new psd.media.MediaEvent(psd.media.MediaEvent.MEDIA_FIRST_QUART, {duration: _mediaTag.duration}));
                    }
                    
                    if(!_percentil50Tracked && _mediaTag.currentTime>0.5*_mediaTag.duration) {
                        _percentil50Tracked = true;
                        this.dispatchEvent(new psd.media.MediaEvent(psd.media.MediaEvent.MEDIA_HALF, {duration: _mediaTag.duration}));
                    }
                    
                    if(!_percentil75Tracked && _mediaTag.currentTime>0.75*_mediaTag.duration) {
                        _percentil75Tracked = true;
                        this.dispatchEvent(new psd.media.MediaEvent(psd.media.MediaEvent.MEDIA_THIRD_QUART, {duration: _mediaTag.duration}));
                    }
                    
                    if (_activeProgressEvent == true){this.dispatchEvent(new psd.media.MediaEvent(psd.media.MediaEvent.MEDIA_PROGRESS, {duration: _mediaTag.duration, time:_mediaTag.currentTime}));}

                    break;
                    
                case "waiting":
                    this.dispatchEvent(new psd.media.MediaEvent(psd.media.MediaEvent.ESTADO_BUFFER_EMPTY, {duration: _mediaTag.duration}));
                    break;
               
            }
        };
        
        
        //Devuelve la url con el token, si es que tuviera
        var _getURL = function (srcHTML5)
        {
            var separador, token, url;
            
            if (_settings.security != undefined)
            {
                if (_settings.security.authParamsHTML5 != undefined)
                {
                    separador = (srcHTML5.indexOf("?") == -1)? "?":"&";
                    token = separador + _settings.security.authParamsHTML5;
                }
                else token = "";
            }else token = "";
            
            url = srcHTML5 + token;
            
            return url;
        }
        
        
        // Inserta el skin html5 para el player
        var _embedSkinHTML5 = function()
        {
            var srcHTML5 = _settings.media.srcHTML5 || _settings.media.src,
                playerWidth = 0, playerHeight = 0;
            
            //_clearContainer.apply(this);

            if(typeof(_settings.player.width)!="undefined") {playerWidth = _settings.player.width;}
            if(typeof(_settings.player.height)!="undefined") {playerHeight = _settings.player.height;}
            
            if(Object.prototype.toString.apply(srcHTML5) == "[object String]"){srcHTML5 = [srcHTML5]};
            for(var i in srcHTML5) {srcHTML5[i] = {src:_getURL(srcHTML5[i])};}
            
            _mediaTag = new psd.media.SkinnedSimpleMediaPlayer(_settings.player.container, playerWidth, playerHeight, srcHTML5, _settings );
            _mediaTag.addEventListener(psd.media.MediaEvent.MEDIA_BEGIN, _onSkinnedPlayerMediaEvent, this);
            _mediaTag.addEventListener(psd.media.MediaEvent.MEDIA_START, _onSkinnedPlayerMediaEvent, this);
            _mediaTag.addEventListener(psd.media.MediaEvent.MEDIA_STOP, _onSkinnedPlayerMediaEvent, this);
            _mediaTag.addEventListener(psd.media.MediaEvent.MEDIA_FIRST_QUART, _onSkinnedPlayerMediaEvent, this);
            _mediaTag.addEventListener(psd.media.MediaEvent.MEDIA_HALF, _onSkinnedPlayerMediaEvent, this);
            _mediaTag.addEventListener(psd.media.MediaEvent.MEDIA_THIRD_QUART, _onSkinnedPlayerMediaEvent, this);
            _mediaTag.addEventListener(psd.media.MediaEvent.MEDIA_COMPLETE, _onSkinnedPlayerMediaEvent, this);
            _mediaTag.addEventListener(psd.media.MediaEvent.MEDIA_PROGRESS, _onSkinnedPlayerMediaEvent, this);
            _mediaTag.addEventListener(psd.media.MediaEvent.MEDIA_PREVIOUS, _onSkinnedPlayerMediaEvent, this);
            _mediaTag.addEventListener(psd.media.MediaEvent.MEDIA_NEXT, _onSkinnedPlayerMediaEvent, this);
            _mediaTag.addEventListener(psd.media.MediaEvent.ESTADO_BUFFER_FULL, _onSkinnedPlayerMediaEvent, this);
            _mediaTag.addEventListener(psd.media.MediaEvent.ESTADO_BUFFER_EMPTY, _onSkinnedPlayerMediaEvent, this);
                
            this.dispatchEvent(new psd.media.MediaEvent(psd.media.MediaEvent.INITIALIZED));
        };
        
        var _onSkinnedPlayerMediaEvent = function(evt) {
            this.dispatchEvent(evt);
        }
        
        // Muestra un mensaje generico de error en el contenedor del reproductor
        var _showError = function ()
        {
            // TODO
            console.log("ERROR");
            //playerContainer.innerHTML = '<p>Ha sucedido un error inesperado. Por favor, vuelva a intentarlo m&aacute;s tarde.</p>';
        };        
        
        //
        var _init = function() {
            var playerContainer = document.getElementById(_settings.player.container), 
                srcHTML5, skinLibrary,
                urlBase = typeof(_settings.base)!="undefined"?_settings.base:"";
                playerWidth = "100%", playerHeight = "100%", bgColor="#000000";
            
            if(psd.media.debug) {console.log("Initializing html5 player...");}
            
            // Limpiamos el contenedor principal
            // _clearContainer.apply(this);            
            
            if(typeof(_settings.player.width)!="undefined") {playerWidth = _settings.player.width;}
            if(typeof(_settings.player.height)!="undefined") {playerHeight = _settings.player.height;}
            
            if(typeof(_settings.media)!="undefined" && typeof(_settings.media.srcHTML5)!="undefined") { 
                if(psd.media.debug) {console.log("HTML5 alternative source detected: " + _settings.media.srcHTML5);}
                srcHTML5 = _settings.media.srcHTML5; 
            }else if(typeof(_settings.media)!="undefined" && typeof(_settings.media.src)!="undefined") {
                if(psd.media.debug) {console.log("Invalid HTML5 url... using default url: " + _settings.media.src);}
                srcHTML5 = _settings.media.src;
            }else{
                if(psd.media.debug) {console.log("Invalid player configuration... aborting instantiation...");}
                return;
            }

            if(typeof(_settings.skin)!="undefined" && 
                typeof(_settings.skin.html5)!="undefined" &&
                (_settings.skin.html5==true || _settings.skin.html5=="true"))
            {
                    
                    _skin = true;
                    skinLibrary = {depends: urlBase + "/psdmedia/media/simple/skins/"+_settings.skin.id+"/MediaSimple_"+_settings.skin.id+".min.js"
                                        , success: _embedSkinHTML5
                                        , error: _showError
                                        , scope: this
                    };
                    
                    LibraryManager.load(skinLibrary);

            } else {
                 
                if(_settings.media.type.indexOf("audio")!=-1)
                {
                    if(psd.media.debug) {console.log("Audio content detected... using <audio> tag...");}
                    _mediaTag = document.createElement("audio");
                }

                if(_settings.media.type.indexOf("video")!=-1)
                {
                    if(psd.media.debug) {console.log("Video content detected... using <video> tag...");}
                    _mediaTag = document.createElement("video");
                }


                if(typeof(_mediaTag)!="undefined" && _mediaTag!=null)
                {
                    
                    bgColor = typeof(_settings.player)!="undefined" && typeof(_settings.player.bgColor)!="undefined" ? _settings.player.bgColor : "#FFFFFF";
                    _mediaTag.setAttribute("id", _settings.id + _SIMPLE);
                    _mediaTag.setAttribute("width", playerWidth);
                    _mediaTag.setAttribute("height", playerHeight);
                    //_mediaTag.setAttribute("onplaying", "psd.media.wrappers._deferredOnHTML5MediaEvent");
                    //_mediaTag.setAttribute("onended", "psd.media.wrappers._deferredOnHTML5MediaEvent");
                    _mediaTag.setAttribute("style", "background:" + bgColor);
                    _mediaTag.requestFullScreen = _mediaTag.requestFullScreen || 
                                                 _mediaTag.mozRequestFullScreen ||
                                                 _mediaTag.webkitRequestFullScreen ||
                                                 playerContainer.webkitRequestFullScreen;
                                                 
                   
                    _addMediaEventListener("playing", psd.media.wrappers._deferredOnHTML5MediaEvent);
                    _addMediaEventListener("pause", psd.media.wrappers._deferredOnHTML5MediaEvent);
                    _addMediaEventListener("ended", psd.media.wrappers._deferredOnHTML5MediaEvent);
                    _addMediaEventListener("timeupdate", psd.media.wrappers._deferredOnHTML5MediaEvent);
                    _addMediaEventListener("waiting", psd.media.wrappers._deferredOnHTML5MediaEvent);


                    // Propiedad "autoplay"
                    if(typeof(_settings.player.autoplay)!="undefined" && 
                        (_settings.player.autoplay==true || _settings.player.autoplay=="true"))
                    {
                        _mediaTag.setAttribute("autoplay", "autoplay");
                    }
                    
                    // Propiedad "controls"
                    if(typeof(_settings.player.controls)=="undefined" || 
                        (_settings.player.controls!=false && _settings.player.controls!="false")) 
                    { 
                        _mediaTag.setAttribute("controls", "controls"); 
                    }
                    
                    // Propiedad "poster"
                    if(typeof(_settings.media.poster)!="undefined") 
                    { 
                        _mediaTag.setAttribute("poster", _settings.media.poster); 
                    }

                    // Si recibimos un array en la url, creamos varios nodos src para el tag de video.
                    // Si recibimos un string simple, seteamos directamente el atributo src
                    if(Object.prototype.toString.apply(srcHTML5) === '[object Array]')
                    {
                        for(i in srcHTML5)
                        {
                            srcNode = document.createElement("source");
                            srcNode.setAttribute("src", _getURL(srcHTML5[i]));
                            _mediaTag.appendChild(srcNode);
                        }

                    }else 
                    {
                        _mediaTag.setAttribute("src", _getURL(srcHTML5));
                    }


                    playerContainer.appendChild(_mediaTag);

                } else {
                    playerContainer.innerHTML = '<a href="'+ _getURL(srcHTML5) +'"></a>';
                }
                
                this.dispatchEvent(new psd.media.MediaEvent(psd.media.MediaEvent.INITIALIZED));
            }
        };      
        
        // Añade un listener a un evento de la etiqueta multimedia        
        var _addMediaEventListener = function(type, listener)
        {
            if(_mediaTag)
            {
                if(_mediaTag.addEventListener) {_mediaTag.addEventListener(type, listener, false); }
                else if(_mediaTag.attachEvent) {_mediaTag.attachEvent(type, listener); }
            }
        };
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

        /**
         * 
         */
        this.play = function() {
            if(typeof(_mediaTag)!="undefined" && typeof(_mediaTag.play)!="undefined") {
                _mediaTag.play();
            }
        };
        
        /**
         * 
         */
        this.pause = function() {
            if(typeof(_mediaTag)!="undefined" && typeof(_mediaTag.play)!="undefined") {
                _mediaTag.pause();
            }            
        };
        
        /**
         * Volume
         */
        this.volume = function(value){
            if(typeof(_mediaTag)!="undefined" && typeof(_mediaTag.volume)!="undefined") {
                 
                if (_skin == true){_mediaTag.volume(value);}
                else {
                    _mediaTag.volume = value;
                    _lastVoume = value;}
            }           
        }
        
        
        /**
        *
        */
        this.mute = function(){
            
            if (_skin == true){_mediaTag.mute();}
            else {
                
                if (_muted == false)
                {
                    _mediaTag.volume = 0;
                    _muted = true;
                }
                else {
                    
                    _mediaTag.volume = _lastVoume;
                    _muted = false;
                }
            }
        }

        /**
         * Vamos al punto de la reproducción específica
         */
        this.currentTime = function(value){
            
            var position;
            
            //Valor en porcentaje
            if ((value>=0) && (value <= 1))
            {
                if (_skin == true){position = value * _mediaTag.duration();}
                else {position = value * _mediaTag.duration;}
            }
            else {position = value}
            
            
            if(typeof(_mediaTag)!="undefined" && typeof(_mediaTag.currentTime)!="undefined") {
               
               if (_skin == true){_mediaTag.currentTime(position);}
               else {_mediaTag.currentTime=position;}
                
            }
            
        }
        
        /**
         * setProgressEvent activa o desactiva el evento de progreso
         */
        this.setProgressEvent = function(value){
            
            if (_skin == true){_mediaTag.setProgressEvent(value);}
            else { _activeProgressEvent = value}
             
        }

        this.load = function(mediaObject)
        {
            _mediaTag.innerHTML= "";

            if(typeof(_mediaTag)!="undefined")
            {

                if (_skin == true){_mediaTag.load(mediaObject);}
                else
                {
                    //Reseteamos valores
                    _playbackStarted = false;

                    //Cambiamos la imagen del poster
                    if(typeof(mediaObject.poster)!="undefined"){_mediaTag.setAttribute("poster", mediaObject.poster);}

                    if(Object.prototype.toString.apply(mediaObject.mediaSrcHtml5) === '[object Array]')
                    {
                        _mediaTag.removeAttribute("src");

                        for(i in mediaObject.mediaSrcHtml5)
                        {
                            srcNode = document.createElement("source");
                            srcNode.setAttribute("src", _getURL(mediaObject.mediaSrcHtml5[i]));
                            _mediaTag.appendChild(srcNode);
                        }

                        _mediaTag.load();

                    }else{_mediaTag.setAttribute("src", _getURL(mediaObject.mediaSrcHtml5));}

                }

            }

        }


        _init.apply(this);
    }
        
    // Incluimos la declaracion de la clase en el namespace psd.media
    namespace.HTML5MediaPlayerWrapper = HTML5MediaPlayerWrapper;

}(psd.media.wrappers));(function(namespace) {
    // Inheritance class
    TopLauncher.prototype = new psd.framework.EventDispatcher();

    namespace.INTEGRACION= "int";
    namespace.PRODUCCION= "pro";
    namespace.LOCAL= "loc";

    function TopLauncher(settings)
    {
        var _that = this;

        // Super
        psd.framework.EventDispatcher.call(this);

        /**
         * className psd.media.TopLauncher
         */
        this.className = "psd.media.TopLauncher";

        _PROTOCOLO_HTTPS = "https";
        _URL_HOST_HTTPS = "https://topsslpl-a.akamaihd.net";

        _TYPE_FLASH = "FLASH";
        _TYPE_IOS = "IOS";
        _TYPE_UDS = "UDS";

        VIDEO_MEDIA_TYPE = "video";
        AUDIO_MEDIA_TYPE = "audio";

        NAME_BITRATE = "bitrate";
        NAME_HEIGHT = "height";

        URL_ADBLOCK="/psdmedia/resources/js/psd/advert.js";
        URL_LOGO_TOP = "/psdmedia/resources/img/top50.png";
        URL_BACKGROUND = "/psdmedia/resources/img/gradient.png";
        URL_PUBLI= "/psdmedia/resources/js/psd/prisaAd.min.js";//Julián
        URL_TOP_PLAYER = "/psdmedia/media/top/TopPlayer.min.js";//julian
        URL_STATS = "/psdmedia/resources/js/psd/statistics.top.min.js";//julian

        if (typeof(tplib) != "undefined") {
            URL_TOP_PLAYER = "/psdmedia/media/top/js/TopPlayer.lib.js";
            URL_STATS = "/psdmedia/resources/js/psd/lib/statistics.lib.js";
            URL_PUBLI= "/psdmedia/resources/js/psd/lib/prisaAd.lib.js";
        }

        //CODIGOS DE ERRROR
        ERROR_PARSER = "Error Code #2";
        ERROR_WS = "Error Code #3";
        ERROR_CARGA_STATISTICS = "Error Code #4";
        ERROR_CARGA_TOP_PLAYER = "Error Code #5";

        ERROR_SERVICIO_MEDIA = "Error_servicio_media";

        //TIPOS DE PROVIDER
        ID_PROVIDER_PRISADIGITAL = 1;
        ID_PROVIDER_BRIGHTCOVE = 2;
        ID_PROVIDER_GENERIC = 3;
        ID_PROVIDER_TRITON = 4;
        ID_PROVIDER_AKAMAIHD = 5;
        ID_PROVIDER_YT = 6;
        ID_PROVIDER_DM = 7;
        ID_PROVIDER_VIMEO = 8;
        ID_PROVIDER_HLS = 9;

        var YOUTUBE_privacy_STATUS_PUBLIC = "public";
        var YOUTUBE_privacy_STATUS_PRIVATE = "private";
        var YOUTUBE_privacy_STATUS_OCULTO = "unlisted";

        //CONTROLLERS
        CONTROLLER_TYPE_AKAMAIHD = "akamaihd";
        CONTROLLER_TYPE_AKAMAIHDS = "akamaihds";
        CONTROLLER_TYPE_TRITON = "triton";
        CONTROLLER_TYPE_HTML5NATIVE = "html5native";
        CONTROLLER_TYPE_YT = "youtube";
        CONTROLLER_TYPE_DM = "dailymotion";
        CONTROLLER_TYPE_VIMEO = "vimeo";
        CONTROLLER_TYPE_HLS = "hls";
        CONTROLLER_TYPE_REAL_HLS = "Realhls";

        //-- control fullscreen en dispositivos moviles
        _fullscreen = false;

        var _settings = settings;
        var _mediaPlayer,_topPlayer, _externalDomain, _isHttps, _windowError, _reset, _urlBase, _id_video, _id_cuenta;
        var playerConfig, renditions;
        var use_youtube;
        var meta_youtube = false;

        var _parentEmbed;

        this.url_FAPI = "";
        this.data_FAPI = {};

        this.init = function()
        {
            autoLoad.apply(this);
        }

        this.setEmbed = function(embed){

            _parentEmbed = embed;
        }

        this.getEmbed = function(){
            return _parentEmbed;
        }
        //_isHttps= data.urlProtocol.isHttps;
        /**
         * Constructora
         */
        var autoLoad = function()
        {
            _windowError = new psd.media.TopWindowError({id_container:_settings.player.container,width:_settings.player.width, height:_settings.player.height, secure:_isHttps});
            var _basePubli;
            var setMm_base= function(alias){
                var mensaje;
                switch (alias){
                    case psd.media.LOCAL:
                        _settings.base = "";
                        mensaje= "LOCAL";
                        break;
                    case psd.media.INTEGRACION:
                        _settings.base = "//playerint.top.prisasd.com";
                        mensaje= "INTEGRACIÓN";
                        break;
                    case psd.media.PRODUCCION:
                        _settings.base = "//playertop.elpais.com";
                        mensaje= "PRODUCCIÓN";
                        break;
                    default :
                        _settings.base = alias;
                        mensaje= "URL BASE PERSONALIZADA: "+ alias;
                }
                if(typeof (mm_simple_compilation)!= "undefined"){
                    console.log("\nENTORNO "+ mensaje + "\nmm_simple_compilation: "+mm_simple_compilation + "\n");
                }
                else{
                    console.log("\nENTORNO "+ mensaje + "\n");
                }
            };
            if(typeof(mm_base)!="undefined"){
                if(mm_base==true || mm_base==false){
                    mm_base= "loc";
                }
                if(typeof(mm_base)=='string'){
                    setMm_base(mm_base);
                }
            }

            var setMm_basePubli= function(alias){
                var mensaje;
                switch (alias){
                    case psd.media.LOCAL:
                        _basePubli = "";
                        mensaje= "PUBLICIDAD LOCAL";
                        break;
                    case psd.media.INTEGRACION:
                        _basePubli = "//playerint.top.prisasd.com";
                        mensaje= "PUBLICIDAD INTEGRACIÓN";
                        break;
                    case psd.media.PRODUCCION:
                        _basePubli = "//playertop.elpais.com";
                        mensaje= "PUBLICIDAD PRODUCCIÓN";
                        break;
                    default :
                        _basePubli = alias;
                        mensaje= "PUBLICIDAD PERSONALIZADA: "+ alias;
                }
                console.log("\nENTORNO "+ mensaje + "\n");

            };
            if(typeof(mm_publi)!="undefined"){
                if(mm_publi==true || mm_publi==false){
                    mm_publi= "loc";
                }
                if(typeof(mm_publi)=='string'){
                    setMm_basePubli(mm_publi);
                }
            }

            _externalDomain = _settings.base != null && _settings.base != undefined ? _settings.base : false;

            var addDependence = function(url){
                var i;
                for(i = 0; i < url.length; i++){
                    var head, tag;
                    head = document.getElementsByTagName('head')[0];
                    tag = document.createElement('script');
                    if(typeof(mm_publi)!="undefined"){
                        tag.src = _basePubli + url[i];
                    }
                    else{
                        tag.src = _settings.base + url[i];
                    }
                    tag.type = 'text/javascript';
                    head.appendChild(tag);
                }
            };
            //cargamos detección de adBlock y biblioteca publi.
            addDependence([URL_PUBLI, URL_ADBLOCK]);
            if((_settings.stats != null) && (_settings.stats.conf != null) && ((_settings.stats.conf != ""))&& (typeof(psd.statistics)=="undefined"))
            {            
                var dependencesUrls = [];
                dependencesUrls.push(_externalDomain ? (_settings.base + URL_STATS) : URL_STATS);

                var libraryParams = {depends: dependencesUrls,
                     success: onDependencesComplete,
                     error: onDependencesError,
                     scope: this
                };

                LibraryManager.load(libraryParams);
            }
            else{getDataWS();}
        };


        /**
         * La carga de dependencias se han completado
         */
        var onDependencesComplete = function()
        {
            getDataWS.apply(this);
        }

        /**
         * Error en la carga de dependencias
         */
        var onDependencesError = function() {
            //NOTA: Error en la carga de la librerías TopPlayer
            if (_settings.ws.mediaType == VIDEO_MEDIA_TYPE){_windowError.paintMessage(ERROR_CARGA_STATISTICS);}
        }


        var getDataWS = function (){
            _urlBase = _settings.ws.urlBase;
            //cuando esté listo ws.urlBase sin el http quitar esta línea
            _urlBase= castUrlBase(_urlBase);
            ////////////////////////////////
            _id_video = _settings.ws.id_video;
            _id_cuenta = _settings.ws.id_cuenta;
            loadMediator.apply(this);
        }

        /////esta función hay que quitar una vez que el servicio de dato me devuelva la ws.urlBase sin el http
        var castUrlBase = function(_urlBase){
            if(_urlBase.indexOf("http")!= -1){
                var arrayUrlBase;
                arrayUrlBase= _urlBase.split("//");
                _urlBase= "//" + arrayUrlBase[1];
            }
            return _urlBase;
        }
        //////////////////////////////////////////////////////////////////////////////////////////////////////

        var loadMediator = function(){
            if(_settings.ws.mediaType == undefined){ _settings.ws.mediaType = VIDEO_MEDIA_TYPE}

            var _jsonParser = new psd.framework.parser.JSONParser();
            var _dataVideoMediator = new psd.framework.Mediator();
            _dataVideoMediator.corsIE(true);
            _dataVideoMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_COMPLETE, onDataComplete, this);
            _dataVideoMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_ERROR, onDataError, this);

            _that.url_FAPI = _urlBase+"/v1/search/"+_id_cuenta+"/"+_settings.ws.mediaType+"/idref/"+_id_video, _jsonParser;

            if((typeof(window.mm_tfp)!="undefined")&&(window.mm_tfp==true)){
                _that.url_FAPI += "/tfp";
            }

            _dataVideoMediator.mediate(_that.url_FAPI, _jsonParser, psd.framework.Mediator.RESPONSE_JSON);
        }

        this.addSetting = function(value)
        {
            _settings = value;

            //dmena -> generacion url iframe
            //var m_type =  _settings.ws.mediaType == VIDEO_MEDIA_TYPE ? VIDEO_MEDIA_TYPE : AUDIO_MEDIA_TYPE;
            //var iframe_src = value.ws.urlBase.replace("/api","") + "/embed/" + value.ws.id_cuenta + "/" + m_type + "/" + value.extra.id + "/" + value.ws.id_video;
        }

        //EVENTOS MEDIATOR
        var onDataComplete = function (evt)
        {
            var _videoData = evt.result.parserResult;

            //if(_videoData.code == psd.framework.ParserResult.PARSER_SUCCESS_CODE) {
            if(_videoData.code == psd.framework.ParserResult.PARSER_SUCCESS_CODE && typeof _videoData.result == 'object' && _videoData.result.total > 0) {
                _that.data_FAPI = _videoData.result;
                deferredLoadData(_videoData.result);
            }else {
                //NOTA: PARSER ERROR - msg:  + _videoData.msg
                if (_settings.ws.mediaType == VIDEO_MEDIA_TYPE){_windowError.paintMessage(psd.media.TopLauncherEvent.EVENT_ERROR);}

                var obj = {};
                obj.errorType = ERROR_SERVICIO_MEDIA;
                this.dispatchEvent(new psd.media.TopLauncherEvent(psd.media.TopLauncherEvent.EVENT_ERROR, obj));
            }
        };

        var onDataError = function (evt)
        {
            if (_settings.ws.mediaType == VIDEO_MEDIA_TYPE){_windowError.paintMessage(ERROR_PARSER);}

            var obj = {};
            obj.errorType = ERROR_SERVICIO_MEDIA;
            this.dispatchEvent(new psd.media.TopLauncherEvent(psd.media.TopLauncherEvent.EVENT_ERROR, obj));
        }
        //EVENTOS MEDIATOR

        /**
         *
         * @param data - Datos relacionados con un video en concreto
         */

        var deferredLoadData = (function(launcher){return function(data){loadData.apply(launcher,[data]);}})(this);

        var check_youtube = function(datai,data){
            var ret = false;

            if (
                (typeof(datai.type) != null)
                    //condición type = youtube
                    && (datai.type.name == "YOUTUBE")
                    //condición src != ""
                    && (datai.src != "")
                    //condición status de youtube = processed
                    &&(datai.tag=="processed")
                    //condición youtube_privacy_status para ver si el vídeo es público o privado
                    && (playerConfig.media.youtube_privacy_status != YOUTUBE_privacy_STATUS_PRIVATE)
                ) {

                //compruebo la propiedad intelectual y si está activa continuo como youtube

                if (data.meta_intellectual_property) {
                    for (meta in data.meta_intellectual_property) {
                        if (data.meta_intellectual_property[meta].name == "youtube")
                            ret = true;
                    }
                }

                return ret;
            }
        }

        var loadData = function (data)
        {
            data = data["data"][0];
            // ↑↑↑ EXPLICACIÓN DE ESTA COSA TAN RARA
            // Cuando se cambió el servicio de datos de la FAPI se añadió un nivel más de encapsulamiento,
            // estando los datos que esperábamos contenidos en un array con posición 0 contenido en un objeto "data"

            //NOTA: Detección dispositivo
            var mobile = (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));
            var iphone = navigator.userAgent.match(/iPhone/i);

            //Seteamos valores e instanciamos SimpleMediaPlayer
            var srcUDS, defaultMime;

            var assetsBitRates = [];

            playerConfig = _settings;

            defaultMime = (_settings.ws.mediaType == AUDIO_MEDIA_TYPE)? "audio/mp3":"video/mp4";

            if ((data.description != undefined)&&(data.description != null)){
                data.description= data.description.replace(/<[^>]*>?/g, '');
            }
            try{
                playerConfig.id = data.idref;
                playerConfig.media = {
                    type:  (data.asset.length>0)?data.asset[0].mimetype:defaultMime //NOTA: type --> Se puede coger el mimetype de cualquiera de los elementos de assets, ya que todos van a devolver el mismo valor.
                    , title: (data.name != undefined)?data.name:""
                    , desc: (data.description != undefined)?data.description:""
                    , author: (data.author != undefined)?data.author:""
                    , date: (data.created_at != undefined)?(data.created_at.split(' ')[0]):""
                    , duration: (data.length != undefined)?data.length:""
                    , live: (data.islive != undefined)?data.islive:false
                    , isDvr: (data.isdvr != undefined)?data.isdvr:false
                    , cdn: { provider:""}
                    , tags:(data.tags != undefined)?data.tags:undefined
                    , urlMosaic: data.url_mosaic
                    , chapter: data.chapter
                    , season: data.season
                    , geo_location: data.geo_location
                    , youtube_privacy_status: data.youtube_privacy_status
                    , id_contract: (data.id_contract != undefined)?data.id_contract:""
                    , details: (data.details != undefined)?data.details:null
                    , tags_externals: (data.tags_externals != undefined)?data.tags_externals:""
                }

                if(_settings.ws.mediaType == AUDIO_MEDIA_TYPE){playerConfig.media.poster = (data.url_audio_still!= undefined)?data.url_audio_still:"";}
                else {playerConfig.media.poster = (data.url_video_still!= undefined)?data.url_video_still:"";}

                if (data.provider.id == ID_PROVIDER_AKAMAIHD){
                    playerConfig.media.cdn.provider = CONTROLLER_TYPE_AKAMAIHD;
                    playerConfig.media.clipBegin="1418403600000";
                    playerConfig.media.clipEnd="1418418900000";
                    playerConfig.media.absolute=true;
                }
                else{
                    playerConfig.media.cdn.provider = CONTROLLER_TYPE_AKAMAIHDS;
                }

                playerConfig.id_provider = data.provider.id;
                playerConfig.id_external = data.id_external;

                //dmena funcion de prueba para nuevos assets
                if(data.asset.length>0){
                    _that.isExternal = false;

                    for(_asset in data.asset){
                        if( (typeof(data.asset[_asset].type)!="undefined")&&
                            (data.asset[_asset].type!=null)&&
                            (typeof(data.asset[_asset].type.name)!="undefined")&&
                            (data.asset[_asset].type.name!=null)
                        ){
                            if(data.asset[_asset].type.name=="YOUTUBE"){

                                if(check_youtube(data.asset[_asset],data)){
                                    playerConfig.id_provider = ID_PROVIDER_YT;
                                    playerConfig.id_external = data.asset[_asset].src;
                                    _that.isExternal = true;
                                }
                            }else{
                                if(data.asset[_asset].type.name=="TRITON"){
                                    playerConfig.id_provider = ID_PROVIDER_TRITON;
                                    playerConfig.id_external = data.asset[_asset].src;
                                    _that.isExternal = true;
                                }
                            }
                        }
                    }
                }



                playerConfig.eskup = {idEskup:(data.id_es_kup != undefined)?data.id_es_kup:""}
                playerConfig.media.srcHTML5 = [];

                //****SRC & SRCHTML5
                //NOTA: SÓLO CUANDO NO ES HTTPS - Cogemos las url de playlist tanto para FLASH como para una de las urls de html5 (IOS). La otra url para html5 es de tipo UDS y se ha cogido de la que menos calidad tenga de los assets (arriba)
                if (data.playlist.length > 0){
                    for(var i=0; i<data.playlist.length; i++)
                    {
                        if (data.playlist[i].type_url.name == _TYPE_FLASH){playerConfig.media.src = data.playlist[i].url}
                        else if (data.playlist[i].type_url.name == _TYPE_IOS)
                        {
                            //Para los audios de los dispositivos móviles, no funcionan los m3u8. Sólo incluiremos las urls de UDS
                            if ((!mobile) || ((mobile) && ((playerConfig.skin.mode == "video") || (playerConfig.skin.mode == undefined)))){playerConfig.media.srcHTML5.push(data.playlist[i].url);}
                        }
                    }
                }

				//tucumovido
				
                //Añadimos el parámetro DIST en caso de que esté seteado en el window
                if(typeof(mm_dist)!="undefined"){
                    if(data.asset.length>0){
                        for(var ii=0;ii<data.asset.length;ii++){
                            for(var jj=0;jj<data.asset[ii].url.length;jj++){
                                var concat = "?";
                                if(data.asset[ii].url[jj].url.indexOf("?")>0){
                                    concat = "&";
                                }

                                data.asset[ii].url[jj].url += (concat + "dist=" + mm_dist);
                            }
                        }
                    }
                }

                // DMENA nueva funcionalidad YOUTUBE/CUSTOM
                // Aquí rellenamos el campo CUSTOM para todos los elementos de ASSET.
                // En caso de que sean normales y antiguos, CUSTOM = TRUE. En caso de que sean Youtube, CUSTOM = FALSE

                use_youtube = false;

                if(data.asset.length>0){
                    for(var ii=0; ii<data.asset.length; ii++)
                    {
                        data.asset[ii].custom = false;

                        //si no hay TYPE, para hacerlo retrocompatible
                        if(typeof(data.asset[ii].type)=="undefined"){
                            data.asset[ii].custom = true;
                        }else{
                            //si el TYPE es CUSTOM
                            if(
                                (data.asset[ii].type==null)||
                                    (data.asset[ii].type.name=="CUSTOM")||
                                    (data.asset[ii].type=="")
                                ){
                                data.asset[ii].custom = true;

                            //si el TYPE es de YOUTUBE y se cumplen las condiciones para pintar youtube
                            }else{
                                if((typeof(playerConfig.media.youtube_privacy_status)=="undefined")||(playerConfig.media.youtube_privacy_status==YOUTUBE_privacy_STATUS_OCULTO)){
                                    playerConfig.media.youtube_privacy_status = YOUTUBE_privacy_STATUS_PUBLIC;
                                }

                                var _metaYouTube = function (youtube) {

                                    if (youtube) {
                                        use_youtube = true;
                                        playerConfig.id_provider = ID_PROVIDER_YT;
                                        playerConfig.id_external = data.asset[ii].src;
                                        playerConfig.skin.id = "transparent";
                                        if (typeof (playerConfig.ads) == "undefined") {
                                            playerConfig.ads = {};
                                        }
                                        playerConfig.ads.enabled = false;

                                       /*Hacemos la llamada del API-iFrame y seteamos los valores para no volver a llamarla*/

                                        if (typeof (playerConfig.topPlayer) == "undefined") {
                                            playerConfig.topPlayer = {};
                                        }
                                        if (typeof (playerConfig.topPlayer.media) == "undefined") {

                                            playerConfig.topPlayer.media = {};
                                        }

                                        if (typeof (playerConfig.topPlayer.media.YTiFrame) == "undefined") {
                                            playerConfig.topPlayer.media.YTiFrame = {};
                                            playerConfig.topPlayer.media.YTiFrame = true;
                                        }


                                        //if (typeof(YT) == 'undefined' || typeof(YT.Player) == 'undefined') {
                                        if (typeof(mm_ytload) == 'undefined') {
                                            window.mm_ytload = false;

                                            var tag = document.createElement('script');
                                            var t = document.createTextNode("function onYouTubePlayerAPIReady(){mm_ytload = true;}");
                                            tag.appendChild(t);
                                            document.body.appendChild(tag);


                                            //var tag = document.createElement('script');
                                            //tag.type = 'text/javascript';
                                            //if (!getDevice().mobile) {
                                            //    //tag.async = true;
                                            //}
                                            //tag.src = "https://www.youtube.com/iframe_api";
                                            //var firstScriptTag = document.getElementsByTagName('script')[0];
                                            //firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
                                        }

                                    }
                                }

                                /*En caso de que de ser un video Remoto comprovamos si el provider es Youtube*/
                                if (playerConfig.id_provider == ID_PROVIDER_YT) {

                                     meta_youtube = true;
                                    _metaYouTube(meta_youtube);

                                }
                            }
                        }
                    }
                }else{

                    /*Pasamos por este flujo en aquellas señales que son videos remotos de YouTube con asset=[]*/

                    /*Para los casos en que utilicemos players de YouTube pero no tengamos assets, seteamos para llamar al IframeAPI desde el Top player*/

                    if (typeof (playerConfig.topPlayer) == "undefined") {
                        playerConfig.topPlayer = {};
                    }
                    if (typeof (playerConfig.topPlayer.media) == "undefined") {

                        playerConfig.topPlayer.media = {};
                    }

                    if (typeof (playerConfig.topPlayer.media.YTiFrame) == "undefined") {
                        playerConfig.topPlayer.media.YTiFrame = {};
                        playerConfig.topPlayer.media.YTiFrame = false;
                    }

                }

                if((!use_youtube)&&(_that.isExternal==false)){
                    //NOTA: Cogemos url UDS para HTML5 con menor bitrate para http y https
                    if (data.asset.length > 0)
                    {
                        var lowBitRate = {};
                        for(var j=0; j<data.asset.length; j++)
                        {
                            if(data.asset[j].custom){
                                //Tanto si es la primera vez que entra en el bucle como si encuentra un bitrate inferior, actualiza el objeto lowBitRate
                                if ((lowBitRate.bitrate == undefined) ||(data.asset[j].bitrate < lowBitRate.bitrate))
                                {
                                    lowBitRate.index = j;
                                    lowBitRate.bitrate =  data.asset[j].bitrate;
                                }
                            }
                        }

                        //Cogemos la url UDS del menor bitrate
                        for(var k=0; k<data.asset[lowBitRate.index].url.length; k++)
                        {
                            if(data.asset[lowBitRate.index].custom){
                                if ((data.playlist.length==0)&&(data.asset[lowBitRate.index].url[k].type_url.name == _TYPE_IOS))
                                {
                                    srcIOS = data.asset[lowBitRate.index].url[k].url;
                                    playerConfig.media.srcHTML5.push(srcIOS);
                                }
                                
                                if (data.asset[lowBitRate.index].url[k].type_url.name == _TYPE_UDS)
                                {
                                    srcUDS = data.asset[lowBitRate.index].url[k].url;
                                    playerConfig.media.srcHTML5.push(srcUDS);
                                }
                                else if ((data.asset[lowBitRate.index].url[k].type_url.name == _TYPE_FLASH) && (playerConfig.id_provider == ID_PROVIDER_GENERIC))
                                {
                                    playerConfig.media.src = data.asset[lowBitRate.index].url[k].url;
                                }
                            }
                        }
                        //Si no hay url de html5, ponemos la url de Flash
                        if (playerConfig.media.srcHTML5.length == 0){playerConfig.media.srcHTML5.push(playerConfig.media.src);}
                    }
                    //****SRC & SRCHTML5


                    //****RENDITIONS - Sirve para mandar los bitrates que hay para que el usuario pueda manualmente cambiar de uno a otro, a través del botón de la barra de progreso
                    if (data.asset.length > 0)
                    {
                        for(var z=0; z<data.asset.length; z++)
                        {
                            if(data.asset[z].custom){
                                var asset = {};
                                asset.assetBitrate = data.asset[z].bitrate;
                                asset.assetHeight = data.asset[z].height;
                                assetsBitRates.push(asset)
                            }
                        }
                        if(assetsBitRates.length>0){
                            //Ordena el array por bitrate (ascendente);
                            assetsBitRates = assetsBitRates.sort(function(a,b){return parseFloat(a.assetBitrate) - parseFloat(b.assetBitrate)});

                            var nameRendition = NAME_HEIGHT;
                            playerConfig.media.renditions = [];
                            for(var i=0; i<assetsBitRates.length; i++)
                            {
                                if(nameRendition == NAME_BITRATE){playerConfig.media.renditions.push(assetsBitRates[i].assetBitrate + "bps");}
                                else if (nameRendition == NAME_HEIGHT){playerConfig.media.renditions.push(assetsBitRates[i].assetHeight + "p");}
                            }
                        }
                    }
                    //****RENDITIONS
                }

				//tucu movido desde tucumovido
                if (typeof (playerConfig.media.src) != "undefined") {
                    var URLtest = playerConfig.media.src;

                    if (URLtest.indexOf(".m3u8") > 0) {
                        playerConfig.id_provider = ID_PROVIDER_HLS;
                    }
                }

                if (((_settings.media.live)&&(playerConfig.id_provider==ID_PROVIDER_PRISADIGITAL))||((playerConfig.id_provider == ID_PROVIDER_HLS)&&((this.hlsIsSupported()== false)||(this.hlsIsSupported()=== undefined)))||(playerConfig.id_provider==ID_PROVIDER_GENERIC)) {
                    var s = document.createElement("script");
                    s.src = _settings.base + "/psdmedia/resources/js/ext/swfobject/swfobject.js";
                    document.querySelector("head").appendChild(s);
                }
				
                if (playerConfig.ads != null)
                {
                    if ((data.ptags != undefined) && (data.ptags != null))
                    {
                        playerConfig.ads.pTags = data.ptags;
                    }
                }

                //NOTA: Para móviles sólo ponemos el modo html5 y directLink, para pc pondremos flash
                if (mobile){playerConfig.player.mode = "html5,directlink"}
                else {playerConfig.player.mode = "flash"}


                //INSTANCIACIÓN PLAYER
                //TODO: Evaluar mediante el estudia del useragent la siguiente propiedad
                var isExplorer10 = false;

                //Forzamos el skin generic para versiones no compatibles con Full Screen html5
                //if (!isExplorer10 && (_id_cuenta == ID_CUENTA_MERISTATION))
                //    playerConfig.skin.id = "generic";

                if (playerConfig.skin.id != "generic")
                {
                    renditions = [];

                    var aux;
                    for(var i=0; i<assetsBitRates.length; i++)
                    {
                        aux = {"label":assetsBitRates[i].assetHeight + "p" , "bitrate": assetsBitRates[i].assetBitrate + "bps" }
                        renditions.push(aux);
                    }

                    //Nota: Cargamos primero la librería TopPlayer porque necesitamos acceder a constantes para la configuración
                    if (!_reset)
                    {
                        //Carga dinámica de TopPlayer

                        var topPlayerLibrary = {depends: _externalDomain ? (_settings.base + URL_TOP_PLAYER) : URL_TOP_PLAYER
                            , success: onTopPlayerLibraryComplete
                            , error: onTopPlayerLibraryError
                            , scope: this
                        };

                        if(typeof (mm_top_compilation)=="undefined"){
                            LibraryManager.load(topPlayerLibrary);
                        }
                        else{
                            setConfigTopPlayer.apply(this);
                        }
                    }
                    else {setConfigTopPlayer.apply(this);}

                }
                else
                {
                    //NOTA en el caso de que esté activo el skin html5 se anula para el caso de iphone con video por incompatibilidad con el dispositivo. El player de audio se vería con el skin
                    if ((playerConfig.skin.html5 == true) && (iphone == "iPhone"))
                    {
                        if ((playerConfig.skin.mode == undefined) || (playerConfig.skin.mode == "video")){playerConfig.skin.html5 = false}
                    }

                    if (_reset)
                    {
                        _reset = false;

                        var mediaItem = {};
                        mediaItem.type = playerConfig.media.type;
                        mediaItem.title = playerConfig.media.title;
                        mediaItem.desc = playerConfig.media.desc;
                        mediaItem.poster = playerConfig.media.poster;
                        mediaItem.src = playerConfig.media.src;
                        mediaItem.srcHtml5 = playerConfig.media.srcHTML5;
                        mediaItem.live = playerConfig.media.live;
                        mediaItem.cdn = {};
                        mediaItem.cdn.provider = playerConfig.media.cdn.provider;
                        mediaItem.renditions = playerConfig.media.renditions;

                        _mediaPlayer.load(mediaItem);
                    }
                    else {
                        _mediaPlayer = new psd.media.SimpleMediaPlayer(playerConfig);
                        this.dispatchEvent(new psd.media.TopLauncherEvent(psd.media.TopLauncherEvent.EVENT_INI));
                        _mediaPlayer.init();
                        //NOTA: Los eventos se recogen desde dónde se instancia el TopLauncher, en lugar de recogerlo desde aquí

                        //Estadísticas
                        if((_settings.stats != null) && (_settings.stats.conf != null) && (_settings.stats.conf != ""))
                        {
                            statisticsManager = new psd.statistics.StatisticsManager();
                            statisticsManager.setup(_settings.stats.conf);
                            statisticsManager.subscribe(_mediaPlayer);
                        }
                    }
                }
            }
            catch (err)
            {
                console.log("ERROR!!!:",err);
                if (_settings.ws.mediaType == VIDEO_MEDIA_TYPE){_windowError.paintMessage();}
            }
        }

        var onTopPlayerLibraryComplete = function()
        {
            setConfigTopPlayer.apply(this);
        }

        var setConfigTopPlayer = function()
        {
            var config;

            if (playerConfig.topPlayer){config = playerConfig.topPlayer;}
            else {config = {};}

            //SOCIAL
            if (!config.social){config.social = {};}

            config.social.eskupData = playerConfig.eskup;


            //GENERIC
            if (!config.generic){config.generic = {};}

            config.generic.container = playerConfig.player.container,
                config.generic.id = playerConfig.player.container.replace(".","_") + "_TopPlayer",
                config.generic.width = playerConfig.player.width,
                config.generic.height = playerConfig.player.height,
                config.generic.urlBase = playerConfig.base,
                config.generic.id_player = playerConfig.extra.id,
                config.generic.id_cuenta = playerConfig.ws.id_cuenta;


            //UI
            if (!config.ui){config.ui = {};}

            //TODO: Descomentar la linea de abajo y comentar el skin de prueba. Está así porque el skin que actualmente devuelve no existe y da error
            config.ui.skin = playerConfig.skin.id,
                //config.ui.skin = emic.top.UIModule.SKIN_TEST,
                config.ui.poster = playerConfig.media.poster,
                config.ui.bgColor = playerConfig.player.bgColor,
                config.ui.skinData = playerConfig.skin,
                config.ui.absoluteTime = playerConfig.media.absoluteTime,
                config.ui.overrideNativeControls = playerConfig.skin.html5
            config.ui.showPreview = false;
            //config.ui.preview = "", //TODO: pendiente por parte de Nacho
            //config.ui.previewData = "",//TODO: pendiente por parte de Nacho

            //AD
            if (!config.ad){config.ad = {};}

            if(typeof(config.ad.enabled)!="undefined"){
                if(typeof(playerConfig.ads) != "undefined")
                    playerConfig.ads.enabled = config.ad.enabled;
            }

           /*en caso de ser un ID con controlador de you tube se fuerza la publi a false*/
            if (typeof(playerConfig.ads) != "undefined") {

                if (typeof(playerConfig.ads.enabled) != "undefined") {
                    if (playerConfig.ads.enabled) {
                        playerConfig.ads.enabled = true;
                    } else {
                        playerConfig.ads.enabled = false;
                    }
                } else {
                    playerConfig.ads.enabled = true;
                }
            } else {
                playerConfig.ads = {};
                playerConfig.ads.enabled = false;
            }

            if(use_youtube){
                playerConfig.ads.enabled = false;
            }

            if (playerConfig.ads.enabled)
            {

                //config.ad.conf = "http://10.90.1.61:33399/psdmedia/media/simple/TopLauncher/data/conf_html5.json",
                if (playerConfig.ads.conf){config.ad.conf = playerConfig.ads.conf;}
                if (playerConfig.ads.pTags){config.ad.pTags = playerConfig.ads.pTags;}
                if (playerConfig.ads.enabled){config.ad.enabled = playerConfig.ads.enabled;}

            }
            else {

                config.ad.enabled = false;
            }

            //****MEDIA****//
            if (!config.media){config.media = {};}
            

            if(typeof mm_autoplay!="undefined")
                mm_autoplay = true;

            switch (playerConfig.id_provider)
            {
                case ID_PROVIDER_TRITON:
                    if((getDevice().mobile)&&(typeof mm_autoplay!="undefined"))
                        mm_autoplay = false;

                    config.media.id = playerConfig.id_external;
                    config.media.idTOP = playerConfig.id;
                    config.media.provider = "triton";

                    if (playerConfig.media.live){
                        config.media.controllerPriority= [emic.top.MediaModule.CONTROLLER_TYPE_TRITON];
                        config.media.tecPriorityPC = [emic.top.MediaModule.TECHNOLOGY_HTML5];
                    }
                    else {config.media.controllerPriority= [emic.top.MediaModule.CONTROLLER_TYPE_AKAMAIHD];}

                    break;
                case ID_PROVIDER_GENERIC:
                    config.media.id = playerConfig.id;
                    config.media.idTOP = playerConfig.id;
                    config.media.url = playerConfig.media.src;
                    config.media.urlHTML5 = playerConfig.media.srcHTML5;
                    config.media.controllerPriority = [emic.top.MediaModule.CONTROLLER_TYPE_AKAMAIHD, emic.top.MediaModule.CONTROLLER_TYPE_HTML5NATIVE];
                    config.media.tecPriorityPC = [emic.top.MediaModule.TECHNOLOGY_HTML5, emic.top.MediaModule.TECHNOLOGY_FLASH];
                    config.media.provider = "generic";
                    break;
                case ID_PROVIDER_PRISADIGITAL:
                case ID_PROVIDER_BRIGHTCOVE:
                    config.media.id = playerConfig.id;
                    config.media.idTOP = playerConfig.id;
                    config.media.url = playerConfig.media.src;
                    config.media.urlHTML5 = playerConfig.media.srcHTML5;
                    config.media.controllerPriority= [emic.top.MediaModule.CONTROLLER_TYPE_AKAMAIHDS, emic.top.MediaModule.CONTROLLER_TYPE_HTML5NATIVE];

                    //-- fuerza en caso de no-directo y audio, al reproductor HTML5
//                    if (/*_settings.ws.mediaType == 'audio' && */!_settings.media.live) {
//                        config.media.tecPriorityPC = [emic.top.MediaModule.TECHNOLOGY_HTML5, emic.top.MediaModule.TECHNOLOGY_FLASH];
//                    } else {
//                        config.media.tecPriorityPC = [emic.top.MediaModule.TECHNOLOGY_FLASH, emic.top.MediaModule.TECHNOLOGY_HTML5];
//                    }

                    if ((_settings.media.live)&&(_settings.ws.mediaType==VIDEO_MEDIA_TYPE)) {
                        config.media.tecPriorityPC = [emic.top.MediaModule.TECHNOLOGY_FLASH, emic.top.MediaModule.TECHNOLOGY_HTML5];
                    }
                    else {
                        config.media.tecPriorityPC = [emic.top.MediaModule.TECHNOLOGY_HTML5, emic.top.MediaModule.TECHNOLOGY_FLASH];
                    }

                    config.media.provider = "prisadigital";
                    break;
                case ID_PROVIDER_YT:
                    config.media.id = playerConfig.id_external;
                    config.media.idTOP = playerConfig.id;
                    config.media.controllerPriority= [emic.top.MediaModule.CONTROLLER_TYPE_YT];
                    config.media.tecPriorityPC = [emic.top.MediaModule.TECHNOLOGY_HTML5];
                    config.media.provider = "youtube";
                    break;
                case ID_PROVIDER_DM:
                    config.media.id = playerConfig.id_external;
                    config.media.idTOP = playerConfig.id;
                    config.media.controllerPriority= [emic.top.MediaModule.CONTROLLER_TYPE_DM];
                    config.media.tecPriorityPC = [emic.top.MediaModule.TECHNOLOGY_HTML5];
                    config.media.provider = "dailymotion";
                    break;
                case ID_PROVIDER_HLS:
                    config.media.id = playerConfig.id;
                    config.media.idTOP = playerConfig.id;
                    config.media.url = playerConfig.media.src;
                    config.media.urlHTML5 = playerConfig.media.srcHTML5;
                    //TODOjc
                    if(this.hlsIsSupported()){
                        config.media.controllerPriority= [emic.top.MediaModule.CONTROLLER_TYPE_REAL_HLS, emic.top.MediaModule.CONTROLLER_TYPE_HLS, emic.top.MediaModule.CONTROLLER_TYPE_HTML5NATIVE];
                    } else {
                        config.media.controllerPriority= [emic.top.MediaModule.CONTROLLER_TYPE_HLS, emic.top.MediaModule.CONTROLLER_TYPE_HTML5NATIVE];
                    }
                    config.media.provider = "hls";
                    break;
                default:
                    config.media.id = playerConfig.id;
                    config.media.idTOP = playerConfig.id;
                    config.media.url = playerConfig.media.src;
                    config.media.urlHTML5 = playerConfig.media.srcHTML5;
                    config.media.provider = "default";

                    config.media.controllerPriority= [emic.top.MediaModule.CONTROLLER_TYPE_AKAMAIHD, emic.top.MediaModule.CONTROLLER_TYPE_HTML5NATIVE];
            };

            //Si en la configuración del player hay un valor seleccionado en el campo Autoplay distito de Nulo, cogemos esa opción como prioritaria.
            //En caso contrario cogemos el valor del json si es que llega, sino el valor por defecto sería autoplay=false.
            if (playerConfig.player.autoplay != null){config.media.autoplay= playerConfig.player.autoplay;}
            else if (config.media.autoplay == undefined){config.media.autoplay = false;}

            //config.media.autoplay= playerConfig.player.autoplay;
            config.media.wmode= playerConfig.player.wmode;
            config.media.title= playerConfig.media.title;
            config.media.description= playerConfig.media.desc;
            config.media.isLive= playerConfig.media.live;
            config.media.isDVR = playerConfig.media.isDvr;
            config.media.clipBegin= playerConfig.media.clipBegin;
            config.media.clipEnd= playerConfig.media.clipEnd;
            config.media.absolute= playerConfig.media.absolute;
            config.media.author= playerConfig.media.author;
            config.media.date= playerConfig.media.date;
            config.media.duration = playerConfig.media.duration;
            config.media.urlMosaic = playerConfig.media.urlMosaic;
            config.media.chapter = playerConfig.media.chapter;
            config.media.season = playerConfig.media.season;
            config.media.geo_location = playerConfig.media.geo_location;
            config.media.youtube_privacy_status = playerConfig.media.youtube_privacy_status;
            config.media.details = playerConfig.media.details;

            if(config.media.isLive)
                config.media.defaultLive = config.media.idTOP;

            if (playerConfig.security != undefined)
            {
                config.media.authParams = playerConfig.security.authParams;
                config.media.authParamsHTML5 = playerConfig.security.authParamsHTML5;
            }

            config.media.mimetype = playerConfig.media.type;
            config.media.renditions = renditions;


            config.media.tags = {};
            config.media.tags.canal = getTagByLetter.apply(this, ["Canal"]);
            config.media.tags.programa = getTagByLetter.apply(this, ["P"]);
            config.media.tags.emisora = getTagByLetter.apply(this, ["E"]);
            config.media.tags.seccion = getTagByLetter.apply(this, ["S"]);
            config.media.tags.tematica = getTagByLetter.apply(this, ["T"]);
            config.media.tags.tematicaParent = getTagByLetter.apply(this, ["W"]);
            config.media.tags.allTags = getAllTags.apply(this, [config.media.tags]); // Metemos en el objetos todos los tags con comas para posteriormente usarlo tanto en la v13 de las estadísticas como para segmentar publicidad
            config.media.tags.allTagsList = getAllTagsList(config.media.tags.allTags); // variable List3
            config.media.tags.externals = getTagsExternals(playerConfig.media.tags_externals);


            //ESTADÍSTICAS
            if (!config.stat){config.stat = {};}

            if((playerConfig.stats != null) && (playerConfig.stats.conf != null) && (playerConfig.stats.conf != ""))
            {
                config.stat.conf = playerConfig.stats.conf;
                if (!config.stat.extraData){config.stat.extraData = {};}

                config.stat.extraData.canal = config.media.tags.canal;
                config.stat.extraData.programa = config.media.tags.programa;
                config.stat.extraData.emisora = config.media.tags.emisora;
                config.stat.extraData.seccion = config.media.tags.seccion;
                config.stat.extraData.tematica = config.media.tags.tematica;
                config.stat.extraData.tematicaParent = config.media.tags.tematicaParent;
                config.stat.extraData.tipoContenido = "Programa";
                config.stat.extraData.idTop = playerConfig.id;
                config.stat.extraData.playerName = playerConfig.extra.description;
                config.stat.extraData.tags = config.media.tags.allTags;
                config.stat.extraData.tagsList = config.media.tags.allTagsList;
                config.stat.extraData.id_contract = playerConfig.media.id_contract;
                config.stat.extraData.tags_externals = config.media.tags.externals;


            }
            else {
                config.stat.enabled = false;
            }

			//TODOjc1402 y 2404
            if(typeof mm_autoplay_disable != 'undefined' && mm_autoplay_disable == true){
                _reset = false;
                mm_autoplay_disable = false;
            }
            if(!(typeof mm_autoplay != 'undefined' && mm_autoplay == true)) {
    			if(typeof mm_playlist_no_reset != 'undefined' && mm_playlist_no_reset == true){
    				_reset = false;
                    mm_playlist_no_reset = false;
    			}
            }

            if (_reset)
            {
                _reset = false;

                if (_topPlayer != undefined){_topPlayer.load(config);}
            }
            else
            {
				_topPlayer = new emic.top.TopPlayer();
				_topPlayer.addEventListener(emic.top.event.TopEvent.ON_READY,onTopEventsReady, this);

				//compruebo la propiedad intelectual,si es youtube y no tiene cover ponemos autoplay=false #1.4
				if (config.media.provider == 'youtube') {

					if (typeof(config.media.cover) != 'undefined') {
						if (!config.media.cover) {
							//config.media.autoplay = false;
						}
					}
				}

				_topPlayer.init(config);

				if(typeof _topPlayer.setLauncher == 'function')
					_topPlayer.setLauncher(this);
            }
        }

        var onTopEventsReady = function()
        {
            this.dispatchEvent(new psd.media.TopLauncherEvent(psd.media.TopLauncherEvent.EVENT_INI));
        }

        var onTopPlayerLibraryError = function()
        {
            //Error carga librería TopPlayer
            if (_settings.ws.mediaType == VIDEO_MEDIA_TYPE){_windowError.paintMessage(ERROR_CARGA_TOP_PLAYER);}
        }

        var getTagByLetter = function(letter)
        {
            var tags = "";

            if (playerConfig.media.tags != undefined)
            {
                if (playerConfig.media.tags.length > 0)
                {
                    for(var i=0; i<playerConfig.media.tags.length; i++)
                    {
                        if (playerConfig.media.tags[i].type == letter)
                        {
                            tags += (tags == "")?(playerConfig.media.tags[i].name):(","+playerConfig.media.tags[i].name);
                        }
                    }

                    return tags;
                }
                else {return "";}
            }
            else {return "";}
        }

        var getAllTags = function(tagsObj)
        {
            var tags = "";
            for(tagName in tagsObj)
            {
                if ((tagsObj[tagName] != "") && (tagsObj[tagName] != " "))
                {
                    tags +=(tags == "")?(tagsObj[tagName]):("," + tagsObj[tagName]);
                }
            }

            return tags;
        }

        var getAllTagsList = function (tagsList) {

            var StringList = tagsList.replace(/,/gi, ";");

            return StringList;
        }

        var getTagsExternals = function (tagslist) {

            if (tagslist != '') {
                var arrayTags = '',
                    semicolon = ';';

                for (a in tagslist) {
                    if (a == tagslist.length - 1) {
                        semicolon = ''
                    }
                    arrayTags += tagslist[a].idref + semicolon;
                }

                return arrayTags;

            } else {

                return '';
            }

        }

        var getUrlHttps = function(url)
        {
            var arraySrc = url.split("://")[1].split("/");
            arraySrc[0] = _URL_HOST_HTTPS; //Cambiado el dominio que llegue por el de https

            return arraySrc.join("/");
        }

        this.getMediaPlayer = function()
        {
            if (_mediaPlayer) {return _mediaPlayer;}
            else if(_topPlayer){return _topPlayer;}
        }

        this.reset = function(urlBase, id_cuenta, id_video, reset_config)
        {
            if(urlBase==undefined){
                urlBase = _settings.ws.urlBase;
            }

            for(var i in reset_config){
                var level0 = reset_config[i];

                if(_settings[i]!=undefined){
                    for(var j in level0){
                        var level1 = level0[j];
                        if(typeof(_settings[i][j])!="undefined")
                            _settings[i][j] = level1;
                    }
                }
            }

            _reset = true;

            _id_cuenta = id_cuenta;
            _id_video = id_video;


            loadMediator.apply(this);

        }

        this.setRatio = function(_widht,_height,_preserve){
            _topPlayer.setRatio(_widht,_height,_preserve);
        }

        this.hlsIsSupported = function(){
            var mediaSource = window.MediaSource = window.MediaSource || window.WebKitMediaSource;
            var sourceBuffer = window.SourceBuffer = window.SourceBuffer || window.WebKitSourceBuffer;
            var isTypeSupported = mediaSource && typeof mediaSource.isTypeSupported === 'function' && mediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"');

            // if SourceBuffer is exposed ensure its API is valid
            // safari and old version of Chrome doe not expose SourceBuffer globally so checking SourceBuffer.prototype is impossible
            var sourceBufferValidAPI = !sourceBuffer || sourceBuffer.prototype && typeof sourceBuffer.prototype.appendBuffer === 'function' && typeof sourceBuffer.prototype.remove === 'function';
            return isTypeSupported && sourceBufferValidAPI;
        }
    }

    namespace.TopLauncher = TopLauncher;

})(psd.media);(function(namespace) {
    // Inheritance class
    TopEmbed.prototype = new psd.framework.EventDispatcher();

    function TopEmbed(iniSettings, pFromManager)
    {
        // Super
        psd.framework.EventDispatcher.call(this);

        /**
         * className psd.media.TopEmbed
         */
        this.className = "psd.media.TopEmbed";

        var _that = this;

        URL_BASE_DEV = "//webfastapi.top.des.prisadigital.int"; //url_desarrollo
        URL_BASE_PRO = "//fapi-top.prisasd.com"; //url producción
        //URL_BASE_SSL = "https://topsslpl-a.akamaihd.net";

        MEDIA_TYPE_VIDEO = "video";
        MIN_PLAYER_WIDTH = 320; //Es el mínimo ancho de reproducción de la publicidad.
        ERROR_PARSER = "Error Code #1";

        ERROR_SERVICIO_PLAYER = "Error_servicio_player";
        ERROR_SERVICIO_MEDIA = "Error_servicio_media";

        var _iniSettings = iniSettings;
        this.iniSettings = _iniSettings;

        var _dev = false;

        var  _windowError, _url_base_api, _mediaLauncherTop, _mediaPlayer, _data, _reset;
        var _isInitialized = false;
        this.playList = undefined;

        var _embedToManager = function(){
            console.log('**************************************************************');
            console.log('lo metemos en el manager');
            console.log('**************************************************************');

            var _tmpManager = new psd.media.TopEmbedManager();
            _tmpManager.addEmbed(this);
        }

        /**
         ** si no viene desde el manager (pFromManager no está en true)
         ** * si tiene managerOpt, metemos este embed en el manager --> manager.add()
         ** * si no tiene managerOpt, metemos este embed en el manager, despues del EVENT_INI --> manager.addEmbed()
        **/
        if(typeof _iniSettings != "undefined"){
            if(typeof pFromManager != "boolean"){
                if(typeof _iniSettings.managerOpt == 'undefined'){
                    this.addEventListener(psd.media.TopEmbedEvent.EVENT_INI, _embedToManager, this);
                }
            } else {
                if(pFromManager){
                    if(_iniSettings.managerOpt != "undefined"){
                        delete _iniSettings.managerOpt;
                    }
                }
            }
        }
        
        var _init = function()
        {
            if (_iniSettings != undefined) {
                if(typeof _iniSettings.managerOpt != 'undefined'){
                    console.log('..........................................................................');
                    console.log('debe de ir al manager');
                    console.log(_iniSettings);
                    var _tmpManager = new psd.media.TopEmbedManager();
                   var _managerOpt = _iniSettings.managerOpt;
                    delete _iniSettings.managerOpt;
                    _tmpManager.add(_iniSettings, _managerOpt, this);
                    console.log('..........................................................................');
                    return;
                }

                //2017-08-30, URL_list está vacia, entonces es playList = true;
                if(typeof _iniSettings.playList == 'object' && _iniSettings.playList.URL_list === ""){
                    _iniSettings.playListBAK = _iniSettings.playList;
                    _iniSettings.playList = true;
                }
                //2017-08-30, playList=true, recupera los tags y genera una playList
                if(typeof _iniSettings.playList == 'boolean' && _iniSettings.playList === true){
                    this.addEventListener(psd.media.TopEmbedEvent.EVENT_INI,_playListInitWithTags, this);
                    _iniSettings.playList = "";
                }
                if(typeof _iniSettings.playList == 'object' && JSON.stringify(_iniSettings.playList) != "{}"){
                    var playListConf = iniSettings.playList;
                    _iniSettings.playList = '';
                    this.setPlayList(playListConf, _iniSettings);
                } else {
                    //Añadimos una funcionalidad para poder pintar players en divs que no tienen identificador.
                    if((_iniSettings.id_container==null)||((_iniSettings.id_container==undefined))||(_iniSettings.id_container==""))
                    {
                        var _auxid = "PLAYER_" + (parseInt(Math.random()*1000) + new Date().getTime());

                        document.write("<div id='" + _auxid + "'></div>");

                        _iniSettings.id_container = _auxid;
                    }

                    if (_iniSettings.dev != undefined){_dev = _iniSettings.dev;}
                    else {_dev = false;}

                    setWindowError();
                    getUrlBase.apply(this);
                    loadMediator.apply(this);
                }
            }
        }

        //2017-08-30, playList=true, recupera los tags y genera una playList
        var _playListInitWithTags = function(){

            this.removeEventListener(psd.media.TopEmbedEvent.EVENT_INI,_playListInitWithTags, this);
            if(this.getMediaPlayer!=undefined && this.getMediaPlayer().getData!=undefined && this.getMediaPlayer().getData().mediaData!=undefined){
                var _tags = this.getMediaPlayer().getData().mediaData.tags.externals;
                if(_tags.length > 0){
                    _tags = _tags.split(';');
                    for(var i in _tags){
                        _tags[i] = 'tags_externals.idref|'+ _tags[i];
                    }
                    _tags = _tags.join(',');
                    var _urlPlayList = _data.ws.urlBase +"/v1/search/"+_iniSettings.id_cuenta+"/"+_iniSettings.media_type+"/tags?tags=mn(idref|"+_iniSettings.id_media+")m("+_tags+")&orderBy=modify_at|desc&size=12&itemIdref=" + _iniSettings.id_media;
                    var _plSet;
                    if(typeof _iniSettings.playListBAK=='object'){
                        _plSet = _iniSettings.playListBAK;
                        _plSet.URL_list = _urlPlayList;
                        delete(_iniSettings.playListBAK);
                    } else {
                        if(_iniSettings.media_type == MEDIA_TYPE_VIDEO)
                            _plSet = {URL_list: _urlPlayList, nextpanel: {active: true, time: 5, skin: 'default'}};
                        else
                            _plSet = {URL_list: _urlPlayList};
                    }
                    delete(_iniSettings.id_media);
                    delete(_iniSettings.playList);
                    this.setPlayList(_plSet, _iniSettings);
                }
            }
        }

        var destroyActivePlayList = function(){
            if(this.getSettings()!=undefined) {
                if(this.getSettings().isPlaylist === true){
                    //mm_playlist_no_reset = true;
                    this.playList.destroyPlayLists();
                    this.playList = null;
                    _iniSettings.isPlaylist = false;
                    _iniSettings.playlistUrl = '';
                }
            }
        }

        this.setPlayList = function(pConfPlaylist, pConfPlayer){
            if(typeof this.getMediaPlayer() != 'undefined' && typeof this.getMediaPlayer().getMediaModule() != 'undefined')
                this.getMediaPlayer().getMediaModule().stop();

            //si existe una playList, la reseteamos
            destroyActivePlayList.apply(this);

            if(typeof pConfPlaylist.id_container != 'undefined' && pConfPlaylist.id_container != ''){
                var tmp = document.getElementById(pConfPlaylist.id_container);
                if(!(tmp == null))
                    tmp.innerHTML = '';
            }
            if(typeof pConfPlayer.id_container != 'undefined' && pConfPlayer.id_container != ''){
                var tmp = document.getElementById(pConfPlayer.id_container);
                if(!(tmp == null))
                    tmp.innerHTML = '';
            }

            this.playList = new psd.media.TopEmbedPlaylist(this, pConfPlaylist);
            if(typeof pConfPlayer == 'object'){
                this.playList.setPlayerSettings(pConfPlayer);
                this.playList.init();
            } else {
                if(this.isInitialized()){
                    this.playList.init();
                } else {
                    this.addEventListener(psd.media.TopEmbedEvent.EVENT_INI,_playListInit, this);
                }
            }
        }

        var _playListInit = function(){
            this.removeEventListener(psd.media.TopEmbedEvent.EVENT_INI,_playListInit, this);
            this.playList.init();
        }
        /** **/

        this.getSettings = function(){
            return _iniSettings;
        }

        var getUrlBase = function()
        {
            if (_dev){_url_base_api = URL_BASE_DEV;}
            else {_url_base_api = URL_BASE_PRO;}
        }

        var loadMediator = function(){
            var _jsonParser = new psd.framework.parser.JSONParser();
            var _dataVideoMediator = new psd.framework.Mediator();
            _dataVideoMediator.corsIE(true);
            _dataVideoMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_COMPLETE, onDataComplete, this);
            _dataVideoMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_ERROR, onDataError, this);
            _dataVideoMediator.mediate(_url_base_api +"/api/" + _iniSettings.id_cuenta + "/player/" + _iniSettings.id_player, _jsonParser, psd.framework.Mediator.RESPONSE_JSON);
        }

        var setWindowError = function(){
            if (_iniSettings.overwriteWidth){width = _iniSettings.overwriteWidth;}
            else {width = document.getElementById(_iniSettings.id_container).clientWidth;}

            if (_iniSettings.overwriteHeight){height = _iniSettings.overwriteHeight; }
            else {height = document.getElementById(_iniSettings.id_container).clientHeight;}

            _windowError = new psd.media.TopWindowError({id_container:_iniSettings.id_container, width:width, height:height, secure:_iniSettings.secure});
        }

        //EVENTOS MEDIATOR
        var onDataComplete = function (evt)
        {
            var _playerData = evt.result.parserResult;
            if(_playerData.code == psd.framework.ParserResult.PARSER_SUCCESS_CODE) {
                loadData.apply(this, [_playerData.result])
            }
            else {
                if ((_iniSettings.media_type == undefined) || (_iniSettings.media_type == MEDIA_TYPE_VIDEO)){_windowError.paintMessage(ERROR_PARSER);}

                var obj = {};
                obj.errorType = ERROR_SERVICIO_PLAYER;
                this.dispatchEvent(new psd.media.TopEmbedEvent(psd.media.TopEmbedEvent.EVENT_ERROR, obj));
            }
        };

        var onDataError = function (evt)
        {
            if ((_iniSettings.media_type == undefined) || (_iniSettings.media_type == MEDIA_TYPE_VIDEO)){_windowError.paintMessage(ERROR_PARSER);}

            var obj = {};
            obj.errorType = ERROR_SERVICIO_PLAYER;
            this.dispatchEvent(new psd.media.TopEmbedEvent(psd.media.TopEmbedEvent.EVENT_ERROR, obj));
        }
        //EVENTOS MEDIATOR


        var loadData = function (data)
        {
            //data.base = ""; //NOTA: SÓLO DE PRUEBA. COMENTAR ESTA LINEA

            _data = data;

            //NOTA: Ponemos el player sin autoplay para safari por problema al conectar con la señal cuando hay autoplay
            if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent))
            {
                if (data.ws.mediaType == MEDIA_TYPE_VIDEO) {
                    _data.player.autoplay = false;
                }
            }

            data.ws.id_video = _iniSettings.id_media;
            data.player.container = _iniSettings.id_container;

            // si existe el objeto topPlayer
            if (typeof(_iniSettings.topPlayer) != "undefined") {

                if (typeof(_iniSettings.topPlayer.media) != "undefined") {
                    if (_iniSettings.topPlayer.media.autoNext != undefined) {
                        _data.player.autoNext = _iniSettings.topPlayer.media.autoNext;
                    }
                    if (_iniSettings.topPlayer.media.clickPlayList != undefined) {
                        _data.player.clickPlayList = _iniSettings.topPlayer.media.clickPlayList;
                    }
                    if (_iniSettings.topPlayer.media.autoplay != undefined) {
                        if(_iniSettings.topPlayer.media.autoplay == true || _iniSettings.topPlayer.media.autoplay == false){
                            _data.player.autoplay = _iniSettings.topPlayer.media.autoplay;
                        }
                    }

                }
            }

            if(_iniSettings.topPlayer){data.topPlayer = _iniSettings.topPlayer;}

            //-- Seteamos en topPlayer para evitar el PostRoll
            if (typeof _iniSettings.isPlaylist != 'undefined') {

                if (typeof (_iniSettings.topPlayer) != "undefined") {
                    if (typeof (_iniSettings.topPlayer.media) != "undefined") {

                        _iniSettings.topPlayer.media.isPlaylist = _iniSettings.isPlaylist;
                        _iniSettings.topPlayer.media.playlistUrl = _iniSettings.playlistUrl;
                    }else{

                        _iniSettings.topPlayer.media = {};
                        _iniSettings.topPlayer.media.isPlaylist = _iniSettings.isPlaylist;
                        _iniSettings.topPlayer.media.playlistUrl = _iniSettings.playlistUrl;
                    }

                } else {

                    _iniSettings.topPlayer = {};
                    if (typeof (_iniSettings.topPlayer.media) != "undefined") {

                        _iniSettings.topPlayer.media.isPlaylist = _iniSettings.isPlaylist;
                        _iniSettings.topPlayer.media.playlistUrl = _iniSettings.playlistUrl;
                    } else {

                        _iniSettings.topPlayer.media = {};
                        _iniSettings.topPlayer.media.isPlaylist = _iniSettings.isPlaylist;
                        _iniSettings.topPlayer.media.playlistUrl = _iniSettings.playlistUrl;
                    }


                }


                data.topPlayer = _iniSettings.topPlayer;
            }

            /*Guardamos los datos de Ancho y Alto en caso de que lleguen de PAIS*/

            if(typeof (_iniSettings.ancho)!="undefined"||typeof (_iniSettings.alto)!="undefined") {

                if (typeof (data.topPlayer) == "undefined") {

                    data.topPlayer = {};

                }

                if (typeof (data.topPlayer.media) == "undefined") {

                    data.topPlayer.media = {};
                    data.topPlayer.media.ancho = _iniSettings.ancho;
                    data.topPlayer.media.alto = _iniSettings.alto;

                } else {

                    data.topPlayer.media.ancho = _iniSettings.ancho;
                    data.topPlayer.media.alto = _iniSettings.alto;

                }

            }


            if(_iniSettings.mainPlayer){data.mainPlayer = _iniSettings.mainPlayer;}

            //Si nos llega valor lo sustituimos por lo que nos llegue en el servicio de datos, ya que será el valor del tamaño del iframe.
            if (_iniSettings.overwriteWidth){data.player.width = _iniSettings.overwriteWidth;}
            if (_iniSettings.overwriteHeight){data.player.height = _iniSettings.overwriteHeight; }

            if(_iniSettings.media_type != undefined){data.ws.mediaType = _iniSettings.media_type}
            else{ data.ws.mediaType = MEDIA_TYPE_VIDEO}

            if (_reset)
            {
                _reset = false;

                var url = _url_base_api+"/api";
                _mediaLauncherTop.addSetting(data);
                _mediaLauncherTop.reset(url, _iniSettings.id_cuenta,_iniSettings.id_media);
            }
            else {

                _mediaLauncherTop = new psd.media.TopLauncher();
                _mediaLauncherTop.addSetting(data);
                _mediaLauncherTop.init();

                _mediaLauncherTop.setEmbed(this);

                _mediaLauncherTop.addEventListener(psd.media.TopLauncherEvent.EVENT_INI,onLauncherEventsIni,this);
                _mediaLauncherTop.addEventListener(psd.media.TopLauncherEvent.EVENT_ERROR,onLauncherEventsError,this);
            }
        }

        //EVENTOS
        function onLauncherEventsIni()
        {
            _mediaPlayer = _mediaLauncherTop.getMediaPlayer();

            loadPlugins();

            //Sólo hacemos la capa más grande en el caso de los reproductores de audio. Para los playes de video, la publicidad tendrá el tamaño que han especificado del player.
            if (_data.ws.mediaType != MEDIA_TYPE_VIDEO)
            {
                _mediaPlayer.addEventListener(psd.media.MediaEvent.AD_START, onMediaAdStart);
                _mediaPlayer.addEventListener(psd.media.MediaEvent.AD_SKIP, onMediaAdSkip);
                _mediaPlayer.addEventListener(psd.media.MediaEvent.AD_COMPLETE, onMediaAdStop);
            }

            _isInitialized = true;
            this.dispatchEvent(new psd.media.TopEmbedEvent(psd.media.TopEmbedEvent.EVENT_INI));
        }

        function loadPlugins(){
            if(typeof(_iniSettings.plugins)!="undefined"){
                var _urlBase = _iniSettings.topPlayer.generic.urlBase;
                for(var i in _iniSettings.plugins){

                    var script = document.createElement("script");
                    script.type = "text/javascript";
                    script.src = _urlBase + "/psdmedia/media/top/widgets/" + _iniSettings.plugins[i].type + "/" + _iniSettings.plugins[i].type + ".js";
                    script.onload = (function(ii){
                        return function(){
                            var plugin = new window[_iniSettings.plugins[ii].type](_that);
                            plugin.init(_iniSettings.plugins[ii].conf);
                        }
                    })(i);
                    document.head.appendChild(script);
                }
            }
        }

        function onLauncherEventsError(evt)
        {
            var obj = {};
            obj.errorType = evt.data.errorType;
            this.dispatchEvent(new psd.media.TopEmbedEvent(psd.media.TopEmbedEvent.EVENT_ERROR, obj));

        }

        function onMediaAdStart(evt)
        {
            var width, height;

            //Si el ancho del player de audio es < 320, lo forzamos a 320 px de ancho
            if (_data.player.width < MIN_PLAYER_WIDTH){width = MIN_PLAYER_WIDTH}
            else {width = _data.player.width}

            //Cogiendo el ancho del reproductor, calculamos un alto con proporciones de 16:9
            height = (width * 9)/16;

            document.getElementById(_iniSettings.id_container).style.width = width + "px";
            document.getElementById(_iniSettings.id_media + "_simple").style.width =  width + "px";

            document.getElementById(_iniSettings.id_container).style.height = height + "px";
            document.getElementById(_iniSettings.id_media + "_simple").style.height =  height + "px";

        }

        function onMediaAdSkip(evt)
        {
            document.getElementById(_iniSettings.id_container).style.width = _data.player.width + "px";
            document.getElementById(_iniSettings.id_media + "_simple").style.width =  _data.player.width + "px";

            document.getElementById(_iniSettings.id_container).style.height =  _data.player.height + "px";
            document.getElementById(_iniSettings.id_media + "_simple").style.height =  _data.player.height + "px";
        }

        function onMediaAdStop()
        {
            document.getElementById(_iniSettings.id_container).style.width = _data.player.width + "px";
            document.getElementById(_iniSettings.id_media + "_simple").style.width =  _data.player.width + "px";

            document.getElementById(_iniSettings.id_container).style.height =  _data.player.height + "px";
            document.getElementById(_iniSettings.id_media + "_simple").style.height =  _data.player.height + "px";
        } 


        this.getMediaPlayer = function()
        {
            return _mediaPlayer;
        }


        this.reset = function(data)
        {
            //si se hace el STOP con mm_autoplay se escuchan a la vez los enlatados y los directos
            if(typeof(mm_autoplay)=="undefined")
                this.getMediaPlayer().getMediaModule().stop();

            if(JSON.stringify(data.playList) == "{}"){
                destroyActivePlayList.apply(this);
            }
            _reset = true;

            if (data.dev != undefined){_dev = data.dev;}
            else {_dev = false;}

            getUrlBase.apply(this);

            if(data.id_cuenta){_iniSettings.id_cuenta = data.id_cuenta;}
            if(data.id_media){_iniSettings.id_media = data.id_media;}
            if(data.media_type){_iniSettings.media_type = data.media_type;}
            if(data.id_player){_iniSettings.id_player = data.id_player;}
            if(data.id_container){_iniSettings.id_container = data.id_container;}
            if(data.topPlayer){_iniSettings.topPlayer = data.topPlayer;}
            if(data.mainPlayer){_iniSettings.mainPlayer = data.mainPlayer;}

            loadMediator.apply(this);

            if((typeof(mm_autoplay)!="undefined")&&(mm_autoplay==true)){
                if((typeof(this.getMediaPlayer())!="undefined")&&(typeof(this.getMediaPlayer().getMediaModule())!=undefined)){
                    this.getMediaPlayer().getMediaModule().play();
                    this.getMediaPlayer().getMediaModule().pause();
                }
            }
        }


        this.init = function(data)
        {
            _iniSettings = data;

            if (data.dev != undefined){_dev = data.dev;}
            else {_dev = false;}

            _init.apply(this)
        }

        this.isInitialized = function()
        {
            return _isInitialized;
        }

        this.setRatio = function(_width,_height,_preserve){
            _mediaLauncherTop.setRatio(_width,_height,_preserve);
        }

        _init.apply(this);
    }

    namespace.TopEmbed = TopEmbed;

}(psd.media));
(function(namespace) {
    // Inheritance class
    TopPlaylist.prototype = new psd.framework.EventDispatcher();

    function TopPlaylist(TopEmbedPlaylist)
    {
        // Super
        psd.framework.EventDispatcher.call(this);

        /**
         * className psd.media.TopPlaylist
         */
        this.className = "psd.media.TopPlaylist";

        this.embedplaylist = TopEmbedPlaylist;

        var _data = [];

        var _iniSettings, _skinPlaylist;

        this.index = 0;

        this.init = function(iniSettings,index)
        {
			this.addEventListener("onPlayListChangeMedia", onPlayListChangeMedia, this);
            this.index = index;
            _iniSettings = iniSettings;
            getSkinTopPlaylist.apply(this);
        }

        this.reDraw = function(){
            _skinPlaylist.paintPlaylist();
        }

        this.setData = function(data){
            _data = data;
        }

        this.resetData = function(data){
            _skinPlaylist.setDataPlaylist(data);
        }

        var getSkinTopPlaylist = function()
        {
            _skinPlaylist = new psd.media.TopPlaylist_lista(_iniSettings,this.index,this.embedplaylist);

            if(_iniSettings.playListSkin=="generica"){
                var url_template = "/psdmedia/media/simple/skinsPlaylist/playlist.css";

                var _URL_BASE = _iniSettings.player.getMediaPlayer().getData().genericData.urlBase;
                var _externalDomain = _URL_BASE != null && _URL_BASE != undefined ? _URL_BASE : false;

                if(_iniSettings.styleItemsContainer!=undefined)
                    _skinPlaylist.setType(_iniSettings.styleItemsContainer);

                var fileref=document.createElement("link"),
                    filename = _externalDomain ? (_URL_BASE + url_template) : url_template;

                fileref.setAttribute("rel", "stylesheet");
                fileref.setAttribute("type", "text/css");
                fileref.setAttribute("href", filename);
                if (typeof fileref!="undefined")
                    document.getElementsByTagName("head")[0].appendChild(fileref);
            }

            _skinPlaylist.addEventListener(psd.media.PlaylistEvent.DATA_REQUEST,onTopPlayListEvent, this);
            _skinPlaylist.addEventListener(psd.media.PlaylistEvent.DATA_COMPLETE,onTopPlayListEvent, this);
            _skinPlaylist.addEventListener(psd.media.PlaylistEvent.MEDIA_CHANGE,onTopPlayListEvent, this);
            _skinPlaylist.addEventListener(psd.media.PlaylistEvent.PLAYLIST_COMPLETE,onTopPlayListEvent, this);

            _skinPlaylist.init(_data);
            _skinPlaylist.load();
        }

        var onTopPlayListEvent = function(evt)
        {
            if (evt.type == psd.media.PlaylistEvent.DATA_COMPLETE){
                _skinPlaylist.paintPlaylist();
            }

            this.dispatchEvent(evt);
        }

        /*var onDataComplete = function(e)
        {
            this.dispatchEvent(new psd.media.PlaylistEvent(psd.media.PlaylistEvent.DATA_COMPLETE, e.data));
            _skinPlaylist.paintPlaylist();
        }*/

        this.next = function()
        {
            _skinPlaylist.next();
        }

        this. previous = function()
        {
            _skinPlaylist.previous();
        }

        this.gotoByIndex = function(index)
        {
            _skinPlaylist.gotoByIndex(index);
        }

        this.gotoByIdRef = function(idref)
        {
            _skinPlaylist.gotoByIdRef(idref);
        }

        this.changeConfig = function(obj)
        {
            _skinPlaylist.changeConfig(obj);
        }

        this.getTopPlaylist = function()
        {
            return _skinPlaylist;
        }

        this.playIndex = function (index){
            if(index<_skinPlaylist.data()[0].length)
                _skinPlaylist.loadMedia(index);
        }

		function onPlayListChangeMedia(){
			this.getTopPlaylist().setPlayerEventos();
		}
    }

    namespace.TopPlaylist = TopPlaylist;

}(psd.media));
(function(namespace) {
    // Inheritance class
    TopEmbedPlaylist.prototype = new psd.framework.EventDispatcher();

    function TopEmbedPlaylist(playerSettings,playlistSettings)
    {
        // Super
        psd.framework.EventDispatcher.call(this);

        /**
         * className psd.media.TopEmbedPlaylist
         */
        this.className = "psd.media.TopEmbedPlaylist";

        var _playerSettings = playerSettings;
        var _newPlayerSettings;

        var _playlistSettings = playlistSettings;

        var _url_list;
        var _currentPlaylist = 0;
        var _currentIndex = 0;

        var mediaTopEmbed;
        var mediaTopPlaylist;

        var _playlists = [];

        var _data;

        var _that = this;

        var _selectedIndex = 0;

        var _dataVideoMediator = null;
        var _jsonParser = null;

        var _redrawing = false;

        var _interval = null;

        var dynindex = 0;

        var _CONTAINER = null;
        var _CONTAINER_PLAYER = null;
        var _CONTAINER_PLAYLIST = null;

        var _do_resize_16_9 = false;
        var _default_player_percent = 0.7;

        var _MIN_WIDTH = 768;

        var _pendingPlayIndex = [0,-1];
        var _isDead = false;
        this.ancho = 0;
        this.alto = 0;

        this.getMediaTopEmbed = function(){
            return mediaTopEmbed;
        };

        this.getMediaTopPlaylist = function(){
            return _playlists;
        };

        this.destroyPlayLists = function(){
            for(var i in _playlists){
                if(typeof _playlists[i].getTopPlaylist == 'function'){
                    _playlists[i].getTopPlaylist().destroyBasePlayList();
                }
            }
            _isDead = true;
        }

        this.setPlayerSettings = function(pSettings){
            _newPlayerSettings = pSettings;
        }

        var onDataComplete = function(evt){
            if((evt.result!=undefined)&&(evt.result.parserResult!=undefined)&&(evt.result.parserResult.result!=undefined)&&(evt.result.parserResult.result.data!=undefined)){
                _data = evt.result.parserResult.result.data;

                //limpiar los campos description
                for(var i in _data){
                    if(_data[i].description != null){
                        var descripcion= _data[i].description;
                        descripcion= descripcion.replace(/<[^>]*>?/g, '');
                        _data[i].description= descripcion;
                    }
                }

                if(_redrawing){
                    for(_play in _playlists){
                        if(dynindex==_play){
                            _playlists[_play].resetData(_data);
                            _playlists[_play].reDraw();

                            if(_pendingPlayIndex[1]>-1){
                                this.playIndex(_pendingPlayIndex[0],_pendingPlayIndex[1]);
                                _pendingPlayIndex[1] = -1;
                            }
                        }
                    }
                }else{
                    if((_playlistSettings[_currentPlaylist].reload_secs!=undefined)&&(_playlistSettings[_currentPlaylist].reload_secs>0)){
                        (function setinter(cual){
                            _interval = setInterval(function(){
                                resetDyn.apply(this,[cual]);
                            },_playlistSettings[_currentPlaylist].reload_secs*1000);
                        })(_currentIndex);
                    }

                    _playerSettings.id_media = _data[0].idref;

                    if(_currentPlaylist==0){
                        if(typeof mediaTopEmbed != 'object'){
                            mediaTopEmbed = new psd.media.TopEmbed();
                        }

                        if(typeof _playerSettings.topPlayer != 'undefined' && typeof _playerSettings.topPlayer.media != 'undefined'){
                            this.ancho = _playerSettings.topPlayer.media.ancho;
                            this.alto = _playerSettings.topPlayer.media.alto;
                        }

                        mediaTopEmbed.init(_playerSettings);
                        mediaTopEmbed.addEventListener(psd.media.TopEmbedEvent.EVENT_INI,_loadPlaylist);
                    }else{
                        _loadPlaylist();
                    }
                }
            }
        }

        var onDataError = function(evt){
        }

        this.isArray =  function(obj){
            return Object.prototype.toString.call(obj) === "[object Array]";
        }

        this.init = function()
        {

            //parámetros por defecto;
            if(_playlistSettings.skinPlaylist!=undefined){
                // renombramos skinPlaylist a styleItemsContainer
                _playlistSettings.styleItemsContainer = _playlistSettings.skinPlaylist;
                delete _playlistSettings.skinPlaylist;
            }
            if(_playlistSettings.autoNext==undefined)
                _playlistSettings.autoNext = true;
            //este valor ya no se usa
            if(_playlistSettings.skin!=undefined)
                delete _playlistSettings.skin;
            //repeat por defecto a 2
            if(_playlistSettings.repeat==undefined)
                _playlistSettings.repeat = 2; // repeat all
            // tenemos 2 playListSkins por defecto, dependiendo de si seteamos o no el styleItemsContainer 
            if(_playlistSettings.playListSkin==undefined || _playlistSettings.playListSkin == ''){
                if(typeof _playlistSettings.styleItemsContainer != "undefined" && _playlistSettings.styleItemsContainer != ""){
                    _playlistSettings.playListSkin = 'generica';
                } else {
                    _playlistSettings.playListSkin = 'vacia';
                }
            }
            if(_playlistSettings.playListSkin == 'vacia')
                _playlistSettings.styleItemsContainer = '';
            //fin parámetros por defecto


            if(_playerSettings.className == "psd.media.TopEmbed"){
                mediaTopEmbed = _playerSettings;
                if(typeof _newPlayerSettings != 'undefined'){
                    _playerSettings = _newPlayerSettings;
                } else {
                    _playerSettings = mediaTopEmbed.getSettings();
                }
            }
            _playerSettings.isPlaylist = true; //-- desactivar publicidad POSTROLL
            _playerSettings.playlistUrl = playlistSettings.URL_list;


            if(!this.isArray(_playlistSettings))
                _playlistSettings = [_playlistSettings];

            if((_playlistSettings[0].id_container_playlist=="")||((_playlistSettings[0].id_container_playlist==undefined))){
                var _containername = _playerSettings.id_container;
                _CONTAINER = document.getElementById(_playerSettings.id_container);
           		if(_playlistSettings[0].playListSkin == 'vacia') {
	                _CONTAINER_PLAYER = document.createElement("div");
	                _CONTAINER_PLAYER.id = _playerSettings.id_container + "__player";
	                _CONTAINER_PLAYER.style.width = "100%";
	                _CONTAINER_PLAYER.style.height = "100%";
	                _CONTAINER_PLAYER.style["float"] = "left";
	                _playerSettings.id_container = _containername + "__player";
	                _CONTAINER.appendChild(_CONTAINER_PLAYER);

           		} else {
	                _CONTAINER_PLAYER = document.createElement("div");
	                _CONTAINER_PLAYER.id = _playerSettings.id_container + "__player";
	                _CONTAINER_PLAYER.style.width = "70%";
	                _CONTAINER_PLAYER.style.height = "100%";
	                _CONTAINER_PLAYER.style["float"] = "left";

	                _CONTAINER_PLAYLIST = document.createElement("div");
	                _CONTAINER_PLAYLIST.id = _playerSettings.id_container + "__playlist";
	                _CONTAINER_PLAYLIST.style.width = "30%";
	                _CONTAINER_PLAYLIST.style.height = "100%";
	                _CONTAINER_PLAYLIST.style["float"] = "left";

	                _playerSettings.id_container = _containername + "__player";
	                _playlistSettings[0].id_container_playlist = _containername + "__playlist";

	                _CONTAINER.appendChild(_CONTAINER_PLAYER);
	                _CONTAINER.appendChild(_CONTAINER_PLAYLIST);

	                _do_resize_16_9 = true;
	            }
	        }

            _jsonParser = new psd.framework.parser.JSONParser();
            _dataVideoMediator = new psd.framework.Mediator();
            _dataVideoMediator.corsIE(true);
            _dataVideoMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_COMPLETE, onDataComplete, this);
            _dataVideoMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_ERROR, onDataError, this);
            _dataVideoMediator.mediate(_playlistSettings[_currentPlaylist].URL_list, _jsonParser, psd.framework.Mediator.RESPONSE_JSON);

            (function(index){
                _currentIndex = index;
            })(_currentPlaylist);
        }

        var resetDyn = function(cual){
            _redrawing = true;

            dynindex = cual;
            //al llegar los datos se llama a -> onDataComplete
            _dataVideoMediator.mediate(_playlistSettings[cual].URL_list, _jsonParser, psd.framework.Mediator.RESPONSE_JSON);
        }

        this.resetPlayList = function(cual,conf,index){
            _playlistSettings[cual] = conf;
            resetDyn(cual);

            if(index!=null){

                var aux_current = (function(value){ return value;})(_currentIndex);

                _pendingPlayIndex = [aux_current,index];
                //this.playIndex(cual,index);
            }
        }

        var _loadPlaylist = function(){
            if(_isDead) return;
			//TODOjc1402 y 2803
			if(typeof _playlistSettings[_currentPlaylist] == 'undefined'){
				_that.getMediaTopPlaylist()[0].dispatchEvent(new psd.media.PlaylistEvent("onPlayListChangeMedia",{}));
				return;
			}
			_playlistSettings[_currentPlaylist].player = mediaTopEmbed;

            var mediaTopPlaylist = new psd.media.TopPlaylist(_that);

            if(_playlistSettings[_currentPlaylist].playerPercent!=undefined)
                _default_player_percent = _playlistSettings[_currentPlaylist].playerPercent;

            if(_currentPlaylist==_playlistSettings.length-1){
                mediaTopPlaylist.addEventListener(psd.media.PlaylistEvent.DATA_COMPLETE,
                    function(){
                        if(_do_resize_16_9){

                            //--En caso de tener fullscreen activado
                            if (!_fullscreen) {
                                _that.resize_16_9(_default_player_percent, true);
                            }
                        }
                        //_that.dispatchEvent(new psd.media.PlaylistEvent(psd.media.PlaylistEvent.DATA_COMPLETE,{}));
                    });
            }

            _playlists[_currentPlaylist] = mediaTopPlaylist;

            mediaTopPlaylist.setData(_data);
            mediaTopPlaylist.init(_playlistSettings[_currentPlaylist],_currentPlaylist);

            _currentPlaylist++;

            if(_currentPlaylist<_playlistSettings.length){
                _that.init();
            }else{
                _that.dispatchEvent(new psd.media.TopEmbedEventPlaylist(psd.media.TopEmbedEventPlaylist.EVENT_INIT,{"TopEmbed":mediaTopEmbed,"TopPlaylist":_playlists}));
            }
        }

        this.playIndex = function(indexplaylist,index){
            //console.log(_playlists,_playlists[indexplaylist]);
            _playlists[indexplaylist].playIndex(index);
        }

        this.resize_16_9 = function(percentplayer,onresize){

            var contenedor = _CONTAINER;
            var cont_player = _CONTAINER_PLAYER;
            var cont_lista = _CONTAINER_PLAYLIST

            if(contenedor==null){
                return;
            }

            var applypercent = percentplayer;

            if(playerSettings["media_type"]=="audio"){
                cont_player.style.width = "100%";
                cont_player.style.display = "inline-block";

                cont_lista.style.width = "100%";
                cont_lista.style.height = "400px";
            }else{
                var WIDTH =  Math.max(document.documentElement.clientWidth, window.innerWidth || 0)

                if(WIDTH<_MIN_WIDTH){
                    applypercent = 1;
                    if(cont_lista.className.indexOf("mm_mobile_list")<0)
                        cont_lista.className += " mm_mobile_list";
                }else{
                    applypercent = percentplayer;
                }

                var anchuratotal = contenedor.offsetWidth;

                var anchuraplayer = anchuratotal*(applypercent*100)/100;

                cont_player.style.width = Math.floor(anchuraplayer) + "px";
                cont_player.style.height = Math.floor(anchuraplayer*9/16) + "px";

                var alturatotal = cont_player.offsetHeight;

                contenedor.style.height = alturatotal + "px";

                if(applypercent==1)
                    cont_lista.style.width = anchuratotal + "px";
                else
                    cont_lista.style.width = (anchuratotal - anchuraplayer) + "px";

                cont_lista.style.height = Math.floor(alturatotal) + "px";
            }

            if(onresize){
                (function(that){
                    var _preonresize = null;

                    if(window.onresize!=null)
                        _preonresize = window.onresize;

                    window.onresize = function(){
                        if(_preonresize!=null)
                            _preonresize();

                        //--En caso de tener fullscreen activado
                        if (!_fullscreen) {

                            that.resize_16_9(percentplayer, false);

                        }

                    }
                })(this);
            }
        };
    }

    namespace.TopEmbedPlaylist = TopEmbedPlaylist;

}(psd.media));
(function(namespace) {
    function TopEmbedManager(iniSettings){
        if(typeof psd.media.psdManager != "object"){
            psd.media.psdManager = new psd.media.TopEmbedManagerGeneral(iniSettings);
        }
        
        this.add = function(config,config_image_url, _embed){
            psd.media.psdManager.add(config, config_image_url, _embed);
        }

        this.addEmbed = function(_embed){
            psd.media.psdManager.addEmbed(_embed);
        }
    }

    namespace.TopEmbedManager = TopEmbedManager;

}(psd.media));


(function(namespace) {
    // Inheritance class
    TopEmbedManagerGeneral.prototype = new psd.framework.EventDispatcher();

    //Esta clase se encarga de generar TopEmbeds automáticamente a partir del click sobre una imagen de previsualización
    //En caso de que nos manden una imagen vacía ("") se generará el player automáticamente sin esperar al click del usuario
    //Así mismo relaciona los players para que todos tengan constancia de las reproducciones de los demás y actúen en consecuencia (por ejemplo, pausar el player reproduciéndose al hacer play sobre otro)
    function TopEmbedManagerGeneral(iniSettings)
    {
        // Super
        psd.framework.EventDispatcher.call(this);
        /**
         * className psd.media.TopEmbedManagerGeneral
         */
        this.className = "psd.media.TopEmbedManagerGeneral";
        var _that = this;

        //guardamos la referencia del player en reproduccion
        var _currentEmbed;

        this.idx = -1;
        this.elemsMgr = [];

        //flag que indica que cuando pulsemos sobre un player haremos pause sobre los demás
        this.pauseOthersOnPlay = false;
        //flag que indica que cuando pulsemos sobre un player haremos mute sobre los demás
        this.muteOthersOnPlay = false;
        //función implementable por el integrador para que haga la acción deseada cuando se cambia el estado de un player
        //por defecto está configurado para que haga reset sobre el player que se estaba escuchando
       this.customActionOnPlay = function(e1,e2,t){
            this.elemsMgr[e1].embed
            if(typeof this.elemsMgr[e1].embed != "undefined" && this.elemsMgr[e1].embed != ''){
                if(typeof this.elemsMgr[e2].embed != "undefined" && this.elemsMgr[e2].embed != ''){
                    if(e1 != e2)
                        this.reset(e1);
                }   
            }
        };

        this.info2 = function(){
            if(document.getElementById('psdInfo2Manager') != null) return;
            var tmp=document.getElementById('psdInfo2Manager');
            var divInfo = document.createElement('div');
            divInfo.id = "psdInfo2Manager";
            divInfo.style = 'width: 300px;height: 100%;position: fixed;top: 0px;right: 0px;background-color: beige;opacity: 0.9;z-index: 1000000000;font-size: 1em; overflow:scroll';
            var body = document.body.appendChild(divInfo);

            var tmp = document.createElement('div');
            tmp.id = "psdInfo2ManagerBut";
            tmp.style = "position: fixed;right: 300px;background-color: sandybrown;";
            tmp.innerHTML = "<span id='psdInfo2ManagerButTxt' style='font-size:3em'>&nbsp;&rarrb;&nbsp;</span>";
            divInfo.appendChild(tmp);
            tmp.onclick = function(){
                var tmp = document.getElementById('psdInfo2Manager');
                var tmp2 = document.getElementById('psdInfo2ManagerBut');
                var tmp3 = document.getElementById('psdInfo2ManagerButTxt');
                if(tmp.style.width=="300px"){
                    tmp.style.width = "30px";
                    tmp2.style.right = "0px";
                    tmp3.innerHTML = "&nbsp;&larrb;&nbsp;";
                } else {
                    tmp.style.width = "300px";
                    tmp2.style.right = "300px";
                    tmp3.innerHTML = "&nbsp;&rarrb;&nbsp;";
                }
            }
            for(var i in this.elemsMgr){
                var tmpX = document.getElementById(this.elemsMgr[i].confs.id_container);
                tmpX.style.outline = '7px solid red';
                tmpX.onmouseover = function(){
                    var tmp = document.getElementById('divInfo_'+this.id);
                    tmp.style.backgroundColor = 'red';
                    tmp.style.color = 'white';
                };
                tmpX.onmouseout = function(){
                    var tmp = document.getElementById('divInfo_'+this.id);
                    tmp.style.backgroundColor = '';
                    tmp.style.color = '';
                };
                var tmp = document.createElement('div');
                var tmp2 = document.createElement('a');
                tmp2.onclick = (function(ind){return function(){window.location.hash = ind;}})(this.elemsMgr[i].confs.id_container);
                var tmp3 = document.createElement('div');
                tmp3.id = 'divInfo_' + this.elemsMgr[i].confs.id_container;
                tmp3.style = "border:thin solid black; margin: 10px;";
                tmp3.innerHTML = '** Sin TopEmbed **';

                tmp2.innerHTML = "("+i+") <b>"+this.elemsMgr[i].confs.id_container+"</b> ";
                var tmpDivImg = document.createElement('div');
                tmpDivImg.style = 'clear:both;'
                var tmp4 = tmpX.getElementsByTagName('img');
                if(tmp4.length > 0){
                    tmp4 = tmp4[0];
                    if(tmp4.getAttribute('data-src') == null){
                        var tmp5 = '<div style="float:left"><img src="'+tmp4.src+'" style="width:100px;" /></div>'; 
                    } else 
                        var tmp5 = '<div style="float:left"><img src="'+tmp4.getAttribute('data-src')+'" style="width:100px;" /></div>'; 
                    
                    tmp5+='<ul><li>Width:'+tmp4.getAttribute('width') +'</li><li>Height:'+tmp4.getAttribute('height')+'</li></ul>';
                    tmp5+='<div style="clear: both;"></div>';
                    tmpDivImg.innerHTML = tmp5;
                }

                tmp.appendChild(tmp2);
                tmp.appendChild(tmpDivImg);
                tmp.appendChild(tmp3);
                divInfo.appendChild(tmp);
            }

            setInterval(function(){info2Status.apply(_that)}, 1000);
        }

        info2Status = function(){

            for(var i in this.elemsMgr){
                var tmp = this.elemsMgr[i].embed;
                if(tmp != ''){
                    if(tmp.isInitialized()){
                        var tmpContainer = document.getElementById('divInfo_' + tmp.getSettings().id_container);
                        if(tmpContainer == null) {
                            var tmpContainer = document.getElementById('divInfo_' + tmp.getSettings().id_container.replace('__player',''));
                        }
                        if(tmpContainer != null) {
                            if(tmp.getMediaPlayer().getCurrentPosition() == emic.top.TopPlayer.POSITION_MEDIA){
                                tmpContainer.style.outline = '5px solid red';
                            } else {
                                tmpContainer.style.outline = '';
                            }
                            tmpContainer.innerHTML = '<ul><li>'+tmp.getMediaPlayer().getCurrentPosition()+'</li><li>'+tmp.getMediaPlayer().getMediaModule().getStatus()+'</li><li>'+tmp.getMediaPlayer().getAdModule().getStatus()+'</li>';
                        }
                    }
                }
            }
        }

        /*En caso de que Autoplay = true llegue desde la configuracion eliminamos la caratula y arranco el video*/
        this.setCover = function (config, image) {

            /*En caso de que no tengamos cover retornamos imagen=vacia*/
            if (typeof (image) != "undefined") {

                if (typeof (config.topPlayer) != "undefined") {
                    if (typeof (config.topPlayer.media) != "undefined") {

                        /*guardamos el valor de la imagen para reutilizarlo en los casos #1.5 y #2.5 'Excepcion'*/
                        config.topPlayer.media.imgCover = image;

                        /*En caso de ser movil no ponemos cover aunque esté en Autoplay #5.1*/
                        if (config.topPlayer.media.autoplay && !getDevice().mobile) {

                            /*En caso de que no tengamos cover en PC seteamos autoplay=false en YouTube #1.4*/
                            config.topPlayer.media.cover = false;

                            return "";

                        } else {

                            /*En caso de que tengamos cover en PC seteamos autoplay=true en YouTube #1.3*/
                            config.topPlayer.media.cover = true;

                            return image;
                        }
                    }
                }

                return image;

            } else {

                return "";
            }
        };

        var PcControl = function () {

            var autoplay;

            /*Si el dispositivo es un PC forzamos el autoplay a true para usar caratula+autoplay*/
            if (!getDevice().mobile) {
                autoplay = true;
            } else {
                autoplay = false;
            }

            return autoplay

        };

        /*Comprobamos si tenemos una caratula y en caso de ternerla forzamos el AUTOPLAY*/
        this.setAutoplay = function (config, cover, URLnoticia) {

            if (typeof(cover) != "undefined" && cover != "") {
                if (typeof (config.topPlayer) == "undefined") {

                    config.topPlayer = {};
                }

                if (typeof (config.topPlayer.media) == "undefined") {

                    config.topPlayer.media = {};

                    /*en caso de que no llegue link de noticias los players siempre estan sin autoplay*/
                    if (typeof(URLnoticia) != "undefined" && URLnoticia != "") {
                        config.topPlayer.media.autoplay = true;
                    } else {

                        config.topPlayer.media.autoplay = PcControl();
                    }

                } else {

                    /*en caso de que no llegue link de noticias los players siempre estan sin autoplay*/
                    if (typeof(URLnoticia) != "undefined" && URLnoticia != "") {
                        config.topPlayer.media.autoplay = true;
                    } else {

                        config.topPlayer.media.autoplay = PcControl();
                    }

                }

                return config;

            }

            return config;
        };

        /*En caso de querer insertar HTML en la caratula utilizamos esta funcion */
        this.generateHTML = function (conf,data) {

            /*Elemento customizable por parametros*/

            if (typeof(data) != "undefined") {

               var Array_custom, dom_custom ;

                dom_custom = document.createDocumentFragment();

            for (var i in data){

                Array_custom = document.createElement(data[i].HTMLelement);

                if (typeof(data[i].ClassName) != "undefined" && data[i].ClassName != "") {

                    Array_custom.className = data[i].ClassName;
                };
                Array_custom.innerHTML = data[i].value;
                dom_custom.appendChild(Array_custom);
            }

                return dom_custom;


            } else {

                return false;
            }

        };

        //función para añadir una imagen clickable que cargará un TopEmbed dinámico.
        //Al llamar a esta función se genera directamente la imagen sin tener que llamar a otra
        /*En caso de visualizarse con un dispositivo movil incluimos la URL seccion*/
        this.add = function(config,config_image_url,_embed){

            this.idx++;
            this.elemsMgr[this.idx] = {
                'embed': _embed!=undefined?_embed:''
            };

            if(getDevice().mobile === true && typeof config.plugins != 'undefined'){
                for(var i in config.plugins){
                    if(config.plugins[i].type == 'FloatingPlayerWidget'){
                        config_image_url[0] = "";
                    }
                }
            }

            if((typeof (config_image_url)=="undefined")||(config_image_url == null)){
                this.elemsMgr[this.idx].confs = this.setAutoplay(config);
                this.elemsMgr[this.idx].htmlObj = this.generateHTML(config); /*HTML personalizado*/
                this.generateContainer(this.idx, _embed);
            }else{
                this.elemsMgr[this.idx].images = this.setCover(config, config_image_url[0]);
                this.elemsMgr[this.idx].urlsNoticia = config_image_url[1];
                this.elemsMgr[this.idx].confs = this.setAutoplay(config, config_image_url[0],config_image_url[1]);
                this.elemsMgr[this.idx].htmlObj = this.generateHTML(config,config_image_url[2]); /*HTML personalizado*/
                this.generateContainer(this.idx, _embed);
            }
        };

        //función para añadir un embed que ya existe en la página del integrador
        //*** TODO *** no usar este método hasta probarlo
        this.addEmbed = function(embed){

            this.idx++;
            this.elemsMgr[this.idx] = {
                'embed': embed,
                'confs': embed.iniSettings
            };

            if(typeof embed.iniSettings.managerOpt != 'undefined'){
                this.elemsMgr[this.idx].images = embed.iniSettings.managerOpt[0];
            } else {
                this.elemsMgr[this.idx].images = "";
            }
            this.generateEmbed(this.idx);
        };

        //setea el width y height del tag img del cover
        var setWidthHeight = function (pElem, pIndex, pContainer) {
            var pContent;
            if (typeof (pContainer) != 'undefined' && pContainer != "") {
                pContent = pContainer;
            } else {
                pContent = pElem;
            }
            pElem.width = pContent.clientWidth;
            if (typeof this.elemsMgr[pIndex].confs.topPlayer.media.alto != 'undefined' && typeof this.elemsMgr[pIndex].confs.topPlayer.media.ancho != 'undefined') {
                pElem.height = (pContent.clientWidth * this.elemsMgr[pIndex].confs.topPlayer.media.alto / this.elemsMgr[pIndex].confs.topPlayer.media.ancho);
            } else {
                pElem.height = (pContent.clientWidth * 314 / 560);
            }
        };

        //crea la imagen clickable en la página a partir de un índice referente al array donde guardamos las imágenes
        this.generateContainer = function(index, _embed){
            if(this.elemsMgr[index].images != ""){
                var container = document.getElementById(this.elemsMgr[index].confs.id_container);

                //creamos la estructura de DOM de El País
                var dom_div = document.createElement("div");
                var dom_a_posicionador = document.createElement("a");
                var dom_span_boton_video = document.createElement("span");
                dom_a_posicionador.className = "posicionador";
                dom_span_boton_video.className = "boton_video";
                dom_a_posicionador.href = "javascript:void(0)";
                var img = document.createElement("img");
                if(typeof(window.lzld) == 'function'){
                    img.setAttribute('data-src', this.elemsMgr[index].images);
                    img.setAttribute('src', '//ep01.epimg.net/t.gif');
                    setWidthHeight.apply(this, [img, index, container]);
                    img.onload = function(){lzld(this);};
                } else {
                    img.src = this.elemsMgr[index].images;
                    img.onload = function(){
                        setWidthHeight.apply(_that, [this, index]);
                    }
                }
                img.style.width = "100%";
                img.style.height = "100%";

                dom_a_posicionador.onclick = (function(ind){
                    return function(e){
                        _that.generateEmbed(ind);
                        dom_a_posicionador.onclick = null;
                    }
                })(index);

                /*si no tenemos URL de noticias instanciamos directamente el player*/
                if ((typeof(this.elemsMgr[index].urlsNoticia) != "undefined")&&(this.elemsMgr[index].urlsNoticia != "")) {
                    if (!getDevice().mobile) {
                        /*Posicionamos el elemento custom HTML en el DOM*/
                        if (this.elemsMgr[index].htmlObj) {
                            dom_a_posicionador.appendChild(this.elemsMgr[index].htmlObj);
                        }
                    }else{
                        dom_a_posicionador.onclick = "";
                        dom_a_posicionador.href = this.elemsMgr[index].urlsNoticia;
                    }
                    container.innerHTML = "";
                    dom_div.appendChild(dom_a_posicionador);
                    dom_a_posicionador.appendChild(dom_span_boton_video);
                    dom_a_posicionador.appendChild(img);
                } else {
                    /*Posicionamos el elemento custom HTML en el DOM*/
                    if (this.elemsMgr[index].htmlObj) {
                        dom_a_posicionador.appendChild(this.elemsMgr[index].htmlObj);
                    }
                    dom_a_posicionador.appendChild(dom_span_boton_video);

                    /*en caso de que sea un PC ignoramos el eliminar la caratula*/
                    if (!getDevice().mobile) {
                        container.innerHTML = "";
                        dom_div.appendChild(dom_a_posicionador);
                        dom_a_posicionador.appendChild(dom_span_boton_video);
                        dom_a_posicionador.appendChild(img);
                    } else {
                        _that.generateEmbed(index);
                    }
                }
                container.appendChild(dom_div);
            }
            else{
                _that.generateEmbed(index);
            }
        };

        //genera un TopEmbed dinámicamente
        this.generateEmbed = function(indexConf){

            var onInit = function(){
                var _onMediaHandler = (function(pIndexEmbed){
                    return function(evt){
                        _currentEmbed = pIndexEmbed; //--player en reproduccion
                        if(evt.data.status=="play" || evt.data.status=="onPreloadControllerComplete"){
                            for(var i in _that.elemsMgr){
                                if(i != pIndexEmbed){
                                    if(typeof _that.elemsMgr[i].embed == 'object' && _that.elemsMgr[i].embed.isInitialized()){
                                        if(typeof _that.elemsMgr[i].embed.nextPanel == 'object'){
                                            if(_that.elemsMgr[i].embed.nextPanel.isShowPanel())
                                                _that.elemsMgr[i].embed.nextPanel.killPanel();
                                        }
                                        if(_that.elemsMgr[i].embed.getMediaPlayer().getCurrentPosition() != emic.top.TopPlayer.POSITION_PREVIEW){
                                            if(_that.pauseOthersOnPlay)
                                                _that.pause(i,true);

                                            if(_that.muteOthersOnPlay)
                                                _that.mute(i,true);

                                            if(_that.customActionOnPlay!=null){
                                                _that.customActionOnPlay.apply(_that,[i, pIndexEmbed, evt.data.status]);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        return;
                    }
                })(indexConf);

                var _onAdHandler = (function(pIndexEmbed){
                    return function(evt){
                        _currentEmbed = pIndexEmbed; //--player en reproduccion
                        for(var i in _that.elemsMgr){
                            if(i != pIndexEmbed){
                                if(typeof _that.elemsMgr[i].embed == 'object' && _that.elemsMgr[i].embed.isInitialized()){
                                    if(_that.elemsMgr[i].embed.getMediaPlayer().getCurrentPosition() != emic.top.TopPlayer.POSITION_PREVIEW){
                                        if(_that.customActionOnPlay!=null){
                                            _that.customActionOnPlay.apply(_that,[i, pIndexEmbed, evt.data.status]);
                                        }
                                    }
                                }
                            }
                        }
                    }
                })(indexConf);


                _that.elemsMgr[indexConf].embed.getMediaPlayer().getAdModule().addEventListener(emic.top.event.AdEvent.ON_AD_VIDEO_START, _onAdHandler, this);
                _that.elemsMgr[indexConf].embed.getMediaPlayer().getMediaModule().addEventListener(emic.top.event.MediaEvent.ON_STATUS_CHANGE, _onMediaHandler, this);
            }

            if(this.elemsMgr[indexConf].embed != ''){
                this.elemsMgr[indexConf].embed;
                if(this.elemsMgr[indexConf].embed.isInitialized() === true){
                    onInit();
                } else {
                    this.elemsMgr[indexConf].embed.addEventListener(psd.media.TopEmbedEvent.EVENT_INI,onInit);
                    this.elemsMgr[indexConf].embed.init(this.elemsMgr[indexConf].confs);
                }
            } else {
                this.elemsMgr[indexConf].embed = new psd.media.TopEmbed(this.elemsMgr[indexConf].confs, true);
                this.elemsMgr[indexConf].embed.addEventListener(psd.media.TopEmbedEvent.EVENT_INI,onInit);
            }
        };

        //reproduce un TopEmbed indicado por el parámetro index, referente al array de embeds que hemos guardado
        //en caso de no pasar índice se reproduce todo, lo cual es absurdo pero la posibilidad existe
        this.play = function(index){
            var _ind = _currentEmbed;
            if (typeof(index) != "undefined")
                _ind = index;
            this.setPlayPauseMute(this.elemsMgr[_ind].embed, 'play');
        };

        //pausa el TopEmbed con índice index
        //en caso de querer el comportamiento contrario, es decir, que la función aplique sobre todos los TopEmbed menos el del parámetro index se debe indicar que others=true
        this.pause = function(index,others){
            if (typeof(index) == "undefined") {
                this.setPlayPauseMute(this.elemsMgr[_currentEmbed].embed, 'pause');
            } else {
                if (typeof(others) == "undefined") {
                    for (var i in this.elemsMgr) {
                        if ((i == index)) {
                            this.setPlayPauseMute(this.elemsMgr[i].embed, 'pause');
                        }
                    }
                } else if (others == true) {
                    for (var i in this.elemsMgr) {
                        if (i != index) {
                            this.setPlayPauseMute(this.elemsMgr[i].embed, 'pause');
                        }
                    }
                }
            }
        };

        //muta el TopEmbed con índice index
        //en caso de querer el comportamiento contrario, es decir, que la función aplique sobre todos los TopEmbed menos el del parámetro index se debe indicar que others=true
        this.mute = function(index,others){
            if (typeof(index) == "undefined") {
                this.setPlayPauseMute(this.elemsMgr[_currentEmbed].embed, 'mute');
            } else {
                if (typeof(others) == "undefined") {
                    for (var i in this.elemsMgr) {
                        if ((i == index)) {
                            this.setPlayPauseMute(this.elemsMgr[i].embed, 'mute');
                        }
                    }
                } else if (others == true) {
                    for (var i in this.elemsMgr) {
                        if (i != index) {
                            this.setPlayPauseMute(this.elemsMgr[i].embed, 'mute');
                        }
                    }
                }
            }
        }

        this.setPlayPauseMute = function(pEmbed, pAccion){
            if(pEmbed != ''){
                if(pEmbed.isInitialized()){
                    switch (pAccion) {
                        case 'play':
                            pEmbed.getMediaPlayer().getMediaModule().play();
                            break;
                        case 'pause':
                            pEmbed.getMediaPlayer().pause();
                            break;
                        case 'mute':
                            pEmbed.getMediaPlayer().getMediaModule().mute();
                            break;
                    }
                }
            }
        }

        //resetea un Topembed indicado por index
        this.reset = function(pIndexEmbed){
            this.elemsMgr[pIndexEmbed].embed.getMediaPlayer().reboot();
        }

        document.addEventListener('showInfo2', function(){_that.info2()});
    }

    namespace.TopEmbedManagerGeneral = TopEmbedManagerGeneral;

}(psd.media));(function(namespace) {
    // Inheritance class
    TopPlaylist_BaseController.prototype = new psd.framework.EventDispatcher();

    function TopPlaylist_BaseController(iniSettings,index,embedplaylist)
    {
        // Super
        psd.framework.EventDispatcher.call(this);

        /**
         * className psd.media.TopPlaylist_BaseController
         */
        this.className = "psd.media.TopPlaylist_BaseController";

        REPEAT_ONE = "1";
        REPEAT_ALL = "2";

        //estilo por defecto de contenedor de items
        this.tipo = "";

        this.index = index;
        this.embedplaylist = embedplaylist;

        this.currentIdRef = "";
        this.currentStatus = "";
        this.autoPlayPlayList = true;

        var that = this;
        var mediaPlayer;

        ERROR_SERVICIO_PLAYLIST = "Error_servicio_playlist";


        var _iniSettings = {};
        //var _iniSettings = iniSettings;//-- jacob estaba comentado ,falla cuando se invoca directamente el Base_controller desde la pagina

        var _dataPage, _arrayData, _jsonParser, _dataVideoMediator;
        var _dev = false;

        var _actualGenericIndex = 0; //Índice actual que se está escuchando, según el servicio de datos

        var _current = 0; //Índice actual que se está escuchando, según nuestro modelo de datos

        var _actualPage = 0;

        var _playingPlaylist = false;
        var skinPlayer;

        var _nextPanel;

        this.destroyBasePlayList = function(){
            if(typeof this.playlistContainer == 'object'){
                this.playlistContainer.innerHTML = '';
                this.playlistContainer = false;
            }

            mediaPlayer = _iniSettings.player.getMediaPlayer().getMediaModule();

            mediaPlayer.removeEventListener(emic.top.event.MediaEvent.ON_READY, onMediaHandler);
            mediaPlayer.removeEventListener(emic.top.event.MediaEvent.ON_MEDIA_BEGIN, onMediaHandler);
            mediaPlayer.removeEventListener(emic.top.event.MediaEvent.ON_MEDIA_END, onMediaEndHandler,this);
            mediaPlayer.removeEventListener(emic.top.event.MediaEvent.ON_CUE, onMediaHandler);
            mediaPlayer.removeEventListener(emic.top.event.MediaEvent.ON_METADATA, onMediaHandler);
            mediaPlayer.removeEventListener(emic.top.event.MediaEvent.ON_ERROR, onMediaHandler);
            mediaPlayer.removeEventListener(emic.top.event.MediaEvent.ON_STATUS_CHANGE, onMediaHandler);
            mediaPlayer.removeEventListener(emic.top.event.MediaEvent.ON_VOLUME_CHANGE, onMediaHandler);
            mediaPlayer.removeEventListener(emic.top.event.MediaEvent.ON_SWITCH_REQUEST, onMediaHandler);
            mediaPlayer.removeEventListener(emic.top.event.MediaEvent.ON_SWITCH_COMPLETE, onMediaHandler);
            mediaPlayer.removeEventListener(emic.top.event.MediaEvent.ON_PROGRESS, onMediaHandler);
            mediaPlayer.removeEventListener(emic.top.event.MediaEvent.ON_SEEK_COMPLETE, onMediaHandler);
            mediaPlayer.removeEventListener(emic.top.event.MediaEvent.ON_SEEK_START, onMediaHandler);
            mediaPlayer.removeEventListener(emic.top.event.MediaEvent.ON_BUFFER_EMPTY, onMediaHandler);
            mediaPlayer.removeEventListener(emic.top.event.MediaEvent.ON_BUFFER_FULL, onMediaHandler);

            skinPlayer = _iniSettings.player.getMediaPlayer().getUIModule();
            skinPlayer.removeEventListener(emic.top.event.UIEvent.ON_ORDER_NEXT, onSkinHandler, this);
            skinPlayer.removeEventListener(emic.top.event.UIEvent.ON_ORDER_PREV, onSkinHandler, this);
        }

        this.init = function(data)
        {
        	//TODOjc1402
            mm_playlist_no_reset = true;
            //onSetPlayerEvents.apply(this);
            this.setPlayerEventos();
            //dmena XXX
            //loadMediator.apply(this);
            //dmena NNN
            this.setDataPlaylist(data);
            //TODOjc1402
            this.currentIdRef = _iniSettings.player.getSettings().id_media;
            if(typeof _iniSettings.player.getSettings().topPlayer.media.autoplay == 'boolean'){
                this.autoPlayPlayList = _iniSettings.player.getSettings().topPlayer.media.autoplay;
            }
            this.currentStatus = 'pause';

            /*Panel NextPanel*/


                if (_iniSettings.nextpanel.active) {

                    /*Pasamos la configuracion inicial al next panel*/

                    var playerConfig=_iniSettings.player.getSettings(),
                        timer = _iniSettings.nextpanel.time,
                        skin = _iniSettings.nextpanel.skin,
                        skinContainer = playerConfig.id_container + '_base',
                        urlBase = playerConfig.topPlayer.generic.urlBase,
                        IdMedia = playerConfig.id_media;

                    _nextPanel = new psd.media.NextPanel( timer, skin, skinContainer, urlBase, IdMedia);
                    _iniSettings.player.nextPanel = _nextPanel;


                }


        };

        this.setPlayerEventos = function(){
            onSetPlayerEvents.apply(this);
        }

        function onSetPlayerEvents()
        {
            //Recogemos eventos
            mediaPlayer = _iniSettings.player.getMediaPlayer().getMediaModule();

            mediaPlayer.addEventListener(emic.top.event.MediaEvent.ON_READY, onMediaHandler);
            mediaPlayer.addEventListener(emic.top.event.MediaEvent.ON_MEDIA_BEGIN, onMediaHandler);
            mediaPlayer.addEventListener(emic.top.event.MediaEvent.ON_MEDIA_END, onMediaEndHandler,this);
            mediaPlayer.addEventListener(emic.top.event.MediaEvent.ON_CUE, onMediaHandler);
            mediaPlayer.addEventListener(emic.top.event.MediaEvent.ON_METADATA, onMediaHandler);
            mediaPlayer.addEventListener(emic.top.event.MediaEvent.ON_ERROR, onMediaHandler);
            mediaPlayer.addEventListener(emic.top.event.MediaEvent.ON_STATUS_CHANGE, onMediaHandler);
            mediaPlayer.addEventListener(emic.top.event.MediaEvent.ON_VOLUME_CHANGE, onMediaHandler);
            mediaPlayer.addEventListener(emic.top.event.MediaEvent.ON_SWITCH_REQUEST, onMediaHandler);
            mediaPlayer.addEventListener(emic.top.event.MediaEvent.ON_SWITCH_COMPLETE, onMediaHandler);
            mediaPlayer.addEventListener(emic.top.event.MediaEvent.ON_PROGRESS, onMediaHandler);
            mediaPlayer.addEventListener(emic.top.event.MediaEvent.ON_SEEK_COMPLETE, onMediaHandler);
            mediaPlayer.addEventListener(emic.top.event.MediaEvent.ON_SEEK_START, onMediaHandler);
            mediaPlayer.addEventListener(emic.top.event.MediaEvent.ON_BUFFER_EMPTY, onMediaHandler);
            mediaPlayer.addEventListener(emic.top.event.MediaEvent.ON_BUFFER_FULL, onMediaHandler);

            skinPlayer = _iniSettings.player.getMediaPlayer().getUIModule();
            skinPlayer.addEventListener(emic.top.event.UIEvent.ON_ORDER_NEXT, onSkinHandler, this);
            skinPlayer.addEventListener(emic.top.event.UIEvent.ON_ORDER_PREV, onSkinHandler, this);
        };


        /*En caso de que autonext sea true o false testeamos el nextpanel*/
        var _nextCheck = function () {
            /*Mostramos el panel*/

            if (_iniSettings.nextpanel.active) {

                /*Ponemos los datos del player siguiente*/

                var assets, url_thumbnail, title;

                if (_arrayData[_actualPage].length == 0 || _current == (_arrayData[_actualPage].length) - 1) {
                    assets = _arrayData[_actualPage][0];

                } else {
                    assets = _arrayData[_actualPage][_current + 1];

                }

                /*recuperamos la URl y titulo para el panel*/
                url_thumbnail = assets.url_thumbnail;
                title = assets.name;

                _nextPanel.showPanel(url_thumbnail, title, function () {
                    that.next();
                }, function () {
                    that.resetMedia(_current, false);
                });


            } else {
                if((_current + 1) == _arrayData[_actualPage].length && _iniSettings.repeat != REPEAT_ALL){
                    //no continua la reproducción de la playList
                } else {
                    if(_iniSettings.autoNext == true)
                        that.next();
                }
            }


        } ;

        function onMediaEndHandler(evt)
        {
            if(this.embedplaylist._selectedIndex==undefined)
                this.embedplaylist._selectedIndex = 0;

            if(this.embedplaylist._selectedIndex!=this.index){
                return;
            }

            if (_playingPlaylist)
            {
                if (_iniSettings.autoNext == true)
                {
                    if (_iniSettings.repeat == REPEAT_ONE){
                        _resetMedia.apply(this);
                    }
                    else {
                        _nextCheck();
                    }
                } else {
                    _nextCheck();
                }
            }

        };

        function onMediaHandler(evt)
        {
            if (evt.type == emic.top.event.MediaEvent.ON_MEDIA_BEGIN)
            {
                that.currentIdRef = evt.id;
                _playingPlaylist = true;
            }
            if(evt.type == emic.top.event.MediaEvent.ON_STATUS_CHANGE){
                that.currentStatus = evt.data.status;
                //setSelectedState(that.currentStatus);
                setSelectedState.apply(that);
            }
        };

        function onSkinHandler(evt)
        {
            switch (evt.type)
            {
                case emic.top.event.UIEvent.ON_ORDER_NEXT:
                    this.next();
                break;

                case emic.top.event.UIEvent.ON_ORDER_PREV:
                    this.previous();
                break;
            }
        };

        var loadMediator = function()
        {
            _jsonParser = new psd.framework.parser.JSONParser();
            _dataVideoMediator = new psd.framework.Mediator();
            _dataVideoMediator.corsIE(true);
            _dataVideoMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_COMPLETE, onDataComplete, this);
            _dataVideoMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_ERROR, onDataError, this);
        };

        var loadService = function()
        {
            var obj = {};
            obj.page = _actualPage;
            this.dispatchEvent(new psd.media.PlaylistEvent(psd.media.PlaylistEvent.DATA_REQUEST, obj));

            //if(_current==0){
                //skinPlayer.externalOrder(emic.top.ui.ORDER_ENABLE_BUTTONS_PREV_OFF,_current); //---jacob Button_Previo off inicialmente
                //skinPlayer.externalOrder(emic.top.ui.ORDER_ENABLE_BUTTONS_NEXT_ON,_current)
            //}
            //_dataVideoMediator.mediate(_iniSettings.URL_list, _jsonParser, psd.framework.Mediator.RESPONSE_JSON);//--jacob nuevo parseo
        };

        //EVENTOS MEDIATOR
        var onDataComplete = function (evt)
        {
            var _playerData = evt.result.parserResult;

            if(_playerData.code == psd.framework.ParserResult.PARSER_SUCCESS_CODE) {
                _dataPage = _playerData.result;

                    _arrayData = [_dataPage];

                var obj = {};
                obj.data = _arrayData;
                obj.page = _actualPage + 1;
                this.dispatchEvent(new psd.media.PlaylistEvent(psd.media.PlaylistEvent.DATA_COMPLETE,obj));

            }else {
                var obj = {};
                obj.errorType = ERROR_SERVICIO_PLAYLIST;
                this.dispatchEvent(new psd.media.PlaylistEvent(psd.media.PlaylistEvent.EVENT_ERROR, obj));
            }
        };

        this.setDataPlaylist = function(data){
            _dataPage = data;

            _arrayData = [_dataPage];

            var obj = {};
            obj.data = _arrayData;
            obj.page = _actualPage + 1;
            this.dispatchEvent(new psd.media.PlaylistEvent(psd.media.PlaylistEvent.DATA_COMPLETE,obj));
        }

        var onDataError = function (evt)
        {
            var obj = {};
            obj.errorType = ERROR_SERVICIO_PLAYLIST;
            this.dispatchEvent(new psd.media.PlaylistEvent(psd.media.PlaylistEvent.EVENT_ERROR, obj));
        };
        //EVENTOS MEDIATOR

        this.esElMismo = function(current){
            if(that.currentIdRef==_arrayData[_actualPage][current].idref){
                return true;
            }
            else{
                return false;
            }
        }

        var setSelectedState = function(){
            this.setSelectedStateThis(this.currentStatus);
        }

        var _resetMedia = function(fromButton)
        {
            if (fromButton && that.currentIdRef == _arrayData[_actualPage][_current].idref) {
            	//TODOjc1402
				var mediaPlayer = _iniSettings.player.getMediaPlayer().getMediaModule();
				if(mediaPlayer.isPlaying()){
					that.currentStatus = 'play';
				} else {
					that.currentStatus = 'pause';
				}
                switch(that.currentStatus){
                    case "play":
                        mediaPlayer.pause();
                        break;
                    case "pause":
                        mediaPlayer.play();
                        break;
                }
            }else{
                var obj = {};
                obj.actualIndex = _current;
                obj.actualIdref = _arrayData[_actualPage][_current].idref;

                //TODOjc1402
                that.currentIdRef = _arrayData[_actualPage][_current].idref;
                mm_playlist_no_reset = true;

                this.dispatchEvent(new psd.media.PlaylistEvent(psd.media.PlaylistEvent.MEDIA_CHANGE,obj));

                var _clickPlayList= false;//es una variable de tipo bool que será "TRUE" si alguién clickeó en un elemento
                // de la lista de la Play List y quedará en "FALSE" si no lo hizo. A esta variable la vamos a pasar al TopPlayer
                // cuando termine un video "MEDIA_END" se seteará de nuevo a "FALSE".

                var _premuted = _iniSettings.player.getMediaPlayer().getData();


                if(fromButton || _iniSettings.nextpanel.active){//entra aquí cuando clickea en un elemento de la Play List
                     _autoValue = true;
                    _clickPlayList= true;
                }

                /*Reseteamos el contador para evitar conflictos en caso de que la lista sea visible*/


                if (_iniSettings.nextpanel.active) {

                    /*si el panel es activo lo cerramos*/
                    if (_nextPanel.isShowPanel()) {
                        _nextPanel.killPanel();
                    }
                }


                var tmpParams = {
                    "dev": _iniSettings.dev,
                    "id_cuenta": _iniSettings.id_cuenta,
                    "id_media": _arrayData[_actualPage][_current].idref,
                    "media_type": _arrayData[_actualPage].type,
                    "topPlayer": {
                        media: {
                            "autoplay": _autoValue,
                            "autoNext": _iniSettings.autoNext,
                            "clickPlayList": _clickPlayList,
                            "premuted": _premuted.mediaData.premuted
                        }
                    }
                };
                if(typeof this.embedplaylist.ancho == 'number' && typeof this.embedplaylist.alto == 'number'){
                    tmpParams.topPlayer.media.ancho = this.embedplaylist.ancho;
                    tmpParams.topPlayer.media.alto = this.embedplaylist.alto;
                }
                
                //lanzamos el evento, para que puedan recargar la página.
                var _tmpEvent = document.createEvent("CustomEvent");
                _tmpEvent.initCustomEvent('psdMediaChange', false, false, {
                    'id_media': tmpParams.id_media
                });
                document.dispatchEvent(_tmpEvent);

                _iniSettings.player.reset(tmpParams);

            }
        };

        this.next = function()
        {
            this.nextOnclick();
        };

        this.setSelected = function(){};

        var endPlaylist = function()
        {
            this.dispatchEvent(new psd.media.PlaylistEvent(psd.media.PlaylistEvent.PLAYLIST_COMPLETE));

            if ((typeof(_iniSettings.repeat)!="undefined") && (_iniSettings.repeat == REPEAT_ALL) )
            {
                    _resetMedia.apply(this);
            }
        };

        this.previous = function () {
            this.prevOnclick();
        };

        this.config = function(obj)
        {
            if (obj != undefined)
            {
                if (typeof (obj.URL_list) != "undefined"){_iniSettings.URL_list = obj.URL_list;}
                if (typeof (obj.autoNext) != "undefined"){_iniSettings.autoNext = obj.autoNext;}
                if (typeof (obj.pagination) != "undefined"){_iniSettings.pagination = obj.pagination;}
                if (typeof (obj.repeat) != "undefined"){_iniSettings.repeat = obj.repeat;}
                if (typeof (obj.id_cuenta) != "undefined"){_iniSettings.id_cuenta = obj.id_cuenta;}
                if (typeof (obj.player) != "undefined"){_iniSettings.player = obj.player;}
                if (typeof (obj.secure) != "undefined"){_iniSettings.secure = obj.secure;}
                if (typeof (obj.dev) != "undefined"){_iniSettings.dev = obj.dev;}
                if(typeof (obj.nextpanel) != "undefined"){
                    _iniSettings.nextpanel = obj.nextpanel;
                } else {
                    _iniSettings.nextpanel = {'active':false};
                }
            }
        };

        this.data = function()
        {
            return _arrayData;
        };

        this.actualIndex = function()
        {
            return _actualGenericIndex;
        };

        this.resetMedia = function(item,frombutton)
        {
            _current = item;

            _resetMedia.apply(this,[frombutton]);
        };

        this.load = function(iniSettings)
        {
            this.config(iniSettings);
            resetValues();
            //skinPlayer.externalOrder(emic.top.ui.ORDER_ENABLE_BUTTONS_ON,_current);//--jacob fallo al llamar a external order

            loadService.apply(this);

        };

        this.setType = function(tipo){
            this.tipo = tipo;
        }

        var resetValues = function()
        {

        };

        //FUNCIONES SOBREESCRITAS EN LAS VISTAS
        this.paintPlaylist = function(){};
        this.config(iniSettings);
    }

    namespace.TopPlaylist_BaseController = TopPlaylist_BaseController;

}(psd.media));
(function(namespace) {
    // Inheritance class
    TopPlaylist_lista.prototype = new psd.media.TopPlaylist_BaseController();

    function TopPlaylist_lista(iniSettings,index,embedplaylist)
    {

        // Super
        psd.media.TopPlaylist_BaseController.call(this, iniSettings)

        /**
         * className psd.media.TopPlaylist_lista
         */
        this.className = "psd.media.TopPlaylist_lista";

        this.index = index;
        this.embedplaylist = embedplaylist;
        this.playlistContainer = false;

        var _iniSettings = iniSettings;
        var data, _arrayData, elemento;

        var _that = this;

        var _current = 0;
        var _total;
        var _elementos = [];

        var _lastid = null;

        var _lastidrefs = "";

        //---modificar literales del footer

        var nElementos = function (elemento) {

            if (elemento >= 1 || elemento == 0) {

                return elemento + " elementos";

            } else {

                return elemento + " elemento";
            }

        }

        this.setSelectedStateThis = function(status){
            if(_current < _elementos.length){
                switch (status) {
                    case "play":
                    _elementos[_current].setIconPause();
                    break;
                    case "pause":
                    _elementos[_current].setIconPlay();
                    break;
                }
            }
        }

        this.secondsAsTimeCode = function(time, format)
        {
            var hours = Math.floor(time/3600),
                minutes = Math.floor((time - (hours*3600))/60),
                seconds = Math.floor(time - (hours*3600) - (minutes*60)),
                timecode = "";

            if(hours<10) {hours = "0" + hours;}
            if(minutes<10) {minutes = "0" + minutes;}
            if(seconds<10) {seconds = "0" + seconds;}

            if(format==null) {timecode = hours + ":" + minutes + ":" + seconds;}
            else
            {
                if(hours<1)
                    timecode = format.replace('hh:', '');
                else
                    timecode = format.replace('hh', hours);

                timecode = timecode.replace('mm', minutes);
                timecode = timecode.replace('ss', seconds);
            }

            return timecode;
        };

        //-- Pinta el listado

        this.paintPlaylist = function() {
            var _data = _iniSettings.player.getSettings().topPlayer.generic;
            var script = document.createElement("script");
            var base = _data.urlBase ? _data.urlBase : "";
            script.src = base + "/psdmedia/media/simple/skinsPlaylist/";
            switch (_iniSettings.playListSkin) {
                case 'oneplayer':
                    if (typeof(tplib) != "undefined") 
                        script.src+= "oneplayer.lib.js";
                    else
                        script.src+= "oneplayer.min.js";
                    break;
                case 'eppodcast':
                    if (typeof(tplib) != "undefined")
                        script.src+= "eppodcast.lib.js";
                    else
                        script.src+= "eppodcast.min.js";
                    break;
                case 'vacia':
                    if (typeof(tplib) != "undefined") 
                        script.src+= "vacia.lib.js";
                    else
                        script.src+= "vacia.min.js";
                    break;
                case 'generica':
                    if(!this.tipo) this.tipo = 'lista';
                default:
                    if (typeof(tplib) != "undefined") 
                        script.src+= "generica.lib.js";
                    else 
                        script.src+= "generica.min.js";
                    _iniSettings.playListSkin = 'generica';
                break;
            }
            
            script.type = 'text/javascript';
            script.onload = (function(that) {
                return function(){
                    that.onPlayListTemplateLoad();
                }
            })(this);
            document.getElementsByTagName('head')[0].appendChild(script);
        }

        this.onPlayListTemplateLoad = function(){
            _arrayData = this.data();
            _arrayData = _arrayData[0];
            _total = _arrayData.length;

            var _currentidrefs = "";

            for (var jj=0; jj < _arrayData.length; jj++)
            {
                if (_arrayData[jj] != undefined){
                    _currentidrefs += _arrayData[jj].idref;
                }
            }

            if(_currentidrefs==_lastidrefs){
                return;
            }

            _lastidrefs = _currentidrefs;

            var tpl = eval("new psd.skins."+_iniSettings.playListSkin+"(this)");
            tpl.setPlayListContainer(_iniSettings.id_container_playlist);
            this.playlistContainer = tpl.getPlayListContainer();

            if (this.playlistContainer){
                container = tpl.getItemsContainer();
                if(this.tipo){
                    if(!container.classList.contains(this.tipo)){
                        container.className+= " " + this.tipo;
                    }
                }
                _elementos = [];
                for (var jj=0; jj < _arrayData.length; jj++) {
                    if (_arrayData[jj] != undefined) {
                        elemento=_arrayData[jj];
                        item_container = tpl.addItem(elemento);
                        item_container.onclick = (function(index){
                            return function(){
                                    //TODOjc01
                                    if(!_that.esElMismo(index)){
                                        if(typeof(_that) == 'object' && typeof(_that.embedplaylist) == 'object'
                                            && typeof(_that.embedplaylist.getMediaTopEmbed) == 'function'
                                            && typeof(_that.embedplaylist.getMediaTopEmbed().getMediaPlayer) == 'function'
                                            && typeof(_that.embedplaylist.getMediaTopEmbed().getMediaPlayer().getMediaModule) == 'function'
                                            && typeof(_that.embedplaylist.getMediaTopEmbed().getMediaPlayer().getMediaModule().stop) == 'function'){
                                            _that.embedplaylist.getMediaTopEmbed().getMediaPlayer().getMediaModule().stop();
                                    }
                                }
                                _that.loadMedia(index);
                                _current = index;
                                _that.embedplaylist._selectedIndex = _that.index;
                            }
                        })(jj);

                        item_container.tag = _arrayData[jj].id;
                        _elementos.push(item_container);
                        if(_lastid!=null){
                            if(_lastid==_arrayData[jj].id){
                                this.setSelected(jj);
                            }
                        }
                    }
                    else {}
                }
            tpl.doPostCreateTpl();
            if(typeof _iniSettings.player.getSettings().topPlayer.ui == 'object'){
                if(_iniSettings.player.getSettings().topPlayer.ui.skinData.soy_embed === true){
                    var tmp = document.getElementsByTagName('body');
                    tmp[0].classList.add('widget');
                }
            }
        };

        this.prevOnclick = function(){
            _current--;
            if(_current<0)
                _current = _total-1;
            this.loadMedia(_current);
        }
        this.nextOnclick = function(){
            _current++;
            if(_current>(_total-1))
                _current = 0;
            this.loadMedia(_current);
        };


        this.setSelected = function(index){
            if(index >= _elementos.length) {
                _current = index;
            } else {
                for(j=0;j<_elementos.length;j++){
                    _elementos[j].noSelected();
                }
                if(index<_elementos.length){
                    _elementos[index].setSelected();
                    _current = index;
                    _lastid = _elementos[index].tag;
                }
            }
        };

        this.loadMedia = function(index){
                //se manda fromButton=true porque al hacer click sobre un elemento queremos que se reproduzca siempre
                this.resetMedia(index,true);
                this.setSelected(index);
            }

            this.setSelected(_current);// --Seleccionar el 1ºElemento
        };

    }

    namespace.TopPlaylist_lista = TopPlaylist_lista;

}(psd.media));
(function(namespace) {
    // Inheritance class
    TopWindowError.prototype = new psd.framework.EventDispatcher();

    function TopWindowError(iniSettings)
    {
        // Super
        psd.framework.EventDispatcher.call(this);

        /**
         * className psd.media.TopWindowError
         */
        this.className = "psd.media.TopWindowError";

        var URL_BASE_SSL = "https://topsslpl-a.akamaihd.net";
        var URL_LOGO_TOP = "/psdmedia/resources/img/top50.png";
        var URL_BACKGROUND = "/psdmedia/resources/img/gradient.png";
        var DEFAULT_URL_BASE = "http://player-top.prisasd.com";


        var _iniSettings = iniSettings;

        this.paintMessage = function (errorCode)
        {
            //if(typeof(errorCode)=="undefined"){

                var infopanel = new psd.media.InfoPanel();

                if(typeof(LANG)!="undefined")
                    window.mm_lang = LANG;
                if(typeof(window.mm_lang)=="undefined"){
                    window.mm_lang = "es";
                }

                var lang = new psd.media.Lang();

                //var _message = "El contenido no se encuentra disponible.";
                var _message = lang.translate(window.mm_lang,"contenido_no_disponible");

                infopanel.paint(_iniSettings.id_container,_message,true);

                return;
            //}
/*
            var urlLogo = _iniSettings.secure ?(URL_BASE_SSL + URL_LOGO_TOP) : (DEFAULT_URL_BASE + URL_LOGO_TOP);
            var urlBackground = _iniSettings.secure ? (URL_BASE_SSL + URL_BACKGROUND) : (DEFAULT_URL_BASE + URL_BACKGROUND);

            var playerContainer = document.getElementById(_iniSettings.id_container);

            var newContainer0 = document.createElement("div");
            newContainer0.style.display = "table";
            newContainer0.style.width = _iniSettings.width+"px";
            newContainer0.style.height = _iniSettings.height+"px";
            newContainer0.style.backgroundImage = "url(" + urlBackground + ")";
            newContainer0.style.backgroundSize = "contain";
            newContainer0.style.backgroundRepeat = "repeat-x";

            var newContainer1 = document.createElement("div");
            newContainer1.style.width = _iniSettings.width+"px";
            newContainer1.style.height = _iniSettings.height+"px";
            newContainer1.style.display = "table-cell";
            newContainer1.style.verticalAlign = "middle";
            newContainer1.style.textAlign = "center";
            newContainer1.style.fontFamily = "Trebuchet MS";
            newContainer1.style.color = "#dddddd";

            var newContainer2 = document.createElement("div");
            newContainer2.style.padding = "15px";
            newContainer2.innerHTML = '<p style="font-size: 25px; margin: 2%">Disculpe las molestias</p><p style="font-size: 15px; margin: 2%">El contenido no se encuentra disponible en estos momentos</p>';
            newContainer2.innerHTML += '<p style="font-size: 10px; margin: 2%">' + errorCode + '</p>';
            newContainer2.innerHTML += '<img src="' + urlLogo + '" alt="Top">';

            newContainer1.appendChild(newContainer2);
            newContainer0.appendChild(newContainer1);
            playerContainer.appendChild(newContainer0);
*/
        }

    }

    namespace.TopWindowError = TopWindowError;

}(psd.media));