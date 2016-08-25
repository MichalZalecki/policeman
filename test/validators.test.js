"use strict";
var tape = require("tape");
var policeman_1 = require("../lib/policeman");
function testIsRequired(t) {
    var required = policeman_1.isRequired(function () { return "is required"; });
    t.is(required(""), "is required", "isRequired fails on empty string");
    t.is(required(null), "is required", "isRequired fails on null");
    t.is(required(undefined), "is required", "isRequired fails on undefined");
    t.is(required(false), null, "isRequired accepts false");
    t.is(required("foo"), null, "isRequired accepts not empty strings");
}
function testIsMinLengthValidator(t) {
    var isMinLength4 = policeman_1.isMinLength(4, function () { return "should be at least 4"; });
    t.is(isMinLength4("foo bar"), null, "isMinLength(4) accepts strings with 4+ characters");
    t.is(isMinLength4("fooz"), null, "isMinLength(4) accepts strings with 4 characters");
    t.is(isMinLength4("foo"), "should be at least 4", "isMinLength(4) fails on strings with 4- characters");
}
function testIsMaxLengthValidator(t) {
    var isMaxLength4 = policeman_1.isMaxLength(4, function () { return "should be at most 4"; });
    t.is(isMaxLength4("foo bar"), "should be at most 4", "isMaxLength(4) fails on strings with 4+ characters");
    t.is(isMaxLength4("fooz"), null, "isMaxLength(4) accepts strings with 4 characters");
    t.is(isMaxLength4("foo"), null, "isMaxLength(4) accepts strings with 4- characters");
}
function testIsEqualLengthValidator(t) {
    var isEqualLength4 = policeman_1.isEqualLength(4, function () { return "should be 4 characters long"; });
    t.is(isEqualLength4("abc"), "should be 4 characters long", "isEqualLength(4) fails on 3 characters long string");
    t.is(isEqualLength4("abcde"), "should be 4 characters long", "isEqualLength(4) fails on 5 characters long string");
    t.is(isEqualLength4("abcd"), null, "isEqualLength(4) accepts 4 characters long string");
}
function testIsEmail(t) {
    var email = policeman_1.isEmail(function () { return "is invalid email"; });
    t.is(email("foo@bar.com"), null, "isEmail accepts valid email");
    t.is(email("foo@.com"), "is invalid email", "isEmail fails on invalid email");
}
function testIsMatching(t) {
    var matching = policeman_1.isMatching(/^\d{3}-?\d{3}-?\d{3}$/, function () { return "is invalid number"; });
    t.is(matching("777-888-999"), null, "isMatching(/^\d{3}-?\d{3}-?\d{3}$/) accepts valid number");
    t.is(matching("777888999"), null, "isMatching(/^\d{3}-?\d{3}-?\d{3}$/) accepts valid number");
    t.is(matching("aaa-bbb-ccc"), "is invalid number", "isMatching(/^\d{3}-?\d{3}-?\d{3}$/) fails on invalid number");
}
function testIsPassing(t) {
    var isFoo = function (str) { return str === "foo"; };
    var matching = policeman_1.isPassing(isFoo, function () { return "must be \"foo\""; });
    t.is(matching("foo"), null, "predicate returns true on \"foo\"");
    t.is(matching("bar"), "must be \"foo\"", "predicate returns false on not \"foo\"");
}
tape("validators", function (t) {
    t.plan(21);
    testIsRequired(t);
    testIsMinLengthValidator(t);
    testIsMaxLengthValidator(t);
    testIsEqualLengthValidator(t);
    testIsEmail(t);
    testIsMatching(t);
    testIsPassing(t);
});
//# sourceMappingURL=validators.test.js.map