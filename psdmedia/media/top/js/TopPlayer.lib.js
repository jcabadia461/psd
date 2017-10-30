mm_top_compilation= "27-10-2017 10:53:16";
(function(window) 

{
    // Generacion del namespace psd.media
    if(window.emic==undefined) { window.emic = {}; }
    if(window.emic.top==undefined) { window.emic.top = {}; }
    if(window.emic.top.media==undefined) { window.emic.top.media = {}; }
    if(window.emic.top.event==undefined) { window.emic.top.event = {}; }
    if(window.emic.top.ui==undefined) { window.emic.top.ui = {}; }
    if(window.emic.top.social==undefined) { window.emic.top.social = {}; }
    if(window.emic.top.ui.skins==undefined) { window.emic.top.ui.skins = {}; }
    if(window.emic.top.ui.skins.fenix==undefined) { window.emic.top.ui.skins.fenix = {}; }
})(window);/**
 * Created by IGomezG on 25/06/14.
 */
(function(namespace) {
    
    // Inheritance class
    MediaEvent.prototype = new  psd.framework.Event();

    MediaEvent.ON_INIT_COMPLETE = "onInitComplete";
    MediaEvent.ON_RESET_COMPLETE = "onResetComplete";
    MediaEvent.ON_PRELOAD_CONTROLLER_COMPLETE = "onPreloadControllerComplete";
    MediaEvent.ON_READY = "onReady";
    MediaEvent.ON_MEDIA_END = "onMediaEnd";
    MediaEvent.ON_MEDIA_BEGIN = "onMediaBegin";
    MediaEvent.ON_CUE = "onCue";
    MediaEvent.ON_METADATA = "onMetadata";
    MediaEvent.ON_ERROR = "onError";
    MediaEvent.ON_STATUS_CHANGE = "onStatusChange";
    MediaEvent.ON_VOLUME_CHANGE = "onVolumeChange";
    MediaEvent.ON_PROGRESS = "onProgress";
    MediaEvent.ON_SEEK_START = "onSeekStart";
    MediaEvent.ON_SEEK_COMPLETE = "onSeekComplete";
    MediaEvent.ON_BUFFER_EMPTY = "onBufferEmpty";
    MediaEvent.ON_BUFFER_FULL = "onBufferFull";
    MediaEvent.ON_SWITCH_REQUEST = "onSwitchRequest";
    MediaEvent.ON_SWITCH_COMPLETE = "onSwitchComplete";
    MediaEvent.ON_IS_LIVE_STREAM = "onIsLiveStream";
    MediaEvent.ON_RENDITIONS = "onRenditions";
    MediaEvent.ON_TAG = "onTag";

    function MediaEvent(type) {

        this.data = {};
        this.id = null;

        psd.framework.Event.call(this, type);
    }
    
    // Incluimos la declaracion de la clase en el namespace psd.framework
    namespace.MediaEvent = MediaEvent;

}(emic.top.event));
/**
 * Created by IGomezG on 25/06/14.
 */
(function(namespace) {
    
    // Inheritance class
    UIEvent.prototype = new  psd.framework.Event();

    UIEvent.ON_INIT_COMPLETE = "onInitComplete";
    UIEvent.ON_ORDER_BEGIN = "onOrderBegin";
    UIEvent.ON_ORDER_PLAY = "onOrderPlay";
    UIEvent.ON_ORDER_PAUSE = "onOrderPause";
    UIEvent.ON_ORDER_PLAYPAUSE = "onOrderPlayPause";
    UIEvent.ON_ORDER_STOP = "onOrderStop";
    UIEvent.ON_ORDER_VOLUME_CHANGE = "onOrderVolumeChange";
    UIEvent.ON_ORDER_MUTE = "onOrderMute";
    UIEvent.ON_ORDER_FULLSCREEN = "onOrderFullScreen";
    UIEvent.ON_ORDER_SEEK_BY_PROP = "onOrderSeekByProp";
    UIEvent.ON_ORDER_SEEK_LIVE = "onOrderSeekLive";
    UIEvent.ON_ORDER_SEEK_BY_SECS = "onOrderSeekBySecs";
    UIEvent.ON_ORDER_NEXT = "onOrderNext";
    UIEvent.ON_ORDER_PREV = "onOrderPrev";
    UIEvent.ON_ORDER_SWITCH_UP = "onOrderSwitchUp";
    UIEvent.ON_ORDER_SWITCH_DOWN = "onOrderSwitchDown";
    UIEvent.ON_ORDER_SWITCH_DIRECT = "onOrderSwitchDirect";

    UIEvent.ON_ORDER_SHARE_FACEBOOK ="onOrderShareFacebook";
    UIEvent.ON_ORDER_SHARE_TWITTER ="onOrderShareTwitter";
    UIEvent.ON_ORDER_SHARE_GOOGLEPLUS ="onOrderShareGoogleplus";

    UIEvent.ON_ORDER_SHARE_WHATSAPP = "onOrderShareGoogleplus";
    UIEvent.ON_ORDER_SHARE_SUBSCRIBE = "onOrderShareSubscribe";

    UIEvent.ON_ORDER_SHARE_EXTERNAL ="onOrderShareExternal";
    UIEvent.ON_ORDER_EMBED_EXTERNAL ="onOrderEmbedExternal";
    UIEvent.ON_ORDER_EXTERNAL ="onOrderExternal";

    UIEvent.ON_ORDER_RESET ="onOrderReset";

    UIEvent.ON_ORDER_CHANGE_LIVE = "onOrderChangeLive";

    UIEvent.ON_ORDER_BUTTON = "onOrderButton";
    UIEvent.ON_ORDER_RRSS = "onOrderRRSS";
    UIEvent.ON_ORDER_INICIOCOMPARTIR = "onOrderInicioCompartir";

    //TODO: UiskinReady es redundante con initcomplete?

    UIEvent.ON_SKIN_READY = "onSkinReady";
    UIEvent.ON_PREVIEW_READY = "onPreviewReady";

    //TODO: Mirar bien si esto debería de estar en el módulo de publicidad... Carcasas dentro de UI?
    UIEvent.ON_ORDER_SKIP_AD = "onOrderSkipAd";

    function UIEvent(type) {

        this.data = {};

        psd.framework.Event.call(this, type);
    }
    
    // Incluimos la declaracion de la clase en el namespace psd.framework
    namespace.UIEvent = UIEvent;

}(emic.top.event));
/**
 * Created by IGomezG on 25/06/14.
 */
(function(namespace) {
    
    // Inheritance class
    AdEvent.prototype = new  psd.framework.Event();

    //TODO: Documentar con comentarios lo que hace cada uno de los eventos
    AdEvent.ON_AD_INSTREAM_START = "onAdInStreamStart";
    AdEvent.ON_AD_INSTREAM_END = "onAdInStreamEnd";
    AdEvent.ON_AD_VIDEO_START = "onAdVideoStart";
    AdEvent.ON_AD_VIDEO_PAUSE = "onAdVideoPause";
    AdEvent.ON_AD_VIDEO_RESUME = "onAdVideoResume";
    AdEvent.ON_AD_PROGRESS = "onAdVideoProgress";
    AdEvent.ON_AD_VOLUME_CHANGE = "onAdVolumeChange";

    /**
     * Informa que un video publicitario ha finalizado.
     * No implica fin de posición. Utilizado con fines de reporte o para detectar fin de posición
     * en caso de tener controlado el número de campanias
     * @type {string}
     */
    AdEvent.ON_AD_VIDEO_END = "onAdVideoEnd";
    AdEvent.ON_AD_VIDEO_SKIP = "onAdVideoSkip";

    /**
     * Informa que la posición de publicidad ha finalizado.
     * Interpretado a nivel interno como un fin publi
     * @type {string}
     */
    AdEvent.ON_AD_POSITION_END = "onAdPositionEnd";
    AdEvent.ON_NO_AD= "onNoAd";
    AdEvent.ON_AD_ERROR = "onAdError";
    AdEvent.ON_READY = "onReady";
    AdEvent.ON_INIT_ERROR = "onInitError";

    function AdEvent(type) {

        this.data = {};
        this.contentType = "";
        this.id = null;
        this.idMedia = null;

        psd.framework.Event.call(this, type);
    }
    
    // Incluimos la declaracion de la clase en el namespace psd.framework
    namespace.AdEvent = AdEvent;

}(emic.top.event));
/**
 * Created by IGomezG on 25/06/14.
 */
(function(namespace) {
    
    // Inheritance class
    TopEvent.prototype = new  psd.framework.Event();

    TopEvent.ON_READY = "onReady";
    TopEvent.ON_POSITION_CHANGE = "onPositionChange";
    TopEvent.ON_LOADING = "onLoading";


    function TopEvent(type) {

        this.data = {};
        this.id = null;

        psd.framework.Event.call(this, type);
    }
    
    // Incluimos la declaracion de la clase en el namespace psd.framework
    namespace.TopEvent = TopEvent;

}(emic.top.event));
/**
 * Created by IGomezG on 10/02/14.
 */
(function (namespace){


    function MediaControllerFactory(data){

        var _controllers = [];
        var _data = data;

        /**
         * Crea una capa contenedora para el controlador solicitado
         * @param type
         * @private
         */
        var _createControllerLayer = function(type){
            emic.top.debug("[MediaControllerFactory.js][_createControllerLayer]>> ",type);
            var element, container;

            if (!_data.internalData.controllerContainers[type]) _data.internalData.controllerContainers[type] = "Controller_" + type + "_" + _data.genericData.id;

            element = document.getElementById(_data.internalData.controllerContainers[type]);
            if (!element) {
                element = document.createElement('div');
                element.id = _data.internalData.controllerContainers[type];
                element.style.position = "absolute";
                element.style.top = "0";
                element.style.left = "0";
                element.style.width = "100%";
                element.style.height = "100%";
                container = document.getElementById(_data.mediaData.container);
                container.appendChild(element);
            }
        };

        this.destroyController = function(type){
          emic.top.debug("[MediaControllerFactory.js][destroyController]>> ",type);
            if (_controllers[type]){
              _controllers[type].kill();
              _controllers[type] = undefined;
          }
        };

        this.saveController = function(type){
            emic.top.debug("[MediaControllerFactory.js][saveController]>> ",type);
            if (_controllers[type]){
                //¿Hacer algo con la capa?
                _controllers[type].reset();
            }
        };

        this.getController = function(type){
            emic.top.debug("[MediaControllerFactory.js][getController]>> ",type);
            var instance;

            if (_controllers[type]){
                emic.top.debug("[MediaControllerFactory.js][getController]>> Ya existía");
                instance = _controllers[type]
            }else{
                switch (type){
                    case emic.top.MediaModule.CONTROLLER_TYPE_AKAMAIHDS:
                        instance =  new emic.top.media.FlashController(type);
                    break;
                    case emic.top.MediaModule.CONTROLLER_TYPE_AKAMAIHD:
                        instance =  new emic.top.media.FlashController(type);
                    break;
                    case emic.top.MediaModule.CONTROLLER_TYPE_TRITON:
                        instance =  new emic.top.media.TritonController();
                    break;
                    case emic.top.MediaModule.CONTROLLER_TYPE_HTML5NATIVE:
                        instance =  new emic.top.media.HTML5Controller();
                    break;
                    case emic.top.MediaModule.CONTROLLER_TYPE_YT:
                        instance =  new emic.top.media.YTController();
                    break;
                    case emic.top.MediaModule.CONTROLLER_TYPE_DM:
                        instance =  new emic.top.media.DMController();
                    break;
//TODOjc2
                    case emic.top.MediaModule.CONTROLLER_TYPE_REAL_HLS:
                        instance = new emic.top.media.HLSController(type);
                    break;

                    case emic.top.MediaModule.CONTROLLER_TYPE_HLS:
                        instance = new emic.top.media.FlashController(type);
                        break;
                }

                if (instance){
                    emic.top.debug("[MediaControllerFactory.js][getController]>> Se crea nuevo");
                    _createControllerLayer.apply(this,[type]);
                    _controllers[type] = instance;
                }
            }

            emic.top.debug("[MediaControllerFactory.js][getController]>> Instancia: ",instance);

            return instance;
        }
    }

    namespace.MediaControllerFactory = MediaControllerFactory;
})(emic.top.media);/**
 * Created by IGomezG on 25/06/14.
 */

(function (namespace){

    MediaControllerBase.prototype = new psd.framework.EventDispatcher();

    function MediaControllerBase(){

        // Super
        psd.framework.EventDispatcher.call(this);

        //TODO: Cambiar toda la gestión de autoswitch para meterlo en el data y no con setters
        var _autoSwitch = true;
        this.setAutoSwitch = function(value){
            _autoSwitch = value;
            this.onAutoSwitchChange();
        };
        this.getAutoSwitch = function(){
            return _autoSwitch;
        };

        var _ready = false;
        this.isReady = function(){
            return _ready;
        };

        /**
         * Comprueba si el player está autorizado para iniciarse, utilizado en casos con controles nativos que no se pueden controlar desde la IU
         * @returns {*}
         */
        this.isBeginAllowed = function(data){
            var response = true;
            if ((data.internalData.position == emic.top.TopPlayer.POSITION_PREVIEW)
                && (data.uiData.overrideNativeControls == false)
                && (data.uiData.showPreview == false)) //este último redunda (nunca deberia de estar en preview tras un play en media si showPreview es true)
            {
                response = false;
                data.internalData.uiModule.externalNotify(emic.top.event.UIEvent.ON_ORDER_BEGIN)
            }
            return response;
        };

        // --------------- Dispatch Events -------------------
        // Estos métodos deben ser llamados por el controlador que implemente esta interfaz
        // ---------------------------------------------------

        this.notifyReady = function(){
            _ready = true;
            this.dispatchEvent(new emic.top.event.MediaEvent(emic.top.event.MediaEvent.ON_READY))
        };
        this.notifyMediaBegin = function(){
            _ready = true;
            this.dispatchEvent(new emic.top.event.MediaEvent(emic.top.event.MediaEvent.ON_MEDIA_BEGIN))
        };
        this.notifyMediaEnd = function(){
            _ready = true;
            this.dispatchEvent(new emic.top.event.MediaEvent(emic.top.event.MediaEvent.ON_MEDIA_END))
        };

        this.notifyCue = function(data){
            var ev = new emic.top.event.MediaEvent(emic.top.event.MediaEvent.ON_CUE);
            ev.data = data;
            this.dispatchEvent(ev);
        };

        this.notifyMetadata = function(data){
            var ev = new emic.top.event.MediaEvent(emic.top.event.MediaEvent.ON_METADATA);
            ev.data = data;
            this.dispatchEvent(ev);
        };

        this.notifyError = function(id,data){
            var ev = new emic.top.event.MediaEvent(emic.top.event.MediaEvent.ON_ERROR);
            ev.idCode = id;

            if(data!=null)
                ev.data = data;

            this.dispatchEvent(ev);
        };

        this.notifyStatusChange = function(status){
            ev = new emic.top.event.MediaEvent(emic.top.event.MediaEvent.ON_STATUS_CHANGE);
            ev.data = {};
            ev.data.status = status;
            this.dispatchEvent(ev);
        };

        this.notifyVolumeChange = function(vol){
            ev = new emic.top.event.MediaEvent(emic.top.event.MediaEvent.ON_VOLUME_CHANGE);
            ev.data = vol;
            this.dispatchEvent(ev);
        };

        this.notifyProgress = function(current, total, bytesLoaded, bytesTotal){
            ev = new emic.top.event.MediaEvent(emic.top.event.MediaEvent.ON_PROGRESS);
            ev.data = {};
            ev.data.currentTime = current; //en segundos
            ev.data.totalTime = total;  //en segundos
            ev.data.bytesLoaded = bytesLoaded;
            ev.data.bytesTotal = bytesTotal;
            this.dispatchEvent(ev);
        };

        this.notifySeekStart = function(offset){
            ev = new emic.top.event.MediaEvent(emic.top.event.MediaEvent.ON_SEEK_START);
            ev.data = {};
            ev.data.offset = offset; //0..100
            this.dispatchEvent(ev);
        };

        this.notifySeekComplete = function(offset){
            ev = new emic.top.event.MediaEvent(emic.top.event.MediaEvent.ON_SEEK_COMPLETE);
            ev.data = {};
            ev.data.offset = offset; //0..100
            this.dispatchEvent(ev);
        };

        this.notifyBufferEmpty = function(){
            ev = new emic.top.event.MediaEvent(emic.top.event.MediaEvent.ON_BUFFER_EMPTY);
            this.dispatchEvent(ev);
        };

        this.notifyBufferFull = function(){
            ev = new emic.top.event.MediaEvent(emic.top.event.MediaEvent.ON_BUFFER_FULL);
            this.dispatchEvent(ev);
        };

        this.notifySwitchRequest = function(index){
            ev = new emic.top.event.MediaEvent(emic.top.event.MediaEvent.ON_SWITCH_REQUEST);
            ev.data = {};
            ev.data.index = index;
            this.dispatchEvent(ev);
        };

        this.notifySwitchComplete = function(index){
            ev = new emic.top.event.MediaEvent(emic.top.event.MediaEvent.ON_SWITCH_COMPLETE);
            ev.data = {};
            ev.data.index = index;
            this.dispatchEvent(ev);
        };

        this.notifyIsLiveStream = function(value){
            ev = new emic.top.event.MediaEvent(emic.top.event.MediaEvent.ON_IS_LIVE_STREAM);
            ev.data = value;
            this.dispatchEvent(ev);
        };

        //-- Notifica las renditions
        this.notifyRenditions = function(renditions){
            ev = new emic.top.event.MediaEvent(emic.top.event.MediaEvent.ON_RENDITIONS);
            ev.data = renditions;
            this.dispatchEvent(ev);
        };
        this.notifyID3TagPubli= function (id3tagPubli){
            ev = new emic.top.event.MediaEvent(emic.top.event.MediaEvent.ON_TAG);
            ev.data = id3tagPubli;
            this.dispatchEvent(ev);
        }


        //TODO: Crear notify para los switch de calidad (start y complete)


        // --------------- API -------------------------------
        // Estos métodos deben ser sobreescritos por el controlador que implemente esta interfaz
        // ---------------------------------------------------

        this.init = function(){};
        this.preload = function(){};
        this.reload = function(){};
        this.reset = function(){};
        this.kill = function(){};
        this.cancelInit = function(){};
        this.play = function(){};
        this.pause = function(){};
        this.playpause = function(){};
        this.resume = function(){};
        this.stop = function(){};
        this.switchUp = function(){};
        this.switchDown = function(){};
        this.switchDirect = function(id){};

        /**
         *
         * @param secs Valor en segundos
         */
        this.seek = function(secs){};

        this.seekLive = function(){};

        /**
         *
         * @param prop Valor entre 0 y 100
         */
        this.setVolume = function(prop){};
        this.onAutoSwitchChange = function(){};
    }

    namespace.MediaControllerBase = MediaControllerBase;

}(emic.top.media));
/**
 * Created by igomez on 21/07/2014.
 */
(function(namespace) {

    FlashController.prototype = new emic.top.media.MediaControllerBase();

    function FlashController(controller){

        emic.top.media.MediaControllerBase.call(this);

        var _data = {};
        var _flash;
        var _controller = controller;
        var _container;
        var _containerID;

        /////////////////////////////////////////////////////////
        //  CONSTANTES
        /////////////////////////////////////////////////////////
        var _URL_FLASH_CONTROLLER = "/psdmedia/resources/swf/psd/FlashController.swf";
        var _URL_EXPRESS_INSTALL = "/psdmedia/resources/swf/ext/expressInstall.swf";

        this.init = function(data){
            emic.top.debug("[FlashController.js][init]>> ",data);
            _data = data;
            emic.top["FlashInstance_" + _data.genericData.id] = this;
            _createFlashObj.apply(this);
        };

        this.reset = function(){
            emic.top.debug("[FlashController.js][reset]>> ");
            this.stop();
        };

        this.reload = function(){
            emic.top.debug("[FlashController.js][reload]>> ");
            var mediaObject = {},
                objWidth, objHeight;

            mediaObject.isLive = _data.mediaData.isLive;
            mediaObject.url = encodeURIComponent(_data.mediaData.url);
            mediaObject.id = _data.mediaData.id;
            mediaObject.idPlayer = _data.genericData.id;
            mediaObject.controller = _controller;
            mediaObject.mimetype = _data.mediaData.mimetype;
            mediaObject.autoplay = true; //El controlador siempre se inicia automáticamente. El autoplay se gestiona en TopPlayer y carga el player cuando toque
            mediaObject.clipBegin = _data.mediaData.clipBegin;
            mediaObject.clipEnd = _data.mediaData.clipEnd;
            mediaObject.absolute = _data.mediaData.absolute;

            emic.top.debug("[FlashController.js][reload]>> Se le pasa obj a flash:", mediaObject);

            if (_data.mediaData.mimetype.indexOf("audio") != -1){
                _flash.style.width = "1px";
                _flash.style.height = "1px";
            }else{
                _flash.style.visibility = "";
            }


            //TODO: Ojo! Da error raro al hacer esto cuando es un FlashController (sound), bloquea el js aún funcionando ok, metro try defensivo hasta que lo detectemos
            try {
                _flash.loadJS(mediaObject);
            }catch (e){
                //TODO: Gestión de errores en modo debug
            }
        };



        this.kill = function () {
            emic.top.debug("[FlashController.js][kill]>> ");
            //this.stop();
            swfobject.removeSWF(_containerID);
        };

        this.play = function(){
            emic.top.debug("[FlashController.js][play]>> ");
            try {
            _flash.playJS();
                }
            catch (er){

                }
        };
        this.pause = function(){
            emic.top.debug("[FlashController.js][pause]>> ");
            try {
            _flash.pauseJS();
                }
            catch (er){

            }
        };
        this.playpause = function(){
            emic.top.debug("[FlashController.js][playpause]>> ");
            try {
            _flash.playpauseJS();
                }
            catch (er){

            }
        };
        this.resume = function(){
            emic.top.debug("[FlashController.js][resume]>> ");
            //TODO: Cambiar por un resume real
            try {
            _flash.playpauseJS();
                }
            catch (er){

            }
        };


        this.stop = function(){
            emic.top.debug("[FlashController.js][stop]>> ");
            try {
            _flash.stopJS();
                }
            catch (er){

            }
        };
        this.switchUp = function(){
            emic.top.debug("[FlashController.js][switchUp]>> ");
            try {
            _flash.switchUpJS();
                }
            catch (er){

            }
        };
        this.switchDown = function(){
            emic.top.debug("[FlashController.js][switchDown]>> ");
            try {
            _flash.switchDownJS();
                }
            catch (er){

            }
        };
        this.switchDirect = function(id){
            emic.top.debug("[FlashController.js][switchDirect]>> ");
            try {
            _flash.switchDirectJS(id, false);
                }
            catch (er){

            }
        };
        /**
         *
         * @param offset Valor entre 0 y 100
         */
        this.seek = function(offset){
            emic.top.debug("[FlashController.js][seek]>> ",offset);
            try {
            _flash.seekJS(offset);
                }
            catch (er){

            }
        };
        /**
         *
         * @param offset Valor entre 0 y 100
         */
        this.setVolume = function(offset){
            emic.top.debug("[FlashController.js][setVolume]>> ",offset);
            try {
            _flash.setVolumeJS(offset);
                }
            catch (er){

            }
        };


        this.onAutoSwitchChange = function(value)
        {
            _flash.autoSwitchJS(value)
        };

        var _createFlashObj = function(){
            emic.top.debug("[FlashController.js][_createFlashObj]>> ");
            var i, container, objWidth,objHeight;


            _container = document.getElementById(_data.internalData.controllerContainers[_controller]);
            //Vaciamos el contenedor
            if(_container)
            {
                //Vaciamos el contenedor
                while(_container.firstChild) {_container.removeChild(_container.firstChild);}

                //Creamos una nueva capa para meter el flash dentro, ya que swfobj sustituye la capa por el objeto
                container = document.createElement('div');
                _containerID = "flashContainer_" + _data.genericData.id;
                container.id = _containerID;
                _container.appendChild(container);

                if (_data.mediaData.mimetype.indexOf("audio") != -1){
                    objHeight = "1px";
                    objWidth = "1px";
                }else{
                    objHeight = "100%";
                    objWidth = "100%";
                }

                //TODO: Completar todos los parámetros de Flash con los que lleguen en el _data
                var flashvars = {
                    isLive: _data.mediaData.isLive,
                    url: encodeURIComponent(_data.mediaData.url),
                    id: _data.mediaData.id,
                    idPlayer: _data.genericData.id,
                    controller: _controller,
                    mimetype: _data.mediaData.mimetype,
                    autoplay: _data.mediaData.autoplay,
                    clipBegin: _data.mediaData.clipBegin,
                    clipEnd: _data.mediaData.clipEnd,
                    absolute: _data.mediaData.absolute
                };
                var params = {
                    menu: "false",
                    allowFullscreen: "true",
                    allowScriptAccess: "always",
                    bgcolor: _data.uiData.bgColor,
                    wmode: _data.mediaData.wmode
                };
                var attributes = {
                    id:_containerID
                };

                for (i in _data.mediaData.controllerData) {
                    //TODO: Mirar el warning de Webstorm en  [i]
                    params["cdn_" + i] = _data.mediaData.controllerData[i];
                }

                var readyDef = (function (that){
                    return function(){
                        _onReady.apply(that)
                    }
                })(this);


                var urlFlashController = _data.genericData.urlBase ? (_data.genericData.urlBase + _URL_FLASH_CONTROLLER) : _URL_FLASH_CONTROLLER;
                var urlExpressInstall = _data.genericData.urlBase ? (_data.genericData.urlBase + _URL_EXPRESS_INSTALL) : _URL_EXPRESS_INSTALL;

                emic.top.debug("[FlashController.js][_createFlashObj]>> Se crea flash con los siguientes datos:", {"urlFlashController":urlFlashController,"container":container.id, "ancho":objWidth, "alto":objHeight, "flashvars":flashvars, "params":params, "attributes":attributes});

                swfobject.embedSWF(urlFlashController,container.id, objWidth, objHeight, "10.0.0",urlExpressInstall,flashvars, params, attributes, readyDef);

            }else{
                //TODO: Control de errores: No container
            }
        };

        var _onReady = function(e){
            emic.top.debug("[FlashController.js][_onReady]>> ");
            _flash = document.getElementById(_containerID);
            if (_data.mediaData.mimetype.indexOf("audio") != -1){
                _flash.style.width = "0px";
                _flash.style.height = "0px";
            }else{
                _flash.style.visibility = "";
            }
        };

        //-- Parsea las calidades para que sean compatibles con las renditions de los skin y comprueba los baremos
        var parseQualityCombo = function (data) {


            var QualityInfo,QualitySelect, ParseBitrate, QualityAuto, QualityCloneExternal = "", QualityCloneInternal = "",
                QualityArray = [], QualitySendArray = [{bitrate: 0, label: "Auto"}],QualityNull = [{bitrate: 0, label: "vacio"}],
                record = -1,
                QualityExternalTextArray = [
                    {calidad: "144p", bitrate: 50000},
                    {calidad: "240p", bitrate: 300000},
                    {calidad: "360p", bitrate: 400000},
                    {calidad: "480p", bitrate: 500000},
                    {calidad: "720p", bitrate: 1500000},
                    {calidad: "1080p", bitrate: 3000000},
                    {calidad: "2160p", bitrate: 4500000}
                ],
                QualityInternalTextArray = [
                    {calidad: "240p", size: 320},
                    {calidad: "360p", size: 640},
                    {calidad: "480p", size: 720},
                    {calidad: "720p", size: 1280},
                    {calidad: "1080p", size: 1920},
                    {calidad: "2160p", size: 3840}
                ];


            for (QualityInfo in data) {


                ParseBitrate = data[QualityInfo];


                //-- Traducimos calidades dependiendo de las renditions que nos llegue y hacemos el cambio si llega el width del objeto

                if (ParseBitrate.width == 0) {

                    for (QualitySelect in QualityExternalTextArray) {


                        if (ParseBitrate.bitrate >= QualityExternalTextArray[QualitySelect].bitrate) {

                            record++;

                        }
                    }

                } else {

                    for (QualitySelect in QualityInternalTextArray) {


                        if (ParseBitrate.width >= QualityInternalTextArray[QualitySelect].size) {

                            record++;

                        }
                    }


                }

                /*   //-- En caso de no ser compatible con ninguna resolucion se pone baja por defecto
               if (record == 0) {
                    record = 1;
                }*/

                //-- En caso de ser Audio no pintamos su rendition
                if (!ParseBitrate.audio) {

                    if (ParseBitrate.width == 0) {

                        QualityArray[QualityInfo] = {
                            bitrate: ParseBitrate.bitrate,
                            label: (QualityExternalTextArray[record].calidad == QualityCloneExternal) ? QualityExternalTextArray[record].calidad + "+" : QualityExternalTextArray[record].calidad
                        };
                        QualityCloneExternal = QualityExternalTextArray[record].calidad; //--guardamos el valos por si es igual para aniadirle un +
                    } else {


                        QualityArray[QualityInfo] = {
                            bitrate: ParseBitrate.bitrate,
                            label: (QualityInternalTextArray[record].calidad == QualityCloneInternal) ? QualityInternalTextArray[record].calidad + "+" : QualityInternalTextArray[record].calidad
                        };
                        QualityCloneInternal = QualityInternalTextArray[record].calidad; //--guardamos el valos por si es igual para aniadirle un +
                    }
                }

                record = -1;

            }


            //--Insertar opcion de Auto en la array

            //-- En caso de que solo halla una calidad lo dejamos en Auto
            if (QualityArray.length > 1) {
                QualityAuto = QualitySendArray.concat(QualityArray);
            } else {

                //QualityAuto = QualitySendArray;
                QualityAuto = QualityNull;
            }


            //_data.mediaData.renditions = QualityAuto.reverse();

            return QualityAuto.reverse();



        };

        /////////////////////////////////////////////////////////
        //  CALLs from SWF
        /////////////////////////////////////////////////////////


        this.notifyMediaBeginSWF = function(data){
            emic.top.debug("[FlashController.js][notifyMediaBeginSWF]>> ");

            if (typeof (data[0]) != "undefined" && data != "") {

                //-- Notifica las renditions al skin y parsea las calidades correspondientes
                this.notifyRenditions(parseQualityCombo(data));

            }

            this.notifyMediaBegin();

        };

        this.notifyMediaEndSWF = function(){
            emic.top.debug("[FlashController.js][notifyMediaEndSWF]>> ");
            this.notifyMediaEnd();
        };

        this.notifyBufferEmptySWF = function(){
            emic.top.debug("[FlashController.js][notifyBufferEmptySWF]>> ");
            this.notifyBufferEmpty();
        };

        this.notifyBufferFullSWF = function(){
            emic.top.debug("[FlashController.js][notifyBufferFullSWF]>> ");
            this.notifyBufferFull();
        };

        this.notifySeekStartSWF = function(offset){
            emic.top.debug("[FlashController.js][notifySeekStartSWF]>> ",offset);
            this.notifySeekStart(offset);
        };

        this.notifySeekCompleteSWF = function(offset){
            emic.top.debug("[FlashController.js][notifySeekCompleteSWF]>> ",offset);
            this.notifySeekComplete(offset);
        };

        this.notifySwitchRequestSWF = function(index){
            emic.top.debug("[FlashController.js][notifySwitchRequestSWF]>> ",index);
            this.notifySwitchRequest(index);
        };

        this.notifySwitchCompleteSWF = function(index){
            emic.top.debug("[FlashController.js][notifySwitchCompleteSWF]>> ",index);
            this.notifySwitchComplete(index);
        };

        this.notifyReadySWF = function(){
            emic.top.debug("[FlashController.js][notifyReadySWF]>>");
            this.notifyReady();
        };

        this.notifyMetadataSWF = function(data){
            emic.top.debug("[FlashController.js][notifyMetadataSWF]>> ",data);
            this.notifyMetadata(data);
        };

        this.notifyErrorSWF = function(id){
            emic.top.debug("[FlashController.js][notifyErrorSWF]>> ",id);
            this.notifyError(id);
        };

        this.notifyVolumeChangeSWF = function(vol){
            emic.top.debug("[FlashController.js][notifyVolumeChangeSWF]>> ",vol);
            this.notifyVolumeChange(vol);
        };

        this.notifyStatusChangeSWF = function(status){
            emic.top.debug("[FlashController.js][notifyStatusChangeSWF]>> ",status);
            var estado = -1;

                switch (status) {

                    case 0:
                        estado = emic.top.MediaModule.STATUS_INITIALIZING;
                        break;
                    /*case 1:
                        estado = emic.top.MediaModule.STATUS_STOP;
                        break;*/
                    case 2:
                        estado = emic.top.MediaModule.STATUS_PLAY;
                        break;
                    case 3:
                        estado = emic.top.MediaModule.STATUS_PAUSE;
                        break;
                }


                if (this.isReady() && (estado != -1))
                    this.notifyStatusChange(estado);

        };

        this.notifyProgressSWF = function(current, total, bytesLoaded, bytesTotal){
            this.notifyProgress(current, total, bytesLoaded, bytesTotal);


        };

        this.notifyIsLiveStreamSWF = function(value){
            emic.top.debug("[FlashController.js][notifyIsLiveStreamSWF]>> ",value);
            this.notifyIsLiveStream(value);
        };


    }

    namespace.FlashController = FlashController;

})(emic.top.media);/**
 * Created by IGomezG on 5/02/14.
 * NOTA: Lo mismo es muy enrevesado el uso de closures para mantener la encapsulación de la función.
 * Ese lío se solucionará cuando Triton incorpore la posibilidad de especificar un scope en
 * su addEventListener
 */
