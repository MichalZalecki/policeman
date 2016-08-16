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
        var err = get(errors, dest);
        return valid && (err === undefined || get(errors, dest).length === 0);
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
        var dest = _a[0], source = _a[1], validators = _a[2], filter = _a[3];
        return [dest, source, buildModifier(validators), filter];
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