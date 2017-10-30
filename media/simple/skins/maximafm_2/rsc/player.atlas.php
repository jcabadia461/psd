<?php if(isset($_GET['jsonp'])) { echo $_GET['jsonp'].'('; } echo '{"frames": [

{
	"filename": "ampliar",
	"label": "ampliar",
	"frame": {"x":35,"y":21,"w":24,"h":17},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":24,"h":17},
	"sourceSize": {"w":24,"h":17}
},
{
	"filename": "load_bar",
	"label": "load_bar",
	"frame": {"x":46,"y":61,"w":9,"h":9},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":9,"h":9},
	"sourceSize": {"w":9,"h":9}
},
{
	"filename": "audio_right",
	"label": "audio_right",
	"frame": {"x":35,"y":59,"w":9,"h":9},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":9,"h":9},
	"sourceSize": {"w":9,"h":9}
},
{
	"filename": "progress_bar",
	"label": "progress_bar",
	"frame": {"x":54,"y":55,"w":4,"h":4},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":4,"h":4},
	"sourceSize": {"w":4,"h":4}
},
{
	"filename": "audio_scrub",
	"label": "audio_scrub",
	"frame": {"x":46,"y":72,"w":18,"h":13},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":18,"h":13},
	"sourceSize": {"w":18,"h":13}
},
{
	"filename": "progress_scrub",
	"label": "progress_scrub",
	"frame": {"x":35,"y":40,"w":17,"h":17},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":17,"h":17},
	"sourceSize": {"w":17,"h":17}
},
{
	"filename": "offvolume",
	"label": "offvolume",
	"frame": {"x":2,"y":83,"w":31,"h":25},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":31,"h":25},
	"sourceSize": {"w":31,"h":25}
},
{
	"filename": "onvolume",
	"label": "onvolume",
	"frame": {"x":2,"y":56,"w":31,"h":25},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":31,"h":25},
	"sourceSize": {"w":31,"h":25}
},
{
	"filename": "pause",
	"label": "pause",
	"frame": {"x":2,"y":29,"w":31,"h":25},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":31,"h":25},
	"sourceSize": {"w":31,"h":25}
},
{
	"filename": "play",
	"label": "play",
	"frame": {"x":2,"y":2,"w":31,"h":25},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":31,"h":25},
	"sourceSize": {"w":31,"h":25}
},
{
	"filename": "reducir",
	"label": "reducir",
	"frame": {"x":35,"y":2,"w":24,"h":17},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":24,"h":17},
	"sourceSize": {"w":24,"h":17}
}],
"meta": {
	"app": "http://www.texturepacker.com",
	"version": "1.0",
	"image": "player.video.png",
	"format": "RGBA8888",
	"size": {"w":64,"h":128},
	"scale": "1",
	"smartupdate": "$TexturePacker:SmartUpdate:e2ef2e582773853be384a1b74eeb7410$"
}
}
'; if(isset($_GET['jsonp'])) { echo ')'; }