(function(window) 
{
    // Generamos el namespace psd.fenix y sus derivados
    if(window.psd==undefined) { window.psd = {}; }
    if(window.psd.fenix==undefined) { window.psd.fenix = {}; }
    if(window.psd.fenix.controls==undefined) { window.psd.fenix.controls = {}; }
    if(window.psd.fenix.display==undefined) { window.psd.fenix.display = {}; }
    if(window.psd.fenix.display.commands==undefined) { window.psd.fenix.display.commands = {}; }
    if(window.psd.fenix.event==undefined) { window.psd.fenix.event = {}; }
    if(window.psd.fenix.media==undefined) { window.psd.fenix.media = {}; }
    if(window.psd.fenix.stage==undefined) { window.psd.fenix.stage = {}; }
    if(window.psd.fenix.text==undefined) { window.psd.fenix.text = {}; }
    if(window.psd.fenix.textures==undefined) { window.psd.fenix.textures = {}; }
    
})(window);(function(namespace) {

    // UID autoincremental
    UID._nextID = 0;
    
    /**
     * Genera identificadores unicos dentro de la ejecucion de una aplicacion fenix
     * @returns Un identificador unico
     */
    UID.getKeyId = function() {
        return UID._nextID++;
    };
    
    /**
     * La clase UID permite la generacion de identificadores unicos dentro de una
     * aplicacion de fenix
     * @constructor
     */
    function UID() {}

    // Incluimos la declaracion de la clase en el namespace psd.fenix	
    namespace.UID = UID;
	
})(psd.fenix);(function(namespace) {
	
	ColorUtil.colorToRGB = function (color, alpha) {
            if (typeof color === 'string' && color[0] === '#') {
                color = window.parseInt(color.slice(1), 16);
            }
            
            alpha = (alpha === undefined) ? 1 : alpha;
            
            var r = color >> 16 & 0xff,
                g = color >> 8 & 0xff,
                b = color & 0xff,
                a = (alpha < 0) ? 0 : ((alpha > 1) ? 1 : alpha);
                
            if (a === 1) {
                return "rgb("+ r +","+ g +","+ b +")";
            } else {
                return "rgba("+ r +","+ g +","+ b +","+ a +")";
            }
        }
  
	function ColorUtil() {}

	// Add context window
	namespace.ColorUtil = ColorUtil;

})(psd.fenix);(function(namespace) {
	
	// Check if containts rect a point
        MathUtil.containsPoint = function (rect, x, y) {
            return !(x < rect.x ||
                    x > rect.x + rect.width ||
                    y < rect.y ||
                    y > rect.y + rect.height);
        };

        // Check if existn intersect between two rects
        MathUtil.intersects = function (rectA, rectB) {
            return !(rectA.x + rectA.width < rectB.x ||
                    rectB.x + rectB.width < rectA.x ||
                    rectA.y + rectA.height < rectB.y ||
                    rectB.y + rectB.height < rectA.y);
        };
  
	function MathUtil() {}

	// Add context window
	namespace.MathUtil = MathUtil;

})(psd.fenix);(function(namespace) {
	
    // Construct
    function Point(x, y) {
        this.x = x | 0;
        this.y = y | 0;
		
        // Public methods
        this.clone = function() {
            return new Point(this.x, this.y);
        };
		
        this.add = function(p) {
            return new Point(this.x + p.x, this.y + p.y);
        };
		
        this.degreesTo = function(p) {
            var dx = this.x - p.x;
            var dy = this.y - p.y;
            var angle = Math.atan2(dy, dx); // radians
            return angle * (180 / Math.PI); // degrees
        };
		
        this.distance = function(p){
            var x = this.x - p.x;
            var y = this.y - p.y;
            return Math.sqrt(x * x + y * y);
        };
		
        this.equals = function(toCompare){
            return this.x == toCompare.x && this.y == toCompare.y;
        };
	
        this.interpolate = function(p, f){
            return new Point((this.x + p.x) * f, (this.y + p.y) * f);
        };
		
        this.length = function(){
            return Math.sqrt(this.x * this.x + this.y * this.y);
        };
		
        this.normalize = function(thickness){
            var l = this.length();
            this.x = this.x / l * thickness;
            this.y = this.y / l * thickness;
        };
		
        this.orbit = function(origin, arcWidth, arcHeight, degrees){
            var radians = degrees * (Math.PI / 180);
            this.x = origin.x + arcWidth * Math.cos(radians);
            this.y = origin.y + arcHeight * Math.sin(radians);
        };
		
        this.offset = function(dx, dy){
            this.x += dx;
            this.y += dy;
        };
		
        this.subtract = function(v){
            return new Point(this.x - v.x, this.y - v.y);
        };
		
        this.toString = function(){
            return "(x=" + this.x + ", y=" + this.y + ")";
        };
	 
        // Static functions
        Point.interpolate = function(pt1, pt2, f){
            return new Point((pt1.x + pt2.x) * f, (pt1.y + pt2.y) * f);
        };

        Point.polar = function(len, angle){
            return new Point(len * Math.sin(angle), len * Math.cos(angle));
        };
		
        Point.distance = function(p1, p2){
            var x = p1.x - p2.x;
            var y = p1.y - p2.y;
            return Math.sqrt(x * x + y * y);
        };
    }

    // Add context window
    namespace.Point = Point;

})(psd.fenix);(function(namespace) {
	
    // Construct
    function Girth(x, y, radius) {
        this.x = x | 0;
        this.y = y | 0;
        this.r = radius | 1;
		
        this.clone = function() {
            return new Girth(this.x, this.y, this.r);
        };
		
        this.toString = function() {
            return "(x=" + this.x + ", y=" + this.y + ", radius=" + this.r + ")";
        };
    }
	
    namespace.Girth = Girth;

})(psd.fenix);(function(namespace) {
	
    // Construct
    function Rectangle(x, y, width, height) {
        this.x = x || 0;
        this.y = y || 0;
        this.width = width || 1;
        this.height = height || 1;

        // Public methods
        this.clone = function() {
            return new Rectangle(this.x, this.y, this.width, this.height);
        };
		
        this.toString = function() {
            return "(x=" + this.x + ", y=" + this.y + ", width=" + this.width + ", height=" + this.height + ")";
        };
    }
	
    // Add context window
    namespace.Rectangle = Rectangle;

})(psd.fenix);(function(namespace) {
    
    // Inheritance class
    MediaEvent.prototype = new psd.framework.Event();

    /**
     * Event to be dispatched on abort
     */
    MediaEvent.ABORT = "abort";
    
    /**
     * Event to be dispatched on begin
     */
    MediaEvent.BEGIN = "begin";
    
    /**
     * Script to be run when a file is ready to start playing (when it has buffered enough to begin)
     */
    MediaEvent.CAN_PLAY = "canplay";
    
    /**
     * Script to be run when a file can be played all the way to the end without pausing for buffering
     */
    MediaEvent.CAN_PLAY_THROUGH = "canplaythrough";
    
    /**
     * Script to be run when the length of the media changes
     */
    MediaEvent.DURATION_CHANGE = "durationchange";
    
    /**
     * Script to be run when something bad happens and the file is suddenly unavailable (like unexpectedly disconnects)
     */
    MediaEvent.EMPTIED = "emptied";
    
    /**
     * Script to be run when the media has reach the end (a useful event for messages like "thanks for listening")
     */
    MediaEvent.ENDED = "ended";
    
    /**
     * Script to be run when an error occurs when the file is being loaded
     */
    MediaEvent.ERROR = "error";
    
    /**
     * Script to be run when media data is loaded
     */
    MediaEvent.LOADED_DATA = "loadeddata";
    
    /**
     * Script to be run when meta data (like dimensions and duration) are loaded
     */
    MediaEvent.LOADED_METADATA = "loadedmetadata";
    
    /**
     * Script to be run just as the file begins to load before anything is actually loaded
     */
    MediaEvent.LOAD_START = "loadstart";
    
    /**
     * Script to be run when the media is paused either by the user or programmatically
     */
    MediaEvent.PAUSE = "pause";
    
    /**
     * Script to be run when the media is ready to start playing
     */
    MediaEvent.PLAY = "play";
    
    /**
     * Script to be run when the media actually has started playing
     */
    MediaEvent.PLAYING = "playing";
    
    /**
     * Script to be run when the browser is in the process of getting the media data
     */
    MediaEvent.PROGRESS = "progress";
    
    /**
     * Script to be run each time the playback rate changes (like when a user switches to a slow motion or fast forward mode)
     */
    MediaEvent.RATE_CHANGE = "ratechange";
    
    /**
     * Script to be run each time the ready state changes (the ready state tracks the state of the media data)
     */
    MediaEvent.READY_STATE_CHANGE = "readystatechange";
    
    /**
     * Script to be run when the seeking attribute is set to false indicating that seeking has ended
     */
    MediaEvent.SEEKED = "seeked";
    
    /**
     * Script to be run when the seeking attribute is set to true indicating that seeking is active
     */
    MediaEvent.SEEKING = "seeking";
    
    /**
     * Script to be run when the browser is unable to fetch the media data for whatever reason
     */
    MediaEvent.STALLED = "stalled";
    
    /**
     * Script to be run when fetching the media data is stopped before it is completely loaded for whatever reason
     */
    MediaEvent.SUSPEND = "suspend";
    
    /**
     * Script to be run when the playing position has changed (like when the user fast forwards to a different point in the media)
     */
    MediaEvent.TIME_UPDATE = "timeupdate";
    
    /**
     * Script to be run each time the volume is changed which (includes setting the volume to "mute")
     */
    MediaEvent.VOLUME_CHANGE = "volumechange";
    
    /**
     * Script to be run when the media has paused but is expected to resume (like when the media pauses to buffer more data)
     */
    MediaEvent.WAITING = "waiting";    
    
    /**
     * Datos adicionales del evento
     */
    this.data = null;
    
    /**
     * Evento multimedia
     * @param type Tipo del evento
     * @param data Datos adicionales del evento
     * @constructor
     */
    function MediaEvent(type, data) 
    {
        // Super
        psd.framework.Event.call(this, type);
        
        this.data = data;
    }
    
    // Incluimos la declaracion de la clase en el namespace psd.fenix.event	
    namespace.MediaEvent = MediaEvent;

})(psd.fenix.event);(function(namespace) {
    
    // Inheritance class
    MouseEvent.prototype = new psd.framework.Event();

    /**
     * 
     */
    MouseEvent.CLICK = "click";
    
    /**
     * 
     */
    MouseEvent.MOUSE_DOWN = "mouseDown";
    
    /**
     * 
     */
    MouseEvent.MOUSE_UP = "mouseUp";
    
    /**
     * 
     */
    MouseEvent.MOUSE_MOVE = "mouseMove";
    
    /**
     * 
     */
    MouseEvent.MOUSE_OVER = "mouseOver";
    
    /**
     * 
     */
    MouseEvent.MOUSE_OUT = "mouseOut";
    
    /**
     *
     */
    MouseEvent.MOUSE_WHEEL = "mouseWheel";
    
    /**
     * 
     */
    this.stageX = 0;
    
    /**
     * 
     */
    this.stageY = 0;
    
    /**
     *
     */
    this.localX = 0;
    
    /**
     *
     */
    this.localY = 0;
    
    /**
     *
     */
    this.delta = 0;
    
    /**
     * @param type
     * @param stageX
     * @param stageY
     * @param localX
     * @param localY
     * @constructor
     */
    function MouseEvent(type, stageX, stageY, localX, localY) 
    {
        // Super
        psd.framework.Event.call(this, type);
        
        this.stageX = stageX!=undefined?stageX:0;
        this.stageY = stageY!=undefined?stageY:0;
        this.localX = localX!=undefined?localX:0;
        this.localY = localY!=undefined?localY:0;
    }
    
    // Incluimos la declaracion de la clase en el namespace psd.fenix	
    namespace.MouseEvent = MouseEvent;

})(psd.fenix);(function(namespace) {
    
    // Inheritance class
    ProgressEvent.prototype = new psd.framework.Event();

    /**
     * Event to be dispatched on abort
     */
    ProgressEvent.CHANGE = "change";
    
    /**
     * Datos adicionales del evento
     */
    this.data = null;
    
    /**
     * Evento multimedia
     * @param type Tipo del evento
     * @param data Datos adicionales del evento
     * @constructor
     */
    function ProgressEvent(type, data) 
    {
        // Super
        psd.framework.Event.call(this, type);
        
        this.data = data;
    }
    
    // Incluimos la declaracion de la clase en el namespace psd.fenix.event	
    namespace.ProgressEvent = ProgressEvent;

})(psd.fenix.event);(function(namespace) {
    
    // Inheritance class
    StageEvent.prototype = new psd.framework.Event();
    
    /**
     *
     */
    StageEvent.INIT = "init";
    
    /**
     *
     */
    StageEvent.INIT_ERROR = "initError";

    /**
     *
     */
    StageEvent.ADDED_TO_STAGE = "addedToStage";
    
    /**
     *
     */
    StageEvent.REMOVED_FROM_STAGE = "removedFromStage";
    
    /**
     *
     */
    StageEvent.ENTER_FRAME = "enterFrame";

    /**
     *
     */
    StageEvent.ADDED = "added";
    
    /**
     *
     */
    StageEvent.REMOVED = "removed";

    /**
     *
     */
    StageEvent.RESIZE = "resize";
    
    /**
     *
     */
    StageEvent.DISPLAY_STATE_CHANGE = "displayStateChange";
    
    /**
     *
     */
    this.currentTarget = null;
    
    /**
     * @param type
     * @constructor
     */
    function StageEvent(type, currentTarget) 
    {
        // Super
        psd.framework.Event.call(this, type);
        
        // 
        this.currentTarget = currentTarget;
    }
    
    // Incluimos la declaracion de la clase en el namespace psd.fenix
    namespace.StageEvent = StageEvent;

})(psd.fenix);(function(namespace) {
    
    // Inheritance class
    KeyboardEvent.prototype = new psd.framework.Event();

    /**
     * 
     */
    KeyboardEvent.KEY_DOWN = "keyDown";
    
    /**
     * 
     */
    KeyboardEvent.KEY_UP = "keyUp";
    
    /**
     *
     */
    this.keyCode = 0;
    
    /**
     * @param type
     * @param keyCode
     * @constructor
     */
    function KeyboardEvent(type, keyCode) 
    {
        // Super
        psd.framework.Event.call(this, type);
        
        this.keyCode = keyCode;
    }
    
    // Incluimos la declaracion de la clase en el namespace psd.fenix	
    namespace.KeyboardEvent = KeyboardEvent;

})(psd.fenix.event);(function(namespace) {
    
    // Inheritance class
    CacheEvent.prototype = new psd.framework.Event();

    /**
     * 
     */
    CacheEvent.CACHE_FLUSH = "cacheFlush";
    
    /**
     * @param type
     * @constructor
     */
    function CacheEvent(type) 
    {
        // Super
        psd.framework.Event.call(this, type);
    }
    
    // Incluimos la declaracion de la clase en el namespace psd.fenix	
    namespace.CacheEvent = CacheEvent;

})(psd.fenix.event);(function(namespace) {

    // Inheritance class
    TextureAtlas.prototype = new psd.framework.EventDispatcher();

    /**
     *
     * @constructor
     * @param textureURL URL del recurso con las imágenes del movieclip
     * @param descriptionURL Descripción textual del movieclip por frames
     * @param jsonp Indica si la petición de datos debe hacerse mediante jsonp
     */
    function TextureAtlas(textureURL, descriptionURL, jsonp)
    {
        // Super
        psd.framework.EventDispatcher.call(this);
        
        /**
         * className psd.fenix.textures.TextureAtlas
         */
        this.className = "psd.fenix.textures.TextureAtlas";
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

        // Indica si la petición de datos debe hacerse mediante jsonp
        var _jsonp = (jsonp==true || jsonp=="true")?true:false;

        // URL del atlas con los recursos gráficos
        var _textureURL = textureURL;
        
        // Indica si el atlas de imágenes se ha cargado corectamente
        var _textureReady = false;
        
        // Función utilizada para ejecutar la llamada a la función _onTextureLoaded
        // manteniendo el contexto de ejecución dentro de la instancia del movieclip
        var _deferredTextureLoaded = (function(textureAtlas) { return function(){ _onTextureLoaded.apply(textureAtlas); } })(this);

        // Actualiza el valor de la propiedad _textureReady para indicar que la carga
        // del contenido gráfico del movieclip se ha cargado
        var _onTextureLoaded = function() 
        { 
            _textureReady = true;
            
            if(_descriptionReady) { this.dispatchEvent(new psd.framework.Event("texture_atlas_ready")); }
        };
        
        // Descripción de los frames del movieclip
        var _description = null;        
        
        // URL del json con la descprición del movieclip
        var _descriptionURL = descriptionURL;
        
        // Indica si la descripción del movieclip se ha cargado correctamente
        var _descriptionReady = false;
        
        // Mediator para la carga de las descripciones del movieclip
        var _descriptionMediator = new psd.framework.Mediator();

        // Parsea el resultado recibido con la descripción del movieclip
        var _onDescriptionComplete = function(evt)
        {
            if(_jsonp) { _description = evt.result.parserResult.result; }
            else { _description = JSON.parse(evt.result.parserResult.result); }
            
            _descriptionReady = true;
            
            if(_textureReady) { this.dispatchEvent(new psd.framework.Event("texture_atlas_ready")); }
        };

        // Detecta errores de carga en la descripción del movieclip
        var _onDescriptionError = function(evt) { Log.log("onMediateError: " + evt); }
        
        // Parser para la carga de las descripciones del movieclip
        var _jsonParser = new psd.framework.Parser();

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        
        /**
         * Image para la carga del grupo de texturas
         */
        var _texture = new Image();
        this.texture = function() { return _texture; }
        
        /**
         * 
         * @param
         * @returns 
         */
        this.getFrames = function(prefix)
        {
            var i, j, frame, frames = [];
            
            // Si recibimos el comodín * como prefijo, devolvemos de manera
            // instantánea todo el array de texturas
            if(prefix == "*") { frames = _description.frames; }
            else
            {
                // Convertimos la entrada en Array si no lo es
                if(Object.prototype.toString.apply(prefix) != "[object Array]") { prefix = [prefix]; }
                
                for(i in _description.frames)
                { 
                    frame = _description.frames[i];
                    for(j in prefix) { if(frame.filename.indexOf(prefix[j]) == 0) { frames.push(frame); } }
                }
            }
            
            return frames;
        }
        
        // Iniciamos la carga de las texturas y descripción del movieclip
        _descriptionMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_COMPLETE, _onDescriptionComplete, this);
        _descriptionMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_ERROR, _onDescriptionError, this);
        _descriptionMediator.mediate(_descriptionURL, _jsonParser, _jsonp?psd.framework.Mediator.RESPONSE_JSONP:psd.framework.Mediator.RESPONSE_JSON);
        
        _texture.onload = _deferredTextureLoaded;
        _texture.crossOrigin = "anonymous";
        _texture.src = _textureURL;
    }

    namespace.TextureAtlas = TextureAtlas;

})(psd.fenix.textures);(function(namespace) {

    /**
     * Especifica un color simple de relleno para las siguientes llamadas a
     * comandos gráficos como drawCircle() o lineTo()
     * @param color El color de relleno
     * @param alpha El valor de transparencia del relleno
     * @constructor
     */
    function BeginFillCommand(color, alpha) 
    {
        /**
         * className psd.fenix.display.commands.BeginFillCommand
         */
        this.className = "psd.fenix.display.commands.BeginFillCommand";
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//        
        
        // Color de relleno
        var _color = color!=undefined?color:0x000000;
        
        // Transparencia de relleno
        var _alpha = alpha!=undefined?alpha:1;
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//        
        
        /**
         * Ejecuta el comando gráfico
         */
        this.exec = function(ctx) 
        {
            ctx.closePath();
            ctx.fillStyle = psd.fenix.ColorUtil.colorToRGB(_color, _alpha);
            ctx.beginPath();
        };
    }
    
    // Incluimos la declaracion de la clase en el namespace psd.fenix.display.commands
    namespace.BeginFillCommand = BeginFillCommand;

})(psd.fenix.display.commands);(function(namespace) {

    /**
     *
     * @param type
     * @param colors
     * @param alphas
     * @param ratios
     */
    function BeginGradientFillCommand(displayObject, type, colors, alphas, ratios) 
    {
        /**
         * className psd.fenix.display.commands.BeginGradientFillCommand
         */
        this.className = "psd.fenix.display.commands.BeginGradientFillCommand";
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//        
        
        var _displayObject = displayObject;
        
        // 
        var _type = (type!=undefined && (type=="linear" || type=="radial"))?type:"linear";
        
        // 
        var _colors = colors!=undefined?colors:[];
        
        // 
        var _alphas = alphas!=undefined?alphas:[];
        
        // 
        var _ratios = ratios!=undefined?ratios:[];
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//        
        
        /**
         * Ejecuta el comando gráfico
         */
        this.exec = function(ctx) 
        {
            var gradient = _type=="linear"?ctx.createLinearGradient(0,0,0,_displayObject.height()):ctx.createRadialGradient(0,0,1,1,1,1),
                stop;
            
            for(stop in _colors)
            {
                gradient.addColorStop(_ratios[stop], psd.fenix.ColorUtil.colorToRGB(_colors[stop], _alphas[stop]));
            }
            
            ctx.closePath();
            ctx.fillStyle = gradient;
            ctx.beginPath();
        };
    }
    
    // Incluimos la declaracion de la clase en el namespace psd.fenix.display.commands
    namespace.BeginGradientFillCommand = BeginGradientFillCommand;

})(psd.fenix.display.commands);(function(namespace) {

    /**
     * 
     * @param controlX
     * @param controlY 
     * @param anchorX 
     * @param anchorY
     * @constructor
     */
    function CurveToCommand(controlX, controlY, anchorX, anchorY) 
    {
        /**
         * className psd.fenix.display.commands.CurveToCommand
         */
        this.className = "psd.fenix.display.commands.CurveToCommand";
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//        
        
        //
        var _controlX = controlX!=undefined?controlX:0;
        
        // 
        var _controlY = controlY!=undefined?controlY:0;
        
        // La posición horizontal donde empieza el rectángulo
        var _anchorX = anchorX!=undefined?anchorX:0;
        
        // La posición horizontal donde empieza el rectángulo
        var _anchorY = anchorY!=undefined?anchorY:0;
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//        
        
        /**
         * Ejecuta el comando gráfico
         */
        this.exec = function(ctx) 
        { 
            ctx.quadraticCurveTo(_controlX, _controlY, _anchorX, _anchorY);
            ctx.stroke();
        };
    }
    
    // Incluimos la declaracion de la clase en el namespace psd.fenix.display.commands
    namespace.CurveToCommand = CurveToCommand;

})(psd.fenix.display.commands);(function(namespace) {

    /**
     * Dibuja un círculo. El relleno y el borde deben establecerse previamente
     * ralizando las llamadas apropiadas a los métodos de tipo beginFill y lineStyle
     * @param x La posición horizontal del punto central del círculo
     * @param y La posición vertical del punto central del círculo
     * @param radius El radio del círculo
     * @constructor
     */
    function DrawCircleCommand(x, y, radius) 
    {
        /**
         * className psd.fenix.display.commands.DrawCircleCommand
         */
        this.className = "psd.fenix.display.commands.DrawCircleCommand";
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//        
        
        // La posición horizontal donde empieza el rectángulo
        var _x = x!=undefined?x:0;
        
        // La posición horizontal donde empieza el rectángulo
        var _y = y!=undefined?y:0;
        
        // El radio del círculo
        var _radius = radius!=undefined?radius:0;
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//        
        
        /**
         * Ejecuta el comando gráfico
         */
        this.exec = function(ctx) 
        {
            ctx.arc(_x, _y, _radius, 0, 2 * Math.PI, false);

            //Devolvemos los límites del contenido pintado
            return new psd.fenix.Rectangle(_x -_radius,_y -_radius,_radius * 2,_radius * 2);
        };
    }
    
    // Incluimos la declaracion de la clase en el namespace psd.fenix.display.commands
    namespace.DrawCircleCommand = DrawCircleCommand;

})(psd.fenix.display.commands);(function(namespace) {

    /**
     * Dibuja un rectángulo. El relleno y el borde deben establecerse previamente
     * ralizando las llamadas apropiadas a los métodos de tipo beginFill y lineStyle
     * @param x La posición horizontal donde empieza el rectángulo
     * @param y La posición vertical donde empieza el rectángulo
     * @param width El ancho del rectángulo
     * @param height El alto del rectángulo
     * @constructor
     */
    function DrawRectCommand(x, y, width, height) 
    {
        /**
         * className psd.fenix.display.commands.DrawRectCommand
         */
        this.className = "psd.fenix.display.commands.DrawRectCommand";
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//        
        
        // La posición horizontal donde empieza el rectángulo
        var _x = x!=undefined?x:0;
        
        // La posición horizontal donde empieza el rectángulo
        var _y = y!=undefined?y:0;
        
        // La posición horizontal donde empieza el rectángulo
        var _width = width!=undefined?width:0;
        
        // La posición horizontal donde empieza el rectángulo
        var _height = height!=undefined?height:0;
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//        
        
        /**
         * Ejecuta el comando gráfico
         */
        this.exec = function(ctx) 
        {
            ctx.beginPath();
            ctx.fillRect(_x, _y, _width, _height);
            //ctx.strokeRect(_x, _y, _width, _height);
            ctx.closePath();

            //Devolvemos los límites del contenido pintado
            return new psd.fenix.Rectangle(_x,_y,_width,_height);
        };
    }
    
    // Incluimos la declaracion de la clase en el namespace psd.fenix.display.commands
    namespace.DrawRectCommand = DrawRectCommand;

})(psd.fenix.display.commands);/**
 * Created by igomez on 25/10/13.
 */
