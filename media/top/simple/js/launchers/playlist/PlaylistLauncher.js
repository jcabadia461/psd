/**
 * Created by igomez on 19/03/14.
 */
(function(namespace){

    /**
     *
     * @param settings   Json object--> {url, target, targetList, loop}
     * @constructor
     */
    function PlaylistLauncher(settings){

        var _mediator = new psd.framework.Mediator();
        var _data = null;
        var _current = 0;
        var _settings = settings;
        var _player = null;
        var _divPlayer = null;
        var _divMain = null;
        var _nextAutoplay = false;
        var _selectedListSong = null;

        var _TEXTS_HEIGHT = 50;
        var _COLOR = "f6193f";

        var _init = function(){

            var anterior, siguiente, enlace;

            _divMain = document.getElementById(settings.target);

            if (_divMain){

                _divPlayer = document.createElement("div");
                _divPlayer.id = "playlistPlayer";
                _divPlayer.style.width = "500px";
                _divPlayer.style.height = "60px";
                _divPlayer.style.background = "black";
                _divMain.appendChild(_divPlayer);

            _readData.apply(this);

            }else{
                //TODO: Error de capa
            }

        };

        // MEDIACIÓN DE DATOS -----------------------

        var _readData = function(){

            var jsonParser = new psd.framework.parser.JSONParser();

            var dataVideoMediator = new psd.framework.Mediator();
            dataVideoMediator.corsIE(true);
            dataVideoMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_COMPLETE, onDataComplete, this);
            dataVideoMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_ERROR, onDataError, this);
            dataVideoMediator.mediate(_settings.url, jsonParser, psd.framework.Mediator.RESPONSE_JSON);

        };

        var onDataComplete = function (evt)
        {
            if(evt.result.parserResult.code == psd.framework.ParserResult.PARSER_SUCCESS_CODE) {
                _data = evt.result.parserResult.result;
                _paintList.apply(this);
                _initPlaylist.apply(this);
            }else {
                //TODO: Error
            }
        };

        var onDataError = function (evt)
        {
            //TODO: Error
        }

        // MEDIACIÓN DE DATOS {END} ------------------------

        var _paintList = function(){
            var target, list, song, i, defered, span, link;

            target = document.getElementById(_settings.targetList);

            if (target){

                list =  document.createElement("ul");

                for (i=0; i < _data.canciones.length; i++){
                    song = document.createElement("li");
                    span = document.createElement("span");
                    span.setAttribute("class","tipo");
                    song.appendChild(span);
                    song.value = i+1;
                    link = document.createElement("a");
                    link.style.color = "#ffffff";

                    if (link.textContent == undefined){
                        link.innerText = _data.canciones[i].tittle;
                    }
                    else{
                        link.textContent = _data.canciones[i].tittle;
                    }

                    song.appendChild(link);
                    defered = (function(that, j){
                        return function(){
                            _nextAutoplay = true;
                            _createPlayer.apply(that,[j]);
                        }
                    })(this, i);

                    _data.canciones[i].link = link;
                    song.onclick = defered;

                    list.appendChild(song);

                    if (i == 0){
                        _selectListSong.apply(this, [link]);
                    }
                }

                target.appendChild(list);
            }else{
                //TODO: Error list DIV
            }

        }

        var _selectListSong = function(song){
            if (_selectedListSong)
                _selectedListSong.style.color = "#ffffff";
            _selectedListSong = song;
            _selectedListSong.style.color = "#" + _COLOR;
        }

        var _initPlaylist = function(){
            _actual = 0;

            _createPlayer.apply(this, [0]);
        };

        var _createPlayer = function(position){

            //TODO: Kill actualplayer si es necesario
            //TODO onPlayerNext this.next()
            //TODO onPlayerPrev this.next()

            var mediaParams = {
                type: "audio/mp4"
                , src : _data.canciones[position].url.flash
                , srcHTML5 : _data.canciones[position].url.html5
                , cdn: { provider:"akamaihds"}
                , title: _data.canciones[position].tittle
            }

            var playerParams = {
                container: "playlistPlayer"
                , width: "100%"
                , height: "100%"
                , autoplay: _nextAutoplay
                , mode: "flash,html5"
            }

            /*
             *  Definición del skin que se deseé cargar
             */
            var skinParams = {
                id: "generic"
                ,color:"0x" + _COLOR
                ,profile:"normal"
                ,mode:"audio"
                ,navigator:"true"
                ,volume:"true"
                ,html5:"false"
            }

                        /*
             *  Definición de la configuiración global del aplicativo
             */
            var config = {
                id: "myId"
                , media: mediaParams
                , player: playerParams
                , skin: skinParams
            }

            /*
             *  Instanciación del aplicativo Media Simple
             */

            _player = new psd.media.SimpleMediaPlayer(config);
            _player.addEventListener(psd.media.MediaEvent.MEDIA_COMPLETE, _onMediaComplete, this);
            _player.addEventListener(psd.media.MediaEvent.MEDIA_NEXT, this.next, this);
            _player.addEventListener(psd.media.MediaEvent.MEDIA_PREVIOUS, this.prev, this);

            _player.init();
            _current = position;
//            console.log("_current:" + position);



            _selectListSong(_data.canciones[position].link);
        };


        var _onMediaComplete = function(ev){
            this.next();
        };

        // -----------------------------------------------------
        // -------------------------  API ----------------------
        // -----------------------------------------------------

        this.next = function(){
            if (_current >= _data.canciones.length - 1){
                //end of playlist
                if (_settings.loop){
                    _nextAutoplay = true;
                }else{
                    _nextAutoplay = false;
                }
                _createPlayer.apply(this, [0]);

            }else{
                _nextAutoplay = true;
                _createPlayer.apply(this, [_current + 1]);

            }
        };

        this.prev = function(){
            if (_current > 0){
                _nextAutoplay = true;
                _createPlayer.apply(this, [_current - 1]);

            }
        };

        _init.apply(this);

    };

    namespace.PlaylistLauncher = PlaylistLauncher;

})(psd.media);
