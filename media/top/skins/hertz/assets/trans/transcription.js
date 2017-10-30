transcripcion = function(cont,url,type){

	var _that = this;

	this.palabras = [];
	this.frases = [];
	this.spans = [];
	
	var _usespans = false;
	var _data;
	
	var _enabled = true;

	//función para cargar el JSON
	var getJSON = function(url, successHandler, errorHandler) {
		var xhr = typeof XMLHttpRequest != 'undefined'
			? new XMLHttpRequest()
			: new ActiveXObject('Microsoft.XMLHTTP');
		xhr.open('get', url, true);
		xhr.onreadystatechange = function() {
			var status;
			var data;
			// https://xhr.spec.whatwg.org/#dom-xmlhttprequest-readystate
			if (xhr.readyState == 4) { // `DONE`
				status = xhr.status;
				if (status == 200) {
					data = JSON.parse(xhr.responseText);
					successHandler && successHandler(data);
				} else {
					errorHandler && errorHandler(status);
				}
			}
		};
		xhr.send();
	};
	
	getJSON(url,
		function(data) {
			_that.onDataLoaded(data);
		}
		,
		function(){
			console.log("Error leyendo datos");
		});

	var _cont = cont;
	
	var _index = 0;
	var _lineas = [];

	var _type = type;
	
	var _back = document.createElement("ul");
	_back.style.position = "absolute";
	_back.style.top = "0";
	_back.className = "mm_back";
	
	_cont.innerHTML = "";
	_cont.appendChild(_back);

	this.onDataLoaded = function(data){
	
		_data = data;
	
		//gestión de frases del SRT
		function strip(s) {
			if(typeof(s)!="undefined")
				return s.replace(/^\s+|\s+$/g,"");
			else
				return "";
		}
		
		_srt = data['data'][0]["srt"];
		
		if(_srt==null){
			_enabled = false;
			return "";
		}

		srt = _srt.replace(/\r\n|\r|\n/g, '\n');
		srt = strip(srt);
		
		var srt_ = srt.replace('\n\n\n','\n\n').split('\n\n');
		var subtitles = [];
		
		for(jj=0;jj<srt_.length;jj++) {
			var s = jj;
			
			st = srt_[s].split('\n');

			if(st.length >=2) {
				n = st[0];
				i = strip(st[1].split(' --> ')[0]);
				o = strip(st[1].split(' --> ')[1]);
				t = st[2];

				if(st.length > 2) {
					for(j=3; j<st.length;j++)
					t += '\n'+st[j];
				}
				
				subtitles[jj] = {};
				subtitles[jj].number = n;
				subtitles[jj].start = i;
				subtitles[jj].end = o;
				subtitles[jj].text = t;
				
				//convertimos en millis
				var mstart0 = i.split(",");
				var mstart1 = mstart0[0].split(":");
				var mstartmillis = parseInt(mstart0[1]) + parseInt(mstart1[2])*1000 + parseInt(mstart1[1])*1000*60 + parseInt(mstart1[0])*1000*60*60;
				var mend0 = o.split(",");
				var mend1 = mend0[0].split(":");
				var mendmillis = parseInt(mend0[1]) + parseInt(mend1[2])*1000 + parseInt(mend1[1])*1000*60 + parseInt(mend1[0])*1000*60*60;
				
				subtitles[jj].startm = mstartmillis;
				subtitles[jj].endm = mendmillis;
			}
		}

		this.frases = subtitles;
		
		//gestión de palabras

		var subtitlesw = [];	
		
		for(var jj in data['data'][0]['transcription']['wordlist']){
			var _palabra = data['data'][0]['transcription']['wordlist'][jj];
			
			subtitlesw[jj] = {};
			subtitlesw[jj].number = jj;
			subtitlesw[jj].start = "";
			subtitlesw[jj].end = "";
			subtitlesw[jj].text = _palabra['content'];
			subtitlesw[jj].startm = parseFloat(_palabra["stime"])*1000;
			subtitlesw[jj].endm = parseFloat(_palabra["stime"])*1000 + parseFloat(_palabra["dur"]*1000);
		}
	
		this.palabras = subtitlesw;
		
		this.createLineas();
	}
	
	this.generateSpans = function(container,mediamodule){
		document.getElementById(container).innerHTML = "";
	
		for(var jj in _data['data'][0]['transcription']['wordlist']){
			var _palabra = _data['data'][0]['transcription']['wordlist'][jj];

			var span = document.createElement("span");
			span.innerHTML = " " + _palabra['content'];
			span.style.cursor = "pointer";
			
			(function(pal){
			span.onclick = function(){
				for(var i in _that.spans){
					_that.spans[i].style.color = "black";
				}
				//this.style.color = "white";

				mediamodule.seek(pal["stime"]);
			};
			})(_palabra);
			
			document.getElementById(container).appendChild(span);
			
			this.spans[this.spans.length] = span;
		}
		
		_usespans = true;
	}
	
	this.createLineas = function(){
		if(type==0){
			_texto = this.frases;
			_back.className = "transition";
		}else{
			_texto = this.palabras;
			_back.className = "transition center";
		}
		
		_back.innerHTML = "";
		
		_lineas = [];
		
		for(var i in _texto){
			if(_texto[i]['text']!=undefined){
				var linea = document.createElement("li");
				var lineaspan = document.createElement("span");
				lineaspan.innerHTML = _texto[i]['text'];
				
				linea.appendChild(lineaspan);
				
				//linea.className = "mm_linea";

				_lineas[_lineas.length] = linea;

				_back.appendChild(linea);
			}
		}
		
		this.getIndex(10);
		
		var event = new CustomEvent('ready',{});
		_cont.dispatchEvent(event);
	}
	
	this.addEventListener = function(type,callback){
		_cont.addEventListener(type,callback);
	}
	
	this.setType = function(newtype){
		type = newtype;
		this.createLineas();
	}
	
	this.getIndex = function(time){
		if(!_enabled)
			return;
			
		for(var i in _texto){
			if((_texto[i]['startm']<time)&&(_texto[i]['endm']>time)){
				_index = i;
				this.paint();
			}
		}
	}
	
	this.updatespans = function(){
		if(type==1){
			for(var i in this.spans){
				this.spans[i].style.color = "black";
			}
			//this.spans[_index].style.color = "white";
		}else{
			for(var i in this.spans){
				this.spans[i].style.color = "black";
			}
		}
	}
	
	this.setEnabled = function(enabled){
		if(enabled)
			_cont.style.display = "block";
		else
			_cont.style.display = "none";
	}
	
	this.paint = function(){
		if(!_enabled)
			return;
	
		if(_cont.offsetWidth<600){
			if(type==0)
				this.setType(1);
		}else{
			if(type==1)
				this.setType(0);
		}
	
		if(_usespans)
			this.updatespans();
	
		var p = _lineas[_index];
		var p_prev = _index>0 ? _lineas[_index-1] : _lineas[_index];
		//var p_post = _lineas[_index+1];
		var p_post = _index<_lineas.length-1 ? _lineas[parseInt(_index)+1] : _lineas[length-1];

		for(i in _lineas){
			_lineas[i].className = "";
		}
		p_prev.className = "anterior";
		p_post.className = "siguiente";
		p.className = "activo";
		
		var cont_height = _cont.offsetHeight;
		var back_height = _back.offsetHeight;
		var p_height = p.offsetHeight;
		var p_top = p.offsetTop;
			
		_back.style.top = - p_top + cont_height/2 - p_height/2;
	}
	
	return this;
}
