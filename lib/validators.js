"use strict";
exports.isRequired = function (message) { return function (value) {
    var valid = value !== null && value !== undefined && value !== "" && value;
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
exports.isEmail = function (message) { return function (value) {
    var valid = /^[a-z0-9_\-\.]{2,}@[a-z0-9_\-\.]{2,}\.[a-z]{2,}$/i.test(value);
    return valid ? null : message(value);
}; };
//# sourceMappingURL=validators.js.map