(function (namespace){

    window.tdPlayerApiReady = function(){
        namespace.directInstance.onTritonLoaded();
    };


    // Inheritance class
    TritonController.prototype = new emic.top.media.MediaControllerBase();

    TritonController.tritonLoaded = false;

    TritonController.ERROR_ID_MODULES = 001;

    //TODO: Playpause no funciona
    //TODO: Mirar si se le puede especificar a Triton con qué controlador conectar (flash, html5) para hacer caso a la prioridad de la API de MediaModule
    //TODO: La publicidad de Triton debe poder desactivarse según adData.enabled
    //TODO: IMPORTANTE PLAYSER: Ver cómo hacer para que se vean las campañas de publicidad de Triton en adData.container
    //TODO: Sacar trazas internas (como mucho guardarlas con un debug = true)
    //TODO: IMPORTANTE PLAYSER: Probar con instream real (pedir juego de pruebas)
    function TritonController(){


        emic.top.media.MediaControllerBase.call(this);

        var _that = this;

        var _data;
        var _deferredData = function(){
            return _data;
        };

        var _cancelInit = false;
        var _deferredCancelInit = function (){
            return _cancelInit;
        };

        var _container;
        var _player;
        // Almacena el tiempo definido para el último banner recibido
        var _lastAdTime = 0;

        var _timeout = null;

        var _RETRY_TIME_INI = 5000;
        var _RETRY_TIME_INC = 3000;
        var _RETRY_TIME_TOP = 5000;
        var _TIME_AUTODISCONNECT = 120;  //En minutos

        var _retryTime = _RETRY_TIME_INI;

        var _getLastTime = function(){return _lastAdTime};

        var _testCampana1, _testCampana2, _testCampana3;

        var _playbackStarted = false; //Flag MediaBegin

        var _onStatus = (function(that){

            return function(ev){
                var estado = ev.data.code;
                emic.top.debug("[TritonController.js][_onStatus]>> ",ev.data.code);

                switch (ev.data.code){
                    case "LIVE_STOP":
                        //A veces llega un STOP tras un reset y falla, no mandamos evento porque en un live no es necesario
                        estado = emic.top.MediaModule.STATUS_STOP;
                        //that.notifyMediaEnd();
                        break;
                    case "LIVE_PAUSE":
                        estado = emic.top.MediaModule.STATUS_PAUSE;
                        break;
                    case "LIVE_PLAYING":
                        if (_data.internalData.position != emic.top.TopPlayer.POSITION_MEDIA){
                            this.pause();
                        }else{
                            estado = emic.top.MediaModule.STATUS_PLAY;
                            if(!_playbackStarted)
                            {
                                that.notifyMediaBegin();
                                _playbackStarted = true;
                            }
                        }
                        break;

                    case "LIVE_FAILED":
                        that.notifyError(emic.top.MediaModule.ERROR_LIVE_FAILED,ev.data);
                        break;
                    case "STREAM_GEO_BLOCKED":
                        that.notifyError(emic.top.MediaModule.ERROR_STREAM_GEO_BLOCKED,ev.data);
                        break;
                    case "STATION_NOT_FOUND":
                        that.notifyError(emic.top.MediaModule.ERROR_STATION_NOT_FOUND,ev.data);
                        break;
                }

                //envía la notificación de estado, solo cuando está en la posición "posicionMedia", o cuando está en publicidad y la variable "estado= pause";
                if ((_data.internalData.position == emic.top.TopPlayer.POSITION_MEDIA) || ((_data.internalData.position == emic.top.TopPlayer.POSITION_AD_PREROLL) && (estado=="pause"))) {
                    that.notifyStatusChange(estado);
                }
            }
        })(this);

        var _onReady = (function(that){
            return function(){
                emic.top.debug("[TritonController.js][_onReady]>> ");
                //ignoramos el evento de ready si se cancelo la inicialización
                if (!_cancelInit) {

                    _player.addEventListener('stream-status', _onStatus);
                    _player.addEventListener('ad-break-cue-point', _onAdBreak);
                    //_player.addEventListener('d-break-cue-point-complete', _onAdBreakComplete);
                    _player.addEventListener('ad-break-synced-element', _onSyncAdStart);
                    _player.addEventListener('video-mid-roll-playback-start', _onVideoMidStart);
                    _player.addEventListener('video-mid-roll-playback-complete', _onVideoMidComplete);
                    _player.addEventListener('track-cue-point', _onTrackCuePoint);

                    _player.addEventListener('timeout-alert', _onTimeoutAlert);
                    _player.addEventListener('timeout-reach', _onTimeoutReach);
                    _player.addEventListener('stream-config-error', _onStreamConfigError);
                    _player.addEventListener('stream-error', _onStreamError);
                    _player.addEventListener('configuration-error', _onConfiguracionError);
                    that.notifyReady();
                }
            }
        })(this);

        var _onModuleError = (function(that){
            return function(){
                emic.top.debug("[TritonController.js][_onModuleError]>> ");
                that.notifyError(TritonController.ERROR_ID_MODULES);
            }
        })(this);

        var _onTimeoutAlert = (function(that){
            return function(e){
                emic.top.debug("[TritonController.js][_onTimeoutAlert]>> ", e.data);
                that.notifyError(emic.top.MediaModule.ERROR_TIMEOUT_ALERT, {code:e.data.errors[0]._code,status: e.data.errors[0]._message});
            }
        })(this);

        var _onTimeoutReach = (function(that){
            return function(e){
                emic.top.debug("[TritonController.js][_onTimeoutReach]>> ", e.data);
                that.notifyError(emic.top.MediaModule.ERROR_TIMEOUT_ALERT, {code:e.data.errors[0]._code,status: e.data.errors[0]._message});
            }
        })(this);

        var _onStreamConfigError = (function(that){
            return function(e){
                emic.top.debug("[TritonController.js][_onStreamConfigError]>> ", e.data);
                that.notifyError(emic.top.MediaModule.ERROR_TIMEOUT_ALERT, {code:e.data.errors[0]._code,status: e.data.errors[0]._message});
            }
        })(this);

        var _onStreamError = (function(that){
            return function(e){
                emic.top.debug("[TritonController.js][_onStreamError]>> ", e.data);
                that.notifyError(emic.top.MediaModule.ERROR_TIMEOUT_ALERT, {code:e.data.errors[0]._code,status: e.data.errors[0]._message});
            }
        })(this);

        var _onConfiguracionError = (function(that){
            return function(e){
                emic.top.debug("[TritonController.js][_onConfiguracionError]>> ", e.data);
                that.notifyError(emic.top.MediaModule.ERROR_CONFIGURATION_ERROR,{code:e.data.errors[0]._code,status: e.data.errors[0]._message});
            }
        })(this);

        var _onTrackCuePoint = (function(that){
            return function(e){
                emic.top.debug("[TritonController.js][_onTrackCuePoint]>> ", e.data);
                that.notifyCue(e.data);

            }
        })(this);

        var _onSyncAdStart = (function(topData, getLastTime){
            return function(ev){
                emic.top.debug("[TritonController.js][_onAdSyncStart]>> ", ev);
                var cadena, cid, evData;
                //Sacamos el identificador de campaña de la url del banner (cid=*******)
                try{
                    cadena = ev.data.data.url;
                    cid = cadena.match(/\&cid=([^\&]*)&/)[1];
                }
                catch (er){
                    cid = "Unable to retrieve ID";
                }

                if (topData().internalData.adModule) {
                    evData = {};
                    evData.provider = emic.top.AdModule.PROVIDER_TRITON;
                    evData.internalData = ev;
                    evData.name = cid;
                    evData.adType = emic.top.AdModule.ADTYPE_INSTREAM;

                    topData().internalData.adModule.externalNotify(emic.top.event.AdEvent.ON_AD_INSTREAM_START,evData,ev.data.id);
                }


                setTimeout(function(){
                    emic.top.debug("[TritonController.js][_onAdSyncStart]>> End timeout banner");
                    if (topData().internalData.adModule) {
                        evData = {};
                        evData.provider = emic.top.AdModule.PROVIDER_TRITON;
                        evData.internalData = ev;
                        evData.name = cid;
                        evData.adType = emic.top.AdModule.ADTYPE_INSTREAM;
                        topData().internalData.adModule.externalNotify(emic.top.event.AdEvent.ON_AD_INSTREAM_END,evData,ev.data.id);
                    }
                }, getLastTime());
            };
        })(_deferredData, _getLastTime);

        var _onAdBreak = (function(that){
            return function(ev){
                emic.top.debug("[TritonController.js][_onAdBreak]>> ",ev);
                try{
                    _lastAdTime = ev.data.adBreakData.duration;
                }catch(er){
                    //TODO: GEstión de errores
                }

            };
        })(this);

        var _onVideoMidStart = (function(topData){
            return function(ev){
                emic.top.debug("[TritonController.js][_onVideoMidStart]>> ", ev);
                if (topData().internalData.adModule) {
                    var evData = {};
                    evData.internalData = ev;
                    evData.provider = emic.top.AdModule.PROVIDER_TRITON;
                    evData.adType = emic.top.AdModule.ADTYPE_VIDEO;
                    //TODO: Ver si podemos sacar el nombre del video
                    //evData.data.name = ???
                    topData().internalData.adModule.externalNotify(emic.top.event.AdEvent.ON_AD_VIDEO_START,evData);
                }
            };
        })(_deferredData);

        var _onVideoMidComplete = (function(topData){
            return function(ev){
                emic.top.debug("[TritonController.js][_onVideoMidComplete]>> ", ev);
                if (topData().internalData.adModule) {
                    var evData = {};
                    evData.internalData = ev;
                    evData.provider = emic.top.AdModule.PROVIDER_TRITON;
                    evData.adType = emic.top.AdModule.ADTYPE_VIDEO;
                    //TODO: Ver si podemos sacar el nombre del video
                    //evData.data.name = ???
                    topData().internalData.adModule.externalNotify(emic.top.event.AdEvent.ON_AD_VIDEO_END,evData);
                }
            };
        })(_deferredData);

        var _forzarCampana = function(){
            emic.top.debug("[TritonController.js][_forzarCampana]>> ");
            var that = this,
                evData = {},
                topData = _data;
            document.body.style.fontSize="24px";
            document.getElementById(_data.mediaData.controllerData.container_banner_bigbox).style.backgroundColor = "#00ff00";
            document.getElementById(_data.mediaData.controllerData.container_banner_bigbox).style.width = "300px";
            document.getElementById(_data.mediaData.controllerData.container_banner_bigbox).style.height = "250px";
            document.getElementById(_data.mediaData.controllerData.container_banner_bigbox).style.display = "none";
            document.getElementById(_data.mediaData.controllerData.container_banner_leaderboard).style.backgroundColor = "#ffff00";
            document.getElementById(_data.mediaData.controllerData.container_banner_leaderboard).style.width = "728px";
            document.getElementById(_data.mediaData.controllerData.container_banner_leaderboard).style.height = "90px";
            document.getElementById(_data.mediaData.controllerData.container_banner_leaderboard).style.display = "none";


            var elementos = [_data.mediaData.controllerData.container_banner_bigbox,_data.mediaData.controllerData.container_banner_leaderboard];
            var id = elementos[Math.floor(Math.random() * 1.99999)];

            if (_data.internalData.adModule) {
                evData = {};
                evData.internalData = {};
                evData.provider = "TestProvider";
                evData.internalData.id = id;
                evData.name = id;
                evData.adType = emic.top.AdModule.ADTYPE_INSTREAM;
                _data.internalData.adModule.externalNotify(emic.top.event.AdEvent.ON_AD_INSTREAM_START,evData,id);
            }

            setTimeout(function(){
                if (topData.internalData.adModule) {
                    evData = {};
                    evData.internalData = {};
                    evData.provider = "TestProvider";
                    evData.internalData.id = id;
                    evData.name = id;
                    evData.adType = emic.top.AdModule.ADTYPE_INSTREAM;
                    topData.internalData.adModule.externalNotify(emic.top.event.AdEvent.ON_AD_INSTREAM_END,evData,id);
                }
            }, 10000);
        };

        //TODO: Revisar si se puede desactivar (quizás cuando la constante es 0?)
        var _initDurationTimer = function(){
            emic.top.debug("[TritonController.js][_initDurationTimer]>> ");
            if (_timeout){
                clearTimeout(_timeout);
            }
            var stopRadio = (function(that){
                return function(){
                    emic.top.debug("[TritonController.js][stopRadio]>> Detenemos emisión tras " + _TIME_AUTODISCONNECT + "minutos");
                    that.stop();
                    that.notifyMediaEnd();
                };
            })(this);
            _timeout = setTimeout(stopRadio,_TIME_AUTODISCONNECT * 60 * 1000); //Llega en minutos
        };


        // ------------- API -------------

        this.loadTritonAPI = function(){
            emic.top.debug("[TritonController.js][loadTritonAPI]>> Iniciando peticion de librerías a Triton");

            var nuevo = document.createElement('script');
            nuevo.setAttribute("type", "text/javascript");


            if (_data.mediaData.controllerData.version == "2.4"){
                nuevo.setAttribute("data-dojo-config", "async: 1, tlmSiblingOfDojo: 0, deps:['tdapi/run']");
                nuevo.setAttribute("src", "//eu-playerservices.streamtheworld.com/tdplayerapi/2.4/dojo/dojo.js");
            }else{
                nuevo.setAttribute("src", "//sdk.listenlive.co/web/v/2.9.19-183/td-sdk.min.js");
                nuevo.setAttribute("id", "triton-sdk");
            }

            nuevo.onload = function(){
                _connect.apply(_that);
            }

            document.getElementsByTagName('head')[0].appendChild(nuevo);

            namespace.tritonScriptCreated = true;
        };

        this.cancelInit = function(){
            emic.top.debug("[TritonController.js][cancelInit]>> ");
            //TODO: Cancelar load de Triton
            _cancelInit = true;
            if (_testCampana1) clearInterval(_testCampana1);
            if (_testCampana2) clearInterval(_testCampana2);
            if (_testCampana3) clearInterval(_testCampana3);

        };

        this.preload = function () {
            emic.top.debug("[TritonController.js][preload]>> ");
            this.play();
            this.pause();
        };

        this.init = function(data) {
            emic.top.debug("[TritonController.js][init]>> ",data);
            _cancelInit = false;

            _data = data;

            //Carga de campañas falsas: DEBUG
            if (_data.mediaData.controllerData.debugInStream) {
                var deferred = (function (that) {
                    return function () {
                        _forzarCampana.apply(that)
                    }
                })(this);
                var deferred2 = (function (that) {
                    return function () {
                        _onVideoMidStart.apply(that)
                    }
                })(this);
                var deferred3 = (function (that) {
                    return function () {
                        _onVideoMidComplete.apply(that)
                    }
                })(this);

                _testCampana1 = setInterval(deferred, 14000, this);
                _testCampana2 = setInterval(deferred2, 23000);
                setTimeout(function () {
                    _testCampana3 = setInterval(deferred3, 23000)
                }, 7000);
            }


            // Esto es neecesario puesto que el callback de inicialización de las dependencias de Triton
            // ha de definirse en window.tdPlayerApiReady de forma obligada. Esta referencia guarda el contexto
            // de la última instancia creada
            namespace.directInstance = this;

            if (!namespace.tritonScriptCreated) {
                this.loadTritonAPI(this);
            }else{
                _init.apply(this);
            }

        };

        //A este método se llama tras la llegada del callback de la petición a las dependencias de Triton
        this.onTritonLoaded = function(){
            emic.top.debug("[TritonController.js][onTritonLoaded]>> Librerías de Triton cargadas");
            _init.apply(this);
        };


        var _init = function(){
            emic.top.debug("[TritonController.js][_init]>> ");
            if (!_cancelInit) {
                var connectDef = (function (that, data, cancelInit) {
                    return function () {
                        if ((!that.isReady()) && (!cancelInit())) {
                            emic.top.debug("[TritonController.js][connectDef]>> Retrying Triton modules loading, next call in:", _retryTime / 1000, "segs");
                            that.init(data);
                        }
                    }
                })(this, _data, _deferredCancelInit);
                setTimeout(connectDef, _retryTime);
                if (_retryTime < _RETRY_TIME_TOP) {
                    _retryTime += _RETRY_TIME_INC;
                }

                _connect.apply(this);
            }
        };

        var _connect = function(){
            emic.top.debug("[TritonController.js][_connect]>> ");

            var config, elements, px, tdPlayerVersion, _trackingParameters;

            _container = document.getElementById(_data.internalData.controllerContainers[emic.top.MediaModule.CONTROLLER_TYPE_TRITON]);
            if (_container) {

                //Triton da problemas de conexión sordos con display "none" o con height y width == 0
                if (_data.mediaData.controllerData.compatibleContainer) {
                    if (_container.style.display == "none") {
                        _container.style.display == "";
                        _container.style.height == "1px";
                    }

                    px = _container.style.width;
                    if ((px.indexOf("px") == 0) || (px == "0px") || (px == "")) {
                        px = _container.style.width = "1px";
                    }

                    px = _container.style.height;
                    if ((px.indexOf("px") == 0) || (px == "0px") || (px == "")) {
                        px = _container.style.height = "1px";
                    }
                }

                elements = [];
                if (_data.mediaData.controllerData.container_banner_bigbox) {
                    elements.push({
                        id: _data.mediaData.controllerData.container_banner_bigbox,
                        width: 300, height: 250
                    });
                }
                if (_data.mediaData.controllerData.container_banner_leaderboard) {
                    elements.push({
                        id: _data.mediaData.controllerData.container_banner_leaderboard,
                        width: 300, height: 250
                    });
                }

                tdPlayerVersion = (_data.mediaData.controllerData.version == "2.4")?  "tdplayer-api-3.0.swf":"tdplayer-api-4.0.swf";

                _trackingParameters = {};
                if (!getDevice().mobile)
                {
                    _trackingParameters = { user:{ streamtheworld_user:1} }
                }

                config = {
                    coreModules: [
                        {
                            id: 'MediaPlayer',
                            playerId: _data.internalData.controllerContainers[emic.top.MediaModule.CONTROLLER_TYPE_TRITON],
                            //tdPlayerPath:'http://api.listenlive.co/tdplayerapi/swf/' + tdPlayerVersion,
                            //moduleDir:'http://api.listenlive.co/playercore/swf/',
                            isDebug: false,
                            plugins: [
                                {id: "vastAd"}
                            ],
                            defaultTrackingParameters:_trackingParameters,
                            sbm:{ active:true, aSyncCuePointFallback:true }
                        },
                        {
                            id: 'SyncBanners',
                            keepElementsVisible: false,
                            elements: elements
                            /* elements:[
                             {
                             id:_data.mediaData.controllerData.container_banner_bigbox,
                             width:300, height:250
                             },
                             {
                             id:_data.mediaData.controllerData.container_banner_leaderboard,
                             width:728, height:90
                             }]*/
                        }
                    ]};

                emic.top.debug("[TritonController.js][_connect]>> Config Triton", config);


                var tdPlayerConfig = {
                    coreModules: [
                        {
                            id: 'MediaPlayer',
                            playerId: _data.internalData.controllerContainers[emic.top.MediaModule.CONTROLLER_TYPE_TRITON],
                            //tdPlayerPath:'http://api.listenlive.co/tdplayerapi/swf/' + tdPlayerVersion,
                            //moduleDir:'http://api.listenlive.co/playercore/swf/',
                            isDebug: false,
                            plugins: [
                                {id: "vastAd"}
                            ],
                            defaultTrackingParameters:_trackingParameters,
                            sbm:{ active:true, aSyncCuePointFallback:false },
                            techPriority:['Html5','Flash']
                        },
                        {
                            id: 'SyncBanners',
                            keepElementsVisible: false,
                            elements: elements
                            /* elements:[
                             {
                             id:_data.mediaData.controllerData.container_banner_bigbox,
                             width:300, height:250
                             },
                             {
                             id:_data.mediaData.controllerData.container_banner_leaderboard,
                             width:728, height:90
                             }]*/
                        }
                    ],
                    // The callbacks are defined in your source code.
                    playerReady: _onReady,
                    configurationError: function(){
                        emic.top.debug("[TritonController.js] Error de configuracion TAP")
                    },
                    moduleError: _onModuleError,
                    adBlockerDetected: function(){
                        emic.top.debug("[TritonController.js] AdBlock detectado")
                    }
                };
                _player = new TDSdk( tdPlayerConfig );

                this.notifyStatusChange(emic.top.MediaModule.STATUS_INITIALIZING);
            }else{
                this.notifyError(emic.top.MediaModule.ERROR_NO_CONTAINER);
            }
        };

        this.play = function(){
            emic.top.debug("[TritonController.js][play]>> ");
            if (_data.mediaData.id && _player){
                _play.apply(this);
            }
        };

        var _play = function(){
            emic.top.debug("[TritonController.js][_play]>> ", _data.mediaData.id);
            _player.initMediaElement();

            if (_player.play){
//                _player.play({mount:_data.mediaData.id, connectionType:'hdAlternate'});

                if (_data.mediaData.controllerData.version == "2.4")
                    _player.play({mount:_data.mediaData.id, connectionType:'normalConnection'});  //2.4
                else{
                    var _trakingParams = {csegid:2000};
                    /*if((typeof(mm_dist)!="undefined")&&(mm_dist!=null)){
                        _trakingParams.dist = mm_dist;
                    }*/

                    _player.play({station: _data.mediaData.id,trackingParameters:_trakingParams});
                }

                this.notifyStatusChange(emic.top.MediaModule.STATUS_PLAY);
            }
            // 2.3 _player.play(_data.mediaData.id, 'hdAlternate');
        };

        this.pause = function(){
            emic.top.debug("[TritonController.js][pause]>> ");
            if (_player.pause)_player.pause();
            this.notifyStatusChange(emic.top.MediaModule.STATUS_PAUSE);
        };

        this.resume = function(){
            emic.top.debug("[TritonController.js][resume]>> ");
            if (_player.resume)_player.resume();
        };

        this.stop = function(){
            emic.top.debug("[TritonController.js][stop]>> ");
            if(typeof(_player)!= "undefined"){
                if (_player.stop) _player.stop();
            }
            this.notifyStatusChange(emic.top.MediaModule.STATUS_STOP);
        };

        this.setVolume = function(offset){
            emic.top.debug("[TritonController.js][setVolume]>> ",offset);
            if (this.isReady()){
                _player.setVolume(offset);
                //Desconocemos si Triton dispone de evento onVolume Change, lo damos como cambiado
                this.notifyVolumeChange(offset);
            }
        };

        //TODO: El mute ya no está definido en la interfaz puesto que se controla desde MediaModule canalizandolo por un setVolume(0) o al valor anterior, cuando esté terminado borrar el método
        this.mute = function(flag){
            emic.top.debug("[TritonController.js][mute]>> ",flag);
            if (_player)
                if (flag){
                    _player.mute();
                }else{
                    _player.unMute();
                }
        };

        this.reset = function () {
            emic.top.debug("[TritonController.js][reset]>> ");
            this.stop();
        };

        this.reload = function () {
            emic.top.debug("[TritonController.js][reload]>> ");
            this.stop();
            _player.play({mount:_data.mediaData.id, connectionType:'normalConnection'});

            if(getDevice().mobile)
                _play();

            this.notifyReady();
        };

        this.kill = function () {
            emic.top.debug("[TritonController.js][kill]>> ");
            this.stop();
            if(_container)
            {
                while(_container.firstChild) {_container.removeChild(_container.firstChild);}
                //TODO: En el caso de que haya _data.mediaData.controllerData.compatibleContainer dejar el style tal y como estaba
            }

            if (_testCampana1) clearInterval(_testCampana1);
            if (_testCampana2) clearInterval(_testCampana2);
            if (_testCampana3) clearInterval(_testCampana3);

            _player = undefined;
        };
    }

    namespace.TritonController = TritonController;

}(emic.top.media));
/**
 * Created by IGomezG on 28/07/14.
 */

