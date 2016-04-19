/*global*/
'use strict';

let _ = require('underscore');

let _moduleName = 'Utils';

/**
 * @class Utils
 * @description
 */
class Utils {
	
	constructor(){
	}
	
	static get moduleName(){
		return _moduleName;
	}
	
	static get _(){
		return _;
	}
	
	static checkException(args, prefix, e){
		let errMsg = e && e.stack ? e.stack.split('\n') : e;
		
		if (args && args.logger) {
			args.logger.error(prefix + ' EXCEPTION', errMsg);
		} else {
			console.log(prefix + ' EXCEPTION', errMsg);
		}
		
		return errMsg;	
	}
}

module.exports = Utils;
