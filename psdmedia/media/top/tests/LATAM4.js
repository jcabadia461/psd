senal = "prisatest";

if(window.location.search.indexOf("adbreak")>0)
	senal = "20160222134405";

var params = {
	"dev": false,
	"id_cuenta": "los40colombia",   
	"id_player": "147",   
	"id_media": senal,
	"media_type" : "audio",   
	"id_container": "AQUIVAELPLAYER",
	"topPlayer":{
		"ad":{"container":"ppp"},
		"media":{"controllerData":{
			"container_banner_bigbox":"ppp2",
			"banner-live_synced_leaderboard":"ppp2"
		}}
	}
	};   

var mediaTopEmbed = new psd.media.TopEmbed(params); 

function onUIEvent(ev){
	console.log(ev);
}

function onAdEvent(ev){
	console.log("ADDDDDDDDDDDDDD",ev);

	switch(ev.type){
		case emic.top.event.AdEvent.ON_AD_VIDEO_START:
			document.getElementById("preRoll").style.visibility = "visible";
		break;
		case emic.top.event.AdEvent.ON_AD_VIDEO_END:
            document.getElementById("preRoll").style.visibility = "hidden";
		break;
        case emic.top.event.AdEvent.ON_AD_INSTREAM_START:
            document.getElementById("preRoll").style.visibility = "visible";
			document.getElementById("ppp").style.display = "none";
        break;
        case emic.top.event.AdEvent.ON_AD_INSTREAM_END:
            document.getElementById("preRoll").style.visibility = "hidden";
			document.getElementById("ppp").style.display = "";
        break;

	}
}

rui = function(){
//emic.top.debugTop = true;
	console.log("inicializamos ttt");

	//tttjs.init();

	ui = mediaTopEmbed.getMediaPlayer().getUIModule();
	ui.addEventListener(emic.top.event.UIEvent.ON_ORDER_EXTERNAL,onUIEvent);

	ad = mediaTopEmbed.getMediaPlayer().getAdModule();

	ad.addEventListener(emic.top.event.AdEvent.ON_AD_INSTREAM_START,onAdEvent);
    ad.addEventListener(emic.top.event.AdEvent.ON_AD_INSTREAM_END,onAdEvent);
	ad.addEventListener(emic.top.event.AdEvent.ON_AD_VIDEO_START,onAdEvent);
	ad.addEventListener(emic.top.event.AdEvent.ON_AD_VIDEO_END,onAdEvent);
}

mediaTopEmbed.addEventListener(psd.media.TopEmbedEvent.EVENT_INI,rui);

