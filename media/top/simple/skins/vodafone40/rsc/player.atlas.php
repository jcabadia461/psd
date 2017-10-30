<?php if(isset($_GET['jsonp'])) { echo $_GET['jsonp'].'('; } echo '{"frames": [

{
	"filename": "bar_bg_center.png",
	"frame": {"x":2,"y":2,"w":1,"h":8},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":1,"h":8},
	"sourceSize": {"w":1,"h":8}
},
{
	"filename": "bar_bg_end.png",
	"frame": {"x":5,"y":2,"w":3,"h":8},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":3,"h":8},
	"sourceSize": {"w":3,"h":8}
},
{
	"filename": "bar_fg_begin.png",
	"frame": {"x":10,"y":2,"w":3,"h":8},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":3,"h":8},
	"sourceSize": {"w":3,"h":8}
},
{
	"filename": "bar_fg_center.png",
	"frame": {"x":15,"y":2,"w":1,"h":8},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":1,"h":8},
	"sourceSize": {"w":1,"h":8}
},
{
	"filename": "pause_btn.png",
        "label": "pause",
	"frame": {"x":18,"y":2,"w":19,"h":24},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":19,"h":24},
	"sourceSize": {"w":19,"h":24}
},
{
	"filename": "play_btn.png",
        "label": "play",
	"frame": {"x":39,"y":2,"w":20,"h":23},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":20,"h":23},
	"sourceSize": {"w":20,"h":23}
},
{
	"filename": "slider_volume.png",
	"frame": {"x":2,"y":28,"w":20,"h":20},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":20,"h":20},
	"sourceSize": {"w":20,"h":20}
}],
"meta": {
	"app": "http://www.texturepacker.com",
	"version": "1.0",
	"image": "player.atlas.png",
	"format": "RGBA8888",
	"size": {"w":61,"h":50},
	"scale": "1",
	"smartupdate": "$TexturePacker:SmartUpdate:5f46942dc7e79141586fcd0aba3ac722$"
}
}
'; if(isset($_GET['jsonp'])) { echo ')'; }