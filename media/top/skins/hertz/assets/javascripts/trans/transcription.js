
var transcripcion;
transcripcion.prototype = new emic.top.ui.Transcription();
alert(2);
transcripcion = function(cont,url,type){

	this.createLineas = function(){
		if(type==0){
			_texto = this.frases;
			_back.className = "transition";
			_back.style.textAlign = "left";
		}else{
			_texto = this.palabras;
			_back.className = "transition";
			_back.style.textAlign = "center";
		}
		
		console.log("AAAAAAAA");
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
}
