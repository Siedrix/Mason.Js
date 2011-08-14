(function(window){
	function Mason(config){
		var data = {},
		el       = {},
		mapper   = {},
		template = {};

		data.config = config;

		function stringMapper(key,item){
			if(mapper[key]){
				var path = mapper[key];
				var attrMatch = path.match(/\[([1-9A-Za-z=\/{:}]+)/);

				if(attrMatch && attrMatch[1]){
					var attr = attrMatch[1].split('=');

					if(attr.length > 1){
						var value = attr[1];
						value = value.replace(/{:(\w+)}/, function($0, $1){
						    return data.d[$1];
						});

						path = path.replace(/\[([#1-9A-Za-z=\/{:}]+)]/,'');

						$(path).attr(attr[0],value);
					}else{
						path = path.replace(/\[([#1-9A-Za-z=\/{:}]+)]/,'');

						$(path).attr(attr[0],item);
					}
				}else{
					if($(path).html() != data.d[key]){
						el.find(path).html(data.d[key]);
					}
				}

			}else{
				if($('#'+key).html() != item){
					el.find('#'+key).html(item);
				}
			}
		}

		template.fetchTemplate = function(templateUrl){
			$.get(templateUrl,function(t){
				data.template = t;
				data.templateReady = true;
				template.render();
			});

			return this;
		};

		template.render    = function(){
			if(el && el.html() == ''){
				el.html(data.template);
			}

			var renderData = $.extend({},mapper,true);
			$.extend(renderData,data.d,true);

			_.each(renderData, function(item,key){

				if(_.isString(item)){
					stringMapper(key,item);
				}else if(_.isArray(item)){
					var parent = $('#'+key,el);

					$('#'+key,el).html('');

					var itemHTML = $('#'+key,el).clone();
					_.each(item,function(element,i){
					 	parent.append(itemHTML.clone().html(element));
					});
				}
			});

			return this;
		};

		template.setTarget = function(target){
			data.target = target;
			el = $(target);
			return this;
		};

		template.setData   = function(d){
			data.d = d;

			if(data.templateReady){
				template.render();
			}
			return this;
		};

		template.mapData   = function(map){
			_.each(map,function(item,key){
				mapper[key] = item
			});

			return this;
		};

		template.sync      = function(){
			return this;
		};

		//Getters Not relevants
		template.getData = function(){
			return data;
		}

		template.getMap = function(){
			return mapper;
		}		

		template.getConfig = function(){
			return data.config;
		}

		if(config.template){ template.fetchTemplate (config.template); }
		if(config.data)    { template.setData       (config.data);     }
		if(config.target)  { template.setTarget     (config.target);   }

		return template;
	}

	window.Mason = Mason;
})(window);
