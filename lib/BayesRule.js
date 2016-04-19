/*global*/
'use strict';

/**
 * @class BayesRule
 */
class BayesRule {
	
	constructor () {
	}
	
	static get name () {
		return 'BayesRule';
	}
	
	static posterior (args) {
		let result = args.selected.reduce((prevKey, key, index) => {
			//console.log('prevKey/currKey', prevKey + '/' + key, index);
			let feature1 = args.features.get(prevKey);
			let feature2 = args.features.get(key);
			return feature1 * feature2;
		});
		
		return result;
	}
	
	static joint (args) {
		let post = this.posterior(args);
		let result = post * args.prior;
		return result;
	}
	
	static denominator (args) {
		let result = args.joints.reduce((prevValue, currValue, index) => {
			//console.log('prevValue/currValue', prevValue + '/' + currValue, index);
			return prevValue + currValue;
		});
		
		return result;
	}
	
	static normalize (args) {
		let result = args.numerator / args.denominator;
		return result;
	}
	
	static calculate (args) {
		
		let results = {
			items: new Map()
			, checkSum: 0
		}, joints = [];
		
		// first: calculate joints
		args.items.forEach((item) => {
			let joint = this.joint({
				selected: item.selected
				, features: item.features
				, prior: item.prior
			});
			
			results.items.set(item.name, {
				joint: Number(joint.toFixed(args.decimalPlaces))
			});
			
			joints.push(joint);
		});
		
		// second: calculate denominator
		let denominator = this.denominator({
			joints: joints
		});
		console.log('denominator', denominator);
		
		// third normalize
		results.items.forEach((item) => {
			let score = this.normalize({
				numerator: item.joint
				, denominator: denominator
			});
			
			item.score = Number(score.toFixed(args.decimalPlaces));
			results.checkSum += item.score;
		});
		
		// round checSum to number of decimal palces specified
		results.checkSum = Number(results.checkSum.toFixed(args.decimalPlaces));
		
		return results;		
	}
}

module.exports = BayesRule;
