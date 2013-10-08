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
			  "product_id" : req.body.pid,
			  "quantity" : req.body.qty,
			  "inventory_id" : config.api.inventory_id,
			};
			console.log(data);
			dwocapi.post(url,data,function(err,data1){
				console.log(data1);
				res.cart = data1;
				req.session.cart = data1;
				res.redirect('/cart');
			});
		},
		/**
		 * Show Cart
		 * @param req
		 * @param res
		 * @param next
		 */
		showCart : function(req,res,next){
			url = '/basket/this';
			res.cart = req.session.cart;
			next();
		},
		/**
		 * Render Cart
		 * @param req
		 * @param res
		 */
		renderCART : function(req,res){
			console.log(req.session);
			console.log('==========');
			res.render('cart', {categories: res.cats.categories,cart: req.session.cart});
		}
		
};
module.exports = checkout;
////////////////////////////////////////
