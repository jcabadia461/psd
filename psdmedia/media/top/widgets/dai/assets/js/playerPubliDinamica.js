/**
 * Created by julio.marquez on 17/04/2017.
 */
$(document).ready(function(){

    $("#cantPublis").css("visibility", "hidden");
    $("#contadorPubli").css("visibility", "hidden");
    $("#contenedorTexto").css("visibility", "hidden");
    $("input[name=btn_publi]").css("visibility", "hidden");
    $("input[name=btn_publi]").click(function(){
        $.ajax({
            url: "http://multi01w8:8086/insertadmarker?application=live&streamName=myStream.stream&url=publicidad",
            crossDomain: true,
            error: function(){
                alert("No se pudo conectar con el servidor que lanza la publicidad.");
            }
        }).done(function(){
                $("input[name=btn_publi]").css("visibility", "hidden");
            $("#contenedorTexto").css("visibility", "visible");
                pintaIda();
        });
    });

    $("input[name=btnLoop]").click(function(){
        var loopTimeMinutos, conversion;
        loopTimeMinutos= parseInt($("input[name=inputLoop]").val());
        if((loopTimeMinutos!="")&&(!(isNaN(loopTimeMinutos)))){
            conversion= loopTimeMinutos * 60 * 1000;
            setInterval(lanzaPubli,conversion);
        }
        else{
            alert("ERROR: tiene que ingresar un número");
        }
        //setInterval(lanzaPubli,5000);
    });
    $("input[name=btnSet]").click(function(){
        flagPubliLanzada= false;
    });
});

var flagPubliLanzada= true;

function pintaIda(){
    var progresoWarning= 0;
    var idIterval = setInterval(function(){
        progresoWarning +=1;
        $('.progress-bar-warning').css('width', progresoWarning + '%');
        if(progresoWarning == 100){
            clearInterval(idIterval);
            $("#contenedorTexto").fadeOut("slow", function(){
                $("input[name=textEnviando]").val("Procesando petición publicidad");
            });
            $("#contenedorTexto").fadeIn("slow");
        }
    },10);
}

function pintaVuelta(){
    var progresoDanger= 0;
    var contador=10;
    $("input[name=textEnviando]").removeClass("parpadea");
    var idIterval = setInterval(function(){
        progresoDanger +=10;
        contador-= 1;
        $('.progress-bar-danger').css('width', progresoDanger + '%');

        $("input[name=textEnviando]").val("Publicidad en "+ contador);

        if(progresoDanger >= 100){
            clearInterval(idIterval);
        }
    },1000);
}

function limpiaAnimacionPeticion(){
    $('.progress-bar-warning').css('width', 0 + '%');
    $('.progress-bar-danger').css('width', 0 + '%');
    $("input[name=textEnviando]").addClass("parpadea");
    $("input[name=textEnviando]").val("Enviando petición publicidad");
    $("#contenedorTexto").css("visibility", "hidden");
}

function muestraContadorPubli(e){
    var duracion= e.data.duration;
    var idIterval = setInterval(function(){
        duracion -=1;
        $("#contadorPubli").val(duracion);
        if(duracion == 0){
            clearInterval(idIterval);
        }
    },1000);
    $("#contadorPubli").val(duracion);
    $("#contadorPubli").css("visibility", "visible");
}

function muestraCantPublis(e){
    var mensaje;
    if(cantAds == e.data.cantAds){
        var duracion= e.data.duration;
        mensaje= "Ultimo Anuncio";
        $("#cantPublis").removeClass("colorNegro fuenteBlanca");
        $("#cantPublis").addClass("colorBlanco fuenteRoja negrita parpadea");
    }
    else{
        mensaje= "Publicidad "+cantAds+" de "+ e.data.cantAds;
    }
    $("#cantPublis").val(mensaje);
    $("#cantPublis").css("visibility", "visible");
    cantAds++;
}

function comienzaPubli(e){
    limpiaAnimacionPeticion();
    muestraContadorPubli(e);
    muestraCantPublis(e);
}

function terminaPubli(){
    $("#contadorPubli").css("visibility", "hidden");
    $("#cantPublis").css("visibility", "hidden");
    cantAds= 1;
    $("#cantPublis").removeClass("colorBlanco fuenteRoja negrita parpadea");
    $("#cantPublis").addClass("colorNegro fuenteBlanca");
    $("input[name=btn_publi]").css("visibility", "visible");
}

function lanzaPubli() {
    /*var topPlayer = mediaTopEmbed2.getMediaPlayer();
     topPlayer.midroll();*/
    $("input[name=btn_publi]").click();
}



function preLanzaPubli(evt){
    var currentTime= evt.data.currentTime;
    var minutTimeAds= parseInt($("input[name=minutTimeAds]").val())|0;
    var secondTimeAds= parseInt($("input[name=secondTimeAds]").val())|0;
    var totalSeconds= (minutTimeAds*60)+secondTimeAds;
    if ((flagPubliLanzada==false)&&(currentTime>=totalSeconds)&&(totalSeconds>0)){
        flagPubliLanzada= true;
        lanzaPubli();
    }
}


