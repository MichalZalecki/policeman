"use strict";
var curry = require("lodash/curry");
exports.isRequired = curry(function (message, value) {
    var valid = value !== null && value !== undefined && value !== "";
    return valid ? null : message(value);
});
exports.isMinLength = curry(function (min, message, value) {
    var valid = value.length >= min;
    return valid ? null : message(value);
});
exports.isMaxLength = curry(function (max, message, value) {
    var valid = value.length <= max;
    return valid ? null : message(value);
});
exports.isEqualLength = curry(function (equal, message, value) {
    var valid = value.length === equal;
    return valid ? null : message(value);
});
exports.isEmail = curry(function (message, value) {
    var valid = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i.test(value);
    return valid ? null : message(value);
});
exports.isMatching = curry(function (regexp, message, value) {
    var valid = regexp.test(value);
    return valid ? null : message(value);
});
exports.isPassing = curry(function (predicate, message, value) {
    var valid = predicate(value);
    return valid ? null : message(value);
});
//# sourceMappingURL=validators.js.map