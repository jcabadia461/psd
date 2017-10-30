(function(namespace) {


    function Floating(div_id,_conf,div_to_move,strict) {
        
		var _that = this;
		
		var _activo = false;
		
        var _check;
		var _move;
		var _closable = true;
		var _classname = "mm_floating";
		var _classname_check = "mm_floating_check";
		var _debug = false;
		var _callback_max = function(){};
		var _callback_min = function(){};
		var _onclick = null;
		var _onclose = function(){};
		var _strict = strict|false;
		
		var hasOver = false;
		var over,close;
		
		var init_height = 0;
						
		if(typeof(div_id)=="string"){
			_check = document.getElementById(div_id);
		}else{
			_check = div_id;
		}
		
		init_height = _check.offsetHeight;
		
		if(div_to_move==null){
			if(typeof(div_id)=="string"){
				_move = document.getElementById(div_id);
			}else{
				_move = div_id;
			}
		}else{
			if(typeof(div_to_move)=="string"){
				_move = document.getElementById(div_to_move);
			}else{
				_move = div_to_move;
			}
		}
				
		var consolelog = function(message){
			if(_debug)
				console.log(message);
		}
		
		if(typeof(_conf.closable)!="undefined")			_closable = _conf.closable;
		if(typeof(_conf.classname)!="undefined")		_classname = _conf.classname;
		if(typeof(_conf.classname_check)!="undefined")	_classname_check = _conf._classname_check;
		if(typeof(_conf.debug)!="undefined")			_debug = _conf.debug;
		if(typeof(_conf.callback_max)!="undefined")		_callback_max = _conf.callback_max;
		if(typeof(_conf.callback_min)!="undefined")		_callback_min = _conf.callback_min;
		if(typeof(_conf.onclick)!="undefined")			_onclick = _conf.onclick;
		if(typeof(_conf.onclose)!="undefined")			_onclose = _conf.onclose;
		
		var elementInViewport = function(el){
			var top = el.offsetTop;
			var left = el.offsetLeft;
			var width = el.offsetWidth;
			var height = el.offsetHeight;

			//console.log(top,left,width,height);

			while(el.offsetParent) {
				el = el.offsetParent;
				top += el.offsetTop;
				left += el.offsetLeft;
			}

			if(_strict){
				return (
				top >= window.pageYOffset &&
				left >= window.pageXOffset &&
				(top + height) <= (window.pageYOffset + window.innerHeight) &&
				(left + width) <= (window.pageXOffset + window.innerWidth));

			}else{
				return (
				(top+height) >= window.pageYOffset &&
				left >= window.pageXOffset &&
				top <= (window.pageYOffset + window.innerHeight) &&
				(left + width) <= (window.pageXOffset + window.innerWidth));
			}
		}
		
		var run_min = function(){
			//_check.style.height = 0;
			//_check.style.border = "1px solid red";
			_check.style.paddingTop = _move.style.paddingTop;
			_check.className = _classname_check
			
			consolelog("min");
			
			_move.className = _move.className.replace(" mm_back_floating","");
			_move.className += " " + _classname;
			_callback_min();
				
			if(hasOver)
				over.style.display = "block";
			if(_closable)
				close.style.display = "block";
		}
		
		var run_max = function(){
			
			consolelog("max");
			
			_move.className = _move.className.replace(" " + _classname," mm_back_floating");
			
			//_check.style.height = init_height + "px";
			//_check.style.border = "none";
			//_check.style.paddingTop = 0;
			_check.style.paddingTop = "";
			_check.className = _check.className.replace(_classname_check,"");
			
			_callback_max();
				
			if(hasOver)
				over.style.display = "none";
			if(_closable)
				close.style.display = "none";
		}
		
		var check_vp = function(){
	
			var isFloating = false;
		
			if(_move.className.indexOf(_classname)>0){
				isFloating = true;
			}
						
			if(!elementInViewport(_check)){
				if(!isFloating){
					run_min();
				}
			}else{
				if(isFloating){
					run_max();
				}
			}			
		}
		
		this.activate = function(act){
			_activo = act;
		}
		
		this.man = function(){
			console.log("Floating usage:");
			console.log("f = new Floating(div_id,conf,div_to_move,strict)");
			console.log("- div_id: id of the div to check if is in viewport");
			console.log("- conf: conf of the Floating object");
			console.log("	- closable: boolean. Displays close button");
			console.log("	- classname: String. Name of the class to apply to div");
			console.log("	- callback_max: function. Called when div is in viewport");
			console.log("	- callback_min: function. Called when div is not in viewport");
			console.log("	- onclick: function. Called on click over floating div");
			console.log("	- onclose: function. Called on click over the close ✖");
			console.log("	- debug: boolean. Shows debug messages");
			console.log("- div_to_move: id of the div to apply floating class. If null, div_id");
			console.log("- strict: true/false. When true effect applied when all div is in/out the viewport");
		}
		
		this.help = this.man;
		
		this.changeDiv = function(div_id){
			_move.className = _move.className.replace(" " + _classname,"");
			run_max();
			
			if(typeof(div_id)=="string"){
				_move = document.getElementById(div_id);
			}else{
				_move = div_id;
			}
			this.run();
		}
		
		this.fullscreen = function(){
			if(_move.className.indexOf("mm_floating_fullscreen")>0){
				_move.className = _move.className.replace(/mm_floating_fullscreen/g,"");
			}else{
				_move.className += " mm_floating_fullscreen";
			}
		}
		
		this.run = function(act){
			if(act!=null)
				_activo = act;
			
			var _preonscroll = document.body.onscroll;
			var _onscroll = function(){
				consolelog("scroll");
				
				if(_activo)
					check_vp();
			};
			
			document.body.onscroll = _onscroll;
			
			if(typeof(_onclick)=="function"){
				hasOver = true;
				
				over = document.createElement("div");
				over.className = "mm_floating_over";
				/*over.style.width = "100%";
				over.style.height = "100%";
				over.style.position = "absolute";
				over.style.top = 0;
				over.style["left"] = 0;*/
				over.style.display = "none";
				
				over.onclick = _onclick;
				_move.appendChild(over);
			}
			if(_closable){
				close = document.createElement("div");
				close.className = "mm_floating_over_close";
				/*close.style.position = "absolute";
				close.style.top = "0";
				close.style.right = "0";
				close.style.padding = "10px";
				close.style.zIndex = "1000";
				close.innerHTML = "✖";*/
				close.style.display = "none";
				
				
				close.onclick = function(){
					_activo = false;
					_move.className = _move.className.replace(" " + _classname,"");
					run_max();

					_onclose();
				};
				_move.appendChild(close);
			}
		}
    }

    namespace.Floating = Floating;

}(window));