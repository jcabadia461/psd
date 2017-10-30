(function(namespace){

    TopSkin_podcasts.prototype = new emic.top.ui.UISkinBase();

    function TopSkin_podcasts(){
        emic.top.ui.UISkinBase.call(this);

        mm_autoplay = true;

        namespace.ORDER_SET_DATA = "set_data";

        var _that = this;

        var soyWidget = false;

        var _URL_TEMPLATE = "/psdmedia/media/top/skins/podcasts/template.html",
            _URL_TEMPLATE_W = "/psdmedia/media/top/skins/podcasts/template_w.html",
            _URL_STYLE = "/psdmedia/media/top/skins/podcasts/css/",
            _URL_JQUERY = "/psdmedia/media/top/skins/podcasts/js/",
            _URL_JS = "/psdmedia/media/top/skins/podcasts/js/",
            _CODE_NUM_PARSER_OK = 0,
            _CODE_NUM_PARSER_ERROR = 1,
            _CODIGO_IFRAME = '<iframe src="' + window.location.origin  + '/widget/embed/{{SS}}"  width="{{WW}}"  height="{{HH}}" frameborder="0"></iframe>',
//          _CODIGO_IFRAME = "<iframe width='{{WW}}' height='{{HH}}' src='http://urliframe/{{PP}}/LOQUESEA/{{SS}}'>",
            _CODIGO_PLAYER_WIDGET = 1000;

        var _js_files = ["jquery-1.12.3.min.js",/*"jquery.mobile-1.4.5.min.js","jquerymobile-swipeupdown.js",*/"jquery-ui.min.js","custom.js"],
            _js_file_w = ["jquery-1.12.3.min.js",/*"jquery.mobile-1.4.5.min.js","jquerymobile-swipeupdown.js",*/"jquery-ui.min.js","custom_w.js"],
            _js_files_nojquery = ["jquery-ui.min.js","custom.js"],
            _js_files_nojqueryui = ["custom.js"];

        if(typeof(jQuery)!="undefined"){
            _js_files = _js_files_nojquery;

            if(typeof(jQuery.ui)!="undefined"){
                _js_files = _js_files_nojqueryui;
            }
        }

        var _css = "style.css",
            _css_w = "style_w.css";

        var IFRAME_BIG = 10,
            IFRAME_MED = 20,
            IFRAME_SMALL = 30,
            _currentIframe = 10;

        var _btn_play,
            _btn_rewind,
            _btn_forward,
            _barra_progreso_back,
            _barra_progreso,
            _currenttime,
            _totaltime,
            _show_modal_suscribe,
            _show_modal_embed,
            _modal,
            _modal_suscribe,
            _modal_suscribe_itunes,
            _modal_suscribe_ivoox,
            _modal_suscribe_spreaker,
            _modal_suscribe_rss,
            _modal_embed,
            _titulo,
            _titulo_cabecera,
            _titulo_mbl,
            _titulo_cabecera_mbl,
            _cover,
            _cover_a,
            _contenedor_progreso,
            _boton_compartir_facebook,
            _boton_compartir_twitter,
            _boton_compartir_facebook_mbl,
            _boton_compartir_twitter_mbl,
            _boton_compartir_whatsapp,

            _iframe_code,

            _embed_big_img,
            _embed_med_img,
            _embed_small_img,
            _selectwidget,
            _btn_copiarcodigo,

            _boton_descarga,
            _boton_descarga_mbl,
            _span_external,
            _span_external_mbl,

            _playlist_button;

        var NOTIFYORDER_REWIND = "rebobinar",
            NOTIFYORDER_FORWARD = "adelante",
            NOTIFYORDER_DOWNLOAD = "descargar",
            NOTIFYORDER_EMBED_SMALL = "llevatelo pequeno",
            NOTIFYORDER_EMBED_MED = "llevatelo mediano",
            NOTIFYORDER_EMBED_BIG = "llevatelo grande",
            NOTIFYORDER_PROGRESS_BAR = "barra de progreso del audio",
            NOTIFYORDER_VOLUME_ON = "volumen /activo",
            NOTIFYORDER_VOLUME_OFF = "volumen /mute",
            NOTIFYORDER_VOLUME_BAR = "barra de volumen";

        var _isplaying = false,
            _started = false,
            _current_time = 0,
            _total_time = 0,
            _js_loaded_index = 0,
            _last_volume = 0,
            _codigo_iframe = _CODIGO_IFRAME.replace("{{PP}}",_CODIGO_PLAYER_WIDGET).replace("{{WW}}","100").replace("{{%}}","%");

        var _URL_TWITTER = "https://twitter.com/intent/tweet?text=";
        var _URL_FACEBOOK = "https://www.facebook.com/sharer/sharer.php?u=";

        var _twitter_url = "";
        var _twitter_via = "";
        var _twitter_text = "";
        var _facebook_url = "";
        var _whatsapp_url = "";
        var _programTitle = "";

        var _BASE = window.location.origin;

        //FUNCIONES

        var _loadJS = function(){

            var jsfiles = _js_files;
            //if(soyWidget)
            //    jsfiles = _js_file_w;

            var filerefJS = document.createElement("script"),
                filenameJS = _data.genericData.urlBase ? (_data.genericData.urlBase + _URL_JS + jsfiles[_js_loaded_index]) : _URL_JS + jsfiles[_js_loaded_index];

            filerefJS.setAttribute("src", filenameJS);
            filerefJS.setAttribute("type","text/javascript");
            if(_js_loaded_index<jsfiles.length-1){
                filerefJS.onload = function(){
                    _js_loaded_index++;
                    _loadJS();
                };
            }else{
                filerefJS.onload = function(){
                    if(soyWidget)
                        _runjQueryfunctionsWidget();
                    else
                        _runjQueryfunctions();
                }
            }

            if(typeof filerefJS!="undefined")
                document.getElementsByTagName("head")[0].appendChild(filerefJS);

        }

        var _loadCSS = function(){

            var css = _css;
            if(soyWidget)
                css = _css_w;

            var fileref = document.createElement("link"),
                filename = _data.genericData.urlBase ? (_data.genericData.urlBase + _URL_STYLE + css) : _URL_STYLE + css;

            fileref.setAttribute("rel", "stylesheet");
            fileref.setAttribute("type", "text/css");
            fileref.setAttribute("href", filename);

            if(typeof fileref!="undefined")
                document.getElementsByTagName("head")[0].appendChild(fileref);
        };

        var _loadTemplate = function() {

            var urltemp = _URL_TEMPLATE;
            if(soyWidget)
                urltemp = _URL_TEMPLATE_W;

            var _parser = new psd.framework.Parser(),
                templateMediator = new psd.framework.Mediator(),
                url = _data.genericData.urlBase ? (_data.genericData.urlBase + urltemp) : urltemp;

            //templateMediator.corsIE(true);
            templateMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_COMPLETE, onDataCompleteTemplate, this);
            templateMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_ERROR, onDataErrorTemplate, this);
            templateMediator.mediate(url, _parser, psd.framework.Mediator.RESPONSE_TEXT);
        };

        var onDataCompleteTemplate = function (evt)
        {
            var template;
            if (evt.result.parserResult.code == _CODE_NUM_PARSER_OK)
            {
                template = evt.result.parserResult.result.replace(/{<-%ID%->}/g,_data.genericData.id);
                _container.innerHTML = template;
                _asignElements.apply(this);
                this.notifyInitComplete();

                _loadJS();
            }
            else if (evt.result.parserResult.code == _CODE_NUM_PARSER_ERROR)
            {
            }
        };

        var onDataErrorTemplate = function (evt)
        {
        };

        var _getElementById = function(id){
            return document.getElementById(_data.genericData.id + id);
        };

        var _asignElements = function(){

            _btn_play = _getElementById("_play");
            _btn_rewind = _getElementById("_rewind");
            _btn_forward = _getElementById("_forward");
            _barra_progreso = _getElementById("_barra_progreso");
            _barra_progreso_back = _getElementById("_barra_progreso_back");
            _currenttime = _getElementById("_currenttime");
            _totaltime = _getElementById("_totaltime");
            _modal = _getElementById("_modal");
            _show_modal_suscribe = _getElementById("_show_modal_suscribe");
            _show_modal_embed = _getElementById("_show_modal_embed");
            _modal_suscribe_itunes = _getElementById("_modal_suscribe_itunes");
            _modal_suscribe_ivoox = _getElementById("_modal_suscribe_ivoox");
            _modal_suscribe_spreaker = _getElementById("_modal_suscribe_spreaker");
            _modal_suscribe_rss = _getElementById("_modal_suscribe_rss");
            _modal_suscribe = _getElementById("_modal_embed");
            _modal_embed = _getElementById("_modal_embed");
            _titulo = _getElementById("_titulo");
            _titulo_mbl = _getElementById("_titulo_mbl");
            _titulo_cabecera = _getElementById("_titulo_cabecera");
            _titulo_cabecera_mbl = _getElementById("_titulo_cabecera_mbl");
            _cover = _getElementById("_cover");
            _cover_a = _getElementById("_cover_a");
            _contenedor_progreso = _getElementById("_contenedor_progreso");
            _boton_compartir_facebook = _getElementById("_btn_facebook");
            _boton_compartir_twitter = _getElementById("_btn_twitter");
            _boton_compartir_facebook_mbl = _getElementById("_btn_facebook_mbl");
            _boton_compartir_twitter_mbl = _getElementById("_btn_twitter_mbl");
            _boton_compartir_whatsapp = _getElementById("_btn_whatsapp_mbl");
            _boton_descarga = _getElementById("_btn_descargar");
            _boton_descarga_mbl = _getElementById("_btn_descargar_mbl");

            /*_iframe_size = _getElementById("_iframe_size");
             _iframe_size_check_pct = _getElementById("_iframe_size_check_pct");
             _iframe_size_check_px = _getElementById("_iframe_size_check_px");
             */
            _iframe_code = _getElementById("_iframe_code");

            _embed_big_img = _getElementById("_embed_big_img");
            _embed_med_img = _getElementById("_embed_med_img");
            _embed_small_img = _getElementById("_embed_small_img");

            _selectwidget = _getElementById("_selectwidget");
            _btn_copiarcodigo = _getElementById("_btn_copiarcodigo");

            _playlist_button = _getElementById("_playlist_button");

            _setCursorPointer([
                _btn_play,
                _btn_rewind,
                _btn_forward,
                _barra_progreso_back,
                _barra_progreso,
                _show_modal_suscribe,
                _show_modal_embed,
                _modal,
                _modal_suscribe,
                _modal_suscribe_itunes,
                _modal_suscribe_ivoox,
                _modal_suscribe_spreaker,
                _modal_suscribe_rss,
                _modal_embed,
                _boton_compartir_facebook,
                _boton_compartir_twitter,
                _boton_compartir_facebook_mbl,
                _boton_compartir_twitter_mbl,
                _boton_compartir_whatsapp,
                _embed_big_img,
                _embed_med_img,
                _embed_small_img,
                _selectwidget,
                _btn_copiarcodigo,
                _boton_descarga,
                _boton_descarga_mbl,
                _span_external,
                _span_external_mbl]);

            _loadCSS.apply(this);

            setSkin.apply(this);

            if(soyWidget)
                _runWidgetJS();

            if(soyWidget){
                if(document.getElementsByClassName("mm-ply-volume-container").length>0)
                    if(getDevice().agent.indexOf("iPad")>0)
                        document.getElementsByClassName("mm-ply-volume-container")[0].style.display = "none";
            }
            else{
                if(document.getElementsByClassName("mm-ply-contenedorVolumen").length>0)
                    if(getDevice().agent.indexOf("iPad")>0)
                        document.getElementsByClassName("mm-ply-contenedorVolumen")[0].style.display = "none";
            }

            //if((typeof(jQuery)!="undefined")&&(typeof(jQuery.ui)!="undefined")){
            //    _runjQueryfunctions.apply(this);
            //}
        };

        var _setCursorPointer = function(elems){
            for(e in elems){
                if(elems[e]!=null){
                    elems[e].style.cursor = "pointer";
                }
            }
        }

        var setSkin = function(){

            _btn_play.onclick = (function(that){
                return function(){
                    if(_isplaying){
                        that.notifyOrderStop();
                    }
                    else{
                        _isplaying = true;
                        _started = true;
                        that.notifyOrderPlay();
                    }
                }
            })(this);

            _btn_rewind.onclick = (function(that){
                return function(){

                    that.notifyOrderButton(NOTIFYORDER_REWIND);
                    var tosec = _current_time - 30;

                    if(tosec<0)
                        tosec = 0;

                    that.notifyOrderSeekBySecs(tosec);
                }
            })(this);

            _btn_forward.onclick = (function(that){
                return function(){

                    that.notifyOrderButton(NOTIFYORDER_FORWARD);
                    var tosec = _current_time + 30;

                    if(tosec>_total_time)
                        tosec = _total_time-1;

                    that.notifyOrderSeekBySecs(tosec);
                }
            })(this);

            _boton_compartir_twitter.onclick = (function(that){
                return function(){
                    if (_data.mediaData.description == "{}")
                        _data.mediaData.description = " ";

                    that.notifyOrderShareTwitter();


                    var content = "Estoy escuchando " + _data.mediaData.title + " en ";
                    if(_twitter_text!="")
                        content = _twitter_text;
                    content = _data.mediaData.title;

                    if (content.length > 100)
                        content = content.substr(0, 100)+"...";
                    var refer = window.location.href;

                    if(_twitter_url)
                        refer = _twitter_url;

                    var refUrl = _URL_TWITTER;

                    refUrl += encodeURIComponent(content);
                    if(_twitter_via!="")
                        refUrl += "&via=" + _twitter_via;
                    refUrl += "&url=" + refer;

                    window.open(refUrl,'_blank');
                }
            })(this);

            _boton_compartir_facebook.onclick = (function(that){
                return function(){
                    var refer = window.location.href;
                    var text = "";

                    that.notifyOrderShareFacebook();
                    if(_facebook_url!=""){
                        refer = _facebook_url;
                    }

                    var refUrl = _URL_FACEBOOK + refer + "&t=" + encodeURIComponent(text);
                    window.open(refUrl, '_blank');
                }
            })(this);

            _boton_compartir_twitter_mbl.onclick = (function(that){
                return function(){
                    if (_data.mediaData.description == "{}")
                        _data.mediaData.description = " ";

                    that.notifyOrderShareTwitter();
                    var content = "Estoy escuchando " + _data.mediaData.title + " en ";
                    if(_twitter_text!="")
                        content = _twitter_text;
                    content = _data.mediaData.title;

                    if (content.length > 100)
                        content = content.substr(0, 100)+"...";
                    var refer = window.location.href;
                    if(_twitter_url)
                        refer = _twitter_url;

                    var refUrl = _URL_TWITTER;

                    refUrl += encodeURIComponent(content);
                    if(_twitter_via!="")
                        refUrl += "&via=" + _twitter_via;
                    refUrl += "&url=" + refer;

                    window.open(refUrl,'_blank');
                }
            })(this);

            _boton_compartir_facebook_mbl.onclick = (function(that){
                return function(){
                    that.notifyOrderShareFacebook();
                    var refer = window.location.href;
                    var text = "";

                    if(_facebook_url!=""){
                        refer = _facebook_url;
                    }

                    var refUrl = _URL_FACEBOOK + refer + "&t=" + encodeURIComponent(text);
                    window.open(refUrl, '_blank');
                }
            })(this);

            _cover.src = _data.uiData.poster;

            _titulo.innerHTML = _data.mediaData.title;
            if(_titulo_mbl!=undefined)
                _titulo_mbl.innerHTML = _data.mediaData.title;

            var url_descarga = _data.mediaData.url

            if(typeof(mm_dist)!="undefined"){
                url_descarga = url_descarga.replace("dist=" + mm_dist,"dist=PRISA_DOWNLOAD&dl=1");
            }else{
                if(url_descarga.indexOf("?")>0)
                    url_descarga += "&dist=PRISA_DOWNLOAD&dl=1";
                else
                    url_descarga += "?dist=PRISA_DOWNLOAD&dl=1";
            }

            _boton_descarga.href = url_descarga;

            //-- En caso de que sea Ipad o Iphone vamos a ocultar el botón de descarga,
            // para ello vamos a ocultar el elemento<li>
            if((getDevice().agent.indexOf("iPad")>0)||(getDevice().agent.indexOf("iPhone")>0)){
                document.getElementById(_boton_descarga.id).style.display= "none";
                document.getElementById(_boton_descarga_mbl.id).style.display= "none";
            }

            //-- En caso de ser firefox de navegador se modifica el comportamiento
            //-- Pero solo abre otra pestaña si no tiene definida la variable global
            //-- dwnlurl, que tiene que ser declarada cuando se instancia el player, en la página que aloja el player
            //-- Si tiene declarada la variable, entonces no abre la pestaña nueva y descarga el podcast
            if (!getDevice().mobile && typeof(psd.framework.ua.firefox) != 'undefined') {
                _boton_descarga.target = '_blank';
                _boton_descarga_mbl.target = '_blank';
            }

            _boton_descarga.onclick = (function (that) {

                return function () {

                    that.notifyOrderButton(NOTIFYORDER_DOWNLOAD);

                }

            })(this);

            _boton_descarga_mbl.href = url_descarga;
            _boton_descarga_mbl.onclick = (function (that) {

                return function () {

                    that.notifyOrderButton(NOTIFYORDER_DOWNLOAD);

                }

            })(this);

            /*
             if(_data.mediaData.tags.programa!=undefined){
             _titulo_cabecera.innerHTML = _data.mediaData.tags.programa.toUpperCase().replace(/_/g," ");
             //_titulo_cabecera_mbl.innerHTML = _data.mediaData.tags.programa.toUpperCase();
             }*/

            //<span>T01-EPI16 | REPORTAJES</span>
            //

            //}

            _boton_compartir_whatsapp.onclick = (function(that){
                return function(){
                    var refer = window.location.href;

                    that.notifyOrderShareWhatsapp();

                    if(_whatsapp_url!="")
                        refer = _whatsapp_url;

                    refer = encodeURIComponent(refer);

                    var refUrl = "whatsapp://send?text=" + refer;
                    window.open(refUrl,'_blank');
                }
            })(this);

            if(!soyWidget){
                _show_modal_suscribe.onclick = (function(that){
                    return function(){
                        //_modal.className = _modal.className.replace(/ hidden/g,"");
                        //_modal_suscribe.className = _modal_suscribe.className.replace(/ hidden/g,"");
                    }
                })(this);

                _playlist_button.onclick = (function(that){
                    return function(){
                        var playlistcont = document.getElementById("containerplaylist_container");

                        if(playlistcont!=null){

                            if(playlistcont.className.indexOf("mm-ply-opened")>0){
                                playlistcont.className = playlistcont.className.replace(/ mm-ply-opened/g,"");
                                _playlist_button.className = _playlist_button.className.replace(/ mm-ply-opened/g,"");
                            }else{
                                playlistcont.className += " mm-ply-opened";
                                _playlist_button.className += " mm-ply-opened";
                            }
                        }
                    }
                })(this);
            }

            if(soyWidget){
                _selectwidget.onchange = (function(that){
                    return function(){
                        switch(_selectwidget.selectedIndex){
                            case 0:
                                that.notifyOrderButton(NOTIFYORDER_EMBED_SMALL);
                                _currentIframe = IFRAME_SMALL;
                                break;
                            case 1:
                                that.notifyOrderButton(NOTIFYORDER_EMBED_MED);
                                _currentIframe = IFRAME_MED;
                                break;
                            case 2:
                                that.notifyOrderButton(NOTIFYORDER_EMBED_BIG);
                                _currentIframe = IFRAME_BIG;
                                break;
                        }

                        that.reload_codeiframe();
                    }
                })(this);
            }else{
                _embed_big_img.onclick = (function(that){
                    return function(){

                        that.notifyOrderButton(NOTIFYORDER_EMBED_BIG);
                        _currentIframe = IFRAME_BIG;
                        that.reload_codeiframe();
                        _btn_copiarcodigo.value = "Copiar código";
                    }
                })(this);

                _embed_med_img.onclick = (function(that){
                    return function(){

                        that.notifyOrderButton(NOTIFYORDER_EMBED_MED);

                        _currentIframe = IFRAME_MED;
                        that.reload_codeiframe();
                        _btn_copiarcodigo.value = "Copiar código";
                    }
                })(this);

                _embed_small_img.onclick = (function(that){
                    return function(){

                        that.notifyOrderButton(NOTIFYORDER_EMBED_SMALL);

                        _currentIframe = IFRAME_SMALL;
                        that.reload_codeiframe();
                        _btn_copiarcodigo.value = "Copiar código";
                    }
                })(this);
            }

            _btn_copiarcodigo.onclick=(function(that) {
                return  function () {
                    var input = _iframe_code;
                    var textToClipboard = input.value;
                    var success = true;

                    if (window.clipboardData) { // Internet Explorer
                        window.clipboardData.setData("Text", textToClipboard);
                    }

                    else {
                        var forExecElement = CreateElementForExecCommand(textToClipboard);
                        SelectContent(forExecElement);
                        var supported = true;
                        try {
                            if (window.netscape && netscape.security) {
                                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
                            }
                            success = document.execCommand("copy", false, null);
                        }

                        catch (e) {
                            success = false;
                        }
                        document.body.removeChild(forExecElement);
                    }
                    if (success) {
                        _iframe_code.focus();
                        _iframe_code.select();
                    }
                    else {
                        SelectContent(forExecElement);
                        _iframe_code.focus();
                        _iframe_code.select();
                        _btn_copiarcodigo.value = "Pulse Ctrl+C";
                    }
                }
            })(this);

            if(_show_modal_embed!=undefined)
                _show_modal_embed.onclick = (function(that){
                    return function(){
                        that.notifyOrderButton(NOTIFYORDER_EMBED_BIG);
                    }
                })(this);

            /*
             _iframe_code.value = _codigo_iframe;


             _iframe_size.onchange = (function(that){
             return function(){
             that.reload_codeiframe();
             }
             })(this);

             _iframe_size_check_pct.onchange = (function(that){
             return function(){
             that.reload_codeiframe();
             }
             })(this);

             _iframe_size_check_px.onchange = (function(that){
             return function(){
             that.reload_codeiframe();
             }
             })(this);
             */

            this.reload_codeiframe();
        };

        this.reload_codeiframe = function(){
            /*var percent = "%";
             switch(jQuery('input[name="playerpodcast_unit"]:checked' ).val()){
             case "pct":
             percent = "%";
             break;
             case "px":
             percent = "px";
             break;
             }*/

            var ww = "100";
            var hh = "100";

            switch(_currentIframe){
                case IFRAME_BIG:
                    ww = "646px";
                    hh = "269px";
                    break;
                case IFRAME_MED:
                    ww = "240px";
                    hh = "240px";
                    break;
                case IFRAME_SMALL:
                    ww = "100%";
                    hh = "100px";
                    break;
            }

            var aux_iframe_code = _CODIGO_IFRAME.replace("{{WW}}",ww).replace("{{HH}}",hh).replace("{{PP}}",_CODIGO_PLAYER_WIDGET).replace("{{SS}}",_data.mediaData.idTOP);
            _iframe_code.value = aux_iframe_code;
        }

        this.init = function(data) {
            _data = data;

            _container = document.getElementById(_data.internalData.skinContainer);

            if(_data.uiData.skinData.soywidget!=undefined)
                soyWidget = _data.uiData.skinData.soywidget;

            if(_data.uiData.skinData.playerwidget!=undefined){
                _CODIGO_PLAYER_WIDGET = _data.uiData.skinData.playerwidget;
            }

            _loadTemplate.apply(this);
        };

        this.reset = function ()
        {
            setSkin.apply(this);
        };

        this.resize = function(width, height){};

        this.onProgress = function(data){
            var percent = (data.currentTime *100/data.totalTime);

            _btn_play.className = _btn_play.className.replace(/ mm-ply-loading/g,"");

            _barra_progreso.style.width = percent + "%";
            _currenttime.innerHTML = this.secondsAsTimeCode(data.currentTime,"hh:mm:ss");
            _current_time = data.currentTime;

            if(!isNaN(data.totalTime)){
                _totaltime.innerHTML = this.secondsAsTimeCode(data.totalTime,"hh:mm:ss");
                _total_time = data.totalTime;
            }
        };

        this.onVolumeChange = function(offset){
            var percent = offset*100;

            if(offset!=0)
                _last_volume = offset;

            if(!soyWidget){
                if(typeof(jQuery)!="undefined"){
                    jQuery(".mm-ply-volumen span").css("width",percent + "%");
                    jQuery(".mm-ply-controlVolumen").css("left",percent + "%");
                }
            }else{
                //   jQuery(".mm-ply-volume-drag").css("left", percent + "%");
                //   jQuery(".mm-ply-volume-bar").css("width", percent + "%");
            }
        };

        this.onSeekComplete = function(offset){
        };

        this.onBufferEmpty = function(){

        };

        this.onBufferFull = function(){

        };

        this.showLoading = function (flag) {
            if (flag){
                _btn_play.className += " mm-ply-loading";}
            else{
                _btn_play.className = _btn_play.className.replace(/ mm-ply-loading/g,"");
            }
        };

        this.externalOrder = function(order, params){

            /* EJEMPLO DE params
             'twitter' => array(
             'text' => 'Escucha este audio en',
             'account' => 'programa-1'
             ),
             'rss' => array(
             'feed' => 'http://fapi-top.prisasd.com/podcast/podium/programa-1.xml',
             'ivoox' => 'http://ivox.com/?id=programa-1',
             'itunes' => 'http://itunes.com/?id=programa-1',
             'spreaker' => 'http://spreaker.com/?id=programa-1'
             ),
             'urls' => array(
             'program' => '/programa-1',
             'chapter' => '/programa-1/episodio-1'
             )
             */

            if((_data.mediaData.chapter!="")&&(_data.mediaData.chapter!=undefined)&&((_data.mediaData.chapter+"").length<2)){
                _data.mediaData.chapter = "0" + _data.mediaData.chapter;
            }
            if(_data.mediaData.chapter==undefined)
                _data.mediaData.chapter = "";

            if((_data.mediaData.season!="")&&(_data.mediaData.season!=undefined)&&((_data.mediaData.season+"").length<2)){
                _data.mediaData.season = "0" + _data.mediaData.season;
            }
            if(_data.mediaData.season==undefined)
                _data.mediaData.season = "";

            switch(order){
                case namespace.ORDER_SET_DATA:

                    if(params.section==null)
                        params.section = "";

                    var section = params.section.toUpperCase();
                    var url_program = _BASE + params.urls.program;
                    var url_chapter = _BASE + params.urls.chapter;

                    var suscribe_feed = params.rss.feed;
                    var suscribe_ivoox = params.rss.ivoox;
                    var suscribe_itunes = params.rss.itunes;
                    var suscribe_spreaker = params.rss.spreaker;

                    _twitter_via = params.twitter.account;
                    _twitter_text = params.twitter.text;
                    _twitter_url =  url_chapter + "?ssm=tw-player";
                    _facebook_url = url_chapter + "?ssm=fb-player";
                    _whatsapp_url = url_chapter + "?ssm=wa-player";

                    _programTitle = params.program_title;

                    if(suscribe_feed==null) suscribe_feed = "";
                    if(suscribe_ivoox==null) suscribe_ivoox = "";
                    if(suscribe_itunes==null) suscribe_itunes = "";
                    if(suscribe_spreaker==null) suscribe_spreaker = "";

                    _modal_suscribe_rss.style.display = "";
                    if(suscribe_feed==""){
                        _modal_suscribe_rss.style.display = "none";
                    }
                    _modal_suscribe_ivoox.style.display = "";
                    if(suscribe_ivoox==""){
                        _modal_suscribe_ivoox.style.display = "none";
                    }
                    _modal_suscribe_itunes.style.display = "";
                    if(suscribe_itunes==""){
                        _modal_suscribe_itunes.style.display = "none";
                    }
                    _modal_suscribe_spreaker.style.display = "";
                    if(suscribe_spreaker==""){
                        _modal_suscribe_spreaker.style.display = "none";
                    }

                    _show_modal_suscribe.style.display = "";
                    if((suscribe_feed=="")&&(suscribe_ivoox=="")&&(suscribe_itunes=="")&&(suscribe_spreaker==""))
                        _show_modal_suscribe.style.display = "none";

                    if(soyWidget){
                        _titulo_cabecera.innerHTML = _programTitle;
                        if((_data.mediaData.chapter!="")&&(_data.mediaData.season!=""))
                            _getElementById("_titulo_cabecera_tag").innerHTML = "<span id='" + _data.genericData.id + "_spanSCH'>T" + _data.mediaData.season + "E" + _data.mediaData.chapter + "</span>";
                        else
                            _getElementById("_titulo_cabecera_tag").innerHTML = "<span id='" + _data.genericData.id + "_spanSCH'></span>";

                        _span_external = _getElementById("_spanSCH");
                        _span_external_mbl = _getElementById("_spanSCH_mbl");

                    }else{
                        _titulo_cabecera.innerHTML = _programTitle;
                        if(_titulo_cabecera_mbl!=undefined)
                            _titulo_cabecera_mbl.innerHTML = _programTitle;

                        if((_data.mediaData.chapter!="")&&(_data.mediaData.season!="")){
                            _titulo_cabecera_mbl.innerHTML =  _titulo_cabecera_mbl.innerHTML + "<span id='" + _data.genericData.id + "_spanSCH_mbl'>T" + _data.mediaData.season + "E" + _data.mediaData.chapter + "</span>";
                            _titulo_cabecera.innerHTML = _titulo_cabecera.innerHTML + " / <span id='" + _data.genericData.id + "_spanSCH'>T" + _data.mediaData.season + "E" + _data.mediaData.chapter + "</span>";
                        }
                        else{
                            _titulo_cabecera.innerHTML = _titulo_cabecera.innerHTML + " <span id='" + _data.genericData.id + "_spanSCH'></span>";
                            _titulo_cabecera_mbl.innerHTML =  _titulo_cabecera_mbl.innerHTML + "<span id='" + _data.genericData.id + "_spanSCH_mbl'></span>";
                        }

                        _span_external = _getElementById("_spanSCH");
                        _span_external_mbl = _getElementById("_spanSCH_mbl");
                    }

                    _data.mediaData.chapter = "";
                    _data.mediaData.season = "";

                    if(soyWidget){
                        _twitter_url += "-widget";
                        _facebook_url += "-widget";
                        _whatsapp_url += "-widget";
                    }

                    _titulo_cabecera.href = url_program;
                    /*_titulo_cabecera.onclick = (function(that){
                     return function(){
                     window.open(url_program,"_blank");
                     }
                     })(this);
                     _titulo_cabecera.style.cursor  = "pointer";
                     */

                    if(_titulo_cabecera_mbl!=undefined){

                        _titulo_cabecera_mbl.href = url_program;

                        /*
                         _titulo_cabecera_mbl.onclick = (function(that){
                         return function(){
                         window.open(url_program,"_blank");
                         }
                         })(this);
                         _titulo_cabecera_mbl.style.cursor  = "pointer";
                         */
                    }

                    _cover_a.href= url_chapter;
                    /*_cover.onclick = (function(that){
                     return function(){
                     window.open(url_chapter,"_blank");
                     }
                     })(this);
                     _cover.style.cursor  = "pointer";
                     */

                    if(_span_external!=undefined){
                        var quitabarra = _span_external.innerHTML;

                        quitabarra.indexOf("|")

                        if(quitabarra.indexOf("|")>0){
                            quitabarra = quitabarra.replace(quitabarra.substr(quitabarra.indexOf("|"),quitabarra.length),"");
                        }

                        _span_external.innerHTML = quitabarra;

                        if(_span_external!=undefined){
                            _span_external.innerHTML = _span_external.innerHTML.replace("</span>","") + " | " + section + "</span>";
                            if(_span_external_mbl!=undefined){
                                _span_external_mbl.innerHTML = _span_external.innerHTML;
                            }
                        }
                        else{
                            _titulo_cabecera.innerHTML = _titulo_cabecera.innerHTML + " | <span > " + section + "</span>";
                        }

                        if(section==""){
                            if(_titulo_cabecera)
                                _titulo_cabecera.innerHTML = _titulo_cabecera.innerHTML.replace("|","");
                            if(_span_external)
                                _span_external.innerHTML = _span_external.innerHTML.replace("|","");
                            if(_span_external_mbl!=undefined){
                                _span_external_mbl.innerHTML = _span_external.innerHTML;
                            }
                        }
                    }


                    _modal_suscribe_itunes.onclick = (function(that){
                        return function(){
                            that.notifyOrderShareSubscribe('itunes');
                            window.open(suscribe_itunes,"_blank");
                        }
                    })(this);

                    _modal_suscribe_ivoox.onclick = (function(that){
                        return function(){
                            that.notifyOrderShareSubscribe('ivoox');
                            window.open(suscribe_ivoox,"_blank");
                        }
                    })(this);

                    _modal_suscribe_spreaker.onclick = (function(that){
                        return function(){
                            that.notifyOrderShareSubscribe('spreaker');
                            window.open(suscribe_spreaker,"_blank");
                        }
                    })(this);

                    _modal_suscribe_rss.onclick = (function(that){
                        return function(){
                            that.notifyOrderShareSubscribe('rss');
                            window.open(suscribe_feed,"_blank");
                        }
                    })(this);

                    break;
            }
        };

        this.polyfill = (function(){
            if ("document" in window.self) {
// Full polyfill for browsers with no classList support
// Including IE < Edge missing SVGElement.classList
                if (!("classList" in document.createElement("_"))
                    || document.createElementNS && !("classList" in document.createElementNS("http://www.w3.org/2000/svg","g"))) {

                    (function (view) {

                        "use strict";

                        if (!('Element' in view)) return;

                        var
                            classListProp = "classList"
                            , protoProp = "prototype"
                            , elemCtrProto = view.Element[protoProp]
                            , objCtr = Object
                            , strTrim = String[protoProp].trim || function () {
                                return this.replace(/^\s+|\s+$/g, "");
                            }
                            , arrIndexOf = Array[protoProp].indexOf || function (item) {
                                var
                                    i = 0
                                    , len = this.length
                                    ;
                                for (; i < len; i++) {
                                    if (i in this && this[i] === item) {
                                        return i;
                                    }
                                }
                                return -1;
                            }
                        // Vendors: please allow content code to instantiate DOMExceptions
                            , DOMEx = function (type, message) {
                                this.name = type;
                                this.code = DOMException[type];
                                this.message = message;
                            }
                            , checkTokenAndGetIndex = function (classList, token) {
                                if (token === "") {
                                    throw new DOMEx(
                                        "SYNTAX_ERR"
                                        , "An invalid or illegal string was specified"
                                    );
                                }
                                if (/\s/.test(token)) {
                                    throw new DOMEx(
                                        "INVALID_CHARACTER_ERR"
                                        , "String contains an invalid character"
                                    );
                                }
                                return arrIndexOf.call(classList, token);
                            }
                            , ClassList = function (elem) {
                                var
                                    trimmedClasses = strTrim.call(elem.getAttribute("class") || "")
                                    , classes = trimmedClasses ? trimmedClasses.split(/\s+/) : []
                                    , i = 0
                                    , len = classes.length
                                    ;
                                for (; i < len; i++) {
                                    this.push(classes[i]);
                                }
                                this._updateClassName = function () {
                                    elem.setAttribute("class", this.toString());
                                };
                            }
                            , classListProto = ClassList[protoProp] = []
                            , classListGetter = function () {
                                return new ClassList(this);
                            }
                            ;
// Most DOMException implementations don't allow calling DOMException's toString()
// on non-DOMExceptions. Error's toString() is sufficient here.
                        DOMEx[protoProp] = Error[protoProp];
                        classListProto.item = function (i) {
                            return this[i] || null;
                        };
                        classListProto.contains = function (token) {
                            token += "";
                            return checkTokenAndGetIndex(this, token) !== -1;
                        };
                        classListProto.add = function () {
                            var
                                tokens = arguments
                                , i = 0
                                , l = tokens.length
                                , token
                                , updated = false
                                ;
                            do {
                                token = tokens[i] + "";
                                if (checkTokenAndGetIndex(this, token) === -1) {
                                    this.push(token);
                                    updated = true;
                                }
                            }
                            while (++i < l);

                            if (updated) {
                                this._updateClassName();
                            }
                        };
                        classListProto.remove = function () {
                            var
                                tokens = arguments
                                , i = 0
                                , l = tokens.length
                                , token
                                , updated = false
                                , index
                                ;
                            do {
                                token = tokens[i] + "";
                                index = checkTokenAndGetIndex(this, token);
                                while (index !== -1) {
                                    this.splice(index, 1);
                                    updated = true;
                                    index = checkTokenAndGetIndex(this, token);
                                }
                            }
                            while (++i < l);

                            if (updated) {
                                this._updateClassName();
                            }
                        };
                        classListProto.toggle = function (token, force) {
                            token += "";

                            var
                                result = this.contains(token)
                                , method = result ?
                                    force !== true && "remove"
                                    :
                                    force !== false && "add"
                                ;

                            if (method) {
                                this[method](token);
                            }

                            if (force === true || force === false) {
                                return force;
                            } else {
                                return !result;
                            }
                        };
                        classListProto.toString = function () {
                            return this.join(" ");
                        };

                        if (objCtr.defineProperty) {
                            var classListPropDesc = {
                                get: classListGetter
                                , enumerable: true
                                , configurable: true
                            };
                            try {
                                objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
                            } catch (ex) { // IE 8 doesn't support enumerable:true
                                // adding undefined to fight this issue https://github.com/eligrey/classList.js/issues/36
                                // modernie IE8-MSW7 machine has IE8 8.0.6001.18702 and is affected
                                if (ex.number === undefined || ex.number === -0x7FF5EC54) {
                                    classListPropDesc.enumerable = false;
                                    objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
                                }
                            }
                        } else if (objCtr[protoProp].__defineGetter__) {
                            elemCtrProto.__defineGetter__(classListProp, classListGetter);
                        }

                    }(window.self));

                }

// There is full or partial native classList support, so just check if we need
// to normalize the add/remove and toggle APIs.

                (function () {
                    "use strict";

                    var testElement = document.createElement("_");

                    testElement.classList.add("c1", "c2");

                    // Polyfill for IE 10/11 and Firefox <26, where classList.add and
                    // classList.remove exist but support only one argument at a time.
                    if (!testElement.classList.contains("c2")) {
                        var createMethod = function(method) {
                            var original = DOMTokenList.prototype[method];

                            DOMTokenList.prototype[method] = function(token) {
                                var i, len = arguments.length;

                                for (i = 0; i < len; i++) {
                                    token = arguments[i];
                                    original.call(this, token);
                                }
                            };
                        };
                        createMethod('add');
                        createMethod('remove');
                    }

                    testElement.classList.toggle("c3", false);

                    // Polyfill for IE 10 and Firefox <24, where classList.toggle does not
                    // support the second argument.
                    if (testElement.classList.contains("c3")) {
                        var _toggle = DOMTokenList.prototype.toggle;

                        DOMTokenList.prototype.toggle = function(token, force) {
                            if (1 in arguments && !this.contains(token) === !force) {
                                return force;
                            } else {
                                return _toggle.call(this, token);
                            }
                        };

                    }

                    testElement = null;
                }());
            }
        })();

        this.drawPlayPause = function(valor){
            if(!soyWidget)
                return;

            var buttons = document.querySelectorAll('.mm-ply-play svg path');
            if(valor==1) {
                buttons[0].classList.remove('mm-ply-hidden');
                buttons[1].classList.add('mm-ply-hidden');
            } else {
                buttons[0].classList.add('mm-ply-hidden');
                buttons[1].classList.remove('mm-ply-hidden');
            }
        }

        this.onStatusChange = function(status){
            switch (status){
                case emic.top.MediaModule.STATUS_STOP:
                    _isplaying = false;
                    _btn_play.className = _btn_play.className.replace(/ mm-ply-activo/g,"");
                    this.drawPlayPause(0);
                    break;
                case emic.top.MediaModule.STATUS_PAUSE:
                case emic.top.AdModule.STATUS_PAUSE:
                    _isplaying = false;
                    _btn_play.className = _btn_play.className.replace(/ mm-ply-activo/g,"");
                    this.drawPlayPause(0);
                    break;
                case emic.top.MediaModule.STATUS_PLAY:
                    _isplaying = true;
                    _started = true;
                    _btn_play.className += " mm-ply-activo";
                    this.drawPlayPause(1);
                    break;
                case emic.top.event.MediaEvent.ON_MEDIA_END:
                    /*_isplaying = false;
                    _btn_play.className = _btn_play.className.replace(/ mm-ply-activo/g,"");*/
                    break;
                case emic.top.AdModule.STATUS_PLAY:
                    break;
                case emic.top.AdModule.STATUS_STOP:
                case emic.top.AdModule.PUBLI_SKIPPED:
                case emic.top.AdModule.PUBLI_ERROR:
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

        this.onMetadata = function(metadata){
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

        var _runjQueryfunctionsWidget = function(){

            jQuery("#" + _data.genericData.id + "_volumen_back").bind('click', function (ev) {

                var $div = jQuery("#" + _data.genericData.id + "_volumen_back");
                //var $display = $div.find('#containerplayer_TopPlayer_barra_progreso');

                var offset = $div.offset();
                var x = (ev.clientX - offset.left - 6);
                var percent = x/$div.width();

                if(percent==0)
                    _that.notifyOrderButton(NOTIFYORDER_VOLUME_OFF);
                else
                    _that.notifyOrderButton(NOTIFYORDER_VOLUME_BAR);

                _that.notifyOrderVolumeChange(percent);

                jQuery(".mm-ply-volume-drag").css("left", x);
                jQuery(".mm-ply-volume-bar").css("width", x);
            });

            jQuery("#" + _data.genericData.id + "_contenedor_progreso").bind('click', function (ev) {
                var $div = jQuery("#" + _data.genericData.id + "_contenedor_progreso");
                //var $display = $div.find('#containerplayer_TopPlayer_barra_progreso');

                var offset = $div.offset();
                var x = ev.clientX - offset.left;
                var percent = x/$div.width();

                _that.notifyOrderButton(NOTIFYORDER_PROGRESS_BAR);
                _that.notifyOrderSeekByProp(percent.toFixed(2));

                //jQuery('#containerplayer_TopPlayer_barra_progreso').width(x);
            });

        }

        var _runWidgetJS = function(){

            var widget = (function() {
                function _setProgress(progress) {
                    var progress_container = document.querySelector('.mm-ply-progress');
                    var progress_bar = progress_container.firstElementChild;
                    progress_bar.style.width = progress + "%";
                };

                function _openOpciones() {
                    var opciones_dialog = document.querySelector('.mm-ply-opciones');
                    if(opciones_dialog.classList.contains('mm-ply-hidden')) {
                        opciones_dialog.classList.remove('mm-ply-hidden');
                    }
                };

                function _closeOpciones() {
                    var opciones_dialog = document.querySelector('.mm-ply-opciones');
                    if(!opciones_dialog.classList.contains('mm-ply-hidden')) {
                        opciones_dialog.classList.add('mm-ply-hidden');
                    }
                };

                function _toggleOpciones() {
                    var opciones_dialog = document.querySelector('.mm-ply-opciones');
                    if(opciones_dialog.classList.contains('mm-ply-hidden')) {
                        _openOpciones();
                    } else {
                        _closeOpciones();
                    }
                };

                function _openSuscribir() {
                    var suscribir_dialogo = document.querySelector('.mm-ply-suscripcion');
                    if(suscribir_dialogo.classList.contains('mm-ply-hidden')) {
                        suscribir_dialogo.classList.remove('mm-ply-hidden');
                    }
                };

                function _closeSuscribir() {
                    var suscribir_dialogo = document.querySelector('.mm-ply-suscripcion');
                    if(!suscribir_dialogo.classList.contains('mm-ply-hidden')) {
                        suscribir_dialogo.classList.add('mm-ply-hidden');
                    }
                };

                function _toggleSuscribir() {
                    var suscribir_dialogo = document.querySelector('.mm-ply-suscripcion');
                    if(suscribir_dialogo.classList.contains('mm-ply-hidden')) {
                        _openSuscribir();
                    } else {
                        _closeSuscribir();
                    }
                };

                function _openEmbeber() {
                    var embeber_dialogo = document.querySelector('.mm-ply-embeber');
                    if(embeber_dialogo.classList.contains('mm-ply-hidden')) {
                        embeber_dialogo.classList.remove('mm-ply-hidden');
                    }
                };

                function _closeEmbeber() {
                    var embeber_dialogo = document.querySelector('.mm-ply-embeber');
                    if(!embeber_dialogo.classList.contains('mm-ply-hidden')) {
                        embeber_dialogo.classList.add('mm-ply-hidden');
                    }
                };

                function _toggleEmbeber() {
                    var embeber_dialogo = document.querySelector('.mm-ply-embeber');
                    if(embeber_dialogo.classList.contains('mm-ply-hidden')) {
                        _openSuscribir();
                    } else {
                        _closeSuscribir();
                    }
                };

                function _togglePlayPause() {
                    var buttons = document.querySelectorAll('.mm-ply-play svg path');
                    if(buttons[0].classList.contains('mm-ply-hidden')) {
                        buttons[0].classList.remove('mm-ply-hidden');
                        buttons[1].classList.add('mm-ply-hidden');
                    } else {
                        buttons[0].classList.add('mm-ply-hidden');
                        buttons[1].classList.remove('mm-ply-hidden');
                    }
                }

                var muted = false;

                function _setVolumeIcon(mode) {
                    var iconos = document.querySelectorAll('.mm-ply-volume-container svg path');

                    if(mode=='muted' && !muted) {
                        iconos[0].classList.remove('mm-ply-hidden');
                        iconos[1].classList.add('mm-ply-hidden');
                        muted = true;
                    } else if(mode=='active' && muted) {
                        iconos[0].classList.add('mm-ply-hidden');
                        iconos[1].classList.remove('mm-ply-hidden');
                        muted = false;
                    }
                }

                var lastVolume = 30;
                function _setVolume(pct) {
                    _that.notifyOrderVolumeChange(pct/100);
                    barraVolumen.style.width = pct + "%";
                    volumen.style.left = pct + "%";
                }

                function _toggleVolume() {
                    var iconos = document.querySelectorAll('.mm-ply-volume-container svg path');

                    if(!muted) {
                        iconos[0].classList.remove('mm-ply-hidden');
                        iconos[1].classList.add('mm-ply-hidden');
                        _setVolume(0);
                        muted = true;
                    } else  {
                        iconos[0].classList.add('mm-ply-hidden');
                        iconos[1].classList.remove('mm-ply-hidden');
                        muted = false;
                        _setVolume(lastVolume);
                    }
                }

                var stateMouseDown;
                var volumen;
                var barraVolumen;
                var offset = 0;

                function _volumenMouseDown(ev) {
                    stateMouseDown = 0;
                    offset = ev.pageX;
                    document.addEventListener ("mousemove" , _volumenMouseMove , false);
                }

                function _volumenMouseMove(ev) {
                    if(stateMouseDown==0) {
                        document.addEventListener ("mouseup" , _volumenMouseUp , false);
                        stateMouseDown = 1;
                    }

                    var pX = ev.pageX - offset;
                    var currentLeft = volumen.offsetLeft;
                    var parentWidth = volumen.parentElement.offsetWidth;

                    var next = currentLeft + pX;
                    if(next < -2 && currentLeft > -2) next = -2;
                    if(next > (parentWidth - 2) && currentLeft < (parentWidth - 2)) current = parentWidth - 2;

                    if(next >= -2 && next <= (parentWidth - 2)) {
                        volumen.style.left = next + "px";

                        var newWidth = (next + 2) / parentWidth * 100;
                        barraVolumen.style.width = newWidth + "%";

                        if(newWidth/100<0)
                            newWidth = 0;

                        _that.notifyOrderVolumeChange(newWidth/100);

                        if(newWidth==0) {
                            _setVolumeIcon('muted');
                        } else {
                            _setVolumeIcon('active');
                        }

                        lastVolume = newWidth;
                        offset = ev.pageX;
                    }

                    ev.preventDefault();
                }

                function _volumenMouseUp(ev) {
                    stateMouseDown = 0;
                    document.removeEventListener ("mousemove" , _volumenMouseMove , false);
                    document.removeEventListener ("mouseup" , _volumenMouseUp , false)
                }

                haz = function(){
                    //window.addEventListener('load', function() {
                    var logos = document.querySelectorAll('.mm-ply-suscribir');
                    logos[0].addEventListener('click', function() {
                        _openSuscribir();
                    });

                    logos[1].addEventListener('click', function() {
                        _closeOpciones()
                        _openSuscribir();
                    });

                    var close = document.querySelector('.mm-ply-suscripcion .mm-ply-close');
                    close.addEventListener('click', function() {
                        _closeSuscribir();
                    });

                    var suscribir = document.querySelector('.mm-ply-more');
                    suscribir.addEventListener('click', function() {
                        _openOpciones();
                    });

                    close = document.querySelector('.mm-ply-opciones .mm-ply-close');
                    close.addEventListener('click', function() {
                        _closeOpciones();
                    });

                    var embeber = document.querySelector('.mm-ply-embed');
                    embeber.addEventListener('click', function() {
                        _openEmbeber();
                    });

                    close = document.querySelector('.mm-ply-embeber .mm-ply-close');
                    close.addEventListener('click', function() {
                        _closeEmbeber();
                    });

                    volumen = document.querySelector('.mm-ply-volume-drag');
                    volumen.addEventListener ("mousedown" , _volumenMouseDown , false);
                    barraVolumen = document.querySelector('.mm-ply-volume-bar');

                    var muteButton = document.querySelector('.mm-ply-volume-container svg');
                    muteButton.addEventListener('click', function() {
                        _toggleVolume();
                    });

                    var play = document.querySelector('.mm-ply-play svg');
                    play.addEventListener('click', function(ev) {
                        //_togglePlayPause();
                    })
                    //});
                }

                return {
                    setProgress : _setProgress,
                    openOpciones: _openOpciones,
                    closeOpciones: _closeOpciones,
                    toggleOpciones: _toggleOpciones,
                    openSuscribir: _openSuscribir,
                    closeSuscribir: _closeSuscribir,
                    toggleSuscribir: _toggleSuscribir,
                    togglePlayPause: _togglePlayPause,
                    setVolume: _setVolume,
                    toggleVolume: _toggleVolume
                };
            })();

            haz();
        }


        function CreateElementForExecCommand(textToClipboard) {
            var forExecElement = document.createElement("div");
            // place outside the visible area
            forExecElement.style.position = "absolute";
            forExecElement.style.left = "-10000px";
            forExecElement.style.top = "-10000px";
            // write the necessary text into the element and append to the document
            forExecElement.textContent = textToClipboard;

            document.body.appendChild(forExecElement);
            // the contentEditable mode is necessary for the  execCommand method in Firefox
            forExecElement.contentEditable = true;
            return forExecElement;
        };

        function SelectContent(element) {
            var rangeToSelect = document.createRange();
            rangeToSelect.selectNodeContents(element);
            var selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(rangeToSelect);
        }

        //Función para aplicar efectos y otros comportamientos jQuery
        var _runjQueryfunctions = function(){

            _titulo_mbl.innerHTML = _data.mediaData.title;
            _barra_progreso.style.width = "0%";

            //click en el progreso

            jQuery("#" + _data.genericData.id + "_contenedor_progreso").bind('click', function (ev) {
                var $div = jQuery("#" + _data.genericData.id + "_contenedor_progreso");
                //var $display = $div.find('#containerplayer_TopPlayer_barra_progreso');

                var offset = $div.offset();
                var x = ev.clientX - offset.left;
                var percent = x/($div.width()-15);

                _that.notifyOrderButton(NOTIFYORDER_PROGRESS_BAR);
                _that.notifyOrderSeekByProp(percent.toFixed(2));

                //jQuery('#containerplayer_TopPlayer_barra_progreso').width(x);
            });

            //volumen

            jQuery(".mm-ply-draggable").draggable({
                containment: "parent",
                axis: "x",

                start: function() {
                    // por si necesitamos meter alguna función
                },
                drag: function() {
                    var volumen = jQuery(".mm-ply-volumen svg").css("left");
                    var totalw = jQuery(".mm-ply-volumen").width();

                    var percent = parseInt(volumen)/parseInt(totalw);

                    _that.notifyOrderVolumeChange(percent);

                    if(parseInt(volumen) == 0){
                        jQuery(".mm-ply-mute").addClass("silenciado");
                    }else{
                        jQuery(".mm-ply-mute").removeClass("silenciado");
                    }
                },
                stop: function() {
                    // por si necesitamos meter alguna función
                }
            });

            var estadoVolumen; // variable para controlar el volumen
            var posX; //posición del manejador

            jQuery(".mm-ply-mute").click(function(){
                if(jQuery(".mm-ply-mute").hasClass("silenciado") == false){
                    estadoVolumen = jQuery(".mm-ply-volumen svg").css("left");
                    posX = estadoVolumen;
                    _that.notifyOrderVolumeChange(0);
                    jQuery(".mm-ply-mute").addClass("silenciado");
                    jQuery(".mm-ply-volumen svg").css("left", "0");
                    jQuery(".mm-ply-volumen span").css("width","0");
                    _that.notifyOrderButton(NOTIFYORDER_VOLUME_OFF);
                }else{

                    _that.notifyOrderButton(NOTIFYORDER_VOLUME_ON);

                    _that.notifyOrderVolumeChange(_last_volume);
                    if(!estadoVolumen){
                        _that.notifyOrderButton(NOTIFYORDER_VOLUME_OFF);

                        jQuery(".mm-ply-mute").removeClass("silenciado");
                        jQuery(".mm-ply-volumen svg").css("left", "5px");
                        jQuery(".mm-ply-volumen span").css("width", "5px");
                    }else{
                        jQuery(".mm-ply-mute").removeClass("silenciado");
                        jQuery(".mm-ply-volumen svg").css("left", posX);
                        jQuery(".mm-ply-volumen span").css("width", posX);
                    }
                }
            });

            jQuery("#" + _data.genericData.id + "_volumen_back").bind('click', function (ev) {

                var $div = jQuery("#" + _data.genericData.id + "_volumen_back");
                //var $display = $div.find('#containerplayer_TopPlayer_barra_progreso');

                var offset = $div.offset();
                var x = (ev.clientX - offset.left - 6);
                var percent = x/$div.width();

                _that.notifyOrderButton(NOTIFYORDER_VOLUME_BAR);
                _that.notifyOrderVolumeChange(percent);

                //jQuery(".mm-ply-volumen svg").css("left", posX);
                //jQuery(".mm-ply-volumen span").css("width", posX);
            });
        }
    }
    namespace.TopSkin_podcasts = TopSkin_podcasts;

})(emic.top.ui);
