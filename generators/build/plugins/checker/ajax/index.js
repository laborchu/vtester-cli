'use strict';
var Checker = require('../checker');
module.exports = Checker.extend({
	getTemplate:function(config){
		return '.elementByXPathOrNull("//div[contains(@class, \'ajax-result\')]/div[@data-url=\'<%= url %>\'][last()]")\
		.getAttribute("data-res")\
		.then(function(element) {\
			handler.<%= doer %>(element)\
		})';
	},
	buildParams:function(config){
		return { 'url': config.url, 'doer': config.doer};
	}
});