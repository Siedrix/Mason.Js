(function(window){
	function Mason(config){
		var data = {},
		template = {};

		data.config = config;

		template.fetchTemplate = function(templateUrl){
			$.get(templateUrl,function(t){
				data.template = t;
				data.templateReady = true;
				console.log('This is the template object after fetchind the template',t);
				template.render();
			});

			return this;
		};

		template.render    = function(){
			if($(data.target).html() == ''){
				$(data.target).html(data.template);
			}

			_.each(data.d, function(item,key){
				console.log(key,':',item);

				if(_.isString(item)){
					$('#'+key).html(item);	
				}else if(_.isArray(item)){
					var el = $('#'+key).clone();
					var parent = $('#'+key);

					$('#'+key).html('');

					_.each(item,function(element,i){
					 	parent.append(el.clone().html(element));
					});
				}
			});
			console.log('Rendering',data);

			return this;
		};

		template.setTarget = function(target){
			data.target = target;
			return this;
		};

		template.setData   = function(d){
			data.d = d;

			if(data.templateReady){
				template.render();
			}
			return this;
		};

		template.mapData   = function(){
			console.log('Moddifing mapping of data');
			return this;
		};

		template.sync      = function(){
			console.log('Fetching Template');
			return this;
		};

		//Getters Not relevants
		template.getData = function(){
			return data;
		}

		template.getConfig = function(){
			return data.config;
		}

		if(config.template){ template.fetchTemplate (config.template); }
		if(config.data)    { template.setData       (config.data);  }
		if(config.target)  { template.setTarget     (config.target);}

		return template;
	}

	window.Mason = Mason;
})(window);
