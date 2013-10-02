var middleware = {
		
		/**
		 * Get Product by category
		 */
		getProducts : function(){
			var url = 'product_search?refine_1=cgid=diesel-man';
			app.callapi(url,function(res){
				
				if(res.status == true){
					var html = "";
					for(var k in res.items.categories){
						item = res.items.categories[k];
						html += '<li><a href="'+item.id+'">'+item.name+'</a></li>';
					}
					console.log(html);
					$('#main-category').html(html);
				}
			});
		},
		/**
		 * Get Categories
		 */
		getCategories : function(){
			var url = 'shop/v13_5/categories/root?levels=1';
				app.callapi(url,function(res){
					
					if(res.status == true){
						var html = "";
						for(var k in res.items.categories){
							item = res.items.categories[k];
							html += '<li><a href="'+item.id+'">'+item.name+'</a></li>';
						}
						console.log(html);
						$('#main-category').html(html);
					};
				});
		},
		/**
		 * Call Open Commerce API
		 */
		callapi : function(url,callback){
			$.ajax({
			     type : "GET",
			     dataType : "jsonp",
			     data : {client_id:app.config.client_id},
			     url : app.config.base_url+url,
			     success: function(data){
			    	 
			           callback({'status':true,items:data});
			     },
			     failure:function(){
			    	   callback({'status':false,items:null});
			     }
			});
		}

};
module.exports = middleware;