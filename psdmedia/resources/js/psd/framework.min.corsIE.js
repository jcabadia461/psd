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

    // Completa la información sobre el user agent
    function detect() 
    {
        if (ie) { o = { msie: t, version: ua.match(/msie (\d+(\.\d+)?);/i)[1] }; }
        if (chrome) { o = { webkit: t, chrome: t, version: ua.match(/chrome\/(\d+(\.\d+)?)/i)[1]}; }
        
        if (iphone || ipad) 
        {
            o = {webkit: t, mobile: t, ios: t, iphone: iphone, ipad: ipad };
            // WTF: version is not part of user agent in web apps
            if (webkitVersion.test(ua)) { o.version = ua.match(webkitVersion)[1];}
        }
        
        if (android) { o = { webkit: t, android: t, mobile: t, version: "0"/*ua.match(webkitVersion)[1]*/ }; }
        if (safari) { o = { webkit: t, safari: t, version: ua.match(webkitVersion)[1] }; }
        if (opera) { o = { opera: t, version: ua.match(webkitVersion)[1] }; }
        
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

    // Inicializamos la información de user agent
    psd.framework.ua = detect();
    
    // Detectamos el modo de compatibilidad
    psd.framework.compatibility = detectCompatibility(psd.framework.ua);
    
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
     * @returns 
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
        
        // Tipo de respuesta de la peticion actual
        var _type = Mediator.RESPONSE_XML;
        
        // Referencia dinamica a la instancia para no perder el contexto dentro
        // de las respuestas asincronas del XMLHttpRequest
        var _mediatorInstance = this;
        
        var _deferredJSONP = (function(mediator) {return function(data) {_jsonp.apply(mediator,[data]);}})(this);
        var _jsonp = function(responseData)
        {
            var parserResult = _parser.parse(responseData),
                mediatorResult = new psd.framework.MediatorResult( psd.framework.MediatorResult.MEDIATOR_SUCCESS_CODE
                                                    , psd.framework.MediatorResult.MEDIATOR_SUCCESS
                                                    , parserResult );
                                                    
            _mediatorInstance.dispatchEvent(new psd.framework.MediatorEvent(psd.framework.MediatorEvent.MEDIATE_COMPLETE, _id, mediatorResult));
        };
		
        /**
         * Inicia la mediacion solicitada
         * @param url La url de los datos
         * @param parser El parser que se utiliza para analizar la respuesta
         * @param type El tipo de respuesta (TEXT, XML, JSON)
         */
         this.mediate = function(url, parser, type, corsIE) 
        {
            var xmlhttp, script,
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
                script.setAttribute("src", url + "?jsonp=psd.framework.mediator.jsonp." + _id);

                psd.framework.mediator.jsonp[_id] = _deferredJSONP;
                
                document.getElementsByTagName("head")[0].appendChild(script);
            } else {				

				if ((corsIE) && (typeof XDomainRequest != "undefined")){
					//console.log("Creando XDomainRequest");
					xmlhttp = new XDomainRequest();					
					
					
					var tmp = window.setInterval(function(){
						//console.log("tic", tmp);
						//console.log(xmlhttp.responseText);
						if (xmlhttp.responseText != "")
							//console.log("Llegan datos, paramos intervalo");
							//console.log(tmp);
							clearInterval(tmp);
						},500);
					
					
						
					xmlhttp.onerror = function(){
						clearInterval(tmp);
						//console.log("onerror");
						
							mediatorResult = new psd.framework.MediatorResult( psd.framework.MediatorResult.MEDIATOR_ERROR_CODE
																				, psd.framework.MediatorResult.MEDIATOR_ERROR
																				, null
																			);
							_mediatorInstance.dispatchEvent(new psd.framework.MediatorEvent(psd.framework.MediatorEvent.MEDIATE_ERROR
																, _id
																, mediatorResult));
						
						
					}
					xmlhttp.ontimeout = function(){
						clearInterval(tmp);
						//console.log("ontimeout");	
					}
					xmlhttp.onload = function(){						
						//console.log("onload");						
						clearInterval(tmp);
						//creación del xml a partir del string
						var doc=new ActiveXObject('Microsoft.XMLDOM');
						doc.async=false;
						doc.loadXML(xmlhttp.responseText);
						
						var parserResult = _parser.parse(doc);
							mediatorResult = new psd.framework.MediatorResult( psd.framework.MediatorResult.MEDIATOR_SUCCESS_CODE
								, psd.framework.MediatorResult.MEDIATOR_SUCCESS
								, parserResult
								);
							_mediatorInstance.dispatchEvent(new psd.framework.MediatorEvent(psd.framework.MediatorEvent.MEDIATE_COMPLETE
																									, _id
																									, mediatorResult));
					}
					
					/*
					var tmp = setTimeout(function(){
							console.log("Lanzo petición");
							xmlhttp.open(Mediator.REQUEST_GET, _url);
							xmlhttp.send();
						}, 500);
					*/
					xmlhttp.open(Mediator.REQUEST_GET, _url);
					xmlhttp.send();
					
				}else{
					
					// Code for Firefox, Chrome, Opera, Safari
					if (window.XMLHttpRequest) {
						xmlhttp = new XMLHttpRequest();
					}
					else { // code IE
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
									var responseData = "";
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
					
					xmlhttp.open(Mediator.REQUEST_GET, _url, true);		
					xmlhttp.send();
				};
								
                
                
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
	
}(psd.framework.utils));