(function(namespace) {
    
    // Inheritance class
    HTML5Controller.prototype = new emic.top.media.MediaControllerBase();

    /**
     * Wrapper que permite la compatibilidad del reproductor multimedia.
     * @constructor
     */
    function HTML5Controller()
    {

        //TODO: Cambiar todos los if(typeof(_mediaTag)!="undefined" por un evento de carga (ready, etc) y protegerlo desde MediaModule
        //TODO: BUG: Las segundas entradas en el controller no hacen autoplay

        // Super
        emic.top.media.MediaControllerBase.call(this);
        
        /**
         * className psd.media.wrappers.HTML5Controller
         */
        this.className = "emic.top.media.HTML5Controller";
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

        // 
        var _data = {};

        var _playing = false;

        // 
        var _playbackStarted = false;

        //
        var _mediaTag;

        var _onMediaEvent = function(evt) {
            if (evt.type != "timeupdate")
                emic.top.debug("[HTML5Controller.js][_onMediaEvent]>> ", evt.type);
            switch(evt.type) {
                
                case "playing":
                    if(!_playbackStarted) {
                        if (this.isBeginAllowed(_data)) {
                            _playbackStarted = true;
                            this.notifyMediaBegin();
                            this.notifyStatusChange(emic.top.MediaModule.STATUS_PLAY);
                            //todo: Ver si necesamos un notifyMediaBegin
                            //this.dispatchEvent(new psd.media.MediaEvent(psd.media.MediaEvent.MEDIA_BEGIN, {duration: _mediaTag.duration}));

                        } else {
                            this.stop();
                        }
                    }
                    
                    if (!_playing){
                        _playing = true;
                        this.notifyStatusChange(emic.top.MediaModule.STATUS_PLAY);
                        //TODO: On metadata {duration: _mediaTag.duration}
                        //this.dispatchEvent(new psd.media.MediaEvent(psd.media.MediaEvent.MEDIA_START, {duration: _mediaTag.duration}));
                    }

                    this.notifyBufferFull();
                break;
                
                case "pause":
                    if (_playing){
                        _playing = false;
                        this.notifyStatusChange(emic.top.MediaModule.STATUS_PAUSE);
                    }
                break;
                
                case "ended":
                    if(_playbackStarted){
                        _playbackStarted = false;
                        this.notifyMediaEnd();
                        this.notifyStatusChange(emic.top.MediaModule.STATUS_STOP);

                    }
                break;
                    
                case "timeupdate":
                    if(_mediaTag!=undefined)
                    {
                        this.notifyProgress(_mediaTag.currentTime, _mediaTag.duration);

                        //NOTA: Para algunos navegadores (por ejemplo: Samsung S4 y navegador nativo) le llega en duration el valor 0 en lugar de Infinity
                        if ((_mediaTag.duration == Infinity) || (_mediaTag.duration == 0)){this.notifyIsLiveStream(true);}
                        else {this.notifyIsLiveStream(false);}
                    }
                break;
                    
                case "waiting":
                    this.notifyBufferEmpty();
                break;
                case "volumechange":
                    if(typeof (_mediaTag)!= "undefined"){
                        this.notifyVolumeChange(_mediaTag.volume);
                    }
                break;
                case "error":
                    //TODO: Recuperar identificador o mensaje
                    this.notifyError();
                break;
               
            }
        };
        
        
        //Devuelve la url con el token, si es que tuviera
        var _getURL = function (srcHTML5)
        {
            emic.top.debug("[HTML5Controller.js][_getURL]>> ",srcHTML5);
            var separador, token, url;
            
            if (_data.authParamsHTML5 != undefined)
            {
                separador = (srcHTML5.indexOf("?") == -1)? "?":"&";
                token = separador + _data.authParamsHTML5;
            }
            else token = "";

            url = srcHTML5 + token;
            
            return url;
        };
        
        var _init = function() {
            emic.top.debug("[HTML5Controller.js][_init]>> ");

            _createElement.apply(this);
            this.notifyReady();     //TODO: Sólo en el caso de que exista un mediaTag, si no habría que lanzar un error que capturaria MediaModule
        };

        var _createElement = function(){
            var playerContainer = document.getElementById(_data.internalData.controllerContainers[emic.top.MediaModule.CONTROLLER_TYPE_HTML5NATIVE]),
                srcHTML5,
                playerWidth = "100%",
                playerHeight = "100%",
                bgColor;


            //initializing


            //Tomará siempre 100%, el tamaño del video lo define la capa padre del player
//            if(typeof(_data.genericData.width)!="undefined") {playerWidth = _data.genericData.width;}
//            if(typeof(_data.genericData.height)!="undefined") {playerHeight = _data.genericData.height;}



            if(_data.mediaData.mimetype.indexOf("audio")!=-1)
            {
                _mediaTag = document.createElement("audio");
            }

            if(_data.mediaData.mimetype.indexOf("video")!=-1)
            {
                _mediaTag = document.createElement("video");
            }

            if(typeof(_mediaTag)!="undefined" && _mediaTag!=null)
            {

                bgColor = _data.uiData.bgColor;
                _mediaTag.setAttribute("id", "HTML5Controller_" + _data.genericData.id);
                _mediaTag.setAttribute("width", playerWidth);
                _mediaTag.setAttribute("height", playerHeight);
                //_mediaTag.setAttribute("onplaying", "psd.media.wrappers._deferredOnHTML5MediaEvent");
                //_mediaTag.setAttribute("onended", "psd.media.wrappers._deferredOnHTML5MediaEvent");
                _mediaTag.setAttribute("style", "background:" + bgColor);
                _mediaTag.requestFullScreen = _mediaTag.requestFullScreen ||
                    _mediaTag.mozRequestFullScreen ||
                    _mediaTag.webkitRequestFullScreen ||
                    playerContainer.webkitRequestFullScreen;


                var deferredOnHTML5MediaEvent = (function(that) {return function(event) {_onMediaEvent.apply(that, [event]);}})(this);

                _addMediaEventListener("playing", deferredOnHTML5MediaEvent);
                _addMediaEventListener("pause", deferredOnHTML5MediaEvent);
                _addMediaEventListener("ended", deferredOnHTML5MediaEvent);
                _addMediaEventListener("timeupdate", deferredOnHTML5MediaEvent);
                _addMediaEventListener("waiting", deferredOnHTML5MediaEvent);
                _addMediaEventListener("volumechange", deferredOnHTML5MediaEvent);
                _addMediaEventListener("error", deferredOnHTML5MediaEvent);


                // Propiedad "autoplay"
                /*
                 if(typeof(_data.mediaData.autoplay)!="undefined" &&
                 (_data.mediaData.autoplay==true || _data.mediaData.autoplay=="true"))
                 {
                 _mediaTag.setAttribute("autoplay", "autoplay");
                 }*/
                //El autoplay se gestiona en TopPlayer a nivel de player no de controlador

                if (_mediaTag.getAttribute("autoplay"))
                    _mediaTag.removeAttribute("autoplay");


                // Propiedad "controls"
                if (_data.uiData.overrideNativeControls ==false || _data.uiData.overrideNativeControls=="false")
                {
                    _mediaTag.setAttribute("controls", "controls");
                }

                // Propiedad "poster"
                if(typeof(_data.uiData.poster)!="undefined")
                {
                    _mediaTag.setAttribute("poster", _data.uiData.poster);
                }

                _setUrl.apply(this);

                _mediaTag.volume = _data.mediaData.startVolume;


                playerContainer.appendChild(_mediaTag);
                _data.internalData.mediaElement = _mediaTag;

                emic.top.debug("[HTML5Controller.js][_createElement]>> Creado:",_mediaTag);

            } else {
                playerContainer.innerHTML = '<a href="'+ _getURL(srcHTML5) +'"></a>';
            }
        };

        this.preload = function () {
            emic.top.debug("[HTML5Controller.js][preload]>> ");
            _mediaTag.load();
        };

        var _setUrl = function(){
            var i, srcHTML5;

            if((typeof(_data.mediaData.urlHTML5)!="undefined") && (_data.mediaData.urlHTML5.length > 0)) {
                //if(psd.media.debug) {console.log("HTML5 alternative source detected: " + _settings.media.srcHTML5);}
                srcHTML5 = _data.mediaData.urlHTML5;
            }else if(typeof(_data.mediaData.url)!="undefined") {
                //if(psd.media.debug) {console.log("Invalid HTML5 url... using default url: " + _settings.media.src);}
                srcHTML5 = _data.mediaData.url;
                _data.mediaData.urlHTML5 = [_data.mediaData.url];
            }else{
                //if(psd.media.debug) {console.log("Invalid player configuration... aborting instantiation...");}
                return false;
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
            emic.top.debug("[HTML5Controller.js][_setUrl]>> ",_mediaTag.src);

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

        this.init = function(data){
            emic.top.debug("[HTML5Controller.js][init]>> ");
            _data = data;
            _init.apply(this);

        };
        this.kill = function () {
            emic.top.debug("[HTML5Controller.js][kill]>> ");
            _mediaTag.pause();
            _mediaTag.parentNode.removeChild(_mediaTag);
            _mediaTag = undefined;
            _data.internalData.mediaElement = undefined;

            this.notifyStatusChange(emic.top.MediaModule.STATUS_PAUSE);

        };
        this.reload = function(){
            emic.top.debug("[HTML5Controller.js][reload]>> ");
            
            _playbackStarted = false;
            _mediaTag.innerHTML = "";
            _setUrl.apply(this);
            _mediaTag.load();
            _mediaTag.play();

            _data.mediaData.autoplay = true;

            this.notifyReady();
        };
        this.play = function(){
            emic.top.debug("[HTML5Controller.js][play]>> ");
            if(typeof(_mediaTag)!="undefined" && typeof(_mediaTag.play)!="undefined") {
                _mediaTag.play();
                this.notifyStatusChange(emic.top.MediaModule.STATUS_PLAY);
            }
        };
        this.pause = function(){
            emic.top.debug("[HTML5Controller.js][pause]>> ");
            if(typeof(_mediaTag)!="undefined" && typeof(_mediaTag.pause)!="undefined") {
                _mediaTag.pause();
                this.notifyStatusChange(emic.top.MediaModule.STATUS_PAUSE);
            }
        };
        this.playpause = function(){
            emic.top.debug("[HTML5Controller.js][playpause]>> ");
            if (!_playbackStarted)
                _mediaTag.play();
            else
                if (_playing){
                    _mediaTag.pause();
                    this.notifyStatusChange(emic.top.MediaModule.STATUS_PAUSE);
                }
                else{
                    _mediaTag.play();
                    this.notifyStatusChange(emic.top.MediaModule.STATUS_PLAY);
                }
        };
        this.resume = function(){
            emic.top.debug("[HTML5Controller.js][resume]>> ");
            if(typeof(_mediaTag)!="undefined" && typeof(_mediaTag.play)!="undefined") {
                _mediaTag.play();
            }
        };
        this.stop = function(){
            emic.top.debug("[HTML5Controller.js][stop]>> ");
            //La Api html5 no admite STOP
            if(typeof(_mediaTag)!="undefined" && typeof(_mediaTag.pause)!="undefined") {
                _mediaTag.pause();
                this.notifyStatusChange(emic.top.MediaModule.STATUS_STOP);
            }
        };
        this.switchUp = function(){emic.top.debug("[HTML5Controller.js][switchUp]>> ");};
        this.switchDown = function(){emic.top.debug("[HTML5Controller.js][switchDown]>> ");};
        this.switchDirect = function(id){emic.top.debug("[HTML5Controller.js][switchDirect]>> ",id);};

        this.seek = function(secs){
            emic.top.debug("[HTML5Controller.js][seek]>> ",secs);
            if(typeof(_mediaTag)!="undefined" && typeof(_mediaTag.currentTime)!="undefined") {
                _mediaTag.currentTime=secs;
            }
        };

        this.seekLive = function(secs){
            emic.top.debug("[HTML5Controller.js][seekLive]>> ");
            if(typeof(_mediaTag)!="undefined") {
                _mediaTag.pause();
                _mediaTag.src = _mediaTag.currentSrc;
                _mediaTag.play();
            }
        };

        this.setVolume = function(prop){
            emic.top.debug("[HTML5Controller.js][setVolume]>> ",prop);
            if(typeof(_mediaTag)!="undefined" && typeof(_mediaTag.volume)!="undefined") {
                _mediaTag.volume = prop;
            }
        };

        this.onAutoSwitchChange = function(){emic.top.debug("[HTML5Controller.js][onAutoSwitchChange]>> ");};

    }
        
    // Incluimos la declaracion de la clase en el namespace psd.media
    namespace.HTML5Controller = HTML5Controller;

}(emic.top.media));/**
 * Created by lmcuende/jvlopez on 13/07/2014.
 */
(function (namespace){

    // Inheritance class
    YTController.prototype = new emic.top.media.MediaControllerBase();

    function YTController() {
        emic.top.media.MediaControllerBase.call(this);
        /**
         * className psd.media.wrappers.YTController
         */
        var _self = this;
        this.classname = "emic.top.media.YTController";
        this._player='';
        var _data;
        var _done = false;
        var _playerReady = false;
        var YTid;
        var _cancelInit = false;
        var _duration, _volume, _time, _counterTime, _progressTime;
        var YTlayer, YTparam;

        var _flag = true;            //-- comprobamos el estado de reproducción del player cuando es -1
        var _flagBuffering = true;   //-- conprobamos si es la primera vez que llega buffering del player cuando es 3
        var _flagMediaBegin = false; //-- Comprobamos si al escuchar evento pausetenemos que lanzar MediaBegin
        var _percent25 = false, _percent50 = false, _percent75 = false;

        // ------------- API -------------

        this.cancelInit = function () {
            emic.top.debug("[YTController.js][cancelInit]>> ");
            //TODO: Cancelar load de Youtube
            _cancelInit = true;
        };

        this.preload = function () {
            emic.top.debug("[YTController.js][preload]>> ");
            this.play();
            //Cuando conecte y llegue al evento de estado comprobará que no está en una posición MEDIA y realizará una pausa.
        };

        this.init = function (data)
        {
            emic.top.debug("[YTController.js][init]>> ", data);
            this.notifyReady();
            _cancelInit = false;
            _data = data;
            YTlayer = _data.internalData.controllerContainers[emic.top.MediaModule.CONTROLLER_TYPE_YT];
            YTid = _data.mediaData.id;
            _mediaTypeDM=(_data.mediaData.mimetype.indexOf("video") != -1) ? "vod" : "aod";

            document.getElementById(_data.uiData.container).style.visibility='hidden';  //Ocultar capas
            document.getElementById(_data.adData.container).style.visibility='hidden';

            YTparam = {};
            YTparam.height = '100%';
            YTparam.width = '100%';
            YTparam.videoId = YTid;
            YTparam.playerVars = {};

            //TODOjc0201
            if(_data.mediaData.autoplay) {
                if (!getDevice().mobile) {
                    YTparam.playerVars.autoplay = 1;
                }
            }

            /*En caso de ser un player sin playlist activamos relacionados de YouTube*/
            if (_data.mediaData.isPlaylist) {

                YTparam.playerVars.rel = "0";         //without related videos

            } else {


                if (!_data.mediaData.relateds) {

                    YTparam.playerVars.rel = "0";
                }

            }


            YTparam.playerVars.modestbranding = 1; //-- sin marca de agua
            YTparam.playerVars.color = 'white';      //--Skin blanco para el Pais
            YTparam.playerVars.frameborder = 0;
            YTparam.events = {};
            YTparam.events.onReady = function(e){_self.onPlayerReady(e)};
            YTparam.events.onStateChange = function(e){_self.onPlayerStateChange(e)};
            YTparam.events.onPlaybackQualityChange = function(e){_self.onPlayerPlaybackQualityChange(e)};
            YTparam.events.onError = function(e){_self.onPlayerError(e)};

            if (typeof(mm_ytLoadApi) == 'undefined') {
                window.mm_ytLoadApi = false;
                var tag = document.createElement('script');
                var t = document.createTextNode("function onYouTubePlayerAPIReady(){mm_ytLoadApi = true;}");
                tag.appendChild(t);
                document.body.appendChild(tag);
                tag = document.createElement('script');

                tag.type = 'text/javascript';
                tag.src = "https://www.youtube.com/iframe_api";
                var firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            }
            this.readyYoutube();
        };

        this.readyYoutube = function() {
            var myTimeOut;
            if (typeof(mm_ytLoadApi) == 'boolean' && mm_ytLoadApi == true) {
                clearTimeout(myTimeOut);
                this._player = new YT.Player(YTlayer, YTparam);
            } else{
                myTimeOut = setTimeout(function(){_self.readyYoutube();}, 100)
            }
        };

        this.onPlayerReady = function(event) {
            _playerReady = true;

            _duration = event.target.getDuration();
            _progressTime = (parseInt(event.target.getCurrentTime())==0)?"0":parseInt(event.target.getCurrentTime());
            var _dataYT = event.target.getVideoData();
            _volume = event.target.getVolume().toPrecision(3);
            _time = event.target.getCurrentTime();

            _data.mediaData.title=_dataYT.title;          //--nombre del video
            _data.mediaData.duration = _duration*1000;         //--Duracion total
            _data.mediaData.progressTime =_progressTime; //--Tiempo en progreso


            /*Control del mute, si viene configurado el mute ponemos en silencio el player*/
            if(_data.mediaData.premuted){

                if(!this._player.isMuted()) {
                    this._player.mute();
                }


            }else{

               if(this._player.isMuted()){
                   this._player.unMute();

               }



            }

            /*TODOjv2404 solo podemos parar el player anterior una sola vez con la publicidad*/
            /*forzamos el PLAY para parar la ejecucion de los players en la publicidad*/
            //this.notifyStatusChange(emic.top.MediaModule.STATUS_PLAY);

        };

        //TODOjc0902 de momento no interactuamos con this._player, porque estropea el pixel.
        this.play = function(){

            if(_playerReady && _done && this._player.getPlayerState() != 1){
                this._player.playVideo();
            }
        };

        this.playpause = function () {

            if (_playerReady && this._player.getPlayerState() != 1) {
                this._player.playVideo();
            }
        };

        this.resume = function(){
            if(_playerReady && _done && this._player.getPlayerState() != 1){
                this._player.playVideo();
            }
        };


        this.pause = function(){
            if(_playerReady)
                this._player.pauseVideo();
        };


        this.stop = function () {

            /*Reseteamos el flujo*/
            _flag = false;
            _flagBuffering = true;

            if (_playerReady) {
                this._player.stopVideo();
                clearInterval(_counterTime);
                _done = false;

                _flagMediaBegin = true;

            };

            /*reset en 25 50 75*/
            _percent25 = false, _percent50 = false, _percent75 = false
        };

        this.reset = function(){
            //if(_playerReady)
            //    this.stop();
        };

        this.inProgress = function(){


            /*Cambiamos el estado en caso de que mute sea true / false*/
            if (this._player.isMuted()) {

                if(!_data.mediaData.premuted ) {
                    _data.mediaData.premuted = true;
                }
            }else{

                if(_data.mediaData.premuted ) {
                    _data.mediaData.premuted = false;
                }
            }

           if(this._player.getPlayerState() == 1){
                _progressTime = parseInt(this._player.getCurrentTime());
                var _avance = Math.round(_progressTime*100/_duration);

               if (!_percent25 && _avance >= 25 && _avance <= 49) {
                   this.notifyProgress(_progressTime, _duration);
                   _percent25 = true;
               }

               if (!_percent50 && _avance >= 50 && _avance <= 74) {
                   this.notifyProgress(_progressTime, _duration);
                   _percent50 = true;
               }

               if (!_percent75 && _avance >= 75) {
                   this.notifyProgress(_progressTime, _duration);
                   _percent75 = true;
               }

            }
        };

        /*Funcion que controla el orquestado de los players cuando viene publicidad de DFP*/
        var changePlayer = function (that) {

            if (_flag) {

                that.notifyStatusChange(emic.top.MediaModule.STATUS_PLAY);
                _flag = false;

                /*reset en 25 50 75*/
                _percent25 = false, _percent50 = false, _percent75 = false


            } else {

                _flag = true;
            }
        };


        this.onPlayerStateChange = function(event) {

            var estado = {};


            /*Escuchamos eventos para el control de orquestado de players*/

            if (event.data == YT.PlayerState.BUFFERING) {

                if (_flagBuffering) {
                    changePlayer(this);
                    _flagBuffering = false;
                }
            }

            if (event.data == YT.PlayerState.UNSTARTED) {

                changePlayer(this);
            }


            if (event.data == YT.PlayerState.ENDED) {

                _flag = true
            }



            /*Inicio de video despues de la publi*/

            if (event.data == YT.PlayerState.PLAYING && !_done) {
                _done = true;

                this.notifyMediaBegin();

                this.notifyStatusChange(emic.top.MediaModule.STATUS_PLAY);

                _counterTime = setInterval(function () { _self.inProgress()}, 1000);

            }


            if (event.data == YT.PlayerState.PAUSED) {
                //estado = new emic.top.event.UIEvent(emic.top.event.UIEvent.ON_ORDER_PAUSE);
                //estado = new emic.top.event.MediaEvent(emic.top.event.MediaEvent.STATUS_PAUSE);
                this.notifyStatusChange(emic.top.MediaModule.STATUS_PAUSE);

                if (_flagMediaBegin) {
                    _done = false;
                    _flagMediaBegin = false;
                } else {
                    _done = true;

                }

            }

            if (event.data == YT.PlayerState.PLAYING) {
                _time = event.target.getCurrentTime().toPrecision(4);
                _volume = event.target.getVolume().toPrecision(3);

                _done = true;

                this.notifyStatusChange(emic.top.MediaModule.STATUS_PLAY);

            }

            if (event.data == YT.PlayerState.BEGIN) {
                estado = emic.top.event.MediaEvent.ON_MEDIA_BEGIN;
            }

            if (event.data == YT.PlayerState.ENDED) {
            	//TODOjc07
            	this.notifyStatusChange(emic.top.MediaModule.STATUS_STOP);
                _progressTime = parseInt(event.target.getCurrentTime());
                _data.mediaData.progressTime = _progressTime; //--Tiempo en progreso
                this.notifyProgress(_progressTime, _duration);

                estado = emic.top.event.MediaEvent.ON_MEDIA_END;
                this.notifyMediaEnd();

                clearInterval(_counterTime);

                _done = false;

                /*reset en 25 50 75*/
                _percent25 = false, _percent50 = false, _percent75 = false
            }
        };


        this.onPlayerPlaybackQualityChange = function(event) {}

        this.onPlayerError = function(event) {
            switch (event.data) {
                case 2:
                    //that.notifyError("ID no está bien configurado");
                    emic.top.debug("[YTController.js][onPlayerError]>> Iniciando peticion de librerías a Youtube");
                    break;
                case 5:
                    //that.notifyError("Error reproducción video con HTML5");
                    emic.top.debug("[YTController.js][onPlayerError]>> Error reproducción video con HTML5");
                    break;
                case 100:
                    //that.notifyError("Video privado o no encontrado");
                    emic.top.debug("[YTController.js][onPlayerError]>> Video privado o no encontrado");
                    break;
                case 101:
                    //that.notifyError("El propietario no permite reproducción");
                    emic.top.debug("[YTController.js][onPlayerError]>> El propietario no permite reproducción");
                    break;
            }
        };
    }
    // Incluimos la declaracion de la clase en el namespace psd.media
        namespace.YTController = YTController;

    }(emic.top.media));/**
 * Created by lmcuende/jvlopez on 16/07/2015.
 */
(function (namespace) {


    // Inheritance class
    DMController.prototype = new emic.top.media.MediaControllerBase();

    function DMController() {

        emic.top.media.MediaControllerBase.call(this);

        var self = this;
        this.classname = "emic.top.media.DMController";
        var _firstDM = false;                               //Flag to dispatch once Media Begin when play.
        var _firstMH = false;                               //Flag to dispatch once Media Half.
        var _dataDM;                                        //For to store data from mediaData
        var _idDM, _autoplay, _startVolume;                 //Variables to store parameters to initialize the player

        // ------------- API -------------

        this.init = function (data) {

            emic.top.debug("[DMController.js][init]>> ", data);

            this.notifyReady();

            var _dataDM = data;

            var _durationDM, _titleDM, _volumeDM, _timeDM, _counterTime;

            var DMlayer = _dataDM.internalData.controllerContainers[emic.top.MediaModule.CONTROLLER_TYPE_DM];
            var _idDM = _dataDM.mediaData.id;
            var _autoplay = _dataDM.mediaData.autoplay;
            var _startVolume = _dataDM.mediaData.startVolume;

            document.getElementById(_dataDM.uiData.container).style.visibility = 'hidden';  //Hiding layers
            document.getElementById(_dataDM.adData.container).style.visibility = 'hidden';

            (function () {
                var eDM = document.createElement('script');
                eDM.type = 'text/javascript';
                eDM.async = true;
                eDM.src = document.location.protocol + '//api.dmcdn.net/all.js';
                var sDM = document.getElementsByTagName('script')[0];
                sDM.parentNode.insertBefore(eDM, sDM);
            })();


            // La API invoca esta función cuando la página termina de descargar el código JavaScript para la API del reproductor.
            // esta función crea los objetos del reproductor a usar cuando se cargue la página

            window.dmAsyncInit = function () {      // This function init the player once the SDK is loaded

                var estado = {};

                DM.init();
                DM.api('/videos', {fields: "screenname"}, function (response) {
                    var DMparam = {};
                    DMparam.video = _idDM;
                    DMparam.width = "100%";
                    DMparam.height = "100%";
                    DMparam.params = {};
                    DMparam.params.api = 'postMessage';
                    DMparam.params.autoplay = _autoplay;
                    DMparam.params.logo = false;
                    DMparam.params.related = false;
                    DMparam.params.info = true;
                    DMparam.params.volume = _startVolume;
                    var player = DM.player(DMlayer, DMparam);

                    player.addEventListener("apiready", function (e) {  //We can attach some events on the player (using standard DOM events)
                        //self.notifyReady();
                    });

                    player.addEventListener("play", function (e) {


                    });

                    player.addEventListener("pause", function (e) {

                        self.notifyStatusChange(emic.top.MediaModule.STATUS_PAUSE);
                    });

                    player.addEventListener("ended", function (e) {

                        _progressTime = parseInt(e.target.currentTime); //Tiempo de reproduccion
                        self.notifyProgress(_progressTime, _durationDM);

                        estado = emic.top.event.MediaEvent.ON_MEDIA_END;
                        self.notifyMediaEnd();

                        clearInterval(_counterTime);
                    });

                    //player.addEventListener("volumechange", function (e) {
                    //    _volumeDM = e.target.volume.toPrecision(3);
                    //    self.notifyVolumeChange(_volumeDM);
                    //});

                    //player.addEventListener("seeked", function (e) {
                    //    _timeDM = e.target.currentTime;
                    //    self.notifyProgress(_timeDM, _durationDM);
                    //    self.notifySeekComplete(_timeDM);
                    //});

                    player.addEventListener("timeupdate", function (e) {


                        //--Recepcion de eventos

                        if (!_firstDM) {

                            e.target.setVolume(_startVolume);                  //This call may not be supported on all devices
                            _durationDM = parseInt(e.target.duration);

                            _titleDM = e.target.title;

                            _dataDM.mediaData.title = _titleDM;                //Nombre del video
                            _dataDM.mediaData.duration = _durationDM;          //Duracion total

                            _mediaTypeDM = (_dataDM.mediaData.mimetype.indexOf("video") != -1) ? "vod" : "aod";

                            if (_durationDM != 0) {

                                _counterTime = setInterval(function () {
                                    _progressTime = parseInt(e.target.currentTime); //Tiempo de reproduccion
                                    self.notifyProgress(_progressTime, _durationDM);

                                }, 1000);

                                _firstDM = true;

                                self.notifyMediaBegin();
                                self.notifyStatusChange(emic.top.MediaModule.STATUS_PLAY);

                            }

                        }

                    });

                });
            };
        };
    }

    // We include the class declaration in the namespace emic.top.media
    namespace.DMController = DMController;

}(emic.top.media));


/* ****** START HLSController *********************************************************************************** */
/* 2016-09-12 */
(function(namespace) {

    // Inheritance class
    HLSController.prototype = new emic.top.media.MediaControllerBase();

    /**
     * Wrapper que permite la compatibilidad del reproductor multimedia.
     * @constructor
     */
    function HLSController() {
        // Super
        emic.top.media.MediaControllerBase.call(this);

        /**
         * className psd.media.wrappers.HLSController
         */
        this.className = "emic.top.media.HLSController";

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                           INTERNALS                                //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

        // 

        var _that = this;

        var _data = {};

        var _playing = false;

        // 
        var _playbackStarted = false;

        //
        var _mediaTag;
        //
        //array de objetos donde se guardaran las calidades del video.
        var hlsLevels = new Array();

        var objHls;

        var _isLive;

        var _onMediaEvent = function(evt) {
            if (evt.type != "timeupdate")
                emic.top.debug("[HLSController.js][_onMediaEvent]>> ", evt.type);
            switch (evt.type) {

                case "playing":
                    if (!_playbackStarted) {
                        if (this.isBeginAllowed(_data)) {
                            _playbackStarted = true;
                            this.notifyMediaBegin();
                            if(hlsLevels.length > 2)
                                this.notifyRenditions(hlsLevels);
                            this.notifyStatusChange(emic.top.MediaModule.STATUS_PLAY);
                            //todo: Ver si necesamos un notifyMediaBegin
                            //this.dispatchEvent(new psd.media.MediaEvent(psd.media.MediaEvent.MEDIA_BEGIN, {duration: _mediaTag.duration}));
                            this.notifyVolumeChange(_mediaTag.volume);
                        } else {
                            this.stop();
                        }
                    }

                    if (!_playing) {
                        _playing = true;
                        this.notifyStatusChange(emic.top.MediaModule.STATUS_PLAY);
                    }
                    //this.notifyBufferFull();
                    break;

                case "pause":
                    if (_playing) {
                        _playing = false;
                        this.notifyStatusChange(emic.top.MediaModule.STATUS_PAUSE);
                    }
                    break;

                case "ended":
                    if (_playbackStarted) {
                        _playbackStarted = false;
                        this.notifyMediaEnd();
                        this.notifyStatusChange(emic.top.MediaModule.STATUS_STOP);

                    }
                    break;

                case "timeupdate":
                    if (_mediaTag != undefined) {
                        if(_isLive){
                            if(_data.mediaData.isDVR === true) {
                                this.notifyProgress(_mediaTag.currentTime, _mediaTag.duration);
                            } else {
                                this.notifyProgress(_mediaTag.currentTime, _mediaTag.currentTime);
                            }
                        } else {
                            this.notifyProgress(_mediaTag.currentTime, _mediaTag.duration);
                        }
                        this.notifyIsLiveStream(_isLive);
                    }
                    break;

                case "waiting":
                    //this.notifyBufferEmpty();
                    break;
                case "volumechange":
                    this.notifyVolumeChange(_mediaTag.volume);
                    break;
                case "error":
                    //TODO: Recuperar identificador o mensaje
                    this.notifyError();
                    break;

            }
        };

        var _level2label = function(index) {
            if (objHls && objHls.levels.length - 1 >= index) {
                var level = objHls.levels[index];
                if (level.name) {
                    return level.name;
                } else {
                    if (level.height) {
                        return (level.height + 'p');
                    } else {
                        if (level.bitrate) {
                            if(level.bitrate < 64001) return '144p';
                            if(level.bitrate < 373001) return '180p';
                            if(level.bitrate < 683001) return '270p';
                            if(level.bitrate < 890001) return '360p';
                            if(level.bitrate < 1096001) return '360p+';
                            if(level.bitrate < 2636001) return '576p';
                            if(level.bitrate < 4173001) return '720p';
                            return '1080p';
                        } else {
                            return null;
                        }
                    }
                }
            }
        }

        //Devuelve la url con el token, si es que tuviera
        var _getURL = function(srcHTML5) {
            emic.top.debug("[HLSController.js][_getURL]>> ", srcHTML5);
            var separador, token, url;

            if (_data.authParamsHTML5 != undefined) {
                separador = (srcHTML5.indexOf("?") == -1) ? "?" : "&";
                token = separador + _data.authParamsHTML5;
            } else token = "";

            url = srcHTML5 + token;

            return url;
        };

        var _init = function() {
            emic.top.debug("[HLSController.js][_init]>> ");

           if(objHls) {
             objHls.destroy();
             objHls = null;
           }

			//objHls = new Hls({debug: true, enableWorker : true, autoStartLoad : false});
			objHls = new Hls({debug: false});
       		
            _createElement.apply(this);
            this.notifyReady(); //TODO: Sólo en el caso de que exista un mediaTag, si no habría que lanzar un error que capturaria MediaModule
        };

        var _createElement = function() {
            var playerContainer = document.getElementById(_data.internalData.controllerContainers[emic.top.MediaModule.CONTROLLER_TYPE_REAL_HLS]),
                srcHTML5,
                playerWidth = "100%",
                playerHeight = "100%",
                bgColor;

            if (_data.mediaData.mimetype.indexOf("audio") != -1) {
                _mediaTag = document.createElement("audio");
            }

            if (_data.mediaData.mimetype.indexOf("video") != -1) {
                _mediaTag = document.createElement("video");
            }

            if (typeof(_mediaTag) != "undefined" && _mediaTag != null) {

                bgColor = _data.uiData.bgColor;
                _mediaTag.setAttribute("id", "HLSController_" + _data.genericData.id);
                _mediaTag.setAttribute("width", playerWidth);
                _mediaTag.setAttribute("height", playerHeight);
                _mediaTag.setAttribute("style", "background:" + bgColor);
                _mediaTag.requestFullScreen = _mediaTag.requestFullScreen ||
                    _mediaTag.mozRequestFullScreen ||
                    _mediaTag.webkitRequestFullScreen ||
                    playerContainer.webkitRequestFullScreen;

                var deferredOnHTML5MediaEvent = (function(that) {
                    return function(event) {
                        _onMediaEvent.apply(that, [event]);
                    }
                })(this);

                _addMediaEventListener("playing", deferredOnHTML5MediaEvent);
                _addMediaEventListener("pause", deferredOnHTML5MediaEvent);
                _addMediaEventListener("ended", deferredOnHTML5MediaEvent);
                _addMediaEventListener("timeupdate", deferredOnHTML5MediaEvent);
                _addMediaEventListener("waiting", deferredOnHTML5MediaEvent);
                _addMediaEventListener("volumechange", deferredOnHTML5MediaEvent);
                _addMediaEventListener("error", deferredOnHTML5MediaEvent);


                if (_mediaTag.getAttribute("autoplay"))
                    _mediaTag.removeAttribute("autoplay");

                // Propiedad "controls"
                if (_data.uiData.overrideNativeControls == false || _data.uiData.overrideNativeControls == "false") {
                    _mediaTag.setAttribute("controls", "controls");
                }

                // Propiedad "poster"
                if (typeof(_data.uiData.poster) != "undefined") {
                    _mediaTag.setAttribute("poster", _data.uiData.poster);
                }

                objHls.on(Hls.Events.FRAG_PARSING_METADATA, function(event,data){
                    for(var i in data.samples){
                        var str = String.fromCharCode.apply(null, data.samples[i].data);
                        console.log(str);
                        if(str.indexOf('publicidad')!=-1){
                            var tienePubli= 1;
                        }
                    }
                    if(tienePubli){
                        var progreso=0;
                        var idIterval = setInterval(function(){
                            progreso +=10;
                            if(progreso == 100){
                                clearInterval(idIterval);
                                _that.notifyMetadata(data);

                            }
                        },1000);
                        _that.notifyID3TagPubli(str);
                    }
                });

                objHls.on(Hls.Events.MEDIA_ATTACHED, function () {
//TODOjc probando
                    //MEGA 1 solo calidad
                    //objHls.loadSource('http://a3live-lh.akamaihd.net/i/mghds/geomega_1@328914/index_4_av-p.m3u8');
                    //rtve 2 calidades
                    //objHls.loadSource('http://iphonelive.rtve.es/LA1_LV3_IPH/LA1_LV3_IPH.m3u8');

                    //objHls.loadSource("http://www.streambox.fr/playlists/x36xhzz/x36xhzz.m3u8");
//console.log(_data.mediaData.url);
                    objHls.loadSource(_data.mediaData.url);
                    //TODOjc no poner esto
					//objHls.autoLevelCapping = 0;
                });
                objHls.on(Hls.Events.MANIFEST_PARSED,function(event,data) {
                    hlsLevels.push({"label":'Auto', "bitrate":"-1"});
                    for (var i=0; i < objHls.levels.length; i++) {
                        var bitrate = i, label = _level2label(i);
                        if(label){
                            var bitrateNum = 0
                            if(typeof(objHls.levels[i].bitrate) == 'number'){
                                bitrateNum = objHls.levels[i].bitrate;
                            }
                            hlsLevels.push({"label":label, "bitrate":bitrate, "bitrateNum":bitrateNum});
                        }
                    }
                    for(var i=0; i < hlsLevels.length; i++){
                        for(var ii = 0; ii < hlsLevels.length; ii++){
                            if(i != ii && hlsLevels[i].label == hlsLevels[ii].label){
                                if(hlsLevels[i].bitrateNum > hlsLevels[ii].bitrateNum){
                                    hlsLevels[i].label+="+";
                                }
                                if(hlsLevels[i].bitrateNum < hlsLevels[ii].bitrateNum){
                                    hlsLevels[ii].label+="+";
                                }
                            }
                        }
                    }
                });


                objHls.on(Hls.Events.LEVEL_LOADED,function(event,data) {
                    _isLive = data.details.live;
                });

                objHls.on(Hls.Events.ERROR,function(event,data) {
                    emic.top.debug("[HLSController.js][_ERROR]>> :", data);
                });


                _mediaTag.volume = _data.mediaData.startVolume;
//console.log('************************************** Volumen :');
//console.log(_data.mediaData.startVolume);


                playerContainer.appendChild(_mediaTag);
                _data.internalData.mediaElement = _mediaTag;

                emic.top.debug("[HLSController.js][_createElement]>> Creado:", _mediaTag);

            }

            objHls.attachMedia(_mediaTag);
        };

//        this.loadHLSJS = function(){
//            emic.top.debug("[HLSController.js][loadHLSJS]>> Iniciando peticion de librerías HLS");

//            var nuevo = document.createElement('script');
//            nuevo.setAttribute("type", "text/javascript");
//            nuevo.onload = function(){
//                window.tdPlayerHLSApiReady();
//            };
////TODOjc está tirando de mi home
//            nuevo.setAttribute("src", "http://localhost/hls/dist/hls.min.js");
//            document.getElementsByTagName('head')[0].appendChild(nuevo);

//            namespace.HlsScriptCreated = true;
//        };

        this.preload = function() {
            emic.top.debug("[HLSController.js][preload]>> ");
            //_mediaTag.load();
        };

        // Añade un listener a un evento de la etiqueta multimedia
        var _addMediaEventListener = function(type, listener) {
            if (_mediaTag) {
                if (_mediaTag.addEventListener) {
                    _mediaTag.addEventListener(type, listener, false);
                } else if (_mediaTag.attachEvent) {
                    _mediaTag.attachEvent(type, listener);
                }
            }
        };

// TODOjc ya no parseamos el m3u8 manifiest
//  var onDataM3u8Complete = function (evt){
//      console.log('........................................................................');
//      console.log(evt.result.parserResult.result);
//      console.log('........................................................................');
//  }
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //                              API                                   //
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

        this.init = function(data) {
            emic.top.debug("[HLSController.js][init]>> ");
            _data = data;

            namespace.directInstanceHLS = this;

//TODOjc ya no parseamos nosotros el m3u8 manifiest
//var _m3u8Parser = new psd.framework.parser.m3u8Parser();
//var _dataVideoMediator = new psd.framework.Mediator();
//_dataVideoMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_COMPLETE, onDataM3u8Complete, this);
//_dataVideoMediator.mediate(data.mediaData.url, _m3u8Parser, psd.framework.Mediator.RESPONSE_TEXT);
//this.loadHLSJS(this);

            if(typeof Hls == 'function'){
                _init.apply(this);
            } else {
                var newScript = document.createElement('script');
                newScript.setAttribute("type", "text/javascript");
                var _urlBase = _data.genericData.urlBase;
                _urlBase+='/psdmedia/resources/js/ext/hls/';
                newScript.setAttribute("src", _urlBase + "hls.min.js");
                newScript.onload = function(){
                    _init.apply(_that);
                };
                document.getElementsByTagName('head')[0].appendChild(newScript);
            }


        };
        this.kill = function() {
            emic.top.debug("[HLSController.js][kill]>> ");
            _mediaTag.pause();
            _mediaTag.parentNode.removeChild(_mediaTag);
            _mediaTag = undefined;
            _data.internalData.mediaElement = undefined;

        };
        this.reload = function() {
            emic.top.debug("[HLSController.js][reload]>> ");

            _mediaTag.innerHTML = "";
            _mediaTag.load();
            _mediaTag.play();

            _data.mediaData.autoplay = true;

            this.notifyReady();
        };
        this.play = function() {
            emic.top.debug("[HLSController.js][play]>> ");
            //TODOjc05
            if(objHls) {
                if (typeof(_mediaTag) != "undefined" && typeof(_mediaTag.play) != "undefined") {
                    _mediaTag.play();
                }
            }
        };
        this.pause = function() {
            emic.top.debug("[HLSController.js][pause]>> ");
            if (typeof(_mediaTag) != "undefined" && typeof(_mediaTag.pause) != "undefined") {
                _mediaTag.pause();
            }
        };
        this.playpause = function() {
            emic.top.debug("[HLSController.js][playpause]>> ");
            if (!_playbackStarted)
                _mediaTag.play();
            else
            if (_playing)
                _mediaTag.pause();
            else
                _mediaTag.play();
        };
        this.resume = function() {
            emic.top.debug("[HLSController.js][resume]>> ");
            if (typeof(_mediaTag) != "undefined" && typeof(_mediaTag.play) != "undefined") {
                _mediaTag.play();
            }
        };
        this.stop = function() {
            emic.top.debug("[HLSController.js][stop]>> ");
            //La Api html5 no admite STOP
            if (typeof(_mediaTag) != "undefined" && typeof(_mediaTag.pause) != "undefined") {
                _mediaTag.pause();
                //TODOjc05
                if(objHls) {
                    objHls.destroy();
                    objHls = null;
                }
            }
        };
        this.switchUp = function() {
            emic.top.debug("[HLSController.js][switchUp]>> ");
        };
        this.switchDown = function() {
            emic.top.debug("[HLSController.js][switchDown]>> ");
        };
        this.switchDirect = function(id) {
            emic.top.debug("[HLSController.js][switchDirect]>> ", id);
            var toLevel;
            var realId = ((hlsLevels.length - 1) - id);
            toLevel = (hlsLevels[realId].bitrate);
            if(objHls.currentLevel != toLevel){
                if(toLevel == -1){
	                objHls.currentLevel = objHls.autoLevelCapping = -1;
                } else {
                    objHls.currentLevel = toLevel;
                }
            }
        };

        this.seek = function(secs) {
            emic.top.debug("[HLSController.js][seek]>> ", secs);
            if (typeof(_mediaTag) != "undefined" && typeof(_mediaTag.currentTime) != "undefined") {
                _mediaTag.currentTime = secs;
            }
        };

        this.seekLive = function(secs) {
            emic.top.debug("[HLSController.js][seekLive]>> ");
            if (typeof(_mediaTag) != "undefined") {
                _mediaTag.currentTime = _mediaTag.duration;
            }
        };

        this.setVolume = function(prop) {
            emic.top.debug("[HLSController.js][setVolume]>> ", prop);
            if (typeof(_mediaTag) != "undefined" && typeof(_mediaTag.volume) != "undefined") {
                _mediaTag.volume = prop;
            }
        };

        this.onAutoSwitchChange = function() {
            emic.top.debug("[HLSController.js][onAutoSwitchChange]>> ");
        };

    }

    // Incluimos la declaracion de la clase en el namespace psd.media
    namespace.HLSController = HLSController;

}(emic.top.media));

/* ****** END HLSController *********************************************************************************** */


/**
 * Created by igomez on 26/06/2014.
 */
(function(namespace) {

    MediaModule.prototype = new psd.framework.EventDispatcher();

    MediaModule.TECHNOLOGY_FLASH = "flash";
    MediaModule.TECHNOLOGY_HTML5 = "html5";

    MediaModule.CONTROLLER_TYPE_AKAMAIHDS = "akamaihds";
    MediaModule.CONTROLLER_TYPE_AKAMAIHD = "akamaihd";
    MediaModule.CONTROLLER_TYPE_TRITON = "triton";
    MediaModule.CONTROLLER_TYPE_HTML5NATIVE = "html5native";
    MediaModule.CONTROLLER_TYPE_YT = "youtube";
    MediaModule.CONTROLLER_TYPE_DM = "dailymotion";
    MediaModule.CONTROLLER_TYPE_HLS = "hls";
//TODOjc2
    MediaModule.CONTROLLER_TYPE_REAL_HLS = "Realhls";

    MediaModule.STATUS_PLAY = "play";
    MediaModule.STATUS_PAUSE = "pause";
    MediaModule.STATUS_INITIALIZING = "initializing";
    MediaModule.STATUS_STOP = "stop";

    MediaModule.STATUS_DVR_LIVE = "playLive";
    MediaModule.STATUS_DVR_DEFERRED = "playDVR";

    MediaModule.ERROR_NO_CONTAINER = "01";

    MediaModule.ERROR_STATION_NOT_FOUND = "STATION_NOT_FOUND";
    MediaModule.ERROR_LIVE_FAILED = "LIVE_FAILED";
    MediaModule.ERROR_STREAM_GEO_BLOCKED = "STREAM_GEO_BLOCKED";

    MediaModule.ERROR_TIMEOUT_ALERT = "ERROR_TIMEOUT_ALERT";
    MediaModule.ERROR_TIMEOUT_REACH = "ERROR_TIMEOUT_REACH";
    MediaModule.ERROR_STREAM_CONFIG_ERROR = "ERROR_STREAM_CONFIG_ERROR";
    MediaModule.ERROR_STREAM_ERROR = "ERROR_STREAM_ERROR";
    MediaModule.ERROR_CONFIGURATION_ERROR = "ERROR_CONFIGURATION_ERROR";

    function MediaModule(dataModel){

        // Super
        psd.framework.EventDispatcher.call(this);

        //TODO: Meter preloadController como funcionalidad para hacer un load
        //TODO: Gestión de volumen interno en el modulo y no en cada controlador (inicial, cookie, etc)
        //TODO: Gestión de volumen inicial que ya viene en el data model (pasarselo a los dos controladores que hay ahora)

        /////////////////////////////////////////////////////////
        //  DATA
        /////////////////////////////////////////////////////////

        var _data = dataModel;
        var _status = "";
        var _totalTime;

        var _factory = new emic.top.media.MediaControllerFactory(_data);
        var _controller;

        var _loaded = 0;
        var _preinit = false;
        var _prereset = false;
        var _isBuffering = false;

        //  CONSTANTES
        var _LOAD_STATUS_LOADING = 1;
        var _LOAD_STATUS_NOT_LOADED = 0;
        var _LOAD_STATUS_LOADED = 2;

        var _EXTENSION_AAC = "aac";
        var _EXTENSION_MP3 = "mp3";
        var _EXTENSION_MP4 = "mp4";
        var _EXTENSION_OGG = "ogg";
        var _EXTENSION_WEBM = "webm";

        this.flag_autoplay = false;

        /////////////////////////////////////////////////////////
        //  API
        /////////////////////////////////////////////////////////

        this.init = function(){
            emic.top.debug("[MediaModule.js][init]>> ");
            _data.internalData.controllerName = this.selectController(_data.mediaData.controllerPriority,_data.mediaData.tecPriorityPC);
            _data.internalData.currentVolume = _data.mediaData.startVolume;
            //_asignController.apply(this);
            emic.top.debug("[MediaModule.js][init]>> Controlador asignado: ", _data.internalData.controllerName);

            if (getDevice().mobile){
                _loaded = _LOAD_STATUS_LOADING;
                _loadController.apply(this,[_data.internalData.controllerName, _onInit]);
            }else{
                _initComplete.apply(this);
                if (_data.internalData.controllerName == MediaModule.CONTROLLER_TYPE_YT) {
                    _loadController.apply(this,[_data.internalData.controllerName, _onInit]);
                }
                if (_data.internalData.controllerName == MediaModule.CONTROLLER_TYPE_DM) {
                    _loadController.apply(this,[_data.internalData.controllerName, _onInit]);
                }
            }
        };

        var _onInit = function(e){
            emic.top.debug("[MediaModule.js][_onInit]>> ");
            _loaded = _LOAD_STATUS_LOADED;
            e.target.removeEventListener(emic.top.event.MediaEvent.ON_READY, _onInit, this);
            _initComplete.apply(this);

        };

        var _initComplete = function(){
            emic.top.debug("[MediaModule.js][_initComplete]>> ");
            var ev = new emic.top.event.MediaEvent(emic.top.event.MediaEvent.ON_INIT_COMPLETE);
            ev.id = _data.mediaData.idTOP;
            this.dispatchEvent(ev);
        };

        this.reset = function(){
            emic.top.debug("[MediaModule.js][reset]>> ");

            _status = "";

            if(this.flag_autoplay){
                _controller.removeEventListener(emic.top.event.MediaEvent.ON_MEDIA_BEGIN, _onControllerEvent, this);
                _controller.removeEventListener(emic.top.event.MediaEvent.ON_MEDIA_END, _onControllerEvent, this);
                _controller.removeEventListener(emic.top.event.MediaEvent.ON_CUE, _onControllerEvent, this);
                _controller.removeEventListener(emic.top.event.MediaEvent.ON_METADATA, _onControllerEvent, this);
                _controller.removeEventListener(emic.top.event.MediaEvent.ON_ERROR, _onControllerEvent, this);
                _controller.removeEventListener(emic.top.event.MediaEvent.ON_AD_INSTREAM_START, _onControllerEvent, this);
                _controller.removeEventListener(emic.top.event.MediaEvent.ON_AD_INSTREAM_END, _onControllerEvent, this);
                _controller.removeEventListener(emic.top.event.MediaEvent.ON_STATUS_CHANGE, _onControllerEvent, this);
                _controller.removeEventListener(emic.top.event.MediaEvent.ON_VOLUME_CHANGE, _onControllerEvent, this);
                _controller.removeEventListener(emic.top.event.MediaEvent.ON_SWITCH_REQUEST, _onControllerEvent, this);
                _controller.removeEventListener(emic.top.event.MediaEvent.ON_SWITCH_COMPLETE, _onControllerEvent, this);
                _controller.removeEventListener(emic.top.event.MediaEvent.ON_PROGRESS, _onControllerEvent, this);
                _controller.removeEventListener(emic.top.event.MediaEvent.ON_SEEK_START, _onControllerEvent, this);
                _controller.removeEventListener(emic.top.event.MediaEvent.ON_SEEK_COMPLETE, _onControllerEvent, this);
                _controller.removeEventListener(emic.top.event.MediaEvent.ON_BUFFER_EMPTY, _onControllerEvent, this);
                _controller.removeEventListener(emic.top.event.MediaEvent.ON_BUFFER_FULL, _onControllerEvent, this);
                _controller.removeEventListener(emic.top.event.MediaEvent.ON_IS_LIVE_STREAM, _onControllerEvent, this);
                _controller.removeEventListener(emic.top.event.MediaEvent.ON_RENDITIONS, _onControllerEvent, this);

                _loadController.apply(this,[_data.internalData.controllerName, _onReset]);
                _totalTime = 0;
                return;
            }

            var lastController;
            if (_loaded == _LOAD_STATUS_NOT_LOADED) {
                _data.internalData.controllerName = this.selectController(_data.mediaData.controllerPriority,_data.mediaData.tecPriorityPC);
                //_asignController.apply(this);
                if (getDevice().mobile){
                    _loaded = _LOAD_STATUS_LOADING;
                    _loadController.apply(this,[_data.internalData.controllerName, _onReset]);
                }else{
                    _resetComplete.apply(this);

                    //para los casos de players transparentes (youtube, dailymotion...), al no haber UI, hay que mandar el evento onreset manualmente al cargar el controlador
                    if (_data.internalData.controllerName == MediaModule.CONTROLLER_TYPE_YT) {
                        _loaded = _LOAD_STATUS_LOADING;
                        _loadController.apply(this,[_data.internalData.controllerName, _onReset]);
                    }
                    if (_data.internalData.controllerName == MediaModule.CONTROLLER_TYPE_DM) {
                        _loaded = _LOAD_STATUS_LOADING;
                        _loadController.apply(this,[_data.internalData.controllerName, _onReset]);
                    }
                }
            }else{
                if (_loaded == _LOAD_STATUS_LOADING){
                    _controller.cancelInit();
                }

                lastController = _data.internalData.controllerName;
                _data.internalData.controllerName = this.selectController(_data.mediaData.controllerPriority,_data.mediaData.tecPriorityPC);
                //_asignController.apply(this);

                //Deallocate del controller actual con el media module (no miramos si es el mismo a resetear porque el propio factory lo reutiliza)
                _controller.removeEventListener(emic.top.event.MediaEvent.ON_MEDIA_BEGIN, _onControllerEvent, this);
                _controller.removeEventListener(emic.top.event.MediaEvent.ON_MEDIA_END, _onControllerEvent, this);
                _controller.removeEventListener(emic.top.event.MediaEvent.ON_CUE, _onControllerEvent, this);
                _controller.removeEventListener(emic.top.event.MediaEvent.ON_METADATA, _onControllerEvent, this);
                _controller.removeEventListener(emic.top.event.MediaEvent.ON_ERROR, _onControllerEvent, this);
                _controller.removeEventListener(emic.top.event.MediaEvent.ON_AD_INSTREAM_START, _onControllerEvent, this);
                _controller.removeEventListener(emic.top.event.MediaEvent.ON_AD_INSTREAM_END, _onControllerEvent, this);
                _controller.removeEventListener(emic.top.event.MediaEvent.ON_STATUS_CHANGE, _onControllerEvent, this);
                _controller.removeEventListener(emic.top.event.MediaEvent.ON_VOLUME_CHANGE, _onControllerEvent, this);
                _controller.removeEventListener(emic.top.event.MediaEvent.ON_SWITCH_REQUEST, _onControllerEvent, this);
                _controller.removeEventListener(emic.top.event.MediaEvent.ON_SWITCH_COMPLETE, _onControllerEvent, this);
                _controller.removeEventListener(emic.top.event.MediaEvent.ON_PROGRESS, _onControllerEvent, this);
                _controller.removeEventListener(emic.top.event.MediaEvent.ON_SEEK_START, _onControllerEvent, this);
                _controller.removeEventListener(emic.top.event.MediaEvent.ON_SEEK_COMPLETE, _onControllerEvent, this);
                _controller.removeEventListener(emic.top.event.MediaEvent.ON_BUFFER_EMPTY, _onControllerEvent, this);
                _controller.removeEventListener(emic.top.event.MediaEvent.ON_BUFFER_FULL, _onControllerEvent, this);
                _controller.removeEventListener(emic.top.event.MediaEvent.ON_IS_LIVE_STREAM, _onControllerEvent, this);
                _controller.removeEventListener(emic.top.event.MediaEvent.ON_RENDITIONS, _onControllerEvent, this);
                _loaded = _LOAD_STATUS_NOT_LOADED;
                _controller = undefined;

                //lo devolvemos al factory (html5 se destruye siempre hasta que hagamos un reset en condiciones)
                //if (lastController == MediaModule.CONTROLLER_TYPE_HTML5NATIVE)
                    _factory.destroyController(lastController);
                //else
                    //_factory.saveController(lastController);

                if (getDevice().mobile){
                    _loaded = _LOAD_STATUS_LOADING;
                    _loadController.apply(this,[_data.internalData.controllerName, _onReset]);
                }else{
                    _resetComplete.apply(this);

                    //para los casos de players transparentes (youtube, dailymotion...), al no haber UI, hay que mandar el evento onreset manualmente al cargar el controlador
                    if (_data.internalData.controllerName == MediaModule.CONTROLLER_TYPE_YT) {
                        _loaded = _LOAD_STATUS_LOADING;
                        //julián: Comento la línea siguiente porque no es necesario volver a hacer un loadController, ya que
                        //ya se llamó con anterioridad al loadController.
                        //_loadController.apply(this,[_data.internalData.controllerName, _onReset]);
                    }
                    if (_data.internalData.controllerName == MediaModule.CONTROLLER_TYPE_DM) {
                        _loaded = _LOAD_STATUS_LOADING;
                        _loadController.apply(this,[_data.internalData.controllerName, _onReset]);
                    }
                }
            }

            _status = "";
            _totalTime = 0;

        };

        var _onReset = function(e){
            emic.top.debug("[MediaModule.js][_onReset]>> ");
            _loaded = _LOAD_STATUS_LOADED;
            e.target.removeEventListener(emic.top.event.MediaEvent.ON_READY, _onReset, this);
            _resetComplete.apply(this);
        };

        var _resetComplete = function(){
            emic.top.debug("[MediaModule.js][_resetComplete]>> ");
            var ev = new emic.top.event.MediaEvent(emic.top.event.MediaEvent.ON_RESET_COMPLETE);
            ev.id = _data.mediaData.idTOP;
            this.dispatchEvent(ev);
        };

        this.preLoadContent = function(){
            emic.top.debug("[MediaModule.js][preLoadContent]>> ");
            if (_controller){
                _controller.preload();
            }
        };

        this.start = function(){
            emic.top.debug("[MediaModule.js][start]>> ");
            if (_loaded == _LOAD_STATUS_NOT_LOADED){
                _loaded = _LOAD_STATUS_LOADING;
                _loadController.apply(this,[_data.internalData.controllerName, _onStarted]);
            }else if (_loaded == _LOAD_STATUS_LOADED){
                _onStarted.apply(this);
            }
            else{
                //No hacemos nada si aún está cargando
            }
        };

        var _onStarted = function(e){
            emic.top.debug("[MediaModule.js][_onStarted]>> ");
            _loaded = _LOAD_STATUS_LOADED;

            if (e)
                e.target.removeEventListener(emic.top.event.MediaEvent.ON_READY, _onStarted, this);

            /*e.id = _data.mediaData.idTOP;
            this.dispatchEvent(e);*/

            this.play();

            if(_data.mediaData.premuted){
                if(!getDevice().mobile){
                    _controller.setVolume(0);
                    //_data.mediaData.premuted = false;
                }
            }
            else{
                _controller.setVolume(_data.internalData.currentVolume);
            }

            if ((_controller) && (_data.mediaData.isLive)){
                _controller.onAutoSwitchChange(true);
            }

        };

        this.preloadController = function (type) {
            emic.top.debug("[MediaModule.js][preloadController]>> ", type);
            //Los players HTML5 no se precargan por el momento siempre se crean a demanda hasta que tengamos un reload en condiciones en ese controlador
            if ((type != _data.internalData.controllerName) && (type != emic.top.MediaModule.CONTROLLER_TYPE_HTML5NATIVE)) {
                var controller = _factory.getController(type);
                if (controller) {
                    controller.addEventListener(emic.top.event.MediaEvent.ON_READY, _onPreloadControllerComplete, this);
                    emic.top.debug("[MediaModule.js][preloadController]>> Se recupera controlador del Factory");
                    if (controller.isReady()) {
                        emic.top.debug("[MediaModule.js][preloadController]>> El controlador estaba listo, se recarga");
                        controller.reload();
                    } else {
                        emic.top.debug("[MediaModule.js][preloadController]>> El controlador no está listo, se inicializa");
                        controller.init(_data);
                    }
                }
            }

        };

        var _onPreloadControllerComplete = function(e){
            emic.top.debug("[MediaModule.js][_onPreloadControllerComplete]>> ");
            if (e)
                e.target.removeEventListener(emic.top.event.MediaEvent.ON_READY, _onPreloadControllerComplete, this);

            var ev = new emic.top.event.MediaEvent(emic.top.event.MediaEvent.ON_PRELOAD_CONTROLLER_COMPLETE);
            ev.id = _data.mediaData.idTOP;
            this.dispatchEvent(ev);
        };

        this.play = function(){
            emic.top.debug("[MediaModule.js][play]>> ");
            if (_data.internalData.position == emic.top.TopPlayer.POSITION_PREVIEW)
            {
                if(typeof(window["triton_" + _data.genericData.id])== "undefined")
                //con esto no pintamos pixels de audios vacios
                if((typeof(mm_autoplay)!="undefined")&&(mm_autoplay==true)){
                    if((typeof(_controller)!="undefined")&&(typeof(_controller) == "object")){
                        _controller.removeEventListener(emic.top.event.MediaEvent.ON_MEDIA_BEGIN, _onControllerEvent, this);
                    }
                }
                response = false;
                _data.internalData.uiModule.externalNotify(emic.top.event.UIEvent.ON_ORDER_BEGIN)
            }else if ((_loaded == _LOAD_STATUS_LOADED) && (_data.internalData.position == emic.top.TopPlayer.POSITION_MEDIA)){
                if (_status == MediaModule.STATUS_PAUSE){
                    _controller.resume();
                }
                if((_status== MediaModule.STATUS_INITIALIZING)||(_status=="")||(_status==MediaModule.STATUS_STOP)){
                    _controller.play();
                    //_status = MediaModule.STATUS_PLAY;
                }
            }
        };
        this.playpause = function(){
            emic.top.debug("[MediaModule.js][playpause]>> ");
            if ((_loaded == _LOAD_STATUS_LOADED) && (_data.internalData.position == emic.top.TopPlayer.POSITION_MEDIA)){
                _controller.playpause();
            }
        };
        this.getStatus = function(){
            emic.top.debug("[MediaModule.js][getStatus]>> ");
            return _status;
        };
        this.pause = function(){
            emic.top.debug("[MediaModule.js][pause]>> ");
            /*if ((_loaded == _LOAD_STATUS_LOADED) ){  <<<<<<< solución 1 tucu ------*/ if ((_loaded == _LOAD_STATUS_LOADED) && (_data.internalData.position == emic.top.TopPlayer.POSITION_MEDIA)){
                _controller.pause();
                //_status = MediaModule.STATUS_PAUSE;//tucu
            }
        };
        this.stop = function(){
            emic.top.debug("[MediaModule.js][stop]>> ");
            if ((_loaded == _LOAD_STATUS_LOADED) && (_data.internalData.position == emic.top.TopPlayer.POSITION_MEDIA)){
                _controller.stop();
            }
        };
        this.switchUp = function(){
            emic.top.debug("[MediaModule.js][switchUp]>> ");
            if ((_loaded == _LOAD_STATUS_LOADED) && (_data.internalData.position == emic.top.TopPlayer.POSITION_MEDIA)){
                _controller.switchUp();
            }
        };
        this.switchDown = function(){
            emic.top.debug("[MediaModule.js][switchDown]>> ");
            if ((_loaded == _LOAD_STATUS_LOADED) && (_data.internalData.position == emic.top.TopPlayer.POSITION_MEDIA)){
                _controller.switchDown();
            }
        };
        this.switchDirect = function(id){
            emic.top.debug("[MediaModule.js][switchDirect]>> ");
            if ((_loaded == _LOAD_STATUS_LOADED) && (_data.internalData.position == emic.top.TopPlayer.POSITION_MEDIA)){
                _controller.switchDirect(id);
            }
        };

        /**
         *
         * @param prop Valor entre 0 y 1
         */
        this.seekByProp = function(prop){
            emic.top.debug("[MediaModule.js][seekByProp]>> ", prop);
            if ((_loaded == _LOAD_STATUS_LOADED) && (_data.internalData.position == emic.top.TopPlayer.POSITION_MEDIA)){
                if (_totalTime)
                    _controller.seek(prop * _totalTime);
            }
        };

        this.seekLive = function(prop){
            emic.top.debug("[MediaModule.js][seekLive]>> ", prop);
            if ((_loaded == _LOAD_STATUS_LOADED) && (_data.internalData.position == emic.top.TopPlayer.POSITION_MEDIA)){
                _controller.seekLive();
            }
        };

        /**
         *
         * @param secs Valor entre 0 y 1
         */
        this.seek = function(secs){
            emic.top.debug("[MediaModule.js][seek]>> ", secs);
            if ((_loaded == _LOAD_STATUS_LOADED) && (_data.internalData.position == emic.top.TopPlayer.POSITION_MEDIA)){
                _controller.seek(secs);
            }
        };


        /**
         *
         * @param offset Valor entre 0 y 100
         */
        this.setVolume = function(offset){
            emic.top.debug("[MediaModule.js][setVolume]>> ",offset);
            var ev;

            if ((_loaded == _LOAD_STATUS_LOADED) && (_data.internalData.position == emic.top.TopPlayer.POSITION_MEDIA)){


                /*Si el volumen viene a 0 premuted=true*/
                if (offset == 0) {

                    _data.mediaData.premuted = true;
                }else{

                    _data.mediaData.premuted = false;
                }

                _controller.setVolume(offset);
            }else{
                _data.mediaData.startVolume = offset;
            }

            _data.internalData.currentVolume = offset;

            //Desconocemos si Triton dispone de evento onVolume Change, lo damos como cambiado
            ev = new emic.top.event.MediaEvent(emic.top.event.MediaEvent.ON_VOLUME_CHANGE);
            ev.data = offset;
            ev.id = _data.mediaData.idTOP;
            this.dispatchEvent(ev);

        };


        this.mute = function(){
            emic.top.debug("[MediaModule.js][mute]>> ");
            if ((_loaded == _LOAD_STATUS_LOADED) && (_data.internalData.position == emic.top.TopPlayer.POSITION_MEDIA))
                if (_data.internalData.currentVolume == 0){
                    _controller.setVolume(_data.internalData.lastVolume);
                    _data.internalData.currentVolume = _data.internalData.lastVolume;

                    _data.mediaData.premuted = false;

                }else{
                    _data.internalData.lastVolume = _data.internalData.currentVolume;
                    _controller.setVolume(0);
                    _data.internalData.currentVolume = 0;

                    _data.mediaData.premuted = true;
                }
        };

        /**
         * Return: true|false
         */
        this.isPlaying = function(){
            emic.top.debug("[MediaModule.js][isPlaying]>> ");
            return (_status == MediaModule.STATUS_PLAY);
        };

        /**
         * Return: true|false
         */
        this.isBuffering = function(){
            emic.top.debug("[MediaModule.js][isBuffering]>> ");
            return _isBuffering;
        };

        /**
         * Return: Tipo Estado definido en PlayerInterface
         */
        this.getDVRStatus = function(){
            emic.top.debug("[MediaModule.js][getDVRStatus]>> ");
            if ((_loaded == _LOAD_STATUS_LOADED) && (_data.internalData.position == emic.top.TopPlayer.POSITION_MEDIA)){
                return _controller.getDVRStatus();
            }
        };


        /////////////////////////////////////////////////////////
        //   INTERNAL
        /////////////////////////////////////////////////////////

        var _loadController = function(type, callback){
            emic.top.debug("[MediaModule.js][_loadController]>> ",{"type":type, "callback":callback});
            _controller = _factory.getController(type);

            if(type==emic.top.MediaModule.CONTROLLER_TYPE_TRITON){
                window["triton_" + _data.genericData.id] = true;
            }

            if (_controller){
                _controller.addEventListener(emic.top.event.MediaEvent.ON_READY, callback, this);
                _controller.addEventListener(emic.top.event.MediaEvent.ON_MEDIA_BEGIN, _onControllerEvent, this);
                _controller.addEventListener(emic.top.event.MediaEvent.ON_MEDIA_END, _onControllerEvent, this);
                _controller.addEventListener(emic.top.event.MediaEvent.ON_CUE, _onControllerEvent, this);
                _controller.addEventListener(emic.top.event.MediaEvent.ON_METADATA, _onControllerEvent, this);
                _controller.addEventListener(emic.top.event.MediaEvent.ON_ERROR, _onControllerEvent, this);
                _controller.addEventListener(emic.top.event.MediaEvent.ON_AD_INSTREAM_START, _onControllerEvent, this);
                _controller.addEventListener(emic.top.event.MediaEvent.ON_AD_INSTREAM_END, _onControllerEvent, this);
                _controller.addEventListener(emic.top.event.MediaEvent.ON_STATUS_CHANGE, _onControllerEvent, this);
                _controller.addEventListener(emic.top.event.MediaEvent.ON_VOLUME_CHANGE, _onControllerEvent, this);
                _controller.addEventListener(emic.top.event.MediaEvent.ON_SWITCH_REQUEST, _onControllerEvent, this);
                _controller.addEventListener(emic.top.event.MediaEvent.ON_SWITCH_COMPLETE, _onControllerEvent, this);
                _controller.addEventListener(emic.top.event.MediaEvent.ON_PROGRESS, _onControllerEvent, this);
                _controller.addEventListener(emic.top.event.MediaEvent.ON_SEEK_START, _onControllerEvent, this);
                _controller.addEventListener(emic.top.event.MediaEvent.ON_SEEK_COMPLETE, _onControllerEvent, this);
                _controller.addEventListener(emic.top.event.MediaEvent.ON_BUFFER_EMPTY, _onControllerEvent, this);
                _controller.addEventListener(emic.top.event.MediaEvent.ON_BUFFER_FULL, _onControllerEvent, this);
                _controller.addEventListener(emic.top.event.MediaEvent.ON_IS_LIVE_STREAM, _onControllerEvent, this);
                _controller.addEventListener(emic.top.event.MediaEvent.ON_RENDITIONS, _onControllerEvent, this);
                _controller.addEventListener(emic.top.event.MediaEvent.ON_TAG, _onControllerEvent, this);

                if (_controller.isReady()){
                    _controller.reload();
                }else{
                    _controller.init(_data);
                }

            }else{
                emic.top.debug("[MediaModule.js][_loadController]>> ERROR, no existen controladores con ese identificador");
                //TODO: Error, no se han encontrado controladores compatibles
            }
        };


        this.selectController = function (controllerPriority, tecPriorityPC) {
            emic.top.debug("[MediaModule.js][selectController]>> ",{"controllerPriority":controllerPriority, "tecPriorityPC":tecPriorityPC});
            var auxController, auxTec, i, j;
            /**
             * La prioridad por tecnología está por encima que la prioridad por controlador.
             * Buscará el primer controlador compatible con cada una de las tecnologías especificadas en la prioridad
             * En HTML5 no hya prioridad de tecnología, sólo se usa HTML5
             */
            if (getDevice().mobile){
                for (i = 0; i<controllerPriority.length; i++){
                    auxController = controllerPriority[i];
                    if (_isHTML5Compatible.apply(this, [auxController]))
                        break;
                    else
                        auxController = false;
                }
            }else{
                for (j = 0; j<tecPriorityPC.length; j++) {
                    if (!auxController) {
                        auxTec = tecPriorityPC[j];
                        for (i = 0; i < controllerPriority.length; i++) {
                            auxController = controllerPriority[i];
                            if (_isCompatible.apply(this, [auxController, auxTec])) {
                                break;
                            } else {
                                auxController = false;
                            }
                        }
                    }else{
                        break;
                    }
                }
            }

            //Si no se ha seleccionado ningún controlador con éxito se utilizará HTML5 por defecto, ya que existe la posibilidad de que haya compatibilidad pero no se haya seleccionado por no poder identificarla.
            if (!auxController)
                auxController = MediaModule.CONTROLLER_TYPE_HTML5NATIVE;

            emic.top.debug("[MediaModule.js][selectController]>> resultado: ", auxController);

            return auxController

        };

        var _onControllerEvent = function(e){
            if (e.type != emic.top.event.MediaEvent.ON_PROGRESS)
                emic.top.debug("[MediaModule.js][_onControllerEvent]>> ", e.type);
            switch (e.type){
                case emic.top.event.MediaEvent.ON_STATUS_CHANGE:
                    _status = e.data.status;
                break;
                case emic.top.event.MediaEvent.ON_VOLUME_CHANGE:
                    _data.internalData.currentVolume = e.data;
                break;
                case emic.top.event.MediaEvent.ON_PROGRESS:
                    _totalTime = e.data.totalTime;
                break;
                case emic.top.event.MediaEvent.ON_BUFFER_EMPTY:
                    _isBuffering = true;
                break;
                case emic.top.event.MediaEvent.ON_BUFFER_FULL:
                    _isBuffering = false;
                break;
            }

            //Redispatch de los eventos del controlador
            e.id = _data.mediaData.idTOP;
            this.dispatchEvent(e);
        };

        var _isCompatible = function (controller, tec){
            var response = false;
            switch (tec){
                case MediaModule.TECHNOLOGY_FLASH:
                    response = _isFlashCompatible.apply(this,[controller]);
                break;
                case MediaModule.TECHNOLOGY_HTML5:
                    response = _isHTML5Compatible.apply(this,[controller]);
                break;
            }

            return response;
        };

        /**
         * Indica si un controlador es compatible con Flash
         * @param controller
         * @returns Boolean
         * @private
         */
        var _isFlashCompatible = function (controller){
            var response;
            switch (controller){
                case MediaModule.CONTROLLER_TYPE_TRITON:
                    response = true;
                break;
                case MediaModule.CONTROLLER_TYPE_AKAMAIHDS:
                    response = true;
                break;
                case MediaModule.CONTROLLER_TYPE_AKAMAIHD:
                    response = true;
                break;
                case MediaModule.CONTROLLER_TYPE_HTML5NATIVE:
                    response = false;
                break;
                case MediaModule.CONTROLLER_TYPE_YT:
                    response = true;
                break;
                case MediaModule.CONTROLLER_TYPE_DM:
                    response = true;
                break;
//TODOjc2
                case MediaModule.CONTROLLER_TYPE_REAL_HLS:
                    response = true;
                break;
                case MediaModule.CONTROLLER_TYPE_HLS:
                    response = true;
                    break;
            }
//TODOjc2
            if(controller != MediaModule.CONTROLLER_TYPE_REAL_HLS)
                response &= swfobject.hasFlashPlayerVersion("10.0.0");

            return response;
        };

        /**
         * Indica si un controlador es compatible con HTML5
         * @param controller
         * @returns Boolean
         * @private
         */
        var _isHTML5Compatible = function (controller){
            var response;
            switch (controller){
                case MediaModule.CONTROLLER_TYPE_TRITON:
                    response = true;
                break;
                case MediaModule.CONTROLLER_TYPE_AKAMAIHDS:
                    response = false;
                break;
                case MediaModule.CONTROLLER_TYPE_AKAMAIHD:
                    response = false;
                break;
                case MediaModule.CONTROLLER_TYPE_HTML5NATIVE:
                    response = true;
                    //response = getDevice().mobile || _isHTML5CompatibleExtension.apply(this,[controller]);
                break;
                case MediaModule.CONTROLLER_TYPE_YT:
                    response = true
                break;
                case MediaModule.CONTROLLER_TYPE_DM:
                    response = true;
                break;
//TODOjc2
                case MediaModule.CONTROLLER_TYPE_REAL_HLS:
                    response = false;
                break;
                case MediaModule.CONTROLLER_TYPE_HLS:
                    response = false;
                    break;
            }
            return response;
        };

        var _isHTML5CompatibleExtension = function ()
        {
            var response, extension, urlSplit, urlArray;

            if ((_data.mediaData.urlHTML5 != undefined) && (_data.mediaData.urlHTML5.length > 0))
                urlArray = _data.mediaData.urlHTML5;
            else if (_data.mediaData.url != undefined)
                urlArray = [_data.mediaData.url];

            if (urlArray)
            {
                for (i = 0; i < urlArray.length; i++) {
                    urlSplit =  urlArray[i].split(".");
                    extension = urlSplit[urlSplit.length - 1];

                    if(extension.indexOf("?")>0)
                        extension = extension.substr(0,extension.indexOf("?"));

                    if (extension != undefined)
                    {
                        if (_data.mediaData.mimetype.indexOf("audio") != -1)
                        {
                            switch (extension){
                                case _EXTENSION_AAC:

                                    if (psd.framework.aacAudioCompatible)
                                    {
                                        response = true;
                                        return response;
                                    }
                                    else {response = false;}

                                    break;

                                case _EXTENSION_MP3:

                                    if(psd.framework.mp3AudioCompatible)
                                    {
                                        response = true;
                                        return response;
                                    }
                                    else {response = false;}

                                    break;

                                case _EXTENSION_MP4:

                                    if(psd.framework.mp4AudioCompatible)
                                    {
                                        response = true;
                                        return response;
                                    }
                                    else {response = false;}

                                    break;

                                default: response = false;

                            }
                        }
                        else if (_data.mediaData.mimetype.indexOf("video") != -1)
                        {
                            switch (extension){
                                case _EXTENSION_MP4:

                                    if(psd.framework.mp4VideoCompatible)
                                    {
                                        response = true;
                                        return response;
                                    }
                                    else {response = false;}

                                    break;

                                case _EXTENSION_OGG:

                                    if(psd.framework.oggVideoCompatible)
                                    {
                                        response = true;
                                        return response;
                                    }
                                    else {response = false;}

                                    break;

                                case _EXTENSION_WEBM:

                                    if(psd.framework.webmVideoCompatible)
                                    {
                                        response = true;
                                        return response;
                                    }
                                    else {response = false;}

                                    break;
                                default: response = false;
                            }
                        }
                        else {response = false;}
                    }
                }
            }
            else{response = false;}

            return response;
        };

    }

    namespace.MediaModule = MediaModule;
})(emic.top);/**
 * Created by igomez on 03/08/2014.
 */
(function(namespace){

    SocialModule.prototype = new psd.framework.EventDispatcher();

    SocialModule.NETWORK_FACEBOOK = "networkFacebook";
    SocialModule.NETWORK_TWITTER = "networkTwitter";
    SocialModule.NETWORK_GOOGLEPLUS = "networkGoogleplus";


    SocialModule.getUrlShare = function (network, data) {
        emic.top.debug("[SocialModule.js][getUrlShare]>> ",{"network":network, "data":data});
        var url = "";

        //**NOTA: El enlace lo ponemos a fuego temporalmente hasta que el iframe ya tire de topEmbed en lugar de topLauncher. En ese caso cogeríamos el valor de data.socialData.enlace
        var enlace = "http://play.cadenaser.com/audio/" + data.mediaData.idTOP;

        switch (network){
            case SocialModule.NETWORK_FACEBOOK:
                url = encodeURI("https://www.facebook.com/sharer/sharer.php?u=" + enlace);
                //url = encodeURI("https://www.facebook.com/sharer/sharer.php?u=" + data.socialData.enlace);
                break;
            case SocialModule.NETWORK_TWITTER:
                url = encodeURI("https://twitter.com/intent/tweet?text=" + data.mediaData.title + ". " + data.mediaData.description + ". " + "&url=" + enlace);
                //url = encodeURI("https://twitter.com/intent/tweet?text=" + data.mediaData.title + ". " + data.mediaData.description + ". " + "&url=" + data.socialData.enlace);
                break;
            case SocialModule.NETWORK_GOOGLEPLUS:
                url = encodeURI("https://plus.google.com/share?url=" + enlace);
                //url = encodeURI("https://plus.google.com/share?url=" + data.socialData.enlace);
                break;
        }
        return url;
    };

    function SocialModule(){}

    namespace.SocialModule = SocialModule;

})(emic.top);/**
 * Created by igomez on 03/07/2014.
 */
(function (namespace){

    UISkinBase.prototype = new psd.framework.EventDispatcher();


    function UISkinBase(){

        // Super
        psd.framework.EventDispatcher.call(this);

        this.infoEskup = {};
        this.idTop = null;
        var that = this;

        var _parentPlayer;

        this.setPlayer = function(player){
            _parentPlayer = player;
        }

        this.getPlayer = function(){
            return _parentPlayer;
        }

        this.notifyInitComplete = function(){
            this.dispatchEvent(new emic.top.event.UIEvent(emic.top.event.UIEvent.ON_INIT_COMPLETE));
        };
        this.notifyOrderBegin = function(){
            this.dispatchEvent(new emic.top.event.UIEvent(emic.top.event.UIEvent.ON_ORDER_BEGIN));
        };
        this.notifyOrderPlay = function(){
            this.dispatchEvent(new emic.top.event.UIEvent(emic.top.event.UIEvent.ON_ORDER_PLAY));
        };
        this.notifyOrderPause = function(){
            this.dispatchEvent(new emic.top.event.UIEvent(emic.top.event.UIEvent.ON_ORDER_PAUSE));
        };
        this.notifyOrderPlayPause = function(){
            this.dispatchEvent(new emic.top.event.UIEvent(emic.top.event.UIEvent.ON_ORDER_PLAYPAUSE));
        };
        this.notifyOrderStop = function(){
            this.dispatchEvent(new emic.top.event.UIEvent(emic.top.event.UIEvent.ON_ORDER_STOP));
        };
        this.notifyOrderVolumeChange = function(offset){
            var e = new emic.top.event.UIEvent(emic.top.event.UIEvent.ON_ORDER_VOLUME_CHANGE);
            e.data = offset;
            this.dispatchEvent(e);
        };
        this.notifyOrderMute = function(){
            this.dispatchEvent(new emic.top.event.UIEvent(emic.top.event.UIEvent.ON_ORDER_MUTE));
        };
        this.notifyOrderFullScreen = function(){
            this.dispatchEvent(new emic.top.event.UIEvent(emic.top.event.UIEvent.ON_ORDER_FULLSCREEN));
        };
        this.notifyOrderSeekByProp = function(prop){
            var e = new emic.top.event.UIEvent(emic.top.event.UIEvent.ON_ORDER_SEEK_BY_PROP);
            e.data = prop;
            this.dispatchEvent(e);
        };
        this.notifyOrderSeekBySecs = function(secs){
            var e = new emic.top.event.UIEvent(emic.top.event.UIEvent.ON_ORDER_SEEK_BY_SECS);
            e.data = secs;
            this.dispatchEvent(e);
        };
        this.notifyOrderSeekLive = function(){
            var e = new emic.top.event.UIEvent(emic.top.event.UIEvent.ON_ORDER_SEEK_LIVE);
            this.dispatchEvent(e);
        };
        this.notifyOrderNext = function(){
            this.dispatchEvent(new emic.top.event.UIEvent(emic.top.event.UIEvent.ON_ORDER_NEXT));
        };
        this.notifyOrderPrev = function(){
            this.dispatchEvent(new emic.top.event.UIEvent(emic.top.event.UIEvent.ON_ORDER_PREV));
        };
        this.notifyOrderShareFacebook = function(){
            this.dispatchEvent(new emic.top.event.UIEvent(emic.top.event.UIEvent.ON_ORDER_SHARE_FACEBOOK));
        };
        this.notifyOrderShareTwitter = function(){
            this.dispatchEvent(new emic.top.event.UIEvent(emic.top.event.UIEvent.ON_ORDER_SHARE_TWITTER));
        };
        this.notifyOrderShareGoogleplus = function(){
            this.dispatchEvent(new emic.top.event.UIEvent(emic.top.event.UIEvent.ON_ORDER_SHARE_GOOGLEPLUS));
        };

        this.notifyOrderShareWhatsapp = function(){
            this.dispatchEvent(new emic.top.event.UIEvent(emic.top.event.UIEvent.ON_ORDER_SHARE_WHATSAPP));
        };

        //-- Notifica los eventos con subcripciones
        this.notifyOrderShareSubscribe = function (id) {
            ev = new emic.top.event.UIEvent(emic.top.event.UIEvent.ON_ORDER_SHARE_SUBSCRIBE);
            ev.data = id;
            this.dispatchEvent(ev);
        };


        this.notifyOrderSwitchUp = function(){
            this.dispatchEvent(new emic.top.event.UIEvent(emic.top.event.UIEvent.ON_ORDER_SWITCH_UP));
        };
        this.notifyOrderSwitchDown = function(){
            this.dispatchEvent(new emic.top.event.UIEvent(emic.top.event.UIEvent.ON_ORDER_SWITCH_DOWN));
        };
        this.notifyOrderSwitchDirect = function(id){
            var e = new emic.top.event.UIEvent(emic.top.event.UIEvent.ON_ORDER_SWITCH_DIRECT);
            e.data = id;
            this.dispatchEvent(e);
        };

        this.notifyOrderShareExternal = function(){
            this.dispatchEvent(new emic.top.event.UIEvent(emic.top.event.UIEvent.ON_ORDER_SHARE_EXTERNAL));
        };
        this.notifyOrderEmbedExternal = function(){
            this.dispatchEvent(new emic.top.event.UIEvent(emic.top.event.UIEvent.ON_ORDER_EMBED_EXTERNAL));
        };
        this.notifyOrderExternal = function(order, params){
            ev = new emic.top.event.UIEvent(emic.top.event.UIEvent.ON_ORDER_EXTERNAL);
            ev.data.order = order;
            ev.data.params = params;
            this.dispatchEvent(ev);
        };

        this.notifyOrderReset = function(data){
            ev = new emic.top.event.UIEvent(emic.top.event.UIEvent.ON_ORDER_RESET);
            ev.data = data;
            this.dispatchEvent(ev);
        }

        this.notifyOrderChangeLive = function(id, pBotonIrDirecto){
            ev = new emic.top.event.UIEvent(emic.top.event.UIEvent.ON_ORDER_CHANGE_LIVE);
            if(typeof pBotonIrDirecto == 'boolean'){
                ev.botonIrDirecto = pBotonIrDirecto;
            }
            ev.data = id;
            this.dispatchEvent(ev)
        }


        //-- Notifica la pulsacion del cualquier boton del UI
        this.notifyOrderButton = function (id) {
            ev = new emic.top.event.UIEvent(emic.top.event.UIEvent.ON_ORDER_BUTTON);
            ev.data = id;
            this.dispatchEvent(ev);

        }

        this.notifyOrderRRSS = function (id) {
            ev = new emic.top.event.UIEvent(emic.top.event.UIEvent.ON_ORDER_RRSS);
            ev.data = id;
            this.dispatchEvent(ev);

        }

        this.notifyOrderInicioCompartir = function (id) {
            ev = new emic.top.event.UIEvent(emic.top.event.UIEvent.ON_ORDER_INICIOCOMPARTIR);
            ev.data = id;
            this.dispatchEvent(ev);

        }

        this.init = function(data) {};
        this.reset = function() {};

        this.resize = function(width, height){};
        this.onProgress = function(data){};
        this.onVolumeChange = function(prop){};
        this.onStatusChange = function(status){};
        this.onMetadata = function(metadata){};
        this.onCue = function(data){};
        this.onError = function(msg, code){};
        this.onSwitchRequest = function(id){};
        this.onSwitchComplete = function(id){};
        this.requestFullScreen = function(){};
        this.cancelFullScreen = function(){};
        this.onSeekStart = function(offset){};
        this.onSeekComplete = function(offset){};
        this.onBufferEmpty = function(){};
        this.onBufferFull = function(){};
        this.onRenditions = function(){};

        this.externalOrder = function(order,params){};

        this.statusChangeAd = function(status){};
        this.onPositionChange = function (position) {};
        this.showLoading = function (flag) {};

        /////////////////////////////////////////////////////////
        //  HELPERS
        /////////////////////////////////////////////////////////

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
                if(hours<1)
                    timecode = format.replace('hh:', '');
                else
                    timecode = format.replace('hh', hours);

                timecode = timecode.replace('mm', minutes);
                timecode = timecode.replace('ss', seconds);
            }

            return timecode;
        };

        //TODO: Mover a HTML Skin base cuando lo hagamos
        /////////////////////////////////////////////////////////
        //  HTML HELPERS:
        /////////////////////////////////////////////////////////

        /**
         * Devuelve la posición global de un elemento
         * @param element
         * @returns {{x: number, y: number}}
         */
        this.getPosition = function (element) {
            var xPosition = 0;
            var yPosition = 0;

            while (element) {
                xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
                yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
                element = element.offsetParent;
            }
            return { x: xPosition, y: yPosition };
        };

        this.showByName = function(tag){
            var element;
            element = document.getElementById(tag);
            this.show(element);
        };

        this.hideByName = function(tag){
            var element;
            element = document.getElementById(tag);
            this.show(hide);
        };

        this.show = function(element){
            if (element) element.style.display = "";
        };

        this.hide = function(element){
            if (element) element.style.display = "none";
        };

        this.loadEskupInfo = function(idTop){

            if((idTop==null)||(idTop=="")){
                return false;
            }

            this.idTop = idTop;

            var _parser = new psd.framework.parser.JSONParser();
            var _mediator = new psd.framework.Mediator();
            var _url = "http://cadenaser.com/ThreadeskupSimple?action=info&th=" + idTop + "&f=jsonp&1";
            _mediator.corsIE(true);

            _mediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_COMPLETE, onMessagesDataComplete, this);
            _mediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_ERROR, onMessagesDataError, this);

           _mediator.mediate(_url , _parser, psd.framework.Mediator.RESPONSE_JSONP);
        }

        this.loadNComentarios = function(){};

        callbackThreadeskup = function(params){
            that.infoEskup = params;
            that.loadNComentarios();
        }

        var onMessagesDataComplete = function (evt)
        {
            if (evt.result.parserResult.code == 0){
            }
            else if (evt.result.parserResult.code == _CODE_NUM_PARSER_ERROR){
                //TODO: Error
            }
        };

        var onMessagesDataError = function(evt){
        }

        this.recolocarIE8 = function(){

            if(!((psd.framework.ua.msie!=null)&&(psd.framework.ua.msie)&&(parseInt(psd.framework.ua.version)<9)))
                return;

            calcs = $('.calc_pcom');
            for(i=0;i<calcs.length;i++){
                clasesString = calcs[i].className;
                clases = clasesString.split(" ");
                for(j=0;j<clases.length;j++){
                    if((parseInt(clases[j]))&&(clases[j].indexOf("width")>0)){
                        elemento = calcs[i];
                        elemento.style.width = "100%";
                        nuevotam = (calcs[i].offsetWidth - parseInt(clases[j])) + "px";

                        elemento.style.width = nuevotam;
                    }
                    if((parseInt(clases[j]))&&(clases[j].indexOf("height")>0)){
                        elemento = calcs[i];
                        elemento.style.height = "100%";
                        nuevotam = (calcs[i].offsetHeight - parseInt(clases[j])) + "px";

                        elemento.style.height = nuevotam;
                    }
                    if((parseInt(clases[j]))&&(clases[j].indexOf("left")>0)){
                        elemento = calcs[i];
                        elemento.style.left = "100%";
                        nuevotam = (calcs[i].offsetLeft - parseInt(clases[j])) + "px";

                        elemento.style.left = nuevotam;
                    }
                }
            }
        }
    }

    namespace.UISkinBase = UISkinBase;

})(emic.top.ui);
(function(namespace){


    function Bumetro(){

        var _div_id = null;
        var _canvas = null;
        var _ctx = null;
        var _css = {"color1":"#333","color2":"#888","color1over":"#fdbe00","background":"#ddd","lineWidth":3,"lineSeparation":2,"bottom":3,"colorover":"#feeaab","colorloaded":"#444"};

        var _paused = false;
        var _progress = 0;
        var _progressOver = 0;
        var _progressLoaded = 0;
        var _values = [];

        var _offsetLine = 0;
        var _nLines = 0;
        var _offsetOver = 0;

        var _interval = null;
        var _last = false;

        var _ultimatamano = 0;

        this.PROFILE_SIN = "profile_sin";
        this.PROFILE_LINEAR = "profile_linear";
        this.PROFILE_EQUAL = "profile_equal";
        this.PROFILE_WAVE = "profile_wave";
        this.PROFILE_RANDOM = "profile_random";
        this.PROFILE_REAL = "profile_real";

        var _profile = null;
        var _lineValues = [];
        var _counterProfile = 0;

        var _mirror = false;
        var _round = 0;

        var that = this;

        var esdirecto = false;

        this.init = function(div_id,css){

            _div_id = div_id;
            document.getElementById(div_id).innerHTML = "<canvas id='canvas_" + div_id + "' style='width:100%;height:100%;'></canvas>";

            _canvas = document.getElementById("canvas_" + div_id);
            _ctx = _canvas.getContext("2d");

            this.configureStyle(css);
        };

        this.setdirecto = function(dir){
            esdirecto = dir
        };

        this.setMirror = function(mirror){
            if(mirror)
                _mirror = mirror;
            else
                _mirror = !_mirror;
        };

        this.setRound = function(round){
            _round = round;
        };

        this.getRound = function(){
            return _round;
        };

        this.configureStyle = function(css){
            var i;

            if(css){
                for(i in css){
                    _css[i] = css[i];
                }
            }

            this.resize();

            this.setProfile(_profile);
        };

        this.getStyle = function(){
            return _css;
        };

        this.setProfile = function(type){
            _profile = type;
            _lineValues = [];

            for(i=0;i<_nLines;i++){
                _lineValues[i] = _canvas.height/2;
            }
        };

        this.getProfile = function(){
            return _profile;
        };

        this.doProfile = function(last){
            var i;
            _counterProfile++;

            var output = [];

            for(i in _lineValues){
                output[i] = _lineValues[i];
            }

            if(_last){
                _last = false;
                return output;
            }

            switch(_profile){
                case this.PROFILE_REAL:
                    var medio = Math.floor(_nLines/2),
                         contadorbucle = 0,
                         multiplicador = 0.5,
                        i, current;

                    if(_counterProfile%5==0){
                        output[medio] = Math.random()*100 + 50;
                    }

                    output[medio] -= 8;

                    for(i=medio-1;i>-1;i--){
                        contadorbucle++;

                        multiplicador = contadorbucle<5 ? Math.random()*0.1 : Math.random()*0.05;

                        output[i] = output[i+1] - multiplicador*(_nLines-i);

                        if(output[i]<5)
                            output[i] = 5;
                    }
                    contadorbucle = 0;
                    for(i=medio+1;i<_nLines;i++){
                        contadorbucle++;

                        multiplicador = contadorbucle<5 ? 0.1*Math.random() : Math.random()*0.05;

                        //if(Math.random()>0.5)
                         //   multiplicador*=-1;

                        output[i] = output[i-1] - multiplicador*i;

                        if(output[i]<5)
                            output[i] = 5;
                    }
                    break;
                case this.PROFILE_EQUAL:
                    for(i in _lineValues){

                        if(_lineValues[i]>_canvas.height/2){
                            output[i] -= 3;
                        }else if(_lineValues[i]<_canvas.height/2){
                            output[i] += 3;
                        }
                        else{
                            output[i] += Math.random()*4;
                        }
                    }

                    if(_counterProfile%20)
                        output[Math.floor(Math.random()*_nLines)] += Math.random()*50;
                    break;
                case this.PROFILE_LINEAR:
                    for(i in _lineValues){
                        output[i] = _lineValues[i];
                    }
                    break;
                case this.PROFILE_SIN:
                    current = 0;
                    for(i in _lineValues){
                        current++;
                        output[i] = _canvas.height/2 + Math.sin(current)*Math.sin(_counterProfile)*10;
                    }
                    break;
                case this.PROFILE_RANDOM:
                    for(i in _lineValues){
                        output[i] = _canvas.height/2 + Math.sin(Math.random()*6)*35;
                    }
                    break;
                case this.PROFILE_WAVE:
                    current = 0;
                    for(i in _lineValues){
                        _counterProfile++;
                        output[i] = _canvas.height/2 +Math.sin(_counterProfile)*10;
                    }
                    break;
            }

            for(i in output){
                if(output[i]<5)
                    output[i] = 5;
            }

            return output;
        };

        this.setProgress = function(progress){
            _progress = progress;
        };

        this.setProgressLoaded = function(progressLoaded){
            if(progressLoaded!=null)
                _progressLoaded = progressLoaded;
        };

        this.setProgressOver = function(progressOver,offset){
            if(progressOver!=null){
                _progressOver = progressOver;

                if(offset!=null)
                    _offsetOver = offset;
            }
        };

        this.setValues = function(values){
            _values =  values;
        };

        this.resize = function(){
            var i;
            _canvas.width = _canvas.offsetWidth;

            _offsetLine = (parseInt(_css.lineWidth) + parseInt(_css.lineSeparation));
            _nLines = Math.floor(parseInt(_canvas.width)/_offsetLine);

            _lineValues = [];

            for(i=0;i<_nLines;i++){
                _lineValues[i] = _canvas.height/2;
            }

        };

        this.timeout = function(){

            if(_ultimatamano!=_canvas.offsetWidth){
                that.resize();
                _ultimatamano = _canvas.offsetWidth;
            }


            that.paint();
        };

        this.play = function(time){
            _paused = false;

            this.timeout();

            if(_interval==null)
                _interval = setInterval(this.timeout,time);
        };

        this.pause = function(){
            var i;

            _paused = true;


            for(i in _lineValues){
                _lineValues[i] = 5;
            }

            this.paint(true);

            _last = true;

            clearInterval(_interval);
            _interval = null;
        };

        this.paint = function(fromOutside){
            var i;

            _ctx.fillStyle = _css.background;
            _ctx.clearRect(0,0,_canvas.width,_canvas.height);
            _ctx.fillRect(0,0,_canvas.width,_canvas.height);

            var limitOver = _canvas.width * _progressOver / 100 + _offsetOver;
            var limitLoaded = _canvas.width * _progressLoaded / 100;
            var limitLeft = _canvas.width * _progress / 100;

            if(esdirecto){
                limitLeft = 0;
                limitLoaded = 0;
                limitOver = 0;
            }

            var posX = 0;
            var lineHeight = 0;

            if(_profile!=null){
                _lineValues = this.doProfile();
            }else{
                _lineValues = _values;
            }

            if(fromOutside){
                for(i in _lineValues){
                    _lineValues[i] = 5;
                }
            }

            if(_round>0){
                for(i in _lineValues){
                    _lineValues[i] = Math.floor(_lineValues[i]) - _lineValues[i]%_round;
                }
            }

            for(i=0;i<_nLines;i++){

                posX = i*_offsetLine;

                lineHeight = _lineValues[Math.floor(_lineValues.length/(_nLines/i))];

                if(posX<limitLeft){
                    if(posX<limitOver){
                        _ctx.fillStyle = _css.color1over;
                    }else{
                        _ctx.fillStyle = _css.color1;
                    }
                }
                else{
                    if(posX<limitLoaded){
                        _ctx.fillStyle = _css.colorloaded;
                    }
                    else
                        _ctx.fillStyle = _css.color2;

                    if(posX<limitOver)
                        _ctx.fillStyle = _css.colorover;
                }

                if(_mirror){
                    _ctx.fillRect(posX,_canvas.height/2 + lineHeight/2,_css.lineWidth,-lineHeight);
                }
                else{
                    _ctx.fillRect(posX,_canvas.height - _css.bottom,_css.lineWidth,-lineHeight);
                }
            }

            if(!esdirecto){
                _ctx.fillStyle = "gold";
                _ctx.fillRect(limitLeft,_canvas.height - 5,_css.lineWidth,-40);
            }else{
            }
        }
    }

    namespace.Bumetro = Bumetro;

})(emic.top.ui);(function(namespace){


    function Mosaic(){

        var _container = null;
        var _image = null;
        var _w_frame = 0;
        var _h_frame = 0;

        var FRAMES = 60;
        var ROWS = 6;
        var COLUMNS = 10;

        this.enabled = true;

        this.init = function(container,image_url){
            _container = document.getElementById(container);

            if(image_url==undefined){
                this.enabled = false;
                return;
            }

            _image = document.createElement("img");
            _image.src = image_url;

            _image.onload = function(){

                _w_frame = _container.offsetWidth>0 ? _container.offsetWidth : parseInt(_container.style.width);
                _h_frame = _container.offsetHeight>0 ? _container.offsetHeight : parseInt(_container.style.height);

                _container.style.backgroundSize = _w_frame*COLUMNS + "px " + _h_frame*ROWS + "px";
                //_w_frame = (_container.offsetWidth);
                //_h_frame = (_container.offsetHeight);

                _container.style.backgroundImage = "url('" + image_url + "')";
                _container.style.position = "0 0";
            }
        };

        this.paint = function(percent){

            if(!this.enabled)
               return;

            var tile = (FRAMES*percent/100)|0;

            var fila = (tile/10)|0;
            var columna = (tile%10)|0;

            _container.style.backgroundPositionX = -columna * _w_frame;
            _container.style.backgroundPositionY = -fila * _h_frame;

            _container.style.backgroundPosition = (-columna * _w_frame) + "px " + (-fila * _h_frame) + "px";

            //_container.style.marginLeft = x - ((_container.offsetWidth)|0)/2;
        };

        this.resetSize = function(){

            if(!this.enabled)
                return;

            _container.style.backgroundSize = _container.offsetWidth*COLUMNS + "px " + _container.offsetHeight*ROWS + "px";
            _w_frame = (_container.offsetWidth);
            _h_frame = (_container.offsetHeight);
        }
    }
    namespace.Mosaic = Mosaic;

})(emic.top.ui);
(function (namespace) {

    function DragContainer(container, el, onStart, onSeek, onFinish, min, max){
        if(typeof(container)=="string"){
            container = document.getElementById(container);
        }
        if(typeof(el)=="string"){
            el = document.getElementById(el);
        }

        this.container = container;
        this.el = el;
        this.onStart = onStart;
        this.onSeek = onSeek;
        this.onFinish = onFinish;
        this.min = min;
        this.max = max;

        that = this;

        if((typeof(this.onStart)=="undefined")||this.onStart==null){this.onStart = function(){};}
        if((typeof(this.onSeek)=="undefined")||this.onSeek==null){this.onSeek = function(){};}
        if((typeof(this.onFinish)=="undefined")||this.onFinish==null){this.onFinish = function(){};}

        var _x0 = 0;

        this.value = 0;

        this.registrarDrag = function(){
            this.container.addEventListener("touchstart",function(e){
                that.onStart();
                e = e || window.event;

                e = e.targetTouches[0];

                _x0 = (e.pageX)? e.pageX : e.clientX;
                return true;
            });

            this.container.addEventListener("touchmove",function(e){
                e = e || window.event;
                e = e.targetTouches[0];

                var _x1 = (e.pageX)? e.pageX : e.clientX;

                that.value = (_x1-_x0);

                _x0 = _x1;

                var left = (parseInt(that.el.style.left) + that.value);

                if(left<min){
                    left = min;
                }
                if(left>max){
                    left = max;
                }

                that.el.style.left = left + "px";

                that.onSeek(that.value);
                return true;
            });

            this.container.addEventListener("touchend",function(){
                that.onFinish(that.value);
                return true;
            });
        }
    }

    function Drag(el, parent, onStart, onSeek, onFinish) {

        this.el = el;                           //--Contenedor
        this.parent = parent;                   //--Desplazador
        this.onStart = onStart;
        this.onSeek = onSeek;
        this.onFinish = onFinish;

        this.registrarDragFromParent = function () {

            if (this.parent.style.left == "")
                if (this.parent.style.left = "0px")

                    this.registrarDrag(this.el, parseInt(this.parent.style.left), parseInt(this.parent.offsetWidth), this.onStart, this.onSeek, this.onFinish);

        };

        this.registrarDrag = function (el, min, max, onStart, onSeek, onFinish) {

            el.onmousedown = function (e) {
                onStart();
                e = e || window.event;
                if (el.style.left == "")
                    el.style.left = "0px";

                var cu = parseInt((el.style.left));

                var start = 0, diff = 0;
                if (e.pageX) start = e.pageX;
                else if (e.clientX) start = e.clientX;

                el.style.position = 'relative';


                document.body.onmousemove = function (e) {

                    var max = onSeek();

                    e = e || window.event;
                    var end = 0;

                    if (e.pageX) end = e.pageX;
                    else if (e.clientX) end = e.clientX;
                    diff = end - start;

                    el.style.left = (cu + diff) + "px";

                    if ((max != null) && (parseInt(el.style.left) + parseInt(el.offsetWidth) > max)){

                        el.style.left = (max - parseInt(el.offsetWidth)) + "px";


                    }
                    if ((min != null) && (parseInt(el.style.left) < min)){

                        el.style.left = min;
                    }
                };

                document.body.onmouseup = function () {


                    onFinish();

                    document.body.onmousemove = document.body.onmouseup = null;


                };

                /*   parent.onmouseout =function () {


                 document.body.onmousemove = document.body.onmouseup = null;


                 onFinish();


                 }*/
            };

            el.addEventListener("touchstart",function(e){
                console.log("touch start");
                onStart();
                e = e || window.event;

                e = e.targetTouches[0];

                if (el.style.left == "")
                    el.style.left = "0px";

                var cu = parseInt((el.style.left));

                var start = 0, diff = 0;
                if (e.pageX) start = e.pageX;
                else if (e.clientX) start = e.clientX;

                el.style.position = 'relative';

                el.addEventListener("touchmove",function(e){
                    console.log("touch move");
                    var max = onSeek();

                    e = e || window.event;
                    e = e.targetTouches[0];
                    var end = 0;

                    if (e.pageX) end = e.pageX;
                    else if (e.clientX) end = e.clientX;
                    diff = end - start;

                    el.style.left = (cu + diff) + "px";

                    if ((max != null) && (parseInt(el.style.left) + parseInt(el.offsetWidth) > max)){

                        el.style.left = (max - parseInt(el.offsetWidth)) + "px";


                    }
                    if ((min != null) && (parseInt(el.style.left) < min)){

                        el.style.left = min;
                    }
                });

                el.addEventListener("touchend",function(){
                    console.log("touch end");
                    onFinish();
                });
            });
        }

    }

    namespace.DragContainer = DragContainer;
    namespace.Drag = Drag;

})(emic.top.ui);(function(namespace){
    Transcription = function(cont,url,type){

        var _that = this;

        (function () {
            if ( typeof window.CustomEvent === "function" ) return false; //If not IE

            function CustomEvent ( event, params ) {
                params = params || { bubbles: false, cancelable: false, detail: undefined };
                var evt = document.createEvent( 'CustomEvent' );
                evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
                return evt;
            }

            CustomEvent.prototype = window.Event.prototype;

            window.CustomEvent = CustomEvent;
        })();


        this.minWidth = 600;

        this.palabras = [];
        this.frases = [];
        this.spans = [];
        this.speakers = [];

        var _usespans = false;
        var _data;

        var _enabled = true;
        var _texto;

        //función para cargar el JSON
        var getJSON = function(url, successHandler, errorHandler) {
            var xhr = typeof XMLHttpRequest != 'undefined'
                ? new XMLHttpRequest()
                : new ActiveXObject('Microsoft.XMLHTTP');

//          url += ("?r=" + Math.random());

            xhr.open('get', url, true);
            xhr.onreadystatechange = function() {
                var status;
                var data;
                // https://xhr.spec.whatwg.org/#dom-xmlhttprequest-readystate
                if (xhr.readyState == 4) { // `DONE`
                    status = xhr.status;
                    if (status == 200) {
                        data = JSON.parse(xhr.responseText);
                        successHandler && successHandler(data);
                    } else {
                        errorHandler && errorHandler(status);
                    }
                }
            };
            xhr.send();
        };

        var _cont = cont;

        var _index = 0;
        var _lineas = [];

        var _type = type;

        var _back = document.createElement("ul");
        _back.style.position = "absolute";
        _back.style.width = "100%";
        _back.style.top = "0";
        _back.className = "mm_back";

        _cont.innerHTML = "";
        _cont.appendChild(_back);

        this.exists = function(array){
            var exists = true;
            var base = array[0];

            for(var i=1;i<array.length-1;i++){
                if((exists)&&(typeof(base[array[i]])!="undefined")){
                    base = base[array[i]];
                }else{
                    exists = false;
                }
            }

            return exists;
        }

        this.generateSpans = function(container,mediamodule){
            document.getElementById(container).innerHTML = "";

            if(!this.exists([_data,'data',0,'transcription','wordlist']))
                return;

            for(var jj in _data['data'][0]['transcription']['wordlist']){
                var _palabra = _data['data'][0]['transcription']['wordlist'][jj];

                var span = document.createElement("span");
                span.innerHTML = " " + _palabra['content'];
                span.style.cursor = "pointer";

                (function(pal){
                    span.onclick = function(){
                        for(var i in _that.spans){
                            _that.spans[i].style.color = "black";
                        }

                        mediamodule.seek(pal["stime"]);
                    };
                })(_palabra);

                document.getElementById(container).appendChild(span);

                this.spans[this.spans.length] = span;
            }

            _usespans = true;
        }

        this.createLineas = function(){
            if(type==0){
                _texto = this.frases;
                _back.className = "transition";
                _back.style.textAlign = "left";
            }else{
                _texto = this.palabras;
                _back.className = "transition";
                _back.style.textAlign = "center";
            }

            _back.innerHTML = "";

            _lineas = [];

            for(var i in _texto){
                if(_texto[i]['text']!=undefined){
                    var linea = document.createElement("li");
                    var lineaspan = document.createElement("span");
                    lineaspan.innerHTML = _texto[i]['text'];

                    linea.appendChild(lineaspan);

                    //linea.className = "mm_linea";

                    _lineas[_lineas.length] = linea;

                    _back.appendChild(linea);
                }
            }

            this.getIndex(10);

            var event = new CustomEvent('ready',{});
            _cont.dispatchEvent(event);
        }

        this.addEventListener = function(type,callback){
            _cont.addEventListener(type,callback);
        }

        this.removeEventListener = function(type){
            _cont.removeEventListener(type,function(){});
        }

        this.setType = function(newtype){
            type = newtype;
            this.createLineas();
        }

        this.getIndex = function(time){
            if(!_enabled)
                return;

            try{
                for(var i in _texto){
                    if(i<_texto.length){
                        if((_texto[i]['startm']<time)&&(_texto[i]['endm']>time)){
                            _index = i;
                        }
                    }
                }
            }
            catch(e){
                console.log(e);
            }

            this.paint();
        }

        this.updatespans = function(){
            if(type==1){
                for(var i in this.spans){
                    this.spans[i].style.color = "black";
                }
                //this.spans[_index].style.color = "white";
            }else{
                for(var i in this.spans){
                    this.spans[i].style.color = "black";
                }
            }
        }

        this.setEnabled = function(enabled){
            if(enabled)
                _cont.style.display = "block";
            else
                _cont.style.display = "none";
        }

        this.paint = function(){
            if(!_enabled)
                return;
            if(_lineas.length==0)
                return;

            if(_cont.offsetWidth<this.minWidth){
                if(type==0)
                    this.setType(1);
            }else{
                if(type==1)
                    this.setType(0);
            }

            if(_usespans)
                this.updatespans();

            var p = _lineas[_index];
            var p_prev = _index>0 ? _lineas[_index-1] : _lineas[_index];
            var p_post;

            var last = false;

            if(_index<_lineas.length-1){
                p_post = _lineas[parseInt(_index)+1]
            }else{
                p_post = _lineas[_lineas.length-1];
                last = true;
            }

            for(i in _lineas){
                _lineas[i].className = "";
            }

            if(typeof p_prev!="undefined")
                p_prev.className = "anterior";

            if(typeof p_post!="undefined")
                p_post.className = "siguiente";

            if(typeof p!="undefined")
                p.className = "activo";

            var cont_height = _cont.offsetHeight;
            var back_height = _back.offsetHeight;
            var p_height = p.offsetHeight;
            var p_top = p.offsetTop;

            _back.style.top = (- p_top + cont_height/2 - p_height/2) + "px";
        }

        if(typeof(window.onresize)=="function")
            this.preResize = window.onresize;
        else
            this.preResize = function(){
                //console.log(window.innerWidth);
            }

        window.onresize = function(){
            _that.preResize();
            _that.paint();
        }

        this.getSpeakers = function(){
            var _ret = "";

            for(var i in _that.speakers){
                if(typeof(_that.speakers[i].description)!="undefined"){
                    if(_that.speakers[i].description!=""){
                        _ret += _that.speakers[i].description + ";";
                    }
                    else{
                        if(_that.speakers[i].idref!=""){
                            _ret += _that.speakers[i].idref + ";";
                        }
                    }

                }
            }
            _ret += "---";
            _ret = _ret.replace(";---","").replace("---","");

            return _ret;
        }

        this.onDataLoaded = function(data){

            _data = data;

            //gestión de frases del SRT
            function strip(s) {
                if(typeof(s)!="undefined")
                    return s.replace(/^\s+|\s+$/g,"");
                else
                    return "";
            }

            if(typeof(data['data'][0])=="undefined"){
                _enabled = false;

                var event = new CustomEvent('notranscription',{});
                _cont.dispatchEvent(event);

                return "";
            }

            var event = new CustomEvent('transcriptionready',{});
            _cont.dispatchEvent(event);

            var _srt = data['data'][0]["srt"];
            this.speakers =  _data['data'][0]['speakers'];

            if(_srt==null){
                _enabled = false;

                var event = new CustomEvent('notranscription',{});
                _cont.dispatchEvent(event);

                return "";
            }

            srt = _srt.replace(/\r\n|\r|\n/g, '\n');
            srt = strip(srt);

            var srt_ = srt.replace('\n\n\n','\n\n').split('\n\n');
            var subtitles = [];

            for(jj=0;jj<srt_.length;jj++) {
                var s = jj;

                st = srt_[s].split('\n');

                if(st.length >=2) {
                    n = st[0];
                    i = strip(st[1].split(' --> ')[0]);
                    o = strip(st[1].split(' --> ')[1]);
                    t = st[2];

                    if(st.length > 2) {
                        for(j=3; j<st.length;j++)
                            t += '\n'+st[j];
                    }

                    subtitles[jj] = {};
                    subtitles[jj].number = n;
                    subtitles[jj].start = i;
                    subtitles[jj].end = o;
                    subtitles[jj].text = t;

                    //convertimos en millis
                    var mstart0 = i.split(",");
                    var mstart1 = mstart0[0].split(":");
                    var mstartmillis = parseInt(mstart0[1]) + parseInt(mstart1[2])*1000 + parseInt(mstart1[1])*1000*60 + parseInt(mstart1[0])*1000*60*60;
                    var mend0 = o.split(",");
                    var mend1 = mend0[0].split(":");
                    var mendmillis = parseInt(mend0[1]) + parseInt(mend1[2])*1000 + parseInt(mend1[1])*1000*60 + parseInt(mend1[0])*1000*60*60;

                    subtitles[jj].startm = mstartmillis;
                    subtitles[jj].endm = mendmillis;
                }
            }

            this.frases = subtitles;

            //gestión de palabras

            var subtitlesw = [];

            for(var jj in data['data'][0]['transcription']['wordlist']){
                var _palabra = data['data'][0]['transcription']['wordlist'][jj];

                subtitlesw[jj] = {};
                subtitlesw[jj].number = jj;
                subtitlesw[jj].start = "";
                subtitlesw[jj].end = "";
                subtitlesw[jj].text = _palabra['content'];
                subtitlesw[jj].startm = parseFloat(_palabra["stime"])*1000;
                subtitlesw[jj].endm = parseFloat(_palabra["stime"])*1000 + parseFloat(_palabra["dur"]*1000);
            }

            this.palabras = subtitlesw;

            this.createLineas();
        }

        getJSON(url,
            function(data) {
                _that.onDataLoaded(data);
            }
            ,
            function(){
                console.log("Error leyendo datos");
            });

        return this;
    }

    namespace.Transcription = Transcription;

})(emic.top.ui);/**
 * Created by igomez on 24/07/2014.
 */
