/*global*/
'use strict';

let _ = require('underscore');

/**
 * @class Utils
 * @description
 */
class Utils {
	
	constructor() {
	}
	
	static get name() {
		return 'Utils';
	}
	
	static get _(){
		return _;
	}
	
	static checkException(args, prefix, e) {
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
