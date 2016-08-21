"use strict";
const curry = require("lodash/curry");
exports.isRequired = curry((message, value) => {
    const valid = value !== null && value !== undefined && value !== "";
    return valid ? null : message(value);
});
exports.isMinLength = curry((min, message, value) => {
    const valid = value.length >= min;
    return valid ? null : message(value);
});
exports.isMaxLength = curry((max, message, value) => {
    const valid = value.length <= max;
    return valid ? null : message(value);
});
exports.isEqualLength = curry((equal, message, value) => {
    const valid = value.length === equal;
    return valid ? null : message(value);
});
exports.isEmail = curry((message, value) => {
    const valid = /^[a-z0-9_\-\.]{2,}@[a-z0-9_\-\.]{2,}\.[a-z]{2,}$/i.test(value);
    return valid ? null : message(value);
});
exports.isMatching = curry((regexp, message, value) => {
    const valid = regexp.test(value);
    return valid ? null : message(value);
});
exports.isPassing = curry((predicate, message, value) => {
    const valid = predicate(value);
    return valid ? null : message(value);
});
//# sourceMappingURL=validators.js.map