(function(namespace){


    UIPreviewBase.prototype = new psd.framework.EventDispatcher();

    function UIPreviewBase (){

        // Super
        psd.framework.EventDispatcher.call(this);

        this.init = function () {};
        this.reset = function () {};
        this.kill = function () {};

        this.notifyPreviewReady = function(){
            this.dispatchEvent(new emic.top.event.UIEvent(emic.top.event.UIEvent.ON_PREVIEW_READY));
        };
        this.notifyOrderBegin = function(){
            this.dispatchEvent(new emic.top.event.UIEvent(emic.top.event.UIEvent.ON_ORDER_BEGIN));
        };
    }
    namespace.UIPreviewBase = UIPreviewBase;

})(emic.top.ui);/**
 * Created by igomez on 24/07/2014.
 */
(function(namespace){

    TopPreview_generic.prototype = new emic.top.ui.UIPreviewBase();

    function TopPreview_generic (){

        emic.top.ui.UIPreviewBase.call(this);

        var _data;
        var _content;
        var _img;

        this.init = function (data) {

            //TODO: Modificar el escalado para que la imagen no haga fit y evitar que se distorsione
            //TODO: Proteger carga de imagen cuando no llega
            var container;

            _data = data;

            _content = document.getElementById(_data.internalData.previewContainer);

            _content.style["background-color"] = "black";

            _img = document.createElement('img');
            _img.setAttribute('src', _data.uiData.poster);
            _img.setAttribute('width', _data.genericData.width);
            _img.setAttribute('height', _data.genericData.height);

            _content.onclick = (function (that){
                return function(){
                    that.notifyOrderBegin();
                }
            })(this);

            _img.onload = (function (that){
                return function(){
                }
            })(this);

            _content.appendChild(_img);

            this.notifyPreviewReady();
        };
        this.reset = function () {
            _img.setAttribute('src', _data.uiData.poster);
        };
        this.kill = function () {
            _content.removeChild(_img);
        };

    }

    namespace.TopPreview_generic = TopPreview_generic;

})(emic.top.ui);/**
 * Created by IGomezG on 10/02/14.
 */
