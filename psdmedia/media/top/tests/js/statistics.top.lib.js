(function(window) 
{
    // Generacion del namespace psd.framework
    if(window.psd==undefined) { window.psd = {}; }
    if(window.psd.statistics==undefined) { window.psd.statistics = {}; }
    if(window.psd.statistics.plugins==undefined) { window.psd.statistics.plugins = {}; }
    
    window.psd.statistics.debug = false;
    
    if(window.location.href.indexOf("debug")!=-1) { window.psd.statistics.debug = true; }
    
})(window);(function(namespace) {

    // Inheritance class
    StatisticsManager.prototype = new psd.framework.EventDispatcher();

    /**
     * StatisticsManager es un gestor de estadísticas que permite centralizar
     * las opciones de seguimiento estadístico de una aplicación a través de
     * diferentes plugins y suites estadísticas mediante el uso de ficheros de
     * configuración y una API pública sencilla
     */
    function StatisticsManager() 
    {
		PRUEBAHEAP = 0;

        // Super
        psd.framework.EventDispatcher.call(this);

        /**
         * className psd.statistics.StatisticsManager
         */
        this.className = "psd.statistics.StatisticsManager";        
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        
        // Array de plugins registrados
        var _plugins = {length:0};
		var _currentPlugin;
        
        // Objeto de datos generales
        var _data = {};

		//Objeto de datos obligatorios
		var _pendingHeap = [];
		var _pending = null;
		var _currentTry = 0;

		_dataDynamic = [];
        
        // Objeto con las reglas de enrutamiento de eventos
        var _routing = {};
        
        // Controla si el manager ha completado la carga de las opciones de 
        // configuración y ha terminado de inicializarse
        var _initialized = false;
        
        // Lista de suscriptores de eventos
        var _subscribersList = [];
        
        // Utilidad para obtener la declaración de una clase a partir de su
        // nombre completo (paquete incluido)
        // @param className El nombre completo de la clase
        // @return La clase solicitada si se encuentra, window si no.
        var _getClass = function(className)
        {
            var namespaces = className.split("."),
                numNamespaces = namespaces.length, i,
                skinClass = (window || this);
                
            for(i=0;i<numNamespaces;i++) {skinClass = skinClass[namespaces[i]];}
                
            return skinClass;
        };
        
        // Importa la configuración del manager a partir de un objeto de configuración.
        // El objeto de configuración debe tener la siguiente estructura:
        //  OBJ
        //   |- config
        //        |---- [data] (Array)  
        //                 |--------------- {name, value}
        //        |---- [plugins] (Array)
        //                 |--------------- {id, type, url}
        //        |---- [routing] (Array)
        //                 |--------------- {name, type, plugins}
        //                 
        // @param settings Objeto con la configuración que se quiere transferir.
        var _importObjectConfiguration = function(settings) {
            
            // Comprobamos que existe la propiedad principal "config"
            if(typeof(settings.config)!="undefined")
            {
                var data    = settings.config.data,
                    plugins = settings.config.plugins,
                    routing = settings.config.routing,
                    i, length;
                			
                // Utilizamos la API pública setData() para importar
                // los datos de caracter general
                if(Object.prototype.toString.call(data)=="[object Array]"){
                    
                    for(i=0;i<data.length;i++) {
                        if(typeof(data[i])!="undefined" &&
                           typeof(data[i].name)!="undefined" &&
                           typeof(data[i].value)!="undefined") {
                           
                           this.setData(data[i].name, data[i].value);
                        }
                    }
                }
                
                // Utilizamos la API pública loadPlugin() para importar e
                // inicializar los plugins especificados en la configuración
                if(Object.prototype.toString.call(plugins)=="[object Array]"){
                    
                    for(i=0;i<plugins.length;i++) {
                        if(typeof(plugins[i])!="undefined" &&
                           typeof(plugins[i].id)!="undefined" &&
                           typeof(plugins[i].type)!="undefined") {
                           
                            if(typeof(plugins[i].url)!="undefined"){
                                this.loadPlugin(plugins[i].id, plugins[i].type, plugins[i].url);
                            } else {
                                this.loadPlugin(plugins[i].id, plugins[i].type, plugins[i].config);
                            }
                        }
                    }
                }
                
                // Utilizamos la API pública addRouting() para importar las reglas
                // de enrutamiento especificadas en la configuración
                if(Object.prototype.toString.call(routing)=="[object Array]"){
                    
                    for(i=0;i<routing.length;i++) {
                        if(typeof(routing[i])!="undefined" &&
                           typeof(routing[i].name)!="undefined" &&
                           typeof(routing[i].plugins)!="undefined" &&
                           typeof(routing[i].type)!="undefined") {
                           
                           this.addRouting(routing[i].name, routing[i].type, routing[i].plugins);
                        }
                    }
                }
                
                // Indicamos que el manager se ha inicializado
                _initialized = true;
                
                // Si tenemos subscribers en la lista, generamos los eventlisteners
                // apropiados para ellos
                length = _subscribersList.length;
                for(i=0;i<length;i++) {
                    _addListeners.apply(this, [_subscribersList[i].subscriber]);
                }
            }
        };
        
        // Añade los listeners especificados por las reglas de enrutamiento a 
        // un objeto emisor
        var _addListeners = function(emitter) {
            var routing = this.getRouting(),
                i;
            
            for(i in routing) {
                emitter.addEventListener(i, _deferredOnEmitterEvent);
            }
        }
        
        // Elimina los listeners especificados por las reglas de enrutamiento de 
        // un objeto emisor
        // var _removeListeners = function(emitter) {
        //    var routing = this.getRouting(),
        //        i;
        //    
        //    for(i in routing) {
        //        emitter.removeEventListener(i, _deferredOnEmitterEvent);
        //    }
        // }
        
        // Carga la configuración del manager a partir de un objeto de configuración
        // remoto. El fichero de configuración debe estar en formato JSON y tener la 
        // siguiente estructura:
        //{
        //    "config":{
        //        "data": [
        //            {"name": "unidadDeNegocio", "value": "40TV"},
        //            {"name": "nombreCanal", "value": "Los 40TV"}
        //        ],
        //        "plugins": [
        //            {	"id": "omniture",
        //                "type": "psd.statistics.plugins.OmniturePlugin",
        //                "url": "conf/players/psd_player/plugins/omniture.xml"
        //            }            
        //        ],
        //        "routing": [
        //            {"name": "mediaBegin", "plugins": "omniture", "type":"custom"},
        //            {"name": "mediaComplete", "plugins": "omniture", "type":"custom"},
        //            {"name": "mediaHalf", "plugins": "omniture", "type":"custom"}
        //        ]
        //    }
        //}
        // @param url URL con la dirección del fichero de configuración.
        var _importRemoteConfiguration = function(url) {
            _configMediator.corsIE(true);
            _configMediator.mediate(url, _configParser, psd.framework.Mediator.RESPONSE_JSON);            
        };

        // Fusiona dos listas de datos, uno de evento y otro general en un único
        // listado, añadiendo un prefijo "data." o "global." a cada dato en
        // función de su origen.
        // @param data Datos particulares del evento marcado
        // @param global Datos de carácter general o global
        var _merge = function(data, global) {
            var consolidated = {},
                i;
            
            // Los datos de evento se prefijan con "data."
            for(i in data) {consolidated["data."+i] = data[i];}
            
            // Los datos generales se prefijan con "global."
            for(i in global) {consolidated["global."+i] = global[i];}
            
            return consolidated;
        }
        
        // Listener que escucha el evento MEDIATE_COMPLETE del mediator del
        // fichero de configuración del manager
        // @param evt El evento de tipo MEDIATE_COMPLETE disparado
        var _onMediatorComplete = function(evt) {
            var parserResult = evt.result.parserResult;
            
            if(parserResult.code == psd.framework.ParserResult.PARSER_SUCCESS_CODE) {
                _importObjectConfiguration.apply(this, [parserResult.result]);
            }else {
                // TO-DO GESTIÓN DEL ERROR DE PARSEO
                console.log("PARSER ERROR");
                console.log(parserResult.msg);
            }
        };
        
        // Listener que escucha el evento MEDIATE_ERROR del mediator del
        // fichero de configuración del manager
        // @param evt El evento de tipo MEDIATE_ERROR disparado
        var _onMediatorError = function(evt) {
            // TO-DO GESTIÓN DEL ERROR DE LECTURA
            console.log("MEDIATE ERROR");
            console.log(evt.result.msg);
        };
        
        // Mediator para la carga de ficheros de configuración
        var _configMediator = new psd.framework.Mediator();
            _configMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_COMPLETE, _onMediatorComplete, this);
            _configMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_ERROR, _onMediatorError, this);
        
        // Parser para la carga de ficheros de configuración
        var _configParser = new psd.framework.parser.JSONParser();
        
        // Listener que escucha eventos de los emisores registrados en el manager
        // para el modo de seguimiento automático
        // @param evt El evento de seguimiento
        var _deferredOnEmitterEvent = (function(statisticsManager){return function(evt){_onEmitterEvent.apply(statisticsManager,[evt]);}})(this);
        var _onEmitterEvent = function(evt) {
            
            var subscriber = evt.target,
                pattern = _getSubscriberPattern.apply(this, [subscriber]),
                patternType,
                data = evt.data;
            
            // Si tenemos un patrón de conversión asociado al evento recibido,
            // obtenemos la información del evento a partir del patrón
            if( pattern != null) {
                
                patternType = Object.prototype.toString.call(pattern);
                
                if(patternType == "[object String]") {
                    data = subscriber[pattern];
                }else if (patternType == "[object Function]") {
                    data = pattern.apply(subscriber, [evt]);
                }else if (patternType == "[object Array]") {
                    // TO-DO Resolver un array de variables
                }
            }
            
            // Utilizamos la API pública track() para realizar el seguimiento
            // del evento de manera automática

            this.track(evt.type, data);
        };
        
        // Localiza el patrón de conversión de variables de evento
        var _getSubscriberPattern = function (subscriber) {
            var i, pattern = null,
                subscribersLength = _subscribersList.length;
            
            if(typeof(subscriber)!="undefined" && subscriber!=null) { 
                for(i=0;i<subscribersLength;i++) {
                    if(_subscribersList[i].subscriber === subscriber) {
                        pattern = _subscribersList[i].subscriptionPattern;
                        break;
                    }
                }
            }
            
            return pattern;
        }

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        
        /**
         * Importa la configuración de un fichero remoto o un objeto local
         * @param settings String con la url a un json de configuración o un 
         *                 objeto de configuración 
         */
        this.setup = function(settings) {

            var configType = Object.prototype.toString.call(settings);
            
            // Iniciamos la carga remota si el parámetro es un String, o la carga
            // local si el parámetro es un Object
            if(configType == "[object String]") {
                _importRemoteConfiguration.apply(this, [settings]);
            }else if(configType == "[object Object]") {
                _importObjectConfiguration.apply(this, [settings]);
            }
        };
        
        /**
         *  Array de plugins de estadísticas registrados
         */
        this.getPlugins = function() { return _plugins; };
        
        /**
         * Obtiene un plugin de estadísticas registrado
         * @param id El id del plugin de estadísticas
         */
        this.getPlugin = function(id) {return _plugins[id];}; 
        
        /**
         * Registra un plugin de estadísticas existente
         * @param id El id del plugin de estadísticas
         * @param plugin El plugin de estadísticas
         */
        this.addPlugin = function(id, plugin) {
            if (typeof(_plugins[id])==="undefined") {_plugins.length++;}
            _plugins[id] = plugin;
        };
        
        /**
         * Registra un nuevo plugin de estadísticas, creándolo a partir de 
         * su clase e inicializándolo con la configuración de entrada
         * @param id El id del plugin de estadísticas
         * @param className La clase del plugin de estadísticas
         * @param conf Las opciones de configuración para la inicialización
         *              del plugin
         */
        this.loadPlugin = function(id, className, conf) {

            var pluginClass = _getClass(className),
                plugin = new pluginClass();
                plugin.setup(conf);
                plugin.setDataProfile(_data);
				
            this.addPlugin(id, plugin);
        };
        
        /**
         * Elimina un plugin de la lista de plugins registrados
         * @param id El id del plugin que se quiere des-registar
         */
        this.removePlugin = function(id) {
            if (typeof(_plugins[id])!=="undefined") { 
                _plugins.length--;
                delete _plugins[id];
            }
        };
        
        /**
         * Elimina una serie de plugins de la lista de plugins registrados
         * @param pluginsList Array con los ids de los plugins que se quieren 
         *                      des-registrar. Si no se recibe pluginsList, se
         *                      eliminarán todos los plugins existentes
         */
        this.removePlugins = function(pluginsList) {
            var i;
            if(typeof(pluginsList)==="undefined")
            {
                for(i in _plugins){if(i!=="length") this.removePlugin(i);}
            } else {for(i in pluginsList) {this.removePlugin(pluginsList[i]);}}
        };
        
        /**
         * Activa un plugin para el registro de estadísticas
         * @param id El id del plugin que se quiere activar
         */
        this.enablePlugin = function(id) {
            if (typeof(_plugins[id])!=="undefined") { 
                _plugins[id].enable();
            }
        };
        
        /**
         * Activa una serie de plugins para el registro de estadísticas
         * @param pluginsList Array con los ids de los plugins que se quieren 
         *                      activar. Si no se recibe pluginsList, se
         *                      activarán todos los plugins existentes
         */
        this.enablePlugins = function(pluginsList) {
            var i;
            if(typeof(pluginsList)==="undefined")
            {
                for(i in _plugins){if(i!=="length") this.enablePlugin(i);}
            } else {for(i in pluginsList) {this.enablePlugin(pluginsList[i]);}}
        };
        
        /**
         * Desactiva un plugin para el registro de estadísticas
         * @param id El id del plugin que se quiere desactivar
         */
        this.disablePlugin = function(id) {
            if (typeof(_plugins[id])!=="undefined") { 
                _plugins[id].disable();
            }        
        };
        
        /**
         * Desactiva una serie de plugins para el registro de estadísticas
         * @param pluginsList Array con los ids de los plugins que se quieren 
         *                      desactivar. Si no se recibe pluginsList, se
         *                      desactivarán todos los plugins existentes
         */
        this.disablePlugins = function(pluginsList) {
            var i;
            if(typeof(pluginsList)==="undefined")
            {
                for(i in _plugins){if(i!=="length") {this.disablePlugin(i);}}
            } else {for(i in pluginsList) {this.disablePlugin(pluginsList[i]);}}
        };
        
        /**
         * Obtiene un valor de carácter general
         * @param key El id del valor que se quiere consultar. Si no se recibe key,
         *              se devuelve el array completo de datos
         */
        this.getData = function(key) {
            if(typeof(key)=="undefined"){return _data;}
            if(typeof(_data[key])=="undefined") {return null;}
            else {return _data[key];}
        };
        
        /**
         * Crea o actualiza un dato de carácter general
         * @param key El identificador del valor que se quiere crear o modificar
         * @param value El valor que se quiere asignar al dato
         */
        this.setData = function(key, value) {_data[key] = value;};
        

		this.setDataDynamic = function(dataDynamic) {

		for(i in dataDynamic){
				for(j in this._dataDynamic){
					if(this._dataDynamic[j].name==dataDynamic[i].name)
					{
		                this._dataDynamic[j] = {"name" : dataDynamic[i].name, "value" : dataDynamic[i].value};
					}
				}
			}

			if(_currentTry>5){
				_pending = null;
			}
			if(_pending==null)
			{
				if(_pendingHeap.length>0)
				{
					_currentTry = 0;

                    _pending = _pendingHeap[0];
                    _pendingHeap.splice(0,1);

                    this.multitrack(_pending.rule,_pending.data,_pending.plugin);
				}
			}
			else{
                this.multitrack(_pending.rule,_pending.data,_pending.plugin);
			}
		}

        /**
         * Elimina un dato de carácter general
         * @param key El identificador del dato que se quiere eliminar
         */
        this.unsetData = function(key) {delete _data[key];};
        
        /**
         * Obtiene una regla de enrutamiento
         * @param rule El nombre de la regla que se quiere consultar. Si no se 
         *              recibe rule, se devuelve el array completo de enrutamientos
         */
        this.getRouting = function(rule) {
            if(typeof(rule)=="undefined"){return _routing;}
            if(typeof(_routing[rule])=="undefined") {return null;}
            else {return _routing[rule];}
        };
        
        /**
         * Crea o actualiza una regla de enrutamiento
         * @param rule Identificador de la regla de enrutamiento
         * @param type Tipo de seguimiento a realizar asociado al enrutamiento
         * @param plugins Plugins que se deben notificar cuando se active la regla
         */
        this.addRouting = function(rule, type, plugins) {
            _routing[rule] = {type:type, plugins:plugins};
        };
        
        /**
         * Realiza el seguimiento de un evento en la aplicación
         * @param rule El evento que se ha producido
         * @param data Datos relacionados con el evento
         */
        this.track = function(rule, data) {
            var routing = this.getRouting(rule),
                consolidatedData = _merge(data, _data),
                routes, routesLength, i, plugin;
            
            // Analizamos si tenemos reglas de enrutamiento que aplicara
            if(routing){

				auxDynamics = [];

                routes = routing.plugins.split(",");
                routesLength = routes.length;
                for(i=0;i<routesLength;i++){
                    plugin = this.getPlugin(routes[i]);
                    if(plugin) {
						this._dataDynamic = plugin._dataDynamic;
						this.multitrack(rule, data, plugin);
                    }
                }
            }
        };

		this.multitrack = function(rule, data, plugin){
		
			_currentTry++;

			var routing = this.getRouting(rule);
            var consolidatedData = _merge(data, _data);

 	        	if(this.hasAllDynData()){
				
	            	plugin.track(rule, routing.type, consolidatedData);
	                _pending = null;
	                _currentTry = 0;

                    for(i in this._dataDynamic){
                        this._dataDynamic[i].value = "";
                    }


                    if(plugin.setDataDynamic!=undefined)
                        plugin.setDataDynamic(this._dataDynamic);

					if(_pendingHeap.length>0)
					{
						_pending = _pendingHeap[0];
						_pendingHeap.splice(0,1);

						this.multitrack(_pending.rule,_pending.data,_pending.plugin);
					}
	           	}
	            else{
	            	if(_pending==null){
	                	_pending =  {   "rule":rule,
	                                    "data":data,
										"plugin":plugin
	                                };
	                }else{
	               }
	               this.dispatchEvent(new psd.statistics.StatEvent(psd.statistics.StatEvent.DATA_REQUIRED,this._dataDynamic,_data,plugin));
       		}
		}

        this.hasAllDynData = function() {

            allRequired = true;

            for(i in this._dataDynamic){
                if(this._dataDynamic[i].value == ""){
                    allRequired = false;
				}
            }

			return allRequired;
		}
           
        
        /**
         * Suscribe un elemento para el seguimiento estadístico automático
         * @param emitter El elemento emisor de eventos que sirve para el seguimiento
         * @param pattern Patrón que se debe aplicar para la conversión de los datos
         *                  del evento cuando se produce
         */
        this.subscribe = function(emitter, pattern) {
            _subscribersList.push({ subscriber: emitter, 
                                    subscriptionPattern: pattern||{}
                                    });
            
            if(_initialized) { _addListeners.apply(this,[emitter]); }
        };
        
        // this.unsubscribe = function() {
        //    for(var i in _subscribersList) {
        //        _removeListeners.apply(this,[_subscribersList[i].subscriber]);
        //    }
        // }
    }
    
    // Incluimos la declaracion de la clase en el namespace psd.statistics
    namespace.StatisticsManager = StatisticsManager;

})(psd.statistics);
(function(namespace) {

    // Inheritance class
    TrackingPlugin.prototype = new psd.framework.EventDispatcher();

    /**
     * TrackingPlugin es la base para los plugins del sistema de estadísticas
     * multimedia
     */
    function TrackingPlugin() 
    {
        // Super
        psd.framework.EventDispatcher.call(this);

        /**
         * className psd.statistics.TrackingPlugin
         */
        this.className = "psd.statistics.TrackingPlugin";        
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        
		var _dataProfile = [];
		
        /**
         * Activa el plugin para el envío de estadísticas
         */
        this.enable = function() { _enabled = true; };
        
        /**
         * Desactiva el plugin para el envío de estadísticas
         */
        this.disable = function() { _enabled = false; };
        
        /**
         * Indica si el plugin está activado o no para el envío de estadísticas
         */
        var _enabled = true;        
        this.enabled = function() { return _enabled; };
        
        /**
         * Añade un nuevo mapeo de datos entre los recibidos para el seguimiento
         * y los realmente enviados
         */
        this.addDataMapping = function(name, value) { 
			if(this._dataProfile[value.replace("data.","")]!=undefined){
				_dataMap[name] = this._dataProfile[value.replace("data.","")]; 
			}
			else
				_dataMap[name] = value; 
		};
		
		this.setDataProfile = function(dp){
			this._dataProfile = dp;
		}
        
        /**
         * Mapa de correspondencias entre los datos recibidos y los que se deben
         * enviar 
         */
        var _dataMap = {};        
        this.dataMap = function() { return _dataMap; };

		this._dataDynamic = [];

        this.loadDynamics = function(_settings){
			if(_settings.config.dataMapping!=undefined){
	            for(i in _settings.config.dataMapping){
					_name = _settings.config.dataMapping[i].name;
	                _value = _settings.config.dataMapping[i].value;

	                if(_value.indexOf("datadyn.")>-1){
	                    this._dataDynamic.push({"name":_name,"value":""});
	                }
	            }
	        }
		}

        this.setDataDynamic = function(dataDynamic){
            this._dataDynamic = dataDynamic;
        }

        this.clearDataDynamic = function(){
            for(i in this._dataDynamic){
                this._dataDynamic[i].value = "";
            }
        }
    }
    
    // Incluimos la declaracion de la clase en el namespace psd.statistics
    namespace.TrackingPlugin = TrackingPlugin;

})(psd.statistics);
(function(namespace) {

    // Inheritance class
    OmniturePlugin.prototype = new psd.statistics.TrackingPlugin();

    // Construct
    function OmniturePlugin() 
    {
        // Super
        psd.statistics.TrackingPlugin.call(this);

        /**
         * className psd.statistics.OmniturePlugin
         */
        this.className = "psd.statistics.OmniturePlugin";        
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        
        // Mapa de eventos que gestiona el plugin
        var _eventMappings = {};
                
        // Importa la configuración del plugin a partir de un objeto de configuración.
        // El objeto de configuración debe tener la siguiente estructura:
        //  OBJ
        //   |- config
        //        |---- [events] (Array)  
        //                 |--------------- {name, events, vars, suites}
        //        |---- [dataMapping] (Array)
        //                 |--------------- {name, value}
        //                 
        // @param settings Objeto con la configuración que se quiere transferir.
        var _importObjectConfiguration = function(settings) {
            
			this.loadDynamics(settings);


            // Comprobamos que existe la propiedad principal "config"
            if(typeof(settings.config)!="undefined")
            {            
                var events  = settings.config.events,
                    mapping = settings.config.dataMapping,
                    i, length;
                    
                // Utilizamos la API pública addEventMapping() para importar
                // las definiciones de mapeo de eventos
                if(Object.prototype.toString.call(events)=="[object Array]"){

                    for(i=0;i<events.length;i++) {
                        if(typeof(events[i])!="undefined" &&
                            typeof(events[i].name)!="undefined" &&
                            typeof(events[i].events)!="undefined" &&
                            typeof(events[i].vars)!="undefined" &&
                            typeof(events[i].suites)!="undefined") {

                            this.addEventMapping(events[i].name, 
                                                events[i].events,
                                                events[i].vars,
                                                events[i].suites);
                        }
                    }
                }
                
                // Utilizamos la API pública addDataMapping() para importar
                // las definiciones de mapeo de datos
                if(Object.prototype.toString.call(mapping)=="[object Array]"){

                    for(i=0;i<mapping.length;i++) {
                        if(typeof(mapping[i])!="undefined" &&
                            typeof(mapping[i].name)!="undefined" &&
                            typeof(mapping[i].value)!="undefined") {

                            this.addDataMapping(mapping[i].name, 
                                                mapping[i].value);
                        }
                    }
                }
            }
        };
        
        // Carga la configuración del plugin a partir de un objeto de configuración
        // remoto. El fichero de configuración debe estar en formato JSON y tener la 
        // siguiente estructura:
        //{
        //    "config":{
        //        "events": [
        //            {   
        //                "name": "mediaBegin", 
        //                "events": "event11", 
        //                "vars": "eVar2,eVar3,eVar4,eVar8,eVar17,eVar20,eVar30,eVar35,eVar42,eVar48,eVar74", 
        //                "suites": "prisacomaspreprod,suite_producto"            
        //            },{ 
        //                "name": "mediaComplete", 
        //                "events": "event12", 
        //                "vars": "eVar2,eVar3,eVar4,eVar8,eVar17,eVar20,eVar30,eVar35,eVar42,eVar48,eVar74", 
        //                "suites": "prisacomaspreprod,suite_producto"
        //            }
        //        ],
        //        "dataMapping": [
        //            {"name": "eVar8", "value": "data.name" },
        //            {"name": "eVar9", "value": "data.adName" },
        //            {"name": "eVar74", "value": "data.duration" }
        //        ]
        //    }
        //}
        // @param url URL con la dirección del fichero de configuración.
        var _importRemoteConfiguration = function(url) {
            _configMediator.corsIE(true);
            _configMediator.mediate(url, _configParser, psd.framework.Mediator.RESPONSE_JSON);            
        };
        
        // Listener que escucha el evento MEDIATE_COMPLETE del mediator del
        // fichero de configuración del manager
        // @param evt El evento de tipo MEDIATE_COMPLETE disparado
        var _onMediatorComplete = function(evt) {
            var parserResult = evt.result.parserResult;
            
            if(parserResult.code == psd.framework.ParserResult.PARSER_SUCCESS_CODE) {
                _importObjectConfiguration.apply(this, [parserResult.result]);
            }else {
                // TO-DO GESTIÓN DEL ERROR DE PARSEO
                console.log("PARSER ERROR");
                console.log(parserResult.msg);
            }
        };
        
        // Listener que escucha el evento MEDIATE_ERROR del mediator del
        // fichero de configuración del manager
        // @param evt El evento de tipo MEDIATE_ERROR disparado
        var _onMediatorError = function(evt) {
            // TO-DO GESTIÓN DEL ERROR DE LECTURA
            console.log("MEDIATE ERROR");
            console.log(evt.result.msg);
        };
        
        // Mediator para la carga de ficheros de configuración
        var _configMediator = new psd.framework.Mediator();
            _configMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_COMPLETE, _onMediatorComplete, this);
            _configMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_ERROR, _onMediatorError, this);
        
        // Parser para la carga de ficheros de configuración
        var _configParser = new psd.framework.parser.JSONParser();        
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        
        /**
         * Importa la configuración de un fichero remoto o un objeto local
         * @param settings String con la url a un json de configuración o un 
         *                 objeto de configuración 
         */
        this.setup = function(settings) {
            
            var settingsType = Object.prototype.toString.call(settings);
            
            // Iniciamos la carga remota si el parámetro es un String, o la carga
            // local si el parámetro es un Object            
            if(settingsType=="[object String]") {
                _importRemoteConfiguration.apply(this, [settings]);
            } else if(settingsType=="[object Object]") {
                _importObjectConfiguration.apply(this, [settings]);
            }
			
			
			if((typeof(s)==="undefined") && (typeof(s_gi)!=="undefined"))
				s = s_gi("");
        };
        
        /**
         * Realiza el seguimiento de un evento en la aplicación
         * @param event El evento que se ha producido
         * @param type El modo de marcado que se debe utilizar para el evento. Por
         *              lo general será "custom", pero también se pueden esperar
         *              modos como "media" o "properties"
         * @param data Datos relacionados con el evento y de carácter general
         * TO-DO Utilizar "type" para seleccionar el tipo de seguimiento que
         * se hace: custom, Media,...
         */
        this.track = function(event, type, data) {
			if(typeof(window.s)=="undefined"){
				return;
			}
		
            var dataMap = this.dataMap(),
                eventMap = _eventMappings[event],
                trackVars, trackEvents,
                previousTrackVars = s.linkTrackVars, 
                previousTrackEvents = s.linkTrackEvents,
                previousEvents = s.events,
                previousTrackSuites = s_account,
                previousVisitorNamespace = s.visitorNamespace,
                previousUsePlugins = s.usePlugins,
                previousS = s,
                i;
            
            // Realizamos el seguimiento únicamente si tenemos un eventMap definido
            if(typeof(eventMap)!="undefined")
            {

                s = s_gi(eventMap.suites);
                s.linkTrackVars = "";
                s.linkTrackEvents = "";
                s.events = "";
                s.usePlugins = false;
                s.visitorNamespace = previousVisitorNamespace;
                
                // Copiamos las antiguas eVars
/*
                var idProp;
                for(i in previousS) {
                    if(i.indexOf("eVar")==0) {
                        s[i] = previousS[i];
                    }
                }
*/
                 // Copiamos las antiguas eVars y hacemos la traducción de alias a su valor dinámico
                var idProp;
                for(i in previousS) {
                    if(i.indexOf("eVar")==0) {
                        if (previousS[i].indexOf("D=c") == 0) {
                            idProp = previousS[i].substring(3);
                            s[i] = previousS["prop" + idProp];
                        }else {
                            s[i] = previousS[i];
                        }
                    }
                }

                // Conversión de evento a events en la suite de omniture
                trackEvents = eventMap.events;
                if(eventMap.events.length>0) {
                    s.linkTrackVars += "events";
                    
                    for(i in trackEvents) {
                        s.linkTrackEvents += "," + trackEvents[i];
                        s.events += "," + trackEvents[i];
                    }
                }
                
                for(i in this._dataDynamic){
                    dataMap[this._dataDynamic[i].name] = this._dataDynamic[i].value;
                    data[this._dataDynamic[i].name] = "data." + this._dataDynamic[i].value;
                }

                // Conversión de datos a variables en la suite de omniture
                trackVars = eventMap.vars;
                for(i in trackVars) {
                    
                    s.linkTrackVars += "," + trackVars[i];
                    
                    if(typeof(dataMap[trackVars[i]])!="undefined") {
                        if(typeof(data[dataMap[trackVars[i]]])!="undefined") { 
                            s[trackVars[i]] = data[dataMap[trackVars[i]]];
                        } else {
                            s[trackVars[i]] = dataMap[trackVars[i]];
                        }
                    }
                    
                }
			
                if(s.linkTrackEvents.indexOf(",")==0) {s.linkTrackEvents = s.linkTrackEvents.substr(1);}
                if(s.linkTrackVars.indexOf(",")==0) {s.linkTrackVars = s.linkTrackVars.substr(1);}


                //Traducción de ALIAS en s_code
               /* var idProp;
                for(i in s) {
                    if((i.indexOf("eVar")==0) &&  (s[i].indexOf("D=c") == 0)){
                        idProp = s[i].substring(3);
                        s[i] = previousS["prop" + idProp];
                    }
                }*/


                s.tl(true, 'o', event);

                // Deshacemos los cambios realizados sobre las variables de Omniture
                // y eliminamos las variables que hemos creado para el evento
                s.visibleAlias =
                s = s_gi(previousTrackSuites);

                s.linkTrackVars = previousTrackVars;
                s.linkTrackEvents = previousTrackEvents;
                s.events = previousEvents;
                s.usePlugins = previousUsePlugins;
	
                for(i in trackVars) {
                                        
                    if(typeof(dataMap[trackVars[i]])!="undefined" && 
                        typeof(data[dataMap[trackVars[i]]])!="undefined") {
                        
                        delete s[trackVars[i]];
                        
                    }
                }             
            }
        };
        
        /**
         * Crea una nueva regla de mapeo para un evento
         * @param name Nombre del evento
         * @param events Eventos que se deben registrar en la suite de omniture
         * @param vars Variables que se deben registrar en la suite de omniture
         * @param suites Cuentas en las que se debe registrar la acción
         */
         this.addEventMapping = function(name, events, vars, suites) {
            _eventMappings[name] = {events: events.split(","), vars: vars.split(","), suites:suites};
         };
    }
    
    // Incluimos la declaracion de la clase en el namespace psd.statistics
    namespace.OmniturePlugin = OmniturePlugin;

})(psd.statistics.plugins);(function(namespace) {

    // Inheritance class
    ComscorePlugin.prototype = new psd.statistics.TrackingPlugin();
	
    // Construct
    function ComscorePlugin() 
    {
		// Super
        psd.statistics.TrackingPlugin.call(this);
	
        /**
         * className psd.statistics.OmniturePlugin
         */
        this.className = "psd.statistics.ComscorePlugin";
		
        
		//constantes
		var assocEvents = {	"ON_PLAY" : "onPlay",
							"ON_PAUSE" : "onPause",
							"ON_STOP" : "onStop",
							"ON_AD_PLAY" : "onAdPlay",
							"ON_AD_STOP" : "onAdStop"};
		
		var _streamSense;
		
		var _data = {};
		var settings;
		var settingsUrl;
		
		var _configParser;
		var _configMediator;
		
		var parserResult;		
		
		var _importRemoteConfiguration = function(url) {
            _configMediator.corsIE(true);
            _configMediator.mediate(url, _configParser, psd.framework.Mediator.RESPONSE_JSON);
        };
		
		// Listener que escucha el evento MEDIATE_ERROR del mediator del
        // fichero de configuraci�n del manager
        // @param evt El evento de tipo MEDIATE_ERROR disparado
        var _onMediatorError = function(evt) {
            // TO-DO GESTI�N DEL ERROR DE LECTURA
            //console.log("MEDIATE ERROR");
            //console.log(evt.result.msg);
        };
		
		// Listener que escucha el evento MEDIATE_COMPLETE del mediator del
        // fichero de configuraci�n del manager
        // @param evt El evento de tipo MEDIATE_COMPLETE disparado
        var _onMediatorComplete = function(evt) {
            parserResult = evt.result.parserResult;            
			
            if(parserResult.code == psd.framework.ParserResult.PARSER_SUCCESS_CODE) {
                _importObjectConfiguration.apply(this, [parserResult.result]);
            }else {
                // TO-DO GESTI�N DEL ERROR DE PARSEO
                console.log("PARSER ERROR");
                console.log(parserResult.msg);
            }
        };
		
		var _importObjectConfiguration = function(_settings) {
				
			settings = _settings;
		
			this.loadDynamics(settings);
		
            if(typeof(settings.config)!="undefined")
            {   	
				_streamSense = new ns_.StreamSense({},settings.config.pixelURL);
				
				_playlistLabels = {};
				
				for(i in settings.config.dataMappingPlayList){
					_name = settings.config.dataMappingPlayList[i].name;
					_value = settings.config.dataMappingPlayList[i].value;
					
					_playlistLabels[_name] = _value;
				}
				_streamSense.setPlaylist(_playlistLabels);
			}
			
			mapping = settings.config.dataMapping;
			
			if(Object.prototype.toString.call(mapping)=="[object Array]"){

                for(i=0;i<mapping.length;i++) {
					if(typeof(mapping[i])!="undefined" &&
						typeof(mapping[i].name)!="undefined" &&
						typeof(mapping[i].value)!="undefined") {

						this.addDataMapping(mapping[i].name, 
											mapping[i].value);
					}
				}
            }
		}
		
		/**
         * Importa la librer�a libraryManager y al completar la carga se llama a la funci�n que importa la configuraci�n del plugin
         * @param settings String con la url a un json de configuraci�n o un 
         *                 objeto de configuraci�n 
         */
        this.setup = function(settings) {

			settingsUrl = settings;
		
			var dependencesUrls = [];
			dependencesUrls.push("http://www.prisacom.com/psdmedia/resources/js/ext/comscore/streamsense.min.js");
		
			var libraryParams = {depends: dependencesUrls
				, success: onDependencesComplete
				, error: onDependencesError
				, scope: this
			};
			
			LibraryManager.load(libraryParams);
		}
		
		/**
         * Importa la configuraci�n de un fichero remoto o un objeto local
		 */
		var onDependencesComplete = function() 
		{
			_configParser = new psd.framework.parser.JSONParser();
			_configMediator = new psd.framework.Mediator();
			_configMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_COMPLETE, _onMediatorComplete, this);       
			_configMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_ERROR, _onMediatorError, this);
			
			_importRemoteConfiguration.apply(this, [settingsUrl]);
		}	

		var onDependencesError = function() {
		}
		
		/**
         * Realiza el seguimiento de un evento en la aplicaci�n
         * @param event El evento que se ha producido
         * @param type El modo de marcado que se debe utilizar para el evento. Por
         *              lo general ser� "custom", pero tambi�n se pueden esperar
         *              modos como "media" o "properties"
         * @param data Datos relacionados con el evento y de car�cter general
         * TO-DO Utilizar "type" para seleccionar el tipo de seguimiento que
         * se hace: custom, Media,...
         */
        this.track = function(event, type, data) {
			_data = data;
			
			position = 0;
			labels = {};
			
			profileData = this.dataMap();
			
			for(i in settings.config.dataMapping){

				_name = settings.config.dataMapping[i].name;
				_value = settings.config.dataMapping[i].value;
				
				if(profileData[_name]!=undefined)
					labels[_name] = profileData[_name];
				
				{		
					if(_value.indexOf("data.")>-1){
						valueAux = _value.slice("data.".length,_value.length);
						labels[_name] = data[_value];
						
						if(labels[_name]==undefined){
							labels[_name] = profileData[_name];
						}
					}
					else{
						if(_value == "TITLE"){
							labels[_name] = document.title;
						}
						else{
							if(_value.indexOf("datadyn.")>-1){
								valueAux = _value.slice("datadyn.".length,_value.length);
								labels[_name] = this.getDynValue(valueAux);
							}
							else{
								labels[_name] = _value;
							}
						}
					}
				}
			}
			_streamSense.setClip(labels, 1);
	
			assocEvent = undefined;

			for(i in settings.config.events){
				if(settings.config.events[i].name==event){
					assocEvent = settings.config.events[i].value;
				}
			}

			if(assocEvent!=undefined){
				
				switch(assocEvent){

					case "ON_PLAY":
						_streamSense.notify(ns_.StreamSense.PlayerEvents.PLAY,{"ns_st_ad":false},0);
					break;
					case "ON_PAUSE":
						_streamSense.notify(ns_.StreamSense.PlayerEvents.PAUSE,{"ns_st_ad":false},0);
					break;
					case "ON_STOP":
						_streamSense.notify(ns_.StreamSense.PlayerEvents.END,{"ns_st_ad":false},0);
					break;
					case "ON_AD_PLAY":
						_streamSense.notify(ns_.StreamSense.PlayerEvents.AD_PLAY,{"ns_st_ad":true},0);
					break;
					case "ON_AD_STOP":
						_streamSense.notify(ns_.StreamSense.PlayerEvents.AD_END,{"ns_st_ad":true},0);
					break;
					default:
					break;
				}
			}
		}
	
		this.clearDataDynamic = function(){
			for(i in this._dataDynamic){
				this._dataDynamic[i].value = "";
			}
		}

		this.getDynValue = function(_name){
			for(i in this._dataDynamic){
				if(this._dataDynamic[i].name==_name)
					return this._dataDynamic[i].value;
			}

			return "";
		}
	}
	
	namespace.ComscorePlugin = ComscorePlugin;
		
})(psd.statistics.plugins);
(function(namespace) {

    // Inheritance class
    ComscoreVideoPlugin.prototype = new psd.statistics.TrackingPlugin();

    // Construct
    function ComscoreVideoPlugin() 
    {
        // Super
        psd.statistics.TrackingPlugin.call(this);

        /**
         * className psd.statistics.OmniturePlugin
         */
        this.className = "psd.statistics.ComscoreVideoPlugin";
		
		var _data = {};
		var settings;
		var settingsUrl;
		
		var eventMap = {'adStart':'01', 'mediaBegin':'03'}
		
		var _configParser;
		var _configMediator;
		
		var parserResult;		
				
		var _importRemoteConfiguration = function(url) {
            _configMediator.corsIE(true);
            _configMediator.mediate(url, _configParser, psd.framework.Mediator.RESPONSE_JSON);
        };
		
		// Listener que escucha el evento MEDIATE_ERROR del mediator del
        // fichero de configuraci�n del manager
        // @param evt El evento de tipo MEDIATE_ERROR disparado
        var _onMediatorError = function(evt) {
            // TO-DO GESTI�N DEL ERROR DE LECTURA
            //console.log("MEDIATE ERROR");
            //console.log(evt.result.msg);
        };
		
		// Listener que escucha el evento MEDIATE_COMPLETE del mediator del
        // fichero de configuraci�n del manager
        // @param evt El evento de tipo MEDIATE_COMPLETE disparado
        var _onMediatorComplete = function(evt) {
					
            parserResult = evt.result.parserResult;            
			
            if(parserResult.code == psd.framework.ParserResult.PARSER_SUCCESS_CODE) {
                _importObjectConfiguration.apply(this, [parserResult.result]);
            }else {
                // TO-DO GESTI�N DEL ERROR DE PARSEO
                console.log("PARSER ERROR");
                console.log(parserResult.msg);
            }
        };
		
		var _importObjectConfiguration = function(_settings) {
			settings = _settings;
		}
		
		/**
         * Importa la configuraci�n de un fichero remoto o un objeto local
         * @param settings String con la url a un json de configuraci�n o un 
         *                 objeto de configuraci�n 
         */
        this.setup = function(settings) {

			settingsUrl = settings;
		
			var dependencesUrls = [];
			dependencesUrls.push("http://b.scorecardresearch.com/beacon.js");
		
			var libraryParams = {depends: dependencesUrls
				, success: onDependencesComplete
				, error: onDependencesError
				, scope: this
			};
			
			LibraryManager.load(libraryParams);
		}
		
		/**
         * Importa la configuraci�n de un fichero remoto o un objeto local
		 */
		var onDependencesComplete = function() 
		{
			_configParser = new psd.framework.parser.JSONParser();
			
			_configMediator = new psd.framework.Mediator();
			_configMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_COMPLETE, _onMediatorComplete, this);       
			_configMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_ERROR, _onMediatorError, this);
			
			_importRemoteConfiguration.apply(this, [settingsUrl]);
		}	

		var onDependencesError = function() {
		}
		
		/**
         * Realiza el seguimiento de un evento en la aplicaci�n
         * @param event El evento que se ha producido
         * @param type El modo de marcado que se debe utilizar para el evento. Por
         *              lo general ser� "custom", pero tambi�n se pueden esperar
         *              modos como "media" o "properties"
         * @param data Datos relacionados con el evento y de car�cter general
         * TO-DO Utilizar "type" para seleccionar el tipo de seguimiento que
         * se hace: custom, Media,...
         */
        this.track = function(event, type, data) {
		
			_data = {C1:'',C2:'',C3:'',C4:'',C5:'',C6:'',C10:''}
		
			if(eventMap[event]!=undefined){
			
				if(typeof(settings.config)!="undefined")
				{   	
					for(i in settings.config.dataMapping){
						_name = settings.config.dataMapping[i].name;
						_value = settings.config.dataMapping[i].value;
	
						if(_value.indexOf("data.")>-1){
							valueAux = _value.slice("data.".length,_value.length);
							_data[_name] = data[_value];
						}
						else{
							_data[_name] = _value;
						}
					}
				}
				
				_data['C5'] = eventMap[event];
	
				//document.write("ASD");
				
				//document.write(unescape("%3Cscript src='" + (document.location.protocol == "https:" ? "https://sb" : "http://b") + ".scorecardresearch.com/beacon.js' %3E%3C/script%3E")); 
				COMSCORE.beacon({ c1:_data.C1, c2:_data.C2, c3:_data.C3, c4:_data.C4, c5:_data.C5, c6:_data.C6, c10:_data.C10});
				//document.write("<img src='http://b.scorecardresearch.com/p?c1=1&c2=&c3=&c4=&c5=&c6=&c10=&cv=2.0&cj=1' />");

                //NOTA: Se comenta este código porque estaba reportando 2 veces las estadísticas de comscore. Se corresponde con <noscript>, es decir para poder registrar estadísticas cuando no hay javascript, con lo
                //cual es absurdo meterlo aquí.
				/*var oImg=document.createElement("img");
				oImg.setAttribute('src', 'http://b.scorecardresearch.com/p?c1=' + _data.C1 + '&c2=' + _data.C2 + '&c3=' + _data.C3 + '&c4=' + _data.C4 + '&c5=' + _data.C5 + '&c6=' + _data.C6 + '&c10=' + _data.C10 + '&cv=2.0&cj=1&event=' + event);
				oImg.setAttribute('alt', 'na');
				oImg.setAttribute('height', '1px');
				oImg.setAttribute('width', '1px');
				document.body.appendChild(oImg);*/
			}
		}
	}
	
	namespace.ComscoreVideoPlugin = ComscoreVideoPlugin;
		
})(psd.statistics.plugins);
(function(namespace) {
	
    // Inheritance class
    StatEvent.prototype = new psd.framework.Event();

    StatEvent.DATA_REQUIRED_STATISTICS = "dataRequired";
    
    this.data = null;
	this.dataAsync = null;
	this.plugin = null;

    /**
     * Eventos de estado de reproduccion de contenido multimedia
     * @constructor
     */
    function StatEvent(type, dataAsync, data, plugin) 
    {
        // Super
        psd.framework.Event.call(this, type);
        
        this.data = data;
		this.dataAsync = dataAsync;
		this.plugin = plugin;
    }
    
    // Incluimos la declaracion de la clase en el namespace psd.media	
    namespace.StatEvent = StatEvent;

})(psd.statistics);