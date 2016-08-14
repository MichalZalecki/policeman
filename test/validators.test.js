"use strict";
var tape = require("tape");
var validators_1 = require("../lib/validators");
function testIsRequired(t) {
    var required = validators_1.isRequired(function () { return "Is required"; });
    t.is(required(""), "Is required", "isRequired fails on empty string");
    t.is(required(null), "Is required", "isRequired fails on null");
    t.is(required(undefined), "Is required", "isRequired fails on undefined");
    t.is(required(""), "Is required", "isRequired accepts not empty strings");
}
function testMinLengthValidator(t) {
    var minLength4 = validators_1.minLength(4)(function () { return "Should be at least 4"; });
    t.is(minLength4("foo bar"), null, "minLength(4) accepts strings with 4+ characters");
    t.is(minLength4("fooz"), null, "minLength(4) accepts strings with 4 characters");
    t.is(minLength4("foo"), "Should be at least 4", "minLength(4) fails on strings with 4- characters");
}
function testMaxLengthValidator(t) {
    var maxLength4 = validators_1.maxLength(4)(function () { return "Should be at most 4"; });
    t.is(maxLength4("foo bar"), "Should be at most 4", "maxLength(4) fails on strings with 4+ characters");
    t.is(maxLength4("fooz"), null, "maxLength(4) accepts strings with 4 characters");
    t.is(maxLength4("foo"), null, "maxLength(4) accepts strings with 4- characters");
}
tape("validators", function (t) {
    t.plan(10);
    testIsRequired(t);
    testMinLengthValidator(t);
    testMaxLengthValidator(t);
});
//# sourceMappingURL=validators.test.js.map