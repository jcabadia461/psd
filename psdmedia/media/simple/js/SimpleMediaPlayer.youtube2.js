(function(window) 
{
    // Generacion del namespace psd.media
    if(window.psd==undefined) { window.psd = {}; }
    if(window.psd.media==undefined) { window.psd.media = {}; }
    if(window.psd.media.skins==undefined) { window.psd.media.skins = {}; }
    if(window.psd.media.skins.generic==undefined) { window.psd.media.skins.generic = {}; }
    if(window.psd.media.wrappers==undefined) { window.psd.media.wrappers = {}; }
})(window);


(function(window) 
{
    // Generacion del namespace psd.framework
    if(window.psd==undefined) { window.psd = {}; }
    if(window.psd.framework==undefined) { window.psd.framework = {}; }
    if(window.psd.framework.events==undefined) { window.psd.framework.events = {}; }
    if(window.psd.framework.parser==undefined) { window.psd.framework.parser = {}; }
    if(window.psd.framework.utils==undefined) { window.psd.framework.utils = {}; }
    
    window.psd.framework.debug = false;
    
    if(window.location.href.indexOf("debug")!=-1) { window.psd.framework.debug = true; }
    
})(window);


(function(namespace) {
    // Inheritance class
    //TopEmbed.prototype = new psd.framework.EventDispatcher();

    function TopEmbed(iniSettings)
    {
        // Super
        //psd.framework.EventDispatcher.call(this);

        /**
         * className psd.media.TopEmbed
         */
        this.className = "psd.media.TopEmbed";

        URL_BASE_DEV = "http://webfastapi.top.des.prisadigital.int"; //url_desarrollo
        URL_BASE_PRO = "http://fapi-top.prisasd.com"; //url producción
        URL_BASE_SSL = "https://topsslpl-a.akamaihd.net";

        MEDIA_TYPE_VIDEO = "video";
        MIN_PLAYER_WIDTH = 320; //Es el mínimo ancho de reproducción de la publicidad.
        ERROR_PARSER = "Error Code #1";

        ERROR_SERVICIO_PLAYER = "Error_servicio_player";
        ERROR_SERVICIO_MEDIA = "Error_servicio_media";

        var _iniSettings = iniSettings;

        var _dev = false;

        var  _windowError, _url_base_api, _mediaLauncherTop, _mediaPlayer, _data, _reset, _dataFapi1;
        var _isInitialized = false;

        var YTparam;
        var YTlayer;
        this._player = '';
        this.done  = false;
        this.idVideo = '';
        this.duration = '';
        this.statisticsManager = '';
        this.NoStatistics = false;


		this.dataStats = {
		    adEnabled : "False" ,
		    adErrorAdBlock : "sin_ADBLOCK" ,
		    agency : "propio" ,
		    canal : " " ,
		    chapter : "" ,
		    duration : 217000 ,
		    emisora : "" ,
		    idTop : "20161216172742" ,
		    mediaType : "vod" ,
		    mediaTypeMode : "video" ,
		    name : "EL COMIDISTA | ¿Cuál es el mejor cava de supermercado?" ,
		    nombrePrograma : "" ,
		    organic : "organico" ,
		    playerName : "[Video] Elpais con Publi y autoplay custom" ,
		    programa : "" ,
		    progressTime : 39 ,
		    provider : "youtube" ,
		    season : "" ,
		    seccion : "" ,
		    tags : "el_comidista" ,
		    tagsList : "el_comidista" ,
		    tematica : "" ,
		    tematicaParent : "el_comidista" ,
		    tipoContenido : "Programa" ,
		    topPageTitle : "http%3A%2F%2Felcomidista.elpais.com%2Felcomidista%2F2016%2F12%2F13%2Farticulo%2F1481656649_409296.html" ,
		    trafficsource : ""
		}

        var _init = function()
        {
            if (_iniSettings != undefined)
            {

                if (_iniSettings.dev != undefined){_dev = _iniSettings.dev;}
                else {_dev = false;}

                //setWindowError();

                if (_iniSettings.secure){_url_base_api = URL_BASE_SSL;}
                else
                {
                    getUrlBase.apply(this);
                }

                loadMediator.apply(this);
            }
        }

        this.getSettings = function(){
            return _iniSettings;
        }

        var getUrlBase = function()
        {
            if (_dev){_url_base_api = URL_BASE_DEV;}
            else {_url_base_api = URL_BASE_PRO;}
        }

        var loadMediator = function() {
//TODOjc   cargamos fapi1
        var fapi1 = _url_base_api +"/api/" + _iniSettings.id_cuenta + "/player/" + _iniSettings.id_player;
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', fapi1, true); // Replace 'my_data' with the path to your file
        var _this = this;
        xobj.onreadystatechange = function () {
              if (xobj.readyState == 4 && xobj.status == "200") {
                // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
                dataFapi1 = JSON.parse(xobj.responseText);
                _this.onDataComplete(dataFapi1);
              }
        };
        xobj.send(null);
        }

        //se ha terminado de cargar la fapi1
        this.onDataComplete = function (evt) {
           loadData.apply(this, [evt])
        };



this.libFramework = function(){
    var tag = document.createElement('script');
    _this = this;
    tag.onload = function(){_this.libStatistics();};
    tag.src = _dataFapi1.base + "/psdmedia/resources/js/psd/lib/statistics.lib.js";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

}

//despues de cargar statistics
this.libStatistics = function(){
            _data = _dataFapi1;
            data = _dataFapi1;
            //NOTA: Ponemos el player sin autoplay para safari por problema al conectar con la señal cuando hay autoplay
            if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent))
            {
                if (data.ws.mediaType == MEDIA_TYPE_VIDEO) {
                    _data.player.autoplay = false;
                }
            }

            data.ws.id_video = _iniSettings.id_media;
            data.player.container = _iniSettings.id_container;

            // si existe el objeto topPlayer
            if (typeof(_iniSettings.topPlayer) != "undefined") {

                if (typeof(_iniSettings.topPlayer.media) != "undefined") {
                    if (_iniSettings.topPlayer.media.autoNext != undefined) {
                        _data.player.autoNext = _iniSettings.topPlayer.media.autoNext;
                    }
                    if (_iniSettings.topPlayer.media.clickPlayList != undefined) {
                        _data.player.clickPlayList = _iniSettings.topPlayer.media.clickPlayList;
                    }
                    if (_iniSettings.topPlayer.media.autoplay != undefined) {
                        if(_iniSettings.topPlayer.media.autoplay == true || _iniSettings.topPlayer.media.autoplay == false){
                            _data.player.autoplay = _iniSettings.topPlayer.media.autoplay;
                        }
                    }

                }
            }



            if(_iniSettings.topPlayer){data.topPlayer = _iniSettings.topPlayer;}



            //-- Seteamos en topPlayer para evitar el PostRoll
            if (_iniSettings.isPlaylist) {

                if (typeof (_iniSettings.topPlayer) != "undefined") {
                    if (typeof (_iniSettings.topPlayer.media) != "undefined") {

                        _iniSettings.topPlayer.media.isPlaylist = _iniSettings.isPlaylist;
                    }else{

                        _iniSettings.topPlayer.media = {};
                        _iniSettings.topPlayer.media.isPlaylist = _iniSettings.isPlaylist;
                    }

                } else {

                    _iniSettings.topPlayer = {};
                    if (typeof (_iniSettings.topPlayer.media) != "undefined") {

                        _iniSettings.topPlayer.media.isPlaylist = _iniSettings.isPlaylist;
                    } else {

                        _iniSettings.topPlayer.media = {};
                        _iniSettings.topPlayer.media.isPlaylist = _iniSettings.isPlaylist;
                    }


                }


                data.topPlayer = _iniSettings.topPlayer;
            }

            /*Guardamos los datos de Ancho y Alto en caso de que lleguen de PAIS*/

            if(typeof (_iniSettings.ancho)!="undefined"||typeof (_iniSettings.alto)!="undefined") {

                if (typeof (data.topPlayer) == "undefined") {

                    data.topPlayer = {};

                }

                if (typeof (data.topPlayer.media) == "undefined") {

                    data.topPlayer.media = {};
                    data.topPlayer.media.ancho = _iniSettings.ancho;
                    data.topPlayer.media.alto = _iniSettings.alto;

                } else {

                    data.topPlayer.media.ancho = _iniSettings.ancho;
                    data.topPlayer.media.alto = _iniSettings.alto;

                }

            }


            if(_iniSettings.mainPlayer){data.mainPlayer = _iniSettings.mainPlayer;}

            //Si nos llega valor lo sustituimos por lo que nos llegue en el servicio de datos, ya que será el valor del tamaño del iframe.
            if (_iniSettings.overwriteWidth){data.player.width = _iniSettings.overwriteWidth;}
            if (_iniSettings.overwriteHeight){data.player.height = _iniSettings.overwriteHeight; }

            if(_iniSettings.media_type != undefined){data.ws.mediaType = _iniSettings.media_type}
            else{ data.ws.mediaType = MEDIA_TYPE_VIDEO}

            if (_reset)
            {
                _reset = false;

                var url = _url_base_api+"/api";
                _mediaLauncherTop.addSetting(data);
                _mediaLauncherTop.reset(url, _iniSettings.id_cuenta,_iniSettings.id_media);
            }
            else {

//TODOjc   cargamos fapi2

                var fapi2 = data.ws.urlBase+"/v1/search/"+data.ws.id_cuenta+"/"+data.ws.mediaType+"/idref/"+data.ws.id_video
                var xobj = new XMLHttpRequest();
                    xobj.overrideMimeType("application/json");
                xobj.open('GET', fapi2, true); // Replace 'my_data' with the path to your file
                var _this = this;
                xobj.onreadystatechange = function () {
                      if (xobj.readyState == 4 && xobj.status == "200") {
                        // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
                        dataFapi2 = JSON.parse(xobj.responseText);
                        _this.TopLauncher(dataFapi2);
                      }
                };
                xobj.send(null);
            }
}


        // cargamos framework.js, statistics y luego fapi2
        var loadData = function (data)
        {
            _dataFapi1 = data;
            //CARGAMOS CSS
            var filename = data.base + "/psdmedia/resources/js/psd/css/commonmm.css";
            var fileref=document.createElement("link");

            fileref.setAttribute("rel", "stylesheet");
            fileref.setAttribute("type", "text/css");
            fileref.setAttribute("href", filename);
            if (typeof fileref!="undefined")
                document.getElementsByTagName("head")[0].appendChild(fileref)


            //TODOjc5 filtramos por id la forma de usar estadisticas.
			this.NoStatistics = false;
            var settings = this.getSettings();
            //TODOjc100
            if(settings.id_media == '20170127122021' || settings.id_media == '20170120122221'){ //tostadas y tuper
            	mm_allInWin = true;
            } else {
            	mm_allInWin = false;
            }
            //CARGAMOS STATISTICS
            var tag = document.createElement('script');
            _this = this;
            tag.onload = function(){_this.libFramework();};
            tag.src = data.base + "/psdmedia/resources/js/psd/framework.min.js";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


        //TODOjc3 2017-01-23 ponemos todos a nivel de windows y con todas las estadisticas.
//      var settings = this.getSettings();
//      mm_allInWin = true;
//      this.NoStatistics = false;
//      //CARGAMOS STATISTICS
//      var tag = document.createElement('script');
//      _this = this;
//      tag.onload = function(){_this.libFramework();};
//      tag.src = data.base + "/psdmedia/resources/js/psd/framework.min.js";
//      var firstScriptTag = document.getElementsByTagName('script')[0];
//      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);




        }


	this.TopLauncher = function(data){


	    //data de estadisticas
	    this.dataStats.duration = data.data[0].length;
	    this.dataStats.idTop = data.data[0].idref;
	    this.dataStats.name = data.data[0].name;
	    //TODOjc100 no autoplay
        if(this.dataStats.idTop == "20170127122021"){ //tostadas
            mm_ytNoAutoPlay = true;
        }

	    var myTimeOut;

	    var idYoutube = data.data[0].asset[1].src;
	    this.idVideo = data.data[0].idref;
	    this.duration = data.data[0].length;

	    console.log(idYoutube);
	    
	    var settings = this.getSettings();

	    YTlayer = settings.id_container + "_base";
	    //creamos cotenedores
	    var baseContainer = document.getElementById(settings.id_container);
	    baseContainer.innerHTML = '';
	    var playerContainer = document.createElement('div');
	    playerContainer.id = YTlayer;
	    playerContainer.style.paddingTop = "56.1905%";
	    playerContainer.className = "commonmm_baseExpand";
	    baseContainer.appendChild(playerContainer);

	    baseContainer = document.getElementById(YTlayer);
	    YTlayer = "mediaModule_" + settings.id_container + "_TopPlayer";
	    playerContainer = document.createElement('div');
	    playerContainer.id = YTlayer;
	    playerContainer.className = "commonmm_sonExpand";
	    baseContainer.appendChild(playerContainer);

	    baseContainer = document.getElementById(YTlayer);
	    YTlayer = "Controller_youtube_" + settings.id_container + "_TopPlayer";
	    playerContainer = document.createElement('div');
	    playerContainer.id = YTlayer;
	    baseContainer.appendChild(playerContainer);


	    if(!mm_allInWin) {
		    YTparam = {};
		    YTparam.height = '100%';
		    YTparam.width = '100%';
		    YTparam.videoId = idYoutube;
		    YTparam.playerVars = {};
		    if(!mm_ytNoAutoPlay)
		    	YTparam.playerVars.autoplay = 1;
		    YTparam.playerVars.rel = "0";         //without related videos
		    YTparam.playerVars.modestbranding = 1; //-- sin marca de agua
		    YTparam.playerVars.color = 'white';      //--Skin blanco para el Pais
		    //this.YTparam.playerVars.theme = 'light';
		    var _this = this;
		    YTparam.playerVars.frameborder = 0;
		    YTparam.events = {};
		    //YTparam.events.onReady = function(e){_this.onPlayerReady(e)};
		    YTparam.events.onStateChange = function(e){_this.onPlayerStateChange(e)};
		    //YTparam.events.onPlaybackQualityChange = function(e){_this.onPlayerPlaybackQualityChange(e)};
		    //YTparam.events.onError = function(e){_this.onPlayerError(e)};
		} else {
			mm_YTlayer = YTlayer;
		    mm_YTparam = {};
		    mm_YTparam.height = '100%';
		    mm_YTparam.width = '100%';
		    mm_YTparam.videoId = idYoutube;
		    mm_YTparam.playerVars = {};
		    if(!mm_ytNoAutoPlay)
		    	mm_YTparam.playerVars.autoplay = 1;
		    mm_YTparam.playerVars.rel = "0";         //without related videos
		    mm_YTparam.playerVars.modestbranding = 1; //-- sin marca de agua
		    mm_YTparam.playerVars.color = 'white';      //--Skin blanco para el Pais

		    mm_objEmbed = this;
		    mm_YTparam.playerVars.frameborder = 0;
		    mm_YTparam.events = {};
		    //mm_YTparam.events.onReady = mm_onPlayerReady;
		    mm_YTparam.events.onStateChange = mm_onPlayerStateChange;
		    //YTparam.events.onPlaybackQualityChange = function(e){_this.onPlayerPlaybackQualityChange(e)};
		    //YTparam.events.onError = function(e){_this.onPlayerError(e)};
		}

        if(!this.NoStatistics){
            this.statisticsManager = new psd.statistics.StatisticsManager();
            this.statisticsManager.setup(_dataFapi1.stats.conf);
        }
        //statisticsManager.subscribe(_mediaPlayer);
		if(!mm_allInWin){
	    	this.readyYoutube();
	    }
        var tag = document.createElement('script');
	    tag.src = "https://www.youtube.com/iframe_api";
    	var firstScriptTag = document.getElementsByTagName('script')[0];
	    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	}


this.readyYoutube = function(){
    var myTimeOut;
    if (typeof(mm_ytload) == 'boolean' && mm_ytload == true) {
        clearTimeout(myTimeOut);
        this._player = new YT.Player(YTlayer, YTparam);

    } else{
        var _this = this;
        myTimeOut = setTimeout(function(){_this.readyYoutube();}, 10)
    }
}

this.XonPlayerReady = function(event){
    duration = event.target.getDuration();
    if(!mm_ytNoAutoPlay) {
        if (!getDevice().mobile) {
            event.target.playVideo();
        }
    }
}
this.onPlayerStateChange = function(event) {
    switch(event.data){
        case 0:
            if(!this.NoStatistics){
                this.statisticsManager.track('mediaComplete', this.dataStats);
            } else {
                this.SendLogtrust("event12");
            }
            this.done = false;
            break;
        case 1:
            if(this.done) {
                if(!this.NoStatistics){
                    this.statisticsManager.track('mediaResume', this.dataStats);   
                }
            } else {
                if(!this.NoStatistics){
                    this.statisticsManager.track('mediaBegin', this.dataStats);
                    this.statisticsManager.track('mediaHalf', this.dataStats);
                } else {
                    this.SendLogtrust("event10");
                    this.SendLogtrust("event11");
                }
                this.done = true;
            }
            break;
        case 2:
            if(!this.NoStatistics){
                this.statisticsManager.track('mediaPause', this.dataStats);
            }
            break;
    }
}

/* Marcado del pixel de LogTrust*/
this.SendLogtrust = function(dataEvent) {

    var TimeRandom = new Date();
    var rnd = "rnd=" + TimeRandom.getTime() + "_" + Math.floor((Math.random() * 1000) + 1);
    var nEvent = "event=" + dataEvent + "&";
    var pixel = new Image();
    var params = {
        "url": "http://tracking.logtrust.io/pixel/ffduH8fQryYdIkaE0A0YSQ.gif?",
        "event": nEvent,
        "vars": [
            "i1=propio&",
            "i3=ep&",
            "i5=" + this.dataStats.idTop + "&",
            "i2=" + this.dataStats.duration + "&",
            "v30=elpais.com&", rnd]
    };
    UrlSend = params.url + params.event + params.vars[0] + params.vars[1] + params.vars[2] + params.vars[3] + params.vars[4] + params.vars[5];
    pixel.src = UrlSend;
}



        this.init = function(data)
        {
            _iniSettings = data;

            if (data.dev != undefined){_dev = data.dev;}
            else {_dev = false;}

            _init.apply(this)
        }

        this.isInitialized = function()
        {
            return _isInitialized;
        }

        this.setRatio = function(_width,_height,_preserve){
            _mediaLauncherTop.setRatio(_width,_height,_preserve);
        }

        _init.apply(this);
    }

    namespace.TopEmbed = TopEmbed;

}(psd.media));

