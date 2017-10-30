/**
 * Created by igomez on 06/08/2014.
 */
(function(namespace){

    TopSkin_genericv2.prototype = new emic.top.ui.UISkinBase();

    namespace.ORDER_ENABLE_BUTTONS_ON = "order_enable_buttons_on";
    namespace.ORDER_ENABLE_BUTTONS_OFF = "order_enable_buttons_off";
    namespace.ORDER_TITLE = "order_title";

    namespace.EXTERNAL_ORDER_COMPARTIR = "external_order_compartir_correo";

    function TopSkin_genericv2 (){
        emic.top.ui.UISkinBase.call(this);

        var TEXTO_PUBLI = "Contenido Publicitario";

        var soy_blanco = false;

        //los tamaños son:
        //  web:    cs-grande       cs-mediano      cs-pequeno      cs-mini
        //  móvil:  cs_mediano      cs-mediano      cs-pequeno      cs-mini

        var SIZE = "cs-grande";

        var _show_select_zonas = true;

        var _UDN_CARACOL = "caracol";
        var _UDN_OXIGENO = "oxigeno";
        var _UDN_RADIOACKTIVA = "radioacktiva";
        var _UDN_WRADIO_MX = "wradiomx";
        var _UDN_ADN_CHILE = "adnchile";
        var _UDN_CADENADIAL = "cadenadial";
        var _UDN_BESAME_CR = "besamecr";
        var _UDN_ELPAISSEMANAL = "eps";
        var _UDN_M80 = "m80";
        var _UDN_RADIOLE = "radiole";
        var _UDN_MAXIMAFM = "maximafm";
        var _UDN_TROPICANA = "tropicanacolombia";
        var _UDN_LOS40 = "los40";
        var _UDN_LOS40ANIVERSARIO = "los40aniversario";

        //elements
        var _wrapper,
            _btn_play,
            _btn_pause,
            _loaded,
            _played,
            _dot,
            _current_time,
            _total_time,
            _btn_mute,
            _btn_seek,
            _dot_vol,
            _vol,
            _vol_back,
            _play_pause,
            _vol_on,
            _vol_off,
            _loading,
            _titulo,
            _titulo2,
            _icon_sonido,
            _soy_directo,
            _soy_enlatado,
            _labelPlayer,
            _openRedes,
            _closeRedes,
            _redesActivas,
            _twitter,
            _facebook,
            _google,
            _linkedin,
            _email,
            _btnCerrarEmail,
            _btnEmbed,
            _btnCerrarEmbed,
            _layerembed,
            _formMail,
            _porcentaje,
            _barraDrag,
            _btnCambiarEmisora,
            _confEmisora,
            _btnCerrarConfEmisora,
            _btnAplicar,
            _selectZona,
            _containerSelectZona,
            _selectEmisora,
            _selectIframe,
            _codigoIframe,
            _whatsapp,
            _btnCopy,
            _inputCode,
            _btn_enviar,
            _destinatario,
            _comentario,
            _liEmbed,
            _modoPlayer,
            _estasonando,
            _porcentajeInicial,
            _llevate_el_audio,
            _btn_defaultlive;

        var _that = this;

        var _udn = "default";
        var _playerIframeId = "0";

        var _hayssddemisoras = false;

        var _currentStateButton = null;

        var codigo_iframe = '<iframe src="http://play.cadenaser.com/widget/audio/PPP/SSS"  width="WWW"  height="HHH" frameborder="0" allowfullscreen></iframe>';

        var codigo_iframe_aux = "";

        var isDragingSeek = false;
        var isDragingVolume = false;

        var soyTablet = false;

        var o_zonas,o_emisoras,ooo_zonas = [];

        var _url_compartir_emisora = "http://play.cadenaser.com/emisora/";
        var _url_compartir_enlatado = "http://play.cadenaser.com/audio/";

        var _msg_compartir_emisora = "Estoy escuchando {{emisora}} en directo ";

        //flags

        var _volSelected,
            moviendoVolumen = false,
            _isPaused = false,
            _ended = false,
            _comenzado = false,
            _flag;

        // other operating data //

        var _container,
            _data;

        var _show_embed = true,
            _show_logo = false,
            _show_emisoras = true,
            _show_share = true;

        var soyEmbed = true;

        var aux_emisoras = [];

        var _titulodirecto = "";
        var _presentador = "";

        /////////////////////////////////////////////////////////
        //  CONSTANTES
        /////////////////////////////////////////////////////////

        var iframe_sizes = [
            {"name":"940 \u00d7 102","values":{"ww":"940","hh":"102"}},
            {"name":"780 \u00d7 102","values":{"ww":"780","hh":"102"}},
            {"name":"620 \u00d7 102","values":{"ww":"620","hh":"102"}},
            {"name":"300 \u00d7 90","values":{"ww":"300","hh":"90"}},
            {"name":"Ancho total","values":{"ww":"100%","hh":"102"}}
        ];

        var _URL_TEMPLATE = "/psdmedia/media/top/skins/genericv2/assets/template.html",
            _URL_STYLE = "/psdmedia/media/top/skins/genericv2/assets/UDN/estilosSOYCSV.css",
            _URL_STYLE_EMBED = "/psdmedia/media/top/skins/genericv2/assets/UDN/estilos_embed.css",
            _CODE_NUM_PARSER_OK = 0,
            _CODE_NUM_PARSER_ERROR = 1,

            _URL_ZONAS = "http://play.cadenaser.com/service/zonageografica",
            _URL_EMISORAS = "http://play.cadenaser.com/service/emisoras",
            _URL_DIRECTO = "http://play.cadenaser.com/service/directo";

        //TODO: Responsivo, eliminar elementos si no caben, etc

        /////////////////////////////////////////////////////////
        //  UTILES
        /////////////////////////////////////////////////////////

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

        /////////////////////////////////////////////////////////
        //  INICIALIZACION
        /////////////////////////////////////////////////////////

        var _loadCSS = function(){                                  // Loading CSS main file

            _URL_STYLE = _URL_STYLE.replace("UDN",_udn);
            if(soy_blanco){
                _URL_STYLE = _URL_STYLE.replace("SOYCSV","2");
            }else{
                _URL_STYLE = _URL_STYLE.replace("SOYCSV","");
            }

            var fileref=document.createElement("link"),
                filename = _data.genericData.urlBase ? (_data.genericData.urlBase + _URL_STYLE) : _URL_STYLE;
            fileref.setAttribute("rel", "stylesheet");
            fileref.setAttribute("type", "text/css");
            fileref.setAttribute("href", filename);
            if (typeof fileref!="undefined")
                document.getElementsByTagName("head")[0].appendChild(fileref);

            if(soyEmbed){

                _URL_STYLE_EMBED = _URL_STYLE_EMBED.replace("UDN",_udn);

                var fileref=document.createElement("link"),
                    filename = _data.genericData.urlBase ? (_data.genericData.urlBase + _URL_STYLE_EMBED) : _URL_STYLE_EMBED;
                fileref.setAttribute("rel", "stylesheet");
                fileref.setAttribute("type", "text/css");
                fileref.setAttribute("href", filename);

                if (typeof fileref!="undefined")
                    document.getElementsByTagName("head")[0].appendChild(fileref);
            }
        };

        var _loadTemplate = function() {

            var _parser = new psd.framework.Parser(),
                templateMediator = new psd.framework.Mediator(),
                url = _data.genericData.urlBase ? (_data.genericData.urlBase + _URL_TEMPLATE) : _URL_TEMPLATE;
            //templateMediator.corsIE(true);
            templateMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_COMPLETE, onDataComplete, this);
            templateMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_ERROR, onDataError, this);
            templateMediator.mediate(url, _parser, psd.framework.Mediator.RESPONSE_TEXT);
        };

        var _loadZonas = function() {

            switch(_udn){
                case _UDN_CARACOL:
                case _UDN_ADN_CHILE:
                    _URL_ZONAS = "http://alacarta.caracol.com.co/service/zonageografica";
                    break;
                case _UDN_WRADIO_MX:
                    _URL_ZONAS = "http://play.wradio.com.mx/service/zonageografica";
                    break;
            }

            var _jsonParser = new psd.framework.parser.JSONParser(),
                zonasMediator = new psd.framework.Mediator(),
                url = /*_data.genericData.urlBase ? (_data.genericData.urlBase +_URL_ZONAS) :*/ _URL_ZONAS;

            zonasMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_COMPLETE, onDataCompleteZonas, this);
            zonasMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_ERROR, onDataErrorZonas, this);
            zonasMediator.mediate(url, _jsonParser, psd.framework.Mediator.RESPONSE_JSON);
        };

        var _loadEmisoras = function() {

            switch(_udn){
                case _UDN_CARACOL:
                case _UDN_ADN_CHILE:
                    _URL_EMISORAS = "http://alacarta.caracol.com.co/service/emisoras";
                break;
                case _UDN_WRADIO_MX:
                    _URL_EMISORAS = "http://play.wradio.com.mx/service/emisoras";
                break;
            }

            var _jsonParser = new psd.framework.parser.JSONParser(),
                emisorasMediator = new psd.framework.Mediator(),
                url = /*_data.genericData.urlBase ? (_data.genericData.urlBase +_URL_ZONAS) :*/ _URL_EMISORAS;

            emisorasMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_COMPLETE, onDataCompleteEmisoras, this);
            emisorasMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_ERROR, onDataErrorEmisoras, this);
            emisorasMediator.mediate(url, _jsonParser, psd.framework.Mediator.RESPONSE_JSON);
        };

        var _loadDirecto = function(){

            switch(_udn){
                case _UDN_CARACOL:
                case _UDN_ADN_CHILE:
                    _URL_DIRECTO = "http://alacarta.caracol.com.co/service/directo";
                break;
                case _UDN_WRADIO_MX:
                     _URL_DIRECTO = "http://play.wradio.com.mx/service/directo";
                break;
            }

            var _jsonParser = new psd.framework.parser.JSONParser(),
                directosMediator = new psd.framework.Mediator(),
                url = /*_data.genericData.urlBase ? (_data.genericData.urlBase +_URL_ZONAS) :*/ _URL_DIRECTO + "/" + _data.mediaData.idTOP;

            directosMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_COMPLETE, onDataCompleteDirectos, this);
            directosMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_ERROR, onDataErrorDirectos, this);
            directosMediator.mediate(url, _jsonParser, psd.framework.Mediator.RESPONSE_JSON);
        }

        //EVENTOS MEDIATOR

        var onDataComplete = function (evt)
        {
            var template;
            if (evt.result.parserResult.code == _CODE_NUM_PARSER_OK)
            {
                template = evt.result.parserResult.result.replace(/{<-%ID%->}/g,_data.genericData.id);
                _container.innerHTML = template;
                _asignElements.apply(this);
                //this.recolocarIE8();
                this.notifyInitComplete();
            }
            else if (evt.result.parserResult.code == _CODE_NUM_PARSER_ERROR)
            {
                //TODO: Error
            }
        };

        var onDataError = function (evt)
        {
            //TODO: Error
        };

        var onDataCompleteZonas = function (evt) {
            if (evt.result.parserResult.code == _CODE_NUM_PARSER_OK)
            {
                _hayssddemisoras = true;

                o_zonas = evt.result.parserResult.result;

                _loadEmisoras.apply(this);
            }
            else if (evt.result.parserResult.code == _CODE_NUM_PARSER_ERROR)
            {
                //TODO: Error
            }
        };

        var onDataErrorZonas = function(evt)
        {
            //TODO: Error
        };

        var onDataCompleteDirectos = function (evt) {
            if (evt.result.parserResult.code == _CODE_NUM_PARSER_OK)
            {
                infodirecto = evt.result.parserResult.result;

                if((infodirecto!=undefined)&&(infodirecto!="")){
                    _titulo.title = infodirecto.titulo;
                    _titulo.innerHTML= infodirecto.titulo;

                    _data.mediaData.nombrePrograma = infodirecto.titulo;

                    _titulodirecto = infodirecto.titulo;
                    _presentador = infodirecto.presentador;
                    //_titulo2.title = infodirecto.titulo;
                    //_titulo2.innerHTML= infodirecto.titulo;
                }
            }
        }

        var onDataErrorDirectos = function(evt)
        {
            //TODO: Error
        };

        var onDataCompleteEmisoras = function (evt) {

            if (evt.result.parserResult.code == _CODE_NUM_PARSER_OK)
            {
                o_emisoras = evt.result.parserResult.result;

                if(_selectIframe){

                    for(size in iframe_sizes){
                        var option = document.createElement("option");
                        option.text = iframe_sizes[size].name;
                        _selectIframe.add(option,_selectIframe.options.length);
                    }

                    _selectIframe.onchange = function(){
                        if(_selectIframe.selectedIndex>0){
                            _codigoIframe.innerHTML = codigo_iframe.replace("WWW",iframe_sizes[_selectIframe.selectedIndex-1].values.ww).replace("HHH",iframe_sizes[_selectIframe.selectedIndex-1].values.hh).replace("PPP",_data.mediaData.idTOP);
                        }
                    }
                }

                var _codigopais = 1;

                switch(_udn){
                    case _UDN_CARACOL:
                    case _UDN_ADN_CHILE:
                        _codigopais = 52;
                        break;
                    case _UDN_WRADIO_MX:
                        _codigopais = 57;
                        break;
                }

                for(zona in o_zonas["Provincia"]){
                    o_zonas.Provincia[zona].emisoras = [];
                }

                for(emisora in o_emisoras){
                    for(op in o_zonas["Provincia"]){
                        if(o_zonas.Provincia[op].IdProvincia==o_emisoras[emisora].IdProvincia){
                            o_zonas.Provincia[op].emisoras.push(o_emisoras[emisora]);
                            aux_emisoras.push(o_emisoras[emisora]);
                        }
                    }
                };

                for(zona in o_zonas["Provincia"]){
                    var _option =  new Option(o_zonas.Provincia[zona]["Provincia"], zona);

                    if(_selectZona){
                        if((o_zonas.Provincia[zona].IdPais==_codigopais)&&(o_zonas.Provincia[zona].emisoras.length>0)){
                            ooo_zonas[ooo_zonas.length] = o_zonas["Provincia"][zona];
                            _selectZona.options[_selectZona.options.length] = _option;
                        }
                    }
                }

                if(_show_select_zonas){
                    //carga los valores por defecto
                    for(emisora in ooo_zonas[0].emisoras){
                        var _optione =  new Option(ooo_zonas[_selectZona.selectedIndex].emisoras[emisora].Nombre, ooo_zonas[_selectZona.selectedIndex].emisoras[emisora].TagName);
                        if(_selectEmisora)
                            _selectEmisora.options[_selectEmisora.options.length] = _optione;
                    }

                    if(_selectZona){
                        _selectZona.onchange = function(){
                            _selectEmisora.options.length = 0;

                            for(emisora in ooo_zonas[_selectZona.selectedIndex].emisoras){
                                var _optione =  new Option(ooo_zonas[_selectZona.selectedIndex].emisoras[emisora].Nombre, ooo_zonas[_selectZona.selectedIndex].emisoras[emisora].TagName);
                                if(_selectEmisora)
                                    _selectEmisora.options[_selectEmisora.options.length] = _optione;
                            }
                        };
                    }
                }else{
                    for(i in aux_emisoras){
                        var _optione =  new Option(aux_emisoras[i].Nombre, aux_emisoras[i].TagName);
                        if(_selectEmisora)
                            _selectEmisora.options[_selectEmisora.options.length] = _optione;
                    }

                    _containerSelectZona.style.display = "none";
                }
            }
            else if (evt.result.parserResult.code == _CODE_NUM_PARSER_ERROR)
            {
                //TODO: Error
            }
        };

        var onDataErrorEmisoras = function(evt)
        {
            //TODO: Error
        };

        var _getElementById = function(id){
            return document.getElementById(_data.genericData.id + id);
        };

        var _asignElements = function(){

            //asignamos los elementos

            _wrapper = _getElementById("wrapper");
            _btn_play = _getElementById("_btn_play");
            _btn_pause = _getElementById("_btn_pause");
            _loaded = _getElementById("_loaded");
            _played = _getElementById("_played");
            _dot = _getElementById("_dot");
            _barraDrag = _getElementById("_barraCapturadora");
            _current_time = _getElementById("_current_time");
            _total_time = _getElementById("_total_time");
            _btn_mute = _getElementById("_mute");
            _btn_seek = _getElementById("_seek");
            _dot_vol = _getElementById("_dot_vol");
            _vol = _getElementById("_vol");
            _vol_back = _getElementById("_vol_back");
            _play_pause = _getElementById("_play_pause");
            _vol_on = _getElementById("_vol_on");
            _vol_off = _getElementById("_vol_off");
            _loading = _getElementById("_loading");
            _titulo = _getElementById("pistaPlayer");
            _titulo2 = _getElementById("_titulo2");
            _icon_sonido = _getElementById("_icon_sonido");
            _soy_directo = _getElementById("_soy_directo");
            _soy_enlatado = _getElementById("_soy_enlatado");
            _labelPlayer = _getElementById("labelPlayer");
            _openRedes = _getElementById("open_redes");
            _closeRedes = _getElementById("close_redes");
            _redesActivas = _getElementById("redesActivas");
            _twitter = _getElementById("twitter");
            _facebook = _getElementById("facebook");
            _google = _getElementById("google");
            _btnCambiarEmisora = _getElementById("cambiarEmisora");
            _btnCerrarConfEmisora = _getElementById("cerrarConfEmisora");
            _btnAplicar = _getElementById("aplicar");
            _confEmisora = _getElementById("confEmisora");
            _liEmbed = _getElementById("_liembed");

            _linkedin = _getElementById("linkedin");
            _email = _getElementById("email");
            _btnCerrarEmail = _getElementById("close");
            _btnEmbed = _getElementById("embed");
            _btnCerrarEmbed = _getElementById("closeembed");
            _layerembed = _getElementById("_layerembed");
            _formMail = _getElementById("_formmail");

            _selectZona = _getElementById("_select_zona");
            _containerSelectZona = _getElementById("_container_select_zona");
            _selectEmisora = _getElementById("_select_emisora");
            _selectIframe = _getElementById("_select_iframe");

            _codigoIframe = _getElementById("_code");

            _whatsapp=_getElementById("_whatsapp");
            _btnCopy = _getElementById("_copy");
            _inputCode = _getElementById("_code");
            _btn_enviar = _getElementById("enviar");
            _destinatario = _getElementById("destinatario");
            _comentario = _getElementById("comentario");
            _modoPlayer = _getElementById("_modoPlayer");

            _estasonando = _getElementById("_estasonando");
            _llevate_el_audio = _getElementById("_llevate_el_audio");

            _btn_defaultlive = _getElementById("_btn_defaultlive");

            switch(_udn){
                case _UDN_WRADIO_MX:
                    _llevate_el_audio.innerHTML = "Ll&eacute;vese el audio";
                break;
            }

            _loadCSS.apply(this);

            _btnCambiarEmisora.style.display = "block";
            if(_data.mediaData.isLive)
                _loadZonas.apply(this);

            if(_data.mediaData.autoplay==true){
                _loading.className = _loading.className.replace(/oculto/,"");
            }

            if(getDevice().mobile){
                if(navigator.userAgent.toLowerCase().indexOf("mobile")>0)
                    soyTablet = false;

                if(!soyTablet)
                    _whatsapp.style.display = "block";

                _liEmbed.style.display = "none";

                _modoPlayer.className = _modoPlayer.className + " playertop-touch playertop-ipad";
            }

            if(navigator.userAgent.indexOf('iPad')>0){
                //_modoPlayer.className = _modoPlayer.className + " playertop-ipad";
                _whatsapp.style.display = "none";
            }

            _codigoIframe.innerHTML = codigo_iframe_aux.replace("WWW",375).replace("HHH",90);

            _total_time.innerHTML = this.secondsAsTimeCode(_data.mediaData.duration/1000,"hh:mm:ss");

            var _startDragSeek = function(){
                _dot.style.left = parseInt(_played.offsetWidth) + "px";
                isDragingSeek = true;
            };

            var _dragSeek = function(){
                _played.style.width = parseInt(_dot.style.left) + "px";
                return _btn_seek.offsetWidth;
            };

            var _endDragSeek = (function(that) {
                return function(){
                    var percent = parseInt(_dot.offsetLeft)/parseInt(_btn_seek.offsetWidth);
                    that.notifyOrderSeekByProp(percent);
                }
            })(this);

            var _startDragVol = function(){
                _dot_vol.style.left = parseInt(_vol.offsetWidth) + "px";
                isDragingVolume = true;
            };

            var _dragVol = (function(that){
                return function(){
                    var percent = parseInt(_dot_vol.offsetLeft)/parseInt(_vol_back.offsetWidth);
                    _vol.style.width = parseInt(_dot_vol.style.left) + "px";

                    that.notifyOrderVolumeChange(percent);

                    return _vol_back.offsetWidth;
                }
            })(this);

            var _endDragVol = (function(that) {
                return function(){
                }
            })(this);


            if(!((psd.framework.ua.msie!=null)&&(psd.framework.ua.msie)&&(parseInt(psd.framework.ua.version)<9))) {
                var drag = new emic.top.ui.Drag(_dot,_btn_seek,_startDragSeek, _dragSeek, _endDragSeek);
                drag.registrarDragFromParent();

                var dragVol = new emic.top.ui.Drag(_dot_vol,_vol_back,_startDragVol, _dragVol, _endDragVol);
                dragVol.registrarDragFromParent();
            }

            _btn_pause.onclick = (function(that) {
                return function(){
                    that.notifyOrderPause();
                    _isPaused = true;
                }
            })(this);

            _btn_mute.onclick = (function(that){
                return function(){
                    that.notifyOrderMute();
                }
            })(this);

            _btn_seek.onclick = (function(that){

                return function(e){
                    if(isDragingSeek == true){
                        isDragingSeek = false;
                        return;
                    }

                    var prop;

                    isDragingSeek = false;

                    if (e.offsetX) {
                        prop = e.offsetX/_btn_seek.offsetWidth;
                    } else {
                        prop = e.layerX/_btn_seek.offsetWidth;
                    }

                    that.notifyOrderSeekByProp(prop);
                }
            })(this);

            _vol_back.onclick = (function(that){
                return function(e){
                    if(isDragingVolume == true){
                        isDragingVolume = false;
                        return;
                    }

                    isDragingVolume = false;

                    var prop;

                    if (e.offsetX) {
                        prop = e.offsetX/_vol_back.offsetWidth;
                    } else {
                        prop = e.layerX/_vol_back.offsetWidth;
                    }

                    that.notifyOrderVolumeChange(prop);
                }})(this);

            _openRedes.onclick = (function(that) {
                return function(){
                    _redesActivas.className += " redes-active";
                }
            })(this);

            _closeRedes.onclick = (function(that) {
                return function(){
                    _redesActivas.className = "redes";
                }
            })(this);

            _google.onclick = (function(that) {
                return  function(){
                    var refer = window.location.href;

                    var refUrl = "https://plus.google.com/share?url=" + refer;


                    window.open(refUrl,'_blank');
                }
            })(this);

            _linkedin.onclick = (function (that) {//--jacob linkedin

                return  function () {

                    var refer = window.location.href;

                    var refUrl = "https://www.linkedin.com/cws/share?url=" + refer;

                    window.open(refUrl, '_blank');

                }

            })(this);

            _email.onclick = (function(that) {//--jacob email

                return  function(){

                    _formMail.style.display = "inline";
                    _layerembed.style.display = "none";
                }

            })(this);

            _btnCerrarEmail.onclick = (function (that) {
                return  function () {
                    _formMail.style.display = "none";
                }
            })(this);

            _btnCerrarEmbed.onclick = (function (that)
            {
                return  function () {
                    _selectIframe.selectedIndex = 0;
                    _layerembed.style.display = "none";
                    _formMail.style.display = "none";
                }

            })(this);

            _btnCambiarEmisora.onclick = (function(that){
                return function(){
                    _confEmisora.style.display = "block";
                }
            })(this);

            _btnCerrarConfEmisora.onclick = (function(that){
                return function(){
                    _confEmisora.style.display = "none";
                }
            })(this);

            _btnCopy.onclick=(function(that) {
                return  function () {
                    var input = _inputCode;
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
                        _inputCode.focus();
                        _inputCode.select();
                    }
                    else {
                        SelectContent(forExecElement);
                        _inputCode.focus();
                        _inputCode.select();
                        _btnCopy.innerHTML = "Pulsa Ctrl+C";
                    }
                }
            })(this);

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
            }

            function SelectContent(element) {
                var rangeToSelect = document.createRange();
                rangeToSelect.selectNodeContents(element);
                var selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(rangeToSelect);
            }

            _btn_enviar.onclick = (function(that){
                return function(){
                    var _dataSend = [];
                    _dataSend[0] = _destinatario.value;
                    _dataSend[1] = _comentario.value;
                    that.notifyOrderExternal(namespace.EXTERNAL_ORDER_COMPARTIR,_dataSend);
                }
            })(this);

            setSkin.apply(this);

        };

        //This function will have all the logic we need to do also in the reset function
        var setSkin = function()
        {
            _titulodirecto = "";
            _presentador = "";

            if( (_udn==_UDN_WRADIO_MX)&&
                (_data.mediaData.defaultLive!=""))
                _btn_defaultlive.style.display = "block";

            _selectIframe.selectedIndex = 0;
            _confEmisora.style.display = "none"; //Cerramos botón emisoras

            //Cerramos embed
            _layerembed.style.display = "none";
            _formMail.style.display = "none";

            _titulo.title = _data.mediaData.title;
            _titulo.innerHTML= _data.mediaData.title;
            _titulo2.title = _data.mediaData.title;
            _titulo2.innerHTML= _data.mediaData.title;

            if(_data.mediaData.isLive)
                _loadDirecto.apply(this);

            if(_data.uiData.skinData.show_embed!=undefined){
                _show_embed = _data.uiData.skinData.show_embed;
            }

            if(!_show_embed){
                _btnEmbed.style.display = "none";
            }

            if(_data.uiData.skinData.show_logo!=undefined){
                _show_logo = _data.uiData.skinData.show_logo;
            }

            if(_data.uiData.skinData.show_share!=undefined){
                _show_share = _data.uiData.skinData.show_share;
            }

            if(!_show_share){
                _openRedes.style.display = "none";
            }

            if(_show_logo){
                _modoPlayer.className += " playertop-embebido";
                _estasonando.style.display = "none";
            }

            if(_data.uiData.skinData.show_emisoras!=undefined){
                _show_emisoras = _data.uiData.skinData.show_emisoras;
            }

            if(!_show_emisoras){
                _btnCambiarEmisora.style.display = "none";
            }

            if(_data.uiData.skinData.size!=undefined){
                SIZE = _data.uiData.skinData.size;

                if(getDevice().mobile){
                    if(SIZE == "cs-grande")
                        SIZE = "cs-mediano";
                }

                if(SIZE!="cs-grande"){
                    _titulo2.style.display = "none";
                }
            }

            _modoPlayer.className = _modoPlayer.className.replace("cs-grande",SIZE);

            if(_data.mediaData.isLive){
                _soy_directo.style.display = 'block';
                _soy_enlatado.style.display = 'none';
                _labelPlayer.innerHTML = "EN DIRECTO";

//                _modoPlayer.className += "en-directo";
                _modoPlayer.className = _modoPlayer.className.replace("a-la-carta","en-directo");
            }else{
                _soy_directo.style.display = 'none';
                _soy_enlatado.style.display = 'block';

                _labelPlayer.innerHTML = "AUDIO";

                if((_udn==_UDN_CARACOL)||
                    (_udn==_UDN_CADENADIAL)||
                    (_udn==_UDN_LOS40)||
                    (_udn==_UDN_M80)||
                    (_udn==_UDN_RADIOLE)||
                    (_udn==_UDN_MAXIMAFM)||
                    (_udn==_UDN_TROPICANA)||
                    (_udn==_UDN_LOS40ANIVERSARIO)
                )
                {
                    _labelPlayer.innerHTML = "A LA CARTA";
                }

                //_modoPlayer.className += "a-la-carta";
            }

            if(_udn==_UDN_OXIGENO){
                _labelPlayer.innerHTML = "OXIGENO";
            }

            if(_udn==_UDN_TROPICANA){
                _labelPlayer.innerHTML = "Tropicana";
            }

            if(_udn==_UDN_ADN_CHILE){
                _labelPlayer.innerHTML = "EN VIVO";
            }

            if(_data.mediaData.duration){
                if((_data.mediaData.duration!="")&&(_data.mediaData.duration!=null)&&(_data.mediaData.duration>0)){
                    var _length = _data.mediaData.duration / 1000;
                    _total_time.innerHTML = this.secondsAsTimeCode(_length,"hh:mm:ss");
                    _current_time.innerHTML = this.secondsAsTimeCode(_length,"hh:mm:ss");
                }
            }

            _btn_play.onclick = (function(that) {
                return function(){
                    if(!_comenzado){
                        //_btn_pause.className = _btn_pause.className.replace(/oculto/g,"");
                        _loading.className = _loading.className.replace(/oculto/,"");
                        _btn_play.className += " oculto";
                    }

                    //_loading.className = _loading.className.replace("oculto","");

                    _comenzado = true;

                    that.notifyOrderPlay();
                    _isPaused = false;
                }
            })(this);

            _twitter.onclick = (function(that){
                return function(){
                    if (_data.mediaData.description == "{}")
                        _data.mediaData.description = " ";

                    var content = _data.mediaData.title;
                    if (content.length > 100)
                        content = content.substr(0, 100)+"...";
                    var refer = window.location.href;

                    var refUrl = " https://twitter.com/intent/tweet?text=";
                    var _via = "PRISA";
                    var _radio = "";

                    switch(_udn){
                        case _UDN_RADIOACKTIVA:
                            _via = "radioacktiva_";
                            break;
                        case _UDN_OXIGENO:
                            _via = "oxigenofm";
                            break;
                        case _UDN_CARACOL:
                        case _UDN_ADN_CHILE:
                            _via = "caracolradio";
                            if(_data.mediaData.title!="Caracol FM")
                                _radio = "";

                            if(_data.mediaData.isLive){
                                if((_titulodirecto!="")&&(_presentador!="")){
                                    _msg_compartir_emisora = "Estoy escuchando " + _titulodirecto + " con " + _presentador + " en directo por Caracol Radio"
                                }

                                content = _msg_compartir_emisora.replace("{{emisora}}",_radio + _data.mediaData.title);
                                refer = _url_compartir_emisora + _data.mediaData.idTOP;
                            }
                            else{
                                refer = _url_compartir_enlatado + _data.mediaData.idTOP;
                            }

                            break;
                        case _UDN_WRADIO_MX:
                            _via = "wradiomexico";
                            break;
                        case _UDN_CADENADIAL:
                            _via = "Cadena_Dial";
                            break;
                        case _UDN_M80:
                            _via = "m80radio_";
                            break;
                        case _UDN_RADIOLE:
                            _via = "Radiole_oficial";
                            break;
                        case _UDN_MAXIMAFM:
                            _via = "maximafm_radio";
                            break;
                        case _UDN_TROPICANA:
                            _via = "Tropibogota";
                            break;
                        case _UDN_LOS40ANIVERSARIO:
                            _via = "Los40_Spain"
                            break;
                        case _UDN_LOS40:
                            _via = "Los40_Spain";
                            break;
                        case _UDN_BESAME_CR:
                            _via = "besamecr";
                            break;
                        case _UDN_ELPAISSEMANAL:
                            _via = "elpaissemanal";
                            break;
                    }

                    refUrl += encodeURI(content);
                    refUrl += "&via=";
                    refUrl += _via;
                    refUrl += "&url=";
                    refUrl += refer;
                    window.open(refUrl,'_blank');
                    //that.notifyOrderShareTwitter();   // Descomentar cuando tengamos el AdModule correcto para cualquier usuario (ahora está a fuego para Playser)
                    // Entonces quitar las lineas anteriores
                }
            })(this);

            _facebook.onclick = (function(that){
                return function(){
                    var refer = window.location.href;
                    var text = "";

                    var _radio = "";

                    switch(_udn){
                        case _UDN_CARACOL:
                        case _UDN_ADN_CHILE:
                            if(_data.mediaData.title!="Caracol FM")
                                _radio = "";

                                if(_data.mediaData.isLive){
                                    refer = _url_compartir_emisora + _data.mediaData.idTOP;
                                    text = _msg_compartir_emisora.replace("{{emisora}}",_radio + _data.mediaData.title);
                                }
                                else{
                                    refer = _url_compartir_enlatado + _data.mediaData.idTOP;
                                    text = _data.mediaData.title + "-" + _data.mediaData.description
                                }
                            break;
                    }

                    var refUrl = "https://www.facebook.com/sharer/sharer.php?u=" + refer + "&t=" + encodeURI(text);
                    window.open(refUrl, '_blank');
                }
            })(this);

            _btnEmbed.onclick = function () {//--jacob embed

                /*
                var setting = _that.getPlayer().getLauncher().getEmbed().getSettings();

                if(setting.id_player_embed!=undefined){
                    codigo_iframe = codigo_iframe.replace("SSS",setting.id_player_embed);
                    //codigo_iframe = codigo_iframe.replace("/SSS","");
                }
                else{
                    codigo_iframe = codigo_iframe.replace("SSS",setting.id_player);
                    //codigo_iframe = codigo_iframe.replace("/SSS","");
                }
                */

                var playeriframe = _data.genericData.id_player;
                if(_playerIframeId!="0")
                    playeriframe = _playerIframeId;

                codigo_iframe = codigo_iframe.replace("SSS",playeriframe);

                codigo_iframe_aux = codigo_iframe.replace("PPP",_data.mediaData.idTOP);

                _codigoIframe.innerHTML = codigo_iframe_aux.replace("WWW","100%").replace("HHH","102");

                _formMail.style.display = "none";
                _layerembed.style.display = "inline";
            };

            _btn_defaultlive.onclick = function(){

                if(_data.mediaData.defaultLive=="")
                    return;

                var embed = _that.getPlayer().getLauncher().getEmbed();
                var config = embed.getSettings();

                if( (config.topPlayer!=undefined)&&(config.topPlayer.ad!=undefined)&& (config.topPlayer.ad.container!=undefined))
                    document.getElementById(config.topPlayer.ad.container).innerHTML = "";

                config.id_media = _data.mediaData.defaultLive;

                if(config.topPlayer){
                    config.topPlayer.media.autoplay  = true;
                }

                _that.notifyOrderChangeLive(_data.mediaData.defaultLive);

                embed.init(config);
            }

            _btnAplicar.onclick = function()
            {
                /*
                var embed = _that.getPlayer().getLauncher().getEmbed();
                var config = embed.getSettings();

                if( (config.topPlayer!=undefined)&&(config.topPlayer.ad!=undefined)&& (config.topPlayer.ad.container!=undefined))
                    document.getElementById(config.topPlayer.ad.container).innerHTML = "";

                if(config.topPlayer){
                    config.topPlayer.media.autoplay  = true;
                }

                _that.notifyOrderChangeLive(config.id_media);

                embed.init(config);
                */

                var media  = null;

                if(_show_select_zonas)
                    media = ooo_zonas[_selectZona.selectedIndex].emisoras[_selectEmisora.selectedIndex].TagName;
                else
                    media = _selectEmisora.options[_selectEmisora.selectedIndex].value;

                var _launcher = _that.getPlayer().getLauncher();
                _launcher.reset(undefined,_data.genericData.id_cuenta,media,{"player":{"autoplay":true}});
            };

            _whatsapp.onclick = (function(that) {//--jacob linkedin
                return  function(){

                    var refer = window.location.href;

                    if(_data.mediaData.isLive){
                        refer = _url_compartir_emisora + _data.mediaData.idTOP;
                    }
                    else{
                        refer = _url_compartir_enlatado + _data.mediaData.idTOP;
                    }

                    var refUrl = "whatsapp://send?text=" + refer;
                    window.open(refUrl,'_blank');
                }
            })(this);
        }

        this.init = function(data) {

            _data = data;
            _container = document.getElementById(_data.internalData.skinContainer);

            _udn = _data.uiData.skinData.udn;

            if((_data.uiData.skinData.playerIframeId!="0")&&(_data.uiData.skinData.playerIframeId!=undefined))
                _playerIframeId = _data.uiData.skinData.playerIframeId;

            if(_data.uiData.skinData.soy_blanco!=undefined){
                soy_blanco = _data.uiData.skinData.soy_blanco;
            }


            switch(_udn){
                case _UDN_CARACOL:
                case _UDN_ADN_CHILE:
                    _show_select_zonas = false;

                    codigo_iframe = '<iframe src="http://alacarta.caracol.com.co/widget/audio/PPP/"  width="WWW"  height="HHH" frameborder="0" allowfullscreen></iframe>';
                    _url_compartir_emisora = "http://alacarta.caracol.com.co/emisora/";
                    _url_compartir_enlatado = "http://alacarta.caracol.com.co/audio/";
                    break;
                case _UDN_WRADIO_MX:
                    _show_select_zonas = false;

                    codigo_iframe = '<iframe src="http://play.wradio.com.mx/widget/audio/PPP/"  width="WWW"  height="HHH" frameborder="0" allowfullscreen></iframe>';
                    _url_compartir_emisora = "http://play.wradio.com.mx/emisora/";
                    _url_compartir_enlatado = "http://play.wradio.com.mx/audio/";

                    break;
                case _UDN_CADENADIAL:
                    codigo_iframe = '<iframe src="http://instanceplayer.prisasd.com/embed/cadenadial/audio/SSS/PPP/"  width="WWW"  height="HHH" frameborder="0" allowfullscreen></iframe>';
                    break;
                case _UDN_M80:
                    codigo_iframe = '<iframe src="http://instanceplayer.prisasd.com/embed/m80radio/audio/SSS/PPP/"  width="WWW"  height="HHH" frameborder="0" allowfullscreen></iframe>';
                    break;
                case _UDN_RADIOLE:
                    codigo_iframe = '<iframe src="http://instanceplayer.prisasd.com/embed/radiole/audio/SSS/PPP/"  width="WWW"  height="HHH" frameborder="0" allowfullscreen></iframe>';
                    break;
                case _UDN_MAXIMAFM:
                    codigo_iframe = '<iframe src="http://instanceplayer.prisasd.com/embed/maximafm/audio/SSS/PPP/"  width="WWW"  height="HHH" frameborder="0" allowfullscreen></iframe>';
                    break;
                case _UDN_TROPICANA:
                    codigo_iframe = '<iframe src="http://instanceplayer.prisasd.com/widget/v1/player/tropicanacolombia/audio/SSS/PPP"  width="WWW"  height="HHH" frameborder="0" allowfullscreen></iframe>';
                    break;
                case _UDN_LOS40:
                case _UDN_LOS40ANIVERSARIO:
                    codigo_iframe = '<iframe src="http://instanceplayer.prisasd.com/embed/los40/audio/SSS/PPP/"  width="WWW"  height="HHH" frameborder="0" allowfullscreen></iframe>';
                    break;

            }


            _loadTemplate.apply(this);
        };

        this.reset = function ()
        {
            setSkin.apply(this);
        };

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
        }

        this.resize = function(width, height){};

        this.onProgress = function(data){
            var percent = (data.currentTime *100/data.totalTime);
            _procentajeInicial = percent;

            if(!isDragingSeek){
                //_loaded.style.width = percent + "%";
                _played.style.width = percent + "%";
                _dot.style.left = percent + "%";
            }

            _total_time.innerHTML = this.secondsAsTimeCode(data.totalTime,"hh:mm:ss");
            _current_time.innerHTML = this.secondsAsTimeCode(data.currentTime,"hh:mm:ss");
            _total_time.style.visibility = "visible";
            _current_time.style.visibility = "visible";

        };

        this.onVolumeChange = function(offset){
            var percent = offset*100;

            if(_vol==undefined){
                return;
            }

            _vol.style.width = percent + "%";
            _dot_vol.style.left = percent + "%";

            if(offset==0){
                _vol_off.className = _vol_off.className.replace("oculto","");
                _vol_on.className = _vol_on.className.replace("oculto","");
                _vol_on.className += " oculto";
            }else{
                _vol_on.className = _vol_on.className.replace("oculto","");
                _vol_off.className = _vol_off.className.replace("oculto","");
                _vol_off.className += " oculto";
            }
        };
        this.onSeekComplete = function(offset){
            _changeToMediaClass.apply(this);
        };

        var _changeToMediaClass = function(){
            if (_data.internalData.position == emic.top.TopPlayer.POSITION_MEDIA)
                if (_isPaused) {
                    _btn_play.className = _btn_play.className.replace("oculto","");
                } else{
                    _btn_pause.className = _btn_pause.className.replace("oculto","");
                }
        };

        this.onBufferEmpty = function(){
            _ended = false;
            _loading.className = _loading.className.replace(/ oculto/,"");
            _showLoading.apply(this, [true]);

            //_icon_sonido.className = _icon_sonido.className.replace(/ on/g,"");
        };
        this.onBufferFull = function(){
            _loading.className = _loading.className + " oculto";
            if (_ended){
                _btn_play.className = -_btn_play.className.replace(/ on/g,"");
                _btn_pause.className = -_btn_pause.className.replace(/ oculto/,"");
            }
            _showLoading.apply(this, [false]);

            //if(!_isPaused)
            //  _icon_sonido.className += " on";
        };
        this.showLoading = function (flag) {
            _showLoading.apply(this, [flag]);
        };
        var _showLoading = function(flag){
            var inValid = (psd.framework.ua.msie!=null)&&(psd.framework.ua.msie)&&(parseInt(psd.framework.ua.version)<10);
            if(!inValid)
                if (flag) {
                    _loading.className = _loading.className.replace(/ on/g,"");
                } else {
                    if (_ended){
                        btn_pause.className = _btn_pause.className.replace(/ oculto/,"");
                    }
                }

        };

        this.externalOrder = function(order, params){
            switch(order){
                case namespace.ORDER_ENABLE_BUTTONS_ON:
                    _enableButtons.apply(this, [true]);
                    break;
                case namespace.ORDER_ENABLE_BUTTONS_OFF:
                    _enableButtons.apply(this, [false]);
                    break;
                case namespace.ORDER_TITLE:
                    _title.innerHTML = params;
                    break;
            }
        };

        var _enableButtons = function(value){
        };

        this.onStatusChange = function(status){
            switch (status){
                case emic.top.MediaModule.STATUS_STOP:
                case emic.top.MediaModule.STATUS_PAUSE:
                case emic.top.AdModule.STATUS_PAUSE:

                    //if(_data.mediaData.isLive){
                    if(_loading.className.indexOf("oculto")<1)
                        _loading.className += " oculto";
                    //}

                    _isPaused = true;
                    _btn_play.className = _btn_play.className.replace(/oculto/g,"");
                    _btn_pause.className += " oculto";
                    _icon_sonido.className = _icon_sonido.className.replace(/ on/g,"");
                    //_loading.className = _loading.className + " oculto";
                    break;
                case emic.top.MediaModule.STATUS_PLAY:
                case emic.top.AdModule.STATUS_PLAY:

                    //if(_data.mediaData.isLive){
                    if(_loading.className.indexOf("oculto")<1)
                        _loading.className += " oculto";
                    //}

                    _isPaused = false;
                    _btn_pause.className = _btn_pause.className.replace(/oculto/g,"");
                    _btn_play.className += " oculto";
                    _icon_sonido.className += " on";
                    //_loading.className = _loading.className + " oculto";
                    break;
                case emic.top.event.MediaEvent.ON_MEDIA_END:
                    /*_ended = true;
                    _btn_pause.className = _btn_pause.className.replace(/oculto/g,"");
                    _btn_play.className = _btn_play.className.replace(/ on/g,"");
                    _icon_sonido.className += " oculto";*/
                    break;
                case emic.top.AdModule.STATUS_STOP:
                    break;
                case emic.top.AdModule.PUBLI_SKIPPED:
                    _current_time.innerHTML = "00:00:00";
                    _total_time.style.visibility = "hidden";
                    break;
            }
        };

        this.onPositionChange = function(position) {

            switch(position) {
                case emic.top.TopPlayer.POSITION_PREVIEW:
                    _current_time.innerHTML = "00:00:00";
                    _played.style.width = 0 + "%";
                    //_loaded.style.width = 0 + "%";
                    _dot.style.left = 0 + "%";

                    /*if(_flag) {
                     _ended = true;
                     _btn_pause.className = _btn_pause.className.replace(/oculto/g,"");
                     } else {
                     _ended = false;
                     }*/

                    _icon_sonido.className = _icon_sonido.className.replace(/ on/g,"");
                    _btn_play.className = _btn_play.className.replace(/oculto/g,"");
                    _btn_pause.className += " oculto";

                    break;
                case emic.top.TopPlayer.POSITION_AD_PREROLL:
                    _played.style.width = 0 + "%";
                    //_loaded.style.width = 0 + "%";
                    _dot.style.left = 0 + "%";
                    break;
            }
        };

        this.onMetadata = function(metadata){};
        this.onCue = function(data){};
        this.onError = function(msg, code){};
        this.onSwitchRequest = function(id){};
        this.onSwitchComplete = function(id){};
        this.requestFullScreen = function(){};
        this.cancelFullScreen = function(){};
        this.onSeekStart = function(offset){};
        this.onSeekComplete = function(offset){};
    }
    namespace.TopSkin_genericv2 = TopSkin_genericv2;

})(emic.top.ui);