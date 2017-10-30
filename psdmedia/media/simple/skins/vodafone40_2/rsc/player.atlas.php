<?php if(isset($_GET['jsonp'])) { echo $_GET['jsonp'].'('; } echo '{"frames": [

{
	"filename": "background.png",
	"frame": {"x":2,"y":2,"w":300,"h":25},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":300,"h":25},
	"sourceSize": {"w":300,"h":25}
},
{
	"filename": "bar_bg_center.png",
	"frame": {"x":2,"y":29,"w":95,"h":6},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":95,"h":6},
	"sourceSize": {"w":95,"h":6}
},
{
	"filename": "bar_bg_end.png",
	"frame": {"x":99,"y":29,"w":3,"h":6},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":3,"h":6},
	"sourceSize": {"w":3,"h":6}
},
{
	"filename": "bar_fg_begin.png",
	"frame": {"x":104,"y":29,"w":3,"h":6},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":3,"h":6},
	"sourceSize": {"w":3,"h":6}
},
{
	"filename": "bar_fg_center.png",
	"frame": {"x":109,"y":29,"w":95,"h":6},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":95,"h":6},
	"sourceSize": {"w":95,"h":6}
},
{
	"filename": "mute_off.png",
	"label": "muteOff",
	"frame": {"x":206,"y":29,"w":20,"h":19},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":20,"h":19},
	"sourceSize": {"w":20,"h":19}
},
{
	"filename": "mute_on.png",
	"label": "muteOn",
	"frame": {"x":228,"y":29,"w":20,"h":19},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":20,"h":19},
	"sourceSize": {"w":20,"h":19}
},
{
	"filename": "pause_btn.png",
	"label": "pause",
	"frame": {"x":250,"y":29,"w":13,"h":19},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":13,"h":19},
	"sourceSize": {"w":13,"h":19}
},
{
	"filename": "play_btn.png",
	"label": "play",
	"frame": {"x":265,"y":29,"w":15,"h":18},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":15,"h":18},
	"sourceSize": {"w":15,"h":18}
},
{
	"filename": "radio_icon.png",
	"frame": {"x":282,"y":29,"w":26,"h":21},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":26,"h":21},
	"sourceSize": {"w":26,"h":21}
},
{
	"filename": "slider_volume.png",
	"frame": {"x":310,"y":29,"w":16,"h":16},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":16,"h":16},
	"sourceSize": {"w":16,"h":16}
}],
"meta": {
	"app": "http://www.texturepacker.com",
	"version": "1.0",
	"image": "player.atlas.png",
	"format": "RGBA8888",
	"size": {"w":328,"h":52},
	"scale": "1",
	"smartupdate": "$TexturePacker:SmartUpdate:e79b7f3d341aeba9d6389d4a6ad24d1e$"
}
}
'; if(isset($_GET['jsonp'])) { echo ')'; }