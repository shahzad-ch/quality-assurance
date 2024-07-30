function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;
    let index = input.toLowerCase().match(/[a-z]*$/).index
    result = input.slice(0, index);
    if (/[^0-9.\/\s]/.test(result)) {
      return 0;
    }
    
    result = result.split('/')
    if (result.length != 2 && result.length != 1) {
      return 0;
    }
    let num1 = parseFloat(result[0]) || 1;
    let num2 = parseFloat(result[1]) || 1;

    return num1 / num2;
    
  };
  
  this.getUnit = function(input) {
    let result = input.toLowerCase().match(/[a-z]*$/)[0]
    if (this.getReturnUnit(result) == 'f') {
      return 'f'
    }
    return (result == 'l' ? 'L' : result);
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    switch(initUnit) {
      case 'mi':
        result = 'km'
        break;
      case 'lbs': 
        result = 'kg';
        break;
      case 'gal': 
        result = 'L';
        break;
      case 'km':
        result = 'mi';
        break;
      case 'kg':
        result = 'lbs';
        break;
      case 'l':
      case 'L':
        result = 'gal';
        break;
      default: 
        result = 'f'
        break; 
    }
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    switch(unit) {
      case 'mi':
        result = 'miles'
        break;
      case 'lbs': 
        result = 'pounds';
        break;
      case 'gal': 
        result = 'gallons';
        break;
      case 'km':
        result = 'kilometers';
        break;
      case 'kg':
        result = 'kilograms';
        break;
      case 'L':
        result = 'litres';
        break;
      default: 
        result = 'f'
        break; 
    }
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch(initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'mi': 
        result = initNum * miToKm;
        break;
      case 'L':
        result = initNum / galToL;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'km':
        result = initNum / miToKm
        break;
      default:
        result = 'f'
        break;
    }
    return parseFloat(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
      result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`
    return result;
  };
  
}

module.exports = ConvertHandler;