(function (namespace){

    function UIFactory(){

        //array que contiene el nombre del directorio y de la clase para cada skin
        this.skinDirNames = [];

        this.skinDirNames[emic.top.UIModule.SKIN_MERISTATION] = ["meristation","meristation"];
        this.skinDirNames[emic.top.UIModule.SKIN_HUFFINGTON] = ["huff","huff"];
        this.skinDirNames[emic.top.UIModule.SKIN_TRANSPARENT] = ["transparent","transparent"];
        this.skinDirNames[emic.top.UIModule.SKIN_SMODA] = ["smoda","smoda"];
        this.skinDirNames[emic.top.UIModule.SKIN_LOS40] = ["los40","los40"];
        this.skinDirNames[emic.top.UIModule.SKIN_PSV2] = ["psv2","PSv2"];
        this.skinDirNames[emic.top.UIModule.SKIN_CSV2] = ["csv2","CSv2"];
        this.skinDirNames[emic.top.UIModule.SKIN_GENERICV2] = ["genericv2","genericv2"];
        this.skinDirNames[emic.top.UIModule.SKIN_ELPAIS] = ["elpais","elpais"];
        this.skinDirNames[emic.top.UIModule.SKIN_LATAM] = ["latam","latam"];
        this.skinDirNames[emic.top.UIModule.SKIN_PLAYSER] = ["playser","playser"];
        this.skinDirNames[emic.top.UIModule.SKIN_PLAYSER2] = ["playser2","playser2"];
        this.skinDirNames[emic.top.UIModule.SKIN_PLAYSER_DETALLE] = ["playser_det","playser_det"];
        this.skinDirNames[emic.top.UIModule.SKIN_PLAYSER_PEP] = ["playser_pep","playser_pep"];
        this.skinDirNames[emic.top.UIModule.SKIN_VIDEOGENERIC] = ["videogeneric","videogeneric"];
        this.skinDirNames[emic.top.UIModule.SKIN_PODCASTS] = ["podcasts","podcasts"];
	    this.skinDirNames[emic.top.UIModule.SKIN_HERTZ] = ["hertz","Hertz"];
	    this.skinDirNames[emic.top.UIModule.SKIN_EPPODCAST] = ["eppodcast","EPpodcast"];
        this.skinDirNames[emic.top.UIModule.SKIN_ONEPLAYER] = ["oneplayer","oneplayer"];

        //TODO: Petición asíncrona de vistas (loadSkin)
        this.getSkin = function(type) {
            var instance;

            switch (type) {
                case emic.top.UIModule.SKIN_GENERIC_FENIX:
                    instance = new emic.top.ui.SkinFenix(type);
                break;
                case emic.top.UIModule.SKIN_TEST:
                    instance = new emic.top.ui.TopSkin_test();
                break;
                case emic.top.UIModule.SKIN_PLAYSER_PEP:
                    instance = new emic.top.ui.TopSkin_playser_pep();
                break;
                case emic.top.UIModule.SKIN_PLAYSER_DETALLE:
                    instance = new emic.top.ui.TopSkin_playser_det();
                break;
                case emic.top.UIModule.SKIN_PLAYSER:
                    instance = new emic.top.ui.TopSkin_playser();
                break;
                case emic.top.UIModule.SKIN_PLAYSER2:
                    instance = new emic.top.ui.TopSkin_playser2();
                    break;
                case emic.top.UIModule.SKIN_LUIS:
                    instance = new emic.top.ui.TopSkin_luis();
                    break;
                case emic.top.UIModule.SKIN_MERISTATION:
                    instance = new emic.top.ui.TopSkin_meristation();
                    break;
                case emic.top.UIModule.SKIN_HUFFINGTON:
                    instance = new emic.top.ui.TopSkin_huff();
                    break;
                case emic.top.UIModule.SKIN_TRANSPARENT:
                    instance = new emic.top.ui.TopSkin_transparent();
                    break;
                case emic.top.UIModule.SKIN_SMODA:
                    instance = new emic.top.ui.TopSkin_smoda();
                    break;
                case emic.top.UIModule.SKIN_LOS40:
                    instance = new emic.top.ui.TopSkin_los40();
                    break;
                case emic.top.UIModule.SKIN_PSV2:
                    instance = new emic.top.ui.TopSkin_PSv2();
                    break;
                case emic.top.UIModule.SKIN_CSV2:
                    instance = new emic.top.ui.TopSkin_CSv2();
                    break;
                case emic.top.UIModule.SKIN_GENERICV2:
                    instance = new emic.top.ui.TopSkin_genericv2();
                    break;
                case emic.top.UIModule.SKIN_PMETA:
                    instance = new emic.top.ui.TopSkin_PMETA();
                    break;
                case emic.top.UIModule.SKIN_ELPAIS:
                    instance = new emic.top.ui.TopSkin_elpais();
                    break;
                case emic.top.UIModule.SKIN_LATAM:
                    instance = new emic.top.ui.TopSkin_latam();
                    break;
                case emic.top.UIModule.SKIN_VIDEOGENERIC:
                    instance = new emic.top.ui.TopSkin_videogeneric();
                    break;
                case emic.top.UIModule.SKIN_PODCASTS:
                    instance = new emic.top.ui.TopSkin_podcasts();
                    break;
				case emic.top.UIModule.SKIN_HERTZ:
                    instance = new emic.top.ui.TopSkin_hertz();
                    break;
                case emic.top.UIModule.SKIN_EPPODCAST:
                    instance = new emic.top.ui.TopSkin_EPpodcast();
                    break;
                case emic.top.UIModule.SKIN_ONEPLAYER:
                    instance = new emic.top.ui.TopSkin_oneplayer();
                    break;
                default:
                    instance = new emic.top.ui.TopSkin_playser();
                    //instance = new emic.top.ui.SkinFenix(emic.top.UIModule.SKIN_GENERIC_FENIX);

                break;
            }
            return instance;
        };

        this.getPreview = function(type) {
            var instance;

            switch (type) {
                case emic.top.UIModule.SKIN_TEST:
                    instance = new emic.top.ui.TopPreview_generic();
                break;
                default:
                    instance = new emic.top.ui.TopPreview_generic();
                break;
            }
            return instance;
        }
    }

    namespace.UIFactory = UIFactory;
})(emic.top.ui);
/**
 * Created by igomez on 02/07/2014.
 */
(function (namespace){

    UIModule.prototype = new psd.framework.EventDispatcher();

    UIModule.SKIN_GENERIC_FENIX = "generic_f";
    UIModule.SKIN_TEST = "test";
    UIModule.SKIN_PLAYSER_PEP = "playserPEP";
    UIModule.SKIN_PLAYSER_DETALLE = "playserDetalle";
    UIModule.SKIN_PLAYSER = "playser";
    UIModule.SKIN_PLAYSER2 = "playser2";
    UIModule.SKIN_LUIS = "luis";
    UIModule.SKIN_MERISTATION = "meristation";
    UIModule.SKIN_HUFFINGTON = "huffingtonpost";
    UIModule.SKIN_TRANSPARENT = "transparent";
    UIModule.SKIN_SMODA = "smoda";
    UIModule.SKIN_LOS40 = "los40videos";
    UIModule.SKIN_PSV2 = "psv2";
    UIModule.SKIN_CSV2 = "csv2";
    UIModule.SKIN_GENERICV2 = "genericv2";
    UIModule.SKIN_PMETA = "pmeta";
    UIModule.SKIN_ELPAIS = "elpais";
    UIModule.SKIN_LATAM = "latam";
    UIModule.SKIN_VIDEOGENERIC = "videogeneric";
    UIModule.SKIN_PODCASTS = "podcasts";
    UIModule.SKIN_HERTZ = "hertz";
    UIModule.SKIN_EPPODCAST = "eppodcast";
    UIModule.SKIN_ONEPLAYER = "oneplayer";

    UIModule.PREVIEW_GENERIC = "generic";

    //TODO: Gestión de resize del elemento media (por ejemplo, para vídeo)
    //TODO: Skin empty
    //TODO: Resetear la vista cuando finaliza la posición MEDIA
    //TODO: Algunas vistas puden afectar sobre el tamaño final de MediaModule. Contar con esto (ej, barra sin transparencia)
    function UIModule(dataModel){

        // Super
        psd.framework.EventDispatcher.call(this);

        var _data = dataModel;

        var _factory = new emic.top.ui.UIFactory();
        _data.internalData.UIFactory = _factory;
        var _skin;
        var _skinReady = false;
        var _playerviews = [];
        var _preview;

        var _parentPlayer;

        /////////////////////////////////////////////////////////
        //  INTERNAL
        /////////////////////////////////////////////////////////

        var _skinHandler = function(event){
            emic.top.debug("[UIModule.js][_skinHandler]>> ",event.type);
            //Redispatch de los eventos del skin

            switch (event.type){
                case emic.top.event.UIEvent.ON_ORDER_PLAY:
                case emic.top.event.UIEvent.ON_ORDER_PLAYPAUSE:
                    if (_data.internalData.position == emic.top.TopPlayer.POSITION_PREVIEW){
                        this.dispatchEvent(new emic.top.event.UIEvent(emic.top.event.UIEvent.ON_ORDER_BEGIN));
                    }else{
                        this.dispatchEvent(event);
                    }
                break;
                case emic.top.event.UIEvent.ON_ORDER_BEGIN:
                    this.dispatchEvent(event);
                break;
                case emic.top.event.UIEvent.ON_ORDER_CHANGE_LIVE:
                    this.dispatchEvent(event);
                    break;
                case emic.top.event.UIEvent.ON_ORDER_SHARE_FACEBOOK:
                    if (_data.uiData.skin == 'playserPEP' || _data.uiData.skin == 'playserDetalle') {
                        window.open(emic.top.SocialModule.getUrlShare(emic.top.SocialModule.NETWORK_FACEBOOK, _data));
                    }
                    this.dispatchEvent(event);
                break;
                case emic.top.event.UIEvent.ON_ORDER_SHARE_TWITTER:
                    if (_data.uiData.skin == 'playserPEP' || _data.uiData.skin == 'playserDetalle') {
                        window.open(emic.top.SocialModule.getUrlShare(emic.top.SocialModule.NETWORK_TWITTER, _data));
                    }
                    this.dispatchEvent(event);
                break;
                case emic.top.event.UIEvent.ON_ORDER_SHARE_GOOGLEPLUS:
                    if (_data.uiData.skin == 'playserPEP' || _data.uiData.skin == 'playserDetalle') {
                        window.open(emic.top.SocialModule.getUrlShare(emic.top.SocialModule.NETWORK_GOOGLEPLUS, _data));
                    }
                    this.dispatchEvent(event);
                break;
                case emic.top.event.UIEvent.ON_ORDER_SHARE_WHATSAPP:
                    this.dispatchEvent(event);
                    break;
                case emic.top.event.UIEvent.ON_ORDER_SHARE_SUBSCRIBE:
                    this.dispatchEvent(event);
                    break;
                case emic.top.event.UIEvent.ON_ORDER_BUTTON:
                    this.dispatchEvent(event);
                    break;
                case emic.top.event.UIEvent.ON_ORDER_RSS:
                    this.dispatchEvent(event);
                    break;
                case emic.top.event.UIEvent.ON_ORDER_INICIOCOMPARTIR:
                    this.dispatchEvent(event);
                    break;
                case emic.top.event.UIEvent.ON_INIT_COMPLETE:
                    _skinReady = true;
                    this.dispatchEvent(event);
                break;
                default:
                    this.dispatchEvent(event);
                break;
            }
        };

        var _previewHandler = function(event){
            emic.top.debug("[UIModule.js][_previewHandler]>> ",event.type);
            switch (event.type){
                case emic.top.event.UIEvent.ON_ORDER_BEGIN:
                    this.dispatchEvent(event);
                break;
            }
        };

        var _initPreview = function(){
            emic.top.debug("[UIModule.js][_initPreview]>> ");
            if (_data.uiData.showPreview) {
                _preview = _factory.getPreview(_data.uiData.preview);

                if (_preview) {
                    _preview.addEventListener(emic.top.event.UIEvent.ON_INIT_COMPLETE, _previewHandler, this);
                    _preview.addEventListener(emic.top.event.UIEvent.ON_ORDER_BEGIN, _previewHandler, this);
                    _preview.init(_data);
                }
            }
        };

        /////////////////////////////////////////////////////////
        //  API
        /////////////////////////////////////////////////////////

        this.externalNotify = function (type, data, id) {
            emic.top.debug("[UIModule.js][externalNotify]>> ",{"type":type, "data":data, "id":id});
            var e = new emic.top.event.UIEvent(type);
            if (data) e.data = data;
            if (id) e.id = id;

            _skinHandler.apply(this,[e]);
        };

        this.setPlayer = function(player){
            _parentPlayer = player;
        }

        this.getPlayer = function(){
            return _parentPlayer;
        }

        this.loadSkin = function(typeSkin){

            var skinDirNames = undefined;

            if( _factory.skinDirNames[typeSkin]!=undefined)
                skinDirNames = _factory.skinDirNames[typeSkin];

            if(skinDirNames==undefined){
                emic.top.debug("No existe el skin asociado al tipo",typeSkin);
                return;
            }

            var script = document.createElement("script");

            var base = _data.genericData.urlBase ? _data.genericData.urlBase : "";

            if(typeof(tplib)=="undefined")
                script.src = base + "/psdmedia/media/top/skins/" + skinDirNames[0] + "/TopSkin_" + skinDirNames[1] + ".min.js";
            else
                script.src = base + "/psdmedia/media/top/skins/" + skinDirNames[0] + "/TopSkin_" + skinDirNames[1] + ".lib.js";

            script.type = 'text/javascript';
            script.onload = (function(that) {
                return function(){
                    that.onSkinLoaded();
                }
            })(this);

            document.getElementsByTagName('head')[0].appendChild(script);
        }

        this.init = function () {
            emic.top.debug("[UIModule.js][init]>> ");
            this.loadSkin(_data.uiData.skin);
        };

        this.getget = function(property){
            if(typeof(_skin[property]!="undefined")){
                return _skin[property];
            }else
                return null;
        }

        this.createPlayerViewReset = function(launcher){
            _skin.setPlayerviewReset(launcher);
        }

        this.createPlayerView = function(domid,vars){
            var type = _data.uiData.skin;

            if(vars)
                window._aux_playerviewinfo = vars;

            var _playerview = _factory.getSkin(type);
            if(!((typeof(_playerview.playerViewCompatible)!="undefined")&&(_playerview.playerViewCompatible==true))){
                //EL SKIN NO ES COMPATIBLE CON PLAYERVIEWS!!!
                emic.top.debug("El skin " + type + " no es compatible con PlayerViews");
                return;
            }

            _playerview.soyPlayerView = true;
            _playerview.enabled = true;
            _playerview.setPlayer(this.getPlayer());

            if (_playerview){
                _playerview.addEventListener(emic.top.event.UIEvent.ON_INIT_COMPLETE, _skinHandler, this);
                _playerview.addEventListener(emic.top.event.UIEvent.ON_ORDER_BEGIN, _skinHandler, this);
                _playerview.addEventListener(emic.top.event.UIEvent.ON_ORDER_PLAY, _skinHandler, this);
                _playerview.addEventListener(emic.top.event.UIEvent.ON_ORDER_PAUSE, _skinHandler, this);
                _playerview.addEventListener(emic.top.event.UIEvent.ON_ORDER_PLAYPAUSE, _skinHandler, this);
                _playerview.addEventListener(emic.top.event.UIEvent.ON_ORDER_STOP, _skinHandler, this);
                _playerview.addEventListener(emic.top.event.UIEvent.ON_ORDER_VOLUME_CHANGE, _skinHandler, this);
                _playerview.addEventListener(emic.top.event.UIEvent.ON_ORDER_MUTE, _skinHandler, this);
                _playerview.addEventListener(emic.top.event.UIEvent.ON_ORDER_FULLSCREEN, _skinHandler, this);
                _playerview.addEventListener(emic.top.event.UIEvent.ON_ORDER_SEEK_BY_PROP, _skinHandler, this);
                _playerview.addEventListener(emic.top.event.UIEvent.ON_ORDER_SEEK_BY_SECS, _skinHandler, this);
                _playerview.addEventListener(emic.top.event.UIEvent.ON_ORDER_SEEK_LIVE, _skinHandler, this);
                _playerview.addEventListener(emic.top.event.UIEvent.ON_ORDER_SHARE_FACEBOOK, _skinHandler, this);
                _playerview.addEventListener(emic.top.event.UIEvent.ON_ORDER_SHARE_TWITTER, _skinHandler, this);
                _playerview.addEventListener(emic.top.event.UIEvent.ON_ORDER_SHARE_GOOGLEPLUS, _skinHandler, this);
                _playerview.addEventListener(emic.top.event.UIEvent.ON_ORDER_SHARE_WHATSAPP, _skinHandler, this);
                _playerview.addEventListener(emic.top.event.UIEvent.ON_ORDER_SHARE_SUBSCRIBE, _skinHandler, this);
                _playerview.addEventListener(emic.top.event.UIEvent.ON_ORDER_NEXT, _skinHandler, this);
                _playerview.addEventListener(emic.top.event.UIEvent.ON_ORDER_PREV, _skinHandler, this);
                _playerview.addEventListener(emic.top.event.UIEvent.ON_ORDER_SHARE_EXTERNAL, _skinHandler, this);
                _playerview.addEventListener(emic.top.event.UIEvent.ON_ORDER_EMBED_EXTERNAL, _skinHandler, this);
                _playerview.addEventListener(emic.top.event.UIEvent.ON_ORDER_EXTERNAL, _skinHandler, this);
                _playerview.addEventListener(emic.top.event.UIEvent.ON_ORDER_RESET, _skinHandler, this);
                _playerview.addEventListener(emic.top.event.UIEvent.ON_ORDER_SWITCH_DIRECT, _skinHandler, this);
                _playerview.addEventListener(emic.top.event.UIEvent.ON_ORDER_SWITCH_DOWN, _skinHandler, this);
                _playerview.addEventListener(emic.top.event.UIEvent.ON_ORDER_SWITCH_UP, _skinHandler, this);
                _playerview.addEventListener(emic.top.event.UIEvent.ON_ORDER_CHANGE_LIVE, _skinHandler, this);
                _playerview.addEventListener(emic.top.event.UIEvent.ON_ORDER_BUTTON, _skinHandler, this);
                _playerview.addEventListener(emic.top.event.UIEvent.ON_ORDER_RRSS, _skinHandler, this);
                _playerview.addEventListener(emic.top.event.UIEvent.ON_ORDER_INICIOCOMPARTIR, _skinHandler, this);

                var auxdata = {};
                for(i in _data){
                    auxdata[i] = _data[i];
                }
                auxdata.internalData.skinContainer = domid;
                auxdata.genericData.id = domid;

                _playerview.init(auxdata);

                _playerviews[_playerviews.length] = _playerview;
            }
        }

        this.getSkin = function(){
            return _skin;
        }

        this.onSkinLoaded = function(){

            _skin = _factory.getSkin(_data.uiData.skin);
            _skin.setPlayer(this.getPlayer());

            if (_skin){
                _skin.addEventListener(emic.top.event.UIEvent.ON_INIT_COMPLETE, _skinHandler, this);
                _skin.addEventListener(emic.top.event.UIEvent.ON_ORDER_BEGIN, _skinHandler, this);
                _skin.addEventListener(emic.top.event.UIEvent.ON_ORDER_PLAY, _skinHandler, this);
                _skin.addEventListener(emic.top.event.UIEvent.ON_ORDER_PAUSE, _skinHandler, this);
                _skin.addEventListener(emic.top.event.UIEvent.ON_ORDER_PLAYPAUSE, _skinHandler, this);
                _skin.addEventListener(emic.top.event.UIEvent.ON_ORDER_STOP, _skinHandler, this);
                _skin.addEventListener(emic.top.event.UIEvent.ON_ORDER_VOLUME_CHANGE, _skinHandler, this);
                _skin.addEventListener(emic.top.event.UIEvent.ON_ORDER_MUTE, _skinHandler, this);
                _skin.addEventListener(emic.top.event.UIEvent.ON_ORDER_FULLSCREEN, _skinHandler, this);
                _skin.addEventListener(emic.top.event.UIEvent.ON_ORDER_SEEK_BY_PROP, _skinHandler, this);
                _skin.addEventListener(emic.top.event.UIEvent.ON_ORDER_SEEK_BY_SECS, _skinHandler, this);
                _skin.addEventListener(emic.top.event.UIEvent.ON_ORDER_SEEK_LIVE, _skinHandler, this);
                _skin.addEventListener(emic.top.event.UIEvent.ON_ORDER_SHARE_FACEBOOK, _skinHandler, this);
                _skin.addEventListener(emic.top.event.UIEvent.ON_ORDER_SHARE_TWITTER, _skinHandler, this);
                _skin.addEventListener(emic.top.event.UIEvent.ON_ORDER_SHARE_GOOGLEPLUS, _skinHandler, this);
                _skin.addEventListener(emic.top.event.UIEvent.ON_ORDER_SHARE_WHATSAPP, _skinHandler, this);
                _skin.addEventListener(emic.top.event.UIEvent.ON_ORDER_SHARE_SUBSCRIBE, _skinHandler, this);
                _skin.addEventListener(emic.top.event.UIEvent.ON_ORDER_NEXT, _skinHandler, this);
                _skin.addEventListener(emic.top.event.UIEvent.ON_ORDER_PREV, _skinHandler, this);
                _skin.addEventListener(emic.top.event.UIEvent.ON_ORDER_SHARE_EXTERNAL, _skinHandler, this);
                _skin.addEventListener(emic.top.event.UIEvent.ON_ORDER_EMBED_EXTERNAL, _skinHandler, this);
                _skin.addEventListener(emic.top.event.UIEvent.ON_ORDER_EXTERNAL, _skinHandler, this);
                _skin.addEventListener(emic.top.event.UIEvent.ON_ORDER_RESET, _skinHandler, this);
                _skin.addEventListener(emic.top.event.UIEvent.ON_ORDER_SWITCH_DIRECT, _skinHandler, this);
                _skin.addEventListener(emic.top.event.UIEvent.ON_ORDER_SWITCH_DOWN, _skinHandler, this);
                _skin.addEventListener(emic.top.event.UIEvent.ON_ORDER_SWITCH_UP, _skinHandler, this);
                _skin.addEventListener(emic.top.event.UIEvent.ON_ORDER_CHANGE_LIVE, _skinHandler, this);
                _skin.addEventListener(emic.top.event.UIEvent.ON_ORDER_BUTTON, _skinHandler, this);
                _skin.addEventListener(emic.top.event.UIEvent.ON_ORDER_RRSS, _skinHandler, this);
                _skin.addEventListener(emic.top.event.UIEvent.ON_ORDER_INICIOCOMPARTIR, _skinHandler, this);

                _skinReady = false;
                _skin.init(_data);
            }

            _initPreview.apply(this);
        }

        this.externalOrder = function(order,params){
            emic.top.debug("[UIModule.js][externalOrder]>> ",{"order":order, "params":params});
            if(_skin)
                _skin.externalOrder(order,params);
            for(var i in _playerviews)
                if(_playerviews[i].enabled)_playerviews[i].externalOrder(order,params);
        };

        this.reset = function () {
            emic.top.debug("[UIModule.js][reset]>> ");
            if(_skin)
            if(typeof(_skin.reset_skin)!="undefined"){
                _skin.reset_skin();
            }

            if (_preview){
                if (_data.uiData.showPreview){
                    _preview.reset();
                }else{
                    _preview.kill();
                    _preview = undefined;
                }
            }else{
                if (_data.uiData.showPreview){
                    _initPreview.apply(this);
                }
            }

            if ((_skin) && (_skinReady)) _skin.reset();
            for(var i in _playerviews) if(_playerviews[i].enabled)_playerviews[i].reset();

            //TODO: Implementar reset
        };

        this.clear = function () {
            emic.top.debug("[UIModule.js][clear]>> ");
            if (_preview) _preview.reset();
            if ((_skin) && (_skinReady)) _skin.reset();
            for(var i in _playerviews) if(_playerviews[i].enabled)_playerviews[i].reset();
        };

        this.onPositionChange = function (position) {
            emic.top.debug("[UIModule.js][onPositionChange]>> ",position);
            if (_skin)_skin.onPositionChange(position);
            for(var i in _playerviews) if(_playerviews[i].enabled)_playerviews[i].onPositionChange(position);
        };

        this.showLoading = function (flag) {
            emic.top.debug("[UIModule.js][showLoading]>> ",flag);
            if ((_skin) && (_skinReady)) _skin.showLoading(flag);
            for(var i in _playerviews) if(_playerviews[i].enabled)_playerviews[i].showLoading(flag);
        };

        this.setPlayerViewsEnabled = function(index,value){
            if(typeof(value)=="undefined"){
                for(var i=0;i<_playerviews.length;i++){
                    _playerviews[i].enabled = index;
                }
            }else{
                if(_playerviews.length<index){
                    _playerviews[index].enabled = value;
                }else{
                }
            }
        }

        /////////////////////////////////////////////////////////
        //  INFO REPORT
        /////////////////////////////////////////////////////////



        this.onStatusChange = function(status){
            emic.top.debug("[UIModule.js][onStatusChange]>> ",status);
            if (_skin){
                _skin.onStatusChange(status);
                for(var i in _playerviews) if(_playerviews[i].enabled)_playerviews[i].onStatusChange(status);
            }
        };

        this.onVolumeChange = function(vol){
            emic.top.debug("[UIModule.js][onVolumeChange]>> ",vol);
            if (_skin){
                _skin.onVolumeChange(vol);
            }
            for(var i in _playerviews){
                if(_playerviews[i].enabled)_playerviews[i].onVolumeChange(vol);
            }
        };

        this.onProgress = function(data){
            if (_skin){
                _skin.onProgress(data);
            }
            for(var i in _playerviews) if(_playerviews[i].enabled)_playerviews[i].onProgress(data);
        };

        this.onMetadata = function(metadata){
            emic.top.debug("[UIModule.js][onMetadata]>> ",metadata);
            if (_skin){
                _skin.onMetadata(metadata);
            }
            for(var i in _playerviews) if(_playerviews[i].enabled)_playerviews[i].onMetadata(metadata);
        };

        this.onCue = function(data){
            emic.top.debug("[UIModule.js][onCue]>> ",data);
            if (_skin){
                _skin.onCue(data);
            }
            for(var i in _playerviews) if(_playerviews[i].enabled)_playerviews[i].onCue(data);
        };

        this.onError = function(msg, code){
            emic.top.debug("[UIModule.js][onError]>> ",{"msg":msg, "code":code});
            if (_skin){
                _skin.onError(msg, code);
            }
            for(var i in _playerviews) if(_playerviews[i].enabled)_playerviews[i].onError(msg, code);
        };

        this.onSwitchRequest = function(id){
            emic.top.debug("[UIModule.js][onSwitchRequest]>> ",id);
            if (_skin){
                _skin.onSwitchRequest(id);
            }
        };
        this.onSwitchComplete = function(id){
            emic.top.debug("[UIModule.js][onSwitchComplete]>> ",id);
            if (_skin){
                _skin.onSwitchComplete(id);
            }
        };
        this.onSeekStart = function(offset){
            emic.top.debug("[UIModule.js][onSeekStart]>> ",offset);
            if (_skin){
                _skin.onSeekStart(offset);
            }
            for(var i in _playerviews) if(_playerviews[i].enabled)_playerviews[i].onSeekStart(offset);
        };
        this.onSeekComplete = function(offset){
            emic.top.debug("[UIModule.js][onSeekComplete]>> ",offset);
            if (_skin){
                _skin.onSeekComplete(offset);
            }
            for(var i in _playerviews) if(_playerviews[i].enabled)_playerviews[i].onSeekComplete(offset);
        };
        this.onBufferEmpty = function(){
            emic.top.debug("[UIModule.js][onBufferEmpty]>> ");
            if (_skin){
                _skin.onBufferEmpty();
            }
        };
        this.onBufferFull = function(){
            emic.top.debug("[UIModule.js][onBufferFull]>> ");
            if (_skin){
                _skin.onBufferFull();
            }
        };
        this.onRenditions = function(renditions){
            emic.top.debug("[UIModule.js][onRenditions]>> ");
            if (_skin){
                _skin.onRenditions(renditions);
            }
        };

        this.setRatio = function(_width,_height){
            var container = document.getElementById(_data.genericData.container);

            container.style.height = container.offsetWidth*_height/_width + "px";
        }
    }

    namespace.UIModule = UIModule;

})(emic.top);
/**
 * Created by igomez on 28/07/2014.
 */
