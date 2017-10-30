(function(namespace){


	function playListTpl(that){

		this.setPlayListContainer = function(id){}
		this.getPlayListContainer = function(){return true;}
		this.getItemsContainer = function(){}

		this.addItem = function(dataItem){
			item_container ={};

			item_container.noSelected = function(){
				item_container.selected = false;
			}
			item_container.setSelected = function(){
				item_container.selected = true;
			}
			item_container.setIconPlay = function(){}
			item_container.setIconPause = function(){}

			return item_container;
		}

		this.doPostCreateTpl = function(){
		}
	}

	if(typeof namespace.skins == 'undefined'){
		namespace.skins = {};
	}
	namespace.skins.vacia = playListTpl;

}(psd));

