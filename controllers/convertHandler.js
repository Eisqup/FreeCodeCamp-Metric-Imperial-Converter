function ConvertHandler() {

    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    const unitDict = {
        lbs: { unit: "lbs", spellOut: "pounds", mathOperation: function(a) { return a * lbsToKg }, convertToUnit: "kg" },
        kg: { unit: "kg", spellOut: "kilograms", mathOperation: function(a) { return a / lbsToKg }, convertToUnit: "lbs" },
        L: { unit: "L", spellOut: "liters", mathOperation: function(a) { return a / galToL }, convertToUnit: "gal" },
        gal: { unit: "gal", spellOut: "gallons", mathOperation: function(a) { return a * galToL }, convertToUnit: "L" },
        mi: { unit: "mi", spellOut: "miles", mathOperation: function(a) { return a * miToKm }, convertToUnit: "km" },
        km: { unit: "km", spellOut: "kilometers", mathOperation: function(a) { return a / miToKm }, convertToUnit: "mi" },
    }

    this.getNum = function(input) {

        let result = input.match(/\d+(\.\d+(\/\d+)?|\/\d+(\.\d+)?)?/g)
        if (result == null) {
            result = 1;
        } else if (result.length >= 2) {
            result = false
        } else if (result[0].includes("/")) {
            result = result[0].split("/")[0] / result[0].split("/")[1];
            result = parseFloat(result)
        } else if (result.length == 1) {
            result = parseFloat(result[0]);
        } else {
            result = false
        }
        return result;
    };

    this.getUnit = function(input) {

        let result = input.match(/[a-zA-Z]+/g)
        if (result != null) {
            result = result.toString()

            if (result.toLowerCase() in unitDict) {
                result = unitDict[result.toLowerCase()].unit

            } else if (result.toUpperCase() in unitDict) {
                result = unitDict[result.toUpperCase()].unit

            } else {
                result = false
            }
        } else {
            result = false
        }
        return result;
    };

    this.getReturnUnit = function(initUnit) {
        let result = unitDict[initUnit].convertToUnit

        return result
    };

    this.spellOutUnit = function(unit) {

        let result = unitDict[unit].spellOut

        return result;
    };

    this.convert = function(initNum, initUnit) {

        let result = unitDict[initUnit].mathOperation(initNum)

        return parseFloat(result.toFixed(5));
    };

    this.getString = function(initNum, initUnit, returnNum, returnUnit) {

        let result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`

        return result;
    };

}

module.exports = ConvertHandler;
