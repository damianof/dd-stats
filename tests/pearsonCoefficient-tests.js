/*global*/
'use strict';

const chai = require('chai')
	, expect = chai.expect
	, mochaTestdata = require('mocha-testdata')
	, given = mochaTestdata.given;
	
const PearsonCoefficient = require('../lib/index').PearsonCoefficient;

// unit test reference error
const err = new ReferenceError('This is a bad function.');

const testData = [
	// Test 1 (identical sets should return a score of 1.0):
	{
		name: 'Expect score of 1'
		, x: [1,2,3,4]
		, y: [1,2,3,4]
		, expectedSimpleSumX: 10
		, expectedSimpleSumY: 10
		, expectedSquareSumX: 30
		, expectedSquareSumY: 30
		, expectedSumOfProducts: 30
		, expectedNumerator: 5
		, expectedDenominator: 5
		, expectedScore: 1
		, decimalPlaces: 10 // number of decimal places we round the result to before checking it against expected result
	}
	// Test 2 (completely unidentical sets should return a score of -1.0):
	, {
		name: 'Expect score of -1'
		, x: [1,2,3,4]
		, y: [4,3,2,1]
		, expectedSimpleSumX: 10
		, expectedSimpleSumY: 10
		, expectedSquareSumX: 30
		, expectedSquareSumY: 30
		, expectedSumOfProducts: 20
		, expectedNumerator: -5
		, expectedDenominator: 5
		, expectedScore: -1
		, decimalPlaces: 10 // number of decimal places we round the result to before checking it against expected result
	}
	// Test 3:
	, {
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
	}
];


describe('PearsonCoefficient tests', function() {

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
	
	given(testData).it('passes test with different scenarios',  (params)=> {
		console.log('Data-driven tests: params.name', params.name);
		
		console.log('simpleSum should return valid result');
			let fn = function () { 
				try {
					const resultX = PearsonCoefficient.simpleSum(params.x)
						, resultY = PearsonCoefficient.simpleSum(params.y);
					console.log('simpleSum result', resultX, resultY);
					expect(resultX).to.equal(params.expectedSimpleSumX);
					expect(resultY).to.equal(params.expectedSimpleSumY);

				} catch (e) {
					console.log(e);
					throw err;
				}
			};
			
			expect(fn).to.not.throw(err);


		console.log('squareSum should return valid result');
			fn = function () { 
				try {
					const resultX = PearsonCoefficient.squareSum(params.x)
						, resultY = PearsonCoefficient.squareSum(params.y);
					console.log('squareSum result', resultX, resultY);
					expect(resultX).to.equal(params.expectedSquareSumX);
					expect(resultY).to.equal(params.expectedSquareSumY);

				} catch (e) {
					console.log(e);
					throw err;
				}
			};
			
			expect(fn).to.not.throw(err);


		console.log('sumOfProducts should return valid result');
			fn = function () { 
				try {
					const result = PearsonCoefficient.sumOfProducts(params.x, params.y);
					console.log('sumOfProducts result', result);
					expect(result).to.equal(params.expectedSumOfProducts);

				} catch (e) {
					console.log(e);
					throw err;
				}
			};
			
			expect(fn).to.not.throw(err);
		
		
		console.log('calculateNumerator should return valid result');
			fn = function () { 
				try {
					const result = PearsonCoefficient.calculateNumerator(
						params.expectedSumOfProducts
						, params.expectedSimpleSumX
						, params.expectedSimpleSumY
						, params.x.length
					);
					console.log('calculateNumerator result', result);
					expect(result).to.equal(params.expectedNumerator);

				} catch (e) {
					console.log(e);
					throw err;
				}
			};
			
			expect(fn).to.not.throw(err);
;

		console.log('calculateDenominator should return valid result');
			fn = function () { 
				try {
					const result = PearsonCoefficient.calculateDenominator(
						params.expectedSquareSumX
						, params.expectedSquareSumY
						, params.expectedSimpleSumX
						, params.expectedSimpleSumY
						, params.x.length
					)
					, rounded = Number(result.toFixed(params.decimalPlaces));

					console.log('calculateDenominator result', result);
					console.log('calculateDenominator rounded', rounded);
					expect(rounded).to.equal(params.expectedDenominator);

				} catch (e) {
					console.log(e);
					throw err;
				}
			};
			
			expect(fn).to.not.throw(err);


		console.log('calculate should return valid result');
			fn = function () { 
				try {
					const result = PearsonCoefficient.calculate(params.x, params.y)
						, rounded = Number(result.toFixed(params.decimalPlaces));
					console.log('calculate result', result);
					console.log('calculate rounded', rounded);
					
					expect(rounded).to.equal(params.expectedScore);

				} catch (e) {
					console.log(e);
					throw err;
				}
			};
			
			expect(fn).to.not.throw(err);
	});
});
