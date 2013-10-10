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
			  "quantity" : parseInt(req.body.qty),
			  "inventory_id" : config.api.inventory_id,
			};
			dwocapi.post(url,data,function(err,data1){
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
			res.render('cart', {categories: res.cats.categories,cart: req.session.cart});
		},
		/**
		 * Render Checkout Page
		 * @param req
		 * @param res
		 */
		renderCHECKOUT_SHIPPING : function(req,res){
			res.render('checkout', {categories: res.cats.categories,cart: req.session.cart});
		}
		
};
module.exports = checkout;
////////////////////////////////////////
