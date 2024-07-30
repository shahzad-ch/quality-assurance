const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    test('convert valid input 10L GET ', function() {
        chai
         .request(server)
         .keepOpen()
         .get('/api/convert?input=10L')
         .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.returnNum, 2.64172)
            assert.equal(res.body.returnUnit, 'gal')
         })
    })
    test('handle invalid input 32g to GET', function() {
        chai
         .request(server)
         .keepOpen()
         .get('/api/convert/?input=32g')
         .end(function (err, res) {
            assert.equal(res.text, 'invalid unit')
         })
    })
    test('handle invalid input 3/7.2/4kg to GET', function() {
        chai
         .request(server)
         .keepOpen()
         .get('/api/convert/?input=3/7.2/4kg')
         .end(function (err, res) {
            assert.equal(res.text, 'invalid number')
         })
    })
    test('handle invalid input 3/7.2/4kilomegagram to GET', function() {
        chai
         .request(server)
         .keepOpen()
         .get('/api/convert/?input=3/7.2/4kilomegagram')
         .end(function (err, res) {
            assert.equal(res.text, 'invalid number and unit')
         })
    })
    test('handle no-number input kg to GET', function() {
        chai
         .request(server)
         .keepOpen()
         .get('/api/convert/?input=kg')
         .end(function (err, res) {
            assert.equal(res.body.returnNum, 2.20462)
            assert.equal(res.body.returnUnit, 'lbs')
         })
    })
});