(function(namespace){

    /**
     * Dibuja un rectángulo con esquinas redondeadas. El relleno y el borde deben establecerse previamente
     * ralizando las llamadas apropiadas a los métodos de tipo beginFill y lineStyle
     * @param x La posición horizontal donde empieza el rectángulo
     * @param y La posición vertical donde empieza el rectángulo
     * @param width El ancho del rectángulo
     * @param height El alto del rectángulo
     * @param ellipseWidth  The width of the ellipse used to draw the rounded corners (in pixels).
     * @param ellipseHeight  The height of the ellipse used to draw the rounded corners (in pixels). Optional; if no value is specified, the default value matches that provided for the ellipseWidth parameter.
     * @constructor
     */
    function DrawRoundRectCommand(x, y, width, height, ellipseWidth, ellipseHeight){

        /**
         * className psd.fenix.display.commands.DrawRoundRectCommand
         */
        this.className = "psd.fenix.display.commands.DrawRoundRectCommand";

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

        // La posición horizontal donde empieza el rectángulo
        var _x = x!=undefined?x:0;

        // La posición horizontal donde empieza el rectángulo
        var _y = y!=undefined?y:0;

        // La posición horizontal donde empieza el rectángulo
        var _width = width!=undefined?width:0;

        // La posición horizontal donde empieza el rectángulo
        var _height = height!=undefined?height:0;

        //The width of the ellipse used to draw the rounded corners (in pixels).
        var _ellipseWidth = ellipseWidth!=undefined?ellipseWidth:0;

        // The height of the ellipse used to draw the rounded corners (in pixels). Optional; if no value is specified, the default value matches that provided for the ellipseWidth parameter.
        var _ellipseHeight = ellipseHeight!=undefined?ellipseHeight:_ellipseWidth;


        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

        /**
         * Ejecuta el comando gráfico
         */
        this.exec = function(ctx)
        {
            ctx.beginPath();
            ctx.moveTo(_x + _ellipseWidth, _y);
            ctx.lineTo(_x + _width - _ellipseWidth, _y);
            ctx.quadraticCurveTo(_x + _width, _y, _x + _width, _y + _ellipseHeight);
            ctx.lineTo(_x + _width, _y + _height - _ellipseHeight);
            ctx.quadraticCurveTo(_x + _width, _y + _height, _x + _width - _ellipseWidth, _y + _height);
            ctx.lineTo(_x + _ellipseWidth, _y + _height);
            ctx.quadraticCurveTo(_x, _y + _height, _x, _y + _height - _ellipseHeight);
            ctx.lineTo(_x, _y + _ellipseHeight);
            ctx.quadraticCurveTo(_x, _y, _x + _ellipseWidth, _y);
            ctx.closePath();
            //ctx.stroke();

            //Devolvemos los límites del contenido pintado
            return new psd.fenix.Rectangle(_x,_y,_width,_height);

        };

    }

    // Incluimos la declaracion de la clase en el namespace psd.fenix.display.commands
    namespace.DrawRoundRectCommand = DrawRoundRectCommand;

})(psd.fenix.display.commands);(function(namespace) {

    /**
     * Aplica rellenos a todos los comandos gráficos ejecutados desde la última
     * llamada a un comando de tipo beginFill.
     * @constructor
     */
    function EndFillCommand() 
    {
        /**
         * className psd.fenix.display.commands.EndFillCommand
         */
        this.className = "psd.fenix.display.commands.EndFillCommand";
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//        
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//        
        
        /**
         * Ejecuta el comando gráfico
         */
        this.exec = function(ctx) 
        {
            ctx.fill();
            //ctx.stroke();
        };
    }
    
    // Incluimos la declaracion de la clase en el namespace psd.fenix.display.commands
    namespace.EndFillCommand = EndFillCommand;

})(psd.fenix.display.commands);(function(namespace) {

    /**
     * Especifica un color simple de relleno para las siguientes llamadas a
     * comandos gráficos como drawCircle() o lineTo()
     * @param thickness
     * @param color
     * @param alpha
     * @param caps
     * @param joints
     * @param miterLimit
     * @constructor
     */
    function LineStyleCommand(thickness, color, alpha, caps, joints, miterLimit) 
    {
        /**
         * className psd.fenix.display.commands.LineStyleCommand
         */
        this.className = "psd.fenix.display.commands.LineStyleCommand";
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//        
        
        // 
        var _lineWidth = thickness!=undefined?thickness:0;
        
        // 
        var _color = color!=undefined?color:0x000000;
        
        // 
        var _alpha = color!=undefined?alpha:1;
        
        // 
        var _lineCap = caps!=undefined?caps:"";
        
        // 
        var _lineJoin = joints!=undefined?joints:"";
        
        // 
        var _miterLimit = miterLimit!=undefined?miterLimit:0;

        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//        
        
        /**
         * Ejecuta el comando gráfico
         */
        this.exec = function(ctx) 
        {
            ctx.lineWidth = _lineWidth;
            ctx.lineCap = _lineCap;
            ctx.lineJoin = _lineJoin;
            ctx.miterLimit = _miterLimit;
            ctx.strokeStyle = psd.fenix.ColorUtil.colorToRGB(_color, _alpha);
        };
    }
    
    // Incluimos la declaracion de la clase en el namespace psd.fenix.display.commands
    namespace.LineStyleCommand = LineStyleCommand;

})(psd.fenix.display.commands);(function(namespace) {

    /**
     * 
     * @param x 
     * @param y 
     * @constructor
     */
    function LineToCommand(x, y) 
    {
        /**
         * className psd.fenix.display.commands.LineToCommand
         */
        this.className = "psd.fenix.display.commands.LineToCommand";
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//        
        
        // La posición horizontal donde empieza el rectángulo
        var _x = x!=undefined?(Math.floor(x)+0.5):0;
        
        // La posición horizontal donde empieza el rectángulo
        var _y = y!=undefined?(Math.floor(y)+0.5):0;
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//        
        
        /**
         * Ejecuta el comando gráfico
         */
        this.exec = function(ctx) 
        { 
            ctx.lineTo(_x, _y);
            ctx.stroke();
        };
    }
    
    // Incluimos la declaracion de la clase en el namespace psd.fenix.display.commands
    namespace.LineToCommand = LineToCommand;

})(psd.fenix.display.commands);(function(namespace) {

    /**
     * 
     * @param x 
     * @param y 
     * @constructor
     */
    function MoveToCommand(x, y) 
    {
        /**
         * className psd.fenix.display.commands.MoveToCommand
         */
        this.className = "psd.fenix.display.commands.MoveToCommand";
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//        
        
        // La posición horizontal donde empieza el rectángulo
        var _x = x!=undefined?(Math.floor(x)+0.5):0;
        
        // La posición horizontal donde empieza el rectángulo
        var _y = y!=undefined?(Math.floor(y)+0.5):0;
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//        
        
        /**
         * Ejecuta el comando gráfico
         */
        this.exec = function(ctx) 
        { 
            ctx.closePath();
            ctx.beginPath(); 
            ctx.moveTo(_x, _y); 
        };
    }
    
    // Incluimos la declaracion de la clase en el namespace psd.fenix.display.commands
    namespace.MoveToCommand = MoveToCommand;

})(psd.fenix.display.commands);(function(namespace) {
	
    // Inheritance class
    Graphics.prototype = new psd.framework.EventDispatcher();
	
    /**
     * La clase Graphics contiene una serie de métodos que pueden utilizarse para la
     * creación de formas vectoriales directamente sobre el canvas de la aplicación
     * @constructor
     */
    function Graphics()
    {
        // Super
        psd.framework.EventDispatcher.call(this);
        
        /**
         * className psd.fenix.DisplayObject
         */
        this.className = "psd.fenix.Graphics";

        /**
         * Define los límites del área definida por todos los commands de la clase
         * @type psd.fenix.Rectangle
         * @private
         */
        var _bounds = null;
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//        
        
        // Array de comandos gráficos asociados al elemento Graphics
        var _commands = [];
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

        this.bounds = function(){
            var b = new psd.fenix.Rectangle(0,0,0,0);
            if (_bounds != null){
                b = _bounds;
            }
            return b;
        };

        /**
         * Ejecuta toda la secuencia de comandos de pintado asociados al elemento
         * Graphcis.
         * @param ctx El contexto sobre el que ejecutar los comandos gráficos
         */
        this.draw = function(ctx) 
        {
            var i, bnd;
            
            // Guardamos el estado inicial del contexto sobre el que se aplican
            // los comandos gráficos
            ctx.save();
            
            // 
            ctx.beginPath();
            
            // Aplicamos secuencialmente todos los comandos registrados
            for (i=0; i < _commands.length; i++) {
                bnd =  _commands[i].exec(ctx);

                //Realizamos el cálculo de límites globales de Graphics
                //En este momento no todos los comandos devuelven contenido, imeplemntados únicamente (circle, rect y roundrect)
                if(bnd!=undefined){
                    if (_bounds == null){
                        _bounds = new psd.fenix.Rectangle(bnd.x, bnd.y, bnd.width, bnd.height);
                    }else{
                        if(bnd.x<_bounds.x) _bounds.x = bnd.x;
                        if(bnd.y<_bounds.y) _bounds.y = bnd.y;
                        if((bnd.width + bnd.x) > (_bounds.width + _bounds.x)) _bounds.width = bnd.x - _bounds.x + bnd.width;
                        if((bnd.height + bnd.y) > (_bounds.height + _bounds.y)) _bounds.height = bnd.y - _bounds.y + bnd.height;
                    }
                }
            }
            
            //
            ctx.closePath();
            
            // Restauramos el estado del contexto
            ctx.restore();
        };        
        
        /**
         * Especifica un color simple de relleno para las siguientes llamadas a
         * comandos gráficos como drawCircle() o lineTo()
         * @param color El color de relleno
         * @param alpha El valor de transparencia del relleno
         */
        this.beginFill = function(color, alpha) 
        { 
            _commands.push(new psd.fenix.display.commands.BeginFillCommand(color, alpha)); 
        };
        
        /**
         *
         * @param displayObject
         * @param type
         * @param colors
         * @param alphas
         * @param ratios
         */
        this.beginGradientFill = function(displayObject, type, colors, alphas, ratios)
        {
            _commands.push(new psd.fenix.display.commands.BeginGradientFillCommand(displayObject, type, colors, alphas, ratios));
        };
        
        /**
         * Elimina la secuencia de comandos asociados a este elemento
         */
        this.clear = function() { _commands = []; };
        
        /**
         * 
         */
        this.curveTo = function(controlX, controlY, anchorX, anchorY) 
        {
            _commands.push(new psd.fenix.display.commands.CurveToCommand(controlX, controlY, anchorX, anchorY));
        };        
        
        /**
         * 
         * @param x
         * @param y
         * @param radius
         */
        this.drawCircle = function(x, y, radius) 
        {
            _commands.push(new psd.fenix.display.commands.DrawCircleCommand(x, y, radius));             
        };        
        
        /**
         * Dibuja un rectángulo. El relleno y el borde deben establecerse previamente
         * ralizando las llamadas apropiadas a los métodos de tipo beginFill y lineStyle
         * @param x La posición horizontal donde empieza el rectángulo
         * @param y La posición vertical donde empieza el rectángulo
         * @param width El ancho del rectángulo
         * @param height El alto del rectángulo
         */
        this.drawRect = function(x, y, width, height) 
        {
            _commands.push(new psd.fenix.display.commands.DrawRectCommand(x, y, width, height));             
        };

        /**
         * Dibuja un rectángulo con esquinas redondeadas. El relleno y el borde deben establecerse previamente
         * ralizando las llamadas apropiadas a los métodos de tipo beginFill y lineStyle
         * @param x La posición horizontal donde empieza el rectángulo
         * @param y La posición vertical donde empieza el rectángulo
         * @param width El ancho del rectángulo
         * @param height El alto del rectángulo
         * @param ellipseWidth  The width of the ellipse used to draw the rounded corners (in pixels).
         * @param ellipseHeight  The height of the ellipse used to draw the rounded corners (in pixels). Optional; if no value is specified, the default value matches that provided for the ellipseWidth parameter.
         */
        this.drawRoundRect = function (x, y, width, height, ellipseWidth, ellipseHeight){
            _commands.push(new psd.fenix.display.commands.DrawRoundRectCommand(x, y, width, height, ellipseWidth, ellipseHeight));
        }

        /**
         * Aplica rellenos a todos los comandos gráficos ejecutados desde la última
         * llamada a un comando de tipo beginFill.
         */
        this.endFill = function()
        {
            _commands.push(new psd.fenix.display.commands.EndFillCommand());             
        };
        
        /**
         * 
         */
        this.lineStyle = function(thickness, color, alpha, caps, joints, miterLimit) 
        {
            _commands.push(new psd.fenix.display.commands.LineStyleCommand(thickness, color, alpha, caps, joints, miterLimit));
        };
        
        /**
         * 
         */
        this.lineTo = function(x, y) 
        {
            _commands.push(new psd.fenix.display.commands.LineToCommand(x, y));
        };        

        /**
         * 
         */
        this.moveTo = function(x, y) 
        {
            _commands.push(new psd.fenix.display.commands.MoveToCommand(x, y));
        };		
    }
	
    // Incluir clase al contexto window
    namespace.Graphics = Graphics;
	
})(psd.fenix.display);(function(namespace) {
    
    // Inheritance class
    DisplayObject.prototype = new psd.framework.EventDispatcher();
    
    /**
     * DisplayObject es la clase base para cualquier elemento visual dentro de
     * fenix
     * @constructor
     */
    function DisplayObject()
    {
        // Super
        psd.framework.EventDispatcher.call(this);
        
        /**
         * className psd.fenix.DisplayObject
         */
        this.className = "psd.fenix.DisplayObject";
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        
        // Identificador único del objeto
        var _uid = psd.fenix.UID.getKeyId();
        
        // Indica si los valores medidos almacenados en _measuredWidth y _measuredHeight
        // son correctos. En caso contrario, debería realizarse una llamada a la función
        // _measure para actualizarlos correctamente
        var _validSize = false;
        
        // Valor de ancho establecido de manera interna.
        var _internalWidth = 0;
        
        // Valor de ancho establecido a través de la API DisplayObject::width()
        var _externalWidth = 0;
        
        // Valor de ancho medido
        var _measuredWidth = 0;
        
        // Valor de alto establecido de manera interna.
        var _internalHeight = 0;
        
        // Valor de alto establecido a través de la API DisplayObject::height()
        var _externalHeight = 0;
        
        // Valor de alto medido
        var _measuredHeight = 0;
        
        // Referencia al tipo de cursor seteado antes de realizar un cambio para 
        // mostrar interacción con el ratón (por ejemplo en mouseOver con buttonMode
        // y useHandCursor a true)
        var _prevCursor = null;
        
        // Flag indicando si ya hemos detectado el evento de mouseOver
        var _mouseOverFlag = false;        
        
        // Actualiza la referencia al parent de este displayobject
        var onAdded = function(evt) {_parent = evt.currentTarget;};
        
        // Escuchamos el evento de added para actualizar la referencia al parent
        // del displayobject
        this.addEventListener(psd.fenix.StageEvent.ADDED, onAdded);
        
        // Actualiza la referencia al stage de este displayobject
        var _onAddedToStage = function(evt)
        { 
            _stage = evt.currentTarget;
            _context2d = _stage.context2d();
        };
        
        // Escuchamos el evento de added_to_stage para actualizar la referencia
        // al stage del displayobject
        this.addEventListener(psd.fenix.StageEvent.ADDED_TO_STAGE, _onAddedToStage, this);
        
        //


        // renderizado interno del displayobject.
        // @param ctx   El contexto que se desea preparar y sobre el que se realizará
        //              el renderizado
        this._prepareContext = function(ctx)
        {
            // Evitamos realizar acciones a falta de un contexto válido
            if(ctx)
            {                
                // Aplicamos las transformaciones en orden (traslación, rotación, escala)
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotation);
                ctx.scale(_scaleX, _scaleY);
                
                // Aplicamos la transparencia 
                ctx.globalAlpha = this.globalAlpha();
                
                // Si tenemos un scrollRect valido, ejecutamos el clip del contenido
                if(this.scrollRect != null)
                {
                    ctx.beginPath();
                    ctx.rect(0, 0, this.scrollRect.width, this.scrollRect.height);
                    ctx.clip();
                    ctx.translate(-this.scrollRect.x, -this.scrollRect.y);                                    
                }
            }
        };
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        
        /**
         * Nombre del objeto
         */
        this.name = "instance_" + _uid;
        
        /**
         * Posicion x del objeto
         */
        this.x = 0;
        
        /**
         *
         */
        this.globalX = function()
        {
            if(this.className == "psd.fenix.Stage") {return 0;} 
            else if(this.parent()==null) {return this.x;}
            else {return this.parent().globalX() + this.x * this.parent().scaleX();}
        };
        
        /**
         * Posicion y del objeto
         */
        this.y = 0;
        
        /**
         *
         */
        this.globalY = function()
        {
            if(this.className == "psd.fenix.Stage") {return 0;} 
            else if(this.parent()==null) {return this.y;}
            else {return this.parent().globalY() + this.y * this.parent().scaleY();}
        };
        
        /**
         * Posición z del objeto
         */
        this.z = 0;
        
        /**
         * Ancho del objeto
         */
        this.width = function(value)
        {
            if(value && value!=_externalWidth) {_externalWidth = value;_validSize = false;}
            if(!_validSize){this.measure();}
            return _measuredWidth; 
        };
        
        /**
         * Alto del objeto
         */
        this.height = function(value)
        {
            if(value && value!=_externalHeight) {_externalHeight = value;_validSize = false;}
            if(!_validSize){this.measure();}
            return _measuredHeight;
        };
        
        /**
         * Escalado horizontal del objeto
         */
        var _scaleX = 1;
        this.scaleX = function(value)
        {
            if(value && value!=_scaleX) {_scaleX = value;_validSize = false;}
            return _scaleX;
        };
        
        /**
         * Escalado vertical del objeto
         */
        var _scaleY = 1;
        this.scaleY = function(value)
        {
            if(value && value!=_scaleY) {_scaleY = value;_validSize = false;}
            return _scaleY;
        };
        
        /**
         * Rotacion del objeto
         */
        this.rotation = 0;
	
        /**
         * Transparencia del objeto
         */
        this.alpha = 1;
        
        /**
         * Detección de interacción del ratón por bounds en lugar de hittest
         */
        var _boundsDetection = false;
        this.boundsDetection = function(value)
        {
            if(value!=undefined) {_boundsDetection = value;}
            return _boundsDetection;
        };
        
        /**
         * Transparencia total del objeto. Se calcula de manera recursiva 
         * aplicando todos los valores de alpha desde el objeto hasta el 
         * primer elemento situado en el displayList
         */
        this.globalAlpha = function(value)
        {
            if(value && value!=_alpha) {_alpha = value;}
            
            if(this.className == "psd.fenix.Stage") {return this.alpha;} 
            else if(this.parent()==null) {return 1;}
            else {return this.parent().globalAlpha() * this.alpha;}
        };
        
        /**
         * Visibilidad del objeto
         */
        this.visible = true;
        
        /**
         * Indica si el objeto permite interacción con el raton
         */
        this.mouseEnabled = true;
        
        /**
         * Indica si el objeto se comporta como un botón
         */
        this.buttonMode = false;
        
        /**
         * Indica si el objeto utiliza el cursor tipo 'pointer' en el estado over
         * siempre que se encuentre en buttonMode=true
         */
        this.useHandCursor = true;
        
        /**
         * ScrollRect del displayObject
         */
        this.scrollRect = null;        
        
        /**
         *
         */
        this.cacheAsBitmap = false;
        
        /**
         *
         */
        var _cache;
        this.cache = function() {
            return _cache;
        };
        
        
        /**
         *
         */
        this.invalidateCache = function() {
            if (Object.prototype.toString.call(c) === "[object HTMLCanvasElement]"){				
				var c = document.createElement("canvas");
				_cache = {canvas:c,
							ctx:c.getContext("2d"),
							svg:null,
							data:null,
							url:null,
							img:new Image(),
							caching:false,
							ready:0,
							delay:Math.floor(Math.random()*60),
							DOMURL:self.URL || self.webkitURL || self};
			}
			else{
				_cache = {};
			}
                    
            this.dispatchEvent(new psd.fenix.event.CacheEvent(psd.fenix.event.CacheEvent.CACHE_FLUSH));
        };        
        
        /**
         * Referencia al stage de la aplicación. Esta propiedad es null hasta que
         * el displayobject no ha sido añadido al stage, bien directamente o a 
         * través de displaylists anidados (contenedores)
         */
        var _stage = null;
        this.stage = function() {return _stage;};
        
        /**
         * Referencia al contenedor padre del displayObject. Esta propiedad es null
         * hasta que no ha sido añadido a ningún contendor.
         */
        var _parent = null;
        this.parent = function() {return _parent;};
        
        /**
         * Instancia de context2d donde se debe renderizar este displayobject
         */
        var _context2d = null;
        this.context2d = function() {return _context2d;};
        
        /**
         * Clase graphics del elemento
         */
        var _graphics = new psd.fenix.display.Graphics();
        this.graphics = function() {return _graphics;};
        
        /**
         * Invalida el tamaño del displayobject introduciendo nuevos valores internos
         * @param w El valor de ancho interno
         * @param h El valor de alto interno
         */
        this.invalidateSize = function(w,h)
        {
            if(w!=null && w!=undefined) {_internalWidth = w;}
            if(h!=null && h!=undefined) {_internalHeight = h;}
            _validSize = false;
            
            if(this.parent()!=null && this.parent().className!="psd.fenix.Stage") {this.parent().invalidateSize();}
            
            this.invalidateCache();
            if(this.parent()!=null && this.parent().className!="psd.fenix.Stage") {this.parent().invalidateCache();}
            
        };
        
        /**
         * Valida el tamaño del dislpayObject
         * @param w
         * @param h
         */
        this.validateSize = function(w,h)
        {
            if(!_validSize)
            {
                if(_internalWidth!=0) {w = _internalWidth;}
                if(_internalHeight!=0) {h = _internalHeight;}
                
                if(w==0) {w = _externalWidth;}
                if(h==0) {h = _externalHeight;}
                
                if(_externalWidth!=0 && w!=0) {_scaleX = _externalWidth/w;}
                if(_externalHeight!=0 && h!=0) {_scaleY = _externalHeight/h;}
                
                _measuredWidth = w * _scaleX;
                _measuredHeight = h * _scaleY;
                _validSize = true;
                
                this.dispatchEvent(new psd.fenix.event.CacheEvent(psd.fenix.event.CacheEvent.CACHE_FLUSH));
                this.dispatchEvent(new psd.fenix.StageEvent(psd.fenix.StageEvent.RESIZE));
            }
        };
        
        /**
         * Realiza los calculos necesarios para obtener la medida correcta de las 
         * dimensiones del displayobject
         */
        this.measure = function() {this.validateSize(_internalWidth, _internalHeight);}        
        
        /**
         * Renderiza el displayObject sobre el contexto seleccionado
         * @param ctx El contexto sobre el que renderizar el objeto
         */
        this.render = function(ctx) 
        {
            // Si el tamaño del objeto no es válido, realizamos la medición
            if(!_validSize) {this.measure();}
            
            // Sólo renderizamos el objeto si es visible 
            if (ctx != null && this.visible && this.globalAlpha() > 0) 
            {
                // Guardamos el estado actual del contexto
                ctx.save();
                
                // Preparamos el contexto para el renderizado del objeto
                this._prepareContext.apply(this,[ctx]);
                
                // Ejectuamos las acciones de pintado de la instancia de graphics
                // del displayobject
                this.graphics().draw(ctx);
                
                // Ejecutamos las acciones de renderizado del displayobject
                if (this._render) {this._render(ctx);}
                
                // Restauramos el estado anterior del contexto
                ctx.restore();
            }
        };        
        
        /**
         * Detecta si el elemento tiene contenido en la posicion global (x,y) 
         * @param x Coordenada X que se quiere comprobar
         * @param y Coordenada Y que se quiere comprobar
         * @returns Boolean indicando si el displayObject tiene contenido en la
         *          posición indicada
         */
        this.testHit = function(x,y,hitContext)
        {
            var hit = (x >= this.globalX() && x <= this.globalX() + this.width() &&
                       y >= this.globalY() && y <= this.globalY() + this.height());

            if(hit && !_boundsDetection && psd!=null && psd.fenix!=null && hitContext!=null) {
                // Aplicamos las transformaciones necesarias para que el punto (x,y)
                // se pinte en el pixel (0,0) de nuestro hitCanvas.
                hitContext.clearRect(0,0,1,1);
                hitContext.save();
                this._prepareContext(hitContext);

                // Si el objeto permite renderizado, lo pintamos sobre el canvas 
                // de deteccion de raton, indicando que se trata de un render de test
                // _render(hitContext, true)
                if (typeof(this._render)!="undefined") {this._render(hitContext, true);}
                this.render(hitContext, true);

                // Detectamos colisión si el pixel situado en (0,0) del hitCanvas
                // que corresponde al (x,y) global tiene un valor de alpha mayor que 1
                if (typeof(hitContext.getImageData)!="undefined") {
                    hit = hitContext.getImageData(0, 0, 1, 1).data[3] > 1;
                }

                // Restauramos el contexto del hitCanvas para las siguientes operaciones
                hitContext.restore();
            }
            
            return hit;
        };
        
        /**
         * Flag indicando si ya hemos detectado el evento de mouseDown
         * TODO Sustituir getter/setter por propiedad privada
         */
        var _mouseDownFlag = false;
        this.isMouseDown = function(value)
        {
            if(value==true || value==false) {_mouseDownFlag = value;}
            return _mouseDownFlag;
        };
        
        /**
         * Invalida el estado del ratón sobre el displayObject.
         * @param mouseData Objecto con el estado del ratón
         *                x La coordenada x del ratón
         *                y La coordenada y del ratón
         *             down El estado de mouseDown del ratón
         */
        this.invalidateMouseStatus = function(mouseData) {this.updateMouseStatus(false,mouseData,true);};        
        
        /**
         * Actualiza el estado del ratón sobre el displayObject para unas coordenadas
         * (x,y) y un valor de mouseDown.
         * @param mouseData Objecto con el estado del ratón
         *                x La coordenada x del ratón
         *                y La coordenada y del ratón
         *             down El estado de mouseDown del ratón
         * @returns Un boolean indicando si el ratón se encuentra sobre el displayobject
         */
        this.calculateMouseStatus = function(mouseData)
        {
            var hitResult = this.visible && this.testHit(mouseData.x,mouseData.y,mouseData.hitContext);
            this.updateMouseStatus(hitResult, mouseData, false);
            return hitResult;
        };        
        
        /**
         * Actualiza el estado del ratón sobre el elemento
         * @param hitResult El resultado del hitTest de la posición del ratón sobre el objeto
         * @param mouseData Objecto con el estado del ratón
         *                x La coordenada x del ratón
         *                y La coordenada y del ratón
         *             down El estado de mouseDown del ratón
         * @param invalidate Flag para indicar que la acción a realizar es invalidar
         *                   el estado actual.
         */
        this.updateMouseStatus = function(hitResult, mouseData, invalidate)
        {
            // Solo comprobamos colisiones para elementos que no son el stage
            if(this.className!="psd.fenix.Stage")
            {
                if(hitResult)
                {
                    // Si detectamos el raton encima del objeto, lanzamos el evento de over
                    // en el caso de que no se hubiera detectado ya (_mouseOverFlag=false)
                    if(!_mouseOverFlag)
                    {
                        _mouseOverFlag = true;
                        if(!invalidate)
                        {
                            if(this.buttonMode && this.useHandCursor) 
                            {
                                //_prevCursor = document.body.style.cursor;
                                document.body.style.cursor = "pointer";
                            }
                        }
                        this.dispatchEvent(new psd.fenix.MouseEvent(psd.fenix.MouseEvent.MOUSE_OVER, mouseData.x, mouseData.y));
                    }

                }else{
                    // Si detectamos el raton fuera del objeto, lanzamos el evento de out
                    // en el caso de que no se hubiera detectado ya (_mouseOverFlag=true)
                    if(_mouseOverFlag)
                    {
                        _mouseOverFlag = false;
                        if(!invalidate)
                        {
                            document.body.style.cursor = "auto";
                            //_prevCursor = null;
                        }
                        this.dispatchEvent(new psd.fenix.MouseEvent(psd.fenix.MouseEvent.MOUSE_OUT, mouseData.x, mouseData.y));
                    }
                }
            }
        };

        /**
         * Actualiza el estado del ratón sobre el displayObject para unas coordenadas
         * (x,y) y un valor de mouseDown.
         * @param mouseData Objecto con el estado del ratón
         *                x La coordenada x del ratón
         *                y La coordenada y del ratón
         *             down El estado de mouseDown del ratón
         * @returns Un boolean indicando si el ratón se encuentra sobre el displayobject
         */
        this.calculateMouseDownStatus = function(mouseData)
        {
            var hitResult = this.visible && this.testHit(mouseData.x,mouseData.y,mouseData.hitContext);
            this.updateMouseDownStatus(hitResult, mouseData);
            return hitResult;
        };

        /**
         * Actualiza la propiedad mouseDown del objeto
         * @param hitResult El resultado del hitTest de la posición del ratón sobre el objeto
         * @param mouseData Objecto con el estado del ratón
         *                x La coordenada x del ratón
         *                y La coordenada y del ratón
         *             down El estado de mouseDown del ratón
         */
        this.updateMouseDownStatus = function(hitResult, mouseData)
        {
            if(mouseData.down)
            {
                if(hitResult)
                {
                    if(!_mouseDownFlag)
                    {
                        _mouseDownFlag = true;
                        if(this.className!="psd.fenix.Stage") {this.dispatchEvent(new psd.fenix.MouseEvent(psd.fenix.MouseEvent.MOUSE_DOWN, 
                                                                                    mouseData.x, mouseData.y, 
                                                                                    mouseData.x - this.globalX(), mouseData.y - this.globalY()));}
                    }
                }else{
                    if(_mouseDownFlag)
                    {
                        _mouseDownFlag = false;
                        if(this.className!="psd.fenix.Stage") {this.dispatchEvent(new psd.fenix.MouseEvent(psd.fenix.MouseEvent.MOUSE_UP, 
                                                                                    mouseData.x, mouseData.y, 
                                                                                    mouseData.x - this.globalX(), mouseData.y - this.globalY()));}
                    }
                }
            }else{
                if(_mouseDownFlag)
                {
                    _mouseDownFlag = false;
                    if(this.className!="psd.fenix.Stage") {this.dispatchEvent(new psd.fenix.MouseEvent(psd.fenix.MouseEvent.MOUSE_UP, 
                                                                                    mouseData.x, mouseData.y, 
                                                                                    mouseData.x - this.globalX(), mouseData.y - this.globalY()));}
                }
            }
        };
        
        this.invalidateCache();
    }
    
    // Incluimos la declaracion de la clase en el namespace psd.fenix	
    namespace.DisplayObject = DisplayObject;

})(psd.fenix);(function(namespace) {
	
    // Inheritance class
    DisplayObjectContainer.prototype = new psd.fenix.DisplayObject();
	
    // Construct
    function DisplayObjectContainer() 
    {
        // Super
        psd.fenix.DisplayObject.call(this);
        
        /**
         * className psd.fenix.DisplayObjectContainer
         */
        this.className = "psd.fenix.DisplayObjectContainer";
                
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        
        // Notifica a los hijos que han sido añadidos al stage
        var _onAddedToStage = function(evt) 
        { 
            var i, numChildren = _displayList.length;
            for(i=0;i<numChildren;i++)
            {
                _displayList[i].dispatchEvent(new psd.fenix.StageEvent(psd.fenix.StageEvent.ADDED_TO_STAGE, evt.currentTarget));
            }
        };
        
        // Escuchamos el evento de added_to_stage para actualizar la referencia
        // al stage de los hijos del contenedor
        this.addEventListener(psd.fenix.StageEvent.ADDED_TO_STAGE, _onAddedToStage, this);
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        
        /**
         * DisplayList del contenedor. Array con todos los elementos que contiene.
         */
        var _displayList = [];
        this.displayList = function() {return _displayList;};
        
        /**
         * Numero de elementos en el contenedor.
         */
        this.numChildren = function() {return _displayList.length;};
        
        /**
         * 
         */
        var _mouseChildren = true;
        this.mouseChildren = function(value)
        { 
            if (value == true || value == false) {_mouseChildren = value;}
            return _mouseChildren;
        };        
        
        /**
         * Añade un nuevo elemento al contenedor
         * @param displayObject El nuevo elemento añadido
         */
        this.addChild = function(displayObject) 
        {
            // Añadimos el elemento al displayList del contenedor
            _displayList.push(displayObject);
            
            // Notificamos al displayObject que ha sido añadido para que actualice
            // la referencia a su parent
            displayObject.dispatchEvent(new psd.fenix.StageEvent(psd.fenix.StageEvent.ADDED, this));
            
            // Si el contenedor ya está añadido al stage, lo notificamos al elemento 
            // para que actualice la referencia al stage
            if (this.stage()!=null) {displayObject.dispatchEvent(new psd.fenix.StageEvent(psd.fenix.StageEvent.ADDED_TO_STAGE, this.stage()));}
            
            // Si el contenedor es el Stage, notificamos que el elemento se ha añadido
            // al stage para que actualice la referencia de su propiedad stage
            if (this.className == "psd.fenix.Stage") {displayObject.dispatchEvent(new psd.fenix.StageEvent(psd.fenix.StageEvent.ADDED_TO_STAGE, this));}
            
            return displayObject;
        };
        
        /**
         * Elimina un elemento del contenedor
         * @param displayObject El elemento a eliminar
         */
        this.removeChild = function(displayObject) 
        {
            // Obtenemos el indice del elemento y lo eliminamos del displayList
            var index = this.getChildIndex(displayObject);
            if (index >= 0) 
            { 
                _displayList.splice(index, 1);

                // Notificamos al displayObject que ha sido eliminado para que actualice
                // la referencia a su parent
                displayObject.dispatchEvent(new psd.fenix.StageEvent(psd.fenix.StageEvent.REMOVED, this));

                // Si el contenedor es el Stage, notificamos que el elemento se ha eliminado
                // del stage para que actualice la referencia de su propiedad stage
                if (this.className == "psd.fenix.Stage") {displayObject.dispatchEvent(new psd.fenix.StageEvent(psd.fenix.StageEvent.REMOVED_FROM_STAGE, this));}
            }
			
            return displayObject;
        };        
        
        /**
         * Añade un nuevo elemento al contenedor en un nivel dado
         * @param displayObject El nuevo elemento añadido
         * @param index El nivel donde se debe añadir el elemento
         */
        this.addChildAt = function(displayObject, index)
        {
            // Añadimos el elemento al displayList del contenedor en el nivel indicado
            _displayList.splice(index, 0, displayObject);
						
            // Notificamos al displayObject que ha sido añadido para que actualice
            // la referencia a su parent
            displayObject.dispatchEvent(new psd.fenix.StageEvent(psd.fenix.StageEvent.ADDED, this));
            
            // Si el contenedor ya está añadido al stage, lo notificamos al elemento 
            // para que actualice la referencia al stage
            if (this.stage()!=null) {displayObject.dispatchEvent(new psd.fenix.StageEvent(psd.fenix.StageEvent.ADDED_TO_STAGE, this.stage()));}            
            
            // Si el contenedor es el Stage, notificamos que el elemento se ha añadido
            // al stage para que actualice la referencia de su propiedad stage
            if (this.className == "psd.fenix.Stage") {displayObject.dispatchEvent(new psd.fenix.StageEvent(psd.fenix.StageEvent.ADDED_TO_STAGE, this));}
			
            return displayObject;
        };
        
        /**
         * Elimina un elemento del contenedor en un nivel dado
         * @param index El nivel del que se quiere eliminar el elemento
         */
        this.removeChildAt = function(index) 
        {
            // Eliminamos el elemento si el índice es válido            
            var displayObject = null; 
            if (index >= 0 && index <= _displayList.length) 
            {
                displayObject = _displayList[index];
                _displayList.splice(index, 1);
                
                // Notificamos al displayObject que ha sido añadido para que actualice
                // la referencia a su parent
                displayObject.dispatchEvent(new psd.fenix.StageEvent(psd.fenix.StageEvent.ADDED, this));

                // Si el contenedor es el Stage, notificamos que el elemento se ha añadido
                // al stage para que actualice la referencia de su propiedad stage
                if (this.className == "psd.fenix.Stage") {displayObject.dispatchEvent(new psd.fenix.StageEvent(psd.fenix.StageEvent.ADDED_TO_STAGE, this));}
            }
			
            return displayObject;
        };
        
        /**
         *
         */
        this.getChildIndex = function(displayObject)
        {
            var i=0, index=-1;
            
            for(i in _displayList)
            {
                    if(_displayList[i] === displayObject) {index = i;break;}
            }
            
            return index;
        }
        
        /**
         * Realiza los calculos necesarios para obtener la medida correcta de las 
         * dimensiones del displayobject
         */
        this.measure = function()
        {
            var i, child,bnd,
                numChildren = _displayList.length,
                minX=Number.MAX_VALUE, maxX=-Number.MAX_VALUE,
                minY=Number.MAX_VALUE, maxY=-Number.MAX_VALUE;
            
            if(numChildren)
            {
                for(i=0;i<numChildren;i++)
                {
                    child = _displayList[i];

                    if(child.x<minX) {minX = child.x;}
                    if((child.x+child.width())>maxX) {maxX = child.x+child.width();}

                    if(child.y<minY) {minY = child.y;}
                    if((child.y+child.height())>maxY) {maxY = child.y+child.height();}
                }

                bnd = this.graphics().bounds();
                if (bnd.x < minX) {minX = child.x;}
                if((bnd.x+child.width())>maxX) {maxX = bnd.x+bnd.width;}

                if(bnd.y<minY) {minY = bnd.y;}
                if((bnd.y+bnd.height)>maxY) {maxY = bnd.y+child.bnd;}

                this.validateSize((maxX-minX), (maxY-minY));
                
            } else {this.validateSize(0,0);}
        };
        
        /**
         * Elimina todos los elementos contenidos en el objeto
         */
        this.removeAllChildren = function() {
            while(this.numChildren()>0) {
                this.removeChildAt(0);
            }
        };

        /**
         * Renderiza el contenedor sobre el contexto seleccionado
         * @param ctx El contexto sobre el que renderizar el objeto
         */
        this.render = function(ctx) 
        {
            var i, cache = this.cache(),
                w = this.width(),
                h = this.height();
            
            // Sólo renderizamos el objeto si es visible 
            if (ctx != null && this.visible && this.globalAlpha() > 0) 
            {
                // Guardamos el estado actual del contexto
                ctx.save();

                // Preparamos el contexto para el renderizado del objeto
                this._prepareContext(ctx);
                
                if(this.cacheAsBitmap && cache.ready > 0) {
                    
                    cache.ready = Math.max(cache.ready-1,0);                    
                    ctx.drawImage(cache.img, 0, 0);
                    
                } else {

                    // Ejectuamos las acciones de pintado de la instancia de graphics
                    // del displayobject
                    this.graphics().draw(ctx);

                    // Ejecutamos las acciones de renderizado del contenedor
                    if (this._render) {this._render(ctx);}

                    // Renderizamos todos los elementos del contenedor
                    for (i = 0; i < _displayList.length; i++) {_displayList[i].render(ctx);}
                    
                    if(this.cacheAsBitmap) {
                        if(cache.delay > 0) {
                            cache.delay--;
                        }else if(cache.ready==0 && !cache.caching) {
                            
                            w = 2*w;
                            h = 2*h;
                            
                            cache.caching = true;
                            
                            cache.canvas.setAttribute("width", w);
                            cache.canvas.setAttribute("height", h);
                            cache.ctx.clearRect(0, 0, w, h);
                            
                            this.graphics().draw(cache.ctx);
                            if (this._render) {this._render(cache.ctx);}
                            for (i = 0; i < _displayList.length; i++) {_displayList[i].render(cache.ctx);}                        

                            cache.url = cache.canvas.toDataURL();                            
                            cache.img.onload = function() {
                                cache.ready = 60*60*5;
                                cache.caching = false;
                            };
                            cache.img.src = cache.url;
                        }
                    }
                }
                
                // Si el tamaño del objeto no es válido, realizamos la medición
                this.measure();

                // Restauramos el estado anterior del contexto
                ctx.restore();                
            }
        };
        
        /**
         * Invalida el estado del ratón sobre el contenedor.
         * @param mouseData Objecto con el estado del ratón
         *                x La coordenada x del ratón
         *                y La coordenada y del ratón
         *             down El estado de mouseDown del ratón
         */
        this.invalidateMouseStatus = function(mouseData) 
        {
            var i;
            
            for(i in _displayList)
            {
                _displayList[i].invalidateMouseStatus(mouseData);
            }
            
            DisplayObjectContainer.prototype.invalidateMouseStatus.apply(this, [mouseData]); 
        };        

        /**
         * Actualiza el estado del ratón sobre el contenedor para unas coordenadas
         * (x,y) y un valor de mouseDown.
         * @param mouseData Objecto con el estado del ratón
         *                x La coordenada x del ratón
         *                y La coordenada y del ratón
         *             down El estado de mouseDown del ratón
         * @returns Un boolean indicando si el ratón se encuentra sobre el contenedor
         */
        this.calculateMouseStatus = function(mouseData)
        {
            var hitResult = false,
                hitContext = mouseData.hitContext,
                i = _displayList.length;

            if(this.visible) {
                
                // Guardamos el estado actual del contexto de colisiones
                hitContext.save();

                // Aplicamos la transformación del contenedor al contexto de colisiones
                if(this.className!="psd.fenix.Stage"){this._prepareContext(hitContext);}

                // Recorremos los elementos del contenedor de mayor a menor profundidad
                // actualizando el estado del ratón sobre cada uno. Si se detecta un hit,
                // dejamos de seguir preguntando
                while(i>0)
                {
                    i--;
                    hitResult = _displayList[i].calculateMouseStatus(mouseData);
                    if(hitResult) {break;}
                }

                // Si i>0 significa que hemos detectado un hit sobre uno de los hijos
                // del contenedor, por lo que invalidamos el estado del ratón sobre todos
                // los elementos por debajo
                if(i>0)
                {
                    while(i>0)
                    {
                        i--;
                        _displayList[i].invalidateMouseStatus(mouseData);
                    }
                }

                // Restauramos el estado anterior del contexto de colisiones
                // TODO Revisar el efecto de esta linea sobre el siguiente calculateMouseStatus. Éste
                // se ejecuta si ningún hijo del contenedor ha devuelto colisión y si el contenedor
                // tiene definido un método propio de renderizado. Hay que comprobar que el funcionamiento
                // es el correcto o modificar el orden de las transformaciones en caso contrario.
                hitContext.restore();

                // Si no hemos detectado un hit, ejecutamos el test de colisión sobre el 
                // propio contenedor
                if(!hitResult) {hitResult = DisplayObjectContainer.prototype.calculateMouseStatus.apply(this,[mouseData]);}

                // Actualizamos el estado del ratón en función del valor de testHit y mouseDown
                this.updateMouseStatus(hitResult, mouseData, true);
            }
            
            return hitResult;
        };
        
        /**
         * Actualiza el estado del ratón sobre el contenedor para unas coordenadas
         * (x,y) y un valor de mouseDown.
         * @param mouseData Objecto con el estado del ratón
         *                x La coordenada x del ratón
         *                y La coordenada y del ratón
         *             down El estado de mouseDown del ratón
         * @returns Un boolean indicando si el ratón se encuentra sobre el contenedor
         */
        this.calculateMouseDownStatus = function(mouseData)
        {
            var hitResult = false,
                hitContext = mouseData.hitContext,            
                i = _displayList.length;
             
            if(this.visible) {
                
                // Guardamos el estado actual del contexto de colisiones
                hitContext.save();

                // Aplicamos la transformación del contenedor al contexto de colisiones
                if(this.className!="psd.fenix.Stage"){this._prepareContext(hitContext);}                

                // Recorremos los elementos del contenedor de mayor a menor profundidad
                // actualizando el estado del ratón sobre cada uno. Si se detecta un hit,
                // dejamos de seguir preguntando
                while(i>0)
                {
                    i--;
                    hitResult = _displayList[i].calculateMouseDownStatus(mouseData);
                    if(hitResult) {break;}
                }

                // Restauramos el estado anterior del contexto de colisiones
                // TODO Revisar el efecto de esta linea sobre el siguiente calculateMouseStatus. Éste
                // se ejecuta si ningún hijo del contenedor ha devuelto colisión y si el contenedor
                // tiene definido un método propio de renderizado. Hay que comprobar que el funcionamiento
                // es el correcto o modificar el orden de las transformaciones en caso contrario.
                hitContext.restore();            

                // Si no hemos detectado un hit, ejecutamos el test de colisión sobre el 
                // propio contenedor
                if(!hitResult) {hitResult = DisplayObjectContainer.prototype.calculateMouseDownStatus.apply(this,[mouseData]);}

                // Actualizamos el estado del ratón en función del valor de testHit y mouseDown
                this.updateMouseDownStatus(hitResult, mouseData);
            }
            
            return hitResult;
        };
    }
    
    // Incluimos la declaracion de la clase en el namespace psd.fenix
    namespace.DisplayObjectContainer = DisplayObjectContainer;

})(psd.fenix);(function(namespace) {

    // Inheritance class
    Movieclip.prototype = new psd.fenix.DisplayObject();

    /**
     * Movieclip es una clase que simula el funcionamiento del movieclip
     * tradicional de flash.
     * @constructor
     * @param texture
     * @param frames 
     */
    function Movieclip(texture, frames)
    {
        // Super
        psd.fenix.DisplayObject.call(this);
        
        /**
         * className psd.fenix.Movieclip
         */
        this.className = "psd.fenix.Movieclip";
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

        // Frame actual del movieclip
        var _currentFrame = 0;
        
        // Indica si el movieclip se está reproduciendo o está detenido
        var _isPlaying = true;

        // Image con la secuencia de imágenes que componen el movieclip
        var _texture = texture;
        
        // Información sobre los distintos frames del movieclip y su ubicación
        // sobre la imagen de textura
        var _frames = frames;
        this.invalidateSize(_frames[0].frame.w,_frames[0].frame.h);        
        
        // Renderiza el movieclip en función de las propiedades definidas
        // @param ctx Contexto sobre el que se debe realizar el renderizado
        // @param testRender Indica si el renderizado es para un hitTest
        this._render = function(ctx, testRender) 
        {
            // Obtenemos la información sobre la imagen correspondiente al frame actual.
            // Hay que tener en cuenta que los frames pueden estar rotados por lo que el
            // cálculo de la región a extraer debe considerar este factor
            var _currentTexture = _frames[_currentFrame],
                _currentTextureFrame = _currentTexture.frame,
                _currentTextureRotation = _currentTexture.rotated,
                _currentTextureWidth = _currentTextureRotation?_currentTextureFrame.h:_currentTextureFrame.w,
                _currentTextureHeight = _currentTextureRotation?_currentTextureFrame.w:_currentTextureFrame.h,
                _internalWidth = _currentTextureRotation?this.height():this.width(),
                _internalHeight = _currentTextureRotation?this.width():this.height();

            // Si la textura actual está rotada, aplicamos la transforamción necesaria al contexto
            // para que la imagen quede situada correctamente
            if(_currentTextureRotation) 
            { 
                ctx.translate(0,_internalHeight/2);
                ctx.rotate(-Math.PI/2);
            }

            // Extraemos del atlas de texturas la región correspondiente al frame actual
            ctx.drawImage(_texture, 
                            _currentTextureFrame.x, _currentTextureFrame.y, 
                            _currentTextureWidth, _currentTextureHeight, 
                            0, 0, 
                            _currentTextureWidth, _currentTextureHeight);

            // Si el movieclip está en reproducción y el render no se ha ejecutado
            // en modo testHit, avanzamos la cabeza lectora
            if(_isPlaying && !testRender)
            {
                _currentFrame++;
                if(_currentFrame>=_frames.length) {_currentFrame = 0;}
            }
        };
        
        // Utilidad que devuelve el frame asociado a una etiqueta en particular
        // @param String que identifica el frame buscado
        // @returns El número de frame cuya etiqueta coincide con el parámetro de 
        //          entrada, o el frame actual en caso de que no se encuentre otro.
        var _getFrameByLabel = function(label)
        {
            var frame = _currentFrame, i;
            
            for(i in _frames)
            {
                if(_frames[i].label == label) { frame = i; break; }
            }
            
            return frame;
        };
        
        //
        var _getFrameSize = function(frame) {
            var frameSize = {width:0, height:0},
                texture = _frames[frame],
                textureFrame = texture.frame,
                textureRotation = texture.rotated;
                
            frameSize.width = textureRotation?textureFrame.h:textureFrame.w;
            frameSize.height = textureRotation?textureFrame.w:textureFrame.h;
                
            return frameSize;
        };

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//        
        
        /**
         * Sitúa el movieclip en un frame y para su reproducción
         * @param frame El frame en el que se sitúa el movieclip
         */
        this.gotoAndStop = function(frame)
        {
            var frameSize;
            
            this.stop();
          
            if(typeof(frame)=="number") { _currentFrame = frame; }
            else if(typeof(frame)=="string") { _currentFrame = _getFrameByLabel(frame); }
            
            frameSize = _getFrameSize.apply(this,[_currentFrame]);
            this.invalidateSize(frameSize.width, frameSize.height);
        };
        
        /**
         * Sitúa el movieclip en un frame y continúa su reproducción
         * @param frame El frame en el que se sitúa el movieclip
         */
        this.gotoAndPlay = function(frame) 
        { 
            if(typeof(frame)=="number") { _currentFrame = frame; }
            else if(typeof(frame)=="string") { _currentFrame = _getFrameByLabel(frame); }
            
            this.play();
        };
        
        /**
         * Reinicia la reproducción del movieclip
         */
        this.play = function() { _isPlaying = true; };
        
        /**
         * Detiene la reproducción del movieclip
         */
        this.stop = function() { _isPlaying = false; };
        
        /**
         * El frame actual del mc
         */
        this.currentFrame = function() { return _currentFrame; }
        
        /**
         * 
         */
        this.currentLabel = function() { return _frames[_currentFrame].label; }
    }

    namespace.Movieclip = Movieclip;

})(psd.fenix);(function(namespace) {

    // Inheritance class
    Video.prototype = new psd.fenix.DisplayObject();

    /**
     * Video es una clase genérica para incluir un elemento de <video> en fenix
     * @constructor
     */
    function Video(videoElement)
    {
        // Super
        psd.fenix.DisplayObject.call(this);
        
        /**
         * className psd.fenix.display.Video
         */
        this.className = "psd.fenix.display.Video";
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//    

        //
        var _videoElement = videoElement;
        
        // Indica si el video debe renderizarse sobre el canvas. Por defecto se desactiva
        // si el parámetro de entrada es un tag de video
        var _canvasRendering = false;
        
        // Referencia al tag <video> controlado.
        var _video = _videoElement.mediaTag();
        
        // Renderizado del objeto de video
        this._render = function(ctx) 
        {
            if(_canvasRendering && _video!=null) { ctx.drawImage(_video,0,0,this.width(),this.height()); }
        };
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        
        /**
         * Sobreescribimos testHit para evitar problemas de seguridad al intentar
         * acceder a las imagenes del video a través de diferentes dominios. En cambio,
         * ejecutamos una detección basada enteramente en limites
         * @param x Posicion x de deteccion
         * @param y Posicion y de deteccion
         */
        this.testHit = function(x,y)
        {
            return (x >= this.x && x <= this.x + this.width() &&
                    y >= this.y && y <= this.y + this.height());
        };
    }

    namespace.Video = Video;

})(psd.fenix.display);(function(namespace) {

    // Inheritance class
    Clip.prototype = new psd.fenix.DisplayObject();

    // Construct
    function Clip(imageURL) 
    {
        // Super
        psd.fenix.DisplayObject.call(this);
        
        /**
         * className psd.fenix.Clip
         */
        this.className = "psd.fenix.Clip";
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        
        /**
         * Viewport de visualización del clip
         */
        this.viewPort = null;

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        
        // Url fuente de la imagen cargada en el Clip
        var _imageURL = imageURL;
        
        // Flag indicando si la carga de la imagen se ha completado
        var _imageReady = false;
        
        // Elemento imagen utilizado para el renderizado sobre canvas. Incluye una
        // función anónima en _image.onload que actualiza las dimensiones del
        // displayObject y actualiza el valor del flag _imageReady
        var _image = new Image();
            _image.onload = (function (displayObject) 
                {
                    return function()
                    {
                        _imageReady = true;
                        displayObject.invalidateSize(_image.width, _image.height);
                    }
                    
                })(this);
        
        // Renderiza el clip en función de las propiedades definidas
        // @param ctx Contexto sobre el que se debe realizar el renderizado
        // @param testRender Indica si el renderizado es para un hitTest
        this._render = function(ctx, testRender) 
        {
            if( _imageReady == true)
            {
                
                // Si no se ha definido un viewport sobre el Clip, se toma como origen
                // la imagen al completo.
                if(this.viewPort==null)
                {
                    // Si no se han seteado ancho y alto, la imagen se muestra tal cual
                    if(this.width() == 0 && this.height() == 0) { ctx.drawImage(_image, 0, 0); }
                    else{ ctx.drawImage(_image, 0, 0, this.width(), this.height()); }
                    
                } else {
                    
                    // En caso de contar con un viewport
                    ctx.drawImage(_image,
                                this.viewPort.x, this.viewPort.y,
                                this.viewPort.width, this.viewPort.height,
                                this.x, this.y,
                                this.width(), this.height());
                }
            }
        };

        // Iniciamos la carga de la imagen inicializando su valor src
        _image.src = _imageURL;
    }

    namespace.Clip = Clip;

})(psd.fenix);(function(namespace) {
    
    // Inheritance class
    MediaElement.prototype = new psd.framework.EventDispatcher();
    
    // Contenido multimedia de tipo video
    MediaElement.TYPE_VIDEO = "video";
    
    // Contenido multimedia de tipo audio
    MediaElement.TYPE_AUDIO = "audio";
    
    /**
     * MediaElement sirve de puente entre fenix y los tags nativos multimedia
     * <video> y <audio> de la especificación HTML5
     * @param mediaType El tipo de contenido (video o audio)
     * @param mediaData El tag o array de urls del contenido
     * @param settings Parámetros de configuración adicionales (poster, autoplay, controls...)
     * @constructor 
     */
    function MediaElement(mediaType, mediaData, settings)
    {
        // Super
        psd.framework.EventDispatcher.call(this);
        
        /**
         * className psd.fenix.media.MediaElement
         */
        this.className = "psd.fenix.media.MediaElement";
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//    
        
        // Parámetro de entrada. Los parámetros de entrada permitidos son:
        //   - [object HTMLVideoElement] Si se recibe directamente el tag de video
        //   - [object HTMLAudioElement] Si se recibe directamente el tag de audio
        //   - [object Array] Si se recibe un array de urls
        var _inputParam = mediaData;
        
        // Tipo de contenido multimedia. Puede ser "audio" o "video"
        var _mediaType = mediaType;
        
        // Parámetros de configuración adicionales
        var _settings = settings;
        
        // Referencia al tag multimedia 
        var _media = null;
        
        // Array de urls que debe reproducir el elemento multimedia
        var _urls = null;

        // Contenedor interno para fenix
        var _parent = null;

        // Script to be run on abort
        var _deferredOnAbort = (function(controller) { return function(event){ _onAbort.apply(controller,[event]); } })(this);
        var _onAbort = function(event) 
        {
            this.dispatchEvent(new psd.fenix.event.MediaEvent(psd.fenix.event.MediaEvent.ABORT));            
        };
        
        // Script to be run when a file is ready to start playing (when it has buffered enough to begin)
        var _deferredOnCanPlay = (function(controller) { return function(event){ _onCanPlay.apply(controller,[event]); } })(this);
        var _onCanPlay = function(event) 
        {
            this.dispatchEvent(new psd.fenix.event.MediaEvent(psd.fenix.event.MediaEvent.CAN_PLAY));            
        };
        
        // Script to be run when a file can be played all the way to the end without pausing for buffering
        var _deferredOnCanPlayThrough = (function(controller) { return function(event){ _onCanPlayThrough.apply(controller,[event]); } })(this);
        var _onCanPlayThrough = function(event) 
        {
            this.dispatchEvent(new psd.fenix.event.MediaEvent(psd.fenix.event.MediaEvent.CAN_PLAY_THROUGH));            
        };
        
        // Script to be run when the length of the media changes
        var _deferredOnDurationChange = (function(controller) { return function(event){ _onDurationChange.apply(controller,[event]); } })(this);
        var _onDurationChange = function(event) 
        {
            this.dispatchEvent(new psd.fenix.event.MediaEvent(psd.fenix.event.MediaEvent.DURATION_CHANGE));            
        };
        
        // Script to be run when something bad happens and the file is suddenly unavailable (like unexpectedly disconnects)
        var _deferredOnEmptied = (function(controller) { return function(event){ _onEmptied.apply(controller,[event]); } })(this);
        var _onEmptied = function(event) 
        {
            this.dispatchEvent(new psd.fenix.event.MediaEvent(psd.fenix.event.MediaEvent.EMPTIED));            
        };
        
        // Script to be run when the media has reach the end (a useful event for messages like "thanks for listening")
        var _deferredOnEnded = (function(controller) { return function(event){ _onEnded.apply(controller,[event]); } })(this);
        var _onEnded = function(event) 
        {
            this.dispatchEvent(new psd.fenix.event.MediaEvent(psd.fenix.event.MediaEvent.ENDED));            
            _media.load();
        };
        
        // Script to be run when an error occurs when the file is being loaded
        var _deferredOnError = (function(controller) { return function(event){ _onError.apply(controller,[event]); } })(this);
        var _onError = function(event) 
        {
            this.dispatchEvent(new psd.fenix.event.MediaEvent(psd.fenix.event.MediaEvent.ERROR));            
        };
        
        // Script to be run when media data is loaded
        var _deferredOnLoadedData = (function(controller) { return function(event){ _onLoadedData.apply(controller,[event]); } })(this);
        var _onLoadedData = function(event) 
        {
            this.dispatchEvent(new psd.fenix.event.MediaEvent(psd.fenix.event.MediaEvent.LOADED_DATA));            
        };
        
        // Script to be run when meta data (like dimensions and duration) are loaded
        var _deferredOnLoadedMetaData = (function(controller) { return function(event){ _onLoadedMetaData.apply(controller,[event]); } })(this);
        var _onLoadedMetaData = function(event) 
        {
            this.dispatchEvent(new psd.fenix.event.MediaEvent(psd.fenix.event.MediaEvent.LOADED_METADATA));            
        };
        
        // Script to be run just as the file begins to load before anything is actually loaded
        var _deferredOnLoadStart = (function(controller) { return function(event){ _onLoadStart.apply(controller,[event]); } })(this);
        var _onLoadStart = function(event) 
        {
            this.dispatchEvent(new psd.fenix.event.MediaEvent(psd.fenix.event.MediaEvent.LOAD_START));            
        };
        
        // Script to be run when the media is paused either by the user or programmatically
        var _deferredOnPause = (function(controller) { return function(event){ _onPause.apply(controller,[event]); } })(this);
        var _onPause = function(event) 
        {
            this.dispatchEvent(new psd.fenix.event.MediaEvent(psd.fenix.event.MediaEvent.PAUSE));            
        };
        
        // Script to be run when the media is ready to start playing
        var _deferredOnPlay = (function(controller) { return function(event){ _onPlay.apply(controller,[event]); } })(this);
        var _onPlay = function(event) 
        {
            this.dispatchEvent(new psd.fenix.event.MediaEvent(psd.fenix.event.MediaEvent.PLAY));            
        };
        
        // Script to be run when the media actually has started playing
        var _deferredOnPlaying = (function(controller) { return function(event){ _onPlaying.apply(controller,[event]); } })(this);
        var _onPlaying = function(event) 
        {
            this.dispatchEvent(new psd.fenix.event.MediaEvent(psd.fenix.event.MediaEvent.PLAYING));            
        };
        
        // Script to be run when the browser is in the process of getting the media data
        var _deferredOnProgress = (function(controller) { return function(event){ _onProgress.apply(controller,[event]); } })(this);
        var _onProgress = function(event) 
        {
            this.dispatchEvent(new psd.fenix.event.MediaEvent(psd.fenix.event.MediaEvent.PROGRESS));            
        };
        
        // Script to be run each time the playback rate changes (like when a user switches to a slow motion or fast forward mode)
        var _deferredOnRateChange = (function(controller) { return function(event){ _onRateChange.apply(controller,[event]); } })(this);
        var _onRateChange = function(event) 
        {
            this.dispatchEvent(new psd.fenix.event.MediaEvent(psd.fenix.event.MediaEvent.RATE_CHANGE));            
        };
        
        // Script to be run each time the ready state changes (the ready state tracks the state of the media data)
        var _deferredOnReadyStateChange = (function(controller) { return function(event){ _onReadyStateChange.apply(controller,[event]); } })(this);
        var _onReadyStateChange = function(event) 
        {
            this.dispatchEvent(new psd.fenix.event.MediaEvent(psd.fenix.event.MediaEvent.READY_STATE_CHANGE));            
        };
        
        // Script to be run when the seeking attribute is set to false indicating that seeking has ended
        var _deferredOnSeeked = (function(controller) { return function(event){ _onSeeked.apply(controller,[event]); } })(this);
        var _onSeeked = function(event) 
        {
            this.dispatchEvent(new psd.fenix.event.MediaEvent(psd.fenix.event.MediaEvent.SEEKED));            
        };
        
        // Script to be run when the seeking attribute is set to true indicating that seeking is active
        var _deferredOnSeeking = (function(controller) { return function(event){ _onSeeking.apply(controller,[event]); } })(this);
        var _onSeeking = function(event) 
        {
            this.dispatchEvent(new psd.fenix.event.MediaEvent(psd.fenix.event.MediaEvent.SEEKING));            
        };
        
        // Script to be run when the browser is unable to fetch the media data for whatever reason
        var _deferredOnStalled = (function(controller) { return function(event){ _onStalled.apply(controller,[event]); } })(this);
        var _onStalled = function(event) 
        {
            this.dispatchEvent(new psd.fenix.event.MediaEvent(psd.fenix.event.MediaEvent.STALLED));            
        };
        
        // Script to be run when fetching the media data is stopped before it is completely loaded for whatever reason
        var _deferredOnSuspend = (function(controller) { return function(event){ _onSuspend.apply(controller,[event]); } })(this);
        var _onSuspend = function(event) 
        {
            this.dispatchEvent(new psd.fenix.event.MediaEvent(psd.fenix.event.MediaEvent.SUSPEND));            
        };
        
        // Script to be run when the playing position has changed (like when the user fast forwards to a different point in the media)
        var _deferredOnTimeUpdate = (function(controller) { return function(event){ _onTimeUpdate.apply(controller,[event]); } })(this);
        var _onTimeUpdate = function(event) 
        {
            this.dispatchEvent(new psd.fenix.event.MediaEvent(psd.fenix.event.MediaEvent.TIME_UPDATE,_media.currentTime));
        };
        
        // Script to be run each time the volume is changed which (includes setting the volume to "mute")
        var _deferredOnVolumeChange = (function(controller) { return function(event){ _onVolumeChange.apply(controller,[event]); } })(this);
        var _onVolumeChange = function(event) 
        {
            this.dispatchEvent(new psd.fenix.event.MediaEvent(psd.fenix.event.MediaEvent.VOLUME_CHANGE));            
        };
        
        // Script to be run when the media has paused but is expected to resume (like when the media pauses to buffer more data)
        var _deferredOnWaiting = (function(controller) { return function(event){ _onWaiting.apply(controller,[event]); } })(this);
        var _onWaiting = function(event) 
        {
            this.dispatchEvent(new psd.fenix.event.MediaEvent(psd.fenix.event.MediaEvent.WAITING));            
        };
        
        // Inicializa el componente
        var _init = function()
        {
            var _videoParamType = "[object HTMLVideoElement]",
                _audioParamType = "[object HTMLAudioElement]",
                _arrayParamType = "[object Array]",
                _inputParamType = Object.prototype.toString.apply(_inputParam),
                i, param;
                
            _media = (_inputParamType == _videoParamType || _inputParamType == _audioParamType) ? _inputParam : null;
            _urls = _inputParamType == _arrayParamType ? _inputParam : [_inputParam];
            
            if(_media == null && (_mediaType == MediaElement.TYPE_VIDEO || _mediaType == MediaElement.TYPE_AUDIO))
            {
				_media = document.createElement(_mediaType);
				
				_media.setAttribute("style","position:absolute;")

                //NOTA: Creamos una capa exclusivamente para el backgroun_black, ya que al ponerlo en la etiqueta video da problemas en el ios7
                if (_mediaType == "video")
                {
                    _parent = document.createElement("div");
                    _parent.setAttribute("style", "position:absolute; background:black; width:" + _settings["width"] + "; height:" + _settings["height"]);
                }
                
				_media.setAttribute("width", _settings["width"]); 
				_media.setAttribute("height", _settings["height"]); 


                for(i in _urls)
                {
                    var sourceElement = document.createElement("source");
                    sourceElement.setAttribute("src", _urls[i].src);
                    _media.appendChild(sourceElement);
                }
                
                // Soporte para opciones de configuración adicionales
                if(typeof(_settings)!="undefined" && _settings!=null)
                {
                    // autoplay
                    param = _settings["autoplay"];
                    if(typeof(param)!="undefined" && (param=="true" || param==true)) { _media.setAttribute("autoplay", "autoplay"); }
                    
                    // poster
                    param = _settings["poster"];
                    if(typeof(param)!="undefined" && param!="") { _media.setAttribute("poster", param); }
                }
                
                _addMediaEventListener(psd.fenix.event.MediaEvent.ABORT, _deferredOnAbort);
                _addMediaEventListener(psd.fenix.event.MediaEvent.CAN_PLAY, _deferredOnCanPlay);
                _addMediaEventListener(psd.fenix.event.MediaEvent.CAN_PLAY_THROUGH, _deferredOnCanPlayThrough);
                _addMediaEventListener(psd.fenix.event.MediaEvent.DURATION_CHANGE, _deferredOnDurationChange);
                _addMediaEventListener(psd.fenix.event.MediaEvent.EMPTIED, _deferredOnEmptied);
                _addMediaEventListener(psd.fenix.event.MediaEvent.ENDED, _deferredOnEnded);
                _addMediaEventListener(psd.fenix.event.MediaEvent.ERROR, _deferredOnError);
                _addMediaEventListener(psd.fenix.event.MediaEvent.LOADED_DATA, _deferredOnLoadedData);
                _addMediaEventListener(psd.fenix.event.MediaEvent.LOADED_METADATA, _deferredOnLoadedMetaData);
                _addMediaEventListener(psd.fenix.event.MediaEvent.LOAD_START, _deferredOnLoadStart);
                _addMediaEventListener(psd.fenix.event.MediaEvent.PAUSE, _deferredOnPause);
                _addMediaEventListener(psd.fenix.event.MediaEvent.PLAY, _deferredOnPlay);
                _addMediaEventListener(psd.fenix.event.MediaEvent.PLAYING, _deferredOnPlaying);
                _addMediaEventListener(psd.fenix.event.MediaEvent.PROGRESS, _deferredOnProgress);
                _addMediaEventListener(psd.fenix.event.MediaEvent.RATE_CHANGE, _deferredOnRateChange);
                _addMediaEventListener(psd.fenix.event.MediaEvent.READY_STATE_CHANGE, _deferredOnReadyStateChange);
                _addMediaEventListener(psd.fenix.event.MediaEvent.SEEKED, _deferredOnSeeked);
                _addMediaEventListener(psd.fenix.event.MediaEvent.SEEKING, _deferredOnSeeking);
                _addMediaEventListener(psd.fenix.event.MediaEvent.STALLED, _deferredOnStalled);
                _addMediaEventListener(psd.fenix.event.MediaEvent.SUSPEND, _deferredOnSuspend);
                _addMediaEventListener(psd.fenix.event.MediaEvent.TIME_UPDATE, _deferredOnTimeUpdate);
                _addMediaEventListener(psd.fenix.event.MediaEvent.VOLUME_CHANGE, _deferredOnVolumeChange);
                _addMediaEventListener(psd.fenix.event.MediaEvent.WAITING, _deferredOnWaiting);                

                if (_mediaType == "video"){psd.fenix.topLevelApplication.insertBefore(_parent, psd.fenix.topLevelCanvas);}
                psd.fenix.topLevelApplication.insertBefore(_media, psd.fenix.topLevelCanvas);
            }
        };
        
        // Añade un listener a un evento de la etiqueta multimedia        
        var _addMediaEventListener = function(type, listener)
        {
            if(_media)
            {
                if(_media.addEventListener) { _media.addEventListener(type, listener, false); }
                else if(_media.attachEvent) { _media.attachEvent(type, listener); }
            }
        };
        
        // Inicializamos el MediaElement
        _init.apply(this);        
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        
        /**
         * Tiempo actual del contenido
         */
        this.currentTime = function(value) 
        { 
            var currentTime = 0;
            
            if(_media) 
            { 
                if(typeof(value)!="undefined") { _media.currentTime = value; }
                currentTime = _media.currentTime;
            }
            
            return currentTime;
        };
        
        /**
         * Duración del contenido
         */
        this.duration = function() { if(_media) { return _media.duration; } else { return 0; } }
        
        /**
         * Autoplay
         **/
        this.autoplay = function(autoplay)
        {
            if (_media)
            {
                if (autoplay == false){_media.removeAttribute("autoplay")}
                else {_media.setAttribute("autoplay", "autoplay")}
            }
        }
        
        /**
         * Pausa el contenido
         */
        this.pause = function() { if(_media){ _media.pause(); } };
        
        /**
         * Estado de reproducción del contenido
         */
        this.paused = function() { if(_media) { return _media.paused; } else { return false; } }
        
        /**
         * Reproduce el contenido
         */
        this.play = function() { if(_media){ _media.play(); } };

        /**
         * Redimensiona el elemento multimedia
         * @param x Posición x del elemento (estilo left)
         * @param y Posición y del elemento (estilo top)
         * @param w Ancho del elemento
         * @param h Alto del elemento
         */
        this.resize = function(x,y,w,h)
        {
            if(_media)
            {
                //var mediaStyle = _media.getAttribute("style");
                
                //if(x) { mediaStyle+="left:"+x+";"; }
                //if(y) { mediaStyle+="left:"+y+";"; }
                if(w) { _media.width = w; }
                if(h) { _media.height = h; }
            }
        };
        
        /**
         * Volumen del elemento multimedia
         */
        this.volume = function(value)
        {
            var volume = 0;
            
            if(_media)
            {
                if(value>=0 && value<=1) { _media.volume = value; }
                volume = _media.volume;
            }
            
            return volume;
        };
    }
    
    // Incluimos la declaracion de la clase en el namespace psd.fenix.media	
    namespace.MediaElement = MediaElement;

})(psd.fenix.media);
(function(namespace) {
    
    // Inheritance class
    MediaController.prototype = new psd.framework.EventDispatcher();
    
    /**
     * MediaController es la clase básica para la implementación de controladores
     * multimedia en fenix.
     * @constructor
     */
    function MediaController() 
    {
        // Super
        psd.framework.EventDispatcher.call(this);
        
        /**
         * className psd.fenix.media.MediaController
         */
        this.className = "psd.fenix.media.MediaController";
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        
        // Referencia al tag multimedia html5. Puede ser <video> o <audio>
        var _media = null;
        
        // Indica si la reproducción se ha iniciado
        var _started = false;

        // Evento de fin de la reproducción
        var _onMediaPlay = function(evt) 
        { 
            this.dispatchEvent(new psd.fenix.event.MediaEvent(psd.fenix.event.MediaEvent.PLAY));
        }
        
        // Evento de fin de la reproducción
        var _onMediaPause = function(evt) 
        { 
            this.dispatchEvent(new psd.fenix.event.MediaEvent(psd.fenix.event.MediaEvent.PAUSE));
        }

        // Evento de fin de la reproducción
        var _onMediaEnded = function(evt) 
        { 
            _started = false;
            
            _media.autoplay(false);
            _media.pause();
            _media.currentTime(0);
            this.dispatchEvent(evt); 
        }

        // Evento de inicio de la reproducción
        var _onMediaPlaying = function(evt) 
        { 
            if(!_started)
            {
                _started = true;
                this.dispatchEvent(new psd.fenix.event.MediaEvent(psd.fenix.event.MediaEvent.BEGIN));
            }
            this.dispatchEvent(evt); 
        };
        
        var _onMediaWaiting = function (evt)
        {
            this.dispatchEvent(evt); 
        }
        
        // Evento de progreso de la reproducción
        var _onMediaTimeUpdate = function(evt) { this.dispatchEvent(evt); };
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

        /**
         * Establece el elemento multimedia que se quiere controlar
         * @param mediaElement El elemento multimedia que se quiere manipular a 
         *                      través de de este controlador.
         */
        this.attachStream = function(mediaElement)
        {
            _media = mediaElement;
            _media.addEventListener(psd.fenix.event.MediaEvent.PLAY, _onMediaPlay, this);
            _media.addEventListener(psd.fenix.event.MediaEvent.PAUSE, _onMediaPause, this);
            _media.addEventListener(psd.fenix.event.MediaEvent.ENDED, _onMediaEnded, this);
            _media.addEventListener(psd.fenix.event.MediaEvent.PLAYING, _onMediaPlaying, this);
            _media.addEventListener(psd.fenix.event.MediaEvent.TIME_UPDATE, _onMediaTimeUpdate, this);
            _media.addEventListener(psd.fenix.event.MediaEvent.WAITING, _onMediaWaiting, this);
        };
        
        /**
         * Posición actual de reproducción del contenido en segundos
         */
        this.currentTime = function() { if(_media) { return _media.currentTime(); } else {return 0;} }
        
        /**
         * Posición actual de reproducción en formato de tiempo
         * @param format Formato de tiempo. Acepta las siguiente opciones:
         *                  hh Horas
         *                  mm Minutos
         *                  ss Segundos
         */
        this.currentTimeAsTimeCode = function(format) {return this.secondsAsTimeCode(this.currentTime(), format);}
        
        /**
         * Duración del contenido en segundos
         */
        this.duration = function() { if(_media) { return _media.duration(); } else {return 0;} }
        
        /**
         * Duración del contenido en formato de tiempo
         * @param format Formato de tiempo. Acepta las siguiente opciones:
         *                  hh Horas
         *                  mm Minutos
         *                  ss Segundos
         */
        this.durationAsTimeCode = function(format) {return this.secondsAsTimeCode(this.duration(), format);}
        
        /**
         * Reproduce el contenido
         */
        this.play = function() { if(_media) { _media.play(); } };
        
        /**
         * Pausa la reproducción del contenido
         */
        this.pause = function() { if(_media) { _media.pause(); } };
        
        /**
         * Estado re reproducción del contenido
         */
        this.paused = function() { if(_media) { return _media.paused(); } else { return false; } };
        
        /**
         * Utilidad para convertir segundos en formato de tiempo
         * @param time Segundos que se quieren convertir
         * @param format Formato de tiempo. Acepta las siguiente opciones:
         *                  hh Horas
         *                  mm Minutos
         *                  ss Segundos
         */
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
               timecode = format.replace('hh', hours);
               timecode = timecode.replace('mm', minutes);
               timecode = timecode.replace('ss', seconds);
           }
           
           return timecode;
        };
        
        /**
         * Ejecuta una petición de seek sobre el contenido
         * @param value Posición a la que se quiere hacer seek. Valores en el rango
         *              (0..1) se consideran como porcentajes sobre el total de la
         *              duración del contenido, y en el rango [1..INF) como segundos 
         *              de manera absoluta desde el principio del contenido
         */
        this.seek = function(value)
        {
            if(value>0 && value<1) {value = value * _media.duration();}
            
            _media.currentTime(value);
        };
        
        /**
         * Volumen del elemento multimedia
         */
        this.volume = function(value) { if(_media) { return _media.volume(value); } else { return 0; }};
    }

    // Incluimos la declaracion de la clase en el namespace psd.fenix.media
    namespace.MediaController = MediaController;

})(psd.fenix.media);(function(namespace) {

    /**
     * La clase TextFormat representa la opciones de formato que se debe aplicar
     * sobre el contenido de un campo de texto
     * @constructor
     */
    function TextFormat() 
    {
        /**
         * className psd.fenix.text.TextFormat
         */
        this.className = "psd.fenix.text.TextFormat";
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        
        /**
         * Especifica si el texto se renderiza en negrita
         */
        this.bold = false;
        
        /**
         * El color del texto
         */
        this.color = 0x000000;
        
        /**
         * La fuente del texto
         */
        this.font = "Verdana, Geneva, sans-serif";
        
        /**
         * Especifica si el texto se renderiza en cursiva
         */
        this.italic = false;
        
        /**
         * El tamaño del texto en pixels
         */
        this.size = 16;
        
        /**
         * Devuelve una representación de las propiedades de formato apropiada
         * para el renderizado sobre canvas
         * @returns La representación del formato para su aplicación sobre un
         *          context2d de un elemento canvas.
         */
        this.toCanvasString = function()
        {
            var canvasString = "";
            
            if(this.bold) {canvasString += "bold ";}
            if(this.italic) {canvasString += "italic ";}
            
            canvasString += this.size + "px ";
            canvasString += this.font + " ";
            
            return canvasString;
        };
        
        /**
         * Devuelve una representación de las propiedades de formato apropiada
         * para el renderizado sobre html con css
         * @returns La representación del formato para su aplicación sobre un
         *          contenedor html como estilo de css.
         */
        this.toCSSString = function()
        {
            var colorString = this.color.toString(16);
            if(colorString.indexOf("0x")==0) { colorString = colorString.substr(2); }
                
            var cssString = "";
            
            cssString+="font-family:"+this.font+";";
            cssString+="font-size:"+this.size+"px;";
            cssString+="font-style:"+(this.italic?"italic;":"normal;");
            cssString+="font-weight:"+(this.bold?"bold;":"normal;");
            cssString+="color:#"+colorString+";";
            
            return cssString;
        };
    }

    // Incluimos la declaracion de la clase en el namespace psd.fenix.text	
    namespace.TextFormat = TextFormat;
	
})(psd.fenix.text);(function(namespace) {
    
    //
    namespace.TextFieldAutoSize = {};
    
    /**
     * 
     */
    namespace.TextFieldAutoSize.CENTER = "center";
    
    /**
     * 
     */
    namespace.TextFieldAutoSize.LEFT = "left";
    
    /**
     * 
     */
    namespace.TextFieldAutoSize.NONE = "none";
        
    /**
     * 
     */
    namespace.TextFieldAutoSize.RIGHT = "right";

})(psd.fenix.text);(function(namespace) {

    // Inheritance class
    TextField.prototype = new psd.fenix.DisplayObject();

    /**
     * La clase TextField es un componente que sirve para mostrar texto dentro
     * de una aplicación fenix
     * @constructor
     */
    function TextField() 
    {
        // Super
        psd.fenix.DisplayObject.call(this);
	
        /**
         * className psd.fenix.text.TextField
         */
        this.className = "psd.fenix.text.TextField";
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        
        // 
        var _textCache;
        
        // 
        var _textCacheDataTemplate = "<svg xmlns='http://www.w3.org/2000/svg' width='{WIDTH}px' height='{HEIGHT}px'>" +
                                        "<foreignObject width='100%' height='100%'>" +
                                            "<div xmlns='http://www.w3.org/1999/xhtml'>" +
                                                "<span style='{STYLE}'>{TEXT}</span>" +
                                            "</div>" +
                                        "</foreignObject>" +
                                    "</svg>";
        
        // El formato de texto 
        var _textFormat = new psd.fenix.text.TextFormat();
        
        // Renderiza el textfield en función de las propiedades definidas
        // @param ctx Contexto sobre el que se debe realizar el renderizado
        this._render = function(ctx) 
        {
            var offsetX = 0;
            
            if(_autoSize == psd.fenix.text.TextFieldAutoSize.CENTER) {offsetX=-this.width()/2;}
            if(_autoSize == psd.fenix.text.TextFieldAutoSize.RIGHT) {offsetX=-this.width();}            
            
            // Pintamos el borde y fondo del textfield
            ctx.beginPath();                    
            ctx.rect(offsetX, 0, this.width(), this.height());
            ctx.lineWidth = 1;
            ctx.strokeStyle = psd.fenix.ColorUtil.colorToRGB(_borderColor, 1);
            ctx.fillStyle = psd.fenix.ColorUtil.colorToRGB(_backgroundColor, 1);
            
            // Pintamos el fondo si _background es true
            if(_background) {ctx.fill();}
            
            // Pintamos el borde sólo si _border es true
            if(_border) {ctx.stroke();}
            
            //ctx.clip();
            //ctx.closePath();
            
            // Restringimos el pintado a la zona delimitada por ancho y alto externos
            ctx.beginPath();
            ctx.rect(offsetX, 0, this.width() + 35, this.height());
            ctx.clip();
            ctx.closePath();
            
            // Pintamos el texto
            
            if(!_multiline) {
                ctx.textAlign = _autoSize;
                ctx.textBaseline = "top";
                ctx.font = _textFormat.toCanvasString();            
                ctx.fillStyle = psd.fenix.ColorUtil.colorToRGB(_textFormat.color, 1);

                ctx.fillText(_text, 0, 0);
                
            } else {
                if( _textCache.svg == null || _textCache.img == null ) {
                    
                    _textCache.img = new Image();
                    _textCache.data = _textCacheDataTemplate.replace("{TEXT}", _text)
                                                            .replace("{WIDTH}", this.width())
                                                            .replace("{HEIGHT}", this.height())
                                                            .replace("{STYLE}", _textFormat.toCSSString());
                                                            
                    _textCache.svg = new Blob([_textCache.data], {type: "image/svg+xml;charset=utf-8"});
                    _textCache.url = _textCache.DOMURL.createObjectURL(_textCache.svg);
                    
                    _textCache.img.onload = function() {
                        _textCache.DOMURL.revokeObjectURL(_textCache.url);
                        _textCache.ready = true;
                    };
                    _textCache.img.src = _textCache.url;
                    
                } else if(_textCache.ready) {
                    ctx.drawImage(_textCache.img, 0, 0);
                }
            }
        };
        
        // Realiza el cálculo del tamaño del texto. Crea un elemento <span> dentro del
        // body de la página, establece el estilo de fuente de acuerdo a las propiedades
        // de la variable _textFormat y obtiene las medidas del texto a partir del html
        var _measureText = function()
        {
            var body = document.getElementsByTagName("body")[0],
                span = document.createElement("span"),
                text = document.createTextNode(_text),
                style = _textFormat.toCSSString();
            
            span.appendChild(text);
            span.setAttribute("style", style);
            
            if(_multiline) {
                span.setAttribute("style", style + "display:block;width:"+this.width()+"px;");
            }            
            
            body.appendChild(span);
            
            if(_autoSize!=psd.fenix.text.TextFieldAutoSize.NONE) {
                if(!_multiline) {
                    this.invalidateSize(span.offsetWidth,span.offsetHeight);
                }else{
                    this.invalidateSize(this.width(), span.offsetHeight);
                }
            }
            
            body.removeChild(span);
        };
        
        //
        var _resetTextCache = function() {
            _textCache = {svg:null,
                          data:null,
                          url:null,
                          img:null,
                          ready:false,
                          DOMURL:self.URL || self.webkitURL || self};
        };

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        
        /**
         * Controla el redimensionado y alineación automática del campo de texto.
         */
        var _autoSize = psd.fenix.text.TextFieldAutoSize.LEFT;
        this.autoSize = function(value)
        {
            if(value == psd.fenix.text.TextFieldAutoSize.NONE ||
                value == psd.fenix.text.TextFieldAutoSize.LEFT ||
                value == psd.fenix.text.TextFieldAutoSize.RIGHT ||
                value == psd.fenix.text.TextFieldAutoSize.CENTER)
            {
                _autoSize = value;
            }
            
            return _autoSize;
        };
        
        /**
         * Especifica si el campo de texto tiene un relleno de fondo
         */
        var _background = false;
        this.background = function(value)
        {
            if(value==true || value==false) {_background = value;}
            return _background;
        };
        
        /**
         * El color del relleno de fondo del campo de texto
         */
        var _backgroundColor = 0xffffff;
        this.backgroundColor = function(value)
        {
            // confirmar que se trata de un color válido
            if(value!=undefined && value!=null) {_backgroundColor = value;}
            return _backgroundColor;
        };
        
        /**
         * Especifica si el campo de texto tiene un borde
         */
        var _border = false;
        this.border = function(value)
        {
            if(value==true || value==false) {_border = value;}
            return _border;
        };
        
        /**
         * El color del borde del campo de texto
         */
        var _borderColor = 0x000000;
        this.borderColor = function(value)
        {
            // confirmar que se trata de un color válido
            if(value!=undefined && value!=null) {_borderColor = value;}
            return _borderColor;
        };
        
        /**
         * Devuelve una copia del objeto de formato que se aplica al contenido
         * del campo de texto
         * @returns Un objeto con las propiedades de formato del texto
         */
        this.getTextFormat = function() 
        {   
            var i, format = {};
            
            for(i in _textFormat) {format[i] = _textFormat[i];}
            
            return format;
        };
        
        /**
         *
         */
        var _multiline = false;
        this.multiline = function(value)
        {
            if(value!=undefined && value!=null) {_multiline = value;}
            return _multiline;
        };
        
        /**
         * Aplica nuevas propiedades de formato al contenido del campo de texto
         * @param textFormat Un objeto de tipo TextFormat que contiene las nuevas
         *                   opciones de formato
         */
        this.setTextFormat = function(textFormat)
        {
            if(typeof(textFormat.className)!="undefined" && textFormat.className=="psd.fenix.text.TextFormat")
            {
                _textFormat = textFormat;
                if(_autoSize!=psd.fenix.text.TextFieldAutoSize.NONE) {_measureText.apply(this);}                
            }
        };
        
        /**
         * Contenido actual del campo de texto
         */
        var _text = "";
        this.text = function(value)
        {
            if(value!=undefined && value!=null) {_text = value;}
            if(_autoSize != psd.fenix.text.TextFieldAutoSize.NONE) { _measureText.apply(this); }
            _resetTextCache();
            return _text;
        };
        
        /**
         * Detecta si el elemento tiene contenido en la posicion global (x,y). Sobreescribe
         * la detección general para realizar una detección por bounds
         * @param x Coordenada X que se quiere comprobar
         * @param y Coordenada Y que se quiere comprobar
         * @returns Boolean indicando si el displayObject tiene contenido en la
         *          posición indicada
         */
        this.testHit = function(x,y)
        {
            var offsetX = 0;
            
            if(_autoSize == psd.fenix.text.TextFieldAutoSize.CENTER) {offsetX=-this.width()/2;}
            if(_autoSize == psd.fenix.text.TextFieldAutoSize.RIGHT) {offsetX=-this.width();}
            
            return (x >= (offsetX + this.globalX()) && x <= (offsetX + this.globalX() + this.width()) &&
                    y >= this.globalY() && y <= (this.globalY() + this.height()));
        };
        
        //
        this.addEventListener(psd.fenix.event.CacheEvent.CACHE_FLUSH, _resetTextCache, this);
        
        // 
        _resetTextCache();
    }

    // Incluimos la declaracion de la clase en el namespace psd.fenix.text	
    namespace.TextField = TextField;
	
})(psd.fenix.text);(function(namespace) {

    // Inheritance class
    ProgressBarInterface.prototype = new psd.fenix.DisplayObjectContainer();

    /**
     * Progressbar es un componente para la creación de barras de progreso simples
     * @param texture La imagen de texturas
     * @param leftFrame Sección izquierda de la barra
     * @param rightFrame Sección derecha de la barra
     * @param centerFrame Sección central de la barra
     * @param fillFrame Relleno de la barra
     * @param slider El tirador de la barra (opcional)
     * @constructor
     */
    function ProgressBarInterface(barLeft, barRight, barCenter, barFill, zoneCenter, slider)
    {
        // Super
        psd.fenix.DisplayObjectContainer.call(this);
        
        /**
         * className psd.fenix.controls.ProgressBarInterface
         */
        this.className = "psd.fenix.controls.ProgressBarInterface";
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//    
        
        // Indica si el componente ya se ha inicializado
        var _initialized = false;
        
        // Sección izquierda de la barra
        var _barLeft = barLeft;
        
        // Sección derecha de la barra
        var _barRight = barRight;
        
        // Sección central de la barra
        var _barCenter = barCenter;
        
		// Sección central pinchable y transparente de la barra
		var _zoneCenter = zoneCenter;
		
        // Relleno de la barra
        var _barFill = barFill;
		
		// Altura de la barra
		var _barHeight = null;
        
		// Altura de zona sensible
		var _zoneHeight = null;
		
        // Tirador opcional de la barra de progreso
        var _slider = slider;
        
        // Indica que el tirador se está arrastrando
        var _draggingSlider = false;
        
        // Indica el valor actual de progreso de la barra
        var _currentProgress = 0;
        
        // Inicializa el componente
        var _init = function()
        {            
            _barCenter.buttonMode = true;
            _barCenter.useHandCursor = true;

			_zoneCenter.buttonMode = true;
			_zoneCenter.useHandCursor = true;

            _barFill.buttonMode = true;
            _barFill.useHandCursor = true;            
            _barFill.width(0);
            
            this.addChild(_barLeft);
			this.addChild(_zoneCenter);
            this.addChild(_barCenter);
            this.addChild(_barRight);
            this.addChild(_barFill);
            
            if(_slider!=null) 
            { 
                _slider.x = _currentProgress * _barCenter.width();
                _slider.addEventListener(psd.fenix.MouseEvent.MOUSE_DOWN, _onSliderDown, this);
                this.addChild(_slider); 
            }
            
			_zoneCenter.addEventListener(psd.fenix.MouseEvent.MOUSE_DOWN, _onBarDown, this);
            _barCenter.addEventListener(psd.fenix.MouseEvent.MOUSE_DOWN, _onBarDown, this);
            _barFill.addEventListener(psd.fenix.MouseEvent.MOUSE_DOWN, _onBarDown, this);
            
            _initialized = true;
        };
        
        // Detecta un evento de click sobre la barra de progreso
        var _onBarDown = function(event)
        {
            _currentProgress = event.localX/_barCenter.width();
            this.setProgress(_currentProgress);
            this.dispatchEvent(new psd.fenix.event.ProgressEvent(psd.fenix.event.ProgressEvent.CHANGE, _currentProgress));
        };
        
        // Detecta un evento de mouse_down sobre el slider de la barra
        var _onSliderDown = function(event) 
        {
            _draggingSlider = true;
            
            this.stage().addEventListener(psd.fenix.MouseEvent.MOUSE_MOVE, _onSliderMove, this);
            this.stage().addEventListener(psd.fenix.MouseEvent.MOUSE_UP, _onSliderUp, this);
        };
        
        // Detecta un desplazamiento del slider mientras se está arrastrando
        var _onSliderMove = function(event) 
        { 
            var sliderPosition = event.stageX - this.globalX();
            
            if (sliderPosition < 0) {sliderPosition = 0;}
            if (sliderPosition > _barCenter.width()) {sliderPosition = _barCenter.width();}
            
            _slider.x = sliderPosition - _slider.width()/2;
            
            if(_liveUpdate) 
            {
                _currentProgress = sliderPosition;
                _barFill.width(sliderPosition);
                this.dispatchEvent(new psd.fenix.event.ProgressEvent(psd.fenix.event.ProgressEvent.CHANGE, sliderPosition/_barCenter.width()));
            }
        };
        
        // Detecta el fin de la acción de arrastre del slider de la barra
        var _onSliderUp = function(event) 
        { 
            var sliderPosition = event.stageX - this.globalX();
            
            if (sliderPosition < 0) {sliderPosition = 0;}
            if (sliderPosition > _barCenter.width()) {sliderPosition = _barCenter.width();}
            
            _currentProgress = sliderPosition;
            _draggingSlider = false;
            _slider.x = sliderPosition - _slider.width()/2;
            
            this.setProgress(sliderPosition/_barCenter.width());
            this.dispatchEvent(new psd.fenix.event.ProgressEvent(psd.fenix.event.ProgressEvent.CHANGE, sliderPosition/_barCenter.width()));
            
            this.stage().removeEventListener(psd.fenix.MouseEvent.MOUSE_MOVE, _onSliderMove, this);
            this.stage().removeEventListener(psd.fenix.MouseEvent.MOUSE_UP, _onSliderUp, this);
        };
        
        // Inicialización del componente
        if (barLeft && barRight && barCenter && barFill && zoneCenter){
            _init.apply(this);
        };
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        
        /**
         * Indica si la barra lanza eventos de change en vivo cuando se arrastra
         * el slider
         */
        var _liveUpdate = false;
        this.liveUpdate = function(value)
        {
            if(value!=undefined) {_liveUpdate = value;}
            return _liveUpdate;
        };
        
        /**
         * Redimensiona la barra de progreso
         * @param width El ancho de la barra
         * @param height El alto de la barra
         */
        this.resize = function(width, height)
        {
            if(_initialized)
            {
                _barLeft.x = 0;
				
                _barRight.x = width - _barRight.width();
                
                _barCenter.x = _barLeft.x + _barLeft.width(); 
				
                _barCenter.width(_barRight.x - _barCenter.x);
                
                _barFill.x = _barCenter.x;
                _barFill.width(_barCenter.width()*_currentProgress);
                				
				if(_barHeight!=null)
				{
					_barLeft.height(_barHeight);
					_barRight.height(_barHeight);
					_barCenter.height(_barHeight);
					_barFill.height(_barHeight);
				}
				
				if (_zoneHeight!=null) {
					_zoneCenter.height(_zoneHeight);
					_zoneCenter.width(_barCenter.width());
					_zoneCenter.x = _barCenter.x;
					_zoneCenter.y = (_barCenter.height()-_zoneCenter.height())/2;
				}
				
                if(_slider!=null) 
                {
                    _slider.x = _slider.x = _barCenter.width()*_currentProgress - _slider.width()/2;
                    _slider.y = (_barCenter.height() - _slider.height())/2;
					
					if (_slider.x-_slider.width/2 <0 ) {
						_slider.x = slider.width/2;
					}
                }

            }
        };
        
        /**
         * Elemento de arrastre de la barra
         */
        this.slider = function(slider)
        {
            if(_slider!=null) {this.removeChild(_slider);}
            
            _slider = slider;
            _slider.x = _currentProgress * _barCenter.width() - _slider.width()/2;
            _slider.addEventListener(psd.fenix.MouseEvent.MOUSE_DOWN, _onSliderDown, this);
            
            this.addChild(_slider);
        };
        
        /**
         * Establece el estado de progreso de la barra
         * @param value El valor de progreso
         */
        this.setProgress = function(value) 
        {
		
            _currentProgress = value;

            if(_initialized)
            {
                var progressPosition = _barCenter.width()*value == 0 ? 1 : _barCenter.width()*value ;

                if(!_liveUpdate || !_draggingSlider) {
					
					_barFill.width(progressPosition);
					
				}
                if(_slider!=null && !_draggingSlider) {_slider.x = progressPosition - _slider.width()/2;}
            }
        };

		/** Devuelve la posición actual de progreso de la barra
         * @return El valor de progreso
         */
        this.currentProgress = function() 
        {
            return _currentProgress;
        };
		
		/**
         * Establece el alto de la barra de progreso
         * @param value El valor de la altura del item
         */
        this.barHeight = function(value) 
        {
            _barHeight = value;
        };
		
		/**
         * Establece el alto de la zona pinchable en barra de progreso
         * @param value El valor de la altura del item
         */
        this.zoneHeight = function(value) 
        {
            _zoneHeight = value;
        };		
    }

    // Incluimos la declaracion de la clase en el namespace psd.fenix.controls	
    namespace.ProgressBarInterface = ProgressBarInterface;

})(psd.fenix.controls);(function(namespace) {

    // Inheritance class
    ProgressBar.prototype = new psd.fenix.controls.ProgressBarInterface;

    /**
     * Progressbar es un componente para la creación de barras de progreso simples
     * @param texture La imagen de texturas
     * @param leftFrame Sección izquierda de la barra
     * @param rightFrame Sección derecha de la barra
     * @param centerFrame Sección central de la barra
     * @param fillFrame Relleno de la barra
     * @param slider El tirador de la barra (opcional)
     * @constructor
     */
    function ProgressBar(texture, leftFrame, rightFrame, centerFrame, fillFrame, slider)
    {

        var barLeft, barRight, barCenter, zoneCenter, barFill;

        /**
         * className psd.fenix.controls.ProgressBarInterface
         */
        this.className = "psd.fenix.controls.ProgressBarInterface";

        barLeft = new psd.fenix.Movieclip(texture, leftFrame);
        barLeft.gotoAndStop(0);

        barRight = new psd.fenix.Movieclip(texture, rightFrame);
        barRight.gotoAndStop(0);

        barCenter = new psd.fenix.Movieclip(texture, centerFrame);
        barCenter.buttonMode = true;
        barCenter.useHandCursor = true;
        barCenter.gotoAndStop(0);

        zoneCenter = new psd.fenix.Movieclip(texture, leftFrame);
        zoneCenter.buttonMode = true;
        zoneCenter.useHandCursor = true;
        zoneCenter.alpha = 1;
        zoneCenter.gotoAndStop(0);

        barFill = new psd.fenix.Movieclip(texture, fillFrame);
        barFill.buttonMode = true;
        barFill.useHandCursor = true;
        barFill.gotoAndStop(0);
        barFill.width(0);

        // Super
        psd.fenix.controls.ProgressBarInterface.call(this, barLeft, barRight, barCenter, barFill, zoneCenter, slider);
    }

    // Incluimos la declaracion de la clase en el namespace psd.fenix.controls	
    namespace.ProgressBar = ProgressBar;

})(psd.fenix.controls);(function(namespace) {

    // Inheritance class
    VideoPlayback.prototype = new psd.fenix.DisplayObjectContainer();

    /**
     * La clase VideoPlayback es un componente cerrado que permite la reproducción
     * y control de un video de manera sencilla
     * @constructor
     */
    function VideoPlayback(videoData)
    {
        // Super
        psd.fenix.DisplayObjectContainer.call(this);
        
        /**
         * className psd.fenix.controls.VideoPlayback
         */
        this.className = "psd.fenix.controls.VideoPlayback";
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//    
        
        // Parámetro de entrada. Los parámetros de entrada permitidos son:
        //   - [object HTMLVideoElement] Si se recibe directamente el tag de video
        //   - [object Array] Si se recibe un array de urls
        var _videoData = videoData;
        
        // Elemento psd.fenix.media.VideoElement con la información del vídeo
        var _videoElement = null;

        // Componente fenix Video
        var _video = null;
        
        // Controlador para el vídeo
        var _videoController = null;

        // Barra de controles de reproducción
        var _controlBar = null;
        
        // Indica si el control ha completado el proceso de inicialización
        var _initialized = false;
        
        // Inicializa el componente
        var _init = function()
        {
            // Creamos el elemento de video a partir de los parámetros de entrada
            _videoElement = new psd.fenix.media.VideoElement(_videoData);
            
            // Creamos el componente fenix de Video y el controlador
            _video = new psd.fenix.display.Video(_videoElement);
            _videoController = new psd.fenix.media.MediaController();
            _videoController.attachStream(_videoElement);
            
            // Creamos la barra de controles del componente
            _controlBar = new psd.fenix.controls.MediaControlBar(_videoController);
            
            // Incluimos el componente de video y la barra de controles
            this.addChild(_video);
            this.addChild(_controlBar);
            
            // Completamos la inicialización del componente
            _initialized = true;
        };
        
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        
        /**
         * 
         * @param width
         * @param height
         */
        this.resize = function(width, height)
        {
            var controlBarWidth = width-40;
            
            if(_initialized)
            {
                _videoElement.width(width);
                _videoElement.height(height);

                _controlBar.x = 20;
                _controlBar.y = height - 50;
                _controlBar.resize(controlBarWidth, height);
            }
        };
        
        _init.apply(this);
    }

    namespace.VideoPlayback = VideoPlayback;

})(psd.fenix.controls);(function(namespace) {
    
    //
    namespace.StageDisplayState = {};
    
    /**
     * 
     */
    namespace.StageDisplayState.NORMAL = "normal";
    
    /**
     * 
     */
    namespace.StageDisplayState.FULL_SCREEN = "fullscreen";

})(psd.fenix.stage);(function(namespace) {
	
    // Inheritance class
    Stage.prototype = new psd.fenix.DisplayObjectContainer();
    
    /**
     * Frames per second a los que se ejecuta la aplicacion
     */
    Stage.FPS = 60;	
	
    /**
     * Stage es el contenedor basico para cualquier aplicacion que utilice fenix
     * @constructor
     */
    function Stage(idParent, settings) 
    {
        // Super
        psd.fenix.DisplayObjectContainer.call(this);
        
        /**
         * className psd.fenix.Stage
         */
        this.className = "psd.fenix.Stage";
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//        

        // ID del contenedor de fenix
        var _parentID = idParent;
        
        // Canvas para el renderizado de elementos
        var _canvas = null;
        
        // ID del canvas de fenix
        var _canvasID = _parentID + "_fenix";
        
        // Canvas para la detección de colisiones
        var _hitCanvas = null;
        
        // Contexto de renderizado
        var _renderContext;
        
        // ID del canvas para detección de hits
        var _hitCanvasID = _parentID + "_hits";
        
        // Contenedor externo para fenix
        var _container = null;
        
        // Contenedor interno para fenix
        var _parent = null;
        
        // Ancho del contenedor de fenix
        var _parentWidth = 0;
        
        // Alto del contenedor de fenix
        var _parentHeight = 0;
        
        // Indica si el ciclo de renderizado se esta ejecutando
        var _isRendering = true;
        
        // Indica si el ratón está presionado sobre el stage
        var _isMouseDown = false;
        
        // Indica si el ratón está sobre el stage
        var _isMouseOver = false;
        
        // Flag indicando si deben ejecutarse los cálculos del estado de ratón
        // Se habilita cuando se detecta un movimiento del ratón y se deshabilita
        // una vez se lanzan los cálculos
        var _mouseMoved = true;
        
        // ID de temporizador para el bucle de renderizado
        var _timer = null;
        
        // Petición de fullscreen
        var _requestFullScreen = null;
        
        // Petición de cancel fullscreen
        var _cancelFullScreen = null;

        // Variable booleana que indica si el dispositivo es un iphone con version ios6
        var _ios6 = false;
        
        // Parámetros de configuración iniciales de fenix
        // TODO AÑADIR PAR�?METROS ADICIONALES Y REVISAR VALORES POR DEFECTO
        var _settings = {autosize: true};
        if (settings != undefined && settings != null) {
            _settings.autosize = settings.autosize != null && settings.autosize != undefined ? settings.autosize : true;
            _settings.width = settings.width != null && settings.width != undefined ? settings.width : 400;
            _settings.height = settings.height != null && settings.height != undefined ? settings.height : 300;
            _settings.hitCanvas = settings.hitCanvas != null && settings.hitCanvas != undefined ? settings.hitCanvas : false;
        }

        // Función utilizada para ejecutar la llamada a la función de inicialización
        // tras un evento recuperando automáticamente el contexto
        var _deferredInit = (function(stage) {return function() {_init.apply(stage);}})(this);

        // Inicializa el stage y todos sus elementos.
        var _init = function() 
        {
            // Obtenemos el contenedor que sirve de padre de fenix. Si no hemos
            // recibido un id válido, fenix lanza un evento de error
            _container = document.getElementById(_parentID);
            if (_container == null) 
            {
                this.dispatchEvent(new psd.fenix.StageEvent(psd.fenix.StageEvent.INIT_ERROR));
                return;
            }
            
            // Creamos un div adicional que servirá como contenedor para todos los elementos
            // de fenix (canvas, video, ...), y lo añadimos al contenedor
            _parent = document.createElement("div");
            _parent.setAttribute("style", "position:relative; width:100%; height:100%;");
            _container.appendChild(_parent);
            
            // Actualizamos las funciones de fullscreen si existen
            _requestFullScreen = _parent.requestFullScreen || 
                                _parent.mozRequestFullScreen ||
                                _parent.webkitRequestFullScreen ||
                                function() {};
                            
            _cancelFullScreen = document.cancelFullScreen ||
                                document.mozCancelFullScreen ||
                                document.webkitCancelFullScreen ||
                                function() {};
            
            if (document.addEventListener)
            {
                document.addEventListener("fullscreenchange",_deferredOnFullScreenChange,false);
                document.addEventListener("mozfullscreenchange",_deferredOnFullScreenChange,false);
                document.addEventListener("webkitfullscreenchange",_deferredOnFullScreenChange,false);
                document.addEventListener("keydown",_deferredOnKeyDown,false);
            }
            else if (document.attachEvent)
            {
                document.attachEvent("onfullscreenchange",_deferredOnFullScreenChange);
                document.attachEvent("onmozfullscreenchange",_deferredOnFullScreenChange);
                document.attachEvent("onwebkitfullscreenchange",_deferredOnFullScreenChange);
                document.attachEvent("onkeydown",_deferredOnKeyDown);
            }
            
            
            // Actualizamos las dimensiones del stage en función de la configuración de entrada
            // TODO REVISAR VALORES POR DEFECTO
            if (_settings.autosize == true) 
            {
                _stageWidth = _parentWidth = _container.clientWidth == undefined || _container.clientWidth == 0 ? 448 : _container.clientWidth;
                _stageHeight = _parentHeight = _container.clientHeight == undefined|| _container.clientHeight == 0 ? 365 : _container.clientHeight;
            } else {
               _stageWidth = _settings.width;
               _stageHeight = _settings.height;
            }            
                        
            // Creamos el elemento canvas para el renderizado de los elementos
            // y lo añadimos al contenedor padre
            _canvas = document.createElement("canvas");
            _canvas.setAttribute("style", "position:absolute;");
            _canvas.id = _canvasID;
            _canvas.width = _stageWidth;
            _canvas.height = _stageHeight;
            _parent.appendChild(_canvas);

            // Creamos un canvas para la detección de colisiones (no es necesario
            // incluirlo en el DOM ya que no debe ser visible). El canvas de colisiones
            // tiene un tamaño de 1x1, para detectar colisiones a nivel de pixel
            _hitCanvas = document.createElement("canvas");
            _hitCanvas.id = _hitCanvasID;
            _hitCanvas.width = _hitCanvas.height = 1;
            
            // Si hemos recibido un id 
            if(_settings.hitCanvas)
            {
                var hitCanvasParent = document.getElementById(_settings.hitCanvas);
                if(hitCanvasParent!=null)
                {
                    _hitCanvas.width = hitCanvasParent.clientWidth;
                    _hitCanvas.height = hitCanvasParent.clientHeight;
                    hitCanvasParent.appendChild(_hitCanvas);
                }
            }
            
            // Recogemos el valor de psd.framework.compatibility para decidir el 
            // modo en el que se debe ejecutar la aplicación de fenix.
            if (Object.prototype.toString.call(_canvas) === "[object HTMLCanvasElement]") 
            {
                Log.log("Initializing fenix in standard mode...");

                // Obtenemos las referencias de los contextos de cada canvas
                _renderContext = _canvas.getContext('2d');
                _hitContext = _hitCanvas.getContext('2d');
                
                _renderContext.fillStyle = _backgroundColor;

                // Inicializamos las variables estáticas de fenix
                psd.fenix.topLevelApplication = _parent;
                psd.fenix.topLevelCanvas = _canvas;                
                //psd.fenix.stage = this;
                //psd.fenix.canvasContext = _renderContext;
                //psd.fenix.hitContext = _hitContext;
                
                this.start();
                this.dispatchEvent(new psd.fenix.StageEvent(psd.fenix.StageEvent.INIT));
                
            } else {
                Log.log("Initializing fenix in compatibility mode...");
                requestAnimationFrame = null;
				G_vmlCanvasManager.initElement(_canvas);
                G_vmlCanvasManager.initElement(_hitCanvas);
                
                // Obtenemos las referencias de los contextos de cada canvas
                _renderContext = _canvas.getContext('2d');
                _hitContext = _hitCanvas.getContext('2d');
                
                _renderContext.fillStyle = _backgroundColor;

                // Inicializamos las variables estáticas de fenix
                psd.fenix.topLevelApplication = _parent;
                psd.fenix.topLevelCanvas = _canvas;
                //psd.fenix.stage = this;
                //psd.fenix.canvasContext = _renderContext;
                //psd.fenix.hitContext = _hitContext;
                
                this.changeFrameRate(10);
                this.dispatchEvent(new psd.fenix.StageEvent(psd.fenix.StageEvent.INIT));                
            }
        };
        
        var _deferredOnFullScreenChange = (function(stage) {return function() {_onFullScreenChange.apply(stage);}})(this);
        var _onFullScreenChange = function()
        {
            if(document.mozFullScreenElement || document.webkitFullscreenElement) { _displayState = psd.fenix.stage.StageDisplayState.FULL_SCREEN; }
            else{ _displayState = psd.fenix.stage.StageDisplayState.NORMAL; }
            
            this.dispatchEvent(new psd.fenix.StageEvent(psd.fenix.StageEvent.DISPLAY_STATE_CHANGE));
        };
        
        var _deferredOnKeyDown = (function(stage) {return function(event) {_onKeyDown.apply(stage, [event]);}})(this);
        var _onKeyDown = function(event)
        {
            var keyCode = 0;
            
            if(event==null) { keyCode = window.event.keyCode; }
            else { keyCode = event.keyCode; }
            
            this.dispatchEvent(new psd.fenix.event.KeyboardEvent(psd.fenix.event.KeyboardEvent.KEY_DOWN, keyCode));
        };        
        
        // Función utilizada para ejecutar la llamada a la función de loop
        // recuperando automáticamente el contexto
        var _deferredLoop = (function(stage) {return function() {_loop.apply(stage);}})(this);
        
        // Función de actualización de pintado del stage de fenix
        var _loop = function()
        {
            // Comprobamos si las dimensiones han cambiado para lanzar un evento de resize
            if(_displayState==psd.fenix.stage.StageDisplayState.NORMAL)
            {
                // TODO COMPROBAR BUG EN IE-9 CON EL TAMAÑO DEL CANVAS. PARECE QUE EL MODELO DE CAJA
                // DE IE INCREMENTA EL clientWidth EN 4 UNIDADES POR LO QUE SIEMPRE ESTA CRECIENDO.
                // RESIZE DESHABILITADO PARA IE HASTA REVISARLO
                if((_container.clientWidth != _parentWidth || _container.clientHeight != _parentHeight) && !psd.framework.ua.msie)
                {
                    _parentWidth = _container.clientWidth;
                    _parentHeight = _container.clientHeight;

                    if(_settings.autosize)
                    {
                        _canvas.width = _stageWidth = _parentWidth;
                        _canvas.height = _stageHeight = _parentHeight;

                    }else{
                        _canvas.width = _stageWidth = _settings.width;
                        _canvas.height = _stageHeight = _settings.height;
                    }
                    
                    this.dispatchEvent(new psd.fenix.StageEvent(psd.fenix.StageEvent.RESIZE));
                }
                
            } else {
                
                if(window.innerWidth != _parentWidth || window.innerHeight != _parentHeight)
                {
                    _parentWidth = window.innerWidth;
                    _parentHeight = window.innerHeight;
                    
                    _canvas.width = _stageWidth = _parentWidth;
                    _canvas.height = _stageHeight = _parentHeight;

                    this.dispatchEvent(new psd.fenix.StageEvent(psd.fenix.StageEvent.RESIZE));
                }
                
            }
            
            // Evitamos renderizados extra si fenix está congelado o pausado
            if(_isRendering)
            {
                // Limpiamos el canvas de elementos anteriores
                _clear();
                
                // Renderizamos el contenido del stage
                this.render(_renderContext);
            }
            
            // Calculamos el estado del ratón.
            // Por eficiencia, solo se ejecuta si el raton se encuentra sobre el canvas
            // Y si se ha detectado un cambio en la posición del ratón desde la última
            // comprobación
            if(_isMouseOver && _mouseMoved)
            {
                _mouseMoved = false;
                _executeMouseCalculations.apply(this,[this.calculateMouseStatus]);
            }
            
            // Lanzamos el evento de enter_frame
            //this.dispatchEvent(new psd.fenix.StageEvent(psd.fenix.StageEvent.ENTER_FRAME));

            // Si tenemos disponible requestAnimationFrame lo utilizamos en lugar del timer
            if(requestAnimationFrame!=undefined && !_ios6) {requestAnimationFrame(_deferredLoop);}

        };

        // Limpia el canvas
        var _clear = function() 
        {                 
            _renderContext.clearRect(0, 0, _stageWidth, _stageHeight); 
            
            // Aplicamos fillRect sobre el contexto de renderizado para pintar
            // el fondo de la aplicación
            _renderContext.fillStyle = _backgroundColor;
            _renderContext.fillRect(0, 0, _stageWidth, _stageHeight);  
        };
        
        // Función utilizada para ejecutar la llamada a la función _onMouseDown
        // recuperando automáticamente el contexto
        var _deferredMouseDown = (function(stage) {return function() {_onMouseDown.apply(stage);}})(this);
        
        // Listener para detectar el evento de mouseDown sobre el canvas
        var _onMouseDown = function() 
        {
            if(!_isMouseDown)
            {
                _isMouseDown = true;
                _executeMouseCalculations.apply(this,[this.calculateMouseDownStatus]);
                this.dispatchEvent(new psd.fenix.MouseEvent(psd.fenix.MouseEvent.MOUSE_DOWN, _mouseX, _mouseY));                
            }
        };
        
        // Función utilizada para ejecutar la llamada a la función _onMouseUp
        // recuperando automáticamente el contexto
        var _deferredMouseUp = (function(stage) {return function() {_onMouseUp.apply(stage);}})(this);
        
    // Listener para detectar el evento de mouseDown sobre el canvas
        var _onMouseUp = function() 
        {
            if(_isMouseDown)
            {
                _isMouseDown = false;
                _executeMouseCalculations.apply(this,[this.calculateMouseDownStatus]);
                this.dispatchEvent(new psd.fenix.MouseEvent(psd.fenix.MouseEvent.MOUSE_UP, _mouseX, _mouseY));
            }
        };
        
        // Ejecuta la función de actualización del estado de ratón especificada.
        // Además, realiza las transformaciones necesarias sobre el contexto de 
        // colisiones antes de realizar los cálculos.
        // @param calcFunction  La función de cálculo de ratón que se quiere ejecutar
        var _executeMouseCalculations = function(calcFunction)
        {
            // 
            _hitContext.clearRect(0,0,1,1);
            
            // Iniciamos el cálculo de colisiones guardando el estado actual del contexto
            _hitContext.save();

            // Desplazamos el contexto de colisiones de manera que el punto en el que se
            // encuentra el ratón quede en el (0,0)
            _hitContext.translate(-_mouseX, -_mouseY);

            // Iniciamos el cálculo recursivo del estado del ratón
            calcFunction.apply(this, [{x:_mouseX, y:_mouseY, down:_isMouseDown, hitContext:_hitContext}]);

            // Restauramos el estado anterior del contexto de colisiones
            _hitContext.restore();
        };
        
        // Función utilizada para ejecutar la llamada a la función _onMouseMove
        // recuperando automáticamente el contexto
        var _deferredMouseMove = (function(stage) {return function(evt) {_onMouseMove.apply(stage,[evt]);}})(this);
        
        // Listener para detectar el evento de mouseMove sobre el canvas
        var _onMouseMove = function(evt)
        {
            var p = getMousePos(_canvas, evt);
            
            if (evt.offsetX) 
            {
                _mouseX = evt.offsetX;
                _mouseY = evt.offsetY;
                
            } else {
                
                _mouseX = p.x;
                _mouseY = p.y;
            }
            
            _mouseMoved = true;
            this.dispatchEvent(new psd.fenix.MouseEvent(psd.fenix.MouseEvent.MOUSE_MOVE, _mouseX, _mouseY));
        };
        
        // Función utilizada para ejecutar la llamada a la función _onMouseOver
        // recuperando automáticamente el contexto
        var _deferredMouseOver = (function(stage) {return function(evt) {_onMouseOver.apply(stage,[evt]);}})(this);
        
        // Listener para detectar el evento de mouseOver sobre el canvas
        var _onMouseOver = function(evt) 
        {
            var p = getMousePos(_canvas, evt);
            
            if (evt.offsetX) 
            {
                _mouseX = evt.offsetX;
                _mouseY = evt.offsetY;
                
            } else {
                
                _mouseX = p.x;
                _mouseY = p.y;
            }
            
            _isMouseOver = true;
            this.dispatchEvent(new psd.fenix.MouseEvent(psd.fenix.MouseEvent.MOUSE_OVER, _mouseX, _mouseY));
        };
        
        // Función utilizada para ejecutar la llamada a la función _onMouseOut
        // recuperando automáticamente el contexto
        var _deferredMouseOut = (function(stage) {return function() {_onMouseOut.apply(stage);}})(this);
        
        // Listener para detectar el evento de momuseOut sobre el canvas
        var _onMouseOut = function()
        {
            _mouseX = -5;
            _mouseY = -5;

            //console.log("cambia mano a puntero");
            //document.body.style.cursor = "auto";
            
            //NOTA: Volvemos a ejecutar la función de actualización del estado del ratón antes de lanzar el evento out del canvas. 
            //Esto se ha hecho para evitar que el ratón se quede en un estado incorrecto al salir del canvas, por el rápido movimiento del ratón.
            _executeMouseCalculations.apply(this,[this.calculateMouseStatus]);
            
            _isMouseOver = false;
            this.dispatchEvent(new psd.fenix.MouseEvent(psd.fenix.MouseEvent.MOUSE_OUT, _mouseX, _mouseY));
        };
        
        // Función utilizada para ejecutar la llamada a la función _onMouseWheel
        // recuperando automáticamente el contexto
        var _deferredMouseWheel = (function(stage) {return function(evt) {_onMouseWheel.apply(stage, [evt]);}})(this);
        
        // Listener para detectar el evento de momuseOut sobre el canvas
        var _onMouseWheel = function(evt)
        {
            var wheelEvt = new psd.fenix.MouseEvent(psd.fenix.MouseEvent.MOUSE_WHEEL, _mouseX, _mouseY);
            wheelEvt.delta = evt.wheelDelta || evt.detail || 0;
            
            this.dispatchEvent(wheelEvt);
        };        
        
        // 
        function getMousePos(canvas, evt)
        {
            var obj = canvas;
            var top = 0;
            var left = 0;
            while (obj && obj.tagName != 'BODY') {
                top += obj.offsetTop;
                left += obj.offsetLeft;
                obj = obj.offsetParent;
            }

            // return relative mouse position
            var mouseX = evt.clientX - left + window.pageXOffset;
            var mouseY = evt.clientY - top + window.pageYOffset;
            return {
                x: mouseX,
                y: mouseY
            };
        };
        
        // Inicializa los listeners de raton sobre el componente canvas
        var _addEventListenerCanvas = function()
        {
            if (_canvas.addEventListener) {
                _canvas.addEventListener("mousemove", _deferredMouseMove, false);
                _canvas.addEventListener("mouseover", _deferredMouseOver, false);
                _canvas.addEventListener("mouseout", _deferredMouseOut, false);
                _canvas.addEventListener("mousedown", _deferredMouseDown, false);
                _canvas.addEventListener("mouseup", _deferredMouseUp, false);
                _canvas.addEventListener("DOMMouseScroll", _deferredMouseWheel, false);
                _canvas.addEventListener("mosuewheel", _deferredMouseWheel, false);
            }
            else if (_canvas.attachEvent) {
                _canvas.attachEvent("onmousemove", _deferredMouseMove);
                _canvas.attachEvent("onmouseover", _deferredMouseOver);
                _canvas.attachEvent("onmouseout", _deferredMouseOut);
                _canvas.attachEvent("onmousedown", _deferredMouseDown);
                _canvas.attachEvent("onmouseup", _deferredMouseUp);
                _canvas.attachEvent("DOMMouseScroll", _deferredMouseWheel);
                _canvas.attachEvent("mousewheel", _deferredMouseWheel);
                
            }
        };

        // Elimina los listeners de raton sobre el componente canvas
        var _removeEventListenerCanvas = function()
        {
            if (_canvas.removeEventListener) { // Others 
                _canvas.removeEventListener("mousemove", _deferredMouseMove, false);
                _canvas.removeEventListener("mouseover", _deferredMouseOver, false);
                _canvas.removeEventListener("mouseout", _deferredMouseOut, false);
                _canvas.removeEventListener("mousedown", _deferredMouseDown, false);
                _canvas.removeEventListener("mouseup", _deferredMouseUp, false);                
                _canvas.removeEventListener("DOMMouseScroll", _deferredMouseWheel, false);                
                _canvas.removeEventListener("mousewheel", _deferredMouseWheel, false);                
            }
            else if (_canvas.attachEvent) { // IE
                _canvas.detachEvent("onmousemove", _deferredMouseMove);
                _canvas.detachEvent("onmouseover", _deferredMouseOver);
                _canvas.detachEvent("onmouseout", _deferredMouseOut);
                _canvas.detachEvent("onmousedown", _deferredMouseDown);
                _canvas.detachEvent("onmouseup", _deferredMouseUp);
                _canvas.detachEvent("DOMMouseScroll", _deferredMouseWheel);
                _canvas.detachEvent("mousewheel", _deferredMouseWheel);
            }
        };        

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        
        /**
         * Ancho del stage
         * @readonly
         */
        var _stageWidth = 0;
        this.stageWidth = function() {return _stageWidth;};
        
        /**
         * Alto del stage
         * @readonly
         */
        var _stageHeight = 0;
        this.stageHeight = function() {return _stageHeight;};
        
        /**
         * Velocidad en frames por segundo de reproducción del contenido
         */
        var _fps = settings && !isNaN(settings.fps) ? settings.fps : 60;
        this.frameRate = function() {return _fps;};
        
        /**
         * Coordenada X del ratón sobre el stage
         * @readonly
         */
        var _mouseX = -5;
        this.mouseX = function() {return _mouseX;};
        
        /**
         * Coordenada Y del ratón sobre el stage
         * @readonly
         */
        var _mouseY = -5;
        this.mouseY = function() {return _mouseY;};
        
        /**
         * Instancia de context2d donde se deben detectar las colisiones de ratón
         */
        var _hitContext = null;
        this.hitContext = function () {return _hitContext;};
        
        /**
         *
         */
        var _displayState = psd.fenix.stage.StageDisplayState.NORMAL;
        this.displayState = function(value)
        {
            var normal = psd.fenix.stage.StageDisplayState.NORMAL,
                fullscreen = psd.fenix.stage.StageDisplayState.FULL_SCREEN;
            
            if(value == fullscreen && _requestFullScreen!=undefined) { _requestFullScreen.apply(_parent); }
            if(value == normal && _cancelFullScreen!=undefined) { _cancelFullScreen.apply(document); }
                
            return _displayState;
        }
        
        /**
         * Color de fondo del canvas
         */
        var _backgroundColor = "rgba(255,255,255,0)";
        this.backgroundColor = function(value)
        {
            if (value) 
            {
                _backgroundColor = value;
                if(typeof(_renderContext)!="undefined") {_renderContext.fillStyle = _backgroundColor;}
            }
            
            return _backgroundColor;
        };
        
        /**
         * Inicializa la instancia del stage y comienza el ciclo de renderizado.
         * Espera hasta que el documento haya terminado de 
         */
        this.init = function() 
        {
            if(document.readyState === "complete" || document.readyState === "loaded") {_init.apply(this);}
            else{
                if (window.addEventListener) {window.addEventListener('load', _deferredInit, false);}
                else if (window.attachEvent) {window.attachEvent('onload', _deferredInit);}
            }
        };
         
        /**
         * Inicia la reproduccion del contenido del stage
         */
        this.start = function()
        {
            _addEventListenerCanvas();

            //NOTA: Detectamos cuando el user agent sea de un iphone con version 6 de ios, ya que en ese caso hay un problema con el requestAnimationFreame y los <iframes>
            //Para más información ver el siguiente enlace: https://gist.github.com/KrofDrakula/5318048
            //UserAgent Iphone-ios6 --> Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A405 Safari/8536.25
            var ua = navigator.userAgent;
            _ios6 = (ua.indexOf('iPhone') != -1) && (ua.indexOf('Version/6.0') != -1);

            // En navegadores modernos, utilizamos requestAnimationFrame para optimizar el
            // ciclo de renderizado
            var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                                        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame ;


            window.requestAnimationFrame = requestAnimationFrame;

            if(requestAnimationFrame!=undefined && !_ios6) {requestAnimationFrame(_deferredLoop);}
            else {_timer = setInterval(_deferredLoop, (1000 / _fps));}

        };

        /**
         * Pausa la reproducción de todo el contenido del stage
         */
        this.pause = function() 
        {
            _removeEventListenerCanvas();
            if (_timer != null) {clearInterval(_timer);}
        };
        
        /**
         * Cambia la velocidad de reproducción del contenido del stage
         * TODO REVISAR REGENERACION DE TIMER
         */
        this.changeFrameRate = function(fps) 
        {
            _fps = fps;
            if (_timer != null) {clearInterval(_timer);}
            
            _timer = setInterval(_deferredLoop, 1000 / _fps);
        };
        
        /**
         * Pausa el renderizado del stage, pero no la reproducción de contenido
         */
        this.freeze = function(value) {if(value==true || value==false) {_isRendering = !value;}};      
    }
    
    // Incluimos la declaracion de la clase en el namespace psd.framework
    namespace.Stage = Stage;
	
})(psd.fenix);