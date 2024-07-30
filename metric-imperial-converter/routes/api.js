'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert?')
      .get((req, res) => {
        const input = req.query.input;
        if (!input) {
          return res.send('invalid query')
        }
        const response = getResponse(input.toLowerCase());
        res.send(response);
      })

    function getResponse(input) {
      const initNum = convertHandler.getNum(input);
        let initUnit = convertHandler.getUnit(input);
        initUnit = (initUnit == 'l' ? 'L' : initUnit)
        if (initNum === 0 && initUnit === 'f') {
          return 'invalid number and unit'
        }
        else if (initNum === 0) {
          console.log('invalid number')
          return 'invalid number'
        }
        else if (initUnit === 'f') {
          console.log('invalid unit')
          return 'invalid unit'
        }
        else {

          const returnNum = convertHandler.convert(initNum, initUnit);
          const returnUnit = convertHandler.getReturnUnit(initUnit);
          const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit)
          
          return {
            initNum,
            initUnit,
            returnNum,
            returnUnit,
            string
          }
        }
    }

};
