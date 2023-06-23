const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');
const { expect } = require('chai');

chai.use(chaiHttp);

suite('Functional Tests', function() {

    test("Convert a valid input such as 10L: GET request to /api/convert", () => {
        chai.request(server)
            .get("/api/convert?input=10L")
            .then((res) => {
                assert.deepEqual(res.body, {
                    "initNum": 10,
                    "initUnit": "L",
                    "returnNum": 2.64172,
                    "returnUnit": "gal",
                    "string": "10 liters converts to 2.64172 gallons"
                }, "false convert 10L")
            }).catch((err) => {
                console.log(err)
            });
    })
    test("Convert an invalid input such as 32g: GET request to /api/convert", () => {
        chai.request(server)
            .get("/api/convert?input=32g")
            .then((res) => {
                assert.strictEqual(res.text, "invalid unit", "false convert 32g")
            }).catch((err) => {
                console.log(err)
            });
    })
    test("Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert.", () => {
        chai.request(server)
            .get("/api/convert?input=3/7.2/4kg")
            .then((res) => {
                assert.strictEqual(res.text, "invalid number", "false convert 3/7.2/4kg")
            }).catch((err) => {
                console.log(err)
            });

    })
    test("Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert", () => {
        chai.request(server)
            .get("/api/convert?input=3/7.2/4kilomegagram")
            .then((res) => {
                assert.strictEqual(res.text, "invalid number and unit", "false convert 3/7.2/4kilomegagram")
            }).catch((err) => {
                console.log(err)
            });

    })
    test("Convert with no number such as kg: GET request to /api/convert.", () => {
        chai.request(server)
            .get("/api/convert?input=kg")
            .then((res) => {
                assert.deepEqual(res.body, { "initNum": 1, "initUnit": "kg", "returnNum": 2.20462, "returnUnit": "lbs", "string": "1 kilograms converts to 2.20462 pounds" }, "false convert kg")
            }).catch((err) => {
                console.log(err)
            })

    });
    after(function() {
        chai.request(server)
            .get('/')
    });

});