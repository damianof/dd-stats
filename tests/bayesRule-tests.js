/*global*/
'use strict';

let chai = require('chai')
	, expect = chai.expect
	, mochaTestdata = require('mocha-testdata')
	, given = mochaTestdata.given;
	
let BayesRule = require('../lib/BayesRule');

// unit test reference error
let err = new ReferenceError('This is a bad function.');

let testData = [
	// Test 1 [love, deal]:
	{
		name: 'Test: [love, deal]'
		, featuresX: new Map()
		, selectedX: ['love', 'deal']
		, priorX: 0.5
		, expectedPosteriorX: 0.08
		, expectedJointX: 0.04
		, expectedScoreX: 0.4444

		, featuresY: new Map()
		, selectedY: ['love', 'deal']
		, priorY: 0.5
		, expectedPosteriorY: 0.10
		, expectedJointY: 0.05
		, expectedScoreY: 0.5556
		
		, decimalPlaces: 4 // number of decimal places we round the result to before checking it against expected result
	}
	// Test 2 [love, life]:
	, {
		name: 'Test: [love, life]'
		, featuresX: new Map()
		, selectedX: ['love', 'life']
		, priorX: 0.5
		, expectedPosteriorX: 0.01
		, expectedJointX: 0.005
		, expectedScoreX: 0.0625

		, featuresY: new Map()
		, selectedY: ['love', 'life']
		, priorY: 0.5
		, expectedPosteriorY: 0.15
		, expectedJointY: 0.075
		, expectedScoreY: 0.9375
		
		, decimalPlaces: 4 // number of decimal places we round the result to before checking it against expected result
	}
	// Test 2 [life, deal]:
	, {
		name: 'Test: [life, deal]'
		, featuresX: new Map()
		, selectedX: ['life', 'deal']
		, priorX: 0.5
		, expectedPosteriorX: 0.08
		, expectedJointX: 0.04
		, expectedScoreX: 0.5714

		, featuresY: new Map()
		, selectedY: ['life', 'deal']
		, priorY: 0.5
		, expectedPosteriorY: 0.06
		, expectedJointY: 0.03
		, expectedScoreY: 0.4286
		
		, decimalPlaces: 4 // number of decimal places we round the result to before checking it against expected result
	}
];

let featuresX = testData[0].featuresX;
featuresX.set('love', 0.1);
featuresX.set('deal', 0.8);
featuresX.set('life', 0.1);

let featuresY = testData[0].featuresY;
featuresY.set('love', 0.5);
featuresY.set('deal', 0.2);
featuresY.set('life', 0.3);

testData[1].featuresX = featuresX;
testData[1].featuresY = featuresY;

testData[2].featuresX = featuresX;
testData[2].featuresY = featuresY;

describe('BayesRule tests', function() {

	// // 'should respond' checks
	// it('should respond to static method posterior', function(done){
	// 	expect(BayesRule).itself.to.respondTo('posterior');
	// 	done();
	// });
	
	// it('name should be BayesRule', function(done){
	// 	expect(BayesRule.name).to.equal('BayesRule');
	// 	done();
	// });
	
	given(testData).it('passes test with different scenarios',  (params)=> {
		console.log('Data-driven tests: params.name', params.name);
		
		console.log('posterior should return valid result');
			let fn = function () { 
				try {
					let result = BayesRule.posterior({
						selected: params.selectedX
						, features: params.featuresX
					});
					console.log('posterior result', result);
					let rounded = Number(result.toFixed(params.decimalPlaces));
					expect(rounded).to.equal(params.expectedPosteriorX);
				} catch (e) {
					console.log(e);
					throw err;
				}
			};
			
			expect(fn).to.not.throw(err);
			
			fn = function () { 
				try {
					let result = BayesRule.posterior({
						selected: params.selectedY
						, features: params.featuresY
					});
					console.log('posterior result', result);
					let rounded = Number(result.toFixed(params.decimalPlaces));
					expect(rounded).to.equal(params.expectedPosteriorY);
				} catch (e) {
					console.log(e);
					throw err;
				}
			};
			
			expect(fn).to.not.throw(err);
			
		console.log('joint should return valid result');
			fn = function () { 
				try {
					let result = BayesRule.joint({
						selected: params.selectedX
						, features: params.featuresX
						, prior: params.priorX
					});
					console.log('joint result', result);
					let rounded = Number(result.toFixed(params.decimalPlaces));
					expect(rounded).to.equal(params.expectedJointX);
				} catch (e) {
					console.log(e);
					throw err;
				}
			};
			
			expect(fn).to.not.throw(err);
			fn = function () { 
				try {
					let result = BayesRule.joint({
						selected: params.selectedY
						, features: params.featuresY
						, prior: params.priorY
					});
					console.log('joint result', result);
					let rounded = Number(result.toFixed(params.decimalPlaces));
					expect(rounded).to.equal(params.expectedJointY);
				} catch (e) {
					console.log(e);
					throw err;
				}
			};
			
			expect(fn).to.not.throw(err);
			
		console.log('calculate should return valid result');
			fn = function () { 
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

				} catch (e) {
					console.log(e);
					throw err;
				}
			};
			
			expect(fn).to.not.throw(err);

	});
	
});
