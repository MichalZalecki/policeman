"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var get = require("lodash/get");
var set = require("lodash/set");
/**
 * Default filter function which accepts each entry
 */
function always() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    return true;
}
/**
 * Apply validator for specified value and source
 */
function applyValidators(value, source, validators) {
    return validators.map(function (validator) { return validator(value, source); }).filter(Boolean);
}
function appendValue(source, errorPath, sourcePath, validate, filter) {
    if (filter === void 0) { filter = always; }
    var value = get(source, sourcePath);
    return [errorPath, sourcePath, validate, filter, value];
}
function omitByFilter(source, errorPath, sourcePath, validate, filter, value) {
    return filter(value, source);
}
function validateToErrors(source, errorPath, sourcePath, validate, filter, value) {
    if (validate instanceof Array) {
        var errors = applyValidators(value, source, validate);
        var valid = !errors.length;
        return [errorPath, errors, valid];
    }
    else {
        var error = validate(value, source);
        var valid = error === null;
        return [errorPath, error, valid];
    }
}
/**
 * Produce validator based on provided schema
 *
 * @returns Validator based on provided schema
 */
function policeman(schema) {
    return function (source) {
        var validated = schema
            .map(function (entry) { return appendValue.apply(null, [source].concat(entry)); })
            .filter(function (entry) { return omitByFilter.apply(null, [source].concat(entry)); })
            .map(function (entry) { return validateToErrors.apply(null, [source].concat(entry)); });
        var errors = validated.reduce(function (errs, _a) {
            var errorPath = _a[0], error = _a[1];
            return set(errs, errorPath, error);
        }, {});
        var valid = validated.reduce(function (val, _a) {
            var _errorPath = _a[0], _error = _a[1], correct = _a[2];
            return val && correct;
        }, true);
        return { errors: errors, valid: valid };
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = policeman;
/**
 * Combines list of validators passed as params into single validator
 *
 * @returns Validator capable of performing multiple validations, returning first error
 */
function combineValidators() {
    var validators = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        validators[_i - 0] = arguments[_i];
    }
    return function (value, source) { return applyValidators(value, source, validators)[0] || null; };
}
exports.combineValidators = combineValidators;
__export(require("./validators"));
//# sourceMappingURL=policeman.js.map