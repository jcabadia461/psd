(function(namespace){

    TopSkin_latam.prototype = new emic.top.ui.UISkinBase();

    function TopSkin_latam(){
        emic.top.ui.UISkinBase.call(this);

        var _that = this;

        //EXTERNAL ORDERS

        var ORDER_COMPARTIR_MOMENTO = "order_share_moment",
            ORDER_ANADIR_FAVORITOS = "order_add_fav",
            ORDER_ME_GUSTA = "order_like",
            ORDER_NO_ME_GUSTA = "order_dislike";

        //BOTONES DEL DOM. ADMITEN INTERACCIÓN

        var _caratula,
            _nombre_cancion,
            _nombre_disco,
            _nombre_artista,
            _boton_play_pause_cargando,
            _boton_volumen,
            _boton_menu,
            _boton_menu_compartir_momento,
            _boton_menu_anadir_favoritos,
            _boton_menu_me_gusta,
            _boton_menu_no_me_gusta,
            _boton_cambio_emisora,
            _boton_compartir,
            _boton_compartir_facebook,
            _boton_compartir_twitter,
            _boton_compartir_facebook_mobile,
            _boton_compartir_twitter_mobile,
            _select_emisora,
            _boton_muestra_rrss_mobile;

        //ELEMENTOS GR�?FICOS DEL DOM. SE MUESTRAN U OCULTAN

        var _play_display,
            _preroll_display,
            _mute_display,
            _volumen_display,
            _btnEmisora_display,
            _select_emisora_display,
            _ad_container,
            _adbreak_container;

        //ESTILOS Y TEMPLATE

        var _URL_TEMPLATE = "/psdmedia/media/top/skins/latam/template.html",
            _URL_STYLE = "/psdmedia/media/top/skins/latam/css/",
            _URL_JQUERY = "/psdmedia/media/top/skins/latam/js/",
            _CODE_NUM_PARSER_OK = 0,
            _CODE_NUM_PARSER_ERROR = 1;

        //VARIABLES INTERNAS DE CONTROL Y FLAGS

        var _isplaying = false;
        var _ismute = false;
        var _currentvolume = 0.7;
        var _started = false;
        var _track_artist_url = null;

        //VARIABLES INTERNAS CON INFORMACIÓN REUTILIZABLE

        var _parrilla_nombre = null;
        var _parrilla_horario = null;
        var _parrilla_presentador = null;
        var _parrilla_caratula = null;

        //CONSTANTES DE SERVICIOS EXTERNOS Y OTROS CAMPOS QUE NO DEBER�?AN CAMBIAR

        var _URL_TWITTER = "https://twitter.com/intent/tweet?text=";
        var _URL_FACEBOOK = "https://www.facebook.com/sharer/sharer.php?u=";
        var _URL_PARRILLA = "http://fapi-top.prisasd.com/api/v1/parrilla/";
        //var _URL_EMISORAS = "http://fapi-top.prisasd.com/api/v1/search/{EMISORA}/audio/tags?tags=m(islive|true)";
        var _URL_EMISORAS = "http://fapi-top.prisasd.com/api/v1/search/{EMISORA}/audio/tags?tags=m(tags.type%7CE%2Cislive%7Ctrue)&size=40&orderBy=idref|asc";

        var _DEFAULT_TITLE = "PRISA MUSICALES";
        var _DEFAULT_SUBTITLE = "Latam";
        var _DEFAULT_SUBSUBTITLE = "";
        var _DEFAULT_COVER = "/psdmedia/media/top/skins/latam/img/defaultlogo.png"

        //VALORES CARGADOS DESDE FAPI

        var _udn = null;

        var _vias = {};
        var _hayvias = false;

        var _default_title = _DEFAULT_TITLE;
        var _default_subtitle = _DEFAULT_SUBTITLE;
        var _default_cover = _DEFAULT_COVER
        var _default_subsubtitle = _DEFAULT_SUBSUBTITLE;

        var _message_share_facebook = "";
        var _message_share_twitter = "";

        var _twitter_via = null;
        var _css = "default.css";

        var _show_twitter = true;
        var _show_facebook = true;

        //FUNCIONES

        var _loadjQuery = function(){

            var filerefJQuery = document.createElement("script"),
                filenameJQuery = _data.genericData.urlBase ? (_data.genericData.urlBase + _URL_JQUERY + "jquery.js") : _URL_JQUERY + "jquery.js";

            filerefJQuery.setAttribute("src", filenameJQuery);
            filerefJQuery.setAttribute("type","text/javascript");
            filerefJQuery.onload = function(){
                _applyScroll.apply(this);

                if(typeof(jQuery.ui)=="undefined"){
                    _loadjQueryUI.apply(this);
                }
            };

            if(typeof filerefJQuery!="undefined")
                document.getElementsByTagName("head")[0].appendChild(filerefJQuery);
        }

        var _loadjQueryUI = function(){
            var filerefJQueryUI = document.createElement("script"),
                filenameJQueryUI = _data.genericData.urlBase ? (_data.genericData.urlBase + _URL_JQUERY + "jquery-ui.min.js") : _URL_JQUERY + "jquery-ui.min.js";

            filerefJQueryUI.setAttribute("src", filenameJQueryUI);
            filerefJQueryUI.setAttribute("type","text/javascript");
            filerefJQueryUI.onload = function(){
                _runjQueryfunctions.apply(this);
            };

            if(typeof filerefJQueryUI!="undefined")
                document.getElementsByTagName("head")[0].appendChild(filerefJQueryUI);

            var fileref = document.createElement("link"),
                filename = _data.genericData.urlBase ? (_data.genericData.urlBase + _URL_STYLE + "jquery-ui.min.css") : _URL_STYLE + "jquery-ui.min.css";

            fileref.setAttribute("rel", "stylesheet");
            fileref.setAttribute("type", "text/css");
            fileref.setAttribute("href", filename);

            if(typeof fileref!="undefined")
                document.getElementsByTagName("head")[0].appendChild(fileref);
        }

        var _loadCSS = function(){

            var fileref = document.createElement("link"),
                filename = _data.genericData.urlBase ? (_data.genericData.urlBase + _URL_STYLE + _css) : _URL_STYLE + _css;

            fileref.setAttribute("rel", "stylesheet");
            fileref.setAttribute("type", "text/css");
            fileref.setAttribute("href", filename);

            if(typeof fileref!="undefined")
                document.getElementsByTagName("head")[0].appendChild(fileref);
        };

        var _loadTemplate = function() {

            var _parser = new psd.framework.Parser(),
                templateMediator = new psd.framework.Mediator(),
                url = _data.genericData.urlBase ? (_data.genericData.urlBase + _URL_TEMPLATE) : _URL_TEMPLATE;

            //templateMediator.corsIE(true);
            templateMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_COMPLETE, onDataCompleteTemplateLATAM, this);
            templateMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_ERROR, onDataErrorTemplateLATAM, this);
            templateMediator.mediate(url, _parser, psd.framework.Mediator.RESPONSE_TEXT);
        };

        var onDataCompleteTemplateLATAM = function (evt)
        {
            var template;
            if (evt.result.parserResult.code == _CODE_NUM_PARSER_OK)
            {
                template = evt.result.parserResult.result.replace(/{<-%ID%->}/g,_data.genericData.id);
                _container.innerHTML = template;
                _asignElements.apply(this);
                this.notifyInitComplete();
            }
            else if (evt.result.parserResult.code == _CODE_NUM_PARSER_ERROR)
            {
                emic.top.debug("TopSkin_latam | Error al cargar el template de LATAM. ParseError.");
            }
        };

        var onDataErrorTemplateLATAM = function (evt)
        {
            emic.top.debug("TopSkin_latam | Error al cargar el template de LATAM. DataError.");
        };

        var _getElementById = function(id){
            return document.getElementById(_data.genericData.id + id);
        };

        var _asignElements = function(){

            _caratula = document.getElementById("caratula");
            _nombre_cancion = document.getElementById("nombre_cancion");
            _nombre_disco = document.getElementById("nombre_disco");
            _nombre_artista = document.getElementById("nombre_artista");
            _boton_play_pause_cargando = document.getElementById("play");
            _boton_volumen = document.getElementById("mutear");
            _boton_menu = document.getElementById("btnMenu");
            //_boton_menu_compartir_momento = document.getElementById("boton_menu_compartir_momento");
            //_boton_menu_anadir_favoritos = document.getElementById("boton_menu_anadir_favoritos");
            //_boton_menu_me_gusta = document.getElementById("boton_menu_me_gusta");
            //_boton_menu_no_me_gusta = document.getElementById("boton_menu_no_me_gusta");
            _boton_cambio_emisora = document.getElementById("btnEmisora");
            _boton_compartir = document.getElementById("btnShare");
            _boton_compartir_facebook = document.getElementById("boton_compartir_facebook");
            _boton_compartir_twitter = document.getElementById("boton_compartir_twitter");
            _select_emisora = document.getElementById("select_emisora");
            _boton_compartir_facebook_mobile = document.getElementById("boton_compartir_facebook_mobile");
            _boton_compartir_twitter_mobile = document.getElementById("boton_compartir_twitter_mobile");
            _boton_muestra_rrss_mobile = document.getElementById("boton_muestra_rrss_mobile");

            _play_display = document.getElementById("play_display");
            _preroll_display = document.getElementById("preRoll");
            _mute_display = document.getElementById("mute_display");
            _volumen_display = document.getElementById("volumen_display");
            _btnEmisora_display = document.getElementById("btnEmisora_display");
            _select_emisora_display = document.getElementById("select_emisora_display")
            _volumen_display = document.getElementById("volumen_display");
            _ad_container = document.getElementById("adcontainer");
            _adbreak_container = document.getElementById("adbreakcontainer");

            if(!_show_facebook){
                _boton_compartir_facebook.style.display = "none";
                _boton_compartir_facebook_mobile.style.display = "none";
            }

            if(!_show_twitter){
                _boton_compartir_twitter.style.display = "none";
                _boton_compartir_twitter_mobile.style.display = "none";
            }

            if((!_show_facebook)&&(!_show_twitter)){
                _boton_muestra_rrss_mobile.style.visibility = "hidden";
            }

            _loadCSS.apply(this);

            //ponemos una imagen de seguridad por defecto por si hay algún error en la carátula
            _caratula.onerror = function(){
                _caratula.onerror = null;
                _caratula.src = _default_cover;
            }

            setSkin.apply(this);

            _loadEmisoras();

            if((typeof(jQuery)!="undefined")&&(typeof(jQuery.ui)!="undefined")){
                _runjQueryfunctions.apply(this);
            }
        };

        var onDataErrorParrilla = function(evt){
            _default_title = _DEFAULT_TITLE;
            _default_subtitle = _DEFAULT_SUBTITLE;
            _default_cover = _DEFAULT_COVER
            _default_subsubtitle = _DEFAULT_SUBSUBTITLE;

            _parrilla_nombre = _default_title;
            _parrilla_horario = _default_subtitle;
            _parrilla_presentador = _default_subsubtitle;
            _parrilla_caratula = _default_cover;
        };

        var onDataCompleteParrilla = function(evt){

            _parrilla_nombre = evt.result.parserResult.result.nombre;
            _parrilla_horario = "De " + evt.result.parserResult.result.inicio + " a " + evt.result.parserResult.result.fin;
            _parrilla_presentador = evt.result.parserResult.result.presentador;
            _parrilla_caratula = evt.result.parserResult.result.foto;

            if(_parrilla_nombre!=""){
                _nombre_cancion.innerHTML = _parrilla_nombre;
                _default_title = _parrilla_nombre;
            }
            else
                _nombre_cancion.innerHTML = _DEFAULT_TITLE;

            if(evt.result.parserResult.result.inicio!=""){
                _nombre_disco.innerHTML = _parrilla_horario;
                _default_subtitle = _parrilla_horario;
            }
            else
                _nombre_disco.innerHTML = _DEFAULT_SUBTITLE;

            _nombre_artista.innerHTML = _parrilla_presentador;
            _default_subsubtitle = _parrilla_presentador;

            if(_parrilla_caratula!=""){
                _caratula.src = _parrilla_caratula;
                _default_cover = _parrilla_caratula;
            }
            else
                _caratula.src = _DEFAULT_COVER;

            if(typeof(jQuery)!="undefined"){
                _applyScroll.apply(this);
            }
        };

        var _loadParrilla = function(){
            var _jsonParser = new psd.framework.parser.JSONParser(),
                parrillaMediator = new psd.framework.Mediator(),

            //TODO poner el _data.mediaData.idTop???
            //url = _URL_PARRILLA + _data.mediaData.idTOP;
            url = _URL_PARRILLA + _data.mediaData.id.toLowerCase();

            parrillaMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_COMPLETE, onDataCompleteParrilla, this);
            parrillaMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_ERROR, onDataErrorParrilla, this);
            parrillaMediator.mediate(url, _jsonParser, psd.framework.Mediator.RESPONSE_JSON);
        }

        var onDataCompleteEmisoras = function(evt){

            var emisoras = [];
            var _result = evt.result.parserResult.result.data;

            for(i in _result){
                emisoras[emisoras.length] = {id:_result[i].idref,name:_result[i].name};
            }


            //if(window.location.href.indexOf("alin")>0)
            //    emisoras = [{id:"los40",name:"Los 40"},{id:"cadenadial",name:"Cadena DIAL"},{id:"adbreak",name:"MANTONFM_S01"}];

            if(emisoras.length<2)
                _boton_cambio_emisora.style.display = "none";

            _select_emisora.onchange = (function(that){
                return function(){
                    if(_select_emisora.selectedIndex==0)
                        return;

                    //paramos el stream porque si no en ocasiones da problemas
                    _that.notifyOrderStop();

                    _that.notifyOrderChangeLive(_select_emisora[_select_emisora.selectedIndex]["value"]);

                    var _launcher = _that.getPlayer().getLauncher();

                    _launcher.reset(undefined,_data.genericData.id_cuenta,_select_emisora[_select_emisora.selectedIndex]["value"],{"player":{"autoplay":true}});

                    _btnEmisora_display.className = _btnEmisora_display.className.replace("active","");
                    _select_emisora_display.style.display = "none";
                    //_boton_play_pause_cargando.className = _boton_play_pause_cargando.className + " loading";

                    _default_cover = _DEFAULT_COVER;
                    _default_title = _DEFAULT_TITLE;
                    _default_subtitle = _DEFAULT_SUBTITLE;
                    _default_subsubtitle = _DEFAULT_SUBSUBTITLE;
                }
            })(this);

            for(i in emisoras){
                if(emisoras[i].name!=undefined){
                    _select_emisora.options[_select_emisora.options.length] = new Option(emisoras[i].name,emisoras[i].id);
                }
            }
        }

        var onDataErrorEmisoras = function(){
            emic.top.debug("TopSkin_latam | Error al cargar emisoras LATAM para udn " + _udn);
            _boton_cambio_emisora.style.display = "none";
        }

        var _loadEmisoras = function(){
            var _jsonParser = new psd.framework.parser.JSONParser(),
                emisorasMediator = new psd.framework.Mediator(),
                url = _URL_EMISORAS.replace("{EMISORA}",_udn);

            emisorasMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_COMPLETE, onDataCompleteEmisoras, this);
            emisorasMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_ERROR, onDataErrorEmisoras, this);
            emisorasMediator.mediate(url, _jsonParser, psd.framework.Mediator.RESPONSE_JSON);
        }

        var setSkin = function()
        {
            _loadParrilla.apply(this);

            //BOTON PLAY
            _boton_play_pause_cargando.onclick = (function(that){
                return function(){
                    if(_boton_play_pause_cargando.className.indexOf("loading")>0)
                        return;

                    if(_isplaying){
                        if((typeof (_data.mediaData.provider)!="undefined")&&(_data.mediaData.provider=="hls"))
                            that.notifyOrderPause();
                        else
                            that.notifyOrderStop();
                    }
                    else{
                        _boton_play_pause_cargando.className = _boton_play_pause_cargando.className + " loading";
                        that.notifyOrderPlay();
                    }
                }
            })(this);

            //BOTON TWITTER
            _boton_compartir_twitter.onclick = (function(that){
                return function(){
                    if (_data.mediaData.description == "{}")
                        _data.mediaData.description = " ";

                    var content = "Estoy escuchando " + _data.mediaData.title + " en ";

                    if((_message_share_twitter!="")&&(_message_share_twitter != "default")){
                        content = _message_share_twitter;
                    }

                    if (content.length > 100)
                        content = content.substr(0, 100)+"...";

                    var refer = window.location.href;

                    var refUrl = _URL_TWITTER;

                    refUrl += encodeURIComponent(content);

                    if(_twitter_via!=null){
                        if(_hayvias){
                            _twitter_via = _vias[_data.mediaData.idTOP.toLowerCase()];
                        }
                        refUrl += "&via=" + _twitter_via;
                    }

                    refUrl += "&url=" + refer;

                    window.open(refUrl,'_blank');
                }
            })(this);

            _boton_compartir_twitter_mobile.onclick = (function(that){
                return function(){
                    if (_data.mediaData.description == "{}")
                        _data.mediaData.description = " ";

                    var content = _data.mediaData.title;

                    if(_message_share_twitter!=""){
                        content = _message_share_twitter;
                    }

                    if (content.length > 100)
                        content = content.substr(0, 100)+"...";

                    var refer = window.location.href;

                    var refUrl = _URL_TWITTER;

                    refUrl += encodeURI(content);

                    if(_twitter_via!=null)
                        refUrl += "&via=" + _twitter_via;

                    refUrl += "&url=" + refer;

                    window.open(refUrl,'_blank');
                }
            })(this);

            //BOTON FACEBOOK
            _boton_compartir_facebook.onclick = (function(that){
                return function(){
                    var refer = window.location.href;
                    var text = "";

                    if(_message_share_facebook!=""){
                        text = _message_share_facebook;
                    }

                    var refUrl = _URL_FACEBOOK + refer + "&t=" + encodeURI(text);
                    window.open(refUrl, '_blank');
                }
            })(this);

            _boton_compartir_facebook_mobile.onclick = (function(that){
                return function(){
                    var refer = window.location.href;
                    var text = "";

                    if(_message_share_facebook!=""){
                        text = _message_share_facebook;
                    }

                    var refUrl = _URL_FACEBOOK + refer + "&t=" + encodeURI(text);
                    window.open(refUrl, '_blank');
                }
            })(this);

            //BOTON COMPARTIR MOMENTO
            /*
            _boton_menu_compartir_momento.onclick = (function(that){
                return function(){
                    that.notifyOrderExternal(ORDER_COMPARTIR_MOMENTO,{"id":_data.mediaData.idTOP});
                }
            })(this);

            //BOTON AÑADIR FAVORITOS
            _boton_menu_anadir_favoritos.onclick = (function(that){
                return function(){
                    that.notifyOrderExternal(ORDER_ANADIR_FAVORITOS,{"id":_data.mediaData.idTOP});
                }
            })(this);

            //BOTON ME GUSTA
            _boton_menu_me_gusta.onclick = (function(that){
                return function(){
                    that.notifyOrderExternal(ORDER_ME_GUSTA,{"id":_data.mediaData.idTOP});
                }
            })(this);

            //BOTON NO ME GUSTA
            _boton_menu_no_me_gusta.onclick = (function(that){
                return function(){
                    that.notifyOrderExternal(ORDER_NO_ME_GUSTA,{"id":_data.mediaData.idTOP});
                }
            })(this);
            */

            //BOTON VOLUMEN
            _boton_volumen.onclick = (function(that){
                return function(){
                    if(_ismute)
                        that.notifyOrderVolumeChangeOnStarted(_currentvolume);
                    else
                        that.notifyOrderVolumeChangeOnStarted(0);
                }
            })(this);
        };

        this.init = function(data) {
            _data = data;

            _container = document.getElementById(_data.internalData.skinContainer);

            _udn = _data.genericData.id_cuenta;

            //TODO quitar la línea de abajo, es solo para pruebas
//            _udn = "playser";

            //cargamos los datos por defecto desde la FAPI

            //título por defecto
            if(_data.uiData.skinData.default_title!=undefined){
                 _default_title = _data.uiData.skinData.default_title;
                _DEFAULT_TITLE = _default_title;
            }

            //subtítulo por defecto
            if(_data.uiData.skinData.default_subtitle!=undefined){
                _default_subtitle = _data.uiData.skinData.default_subtitle;
                _DEFAULT_SUBTITLE = _default_subtitle;
            }

            //subsubtítulo por defecto
            if(_data.uiData.skinData.default_subsub!=undefined){
                _default_subsubtitle = _data.uiData.skinData.default_subsubtitle;
                _DEFAULT_SUBSUBTITLE = _default_subsubtitle;
            }

            //imagen por defecto
            if(_data.uiData.skinData.default_cover!=undefined){
                var _base = "";

                if(_data.genericData.urlBase!=undefined)
                    _base = _data.genericData.urlBase;

                _DEFAULT_COVER = _base + _default_cover;

                _default_cover = _base + _data.uiData.skinData.default_cover;

                _DEFAULT_COVER = _default_cover;
            }

            //usuario en twitter de la emisora
            if(_data.uiData.skinData.twitter_via!=undefined){
                _twitter_via = _data.uiData.skinData.twitter_via;

                if(_twitter_via.indexOf(";")>0){
                    _hayvias = true;
                    var _split_elements = _twitter_via.split(";");

                    for(var i in _split_elements){
                        var _split_keyvalue = _split_elements[i].split(":");

                        _vias[_split_keyvalue[0]] = _split_keyvalue[1];
                    }
                }
            }

            //fichero css que cargaremos
            if(_data.uiData.skinData.css!=undefined){
                _css = _data.uiData.skinData.css;
            }

            //mensaje para compartir en facebook
            if(_data.uiData.skinData.message_share_fb!=undefined){
                _message_share_facebook = _data.uiData.skinData.message_share_fb;
            }

            //mensaje para compartir en twitter
            if(_data.uiData.skinData.message_share_tw!=undefined){
                _message_share_twitter = _data.uiData.skinData.message_share_tw;
            }

            //cargamos jQuery si no existe en la página
            if(typeof(jQuery)=="undefined"){
                _loadjQuery.apply(this);
            }else{
                if(typeof(jQuery.ui)=="undefined"){
                    _loadjQueryUI.apply(this);
                }
            }

            //mostrar facebook
            if(_data.uiData.skinData.show_facebook!=undefined){
                _show_facebook = _data.uiData.skinData.show_facebook;
            }

            //mostrar twitter
            if(_data.uiData.skinData.show_twitter!=undefined){
                _show_twitter = _data.uiData.skinData.show_twitter;
            }

            _loadTemplate.apply(this);
        };

        this.reset = function ()
        {
            if(_boton_play_pause_cargando!=undefined){
                if(_data.mediaData.autoplay==true){
                    _boton_play_pause_cargando.className = _boton_play_pause_cargando.className.replace(/loading/g,"");
                    _boton_play_pause_cargando.className = _boton_play_pause_cargando.className + " loading";
                }
            }

            setSkin.apply(this);
        };

        this.resize = function(width, height){};

        this.onProgress = function(data){
            var percent = (data.currentTime *100/data.totalTime);
        };

        this.onVolumeChange = function(offset){
            var percent = offset*100;

            if(offset==0){
                _mute_display.className = _mute_display.className.replace("iconf-volume","iconf-mute");
                _ismute = true;
            }
            else{
                _currentvolume = offset;
                _ismute = false;
                _mute_display.className = _mute_display.className.replace("iconf-mute","iconf-volume");
            }

            if(!getDevice().mobile)
                $("#volume > .slider").slider("value",percent);
        };

        this.onSeekComplete = function(offset){
        };

        this.onBufferEmpty = function(){
            _boton_play_pause_cargando.className = _boton_play_pause_cargando.className + " loading";
        };

        this.onBufferFull = function(){
            _boton_play_pause_cargando.className = _boton_play_pause_cargando.className.replace(" loading","");
        };

        this.showLoading = function (flag) {
        };

        this.externalOrder = function(order, params){
        };

        this.onStatusChange = function(status){
            switch (status){
                case emic.top.MediaModule.STATUS_STOP:
                    _isplaying = false;
                    _play_display.className = _play_display.className.replace("iconf-pause","iconf-play");

                    _caratula.src = _default_cover;
                    _nombre_cancion.innerHTML = _default_title;
                    _nombre_disco.innerHTML = _default_subtitle;
                    _nombre_artista.innerHTML = _default_subsubtitle;

                    if(typeof(jQuery)!="undefined"){
                        _applyScroll.apply(this);
                    }
                break;
                case emic.top.MediaModule.STATUS_PAUSE:
                case emic.top.AdModule.STATUS_PAUSE:
                    _isplaying = false;
                    _play_display.className = _play_display.className.replace("iconf-pause","iconf-play");
                break;
                case emic.top.MediaModule.STATUS_PLAY:
                    _boton_play_pause_cargando.className = _boton_play_pause_cargando.className.replace(" loading","");
                    _isplaying = true;
                    _started = true;
                    _play_display.className = _play_display.className.replace("iconf-play","iconf-pause");
                break;
                case emic.top.event.MediaEvent.ON_MEDIA_END:
                break;
                case emic.top.AdModule.STATUS_PLAY:
                    //_preroll_display.style.visibility = "visible";
                    break;
                case emic.top.AdModule.STATUS_STOP:
                case emic.top.AdModule.PUBLI_SKIPPED:
                case emic.top.AdModule.PUBLI_ERROR:
                    //_preroll_display.style.visibility = "hidden";
                break;
            }
        };

        this.onPositionChange = function(position) {

            switch(position) {
                case emic.top.TopPlayer.POSITION_PREVIEW:
                break;
                case emic.top.TopPlayer.POSITION_AD_PREROLL:
                break;
            }
        };

        var _getDataFromMetadata = function(metadata,valueCue,valueCueParams,defaultVal){
            if((metadata.cuePoint[valueCue]!=null)&&
               (metadata.cuePoint[valueCue]!="")&&
               (metadata.cuePoint[valueCue]!=undefined))
                    return metadata.cuePoint[valueCue];
            else{
                if((metadata.cuePoint.parameters[valueCueParams]!=null)&&
                    (metadata.cuePoint.parameters[valueCueParams]!="")&&
                    (metadata.cuePoint.parameters[valueCueParams]!=undefined))
                        return metadata.cuePoint.parameters[valueCueParams];
                else
                    return defaultVal;
            }
        }

        this.onMetadata = function(metadata){
            _caratula.src = _getDataFromMetadata(metadata,"coverURL","cover_url",_parrilla_caratula);
            _nombre_cancion.innerHTML = _getDataFromMetadata(metadata,"cueTitle","cue_title",_parrilla_nombre);
            _nombre_artista.innerHTML = _getDataFromMetadata(metadata,"artistName","artist_name",_parrilla_horario);
            _nombre_disco.innerHTML = _getDataFromMetadata(metadata,"albumName","album_name",_parrilla_presentador);

            if((metadata.parameters!=undefined)&&(metadata.parameters.track_artist_url!=undefined)&&(metadata.parameters.track_artist_url!="")&&(metadata.parameters.track_artist_url!=null)){
                _track_artist_url = metadata.parameters.track_artist_url;
            }

            if((metadata.cuePoint!=undefined)&&(metadata.cuePoint.parameters!=undefined)&&(metadata.cuePoint.parameters.track_artist_url!=undefined)&&(metadata.cuePoint.parameters.track_artist_url!="")&&(metadata.cuePoint.parameters.track_artist_url!=null)){
                 _track_artist_url = metadata.cuePoint.parameters.track_artist_url;
            }

            if(_track_artist_url!=null){
                _caratula.style.cursor = "pointer";
                _caratula.onclick = function(){
                    window.open(_track_artist_url,'_blank');
                }

                _nombre_artista.style.cursor = "pointer";
                _nombre_artista.onclick = function(){
                    window.open(_track_artist_url,'_blank');
                }
            }else{
                _caratula.style.cursor = "";
                _caratula.onclick = function(){};

                _nombre_artista.style.cursor = "";
                _nombre_artista.onclick = function(){};
            }

            if(typeof(jQuery)!="undefined"){
                _applyScroll.apply(this);
            }
        };

        this.onCue = function(data){};
        this.onError = function(msg, code){};
        this.onSwitchRequest = function(id){};
        this.onSwitchComplete = function(id){};
        this.requestFullScreen = function(){};
        this.cancelFullScreen = function(){};
        this.onSeekStart = function(offset){};
        this.onSeekComplete = function(offset){};

        //Importante
        //Esta función se salta un bug de Tritón por el cual cuando se cambia el volumen a 0 a un audio que no ha sido inicializado, no permite volver a cambiarlo
        this.notifyOrderVolumeChangeOnStarted = function(offset){
            if(!_started)
                return;

            this.notifyOrderVolumeChange(offset);
        }

        //Función para aplicar efectos y otros comportamientos jQuery
        var _runjQueryfunctions = function(){

            //overlay
            $("#overlay").click(function(event) {
                if (!$(this).children("div").is(event.target) && $(this).children("div").has(event.target).length === 0){
                    $("#overlay").removeClass('show');
                    $(this).children("div").removeClass('show');
                }
            });

            $("#overlay .close").click(function(event) {
                $("#overlay").removeClass('show');
                $("#overlay").children("div").removeClass('show');
            });

            //
            $(".trigger_player").click(function(event){
                //$(".trigger,.triggerm").not(this).removeClass('active');
                $(this).toggleClass('active');
                //$(".oc:visible,.ocm:visible").not($(this).next()).hide();
                $(this).next(".oc").toggle(300);
                event.stopPropagation();
            });

            //SLIDER DE VOLUMEN
            if(!getDevice().mobile)
                $("#volume > .slider").slider({
                    range: "min",
                    value: 60,
                    slide: function(event,ui){
                        _that.notifyOrderVolumeChangeOnStarted(ui.value/100);
                    }
                });

            $(this).children('.iconf_player').toggleClass('iconf-volume iconf-mute');

            if(!getDevice().mobile)
                if($(this).children('.iconf_player').hasClass('iconf-mute')){
                    $("#volume .slider").slider("value", 0);
                }else{
                    $("#volume .slider").slider("value", 100);
            }
        }

        //función para aplicar un efecto de marquesina con scroll en los elementos de texto que no quepan en su capa contenedora
        var _applyScroll = function(){
            if(typeof(jQuery)=="undefined")
                return;

            $("#infoSong .media-body p span").each(function() {
                var el = $(this);
                if( el.width() > el.parent().width() ) {
                    el.addClass('scrolling');

                }else{
                    el.removeClass('scrolling');
                }
            });
        }
    }
    namespace.TopSkin_latam = TopSkin_latam;

})(emic.top.ui);
            mm_latam_compilation = "30/11/2016 12:16:29 PM";
        