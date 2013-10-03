"use strict";
var util = require('util');
var config = require('../config');
var catalog = require('./catalog/catalog');

module.exports = function(app){
	app.get('/', catalog.getCategories, catalog.render);
	app.get('/cat/:catalog',catalog.getCategories, catalog.getProducts, catalog.renderPLP);
};
