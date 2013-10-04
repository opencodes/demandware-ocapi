var http = require('http');
var config = require('../../config');
var request = require('request');

var catalog = {
		getProductById : function(req,res,next){
			var url = '/products/'+req.params.id+'?expand=availability,prices';
			var url2 = '/products/'+req.params.id+'/images?view_type=';
			catalog.callapi(url,function(err,data1){
				if(!err && data1){
					res.product = data1;
					catalog.callapi(url2,function(err,data2){
						if(!err && data2){
							res.product.image_groups = data2.image_groups;
							next();
						}else{
							res.products = null;
							next();
						}
						
					});
				}else{
					res.products = null;
					next();
 				}
				
 			});
		},
		/**
		 * @param product_img
		 * @param products
		 * @returns {___anonymous205_206}
		 */
		mapProduct : function(product_img,products){
			var productsmap = {};
			//Map products
			for(var k in products.hits){
					productsmap[products.hits[k].product_id] = products.hits[k];
			}
			//Map Images
			for(var k in product_img.hits){
			item = product_img.hits[k].product_id;
				if(typeof(productsmap[item])!=='undefined'){
					productsmap[item].image = product_img.hits[k].image;
				}
			}
			
			return productsmap;
		},
		/**
		 * Get Product by category
		 */
		getProducts : function(req,res,next){
			var url = '/product_search/images?refine_1=cgid='+req.params.catalog;
			var url2 = '/product_search/prices?refine_1=cgid='+req.params.catalog;
			catalog.callapi(url2,function(err,data1){
				if(!err && data1){
					res.products = data1;
					catalog.callapi(url,function(err,data2){
						if(!err && data2){
							res.products = catalog.mapProduct(data2,res.products);
							next();
						}else{
							res.products = null;
							next();
						}
						
					});
				}else{
					res.products = null;
					next();
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
					res.cats = data;
		 		}else{
					res.cats = null;
		 		}
		 		next();
		 	});
		},
		/**
		 * Call Open Commerce API
		 */
		callapi : function(url,callback){
 			fulluri = config.api.host+config.api.base_url+url+'&client_id='+config.api.client_id;
			console.log("API URL : "+fulluri);
 			request(fulluri, function (error, response, body) {
 				  if (response.statusCode == 200) {
 					 callback(error,JSON.parse(body));
 				  }
 			});
 		},
 		/**
		 * Render HOME
 		 */
 		render : function(req,res){
 			
			res.render('home', { categories: res.cats.categories });
		},
		/**
		 * Render PLP
		 */
		renderPLP : function(req,res){
			res.render('products', {categories: res.cats.categories,products: res.products});
 		},
 		/**
 		 * render PDP page
 		 * @param req
 		 * @param res
 		 */
		renderPDP : function(req,res){
			res.render('product_detail', {categories: res.cats.categories,product: res.product});
 		}
};
module.exports = catalog;