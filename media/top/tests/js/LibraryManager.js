(function(namespace) {

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

}(window));