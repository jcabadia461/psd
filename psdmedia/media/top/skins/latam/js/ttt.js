	
				
	$(function(){

	    tttjs = {
	        
	        $settings: {

	        },

	        /**
	         * Constructor
	         */
	        init: function(settings){

	        	//botones con capa oculta             
                $(".trigger").click(function(event){
                	$(".trigger,.triggerm").not(this).removeClass('active');
                	$(this).toggleClass('active');
                    $(".oc:visible,.ocm:visible").not($(this).next()).hide();
                    $(this).next(".oc").toggle(300);
                    event.stopPropagation();
                    tttjs.cancelEvent(event);
                });
                $("body").bind("click",function(event){
                	if (!$('.oc').is(event.target) && $('.oc').has(event.target).length === 0 && !$('.ocm').is(event.target) && $('.ocm').has(event.target).length === 0){ 
                    	$(".oc:visible,.ocm:visible").prev(".trigger,.triggerm").removeClass('active');
                    	$(".oc:visible,.ocm:visible").toggle(300);

                    	event.stopPropagation();
                	}
                });


				// pestanias
                if( $(".pestanias").length > 0){
                	$(".panel:not(:first-child)").hide();
                	$(".pestanias li:first-child").addClass("active");
                	$(".pestanias a").click(function(e){
                		e.preventDefault();
                		$(this).parent().siblings().removeClass("active");                		
                		$(this).parent().addClass("active");
                		$(".panel").hide();
                		$($(this).attr("href")).show();

                		$(".oc:visible,.ocm:visible").prev(".trigger,.triggerm").removeClass('active');
                    	$(".oc:visible,.ocm:visible").toggle(300);
                    	$(this).parents("#programacion").find('.triggerm .btnText').text($(this).text());

                	});
                }



                //mobile
                //deshabilitar efecto hover en touch devices
                var isTouch =  !!("ontouchstart" in window) || window.navigator.msMaxTouchPoints > 0;

                if( !isTouch ){
                   $("body").addClass('notouch');
                }

                $("body").on("click",".triggerm",function(event){
                	$(".trigger,.triggerm").not(this).removeClass('active');
                	$(this).toggleClass('active');
                   $(".oc:visible,.ocm:visible").not($(this).next()).hide();
                    $(this).next(".ocm").toggle(300);
                    event.stopPropagation();
                    tttjs.cancelEvent(event);
                });
                tttjs.responsive();

                $(window).resize(function(event) {
                	tttjs.responsive();
                });


               

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

                 //volumen slider
                 $("#volume > .slider").slider({
                 	range: "min",
                 	value: 60,
                 });

                 //volumen mobile
                  $("#volumeV .slider").slider({
                 	range: "min",
                 	value: 60,
                 	orientation: "vertical"
                 });



                //DEMOS

                //momento demo
                $(".momento").click(function(event) {
                	event.preventDefault();
                	$("#overlay").addClass('show');
                	$("#momento").addClass('show');

                	
                });

                //popup demo
                $(".topRegistro a").click(function(event) {
                	event.preventDefault();
                	$("#overlay").addClass('show');
                	$("#popup").addClass('show');

                	
                });

                 //play pause demo
                $(".bPlay").click(function(event) {
                	 $(".bPlay").children('.iconf').toggleClass('iconf-play iconf-pause');
                	if( $(".bPlay").children('.iconf').hasClass('iconf-pause')){
                		 $(".bPlay").addClass('loading');
	                	setTimeout(function(){
	                		 $(".bPlay").removeClass('loading');
	                	},3000);
                	}
                	
                });


            	//video demo
            	$(".bVideo").click(function(event) {
            		event.preventDefault();
            		$("html, body").animate({  scrollTop: $("#main").offset().top-20 }, 1000);
            		$("#ahora:visible").slideUp();
            		$("#videoPlayer:visible").slideUp();
            		$("#videoPlayer").slideDown();
            		$("body").click();
            		$("#haSonado").addClass('noClear');
            	});
            	$("#videoPlayer .close").click(function(event) {
            		$("#videoPlayer:visible").slideUp();
            		$("#ahora").slideDown();
            		$("#haSonado").removeClass('noClear');
            	});


			},
			responsive: function(){
                
                //comprobar si hay que hacer scroll en titulos del player, habrá que lanzarlo en cada cambio de canción
                tttjs.scrolltxt();
				
                if($(".topShare").css("display") == "none"){
					$("#topRedes,#menu,#programacion .pestanias").attr("style","").removeClass('ocm');
					
					//volume demo
					$("#mutear").removeClass('triggerm');
					if(!$("#mutear").hasClass('bound')){
						$("#mutear").bind('click', tttjs.demomute).addClass('bound')
					}

				}else{
					$("#topRedes,#menu,#programacion .pestanias").addClass('ocm');
					
					//volume demo
					$("#mutear").addClass('triggerm');
					$("#mutear").unbind('click', tttjs.demomute).removeClass('bound');

				}

			},
            //player scroll titulos 
            scrolltxt: function(){

                 $("#infoSong .media-body p span").each(function() {
                    var el = $(this);
                    //console.log(el.width()+" "+el.parent().width());
                    if( el.width() > el.parent().width() ) {
                           el.addClass('scrolling');

                    }else{
                        el.removeClass('scrolling');
                    }     
                     
                 });
            },
			demomute: function(event) {
                	$(this).children('.iconf').toggleClass('iconf-volume iconf-mute');
                	if($(this).children('.iconf').hasClass('iconf-mute')){
                		$("#volume .slider").slider("value", 0);
                	}else{
                		$("#volume .slider").slider("value", 100);
                	}
            },

			cancelEvent: function (evento){
                    if (evento && evento.preventDefault)evento.preventDefault();
                    return false; 		
            }
	    };
	});