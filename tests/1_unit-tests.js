const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {
    test("Test read a whole number", function() {
        assert.strictEqual(convertHandler.getNum("1kg"), 1, "false read a whole number")
    })
    test("read a decimal number input", function() {
        assert.strictEqual(convertHandler.getNum("1.3KG"), 1.3, "false read a decimal number input")
    })
    test("read a fractional input", function() {
        assert.strictEqual(convertHandler.getNum("1/2KG"), 0.5, "False")
    })
    test("read a fractional input with a decimal", function() {
        assert.strictEqual(convertHandler.getNum("4/2.5KG"), 1.6, "False")
    })
    test("return an error on a double-fraction (i.e. 3/2/3)", function() {
        assert.strictEqual(convertHandler.getNum("3/2/3kg"), false, "False")
    })
    test("default to a numerical input of 1 when no numerical input is provided", function() {
        assert.strictEqual(convertHandler.getNum("kg"), 1, "false")
    })
    test("read each valid input unit", function() {
        assert.strictEqual(convertHandler.getUnit("5kg"), "kg", "false kg")
        assert.strictEqual(convertHandler.getUnit("5lbs"), "lbs", "false lbs")
        assert.strictEqual(convertHandler.getUnit("5l"), "L", "false L")
        assert.strictEqual(convertHandler.getUnit("5gal"), "gal", "false gal")
        assert.strictEqual(convertHandler.getUnit("5Mi"), "mi", "false mi")
        assert.strictEqual(convertHandler.getUnit("5kM"), "km", "false km")
    })

    test("return an error for an invalid input unit", function() {

        assert.strictEqual(convertHandler.getUnit("5kMm"), false, "False invalid input unit")
    })
    test("return the correct return unit for each valid input unit", function() {

        assert.strictEqual(convertHandler.getReturnUnit("kg"), "lbs", "false kg to lbs")
        assert.strictEqual(convertHandler.getReturnUnit("lbs"), "kg", "false lbs to kg")
        assert.strictEqual(convertHandler.getReturnUnit("L"), "gal", "false L to gal")
        assert.strictEqual(convertHandler.getReturnUnit("gal"), "L", "false gal to L")
        assert.strictEqual(convertHandler.getReturnUnit("mi"), "km", "false mi to km")
        assert.strictEqual(convertHandler.getReturnUnit("km"), "mi", "false km to mi")
    })

    test("return the spelled-out string unit for each valid input unit", function() {

        assert.strictEqual(convertHandler.spellOutUnit("kg"), "kilograms", "false spell kg")
        assert.strictEqual(convertHandler.spellOutUnit("lbs"), "pounds", "false spell lbs")
        assert.strictEqual(convertHandler.spellOutUnit("L"), "liters", "false spell L")
        assert.strictEqual(convertHandler.spellOutUnit("gal"), "gallons", "false spell gal")
        assert.strictEqual(convertHandler.spellOutUnit("mi"), "miles", "false spell mi")
        assert.strictEqual(convertHandler.spellOutUnit("km"), "kilometers", "false spell km")
    })
    test("convert gal to L", function() {
        assert.strictEqual(convertHandler.convert(1, "gal"), 3.78541, "false convert gal to L")
    })
    test("convert L to gal", function() {
        assert.strictEqual(convertHandler.convert(3.78541, "L"), 1, "false convert L to gal")
    })
    test("convert mi to km", function() {
        assert.strictEqual(convertHandler.convert(1, "mi"), 1.60934, "false convert mi to km")
    })
    test("convert km to mi", function() {
        assert.strictEqual(convertHandler.convert(1.60934, "km"), 1, "false convert km to mi")
    })
    test("convert lbs to kg", function() {
        assert.strictEqual(convertHandler.convert(1, "lbs"), 0.45359, "false convert lbs to kg")
    })
    test("convert kg to lbs", function() {
        assert.strictEqual(convertHandler.convert(0.45359, "kg"), 1, "false convert kg to lbs")
    })
});