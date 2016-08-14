"use strict";
var get = require("lodash/get");
var mappet_1 = require("mappet");
function buildModifier(validators) {
    return function (value, source) { return validators
        .map(function (validator) { return validator(value); })
        .filter(function (error) { return error !== null; }); };
}
function checkValidity(schema, errors) {
    return schema.reduce(function (valid, _a) {
        var dest = _a[0];
        return valid && !get(errors, dest).length;
    }, true);
}
/**
 * Produce validator based on provided schema
 *
 * @returns Validator based on provided schema
 */
function policeman(schema) {
    var validationSchema = schema
        .map(function (_a) {
        var dest = _a[0], source = _a[1], validators = _a[2];
        return [dest, source, buildModifier(validators)];
    });
    return function (source) {
        var errors = mappet_1.default(validationSchema)(source);
        var valid = checkValidity(schema, errors);
        return { errors: errors, valid: valid };
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = policeman;
//# sourceMappingURL=policeman.js.map