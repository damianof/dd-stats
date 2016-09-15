/*global*/
'use strict';

const chai = require('chai')
	, expect = chai.expect;
	
const PearsonCoefficient = require('../lib/index').PearsonCoefficient;

// unit test reference error
const err = new ReferenceError('This is a bad function.');

// Test 3:
const params = {
	name: 'Expect score of 0.8660254038'
	, x: [1,3,4,4]
	, y: [2,5,5,8]
	, expectedSimpleSumX: 12
	, expectedSimpleSumY: 20
	, expectedSquareSumX: 42
	, expectedSquareSumY: 118
	, expectedSumOfProducts: 69
	, expectedNumerator: 9
	, expectedDenominator: 10.3923048454
	, expectedScore: 0.8660254038
	, decimalPlaces: 10 // number of decimal places we round the result to before checking it against expected result
};

describe('PearsonCoefficient tests', function() {

	it('should throw if attempting to instantiate', function(done){
		let fn = function () { 
			try {
				new PearsonCoefficient(); // should throw
			} catch (e) {
				console.log('Exception: ', e);
				throw err;
			}
		};
		
		expect(fn).to.throw(err);
		done();
	});

	// 'should respond' checks
	it('should respond to static method simpleSum', function(done){
		expect(PearsonCoefficient).itself.to.respondTo('simpleSum');
		done();
	});
	
	it('should respond to static method squareSum', function(done){
		expect(PearsonCoefficient).itself.to.respondTo('squareSum');
		done();
	});
	
	it('should respond to static method sumOfProducts', function(done){
		expect(PearsonCoefficient).itself.to.respondTo('sumOfProducts');
		done();
	});
	
	it('should respond to static method calculateNumerator', function(done){
		expect(PearsonCoefficient).itself.to.respondTo('calculateNumerator');
		done();
	});
	
	it('should respond to static method calculateDenominator', function(done){
		expect(PearsonCoefficient).itself.to.respondTo('calculateDenominator');
		done();
	});
	
	it('should respond to static method calculate', function(done){
		expect(PearsonCoefficient).itself.to.respondTo('calculate');
		done();
	});
	
	it('name should be PearsonCoefficient', function(done){
		expect(PearsonCoefficient.name).to.equal('PearsonCoefficient');
		done();
	});
	
	it('simpleSum should return valid result', function(done){
		const fn = function () { 
			try {
				let resultX = PearsonCoefficient.simpleSum(params.x);
				let resultY = PearsonCoefficient.simpleSum(params.y);
				console.log('simpleSum result', resultX, resultY);
				expect(resultX).to.equal(params.expectedSimpleSumX);
				expect(resultY).to.equal(params.expectedSimpleSumY);
				done();
			} catch (e) {
				console.log(e);
				throw err;
			}
		};
		
		expect(fn).to.not.throw(err);
	});
	
	it('squareSum should return valid result', function(done){
		const fn = function () { 
			try {
				let resultX = PearsonCoefficient.squareSum(params.x);
				let resultY = PearsonCoefficient.squareSum(params.y);
				console.log('squareSum result', resultX, resultY);
				expect(resultX).to.equal(params.expectedSquareSumX);
				expect(resultY).to.equal(params.expectedSquareSumY);
				done();
			} catch (e) {
				console.log(e);
				throw err;
			}
		};
		
		expect(fn).to.not.throw(err);
	});
	
	it('sumOfProducts should return valid result', function(done){
		let fn = function () { 
			try {
				const result = PearsonCoefficient.sumOfProducts(params.x, params.y);
				console.log('sumOfProducts result', result);
				expect(result).to.equal(params.expectedSumOfProducts);
				done();
			} catch (e) {
				console.log(e);
				throw err;
			}
		};
		
		expect(fn).to.not.throw(err);
	});
	
	it('calculateNumerator should return valid result', function(done){
		const fn = function () { 
			try {
				const result = PearsonCoefficient.calculateNumerator(
					params.expectedSumOfProducts
					, params.expectedSimpleSumX
					, params.expectedSimpleSumY
					, params.x.length
				);
				console.log('calculateNumerator result', result);
				expect(result).to.equal(params.expectedNumerator);
				done();
			} catch (e) {
				console.log(e);
				throw err;
			}
		};
		
		expect(fn).to.not.throw(err);
	});

	it('calculateDenominator should return valid result', function(done){
		const fn = function () { 
			try {
				const result = PearsonCoefficient.calculateDenominator(
					params.expectedSquareSumX
					, params.expectedSquareSumY
					, params.expectedSimpleSumX
					, params.expectedSimpleSumY
					, params.x.length
				);
				let rounded = Number(result.toFixed(params.decimalPlaces));
				console.log('calculateDenominator result', result);
				console.log('calculateDenominator rounded', rounded);
				expect(rounded).to.equal(params.expectedDenominator);
				done();
			} catch (e) {
				console.log(e);
				throw err;
			}
		};
		
		expect(fn).to.not.throw(err);
	});

	it('calculate should return valid result', function(done){
		const fn = function () { 
			try {
				const result = PearsonCoefficient.calculate(params.x, params.y);
				const rounded = Number(result.toFixed(params.decimalPlaces));
				console.log('calculate result', result);
				console.log('calculate rounded', rounded);
				
				expect(rounded).to.equal(params.expectedScore);
				done();
			} catch (e) {
				console.log(e);
				throw err;
			}
		};
		
		expect(fn).to.not.throw(err);
	});
});