// ########## MEDIATOR ############## //





(function(namespace) {
    // Inheritance class
    //TopEmbedManager.prototype = new psd.framework.EventDispatcher();

    //Esta clase se encarga de generar TopEmbeds automáticamente a partir del click sobre una imagen de previsualización
    //En caso de que nos manden una imagen vacía ("") se generará el player automáticamente sin esperar al click del usuario
    //Así mismo relaciona los players para que todos tengan constancia de las reproducciones de los demás y actúen en consecuencia (por ejemplo, pausar el player reproduciéndose al hacer play sobre otro)
    function TopEmbedManager(iniSettings)
    {
        // Super
        //psd.framework.EventDispatcher.call(this);

        /**
         * className psd.media.TopEmbedManager
         */
        this.className = "psd.media.TopEmbedManager";

        //referencia al mismo objeto
        var _that = this;

        //array donde se guardan los TopEmbed que se generan dinámicamente
        var _embeds = [];
        //array donde se guardan las configuraciones de los TopEmbed que se van a generar
        var _confs = [];
        //array de src de imágenes de previsualización
        var _images = [];

        //array de src de seccion en caso de ser un dispositivo movil
        var _urls_noticia = [];

        //identificador del último player que se estaba reproduciendo al hacer play sobre otro
        var _prevPlaying = -1;
        //identificador del player sobre el que se hace click
        var _playing = -1;

        //flag que indica que cuando pulsemos sobre un player haremos pause sobre los demás
        this.pauseOthersOnPlay = false;
        //flag que indica que cuando pulsemos sobre un player haremos mute sobre los demás
        this.muteOthersOnPlay = false;
        //función implementable por el integrador para que haga la acción deseada cuando se cambia el estado de un player
        //por defecto está configurado para que haga reset sobre el player que se estaba escuchando
        this.customActionOnPlay = function(e1,e2,t){
            if(((typeof (e1.index)!= "undefined"))&&((typeof (e2.index)!= "undefined"))){
                if(e1.index!=e2.index){
                    this.reset(e1.index);
                }
            }
        };

        //función para inicializar la generación de imágenes clickables que carguen un player dinámicamente
        //Solo se debe usar esta opción si a priori ya tenemos los confs de todos los TopEmbed.
        //No usar para El País porque las configuraciones las van teniendo a medida que cargan la página
        this.init = function(conf){
            if(conf.embed_confs==undefined){
                return;
            }

            for(i in conf.embed_confs){
                this.queue(conf.embed_confs[i],conf.covers[i]);
            }

            this.generateContainers();
        }

        /*En caso de que Autoplay = true llegue desde la configuracion eliminamos la caratula y arranco el video*/
        this.setCover = function (config, image) {

            if (typeof (config.topPlayer) != "undefined") {
                if (typeof (config.topPlayer.media) != "undefined") {

                    /*guardamos el valor de la imagen para reutilizarlo en los casos #1.5 y #2.5 'Excepcion'*/
                    config.topPlayer.media.imgCover = image;

//TODOjc100
//                    if(config.id_media == "20170120122221"){ //tuper
//                    	config.topPlayer.media.autoplay = false;
//                    }
                    /*En caso de ser movil no ponemos cover aunque esté en Autoplay #5.1*/
                    if (config.topPlayer.media.autoplay && !getDevice().mobile) {

                        /*En caso de que no tengamos cover en PC seteamos autoplay=false en YouTube #1.4*/
                        config.topPlayer.media.cover = false;

                        return "";

                    } else {

                        /*En caso de que tengamos cover en PC seteamos autoplay=true en YouTube #1.3*/
                        config.topPlayer.media.cover = true;

                        return image;
                    }
                }
            }

            return image;
        };

        var PcControl = function () {

            var autoplay;

            /*Si el dispositivo es un PC forzamos el autoplay a true para usar caratula+autoplay*/
            if (!getDevice().mobile) {
                autoplay = true;
            } else {
                autoplay = false;
            }

            return autoplay

        };

        /*Comprobamos si tenemos una caratula y en caso de ternerla forzamos el AUTOPLAY*/
        this.setAutoplay = function (config, cover, URLnoticia) {

            if (typeof(cover) != "undefined" && cover != "") {
                if (typeof (config.topPlayer) == "undefined") {

                    config.topPlayer = {};
                }

                if (typeof (config.topPlayer.media) == "undefined") {

                    config.topPlayer.media = {};

                    /*en caso de que no llegue link de noticias los players siempre estan sin autoplay*/
                    if (typeof(URLnoticia) != "undefined" && URLnoticia != "") {
                        config.topPlayer.media.autoplay = true;
                    } else {

                        config.topPlayer.media.autoplay = PcControl();
                    }

                } else {

                    /*en caso de que no llegue link de noticias los players siempre estan sin autoplay*/
                    if (typeof(URLnoticia) != "undefined" && URLnoticia != "") {
                        config.topPlayer.media.autoplay = true;
                    } else {

                        config.topPlayer.media.autoplay = PcControl();
                    }

                }

                return config;

            }

            return config;
        };



        //función para añadir una imagen clickable que cargará un TopEmbed dinámico.
        //Al llamar a esta función se genera directamente la imagen sin tener que llamar a otra
        /*En caso de visualizarse con un dispositivo movil incluimos la URL seccion*/
        this.add = function(config,config_image_url){
            _images[_images.length] = this.setCover(config, config_image_url[0]);
            _urls_noticia[_urls_noticia.length] = config_image_url[1];
            _confs[_confs.length] = this.setAutoplay(config, config_image_url[0],config_image_url[1]);
            this.generateContainer(_confs.length-1);
        };

        //función para encolar una imagen clickable
        //tras hacer los queues necesarios se deberá llamar a la función run() para pintarlos
        this.queue = function(config,config_image_url){
            _images[_images.length] = this.setCover(config, config_image_url[0]);
            _urls_noticia[_urls_noticia.length] = config_image_url[1];
            _confs[_confs.length] = this.setAutoplay(config, config_image_url[0],config_image_url[1]);
        };

        //función para añadir un embed que ya existe en la página del integrador
        this.addEmbed = function(embed){
            _confs[_confs.length] = {};
            this.generateEmbed(_embeds.length,false,embed);
        };

        //función para ejecutar el cargado de todas las imágenes clickables.
        //esta función se debe llamar después de haber cargado las configuraciones con queueu
        this.run = function(){
            this.generateContainers();
            this.generateEmbed(0,true);
        };

        //crea la imagen clickable en la página a partir de un índice referente al array donde guardamos las imágenes
        this.generateContainer = function(index){
            if(_images[index]!=""){
                var container = document.getElementById(_confs[index].id_container);

                //creamos la estructura de DOM de El País
                var dom_div = document.createElement("div");
                var dom_a_posicionador = document.createElement("a");
                var dom_span_boton_video = document.createElement("span");

                dom_a_posicionador.className = "posicionador";
                dom_span_boton_video.className = "boton_video";

                dom_a_posicionador.href = "javascript:void(0)";

                var img = document.createElement("img");
                if(typeof(window.lzld) == 'function'){
                    img.setAttribute('src', 'http://ep01.epimg.net/t.gif');
                    img.setAttribute('onload', 'lzld(this)');
                    img.setAttribute('data-src', _images[index]);
                } else {
                    img.src = _images[index];
                }
                img.style.width = "100%";
                img.style.height = "100%";

                dom_a_posicionador.onclick = (function(ind){
                    return function(e){
                        _that.generateEmbed(ind,false);
                    }
                })(index);

                /*si no tenemos URL de noticias instanciamos directamente el player*/
                if ((typeof(_urls_noticia[index]) != "undefined")&&(_urls_noticia[index] != "")) {

                    if (getDevice().mobile) {

                        dom_a_posicionador.onclick = "";
                        dom_a_posicionador.href = _urls_noticia[index];
                    }

                    container.innerHTML = "";

                    dom_div.appendChild(dom_a_posicionador);
                    dom_a_posicionador.appendChild(dom_span_boton_video);
                    dom_a_posicionador.appendChild(img);

                    container.appendChild(dom_div);
                } else {

                    /*en caso de que sea un PC ignoramos el eliminar la caratula*/
                    if (!getDevice().mobile) {
                        container.innerHTML = "";

                        dom_div.appendChild(dom_a_posicionador);
                        dom_a_posicionador.appendChild(dom_span_boton_video);
                        dom_a_posicionador.appendChild(img);

                        container.appendChild(dom_div);

                    } else {

                        _that.generateEmbed(index, false);
                    }

                }
            }
            else{
                _that.generateEmbed(index,false);
            }
        };

        //genera todos los contenedores de imágenes
        this.generateContainers = function(){
            for(var index in _confs){
                _that.generateContainer(index);
            }
        }

        //genera un TopEmbed dinámicamente
        this.generateEmbed = function(index,continua,embed){

            var mediaTopEmbed = null;

            var onInit = function(){

                /*recuperamos la configuración y en caso de que sea player de YouTube en PC ponemos la caratula caso #1.5 #2.5*/
                var recoverConfig = mediaTopEmbed.getSettings();
                if (recoverConfig.topPlayer.media.provider == 'youtube' && !recoverConfig.topPlayer.media.cover) {

                    _images[index] = recoverConfig.topPlayer.media.imgCover;

                    /*En caso de que no tengamos cover desde la config no invocamos al metodo*/
                    if (_images[index] != "") {

                        recoverConfig.topPlayer.media.cover = true;
                        recoverConfig.topPlayer.media.autoplay = true;

                        _that.generateContainer(index);
                    }

                }

                var mediaPlayer = mediaTopEmbed.getMediaPlayer();
                var mediaModule = mediaPlayer.getMediaModule();
                var adModule = mediaPlayer.getAdModule();
                var uiModule = mediaPlayer.getUIModule();

                var _onMediaHandler = (function(real_index){

                    return function(evt){

                        if(real_index!=_playing){
                            _prevPlaying = _playing;
                            _playing = real_index;

                            if(evt.data.status=="play" || evt.data.status=="onPreloadControllerComplete"){
                                if(_that.pauseOthersOnPlay)
                                    _that.pause(real_index,true);

                                if(_that.muteOthersOnPlay)
                                    _that.mute(real_index,true);

                                if(_that.customActionOnPlay!=null){
                                    if(_prevPlaying!=-1)
                                        _that.customActionOnPlay.apply(_that,[_embeds[_prevPlaying],_embeds[_playing],evt.data.status]);
                                }
                            }
                        }
                    }
                })(_embeds.length);

                var _onAdHandler = (function(real_index){

                    return function(evt){

                        if(_embeds.length!=_playing){
                            _prevPlaying = _playing;
                            _playing = real_index;

                            if(_that.customActionOnPlay!=null){
                                if(_prevPlaying!=-1)
                                    _that.customActionOnPlay.apply(_that,[_embeds[_prevPlaying],_embeds[_playing],evt.data.status]);
                            }
                        }
                    }
                })(_embeds.length);

                adModule.addEventListener(emic.top.event.AdEvent.ON_AD_VIDEO_START, _onAdHandler, this);
                mediaModule.addEventListener(emic.top.event.MediaEvent.ON_STATUS_CHANGE, _onMediaHandler, this);

                var element = {
                    "index" : _embeds.length,
                    "mediaPlayer": mediaPlayer,
                    "mediaModule": mediaModule,
                    "adModule": adModule,
                    "uiModule": uiModule,
                    "topEmbed": mediaTopEmbed,
                    "cover": _images[index]
                };

                //_embeds[_embeds.length] = element;
                _embeds[_embeds.length] = element;

                if((continua===true)&&(_embeds.length!=_confs.length))
                    _that.generateEmbed(_embeds.length,continua);
            }

            if(typeof(embed)!="undefined"){
                mediaTopEmbed = embed;
                onInit();
            }
            else{
                mediaTopEmbed = new psd.media.TopEmbed(_confs[index]);
//                mediaTopEmbed.addEventListener(psd.media.TopEmbedEvent.EVENT_INI,onInit);
            }
        };

        //reproduce un TopEmbed indicado por el parámetro index, referente al array de embeds que hemos guardado
        //en caso de no pasar índice se reproduce todo, lo cual es absurdo pero la posibilidad existe
        this.play = function(index){
            for(var i in _embeds){
                if((i==index)||(typeof(index)=="undefined")){
                    _embeds[i]["mediaModule"].play();
                }
                else{
                    _embeds[i]["mediaModule"].pause();
                }
            }
        };

        //pausa el TopEmbed con índice index
        //en caso de querer el comportamiento contrario, es decir, que la función aplique sobre todos los TopEmbed menos el del parámetro index se debe indicar que others=true
        this.pause = function(index,others){
            if(typeof(others)=="undefined"){
                for(var i in _embeds){
                    if((i==index)||(typeof(index)=="undefined")){
                        _embeds[i]["mediaModule"].pause();
                    }
                }
            }
            else if(others==true){
                for(var i in _embeds){
                    if(i!=index){
                        _embeds[i]["mediaModule"].pause();
                    }
                }
            }
        };

        //pausa el TopEmbed con índice index que esté reproduciendo anuncios
        //en caso de querer el comportamiento contrario, es decir, que la función aplique sobre todos los TopEmbed menos el del parámetro index se debe indicar que others=true
        this.pausead = function(index,others){
            if(typeof(others)=="undefined"){
                for(var i in _embeds){
                    if((i==index)||(typeof(index)=="undefined")){
                        _embeds[i]["adModule"].pause();
                    }
                }
            }
            else if(others==true){
                for(var i in _embeds){
                    if(i!=index){
                        _embeds[i]["adModule"].pause();
                    }
                }
            }
        };

        //muta el TopEmbed con índice index
        //en caso de querer el comportamiento contrario, es decir, que la función aplique sobre todos los TopEmbed menos el del parámetro index se debe indicar que others=true
        this.mute = function(index,others){
            if(typeof(others)=="undefined"){
                for(var i in _embeds){
                    if((i==index)||(typeof(index)=="undefined")){
                        _embeds[i]["mediaModule"].mute();
                    }
                }
            }
            else if(others==true){
                for(var i in _embeds){
                    if(i!=index){
                        _embeds[i]["mediaModule"].mute();
                    }
                }
            }
        }

        //devuelve por consola la información de un TopEmbed indicado por index
        this.info = function(index){
            console.log(_embeds[index]);
        };

        //devuelve un TopEmbed indicado por index
        this.get = function(index){
            return _embeds[index];
        };

        //resetea un Topembed indicado por index
        this.reset = function(index){
            _embeds[index].mediaPlayer.reboot();
        }
    }

    namespace.TopEmbedManager = TopEmbedManager;

}(psd.media));




function getDevice()
{
    var device = {};
            device.agent = navigator.userAgent;
            device.mobile = is_MobileDevice(device.agent);
         
    return device;
}

function is_MobileDevice(agent)
{
    var isMobile = (
        (agent.indexOf('iPhone') != -1) ||
        (agent.indexOf('iPod') != -1) ||
        (agent.indexOf('iPad') != -1) ||
        (agent.indexOf('Android') != -1)
    );
    return isMobile;
}

function onYouTubePlayerAPIReady() {
    mm_ytload = true;
    if(mm_allInWin){
    	player = new YT.Player(mm_YTlayer, mm_YTparam);
    }
}
function mm_XonPlayerReady(event){
    var duration = event.target.getDuration();
    if(!mm_ytNoAutoPlay) {
        if (!getDevice().mobile) {
            event.target.playVideo();
        }
    }
}
function mm_onPlayerStateChange(event) {
	mm_objEmbed.onPlayerStateChange(event);
}



	mm_allInWin = false;
	mm_YTparam = {};
	mm_YTlayer = '';
	mm_objEmbed = '';
    mm_ytload = false;
    mm_ytNoAutoPlay = false;