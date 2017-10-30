<?php if(isset($_GET['jsonp'])) { echo $_GET['jsonp'].'('; } echo '{"frames": [

{
	"filename": "derBar",
	"label": "derBar",
	"frame": {"x":2,"y":94,"w":9,"h":9},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":9,"h":9},
	"sourceSize": {"w":9,"h":9}
},
{
	"filename": "izqBar",
	"label": "izqBar",
	"frame": {"x":2,"y":83,"w":9,"h":9},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":9,"h":9},
	"sourceSize": {"w":9,"h":9}
},
{
	"filename": "bg_bar",
	"label": "bg_bar",
	"frame": {"x":2,"y":105,"w":4,"h":4},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":4,"h":4},
	"sourceSize": {"w":4,"h":4}
},
{
	"filename": "scrub",
	"label": "scrub",
	"frame": {"x":2,"y":70,"w":16,"h":11},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":16,"h":11},
	"sourceSize": {"w":16,"h":11}
},
{
	"filename": "pause",
	"label": "pause",
	"frame": {"x":33,"y":36,"w":29,"h":32},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":29,"h":32},
	"sourceSize": {"w":29,"h":32}
},
{
	"filename": "play",
	"label": "play",
	"frame": {"x":2,"y":36,"w":29,"h":32},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":29,"h":32},
	"sourceSize": {"w":29,"h":32}
},
{
	"filename": "offvolume",
	"label": "offvolume",
	"frame": {"x":33,"y":2,"w":29,"h":32},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":29,"h":32},
	"sourceSize": {"w":29,"h":32}
},
{
	"filename": "onvolume",
	"label": "onvolume",
	"frame": {"x":2,"y":2,"w":29,"h":32},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":29,"h":32},
	"sourceSize": {"w":29,"h":32}
}],
"meta": {
	"app": "http://www.texturepacker.com",
	"version": "1.0",
	"image": "player.png",
	"format": "RGBA8888",
	"size": {"w":64,"h":128},
	"scale": "1",
	"smartupdate": "$TexturePacker:SmartUpdate:e7433002f807b2eb7656b0f893e02470$"
}
}
'; if(isset($_GET['jsonp'])) { echo ')'; }