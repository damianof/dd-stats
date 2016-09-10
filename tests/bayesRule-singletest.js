/*global*/
'use strict';

const chai = require('chai')
	, expect = chai.expect;
	
const BayesRule = require('../lib/BayesRule');

// unit test reference error
const err = new ReferenceError('This is a bad function.');

// Test 1:
const params = {
	  name: 'Test: [love, deal]'
	, featuresX: new Map()
	, selectedX: ['love', 'deal']
	, priorX: 0.5
	, expectedPosteriorX: 0.08
	, expectedJointX: 0.04
	, expectedScoreX: 0.4211

	, featuresY: new Map()
	, selectedY: ['love', 'deal']
	, priorY: 0.5
	, expectedPosteriorY: 0.10
	, expectedJointY: 0.05
	, expectedScoreY: 0.5263

	, featuresZ: new Map()
	, selectedZ: ['love', 'deal']
	, priorZ: 0.5
	, expectedPosteriorZ: 0.01
	, expectedJointZ: 0.005
	, expectedScoreZ: 0.0526
	
	, decimalPlaces: 4 // number of decimal places we round the result to before checking it against expected result
};

const featuresX = params.featuresX;
featuresX.set('love', 0.1);
featuresX.set('deal', 0.8);
featuresX.set('life', 0.1);

const featuresY = params.featuresY;
featuresY.set('love', 0.5);
featuresY.set('deal', 0.2);
featuresY.set('life', 0.3);

const featuresZ = params.featuresZ;
featuresZ.set('love', 0.1);
featuresZ.set('deal', 0.1);
featuresZ.set('life', 0.8);

describe('BayesRule tests', function() {

	// 'should respond' checks
	it('should respond to static method posterior', function(done){
		expect(BayesRule).itself.to.respondTo('posterior');
		done();
	});
	
	it('name should be BayesRule', function(done){
		expect(BayesRule.name).to.equal('BayesRule');
		done();
	});
	
	it('should throw if attempting to instantiate', function(done){
		let fn = function () { 
			try {
				new BayesRule(); // should throw
			} catch (e) {
				console.log('Exception: ', e);
				throw err;
			}
		};
		
		expect(fn).to.throw(err);
		done();
	});
	
	it('posterior X should return valid result', function(done){
		let fn = function () { 
			try {
				let result = BayesRule.posterior({
					selected: params.selectedX
					, features: params.featuresX
				});
				console.log('posterior X result', result);
				let rounded = Number(result.toFixed(params.decimalPlaces));
				expect(rounded).to.equal(params.expectedPosteriorX);
				done();
			} catch (e) {
				console.log(e);
				throw err;
			}
		};
		
		expect(fn).to.not.throw(err);
	});
	
	it('posterior Y should return valid result', function(done){
		let fn = function () { 
			try {
				let result = BayesRule.posterior({
					selected: params.selectedY
					, features: params.featuresY
				});
				console.log('posterior Y result', result);
				let rounded = Number(result.toFixed(params.decimalPlaces));
				expect(rounded).to.equal(params.expectedPosteriorY);
				done();
			} catch (e) {
				console.log(e);
				throw err;
			}
		};
		
		expect(fn).to.not.throw(err);
	});
	
	it('joint X should return valid result', function(done){
		let fn = function () { 
			try {
				let result = BayesRule.joint({
					selected: params.selectedX
					, features: params.featuresX
					, prior: params.priorX
				});
				console.log('joint X result', result);
				let rounded = Number(result.toFixed(params.decimalPlaces));
				expect(rounded).to.equal(params.expectedJointX);
				done();
			} catch (e) {
				console.log(e);
				throw err;
			}
		};
		
		expect(fn).to.not.throw(err);
	});
	
	it('joint Y should return valid result', function(done){
		let fn = function () { 
			try {
				let result = BayesRule.joint({
					selected: params.selectedY
					, features: params.featuresY
					, prior: params.priorY
				});
				console.log('joint Y result', result);
				let rounded = Number(result.toFixed(params.decimalPlaces));
				expect(rounded).to.equal(params.expectedJointY);
				done();
			} catch (e) {
				console.log(e);
				throw err;
			}
		};
		
		expect(fn).to.not.throw(err);
	});
	
	it('denominator should return valid result', function(done){
		let fn = function () { 
			try {
				let result = BayesRule.denominator({
					joints: [
						0.04
						, 0.05
					]
				});
				console.log('denominator result', result);
				let rounded = Number(result.toFixed(params.decimalPlaces));
				expect(rounded).to.equal(0.09);
				done();
			} catch (e) {
				console.log(e);
				throw err;
			}
		};
		
		expect(fn).to.not.throw(err);
	});
	
	it('normalize should return valid result', function(done){
		let fn = function () { 
			try {
				let testArgs = {
					joints: [
						0.04
						, 0.05
					]
				};
				
				// get denominator first
				let denominator = BayesRule.denominator(testArgs);
				console.log('normalize (denominator)', denominator);
				denominator = Number(denominator.toFixed(params.decimalPlaces));
				expect(denominator).to.equal(0.09);
				
				testArgs.denominator = denominator;
				
				// calculate result1
				testArgs.numerator = 0.04;
				let result1 = BayesRule.normalize(testArgs);
				console.log('normalize result1', result1);
				let rounded1 = Number(result1.toFixed(params.decimalPlaces));
				expect(rounded1).to.equal(0.4444);
				
				// calculate result2
				testArgs.numerator = 0.05;
				let result2 = BayesRule.normalize(testArgs);
				console.log('normalize result2', result2);
				let rounded2 = Number(result2.toFixed(params.decimalPlaces));
				expect(rounded2).to.equal(0.5556);
				
				// check sum (should be 1)
				let roundedSum = Number((result1 + result2).toFixed(params.decimalPlaces));
				console.log('normalize roundedSum', roundedSum);
				expect(roundedSum).to.equal(1);
				
				done();
			} catch (e) {
				console.log(e);
				throw err;
			}
		};
		
		expect(fn).to.not.throw(err);
	});

	it('calculate should return valid result - with 3 labels (items)', function(done){
		let fn = function () { 
			try {
				let result = BayesRule.calculate({
					decimalPlaces: params.decimalPlaces
					, items: [{
						name: 'Chris'
						, selected: params.selectedX
						, features: params.featuresX
						, prior: params.priorX
					},{
						name: 'Mary'
						, selected: params.selectedY
						, features: params.featuresY
						, prior: params.priorY
					},{
						name: 'Ann'
						, selected: params.selectedZ
						, features: params.featuresZ
						, prior: params.priorZ
					}]
				});
				
				console.log('calculate result', result);
				let roundedSum = Number(result.checkSum.toFixed(params.decimalPlaces));
				expect(roundedSum).to.equal(1);
				
				let chris = result.items.get('Chris');
				console.log('calculate Chris result', chris);
				expect(chris.joint).to.equal(params.expectedJointX);
				expect(chris.score).to.equal(params.expectedScoreX);
				
				let mary = result.items.get('Mary');
				console.log('calculate Mary result', mary);
				expect(mary.joint).to.equal(params.expectedJointY);
				expect(mary.score).to.equal(params.expectedScoreY);
				
				let ann = result.items.get('Ann');
				console.log('calculate Ann result', ann);
				expect(ann.joint).to.equal(params.expectedJointZ);
				expect(ann.score).to.equal(params.expectedScoreZ);
				
				done();
			} catch (e) {
				console.log(e);
				throw err;
			}
		};
		
		expect(fn).to.not.throw(err);
	});
});
