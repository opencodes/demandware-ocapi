var http = require('http');
var config = require('../../config');
var request = require('request');

var catalog = {
		/**
		 * Get Product by category
		 */
		getProducts : function(){
			var url = config.api.base_url+'product_search?refine_1=cgid=diesel-man';
			http.request(url,function(res){
				
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
		getCategories : function(req,res,next){
			var url = '/categories/root?levels=1';
			catalog.callapi(url,function(err,data){
				if(!err && data){
					res.result = data;
				}else{
					res.result = null;
				}
				next();
			});
		},
		/**
		 * Call Open Commerce API
		 */
		callapi : function(url,callback){
			fulluri = config.api.host+config.api.base_url+url+'&client_id='+config.api.client_id;
			console.log(fulluri);
			request(fulluri, function (error, response, body) {
				  if (response.statusCode == 200) {
					  callback(error,JSON.parse(body)); 
				  }
			});
		},
		/**
		 * Render
		 */
		render : function(req,res){
			
			res.render('home', { categories: res.result.categories });
		}
};
module.exports = catalog;