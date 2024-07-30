const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    suite('convertHandler.getNum() tests', function(){
        // let input = '12l'
        test('getNum should return full whole number', function () {
            assert.equal(convertHandler.getNum('12l'), 12)
        })
        test('getNum should handle decimal number', function () {
            assert.equal(convertHandler.getNum('3.1mi'), 3.1)     
        })
        test('getNum should handle fractional numbers', function () {
            assert.equal(convertHandler.getNum('45/2L'), 45/2, 'Fraction input should be evaluated')
        })
        test('getNum should handle fraction with decimal numbers', function () {
            assert.equal(convertHandler.getNum('2/3.1gal'), 2/3.1, 'getNum should read fraction with decimal')
        })
        test('getNum should invalidate any input with two or more fractions', function () {
            assert.equal(convertHandler.getNum('2/3/4'), 0)
        })
        test('getNum should return 1 if the number is not provided', function () {
            assert.equal(convertHandler.getNum('mi'), 1)
        })
    })
    suite('getUnit() tests', function() {
        const units = ['lbs', 'kg', 'mi', 'km', 'gal', 'L']
        const fullUnitNames = ['pounds', 'kilograms', 'miles', 'kilometers', 'gallons', 'litres']
        const returnUnit = ['kg', 'lbs', 'km', 'mi', 'L', 'gal']
        test('for Units program should successfully return unit, spelled-out unit, and return-unit', function () {
            units.forEach((item, index )=> {
                assert.equal(convertHandler.getUnit('7' + item), item, 'getUnit is not working')
                assert.equal(convertHandler.spellOutUnit(item), fullUnitNames[index], `fullUnitName is not working`)
                assert.equal(convertHandler.getReturnUnit(item), returnUnit[index], 'getReturnUnit is not working')
            })
        })
        test('getUnit should invalidate any wrong unit', function() {
            assert.equal(convertHandler.getUnit('45kd'), 'f');
        })
        test('convert() should work fine', function() {
            const outputs = [1.40614, 6.83433, 4.98897, 1.92625, 11.7348, 0.818933]
            units.forEach((item, index) => {
                assert.approximately(convertHandler.convert(3.1, item), outputs[index], 0.1)
            })
        })
    })
});