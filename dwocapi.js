var http = require('http');
var config = require('../../config');
var request = require('request');

var dwocapi = {
	/**
	 * Call Open Commerce API
	 * @param url
	 * @param callback
	 */
	get : function(url,callback){
		fulluri = config.api.host+config.api.base_url+url+'&client_id='+config.api.client_id;
		console.log("API URL : "+fulluri);
		console.log('=============================');
		request.get(fulluri, function (error, response, body) {
			  	if (response.statusCode == 200) {
						 callback(error,JSON.parse(body));
				}
		});
	},
	/**
	 * @param url
	 * @param callback
	 */
	post : function(url,callback){
		 fulluri = config.api.host+config.api.base_url+'+'&client_id='+config.api.client_id;
		 console.log("API URL : "+fulluri);
		 console.log('=============================');
		 request.post(fulluri, function (error, response, body) {
				  if (response.statusCode == 200) {
					 callback(error,JSON.parse(body));
				  }
		 });
	}
};
module.exports = dwocapi;
//////////////////////////////////////
dwocapi.get('/categories/root?levels=1',function(err,response){
	console.log(response)
})
/*dwocapi.post('/basket//add',function(err,response){
	console.log(response)
})
*/