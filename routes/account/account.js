/**
 * Checkout Module
 */
var config = require('../../config');
var dwocapi = require('../../dwocapi');

var account = {
	/**
	 * Account Login
	 * @param req
	 * @param res
	 * @param next
	 */
	login : function(req,res,next){
		dwocapi.post('/account/login',{
			"username":req.param.username,
			"password":req.param.password
		},function(err,data){
			console.log(err);console.log(data);
			req.session.login  = {status:true};
			res.json({ user: req.param.username });
		});
	}		
		
};
module.exports = account;
////////////////////////////////////////
