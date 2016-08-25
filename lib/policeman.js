"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
const get = require("lodash/get");
const set = require("lodash/set");
/**
 * Default filter function which accepts each entry
 */
function always(...args) {
    return true;
}
/**
 * Apply validator for specified value and source
 */
function applyValidators(value, source, validators) {
    return validators.map(validator => validator(value, source)).filter(Boolean);
}
function appendValue(source, errorPath, sourcePath, validate, filter = always) {
    const value = get(source, sourcePath);
    return [errorPath, sourcePath, validate, filter, value];
}
function omitByFilter(source, errorPath, sourcePath, validate, filter, value) {
    return filter(value, source);
}
function validateToErrors(source, errorPath, sourcePath, validate, filter, value) {
    if (validate instanceof Array) {
        const errors = applyValidators(value, source, validate);
        const valid = !errors.length;
        return [errorPath, errors, valid];
    }
    else {
        const error = validate(value, source);
        const valid = error === null;
        return [errorPath, error, valid];
    }
}
/**
 * Produce validator based on provided schema
 *
 * @returns Validator based on provided schema
 */
function policeman(schema) {
    return (source) => {
        const validated = schema
            .map(entry => appendValue.apply(null, [source, ...entry]))
            .filter(entry => omitByFilter.apply(null, [source, ...entry]))
            .map(entry => validateToErrors.apply(null, [source, ...entry]));
        const errors = validated.reduce((errs, [errorPath, error]) => set(errs, errorPath, error), {});
        const valid = !validated.find(([_errorPath, _error, correct]) => !correct);
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
function combineValidators(...validators) {
    return (value, source) => applyValidators(value, source, validators)[0] || null;
}
exports.combineValidators = combineValidators;
__export(require("./validators"));
//# sourceMappingURL=policeman.js.map