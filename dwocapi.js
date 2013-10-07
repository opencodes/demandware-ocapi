var request = require('request');
var config = require('./config');

var dwocapi = {
	/**
	 * Call Open Commerce API
	 * @param url
	 * @param callback
	 */
	get : function(urls,options,callback){
		fulluri = config.api.host+config.api.base_url+urls;		
		options.client_id = config.api.client_id;
		i = 0;
		for(var k in options){
				fulluri += (i==0)?'?'+k+'='+options[k]:'&'+k+'='+options[k];
				i++;
		}
		console.log("API URL : "+fulluri);
		console.log('======================================================================');
		
		request({
			  uri: fulluri,
			  form: options,
			  method: "GET"
		}, function (error, response, body) {
			callback(error,JSON.parse(body));
		});
	},
	/**
	 * @param url
	 * @param callback
	 */
	post : function(url,options,callback){
		 fulluri = config.api.host+config.api.base_url+url+'?client_id='+config.api.client_id;
		 console.log("API URL : "+fulluri);
		 console.log('=====================================================================');
		 request({
			  uri: fulluri,
			  headers: {"Content-Type" : "application/json;charset=UTF-8"},
			  method: "POST",
			  json: options
		}, function (error, response, body) {
			
				callback(error,body);
		});
	}
};
module.exports = dwocapi;
//////////////////////////////////////
/*dwocapi.get('/categories/root?levels=1',function(err,response){
	//console.log(response);
});*/
var url = '/basket/this/add';
var data = {
  "product_id" : '8033031934527',
  "quantity" : 1,
  "inventory_id" : config.api.inventory_id,
};
dwocapi.post(url,data,function(err,data1){
	console.log(err);console.log(data1);	
});