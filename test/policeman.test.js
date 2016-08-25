"use strict";
const tape = require("tape");
const policeman_1 = require("../lib/policeman");
const validators_1 = require("../lib/validators");
function appliesSignleValidator(t) {
    const requiredCheck = validators_1.isRequired(() => "is required");
    const validator = policeman_1.default([
        ["fullName", "full_name", requiredCheck],
    ]);
    const actual = validator({});
    const expected = {
        valid: false,
        errors: {
            fullName: "is required",
        },
    };
    t.deepEqual(actual, expected, "results in single error if single validator was specified");
}
function appliesMultipleValidators(t) {
    const requiredCheck = validators_1.isRequired(() => "is required");
    const emailCheck = validators_1.isEmail(() => "is invalid email");
    const validator = policeman_1.default([
        ["email", "email", [requiredCheck, emailCheck]],
    ]);
    const actual = validator({});
    const expected = {
        valid: false,
        errors: {
            email: ["is required", "is invalid email"],
        },
    };
    t.deepEqual(actual, expected, "results in multiple errors if multiple validators were specified");
}
function combinesMultipleValidators(t) {
    const requiredCheck = validators_1.isRequired(() => "is required");
    const emailCheck = validators_1.isEmail(() => "is invalid email");
    const validator = policeman_1.default([
        ["email", "email", policeman_1.combineValidators(requiredCheck, emailCheck)],
    ]);
    const actual = validator({ email: "invalid" });
    const expected = {
        valid: false,
        errors: {
            email: "is invalid email",
        },
    };
    t.deepEqual(actual, expected, "results in single error if multiple validators were combined");
}
function validCombinesMultipleValidators(t) {
    const requiredCheck = validators_1.isRequired(() => "is required");
    const emailCheck = validators_1.isEmail(() => "is invalid email");
    const validator = policeman_1.default([
        ["email", "email", policeman_1.combineValidators(requiredCheck, emailCheck)],
    ]);
    const actual = validator({ email: "test@example.com" });
    const expected = {
        valid: true,
        errors: {
            email: null,
        },
    };
    t.deepEqual(actual, expected, "passes validation with combined multiple validators");
}
function skipValidationByFilter(t) {
    const requiredCheck = validators_1.isRequired(() => "is required");
    const emailCheck = validators_1.isEmail(() => "is invalid email");
    const isntGuest = (value, source) => source.guest !== true;
    const validator = policeman_1.default([
        ["email", "email", [requiredCheck, emailCheck], isntGuest],
        ["name", "name", requiredCheck],
    ]);
    const actual = validator({ guest: true });
    const expected = {
        valid: false,
        errors: {
            name: "is required",
        },
    };
    t.deepEqual(actual, expected, "skips entry validation if filter gives false");
}
function validSkipValidationByFilter(t) {
    const requiredCheck = validators_1.isRequired(() => "is required");
    const emailCheck = validators_1.isEmail(() => "is invalid email");
    const isntGuest = (value, source) => source.guest !== true;
    const validator = policeman_1.default([
        ["email", "email", [requiredCheck, emailCheck], isntGuest],
        ["name", "name", requiredCheck],
    ]);
    const actual = validator({ guest: true, name: "Foo" });
    const expected = {
        valid: true,
        errors: {
            name: null,
        },
    };
    t.deepEqual(actual, expected, "skips entry validation if filter gives false");
}
tape("policeman", (t) => {
    t.plan(6);
    appliesSignleValidator(t);
    appliesMultipleValidators(t);
    combinesMultipleValidators(t);
    validCombinesMultipleValidators(t);
    skipValidationByFilter(t);
    validSkipValidationByFilter(t);
});
//# sourceMappingURL=policeman.test.js.map