(function(namespace){

    AdModule.prototype = new psd.framework.EventDispatcher();

    AdModule.POSITION_PREROLL = "preroll";
    AdModule.POSITION_POSTROLL = "postroll";

    AdModule.PROVIDER_TRITON = "triton";
    AdModule.PROVIDER_PBS_DPF = "PBS_DFP";

    AdModule.ADTYPE_VIDEO = "video";
    AdModule.ADTYPE_INSTREAM = "instream";

    AdModule.STATUS_PLAY = "AdPlay";
    AdModule.STATUS_PAUSE = "AdPause";
    AdModule.STATUS_STOP = "AdStop";

    //TODO: Las segundas peticiones de un manager que no se haya destruido no llegan en html5, probablemente por el correlator.
    //TODO: Uncaught AdError 900: Invalid usage of the API. Cause: Ads manager is not correctly configured.  --> Error no bloqueante del manager en html5
    function AdModule (dataModel){
        psd.framework.EventDispatcher.call(this);

        var _INTERVAL_PROGRESS = 500;
        var _manager;
        var _data = dataModel;
        var _currentConf;
        var _ready = false;
        var _waitingPosition = false;
        var _currentPosition = "";
        var _initializing = false;
        var _timerPubli = {};
        var _intervalPubli;
        var _playingAd = false;
        var _status = "";
        var _durationVideo= 0;//milisegundos la longitud del video-- Julián el tucu.
        var _AdPodInfo; //contendrá un objeto con información complementaria de la publiciad.//tucu

        var PubliEvent = emic.publicidad.events.PubliEvent;

        var _init = function(){
            emic.top.debug("[AdModule.js][_init]>> Ready?: ", _ready);
            var adObj;

            if (!_ready) {
                _manager = new emic.publicidad.PubliManager();
                this.manager = _manager;

                _manager.addEventListener(PubliEvent.MANAGER_READY, _managerHandler, this);
                _manager.addEventListener(PubliEvent.CONTROLLER_LOADED, _managerHandler, this);
                _manager.addEventListener(PubliEvent.MANAGER_INIT_ERROR, _managerHandler, this);
                _manager.addEventListener(PubliEvent.PUBLI_STARTED, _managerHandler, this);
                _manager.addEventListener(PubliEvent.PUBLI_PAUSED, _managerHandler, this);
                _manager.addEventListener(PubliEvent.PUBLI_RESUMED, _managerHandler, this);
                _manager.addEventListener(PubliEvent.PUBLI_ENDED, _managerHandler, this);
                _manager.addEventListener(PubliEvent.PUBLI_SKIPPED, _managerHandler, this);
                _manager.addEventListener(PubliEvent.ALL_PUBLI_ENDED, _managerHandler, this);
                _manager.addEventListener(PubliEvent.PUBLI_LOADED, _managerHandler, this);
                _manager.addEventListener(PubliEvent.PUBLI_ERROR, _managerHandler, this);
                _manager.addEventListener(PubliEvent.CONTENT_PAUSE_REQUESTED, _managerHandler, this);
                _manager.addEventListener(PubliEvent.CONTENT_RESUME_REQUESTED, _managerHandler, this);
                castUrlPubli(_data.adData.conf);
                _currentConf = _data.adData.conf;
                _initializing = true;
                adObj = {"urlConfPubli": _currentConf, "width": _data.genericData.width, "height": _data.genericData.height, "objContentPublisher": _data.internalData.mediaElement};
                emic.top.debug("[AdModule.js][_init]>> Solicitada inicialización del manager publicitario con: ", {"container":_data.adData.container, "adObj": adObj, "id":_data.genericData.id, "urlBase":_data.genericData.urlBase});
                _manager.start(_data.adData.container, adObj, _data.genericData.id, _data.genericData.urlBase);
            }else{
                var ev = new emic.top.event.AdEvent(emic.top.event.AdEvent.ON_READY);
                ev.idMedia = _data.mediaData.idTOP;
                this.dispatchEvent(ev);
            }
        };



        var _initComplete = function(){
            emic.top.debug("[AdModule.js][_initComplete]>> ");
            _ready = true;
            _initializing = false;
            var ev = new emic.top.event.AdEvent(emic.top.event.AdEvent.ON_READY);
            ev.idMedia = _data.mediaData.idTOP;
            this.dispatchEvent(ev);
            //Esto sólo funcionará en Desktop, en móvil se ha perdido el hilo síncrono y no funcionará el play del <video> de ima. Importante no permitir llamadas a notifica desde fuera antes de recibir un ON_READY
            if (_waitingPosition) {
                this.notificaEstadoOn(_waitingPosition);
                _waitingPosition = false;
            }
        };

        var _managerHandler = function(event){
            emic.top.debug("[AdModule.js][_managerHandler]>> ", {"type":event.type});
            var ev;
            switch (event.type){
                case PubliEvent.MANAGER_READY:
                    if (_intervalPubli) clearInterval(_intervalPubli);
                    //Si es móvil y no tiene adBlock
                    if ((getDevice().mobile)&&(typeof(_advert)!="undefined")){
                        _manager.preloadController(emic.publicidad.PubliManager.CONTROLLER_IMA3_HTML5);
                    }
                    else{//entra en web y en móvil con adBlock
                        _initComplete.apply(this);
                    }
                break;
                case PubliEvent.CONTROLLER_LOADED:
                    _initComplete.apply(this);
                break;
                case PubliEvent.MANAGER_INIT_ERROR:
                    _initializing = false;
                    ev = new emic.top.event.AdEvent(emic.top.event.AdEvent.ON_INIT_ERROR);
                    ev.idMedia = _data.mediaData.idTOP;
                    this.dispatchEvent(ev);
                break;
                case PubliEvent.ALL_PUBLI_ENDED:

                    if (_intervalPubli) clearInterval(_intervalPubli);

                    if (_playingAd) {
                        ev = new emic.top.event.AdEvent();
                        ev.type = emic.top.event.AdEvent.ON_AD_POSITION_END;
                        ev.data.position = _currentPosition;
                        ev.contentType = event.data.contentType;
                        this.dispatchEvent(ev);
                        _playingAd = false;
                        _currentPosition = "";
                        _status = AdModule.STATUS_STOP;
                        _data.mediaData.duration= _durationVideo;
                    }
                break;
                case PubliEvent.PUBLI_STARTED:
                    if(_data.mediaData.premuted){
                        if(!getDevice().mobile)
                            _manager.setVolume(0);
                    }else{
                        _manager.setVolume(_data.internalData.currentVolume);
                    }
                    _durationVideo= _data.mediaData.duration;
                    _data.mediaData.duration= (event.data.internalData.g.duration * 1000);
                    _playingAd = true;

                    if(typeof(event.data.internalData.g.skippable)!="undefined")
                        _data.adData.skippable = event.data.internalData.g.skippable;
                    if(typeof(event.data.internalData.g.skipTimeOffset)!="undefined")
                        _data.adData.skippableTime = event.data.internalData.g.skipTimeOffset;
                    if(typeof(event.data.internalData.g.duration)!="undefined")
                        _data.adData.duration = event.data.internalData.g.duration;

                    ev = new emic.top.event.AdEvent();
                    ev.type = emic.top.event.AdEvent.ON_AD_VIDEO_START;
                    ev.data = {};
                    ev.data.provider = emic.top.AdModule.PROVIDER_PBS_DPF;
                    ev.data.position = _currentPosition;
                    ev.data.name = name = event.data.name;
                    ev.contentType = contentType = event.data.contentType;
                    ev.idMedia = _data.mediaData.idTOP;
                    if(typeof(event.data.internalData.g.duration)!="undefined"){
                        ev.data.duration= event.data.internalData.g.duration;
                        _AdPodInfo= event.data.internalData.getAdPodInfo();
                        ev.data.cantAds = _AdPodInfo.getTotalAds();
                    }
                    this.dispatchEvent(ev);

                    _status = AdModule.STATUS_PLAY;

                    _intervalPubli = setInterval((function(that){return function(event){notifyAdProgress.apply(that,[name, contentType])}})(this),_INTERVAL_PROGRESS);

                break;

                case PubliEvent.PUBLI_PAUSED:
                    ev = new emic.top.event.AdEvent();
                    ev.type = emic.top.event.AdEvent.ON_AD_VIDEO_PAUSE;
                    ev.data = {};
                    ev.data.provider = emic.top.AdModule.PROVIDER_PBS_DPF;
                    ev.data.position = _currentPosition;
                    ev.data.name = name = event.data.name;
                    ev.contentType = contentType = event.data.contentType;
                    ev.idMedia = _data.mediaData.idTOP;
                    this.dispatchEvent(ev);
                    _status = AdModule.STATUS_PAUSE;
                break;

                case PubliEvent.PUBLI_RESUMED:
                    ev = new emic.top.event.AdEvent();
                    ev.type = emic.top.event.AdEvent.ON_AD_VIDEO_RESUME;
                    ev.data = {};
                    ev.data.provider = emic.top.AdModule.PROVIDER_PBS_DPF;
                    ev.data.position = _currentPosition;
                    ev.data.name = name = event.data.name;
                    ev.contentType = contentType = event.data.contentType;
                    ev.idMedia = _data.mediaData.idTOP;
                    this.dispatchEvent(ev);
                    _status = AdModule.STATUS_PLAY;
                break;

                case PubliEvent.PUBLI_ENDED:
                    if (_intervalPubli) clearInterval(_intervalPubli);

                    ev = new emic.top.event.AdEvent();
                    ev.type = emic.top.event.AdEvent.ON_AD_VIDEO_END;
                    ev.data = {};
                    ev.data.provider = emic.top.AdModule.PROVIDER_PBS_DPF;
                    ev.data.position = _currentPosition;
                    ev.data.name = event.data.name;
                    ev.contentType = event.data.contentType;
                    ev.idMedia = _data.mediaData.idTOP;
                    this.dispatchEvent(ev);
                    _status = AdModule.STATUS_STOP;
                    _data.mediaData.duration= _durationVideo;
                break;
                case PubliEvent.PUBLI_SKIPPED:
                    if (_intervalPubli) clearInterval(_intervalPubli);
                    ev = new emic.top.event.AdEvent();
                    ev.type = emic.top.event.AdEvent.ON_AD_VIDEO_SKIP;
                    ev.data = {};
                    ev.data.provider = emic.top.AdModule.PROVIDER_PBS_DPF;
                    ev.data.position = _currentPosition;
                    ev.data.name = event.data.name;
                    ev.contentType = event.data.contentType;
                    ev.idMedia = _data.mediaData.idTOP;
                    this.dispatchEvent(ev);
                    _status = AdModule.STATUS_STOP;
                break;
                case PubliEvent.PUBLI_ERROR:
                    ev = new emic.top.event.AdEvent();
                    ev.type = emic.top.event.AdEvent.ON_AD_ERROR;
                    ev.data = event.data;
                    ev.data.position = _currentPosition;
                    ev.idMedia = _data.mediaData.idTOP;
                    _currentPosition = "";
                    this.dispatchEvent(ev);
                    _status = AdModule.STATUS_STOP;
                break;
            }
        };

        var notifyAdProgress = function(name, contentType)
        {
            _timerPubli = _manager.remainingTime();

            ev = new emic.top.event.AdEvent();
            ev.type = emic.top.event.AdEvent.ON_AD_PROGRESS;
            ev.data = {};
            ev.data.provider = emic.top.AdModule.PROVIDER_PBS_DPF;
            ev.data.position = _currentPosition;
            ev.data.name = name;
            ev.contentType = contentType;
            ev.data.currentTime = _timerPubli.currentTime;
            ev.data.totalTime = _timerPubli.totalTime;
            ev.idMedia = _data.mediaData.idTOP;

            this.dispatchEvent(ev);
        };

        /////////////////////////////////////////////////////////
        //  API
        /////////////////////////////////////////////////////////
        this.init = function () {
            emic.top.debug("[AdModule.js][init]>> ");
            _init.apply(this);
        };

        this.kill = function () {
            emic.top.debug("[AdModule.js][kill]>> ");
            if (_manager)
                _manager.kill();

            if (_intervalPubli) clearInterval(_intervalPubli);

            //TODO: _manager.kill()

            _manager = null;
            _data.adData.container.innerHTML = "";

        };

        this.close = function()
        {
            emic.top.debug("[AdModule.js][close]>> ");
            if (_manager){
                _currentPosition = "";
                _playingAd = false;
                _manager.closeAd();
            }
            if (_intervalPubli) clearInterval(_intervalPubli);
        };

        this.externalNotify = function (type, data, id) {
            emic.top.debug("[AdModule.js][externalNotify]>> ", {"type":type, "data":data, "id":id});
            var e = new emic.top.event.AdEvent(type);
            if (data) e.data = data;
            if (id) e.id = id;

            this.dispatchEvent(e);
        };

        this.notificaEstadoOn = function (position) {
            emic.top.debug("[AdModule.js][notificaEstadoOn]>> ",position);
            //TODO: Proteger acceso desde fuera, sólo válido desde TopLauncher : ¿arguments.callee.caller.toString()?
            //TODO: Sólo lanzará la petición una vez con multiPosition == 0 (OJO! guardar el id del vídeo o hacer un reset del módulo tras un load de nuevo contenido en el player)

            var obj, pos, adDatatags;
            if (_ready){
                //TODO: Detener peticiones anteriores? No permitir si hay posición activa?
                _currentPosition = position;

                obj = {};
                obj.referrer = _data.genericData.referer;

                //if(getDevice().mobile || !FlashDetect.installed){obj.tecType = "html5";}
                //else {obj.tecType = "flash";}
                obj.tecType = "html5";

                if(obj.tecType=="flash"){
                    obj.vpaid = "&fpd=vpaid";
                }else{
                    obj.vpaid = "";
                }

                if(_data.mediaData.isLive){
                    obj.idTOP = _data.mediaData.idTOP;
                    obj.directo= ",directo";
                }
                else{
                    obj.idTOP = "";
                    obj.directo= "";
                }

                if(_data.mediaData.tags.programa!=undefined){
                    obj.programa = _data.mediaData.tags.programa;
                }

                //NOTA: La segmentación de publicidad se va a hacer primero por ptags y en segundo lugar por tags
                obj.pTags = "";
                if (_data.adData.pTags != ""){
                    obj.pTags = _data.adData.pTags;
                }
                else {
                    obj.pTags = _data.mediaData.tags.allTags;
                }

                obj.device = "web";
                if(getDevice().mobile)
                    obj.device = "mob";


                /*Funcion en caso de que el dispositivo sea un iPhone configuramos un nuevo size, en caso contrario configuramos uno nuevo*/
                var sizeDevice = function () {

                    var Detect = getDevice().agent;

                    if(Detect.indexOf('iPhone') != -1){

                        /*iPhone*/
                        return "|480x360";

                    }else{

                        /*PC, Android, iPad*/
                        return "|480x361";
                    }

                };


                //Typecontent define el tipo de publicidad a servir, en directos se pide audio o vídeo, y en enlatados sólo audio
                //TODO: Esto es sólo para PLAYSER, es necesario generalizar este comportamiento en cuanto tengamos más unidades de negocio implicadas (vía editop, confs con constantes condicionales??)
                obj.contentType = _data.mediaData.isLive ? "640x480|1x1" + sizeDevice() : "1x1";

                //para los videos de mayor tiempo que la variable mm_timevideo_ad (si existe en la página) en minutos, se pinta publicidad de vídeo independientemente de si es enlatado o directo
                if(typeof(mm_timevideo_ad)!="undefined"){
                    if(_data.mediaData.duration>=(60*mm_timevideo_ad*1000)){
                        obj.contentType = "640x480|1x1" + sizeDevice();
                    }
                }

                /*Variable para controlar el size de las publicidades en players de video*/

                obj.adFormat = "640x480" + sizeDevice();




                /*Incluimos variables del PAIS */
                if (typeof(window.LANG) != "undefined") {
                    obj.hl = ((window.LANG == "pt-br") ? "pt" : window.LANG);
                }else{

                    obj.hl = "es";
                }
                /*pasamos parametros del PAIS Keywords,tags_noticia  y PBS*/
                adDatatags = (_data.adData.tags_noticia != "") ? "," + _data.adData.tags_noticia : _data.adData.tags_noticia;
                obj.pTags += (obj.pTags != "") ? adDatatags : _data.adData.tags_noticia;

                /*krux*/
                obj.ksg = (typeof(PBS) != "undefined" && typeof(PBS.slm) != "undefined" && typeof(PBS.slm.cf) != "undefined" && typeof(PBS.slm.cf.key) != "undefined" && typeof(PBS.slm.cf.key.ksg) != "undefined" ? "&ksg=" + PBS.slm.cf.key.ksg.join(",") : "");


                emic.top.debug("[AdModule.js][notificaEstadoOn]>> Solicitado al manager con obj", obj);

                var advertising_enabled = true;

                if((_data.mediaData.details!=null)&&                                //si existe objeto details
                    (typeof (_data.mediaData.details.advertising)!= "undefined")&&  //y éste contiene un campo llamado "advertising"
                    (_data.mediaData.details.advertising==false))                    //y el campo está seteado a false
                    advertising_enabled = false;                                    //No hay que pintar publicidad

                //console.log("ADVERTISING ENABLED",advertising_enabled);

                if(advertising_enabled)
                    _manager.notificaPubliOn(position, obj,_data);
                else{
                    ev = new emic.top.event.AdEvent();
                    ev.type = emic.top.event.AdEvent.ON_NO_AD;
                    ev.data.position = position;
                    ev.idMedia = _data.mediaData.idTOP;
                    this.dispatchEvent(ev);
                }
            }else{
                if (_initializing) {
                    _waitingPosition = position;
                }else {
                    ev = new emic.top.event.AdEvent();
                    ev.type = emic.top.event.AdEvent.ON_AD_ERROR;
                    ev.data.position = position;
                    ev.idMedia = _data.mediaData.idTOP;
                    this.dispatchEvent(ev);
                }
            }
        };

        this.resume = function()
        {
            emic.top.debug("[AdModule.js][resume]>> ");
            if (_manager){_manager.resume();}
        };

        this.pause = function()
        {
            emic.top.debug("[AdModule.js][pause]>> ");
            if (_manager){_manager.pause();}
        };

        /**
         *
         * @param offset Valor entre 0 y 1
         */
        this.setVolume = function(offset)
        {
            emic.top.debug("[AdModule.js][setVolume]>> ",offset);
            var ev;
            if (_manager){
                _manager.setVolume(offset);
                _data.internalData.currentVolume = offset;

                ev = new emic.top.event.AdEvent();
                ev.type = emic.top.event.AdEvent.ON_AD_VOLUME_CHANGE;
                ev.data = {};
                ev.data.position = _currentPosition;
                ev.idMedia = _data.mediaData.idTOP;
                ev.data.vol = offset;
                this.dispatchEvent(ev);
            }
        };

        this.getCurrentPosition = function(){
            return _currentPosition;
        }

        this.getStatus = function(){
            emic.top.debug("[AdModule.js][getStatus]>> ");
            return _status;
        };

        //si está presente la variable mm_base transforma la url de publicidad con el dominio local
        var castUrlPubli= function (urlPubli){
            if(typeof (window.mm_base)!= "undefined"){
                var base= _data.genericData.urlBase;
                if(base === undefined){
                    base= "";
                }

                //parte la url del json de publicidad
                var arrayUrlPubli= urlPubli.split("/psdmedia");

                //setea en el objeto data la url que apunta al json de publicidad
                _data.adData.conf= base + "/psdmedia" + arrayUrlPubli[1];
            }
        };

    }

    namespace.AdModule = AdModule;

})(emic.top);/**
 * Created by igomez on 03/08/2014.
 */
(function(namespace){

    StatModule.prototype = new psd.framework.EventDispatcher();

    function StatModule (data){
        psd.framework.EventDispatcher.call(this);

        var _data = data;
        var _currentConf = "";
        var _percentil25Tracked = false;
        var _percentil50Tracked = false;
        var _percentil75Tracked = false;
        var _timer;
        var _manager;

        var _nameController = false;

        var _loaded = 0;
        var _dependencesLoaded = false;

        //  CONSTANTES
        var _LOAD_STATUS_LOADING = 1;
        var _LOAD_STATUS_NOT_LOADED = 0;
        var _LOAD_STATUS_LOADED = 2;


        /////////////////////////////////////////////////////////
        //  CONSTANTES
        /////////////////////////////////////////////////////////

        var _URL_STATS = "/psdmedia/resources/js/psd/statistics.top.min.js";
        //var _URL_STATS = "js/statistics.top.lib.js";

        var _init = function(){
            emic.top.debug("[StatModule.js][_init]>> ");
            if (_data.statData.enabled)
                if (_loaded == _LOAD_STATUS_NOT_LOADED){
                    _loaded = _LOAD_STATUS_LOADING;
                    _loadDependences.apply(this);
                }else if (_loaded != _LOAD_STATUS_LOADING){
                    this.dispatchEvent(new emic.top.event.MediaEvent(emic.top.event.MediaEvent.ON_READY));
                }
        };

        var _loadDependences = function(){
            emic.top.debug("[StatModule.js][_loadDependences]>> ");
            var head, script, defComplete;

            if(typeof(psd.statistics)!="undefined")
                _dependencesLoaded = true;

            if (!_dependencesLoaded) {


                //Añadimos la dependencia para StatisticsManager
                head = document.getElementsByTagName('head')[0];
                script = document.createElement('script');
                script.type = 'text/javascript';


                defComplete = (function (that){
                    return function(){
                        _onDependencesLoaded.apply(that);
                    }
                })(this);

                if (navigator.appName.indexOf("Microsoft") >= 0) {
                    script.onreadystatechange = function() {
                        if (this.readyState == "loaded" ||
                            this.readyState == "complete") {
                            //TODO: Probar en explorer
                            defComplete();
                            script.onreadystatechange = null;
                        }
                    };
                }
                else {

                    script.onload = defComplete;
                }

                script.src = _data.genericData.urlBase ? (_data.genericData.urlBase + _URL_STATS) : _URL_STATS;
                emic.top.debug("[StatModule.js][_loadDependences]>> Se solicita carga a:",script.src);
                head.appendChild(script);

                var onTimeout = (function (that){
                    return function(){
                        _onDependencesError.apply(that);
                    }
                })(this);

				if(!_dependencesLoaded)
					_timer = setTimeout(onTimeout, 10000);

            }else{
                _onDependencesLoaded.apply(this);
            }
        };

        var _onDependencesLoaded = function(){
            emic.top.debug("[StatModule.js][_onDependencesLoaded]>> ");
            clearTimeout(_timer);
            _dependencesLoaded = true;
            _loadManager.apply(this);
        };

        var _loadManager = function(){
            emic.top.debug("[StatModule.js][_loadManager]>> ");
            _manager = new psd.statistics.StatisticsManager();

            //parte la url del json de Profile
            var arrayStatDataConf= _data.statData.conf.split("/psdmedia");

            //coje la url Base
            var base= _data.genericData.urlBase ? _data.genericData.urlBase : "";

            //setea en el objeto data la url que apunta a profile
            _data.statData.conf= base + "/psdmedia" + arrayStatDataConf[1];

            _currentConf = _data.statData.conf;
            if (_currentConf != undefined) {
                _manager.setup(_currentConf);
                _loaded = _LOAD_STATUS_NOT_LOADED;
            }
            _loaded = _LOAD_STATUS_LOADED;

            this.dispatchEvent(new emic.top.event.MediaEvent(emic.top.event.MediaEvent.ON_READY));
        };

        var _onDependencesError = function(){
            emic.top.debug("[StatModule.js][_onDependencesError]>> ");
            _loaded = _LOAD_STATUS_NOT_LOADED;
            //TODO: Gestión de errores!
            this.dispatchEvent(new emic.top.event.MediaEvent(emic.top.event.MediaEvent.ON_ERROR));
        };

        var _getCommonData = function(){
            var data = _data.statData.extraData;
            /*recuperamos nombre de player y controlador*/
            if(!_nameController) {
                data.playerName = data.playerName + "[" + _data.internalData.controllerName + "]";
                _nameController = true;
            }

            data.name = _data.mediaData.title;
            if(_data.mediaData.isLive){
                if(_data.mediaData.nombrePrograma!="")
                    data.name = _data.mediaData.nombrePrograma;
            }

            data.idTop = _data.mediaData.idTOP;
            data.mediaType = _data.mediaData.isLive ? "streaming" : (_data.mediaData.mimetype.indexOf("video") != -1) ? "vod" : "aod";
            data.mediaTypeMode = (_data.mediaData.mimetype.indexOf("video") != -1) ?  "video" : "audio";
            data.provider = _data.mediaData.provider;
            data.duration = (_data.mediaData.duration == 0) ? "0" : Math.round(_data.mediaData.duration / 1000);
            data.progressTime = (_data.mediaData.progressTime == 0)?"0":_data.mediaData.progressTime; //NOTA: Este arreglo es temporal hasta que Adobe arregle el bug de cuando le llega el entero 0 lo contemple como valor válido
            data.adEnabled = (_data.adData.enabled) ? "con publicidad" : "sin publicidad";
            data.topPageTitle = encodeURIComponent(window.document.location.href);
            data.trafficsource = encodeURIComponent(window.document.referrer);
            data.agency = (_data.agency.indexOf("") != 1) ? "propio" : _data.agency;
            data.nombrePrograma = _data.mediaData.nombrePrograma;
            data.season = _data.mediaData.season;
            data.chapter = _data.mediaData.chapter;

            data.extraccion = _data.extraccion;
            data.segmento = _data.segmento;
            data.inicioemision = _data.inicioemision;
            data.finemision = _data.finemision;
            data.transcripcion = _data.transcripcion;
            data.hablantes = _data.speakers;
            //data.etiquetado = "lqs";

            data.organic= _data.mediaData.organic;//a esta si necesitamos pasarla en el objeto para estadísticasJulian.

            if (typeof (_advert) != "undefined") {

                data.adErrorAdBlock = WITHOUT_ADBLOCK;
            } else {

                data.adErrorAdBlock = ERROR_ADBLOCK;
            }

            emic.top.debug("[StatModule.js][_getCommonData]>> ",data);
            return data;
        };

        /////////////////////////////////////////////////////////
        //  API
        /////////////////////////////////////////////////////////

        this.init = function () {
            emic.top.debug("[StatModule.js][init]>> ");
            _percentil25Tracked = false;
            _percentil50Tracked = false;
            _percentil75Tracked = false;

            _init.apply(this);

        };

        this.reset = function () {
            emic.top.debug("[StatModule.js][reset]>> ");
            _percentil25Tracked = false;
            _percentil50Tracked = false;
            _percentil75Tracked = false;

            if (_currentConf != _data.statData.conf){
                if (_loaded == _LOAD_STATUS_LOADING) {
                    //TODO: cancel load instancia
                }
                _manager = undefined;
                _loaded = _LOAD_STATUS_LOADING;
                _init.apply(this);
            }
        };

        this.onProgress = function (data) {
            //var data2 = _data.statData.extraData;
            //data2.name = _data.mediaData.title;
            var data2 = _getCommonData.apply(this);
            if (_loaded == _LOAD_STATUS_LOADED) {

                //--Si es directo no enviamos eventos intermedios a excepcion del KeepAlive
                if(!_data.mediaData.isLive) {

                    if (!_percentil25Tracked && data.currentTime > 0.25 * data.totalTime) {
                        _percentil25Tracked = true;
                        _manager.track("mediaFirstQuart", data2);
                    }

                    if (!_percentil50Tracked && data.currentTime > 0.5 * data.totalTime) {
                        _percentil50Tracked = true;
                        _manager.track("mediaHalf", data2);

                    }

                    if (!_percentil75Tracked && data.currentTime > 0.75 * data.totalTime) {
                        _percentil75Tracked = true;
                        _manager.track("mediaThirdQuart", data2);
                    }
                }
            }

        };


        this.onCountProgress = function (data) {

            var data2 = _getCommonData.apply(this);

            if (_loaded == _LOAD_STATUS_LOADED) {

                _manager.track("mediaTimeInterval", data2);

            }

        }

        //TODOjc
        this.onVideoPause = function(){
            var data2 = _getCommonData.apply(this);
            if (_loaded == _LOAD_STATUS_LOADED){
                _manager.track("mediaPause", data2);
            }
        }
        this.onVideoResume = function(){
            var data2 = _getCommonData.apply(this);
            if (_loaded == _LOAD_STATUS_LOADED){
                _manager.track("mediaResume", data2);
            }
        }

        this.onMediaBegin = function () {
            var data2 = _getCommonData.apply(this);
            emic.top.debug("[StatModule.js][onMediaBegin]>> ",data2);
            if (_loaded == _LOAD_STATUS_LOADED){
                _manager.track("mediaBegin", data2);
            }
        };

        this.onMediaComplete = function () {
            _percentil25Tracked = false;
            _percentil50Tracked = false;
            _percentil75Tracked = false;

            var data2 = _getCommonData.apply(this);
            emic.top.debug("[StatModule.js][onMediaComplete]>> ",data2);
            if (_loaded == _LOAD_STATUS_LOADED){
                _manager.track("mediaComplete", data2);
            }
        };

        this.onAdBegin = function (data) {
            emic.top.debug("[StatModule.js][onAdBegin]>> ");
            var data2 = _getCommonData.apply(this);
            //--jacob
            data2.adName = data.provider + "_" + data.adType + "_" + data.name;
            data2.adposition = data.position;
            emic.top.debug("[StatModule.js][onAdBegin]>> ",data2);
            if (_loaded == _LOAD_STATUS_LOADED){
                _manager.track("adStart", data2);
            }
        };

        this.onAdComplete = function (data) {
            var data2 = _getCommonData.apply(this);
            data2.adName = data.provider + "_" + data.adType + "_" + data.name;
            data2.adposition = data.position;
            emic.top.debug("[StatModule.js][onAdComplete]>> ",data2);
            if (_loaded == _LOAD_STATUS_LOADED){
                _manager.track("adComplete", data2);
            }
        };

        this.onAdSkip = function (data) {
            var data2 = _getCommonData.apply(this);
            data2.adName = data.provider + "_" + data.adType + "_" + data.name;
            data2.adposition = data.position;
            emic.top.debug("[StatModule.js][onAdSkip]>> ",data2);
            if (_loaded == _LOAD_STATUS_LOADED){
                _manager.track("adSkip", data2);
            }
        };

        this.onStreamError = function(data){
            var data2 = _getCommonData.apply(this);

            if (data.code !== undefined) {
                data2.streamErrorCode = data.code;
            }
            if (data.message !== undefined) {
                data2.streamErrorMessage = data.status;
            }

            if (_loaded == _LOAD_STATUS_LOADED){
                _manager.track("streamError", data2);
            }
        }

        this.onAdError = function (data) {
            var data2 = _getCommonData.apply(this);

            data2.adposition = data.position;

            //--Errores de IMA
            if (data.code !== undefined) {
                data2.adErrorCode = data.code;
            }

            //--Errores de Vast
            if (data.vastErrorCode !== undefined) {
                data2.adErrorVastCode = data.vastErrorCode;
            }

            //Todos los errores unidos
            //if (data.code !== undefined && data.vastErrorCode !== undefined) {
            //    data2.adErrorCode = data.code + "-" + data.vastErrorCode;
            //}

            //--Error de adBlockers
            if (data.adErrorAdBlock !== undefined) {
                data2.adErrorAdBlock = data.adErrorAdBlock;
            }

            //--Mensaje errores de IMA
            if (data.msg !== undefined) {

                var errorMsg = data.msg;
                data2.adErrorMsg = errorMsg.replace("#", "");
            }


            emic.top.debug("[StatModule.js][onAdError]>> ",data2);
            if (_loaded == _LOAD_STATUS_LOADED){
                _manager.track("adError", data2);
            }
        };


        //-- Notificador o plataforma donde se comparte el contenido
        this.onRRSS = function (data) {
            var data2 = _getCommonData.apply(this);

            var auxdata = data.split("|");

            data2.rrss = auxdata[0];
            if(typeof(auxdata[1]!="undefined"))
                data2.button = auxdata[1];

            emic.top.debug("[StatModule.js][onRRSS]>> ", data2);
            if (_loaded == _LOAD_STATUS_LOADED) {
                _manager.track("rrss", data2);
            }
        };


        //--Notificador de clicks en los buttons
        this.onButton = function (data) {
            var data2 = _getCommonData.apply(this);

            data2.button = data;

            emic.top.debug("[StatModule.js][onButton]>> ", data2);
            if (_loaded == _LOAD_STATUS_LOADED) {
                _manager.track("button", data2);
            }
        };

        this.onInicioCompartir = function(data){
            var data2 = _getCommonData.apply(this);

            var auxdata = data.split("|");

            data2.rrss = auxdata[0];
            if(typeof(auxdata[1]!="undefined"))
                data2.button = auxdata[1];

            emic.top.debug("[StatModule.js][onInicioCompartir]>> ", data2);
            if (_loaded == _LOAD_STATUS_LOADED) {
                _manager.track("iniciocompartir", data2);
            }
        }

    }
    namespace.StatModule = StatModule;

})(emic.top);/**
 * Created by igomez on 08/07/2014.
 */
