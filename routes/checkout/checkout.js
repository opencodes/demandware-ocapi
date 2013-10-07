/**
 * Checkout Module
 */
var config = require('../../config');
var dwocapi = require('../../dwocapi');

var checkout = {
		/**
		 * Add to Cart
		 * @param req
		 * @param res
		 * @param next
		 */
		addToCart : function(req,res,next){
			var url = '/basket/this/add';
			var data = {
			  "product_id" : '8033031934527',
			  "quantity" : 1,
			  "inventory_id" : config.api.inventory_id,
			};
			dwocapi.post(url,data,function(err,data1){
				res.cart = data1;
				req.session = {cart:JSON.parse(data1)};
				res.redirect('/cart');
			});
			/*dwocapi.post(url,data,function(err,data1){
				if(!err && data1){
					res.cart = data1;console.log(res.cart);
					req.session = {cart:data1}; console.log(req.session);
					res.redirect('/cart');
				}else{
					res.cart = null;
					res.redirect('/cart');
 				}
				
 			});*/
		},
		/**
		 * Show Cart
		 * @param req
		 * @param res
		 * @param next
		 */
		showCart : function(req,res,next){
			var url = '/basket/this';
			console.log(req.session);
			res.cart = req.session.cart;
			next();
		},
		/**
		 * Render Cart
		 * @param req
		 * @param res
		 */
		renderCART : function(req,res){
			res.render('cart', {categories: res.cats.categories,cart: res.cart});
		}
		
};
module.exports = checkout;
////////////////////////////////////////
