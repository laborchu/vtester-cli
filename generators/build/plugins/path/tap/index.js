'use strict';
var Path = require('../path');
var should = require('should');
var TapPlugin = module.exports = Path.extend({
	getTemplate:function(config){
        if(config.selector===undefined){
            return ".touch('tap')";
        }
		if (config.selector == "xpath") {
            if(config.canNull===true){
                return `.elementByXPathOrNull("<%= xpath %>").then(function(e){
                    if(e){
                        return e.touch('tap');
                    }
                })`;
            }else{
                return `.elementByXPathOrNull("<%= xpath %>").touch('tap')`;
            }
        } else if (config.selector == "className") {
            if(config.canNull===true){
                return `.elementsByClassName("<%= className %>").then(function(e){
                    if(elements.length><%=index-1%>){
                        return elements[<%=index-1%>].touch('tap');
                    }
                })`;
            }else{
                return `.elementsByClassName("<%= className %>").then(elements=>elements[<%=index-1%>].touch('tap'))`;
            }
        } else if (config.selector == "name") {
            if(config.canNull===true){
                return `.elementByNameOrNullkeycode("<%= name %>").then(function(e){
                    if(e){
                        return e.touch('tap');
                    }
                })`;
            }else{
                return `.elementByName("<%= name %>").touch('tap')`;
            }
        }else if(config.selector == "id") {
            if(config.canNull===true){
                return `.elementsByIdOrNull("<%= id %>").then(function(elements){
                    if(elements.length><%=index-1%>){
                        return elements[<%=index-1%>].touch('tap');
                    }
                })`;
            }else{
                return `.elementsById("<%= id %>").then(elements=>elements[<%=index-1%>].touch('tap'))`;
            }
        }
	},
	buildParams:function(config){
        let result = {index:config.index};
        if(config.selector===undefined){
            return result;
        }
		if (config.selector == "xpath") {
            result.xpath = config.element;
        } else if (config.selector == "className") {
            result.className = config.element;
        } else if (config.selector == "name") {
            result.name = config.element;
        } else if (config.selector == "id") {
            if(config.vtestConfig.platform==="android"){
                result.id = this.getAndroidResId(config,config.element);
            }else{
                result.id = config.element;
            }
        }
        return result;
	},
    checkConfig : function(config){
        if(config.selector){
            config.should.have.property('selector').instanceOf(String).ok();
            if (config.selector !== 'xpath' && config.selector !== 'name' && 
                config.selector !== 'className' && config.selector !== 'id') {
                throw new Error('path.selector should in (xpath|name|className|id)');
            }
        }
        if(config.element){
            config.should.have.property('element').instanceOf(String).ok();
        }
        if(config.canNull!==undefined){
            config.canNull.should.instanceOf(Boolean);
        }
        if(config.index!==undefined){
            config.index.should.instanceOf(Number);
        }else{
            config.index = 1;
        }
        TapPlugin.__super__.checkConfig(config);
    }
});