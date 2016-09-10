/*global*/
'use strict';

/**
 * @class BayesRule
 */
class BayesRule {
	
	constructor () {
		throw Error(BayesRule.name + ': ERROR: this class contains only static methods and should not be instantiated.');
	}
	
	static get name () {
		return 'BayesRule';
	}
	
	static posterior (args) {
		const result = args.selected.reduce((prevKey, key) => { // reduce also has a 3rd parameter called index, not used here
			//console.log('prevKey/currKey', prevKey + '/' + key);
			const feature1 = args.features.get(prevKey)
				, feature2 = args.features.get(key);
			return feature1 * feature2;
		});
		
		return result;
	}
	
	static joint (args) {
		const post = this.posterior(args)
			, result = post * args.prior;
		return result;
	}
	
	static denominator (args) {
		const result = args.joints.reduce((prevValue, currValue) => { // reduce also has a 3rd parameter called index, not used here
			//console.log('prevValue/currValue', prevValue + '/' + currValue, index);
			return prevValue + currValue;
		});
		
		return result;
	}
	
	static normalize (args) {
		const result = args.numerator / args.denominator;
		return result;
	}
	
	static calculate (args) {
		
		const results = {
			items: new Map()
			, checkSum: 0
		}, joints = [];
		
		// first: calculate joints
		args.items.forEach((item) => {
			const joint = this.joint({
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
		const denominator = this.denominator({
			joints: joints
		});
		console.log('denominator', denominator);
		
		// third normalize
		results.items.forEach((item) => {
			const score = this.normalize({
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