(function (namespace){

    function DataModel(){


        /////////////////////////////////////////////////////////
        //  STATIC UTILS
        /////////////////////////////////////////////////////////

        DataModel.loadDomDependence = function (src, onComplete, onError, that) {

            var head, script, defComplete, defTimeout, timer;

            //Añadimos la dependencia al DOM
            head = document.getElementsByTagName('head')[0];
            script = document.createElement('script');
            script.type = 'text/javascript';


            defComplete = (function (){
                return function(){
                    onComplete.apply(that);
                }
            })();

            defTimeout = (function (){
                return function(){
                    clearTimeout(timer);
                    onError.apply(that);
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

            if(!_dependencesLoaded)
                timer = setTimeout(defTimeout, 10000);

        };

        /////////////////////////////////////////////////////////

        this.mediaData = {};
        this.uiData = {};
        this.genericData = {};
        this.adData = {};
        this.statData = {};
        this.socialData = {};
        this.internalData = {};

        //TODO: Todos los boolean de los config deben entender "", "false, y "true" como string y castearlos de forma correcta a boolean
        //TODO: "" y {} Deberían traducirse como el valor por defecto
        //TODO: Documentar todas las opciones con comentarios

        var _init = function(){
            this.setDefaultGenericData();
            this.setDefaultMedia();
            this.setDefaultUIData();
            this.setDefaultAdData();
            this.setDefaultStatData();
            this.setDefaultSocialData();
            this.setDefaultInternalData();
        };

        this.reset = function(){
            this.setDefaultGenericData();
            this.setDefaultMedia();
            this.setDefaultUIData();
            this.setDefaultAdData();
            this.setDefaultStatData();
            this.setDefaultSocialData();
            this.setDefaultInternalData();
        }

        this.setDefaultInternalData = function(){
            this.internalData.controllerName = undefined; //Generado de forma interna en MediaModule: Controlador escogido tras lógica de prioridades
            this.internalData.skinContainer = undefined;     //generado internamente sobre this.uiData.container
            this.internalData.previewContainer = undefined;  //generado internamente sobre this.uiData.container
            this.internalData.position = undefined;
            this.internalData.uiModule = undefined;   //Sólo se debería utilizar desde el controlador cuando sea necesario controlar controles nativos o para ordenar el lanzamiento de eventos
            this.internalData.adModule = undefined;   //Sólo se debería utilizar desde los controladores que tengan publicidad nativa
            this.internalData.mediaModule = undefined;   //Sólo se debería utilizar desde statModule para hacer el subscribe
            this.internalData.UIFactory = undefined;   //Sólo se debería utilizar desde las vistas que a su vez tengan subvistas internas
            this.internalData.mediaElement = undefined;   //Sólo se debería utilizar para informar a los managers de publicidad que necesiten de este objeto
            this.internalData.controllerContainers = [];
            this.internalData.currentVolume = undefined; //Sólo se debería utilizar desde MediaModule y desde AdModule para informar del volumen actual
            this.internalData.lastVolume = undefined; //Sólo se debería utilizar desde MediaModule y desde AdModule para informar del volumen actual
        };

       this.setDefaultMedia = function(){
            this.mediaData = {};
            this.mediaData.tecPriorityPC = [emic.top.MediaModule.TECHNOLOGY_FLASH, emic.top.MediaModule.TECHNOLOGY_HTML5];
            this.mediaData.controllerPriority = [emic.top.MediaModule.CONTROLLER_TYPE_AKAMAIHDS];
            this.mediaData.autoplay = false;
           //TODO: Proteger el id, sólo debe llegar la primera vez y no machacarse en el load
           this.mediaData.id = undefined;
           this.mediaData.idTOP = undefined;
            this.mediaData.url = undefined;
            this.mediaData.urlHTML5 = [];
            this.mediaData.wmode = "opaque";
            this.mediaData.isLive= false;
            this.mediaData.isLiveActive= false;
            this.mediaData.isDVR = false;
            this.mediaData.renditions = [];
            this.mediaData.controllerData = {};
            this.mediaData.container = undefined;
            this.mediaData.mimetype = "video/mp4";
            this.mediaData.title = "";
            this.mediaData.description = "";
            this.mediaData.clipBegin = undefined;
            this.mediaData.clipEnd = undefined;
            this.mediaData.absolute = true;
            this.mediaData.startVolume = 0.7;
            this.mediaData.authParams = "";
            this.mediaData.authParamsHTML5 = "";
            this.mediaData.date = "";
            this.mediaData.author = "";
            this.mediaData.duration = 0;
            this.mediaData.progressTime = 0;
            this.topPageTitle = "";
            this.trafficsource = "";
            this.agency = "";
            this.mediaData.urlMosaic = "";
            this.mediaData.relacionadosUrl = "";
            this.mediaData.tags = {};
            this.mediaData.nombrePrograma = "";
            this.mediaData.defaultLive = "";
            this.mediaData.premuted = false;
            this.mediaData.chapter = "";
            this.mediaData.season = "";
            this.mediaData.geo_location = null;
            this.mediaData.organic = "";//esta variable es la que contiene la información de la v26 (variable 26);
            this.mediaData.primerVideoPlayList = true;//variable que me dice si es el primer video de la playlist;
            this.mediaData.clickPlayList = false;// variable para saber si hice click en algún video de la playList;
            this.mediaData.autoNext = "";
            this.mediaData.vuelta = 0; //con esta variable controlamos si es la primera publicidad o el primer video.
            // La primera vez que entra a preview estará en 0, la segunda vez ya será 1, y así sucesivamente.
            this.mediaData.isPlaylist = false;
           //Tamanios necesarios en el caso del PAIS
            this.mediaData.ancho = "";
            this.mediaData.alto = "";
           //Cover true-false para gestionar el controlador de YouTube en el TopEmbed Manager
            this.mediaData.cover = false;
           //YTiFrame true-false en caso de que no haya asset con el player de YouTube
            this.mediaData.YTiFrame = true;
           //relateds true-false para activar relacionados de YouTube
            this.mediaData.relateds = true;
           //indica si el vídeo en concreto tiene la publicidad desactivada desde la FAPI
           this.mediaData.details = null;

           /*propiedades especificas del PAIS*/
           this.mediaData.un_creacion = "";
           this.mediaData.portal_creacion = "";
           this.mediaData.seccion_creacion = "";
        };

        this.setDefaultUIData = function(){
            this.uiData.skin = emic.top.UIModule.SKIN_GENERIC_FENIX;
            this.uiData.preview = emic.top.UIModule.PREVIEW_GENERIC;
            this.uiData.poster = undefined;
            this.uiData.skinData = {};
            this.uiData.previewData = {};
            this.uiData.bgColor = 0;
            this.uiData.absoluteTime = false;
            this.uiData.container = undefined;
            this.uiData.overrideNativeControls = false;
            this.uiData.showPreview = true;
            this.uiData.showSkinInAds = true;
            this.uiData.id_playlist = "";
        };

        this.setDefaultGenericData = function(){
            this.genericData.urlBase = undefined;
            this.genericData.width = undefined;
            this.genericData.height = undefined;
            this.genericData.container = undefined;
            this.genericData.id =  Math.floor(99999999999 * Math.random());
            this.genericData.referer = "";

            this.genericData.id_cuenta = undefined;
            this.genericData.id_player = undefined;
        };

        this.setDefaultAdData = function(){
            this.adData.conf = "";
            this.adData.enabled = true;
            this.adData.pTags = "";
            this.adData.container = "";
            this.adData.multiPosition = true;
            this.adData.tags_noticia = "";
            this.adData.skippable = false;
            this.adData.skippableTime = -1;


        };

        this.setDefaultStatData = function(){
            this.statData.conf = undefined;
            this.statData.enabled = true;
            this.statData.extraData = {};
            this.statData.mediaTimer = {};
            this.statData.mediaTimer.enable = false;
            this.statData.mediaTimer.segundos = 10;
        };

        this.setDefaultSocialData = function(){
            this.socialData.facebookData = {};
            this.socialData.twitterData = {};
            this.socialData.googleplusData = {};
            this.socialData.enlace = "";
            this.socialData.eskupData = {};
        };

        this.getConfObj = function (generic, media, ui, ad, stat, social) {
            var obj = {},
                i;

            if (generic) {
                obj.generic = {};
                for (i in this.genericData) {
                    if (this.genericData[i] != undefined)
                        obj.generic[i] = this.genericData[i];
                }
            }

            if (media) {
                obj.media = {};
                for (i in this.mediaData) {
                    if (this.mediaData[i] != undefined)
                        obj.media[i] = this.mediaData[i];
                }
            }

            if (ui){
                obj.ui = {};
                for (i in this.uiData) {
                    if (this.uiData[i] != undefined)
                        obj.ui[i] = this.uiData[i];
                }
            }

            if (stat){
                obj.stat = {};
                for (i in this.statData) {
                    if (this.statData[i] != undefined)
                        obj.stat[i] = this.statData[i];
                }
            }

            if (ad){
                obj.ad = {};
                for (i in this.adData) {
                    if (this.adData[i] != undefined)
                        obj.ad[i] = this.adData[i];
                }
            }

            if (social){
                obj.social = {};
                for (i in this.socialData) {
                    if (this.socialData[i] != undefined)
                        obj.social[i] = this.socialData[i];
                }
            }

            return obj;

        };

        this.config = function(data){
          if (data.media){
              this.configMedia(data.media);
          }
          if (data.ui){
              this.configUI(data.ui);
          }
          if (data.generic){
              this.configGeneric(data.generic);
          }
          if (data.ad){
              this.configAd(data.ad);
          }
          if (data.stat){
              this.configStat(data.stat);
          }
          if (data.social){
              this.configSocial(data.social);
          }
        };

        this.configMedia = function(data){

            var len, i;

            //TODO: Revisar si basta con undefined o es encesario revisar tb null o blancos
            //Sólo pisamos el dato en caso de que tenga contenido, para no machacar lo anterior
            //Sólo se puede definir el autoplay a true cuando no es móvil (por restricciones de dispositivos)
            if ( data.autoplay != undefined) {
                this.mediaData.autoplay = (getDevice().mobile)? false:data.autoplay;
            }

            //-- Setea que el player esta instanciado en una Playlist
            if (data.isPlaylist != undefined) {
                this.mediaData.isPlaylist = data.isPlaylist;
				if(data.playlistUrl != undefined){
					this.mediaData.playlistUrl = data.playlistUrl;
				}
            }
            //-- Setea en caso de recibir anchos y altos del PAIS
            if (data.ancho != undefined) {
                this.mediaData.ancho = data.ancho;
            }
            if (data.alto != undefined) {
                this.mediaData.alto = data.alto;
            }

            //--Setea el cover en caso de recibirlo
            if (data.cover != undefined) {
                this.mediaData.cover = data.cover;
            }

            //--Setea en caso de que no haya asset con el player de YouTube
            if (data.YTiFrame != undefined) {
                this.mediaData.YTiFrame = data.YTiFrame;
            }

            //--Setea en caso de  recibir true-false relacionados
            if (data.relateds != undefined) {
                this.mediaData.relateds = data.relateds;
            }

            /* propiedades especificas del PAIS */

                if (( data.un_creacion != undefined) && (data.un_creacion != "")) {
                    this.mediaData.un_creacion = data.un_creacion;
                }
                if (( data.portal_creacion != undefined) && (data.portal_creacion != "")) {
                    this.mediaData.portal_creacion = data.portal_creacion;
                }
                if (( data.seccion_creacion != undefined) && (data.seccion_creacion != "")) {
                    this.mediaData.seccion_creacion = data.seccion_creacion;
                }

            if (( data.wmode != undefined) && (data.wmode  != ""))  {this.mediaData.wmode = data.wmode;}
            if (data.title != undefined)  {this.mediaData.title = data.title;}
            if (data.description != undefined) {this.mediaData.description = data.description;}
            if ( data.isLive != undefined) {this.mediaData.isLive = data.isLive;}
            if ( data.isLiveActive != undefined) {this.mediaData.isLiveActive = data.isLiveActive;}
            if ( data.isDVR != undefined) {this.mediaData.isDVR = data.isDVR;}
            if (( data.id != undefined) && (data.id  != ""))  {this.mediaData.id = data.id;}
            if (( data.idTOP != undefined) && (data.idTOP  != ""))  {this.mediaData.idTOP = data.idTOP;}
            if (( data.clipBegin != undefined) && (data.clipBegin  != ""))  {this.mediaData.clipBegin = data.clipBegin;}
            if (( data.clipEnd != undefined) && (data.clipEnd  != ""))  {this.mediaData.clipEnd = data.clipEnd;}
            if ( data.absolute != undefined)  {this.mediaData.absolute = data.absolute;}
            if (( data.url != undefined) && (data.url  != ""))  {this.mediaData.url = data.url;}
            if (( data.urlHTML5 != undefined) && (data.urlHTML5 instanceof Array) && (data.urlHTML5.length > 0))  {this.mediaData.urlHTML5 = data.urlHTML5;}
            if (( data.container != undefined) && (data.container  != ""))  {this.mediaData.container = data.container;}
            else {this.mediaData.container = "";}
            if (( data.startVolume != undefined) && (data.startVolume  != ""))  {this.mediaData.startVolume = data.startVolume;}
            if (( data.authParams != undefined) && (data.authParams  != ""))  {this.mediaData.authParams = data.authParams;}
            if (( data.authParamsHTML5 != undefined) && (data.authParamsHTML5  != ""))  {this.mediaData.authParamsHTML5 = data.authParamsHTML5;}
            if (( data.date != undefined) && (data.date  != ""))  {this.mediaData.date = data.date;}
            if (( data.author != undefined) && (data.author  != ""))  {this.mediaData.author = data.author;}
            if (( data.duration != undefined) && (data.duration  != ""))  {this.mediaData.duration = data.duration;}
            if (( data.progressTime != undefined) && (data.progressTime  != ""))  {this.mediaData.progressTime = data.progressTime;}
            if (( data.topPageTitle != undefined) && (data.topPageTitle  != ""))  {this.mediaData.topPageTitle = data.topPageTitle;}
            if (( data.trafficsource != undefined) && (data.trafficsource  != ""))  {this.mediaData.trafficsource = data.trafficsource;}
            if (( data.agency != undefined) && (data.agency  != ""))  {this.mediaData.agency = data.agency;}
            if (( data.premuted != undefined) && (data.premuted != ""))  {this.mediaData.premuted = data.premuted;}
            if (( data.chapter != undefined) && (data.chapter != ""))  {this.mediaData.chapter = data.chapter;}
            if (( data.geo_location != undefined) && (data.geo_location != ""))  {this.mediaData.geo_location = data.geo_location;}
            if (( data.season != undefined) && (data.season != ""))  {this.mediaData.season = data.season;}
            if (( data.organic != undefined) && (data.organic  != ""))  {this.mediaData.organic = data.organic;}
            if (( data.primerVideoPlayList != undefined) && (data.primerVideoPlayList  != ""))  {this.mediaData.primerVideoPlayList = data.primerVideoPlayList;}
            if (( data.clickPlayList != undefined) && (data.clickPlayList  != ""))  {this.mediaData.clickPlayList = data.clickPlayList;}

            if (( data.autoNext != undefined) && ( data.autoNext != ""))  {this.mediaData.autoNext = data.autoNext;}//julian

            if (( data.controllerData != undefined) && (data.controllerData  != ""))  {
                this.mediaData.controllerData = data.controllerData; //TODO: Mirar si se puede hacer un merge aquí para no pisarlo (importante)
            }
            if (( data.mimetype != undefined) && (data.mimetype  != ""))  {this.mediaData.mimetype = data.mimetype;}

            if (( data.provider != undefined) && (data.provider  != ""))  {this.mediaData.provider = data.provider;}

            if (( data.renditions != undefined) && (data.renditions  != [])) {
                try{

                    //TODO: Ordenar por bitrate? revisar si llegan ok?

                    /*

                     data.mediaData.renditions[n]{bitrate, label}

                     len = data.renditions.length;
                     for (i = 0; i < len; i++){

                     }*/

                    this.mediaData.renditions = data.renditions;

                }catch(er){
                    //TODO: Gestión de errores
                    console.log("CATCH:DataModel renditions");
                }

                this.mediaData.renditions = data.renditions;
            }
            if (( data.tecPriorityPC != undefined) && (data.tecPriorityPC  != []))  {
                if (data.tecPriorityPC.length > 0) {
                    this.mediaData.tecPriorityPC = data.tecPriorityPC;
                }else{
                    if ((data.tecPriorityPC == MediaModule.TECHNOLOGY_FLASH) || (data.tecPriorityPC == MediaModule.TECHNOLOGY_HTML5))
                        this.mediaData.tecPriorityPC = [data.tecPriorityPC];
                }
            }
            if (( data.controllerPriority != undefined) && (data.controllerPriority  != []))  {
                if (data.controllerPriority.length > 0) {
                    this.mediaData.controllerPriority = data.controllerPriority;
                }else{
                    if ((data.controllerPriority == MediaModule.CONTROLLER_TYPE_AKAMAIHDS) || (data.controllerPriority == MediaModule.CONTROLLER_TYPE_TRITON))
                        this.mediaData.controllerPriority = [data.controllerPriority];
                }
            }
            if ( data.urlMosaic != undefined) {this.mediaData.urlMosaic = data.urlMosaic;}
            if ( data.relacionadosUrl != undefined) {this.mediaData.relacionadosUrl = data.relacionadosUrl;}

            if ( data.tags != undefined) {this.mediaData.tags = data.tags;}
            if ( data.nombrePrograma != undefined) {this.mediaData.nombrePrograma = data.nombrePrograma;}
            if ( data.defaultLive != undefined) {this.mediaData.defaultLive = data.defaultLive;}
            if ( data.details != undefined) {this.mediaData.details = data.details;}
        };

        this.configUI = function(data){
            if (( data.skin != undefined) && (data.skin  != ""))  {this.uiData.skin = data.skin}
            if (( data.preview != undefined) && (data.preview  != ""))  {this.uiData.preview = data.preview;}
            if ( data.showPreview != undefined) {this.uiData.showPreview = data.showPreview;}
            if ( data.poster != undefined)  {this.uiData.poster = data.poster;}
            if (( data.bgColor != undefined) && (data.bgColor  != ""))  {this.uiData.bgColor = data.bgColor;}
            if (data.skinData != undefined)  {
                this.uiData.skinData = data.skinData; //TODO: Mirar si se puede hacer un merge aquí para no pisarlo (importante)
            }
            if (data.id_playlist != undefined)  {
                this.uiData.id_playlist = data.id_playlist;
            }
            if (data.previewData != undefined) {
                this.uiData.previewData = data.previewData; //TODO: Mirar si se puede hacer un merge aquí para no pisarlo (importante)
            }
            if (data.absoluteTime != undefined) {this.uiData.absoluteTime = data.absoluteTime;}
            if (data.overrideNativeControls != undefined) {this.uiData.overrideNativeControls = data.overrideNativeControls;}
            if (( data.container != undefined) && (data.container  != ""))  {this.uiData.container = data.container;}
            else {this.uiData.container = "";}
        };

        this.configGeneric = function (data) {
            if (( data.width != undefined) && (data.width  != ""))  {this.genericData.width = data.width;}
            if (( data.height != undefined) && (data.height  != ""))  {this.genericData.height = data.height;}
            if (( data.urlBase != undefined) && (data.urlBase  != ""))  {this.genericData.urlBase = data.urlBase;}
            if (( data.container != undefined) && (data.container  != ""))  {this.genericData.container = data.container;}
            if (( data.id != undefined) && (data.id  != ""))  {this.genericData.id = data.id;}
            if (( data.referer != undefined) && (data.referer  != ""))  {this.genericData.referer = data.referer;}
            if (( data.id_player != undefined) && (data.id_player  != ""))  {this.genericData.id_player = data.id_player;}
            if (( data.id_cuenta != undefined) && (data.id_cuenta  != ""))  {this.genericData.id_cuenta = data.id_cuenta;}
        };

        this.configAd = function (data) {
            if (( data.conf != undefined) && (data.conf  != ""))  {this.adData.conf = data.conf;}
            if ( data.enabled != undefined)  {this.adData.enabled = data.enabled;}
            if (( data.pTags != undefined) && (data.pTags  != ""))  {this.adData.pTags = data.pTags;} else this.adData.pTags = "";
            if (( data.container != undefined) && (data.container  != ""))  {this.adData.container = data.container;}
            else {this.adData.container = "";}
            if ( data.multiPosition != undefined)  {this.adData.multiPosition = data.multiPosition;}
            if ( data.skippable != undefined)  {this.adData.skippable = data.skippable;}
            if ( data.skippableTime != undefined)  {this.adData.skippableTime = data.skippableTime;}

            /*Recuperamos tags_noticia del PAIS en caso de que se envie*/
            if ((data.tags_noticia != undefined) && (data.tags_noticia != "")) {
                this.adData.tags_noticia = data.tags_noticia;
            }


            //ejem... (quitamos publi en directos y movil hasta que arreglemos problema con Triton)

            /*if (this.mediaData.isLive && getDevice().mobile)
                this.adData.enabled = false;*/

        };

        this.configStat = function (data) {
            if ((data.conf != undefined) && (data.conf  != ""))  {this.statData.conf = data.conf;}
            if ( data.enabled != undefined)  {this.statData.enabled = data.enabled;}
            if (data.extraData != undefined)  {
                this.statData.extraData = data.extraData; //TODO: Mirar si se puede hacer un merge aquí para no pisarlo (importante)
            }

            if (data.mediaTimer != undefined) {
                if (data.mediaTimer.enable != undefined) {
                    this.statData.mediaTimer.enable = data.mediaTimer.enable;
                }
                if (data.mediaTimer.segundos != undefined) {
                    this.statData.mediaTimer.segundos = data.mediaTimer.segundos;
                }
            }
        };

        this.configSocial = function (data) {
            //TODO: Ampliar esto cuando tengamos los datos necesarios para cada red social

            if (data.facebookData != undefined)  {
                this.socialData.facebookData = data.facebookData; //TODO: Mirar si se puede hacer un merge aquí para no pisarlo (importante)
            }
            if (data.twitterData != undefined)  {
                this.socialData.twitterData = data.twitterData; //TODO: Mirar si se puede hacer un merge aquí para no pisarlo (importante)
            }
            if (data.googleplusData != undefined)  {
                this.socialData.googleplusData = data.googleplusData; //TODO: Mirar si se puede hacer un merge aquí para no pisarlo (importante)
            }
            if (data.enlace != undefined)  {
                this.socialData.enlace = data.enlace;
            }
            if (data.eskupData != undefined)  {
                this.socialData.eskupData = data.eskupData;
            }

        };

        _init.apply(this);
    }

    namespace.DataModel = DataModel;

})(emic.top);/**
 * Created by igomez on 07/07/2014. mm2016
 */
(function(namespace){

    TopPlayer.prototype = new psd.framework.EventDispatcher();

    TopPlayer.POSITION_PREVIEW = "positionPreview";
    TopPlayer.POSITION_AD_PREROLL = "positionAdPreroll";
    TopPlayer.POSITION_MEDIA = "positionMedia";
    TopPlayer.POSITION_AD_POSTROLL = "positionAdPostroll";

_that= this;
    var publiError = false;

	this.flag_autoplay = false;

    //TODO: TopPlayer.POSITION_END --> Para vídeos relacionados, etc
    //TODO: Sistema debug:
    /*
        if (emic.top.debug == true){
            emic.topMediaModule = referencia a mediamodule
            emic.topUIModule = referencia a uimodule
            etc..

            Para poder acceder a ALL por consola sin necesitar conocer las instancias ni llamar a getModule
        }
     */

    function TopPlayer(){

        ERROR_ADBLOCK = "con_ADBLOCK";
        WITHOUT_ADBLOCK = "sin_ADBLOCK";
        ERROR_ADBLOCK_MSG = "ADBlock Activate";


        //--variable globales que recuperan la posicion de la capa video para fullscreen en iPad
        var div_width,
            div_height,
            div_data = true,
            div_fullscreen = true,
            videoConten,
            elem,
            div_state = false;


        var _PlayStatusMedia = true;                    //--jacob PLAY PAUSE
        var _mediaInterval;                         //--jacob Vigilante


        var _mediaModule,
            _uimodule,
            _adModule,
            _statModule,
            _data,
            _position,
            _timeSetintervalActive,
            _timeSetinterval;


        var _parentLauncher;

        //Flags
        var _initialized = false,
            _lastAdEnabled,
            _isLoading = false;

        //  CONSTANTES
        var _LOAD_STATUS_LOADING = 1;
        var _LOAD_STATUS_NOT_LOADED = 0;
        var _LOAD_STATUS_LOADED = 2;

        // Super
        psd.framework.EventDispatcher.call(this);

        this.setLauncher = function(launcher){
            _parentLauncher = launcher;
        }

        this.getLauncher = function(){
            return _parentLauncher;
        }

        var _loadCSS = function(){

            //TODO: Mirar si ya está cargado para no repetirlo
            //TODO: Meter la ruta de los estilos (ref) por conf en DataModel
            var ref = "/psdmedia/resources/js/psd/css/commonmm.css",
                fileref=document.createElement("link"),
                filename = _data.genericData.urlBase ? (_data.genericData.urlBase + ref) : ref;

            fileref.setAttribute("rel", "stylesheet");
            fileref.setAttribute("type", "text/css");
            fileref.setAttribute("href", filename);
            if (typeof fileref!="undefined")
                document.getElementsByTagName("head")[0].appendChild(fileref)
        };

        var _init = function(){
            emic.top.debug("[TopPlayer.js][_init]>> ");

            _data = new emic.top.DataModel();

            _mediaModule = new emic.top.MediaModule(_data);
            _mediaModule.addEventListener(emic.top.event.MediaEvent.ON_READY, _onMediaHandler, this);
            _mediaModule.addEventListener(emic.top.event.MediaEvent.ON_INIT_COMPLETE, _onMediaHandler, this);
            _mediaModule.addEventListener(emic.top.event.MediaEvent.ON_RESET_COMPLETE, _onMediaHandler, this);
            _mediaModule.addEventListener(emic.top.event.MediaEvent.ON_MEDIA_BEGIN, _onMediaHandler, this);
            _mediaModule.addEventListener(emic.top.event.MediaEvent.ON_MEDIA_END, _onMediaHandler, this);
            _mediaModule.addEventListener(emic.top.event.MediaEvent.ON_CUE, _onMediaHandler, this);
            _mediaModule.addEventListener(emic.top.event.MediaEvent.ON_METADATA, _onMediaHandler, this);
            _mediaModule.addEventListener(emic.top.event.MediaEvent.ON_ERROR, _onMediaHandler, this);
            _mediaModule.addEventListener(emic.top.event.MediaEvent.ON_STATUS_CHANGE, _onMediaHandler, this);
            _mediaModule.addEventListener(emic.top.event.MediaEvent.ON_VOLUME_CHANGE, _onMediaHandler, this);
            _mediaModule.addEventListener(emic.top.event.MediaEvent.ON_SWITCH_REQUEST, _onMediaHandler, this);
            _mediaModule.addEventListener(emic.top.event.MediaEvent.ON_SWITCH_COMPLETE, _onMediaHandler, this);
            _mediaModule.addEventListener(emic.top.event.MediaEvent.ON_PROGRESS, _onMediaHandler, this);
            _mediaModule.addEventListener(emic.top.event.MediaEvent.ON_SEEK_COMPLETE, _onMediaHandler, this);
            _mediaModule.addEventListener(emic.top.event.MediaEvent.ON_SEEK_START, _onMediaHandler, this);
            _mediaModule.addEventListener(emic.top.event.MediaEvent.ON_BUFFER_EMPTY, _onMediaHandler, this);
            _mediaModule.addEventListener(emic.top.event.MediaEvent.ON_BUFFER_FULL, _onMediaHandler, this);
            _mediaModule.addEventListener(emic.top.event.MediaEvent.ON_IS_LIVE_STREAM, _onMediaHandler, this);
            _mediaModule.addEventListener(emic.top.event.MediaEvent.ON_RENDITIONS, _onMediaHandler, this);
            _mediaModule.addEventListener(emic.top.event.MediaEvent.ON_TAG, _onMediaHandler, this);
            //TODOjc
            _mediaModule.addEventListener(emic.top.event.MediaEvent.ON_STATUS_CHANGE, _onAdHandler, this);
            _data.internalData.mediaModule = _mediaModule;

            _uimodule = new emic.top.UIModule(_data);
            _uimodule.setPlayer(this);
            _uimodule.addEventListener(emic.top.event.UIEvent.ON_INIT_COMPLETE, _onUIHandler, this);
            _uimodule.addEventListener(emic.top.event.UIEvent.ON_ORDER_BEGIN, _onUIHandler, this);
            _uimodule.addEventListener(emic.top.event.UIEvent.ON_ORDER_PLAY, _onUIHandler, this);
            _uimodule.addEventListener(emic.top.event.UIEvent.ON_ORDER_PAUSE, _onUIHandler, this);
            _uimodule.addEventListener(emic.top.event.UIEvent.ON_ORDER_PLAYPAUSE, _onUIHandler, this);
            _uimodule.addEventListener(emic.top.event.UIEvent.ON_ORDER_STOP, _onUIHandler, this);
            _uimodule.addEventListener(emic.top.event.UIEvent.ON_ORDER_VOLUME_CHANGE, _onUIHandler, this);
            _uimodule.addEventListener(emic.top.event.UIEvent.ON_ORDER_MUTE, _onUIHandler, this);
            _uimodule.addEventListener(emic.top.event.UIEvent.ON_ORDER_FULLSCREEN, _onUIHandler, this);
            _uimodule.addEventListener(emic.top.event.UIEvent.ON_ORDER_SEEK_BY_PROP, _onUIHandler, this);
            _uimodule.addEventListener(emic.top.event.UIEvent.ON_ORDER_SEEK_BY_SECS, _onUIHandler, this);
            _uimodule.addEventListener(emic.top.event.UIEvent.ON_ORDER_SEEK_LIVE, _onUIHandler, this);
            _uimodule.addEventListener(emic.top.event.UIEvent.ON_ORDER_SWITCH_UP, _onUIHandler, this);
            _uimodule.addEventListener(emic.top.event.UIEvent.ON_ORDER_SWITCH_DOWN, _onUIHandler, this);
            _uimodule.addEventListener(emic.top.event.UIEvent.ON_ORDER_SWITCH_DIRECT, _onUIHandler, this);
            _uimodule.addEventListener(emic.top.event.UIEvent.ON_ORDER_SHARE_FACEBOOK, _onUIHandler, this);
            _uimodule.addEventListener(emic.top.event.UIEvent.ON_ORDER_SHARE_TWITTER, _onUIHandler, this);
            _uimodule.addEventListener(emic.top.event.UIEvent.ON_ORDER_SHARE_GOOGLEPLUS, _onUIHandler, this);
            _uimodule.addEventListener(emic.top.event.UIEvent.ON_ORDER_SHARE_WHATSAPP, _onUIHandler, this);
            _uimodule.addEventListener(emic.top.event.UIEvent.ON_ORDER_SHARE_SUBSCRIBE, _onUIHandler, this);
            _uimodule.addEventListener(emic.top.event.UIEvent.ON_ORDER_NEXT, _onUIHandler, this);
            _uimodule.addEventListener(emic.top.event.UIEvent.ON_ORDER_PREV, _onUIHandler, this);
            _uimodule.addEventListener(emic.top.event.UIEvent.ON_ORDER_SWITCH_DIRECT, _onUIHandler, this);
            _uimodule.addEventListener(emic.top.event.UIEvent.ON_ORDER_SWITCH_DOWN, _onUIHandler, this);
            _uimodule.addEventListener(emic.top.event.UIEvent.ON_ORDER_SWITCH_UP, _onUIHandler, this);
            _uimodule.addEventListener(emic.top.event.UIEvent.ON_ORDER_RESET, _onUIHandler, this);
            _uimodule.addEventListener(emic.top.event.UIEvent.ON_ORDER_CHANGE_LIVE, _onUIHandler, this);
            _uimodule.addEventListener(emic.top.event.UIEvent.ON_ORDER_BUTTON, _onUIHandler, this);
            _uimodule.addEventListener(emic.top.event.UIEvent.ON_ORDER_RRSS, _onUIHandler, this);
            _uimodule.addEventListener(emic.top.event.UIEvent.ON_ORDER_INICIOCOMPARTIR, _onUIHandler, this);
            _data.internalData.uiModule = _uimodule;

            _adModule = new emic.top.AdModule(_data);
            _adModule.addEventListener(emic.top.event.AdEvent.ON_READY, _onAdHandler, this);
            _adModule.addEventListener(emic.top.event.AdEvent.ON_INIT_ERROR, _onAdHandler, this);
            _adModule.addEventListener(emic.top.event.AdEvent.ON_AD_ERROR, _onAdHandler, this);
            _adModule.addEventListener(emic.top.event.AdEvent.ON_NO_AD, _onAdHandler, this);
            _adModule.addEventListener(emic.top.event.AdEvent.ON_AD_POSITION_END, _onAdHandler, this);
            _adModule.addEventListener(emic.top.event.AdEvent.ON_AD_INSTREAM_START, _onAdHandler, this);
            _adModule.addEventListener(emic.top.event.AdEvent.ON_AD_INSTREAM_END, _onAdHandler, this);
            _adModule.addEventListener(emic.top.event.AdEvent.ON_AD_VIDEO_START, _onAdHandler, this);
            _adModule.addEventListener(emic.top.event.AdEvent.ON_AD_VIDEO_PAUSE, _onAdHandler, this);
            _adModule.addEventListener(emic.top.event.AdEvent.ON_AD_VIDEO_RESUME, _onAdHandler, this);
            _adModule.addEventListener(emic.top.event.AdEvent.ON_AD_VIDEO_END, _onAdHandler, this);
            _adModule.addEventListener(emic.top.event.AdEvent.ON_AD_VIDEO_SKIP, _onAdHandler, this);
            _adModule.addEventListener(emic.top.event.AdEvent.ON_AD_PROGRESS, _onAdHandler, this);
            _adModule.addEventListener(emic.top.event.AdEvent.ON_AD_VOLUME_CHANGE, _onAdHandler, this);
            _data.internalData.adModule = _adModule;

            _statModule = new emic.top.StatModule(_data);
            _statModule.addEventListener(emic.top.event.MediaEvent.ON_READY, _init_start, this);
            _statModule.addEventListener(emic.top.event.MediaEvent.ON_ERROR, _init_start, this);

        };

        this.init = function(settings) {
            emic.top.debug("[TopPlayer.js][init]>> ",settings);

            if (!_initialized) {
                emic.top.debug("[TopPlayer.js][init]>> Initialized?: ",_initialized);
                if (settings) {
                    this.config(settings);
                }

                _loadCSS.apply(this);

                _clearContainer.apply(this);
                _createContainers.apply(this);

                _mediaModule.init();

                //Continua en _init2 tras la carga del media module
            }
        };

        var _init_uimodule = function(){
           emic.top.debug("[TopPlayer.js][_init2]>> MediaModule ready");
            _uimodule.init();
            //Continua en _init3 tras la carga del skin

        };

        /**
         * Paso dos de la inicialización tras la carga de la vista
         * @private
         */
        var _init_admodule = function(){
            emic.top.debug("[TopPlayer.js][_init3]>> UIModule ready");
            _showLoading.apply(this,[true]);
            if (_data.adData.enabled) {
                _adModule.init();
            }
            else{
                _init_statmodule.apply(this);
            }
            //Continua en _init4 tras emic.top.event.AdEvent.ON_READY
        };

        /**
         * Paso 3 de inicialización. Continua tras la inicialización de la publicidad
         * @private
         */
        var _init_statmodule = function(){
            emic.top.debug("[TopPlayer.js][_init4]>> AdModule ready");
//            if (false) {
            if (_data.statData.enabled) {
                _statModule.init();
            }
            else{
                _init_start.apply(this);
            }
        };


        /**
         * Paso 4 de inicialización. Continua tras la inicialización estadística
         * @private
         */
        var _init_start = function(){
            emic.top.debug("[TopPlayer.js][_init5]>> StatModule ready");
            _start.apply(this);

            emic.top.debug("[TopPlayer.js][_init5]>> Init complete");

            if (!_initialized){
                _initialized = true;

                var ev = new emic.top.event.TopEvent(emic.top.event.TopEvent.ON_READY);
                ev.data = {id:_data.genericData.id};
                this.dispatchEvent(ev);

            }

        };

        var _start = function(){
            if (_data.mediaData.autoplay){
                _position = emic.top.TopPlayer.POSITION_PREVIEW;
                _nextPosition.apply(this);
            }else{
                _changePosition.apply(this,[emic.top.TopPlayer.POSITION_PREVIEW]);
            }
        };

        this.midroll = function(){
            _mediaModule.pause();
            document.getElementById(_data.internalData.skinContainer).style.display = "none";
            _show(_data.adData.container);
            _show(_data.adData.container);
            _that.midroll = true;
            _adModule.notificaEstadoOn(emic.top.AdModule.POSITION_PREROLL);
        };

        /**
         *
         * @param settings
         * @param forceAutoplay Fuerza el autoplay independientemente de lo que aplique de forma defensiva el modelo de datos (en movil lo inhabilita) Se suele utilizar cuando el load responde a una interacción de usuario
         */
        this.load = function (settings, forceAutoplay) {
            emic.top.debug("[TopPlayer.js][load]>> ",{"settings":settings, "forceAutoplay":forceAutoplay});

            if((_mediaModule)&&(getDevice().mobile))
                _mediaModule.play();

            _mediaModule.stop();

            //TODO: BUG: Al recargar el audio con el mismo, peta!
            //TODO: Resetear dataMedia y dataStat?
            _lastAdEnabled = _data.adData.enabled;
            if ((_lastAdEnabled) && (_adModule)){
                _adModule.close();
            }

            var old_media_container = _data.mediaData.container;
            _data.config(settings);

            if(typeof(window["triton_" + _data.genericData.id])== "undefined")

            if((typeof(mm_autoplay)!="undefined")&&(mm_autoplay==true)){
                if(getDevice().mobile){
                    _data.mediaData.container = old_media_container;
                    forceAutoplay = true;

                    this.flag_autoplay = true;
                    if(_mediaModule)
                        _mediaModule.flag_autoplay = true;
                }
            }

            if (forceAutoplay)
                _data.mediaData.autoplay = true;

            _createContainers.apply(this);
            if (_mediaModule) _mediaModule.reset();

            //cotinua en load2 tras la finalización del reseteado del mediaModule
        };

        var _load_on_reset_complete = function(){
            emic.top.debug("[TopPlayer.js][_load2]>> ");

            //TODO: El skin se limpia pero no se recarga si llega uno nuevo, implementar funcionalidad
            if (_uimodule) _uimodule.reset();

            if (_data.adData.enabled)
                _adModule.init(_data);
            else
                _init_statmodule.apply(this);

        };


        //---Funciones FullScreen

        var FullScreen = function () {

            if (!document.fullscreenElement &&    // alternative standard method
                !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {  // current working methods
                if (elem.requestFullscreen) {
                    elem.requestFullscreen();
                } else if (elem.msRequestFullscreen) {
                    elem.msRequestFullscreen();
                } else if (elem.mozRequestFullScreen) {
                    elem.mozRequestFullScreen();
                } else if (elem.webkitRequestFullscreen) {
                    elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
                }
                /*else if(window.ActiveXObject !== "undefined"){
                 var wscript = new ActiveXObject("WScript.Shell");
                 if(wscript!==null)
                 wscript.SendKeys("{F11}");
                 }*/
            } else {

                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                }
            }


            /*
             var elem = document.getElementById(_data.genericData.container + "_base");
             if (elem) {
             if (elem.requestFullscreen) {
             elem.requestFullscreen();
             } else if (elem.mozRequestFullScreen) {
             elem.mozRequestFullScreen();
             } else if (elem.webkitRequestFullscreen) {
             elem.webkitRequestFullscreen();
             }
             }*/
        };

        var iOSFullscreen = function (option) {

            //-Recuperamos el tamaño total del documento en total
            //var fWidth = document.body.clientWidth;
            var fWidth = window.innerWidth;
            //var fHeight = document.body.clientHeight; //--No funciona correctamente en iPad
            var fHeight = window.innerHeight;


            //--Comprobando si la capa es más grande y esta en fullscreen
            if (option) {

                if (videoConten.clientWidth <= div_width) {

                    div_fullscreen = true;
                } else {
                    div_fullscreen = false;

                }
            }

            if (!div_fullscreen) {

                //--Volvemos al estado inicial
                videoConten.style.position = 'relative';
                videoConten.style.zIndex = 'auto';
                videoConten.style.width = String(div_width) + 'px';
                videoConten.style.height = String(div_height) + 'px';

                //-- Cuando no esté activado el fullscreen volvemos a la funcionalidad
                _fullscreen = false;


            } else {

                //-- Controlamos que el redimensinado de la playlist no afecte cuando estemos en fullscreen
                _fullscreen = true;


                //--Aplicamos el fullscreen
                videoConten.style.zIndex = '2000';
                videoConten.style.position = 'fixed';
                //videoConten.style.position = 'absolute';

                videoConten.style.top = '1px';
                videoConten.style.left = '1px';


                //-- Recuperamos la posicion invertida en caso de detectar el volteo
                if (!option) {

                    videoConten.style.width = String(window.innerWidth) + 'px';
                    videoConten.style.height = String(window.innerHeight) + 'px';

                } else {

                    videoConten.style.width = String(fWidth) + 'px';
                    videoConten.style.height = String(fHeight) + 'px';

                }


                //-- Comprobamos si se ejecuta el cambio de orientacion
                //div_fullscreen = false;


            }

        };

        //--Fin Funciones FullScreen


        this.config = function(settings) {
            //TODO: Flag defensivo para no inicializar si no ha pasado por aquí
            emic.top.debug("[TopPlayer.js][config]>> ",settings);
            _data.config(settings);
        };

        this.getData = function(){
            return _data;
        }

        this.getMediaModule = function(){
            return _mediaModule;
        };

        this.getUIModule = function(){
            return _uimodule;
        };

        this.getAdModule = function(){
            return _adModule;
        };

        this.getCurrentPosition = function(){
            return _position;
        };

        this.getConfig = function (generic, media, ui, ad, stat, social) {
            return _data.getConfObj(generic, media, ui, ad, stat, social);
        };

        this.isLoading = function(){
            return _isLoading;
        };

        var _onUIHandler = function(e){
            emic.top.debug("[TopPlayer.js][_onUIHandler]>> ", {"type":e.type, "idReceptor":_data.mediaData.idTOP});
            switch (e.type){
                case emic.top.event.UIEvent.ON_ORDER_BEGIN:
                    if (_position == emic.top.TopPlayer.POSITION_PREVIEW){
                        _nextPosition.apply(this);
                    }else{
                        _mediaModule.playpause();
                    }
                break;
                case emic.top.event.UIEvent.ON_ORDER_PLAY:
                   _mediaModule.play();
                    _adModule.resume();
                    _PlayStatusMedia = true;
                   //TODO: Controlar el estado para hacer _mediaModule.resume() cuando proceda
                break;
                case emic.top.event.UIEvent.ON_ORDER_PAUSE:
                    _mediaModule.pause();
                    _adModule.pause();
                    _PlayStatusMedia = false;
                    break;
                case emic.top.event.UIEvent.ON_ORDER_PLAYPAUSE:
                    _mediaModule.playpause();
                break;
                case emic.top.event.UIEvent.ON_ORDER_STOP:
                    _mediaModule.stop();//tucu;
                    break;
                case emic.top.event.UIEvent.ON_ORDER_VOLUME_CHANGE:
                    _mediaModule.setVolume(e.data);
                    _adModule.setVolume(e.data);
                break;
                case emic.top.event.UIEvent.ON_ORDER_MUTE:
                    _mediaModule.mute();
                break;
                case emic.top.event.UIEvent.ON_ORDER_RESET:
                    initialized = false;
                    this.load(_data,true);
                    break;
                case emic.top.event.UIEvent.ON_ORDER_FULLSCREEN:
                    //TODO: Ver cómo hacer fullscreen al cotroller html5


                    videoConten = document.getElementById(_data.genericData.container ); //-- Tamano del contenedor de video principal

                    elem = document.getElementById(_data.genericData.container + "_base");


                    if (getDevice().agent.indexOf('iPad') != -1){


                        if (div_data) {

                            //-- detectando cambio de orientacion
                            window.addEventListener("orientationchange", function () {

                                   iOSFullscreen(false);

                            });


                            //-- Guardamos el tamannio actual de la capa
                            div_width = videoConten.clientWidth;
                            div_height = videoConten.clientHeight;

                            div_data = false;

                        }

                        iOSFullscreen(true);


                    }else {

                         FullScreen();

                    }


                break;
                case emic.top.event.UIEvent.ON_ORDER_SEEK_BY_SECS:
                    _mediaModule.seek(e.data);
                break;
                case emic.top.event.UIEvent.ON_ORDER_SEEK_BY_PROP:
                    _mediaModule.seekByProp(e.data);
                break;
                case emic.top.event.UIEvent.ON_ORDER_SEEK_LIVE:
                    _mediaModule.seekLive(e.data);
                break;
                case emic.top.event.UIEvent.ON_ORDER_SWITCH_UP:
                    _mediaModule.switchUp();
                break;
                case emic.top.event.UIEvent.ON_ORDER_SWITCH_DOWN:
                    _mediaModule.switchDown();
                break;
                case emic.top.event.UIEvent.ON_ORDER_SWITCH_DIRECT:
                    _mediaModule.switchDirect(e.data);
                break;
                case emic.top.event.UIEvent.ON_INIT_COMPLETE:
                    //TODO: Ver si estos tres eventos son redundantes, y arreglar todos los skins para que lancen el mismo
                    _init_admodule.apply(this);
                break;
                case emic.top.event.UIEvent.ON_SKIN_READY:

                break;
                case emic.top.event.UIEvent.ON_PREVIEW_READY:

                break;
                case emic.top.event.UIEvent.ON_ORDER_SHARE_FACEBOOK:

                    _statModule.onRRSS('facebook');

                break;
                case emic.top.event.UIEvent.ON_ORDER_SHARE_TWITTER:

                    _statModule.onRRSS('twitter');

                break;
                case emic.top.event.UIEvent.ON_ORDER_SHARE_GOOGLEPLUS:

                    _statModule.onRRSS('googleplus');

                break;
                case emic.top.event.UIEvent.ON_ORDER_SHARE_WHATSAPP:

                    _statModule.onRRSS('whatsapp');

                    break;
                case emic.top.event.UIEvent.ON_ORDER_SHARE_SUBSCRIBE:

                    _statModule.onRRSS(e.data);

                    break;
                case emic.top.event.UIEvent.ON_ORDER_BUTTON:

                    _statModule.onButton(e.data);

                    break;
                case emic.top.event.UIEvent.ON_ORDER_RRSS:

                    _statModule.onRRSS(e.data);

                    break;
                case emic.top.event.UIEvent.ON_ORDER_INICIOCOMPARTIR:

                    _statModule.onInicioCompartir(e.data);

                    break;
            }
        };

        var _onMediaHandler = function(e){

            if (e.type != emic.top.event.MediaEvent.ON_PROGRESS)
                emic.top.debug("[TopPlayer.js][_onMediaHandler]>> ", {"type":e.type, "ID emisor": e.id});


            switch (e.type) {
                case emic.top.event.MediaEvent.ON_INIT_COMPLETE:
                    _init_uimodule.apply(this);
                    break;
                case emic.top.event.MediaEvent.ON_RESET_COMPLETE:
                    _load_on_reset_complete.apply(this);
                    break;
                case emic.top.event.MediaEvent.ON_STATUS_CHANGE:
                    _uimodule.onStatusChange(e.data.status);
                    if ((e.data.status == emic.top.MediaModule.STATUS_STOP) && (_position == emic.top.TopPlayer.POSITION_MEDIA)) {
                        //TODO: Falta isPlaying en la condición, da problemas con stop tras reseteos
                        //_nextPosition.apply(this);
                    };
                    if (e.data.status == emic.top.MediaModule.STATUS_PAUSE) {

                        _PlayStatusMedia = false;

                    };
                    if (e.data.status == emic.top.MediaModule.STATUS_PLAY) {
                        _PlayStatusMedia = true;
                    };

                    break;
                case emic.top.event.MediaEvent.ON_MEDIA_BEGIN:



                    //////////variable 26
                    setVar26();


                    _statModule.onMediaBegin();
                    _showLoading.apply(this,[false]);

                    _timeSetintervalActive = _data.statData.mediaTimer.enable;                 //-- activo si/no
                    _timeSetinterval = parseInt(_data.statData.mediaTimer.segundos) * 1000 ;   //-- frecuencia del intervalo



                    //-- Comprobar si la sennal es en directo
                    if(_data.mediaData.isLive) {

                        //-- Comprobar si teemos configurado KeepAlive
                        if (_timeSetintervalActive) {

                             if (_PlayStatusMedia){
                             _statModule.onCountProgress(e.data);
                             }

                            _mediaInterval = setInterval(function () {

                                if (_PlayStatusMedia) {
                                    _statModule.onCountProgress(e.data);
                                }
                            }, _timeSetinterval);
                        }
                    }
                    else{
                        if (typeof _mediaInterval !== 'undefined') {
                            clearInterval(_mediaInterval); //-- Eliminamos el intervalo del KeepAlive
                        }
                    }

                    break;
                case emic.top.event.MediaEvent.ON_MEDIA_END:
                    //julian
                    _data.mediaData.clickPlayList= false;
                    _uimodule.onStatusChange(emic.top.event.MediaEvent.ON_MEDIA_END);
                    //julian
                    if (_position == emic.top.TopPlayer.POSITION_MEDIA) {
                        _nextPosition.apply(this);
                        _statModule.onMediaComplete();

                        //-- Comprobar si la sennal es en directo
                        if (_data.mediaData.isLive) {

                            if (_timeSetintervalActive) {

                                //-- Eliminamos el intervalo del KeepAlive
                                clearInterval(_mediaInterval);
                            }
                        }
                    }
                break;
                case emic.top.event.MediaEvent.ON_VOLUME_CHANGE:
                    _uimodule.onVolumeChange(e.data);
                break;
                case emic.top.event.MediaEvent.ON_PROGRESS:
                    _data.mediaData.progressTime = parseInt(e.data.currentTime);
                    _uimodule.onProgress(e.data);
                    _statModule.onProgress(e.data);

                break;
                case emic.top.event.MediaEvent.ON_METADATA:
                    _uimodule.onMetadata(e.data);
                    if(_data.adData.enabled==true){
                        this.midroll();
                    }

                break;
                case emic.top.event.MediaEvent.ON_CUE:
                    _uimodule.onMetadata(e.data);
                break;
                case emic.top.event.MediaEvent.ON_ERROR:
                    _manageError.apply(this,[e.idCode]);
                    _manageStatError.apply(this, [e.idCode,e.data]);
                break;
                case emic.top.event.MediaEvent.ON_SWITCH_REQUEST:
                    _uimodule.onSwitchRequest(e.data.index);
                break;
                case emic.top.event.MediaEvent.ON_SWITCH_COMPLETE:
                    _uimodule.onSwitchComplete(e.data.index);
                break;
                case emic.top.event.MediaEvent.ON_SEEK_START:

                break;
                case emic.top.event.MediaEvent.ON_SEEK_COMPLETE:

                break;
                case emic.top.event.MediaEvent.ON_BUFFER_EMPTY:
                    _uimodule.onBufferEmpty();
                    _showLoading.apply(this,[true]);
                break;

                case emic.top.event.MediaEvent.ON_BUFFER_FULL:
                    _uimodule.onBufferFull();
                    _showLoading.apply(this,[false]);
                break;

                case emic.top.event.MediaEvent.ON_IS_LIVE_STREAM:
                    _data.mediaData.isLiveActive = e.data;
                break;

                case emic.top.event.MediaEvent.ON_RENDITIONS:
                    _uimodule.onRenditions(e.data);
                break;
            }
        };

        var _onAdHandler = function(e){
            if (e.type != emic.top.event.AdEvent.ON_AD_PROGRESS)
                emic.top.debug("[TopPlayer.js][_onAdHandler]>> ",{"type":e.type, "ID Emisor:": e.idMedia});

            switch (e.type){
                case emic.top.event.AdEvent.ON_INIT_ERROR:
                case emic.top.event.AdEvent.ON_READY:
                    _init_statmodule.apply(this);
                break;
                case emic.top.event.AdEvent.ON_NO_AD:
                    _nextPosition.apply(this);
                    break;
                case emic.top.event.AdEvent.ON_AD_ERROR:
                    //////////variable 26
                    setVar26();

                    _statModule.onAdError(e.data);
                     //publiError = true; //-- El PostRoll intentará cargar publicidad, si no saltará ON_AD_ERROR
                    _nextPosition.apply(this);
                    break;
                case emic.top.event.AdEvent.ON_AD_POSITION_END:
                    if(typeof(_that.midroll)!="undefined"){
                        document.getElementById(_data.internalData.skinContainer).style.display = "block";
                        document.getElementById(_data.internalData.skinContainer).style.visibility = "visible";
                        _hide(_data.adData.container);
                        _mediaModule.play();
                        _mediaModule.seekLive(e.data);
                    }else{
                        switch (e.data.position){
                            case emic.top.AdModule.POSITION_PREROLL:
                                _nextPosition.apply(this);
                                break;
                            case emic.top.AdModule.POSITION_POSTROLL:
                                _nextPosition.apply(this);
                                break;
                        }
                    }
                    break;
                break;
                case emic.top.event.AdEvent.ON_AD_INSTREAM_START:
                    _statModule.onAdBegin(e.data);
                break;
                case emic.top.event.AdEvent.ON_AD_INSTREAM_END:
                    _statModule.onAdComplete(e.data);
                break;
                case emic.top.event.AdEvent.ON_AD_VIDEO_START:



                    //////////variable 26
                    setVar26();

                    _statModule.onAdBegin(e.data);
                    _uimodule.onStatusChange(emic.top.AdModule.STATUS_PLAY);
                    _showLoading.apply(this,[false]);
                break;


                 //TODOjc
                case emic.top.event.MediaEvent.ON_STATUS_CHANGE:
                    if(typeof(e.data) == 'object' && typeof(e.data) == 'object' && typeof(e.data.status) == 'string'){
                        switch (e.data.status) {
                            case 'pause':
                                _statModule.onVideoPause();
                                break;
                            case 'play':
                                _statModule.onVideoResume();
                                break;
                        }
                    }
                break;


                case emic.top.event.AdEvent.ON_AD_VIDEO_PAUSE:
                    _uimodule.onStatusChange(emic.top.AdModule.STATUS_PAUSE);
                break;

                case emic.top.event.AdEvent.ON_AD_VIDEO_RESUME:
                    _uimodule.onStatusChange(emic.top.AdModule.STATUS_PLAY);
                break;

                case emic.top.event.AdEvent.ON_AD_VIDEO_END:
                    _statModule.onAdComplete(e.data);
                    _uimodule.onStatusChange(emic.top.AdModule.STATUS_STOP);
                break;
                case emic.top.event.AdEvent.ON_AD_VIDEO_SKIP:
                    _statModule.onAdSkip(e.data);
                    _uimodule.onStatusChange(emic.top.AdModule.STATUS_STOP);
                break;
                case emic.top.event.AdEvent.ON_AD_PROGRESS:
                    _uimodule.onProgress(e.data);
                break;
                case emic.top.event.AdEvent.ON_AD_VOLUME_CHANGE:
                    _uimodule.onVolumeChange(e.data.vol);
                break;
            }
        };

        var _manageStatError = function(idError,data){
            emic.top.debug("[TopPlayer.js][]>> ",idError);
            switch (idError){
                case emic.top.MediaModule.ERROR_STATION_NOT_FOUND:
                case emic.top.MediaModule.ERROR_LIVE_FAILED:
                case emic.top.MediaModule.ERROR_STREAM_GEO_BLOCKED:
                case emic.top.MediaModule.ERROR_TIMEOUT_ALERT:
                case emic.top.MediaModule.ERROR_TIMEOUT_REACH:
                case emic.top.MediaModule.ERROR_STREAM_CONFIG_ERROR:
                case emic.top.MediaModule.ERROR_STREAM_ERROR:
                case emic.top.MediaModule.ERROR_CONFIGURATION_ERROR:
                    _statModule.onStreamError(data);
                    break;
            }
        }

        var _manageError = function(idError){
            emic.top.debug("[TopPlayer.js][_manageError]>> ",idError);
            switch (idError){
                case emic.top.MediaModule.ERROR_NO_CONTAINER:
                    //TODO: Bloquear player y mostrar mensaje de error en IU
                break;
                default:
                    var infopanel = new psd.media.InfoPanel();

                    this.reboot();

                    if(typeof(LANG)!="undefined")
                        window.mm_lang = LANG;

                    if(typeof(window.mm_lang)=="undefined"){
                        window.mm_lang = "es";
                    }

                    var lang = new psd.media.Lang();

                    var mensaje = lang.translate(window.mm_lang,"no_disponible");
                    //var mensaje = "El contenido solicitado no se encuentra disponible en este momento.";

                    if(_data.mediaData.geo_location!=null){
                        //mensaje = "Contenido no disponible en su zona.";
                        mensaje = lang.translate(window.mm_lang,"geobloqueado");
                    }

                    infopanel.onclick = function(container){
                        container.innerHTML = "";
                    };
                    infopanel.paint(_data.internalData.skinContainer,mensaje,true);

                break;
            }
            //_uimodule.onError(msg, code);
        };

        var _createContainers = function(){
            emic.top.debug("[TopPlayer.js][_createContainers]>> ");
            //TODO: IMPORTANTE: Mirar bien el orden de las capas, y pintarlas para que se solapen unas encima de otras
            var playerContainer, baseContainer, element, element2, container, nameContainer;

            //TODO: Ver que pasa cuando no se le pasa capa para vídeo, qué tamaño toma (etc) y ver si se relaciona con el de la vista

            baseContainer = document.getElementById(_data.genericData.container);

            if(baseContainer) {

                playerContainer = document.getElementById(_data.genericData.container + "_base");
                if (!playerContainer) {
                    playerContainer = document.createElement('div');
                    playerContainer.id = _data.genericData.container + "_base";


                    /*Si recibimos un tamanio del player en la instacia del PAIS lo dibujamos*/
                    if (_data.mediaData.ancho != "" && _data.mediaData.alto != "") {

                        var ratio = _data.mediaData.alto * 100 / _data.mediaData.ancho;

                        playerContainer.style.paddingTop = ratio + "%";
                        playerContainer.className = "commonmm_baseExpand";


                    }else{

                        playerContainer.className = "commonmm_baseExpand";
                    }


                    baseContainer.appendChild(playerContainer);
                }

                if (_data.mediaData.ancho == "" && _data.mediaData.alto == "") {

                    if (!_data.genericData.width)
                        _data.genericData.width = baseContainer.offsetWidth;

                    if (!_data.genericData.height)
                        _data.genericData.height = baseContainer.offsetHeight;
                }

                if (!_data.mediaData.container) _data.mediaData.container = "MediaModule_" + _data.genericData.id;
                if (!_data.uiData.container) _data.uiData.container = "UIModule_" + _data.genericData.id;
                if (!_data.adData.container) _data.adData.container = "AdModule_" + _data.genericData.id;
                if (!_data.internalData.previewContainer) _data.internalData.previewContainer = "UIPreview_" + _data.genericData.id;
                if (!_data.internalData.skinContainer) _data.internalData.skinContainer = "UISkin_" + _data.genericData.id;

                //Los estilos se cargan desde /psdmedia/resources/js/psd/css/commonmm.css

                //Contenedor Media
                element = document.getElementById(_data.mediaData.container);
                if (!element) {
                    element = document.createElement('div');
                    element.id = _data.mediaData.container;
                    element.className = "commonmm_sonExpand";
                    playerContainer.appendChild(element);
                }
                if (_data.mediaData.mimetype.indexOf("video") != -1)
                    element.style.backgroundColor = "black";
                else
                    element.style.backgroundColor = "";

                //Contenedores UI
                element = document.getElementById(_data.uiData.container);
                if (!element){
                    element = document.createElement('div');
                    element.id = _data.uiData.container;
                    //element.style.zIndex = "1000";
                    element.className = "commonmm_sonExpand";
                    playerContainer.appendChild(element);
                }


                element2 = document.getElementById(_data.internalData.previewContainer);
                if (!element2) {
                    element2 = document.createElement('div');
                    element2.id = _data.internalData.previewContainer;
                    element2.className = "commonmm_sonExpand";
                    element.appendChild(element2);
                }
                _hide.apply(this,[_data.internalData.previewContainer]);

                element2 = document.getElementById(_data.internalData.skinContainer);
                if (!element2) {
                    element2 = document.createElement('div');
                    element2.id = _data.internalData.skinContainer;
                    element2.className = "commonmm_sonExpand";
                    element.appendChild(element2);
                }

                _hide.apply(this,[_data.internalData.skinContainer]);

                //Contenedor publicidad
                element = document.getElementById(_data.adData.container);
                if (!element){
                    element = document.createElement('div');
                    element.id = _data.adData.container;
                    element.className = "commonmm_sonExpand";
                    playerContainer.appendChild(element);
                }

            }else{
                //TODO: Gestión de errores
            }
        };

        // Limpia el contenedor del mediaplayer
        var _clearContainer = function()
        {
            var playerContainer = document.getElementById(_data.genericData.container);

            if(playerContainer)
            {
                while(playerContainer.firstChild) {playerContainer.removeChild(playerContainer.firstChild);}
            }else{
                //TODO: Control de errores: No container
            }
        };

        var _nextPosition = function(){
            switch (_position){
                case emic.top.TopPlayer.POSITION_PREVIEW:
                    //////////julian
                    if(_data.mediaData.vuelta<1){//es la primera vuelta (todavía no ha pasado por la publi(si tuviese) y por el video)
                        _data.mediaData.vuelta= _data.mediaData.vuelta +1;
                    }
                    else{//aquí ya pasó, por lo menos una vez, por las publi (si tuviese) y el video.
                        _data.mediaData.primerVideoPlayList= false;
                    }
                    //Si está habilitada la publicidad por fapi y además no tengo adBlock -->preRoll
                    if ((_data.adData.enabled)&& (typeof (_advert) != "undefined")){
                        _changePosition.apply(this, [emic.top.TopPlayer.POSITION_AD_PREROLL]);
                    }
                    else{
                        _changePosition.apply(this, [emic.top.TopPlayer.POSITION_MEDIA]);
                    }

                break;
                case emic.top.TopPlayer.POSITION_AD_PREROLL:
                    _changePosition.apply(this, [emic.top.TopPlayer.POSITION_MEDIA]);
                break;
                case emic.top.TopPlayer.POSITION_MEDIA:
                    //Si está habilitada la publicidad por fapi y además no tengo adBlock -->postRoll
                    if ((_data.adData.enabled)&&(!publiError)&&(typeof (_advert) != "undefined")){

                        /*Si es playlist obviamos el AD-POSTROLL*/
                        if (!_data.mediaData.isPlaylist) {
                            _changePosition.apply(this, [emic.top.TopPlayer.POSITION_AD_POSTROLL]);
                        }
                    }

                    else{
                        _changePosition.apply(this, [emic.top.TopPlayer.POSITION_PREVIEW]);
                    }

                break;
                case emic.top.TopPlayer.POSITION_AD_POSTROLL:
                    _changePosition.apply(this, [emic.top.TopPlayer.POSITION_PREVIEW]);
                break;
            }
        };

        var _changePosition = function(position){
            emic.top.debug("[TopPlayer.js][_changePosition]>> ",position);
            var dataAdBlock = {} ;
            var lastPosition = _position;
            _position = position;
            _data.internalData.position = _position;
            _uimodule.clear();

            switch (position){
                case emic.top.TopPlayer.POSITION_PREVIEW:
                    if (_data.uiData.showPreview){
                        _show(_data.internalData.previewContainer);
                        //Si se oculta el contenedor y luego se vuelve a mostrar el flash se recarga, pasando por el constructor.
                        // Se puede corregir con la propiedad visibility: hidden
//                    _hide(_data.mediaData.container);
                        _hide(_data.internalData.skinContainer);
                    }else{
                        _hide(_data.internalData.previewContainer);
                        if (_data.uiData.overrideNativeControls){
                        }else{
                            _mediaModule.start();
                        }

                        if ((_data.internalData.controllerName != emic.top.MediaModule.CONTROLLER_TYPE_HTML5NATIVE) ||
                            ((_data.internalData.controllerName == emic.top.MediaModule.CONTROLLER_TYPE_HTML5NATIVE) && _data.uiData.overrideNativeControls))
                            _show(_data.internalData.skinContainer);
                        else
                            _hide(_data.internalData.skinContainer);

                        if(_data.internalData.controllerName == 'youtube'){
                            _show(_data.mediaData.container);
                        }

                    }
                    _showLoading.apply(this,[false]);

                    if((getDevice().agent.toLowerCase().indexOf("iphone")>-1)||(getDevice().agent.toLowerCase().indexOf("ipad")>-1))
                        move_hide(_data.adData.container);
                    else
                        _hide(_data.adData.container);
                break;
                case emic.top.TopPlayer.POSITION_AD_PREROLL:
                    _hide(_data.internalData.previewContainer);
                    //_hide(_data.mediaData.container);
                    if (_data.uiData.showSkinInAds)
                        _show(_data.internalData.skinContainer);
                    else
                        _hide(_data.internalData.skinContainer);

                    if((getDevice().agent.toLowerCase().indexOf("iphone")>-1)||(getDevice().agent.toLowerCase().indexOf("ipad")>-1))
                        move_show(_data.adData.container);
                    else
                        _show(_data.adData.container);

                    //Se precarga el contenido para inicializar el controlador en móviles y así evitar el problema de reanudación del contenido tras la publicidad
                    if((getDevice().mobile)){
                        _mediaModule.preLoadContent();
                    }
                    _showLoading.apply(this,[true]);
                    if (typeof (_advert) != "undefined") {
                        _adModule.notificaEstadoOn(emic.top.AdModule.POSITION_PREROLL);
                    } else {
                        //dataAdBlock.position = emic.top.AdModule.POSITION_PREROLL;
                        //dataAdBlock.adErrorAdBlock = ERROR_ADBLOCK;
                        //dataAdBlock.msg = ERROR_ADBLOCK_MSG;
                        //_statModule.onAdError(dataAdBlock); //lazar evento 18

                        publiError = true;
                        _nextPosition.apply(this);
                    }
                break;
                case emic.top.TopPlayer.POSITION_MEDIA:
                    _hide(_data.internalData.previewContainer);
                    //_show(_data.mediaData.container);
                    if ((_data.internalData.controllerName != emic.top.MediaModule.CONTROLLER_TYPE_HTML5NATIVE) ||
                        ((_data.internalData.controllerName == emic.top.MediaModule.CONTROLLER_TYPE_HTML5NATIVE) && _data.uiData.overrideNativeControls))
                        _show(_data.internalData.skinContainer);
                    else
                        _hide(_data.internalData.skinContainer);

                    if((getDevice().agent.toLowerCase().indexOf("iphone")>-1)||(getDevice().agent.toLowerCase().indexOf("ipad")>-1))
                        move_hide(_data.adData.container);
                    else
                        _hide(_data.adData.container);

                    _uimodule.clear();
                    _showLoading.apply(this,[true]);
                    _mediaModule.start();
                break;
                case emic.top.TopPlayer.POSITION_AD_POSTROLL:
                    _hide(_data.internalData.previewContainer);
                    _hide(_data.mediaData.container);
                    if (_data.uiData.showSkinInAds)
                        _show(_data.internalData.skinContainer);
                    else
                        _hide(_data.internalData.skinContainer);

                    if((getDevice().agent.toLowerCase().indexOf("iphone")>-1)||(getDevice().agent.toLowerCase().indexOf("ipad")>-1))
                        move_show(_data.adData.container);
                    else
                        _show(_data.adData.container);

                    _showLoading.apply(this,[true]);


                    if (typeof (_advert) != "undefined") {

                        //-- En caso de Playlist no ejecutamos el PostRoll
                        if (!_data.mediaData.isPlaylist) {

                            _adModule.notificaEstadoOn(emic.top.AdModule.POSITION_POSTROLL);
                        }
                    } else {
                        //dataAdBlock.position = emic.top.AdModule.POSITION_POSTROLL;
                        //dataAdBlock.adErrorAdBlock = ERROR_ADBLOCK;
                        //dataAdBlock.msg = ERROR_ADBLOCK_MSG;
                        //_statModule.onAdError(dataAdBlock); //lazar evento 18

                        publiError = true;
                        _nextPosition.apply(this);
                    }
                break;
            }

            var ev = new emic.top.event.TopEvent(emic.top.event.TopEvent.ON_POSITION_CHANGE);
            ev.data = {id:_data.genericData.id, idMedia: _data.mediaData.idTOP, position: _position, lastPosition: lastPosition};
            this.dispatchEvent(ev);

            _uimodule.onPositionChange(position);
        };

        this.reboot = function(){
            //TODOjc3 forzamos a que se envie el pixel de pause en las estadisticas
            if(typeof(_statModule) == 'object' && typeof(_statModule.onVideoPause) == 'function'){
                _statModule.onVideoPause();
            }
            if(publiError)
                _position = emic.top.TopPlayer.POSITION_MEDIA;
            else

            if (!_data.mediaData.isPlaylist) {
                _position = emic.top.TopPlayer.POSITION_AD_POSTROLL;
            }

            /*
            * en todas las instancias
            * seteamos el autoplay a false para evitar comportamientos raros*/
            _data.mediaData.autoplay = false;

            /*
            * En caso de ser YouTube paramos el reproductor para hacer el reset
            * */
            if (_data.internalData.controllerName == emic.top.MediaModule.CONTROLLER_TYPE_YT){

                _mediaModule.stop();

            }else{

                _mediaModule.reset();

            }

            _uimodule.reset();
            _adModule.close();

            _changePosition.apply(this,[emic.top.TopPlayer.POSITION_PREVIEW]);
        };

        /*Ejecuta play en un player instanciado con el TopEmbedManager*/
        this.play = function () {

            _adModule.resume();

            if (_data.internalData.controllerName == emic.top.MediaModule.CONTROLLER_TYPE_YT) {
                _mediaModule.playpause();

            } else {

                _mediaModule.play();
            };


        };

        /*Ejecuta pause en un player instanciado con el TopEmbedManager*/
        this.pause = function () {

            _adModule.pause();
            _mediaModule.pause();

        };

        var _showLoading = function(flag){
            emic.top.debug("[TopPlayer.js][_showLoading]>> ",flag);
            var ev = new emic.top.event.TopEvent(emic.top.event.TopEvent.ON_LOADING);
            ev.data = {id:_data.genericData.id, idMedia: _data.mediaData.id, value:flag};
            this.dispatchEvent(ev);
            _isLoading = flag;

            _uimodule.showLoading(flag);
        };

        var _show = function(tag){
            var element;
            element = document.getElementById(tag);
            if (element)
                //element.style.display = "";
                element.style.visibility = "";
        };

        var _hide = function(tag){
            var element;
            element = document.getElementById(tag);
            if (element)
                //element.style.display = "none";
                element.style.visibility = "hidden";
        };

        var move_hide = function(tag){
            var element;
            element = document.getElementById(tag);

            if(element){
                element.style.top = "-10000000px";
                element.style.left = "-10000000px";
            }
        }

        var move_show = function(tag){
            var element;
            element = document.getElementById(tag);

            if(element){
                element.style.top = 0;
                element.style.left = 0;
            }
        }

        this.setRatio = function(_width,_height,_preserve){
            if(_uimodule!=undefined){
                _uimodule.setRatio(_width,_height);
            }

            if(_preserve){
                var preresize = window.onresize;

                window.onresize = function(){
                    if(preresize!=null)
                        preresize();

                    _uimodule.setRatio(_width,_height);
                }
            }
        }

        //-- Función que setea la variable 26 = data.organic
        var setVar26 = function () {
            var resultadoV26 = "";
            if (_data.mediaData.primerVideoPlayList) {//si es el primer video de la lista
                if ((_data.mediaData.autoplay == true) && (_data.mediaData.clickPlayList == false)) {//si tiene la configuración de autoplay y no clickeo en un video de la playlist
                    resultadoV26 = "autoplay";
                }
                else {
                    resultadoV26 = "organico";
                }
            }
            else {
                if ((_data.mediaData.autoNext == true) && (_data.mediaData.clickPlayList == false)) {//si autoNext y no clickeo en un video de la playlist
                    resultadoV26 = "secuencial";
                }
                else {
                    resultadoV26 = "organico";
                }
            }
            _data.mediaData.organic = resultadoV26;
        }

        this.createPlayerView = function(domid,config){
            _uimodule.createPlayerView(domid,config);
        }

        this.createPlayerViewReset = function(embed){
            _uimodule.createPlayerViewReset(embed.getMediaPlayer().getLauncher());
        }

        _init.apply(this);
    }

    namespace.TopPlayer = TopPlayer;

})(emic.top);
