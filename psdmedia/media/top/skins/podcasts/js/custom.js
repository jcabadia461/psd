jQuery(document).ready(function(){

	//Julián -- Si existe la variable dwnlurl en la página que aloja el player entonces
	//cada vez que presionemos el botón "descargar" en los browsers firefox, nos captura
	//la url, le agrega delante otra url, que se encuentra en la variable y la envía al servidor
	//que tiene alojado un servicio que nos devuleve el archivo para ser descargado.
	/*if(typeof dwnlurl !="undefined"){
		$(document).on('click','.linkdwl',function(e) {
			e.preventDefault();
			var media = $(this).attr('href');
			window.location = dwnlurl+'?media='+media;
			return false;
		});
	}*/

	jQuery('.mm-plylist-head-close').click(function(){
		var playlistcont = document.getElementById("containerplaylist_container");
		var _playlist_button = document.getElementsByClassName("mm-ply-playlist-button")[0];

		if(playlistcont!=null){

			if(playlistcont.className.indexOf("mm-ply-opened")>0){
				playlistcont.className = playlistcont.className.replace(/ mm-ply-opened/g,"");
				_playlist_button.className = _playlist_button.className.replace(/ mm-ply-opened/g,"");
			}else{
				 playlistcont.className += " mm-ply-opened";
				_playlist_button.className += " mm-ply-opened";
			}
		}

	});
	
	jQuery('.mm-ply-embed .embed-big').click(function() {
		if(!jQuery('.mm-ply-embed .embed-big').hasClass('active')) {
			jQuery('.mm-ply-embed .embed > div.active').removeClass('active');
			jQuery('.mm-ply-embed .embed-big').addClass('active');
		}
	});

	jQuery('.mm-ply-embed .embed-medium').click(function() {
		if(!jQuery('.mm-ply-embed .embed-medium').hasClass('active')) {
			jQuery('.mm-ply-embed .embed > div.active').removeClass('active');
			jQuery('.mm-ply-embed .embed-medium').addClass('active');
		}

	});

	jQuery('.mm-ply-embed .embed-small').click(function() {
		if(!jQuery('.mm-ply-embed .embed-small').hasClass('active')) {
			jQuery('.mm-ply-embed .embed > div.active').removeClass('active');
			jQuery('.mm-ply-embed .embed-small').addClass('active');
		}
	});

	jQuery('.mm-ply-icoEmbed').click(function() {
		if(jQuery('.mm-ply-embed').hasClass('hidden')) {
			jQuery('.mm-ply-embed').removeClass('hidden')
		}
		if(jQuery('.mm-ply-backdrop').hasClass('hidden')) {
			jQuery('.mm-ply-backdrop').removeClass('hidden')
		}
	});

	jQuery('.mm-ply-suscribete').click(function() {
		if(jQuery('.mm-ply-suscripcion').hasClass('hidden')) {
			jQuery('.mm-ply-suscripcion').removeClass('hidden')
		}
		if(jQuery('.mm-ply-backdrop').hasClass('hidden')) {
			jQuery('.mm-ply-backdrop').removeClass('hidden')
		}
	});

	jQuery('.mm-ply-embed .close').click(function() {
		if(!jQuery('.mm-ply-embed').hasClass('hidden')) {
			jQuery('.mm-ply-embed').addClass('hidden')
		}
		if(!jQuery('.mm-ply-backdrop').hasClass('hidden')) {
			jQuery('.mm-ply-backdrop').addClass('hidden')
		}
	});

	jQuery('.mm-ply-suscripcion .close').click(function() {
		if(!jQuery('.mm-ply-suscripcion').hasClass('hidden')) {
			jQuery('.mm-ply-suscripcion').addClass('hidden')
		}
		if(!jQuery('.mm-ply-backdrop').hasClass('hidden')) {
			jQuery('.mm-ply-backdrop').addClass('hidden')
		}
	});

	var slider = jQuery(".mm-ply-volumen").css("width");
	var volumen = jQuery(".mm-ply-volumen svg").position();

	//dmena left
	//jQuery(".mm-ply-volumen svg").css("left","0");

    // cambio de estado botón mute
    var estadoVolumen; // variable para controlar el volumen
    var posX; //posición del manejador

	// interacción mobile
	// cambio de estado botón play/stop
	jQuery(".mm-ply-interaccion").click(function(){

		if(jQuery(".mm-ply-cover").hasClass("mm-ply-muestraCover") == false){
			jQuery(".mm-ply-cover").addClass("mm-ply-muestraCover", 300, "easeInQuad");
			jQuery(this).addClass("mm-ply-desplegado");
		}else{
			jQuery(".mm-ply-cover").removeClass("mm-ply-muestraCover", 300, "easeInQuad");
			jQuery(this).removeClass("mm-ply-desplegado");
		}
		
	})

	document.addEventListener('touchstart', handleTouchStart, false);
	document.addEventListener('touchmove', handleTouchMove, false);

	var xDown = null;
	var yDown = null;

	function handleTouchStart(evt) {
		xDown = evt.touches[0].clientX;
		yDown = evt.touches[0].clientY;
	};

	function handleTouchMove(evt) {
		if ( ! xDown || ! yDown ) {
			return;
		}

		var xUp = evt.touches[0].clientX;
		var yUp = evt.touches[0].clientY;

		var xDiff = xDown - xUp;
		var yDiff = yDown - yUp;

		if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
			if ( xDiff > 0 ) {
				/* left swipe */
			} else {
				/* right swipe */
			}
		} else {
/*
			if ( yDiff > 0 ) {
				if(jQuery(".mm-ply-cover").hasClass("mm-ply-muestraCover") == false){
					jQuery(".mm-ply-cover").addClass("mm-ply-muestraCover", 300, "easeInQuad");
					jQuery(this).addClass("mm-ply-desplegado");
				}
			} else {
				if(jQuery(".mm-ply-cover").hasClass("mm-ply-muestraCover") != false) {
					jQuery(".mm-ply-cover").removeClass("mm-ply-muestraCover", 300, "easeInQuad");
					jQuery(this).removeClass("mm-ply-desplegado");
				}
			}
*/
		}
		/* reset values */
		xDown = null;
		yDown = null;
	};
	
});
