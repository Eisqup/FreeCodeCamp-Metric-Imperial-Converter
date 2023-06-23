'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function(app) {

    let convertHandler = new ConvertHandler();

    app.route('/api/convert').get((res, req) => {
        const toConverte = res.query.input
        const initUnit = convertHandler.getUnit(toConverte);
        const initNum = convertHandler.getNum(toConverte);
        let output

        if (initUnit && initNum) {
            const returnUnit = convertHandler.getReturnUnit(initUnit)
            const returnNum = convertHandler.convert(initNum, initUnit)
            output = {
                initNum: initNum,
                initUnit: initUnit,
                returnNum: returnNum,
                returnUnit: returnUnit,
                string: convertHandler.getString(initNum, initUnit, returnNum, returnUnit)
            }
        }
        else if (!initNum && !initUnit) {
            output = "invalid number and unit"

        } else if (!initUnit) {
            output = "invalid unit"
        } else {
            output = 'invalid number'
        }
        req.send(output)
    })
};
