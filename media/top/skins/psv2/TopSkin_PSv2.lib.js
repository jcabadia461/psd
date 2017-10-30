/**
 * Created by igomez on 06/08/2014.
 */
(function(namespace){

    TopSkin_PSv2.prototype = new emic.top.ui.UISkinBase();

    namespace.ORDER_ENABLE_BUTTONS_ON = "order_enable_buttons_on";
    namespace.ORDER_ENABLE_BUTTONS_OFF = "order_enable_buttons_off";
    namespace.ORDER_TITLE = "order_title";

    namespace.EXTERNAL_ORDER_COMPARTIR = "external_order_compartir_correo";

    function TopSkin_PSv2 (){
        emic.top.ui.UISkinBase.call(this);

        var TEXTO_PUBLI = "Contenido Publicitario";

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
            _titulo_b,
            _titulo_b_duplicado,
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
            _timeout = null,
            _porcentajeInicial;
        //_zonas = [],
            //_emisoras = [],

        var _that = this;

        var _hayssddemisoras = false;

        var _currentStateButton = null;

        //var codigo_iframe = "<iframe width='WWW' height='HHH' src='http://play.cadenaser.com/widget/audio/SSS/PPP/' frameborder='0' allowfullscreen></iframe>";
        //var codigo_iframe = '<iframe src="http://webfastapi.top.des.prisadigital.int/embed/playser/audio/SSS/PPP"  width="WWW"  height="HHH" frameborder="0" allowfullscreen></iframe>';
        var codigo_iframe = '<iframe src="http://play.cadenaser.com/widget/audio/PPP"  width="WWW"  height="HHH" frameborder="0" allowfullscreen></iframe>';

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
            _show_emisoras = true;

        var soyEmbed = true;

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

        var _URL_TEMPLATE = "/psdmedia/media/top/skins/psv2/assets/template.html",
            _URL_STYLE = "/psdmedia/media/top/skins/psv2/assets/estilos.css",
            _URL_STYLE_EMBED = "/psdmedia/media/top/skins/psv2/assets/estilos_embed.css",
            _CODE_NUM_PARSER_OK = 0,
            _CODE_NUM_PARSER_ERROR = 1,
            //_URL_ZONAS = "http://playerint.top.prisasd.com/psdmedia/media/top/tests/zonas.js",
            //_URL_EMISORAS = "http://playerint.top.prisasd.com/psdmedia/media/top/tests/emisoras.js";

            //_URL_ZONAS = "http://playserweb.des.prisadigital.int/service/zonageografica",
            //_URL_EMISORAS = "http://playserweb.des.prisadigital.int/service/emisoras";

            _URL_ZONAS = "http://play.cadenaser.com/service/zonageografica",
            _URL_EMISORAS = "http://play.cadenaser.com/service/emisoras",
            _URL_DIRECTO = "http://play.cadenaser.com/service/directo";

        //TODO: Responsivo, eliminar elementos si no caben, etc

        /////////////////////////////////////////////////////////
        //  INICIALIZACION
        /////////////////////////////////////////////////////////

        var _loadCSS = function(){                                  // Loading CSS main file

            if(((psd.framework.ua.msie!=null)&&(psd.framework.ua.msie))){
                var head = document.getElementsByTagName("head")[0];
                head.innerHTML += '<link rel="stylesheet" type="text/css" href="http://playser.player-top.prisasd.com/psdmedia/media/top/skins/psv2/assets/css/player_desktop.css" />' +
                    '<link rel="stylesheet" media="screen and (max-width: 999px)" href="http://playser.player-top.prisasd.com/psdmedia/media/top/skins/psv2/assets/css/player_tablet.css" />' +
                    '<link rel="stylesheet" media="screen and (max-width: 730px)" href="http://playser.player-top.prisasd.com/psdmedia/media/top/skins/psv2/assets/css/player_tablet_movil.css" />' +
                    '<link rel="stylesheet" media="screen and (max-width: 650px)" href="http://playser.player-top.prisasd.com/psdmedia/media/top/skins/psv2/assets/css/player_movil.css" />';

            }else{
                var fileref=document.createElement("link"),
                    filename = _data.genericData.urlBase ? (_data.genericData.urlBase + _URL_STYLE) : _URL_STYLE;
                fileref.setAttribute("rel", "stylesheet");
                fileref.setAttribute("type", "text/css");
                fileref.setAttribute("href", filename);
                if (typeof fileref!="undefined")
                    document.getElementsByTagName("head")[0].appendChild(fileref);
            }

            if(soyEmbed){
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
            var _jsonParser = new psd.framework.parser.JSONParser(),
                zonasMediator = new psd.framework.Mediator(),
                url = /*_data.genericData.urlBase ? (_data.genericData.urlBase +_URL_ZONAS) :*/ _URL_ZONAS;

            zonasMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_COMPLETE, onDataCompleteZonas, this);
            zonasMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_ERROR, onDataErrorZonas, this);
            zonasMediator.mediate(url, _jsonParser, psd.framework.Mediator.RESPONSE_JSON);
        };

        var _loadEmisoras = function() {
            var _jsonParser = new psd.framework.parser.JSONParser(),
                emisorasMediator = new psd.framework.Mediator(),
                url = /*_data.genericData.urlBase ? (_data.genericData.urlBase +_URL_ZONAS) :*/ _URL_EMISORAS;

            emisorasMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_COMPLETE, onDataCompleteEmisoras, this);
            emisorasMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_ERROR, onDataErrorEmisoras, this);
            emisorasMediator.mediate(url, _jsonParser, psd.framework.Mediator.RESPONSE_JSON);
        };

        var _loadDirecto = function(){
            var _jsonParser = new psd.framework.parser.JSONParser(),
                directosMediator = new psd.framework.Mediator(),
                url = /*_data.genericData.urlBase ? (_data.genericData.urlBase +_URL_ZONAS) :*/ _URL_DIRECTO + "/" + _data.mediaData.idTOP + "?time=" + Math.random();

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
                    _titulo_b.title = infodirecto.titulo;
                    _titulo_b.innerHTML= infodirecto.titulo;

                    _data.mediaData.nombrePrograma = infodirecto.titulo;

                    if(_data.mediaData.isLive)
                        _timeout = setTimeout(function(){
                            clearTimeout(_timeout);
                            _timeout = null;
                            _loadDirecto();
                        },300000);
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
                var _codigoandorra = 6;

                for(zona in o_zonas["Provincia"]){
                    o_zonas.Provincia[zona].emisoras = [];
                }

               //console.log(o_emisoras);

                for(emisora in o_emisoras){
                    for(op in o_zonas["Provincia"]){
                        if(o_zonas.Provincia[op].IdProvincia==o_emisoras[emisora].IdProvincia){
                            o_zonas.Provincia[op].emisoras.push(o_emisoras[emisora]);
                        }
                    }
                    //o_zonas.Provincia[o_emisoras[emisora]["IdProvincia"]-1].emisoras.push(o_emisoras[emisora]);
                }

                //console.log(o_zonas);

                for(zona in o_zonas["Provincia"]){
                    var _option =  new Option(o_zonas.Provincia[zona]["Provincia"], zona);

                    if(_selectZona){
                        if(((o_zonas.Provincia[zona].IdPais==_codigopais))||(o_zonas.Provincia[zona].IdPais==_codigoandorra)){
                            ooo_zonas[ooo_zonas.length] = o_zonas["Provincia"][zona];
                            _selectZona.options[_selectZona.options.length] = _option;
                        }
                    }
                }
                for(emisora in ooo_zonas[0].emisoras){
                    var _optione =  new Option(ooo_zonas[_selectZona.selectedIndex].emisoras[emisora].Nombre, ooo_zonas[_selectZona.selectedIndex].emisoras[emisora].TagName);
                    if(_selectEmisora)
                        _selectEmisora.options[_selectEmisora.options.length] = _optione;
                }

                if(_selectZona){
                    _selectZona.onchange = function(){
                        /*
                         for(opcion=0;opcion<_selectEmisora.options.length;opcion++){
                         //for (opcion in _selectEmisora.options) {
                         if(_selectEmisora)
                         //_selectEmisora.options[opcion] = null;
                         //_selectEmisora.removeChild(_selectEmisora.options[opcion]);
                         }
                         */
                        _selectEmisora.options.length = 0;

                        for(emisora in ooo_zonas[_selectZona.selectedIndex].emisoras){
                            var _optione =  new Option(ooo_zonas[_selectZona.selectedIndex].emisoras[emisora].Nombre, ooo_zonas[_selectZona.selectedIndex].emisoras[emisora].TagName);
                            if(_selectEmisora)
                                _selectEmisora.options[_selectEmisora.options.length] = _optione;
                        }
                    };
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
            _titulo_b = _getElementById("_titulo_b");
            _titulo_b_duplicado = _getElementById("_titulo_b_duplicado");
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

            _loadZonas.apply(this);

            _btnCambiarEmisora.style.display = "block";

            if(_data.mediaData.autoplay==true){
                _loading.className = _loading.className.replace(/oculto/,"");
            }

            if(getDevice().mobile){
                if(navigator.userAgent.toLowerCase().indexOf("mobile")>0)
                    soyTablet = false;

                if(!soyTablet)
                    _whatsapp.style.display = "block";

                _liEmbed.style.display = "none";

                _modoPlayer.className = _modoPlayer.className + " player-touch player-ipad";
            }

            if(navigator.userAgent.indexOf('iPad')>0){
                //_modoPlayer.className = _modoPlayer.className + " player-ipad";
                _whatsapp.style.display = "none";
            }

            _codigoIframe.innerHTML = codigo_iframe_aux.replace("WWW",375).replace("HHH",90);

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
                if(getDevice().mobile){
                    var dragC = new emic.top.ui.DragContainer(_titulo,_dot,_startDragSeek,_dragSeek,_endDragSeek,0,_barraDrag.offsetWidth);
                    var dragC2 = new emic.top.ui.DragContainer(_soy_enlatado,_dot,_startDragSeek,_dragSeek,_endDragSeek,0,_barraDrag.offsetWidth);

                    dragC.registrarDrag();
                    dragC2.registrarDrag();
                }else{
                    var drag = new emic.top.ui.Drag(_dot,_btn_seek,_startDragSeek, _dragSeek, _endDragSeek);
                    drag.registrarDragFromParent();

                    var dragVol = new emic.top.ui.Drag(_dot_vol,_vol_back,_startDragVol, _dragVol, _endDragVol);
                    dragVol.registrarDragFromParent();
                }
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
                        
                        if(!getDevice().mobile)
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
                }
            })(this);


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

            _btnCerrarEmail.onclick = (function (that)
            {
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
                }})(this);

            _btnCerrarConfEmisora.onclick = (function(that){
                return function(){
                    _confEmisora.style.display = "none";
                }})(this);


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
            if(_timeout!=null)
                clearTimeout(_timeout);

            _selectIframe.selectedIndex = 0;
            _confEmisora.style.display = "none"; //Cerramos botón emisoras

            //Cerramos embed
            _layerembed.style.display = "none";
            _formMail.style.display = "none";

            _titulo_b_duplicado.title = "";
            _titulo_b_duplicado.innerHTML = "";
            _titulo_b.title = _data.mediaData.title;
            _titulo_b.innerHTML = _data.mediaData.title;
            _titulo2.title = _data.mediaData.title;
            _titulo2.innerHTML= _data.mediaData.title;

            _titulo_b.onclick = (function(that){
                return function(){
                    that.notifyOrderExternal("title_click",{"idTOP":_data.mediaData.idTOP,"islive":_data.mediaData.isLive});
                }
            })(this);
            _titulo_b_duplicado.onclick = (function(that){
                return function(){
                    that.notifyOrderExternal("title_click",{"idTOP":_data.mediaData.idTOP,"islive":_data.mediaData.isLive});
                }
            })(this);

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
            if(_show_logo){
                _modoPlayer.className += " player-embebido";
                _estasonando.style.display = "none";
            }

            if(_data.uiData.skinData.show_emisoras!=undefined){
                _show_emisoras = _data.uiData.skinData.show_emisoras;
            }
            if(!_show_emisoras){
                _btnCambiarEmisora.style.display = "none";
            }

            _total_time.innerHTML = this.secondsAsTimeCode(_data.mediaData.duration/1000,"hh:mm:ss");

            /*  if(!((psd.framework.ua.msie!=null)&&(psd.framework.ua.msie)&&(parseInt(psd.framework.ua.version)<9))) {
             var drag = new emic.top.ui.Drag(_dot,_btn_seek,_startDrag, _seekDrag, _endDrag);
             drag.registrarDragFromParent();
             }*/
            if(_data.mediaData.isLive){
                _soy_directo.style.display = 'block';
                _soy_enlatado.style.display = 'none';
                _labelPlayer.innerHTML = "EN DIRECTO";

                //_modoPlayer.className += "en-directo";
                _modoPlayer.className = _modoPlayer.className.replace("a-la-carta","");
            }else{
                _soy_directo.style.display = 'none';
                _soy_enlatado.style.display = 'block';
                _labelPlayer.innerHTML = "A LA CARTA";

                //_modoPlayer.className += "a-la-carta";
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

                    if(_data.mediaData.isLive){
                        content = _msg_compartir_emisora.replace("{{emisora}}",_data.mediaData.title);
                        refer = _url_compartir_emisora + _data.mediaData.idTOP;
                    }
                    else{
                        refer = _url_compartir_enlatado + _data.mediaData.idTOP;
                    }

                    refUrl += encodeURI(content);
                    refUrl += "&via=";
                    refUrl += "La_SER";
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

                    if(_data.mediaData.isLive){
                        refer = _url_compartir_emisora + _data.mediaData.idTOP;
                        text = _msg_compartir_emisora.replace("{{emisora}}",_data.mediaData.title);
                    }
                    else{
                        refer = _url_compartir_enlatado + _data.mediaData.idTOP;
                        text = _data.mediaData.title + "-" + _data.mediaData.description
                    }

                    var refUrl = "https://www.facebook.com/sharer/sharer.php?u=" + refer + "&t=" + encodeURI(text);
                    window.open(refUrl, '_blank');
                }
            })(this);


            _btnEmbed.onclick = function () {

                /*
                var setting = _that.getPlayer().getLauncher().getEmbed().getSettings();

                if(setting.id_player_embed!=undefined){
                    //codigo_iframe = codigo_iframe.replace("SSS",setting.id_player_embed);
                    codigo_iframe = codigo_iframe.replace("/SSS","");
                }
                else{
                    //codigo_iframe = codigo_iframe.replace("SSS",setting.id_player);
                    codigo_iframe = codigo_iframe.replace("/SSS","");
                }
                */

                codigo_iframe = codigo_iframe.replace("/SSS","");
                codigo_iframe_aux = codigo_iframe.replace("PPP",_data.mediaData.idTOP);

                _codigoIframe.innerHTML = codigo_iframe_aux.replace("WWW","100%").replace("HHH","102");

                _formMail.style.display = "none";
                _layerembed.style.display = "inline";
            };



            _btnAplicar.onclick = function(){

                /*
                var embed = _that.getPlayer().getLauncher().getEmbed();
                var config = embed.getSettings();

                if( (config.topPlayer!=undefined)&&(config.topPlayer.ad!=undefined)&& (config.topPlayer.ad.container!=undefined))
                    document.getElementById(config.topPlayer.ad.container).innerHTML = "";

                config.id_media = ooo_zonas[_selectZona.selectedIndex].emisoras[_selectEmisora.selectedIndex].TagName;

                if(config.topPlayer)
                    config.topPlayer.media  = {"autoplay":true};

                embed.init(config);*/

                var _launcher = _that.getPlayer().getLauncher();
                _launcher.reset(undefined,_data.genericData.id_cuenta,ooo_zonas[_selectZona.selectedIndex].emisoras[_selectEmisora.selectedIndex].TagName,{"player":{"autoplay":true}});

                _that.notifyOrderChangeLive(ooo_zonas[_selectZona.selectedIndex].emisoras[_selectEmisora.selectedIndex].TagName);
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

            _titulo.className = _titulo.className.replace(/ ticker/g,"");
            //TODO aquí va la lógica para hacer cositas con marquee ticker
            if(parseInt(_titulo_b.offsetWidth)>parseInt(_titulo.offsetWidth)){
                _titulo.className += " ticker";
                _titulo_b_duplicado.innerHTML = _titulo_b.innerHTML;
                _titulo_b_duplicado.title = _titulo_b.title;
            }
        }

        this.init = function(data) {

            _data = data;
            _container = document.getElementById(_data.internalData.skinContainer);

            _loadCSS.apply(this);
            _loadTemplate.apply(this);
        };

        this.reset = function () {

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
    namespace.TopSkin_PSv2 = TopSkin_PSv2;

})(emic.top.ui);