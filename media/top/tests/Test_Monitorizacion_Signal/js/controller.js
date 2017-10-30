/**
 * Created by operador on 24/02/2016.
 */

//--Detectar Cuenta

var urlMedio = window.location.href;
var URLparse = "";                      //--Parseado
var flag;                               //--identificador

var extension;

if (window.location.host == "10.90.1.61:33608") {
    console.log("File: xml ",window.location.host);
    extension = ".xml";
} else {
    console.log("File: json ",window.location.host);
    extension = ".json";
}




var urlDecodi = function () {

    if (urlMedio.indexOf("medio=") > 0) {

        var indexTotal = urlMedio.length;

        var indexID = urlMedio.indexOf("medio=");

        if (urlMedio.indexOf("#") > 0) {

            var indexNumber = urlMedio.indexOf("#");
            var medioValue = urlMedio.substring(indexID + 6, indexNumber);
            flag = urlMedio.substring(indexNumber+1, indexTotal);
            console.log("flag=", flag);

        } else {
            var medioValue = urlMedio.substring(indexID + 6, indexTotal);

        }

        return medioValue;

    } else {

        return false;
    }

};


//--Seleccionar configuracion
if (urlDecodi()) {

    switch (urlDecodi()) {

        case "yu":
            console.log("medio=", urlDecodi());

            TestIni("conf/yu" + extension);

            break;

        case "ElPais_Premios_Oscar_2016":
            console.log("medio=", urlDecodi());

            TestIni("conf/ElPais_Premios_Oscar_2016" + extension);

            break;

        default :
            console.log("Configuracion Incorrecta");

            break;
    }

} else {

    console.log("Sin medio");
}


//--Elementos
var logo = document.getElementById("logo");
var title = document.getElementById("title");
var main = document.getElementById("main");



//--Cargar configuración

function TestIni(urlData) {


    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {


            URLparse = (JSON.parse(xhttp.responseText));


            console.log("Parseo--->", URLparse);

            //--cargar la configuracion si es la home
            if (LoadConfi) {

                LoadConfiguration(URLparse);    //--Cargar configuracion

            } else {

                iniHLS(URLparse);              //--Cargar Video HLS
            }


        } else {

            console.log("Cargando configuracion.....")
        }
    };
    xhttp.open("GET", urlData, true);
    xhttp.send();


    var LoadConfiguration = function (data) {

        logo.innerHTML = data.logo;
        title.innerHTML = data.title;

        console.log("leght-->", data.signal.length);

        for (var i = 0; i < data.signal.length; i++) {


            // Crear nodo - etiqueta
            var playerChannel = document.createElement("div");
            playerChannel.id = "channel_" + i;
            playerChannel.className = "channel";

            var playerIframe = document.createElement("div");
            playerIframe.className = "iframeDesing";
            playerChannel.appendChild(playerIframe);

            var playerSubtitle = document.createElement("div");
            playerSubtitle.className = "titleText sub_titles";
            playerSubtitle.textContent = data.signal[i].subTitle;
            playerIframe.appendChild(playerSubtitle);

            var playerContent = document.createElement("iframe");
            playerContent.setAttribute('allowFullScreen', '');
            playerContent.setAttribute('scrolling', 'no');


            if (data.signal[i].type == "hls") {

                playerContent.src = (data.signal[i].URL)+"#"+i; //--URL para hls
                //playerContent.src = data.signal[i].URL;

            }else{

                playerContent.src = data.signal[i].URL;
            }


            playerContent.allowfullscreen = true;
            playerIframe.appendChild(playerContent);

            var playerLevel = document.createElement("div");
            playerLevel.className = "levelmeter";
            playerIframe.appendChild(playerLevel);


            main.appendChild(playerChannel);

        }

    }

}


//--Cargar HLS

function iniHLS(data) {


    FAPI_URL = "http://fapi-top.prisasd.com/api";

    var PlayerOBJ = document.getElementById("video-live");
    //PlayerOBJ.poster = "http://vdvmedia.los40.com/top/20162/12/YuNotePierdasNada2016_1455272527_thumbnail.jpg";
    PlayerOBJ.poster = data.signal[flag].hls.poster;

    var URL_Signal, URL_Poster;


    //--llamar al player

    //console.log("cargaHLS-->",data);

    var data_player = {
        "id_cuenta": data.signal[flag].hls.id_cuenta,
        "media_type": data.signal[flag].hls.media_type,
        "id_media": data.signal[flag].hls.id_media
    };



    //--Invocar a la fapi
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            //--parseamos e instanciacion del player


            var URLparse = (JSON.parse(xhttp.responseText));          //--cargar nueva configuracion

            URL_Signal = (URLparse.asset[0].url[1].url);

            console.log(URLparse.asset[0].url[1].url);


            Instance_player(URL_Signal);

        }
    };
    xhttp.open("GET", FAPI_URL + "/" + data_player.id_cuenta + "/" + data_player.media_type + "/" + data_player.id_media + "/", true);
    xhttp.send();


    var Instance_player = function (data) {


        var $vid_obj = _V_("video-live");


        $vid_obj.src(data);//yu
        //$vid_obj.src('http://www.flashls.org/playlists/test_001/stream.m3u8');
        $vid_obj.on('loadstart', function () {

            //$vid_obj.techCall('Poster', 'http://vdvmedia.los40.com/top/20162/12/YuNotePierdasNada2016_1455272527_thumbnail.jpg');
            //$vid_obj.play();
        });


    };

}



