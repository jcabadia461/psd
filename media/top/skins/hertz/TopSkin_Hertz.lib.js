/**
 * Created by dmena
 */
(function(namespace){

    TopSkin_hertz.prototype = new emic.top.ui.UISkinBase();

    function TopSkin_hertz (){
        emic.top.ui.UISkinBase.call(this);

        mm_autoplay = true;
        window.playlistHertz = false;

		var _that = this;
        //tipo de skin
        //0 -> grande
        //1 -> pequeño
        //3 -> permanente
        var _SKIN_TYPE_GRANDE = "0";
        var _SKIN_TYPE_PEQUENO = "1";
        var _SKIN_TYPE_PERMANENTE = "3";

        var STATS_DESCARGAR = "descargar",
            STATS_LLEVATELO = "llevatelo",
            STATS_COMPARTIR = "redsocial",
            STATS_MOMENTO = "momento",
            STATS_INICIOCOMPARTIR = "iniciocompartir";

        var _data;
        var _udn = "playser";

        var __MINSIZE = 625;

        var tiempo_parar = -1;
        var last_current_time = 0;
        var last_cortar_start_time = 0;
        var tiempo_corte = 30;

        namespace.hertz_events = {};

        namespace.hertz_events.ORDER_GUARDAR = "guardar";
        namespace.hertz_events.ORDER_LEER = "leer";
        namespace.hertz_events.ORDER_OIR = "oir";
        namespace.hertz_events.ORDER_DESCARGAR = "descargar";
        namespace.hertz_events.ORDER_COMPARTIR = "compartir";
        namespace.hertz_events.ORDER_SHARE = "share";
        namespace.hertz_events.ORDER_TOKEN = "token";
        namespace.hertz_events.RESET_PLAYERVIEW = "reset_playerview";
        namespace.hertz_events.ORDER_VIA = "via";
        namespace.hertz_events.ORDER_SEGUNDOS_COMPARTIR = "segundos";

        namespace.hertz_events.EXTERNAL_ORDER_TOKEN = "token";
        namespace.hertz_events.EXTERNAL_ORDER_SHOWSHARE = "showshare";
        namespace.hertz_events.EXTERNAL_ORDER_VIA = "via";
        namespace.hertz_events.EXTERNAL_ORDER_ALTERNATIVO = "alternativo";
        namespace.hertz_events.EXTERNAL_ORDER_HIDE_TRANSCRIPTION = "hide_transcription";

        this._playerview_skin_type = null;
        this._playerview_color = null;
        var _skin_type = _SKIN_TYPE_GRANDE;

        var _currentTime = 0;
        var _totalTime = 0;
        var _durationFormat = "mm:ss";

        var _url_compartir_emisora = "http://play.cadenaser.com/emisora/";
        var _url_compartir_enlatado = "http://play.cadenaser.com/audio/";

        var _ID; //importante sobreescribir con _ID para poder usar playerviews
		
		var _URL_TEMPLATE = "/psdmedia/media/top/skins/hertz/assets/"
			,_URL_STYLE = 	"/psdmedia/media/top/skins/hertz/assets/stylesheets/"
			,_URL_JS = 		"/psdmedia/media/top/skins/hertz/assets/javascripts/"
			,_CODE_NUM_PARSER_OK = 0
			,_CODE_NUM_PARSER_ERROR = 1
            ,_URL_CADENASER = "http://cadenaser.com"
            ,_URL_PLAYSER = "http://play.cadenaser.com"
            ,_URL_TWITTER = "https://twitter.com/intent/tweet?text="
            ,_URL_FACEBOOK = "https://www.facebook.com/sharer/sharer.php?u="
            ,_URL_GOOGLEPLUS = "https://plus.google.com/share?url="

            ,_URL_ZONAS = "//play.cadenaser.com/service/zonageografica"
            ,_URL_EMISORAS = "//play.cadenaser.com/service/emisoras"

            ,_URL_DIRECTO = "//play.cadenaser.com/service/directo"

            ,_URL_TRANS = "//fapi-top.prisasd.com/api/v1/search/CUENTA/transcription/idref/"
            ,_URL_ALTERNATIVOS = "//play.cadenaser.com/service/alternativo/"
            ,_URL_SIGUIENTE = "//fapi-top.prisasd.com/api/v1/recommend/playser/audio/idref"

            ,_URL_AUDIO_PLAYSER = ""
            ,_URL_SERVICIO_ACTIVO = "https://compartir.cadenaser.com/v1/api-status"
        ;

        var o_zonas,o_emisoras,ooo_zonas = [];

        var infodirecto = null;

        var _token_fb = "",
            _token_tw = "";

        var _twitter_via = "la_SER";
        var _twitter_via_external = "";

        var _interval_siguiente = null;
        var _interval_siguiente_secs_init = 3;
        var _interval_siguiente_secs = _interval_siguiente_secs_init;
        var _interval_publi = null;
        var _interval_publi_secs = 0;

        //elementos
		var _mm_player
			,_btn_play
            ,_btn_play_2
            ,_btn_play_3
            ,_btn_play_4
			,_btn_play_grande
			,_capa_sonando
            ,_capa_sonando_2
			,_track
            ,_track_2
			,_track_back
			,_track_span
            ,_track_span_2
            ,_current_time
            ,_current_time_2
            ,_current_time_3
            ,_current_time_4
            ,_current_time_5
            ,_total_time
            ,_total_time_2
            ,_total_time_3
            ,_total_time_4
            ,_total_time_5
			,_volumen
            ,titulo_2_a
			,_cover
            ,_cover_
            ,_cover_2
            ,_cover_3
            ,_cover_4
            ,_cover_5
            ,_cover_directo
            ,_cover_directo_2
			,_duration
			,_capa_menu
            ,_capa_menu_2
            ,_capa_desplegada_enlatado
            ,_capa_desplegada_live
			,_boton_compartir
            ,_boton_compartir_2
            ,_boton_compartir_3
			,_boton_cerrar_menu
            ,_boton_cerrar_menu_2
            ,_cerrar_cambiar
			,_titulo
            ,_titulo_2
            ,_titulo_3
			,_titulo_menu
			,_boton_menu
            ,_boton_menu_2
            ,_boton_menu_3
            ,_boton_menu_4
			,_logo_cadenaser
            ,_mm_seek_slider
            ,_mm_seek_slider_2
            ,_mm_seek_slider_3
			,_logo_playser
            ,_logo_playser_2
			,_menu_compartir
            ,_menu_compartir_2
			,_menu_embeber
			,_menu_guardar
            ,_menu_guardar_2
			,_menu_leer
            ,_menu_leer_2
			,_menu_descargar
            ,_menu_descargar_2
			,_menu_oir_en
            ,_boton_retroceder
            ,_boton_retroceder_2
            ,_boton_retroceder_3
            ,_boton_adelantar
            ,_boton_adelantar_2
            ,_boton_adelantar_3
			,_capa_publicidad
            ,_capa_publicidad_2
            ,_capa_embed
            ,_capa_conectar_redes
            ,_capa_pausado
            ,_capa_seleccionar
            ,_cambiar_emisora
            ,_cambiar_emisora_2
            ,_cambiar_emisora_3
            ,_cambiar_emisora_4

            //botones internos
            //capa embed
            ,_capa_embed_volver
            ,_capa_embed_cerrar
            ,_capa_embed_eligetamano
            ,_capa_embed_copiar
            ,_capa_embed_mm_code
            //capa compartir redes
            ,_capa_conectar_redes_volver
            ,_capa_conectar_redes_cerrar
            ,_capa_conectar_redes_fb
            ,_capa_conectar_redes_tw
            ,_capa_conectar_redes_goo
            ,_capa_conectar_redes_fb_2
            ,_capa_conectar_redes_tw_2
            ,_capa_conectar_redes_goo_2
            ,_capa_conectar_redes_fb_3
            ,_capa_conectar_redes_tw_3
            ,_capa_conectar_redes_fb_4
            ,_capa_conectar_redes_tw_4
            ,_capa_conectar_redes_goo_3
            ,_capa_conectar_redes_whatsapp
            ,_capa_conectar_redes_whatsapp_2
            ,_capa_conectar_redes_whatsapp_3
            ,_capa_conectar_redes_whatsapp_4

            ,_capa_compartir_opciones
            ,_capa_compartir_opciones_2
            //,_capa_compartir_cortar
            ,_capa_compartir_mensaje
            ,_capa_compartir_preparando
            ,_capa_compartir_terminado

            ,_capa_compartir_opciones_cerrar
            ,_capa_compartir_opciones_cerrar_2
            ,_capa_compartir_opciones_volver
            ,_capa_compartir_opciones_volver_2
            ,_capa_compartir_cortar_cerrar
            ,_capa_compartir_cortar_cerrar_2
            ,_capa_compartir_cortar_volver
            ,_capa_compartir_cortar_volver_2
            ,_capa_compartir_mensaje_cerrar
            ,_capa_compartir_mensaje_cerrar_2
            ,_capa_compartir_terminado_cerrar
            ,_capa_compartir_terminado_cerrar_2
            ,_capa_compartir_terminado_ok
            ,_capa_compartir_terminado_ok_2

            ,_mm_volumen_slider_2
            ,_selector_provincia
            ,_selector_provincia_a
            ,_selector_emisora
            ,_selector_emisora_a
            ,_ul_provincia//_select_zona
            ,_ul_emisora//_select_emisoras
            ,_selector_provincia_2
            ,_selector_provincia_a_2
            ,_selector_emisora_2
            ,_selector_emisora_a_2
            ,_ul_provincia_2
            ,_ul_emisora_2

            ,_directo_programa
            ,_directo_programa_2
            ,_directo_programa_3
            ,_directo_presentador
            ,_directo_emisora
            ,_directo_emisora_2

            ,_embeber_grande
            ,_embeber_pequeno

            ,_compartir_external
            ,_compartir_external_2
            ,_sonido_barras_2
            ,_directo_programa_strong
            ,_directo_programa_strong_2
            ,_directo_programa_strong_3

            ,_btn_compartir_todo
            ,_btn_compartir_todo_2
            ,_btn_compartir_momento
            ,_btn_compartir_momento_2
            ,_capa_compartir_mensaje_comentario
            ,_capa_cortar_siguiente
            ,_capa_cortar_siguiente_2
            ,_capa_compartir_mensaje_compartir
            ,_corte_2
            ,_mm_anuncio_programa_all

            ,_siguiente_titulo
            ,_siguiente_programa
            ,_siguiente_play
            ,_siguiente_duracion

            ,_escucha_continua
            ,_escucha_continua_2
            ,_e_c_tiempo
            ,_e_c_tiempo_2
            ,_e_c_escuchar
            ,_e_c_escuchar_2
            ,_e_c_detener
            ,_e_c_detener_2
            ,_e_c_texto
            ,_e_c_texto_2

            ,_capa_publicidad_saltar
            ,_capa_publicidad_saltar_2
            ,_capa_publicidad_segundos
            ,_capa_publicidad_segundos_2

            ,_capa_redes
            ,_capa_redes_cerrar
            ;

        this._check_facebook = "";
        this._check_twitter = "";

        var timeout_ocultar_botones = null;

        var _url_descarga = "";

        var _capa_activa = null;

        var _botones_play = [];
		
		this.tr = null;
        this.playerViewCompatible = true;
        this.soyPlayerView = false;

        window._dragging_progress = false;
        
		//flags
		var _isplaying = false,
			_started = false,
			_last_volume = 1,
            _oculta = false,
			_muted = false,
			_hay_trans = true,
			_soy_embed = true,
            _soy_permanente = false,
            _selectedIndex = 0,
            _selectedEmisora = "",
            _mostrar_capa_anuncio = true,
            _mostrar_capa_siguiente = true,
            _first_focus = true,
            _servicioActivo = true,
            _videoPregenerado = false, //TODO cambiar a false cuando empiecen a pregenerar vídeos
            _first_preview = true,
            _emisoras_cargadas = false,
            _siguiente_idref = "",
            _rrss_time = 0,
            _hay_postroll = false,
            _soy_alternativo = false,
            _reset_no_cortar = false;

        var _template = "template.html";
        var _style = "players.css";

        var fondoscolores = [
                        "amarillo-1","amarillo-2","amarillo-3","amarillo-4","amarillo-5",
                        "azul-1","azul-2","azul-3","azul-4","azul-5",
                        "malva-1","malva-2","malva-3","malva-4","malva-5",
                        "rosa-1","rosa-2","rosa-3","rosa-4","rosa-5",
                        "turquesa-1","turquesa-2","turquesa-3","turquesa-4","turquesa-5",
                        "verde-1","verde-2","verde-3","verde-4","verde-5"
                    ];

        var _codigo_iframe = '<iframe width="100%" height="{{HH}}" src="http://play.cadenaser.com/widget/audio/{{EE}}/{{PP}}/" frameborder="0" allowfullscreen name="{{NN}}"></iframe>' +
            '<noscript><a target="_blank" href="{{enlace}}" title="{{titulo}} | Audio | Play SER" alt="{{titulo}} | Audio | Play SER">Escucha \"{{titulo}}\" en Play SER</a></noscript>';
            //'<noscript><a target="_blank" href="{{enlace}}" title="{{titulo}} | Audio | Play SER" alt="{{titulo}} | Audio | Play SER" style="width: 100%;text-align: center;display: block;background: #f4f4f4;padding:14px 0;font: 14px/1.3em proximanova, arial;text-decoration: none;color:#666;{{max_width}}">Escucha \"{{titulo}}\" en Play SER</a></noscript>';

        //FUNCTIONS

		var _loadCSS = function(){
            var fileref=document.createElement("link"),
				filename = _data.genericData.urlBase ? (_data.genericData.urlBase + _URL_STYLE + _style) : _URL_STYLE + _style;
				
			fileref.setAttribute("rel", "stylesheet");
			fileref.setAttribute("type", "text/css");
			fileref.setAttribute("href", filename);
			
			if (typeof fileref!="undefined")
				document.getElementsByTagName("head")[0].appendChild(fileref);
		};

        var _loadSiguiente = function(){
            if(window.playlistHertz==true){
                rellenarSiguiente.apply(this);
                return false;
            }


            var _jsonParser = new psd.framework.parser.JSONParser(),
                siguienteMediator = new psd.framework.Mediator(),
                url = _URL_SIGUIENTE + "/" + _data.mediaData.idTOP;

            siguienteMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_COMPLETE, onDataCompleteSiguiente, this);
            siguienteMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_ERROR, onDataErrorSiguiente, this);
            siguienteMediator.mediate(url, _jsonParser, psd.framework.Mediator.RESPONSE_JSON);

        }

        var rellenarSiguiente = function(){
            if((typeof(_that.playlist)!="undefined")&&(_that.playlist.length<1)){
                if(_capa_desplegada_enlatado){
                    _capa_desplegada_enlatado.className = _capa_desplegada_enlatado.className.replace(/ mm_capa_desplegada-sin_siguiente/g,"");
                    _capa_desplegada_enlatado.className += " mm_capa_desplegada-sin_siguiente";
                }
                return;
            }

            if(typeof(_that.playlist)=="undefined"){
                if(_capa_desplegada_enlatado){
                    _capa_desplegada_enlatado.className = _capa_desplegada_enlatado.className.replace(/ mm_capa_desplegada-sin_siguiente/g,"");
                    _capa_desplegada_enlatado.className += " mm_capa_desplegada-sin_siguiente";
                }
                return;
            }

            var _datos = _that.playlist[0];
            window.playlistHertz = true;

            if(_capa_desplegada_enlatado)_capa_desplegada_enlatado.className = _capa_desplegada_enlatado.className.replace(/ mm_capa_desplegada-sin_siguiente/g,"");

            _siguiente_idref = _datos.idref;

            if(_e_c_texto)_e_c_texto.innerHTML = _datos.name;
            if(_e_c_texto_2)_e_c_texto_2.innerHTML = _datos.name;
            if(_siguiente_titulo)_siguiente_titulo.innerHTML = _datos.name;
            if(_siguiente_programa)_siguiente_programa.innerHTML = _datos.description;
            if(_siguiente_duracion)_siguiente_duracion.innerHTML = _that.secondsAsTimeCode(_datos.length/1000,"h:mm:ss");
            if(_siguiente_play)_siguiente_play.onclick = function(){
                if(_that.soyPlayerView)
                    return;

                var _launcher = _that.getPlayer().getLauncher();
                //mm_autoplay = true;
                //_that.notifyOrderExternal("dmena",{"id":_data.mediaData.idTOP});
                //mm_autoplay = false;
                if(this.soyPlayerView){
                    //console.log("soy playerview");
                }
                else{
                    _launcher.reset(undefined,_data.genericData.id_cuenta,_siguiente_idref,{"player":{"autoplay":true}});
                    _that.notifyOrderExternal(namespace.hertz_events.RESET_PLAYERVIEW,{"id":_siguiente_idref,"alternativo":false});
                    if(_escucha_continua)_escucha_continua.className = _escucha_continua.className.replace(/ visible/,"");
                    if(_escucha_continua_2)_escucha_continua_2.className = _escucha_continua_2.className.replace(/ visible/,"");

                    _that.playlist.splice(0,1);
                }
                return false;
            }
        }

        var onDataCompleteSiguiente = function (evt) {
            if (evt.result.parserResult.code == _CODE_NUM_PARSER_OK)
            {
                _that.playlist = evt.result.parserResult.result.data;
                //console.log("playlist ---> ",_that.playlist.length,_that.playlist);


                //var _datos = evt.result.parserResult.result.data[0];
                rellenarSiguiente.apply(this);

            }
            else if (evt.result.parserResult.code == _CODE_NUM_PARSER_ERROR)
            {
                //TODO: Error
            }
        };

        var onDataErrorSiguiente = function(evt)
        {
            if(_capa_desplegada_enlatado)_capa_desplegada_enlatado.className += " mm_capa_desplegada-sin_siguiente";
            //TODO: Error
        };


        var _loadTranscripcion = function(){
            _hay_trans = true;
            if((_menu_leer)&&(_menu_leer.parentElement.tagName=="LI"))_menu_leer.parentElement.style.display = "inline-block";
            if((_menu_leer_2)&&(_menu_leer_2.parentElement.tagName=="LI"))_menu_leer_2.parentElement.style.display = "inline-block";

            /*var filerefJS=document.createElement("script"),
                filenameJS = _data.genericData.urlBase ? (_data.genericData.urlBase + _URL_JS + "trans/transcription.js") : _URL_JS + "trans/transcription.js";

            filerefJS.setAttribute("src", filenameJS);
            filerefJS.setAttribute("type","text/javascript");
            filerefJS.onload = function(){*/

            if(_hay_trans){
                var elem = _getElementById("_trans");
                if(elem){
                    _URL_TRANS = _URL_TRANS.replace("CUENTA",_udn);

                    //console.log("PIDO TRANS DESDE ",_ID,"donde el id es",_data.mediaData.idTOP);


                    _that.tr = new emic.top.ui.Transcription(elem,_URL_TRANS + _data.mediaData.idTOP,0);
                    if(_skin_type==_SKIN_TYPE_PEQUENO)
                        _that.tr.minWidth = 540;
                    else
                        _that.tr.minWidth = 0;

                    //if(window.location.href.indexOf("palabra")>0)
                    //    _that.tr.minWidth = 10000;

                    if(_capa_sonando)_capa_sonando.className += " mm_capa_transcripcion";
                    if(_capa_sonando_2)_capa_sonando_2.className += " mm_capa_transcripcion";

                    _that.tr.removeEventListener("notranscription");
                    _that.tr.removeEventListener("ready");

                    _data.transcripcion = "con_transcripcion";

                    _that.tr.addEventListener("ready",function(){
                        _data.speakers = _that.tr.getSpeakers();
                        window._speakers = _data.speakers;
                    });
                    _that.tr.addEventListener("notranscription",function(){
                        _hay_trans = false;
                        //if(_capa_sonando)_capa_sonando.className += " mm_mostrar-controles";
                        //if(_capa_sonando_2)_capa_sonando_2.className += " mm_mostrar-controles";

                        _data.transcripcion = "sin_transcripcion";
                        _data.speakers = "sin_hablantes"
                        if((_menu_leer)&&(_menu_leer.parentElement.tagName=="LI"))_menu_leer.parentElement.style.display = "none";
                        if((_menu_leer_2)&&(_menu_leer_2.parentElement.tagName=="LI"))_menu_leer_2.parentElement.style.display = "none";

                        if(_soy_permanente&&(_menu_leer)&&(_menu_leer.parentElement.tagName=="UL"))_menu_leer.style.display = "none";
                        if(_soy_permanente&&(_menu_leer_2)&&(_menu_leer_2.parentElement.tagName=="UL"))_menu_leer_2.style.display = "none";

                        if(_capa_sonando)_capa_sonando.className = _capa_sonando.className.replace(" mm_capa_transcripcion","");
                        if(_capa_sonando_2)_capa_sonando_2.className = _capa_sonando_2.className.replace(" mm_capa_transcripcion","");
                    });

                    _that.tr.addEventListener("transcriptionready",function(){
                        if(!_oculta)
                            _hay_trans = true;
                    });
                }
            }else{
                _hay_trans = false;
                //if(_capa_sonando)_capa_sonando.className += " mm_mostrar-controles";
                //if(_capa_sonando_2)_capa_sonando_2.className += " mm_mostrar-controles";

                if((_menu_leer)&&(_menu_leer.parentElement.tagName=="LI"))_menu_leer.parentElement.style.display = "none";
                if((_menu_leer_2)&&(_menu_leer.parentElement.tagName=="LI"))_menu_leer_2.parentElement.style.display = "none";
            }
            //}
            //if(typeof filerefJS!="undefined")
            //    document.getElementsByTagName("head")[0].appendChild(filerefJS);
		}

		var _loadJQuery = function(){
            if(typeof(jQuery)=="undefined"){

                var filerefJS = document.createElement("script"),
			    filenameJS = _data.genericData.urlBase ? (_data.genericData.urlBase + _URL_JS + "dependencies/jquery-3.1.1.min.js") : _URL_JS + "dependencies/jquery-3.1.1.min.js";

                filerefJS.setAttribute("src", filenameJS);
                filerefJS.setAttribute("type","text/javascript");
			    filerefJS.onload = function(){
                    _loadJQueryUI();
                }

                if(typeof filerefJS!="undefined")
                    document.getElementsByTagName("head")[0].appendChild(filerefJS);
            }else{
                _loadJQueryUI();
            }
		};

        var _loadJQueryUI = function(){
            if(typeof(jQuery.ui)=="undefined"){
                var filerefJS = document.createElement("script"),
                    filenameJS = _data.genericData.urlBase ? (_data.genericData.urlBase + _URL_JS + "dependencies/jquery-ui.min.js") : _URL_JS + "dependencies/jquery-ui.min.js";

                filerefJS.setAttribute("src", filenameJS);
                filerefJS.setAttribute("type","text/javascript");
                filerefJS.onload = function(){
                    _that._runjQueryFunctions();
                }

                if(typeof filerefJS!="undefined")
                    document.getElementsByTagName("head")[0].appendChild(filerefJS);
            }else{
                _that._runjQueryFunctions();
            }
        };

		var _loadTemplate = function() {
			var _parser = new psd.framework.Parser(),
				templateMediator = new psd.framework.Mediator(),
				url = _data.genericData.urlBase ? (_data.genericData.urlBase + _URL_TEMPLATE + _template) : _URL_TEMPLATE + _template;
			//templateMediator.corsIE(true);

			templateMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_COMPLETE, onDataCompleteHertz, this);
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
                url = _URL_DIRECTO + "/" + _data.mediaData.idTOP;// + "?time=" + Math.random();

            directosMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_COMPLETE, onDataCompleteDirectos, this);
            directosMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_ERROR, onDataErrorDirectos, this);
            directosMediator.mediate(url, _jsonParser, psd.framework.Mediator.RESPONSE_JSON);
        }

        var _loadServicioActivo = function(){
            var _jsonParser = new psd.framework.parser.JSONParser(),
                servicioActivoMediator = new psd.framework.Mediator(),
                url = _URL_SERVICIO_ACTIVO;

            servicioActivoMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_COMPLETE, function(res){
                if(res.result.parserResult.result.status!=true)
                    _servicioActivo = false;
            }, this);
            servicioActivoMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_ERROR, function(){
                console.log("SERVICIO NO RESPONDE");
                _servicioActivo = false;
            }, this);
            servicioActivoMediator.mediate(url, _jsonParser, psd.framework.Mediator.RESPONSE_JSON);
        }

        var _loadTFP = function() {

            if((typeof(_that.getPlayer())!="undefined")
                &&(typeof(_that.getPlayer().getLauncher())!="undefined")
                &&(typeof(_that.getPlayer().getLauncher().data_FAPI)!="undefined")
                &&(_that.getPlayer().getLauncher().data_FAPI!={})
                )
            {
                var urls = _that.getPlayer().getLauncher().data_FAPI.data[0].asset[0].url;
                var _url_descarga = urls[0].url;

                _videoPregenerado = false;

                var pintar_descarga = false;

                for(var i=0;i<urls.length;i++){
                    if(urls[i].type_url.name=="TAPFORPODCAST"){
                        pintar_descarga = true;
                        if(_url_descarga.indexOf("dist")>0)
                            _url_descarga = urls[i].url.replace("?dist=" + mm_dist,"?dist=PRISA_ES_CADENASER_WEB_DOWNLOAD&csegid=22000");
                        else
                            _url_descarga = urls[i].url + "?dist=PRISA_ES_CADENASER_WEB_DOWNLOAD&csegid=22000";
                    }
                }

                if(typeof(_that.getPlayer().getLauncher().data_FAPI.data[0].asset[1])!="undefined"){
                    if(_that.getPlayer().getLauncher().data_FAPI.data[0].asset[1]['type']['name']=="VIDEO"){
                        _videoPregenerado = true;
                    }
                }

                if(pintar_descarga){
                    if(_menu_descargar)_menu_descargar.href = _url_descarga;
                    if(_menu_descargar_2)_menu_descargar_2.href = _url_descarga;
                }else{
                    if(_menu_descargar)_menu_descargar.parentNode.style.display = "none";
                    if(_menu_descargar_2)_menu_descargar_2.parentNode.style.display = "none";
                }

                //miramos si existe el tag para no pintar la transcripción
                var tags = _that.getPlayer().getLauncher().data_FAPI.data[0].tags;
                var ocultar_trans = false;

                var segmento = "";

                for(var tag in tags){
                    if(tags[tag]['name']=="ocultar_transcripcion"){
                        ocultar_trans = true;
                        _oculta = true;
                    }
                    if(tags[tag]['name']=="automaticos"){
                        _data.extraccion = "automaticos";
                    }
                    if(tags[tag]['type']=="P"){
                        segmento += tags[tag]["name"];
                    }
                    if(tags[tag]['type']=="S"){
                        segmento += tags[tag]["name"];
                    }
                }

                _data.segmento = segmento;

                if(ocultar_trans){
                    _hay_trans = false;
                    //if(_capa_sonando)_capa_sonando.className += " mm_mostrar-controles";
                    //if(_capa_sonando_2)_capa_sonando_2.className += " mm_mostrar-controles";
                }
            }
        };

        var onDataCompleteTFP = function (evt) {
            if (evt.result.parserResult.code == _CODE_NUM_PARSER_OK)
            {
                var urls = evt.result.parserResult.result.data[0].asset[0].url;
                var _url_descarga = urls[0];

                var pintar_descarga = false;

                for(var i=0;i<urls.length;i++){
                    if(urls[i].type_url.name=="TAPFORPODCAST"){
                        pintar_descarga = true;
                        if(_url_descarga.indexOf("dist")>0)
                            _url_descarga = urls[i].url.replace("?dist=" + mm_dist,"?dist=PRISA_ES_CADENASER_WEB_DOWNLOAD&csegid=22000");
                        else
                            _url_descarga = urls[i].url + "?dist=PRISA_ES_CADENASER_WEB_DOWNLOAD&csegid=22000";
                    }
                }

                if(pintar_descarga){
                    if(_menu_descargar)_menu_descargar.href = _url_descarga;
                    if(_menu_descargar_2)_menu_descargar_2.href = _url_descarga;
                }else{
                    if(_menu_descargar)_menu_descargar.parentNode.style.display = "none";
                    if(_menu_descargar_2)_menu_descargar_2.parentNode.style.display = "none";
                }
            }
            else if (evt.result.parserResult.code == _CODE_NUM_PARSER_ERROR)
            {
                //TODO: Error
            }
        };

        var onDataErrorTFP = function(evt)
        {
            //TODO: Error
        };


        var onDataCompleteZonas = function (evt) {
            if (evt.result.parserResult.code == _CODE_NUM_PARSER_OK)
            {
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

        var onDataCompleteEmisoras = function (evt) {

            if (evt.result.parserResult.code == _CODE_NUM_PARSER_OK)
            {
                o_emisoras = evt.result.parserResult.result;

                var _codigopais = 1;
                var _codigoandorra = 6;

                for(zona in o_zonas["Provincia"]){
                    o_zonas.Provincia[zona].emisoras = [];
                }

                for(emisora in o_emisoras){
                    for(op in o_zonas["Provincia"]){
                        if(o_zonas.Provincia[op].IdProvincia==o_emisoras[emisora].IdProvincia){
                            o_zonas.Provincia[op].emisoras.push(o_emisoras[emisora]);
                        }
                    }
                    //o_zonas.Provincia[o_emisoras[emisora]["IdProvincia"]-1].emisoras.push(o_emisoras[emisora]);
                }

                if(_ul_provincia)_ul_provincia.innerHTML = "";
                if(_ul_provincia_2)_ul_provincia_2.innerHTML = "";

                for(var i in o_zonas["Provincia"]){
                    var izona = (function(que){return que;})(i);

                    //var _option =  new Option(o_zonas.Provincia[zona]["Provincia"], zona);
                    var ul_provincia_li =  document.createElement("li");
                    var ul_provincia_li_a =  document.createElement("a");
                    ul_provincia_li_a.innerHTML = o_zonas.Provincia[izona]["Provincia"];

                    ul_provincia_li.appendChild(ul_provincia_li_a);

                    //Option(o_zonas.Provincia[zona]["Provincia"], zona);
                    ooo_zonas[ooo_zonas.length] = o_zonas["Provincia"][izona];

                    if(((o_zonas.Provincia[izona].IdPais==_codigopais))||(o_zonas.Provincia[izona].IdPais==_codigoandorra)){
                        //_selectZona.options[_selectZona.options.length] = _option;

                        var _ul_click = (function(_zona){
                            return function(){
                                _selectedIndex = _zona;

                                //_selectEmisora.options.length = 0;
                                if(_ul_emisora)_ul_emisora.innerHTML = "";
                                if(_ul_emisora_2)_ul_emisora_2.innerHTML = "";
                                if(_selector_provincia_a)_selector_provincia_a.innerHTML = o_zonas.Provincia[_zona]["Provincia"];
                                if(_selector_provincia_a_2)_selector_provincia_a_2.innerHTML = o_zonas.Provincia[_zona]["Provincia"];


                                /*if(_selector_emisora_a)_selector_emisora_a.innerHTML = "EMISORA";
                                if(_selector_emisora_a_2)_selector_emisora_a_2.innerHTML = "EMISORA";*/

                                if(_selector_emisora_a){
                                    _selector_emisora_a.innerHTML = ooo_zonas[_zona].emisoras[0].Nombre;
                                    _selectedEmisora = ooo_zonas[_selectedIndex].emisoras[0].TagName;
                                }
                                if(_selector_emisora_a_2){
                                    _selector_emisora_a_2.innerHTML = ooo_zonas[_zona].emisoras[0].Nombre;
                                    _selectedEmisora = ooo_zonas[_selectedIndex].emisoras[0].TagName;
                                }

                                for(emisora in ooo_zonas[_zona].emisoras){
                                    /*
                                     var _optione =  new Option(ooo_zonas[_selectZona.selectedIndex].emisoras[emisora].Nombre, ooo_zonas[_selectZona.selectedIndex].emisoras[emisora].TagName);
                                     if(_selectEmisora)
                                     _selectEmisora.options[_selectEmisora.options.length] = _optione;
                                     */
                                    var ul_emisora_li = document.createElement("li");
                                    var ul_emisora_li_a = document.createElement("a");
                                    ul_emisora_li_a.innerHTML = ooo_zonas[_selectedIndex].emisoras[emisora].Nombre;
                                    ul_emisora_li.appendChild(ul_emisora_li_a);

                                    var li_a_click =  (function(_emisora){
                                        return function(){
                                            if(_selector_emisora_a){
                                                _selector_emisora_a.innerHTML = ooo_zonas[_selectedIndex].emisoras[_emisora].Nombre;
                                                _selectedEmisora = ooo_zonas[_selectedIndex].emisoras[_emisora].TagName;
                                            }
                                            if(_selector_emisora_a_2){
                                                _selector_emisora_a_2.innerHTML = ooo_zonas[_selectedIndex].emisoras[_emisora].Nombre;
                                            }
                                        }
                                    })(emisora);

                                    ul_emisora_li_a.onclick = li_a_click;
                                    _ul_emisora.appendChild(ul_emisora_li);

                                    var ul_emisora_li_2 = document.createElement("li");
                                    var ul_emisora_li_a_2 = ul_emisora_li_a.cloneNode(true);
                                    ul_emisora_li_a_2.onclick = li_a_click;
                                    ul_emisora_li_2.appendChild(ul_emisora_li_a_2)
                                    _ul_emisora_2.appendChild(ul_emisora_li_2);
                                }
                                return false;
                            }
                        })(izona);

                        ul_provincia_li.onclick = _ul_click;

                        if(_ul_provincia){
                            _ul_provincia.appendChild(ul_provincia_li);
                            var ul_provincia_li_2 = ul_provincia_li.cloneNode(true);
                            ul_provincia_li_2.onclick = _ul_click;
                            _ul_provincia_2.appendChild(ul_provincia_li_2);
                        }
                    }else{
                    }
                }

                for(emisora in ooo_zonas[0].emisoras){
                    //var _optione =  new Option(ooo_zonas[_selectZona.selectedIndex].emisoras[emisora].Nombre, ooo_zonas[_selectZona.selectedIndex].emisoras[emisora].TagName);
                    var _optione = document.createElement("li");
                    _optione.innerHTML = ooo_zonas[_selectedIndex].emisoras[emisora].Nombre;
                    /*if(_selectEmisora)
                        _selectEmisora.options[_selectEmisora.options.length] = _optione;*/
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

		var onDataCompleteHertz = function (evt)
		{
			var template;
			if (evt.result.parserResult.code == _CODE_NUM_PARSER_OK)
			{
				template = evt.result.parserResult.result.replace(/{<-%ID%->}/g,_ID);
				_container.innerHTML = template;
				_assignElements.apply(this);

                if(!this.soyPlayerView){
				    this.notifyInitComplete();
                    //window.playerView_current_status = emic.top.MediaModule.STATUS_PAUSE;
                }
                else{
                    this.initPlayerView();
                }

                _loadJQuery.apply(this);

                _that.checkTituloDoble();
                _that.checkTituloDoble_enlatado();

//				_loadTranscripcion.apply(this);
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

        var onDataCompleteDirectos = function (evt) {
            if (evt.result.parserResult.code == _CODE_NUM_PARSER_OK)
            {
                infodirecto = evt.result.parserResult.result;
                if((infodirecto!=undefined)&&(infodirecto!="")){
                    if((_directo_presentador)&&(infodirecto.presentador))_directo_presentador.innerHTML = infodirecto.presentador;
                    if((_directo_programa_strong)&&(infodirecto.titulo))_directo_programa_strong.innerHTML = infodirecto.titulo;
                    if((_directo_programa_strong_2)&&(infodirecto.titulo))_directo_programa_strong_2.innerHTML = infodirecto.titulo;
                    if((_directo_programa_strong_3)&&(infodirecto.titulo))_directo_programa_strong_3.innerHTML = infodirecto.titulo;
                    if((_directo_emisora)&&(_data.mediaData.title))_directo_emisora.innerHTML = _data.mediaData.title;
                    if((_directo_emisora_2)&&(_data.mediaData.title))_directo_emisora_2.innerHTML = _data.mediaData.title;

                    _that.checkTituloDoble();

                    if((typeof(infodirecto.imagenes)!="undefined")
                        &&(typeof(infodirecto.imagenes.GEN_100x100)!="undefined")
                        ){
                        if(_cover_directo)_cover_directo.src = infodirecto.imagenes.GEN_100x100;
                        if(_cover_directo_2)_cover_directo_2.src = infodirecto.imagenes.GEN_100x100;
                        if(_cover){_cover.style.visibility = "visible";_cover.src = infodirecto.imagenes.GEN_100x100;}
                        if(_cover_){_cover_.style.visibility = "visible";_cover_.src = infodirecto.imagenes.GEN_100x100;}
                        if(_cover_2){_cover_2.style.visibility = "visible";_cover_2.src = infodirecto.imagenes.GEN_100x100;}
                        if(_cover_3){_cover_3.style.visibility = "visible";_cover_3.src = infodirecto.imagenes.GEN_100x100;}
                        if(_cover_4){_cover_4.style.visibility = "visible";_cover_4.src = infodirecto.imagenes.GEN_100x100;}
                        if(_cover_5){_cover_5.style.visibility = "visible";_cover_5.src = infodirecto.imagenes.GEN_100x100;}
                    }

                    _data.mediaData.nombrePrograma = infodirecto.titulo;

                    _that.checkTituloDoble();
                }
            }
        }

        var onDataErrorDirectos = function(evt)
        {
            //TODO: Error
        };

        this.checkTituloDoble = function(){
            if(infodirecto==null)
                return;

            if((_directo_programa_strong)&&(_directo_programa)&&(_directo_programa_strong.offsetWidth>_directo_programa.offsetWidth)){
                if(_directo_programa)_directo_programa.className = _directo_programa.className.replace(/ mm_programa-largo/g,"");
                if(_directo_programa_strong)_directo_programa_strong.innerHTML = infodirecto.titulo + " | " + infodirecto.titulo;
                if(_directo_programa)_directo_programa.className += " mm_programa-largo";
            }else{
                if(_directo_programa) _directo_programa.className = _directo_programa.className.replace(/ mm_programa-largo/g,"");
                if(_directo_programa_strong)_directo_programa_strong.innerHTML = infodirecto.titulo;
            }
            if((_directo_programa_strong_2)&&(_directo_programa_2)&&(_directo_programa_strong_2.offsetWidth>_directo_programa_2.offsetWidth)){
                if(_directo_programa_2)_directo_programa_2.className = _directo_programa_2.className.replace(/ mm_programa-largo/g,"");
                if(_directo_programa_strong_2) _directo_programa_strong_2.innerHTML = infodirecto.titulo + " | " + infodirecto.titulo;
                if(_directo_programa_2)_directo_programa_2.className += " mm_programa-largo";
            }else{
                if(_directo_programa_2)_directo_programa_2.className = _directo_programa_2.className.replace(/ mm_programa-largo/g,"");
                if(_directo_programa_strong_2)_directo_programa_strong_2.innerHTML = infodirecto.titulo;
            }
            if((_directo_programa_strong_3)&&(_directo_programa_3)&&(_directo_programa_strong_3.offsetWidth>_directo_programa_3.offsetWidth)){
                if(_directo_programa_3)_directo_programa_3.className = _directo_programa_3.className.replace(/ mm_programa-largo/g,"");
                if(_directo_programa_strong_3)_directo_programa_strong_3.innerHTML = infodirecto.titulo + " | " + infodirecto.titulo;
                if(_directo_programa_3)_directo_programa_3.className += " mm_programa-largo";
            }else{
                if(_directo_programa_3)_directo_programa_3.className = _directo_programa_3.className.replace(/ mm_programa-largo/g,"");
                if(_directo_programa_strong_3)_directo_programa_strong_3.innerHTML = infodirecto.titulo;
            }
        }

        this.checkTituloDoble_enlatado = function(){
            if((!_soy_permanente)&&(titulo_2_a)){
                if((titulo_2_a)&&(_titulo_2)&&(titulo_2_a.offsetWidth>=_titulo_2.offsetWidth)){
                    if(_titulo_2)_titulo_2.className = _titulo_2.className.replace(/ mm_programa-largo/g,"");
                    if(titulo_2_a)titulo_2_a.innerText = _data.mediaData.title + " | " + _data.mediaData.title;
                    if(_titulo_2)_titulo_2.className += " mm_programa-largo";
                }else{
                    if(_titulo_2)_titulo_2.className = _titulo_2.className.replace(/ mm_programa-largo/g,"");
                    if(titulo_2_a)titulo_2_a.innerText = _data.mediaData.title;
                }
            }
        }

        this.setPlayerviewReset = function(launcher){
            if((launcher==null)||(typeof(launcher)=="undefined"))
                return false;

            _reset_no_cortar = true;

            for(var i in _botones_play){
                if(_botones_play[i]){
                    _botones_play[i].onclick = function(){

                        //MAGIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
                        window.playlistHertz = false;

                        launcher.reset(undefined,_data.genericData.id_cuenta,_data.mediaData.idTOP,{"player":{"autoplay":true}});
                        //document.getElementById(_data.genericData.container).innerHTML = "";
                        //console.log(123123);

                        launcher.getMediaPlayer().createPlayerView(_data.genericData.container,{"_playerview_skin_type":_skin_type,"_playerview_skin_color":_that._playerview_color});
                        _that.notifyOrderExternal(namespace.hertz_events.RESET_PLAYERVIEW,{"id":_data.mediaData.idTOP,"alternativo":false});

                        return false;
                    }
                }
            }
        };

        this.setPlayerviewVars = function(){
            if(window._aux_playerviewinfo){
                for(var i in window._aux_playerviewinfo){
                    _that[i] = window._aux_playerviewinfo[i];
                }
            }

            window._aux_playerviewinfo = null;
        };

        this.initPlayerView = function(){
            if(_data.internalData.position!=emic.top.TopPlayer.POSITION_PREVIEW){
                _show_playing();
                //console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAALLLLLLLLLLLLLLLLLLLLLLL");
                //console.log(window.playerView_current_status,"<<<<<<");
            }else{
                if(_cover){_cover.style.visibility = "invisible";}
                if(_cover_){_cover_.style.visibility = "invisible";}
                if(_cover_2){_cover_2.style.visibility = "invisible";}
                if(_cover_3){_cover_3.style.visibility = "invisible";}
                if(_cover_4){_cover_4.style.visibility = "invisible";}
                if(_cover_5){_cover_5.style.visibility = "invisible";}
            }
        };

		var _getElementById = function(id){
			return document.getElementById(_ID + id);
		};

		this._runjQueryFunctions = function(){
			//click sobre la capa de progreso

            if(jQuery.ui){
                !function(a){function f(a,b){if(!(a.originalEvent.touches.length>1)){a.preventDefault();var c=a.originalEvent.changedTouches[0],d=document.createEvent("MouseEvents");d.initMouseEvent(b,!0,!0,window,1,c.screenX,c.screenY,c.clientX,c.clientY,!1,!1,!1,!1,0,null),a.target.dispatchEvent(d)}}if(a.support.touch="ontouchend"in document,a.support.touch){var e,b=a.ui.mouse.prototype,c=b._mouseInit,d=b._mouseDestroy;b._touchStart=function(a){var b=this;!e&&b._mouseCapture(a.originalEvent.changedTouches[0])&&(e=!0,b._touchMoved=!1,f(a,"mouseover"),f(a,"mousemove"),f(a,"mousedown"))},b._touchMove=function(a){e&&(this._touchMoved=!0,f(a,"mousemove"))},b._touchEnd=function(a){e&&(f(a,"mouseup"),f(a,"mouseout"),this._touchMoved||f(a,"click"),e=!1)},b._mouseInit=function(){var b=this;b.element.bind({touchstart:a.proxy(b,"_touchStart"),touchmove:a.proxy(b,"_touchMove"),touchend:a.proxy(b,"_touchEnd")}),c.call(b)},b._mouseDestroy=function(){var b=this;b.element.unbind({touchstart:a.proxy(b,"_touchStart"),touchmove:a.proxy(b,"_touchMove"),touchend:a.proxy(b,"_touchEnd")}),d.call(b)}}}(jQuery);
            }

            //slider volumen
            jQuery("#"  + _ID + "_mm_volumen_slider").slider({
                min: 0,
                max: 100,
                value: 50,
                range: "min",
                slide: function(event, ui) {
                    /* aqui iría la función que sube o baja el volumen según la posición del slider */
                    /* p.e. setVolume(ui.value / 85); */

                    _that.notifyOrderVolumeChange(ui.value/100);
                    if(ui.value==0){
                        _muted = true;
                    }else{
                        _muted = false;
                    }

                    /* si el valor del slider es mayor que 0 y está el icono del mute, lo quito */
                    if(ui.value > 0){
                        jQuery("#"  + _ID + "_mm_control_sonido").addClass('mm_control_sonido').removeClass('mm_control_mute');
                    }else{
                        jQuery("#"  + _ID + "_mm_control_sonido").addClass('mm_control_mute').removeClass('mm_control_sonido');
                    }
                }
            });

            //slider de progress en player grande versión móvil
            if(_mm_volumen_slider_2){
                jQuery("#"  + _ID + "_mm_volumen_slider_2").slider({
                    min: 0,
                    max: 100,
                    value: 0,
                    range: "min",
                    start: function(event, ui){
                        window._dragging_progress = true;
                    },
                    stop: function(event, ui){
                        _that.notifyOrderSeekByProp(ui.value/100);
                        window._dragging_progress = false;
                    },
                    slide: function(event, ui) {
                        var auxtime = (_totalTime*ui.value)/100;
                        if(_current_time_2)_current_time_2.innerHTML = _that.secondsAsTimeCode(auxtime,_durationFormat);
                        if(_current_time_3)_current_time_3.innerHTML = _that.secondsAsTimeCode(auxtime,_durationFormat);
                        if(_current_time_4)_current_time_4.innerHTML = _that.secondsAsTimeCode(auxtime,_durationFormat);
                        if(_current_time_5)_current_time_5.innerHTML = _that.secondsAsTimeCode(auxtime,_durationFormat);
                    }
                });
            }

            if(jQuery.ui){
                jQuery("#"  + _ID + "_mm_seek_slider").slider({
                    min: 0,
                    max: 100,
                    value: 0,
                    range: "min",
                    start: function(event, ui){
                        window._dragging_progress = true;
                    },
                    stop: function(event, ui){
                        _that.notifyOrderSeekByProp(ui.value/100);
                        window._dragging_progress = false;
                    },
                    slide: function(event, ui) {
                        var auxtime = (_totalTime*ui.value)/100;
                        if(_current_time_2)_current_time_2.innerHTML = _that.secondsAsTimeCode(auxtime,_durationFormat);
                        if(_current_time_3)_current_time_3.innerHTML = _that.secondsAsTimeCode(auxtime,_durationFormat);
                        if(_current_time_4)_current_time_4.innerHTML = _that.secondsAsTimeCode(auxtime,_durationFormat);
                        if(_current_time_5)_current_time_5.innerHTML = _that.secondsAsTimeCode(auxtime,_durationFormat);

                        if(_capa_sonando){
                            if(_capa_sonando.className.indexOf("cortar")>0){
                                return;
                            }
                            _capa_sonando.className = _capa_sonando.className.replace(/ mm_mostrar-controles/g,"");
                            _capa_sonando.className += " mm_mostrar-controles";

                            clearTimeout(timeout_ocultar_botones)
                            timeout_ocultar_botones = setTimeout(function(){
                                if(_hay_trans)
                                    _capa_sonando.className = _capa_sonando.className.replace(/ mm_mostrar-controles/g,"");
                            },3000);
                        }

                        if(_capa_sonando_2){
                            if(_capa_sonando_2.className.indexOf("cortar")>0){
                                return;
                            }
                            _capa_sonando_2.className = _capa_sonando_2.className.replace(/ mm_mostrar-controles/g,"");
                            _capa_sonando_2.className += " mm_mostrar-controles";

                            clearTimeout(timeout_ocultar_botones)
                            timeout_ocultar_botones = setTimeout(function(){
                                if(_hay_trans)
                                    _capa_sonando_2.className = _capa_sonando_2.className.replace(/ mm_mostrar-controles/g,"");
                            },3000);
                        }
                    }
                });
            }

            if(jQuery.ui){
                jQuery("#"  + _ID + "_mm_seek_slider_3").slider({
                    min: 0,
                    max: 100,
                    value: 0,
                    range: "min",
                    start: function(event, ui){
                        window._dragging_progress = true;
                    },
                    stop: function(event, ui){
                        _that.notifyOrderSeekByProp(ui.value/100);
                        window._dragging_progress = false;
                    },
                    slide: function(event, ui) {
                        var auxtime = (_totalTime*ui.value)/100;
                        if(_current_time_2)_current_time_2.innerHTML = _that.secondsAsTimeCode(auxtime,_durationFormat);
                        if(_current_time_3)_current_time_3.innerHTML = _that.secondsAsTimeCode(auxtime,_durationFormat);
                        if(_current_time_4)_current_time_4.innerHTML = _that.secondsAsTimeCode(auxtime,_durationFormat);
                        if(_current_time_5)_current_time_5.innerHTML = _that.secondsAsTimeCode(auxtime,_durationFormat);

                        if(_capa_sonando){
                            if(_capa_sonando.className.indexOf("cortar")>0){
                                return;
                            }
                            _capa_sonando.className = _capa_sonando.className.replace(/ mm_mostrar-controles/g,"");
                            _capa_sonando.className += " mm_mostrar-controles";

                            clearTimeout(timeout_ocultar_botones)
                            timeout_ocultar_botones = setTimeout(function(){
                                if(_hay_trans)
                                    _capa_sonando.className = _capa_sonando.className.replace(/ mm_mostrar-controles/g,"");
                            },3000);
                        }

                        if(_capa_sonando_2){
                            if(_capa_sonando_2.className.indexOf("cortar")>0){
                                return;
                            }
                            _capa_sonando_2.className = _capa_sonando_2.className.replace(/ mm_mostrar-controles/g,"");
                            _capa_sonando_2.className += " mm_mostrar-controles";

                            clearTimeout(timeout_ocultar_botones)
                            timeout_ocultar_botones = setTimeout(function(){
                                if(_hay_trans)
                                    _capa_sonando_2.className = _capa_sonando_2.className.replace(/ mm_mostrar-controles/g,"");
                            },3000);
                        }
                    }
                });
            }

            if(jQuery.ui){
                jQuery("#"  + _ID + "_mm_seek_slider_2").slider({
                    min: 0,
                    max: 100,
                    value: 0,
                    range: "min",
                    start: function(event, ui){
                        window._dragging_progress = true;
                    },
                    stop: function(event, ui){
                        _that.notifyOrderSeekByProp(ui.value/100);
                        window._dragging_progress = false;
                    },
                    slide: function(event, ui) {
                        var auxtime = (_totalTime*ui.value)/100;
                        if(_current_time)_current_time.innerHTML = _that.secondsAsTimeCode(auxtime,_durationFormat);
                        if(_current_time_2)_current_time_2.innerHTML = _that.secondsAsTimeCode(auxtime,_durationFormat);
                        if(_current_time_3)_current_time_3.innerHTML = _that.secondsAsTimeCode(auxtime,_durationFormat);
                        if(_current_time_4)_current_time_4.innerHTML = _that.secondsAsTimeCode(auxtime,_durationFormat);
                        if(_current_time_5)_current_time_5.innerHTML = _that.secondsAsTimeCode(auxtime,_durationFormat);

                        if(_corte_2){
                            _corte_2.style.left = (parseInt(jQuery("#"  + _ID + "_mm_seek_slider_2").css("width"))*ui.value/100) + "px";
                            _corte_2.style.width = 3000/(_data.mediaData.duration/1000) + "%";
                            _corte_2.style.height = "100%";
                            if(_corte_2.offsetWidth+_corte_2.offsetLeft>parseInt(jQuery("#"  + _ID + "_mm_seek_slider_2").css("width"))){
                                _corte_2.style.width = (parseInt(jQuery("#"  + _ID + "_mm_seek_slider_2").css("width")) - _corte_2.offsetLeft) + "px";
                            }
                        }

                        if(_capa_sonando){
                            if(_capa_sonando.className.indexOf("cortar")>0){
                                if(_corte_2){
                                    var percent = parseInt(_corte_2.style.left)*100/parseInt(jQuery("#"  + _ID + "_mm_seek_slider_2").css("width"));
                                    _rrss_time = _data.mediaData.duration*percent/100;

                                    _that.notifyOrderPause();
                                    last_cortar_start_time = _rrss_time/1000;
                                }
                                _that.notifyOrderExternal(namespace.hertz_events.ORDER_SEGUNDOS_COMPARTIR,{"id":_data.mediaData.idTOP,"seconds":_rrss_time/1000});
                                return;
                            }
                            _capa_sonando.className = _capa_sonando.className.replace(/ mm_mostrar-controles/g,"");
                            _capa_sonando.className += " mm_mostrar-controles";

                            clearTimeout(timeout_ocultar_botones)
                            timeout_ocultar_botones = setTimeout(function(){
                                if(_hay_trans)
                                    _capa_sonando.className = _capa_sonando.className.replace(/ mm_mostrar-controles/g,"");
                            },3000);
                        }
                        if(_capa_sonando_2){
                            if(_capa_sonando_2.className.indexOf("cortar")>0){
                                if(_corte_2){
                                    var percent = parseInt(_corte_2.style.left)*100/parseInt(jQuery("#"  + _ID + "_mm_seek_slider_2").css("width"));
                                    _rrss_time = _data.mediaData.duration*percent/100;
                                }
                                _that.notifyOrderExternal(namespace.hertz_events.ORDER_SEGUNDOS_COMPARTIR,{"id":_data.mediaData.idTOP,"seconds":_rrss_time/1000});
                                return;
                            }
                            _capa_sonando_2.className = _capa_sonando_2.className.replace(/ mm_mostrar-controles/g,"");
                            _capa_sonando_2.className += " mm_mostrar-controles";

                            clearTimeout(timeout_ocultar_botones)
                            timeout_ocultar_botones = setTimeout(function(){
                                if(_hay_trans)
                                    _capa_sonando_2.className = _capa_sonando_2.className.replace(/ mm_mostrar-controles/g,"");
                            },3000);
                        }
                    }
                });
            }
            /*
            jQuery("#"  + _ID + "_mm_volumen_slider").slider({value:0});
            jQuery("#"  + _ID + "_mm_volumen_slider_2").slider({value:0});
            jQuery("#"  + _ID + "_mm_seek_slider").slider({value:0});
            jQuery("#"  + _ID + "_mm_seek_slider_2").slider({value:0});
            jQuery("#"  + _ID + "_mm_seek_slider_3").slider({value:0});
            */


			jQuery("#" + _ID + "_track").bind('click', function (ev) {
                var $div = jQuery("#" + _ID + "_track");
                var offset = $div.offset();
                var x = ev.clientX - offset.left;
                var percent = x/$div.width();

                _that.notifyOrderSeekByProp(percent.toFixed(2));
            });

            jQuery("#" + _ID + "_track_2").bind('click', function (ev) {
                var $div = jQuery("#" + _ID + "_track_2");
                var offset = $div.offset();
                var x = ev.clientX - offset.left;
                var percent = x/$div.width();

                _that.notifyOrderSeekByProp(percent.toFixed(2));
            });

            jQuery("#" + _ID + "_track_back").bind('click', function (ev) {
                if(_mm_player.offsetWidth<__MINSIZE)
                {
                    var $div = jQuery("#" + _ID + "_track_back");
                    var offset = $div.offset();
                    var x = ev.clientX - offset.left;
                    var percent = x/$div.width();

                    _that.notifyOrderSeekByProp(percent.toFixed(2));
                }
                });

            jQuery("#" + _ID + "_mm_sonido_barras").bind('click', function (ev) {
                var $div = jQuery("#" + _ID + "_mm_sonido_barras");
                var offset = $div.offset();
                var x = ev.clientX - offset.left;
                var percent = x/$div.width();

                _that.notifyOrderSeekByProp(percent.toFixed(2));
            });

            jQuery("#"  + _ID + "_mm_boton_mostrar_tooltip").on('click', function(e){
                e.preventDefault();
                var $parent = $(this).closest('.mm_bloque_ayuda');
                $parent.find('.mm_tooltip').addClass('mm_activo');
            })

            /* ocultar tooltip de ayuda para compartir en version movil */
            jQuery("#"  + _ID + "_mm_boton_ocultar_tooltip").on('click', function(e){
                e.preventDefault();
                var $parent = $(this).closest('.mm_bloque_ayuda');
                $parent.find('.mm_tooltip').removeClass('mm_activo');
            })

			jQuery("#"  + _ID + "_mm_control_sonido").on('click', function(e){
				e.preventDefault();
				if(!_muted){
					_that.notifyOrderVolumeChange(0);
					_muted = true;
					jQuery("#"  + _ID + "_mm_control_sonido").addClass('mm_control_sonido').removeClass('mm_control_mute');
				}
				else{
					_that.notifyOrderVolumeChange(_last_volume);
					_muted = false;
					jQuery("#"  + _ID + "_mm_control_sonido").addClass('mm_control_mute').removeClass('mm_control_sonido');
				}

				/* alterno las clases de volumen y mute */
				$(this).toggleClass('mm_control_sonido mm_control_mute');
				/* si le doy a mute, muevo el slider al valor 0 */
                if(jQuery.ui)
				if($(this).hasClass('mm_control_mute')){
				  jQuery("#"  + _ID + "mm_volumen_slider").slider( 'option', 'value', 0 );
				}
			});

            jQuery("#" + _ID + "_mm_seek_slider_2").bind('mousedown', function (ev) {
                window._dragging_progress = true;
                emic.top.debug("dragging_progress TRUE", window._dragging_progress);
            });

            jQuery("#" + _ID + "_mm_seek_slider_2").bind('mouseup', function (ev) {
                window._dragging_progress = false;
                emic.top.debug("dragging_progress FALSE", window._dragging_progress);
            });

            if((_corte_2)&&(jQuery.ui)){
                _corte_2.style.left = (parseInt(jQuery("#"  + _ID + "_mm_seek_slider_2").css("width"))*jQuery("#"  + _ID + "_mm_seek_slider_2").slider("value")/100) + "px";
                _corte_2.style.width = 3000/(_data.mediaData.duration/1000) + "%";
                _corte_2.style.height = "100%";
                if(_corte_2.offsetWidth+_corte_2.offsetLeft>parseInt(jQuery("#"  + _ID + "_mm_seek_slider_2").css("width"))){
                    _corte_2.style.width = (parseInt(jQuery("#"  + _ID + "_mm_seek_slider_2").css("width")) - _corte_2.offsetLeft) + "px";
                }
            }
        }

		var _assignElements = function(){

			//asignamos los elementos
			_mm_player = 			_getElementById("_mm_player");
			_btn_play_grande = 		_getElementById("_mm_boton_play");
			_btn_play = 			_getElementById("_mm_control_play");
            _btn_play_2 = 			_getElementById("_mm_boton_play_2");
            _btn_play_3 = 			_getElementById("_mm_boton_play_3");
            _btn_play_4 = 			_getElementById("_mm_boton_play_4");
			_capa_sonando = 		_getElementById("_capa_sonando");
            _capa_sonando_2 = 		_getElementById("_capa_sonando_2");
			_track = 				_getElementById("_track");
            _track_2 = 				_getElementById("_track_2");
			_track_span = 			_getElementById("_track_span");
            _track_span_2 = 		_getElementById("_track_span_2");
            _current_time = 		_getElementById("_current_time");
            _current_time_2 = 		_getElementById("_current_time_2");
            _current_time_3 = 		_getElementById("_current_time_3");
            _current_time_4 = 		_getElementById("_current_time_4");
            _current_time_5 = 		_getElementById("_current_time_5");
            _total_time = 			_getElementById("_total_time");
            _total_time_2 = 		_getElementById("_total_time_2");
            _total_time_3 = 		_getElementById("_total_time_3");
            _total_time_4 = 		_getElementById("_total_time_4");
            _total_time_5 = 		_getElementById("_total_time_5");
			_volumen = 				_getElementById("_mm_control_sonido");
			_cover = 				_getElementById("_cover");
			_cover_ = 				_getElementById("_cover_");
            _cover_2 = 				_getElementById("_cover_2");
            _cover_3 = 				_getElementById("_cover_3");
            _cover_4 = 				_getElementById("_cover_4");
            _cover_5 = 				_getElementById("_cover_5");
            _cover_directo =    	_getElementById("_cover_directo");
            _cover_directo_2 =    	_getElementById("_cover_directo_2");
			_duration = 			_getElementById("_duration");
			_capa_menu = 			_getElementById("_capa_menu");
            _capa_menu_2 = 			_getElementById("_capa_menu_2");
            _capa_desplegada_enlatado = _getElementById("_capa_desplegada_enlatado");
            _capa_desplegada_live = _getElementById("_capa_desplegada_live");
			_boton_compartir = 		_getElementById("_boton_compartir");
            _boton_compartir_2 = 	_getElementById("_boton_compartir_2");
            _boton_compartir_3 = 	_getElementById("_boton_compartir_3");
			_boton_cerrar_menu = 	_getElementById("_mm_boton_cerrar_menu");
            _boton_cerrar_menu_2 = 	_getElementById("_mm_boton_cerrar_menu_2");
            _cerrar_cambiar =       _getElementById("_cerrar_cambiar");
			_titulo_menu = 			_getElementById("_mm_titulo_menu");
			_titulo = 				_getElementById("_titulo");
            _titulo_2 = 			_getElementById("_titulo_2");
            _titulo_3 = 			_getElementById("_titulo_3");
            _boton_menu = 			_getElementById("_mm_boton_menu");
            _boton_menu_2 = 		_getElementById("_mm_boton_menu_2");
            _boton_menu_3 = 		_getElementById("_mm_boton_menu_3");
            _boton_menu_4 = 		_getElementById("_mm_boton_menu_4");
			_logo_cadenaser = 		_getElementById("_logo_cadenaser");
			_logo_playser = 		_getElementById("_logo_playser");
            _logo_playser_2 = 		_getElementById("_logo_playser_2");
			_menu_compartir = 		_getElementById("_menu_compartir");
			_menu_embeber = 		_getElementById("_menu_embeber");
			_menu_guardar = 		_getElementById("_menu_guardar");
			_menu_leer = 			_getElementById("_menu_leer");
            _menu_compartir_2 =		_getElementById("_menu_compartir_2");
            _menu_guardar_2 = 		_getElementById("_menu_guardar_2");
            _menu_leer_2 = 			_getElementById("_menu_leer_2");
            _menu_descargar = 		_getElementById("_menu_descargar");
            _menu_descargar_2 = 	_getElementById("_menu_descargar_2");
			_menu_oir_en = 			_getElementById("_menu_oir_en");
            _boton_retroceder =     _getElementById("_boton_retroceder");
            _boton_retroceder_2 =   _getElementById("_boton_retroceder_2");
            _boton_retroceder_3 =   _getElementById("_boton_retroceder_3");
            _boton_adelantar =      _getElementById("_boton_adelantar");
            _boton_adelantar_2 =    _getElementById("_boton_adelantar_2");
            _boton_adelantar_3 =    _getElementById("_boton_adelantar_3");
			_capa_publicidad = 		_getElementById("_capa_publicidad");
            _capa_publicidad_2 =	_getElementById("_capa_publicidad_2");
            _capa_embed =           _getElementById("_capa_embed");
            _capa_conectar_redes =  _getElementById("_capa_conectar_redes");
            _mm_seek_slider =       _getElementById("_mm_seek_slider");
            _mm_seek_slider_2 =     _getElementById("_mm_seek_slider_2");
            _capa_pausado =         _getElementById("_capa_pausado");
            _capa_seleccionar =     _getElementById("_capa_seleccionar");
            _capa_embed_volver =    _getElementById("_capa_embed_volver");
            _capa_embed_cerrar =    _getElementById("_capa_embed_cerrar");
            _capa_embed_eligetamano = _getElementById("_capa_embed_eligetamano");
            _capa_embed_copiar =    _getElementById("_capa_embed_copiar");
            _capa_embed_mm_code =   _getElementById("_capa_embed_mm_code");
            _capa_conectar_redes_volver = _getElementById("_capa_conectar_redes_volver");
            _capa_conectar_redes_cerrar = _getElementById("_capa_conectar_redes_cerrar");
            _capa_conectar_redes_fb = _getElementById("_capa_conectar_redes_fb");
            _capa_conectar_redes_tw = _getElementById("_capa_conectar_redes_tw");
            _capa_conectar_redes_goo = _getElementById("_capa_conectar_redes_goo");
            _capa_conectar_redes_fb_2 = _getElementById("_capa_conectar_redes_fb_2");
            _capa_conectar_redes_tw_2 = _getElementById("_capa_conectar_redes_tw_2");
            _capa_conectar_redes_goo_2 = _getElementById("_capa_conectar_redes_goo_2");
            _capa_conectar_redes_fb_3 = _getElementById("_capa_conectar_redes_fb_3");
            _capa_conectar_redes_tw_3 = _getElementById("_capa_conectar_redes_tw_3");
            _capa_conectar_redes_goo_3 = _getElementById("_capa_conectar_redes_goo_3");
            _capa_conectar_redes_fb_4 = _getElementById("_capa_conectar_redes_fb_4");
            _capa_conectar_redes_tw_4 = _getElementById("_capa_conectar_redes_tw_4");
            _capa_conectar_redes_whatsapp = _getElementById("_capa_conectar_redes_wa");
            _capa_conectar_redes_whatsapp_2 = _getElementById("_capa_conectar_redes_wa_2");
            _capa_conectar_redes_whatsapp_3 = _getElementById("_capa_conectar_redes_wa_3");
            _capa_conectar_redes_whatsapp_4 = _getElementById("_capa_conectar_redes_wa_4");
            _compartir_external =   _getElementById("_compartir_external");
            _compartir_external_2 = _getElementById("_compartir_external_2");
            _sonido_barras_2 =      _getElementById("_mm_sonido_barras_2");
            _directo_programa_strong = _getElementById("_directo_programa_strong");
            _directo_programa_strong_2 = _getElementById("_directo_programa_strong_2");
            _directo_programa_strong_3 = _getElementById("_directo_programa_strong_3");
            _mm_volumen_slider_2 =  _getElementById("_mm_volumen_slider_2");
            _selector_provincia =   _getElementById("_selector_provincia");
            _selector_provincia_a = _getElementById("_selector_provincia_a");
            _selector_emisora =     _getElementById("_selector_emisora");
            _selector_emisora_a =   _getElementById("_selector_emisora_a");
            _ul_provincia =         _getElementById("_ul_provincia");
            _ul_emisora =           _getElementById("_ul_emisora");
            _selector_provincia_2 = _getElementById("_selector_provincia_2");
            _selector_provincia_a_2 = _getElementById("_selector_provincia_a_2");
            _selector_emisora_2 =   _getElementById("_selector_emisora_2");
            _selector_emisora_a_2 = _getElementById("_selector_emisora_a_2");
            _ul_provincia_2 =       _getElementById("_ul_provincia_2");
            _ul_emisora_2 =         _getElementById("_ul_emisora_2");

            _cambiar_emisora =      _getElementById("_cambiar_emisora");
            _cambiar_emisora_2 =    _getElementById("_cambiar_emisora_2");
            _cambiar_emisora_3 =    _getElementById("_cambiar_emisora_3");
            _cambiar_emisora_4 =    _getElementById("_cambiar_emisora_4");

            _directo_programa =     _getElementById("_directo_programa");
            _directo_programa_2 =   _getElementById("_directo_programa_2");
            _directo_programa_3 =   _getElementById("_directo_programa_3");
            _directo_presentador =  _getElementById("_directo_presentador");
            _directo_emisora =      _getElementById("_directo_emisora");
            _directo_emisora_2 =    _getElementById("_directo_emisora_2");

            _embeber_grande =       _getElementById("_embeber_grande");
            _embeber_pequeno =      _getElementById("_embeber_pequeno");

            _capa_compartir_opciones =  _getElementById("_capa_compartir_opciones");
            _capa_compartir_opciones_2 =  _getElementById("_capa_compartir_opciones_2");
            //_capa_compartir_cortar =  _getElementById("_capa_compartir_cortar");
            _capa_compartir_mensaje =   _getElementById("_capa_compartir_mensaje");
            //_capa_compartir_mensaje_2 =   _getElementById("_capa_compartir_mensaje_2");
            _capa_compartir_preparando = _getElementById("_capa_compartir_preparando");
            //_capa_compartir_preparando_2 = _getElementById("_capa_compartir_preparando_2");
            _capa_compartir_terminado = _getElementById("_capa_compartir_terminado");
            //_capa_compartir_terminado_2 = _getElementById("_capa_compartir_terminado_2");

            _btn_compartir_todo =       _getElementById("_btn_compartir_todo");
            _btn_compartir_todo_2 =     _getElementById("_btn_compartir_todo_2");
            _btn_compartir_momento =    _getElementById("_btn_compartir_momento");
            _btn_compartir_momento_2 =  _getElementById("_btn_compartir_momento_2");
            _that._check_facebook =      _getElementById("_check-facebook");
            _that._check_twitter =       _getElementById("_check-twitter");
            _capa_compartir_mensaje_comentario = _getElementById("_capa_compartir_mensaje_comentario");
            _capa_cortar_siguiente =            _getElementById("_capa_cortar_siguiente");
            _capa_cortar_siguiente_2 =          _getElementById("_capa_cortar_siguiente_2");
            _capa_compartir_mensaje_compartir = _getElementById("_capa_compartir_mensaje_compartir");
            _corte_2                            = _getElementById("_corte_2");
            _mm_anuncio_programa_all            = _getElementById("_mm_anuncio_programa_all");

            _capa_compartir_opciones_cerrar     = _getElementById("_capa_compartir_opciones_cerrar");
            _capa_compartir_opciones_cerrar_2   = _getElementById("_capa_compartir_opciones_cerrar_2");
            _capa_compartir_opciones_volver     = _getElementById("_capa_compartir_opciones_volver");
            _capa_compartir_opciones_volver_2   = _getElementById("_capa_compartir_opciones_volver_2");
            _capa_compartir_cortar_cerrar       = _getElementById("_capa_compartir_cortar_cerrar");
            _capa_compartir_cortar_cerrar_2     = _getElementById("_capa_compartir_cortar_cerrar_2");
            _capa_compartir_cortar_volver       = _getElementById("_capa_compartir_cortar_volver");
            _capa_compartir_cortar_volver_2     = _getElementById("_capa_compartir_cortar_volver_2");
            _capa_compartir_mensaje_cerrar      = _getElementById("_capa_compartir_mensaje_cerrar");
            _capa_compartir_mensaje_cerrar_2    = _getElementById("_capa_compartir_mensaje_cerrar_2");
            _capa_compartir_terminado_cerrar    = _getElementById("_capa_compartir_terminado_cerrar");
            _capa_compartir_terminado_cerrar_2  = _getElementById("_capa_compartir_terminado_cerrar_2");
            _capa_compartir_terminado_ok        = _getElementById("_capa_compartir_terminado_ok");
            _capa_compartir_terminado_ok_2      = _getElementById("_capa_compartir_terminado_ok_2");

            _siguiente_titulo = _getElementById("_siguiente_titulo");
            _siguiente_programa = _getElementById("_siguiente_programa");
            _siguiente_play = _getElementById("_siguiente_play");
            _siguiente_duracion = _getElementById("_siguiente_duracion");

            _escucha_continua = _getElementById("_escucha_continua");
            _escucha_continua_2 = _getElementById("_escucha_continua_2");
            _e_c_tiempo = _getElementById("_e_c_tiempo");
            _e_c_tiempo_2 = _getElementById("_e_c_tiempo_2");
            _e_c_escuchar = _getElementById("_e_c_escuchar");
            _e_c_escuchar_2 = _getElementById("_e_c_escuchar_2");
            _e_c_detener = _getElementById("_e_c_detener");
            _e_c_detener_2 = _getElementById("_e_c_detener_2");
            _e_c_texto = _getElementById("_e_c_texto");
            _e_c_texto_2 = _getElementById("_e_c_texto_2");

            _capa_publicidad_saltar = _getElementById("_capa_publicidad_saltar");
            _capa_publicidad_saltar_2 = _getElementById("_capa_publicidad_saltar_2");
            _capa_publicidad_segundos = _getElementById("_capa_publicidad_segundos");
            _capa_publicidad_segundos_2 = _getElementById("_capa_publicidad_segundos_2");

            _capa_redes = _getElementById("_capa_redes");
            _capa_redes_cerrar = _getElementById("_capa_redes_cerrar");

            _capa_activa = _capa_pausado;

            _botones_play = [_btn_play,_btn_play_2,_btn_play_3,_btn_play_4,_btn_play_grande];

            if(_capa_compartir_mensaje_comentario){
                /*
                _capa_compartir_mensaje_comentario.onfocus = function(){
                    if(_first_focus)
                        _capa_compartir_mensaje_comentario.value = "";
                    _first_focus = false;
                }*/

                var comentario_aux = _data.mediaData.title + "\n" + _URL_AUDIO_PLAYSER + _data.mediaData.idTOP;
                if(_twitter_via_external!=""){
                    comentario_aux += "&via=" + _twitter_via_external;
                }else{
                    comentario_aux += "&via=" + _twitter_via;
                }

                var comentario_titulo = _data.mediaData.title;

                if(comentario_aux.length> 140){
                    //restamos 4 para poner ..."
                    comentario_titulo = comentario_titulo.substr(0,comentario_titulo.length - 4 - (comentario_aux.length-140)) + "...";
                }

                var comentario = comentario_titulo + "\n" + _URL_AUDIO_PLAYSER + _data.mediaData.idTOP;

                if(_capa_compartir_mensaje_comentario){
                    _capa_compartir_mensaje_comentario.value = comentario;
                    _capa_compartir_mensaje_comentario.addEventListener("keypress", function (e){
                        _capa_compartir_mensaje_comentario.value = _capa_compartir_mensaje_comentario.value.substr(0,140);
                    });
                }
            }

            if(_soy_permanente){
                _mm_player.className = "mm_player_permanente";
                if(_data.mediaData.isLive){
                    _mm_player.className += " mm_player_permanente_live";
                }
            }
            else{
                switch(_skin_type){
                    case _SKIN_TYPE_GRANDE:
                        if(_soy_embed)
                            _mm_player.className = "mm_player mm_player_externo";
                        break;
                    case _SKIN_TYPE_PEQUENO:
                            _mm_player.className = "mm_player mm_player_peq";
                        break;
                }
            }

            if(_capa_desplegada_enlatado&&!_mostrar_capa_siguiente){
                _capa_desplegada_enlatado.className += " mm_capa_desplegada-sin_siguiente";
            }

            if(_menu_descargar)
                _menu_descargar.onclick = (function(that){
                    return function(){
                        _that.notifyOrderButton("descargar");
                    }
            })(this);
            if(_menu_descargar_2)
                _menu_descargar_2.onclick = (function(that){
                    return function(){
                        _that.notifyOrderButton("descargar");
                    }
            })(this);

            if(_capa_sonando){
                _capa_sonando.onclick = (function(_that){
                    return function(){
                        if(_capa_sonando.className.indexOf("cortar")>0){
                            return;
                        }
                        _capa_sonando.className = _capa_sonando.className.replace(/ mm_mostrar-controles/g,"");
                        _capa_sonando.className += " mm_mostrar-controles";

                        clearTimeout(timeout_ocultar_botones)
                        timeout_ocultar_botones = setTimeout(function(){
                            if(_hay_trans)
                                _capa_sonando.className = _capa_sonando.className.replace(/ mm_mostrar-controles/g,"");
                        },3000);
                    }
                })(this);

            }

            if(_capa_sonando_2){
                _capa_sonando_2.onclick = (function(_that){
                    return function(){
                        if(_capa_sonando_2.className.indexOf("cortar")>0){
                            return;
                        }
                        _capa_sonando_2.className = _capa_sonando_2.className.replace(/ mm_mostrar-controles/g,"");
                        _capa_sonando_2.className += " mm_mostrar-controles";

                        clearTimeout(timeout_ocultar_botones)
                        timeout_ocultar_botones = setTimeout(function(){
                            if(_hay_trans)
                                _capa_sonando_2.className = _capa_sonando_2.className.replace(/ mm_mostrar-controles/g,"");
                        },3000);
                    }
                })(this);
            }


            if(_skin_type!=_SKIN_TYPE_PEQUENO){
                if(typeof(window.playerview_color)!="undefined"){
                    fondocolor = window.playerview_color;
                    window.playerview_color = undefined;
                }else{
                    if(this._playerview_color==null){
                        var fondocolor = Math.floor(Math.random() * fondoscolores.length)
                        this._playerview_color = fondocolor;
                        window.playerview_color = _that._playerview_color;
                    }else{
                        fondocolor = this._playerview_color;
                        window.playerview_color = _that._playerview_color;
                    }
                }

                _mm_player.className += " mm_player-" + fondoscolores[fondocolor];
            }

            if(_btn_play_grande)_btn_play_grande.onclick = (function(_that){
                return function(){
                    if(_isplaying){
                        _that.notifyOrderPause();
                    }
                    else{
                        //_isplaying = true;
                        _started = true;
                        _that.notifyOrderPlay();
                    }

					return false;
                }
            })(this);

			if(_btn_play)_btn_play.onclick = (function(_that){
                return function(){
                    if(_isplaying){
                        _that.notifyOrderPause();
                    }
                    else{
                        //_isplaying = true;
                        _started = true;
                        _that.notifyOrderPlay();

                        if(_capa_sonando){
                            if(_capa_sonando.className.indexOf("cortar")>0){
                                tiempo_parar = last_current_time + tiempo_corte;
                                last_cortar_start_time = last_current_time;

                                console.log("tiempo parar!",tiempo_parar);
                            }
                        }
                    }

					return false;
                }
            })(this);

            if(_btn_play_2)_btn_play_2.onclick = (function(_that){
                return function(){
                    if(_isplaying){
                        _that.notifyOrderPause();
                    }
                    else{
                        //_isplaying = true;
                        _started = true;
                        _that.notifyOrderPlay();
                    }

                    return false;
                }
            })(this);

            if(_btn_play_3)_btn_play_3.onclick = (function(_that){
                return function(){
                    if(_isplaying){
                        _that.notifyOrderPause();
                    }
                    else{
                        //_isplaying = true;
                        _started = true;
                        _that.notifyOrderPlay();
                    }

                    return false;
                }
            })(this);

            if(_btn_play_4)_btn_play_4.onclick = (function(_that){
                return function(){
                    if(_isplaying){
                        _that.notifyOrderPause();
                    }
                    else{
                        //_isplaying = true;
                        _started = true;
                        _that.notifyOrderPlay();

                        if(_capa_sonando){
                            if(_capa_sonando.className.indexOf("cortar")>0){
                                tiempo_parar = last_current_time + tiempo_corte;
                                last_cortar_start_time = last_current_time;

                                console.log("tiempo parar!",tiempo_parar);
                            }
                        }
                    }
                    return false;
                }
            })(this);

            if(_boton_compartir)_boton_compartir.onclick = (function(_that){
                return function(){
					_capa_conectar_redes.className += " visible";
					return false;
                }
            })(this);

            if(_boton_cerrar_menu)_boton_cerrar_menu.onclick = (function(_that){
                return function(){
					_capa_menu.className = _capa_menu.className.replace(/ visible/g,"");
                    if(_capa_activa)_capa_activa.className += " visible";
					return false;
                }
            })(this);

            if(_boton_cerrar_menu_2)_boton_cerrar_menu_2.onclick = (function(_that){
                return function(){
                    _capa_menu_2.className = _capa_menu_2.className.replace(/ visible/g,"");
                    if(_capa_activa)_capa_activa.className += " visible";
                    return false;
                }
            })(this);

            if(_cerrar_cambiar)_cerrar_cambiar.onclick = (function(_that){
                return function(){
                    _capa_seleccionar.className = _capa_seleccionar.className.replace(/ visible/g,"");
                    if(_capa_activa)_capa_activa.className += " visible";
                    return false;
                }
            })(this);

            if(_boton_menu)_boton_menu.onclick = (function(_that){
                return function(){
                    var _capa_desplegada = _capa_desplegada_enlatado;
                    if(_data.mediaData.isLive)
                        _capa_desplegada = _capa_desplegada_live;

                    if(_mm_player.offsetWidth<__MINSIZE){

                        if(_capa_desplegada){
                            if(_boton_menu_2){
                                if(_boton_menu_2.className.indexOf("mm_boton_menu-cerrado")>0){
                                    _capa_desplegada.className = _capa_desplegada.className.replace(/ visible/g,"");
                                    _boton_menu_2.className = _boton_menu_2.className.replace(/ mm_boton_menu-cerrado/g,"");
                                }else{
                                    _capa_desplegada.className += " visible";
                                    _that.calcularAlturaDesplegable();
                                    _boton_menu_2.className += " mm_boton_menu-cerrado";
                                }
                            }
                            if(_boton_menu.className.indexOf("mm_boton_menu-cerrado")>0){
                                _capa_desplegada.className = _capa_desplegada.className.replace(/ visible/g,"");
                                _boton_menu.className = _boton_menu.className.replace(/ mm_boton_menu-cerrado/g,"");
                                if(_boton_menu_2)
                                    _boton_menu_2.className = _boton_menu_2.className.replace(/ mm_boton_menu-cerrado/g,"");
                                if(_boton_menu_3)
                                    _boton_menu_3.className = _boton_menu_3.className.replace(/ mm_boton_menu-cerrado/g,"");
                            }else{
                                _capa_desplegada.className += " visible";
                                _that.calcularAlturaDesplegable();
                                _boton_menu.className += " mm_boton_menu-cerrado";
                            }
                        }
                        else{
                            if(_capa_menu)_capa_menu.className += " visible";
                            if(_capa_activa)_capa_activa.className = _capa_activa.className.replace(/ visible/g,"");
                        }
                    }else{
                        if(_capa_menu)_capa_menu.className += " visible";
                        if(_capa_activa)_capa_activa.className = _capa_activa.className.replace(/ visible/g,"");
                    }
					return false;
                }
            })(this);

            if(_boton_menu_2)_boton_menu_2.onclick = (function(_that){
                return function(){
                    var _capa_desplegada = _capa_desplegada_enlatado;
                    if(_data.mediaData.isLive)
                        _capa_desplegada = _capa_desplegada_live;

                    if(_mm_player.offsetWidth<__MINSIZE){

                        if(_capa_desplegada){
                            if(_boton_menu_2.className.indexOf("mm_boton_menu-cerrado")>0){
                                _capa_desplegada.className = _capa_desplegada.className.replace(/ visible/g,"");
                                _boton_menu_2.className = _boton_menu_2.className.replace(/ mm_boton_menu-cerrado/g,"");
                            }else{
                                _capa_desplegada.className += " visible";
                                _that.calcularAlturaDesplegable();
                                _boton_menu_2.className += " mm_boton_menu-cerrado";
                            }
                        }
                        else{
                            if(_capa_menu)_capa_menu.className += " visible";
                            if(_capa_activa)_capa_activa.className = _capa_activa.className.replace(/ visible/g,"");
                        }
                    }else{
                        if(_capa_menu)_capa_menu.className += " visible";
                        if(_capa_activa)_capa_activa.className = _capa_activa.className.replace(/ visible/g,"");
                    }
                    return false;
                }
            })(this);

            if(_boton_menu_3)_boton_menu_3.onclick = (function(_that){
                return function(){
                    var _capa_desplegada = _capa_desplegada_enlatado;
                    if(_data.mediaData.isLive)
                        _capa_desplegada = _capa_desplegada_live;

                    if(_boton_menu)
                        _boton_menu.className = _boton_menu.className.replace(/ mm_boton_menu-cerrado/g,"");
                    if(_boton_menu_2)
                        _boton_menu_2.className = _boton_menu_2.className.replace(/ mm_boton_menu-cerrado/g,"");
                    if(_boton_menu_3)
                        _boton_menu_3.className = _boton_menu_3.className.replace(/ mm_boton_menu-cerrado/g,"");

                    if(_mm_player.offsetWidth<__MINSIZE){
                        if((_capa_desplegada)&&(_capa_desplegada.className.indexOf(" visible")>0)){
                            _capa_desplegada.className = _capa_desplegada.className.replace(/ visible/g,"");
                        }else{
                            if(_capa_activa)_capa_activa.className += " visible";
                            if(_capa_menu)_capa_menu.className = _capa_menu.className.replace(/ visible/g,"");
                        }

                    }else{
                        if(_capa_activa)_capa_activa.className += " visible";
                        if(_capa_menu)_capa_menu.className = _capa_menu.className.replace(/ visible/g,"");
                    }
                    return false;
                }
            })(this);

            if(_boton_menu_4)_boton_menu_4.onclick = (function(_that){
                return function(){
                    if(_capa_menu_2)_capa_menu_2.className += " visible";

                    return false;
                }
            })(this);

			if(_logo_cadenaser)_logo_cadenaser.onclick = (function(_that){
                return function(){
                    if(_soy_embed)
                        window.open(_URL_AUDIO_PLAYSER + _data.mediaData.idTOP + "?leer=on", '_blank');
                    else
                        _that.notifyOrderExternal(namespace.hertz_events.ORDER_LEER,{"id":_data.mediaData.idTOP,"live":_data.mediaData.isLive});
                    return false;
                }
            })(this);

			if(_logo_playser)_logo_playser.onclick = (function(_that){
                return function(){
                    if(_soy_embed)
                        window.open(_URL_AUDIO_PLAYSER + _data.mediaData.idTOP + "?leer=on", '_blank');
                    else
                        _that.notifyOrderExternal(namespace.hertz_events.ORDER_OIR,{"id":_data.mediaData.idTOP,"live":_data.mediaData.isLive});
					return false;
                }
            })(this);

            if(_logo_playser_2)_logo_playser_2.onclick = (function(_that){
                return function(){
                    if(_soy_embed)
                        window.open(_URL_AUDIO_PLAYSER + _data.mediaData.idTOP + "?leer=on", '_blank');
                    else
                        _that.notifyOrderExternal(namespace.hertz_events.ORDER_OIR,{"id":_data.mediaData.idTOP,"live":_data.mediaData.isLive});
                    return false;
                }
            })(this);

            if(_menu_embeber)_menu_embeber.onclick = (function(_that){
                return function(){
                    _that.notifyOrderButton("llevatelo_grande");
                    _capa_embed.className += " visible";
                    return false;
                }
            })(this);

            if(_capa_embed_cerrar)_capa_embed_cerrar.onclick = (function(_that){
                return function(){
                    _capa_menu.className = _capa_menu.className.replace(/ visible/g,"");
                    _capa_embed.className = _capa_embed.className.replace(/ visible/g,"");
                    if(_capa_activa)_capa_activa.className+=" visible";
                    return false;
                }
            })(this);

            if(_capa_embed_volver)_capa_embed_volver.onclick = (function(_that){
                return function(){
                    _capa_embed.className = _capa_embed.className.replace(/ visible/g,"");
                    return false;
                }
            })(this);

            if(_capa_conectar_redes_cerrar)_capa_conectar_redes_cerrar.onclick = (function(_that){
                return function(){
                    _capa_menu.className = _capa_menu.className.replace(/ visible/g,"");
                    _capa_conectar_redes.className = _capa_conectar_redes.className.replace(/ visible/g,"");
                    if(_capa_activa)_capa_activa.className+=" visible";
                    return false;
                }
            })(this);

            if(_capa_conectar_redes_volver)_capa_conectar_redes_volver.onclick = (function(_that){
                return function(){
                    if(_capa_conectar_redes)_capa_conectar_redes.className = _capa_conectar_redes.className.replace(/ visible/g,"");
                    if(_capa_compartir_opciones)_capa_compartir_opciones.className += " visible";
                    return false;
                }
            })(this);

            if(_capa_conectar_redes_fb)_capa_conectar_redes_fb.onclick = (function(_that){
                return function(){
                    //var refer = window.location.href;
                    var refer = "";

                    if(_data.mediaData.isLive){
                        if(_soy_alternativo)
                            refer += "http://play.cadenaser.com/?ssm=fb";
                        else
                            refer += _url_compartir_emisora + _data.mediaData.idTOP + "/?ssm=fb";
                    }
                    else{
                        refer += _url_compartir_enlatado + _data.mediaData.idTOP + "/?ssm=fb";
                    }

                    var text = _data.mediaData.title;

                    //if(_message_share_facebook!=""){
                    //    text = _message_share_facebook;
                    //}

                    var refUrl = _URL_FACEBOOK + refer + "&t=" + encodeURI(text);
                    _that.notifyOrderRRSS("facebook" + "|red_social");
                    window.open(refUrl, '_blank');

                    return false;
                }
            })(this);
            if(_capa_conectar_redes_fb_2)_capa_conectar_redes_fb_2.onclick = (function(_that){
                return function(){
                    var refer = "";

                    if(_data.mediaData.isLive){
                        if(_soy_alternativo)
                            refer += "http://play.cadenaser.com/?ssm=fb";
                        else
                            refer += _url_compartir_emisora + _data.mediaData.idTOP + "/?ssm=fb";
                    }
                    else{
                        refer += _url_compartir_enlatado + _data.mediaData.idTOP + "/?ssm=fb";
                    }

                    var text = _data.mediaData.title;

                    //if(_message_share_facebook!=""){
                    //    text = _message_share_facebook;
                    //}

                    var refUrl = _URL_FACEBOOK + refer + "&t=" + encodeURI(text);
                    _that.notifyOrderRRSS("facebook" + "|red_social");
                    window.open(refUrl, '_blank');

                    return false;
                }
            })(this);
            if(_capa_conectar_redes_fb_3)_capa_conectar_redes_fb_3.onclick = (function(_that){
                return function(){
                    var refer = "";

                    if(_data.mediaData.isLive){
                        if(_soy_alternativo)
                            refer += "http://play.cadenaser.com/?ssm=fb";
                        else
                            refer += _url_compartir_emisora + _data.mediaData.idTOP + "/?ssm=fb";
                    }
                    else{
                        refer += _url_compartir_enlatado + _data.mediaData.idTOP + "/?ssm=fb";
                    }

                    var text = _data.mediaData.title;

                    //if(_message_share_facebook!=""){
                    //    text = _message_share_facebook;
                    //}

                    var refUrl = _URL_FACEBOOK + refer + "&t=" + encodeURI(text);
                    _that.notifyOrderRRSS("facebook" + "|red_social");
                    window.open(refUrl, '_blank');

                    return false;
                }
            })(this);

            if(_capa_conectar_redes_fb_4)_capa_conectar_redes_fb_4.onclick = (function(_that){
                return function(){
                    var refer = "";

                    if(_data.mediaData.isLive){
                        if(_soy_alternativo)
                            refer += "http://play.cadenaser.com/?ssm=fb";
                        else
                            refer += _url_compartir_emisora + _data.mediaData.idTOP + "/?ssm=fb";
                    }
                    else{
                        refer += _url_compartir_enlatado + _data.mediaData.idTOP + "/?ssm=fb";
                    }

                    var text = _data.mediaData.title;

                    //if(_message_share_facebook!=""){
                    //    text = _message_share_facebook;
                    //}

                    var refUrl = _URL_FACEBOOK + refer + "&t=" + encodeURI(text);
                    _that.notifyOrderRRSS("facebook" + "|red_social");
                    window.open(refUrl, '_blank');

                    return false;
                }
            })(this);

            if(_capa_conectar_redes_tw)_capa_conectar_redes_tw.onclick = (function(_that){
                return function(){
                    if (_data.mediaData.description == "{}")
                        _data.mediaData.description = " ";

                    var comentario_aux = _data.mediaData.title + "\n" + _URL_AUDIO_PLAYSER + _data.mediaData.idTOP;
                    if(_twitter_via_external!=""){
                        comentario_aux += "&via=" + _twitter_via_external;
                    }else{
                        comentario_aux += "&via=" + _twitter_via;
                    }

                    var comentario_titulo = _data.mediaData.title;

                    if(comentario_aux.length> 140){
                        //restamos 4 para poner ..."
                        comentario_titulo = comentario_titulo.substr(0,comentario_titulo.length - 4 - (comentario_aux.length-140)) + "...";
                    }

                    var content = comentario_titulo;

                    //var refer = window.location.href;
                    var refer = "";
                    if(_data.mediaData.isLive){
                        if(_soy_alternativo)
                            refer += "http://play.cadenaser.com/?ssm=tw";
                        else
                            refer += _url_compartir_emisora + _data.mediaData.idTOP + "/?ssm=tw";
                    }
                    else{
                        refer += _url_compartir_enlatado + _data.mediaData.idTOP + "/?ssm=tw";
                    }

                    var refUrl = _URL_TWITTER;

                    refUrl += encodeURI(content);

                    if(_twitter_via_external!=""){
                        refUrl += "&via=" + _twitter_via_external;
                    }else{
                        if(_twitter_via!=null)
                            refUrl += "&via=" + _twitter_via;
                    }

                    refUrl += "&url=" + refer;

                    _that.notifyOrderRRSS("twitter" + "|red_social");
                    window.open(refUrl, '_blank');

                    return false;
                }
            })(this);
            if(_capa_conectar_redes_tw_2)_capa_conectar_redes_tw_2.onclick = (function(_that){
                return function(){
                    var comentario_aux = _data.mediaData.title + "\n" + _URL_AUDIO_PLAYSER + _data.mediaData.idTOP;
                    if(_twitter_via_external!=""){
                        comentario_aux += "&via=" + _twitter_via_external;
                    }else{
                        comentario_aux += "&via=" + _twitter_via;
                    }

                    var comentario_titulo = _data.mediaData.title;

                    if(comentario_aux.length> 140){
                        //restamos 4 para poner ..."
                        comentario_titulo = comentario_titulo.substr(0,comentario_titulo.length - 4 - (comentario_aux.length-140)) + "...";
                    }

                    var content = comentario_titulo;


                    //var refer = window.location.href;
                    var refer = "";
                    if(_data.mediaData.isLive){
                        if(_soy_alternativo)
                            refer += "http://play.cadenaser.com/?ssm=tw";
                        else
                            refer += _url_compartir_emisora + _data.mediaData.idTOP + "/?ssm=tw";
                    }
                    else{
                        refer += _url_compartir_enlatado + _data.mediaData.idTOP + "/?ssm=tw";
                    }

                    var refUrl = _URL_TWITTER;

                    refUrl += encodeURI(content);

                    if(_twitter_via_external!=""){
                        refUrl += "&via=" + _twitter_via_external;
                    }else{
                        if(_twitter_via!=null)
                            refUrl += "&via=" + _twitter_via;
                    }

                    refUrl += "&url=" + refer;

                    _that.notifyOrderRRSS("twitter" + "|red_social");
                    window.open(refUrl, '_blank');

                    return false;
                }
            })(this);
            if(_capa_conectar_redes_tw_3)_capa_conectar_redes_tw_3.onclick = (function(_that){
                return function(){
                    var comentario_aux = _data.mediaData.title + "\n" + _URL_AUDIO_PLAYSER + _data.mediaData.idTOP;
                    if(_twitter_via_external!=""){
                        comentario_aux += "&via=" + _twitter_via_external;
                    }else{
                        comentario_aux += "&via=" + _twitter_via;
                    }

                    var comentario_titulo = _data.mediaData.title;

                    if(comentario_aux.length> 140){
                        //restamos 4 para poner ..."
                        comentario_titulo = comentario_titulo.substr(0,comentario_titulo.length - 4 - (comentario_aux.length-140)) + "...";
                    }

                    var content = comentario_titulo;


                    //var refer = window.location.href;
                    var refer = "";
                    if(_data.mediaData.isLive){
                        if(_soy_alternativo)
                            refer += "http://play.cadenaser.com/?ssm=tw";
                        else
                            refer += _url_compartir_emisora + _data.mediaData.idTOP + "/?ssm=tw";
                    }
                    else{
                        refer += _url_compartir_enlatado + _data.mediaData.idTOP + "/?ssm=tw";
                    }

                    var refUrl = _URL_TWITTER;

                    refUrl += encodeURI(content);

                    if(_twitter_via_external!=""){
                        refUrl += "&via=" + _twitter_via_external;
                    }else{
                        if(_twitter_via!=null)
                            refUrl += "&via=" + _twitter_via;
                    }

                    refUrl += "&url=" + refer;

                    _that.notifyOrderRRSS("twitter" + "|red_social");
                    window.open(refUrl, '_blank');

                    return false;
                }
            })(this);
            if(_capa_conectar_redes_tw_4)_capa_conectar_redes_tw_4.onclick = (function(_that){
                return function(){
                    var comentario_aux = _data.mediaData.title + "\n" + _URL_AUDIO_PLAYSER + _data.mediaData.idTOP;
                    if(_twitter_via_external!=""){
                        comentario_aux += "&via=" + _twitter_via_external;
                    }else{
                        comentario_aux += "&via=" + _twitter_via;
                    }

                    var comentario_titulo = _data.mediaData.title;

                    if(comentario_aux.length> 140){
                        //restamos 4 para poner ..."
                        comentario_titulo = comentario_titulo.substr(0,comentario_titulo.length - 4 - (comentario_aux.length-140)) + "...";
                    }

                    var content = comentario_titulo;


                    //var refer = window.location.href;
                    var refer = "";
                    if(_data.mediaData.isLive){
                        if(_soy_alternativo)
                            refer += "http://play.cadenaser.com/?ssm=tw";
                        else
                            refer += _url_compartir_emisora + _data.mediaData.idTOP + "/?ssm=tw";
                    }
                    else{
                        refer += _url_compartir_enlatado + _data.mediaData.idTOP + "/?ssm=tw";
                    }

                    var refUrl = _URL_TWITTER;

                    refUrl += encodeURI(content);

                    if(_twitter_via_external!=""){
                        refUrl += "&via=" + _twitter_via_external;
                    }else{
                        if(_twitter_via!=null)
                            refUrl += "&via=" + _twitter_via;
                    }

                    refUrl += "&url=" + refer;

                    _that.notifyOrderRRSS("twitter" + "|red_social");
                    window.open(refUrl, '_blank');

                    return false;
                }
            })(this);

            if(_capa_conectar_redes_whatsapp)_capa_conectar_redes_whatsapp.onclick = (function(that) {
                return  function(){
                    var refer = _data.mediaData.title + " ";

                    if(_data.mediaData.isLive){
                        if(_soy_alternativo)
                            refer += "http://play.cadenaser.com/?ssm=whatsapp";
                        else
                            refer += _url_compartir_emisora + _data.mediaData.idTOP + "/?ssm=whatsapp";
                    }
                    else{
                        refer += _url_compartir_enlatado + _data.mediaData.idTOP + "/?ssm=whatsapp";
                    }

                    var refUrl = "whatsapp://send?text=" + refer;
                    window.open(refUrl,'_blank');
                }
            })(this);

            if(_capa_conectar_redes_whatsapp_2)_capa_conectar_redes_whatsapp_2.onclick = (function(that) {
                return  function(){
                    var refer = _data.mediaData.title + " ";

                    if(_data.mediaData.isLive){
                        if(_soy_alternativo)
                            refer += "http://play.cadenaser.com/?ssm=whatsapp";
                        else
                            refer += _url_compartir_emisora + _data.mediaData.idTOP + "/?ssm=whatsapp";
                    }
                    else{
                        refer += _url_compartir_enlatado + _data.mediaData.idTOP + "/?ssm=whatsapp";
                    }

                    var refUrl = "whatsapp://send?text=" + refer;
                    window.open(refUrl,'_blank');
                }
            })(this);

            if(_capa_conectar_redes_whatsapp_3)_capa_conectar_redes_whatsapp_3.onclick = (function(that) {
                return  function(){
                    var refer = _data.mediaData.title + " ";

                    if(_data.mediaData.isLive){
                        if(_soy_alternativo)
                            refer += "http://play.cadenaser.com/?ssm=whatsapp";
                        else
                            refer += _url_compartir_emisora + _data.mediaData.idTOP + "/?ssm=whatsapp";
                    }
                    else{
                        refer += _url_compartir_enlatado + _data.mediaData.idTOP + "/?ssm=whatsapp";
                    }

                    var refUrl = "whatsapp://send?text=" + refer;
                    window.open(refUrl,'_blank');
                }
            })(this);

            if(_capa_conectar_redes_whatsapp_4)_capa_conectar_redes_whatsapp_4.onclick = (function(that) {
                return  function(){
                    var refer = _data.mediaData.title + " ";

                    if(_data.mediaData.isLive){
                        if(_soy_alternativo)
                            refer += "http://play.cadenaser.com/?ssm=whatsapp";
                        else
                            refer += _url_compartir_emisora + _data.mediaData.idTOP + "/?ssm=whatsapp";
                    }
                    else{
                        refer += _url_compartir_enlatado + _data.mediaData.idTOP + "/?ssm=whatsapp";
                    }

                    var refUrl = "whatsapp://send?text=" + refer;
                    window.open(refUrl,'_blank');
                }
            })(this);

            if(_selector_provincia)_selector_provincia.onclick = (function(_that){
                return function(){
                    if(_selector_emisora)_selector_emisora.className = _selector_emisora.className.replace(/ mm_activo/g,"");

                    if(_selector_provincia.className.indexOf("mm_activo")>0){
                        _selector_provincia.className = _selector_provincia.className.replace(/ mm_activo/g,"");
                    }else{
                        _selector_provincia.className += " mm_activo";
                    }
                    return false;
                }
            })(this);

            if(_selector_emisora)_selector_emisora.onclick = (function(_that){
                return function(){
                    if(_selector_emisora.className.indexOf("mm_activo")>0){
                        _selector_emisora.className = _selector_emisora.className.replace(/ mm_activo/g,"");
                    }else{
                        _selector_emisora.className += " mm_activo";
                    }
                    return false;
                }
            })(this);

            if(_selector_provincia_2)_selector_provincia_2.onclick = (function(_that){
                return function(){
                    if(_selector_emisora_2)_selector_emisora_2.className = _selector_emisora_2.className.replace(/ mm_activo/g,"");

                    if(_selector_provincia_2.className.indexOf("mm_activo")>0){
                        _selector_provincia_2.className = _selector_provincia_2.className.replace(/ mm_activo/g,"");
                    }else{
                        _selector_provincia_2.className += " mm_activo";
                    }
                    return false;
                }
            })(this);

            if(_selector_emisora_2)_selector_emisora_2.onclick = (function(_that){
                return function(){
                    if(_selector_emisora_2.className.indexOf("mm_activo")>0){
                        _selector_emisora_2.className = _selector_emisora_2.className.replace(/ mm_activo/g,"");
                    }else{
                        _selector_emisora_2.className += " mm_activo";
                    }
                    return false;
                }
            })(this);

            if(_capa_conectar_redes_goo)_capa_conectar_redes_goo.onclick = (function(_that){
                return function(){
                    var refer = window.location.href;
                    var text = "";

                    //if(_message_share_facebook!=""){
                    //    text = _message_share_facebook;
                    //}

                    var refUrl = _URL_GOOGLEPLUS + refer + "&t=" + encodeURI(text);
                    window.open(refUrl, '_blank');

                    return false;
                }
            })(this);
            if(_capa_conectar_redes_goo_2)_capa_conectar_redes_goo_2.onclick = (function(_that){
                return function(){
                    var refer = window.location.href;
                    var text = "";

                    //if(_message_share_facebook!=""){
                    //    text = _message_share_facebook;
                    //}

                    var refUrl = _URL_GOOGLEPLUS + refer + "&t=" + encodeURI(text);
                    window.open(refUrl, '_blank');

                    return false;
                }
            })(this);
            if(_capa_conectar_redes_goo_2)_capa_conectar_redes_goo_3.onclick = (function(_that){
                return function(){
                    var refer = window.location.href;
                    var text = "";

                    //if(_message_share_facebook!=""){
                    //    text = _message_share_facebook;
                    //}

                    var refUrl = _URL_GOOGLEPLUS + refer + "&t=" + encodeURI(text);
                    window.open(refUrl, '_blank');

                    return false;
                }
            })(this);

            if(_compartir_external)_compartir_external.onclick = (function(that) {
                return  function(){
                    //console.log("EXTERNOOOOOOOOOOOOOOOOOOOOO SHARE");

                    if(_mm_player){
                        if(_mm_player.offsetWidth<__MINSIZE){
                            var _capa_desplegada = _capa_desplegada_enlatado;
                            if(_data.mediaData.isLive)
                                _capa_desplegada = _capa_desplegada_live;

                            if(_mm_player.offsetWidth<__MINSIZE){

                                if(_capa_desplegada){
                                    if(_boton_menu.className.indexOf("mm_boton_menu-cerrado")>0){
                                        _capa_desplegada.className = _capa_desplegada.className.replace(/ visible/g,"");
                                        _boton_menu.className = _boton_menu.className.replace(/ mm_boton_menu-cerrado/g,"");
                                        if(_boton_menu_2)
                                            _boton_menu_2.className = _boton_menu_2.className.replace(/ mm_boton_menu-cerrado/g,"");
                                        if(_boton_menu_3)
                                            _boton_menu_3.className = _boton_menu_3.className.replace(/ mm_boton_menu-cerrado/g,"");
                                    }else{
                                        _capa_desplegada.className += " visible";
                                        _that.calcularAlturaDesplegable();
                                        _boton_menu.className += " mm_boton_menu-cerrado";
                                    }
                                }
                                else{
                                    if(_capa_menu)_capa_menu.className += " visible";
                                    if(_capa_activa)_capa_activa.className = _capa_activa.className.replace(/ visible/g,"");
                                }

                                if((_hay_trans)&&(_videoPregenerado)&&(_servicioActivo))
                                    _capa_compartir_opciones_2.className += " visible";
                                else{
                                    if(_capa_conectar_redes_volver)_capa_conectar_redes_volver.style.display = "none";
                                    if(_capa_conectar_redes)_capa_conectar_redes.className += " visible";
                                    if(_capa_compartir_opciones_2)_capa_compartir_opciones_2.className = _capa_compartir_opciones_2.className.replace(/ visible/g,"");
                                }

                            }else{
                                if(_capa_menu)_capa_menu.className += " visible";
                                if(_capa_activa)_capa_activa.className = _capa_activa.className.replace(/ visible/g,"");

                            }
                            return false;
                        }else{
                            if(!_data.mediaData.isLive){
                                _that.notifyOrderExternal(namespace.hertz_events.ORDER_SHARE,{"id":_data.mediaData.idTOP});
                            }else{
                                _capa_redes.className += " visible";
                            }
                            return false;
                        }
                    }
                }
            })(this);
            if(_compartir_external_2)_compartir_external_2.onclick = (function(that) {
                return  function(){
                    //console.log("EXTERNOOOOOOOOOOOOOOOOOOOOO SHARE");

                    if(_mm_player){
                        if(_mm_player.offsetWidth<__MINSIZE){
                            var _capa_desplegada = _capa_desplegada_enlatado;
                            if(_data.mediaData.isLive)
                                _capa_desplegada = _capa_desplegada_live;

                            if(_mm_player.offsetWidth<__MINSIZE){

                                if(_capa_desplegada){
                                    if(_boton_menu.className.indexOf("mm_boton_menu-cerrado")>0){
                                        _capa_desplegada.className = _capa_desplegada.className.replace(/ visible/g,"");
                                        _boton_menu.className = _boton_menu.className.replace(/ mm_boton_menu-cerrado/g,"");
                                        if(_boton_menu_2)
                                            _boton_menu_2.className = _boton_menu_2.className.replace(/ mm_boton_menu-cerrado/g,"");
                                        if(_boton_menu_3)
                                            _boton_menu_3.className = _boton_menu_3.className.replace(/ mm_boton_menu-cerrado/g,"");
                                    }else{
                                        _capa_desplegada.className += " visible";
                                        _that.calcularAlturaDesplegable();
                                        _boton_menu.className += " mm_boton_menu-cerrado";
                                    }
                                }
                                else{
                                    if(_capa_menu)_capa_menu.className += " visible";
                                    if(_capa_activa)_capa_activa.className = _capa_activa.className.replace(/ visible/g,"");
                                }

                                if((_hay_trans)&&(_videoPregenerado)&&(_servicioActivo))
                                    _capa_compartir_opciones_2.className += " visible";
                                else{
                                    if(_capa_conectar_redes_volver)_capa_conectar_redes_volver.style.display = "none";
                                    if(_capa_conectar_redes)_capa_conectar_redes.className += " visible";
                                    if(_capa_compartir_opciones_2)_capa_compartir_opciones_2.className = _capa_compartir_opciones_2.className.replace(/ visible/g,"");
                                }

                            }else{
                                if(_capa_menu)_capa_menu.className += " visible";
                                if(_capa_activa)_capa_activa.className = _capa_activa.className.replace(/ visible/g,"");

                            }
                            return false;
                        }else{
                            if(!_data.mediaData.isLive){
                                _that.notifyOrderExternal(namespace.hertz_events.ORDER_SHARE,{"id":_data.mediaData.idTOP});
                            }else{
                                _capa_redes.className += " visible";
                            }
                        }
                    }
                }
            })(this);

            if(_capa_embed_eligetamano)_capa_embed_eligetamano.onclick = (function(_that){
                return function(){
                    if(_capa_embed_eligetamano.className.indexOf("mm_activo")>-1)
                        _capa_embed_eligetamano.className = _capa_embed_eligetamano.className.replace(/ mm_activo/g,"");
                    else
                        _capa_embed_eligetamano.className += " mm_activo";

                    return false;
                }
            })(this);

            if(_capa_embed_copiar)_capa_embed_copiar.onclick = (function(_that){
                return function(){
                    var input = _capa_embed_mm_code;
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
                        _capa_embed_mm_code.focus();
                        _capa_embed_mm_code.select();
                    }
                    else {
                        SelectContent(forExecElement);
                        _capa_embed_mm_code.focus();
                        _capa_embed_mm_code.select();
                        _capa_embed_copiar.innerHTML = "Pulsa Ctrl+C";
                    }

                    return false;
                }
            })(this);

            function SelectContent(element) {
                var rangeToSelect = document.createRange();
                rangeToSelect.selectNodeContents(element);
                var selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(rangeToSelect);
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
            }

            if(_boton_retroceder)_boton_retroceder.onclick = (function(_that){
                return function(){
                    var tosec = _currentTime - 15;

                    if(tosec<0)
                        tosec = 0;

                    _that.notifyOrderSeekBySecs(tosec);
                    return false;
                }
            })(this);

            if(_boton_adelantar)_boton_adelantar.onclick = (function(_that){
                return function(){
                    var tosec = _currentTime + 30;

                    if(tosec<0)
                        tosec = 0;

                    _that.notifyOrderSeekBySecs(tosec);
                    return false;
                }
            })(this);

            if(_boton_retroceder_2)_boton_retroceder_2.onclick = (function(_that){
                return function(){
                    var tosec = _currentTime - 15;

                    if(tosec<0)
                        tosec = 0;

                    _that.notifyOrderSeekBySecs(tosec);
                    return false;
                }
            })(this);

            if(_boton_adelantar_2)_boton_adelantar_2.onclick = (function(_that){
                return function(){
                    var tosec = _currentTime + 30;

                    if(tosec<0)
                        tosec = 0;

                    _that.notifyOrderSeekBySecs(tosec);
                    return false;
                }
            })(this);

            if(_boton_retroceder_3)_boton_retroceder_3.onclick = (function(_that){
                return function(){
                    var tosec = _currentTime - 15;

                    if(tosec<0)
                        tosec = 0;

                    _that.notifyOrderSeekBySecs(tosec);
                    return false;
                }
            })(this);

            if(_boton_adelantar_3)_boton_adelantar_3.onclick = (function(_that){
                return function(){
                    var tosec = _currentTime + 30;

                    if(tosec<0)
                        tosec = 0;

                    _that.notifyOrderSeekBySecs(tosec);
                    return false;
                }
            })(this);

            if(_cambiar_emisora)_cambiar_emisora.onclick = (function(_that){
                return function(){
                    if(_capa_seleccionar)_capa_seleccionar.className += " visible";
                    if(_capa_activa)_capa_activa.className = _capa_activa.className.replace(/ visible/g,"");

                    var _launcher = _that.getPlayer().getLauncher();

                    if(_selectedEmisora!=""){
                        if(this.soyPlayerView){
                            //console.log("soy playerview");
                        }
                        else
                            _launcher.reset(undefined,_data.genericData.id_cuenta,_selectedEmisora,{"player":{"autoplay":true}});
                    }

                    _capa_seleccionar.className = _capa_seleccionar.className.replace(/ visible/g,"");
                    if(_capa_activa)_capa_activa.className += " visible";

                    //console.log(_selectedEmisora);

                    return false;
                }
            })(this);

            if(_cambiar_emisora_2)_cambiar_emisora_2.onclick = (function(_that){
                return function(){
                    if(_capa_seleccionar)_capa_seleccionar.className += " visible";
                    if(_capa_activa)_capa_activa.className = _capa_activa.className.replace(/ visible/g,"");

                    return false;
                }
            })(this);

            if(_cambiar_emisora_3)_cambiar_emisora_3.onclick = (function(_that){
                return function(){
                    if(_capa_seleccionar)_capa_seleccionar.className += " visible";
                    if(_capa_activa)_capa_activa.className = _capa_activa.className.replace(/ visible/g,"");

                    var _launcher = _that.getPlayer().getLauncher();
                    if(_selectedEmisora!="")
                        _launcher.reset(undefined,_data.genericData.id_cuenta,_selectedEmisora,{"player":{"autoplay":true}});

                    _capa_seleccionar.className = _capa_seleccionar.className.replace(/ visible/g,"");
                    if(_capa_activa)_capa_activa.className += " visible";

                    return false;
                }
            })(this);

            if(_cambiar_emisora_4)_cambiar_emisora_4.onclick = (function(_that){
                return function(){
                    if(_capa_seleccionar)_capa_seleccionar.className += " visible";
                    if(_capa_activa)_capa_activa.className = _capa_activa.className.replace(/ visible/g,"");

                    return false;
                }
            })(this);

            /*this.calcularAlturaDesplegable = function(){
                if(!$('.mm_player_permanente').hasClass('mm_player_permanente_live') && $('.mm_capa_desplegada').hasClass('visible')){
                    var nuevaAltura = $('.mm_player_grande_embebido').outerHeight() + $('.mm_audio_info').outerHeight() + 300;
                    $('.mm_capa_desplegada').css({'height': nuevaAltura+'px'});
                }
            };*/

            this.calcularAlturaDesplegable = function(){
                if(!$('.mm_player_permanente').hasClass('mm_player_permanente_live') && $('.mm_capa_desplegada').hasClass('visible')){
                    var nuevaAltura = $('.mm_player_grande_embebido').outerHeight() + $('.mm_audio_info').outerHeight() + 150;
                    if($('.mm_capa_desplegada').hasClass('mm_capa_desplegada-sin_siguiente')){
                        nuevaAltura = nuevaAltura - 120;
                    }
                    $('.mm_capa_desplegada').css({'height': nuevaAltura+'px'});
                }
            };

            if(_that._check_facebook)_that._check_facebook.onclick = (function(_that){
                return function(ev){
                    if(_that._check_facebook){
                        if(_that._check_facebook.className=="marcado")
                            _that._check_facebook.className = "desmarcado";
                        else
                            _that.notifyOrderExternal(namespace.hertz_events.ORDER_TOKEN,{"id":_data.mediaData.idTOP,"type":"facebook"});
                    }

                    return false;
                }
            })(this);

            if(_that._check_twitter)_that._check_twitter.onclick = (function(_that){
                return function(ev){

                    if(_that._check_twitter){
                        if(_that._check_twitter.className=="marcado")
                            _that._check_twitter.className = "desmarcado";
                        else
                            _that.notifyOrderExternal(namespace.hertz_events.ORDER_TOKEN,{"id":_data.mediaData.idTOP,"type":"twitter"});
                    }

                    return false;
                }
            })(this);

            var pre_resize = window.onresize;
            window.onresize = function(){
                _that.calcularAlturaDesplegable();

                if((_corte_2)&&(jQuery.ui)){
                    _corte_2.style.left = (parseInt(jQuery("#"  + _ID + "_mm_seek_slider_2").css("width"))*jQuery("#"  + _ID + "_mm_seek_slider_2").slider("value")/100) + "px";
                    _corte_2.style.width = 3000/(_data.mediaData.duration/1000) + "%";
                    _corte_2.style.height = "100%";
                    if(_corte_2.offsetWidth+_corte_2.offsetLeft>parseInt(jQuery("#"  + _ID + "_mm_seek_slider_2").css("width"))){
                        _corte_2.style.width = (parseInt(jQuery("#"  + _ID + "_mm_seek_slider_2").css("width")) - _corte_2.offsetLeft) + "px";
                    }
                }

                if(pre_resize!=null)
                    pre_resize();
            }

            if(_capa_publicidad_saltar){
                _capa_publicidad_saltar.onclick = (function(_that){
                    return function(ev){
                        //console.log("LALALA");
                        //_that.getPlayer().notifySkippedPubli();
                        //_data.internalData.adModule.manager.closeAd();
                        return false;
                    }
                })(this);
            }

            if(_capa_redes_cerrar){
                _capa_redes_cerrar.onclick =  (function(_that){
                    return function(ev){
                        _capa_redes.className = _capa_redes.className.replace(/ visible/g,"");
                        return false;
                    }
                })(this);
            }

            setSkin.apply(this);
        };

        var _loadAlternativos = function(){
            if((!_soy_permanente)||(!_data.mediaData.isLive))
                return;

            var _parser = new psd.framework.parser.JSONParser(),
                templateMediator = new psd.framework.Mediator(),
                url = _URL_ALTERNATIVOS + _data.mediaData.idTOP;
            //templateMediator.corsIE(true);

            templateMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_COMPLETE, onDataCompleteAlternativo, this);
            templateMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_ERROR, onDataErrorAlternativo, this);
            templateMediator.mediate(url, _parser, psd.framework.Mediator.RESPONSE_JSON);
        }

        var onDataCompleteAlternativo = function(evt){
            if (evt.result.parserResult.code == _CODE_NUM_PARSER_OK)
            {
                //console.log("ooooooooooooooOOOOOOOOOOOOOOOOOOOO",evt.result.parserResult.result);
                if(_capa_desplegada_live){
                    _capa_desplegada_live.className = _capa_desplegada_live.className.replace(/  mm_capa_desplegada_live_anuncio/g,"");
                    _capa_desplegada_live.className += " mm_capa_desplegada_live_anuncio";
                }

                if(_mm_anuncio_programa_all){
                    _mm_anuncio_programa_all.innerHTML = "";

                    if(evt.result.parserResult.result.length==0){
                        if(_capa_desplegada_live){
                            _capa_desplegada_live.className = _capa_desplegada_live.className.replace("_anuncio","");
                        }
                    }else{
                        var result = evt.result.parserResult.result;
                        for(var res in result){
                            var prodom = document.createElement("div");
                            prodom.className = "mm_anuncio_programa";

                            prodom.onclick = (function(_that){
                                return function(){
                                    var _launcher = _that.getPlayer().getLauncher();
                                    //_that.notifyOrderExternal("dmena",{"id":_data.mediaData.idTOP});
                                    _launcher.reset(undefined,_data.genericData.id_cuenta,result[res].xref,{"player":{"autoplay":true}});
                                    _that.notifyOrderExternal(namespace.hertz_events.RESET_PLAYERVIEW,{"id":result[res].xref,"alternativo":true});
                                }
                            })(this);

                            var pro = '<span class="mm_cintillo">TAMBIÉN EN DIRECTO</span>';
                            pro+= '<span class="mm_programa">' + result[res].titulo + '</span>';
                            pro+= '<span class="mm_horario">DE ' + result[res].inicio + ' A ' + result[res].fin + '</span>';
                            pro+= '<span class="mm_presentador">' + result[res].presentador + '</span>';
                            pro+= '<div class="mm_capa_foto">';
                            pro+= '<img src="' + result[res].imagenes.REC_1_1_256 + '" alt="" width="176" height="176" id="" style="visibility: visible;">';
                            pro+= '</div>';

                            prodom.innerHTML = pro;

                            _mm_anuncio_programa_all.appendChild(prodom);
                        }
                    }
                }

            }
            else if (evt.result.parserResult.code == _CODE_NUM_PARSER_ERROR)
            {
                //TODO: Error
            }
        };

        var onDataErrorAlternativo = function(){
            if(_capa_desplegada_live)_capa_desplegada_live.className = _capa_desplegada_live.className.replace(/  mm_capa_desplegada_live_anuncio/g,"");
        };

		var setSkin = function()
		{
            _that.__idTOP = _data.mediaData.idTOP;
            _soy_alternativo = false;

            if(!getDevice().mobile){
                if(_capa_conectar_redes_whatsapp){_capa_conectar_redes_whatsapp.innerHTML = "";_capa_conectar_redes_whatsapp.style.margin = "0"}
                if(_capa_conectar_redes_whatsapp_2){_capa_conectar_redes_whatsapp_2.innerHTML = "";_capa_conectar_redes_whatsapp_2.style.margin = "0"}
                if(_capa_conectar_redes_whatsapp_3){_capa_conectar_redes_whatsapp_3.innerHTML = "";_capa_conectar_redes_whatsapp_3.style.margin = "0"}
                if(_capa_conectar_redes_whatsapp_4){_capa_conectar_redes_whatsapp_4.innerHTML = "";_capa_conectar_redes_whatsapp_4.style.margin = "0"}
            }

            /*if(getDevice().mobile){
                //_isplaying = false;

                if(_btn_play)_btn_play.className = "mm_boton_play";
                if(_btn_play_2)_btn_play_2.className = "mm_boton_play";
                if(_btn_play_3)_btn_play_3.className = "mm_boton_play";
                if(_btn_play_4)_btn_play_4.className = "mm_control_play";
            }*/

            _that.notifyOrderExternal(namespace.hertz_events.ORDER_VIA,{"id":_data.mediaData.idTOP,"live":_data.mediaData.isLive});
            //_loadServicioActivo();

            if((typeof(_that.getPlayer())!="undefined")
                &&(typeof(_that.getPlayer().getLauncher())!="undefined")
                &&(typeof(_that.getPlayer().getLauncher().data_FAPI)!="undefined")
                &&(_that.getPlayer().getLauncher().data_FAPI!={})
                ){
                //_data.segmento = "miprograma miseccion";
                _data.inicioemision = _that.getPlayer().getLauncher().data_FAPI.data[0]["emission_date_start"];
                _data.finemision = _that.getPlayer().getLauncher().data_FAPI.data[0]["emission_date_end"];
            }

            if((_data.mediaData.isLive)&&(!_emisoras_cargadas)){
                _emisoras_cargadas = true;
                _loadZonas.apply(this);
            }

            if(_data.mediaData.isLive){
                if(_capa_desplegada_enlatado)_capa_desplegada_enlatado.className = _capa_desplegada_enlatado.className.replace(/ visible/g,"");
            }else{
                _loadTranscripcion.apply(_that);
                _loadSiguiente.apply(_that);
                if(_capa_desplegada_live)_capa_desplegada_live.className = _capa_desplegada_live.className.replace(/ visible/g,"");
            }

            if(_soy_permanente){
                _mm_player.className = "mm_player_permanente";
                if(_data.mediaData.isLive){
                    _mm_player.className += " mm_player_permanente_live";
                }
            }

            if((!_capa_sonando)&&(!_capa_sonando_2))
                return;

            _loadAlternativos.apply(this);

            //if(_data.mediaData.isLive)
            if(_data.mediaData.isLive)
                _loadDirecto.apply(this);

            if(_menu_compartir)_menu_compartir.onclick = (function(_that){
                return function(){
                    if((_soy_embed)&&(_skin_type==_SKIN_TYPE_PEQUENO))
                        _capa_conectar_redes.className += " visible";

                    if((_mm_player.offsetWidth>=__MINSIZE)&&(_skin_type!=_SKIN_TYPE_GRANDE)){
                        _that.notifyOrderExternal(namespace.hertz_events.ORDER_SHARE,{"id":_data.mediaData.idTOP});
                    }else{
                        _that.notifyOrderPause();
                        if((_hay_trans)&&(_videoPregenerado)&&(_servicioActivo)){
                            if(_capa_compartir_opciones){
                                _capa_compartir_opciones.className += " visible";
                            }
                            else{
                                _that.notifyOrderExternal(namespace.hertz_events.ORDER_SHARE,{"id":_data.mediaData.idTOP});
                            }
                        }else{
                            if(_capa_conectar_redes_volver)_capa_conectar_redes_volver.style.display = "none";
                            if(_capa_conectar_redes)_capa_conectar_redes.className += " visible";
                            if(_capa_compartir_opciones_2)_capa_compartir_opciones_2.className = _capa_compartir_opciones_2.className.replace(/ visible/g,"");
                        }
                    }
                    return false;
                }
            })(this);
            if(_menu_compartir_2)_menu_compartir_2.onclick = (function(_that){
                return function(){
                    _that.notifyOrderPause();
                    if((_hay_trans)&&(_videoPregenerado)&&(_servicioActivo)){
                        if(_capa_compartir_opciones_2)_capa_compartir_opciones_2.className += " visible";
                    }else{
                        if(_capa_conectar_redes_volver)_capa_conectar_redes_volver.style.display = "none";
                        if(_capa_conectar_redes)_capa_conectar_redes.className += " visible";
                        if(_capa_compartir_opciones_2)_capa_compartir_opciones_2.className = _capa_compartir_opciones_2.className.replace(/ visible/g,"");
                    }
                    return false;
                }
            })(this);

            if(_boton_compartir_2)_boton_compartir_2.onclick = (function(_that){
                return function(){
                    if((_hay_trans)&&(_videoPregenerado)&&(_servicioActivo)&&(_reset_no_cortar==false))
                        _capa_compartir_opciones.className += " visible";
                    else{
                        if(_capa_conectar_redes_volver)_capa_conectar_redes_volver.style.display = "none";
                        if(_capa_conectar_redes)_capa_conectar_redes.className += " visible";
                        if(_capa_compartir_opciones)_capa_compartir_opciones.className = _capa_compartir_opciones.className.replace(/ visible/g,"");
                    }
                    return false;
                }
            })(this);

            if(_boton_compartir_3)_boton_compartir_3.onclick = (function(_that){
                return function(){
                    if((_hay_trans)&&(_videoPregenerado)&&(_servicioActivo)&&(_reset_no_cortar==false))
                        _capa_compartir_opciones_2.className += " visible";
                    else{
                        if(_capa_conectar_redes_volver)_capa_conectar_redes_volver.style.display = "none";
                        if(_capa_conectar_redes)_capa_conectar_redes.className += " visible";
                        if(_capa_compartir_opciones_2)_capa_compartir_opciones_2.className = _capa_compartir_opciones_2.className.replace(/ visible/g,"");
                    }
                    return false;
                }
            })(this);

            if(_capa_embed_mm_code){
                _capa_embed_mm_code.innerHTML = _codigo_iframe.replace("{{HH}}","360").replace("{{EE}}",_data.mediaData.idTOP).replace("{{PP}}",270).replace("{{NN}}",_data.mediaData.title).replace("{{enlace}}",_URL_AUDIO_PLAYSER + _data.mediaData.idTOP).replace(/{{titulo}}/g,_data.mediaData.title).replace("{{max_width}}","max-width:640px;");
            }

			//ponemos un cover o lo ocultamos si no hay
			if((_data.uiData.poster!=false)&&(_data.uiData.poster!=undefined)&&(_data.uiData.poster!=null)){
                if(_cover)
				    _cover.src = _data.uiData.poster;
                if(_cover_)
                    _cover_.src = _data.uiData.poster;
                if(_cover_2)
                    _cover_2.src = _data.uiData.poster;
                if(_cover_3)
                    _cover_3.src = _data.uiData.poster;
                if(_cover_4)
                    _cover_4.src = _data.uiData.poster;
                if(_cover_5)
                    _cover_5.src = _data.uiData.poster;
            }
			else{
                if(_cover)
				    _cover.style.visibility = "hidden";
                if(_cover_)
                    _cover_.style.visibility = "hidden";
                if(_cover_2)
                    _cover_2.style.visibility = "hidden";
                if(_cover_3)
                    _cover_3.style.visibility = "hidden";
                if(_cover_4)
                    _cover_4.style.visibility = "hidden";
                if(_cover_5)
                    _cover_5.style.visibility = "hidden";
            }

            if(_data.mediaData.duration/1000>=3600)
                _durationFormat = "h:mm:ss";
            else
                _durationFormat = "mm:ss";

			//duración en portada
            if(_duration)
    			_duration.innerHTML = _that.secondsAsTimeCode(_data.mediaData.duration/1000,_durationFormat);

            if(_total_time)_total_time.innerHTML = _that.secondsAsTimeCode(_data.mediaData.duration/1000,_durationFormat);
            if(_total_time_2)_total_time_2.innerHTML = _that.secondsAsTimeCode(_data.mediaData.duration/1000,_durationFormat);
            if(_total_time_3)_total_time_3.innerHTML = _that.secondsAsTimeCode(_data.mediaData.duration/1000,_durationFormat);
            if(_total_time_4)_total_time_4.innerHTML = _that.secondsAsTimeCode(_data.mediaData.duration/1000,_durationFormat);
            if(_total_time_4)_total_time_5.innerHTML = _that.secondsAsTimeCode(_data.mediaData.duration/1000,_durationFormat);

            //título del audio
            if(_titulo)_titulo.innerHTML = _data.mediaData.title;
            if(_titulo_2)_titulo_2.innerHTML = _data.mediaData.title;
            if(_titulo_3)_titulo_3.innerHTML = _data.mediaData.title;
            if(_titulo_menu)_titulo_menu.innerHTML = _data.mediaData.title;

            if(_soy_permanente){
                if(_titulo)_titulo.onclick = function(){_that.notifyOrderExternal(namespace.hertz_events.ORDER_OIR,{"id":_data.mediaData.idTOP,"live":_data.mediaData.isLive});_titulo.style.cursor = "pointer"}
                if(_titulo_2)_titulo_2.onclick = function(){_that.notifyOrderExternal(namespace.hertz_events.ORDER_OIR,{"id":_data.mediaData.idTOP,"live":_data.mediaData.isLive});_titulo_2.style.cursor = "pointer"}
                if(_titulo_3)_titulo_3.onclick = function(){_that.notifyOrderExternal(namespace.hertz_events.ORDER_OIR,{"id":_data.mediaData.idTOP,"live":_data.mediaData.isLive});_titulo_3.style.cursor = "pointer"}
                if(_titulo_menu){_titulo_menu.onclick = function(){_that.notifyOrderExternal(namespace.hertz_events.ORDER_OIR,{"id":_data.mediaData.idTOP,"live":_data.mediaData.isLive});};_titulo_menu.style.cursor = "pointer"}
            }

            if(_soy_embed){
                var url = _url_compartir_enlatado;
                if(_data.mediaData.isLive)
                    url = _url_compartir_emisora;

                if(_titulo)_titulo.innerHTML = "<a href='" + url + _data.mediaData.idTOP + "/' style='color:white;' target='_blank'>" + _titulo.innerHTML + "</a>";
                if(_titulo_2){
                    titulo_2_a = document.createElement("a");
                    titulo_2_a.id = _ID + "_titulo2_a";
                    titulo_2_a.href = url + _data.mediaData.idTOP + "/";
                    titulo_2_a.target = "_blank";
                    titulo_2_a.style.whiteSpace = "nowrap";
                    titulo_2_a.style.color = "white";
                    titulo_2_a.innerText = _data.mediaData.title;

                    _titulo_2.innerHTML = "";
                    _titulo_2.appendChild(titulo_2_a);

                    //_titulo_2.innerHTML = "<a id='" + _ID + "_titulo2_a' href='" + url + _data.mediaData.idTOP + "/' style='color:white;white-space:nowrap;' target='_blank'>" + _titulo_2.innerHTML + "</a>";
                }
                if(_titulo_3)_titulo_3.innerHTML = "<a href='" + url + _data.mediaData.idTOP + "/' style='color:white;' target='_blank'>" + _titulo_3.innerHTML + "</a>";
                if(_titulo_menu)_titulo_menu.innerHTML = "<a href='" + url + _data.mediaData.idTOP + "/' style='color:white;' target='_blank'>" + _titulo_menu.innerHTML + "</a>";
            }

            if(_menu_guardar)_menu_guardar.onclick = (function(_that){
                return function(){
					//console.log("GUARDAR")
                    _that.notifyOrderExternal(namespace.hertz_events.ORDER_GUARDAR,{"id":_data.mediaData.idTOP});
					return false;
                }
            })(this);
            if(_menu_guardar_2)_menu_guardar_2.onclick = (function(_that){
                return function(){
                    //console.log("GUARDAR")
                    _that.notifyOrderExternal(namespace.hertz_events.ORDER_GUARDAR,{"id":_data.mediaData.idTOP});
                    return false;
                }
            })(this);

            if(_menu_leer)_menu_leer.onclick = (function(_that){
                return function(){
					//console.log("LEER")
                    if(_soy_embed)
                        window.open(_URL_AUDIO_PLAYSER + _data.mediaData.idTOP + "?leer=on", '_blank');
                    else
                        _that.notifyOrderExternal(namespace.hertz_events.ORDER_LEER,{"id":_data.mediaData.idTOP,"live":_data.mediaData.isLive});

					return false;
                }
            })(this);
            if(_menu_leer_2)_menu_leer_2.onclick = (function(_that){
                return function(){
                    //console.log("LEER")
                    if(_soy_embed)
                        window.open(_URL_AUDIO_PLAYSER + _data.mediaData.idTOP + "?leer=on", 'new');
                    else
                        _that.notifyOrderExternal(namespace.hertz_events.ORDER_LEER,{"id":_data.mediaData.idTOP,"live":_data.mediaData.isLive});

                    return false;
                }
            })(this);

            if(!_data.mediaData.isLive)
                _loadTFP();

			if(_menu_oir_en){
                if(!_soy_embed)
                    _menu_oir_en.style.display = "none";

                _menu_oir_en.onclick = (function(_that){
                return function(){
                    if(_soy_embed)
                        window.open(_URL_AUDIO_PLAYSER + _data.mediaData.idTOP, '_blank');
                    else
                        _that.notifyOrderExternal(namespace.hertz_events.ORDER_OIR,{"id":_data.mediaData.idTOP,"live":_data.mediaData.isLive});
                    return false;
                }
            })(this);
            }

            if(_embeber_grande)_embeber_grande.onclick = (function(_that){
                return function(){
                    _that.notifyOrderButton("llevatelo_grande");
                    _capa_embed_mm_code.innerHTML = _codigo_iframe.replace("{{HH}}","360").replace("{{EE}}",_data.mediaData.idTOP).replace("{{PP}}",270).replace("{{NN}}",_data.mediaData.title).replace("{{enlace}}",_URL_AUDIO_PLAYSER + _data.mediaData.idTOP).replace(/{{titulo}}/g,_data.mediaData.title).replace("{{max_width}}","max-width:640px;");
                    return false;
                }
            })(this);

            if(_embeber_pequeno)_embeber_pequeno.onclick = (function(_that){
                return function(){
                    _that.notifyOrderButton("llevatelo_pequeno");
                    _capa_embed_mm_code.innerHTML = _codigo_iframe.replace("{{HH}}","102").replace("{{EE}}",_data.mediaData.idTOP).replace("{{PP}}",271).replace("{{NN}}",_data.mediaData.title).replace("{{enlace}}",_URL_AUDIO_PLAYSER + _data.mediaData.idTOP).replace(/{{titulo}}/g,_data.mediaData.title).replace("{{max_width}}","");
                    return false;
                }
            })(this);

            if(_btn_compartir_todo)_btn_compartir_todo.onclick = (function(_that){
                return function(){
                    //nuevo
                    if(_capa_conectar_redes)_capa_conectar_redes.className += " visible";
                    if(_capa_compartir_opciones)_capa_compartir_opciones.className = _capa_compartir_opciones.className.replace(/ visible/g,"");
                    //finnuevo

                    /*
                    _that.notifyOrderPause();
                    _capa_compartir_mensaje.className += " visible";
                    _capa_sonando.className = _capa_sonando.className.replace(/ mm_mostrar-controles/g,"");
                    _capa_compartir_opciones.className = _capa_compartir_opciones.className.replace(/ visible/g,"");
                    return false;
                    */
                    return false;
                }
            })(this);

            if(_btn_compartir_todo_2)_btn_compartir_todo_2.onclick = (function(_that){
                return function(){
                    //nuevo
                    if(_capa_conectar_redes)_capa_conectar_redes.className += " visible";
                    if(_capa_compartir_opciones_2)_capa_compartir_opciones_2.className = _capa_compartir_opciones_2.className.replace(/ visible/g,"");
                    //finnuevo
                    return false;
                }
            })(this);

            if(_btn_compartir_momento)_btn_compartir_momento.onclick = (function(_that){
                return function(){
                    _that.notifyOrderInicioCompartir("facebook-twitter|compartir_momento");
                    _that.notifyOrderPause();
                    if(_capa_menu)_capa_menu.className = _capa_menu.className.replace(/ visible/g,"");

                    //_capa_compartir_cortar.className += " visible";
                    _capa_sonando.className = _capa_sonando.className.replace(/ mm_mostrar-controles/g,"");
                    _capa_sonando.className += " mm_capa_sonando-cortar visible";

                    _capa_compartir_opciones.className = _capa_compartir_opciones.className.replace(/ visible/g,"");

                    if((_corte_2)&&(jQuery.ui)){
                        _corte_2.style.left = (parseInt(jQuery("#"  + _ID + "_mm_seek_slider_2").css("width"))*jQuery("#"  + _ID + "_mm_seek_slider_2").slider("value")/100) + "px";
                        _corte_2.style.width = 3000/(_data.mediaData.duration/1000) + "%";
                        _corte_2.style.height = "100%";
                        if(_corte_2.offsetWidth+_corte_2.offsetLeft>parseInt(jQuery("#"  + _ID + "_mm_seek_slider_2").css("width"))){
                            _corte_2.style.width = (parseInt(jQuery("#"  + _ID + "_mm_seek_slider_2").css("width")) - _corte_2.offsetLeft) + "px";
                        }
                    }
                    if(_that.tr!=null)
                        _that.tr.getIndex(0);

                    return false;
                }
            })(this);

            if(_btn_compartir_momento_2)_btn_compartir_momento_2.onclick = (function(_that){
                return function(){
                    _that.notifyOrderInicioCompartir("facebook-twitter|compartir_momento");
                    _that.notifyOrderPause();
                    if(_capa_menu_2)_capa_menu_2.className = _capa_menu_2.className.replace(/ visible/g,"");

                    //_capa_compartir_cortar.className += " visible";
                    _capa_sonando_2.className = _capa_sonando_2.className.replace(/ mm_mostrar-controles/g,"");
                    _capa_sonando_2.className += " mm_capa_sonando-cortar visible";

                    _capa_compartir_opciones_2.className = _capa_compartir_opciones_2.className.replace(/ visible/g,"");

                    if((_corte_2)&&(jQuery.ui)){
                        _corte_2.style.left = (parseInt(jQuery("#"  + _ID + "_mm_seek_slider_2").css("width"))*jQuery("#"  + _ID + "_mm_seek_slider_2").slider("value")/100) + "px";
                        _corte_2.style.width = 3000/(_data.mediaData.duration/1000) + "%";
                        _corte_2.style.height = "100%";
                        if(_corte_2.offsetWidth+_corte_2.offsetLeft>parseInt(jQuery("#"  + _ID + "_mm_seek_slider_2").css("width"))){
                            _corte_2.style.width = (parseInt(jQuery("#"  + _ID + "_mm_seek_slider_2").css("width")) - _corte_2.offsetLeft) + "px";
                        }
                    }
                    if(_that.tr!=null)
                        _that.tr.getIndex(0);

                    return false;
                }
            })(this);

            if(_capa_cortar_siguiente)_capa_cortar_siguiente.onclick = (function(_that){
                return function(){
                    tiempo_parar = -1;

                    var comentario_aux = _data.mediaData.title + "\n" + _URL_AUDIO_PLAYSER + _data.mediaData.idTOP;
                    if(_twitter_via_external!=""){
                        comentario_aux += "&via=" + _twitter_via_external;
                    }else{
                        comentario_aux += "&via=" + _twitter_via;
                    }

                    var comentario_titulo = _data.mediaData.title;

                    if(comentario_aux.length> 140){
                        //restamos 4 para poner ..."
                        comentario_titulo = comentario_titulo.substr(0,comentario_titulo.length - 4 - (comentario_aux.length-140)) + "...";
                    }

                    var comentario = comentario_titulo + "\n" + _URL_AUDIO_PLAYSER + _data.mediaData.idTOP;

                    if(_capa_compartir_mensaje_comentario)_capa_compartir_mensaje_comentario.value = comentario;

                    _that.notifyOrderExternal(namespace.hertz_events.ORDER_TOKEN,{"id":_data.mediaData.idTOP,"type":"all"});

                    _capa_compartir_mensaje.className += " visible";
                    _capa_sonando.className = _capa_sonando.className.replace(/ mm_mostrar-controles/g,"");

                    //_capa_compartir_cortar.className = _capa_compartir_cortar.className.replace(/ visible/g,"");
                    return false;
                }
            })(this);
            if(_capa_cortar_siguiente_2)_capa_cortar_siguiente_2.onclick = (function(_that){
                return function(){
                    tiempo_parar = -1;

                    _that.notifyOrderExternal(namespace.hertz_events.ORDER_TOKEN,{"id":_data.mediaData.idTOP,"type":"all"});

                    _capa_compartir_mensaje.className += " visible";
                    _capa_sonando_2.className = _capa_sonando_2.className.replace(/ mm_mostrar-controles/g,"");

                    //_capa_compartir_cortar.className = _capa_compartir_cortar.className.replace(/ visible/g,"");
                    return false;
                }
            })(this);

            if(_capa_compartir_mensaje_compartir)_capa_compartir_mensaje_compartir.onclick = (function(_that){
                return function(){

                    if((_that._check_facebook.className=="desmarcado")&&(_that._check_twitter.className=="desmarcado"))
                        return false;

                    _capa_compartir_preparando.className += " visible";
                    _capa_compartir_mensaje.className = _capa_compartir_mensaje.className.replace(/ visible/g,"");
                    _capa_sonando.className = _capa_sonando.className.replace(/ mm_mostrar-controles/g,"");

                    if(_corte_2){
                        var percent = parseInt(_corte_2.style.left)*100/parseInt(jQuery("#"  + _ID + "_mm_seek_slider_2").css("width"));
                        _rrss_time = _data.mediaData.duration*percent/100;
                    }

                    var mandar_datos_compartir = function(type,_token){
                        var _descripcion = "";
                        var _ssm = "";
                        var _via = "";

                        if(_capa_compartir_mensaje_comentario)_descripcion = _capa_compartir_mensaje_comentario.value;

                        switch(type){
                            case "facebook":
                                _ssm = "fb";
                            break;
                            case "twitter":
                                _ssm = "tw";
                                if(_twitter_via_external!=""){
                                    _via = _twitter_via_external;
                                }else{
                                    if(_twitter_via!=null)
                                        _via = _twitter_via;
                                }

                                _via = "via @" + _via;
                            break;
                        }

                        _descripcion = _descripcion.replace(_url_compartir_enlatado + _data.mediaData.idTOP,_url_compartir_enlatado + _data.mediaData.idTOP + "/?ssm=" + _ssm + "&t=" + _rrss_time/1000);

                        _descripcion += " " + _via;

                        var settings = {
                            "async": true,
                            "crossDomain": true,
                            "url": "https://compartir.cadenaser.com/v1/video-transform/playser/audio",
                            //"url": "https://compartir.cadenaser.com/v1/video-transform-sync/playser/audio",
                            "method": "POST",
                            "data": {
                                "videoIdref": _data.mediaData.idTOP,
                                "startTime": _rrss_time/1000,
                                "token": _token,
                                "tokenType": type,
                                "description":_descripcion
                            }
                        }

                        $.ajax(settings).done(function (response) {
                            //console.log(type + ">>>>>>",response);
                        });
                    }

                    if(_that._check_facebook.className=="marcado"){
                        //console.log("pruebo facebook");
                        mandar_datos_compartir("facebook",_token_fb);
                    }
                    if(_that._check_twitter.className=="marcado"){
                        //console.log("pruebo twitter");
                        mandar_datos_compartir("twitter",_token_tw);
                    }

                    _that.notifyOrderRRSS(_that.orderRSSParam() + "|compartir_momento");

                    setTimeout(function(){
                        _capa_compartir_terminado.className += " visible";
                        _capa_compartir_preparando.className = _capa_compartir_preparando.className.replace(/ visible/g,"");
                    },3000);

                    return false;
                }
            })(this);

            if(_capa_compartir_opciones_cerrar)_capa_compartir_opciones_cerrar.onclick = (function(_that){
                return function(){
                    _capa_compartir_opciones.className = _capa_compartir_opciones.className.replace(/ visible/g,"");
                    _capa_sonando.className = _capa_sonando.className.replace(/ mm_mostrar-controles/g,"");
                    _capa_sonando.className = _capa_sonando.className.replace(/ mm_capa_sonando-cortar/g,"");

                    return false;
                }
            })(this);
            if(_capa_compartir_opciones_cerrar_2)_capa_compartir_opciones_cerrar_2.onclick = (function(_that){
                return function(){
                    _capa_compartir_opciones_2.className = _capa_compartir_opciones_2.className.replace(/ visible/g,"");
                    _capa_sonando_2.className = _capa_sonando_2.className.replace(/ mm_mostrar-controles/g,"");
                    _capa_sonando_2.className = _capa_sonando_2.className.replace(/ mm_capa_sonando-cortar/g,"");

                    return false;
                }
            })(this);

            if(_capa_compartir_opciones_volver)_capa_compartir_opciones_volver.onclick = (function(_that){
                return function(){
                    _capa_compartir_opciones.className = _capa_compartir_opciones.className.replace(/ visible/g,"");
                    return false;
                }
            })(this);
            if(_capa_compartir_opciones_volver_2)_capa_compartir_opciones_volver_2.onclick = (function(_that){
                return function(){
                    _capa_compartir_opciones_2.className = _capa_compartir_opciones_2.className.replace(/ visible/g,"");
                    return false;
                }
            })(this);

            if(_capa_compartir_cortar_cerrar)_capa_compartir_cortar_cerrar.onclick = (function(_that){
                return function(){
                    tiempo_parar = -1;

                    //_capa_compartir_cortar.className = _capa_compartir_cortar.className.replace(/ visible/g,"");
                    _capa_sonando.className = _capa_sonando.className.replace(/ mm_mostrar-controles/g,"");
                    _capa_sonando.className = _capa_sonando.className.replace(/ mm_capa_sonando-cortar/g,"");
                    return false;
                }
            })(this);
            if(_capa_compartir_cortar_cerrar_2)_capa_compartir_cortar_cerrar_2.onclick = (function(_that){
                return function(){
                    tiempo_parar = -1;

                    //_capa_compartir_cortar.className = _capa_compartir_cortar.className.replace(/ visible/g,"");
                    _capa_sonando_2.className = _capa_sonando_2.className.replace(/ mm_mostrar-controles/g,"");
                    _capa_sonando_2.className = _capa_sonando_2.className.replace(/ mm_capa_sonando-cortar/g,"");
                    return false;
                }
            })(this);

            if(_capa_compartir_cortar_volver)_capa_compartir_cortar_volver.onclick = (function(_that){
                return function(){
                    tiempo_parar = -1;

                    _capa_compartir_opciones.className += " visible";
                    //_capa_compartir_cortar.className = _capa_compartir_cortar.className.replace(/ visible/g,"");
                    return false;
                }
            })(this);
            if(_capa_compartir_cortar_volver_2)_capa_compartir_cortar_volver_2.onclick = (function(_that){
                return function(){
                    tiempo_parar = -1;

                    _capa_compartir_opciones_2.className += " visible";
                    //_capa_compartir_cortar.className = _capa_compartir_cortar.className.replace(/ visible/g,"");
                    return false;
                }
            })(this);

            if(_capa_compartir_mensaje_cerrar)_capa_compartir_mensaje_cerrar.onclick = (function(_that){
                return function(){
                    _capa_compartir_mensaje.className = _capa_compartir_mensaje.className.replace(/ visible/g,"");
                    _capa_sonando.className = _capa_sonando.className.replace(/ mm_mostrar-controles/g,"");
                    _capa_sonando.className = _capa_sonando.className.replace(/ mm_capa_sonando-cortar/g,"");
                    return false;
                }
            })(this);
            if(_capa_compartir_mensaje_cerrar_2)_capa_compartir_mensaje_cerrar_2.onclick = (function(_that){
                return function(){
                    _capa_compartir_mensaje.className = _capa_compartir_mensaje.className.replace(/ visible/g,"");
                    _capa_sonando_2.className = _capa_sonando_2.className.replace(/ mm_mostrar-controles/g,"");
                    _capa_sonando_2.className = _capa_sonando_2.className.replace(/ mm_capa_sonando-cortar/g,"");
                    return false;
                }
            })(this);

            if(_capa_compartir_terminado_cerrar)_capa_compartir_terminado_cerrar.onclick = (function(_that){
                return function(){
                    _capa_compartir_terminado.className = _capa_compartir_terminado.className.replace(/ visible/g,"");
                    _capa_sonando.className = _capa_sonando.className.replace(/ mm_mostrar-controles/g,"");
                    _capa_sonando.className = _capa_sonando.className.replace(/ mm_capa_sonando-cortar/g,"");
                    return false;
                }
            })(this);
            if(_capa_compartir_terminado_cerrar_2)_capa_compartir_terminado_cerrar_2.onclick = (function(_that){
                return function(){
                    _capa_compartir_terminado.className = _capa_compartir_terminado.className.replace(/ visible/g,"");
                    _capa_sonando_2.className = _capa_sonando_2.className.replace(/ mm_mostrar-controles/g,"");
                    _capa_sonando_2.className = _capa_sonando_2.className.replace(/ mm_capa_sonando-cortar/g,"");
                    return false;
                }
            })(this);
            if(_capa_compartir_terminado_ok)_capa_compartir_terminado_ok.onclick = (function(_that){
                return function(){
                    _capa_compartir_terminado.className = _capa_compartir_terminado.className.replace(/ visible/g,"");
                    _capa_sonando.className = _capa_sonando.className.replace(/ mm_mostrar-controles/g,"");
                    _capa_sonando.className = _capa_sonando.className.replace(/ mm_capa_sonando-cortar/g,"");
                    return false;
                }
            })(this);
            if(_capa_compartir_terminado_ok_2)_capa_compartir_terminado_ok_2.onclick = (function(_that){
                return function(){
                    _capa_compartir_terminado.className = _capa_compartir_terminado.className.replace(/ visible/g,"");
                    _capa_sonando_2.className = _capa_sonando_2.className.replace(/ mm_mostrar-controles/g,"");
                    _capa_sonando_2.className = _capa_sonando_2.className.replace(/ mm_capa_sonando-cortar/g,"");
                    return false;
                }
            })(this);
        };

        this.orderRSSParam = function(){
            var ret = "";
            if((_that._check_facebook.className=="marcado")&&((_that._check_twitter.className=="marcado"))){
                ret = "facebook-twitter";
            }else{
                if(_that._check_facebook.className=="marcado")
                    ret = "facebook";
                if(_that._check_twitter.className=="marcado")
                    ret = "twitter";
            }

            return ret;
        };

        this.init = function(data) {
            _data = data;

            _loadServicioActivo();

            _data.mediaData.isPlaylist = true;

            _data.extraccion = "manual";

            _that.__data = _data;
            _that.__idTOP = data.mediaData.idTOP;
            _that.getPlayer().getLauncher().getEmbed().__hertz = _that;

            if(_data.mediaData.isLive){
                _URL_AUDIO_PLAYSER = _url_compartir_emisora;
            }else{
                _URL_AUDIO_PLAYSER = _url_compartir_enlatado;
            }

            _that.setPlayerviewVars();

            if(_data.uiData.skinData.twitter_via!=undefined){
                _twitter_via = _data.uiData.skinData.twitter_via;
            }
            if(_data.uiData.skinData.soyembed!=undefined){
                _soy_embed = _data.uiData.skinData.soyembed;
            }
            if(_data.uiData.skinData.skintype!=undefined){
                _skin_type = _data.uiData.skinData.skintype;
            }
            if(_data.uiData.skinData.udn!=undefined){
                _udn = _data.uiData.skinData.udn;
            }

            if(_that._playerview_skin_type!=null)
                _skin_type = _that._playerview_skin_type;
            if(_that._playerview_skin_color!=null)
                _that._playerview_color = _that._playerview_skin_color;

            _totalTime = data.mediaData.duration/1000;

            _url_descarga = _data.mediaData.urlHTML5[0]
            for(var i in _data.mediaData.urlHTML5){
                if((_data.mediaData.urlHTML5[i].indexOf("mp4")>0)||(_data.mediaData.urlHTML5[i].indexOf("mp3")>0)){
                    _url_descarga = _data.mediaData.urlHTML5[i];
                }
            }

            _ID = _data.genericData.id;
            this._id = _ID;

            _container = document.getElementById(_data.internalData.skinContainer);

            switch(_skin_type){
                case _SKIN_TYPE_PEQUENO:
                    _template = "template_small.html";
                    _style = "players.css";
                    _hay_trans = true;
                    _soy_permanente = false;
                    break;
                case _SKIN_TYPE_PERMANENTE:
                    _template = "template_permanente.html";
                    _style = "players_permanente.css";
                    _hay_trans = true;
                    _soy_permanente = true;
                    _soy_embed = false;
                    break;
            }

            _loadCSS.apply(this);
            _loadTemplate.apply(this);
		};

        this.reset_skin = function(){
            //_isplaying = false;
            _loadServicioActivo();
            setSkin.apply(this);

            if(typeof(window._speakers)!="undefined"){
                _data.speakers = window._speakers
                window._speakers = undefined;
            }

            if(!_data.mediaData.isLive){
                window["triton_" + _data.genericData.id] = undefined;
            }
        }

		this.reset = function () {
            //console.log("entro en RESET");
            /*
			setSkin.apply(this);
            _that.__idTOP = _data.mediaData.idTOP;

            //_loadServicioActivo();

            if((typeof(_that.getPlayer())!="undefined")
                &&(typeof(_that.getPlayer().getLauncher())!="undefined")
                &&(typeof(_that.getPlayer().getLauncher().data_FAPI)!="undefined")
                &&(_that.getPlayer().getLauncher().data_FAPI!={})
                ){
                    //_data.segmento = "miprograma miseccion";
                    _data.inicioemision = _that.getPlayer().getLauncher().data_FAPI.data[0]["emission_date_start"];
                    _data.finemision = _that.getPlayer().getLauncher().data_FAPI.data[0]["emission_date_end"];
            }
            */
        };

		this.secondsAsTimeCode = function(time, format)
		{
			var hours = Math.floor(time/3600),
				minutes = Math.floor((time - (hours*3600))/60),
				seconds = Math.floor(time - (hours*3600) - (minutes*60)),
				timecode = "";

			//if(hours<10) {hours = hours;}
			if(minutes<10) {minutes = "0" + minutes;}
			if(seconds<10) {seconds = "0" + seconds;}

			if(format==null) {timecode = hours + ":" + minutes + ":" + seconds;}
			else
			{
				timecode = format.replace('h', hours);
				timecode = timecode.replace('mm', minutes);
				timecode = timecode.replace('ss', seconds);
			}

			return timecode;
		}

		this.resize = function(width, height){};

		this.onProgress = function(data){

            if(!_hay_trans){
                if(_capa_sonando){
                    if(_capa_sonando.className.indexOf(" mm_mostrar-controles")<1)
                        _capa_sonando.className += " mm_mostrar-controles";
                }
                if(_capa_sonando_2){
                    if(_capa_sonando_2.className.indexOf(" mm_mostrar-controles")<1)
                        _capa_sonando_2.className += " mm_mostrar-controles";
                }
            }

            last_current_time = data.currentTime;

            if(tiempo_parar>-1){
                if(data.currentTime>tiempo_parar){
                    _that.notifyOrderPause();
                    _that.notifyOrderSeekBySecs(last_cortar_start_time);
                }
            }

            if(_data.internalData.position==emic.top.TopPlayer.POSITION_AD_PREROLL){
                var publisecs = data.totalTime - Math.floor(data.currentTime)|0;

                if(_capa_publicidad_segundos)_capa_publicidad_segundos.innerHTML = "en " + publisecs + " segundos";
                if(_capa_publicidad_segundos_2)_capa_publicidad_segundos_2.innerHTML = "en " + publisecs + " segundos";
                if(_capa_publicidad){
                    _capa_publicidad.className = _capa_publicidad.className.replace(/ visible/g,"");
                    _capa_publicidad.className += " visible";
                }
                if(_capa_publicidad_2){
                    _capa_publicidad_2.className = _capa_publicidad_2.className.replace(/ visible/g,"");
                    _capa_publicidad_2.className += " visible";
                }

                return;
            }else{
                if(_capa_publicidad){
                    _capa_publicidad.className = _capa_publicidad.className.replace(/ visible/g,"");
                }
                if(_capa_publicidad_2){
                    _capa_publicidad_2.className = _capa_publicidad_2.className.replace(/ visible/g,"");
                }

            }
            //siempre que el player sea móvil y sin transcripción mostramos los controles
            if((getDevice().mobile)&&(!_hay_trans))
            {
                if(_capa_sonando){
                    _capa_sonando.className = _capa_sonando.className.replace(/ mm_mostrar-controles/g,"");
                    _capa_sonando.className += " mm_mostrar-controles";
                }
                if(_capa_sonando_2){
                    _capa_sonando_2.className = _capa_sonando.className.replace(/ mm_mostrar-controles/g,"");
                    _capa_sonando_2.className += " mm_mostrar-controles";
                }
            }


            if(Math.ceil(data.totalTime)>=3600)
                _durationFormat = "h:mm:ss";
            else
                _durationFormat = "mm:ss";

			var percent = (data.currentTime *100/data.totalTime);

            if(_track_span)_track_span.style.width = percent + "%";
            if(_track_span_2)_track_span_2.style.width = percent + "%";
			if(_current_time)_current_time.innerHTML = this.secondsAsTimeCode(data.currentTime,_durationFormat);
            if(_current_time_2)_current_time_2.innerHTML = this.secondsAsTimeCode(data.currentTime,_durationFormat);
            if(_current_time_3)_current_time_3.innerHTML = this.secondsAsTimeCode(data.currentTime,_durationFormat);
            if(_current_time_4)_current_time_4.innerHTML = this.secondsAsTimeCode(data.currentTime,_durationFormat);
            if(_current_time_5)_current_time_5.innerHTML = this.secondsAsTimeCode(data.currentTime,_durationFormat);

            _currentTime = data.currentTime;
            _totalTime = data.totalTime;

            if(!isNaN(data.totalTime)){
                if(_total_time)_total_time.innerHTML = this.secondsAsTimeCode(data.totalTime,_durationFormat);
                if(_total_time_2)_total_time_2.innerHTML = this.secondsAsTimeCode(data.totalTime,_durationFormat);
                if(_total_time_3)_total_time_3.innerHTML = this.secondsAsTimeCode(data.totalTime,_durationFormat);
                if(_total_time_4)_total_time_4.innerHTML = this.secondsAsTimeCode(data.totalTime,_durationFormat);
                if(_total_time_5)_total_time_5.innerHTML = this.secondsAsTimeCode(data.totalTime,_durationFormat);
            }

            //if(_mm_volumen_slider_2){
            if(_mm_seek_slider){
                if(!window._dragging_progress)
                    if(jQuery.ui){
                        jQuery("#"  + _ID + "_mm_seek_slider").slider("value",percent);
                        jQuery("#"  + _ID + "_mm_seek_slider_3").slider("value",percent);
                    }
            }

            //este es el de la capa cortar!!!
            if(_mm_seek_slider_2){
                if(!_soy_permanente){
                    emic.top.debug("dragging_progress PROGRESS", window._dragging_progress + " - " + _ID);
                }

                if(!window._dragging_progress){
                    if((_capa_sonando)&&(!_soy_permanente))
                        if((!(_capa_sonando.className.indexOf("capa_sonando-cortar")>0))&&(jQuery.ui)){
                            jQuery("#"  + _ID + "_mm_seek_slider_2").slider("value",percent);
                            if(_corte_2){
                                _corte_2.style.left = (parseInt(jQuery("#"  + _ID + "_mm_seek_slider_2").css("width"))*jQuery("#"  + _ID + "_mm_seek_slider_2").slider("value")/100) + "px";
                                _corte_2.style.width = 3000/(_data.mediaData.duration/1000) + "%";
                                _corte_2.style.height = "100%";
                                if(_corte_2.offsetWidth+_corte_2.offsetLeft>parseInt(jQuery("#"  + _ID + "_mm_seek_slider_2").css("width"))){
                                    _corte_2.style.width = (parseInt(jQuery("#"  + _ID + "_mm_seek_slider_2").css("width")) - _corte_2.offsetLeft) + "px";
                                }
                            }
                        }
                    if(_capa_sonando_2)
                        if((!(_capa_sonando_2.className.indexOf("capa_sonando-cortar")>0)&&(jQuery.ui))){
                            jQuery("#"  + _ID + "_mm_seek_slider_2").slider("value",percent);
                            if(_corte_2){
                                _corte_2.style.left = (parseInt(jQuery("#"  + _ID + "_mm_seek_slider_2").css("width"))*jQuery("#"  + _ID + "_mm_seek_slider_2").slider("value")/100) + "px";
                                _corte_2.style.width = 3000/(_data.mediaData.duration/1000) + "%";
                                _corte_2.style.height = "100%";
                                if(_corte_2.offsetWidth+_corte_2.offsetLeft>parseInt(jQuery("#"  + _ID + "_mm_seek_slider_2").css("width"))){
                                    _corte_2.style.width = (parseInt(jQuery("#"  + _ID + "_mm_seek_slider_2").css("width")) - _corte_2.offsetLeft) + "px";
                                }
                            }
                        }
                }
            }

            if(_mm_volumen_slider_2){
                if(!window._dragging_progress)
                    if(jQuery.ui)
                        jQuery("#"  + _ID + "_mm_volumen_slider_2").slider("value",percent);
            }

            if(_hay_trans){
                if(_that.tr!=null)
                    if(_data.internalData.position!=emic.top.TopPlayer.POSITION_AD_PREROLL)
    			        _that.tr.getIndex(data.currentTime*1000);
            }

            jQuery("#" + _ID + "_progress").css("width",percent + "%");
            jQuery("#" + _ID + "_progress_arrow").css("width",percent + "%");
		};

		this.onVolumeChange = function(offset){
			var percent = offset*100;

			if(percent!=0){
				_last_volume = offset;
                if(typeof($)!="undefined")
                    jQuery("#"  + _ID + "_mm_control_sonido").addClass('mm_control_sonido').removeClass('mm_control_mute');
            }else{
                if(typeof($)!="undefined")
                    jQuery("#"  + _ID + "_mm_control_sonido").addClass('mm_control_mute').removeClass('mm_control_sonido');
            }

            if(typeof($)!="undefined")
                if(jQuery.ui)
			        jQuery("#"  + _ID + "_mm_volumen_slider").slider("value",percent);
            //jQuery("#"  + _ID + "_mm_seek_slider").slider("value",percent);
		};

		this.onBufferEmpty = function(){
		};

		this.onBufferFull = function(){
		};

		this.showLoading = function (flag) {
			_showLoading.apply(this, [flag]);
		};

		var _showLoading = function(flag){
			var inValid = (psd.framework.ua.msie!=null)&&(psd.framework.ua.msie)&&(parseInt(psd.framework.ua.version)<10);
			if(!inValid)
				if (flag) {
                    //mm_icono_cargando
                    if(_btn_play)
                        _btn_play.className += " mm_icono_cargando";

                    if(_btn_play_2){
                        _btn_play_2.className += " mm_icono_cargando";
                    }

                    if(_btn_play_3){
                        _btn_play_3.className += " mm_icono_cargando";
                    }
                } else {
                    if(_btn_play)
                        _btn_play.className = _btn_play.className.replace(/ mm_icono_cargando/g,"");

                    if(_btn_play_2){
                        _btn_play_2.className = _btn_play_2.className.replace(/ mm_icono_cargando/g,"");
                    }

                    if(_btn_play_3){
                        _btn_play_3.className = _btn_play_3.className.replace(/ mm_icono_cargando/g,"");
                    }
                }
			};

		this.externalOrder = function(order, params){
            //console.log("EXTERNAL ORDER",order,params);
            //console.log(_ID);

            switch(order){
                case namespace.hertz_events.EXTERNAL_ORDER_TOKEN:

                    if(params["token_fb"]!=null){
                        _that._check_facebook.className = "marcado";
                        _token_fb = params["token_fb"];
                    }
                    if(params["token_tw"]!=null){
                        _that._check_twitter.className = "marcado";
                        _token_tw = params["token_tw"];
                    }

                    //if(_capa_compartir_mensaje) _capa_compartir_mensaje.className += " visible";
                    //if(_capa_sonando)_capa_sonando.className = _capa_sonando.className.replace(/ mm_mostrar-controles/g,"");
                    //if(_capa_sonando_2)_capa_sonando_2.className = _capa_sonando_2.className.replace(/ mm_mostrar-controles/g,"");

                    break;
                case namespace.hertz_events.EXTERNAL_ORDER_SHOWSHARE:
                    if((_hay_trans)&&(_videoPregenerado)&&(_servicioActivo)){
                        if(_capa_compartir_opciones)_capa_compartir_opciones.className += " visible";
                        if(_capa_compartir_opciones_2)_capa_compartir_opciones_2.className += " visible";
                    }
                    else{
                        if(_capa_conectar_redes_volver)_capa_conectar_redes_volver.style.display = "none";
                        if(_capa_conectar_redes)_capa_conectar_redes.className += " visible";
                        if(_capa_compartir_opciones)_capa_compartir_opciones.className = _capa_compartir_opciones.className.replace(/ visible/g,"");
                        if(_capa_compartir_opciones_2)_capa_compartir_opciones_2.className = _capa_compartir_opciones_2.className.replace(/ visible/g,"");
                    }
                    break;
                case namespace.hertz_events.EXTERNAL_ORDER_VIA:
                    _twitter_via_external = params;
                    break;
                case namespace.hertz_events.EXTERNAL_ORDER_ALTERNATIVO:
                    _soy_alternativo = params;
                    break;
                case namespace.hertz_events.EXTERNAL_ORDER_HIDE_TRANSCRIPTION:
                    _that.hideTranscription();
                    break;
                default:

                    break;
            }
		};

		var _enableButtons = function(value){
		};

        var _show_playing = function(){
            if(_hay_trans){
                if(_capa_sonando){
                    var _mostrar_controles = " ";
                    var _mostrar_cortar = " ";

                    if(_capa_sonando.className.indexOf("mostrar-controles")>0)
                        _mostrar_controles = "mm_mostrar-controles";

                    if(_capa_sonando.className.indexOf("capa_sonando-cortar")>0)
                        _mostrar_cortar = " mm_capa_sonando-cortar";

                    _capa_sonando.className = "mm_capa_sonando visible mm_capa_transcripcion " + _mostrar_controles + _mostrar_cortar;
                }
                if(_capa_sonando_2){
                    var _mostrar_controles = " ";
                    var _mostrar_cortar = " ";

                    if(_capa_sonando_2.className.indexOf("mostrar-controles")>0)
                        _mostrar_controles = "mm_mostrar-controles";

                    if(_capa_sonando_2.className.indexOf("capa_sonando-cortar")>0)
                        _mostrar_cortar = " mm_capa_sonando-cortar";

                    _capa_sonando_2.className = "mm_capa_sonando visible mm_capa_transcripcion " + _mostrar_controles + _mostrar_cortar;
                }
            }
            else{
                if(_capa_sonando){
                    var _mostrar_controles = " ";
                    var _mostrar_cortar = " ";

                    if(_capa_sonando.className.indexOf("mostrar-controles")>0)
                        _mostrar_controles = " mm_mostrar-controles";

                    if(_capa_sonando.className.indexOf("capa_sonando-cortar")>0)
                        _mostrar_cortar = " mm_capa_sonando-cortar";

                    _capa_sonando.className = "mm_capa_sonando visible " + _mostrar_controles + _mostrar_cortar;
                }
                if(_capa_sonando_2){
                    var _mostrar_controles = " ";
                    var _mostrar_cortar = " ";

                    if(_capa_sonando_2.className.indexOf("mostrar-controles")>0)
                        _mostrar_controles = " mm_mostrar-controles";

                    if(_capa_sonando_2.className.indexOf("capa_sonando-cortar")>0)
                        _mostrar_cortar = " mm_capa_sonando-cortar";

                    _capa_sonando_2.className = "mm_capa_sonando visible " + _mostrar_controles + _mostrar_cortar;
                }
            }
            _capa_activa = _capa_sonando;

            if(_capa_pausado)_capa_pausado.className = _capa_pausado.className.replace(/ visible/g,"");

            switch(window.playerView_current_status){
                case emic.top.MediaModule.STATUS_STOP:
                case emic.top.MediaModule.STATUS_PAUSE:
                case emic.top.AdModule.STATUS_PAUSE:
                    if((_soy_permanente)||(_skin_type==_SKIN_TYPE_PEQUENO)){
                        if(_btn_play)_btn_play.className = "mm_boton_play";
                        if(_btn_play_2)_btn_play_2.className = "mm_boton_play";
                        if(_btn_play_3)_btn_play_3.className = "mm_boton_play";
                        if(_btn_play_4)_btn_play_4.className = "mm_control_play";
                    }
                    else{
                        if(_btn_play)_btn_play.className = "mm_control_play mm_boton_play";
                        if(_btn_play_2)_btn_play_2.className = "mm_control_play mm_boton_play";
                        if(_btn_play_3)_btn_play_3.className = "mm_control_play mm_boton_play";
                        if(_btn_play_4)_btn_play_4.className = "mm_control_play";
                    }
                    _isplaying = false;
                    break;
                case emic.top.MediaModule.STATUS_PLAY:
                    if((_soy_permanente)||(_skin_type==_SKIN_TYPE_PEQUENO)){
                        if(_btn_play)_btn_play.className = "mm_boton_pausa";
                        if(_btn_play_2)_btn_play_2.className = "mm_boton_pausa";
                        if(_btn_play_3)_btn_play_3.className = "mm_boton_pausa";
                        if(_btn_play_4)_btn_play_4.className = "mm_control_pausa";
                    }
                    else{
                        if(_btn_play)_btn_play.className = "mm_control_pausa mm_boton_pausa";
                        if(_btn_play_2)_btn_play_2.className = "mm_control_pausa mm_boton_pausa";
                        if(_btn_play_3)_btn_play_3.className = "mm_control_pausa mm_boton_pausa";
                        if(_btn_play_4)_btn_play_4.className = "mm_control_pausa";
                    }
                    _isplaying = true;
                    break;
            }
        }

		this.onStatusChange = function(status){

            if(!this.soyPlayerView){
                //console.log("cambio estado");
                window.playerView_current_status = status;
            }

            _that.checkTituloDoble();

            switch (status){
                case emic.top.MediaModule.STATUS_STOP:
                case emic.top.MediaModule.STATUS_PAUSE:
                case emic.top.AdModule.STATUS_PAUSE:
                     _isplaying = false;
                    if((_soy_permanente)||(_skin_type==_SKIN_TYPE_PEQUENO)){
                        if(_btn_play)_btn_play.className = "mm_boton_play";
                    }
                    else{
                        if(_btn_play)_btn_play.className = "mm_control_play mm_boton_play";
                    }

                    if(_btn_play_2)_btn_play_2.className = "mm_boton_play";
                    if(_btn_play_3)_btn_play_3.className = "mm_boton_play";
                    if(_btn_play_4)_btn_play_4.className = "mm_control_play";
                    if(_sonido_barras_2)_sonido_barras_2.className += " mm_sonido_barras-inmoviles";
                break;
                case emic.top.MediaModule.STATUS_PLAY:
                    _isplaying = true;
                    _show_playing();

                    if(_escucha_continua)_escucha_continua.className = _escucha_continua.className.replace(/ visible/,"");
                    if(_escucha_continua_2)_escucha_continua_2.className = _escucha_continua_2.className.replace(/ visible/,"");
                    if(_capa_activa){_capa_activa.className = _capa_activa.className.replace(/ visible/,"");_capa_activa.className += " visible";}

                    clearInterval(_interval_siguiente);

                    if((_soy_permanente)||(_skin_type==_SKIN_TYPE_PEQUENO)){
                        if(_btn_play)_btn_play.className = "mm_boton_pausa";
                    }
                    else
                        if(_btn_play)_btn_play.className = "mm_control_pausa mm_boton_pausa";

                    if(_btn_play_2)_btn_play_2.className = "mm_boton_pausa";
                    if(_btn_play_3)_btn_play_3.className = "mm_boton_pausa";
                    if(_btn_play_4)_btn_play_4.className = "mm_control_pausa";
                    if(_sonido_barras_2)_sonido_barras_2.className = _sonido_barras_2.className.replace(/ mm_sonido_barras-inmoviles/g,"");
                    break;
                case emic.top.AdModule.STATUS_PLAY:
                    if(_escucha_continua)_escucha_continua.className = _escucha_continua.className.replace(/ visible/,"");
                    if(_escucha_continua_2)_escucha_continua_2.className = _escucha_continua_2.className.replace(/ visible/,"");
                    if(_capa_activa){_capa_activa.className = _capa_activa.className.replace(/ visible/,"");_capa_activa.className += " visible";}

                    clearInterval(_interval_siguiente);
                    clearInterval(_interval_publi);

                    _interval_publi_secs = _data.adData.duration;

                    if(_capa_publicidad_segundos)_capa_publicidad_segundos.innerHTML = "en " + _interval_publi_secs + " segundos";
                    if(_capa_publicidad_segundos_2)_capa_publicidad_segundos_2.innerHTML = "en " + _interval_publi_secs + " segundos";

                    /*_interval_publi = setInterval(function(){
                        _interval_publi_secs--;

                        if(_capa_publicidad_segundos)_capa_publicidad_segundos.innerHTML = "en " + _interval_publi_secs + " segundos";
                        if(_capa_publicidad_segundos_2)_capa_publicidad_segundos_2.innerHTML = "en " + _interval_publi_secs + " segundos";

                        if(_interval_publi_secs<=_data.adData.skippableTime){
                            //if(_capa_publicidad_saltar)_capa_publicidad_saltar.style.display = "block";
                            //if(_capa_publicidad_saltar_2)_capa_publicidad_saltar_2.style.display = "block";
                        }else{
                            //if(_capa_publicidad_saltar)_capa_publicidad_saltar.style.display = "none";
                            //if(_capa_publicidad_saltar_2)_capa_publicidad_saltar_2.style.display = "none";
                        }
                    },1000);*/

                    if(_capa_pausado)_capa_pausado.className = _capa_pausado.className.replace(/ visible/g,"");
                    if(_capa_sonando)_capa_sonando.className = _capa_sonando.className.replace(/ visible/g,"");
                    if(_capa_sonando_2)_capa_sonando_2.className = _capa_sonando_2.className.replace(/ visible/g,"");

                    /*if(_capa_publicidad){
                        _capa_publicidad.className += " visible";
                    }
                    if(_capa_publicidad_2){
                        _capa_publicidad_2.className += " visible";
                    }*/
                break;
                case emic.top.event.MediaEvent.ON_MEDIA_END:
                    _interval_siguiente_secs = _interval_siguiente_secs_init;
                    //_isplaying = false;

                    if((!_that.soyPlayerView)&&(!_soy_embed)){
                        //if(typeof(window._advert)=="undefined")
                            _that.showEscuchaContinua();
                    }

                    /*
                    var _launcher = _that.getPlayer().getLauncher();
                    //mm_autoplay = true;
                    //_that.notifyOrderExternal("dmena",{"id":_data.mediaData.idTOP});
                    //mm_autoplay = false;
                    if(this.soyPlayerView){
                        //console.log("soy playerview");
                    }
                    else{
                        _launcher.reset(undefined,_data.genericData.id_cuenta,_siguiente_idref,{"player":{"autoplay":true}});
                        _that.notifyOrderExternal(namespace.hertz_events.RESET_PLAYERVIEW,{"id":_siguiente_idref});
                    }
                    */
                    break;
                case emic.top.AdModule.STATUS_STOP:
                case emic.top.AdModule.PUBLI_SKIPPED:
                    if(_capa_sonando)_capa_sonando.className += " visible";
                    if(_capa_sonando_2)_capa_sonando_2.className += " visible";
                    if(_capa_publicidad)_capa_publicidad.className = _capa_publicidad.className.replace(/ visible/g,"");
                    if(_capa_publicidad_2)_capa_publicidad_2.className = _capa_publicidad_2.className.replace(/ visible/g,"");
                break;
            }
        };

        this.showEscuchaContinua = function(){
            if((typeof(_that.playlist)!="undefined")&&(_that.playlist.length<1)){
                return;
            }

            if(!_that.soyPlayerView){
                if(_escucha_continua)_escucha_continua.className += " visible";
                if(_escucha_continua_2)_escucha_continua_2.className += " visible";
            }
            if(_capa_activa)_capa_activa.className = _capa_activa.className.replace(/ visible/,"");

            if(_e_c_tiempo)_e_c_tiempo.innerHTML = _interval_siguiente_secs;
            if(_e_c_tiempo_2)_e_c_tiempo_2.innerHTML = _interval_siguiente_secs;

            if(!_that.soyPlayerView){
                _interval_siguiente = setInterval(function(){
                    _interval_siguiente_secs--;
                    if(_e_c_tiempo)_e_c_tiempo.innerHTML = _interval_siguiente_secs;
                    if(_e_c_tiempo_2)_e_c_tiempo_2.innerHTML = _interval_siguiente_secs;

                    if(_interval_siguiente_secs<1){
                        clearInterval(_interval_siguiente);
                        if(_escucha_continua)_escucha_continua.className = _escucha_continua.className.replace(/ visible/,"");
                        if(_escucha_continua_2)_escucha_continua_2.className = _escucha_continua_2.className.replace(/ visible/,"");

                        _that.playlist.splice(0,1);
                        var _launcher = _that.getPlayer().getLauncher();
                        //mm_autoplay = true;
                        //_that.notifyOrderExternal("dmena",{"id":_data.mediaData.idTOP});
                        //mm_autoplay = false;
                        //RESET ESCUCHACONTINUA
                        _launcher.reset(undefined,_data.genericData.id_cuenta,_siguiente_idref,{"player":{"autoplay":true}});
                        _that.notifyOrderExternal(namespace.hertz_events.RESET_PLAYERVIEW,{"id":_siguiente_idref,"alternativo":false});
                        if(_escucha_continua)_escucha_continua.className = _escucha_continua.className.replace(/ visible/,"");
                        if(_escucha_continua_2)_escucha_continua_2.className = _escucha_continua_2.className.replace(/ visible/,"");
                    }
                },1000);
            }

            if(_e_c_escuchar){
                _e_c_escuchar.onclick = function(){
                    _that.playlist.splice(0,1);

                    var _launcher = _that.getPlayer().getLauncher();
                    //mm_autoplay = true;
                    //_that.notifyOrderExternal("dmena",{"id":_data.mediaData.idTOP});
                    //mm_autoplay = false;
                    clearInterval(_interval_siguiente);
                    _launcher.reset(undefined,_data.genericData.id_cuenta,_siguiente_idref,{"player":{"autoplay":true}});
                    _that.notifyOrderExternal(namespace.hertz_events.RESET_PLAYERVIEW,{"id":_siguiente_idref,"alternativo":false});
                    if(_escucha_continua)_escucha_continua.className = _escucha_continua.className.replace(/ visible/,"");
                    if(_escucha_continua_2)_escucha_continua_2.className = _escucha_continua_2.className.replace(/ visible/,"");

                    return false;
                }
            }
            if(_e_c_escuchar_2){
                _e_c_escuchar_2.onclick = function(){
                    _that.playlist.splice(0,1);

                    var _launcher = _that.getPlayer().getLauncher();
                    //mm_autoplay = true;
                    //_that.notifyOrderExternal("dmena",{"id":_data.mediaData.idTOP});
                    //mm_autoplay = false;
                    clearInterval(_interval_siguiente);
                    _launcher.reset(undefined,_data.genericData.id_cuenta,_siguiente_idref,{"player":{"autoplay":true}});
                    _that.notifyOrderExternal(namespace.hertz_events.RESET_PLAYERVIEW,{"id":_siguiente_idref,"alternativo":false});
                    if(_escucha_continua)_escucha_continua.className = _escucha_continua.className.replace(/ visible/,"");
                    if(_escucha_continua_2)_escucha_continua_2.className = _escucha_continua_2.className.replace(/ visible/,"");

                    return false;
                }
            }
            if(_e_c_detener){_e_c_detener.onclick = function(){
                clearInterval(_interval_siguiente);
                if(_escucha_continua)_escucha_continua.className = _escucha_continua.className.replace(/ visible/,"");
                if(_escucha_continua_2)_escucha_continua_2.className = _escucha_continua_2.className.replace(/ visible/,"");
                if(_capa_activa){_capa_activa.className = _capa_activa.className.replace(/ visible/,"");_capa_activa.className += " visible";}
                return false;
            }};
            if(_e_c_detener_2){_e_c_detener_2.onclick = function(){
                clearInterval(_interval_siguiente);
                if(_escucha_continua)_escucha_continua.className = _escucha_continua.className.replace(/ visible/,"");
                if(_escucha_continua_2)_escucha_continua_2.className = _escucha_continua_2.className.replace(/ visible/,"");
                if(_capa_activa){_capa_activa.className = _capa_activa.className.replace(/ visible/,"");_capa_activa.className += " visible";}
                return false;
            }};
        }

        this.onPositionChange = function(position) {

				switch(position) {
                    case emic.top.TopPlayer.POSITION_PREVIEW:
                        if(_first_preview)
                            _first_preview = false;
                        else{
                            //console.log("ADIOSSSSSSSSSSSSSSSSSSSSS")
                        }

                        /*if(_hay_postroll){
                            _that.showEscuchaContinua();
                            _hay_postroll = false;
                        }*/
					break;
					case emic.top.TopPlayer.POSITION_AD_PREROLL:
					break;
                    case emic.top.TopPlayer.POSITION_AD_POSTROLL:
                        _hay_postroll = true;
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

            this.hideTranscription = function(){
                if(_capa_sonando)_capa_sonando.className = _capa_sonando.className.replace(/mm_capa_transcripcion/g,"");
                if(_capa_sonando_2)_capa_sonando_2.className = _capa_sonando_2.className.replace(/mm_capa_transcripcion/g,"");
            };
		}
		namespace.TopSkin_hertz = TopSkin_hertz;

})(emic.top.ui);