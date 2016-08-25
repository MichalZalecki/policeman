"use strict";
var tape = require("tape");
var policeman_1 = require("../lib/policeman");
var validators_1 = require("../lib/validators");
function appliesSignleValidator(t) {
    var requiredCheck = validators_1.isRequired(function () { return "is required"; });
    var validator = policeman_1.default([
        ["fullName", "full_name", requiredCheck],
    ]);
    var actual = validator({});
    var expected = {
        valid: false,
        errors: {
            fullName: "is required",
        },
    };
    t.deepEqual(actual, expected, "results in single error if single validator was specified");
}
function appliesMultipleValidators(t) {
    var requiredCheck = validators_1.isRequired(function () { return "is required"; });
    var emailCheck = validators_1.isEmail(function () { return "is invalid email"; });
    var validator = policeman_1.default([
        ["email", "email", [requiredCheck, emailCheck]],
    ]);
    var actual = validator({});
    var expected = {
        valid: false,
        errors: {
            email: ["is required", "is invalid email"],
        },
    };
    t.deepEqual(actual, expected, "results in multiple errors if multiple validators were specified");
}
function combinesMultipleValidators(t) {
    var requiredCheck = validators_1.isRequired(function () { return "is required"; });
    var emailCheck = validators_1.isEmail(function () { return "is invalid email"; });
    var validator = policeman_1.default([
        ["email", "email", policeman_1.combineValidators(requiredCheck, emailCheck)],
    ]);
    var actual = validator({ email: "invalid" });
    var expected = {
        valid: false,
        errors: {
            email: "is invalid email",
        },
    };
    t.deepEqual(actual, expected, "results in single error if multiple validators were combined");
}
function validCombinesMultipleValidators(t) {
    var requiredCheck = validators_1.isRequired(function () { return "is required"; });
    var emailCheck = validators_1.isEmail(function () { return "is invalid email"; });
    var validator = policeman_1.default([
        ["email", "email", policeman_1.combineValidators(requiredCheck, emailCheck)],
    ]);
    var actual = validator({ email: "test@example.com" });
    var expected = {
        valid: true,
        errors: {
            email: null,
        },
    };
    t.deepEqual(actual, expected, "passes validation with combined multiple validators");
}
function skipValidationByFilter(t) {
    var requiredCheck = validators_1.isRequired(function () { return "is required"; });
    var emailCheck = validators_1.isEmail(function () { return "is invalid email"; });
    var phoneNumberCheck = validators_1.isMatching(/\d{3}-?\d{3}-?\d{3}/, function () { return "is invalid phone"; });
    var skipGift = function (value, source) { return source.gift === true; };
    var validator = policeman_1.default([
        ["email", "email", [requiredCheck, emailCheck]],
        ["phone", "phone", policeman_1.combineValidators(requiredCheck, phoneNumberCheck)],
        ["giftCode", "giftCode", requiredCheck, skipGift],
    ]);
    var actual = validator({ gift: false, email: "invalid@example", phone: "777-666-55" });
    var expected = {
        valid: false,
        errors: {
            email: ["is invalid email"],
            phone: "is invalid phone",
        },
    };
    t.deepEqual(actual, expected, "skips entry validation if filter gives false");
}
function validSkipValidationByFilter(t) {
    var requiredCheck = validators_1.isRequired(function () { return "is required"; });
    var emailCheck = validators_1.isEmail(function () { return "is invalid email"; });
    var isntGuest = function (value, source) { return source.guest !== true; };
    var validator = policeman_1.default([
        ["email", "email", [requiredCheck, emailCheck], isntGuest],
        ["name", "name", requiredCheck],
    ]);
    var actual = validator({ guest: true, name: "Foo" });
    var expected = {
        valid: true,
        errors: {
            name: null,
        },
    };
    t.deepEqual(actual, expected, "skips entry validation if filter gives false");
}
tape("policeman", function (t) {
    t.plan(6);
    appliesSignleValidator(t);
    appliesMultipleValidators(t);
    combinesMultipleValidators(t);
    validCombinesMultipleValidators(t);
    skipValidationByFilter(t);
    validSkipValidationByFilter(t);
});
//# sourceMappingURL=policeman.test.js.map