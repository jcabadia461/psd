/**
 *  Created by lmcuende on 01/16/2015.
 **/
(function(namespace){

    TopSkin_smoda.prototype = new emic.top.ui.UISkinBase();

    function TopSkin_smoda (){
        emic.top.ui.UISkinBase.call(this);

        ///////////////////
        // VARIABLES     //
        ///////////////////

        var TEXTO_PUBLI = "Contenido Publicitario";

        // elements //

        var _wrapper,               // content ui layer
            _playBig,               // main play button in the center of window
            _playEstirar,           // main div to change heigh in IE8 (special approach)
            _playButton,            // play button at left down bar
            _pauseButton,           // pause button
            _playShare,             // share button at right down bar
            _replay,                // replay button what shows itself when playing is finished.
            _cerrarCompartir,       // close share window
            _progressBar,           // shown only when the video is playing or in pause
            _title,                 // it places title on heading
            _reproducido,           // box placed in progress bar with time played
            _manejador,             // shows in progress bar the width played
            _time_current,          // shows in progress bar (on left hand) the time played
            _duration,              // gets value from data.totaltime and it shows in top-right-corner.
            _totalTime,             // shows total video duration at upper-right-corner (comes from mediadata.duration)
            _totalTimeInf,          // shows total video time at lower-right-corner (comes from mediadata.duration)
            _volumen,               // volume button
            _mute,                  // Not used yet
            _mascaravolumen,        // box for mask volume
            _thumbnail,             // thumbnail box
            _foto,                  // class into thumbnail to content mosaic image
            _mosaic,                // mosaic image unit
            _imgMosaic,             // image from url from mediaData.urlMosaic with all thumbnails
            _numero,                // box into class tiempo to show time in actual position in progress bar
            _pico,                  // bottom arrowhead to show the exact position at progress bar
            _twitter,               // class to share with twitter
            _facebook,              // class to share with facebook
            _nombreVideo,           // text to show the video title on twitter and facebook images
            _videosRotulo,          // text on head of Related Videos
            _calidad,               // div where you create with js all elements (a) from JSON renditions object
            _selectedQField,        // text at right hand of icon quality to show the quality choosen.
            _relatedVideos,         // spam where on create class "playerMRSTN_enlaces_videos" with DHTML
            _fullScr,               // link to notify full screen at bottom-right-corner
            _imagenInicio,          // image to show at first from uiData.poster
            _centrador,             // layer where it puts the poster if there are´nt related videos at the end of play
            aelements = [],        // matrix to contain the media.renditions matrix with JSON elements (bitrate, label)
            _mos,
            //_boton_calidad,
            //_boton_fullscreen,
            _txt_compartir = "default";

        var OB_PASSIVE_MODE = true; // it´s neccesary for Outbrain API ( Show Related Videos)***Outbrain****************
        var _dataRelatedVideos = {  // object to load data from Outbrain permalink**************Outbrain****************
            "total_count" : 0,
            "count" : 0,
            "doc" : [
                {
                    "source_name" : "",
                    "same_source" : "",
                    "publish_date" : "",
                    "orig_url" : "",
                    "rec-cats" : [],
                    "rec_en_did" : "",
                    "url" : "",
                    "author" : "",
                    "content" : "",
                    "thumbnail" : {
                        "url" : "",
                        "width" : 0,
                        "height" : 0,
                        "imageImpressionType" : ""
                    }
                }
            ]
        };
        var _dataFromAPI = "";

        // flags //

        var
            _flag,                  // Contols OnPosition - Preview if it is first time or not.
            _isPaused,              // controls status pause; gets value from MediaModule.STATUS_PAUSE
            _wasPaused,             // remember control before pause status (if last status was pause)
            _isIE8 = false,         // controls if the browser is Internet Explorer 8
            _isThereRenditions = false,// if there are renditions data (from config.media.renditions)
            _ended = false,         // controls if video is finished
            _started = false,// controls whether the video has started ever; activates on MediaModule.STATUS_PLAY
            _existsPhoto = false,   // controls if there is a mosaic image (from _data.mediaData.urlMosaic)
            _passedVideos = false,  // activates at true if showRelatedVideos is executed
            _areThereRelatedVideos = false,// controls if there are related videos or not(from media.relacionadosUrl
            _isFullScreen = false;  // switch full screen status like toggle

        // other operating data //

        var
            _claseInicial,          // its value depends on uiData.skinData.previewMode; suffixed to "envoltorio"
            _claseActual;           //  = "playerMRSTN_estado_pausado";

        var _container,             // to content skin container
            _data;                  // data from init (data)

        ///////////////////
        // CONSTANTS     //
        ///////////////////

        var _URL_TEMPLATE = "/psdmedia/media/top/skins/smoda/assets/template.html",   // template
            _URL_STYLE = "/psdmedia/media/top/skins/smoda/assets/estilos.css",        // main style
            _URL_STYLE2 = "/psdmedia/media/top/skins/smoda/assets/estilos_ie8.css",   // IE8 style

            _CODE_NUM_PARSER_OK = 0,
            _CODE_NUM_PARSER_ERROR = 1;

        ///////////////////
        // INITIALIZING  //
        ///////////////////

        /*

         var outbrain_callback = function(json) {
         // Iterate through json.doc array
         for (var i = 0; i < json.doc.length; i++){
         var doc = json.doc[i];
         }
         };
         */


        /*        var _callODB = function() {
         var request_data = {                                    // API rest Outbrain************************************
         permalink:"http://www.smoda.com/448267",      // url from
         widgetId: "APP_1"
         };
         var callBackFuncObj = function(json) {

         _dataAPI = JSON.stringify(json);
         };
         OBR.extern.callRecs(request_data, callBackFuncObj);

         };
         */
        var _loadCSS = function() {                             // Loading CSS main file
            var fileref = document.createElement("link"),
                filename = _data.genericData.urlBase ? (_data.genericData.urlBase + _URL_STYLE) : _URL_STYLE;
            fileref.setAttribute("rel", "stylesheet");
            fileref.setAttribute("type", "text/css");
            fileref.setAttribute("href", filename);
            if (typeof fileref != "undefined") {
                document.getElementsByTagName("head")[0].appendChild(fileref);
            }
        };

        var _loadCSS2 = function(){                             // Loading CSS secondary file
            var fileref = document.createElement("link"),
                filename = _data.genericData.urlBase ? (_data.genericData.urlBase + _URL_STYLE2) : _URL_STYLE2;
            fileref.setAttribute("rel", "stylesheet");
            fileref.setAttribute("type", "text/css");
            fileref.setAttribute("href", filename);
            if (typeof fileref!="undefined") {
                document.getElementsByTagName("head")[0].appendChild(fileref);
            }
        };

        var changeGenericStyle = function(newstyle) {           // Change layer style by css class
            _wrapper.className = _wrapper.className.replace(_claseActual,newstyle);
            _claseActual = newstyle;
        };

        var getOffsetRect = function(elem){                     // Getting the enclosing rectangle. Used to calculate
            var box = elem.getBoundingClientRect();             // x,y positions in FullScreen with Webkit

            var body = document.body;
            var docElem = document.documentElement;

            var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;    // Calculates the page scroll
            var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;

            var clientTop = docElem.clientTop || body.clientTop || 0;       // Getting the shift(left-upper corner)
            var clientLeft = docElem.clientLeft || body.clientLeft || 0;

            var y = box.top + scrollTop - clientTop;      // Add scrolls to windows-relative coordinates and susbstract...
            var x = box.left + scrollLeft - clientLeft;  // ... the shift of html/body to get coordinates in the whole document

            return { y: Math.round(y), x: Math.round(x)}
        };

        var isWebKit = function() {                             // Test web browser, if it's webkit
            return /(safari|opera|chrome)/.test(navigator.userAgent.toLowerCase());
        };

        var isGecko = function() {
            return /(firefox)/.test(navigator.userAgent.toLowerCase());
        };


        this.onSwitchRequest = function(id) {

            _wrapper.className = _wrapper.className + " playerMRSTN_cargando_calidad";
        };

        this.onSwitchComplete = function(id) {
            var j;
            for(j in aelements) {
                if (j == id) {
                    aelements[j].className = "playerMRSTN_seleccionado";
                }
                else
                    aelements[j].className = "";          //erasing last class
            }
            _selectedQField.innerHTML = _data.mediaData.renditions[id].label;
            if ((psd.framework.ua.msie!=null)&&(psd.framework.ua.msie)&&(parseInt(psd.framework.ua.version)<9)) {
                _isIE8 = true;
                _selectedQField.style.fontStyle = "normal";;
            }
            _selectedQField.style.visibility = "visible";

        };
        var _createRendition = function(rendition, index){      // It's used in showQuality to control option clicked...
            var aelement = document.createElement("a");          // ... and launches the notifyOrderSwitchDirect
            aelement.text = rendition.label;
            aelement.href = "javascript:void(0)";
            aelement.id = "Quality"+String(index);
            aelement.onclick = (function(that){
                return function(e){
                    aelement.className = "PlayerMRSTN_seleccionado";
                    that.notifyOrderSwitchDirect(index);
                }
            })(this);
            return aelement;
        };
        var showQuality = function() {
            var i,
                qualities=_data.mediaData.renditions,
                content = document.createElement("div");
            //qualities.push({bitrate:"auto", label:"auto"});
            aelements = [];
            for (i in qualities) {
                aelements[i] = _createRendition.apply(this,[qualities[i],i]);
                content.appendChild(aelements[i]);
            }
            _calidad.innerHTML = "";
            _calidad.appendChild(content);
        };

        var showRelatedVideos = function(relatedVideos) {

            var n = relatedVideos.length;
            var nRec = n - 1;
            var heightLayer, sumHeightLawyer;  // heigLayer (to apply to offsetHeight of the wrapper)
            // sumHeightLayer (to calculate the sum of the offsetHeight of all layers painted)
            var distParam = [];
            var typeDist;
            if (n > 0) {                        // there is a thumbnail at least
                if (n == 1) {
                    typeDist = 1;
                } else if (n == 2) {
                    typeDist = 2;
                } else if (n < 7) {
                    typeDist = 3;
                } else {
                    typeDist = 4;
                }

                var numrows = parseInt(n / 3);
                var rest = n % 3;
                if (rest > 0) {
                    ++numrows;
                }
                switch (typeDist) {
                    case 1:
                        distParam = [1, 3, 80, 10, 5, 5, 16];
                        //[r,c,maxc,tm,rm,bm,lm,]  rows,columns,maxTitleCharecters,topM,rightM,bottomM,leftM,
                        break;

                    case 2:
                        distParam = [2, 3, 50, 3, 0, 0, 0];
                        break;
                    default:
                        distParam = [numrows, 3, 50, 3, 0, 0, 0];
                        break;
                }
                var rows = distParam[0];
                var columns = distParam[1];
                var lenMaxTitulo = distParam[2];
                var marginTop = distParam[3];
                var marginRight = distParam[4];
                var marginBottom = distParam[5];
                var marginLeft = distParam[6];
                var k = 0;              // index for explore thumbnail array
                sumHeightLawyer = 0;
                for (var i = 1; i <= rows; i++) {
                    var contenido = document.createElement("div");
                    contenido.className = "playerMRSTN_enlaces_videos playerMRSTN_estirar";
                    contenido.style.marginTop = marginTop + "%";
                    for (var j = 1; j <= columns; j++) {
                        k = columns * (i - 1) + j - 1;
                        if (k == n) {
                            break;
                        }
                        if ((_isIE8) && (k == (n - 1))) { break;}
                        var aelement = document.createElement("a");
                        var titulo = relatedVideos[k].content;
                        var lenTitulo = titulo.length;
                        if (lenTitulo > lenMaxTitulo) {
                            titulo = titulo.substr(0, lenMaxTitulo) + "...";
                        }
                        aelement.title = relatedVideos[k].content;

                        aelement.href = relatedVideos[k].url;
                        aelement.className = "playerMRSTN_video";
                        var divelement = document.createElement("div");
                        divelement.className = "playerMRSTN_foto";
                        divelement.backgroundColor = "#FFF";
                        var divelement_formato = document.createElement("div");
                        divelement_formato.className = "playerMRSTN_formato";
                        var divelement_foto_interior = document.createElement("div");
                        divelement_foto_interior.className = "playerMRSTN_foto_interior";
                        var imgelement = document.createElement("img");
                        imgelement.src = relatedVideos[k].thumbnail.url;

                        var btnelement = document.createElement("div");
                        btnelement.className = "playerMRSTN_boton_play";
                        var divelement_titulo = document.createElement("div");
                        divelement_titulo.className = "playerMRSTN_titulo";
                        divelement_titulo.innerHTML = titulo;

                        aelement.appendChild(divelement);
                        divelement.appendChild(divelement_formato);
                        divelement.appendChild(divelement_foto_interior);
                        divelement_foto_interior.appendChild(imgelement);
                        divelement.appendChild(btnelement);
                        aelement.appendChild(divelement_titulo);
                        contenido.appendChild(aelement);
                    }
                    contenido.id = "row" + i;
                    heightLayer = _wrapper.offsetHeight;

                    if ((i * 220) >= heightLayer) {
                        contenido.style.display = "none";
                    }
                    _relatedVideos.appendChild(contenido);
                }
            }
            _passedVideos = true;
        };
        /*
         var showLastVideos = function(lastVideos) { // data from last videos (fapi)

         var n = lastVideos.length;
         var nRec = n - 1;
         var heightLayer, sumHeightLawyer;  // heigLayer (to apply to offsetHeight of the wrapper)
         // sumHeightLayer (to calculate the sum of the offsetHeight of all layers painted)
         var distParam = [];
         var typeDist;
         if (n > 0) {                        // there is a thumbnail at least
         if (n == 1) {
         typeDist = 1;
         } else if (n == 2) {
         typeDist = 2;
         } else if (n < 7) {
         typeDist = 3;
         } else {
         typeDist = 4;
         }

         var numrows = parseInt(n / 3);
         var rest = n % 3;
         if (rest > 0) {
         ++numrows;
         }
         switch (typeDist) {
         case 1:
         distParam = [1, 3, 80, 10, 5, 5, 16];
         //[r,c,maxc,tm,rm,bm,lm,]  rows,columns,maxTitleCharacters,topM,rightM,bottomM,leftM,
         break;

         case 2:
         distParam = [2, 3, 50, 3, 0, 0, 0];
         break;
         default:
         distParam = [numrows, 3, 50, 3, 0, 0, 0];
         break;
         }
         var rows = distParam[0];
         var columns = distParam[1];
         var lenMaxTitulo = distParam[2];
         var marginTop = distParam[3];
         var marginRight = distParam[4];
         var marginBottom = distParam[5];
         var marginLeft = distParam[6];
         var k = 0;              // index for explore thumbnail array
         sumHeightLawyer = 0;
         for (var i = 1; i <= rows; i++) {
         var contenido = document.createElement("div");
         contenido.className = "playerMRSTN_enlaces_videos playerMRSTN_estirar";
         contenido.style.marginTop = marginTop + "%";
         for (var j = 1; j <= columns; j++) {
         k = columns * (i - 1) + j - 1;
         if (k == n) {
         break;
         }
         if ((_isIE8) && (k == (n - 1))) { break;}
         var aelement = document.createElement("a");
         var titulo = lastVideos[k].name;
         var lenTitulo = titulo.length;
         if (lenTitulo > lenMaxTitulo) {
         titulo = titulo.substr(0, lenMaxTitulo) + "...";
         }

         aelement.title = lastVideos[k].name;
         aelement.tag = k;

         aelement.onclick = (function(that) {

         return function(){
         _data.mediaData.title = lastVideos[this.tag].name;
         _title.innerHTML = _data.mediaData.title;
         if (lastVideos[this.tag].description == "{}")
         _data.mediaData.description = lastVideos[this.tag].name;
         else
         _data.mediaData.description = lastVideos[this.tag].description;
         _data.mediaData.urlMosaic = lastVideos[this.tag].url_mosaic;
         _imgMosaic = lastVideos[this.tag].url_mosaic;
         var mos = new emic.top.ui.Mosaic();
         mos.init("mosaic" + _data.genericData.id, _imgMosaic);
         window.mmm = mos;
         if (lastVideos[this.tag].asset[0].url[0].url.length > 0)
         _data.mediaData.url = lastVideos[this.tag].asset[0].url[0].url;
         else
         _data.mediaData.url = "#";
         if (parseInt(lastVideos[this.tag]) > 0)
         _data.mediaData.duration = parseInt(lastVideos[this.tag].length/1000);
         _totalTime.innerHTML = that.secondsAsTimeCode(_data.mediaData.duration,"hh:mm:ss");
         _totalTime.title = that.secondsAsTimeCode(_data.mediaData.duration,"hh:mm:ss");
         while (_data.mediaData.renditions.length > 0){
         _data.mediaData.renditions.pop();
         }
         var worklist =  [];
         for (var w in lastVideos[this.tag].asset) {
         worklist.push(lastVideos[this.tag].asset[w].bitrate);
         }
         worklist.sort(function(a, b){return b-a});

         for (var w in worklist){
         var bitrate = String(worklist[w]);
         rendition = new Object();
         rendition.bitrate = String(bitrate);
         rendition.label = String(bitrate);
         _data.mediaData.renditions[w] = rendition;
         }
         _calidad.innerHTML = "";

         if (_isThereRenditions)
         showQuality.apply(that);

         _selectedQField.innerHTML = _data.mediaData.renditions[1].label;
         _selectedQField.style.visibility = "visible";

         that.notifyOrderReset();
         }
         })(this);

         //aelement.href = lastVideos[k].asset[0].url[0].url;
         aelement.className = "playerMRSTN_video";
         var divelement = document.createElement("div");
         divelement.className = "playerMRSTN_foto";
         divelement.backgroundColor = "#FFF";
         var divelement_formato = document.createElement("div");
         divelement_formato.className = "playerMRSTN_formato";
         var divelement_foto_interior = document.createElement("div");
         divelement_foto_interior.className = "playerMRSTN_foto_interior";
         var imgelement = document.createElement("img");
         imgelement.src = lastVideos[k].url_thumbnail;

         var btnelement = document.createElement("div");
         btnelement.className = "playerMRSTN_boton_play";
         var divelement_titulo = document.createElement("div");
         divelement_titulo.className = "playerMRSTN_titulo";
         divelement_titulo.innerHTML = titulo;

         aelement.appendChild(divelement);
         divelement.appendChild(divelement_formato);
         divelement.appendChild(divelement_foto_interior);
         divelement_foto_interior.appendChild(imgelement);
         divelement.appendChild(btnelement);
         aelement.appendChild(divelement_titulo);
         contenido.appendChild(aelement);
         }
         contenido.id = "row" + i;
         heightLayer = _wrapper.offsetHeight;

         if ((i * 220) >= heightLayer) {
         contenido.style.display = "none";
         }
         _relatedVideos.appendChild(contenido);
         }
         }
         _passedVideos = true;
         };
         */
        var _loadTemplate = function() {

            var _parser = new psd.framework.Parser(),
                templateMediator = new psd.framework.Mediator(),
                url = _data.genericData.urlBase ? (_data.genericData.urlBase + _URL_TEMPLATE) : _URL_TEMPLATE;
            templateMediator.corsIE(true);
            templateMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_COMPLETE, onDataComplete, this);
            templateMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_ERROR, onDataError, this);
            templateMediator.mediate(url, _parser, psd.framework.Mediator.RESPONSE_TEXT);
        };

        var _loadVideos = function() {
            _data.mediaData.relacionadosUrl = "";
            //_data.mediaData.relacionadosUrl = "http://fapi-top.prisasd.com/api/search/smoda/video/?order=true&size=12";
            // OJO! Metemos directamente la url de los últimos videos vistos desde la fapi, pero la variable no está en la fapi
            var _jsonParser = new psd.framework.parser.JSONParser(),
                videosMediator = new psd.framework.Mediator(),
            //url = _data.genericData.urlBase ? (_data.genericData.urlBase + _data.mediaData.relacionadosUrl) : _data.mediaData.relacionadosUrl;
                url = _data.genericData.urlBase ? (_data.mediaData.relacionadosUrl) : _data.mediaData.relacionadosUrl;
            videosMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_COMPLETE, onDataCompleteVideos, this);
            videosMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_ERROR, onDataErrorVideos, this);
            videosMediator.mediate(url, _jsonParser, psd.framework.Mediator.RESPONSE_JSON);
        };

        //EVENTOS MEDIATOR

        var onDataComplete = function (evt) {
            var template;
            if (evt.result.parserResult.code == _CODE_NUM_PARSER_OK) {
                template = evt.result.parserResult.result.replace(/{<-%ID%->}/g, _data.genericData.id);

                _container.innerHTML = template;

                _asignElements.apply(this);

                this.recolocarIE8();
                this.notifyInitComplete();
            }
            else if (evt.result.parserResult.code == _CODE_NUM_PARSER_ERROR) {
                //TODO: Error
            }
        };

        var onDataError = function(evt)
        {
            //TODO: Error
        };

        var onDataCompleteVideos = function (evt) {
            var videos;
            if (evt.result.parserResult.code == _CODE_NUM_PARSER_OK)
            {
                // _callODB();                                   // Valid for local or Outbrain configuration

                videos = evt.result.parserResult.result;
                //showRelatedVideos.apply(this,[videos.doc]);   // Valid for local or Outbrain configuration
                /* We must activate if we want show last videos
                 if (!_isIE8)
                 showLastVideos.apply(this,[videos.data]);       // Valid for url from fapi about last videos showed
                 */
            }
            else if (evt.result.parserResult.code == _CODE_NUM_PARSER_ERROR)
            {
                //TODO: Error
            }
        };

        var onDataErrorVideos = function(evt)
        {
            //TODO: Error
        };

        var _getElementById = function(id){
            return document.getElementById(id+_data.genericData.id);
        };

        var _asignElements = function(){

            _wrapper = _getElementById("wrapper");
            _playBig = _getElementById("PlayerPlayBig");
            _playEstirar = _getElementById("PlayerPlayEstirar");
            _playButton = _getElementById("PlayerPlay");
            _pauseButton = _getElementById("PlayerPause");
            _playShare = _getElementById("PlayerShare");
            _replay = _getElementById("PlayerReplay");
            _totalTime = _getElementById("PlayerTotalTime");
            _totalTimeInf = _getElementById("PlayerTotalTimeInf");
            _imagenInicio = _getElementById("imagenInicio");
            _centrador = _getElementById("centrador");
            _cerrarCompartir = _getElementById("PlayerCerrarCompartir");
            _reproducido = _getElementById("reproducido");
            _manejador = _getElementById("manejador");
            _time_current = _getElementById(("time_current"));
            _volumen = _getElementById("volumen");
            _mute = _getElementById("mute");
            _mascaravolumen = _getElementById("mascaravolumen");
            _progressBar = _getElementById("PlayerProgress");
            _thumbnail = _getElementById("PlayerThumbnails");
            _foto = _getElementById("foto");
            _mosaic = _getElementById("mosaic");
            _numero = _getElementById("numero");
            _pico = _getElementById("pico");
            _nombreVideo = _getElementById("PlayerNombreVideo");
            _videosRotulo = _getElementById("videosRotulo");
            _twitter = _getElementById("twitter");
            _facebook = _getElementById("facebook");
            _fullScr = _getElementById("PlayerFullScreen");
            _calidad = _getElementById("PlayerCalidad");
            _selectedQField = _getElementById("PlayerQuality_1");
            _relatedVideos = _getElementById("PlayerRelatedVideos");
            _title = _getElementById("PlayerDesc");
            _totalTime.innerHTML = "";
            _duration = 0;
            _isIE8 = false;
            //_boton_calidad = _getElementById("boton_calidad_");
            //_boton_fullscreen = _getElementById("boton_fullscreen_");

            //_boton_calidad.style.display = "none";

            if((psd.framework.ua.msie!=null)&&(psd.framework.ua.msie)&&(parseInt(psd.framework.ua.version)<11)){
                //_fullScr.style.display = "none";
                _wrapper.className =  _wrapper.className + " playerMRSTN_b_fullscreen_0";
            }

            _playBig.onclick = (function(that){
                return function(){
                    that.notifyOrderPlay();
                }
            })(this);

            _playButton.onclick = (function(that){
                return function(){
                    that.notifyOrderPlay();
                }
            })(this);

            _volumen.onclick = (function(that, __currentTarget){
                return function(e){
                    /* if(_data.internalData.position!=emic.top.TopPlayer.POSITION_MEDIA){
                     return;
                     }*/

                    var x, y, parentPosition;

                    var ct = ((psd.framework.ua.msie!=null)&&(psd.framework.ua.msie)&&(parseInt(psd.framework.ua.version)<9))? __currentTarget: e.currentTarget;
                    var evento = e || window.event;
                    parentPosition = that.getPosition(ct);

                    y = evento.layerY;

                    var prop = y / this.offsetHeight;

                    prop = 1 - prop;

                    that.notifyOrderVolumeChange(prop);
                }
            })(this,_volumen );

            /*_mute.onclick = (function(that){
             return function(e){
             that.notifyOrderVolumeChange(0);
             }

             })(this);
             */

            _pauseButton.onclick = (function(that){
                return function(){
                    if ((psd.framework.ua.msie!=null)&&(psd.framework.ua.msie)&&(parseInt(psd.framework.ua.version)<9)) {
                        _isIE8 = true;
                        _playEstirar.style.height = _wrapper.offsetHeight + "px";
                    }
                    that.notifyOrderPause();
                }
            })(this);

            _playShare.onclick = (function(that) {
                return function() {
                    if ((_started) && (!_ended)) {
                        _wasPaused = _isPaused;
                        that.notifyOrderPause();
                    }
                    changeGenericStyle(" playerMRSTN_estado_compartiendo");
                }
            })(this);

            _replay.onclick = (function(that) {
                return function() {
                    var percent = 0;
                    _ended = false;
                    _reproducido.style.width = percent + "%";
                    _manejador.style.left = percent + "%";
                    changeGenericStyle(_claseInicial);
                    that.notifyOrderPlay();
                }
            })(this);

            _cerrarCompartir.onclick = (function(that) {
                return function() {

                    changeGenericStyle(" playerMRSTN_b_compartir_0");
                    if ((_flag) && (_ended)) {                                  // this is the end
                        changeGenericStyle(" playerMRSTN_estado_fin playerMRSTN_b_calidad_0");
                        //changeGenericStyle(" playerMRSTN_estado_fin");
                    } else {
                        if (!_started) {                                        // this is the start
                            changeGenericStyle(_claseInicial);
                        } else {                                                // video is playing
                            if (!_wasPaused)
                                that.notifyOrderPlay();
                            else
                                _changeToMediaClass();
                        }
                    }
                }
            })(this);

            _facebook.onclick = (function(that){
                return function(){
                    var refer = window.location.href;

                    var refUrl = "https://www.facebook.com/sharer/sharer.php?u=" + refer;
                    window.open(refUrl,'_blank');
                    //that.notifyOrderShareFacebook();  // This line for when integrated in the top player.
                }
            })(this);

            _fullScr.onclick = (function(that){
                return function(){

                    if (_isFullScreen)
                        _isFullScreen = false;
                    else
                        _isFullScreen = true;
                    that.notifyOrderFullScreen();
                }
            })(this);

            switch (_data.uiData.skinData.previewMode){
                case "small":
                    _claseInicial = " playerMRSTN_estado_off_2";
                    _wrapper.className += _claseInicial;
                    _claseActual = _claseInicial;
                    break;
                default:
                    _claseInicial = " playerMRSTN_estado_off_1";
                    _wrapper.className += " playerMRSTN_estado_off_1";
                    _claseActual = _claseInicial;
                    break;

            }

            setSkin.apply(this);
        };

        var setSkin = function()
        {

            _imagenInicio.style.visibility = 'visible';
            _reproducido.style.width = 0;
            _manejador.style.left = 0;


            if (_data.mediaData.urlMosaic){
                _imgMosaic = _data.mediaData.urlMosaic;
                _existsPhoto = true;
            } else {
                _flag = false;
            }

            if(!((psd.framework.ua.msie!=null)&&(psd.framework.ua.msie)&&(parseInt(psd.framework.ua.version)<9))) {
                _mos = new emic.top.ui.Mosaic();
                _mos.init("mosaic" + _data.genericData.id, _imgMosaic);
            }

            /* Habilitar si se decide incorporar relacionadosUrl en la fapi
             if (_data.mediaData.relacionadosUrl)
             _areThereRelatedVideos = true;
             */

            if (_data.mediaData.renditions.length > 0) {
                _resoluciones = _data.mediaData.renditions;
                _isThereRenditions = true;
            } else {
                _wrapper.className =  _wrapper.className + " playerMRSTN_b_calidad_0";
                _flag = false;
            }

            if (_data.uiData.poster) {
                _imagenInicio.src = _data.uiData.poster;
            } else {
                _flag = false;
            }

            if (_data.mediaData.title) {
                _nombreVideo.innerHTML = _data.mediaData.title;
                _nombreVideo.style.title = _data.mediaData.title;
            } else {
                _flag = false;
            }

            if (getDevice().mobile)
            {
                //if (getDevice().agent.toLowerCase().indexOf('android') == -1) _boton_fullscreen.style.display = "none";
                document.getElementsByClassName("playerMRSTN_volumen")[0].style.display = "none";
                //_progressBar.style.display = "none";
            }
            else
            {
                if(_data.mediaData.duration){
                    if((_data.mediaData.duration!="")&&(_data.mediaData.duration!=null)&&(_data.mediaData.duration>0)){

                        var _length = _data.mediaData.duration / 1000;
                        _totalTime.innerHTML = this.secondsAsTimeCode(_length,"hh:mm:ss");
                        _totalTime.title = this.secondsAsTimeCode(_length,"hh:mm:ss");
                        _totalTimeInf.innerHTML = this.secondsAsTimeCode(_length,"hh:mm:ss");
                        _totalTimeInf.title = this.secondsAsTimeCode(_length,"hh:mm:ss");
                    }
                } else {
                    _totalTime.style.visibility = "hidden";
                    _totalTimeInf.style.visibility = "hidden";
                    _flag = false;
                }
            }

            _title.innerHTML = _data.mediaData.title;

            if (_isThereRenditions) _selectedQField.innerHTML = _data.mediaData.renditions[0].label;

            _progressBar.onclick = (function(that, __currentTarget){
                return function(e){
                    // if(_data.internalData.position!=emic.top.TopPlayer.POSITION_MEDIA){
                    //    return;
                    // }

                    if((_data.mediaData.isLive)&&(!_data.mediaData.isDVR)){}
                    else{
                        var x, y, parentPosition;
                        var ct = ((psd.framework.ua.msie!=null)&&(psd.framework.ua.msie)&&(parseInt(psd.framework.ua.version)<9))? __currentTarget: e.currentTarget;
                        var evento = e || window.event;
                        if ((_isFullScreen) && (isWebKit()))
                            parentPosition = getOffsetRect(ct); // Fullscreen data from getBoundingClientrect
                        else
                            parentPosition = that.getPosition(ct); // Fullscreen data from (offset - scroll + client)

                        x = evento.clientX - parentPosition.x;
                        y = evento.clientY - parentPosition.y;

                        var prop = x / _progressBar.offsetWidth;

                        if (prop < 0.02) {
                            prop = 0;
                        }
                        that.notifyOrderSeekByProp(prop);
                    }
                }
            })(this, _progressBar);

            _progressBar.onmouseover = (function(that){

                return function(e){


                    if(_data.internalData.position!=emic.top.TopPlayer.POSITION_MEDIA){
                        return;
                    }

                    if((!_data.mediaData.isLive)){

                        if((psd.framework.ua.msie!=null)&&(psd.framework.ua.msie)&&(parseInt(psd.framework.ua.version)<9))
                        {
                            _thumbnail.style.visibility = "hidden";

                        } else {
                            _thumbnail.style.visibility = "visible";
                            _pico.style.left = 0 + "px";
                        }
                    }
                }
            })(this);

            _progressBar.onmousemove = (function(that, __currentTarget){
                return function(e) {

                    if((psd.framework.ua.msie!=null)&&(psd.framework.ua.msie)&&(parseInt(psd.framework.ua.version)<9)){return false;}

                    if (_data.internalData.position != emic.top.TopPlayer.POSITION_MEDIA) {
                        return;
                    }

                    if(!_existsPhoto){
                        _thumbnail.style.left="-1000000px";
                    }

                    if ((!_data.mediaData.isLive)) {

                        var x, y, z, w, puntopico, wtotal, topeDerecho, topeIzquierdo, parentPosition;
                        var ct = ((psd.framework.ua.msie!=null)&&(psd.framework.ua.msie)&&(parseInt(psd.framework.ua.version)<9))? __currentTarget: e.currentTarget;
                        var evento = e || window.event;

                        if ((_isFullScreen) && (isWebKit()))
                            parentPosition = getOffsetRect(ct); // Fullscreen data from getBoundingClientrect
                        else
                            parentPosition = that.getPosition(ct); // Fullscreen data from (offset - scroll + client)

                        x = evento.clientX - parentPosition.x;
                        var xR = x;  // Remember x to exitsPhoto
                        y = evento.clientY - parentPosition.y;

                        _posThumbRec = x;                                       //Remember pos for onmouseover
                        _thumbnail.visibility = "visible";
                        wtotal = _progressBar.offsetWidth; // width total of progressbar
                        var factor = _duration / wtotal;  // To convert px to sc

                        var actualTime = x * factor + 1;//*************************************************
                        if (actualTime > _duration) {
                            actualTime = _duration;
                        }
                        if (actualTime < 0) {
                            actualTime = 0;
                        }
                        _numero.innerHTML = that.secondsAsTimeCode(actualTime, "hh:mm:ss");
                        // Control of visual appearance of thumbnail depending of to exist or no of Mosaic(_existsPhoto)
                        if (_existsPhoto) {                     //Depending on there is thumbnail or not, it uses _thumbnail or _numero to calculate the offsetWidth
                            w = _thumbnail.offsetWidth;
                        } else {
                            w = _numero.offsetWidth;
                        }
                        topeDerecho = wtotal - w / 2 + 1;
                        topeIzquierdo = w / 2 - 1;
                        z = x;
                        if (x >= topeDerecho) {
                            x = wtotal - w;
                            puntopico = Math.abs(wtotal - z - parseInt(w / 2));
                            _pico.style.left = puntopico + "px";

                        } else if (x <= topeIzquierdo) {
                            x = 1;
                            puntopico = z - parseInt(w / 2);
                            _pico.style.left = puntopico + "px";

                        } else {
                            x -= parseInt(w / 2);
                        }

                        if (_existsPhoto) {
                            _mos.paint((xR /_progressBar.offsetWidth)*100);
                            _thumbnail.style.marginLeft = x + "px";
                        } else {
                            _foto.style.visibility = "hidden";
                            var factor2 = (x - w) - (w / 2) + 5;
                            _thumbnail.style.marginLeft = factor2  + "px";
                        }
                    }
                }
            })(this);

            _twitter.onclick = (function(that){
                return function(){
                    if (_data.mediaData.description == "{}")
                        _data.mediaData.description = " ";
                    var content = _data.mediaData.title + "-" + _data.mediaData.description;

                    if (content.length > 100)
                        content = content.substr(0, 100)+"...";

                    content = content.replace(/\|/g," ");

                    var refer = window.location.href;

                    var refUrl = " https://twitter.com/intent/tweet?text=";
                    refUrl += content;
                    refUrl += "&via=";
                    refUrl += "smoda";
                    refUrl += "&url=";
                    refUrl += refer;
                    window.open(refUrl,'_blank');
                    //that.notifyOrderShareTwitter();   // This line for when integrated in the top player.
                }
            })(this);


        }

        this.inArray = function(needle, haystack) {
            var length = haystack.length;
            for(var i = 0; i < length; i++) {
                if(haystack[i] == needle) return true;
            }

            return false;
        }

        this.init = function(data){

            _data = data;

            _txt_compartir = _data.uiData.skinData.sharetext;

            _container = document.getElementById(_data.internalData.skinContainer);

            _loadCSS.apply(this);

            if ((psd.framework.ua.msie!=null)&&(psd.framework.ua.msie)&&(parseInt(psd.framework.ua.version)<9)) {
                _isIE8 = true;
                _loadCSS2.apply(this);
            }
            _loadTemplate.apply(this);

        };

        this.reset = function ()
        {
            _flag = false;
            setSkin.apply(this);
        };

        this.onBufferEmpty = function(){
            _ended = false;
            _showLoading.apply(this, [true]);
        };

        this.onBufferFull = function(){
            _showLoading.apply(this, [false]);
        };

        this.showLoading = function (flag) {
            _showLoading.apply(this, [flag]);
        };


        var _showLoading = function(flag){

            var inValid = (psd.framework.ua.msie!=null)&&(psd.framework.ua.msie)&&(parseInt(psd.framework.ua.version)<10);
            if(!inValid && (_data.internalData.position == emic.top.TopPlayer.POSITION_MEDIA))

                if (flag) {

                    changeGenericStyle(" playerMRSTN_estado_cargando playerMRSTN_cargando_calidad");

                } else {
                    _changeToMediaClass();
                }

        };


        this.onStatusChange = function(status) {
            switch(status){
                case emic.top.MediaModule.STATUS_STOP:
                case emic.top.MediaModule.STATUS_PAUSE:
                    _isPaused = true;

                    break;

                case emic.top.MediaModule.STATUS_PLAY:
                    _imagenInicio.style.visibility = "hidden";
                    _position = emic.top.TopPlayer.POSITION_MEDIA;
                    if ((psd.framework.ua.msie!=null)&&(psd.framework.ua.msie)&&(parseInt(psd.framework.ua.version)<9)){
                        changeGenericStyle(" playerMRSTN_estado_on playerMRSTN_b_compartir_0");
                    }

                    _started = true;
                    _isPaused = false;
                    break;

                case emic.top.AdModule.STATUS_PLAY:
                    _currentStateButton = _pauseButton;
                    _thumbnail.style.visibility = "hidden";
                    _title.innerHTML = TEXTO_PUBLI;
                    changeGenericStyle(" playerMRSTN_estado_on playerMRSTN_b_calidad_0 playerMRSTN_b_compartir_0");

                    break;
                case emic.top.AdModule.STATUS_PAUSE:
                    _totalTime.style.visibility = "visible";
                    changeGenericStyle(" playerMRSTN_estado_pausado playerMRSTN_b_calidad_0 playerMRSTN_b_compartir_0");
                    _currentStateButton = _playButton;
                    break;

                case emic.top.AdModule.STATUS_STOP:
                    _title.innerHTML = _data.mediaData.title;
                    _thumbnail.style.visibility = "visible";
                    //changeGenericStyle(" playerMRSTN_estado_on");
                    break;

            }
            _changeToMediaClass();
        };

        this.onPositionChange = function(position) {

            switch(position) {

                case emic.top.TopPlayer.POSITION_PREVIEW:
                    _totalTime.style.visibility = "hidden";
                    _totalTimeInf.style.visibility = "hidden";
                    if (_flag)  {
                        changeGenericStyle(" playerMRSTN_estado_fin playerMRSTN_b_calidad_0");
                        _ended = true;
                        if (_areThereRelatedVideos){

                            if (!_passedVideos) {
                                _loadVideos.apply(this);
                            }
                        } else {
                            _videosRotulo.innerHTML = "";
                            _centrador.style.background = "url(" + _data.uiData.poster + ")" + " no-repeat center center";
                            _centrador.style.backgroundSize = "cover";
                        }
                    }
                    else {
                        changeGenericStyle(_claseInicial + " playerMRSTN_b_calidad_0");
                        if (_isThereRenditions)
                            showQuality.apply(this);
                    }

                    break;

                case emic.top.TopPlayer.POSITION_MEDIA:
                    _flag = true;
                    if (_isThereRenditions)
                        showQuality.apply(this);

                    document.getElementById(_data.mediaData.container).style.visibility = "visible";
                    break;

                case emic.top.TopPlayer.POSITION_PREROLL:
                    changeGenericStyle(_claseInicial + " playerMRSTN_b_calidad_0");
                    break;

                case emic.top.TopPlayer.POSITION_AD_PREROLL:
                    _imagenInicio.style.visibility = "hidden";
                    changeGenericStyle(" playerMRSTN_estado_on");
                    break;

                case emic.top.TopPlayer.POSITION_AD_POSTROLL:
                    changeGenericStyle(" playerMRSTN_estado_on");
                    _thumbnail.style.visibility = "visible";

                    break;
            }
        };

        this.onProgress = function(data){

            //if((psd.framework.ua.msie!=null)&&(psd.framework.ua.msie)&&(parseInt(psd.framework.ua.version)<9)){return false;}
            _duration =  data.totalTime;
            var percent = data.currentTime*100/_duration;
            _reproducido.style.width = percent + "%";
            _manejador.style.left = percent + "%";
            _time_current.innerHTML = this.secondsAsTimeCode(data.currentTime,"hh:mm:ss");
            _totalTimeInf.innerHTML = this.secondsAsTimeCode(_duration,"hh:mm:ss");
            _totalTimeInf.title = this.secondsAsTimeCode(_duration,"hh:mm:ss");
            _totalTime.innerHTML = this.secondsAsTimeCode(_duration,"hh:mm:ss");
            _totalTime.title = this.secondsAsTimeCode(_duration,"hh:mm:ss");
            _totalTime.style.visibility = "visible";
            _totalTimeInf.style.visibility = "visible";

            if((_data.mediaData.isDVR)&&(_data.mediaData.isLive))
                _totalTimeInf.style.display = "none";
        };

        this.onVolumeChange = function(offset){
            _mascaravolumen.style.height = (offset*100) + "%";
        };

        this.onSeekComplete = function(offset){
            _changeToMediaClass.apply(this);
        };

        var _changeToMediaClass = function(){
            if (_data.internalData.position == emic.top.TopPlayer.POSITION_MEDIA){
                if (_isPaused) {
                    changeGenericStyle(" playerMRSTN_estado_pausado");
                } else{
                    changeGenericStyle(" playerMRSTN_estado_on");
                }
            }
            else
            if((_data.internalData.position==emic.top.TopPlayer.POSITION_AD_PREROLL)||(_data.internalData.position==emic.top.TopPlayer.POSITION_AD_POSTROLL))
                changeGenericStyle(" playerMRSTN_estado_on");
            else
                changeGenericStyle(" playerMRSTN_estado_off_1");
        }
    }
    namespace.TopSkin_smoda = TopSkin_smoda;

})(emic.top.ui);