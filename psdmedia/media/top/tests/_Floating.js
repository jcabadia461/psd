(function(namespace) {


    function Floating(div_id,_conf) {
        
		var _that = this;
		
		var _activo = false;
		
        var _div;
		var _closable = true;
		var _classname = "mm_floating";
		var _debug = false;
		var _callback_in = function(){};
		var _callback_out = function(){};
		var _onclick = null;
		var _onclose = function(){};
		
		var hasOver = false;
		var over,close;
						
		if(typeof(div_id)=="string"){
			_div = document.getElementById(div_id);
		}else{
			_div = div_id;
		}
				
		var consolelog = function(message){
			if(_debug)
				console.log(message);
		}
		
		if(typeof(_conf.closable)!="undefined")		_closable = _conf.closable;
		if(typeof(_conf.classname)!="undefined")	_classname = _conf.classname;
		if(typeof(_conf.debug)!="undefined")		_debug = _conf.debug;
		if(typeof(_conf.callback_in)!="undefined")	_callback_in = _conf.callback_in;
		if(typeof(_conf.callback_out)!="undefined")	_callback_out = _conf.callback_out;
		if(typeof(_conf.onclick)!="undefined")		_onclick = _conf.onclick;
		if(typeof(_conf.onclose)!="undefined")		_onclose = _conf.onclose;
		
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

			return (
				top >= window.pageYOffset &&
				left >= window.pageXOffset &&
				(top + height) <= (window.pageYOffset + window.innerHeight) &&
				(left + width) <= (window.pageXOffset + window.innerWidth)
			);
		}
		
		var run_out = function(){
			_div.className += " " + _classname;
			_callback_out();
				
			if(hasOver)
				over.style.display = "block";
			if(_closable)
				close.style.display = "block";
		}
		
		var run_in = function(){
			_callback_in();
				
			if(hasOver)
				over.style.display = "none";
			if(_closable)
				close.style.display = "none";
		}
		
		var check_vp = function(){

			_div.className = _div.className.replace(" " + _classname,"");
						
			if(!elementInViewport(_div)){
				run_out();
			}else{
				run_in();
			}			
		}
		
		this.activate = function(act){
			_activo = act;
		}
		
		this.man = function(){
			console.log("Floating usage:");
			console.log("f = new Floating(div_id,conf)");
			console.log("- div_id: id of the div to apply class floating");
			console.log("- conf: conf of the Floating object");
			console.log("	- closable: boolean. Displays close button");
			console.log("	- classname: String. Name of the class to apply to div");
			console.log("	- callback_in: function. Called when div is in viewport");
			console.log("	- callback_out: function. Called when div is not in viewport");
			console.log("	- onclick: function. Called on click over floating div");
			console.log("	- onclose: function. Called on click over the close ✖");
			console.log("	- debug: boolean. Shows debug messages");
		}
		
		this.help = this.man;
		
		this.changeDiv = function(div_id){
			_div.className = _div.className.replace(" " + _classname,"");
			run_in();
			
			if(typeof(div_id)=="string"){
				_div = document.getElementById(div_id);
			}else{
				_div = div_id;
			}
			this.run();
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
				over.style.width = "100%";
				over.style.height = "100%";
				over.style.position = "absolute";
				over.style.top = 0;
				over.style["left"] = 0;
				over.style.display = "none";
				
				over.onclick = _onclick;
				_div.appendChild(over);
			}
			if(_closable){
				close = document.createElement("div");
				close.className = "mm_floating_over_close";
				close.style.position = "absolute";
				close.style.top = "0";
				close.style.right = "0";
				close.style.padding = "10px";
				close.innerHTML = "✖";
				close.style.display = "none";
				
				close.onclick = function(){
					_activo = false;
					_div.className = _div.className.replace(" " + _classname,"");
					run_in();

					_onclose();
				};
				_div.appendChild(close);
			}
		}
    }

    namespace.Floating = Floating;

}(window));