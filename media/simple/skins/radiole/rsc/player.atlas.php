<?php if(isset($_GET['jsonp'])) { echo $_GET['jsonp'].'('; } echo '{"frames": [

{
	"filename": "load_bar",
	"label": "load_bar",
	"frame": {"x":21,"y":13,"w":9,"h":9},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":9,"h":9},
	"sourceSize": {"w":9,"h":9}
},
{
	"filename": "fill_bar",
	"label": "fill_bar",
	"frame": {"x":32,"y":2,"w":9,"h":9},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":9,"h":9},
	"sourceSize": {"w":9,"h":9}
},
{
	"filename": "derBar",
	"label": "derBar",
	"frame": {"x":21,"y":13,"w":9,"h":9},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":9,"h":9},
	"sourceSize": {"w":9,"h":9}
},
{
	"filename": "izqBar",
	"label": "izqBar",
	"frame": {"x":21,"y":2,"w":9,"h":9},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":9,"h":9},
	"sourceSize": {"w":9,"h":9}
},
{
	"filename": "bg_bar",
	"label": "bg_bar",
	"frame": {"x":20,"y":39,"w":4,"h":4},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":4,"h":4},
	"sourceSize": {"w":4,"h":4}
},
{
	"filename": "scrub",
	"label": "scrub",
	"frame": {"x":20,"y":26,"w":24,"h":11},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":24,"h":11},
	"sourceSize": {"w":20,"h":11}
},
{
	"filename": "pause",
	"label": "pause",
	"frame": {"x":2,"y":45,"w":11,"h":14},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":11,"h":14},
	"sourceSize": {"w":11,"h":14}
},
{
	"filename": "play",
	"label": "play",
	"frame": {"x":15,"y":45,"w":11,"h":12},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":11,"h":12},
	"sourceSize": {"w":11,"h":12}
},
{
	"filename": "offvolume",
	"label": "offvolume",	
	"frame": {"x":2,"y":2,"w":17,"h":22},
	"rotated": false,
	"trimmed": true,
	"spriteSourceSize": {"x":1,"y":2,"w":17,"h":22},
	"sourceSize": {"w":19,"h":24}
},
{
	"filename": "onvolume",
	"label": "onvolume",			
	"frame": {"x":2,"y":26,"w":17,"h":16},
	"rotated": true,
	"trimmed": true,
	"spriteSourceSize": {"x":0,"y":4,"w":17,"h":16},
	"sourceSize": {"w":19,"h":24}
}],
"meta": {
	"app": "http://www.texturepacker.com",
	"version": "1.0",
	"image": "player.audio.png",
	"format": "RGBA8888",
	"size": {"w":64,"h":64},
	"scale": "1",
	"smartupdate": "$TexturePacker:SmartUpdate:302ee70d177611d97381dc16a01cf98a$"
}
}
'; if(isset($_GET['jsonp'])) { echo ')'; }