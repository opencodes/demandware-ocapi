/**
 * Checkout Module
 */
var dwocapi = require('../dwocapi');

var checkout = {
		/**
		 * Add to Cart
		 * @param req
		 * @param res
		 * @param next
		 */
		addToCart : function(req,res,next){
			var url = 'basket/this/add';
			var data = {
			  "product_id" : req.param('pid'),
			  "quantity" : req.param('qty'),
			  "inventory_id" : "0815",
			};
			dwocapi.post(url,data,function(err,data1){
				if(!err && data1){
					res.product = data1;
				}else{
					res.products = null;
					next();
 				}
				
 			});
		},
		
};
module.exports = checkout;