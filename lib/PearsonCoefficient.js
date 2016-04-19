/*global*/
'use strict';

/**
 * @class PearsonCoefficient
 */
class PearsonCoefficient {
	
	constructor () {
	}
	
	static get name () {
		return 'PearsonCoefficient';
	}
	
	static simpleSum (arr) {
		let result = 0;
		for (let i = arr.length; i--;){
			//console.log('simpleSum', result, arr[i]);
			result += arr[i];
		}
		return result;
	}
	
	static squareSum (arr) {
		let pow = Math.pow;
		let result = 0;
		for (let i = arr.length; i--;){
			//console.log('squareSum', result, arr[i]);
			result += pow(arr[i], 2);
		}
		//console.log('squareSum result', result);
		return result;
	}
	
	static sumOfProducts (x, y) {
		let result = 0;
		for (let i = x.length; i--;){
			//console.log('sumOfProducts', result, x[i], y[i]);
			result += (x[i] * y[i]);
		}
		return result;
	}
	
	static calculateNumerator (sumProd, sum1, sum2, n) {
		//console.log('calculateNumerator', {sumProd:sumProd, sum1:sum1, sum2:sum2, n:n});
		let result = sumProd - (sum1 * sum2 / n);
		return result;
	}
	
	static calculateDenominator (sum1Sq, sum2Sq, sum1, sum2, n) {
		//console.log('calculateDenominator: arguments', {sum1Sq:sum1Sq, sum2Sq:sum2Sq, sum1:sum1, sum2:sum2, n:n});
		
		let result = Math.sqrt(
			(sum1Sq - (Math.pow(sum1, 2) / n))
			* 
			(sum2Sq - (Math.pow(sum2, 2) / n))
		);
		return result;
	}
	
	static calculate (x, y) {
		let n = x.length;
		let vals = [];
		
		// Simple sums
		let sum1 = this.simpleSum(x);
		let sum2 = this.simpleSum(y);
		//console.log('simpleSums', sum1, sum2);
	
		// Sum up the squares
		let sum1Sq = this.squareSum(x);
		let sum2Sq = this.squareSum(y);
		//console.log('squareSums', sum1Sq, sum2Sq);
		
		// Sum up the products
		let sumProd = this.sumOfProducts(x, y);
		//console.log('sumOfProducts', sumProd);
		
		// Calculate Pearson Score
		let num = this.calculateNumerator(sumProd, sum1, sum2, n);
		let den = this.calculateDenominator(sum1Sq, sum2Sq, sum1, sum2, n);
		//console.log('num / den', num, den);
		
		if (den === 0){
			return 0;
		} else {
			return num / den;
		}
	}
}

module.exports = PearsonCoefficient;
