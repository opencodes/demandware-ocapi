/**
 * 
 * All java script logic for the application.
 * Subject to standard usage terms and conditions
 * The code relies on the jQuery JS library to
 * be also loaded. 
 *    For all details and documentation:
 *    https://github.com/Demandware/Site-Genesis 
 */
// semi-colon to assure functionality upon script concatenation and minification
;
var app = (function (app, $) {
	/**
	 * Application configurations and constants
	 */
	var api = {
		  host : 'http://dev13-shop-diesel.demandware.net',
		  base_url : "/s/DieselUS/dw/shop/v13_5",
		  client_id:'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
		  inventory_id :'inventory-dslna-dslus'
	  };
		
	/**
	 * Call Open Commerce API
	 */
	app.ajaxLogin = function(url){
		console.log('Success');
		$('#checkout-login').submit(function(e){
			e.preventDefault();
			var form = $('#checkout-login');
			$.ajax({
			     type : "POST",
			     dataType : "json",
			     data : form.serialize(),
			     url : url,
			     success: function(data){
			    	 console.log(data);
			     },
			     failure:function(err){
			    	 console.log(err);
			     }
			});
		});
		
	};
	/**
	 * Initialize Application
	 */
	app.init = function(){
		
		app.ajaxLogin('/account/login');
	};
	$(document).ready(function() {
			app.init();
	});
}(window.app = window.app || {}, jQuery));
	