(function(namespace){

    TopSkin_oneplayer.prototype = new emic.top.ui.UISkinBase();

    function TopSkin_oneplayer(){
        emic.top.ui.UISkinBase.call(this);

        var _that = this;

        var _player,
            _container;

        var toAssignHtmlElem = {
            "_slideVolume"              : "divSlideVolume",
            "_slideVideo"               : "divSlideVideo",
            "_timeCurrent"              : "spanCurrentTime",
            "_timeTotal"                : "spanTotalTime",
            "_fileToDownload"           : "ahrefFileToDownload",
            "_divInfoPrograma"          : "divInfoPrograma",
            "_imgCaratula"              : "imgCaratula",
            "_divLayerEmbed"            : "divLayerEmbed",
            "_btnCloseLayerEmbed"       : "btnCloseLayerEmbed",
            "_divBtnPlayPauseLoading"   : "divBtnPlay",
            "_spanBtnMutear"            : "spanBtnMutear",
            "_divBotonesCompartir"      : "divBotonesCompartir",
            "_btnCloseShare"            : "btnCloseShare",
            "_btnOpenShare"             : "btnOpenShare",
            "_boton_compartir_facebook" : "btnCompartirFacebook",
            "_boton_compartir_twitter"  : "btnCompartirTwitter",
            "_boton_compartir_download" : "btnCompartirDownload",
            "_boton_compartir_whatsapp" : "boton_compartir_whatsapp",
            "_boton_compartir_embed"    : "boton_compartir_embed",
            "_play_display"             : "play_display",
            "_mute_display"             : "mute_display",
            "_select_emisora_display"   : "divSelectEmisoraDisplay",
            "_select_emisora"           : "ahrefSelectEmisora",
            "_mmSelector"               : "divMMSelector",
            "_mmSelectorSize"           : "divMMSelectorSize",
            "_ulEmisoras"               : "ulEmisoras",
            "_ulSizes"                  : "ulSizes",
            "_nombreSize"               : "ahrefTamanio",
            "_textCode"                 : "textCode",
            "_btnCopiarCodigo"          : "btnCopiarCodigo",
            "_divInfo1"                 : "divInfo1",
            "_divInfo2"                 : "divInfo2",
            "_divInfo3"                 : "divInfo3",
            "_spanInfo1"                : "spanInfo1",
            "_spanspanInfo1"            : "spanspanInfo1",
            "_spanInfo2"                : "spanInfo2",
            "_spanInfo3"                : "spanInfo3",
            "_btnCambiarEmisoraMovil"   : "btnCambiarEmisoraMovil",
            "_divButtonSelectMovil"     : "divButtonSelectMovil",
            "_btnCloseEmisoraMovil"     : "btnCloseEmisoraMovil",
            "_spanNombreEmisoraMovil"   : "spanNombreEmisoraMovil",
            "_btnPlaylist"              : "btnPlaylist",
            "_btnNext"                  : "btnNext",
            "_btnPrev"                  : "btnPrev",
            "_divBtnIrDirecto"          : "divBtnIrDirecto",
            "_divEmisora"               : "divEmisora"
        };
        //declaramos variables
        for(var i in toAssignHtmlElem){
            eval("var " + i);
        }

        //ESTILOS Y TEMPLATE

        var _URL_TEMPLATE = "/psdmedia/media/top/skins/oneplayer/template.html",
            _URL_STYLE = "/psdmedia/media/top/skins/oneplayer/css/",
            _URL_JQUERY = "/psdmedia/media/top/skins/oneplayer/js/",
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

        //CONSTANTES DE SERVICIOS EXTERNOS Y OTROS CAMPOS QUE NO DEBERÍAN CAMBIAR

        var _URL_TWITTER = "https://twitter.com/intent/tweet?text=";
        var _URL_FACEBOOK = "https://www.facebook.com/sharer/sharer.php?u=";
        var _URL_PARRILLA = "//fapi-top.prisasd.com/api/v1/parrilla/";
        var _URL_ENLATADO = "//fapi-top.prisasd.com/api/v1/search/los40/audio/idref/";
        //var _URL_EMISORAS = "http://fapi-top.prisasd.com/api/v1/search/{EMISORA}/audio/tags?tags=m(islive|true)";
        var _URL_EMISORAS = "//fapi-top.prisasd.com/api/v1/search/{EMISORA}/audio/tags?tags=m(tags.type%7CE%2Cislive%7Ctrue)&size=40&orderBy=idref|asc";

        var _DEFAULT_COVER = "/psdmedia/media/top/skins/oneplayer/img/logo40-90.jpg"
        var _default_cover = _DEFAULT_COVER;
        var _DEFAULT_NOMBRE = "PRISA MUSICALES";
        var _default_nombre = _DEFAULT_NOMBRE;
        var _DEFAULT_HORARIO = "";
        var _default_horario = _DEFAULT_HORARIO;
        var _DEFAULT_PRESENTADOR = "";
        var _default_presentador = _DEFAULT_PRESENTADOR;
        //metadatas
        var _mdCover, _mdNombre, _mdPresentador;

        //VALORES CARGADOS DESDE FAPI

        var _udn = null;

        var _vias = {};
        var _hayvias = false;
        var _firstVia = '';
        var _emisoraIrDirecto = '';


        var _message_share_facebook = "";
        var _message_share_twitter = "";
        var _message_share_twitter_emisora = "";

        var _twitter_via = null;
        var _css = "default.css";

        var _show_twitter = true;
        var _show_facebook = true;

        var _isLive = false;
        var _isPlaylist = false;

        this.flagSliderMove = false;
        this.capaEmisorasOcultarMovil = false;


        //FUNCIONES



        /*Comprobamos si estamos en una pagina Widget*/
        var _CheckWidget = function (data) {

            var reExp = /widget\//g;

            if (data.indexOf('widget') != -1) {

                data = data.replace(reExp, '');
                data = data.replace('directo', 'emisora');

                return data;

            } else {

                return data;
            }

        };


        var _loadjQuery = function(){

            var filerefJQuery = document.createElement("script"),
                filenameJQuery = _data.genericData.urlBase ? (_data.genericData.urlBase + _URL_JQUERY + "jquery-2.1.4.min.js") : _URL_JQUERY + "jquery-2.1.4.min.js";

            filerefJQuery.setAttribute("src", filenameJQuery);
            filerefJQuery.setAttribute("type","text/javascript");
            filerefJQuery.onload = function(){
                //_applyScroll.apply(this);
                _that.init2();

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

            if(typeof filerefJQueryUI!="undefined"){
                document.getElementsByTagName("head")[0].appendChild(filerefJQueryUI);
            }

            //scroll cuqui
            var filerefJQueryScroll = document.createElement("script"),
                filenameJQueryScroll = _data.genericData.urlBase ? (_data.genericData.urlBase + _URL_JQUERY + "jquery.custom-scrollbar.js") : _URL_JQUERY + "jquery.custom-scrollbar.js";
            filerefJQueryScroll.setAttribute("src", filenameJQueryScroll);
            filerefJQueryScroll.setAttribute("type","text/javascript");
            document.getElementsByTagName("head")[0].appendChild(filerefJQueryScroll);
        }

        var _loadCSS = function(){
            var fileref = document.createElement("link");
            var filename = _data.genericData.urlBase ? (_data.genericData.urlBase + _URL_STYLE + _css) : _URL_STYLE + _css;

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
            templateMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_COMPLETE, onDataCompleteTemplateOnePlayer, this);
            templateMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_ERROR, onDataErrorTemplateoneplayer, this);
            templateMediator.mediate(url, _parser, psd.framework.Mediator.RESPONSE_TEXT);
        };

        var onDataCompleteTemplateOnePlayer = function (evt)
        {
            var template;
            if (evt.result.parserResult.code == _CODE_NUM_PARSER_OK)
            {
                template = evt.result.parserResult.result.replace(/{<-%ID%->}/g,_data.genericData.id+"_");
                template = template.replace(/{<-%URL_BASE%->}/g,_data.genericData.urlBase);
                _container.innerHTML = template;
                _assignElements.apply(this);
                this.notifyInitComplete();
            }
            else if (evt.result.parserResult.code == _CODE_NUM_PARSER_ERROR)
            {
                emic.top.debug("TopSkin_oneplayer | Error al cargar el template de oneplayer. ParseError.");
            }
        };

        var onDataErrorTemplateoneplayer = function (evt)
        {
            emic.top.debug("TopSkin_oneplayer | Error al cargar el template de oneplayer. DataError.");
        };

        var _getElementById = function(id){
            return document.getElementById(_data.genericData.id + "_" + id);
        };

        var _assignElements = function(){
            _player = document.getElementById("player"); //en el css tiene estilos asociados a este id
            for(var i in toAssignHtmlElem){
                eval(i + "= _getElementById('"+toAssignHtmlElem[i]+"')");
                if(typeof eval(i) != 'object' || eval(i) == null){
                    console.log(i+" no asignado");
                }
            }

            if(!_show_facebook){
                _boton_compartir_facebook.style.display = "none";
            }

            if(!_show_twitter){
                _boton_compartir_twitter.style.display = "none";
            }

            if(!getDevice().mobile){
                _boton_compartir_whatsapp.style.display = "none";
            }

            _loadCSS.apply(this);

            //ponemos una imagen de seguridad por defecto por si hay algún error en la carátula
            _imgCaratula.onerror = function(){
                _imgCaratula.onerror = null;
                _imgCaratula.src = _DEFAULT_COVER;
            }

            setSkin.apply(this);

            _loadEmisoras();

            if((typeof(jQuery)!="undefined")&&(typeof(jQuery.ui)!="undefined")){
                _runjQueryfunctions.apply(this);
            }
        };

        var onDataErrorParrilla = function(evt){
            _default_nombre = _DEFAULT_NOMBRE;
            _default_horario = _DEFAULT_HORARIO;
            _default_cover = _DEFAULT_COVER
            _default_presentador = _DEFAULT_PRESENTADOR;

            _parrilla_nombre = _default_nombre;
            _parrilla_horario = _default_horario;
            _parrilla_presentador = _default_presentador;
            _parrilla_caratula = _default_cover;
        };

        var setNombres = function(){
            var cover, nombre, presentador, horario;

            if(_parrilla_nombre == '')
                _parrilla_nombre = _DEFAULT_NOMBRE;
            if(_parrilla_presentador == '')
                _parrilla_presentador = _DEFAULT_PRESENTADOR;
            if(_parrilla_caratula == '')
                _parrilla_caratula = _DEFAULT_COVER;
            if(_parrilla_horario == '')
                _parrilla_horario = _DEFAULT_HORARIO;

            cover = _mdCover != '' ? _mdCover : _parrilla_caratula;
            nombre = _mdNombre != '' ? _mdNombre : _parrilla_nombre;
            presentador = _mdPresentador != '' ?_mdPresentador : _parrilla_presentador;
            horario = _parrilla_horario;

            _spanInfo2.innerHTML = '.';
            var heightInfo2 = _divInfo2.offsetHeight;
            _spanInfo2.innerHTML = '';
            _spanInfo3.innerHTML = '.';
            var heightInfo3 = _divInfo3.offsetHeight;
            _spanInfo3.innerHTML = '';

            _spanInfo1.className = '';
            _spanInfo2.className = '';
            _spanInfo3.className = '';
            _spanInfo1.innerHTML = "";
            _spanInfo2.innerHTML = "";
            _spanInfo3.innerHTML = "";
            _spanspanInfo1.innerHTML = '';

            if(!_isLive){
                _spanInfo2.innerHTML = _parrilla_nombre;
                _spanInfo3.innerHTML = _parrilla_presentador;
                _imgCaratula.src = _parrilla_caratula;
            } else {
                _spanInfo1.className = 'fa fa-circle';
                _spanspanInfo1.innerHTML = 'EN DIRECTO';
                if(_isplaying){
                    _spanInfo2.innerHTML = nombre;
                    _spanInfo3.innerHTML = presentador;
                    _imgCaratula.src = cover;
                } else {
                    _spanInfo2.innerHTML = _parrilla_nombre;
                    _spanInfo3.innerHTML = _parrilla_presentador + " " + _parrilla_horario;
                    _imgCaratula.src = _parrilla_caratula;
                }
            }
            if(_divInfo2.offsetHeight > heightInfo2){
                _spanInfo2.className = 'mm_scrolling';
            }
            if(_divInfo3.offsetHeight > heightInfo3){
                _spanInfo3.className = 'mm_scrolling';
            }
            this.notifyOrderVolumeChangeOnStarted(_currentvolume);
        }

        var onDataCompleteParrilla = function(evt){

            if(_data.mediaData.isLive == true) {
                _isLive = true;
                _boton_compartir_download.style.display = "none";
                _player.className = "mm_player cs-directo";
            } else {
                _isLive = false;
                //_boton_compartir_download.style.display = "";
                _boton_compartir_download.style.display = "none";
                if(_data.mediaData.isPlaylist == true) {
                    _isPlaylist = true;
                    _player.className = "mm_player cs-playlist";
                } else {
                    _player.className = "mm_player cs-alacarta";
                }
            }

            _parrilla_nombre = "";
            _parrilla_horario = "";
            _parrilla_presentador = "";
            _parrilla_caratula = "";
            if(_isLive) {
                _parrilla_nombre = evt.result.parserResult.result.nombre;
                _parrilla_horario = "De " + evt.result.parserResult.result.inicio + " a " + evt.result.parserResult.result.fin;
                _parrilla_presentador = evt.result.parserResult.result.presentador;
                _parrilla_caratula = evt.result.parserResult.result.foto;
            } else {
                if(typeof evt.result.parserResult.result.data == 'object' && typeof evt.result.parserResult.result.data[0] == 'object'){
                    var enlatDat = evt.result.parserResult.result.data[0];
                    _parrilla_nombre = enlatDat['name'] == null ? '' : enlatDat['name'];
                    _parrilla_horario = enlatDat['description'] == null ? '':  enlatDat['description'];
                    //_parrilla_presentador = enlatDat['author'] == null ? '':  enlatDat['author'];
                    _parrilla_caratula = enlatDat['url_audio_still']  == null ? '':  enlatDat['url_audio_still'];
                    if(typeof enlatDat['length'] == 'number')
                        this.onProgress({'currentTime':0, 'totalTime': (enlatDat['length']/1000)});
                    else 
                        this.onProgress({'currentTime':0, 'totalTime': 0});
                }
            }

            _mdNombre = '';
            _mdCover = '';
            _mdPresentador = '';
            setNombres.apply(this);
        };

        var _loadParrilla = function(){
            var _jsonParser = new psd.framework.parser.JSONParser(),
                parrillaMediator = new psd.framework.Mediator();
            _isLive = _data.mediaData.isLive;
            //TODO poner el _data.mediaData.idTop???
            //url = _URL_PARRILLA + _data.mediaData.idTOP;
            if(_isLive) {
                url = _URL_PARRILLA + _data.mediaData.id.toLowerCase();
            } else {
                url = _URL_ENLATADO + _data.mediaData.id.toLowerCase();
            }
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

            if(emisoras.length<2){
                _select_emisora_display.style.display = "none";
                _divEmisora.style.display = 'none';
            }

            var htmlEmisoras = '';
            var tmpLi;
            var tmpA;
            for(i in emisoras){
                if(emisoras[i].name!=undefined){
                    tmpLi = document.createElement('li');
                    tmpA = document.createElement('a');
                    tmpA.id = "_emisora_"+emisoras[i].id;
                    tmpA.innerHTML = emisoras[i].name;
                    if(_data.mediaData.defaultLive == emisoras[i].id){
                        tmpLi.className = 'active';
                    }
                    tmpA.onclick = (function(that, id){
                                        return function(){
                                            _that.cambiaEmisora(id, true);
                                        }
                                    })(this, emisoras[i].id);

                    tmpLi.appendChild(tmpA);
                    _ulEmisoras.appendChild(tmpLi);
                }
            }

            _pintaNombreEmisora.apply(this);
        }

        var onDataErrorEmisoras = function(){
            emic.top.debug("TopSkin_oneplayer | Error al cargar emisoras oneplayer para udn " + _udn);
            _select_emisora_display.style.display = "none";
        }

        var _loadEmisoras = function(){
            var _jsonParser = new psd.framework.parser.JSONParser(),
                emisorasMediator = new psd.framework.Mediator();
            var url = _URL_EMISORAS.replace("{EMISORA}",_udn);

            emisorasMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_COMPLETE, onDataCompleteEmisoras, this);
            emisorasMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_ERROR, onDataErrorEmisoras, this);
            emisorasMediator.mediate(url, _jsonParser, psd.framework.Mediator.RESPONSE_JSON);
        }

        var setSkin = function() {
            _emisoraIrDirecto = _data.uiData.skinData.emisora_ir_directo;
            if(_data.mediaData.isLive === true) {
                _isLive = _data.mediaData.isLive;
                _divBtnIrDirecto.style.display = 'none';
            } else {
                _divBtnIrDirecto.style.display = 'block';
            }
            if(_data.mediaData.isPlaylist === true)
                _isPlaylist = true;

        	if(_data.uiData.skinData.soy_embed === true || _data.mediaData.isPlaylist === true){
        		_divBtnIrDirecto.style.display = 'none';
        	}
            _loadParrilla.apply(this);




            //BOTON PLAY
            _divBtnPlayPauseLoading.onclick = (function(that){
                return function(){
                    if(_divBtnPlayPauseLoading.className.indexOf("mm_loading")>0)
                        return;

                    if(_isplaying){
                        if((typeof (_data.mediaData.provider)!="undefined")&&(_data.mediaData.provider=="hls"))
                            that.notifyOrderPause();
                        else
                            that.notifyOrderStop();
                    }
                    else{
                        $(_divBtnPlayPauseLoading).addClass('mm_loading');
                        that.notifyOrderPlay();
                    }
                }
            })(this);

            _divBtnIrDirecto.onclick = (function(that){
                return function(){
                    _that.cambiaEmisora(_emisoraIrDirecto, false);
                    return false;
                }
            })(this);

            _btnOpenShare.onclick = (function(that){
                return function(){
//aqui
                if( typeof _data.uiData.skinData.appID == 'undefined' ||
                    typeof _data.uiData.skinData.title_share_facebook == 'undefined' ||
                    typeof _data.uiData.skinData.description_share_facebook == 'undefined'){
                    _boton_compartir_facebook.style.display = 'none';
                } else {
                    _boton_compartir_facebook.style.display = '';
                }


                    $(_divBotonesCompartir).animate({width: 'toggle'});
                    return false;
                }
            })(this);

            _btnCloseShare.onclick = (function(that){
                return function(){
                    $(_divBotonesCompartir).animate({width: 'toggle'});
                    return false;
                }
            })(this);

            _btnNext.onclick = (function(that){
                return function(){
                    var uiModule = that.getPlayer().getUIModule();
                    uiModule.dispatchEvent(new emic.top.event.UIEvent(emic.top.event.UIEvent.ON_ORDER_NEXT));
                    return false;
                }
            })(this);
            _btnPrev.onclick = (function(that){
                return function(){
                    var uiModule = that.getPlayer().getUIModule();
                    uiModule.dispatchEvent(new emic.top.event.UIEvent(emic.top.event.UIEvent.ON_ORDER_PREV));
                    return false;
                }
            })(this);

            //BOTON TWITTER
            _boton_compartir_twitter.onclick = (function(that){
                return function(){
                    $(_divBotonesCompartir).animate({width: 'toggle'});
                    var refer = window.location.href;

                    refer = _CheckWidget(refer);

                    refer = encodeURIComponent(refer);

                    if (_data.mediaData.description == "{}")
                        _data.mediaData.description = " ";

                    if(_twitter_via!=null){
                        if(_hayvias){
                            if(typeof _vias[_data.mediaData.idTOP.toLowerCase()] == 'undefined') {
                                _twitter_via = _firstVia;
                            } else {
                                _twitter_via = _vias[_data.mediaData.idTOP.toLowerCase()];
                            }
                        }
                    }

                    if(_isLive){
                        content = _message_share_twitter_emisora;
                    } else {
                        content = _message_share_twitter;
                    }

                    var tieneVia = content.search('@twitter@');

                    content = content.replace('@twitter@', '@'+_twitter_via);
                    content = content.replace('@titulo@', _data.mediaData.title);

                    if (content.length > 100)
                        content = content.substr(0, 100)+"...";

                    var refUrl = _URL_TWITTER;
                    refUrl += encodeURIComponent(content);

                    if(tieneVia < 0 && _twitter_via!=null){
                        refUrl += "&via=" + _twitter_via;
                    }
                    refUrl += "&url=" + refer;

                    window.open(refUrl,'_blank');
                }
            })(this);

            //BOTON FACEBOOK
            //_boton_compartir_facebook.onclick = (function(that){
            //    return function(){
            //        var refer = window.location.href;
            //        var text = "";
            //
            //        if(_message_share_facebook!=""){
            //            text = _message_share_facebook;
            //        }
            //
            //        var refUrl = _URL_FACEBOOK + refer + "&t=" + encodeURI(text);
            //        window.open(refUrl, '_blank');
            //    }
            //})(this);
            _boton_compartir_facebook.onclick = function(that) {//tucu
                $(_divBotonesCompartir).animate({width: 'toggle'});
                if( typeof _data.uiData.skinData.appID == 'undefined' ||
                    typeof _data.uiData.skinData.title_share_facebook == 'undefined' ||
                    typeof _data.uiData.skinData.description_share_facebook == 'undefined'){
                    return;
                }
                var app_id= 'app_id='+_data.uiData.skinData.appID;
                var refer = window.location.href;

                refer = _CheckWidget(refer);

                var tituloFB= _data.uiData.skinData.title_share_facebook;
                var descripcion= _data.uiData.skinData.description_share_facebook;
                var picture= _data.uiData.skinData.default_cover;
                picture= refer + encodeURIComponent(picture);
                var _urlFeed= app_id+'&link='+refer+'&description='+descripcion+'&name='+tituloFB+'&picture='+picture;
                _urlFeed = encodeURI(_urlFeed);
                window.open('https://www.facebook.com/dialog/feed?'+_urlFeed);
            }

            _boton_compartir_download.onclick = (function(that){
                return function(){
                    var _url_descarga = _data.mediaData.urlHTML5[0];
                    for(var i in _data.mediaData.urlHTML5){
                        if(_data.mediaData.urlHTML5[i].indexOf("mp4")>0){
                            _url_descarga = _data.mediaData.urlHTML5[i];
                        }
                    }
                    _fileToDownload.href = _url_descarga;
                    _fileToDownload.click();
                }
            })(this);

            _boton_compartir_whatsapp.onclick = (function(that) {
                return  function(){
                    var refer = window.location.href;
                    var refUrl = "whatsapp://send?text=" + refer;
                    window.open(refUrl,'_blank');
                }
            })(this);

            _boton_compartir_embed.onclick = (function(that){
                return function(){
                    $(_divLayerEmbed).animate({width: 'toggle'});
                }
            })(this);

            _btnCloseLayerEmbed.onclick = (function(that){
                return function(){
                    $(_divLayerEmbed).animate({width: 'toggle'});
                }
            })(this);

            //BOTON VOLUMEN
            _spanBtnMutear.onclick = (function(that){
                return function(){
                    if(_ismute)
                        that.notifyOrderVolumeChangeOnStarted(_currentvolume);
                    else
                        that.notifyOrderVolumeChangeOnStarted(0);
                }
            })(this);

            _select_emisora.onclick = (function(that){
                return function(){
                    if($(_mmSelector).hasClass('mm_selector_activo')){
                        $(_mmSelector).removeClass('mm_selector_activo');
                    } else {
                        $(_mmSelector).addClass('mm_selector_activo');
                    }
                }
            })(this);

            _btnCambiarEmisoraMovil.onclick = (function(that){
                return function(){
                    that.capaEmisorasOcultarMovil = true;
                    $(_divButtonSelectMovil).show();
                }
            })(this);

            _btnCloseEmisoraMovil.onclick = (function(that){
                return function(){
                    $(_divButtonSelectMovil).hide();
                }
            })(this);

            _mmSelectorSize.onclick = (function(that){
                return function(){
                    if($(_mmSelectorSize).hasClass('mm_selector_activo')){
                        $(_mmSelectorSize).removeClass('mm_selector_activo');
                    } else {
                        $(_mmSelectorSize).addClass('mm_selector_activo');
                    }
                }
            })(this);

            _btnCopiarCodigo.onclick = (function(that){
                return function(){
                    _textCode.focus();
                    _textCode.setSelectionRange(0, _textCode.value.length);
                    document.execCommand("copy");
                }
            })(this);

            _btnPlaylist.onclick = (function(that){
                return function(){
                    if($(".list-hidden").is(':visible') === true)
                        $(".mm_list-show").removeClass('btn-select');
                    else 
                        $(".mm_list-show").addClass('btn-select');
                    $(".list-hidden").fadeToggle(); 

                }
            })(this);


                    if($(".list-hidden").is(':visible') === true)
                        $(".mm_list-show").addClass('btn-select');
                    else 
                        $(".mm_list-show").removeClass('btn-select');

            _pintaNombreEmisora.apply(this);
            _pintaSizes.apply(this);
            this._CambiaSize();

        };

        var _pintaSizes = function(){
            var tmpLi, tmpA;
            var sizes = {
                '940x102'   : {'width' : 940, 'height' : 102},
                '780x102'   : {'width' : 780, 'height' : 102},
                '620x102'   : {'width' : 620, 'height' : 102},
                '300x90'   : {'width' : 300, 'height' : 90},
                'Ancho total'   : {'width' : 0, 'height'    : 0}
            }
            _ulSizes.innerHTML = '';
            for(var i in sizes){
                tmpLi = document.createElement('li');
                tmpA = document.createElement('a');
                tmpA.innerHTML = i;
                if(i == 'Ancho total'){
                    tmpLi.className = 'active';
                }
                tmpA.onclick = (function(that, size, nombre){
                                    return function(){
                                        $(this).parent().siblings().removeClass("active");
                                        $(this).parent().addClass("active");
                                        that._CambiaSize(nombre, size);
                                    }
                                })(this, sizes[i], i);


                tmpLi.appendChild(tmpA);
                _ulSizes.appendChild(tmpLi);
            }

        }

        this._CambiaSize = function(nombre, size){
            var domain = _data.uiData.skinData.widget_domain;

            if(_isPlaylist) {

                /*recuperamos la variable ID_playlist de los externalOrders*/
                domain += 'playlist/' +  _data.uiData.id_playlist;

                //if(typeof _data.mediaData.playlistUrl != 'undefined'){
                //    var tmp = _data.mediaData.playlistUrl.split('?');
                //    if(tmp.length > 1)
                //        domain+="playlist?" + tmp[1];
                //}


            } else {

                if(_isLive) {

                        domain += "directo/" + _data.mediaData.idTOP + "/";

                } else {

                    domain += "audio/" + _data.mediaData.idTOP + "/";

                }
            }
            var tmp = ' width="100%" height="100%" ';
            var _codigo_iframe = '<iframe src="'+domain+'" Width&Height frameborder="0" allowfullscreen></iframe>';
            if(typeof nombre == 'undefined') {
                nombre = 'Tamaño';
            }
            if(typeof size == 'object' && typeof size.width == 'number' && typeof size.height == 'number'){
                if(size.width > 0 && size.height > 0) {
                    tmp = ' width="'+size.width+'" height="'+size.height+'" ';
                } 
            } 
            _codigo_iframe = _codigo_iframe.replace("Width&Height", tmp);
            _textCode.innerHTML = _codigo_iframe;
            _nombreSize.innerHTML = nombre;
        }

        var _pintaNombreEmisora = function(){
            if(typeof _data.mediaData.defaultLive == 'string') {
                var a = $("#_emisora_"+_data.mediaData.defaultLive);
                if(typeof a.html() != 'undefined'){
                    _select_emisora.innerHTML = a.html();
                    if(a.html().search(/^LOS40 .{3}/ig) != -1)
                        _spanNombreEmisoraMovil.innerHTML = a.html().toUpperCase().replace("LOS40 ", "").substring(0,3);
                    else
                        _spanNombreEmisoraMovil.innerHTML = a.html().toUpperCase().substring(0,3);
                    _spanNombreEmisoraMovil.title = a.html();
                }
                if(_data.uiData.skinData.show_emisoras_label != true){
                    _spanNombreEmisoraMovil.style.display = 'none';
                }
            }
        }

        this.cambiaEmisora = function(id, pDesdeElCombo){
            if(this.capaEmisorasOcultarMovil){
                this.capaEmisorasOcultarMovil = false;
                $(_divButtonSelectMovil).hide();
            }
            if(pDesdeElCombo)
                _select_emisora.click();
            this.notifyOrderStop();
			setTimeout(function(){_resetEmisora.call(_that, id);}, 50);
            this.notifyOrderChangeLive(id, !pDesdeElCombo);

			var lis = _ulEmisoras.getElementsByTagName('li');
			for(var i = 0; i< lis.length; i++){
				$(lis[i]).removeClass("active");
			}
			$("#_emisora_" + id).parent().addClass("active");
        }

		var _resetEmisora = function(pId){
			var _launcher = this.getPlayer().getLauncher();
			_launcher.reset(undefined,_data.genericData.id_cuenta,pId,{"player":{"autoplay":true}});
		}


        this.init = function(data) {
            _data = data;
            _URL_ENLATADO = "//fapi-top.prisasd.com/api/v1/search/" + data.genericData.id_cuenta + "/audio/idref/";
            //cargamos jQuery si no existe en la página
            if(typeof(jQuery)=="undefined"){
                _loadjQuery.apply(this);
            }else{
                this.init2();
                if(typeof(jQuery.ui)=="undefined"){
                    _loadjQueryUI.apply(this);
                }
            }
        }

        this.init2 = function() {
            this.initData();
            _loadTemplate.apply(this);
        }

        this.initData = function() {
            _DEFAULT_COVER = _data.genericData.urlBase + "/psdmedia/media/top/skins/oneplayer/img/logo40-90.jpg";
            _default_cover = _DEFAULT_COVER;

            _container = document.getElementById(_data.internalData.skinContainer);

            _udn = _data.genericData.id_cuenta;
            //cargamos los datos por defecto desde la FAPI

            //título por defecto
            if(_data.uiData.skinData.default_title!=undefined){
                 _default_nombre = _data.uiData.skinData.default_title;
                _DEFAULT_NOMBRE = _default_nombre;
            } else {
                if(_data.mediaData.title!=undefined) {
                     _default_nombre = _data.mediaData.title;
                    _DEFAULT_NOMBRE = _default_nombre;
                }
            }

            //subtítulo por defecto
            if(_data.uiData.skinData.default_subtitle!=undefined){
                _default_horario = _data.uiData.skinData.default_subtitle;
                _DEFAULT_HORARIO = _default_horario;
            }

            //subsubtítulo por defecto
            if(_data.uiData.skinData.default_subsub!=undefined){
                _default_presentador = _data.uiData.skinData.default_subsubtitle;
                _DEFAULT_PRESENTADOR = _default_presentador;
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
                        if(_firstVia == ''){
                            _firstVia = _split_keyvalue[1];
                        }
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
            if(_data.uiData.skinData.message_share_tw_emisoras!=undefined){
                _message_share_twitter_emisora = _data.uiData.skinData.message_share_tw_emisoras;
            }

            //mostrar facebook
            if(_data.uiData.skinData.show_facebook!=undefined){
                _show_facebook = _data.uiData.skinData.show_facebook;
            }

            //mostrar twitter
            if(_data.uiData.skinData.show_twitter!=undefined){
                _show_twitter = _data.uiData.skinData.show_twitter;
            }
        };

        var setSlider = function(elem, valor){
            if(typeof $(elem).slider != 'undefined') {
                if($(elem).slider('instance') != 'undefined'){
                    $(elem).slider("value", valor);
                }
            }
        }

        this.reset = function () {
			$(_divBtnPlayPauseLoading).addClass('mm_loading');
            this.onStatusChange(emic.top.MediaModule.STATUS_STOP);
            //setSlider(_slideVideo,0);
            this.initData();
            setSkin.apply(this);
        };

        this.resize = function(width, height){};

        this.secondsAsTimeCode = function(time, format) {
            if(isNaN(time)){
                return "00:00:00";
            }
            var hours = Math.floor(time/3600),
                minutes = Math.floor((time - (hours*3600))/60),
                seconds = Math.floor(time - (hours*3600) - (minutes*60)),
                timecode = "";

            if(hours<10) {hours = "0" + hours;}
            if(minutes<10) {minutes = "0" + minutes;}
            if(seconds<10) {seconds = "0" + seconds;}

            if(format==null) {
                timecode = hours + ":" + minutes + ":" + seconds;
            } else {
                timecode = format.replace('hh', hours);
                timecode = timecode.replace('mm', minutes);
                timecode = timecode.replace('ss', seconds);
            }

            return timecode;
        }

        this.onProgress = function(data){
            if(!this.flagSliderMove){
                var percent = (data.currentTime *100/data.totalTime);
                setSlider(_slideVideo,percent);
            }
            if(typeof data.currentTime == 'number' && typeof data.totalTime == 'number'){
                _timeCurrent.innerHTML = this.secondsAsTimeCode(data.currentTime,"hh:mm:ss");
                _timeTotal.innerHTML = this.secondsAsTimeCode(data.totalTime,"hh:mm:ss");
            }
        };

        this.onVolumeChange = function(offset){
            var percent = offset*100;

            _currentvolume = offset;
            if(offset==0){
                _spanBtnMutear.className = _spanBtnMutear.className.replace("icon-volume-2","icon-volume-off");
                _ismute = true;
            }
            else{
                _ismute = false;
                _spanBtnMutear.className = _spanBtnMutear.className.replace("icon-volume-off","icon-volume-2");
            }

            setSlider(_slideVolume,percent);
        };

        this.onSeekComplete = function(offset){};

        this.onBufferEmpty = function(){
        	$(_divBtnPlayPauseLoading).addClass('mm_loading');
        };

        this.onBufferFull = function(){
            $(_divBtnPlayPauseLoading).removeClass('mm_loading');
        };

        this.showLoading = function (flag) {};

        this.externalOrder = function(order, params){//tucu


            switch(order){

                case  "metas_seo_facebook":

                    _data.uiData.skinData.title_share_facebook = params.title;
                    _data.uiData.skinData.description_share_facebook = params.description;
                    _data.uiData.skinData.appID = params.app_id;

                    break;

                case "id_playlist":

                    /*nos llega el nombre de la seccion*/

                    if (typeof(params) == "object") {

                        if (typeof(params.id) != "undefined") {

                            _data.uiData.id_playlist = params.id;

                            this._CambiaSize();
                        }
                    }


                    break;


            }


        };

        this.onStatusChange = function(status){
            switch (status){
                case emic.top.MediaModule.STATUS_STOP:
                    _isplaying = false;
                    setSlider(_slideVideo,0);
                    _play_display.className = _play_display.className.replace("fa-pause","fa-play");
                    $(_divBtnPlayPauseLoading).removeClass('mm_loading');
                    setNombres.apply(this);
                    break;
                case emic.top.MediaModule.STATUS_PAUSE:
                case emic.top.AdModule.STATUS_PAUSE:
                    _isplaying = false;
                    _play_display.className = _play_display.className.replace("fa-pause","fa-play");
                    setNombres.apply(this);
                    break;
                case emic.top.MediaModule.STATUS_PLAY:
                    $(_divBtnPlayPauseLoading).removeClass('mm_loading');
                    _isplaying = true;
                    _started = true;
                    _play_display.className = _play_display.className.replace("fa-play","fa-pause");
                    setNombres.apply(this);
                    break;
                case emic.top.event.MediaEvent.ON_MEDIA_END:
                    $(_divBtnPlayPauseLoading).removeClass('mm_loading');
                    break;
                case emic.top.AdModule.STATUS_PLAY:
                    $(_divBtnPlayPauseLoading).addClass('mm_loading');
                    break;
                case emic.top.AdModule.STATUS_STOP:
                case emic.top.AdModule.PUBLI_SKIPPED:
                case emic.top.AdModule.PUBLI_ERROR:
                    $(_divBtnPlayPauseLoading).removeClass('mm_loading');
                    break;
            }
        };

        this.onPositionChange = function(position) {
            switch(position) {
                case emic.top.TopPlayer.POSITION_PREVIEW:
                	$(_divBtnPlayPauseLoading).removeClass('mm_loading');
                	break;
                case emic.top.TopPlayer.POSITION_AD_PREROLL:
                	$(_divBtnPlayPauseLoading).addClass('mm_loading');
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
            _mdCover = _getDataFromMetadata(metadata,"coverURL","cover_url", '');
            var title = _getDataFromMetadata(metadata,"cueTitle","cue_title", '');
            var album = _getDataFromMetadata(metadata,"albumName","album_name", '');
            var artista = _getDataFromMetadata(metadata,"artistName","artist_name",'');

            _mdNombre = title != '' ? title : album;
            _mdPresentador = artista;
            setNombres.apply(this);

            if((metadata.parameters!=undefined)&&(metadata.parameters.track_artist_url!=undefined)&&(metadata.parameters.track_artist_url!="")&&(metadata.parameters.track_artist_url!=null)){
                _track_artist_url = metadata.parameters.track_artist_url;
            }

            if((metadata.cuePoint!=undefined)&&(metadata.cuePoint.parameters!=undefined)&&(metadata.cuePoint.parameters.track_artist_url!=undefined)&&(metadata.cuePoint.parameters.track_artist_url!="")&&(metadata.cuePoint.parameters.track_artist_url!=null)){
                 _track_artist_url = metadata.cuePoint.parameters.track_artist_url;
            }

            if(_track_artist_url!=null){
                _imgCaratula.style.cursor = "pointer";
                _imgCaratula.onclick = function(){
                    window.open(_track_artist_url,'_blank');
                }
            }else{
                _imgCaratula.style.cursor = "";
                _imgCaratula.onclick = function(){};
            }
        };

        this.onCue = function(data){};
        this.onError = function(msg, code){};
        this.onSwitchRequest = function(id){};
        this.onSwitchComplete = function(id){};
        this.requestFullScreen = function(){};
        this.cancelFullScreen = function(){};
        this.onSeekStart = function(offset){
        };
        this.onSeekComplete = function(offset){
        };

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

            //SLIDERS
            this.flagSliderMove = false;
            $(_slideVolume).slider({
                range: "min",
                value: 60,
                slide: function(event,ui){
                    _that.notifyOrderVolumeChangeOnStarted(ui.value/100);
                }
            });
            $(_slideVideo).slider({
                range: "min",
                value: 0,
                start: function() {
                    _that.flagSliderMove = true;
                },
                stop: function(event,ui){
                    _that.notifyOrderSeekByProp(ui.value/100);
                    _that.flagSliderMove = false;
                }
            });

            $(this).children('.iconf_player').toggleClass('iconf-volume iconf-mute');

            if($(this).children('.iconf_player').hasClass('iconf-mute')){
                setSlider(_slideVolume,0);
            }else{
                setSlider(_slideVolume,100);
            }
        }
    }

    namespace.TopSkin_oneplayer = TopSkin_oneplayer;

})(emic.top.ui);        