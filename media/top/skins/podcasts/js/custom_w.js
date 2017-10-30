/**
 * Created by dmariaa on 25/4/16.
 */

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

	window.haz = function(){
//  window.addEventListener('load', function() {
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
      _togglePlayPause();
    })
}
 // });

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
