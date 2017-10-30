$(function(){
  
  /* cuando pulsan el play de la capa portada */
  $('#mm_boton_play').on('click', function(e){
    e.preventDefault();
    /* alterno las clases de play y pausa */
    $(this).toggleClass('mm_boton_play mm_boton_pausa');
    
    /* muestro la capa 'sonando' */
    $('.mm_capa_sonando').addClass('visible');
  });
  
  /* cuando pulsan el play de la capa sonando */
  $('#mm_control_play').on('click', function(e){
    e.preventDefault();
    /* alterno las clases de play y pausa */
    $(this).toggleClass('mm_control_play mm_control_pausa');
  });
  
  /* cuando pulsan el volumen de la capa sonando */
  $('#mm_control_sonido').on('click', function(e){
    e.preventDefault();
    /* alterno las clases de volumen y mute */
    $(this).toggleClass('mm_control_sonido mm_control_mute');
    /* si le doy a mute, muevo el slider al valor 0 */
    if($(this).hasClass('mm_control_mute')){
      $('#mm_volumen_slider').slider( 'option', 'value', 0 );
    }
  });
  
  /* crea un slider para el volumen, necesita jquery-ui */
  $('#mm_volumen_slider').slider({
  	min: 0,
  	max: 100,
  	value: 50,
		range: "min",
  	slide: function(event, ui) {
      /* aqui iría la función que sube o baja el volumen según la posición del slider */
    	/* p.e. setVolume(ui.value / 100); */
      
      /* si el valor del slider es mayor que 0 y está el icono del mute, lo quito */
      if(ui.value > 0){
        $('#mm_control_sonido').addClass('mm_control_sonido').removeClass('mm_control_mute');
      }
  	}
	});
  
  /* cuando pulsan el botón de menú */
  $('#mm_boton_menu').on('click', function(e){
    e.preventDefault();
    /* añade la clase visible de la capa del menú */
    $('.mm_capa_menu').addClass('visible');
  });
  
  /* cuando pulsan el botón de cerrar el menú */
  $('#mm_boton_cerrar_menu').on('click', function(e){
    e.preventDefault();
    /* quita la clase visible de la capa del menú */
    $(this).closest('.mm_capa_menu').removeClass('visible');
  });
  
  
  
});
