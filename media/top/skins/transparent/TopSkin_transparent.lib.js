/**
 *  Created by lmcuende on 01/16/2015.
 **/
(function(namespace){

    TopSkin_transparent.prototype = new emic.top.ui.UISkinBase();

      function TopSkin_transparent (){
        emic.top.ui.UISkinBase.call(this);

        var _position,_isPaused,_started;

        var _loadCSS = function() {                             // Loading CSS main file
        };

        var isWebKit = function() {                             // Test web browser, if it's webkit
            return /(safari|opera|chrome)/.test(navigator.userAgent.toLowerCase());
        };

        var isGecko = function() {
            return /(firefox)/.test(navigator.userAgent.toLowerCase());
        };


        var _loadTemplate = function() {
        };

        //EVENTOS MEDIATOR

        var onDataComplete = function (evt) {
            var template;
            if (evt.result.parserResult.code == _CODE_NUM_PARSER_OK) {
                template = evt.result.parserResult.result.replace(/{<-%ID%->}/g, _data.genericData.id);
                _container.innerHTML = template;
                _asignElements.apply(this);

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

        var _getElementById = function(id){
            return document.getElementById(id+_data.genericData.id);
        };

        var _asignElements = function(){
        };

        this.init = function(data){
            this.notifyInitComplete();
        };

        this.onStatusChange = function(status) {
            switch(status){
              case emic.top.MediaModule.STATUS_STOP:
                case emic.top.MediaModule.STATUS_PAUSE:
                  _isPaused = true;
                  break;
                case emic.top.MediaModule.STATUS_PLAY:
                  this.notifyOrderPlay(); //Forzamos el evento OrderPlay con el controller de Youtube, para que actualice correctamente la posición a MediaPosition
                  _position = emic.top.TopPlayer.POSITION_MEDIA;
                  _started = true;
                  _isPaused = false;
                  break;

              case emic.top.AdModule.STATUS_PLAY:
                  break;
              case emic.top.AdModule.STATUS_PAUSE:
                  break;

              case emic.top.AdModule.STATUS_STOP:
                  break;

              }
        };

        this.onPositionChange = function(position) {
            switch(position) {
                case emic.top.TopPlayer.POSITION_PREVIEW:
                    break;

                case emic.top.TopPlayer.POSITION_MEDIA:
                    break;

                case emic.top.TopPlayer.POSITION_PREROLL:
                    break;

                case emic.top.TopPlayer.POSITION_AD_PREROLL:
                    break;

                case emic.top.TopPlayer.POSITION_AD_POSTROLL:
                    break;
            }
        };

        this.onProgress = function(data){
        };

        this.onVolumeChange = function(offset){
        };

        this.onSeekComplete = function(offset){
        };

      }
    namespace.TopSkin_transparent = TopSkin_transparent;

})(emic.top.ui);