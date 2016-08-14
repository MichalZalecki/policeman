"use strict";
exports.isRequired = function (message) { return function (value) {
    var valid = value !== null && value !== undefined && value !== "";
    return valid ? null : message(value);
}; };
exports.minLength = function (min) { return function (message) { return function (value) {
    var valid = value.length >= min;
    return valid ? null : message(value);
}; }; };
exports.maxLength = function (max) { return function (message) { return function (value) {
    var valid = value.length <= max;
    return valid ? null : message(value);
}; }; };
//# sourceMappingURL=validators.js.map