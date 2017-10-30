$(document).ready(function($){
	var volumen = 100;				
	components();
	show_layer_icons_socials();
	show_layer_embed();
	range_slider();
	btn_copy_embed_code();
    // show_layer_icons_socials_list_audio();
	show_icons_socials_playlist_player();
});



function components(){	

    // show for click
	$(".mm_list-show").on( "click", function(){				
		$(".list-hidden").fadeToggle();	
		$(".mm_list-show").toggleClass("btn-select");			
	});
	//showemisora player fijo
    $(".mm_conf").on( "click", function(){				
		$(".mm_button-select-movil").fadeToggle();				
		return false;			
	});	
	
	//emisora player fijo
    $(".mm_btn_close_emisora").on( "click", function(){				
		$(".mm_button-select-movil").fadeToggle();				
		return false;			
	});	
	
    //show 
    $(".select.botones").on( "click", function(){	
		$(".select.botones .dropdown-menu.open").fadeToggle();				
		return false;			
	});	
	 //show 
    $(".mm_button-select-movil .mm_button_select_onclick").on( "click", function(){	
		$(".dropdown-menu.open").fadeToggle();				
		return false;			
	});

	// Así estaba antes Player en los listados del portal:
	$('.mm_btn-ico .player_btn_play').on('click', function (e) {
		if (!$(this).hasClass("playing")){
			$('.mm_btn-ico .player_btn_play.fa-pause').removeClass("fa-pause").addClass("fa-play");
		    $('.mm_btn-ico .player_btn_play.playing').removeClass("playing");
			$(this).toggleClass("fa-play");
			$(this).toggleClass("fa-pause");	
			$(this).addClass("playing");
		}		
	});
	$('.mm_btn-ico .btn_play').on('click', function (e) {
		$(this).toggleClass("btn_pause");	
	});
	

	// Maneja boton play de Player inferior
	$('.mm_bPlay').on('click', function (e) {
		$(".mm_bPlay .mm_player_btn_play").toggleClass("fa-play");
		$(".mm_bPlay .mm_player_btn_play").toggleClass("fa-pause");	
		//$("#play .mm_player_btn_play").addClass("playing");
	});
	$('.mm_bPlay').on('click', function (e) {
		$('.mm_bPlay .mm_player_btn_play' ).toggleClass("btn_pause");	
	});
	
	//volume-mute player
	$('.mm_mutear .icons').on('click', function (e) {
			var className = e.currentTarget.className;
				$('.icon-volume-2').toggleClass("icon-volume-off");	
		
			if(className.search("icon-volume-off") == -1) {
				volumen = $( ".mm_mutear .mm_slide_volumen").slider("value");
				$( ".mm_mutear .mm_slide_volumen").slider( "value", 0 );
			} else {
				$( ".mm_mutear .mm_slide_volumen").slider( "value", volumen );
			}			
	});
  	    
}
//
function range_slider(){
 $( ".mm_slide_volumen").slider({
      orientation: "horizontal",
      range: "min",
      max: 255,
      value: 127,
      change: function( event, ui ) { set_icon_volume(); }
    });
    $( ".mm_slide_volumen" ).slider( "value", 100 );
    
}

function set_icon_volume(){
	vol_slide_handle = $(".ui-slider-handle");
	if (vol_slide_handle.css("left") == "0px"){
		$(".mm_mute_display").addClass("icon-volume-off");
	}else{
		$(".mm_mute_display").removeClass("icon-volume-off");
	}
}
//Capa Redes sociales listado de audios de playlist
function show_icons_socials_playlist_player(){			 	 
	  $('.mm_layerPlaylist .mm_layer-socials-btn-list').click(function(){
		  $('.mm_layerPlaylist .mm_shareSocials_playlist').animate({width: 'toggle'});	   
	   return false;
	 }); 	      
}
//Capa Redes sociales player fijo bottom
function show_layer_icons_socials(){	
	$('.mm_shareSocials').hide();
    $('.mm_layer-socials-btn').click(function(){
	   $('.mm_shareSocials').animate({width: 'toggle'});
	   return false;
	 }); 	    
}
function show_layer_embed(){	
	$('.mm_layerEmbed').hide();
	$('.mm_layer-embed-btn').click(function(){
	   $('.mm_layerEmbed').animate({width: 'toggle'});
	   return false;
	 });  		
}

function mCustomScrollBar() {
    $("#content-7").mCustomScrollbar({
		scrollButtons:{enable:true},
		theme:"3d-thick"
    });
}

// Copia a portapapeles el iframe. Clic en boton "copiar" y en textarea
function btn_copy_embed_code(){

	$('.mm_layerEmbed .mm_button-copy, #topui_container_TopPlayer_code').click(function(){
	   copyToClipboard(document.getElementById("topui_container_TopPlayer_code"));
	   textBox = $("#topui_container_TopPlayer_code");
	   textBox.select();
	   textBox.onfocus = function() {
	        textBox.select();
	        // Work around Chrome's little problem
	        textBox.onmouseup = function() {
	            // Prevent further mouseup intervention
	            textBox.onmouseup = null;
	            return false;
	        };
	    };
	   
	 });
}	  

function copyToClipboard(elem) {
	// create hidden text element, if it doesn't already exist
    var targetId = "_hiddenCopyText_";
    var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
    var origSelectionStart, origSelectionEnd;
    if (isInput) {
        target = elem;
        origSelectionStart = elem.selectionStart;
        origSelectionEnd = elem.selectionEnd;
    } else {
        target = document.getElementById(targetId);
        if (!target) {
            var target = document.createElement("textarea");
            target.style.position = "absolute";
            target.style.left = "-9999px";
            target.style.top = "0";
            target.id = targetId;
            document.body.appendChild(target);
        }
        target.textContent = elem.textContent;
    }
    var currentFocus = document.activeElement;
    target.focus();
    target.setSelectionRange(0, target.value.length);
    var succeed;
    try {
    	  succeed = document.execCommand("copy");
    } catch(e) {
        succeed = false;
    }
    if (currentFocus && typeof currentFocus.focus === "function") {
        currentFocus.focus();
    }
    if (isInput) {
        elem.setSelectionRange(origSelectionStart, origSelectionEnd);
    } else {
        target.textContent = "";
    }
    return succeed;
}    
