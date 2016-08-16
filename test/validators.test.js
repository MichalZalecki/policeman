"use strict";
var tape = require("tape");
var validators_1 = require("../lib/validators");
function testIsRequired(t) {
    var required = validators_1.isRequired(function () { return "is required"; });
    t.is(required(""), "is required", "isRequired fails on empty string");
    t.is(required(null), "is required", "isRequired fails on null");
    t.is(required(undefined), "is required", "isRequired fails on undefined");
    t.is(required(false), "is required", "isRequired fails on false");
    t.is(required("foo"), null, "isRequired accepts not empty strings");
}
function testMinLengthValidator(t) {
    var minLength4 = validators_1.minLength(4, function () { return "should be at least 4"; });
    t.is(minLength4("foo bar"), null, "minLength(4) accepts strings with 4+ characters");
    t.is(minLength4("fooz"), null, "minLength(4) accepts strings with 4 characters");
    t.is(minLength4("foo"), "should be at least 4", "minLength(4) fails on strings with 4- characters");
}
function testMaxLengthValidator(t) {
    var maxLength4 = validators_1.maxLength(4, function () { return "should be at most 4"; });
    t.is(maxLength4("foo bar"), "should be at most 4", "maxLength(4) fails on strings with 4+ characters");
    t.is(maxLength4("fooz"), null, "maxLength(4) accepts strings with 4 characters");
    t.is(maxLength4("foo"), null, "maxLength(4) accepts strings with 4- characters");
}
function testIsEmail(t) {
    var email = validators_1.isEmail(function () { return "is invalid email"; });
    t.is(email("foo@bar.com"), null, "isEmail accepts valid email");
    t.is(email("foo@.com"), "is invalid email", "isEmail fails on invalid email");
}
function testIsMatching(t) {
    var matching = validators_1.isMatching(/^\d{3}-?\d{3}-?\d{3}$/, function () { return "is invalid number"; });
    t.is(matching("777-888-999"), null, "isMatching(/^\d{3}-?\d{3}-?\d{3}$/) accepts valid number");
    t.is(matching("777888999"), null, "isMatching(/^\d{3}-?\d{3}-?\d{3}$/) accepts valid number");
    t.is(matching("aaa-bbb-ccc"), "is invalid number", "isMatching(/^\d{3}-?\d{3}-?\d{3}$/) fails on invalid number");
}
function testIsPassing(t) {
    var isFoo = function (str) { return str === "foo"; };
    var matching = validators_1.isPassing(isFoo, function () { return "must be \"foo\""; });
    t.is(matching("foo"), null, "predicate returns true on \"foo\"");
    t.is(matching("bar"), "must be \"foo\"", "predicate returns false on not \"foo\"");
}
tape("validators", function (t) {
    t.plan(18);
    testIsRequired(t);
    testMinLengthValidator(t);
    testMaxLengthValidator(t);
    testIsEmail(t);
    testIsMatching(t);
    testIsPassing(t);
});
//# sourceMappingURL=validators.test.js.map