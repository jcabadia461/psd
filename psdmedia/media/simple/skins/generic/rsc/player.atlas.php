<?php if(isset($_GET['jsonp'])) { echo $_GET['jsonp'].'('; } echo '{"frames": [

{
	"filename": "Button_fsoff.png",
	"frame": {"x":2,"y":2,"w":70,"h":70},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":70,"h":70},
	"sourceSize": {"w":70,"h":70}
},
{
	"filename": "Button_fson.png",
	"frame": {"x":74,"y":2,"w":70,"h":70},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":70,"h":70},
	"sourceSize": {"w":70,"h":70}
},
{
	"filename": "Button_next.png",
	"frame": {"x":146,"y":2,"w":70,"h":70},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":70,"h":70},
	"sourceSize": {"w":70,"h":70}
},
{
	"filename": "Button_pause.png",
	"frame": {"x":2,"y":74,"w":70,"h":70},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":70,"h":70},
	"sourceSize": {"w":70,"h":70}
},
{
	"filename": "Button_play.png",
	"frame": {"x":74,"y":74,"w":70,"h":70},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":70,"h":70},
	"sourceSize": {"w":70,"h":70}
},
{
	"filename": "Button_reset.png",
	"frame": {"x":146,"y":74,"w":70,"h":70},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":70,"h":70},
	"sourceSize": {"w":70,"h":70}
},
{
	"filename": "Button_vol0.png",
	"frame": {"x":2,"y":146,"w":70,"h":70},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":70,"h":70},
	"sourceSize": {"w":70,"h":70}
},
{
	"filename": "Button_vol100.png",
	"frame": {"x":74,"y":146,"w":70,"h":70},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":70,"h":70},
	"sourceSize": {"w":70,"h":70}
},
{
	"filename": "Button_vol50.png",
	"frame": {"x":146,"y":146,"w":70,"h":70},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":70,"h":70},
	"sourceSize": {"w":70,"h":70}
}],
"meta": {
	"app": "http://www.texturepacker.com",
	"version": "1.0",
	"image": "player.atlas.png",
	"format": "RGBA8888",
	"size": {"w":218,"h":218},
	"scale": "1",
	"smartupdate": "$TexturePacker:SmartUpdate:63008f9b7ac48118667a194d8c119cd2$"
}
}
'; if(isset($_GET['jsonp'])) { echo ')'; }