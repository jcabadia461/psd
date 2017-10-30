<?php if(isset($_GET['jsonp'])) { echo $_GET['jsonp'].'('; } echo '{"frames": [

{
	"filename": "bar_bg_begin.png",
	"frame": {"x":2,"y":2,"w":3,"h":8},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":3,"h":8},
	"sourceSize": {"w":3,"h":8}
},
{
	"filename": "bar_bg_center.png",
	"frame": {"x":7,"y":2,"w":1,"h":9},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":1,"h":9},
	"sourceSize": {"w":1,"h":9}
},
{
	"filename": "bar_bg_end.png",
	"frame": {"x":10,"y":2,"w":3,"h":8},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":3,"h":8},
	"sourceSize": {"w":3,"h":8}
},
{
	"filename": "bar_fg_begin.png",
	"frame": {"x":15,"y":2,"w":3,"h":9},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":3,"h":9},
	"sourceSize": {"w":3,"h":9}
},
{
	"filename": "bar_fg_center.png",
	"frame": {"x":20,"y":2,"w":1,"h":9},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":1,"h":9},
	"sourceSize": {"w":1,"h":9}
},
{
	"filename": "bar_fg_end.png",
	"frame": {"x":23,"y":2,"w":3,"h":9},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":3,"h":9},
	"sourceSize": {"w":3,"h":9}
},
{
	"filename": "max_btn.png",
        "label": "normal",
	"frame": {"x":28,"y":2,"w":38,"h":28},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":38,"h":28},
	"sourceSize": {"w":38,"h":28}
},
{
	"filename": "min_btn.png",
        "label": "fullscreen",
	"frame": {"x":68,"y":2,"w":41,"h":30},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":41,"h":30},
	"sourceSize": {"w":41,"h":30}
},
{
	"filename": "pause_btn.png",
        "label": "pause",
	"frame": {"x":2,"y":34,"w":37,"h":25},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":37,"h":25},
	"sourceSize": {"w":37,"h":25}
},
{
	"filename": "play_btn.png",
        "label": "play",
	"frame": {"x":41,"y":34,"w":37,"h":25},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":37,"h":25},
	"sourceSize": {"w":37,"h":25}
},
{
	"filename": "seek_btn.png",
	"frame": {"x":80,"y":34,"w":18,"h":17},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":18,"h":17},
	"sourceSize": {"w":18,"h":17}
}],
"meta": {
	"app": "http://www.texturepacker.com",
	"version": "1.0",
	"image": "player.atlas.png",
	"format": "RGBA8888",
	"size": {"w":111,"h":61},
	"scale": "1",
	"smartupdate": "$TexturePacker:SmartUpdate:be01d0ed593ba063f85b204be5dfa637$"
}
}
'; if(isset($_GET['jsonp'])) { echo ')'; }