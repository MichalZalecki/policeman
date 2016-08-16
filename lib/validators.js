"use strict";
var curry = require("lodash/curry");
exports.isRequired = curry(function (message, value) {
    var valid = value !== null && value !== undefined && value !== "" && value;
    return valid ? null : message(value);
});
exports.minLength = curry(function (min, message, value) {
    var valid = value.length >= min;
    return valid ? null : message(value);
});
exports.maxLength = curry(function (max, message, value) {
    var valid = value.length <= max;
    return valid ? null : message(value);
});
exports.isEmail = curry(function (message, value) {
    var valid = /^[a-z0-9_\-\.]{2,}@[a-z0-9_\-\.]{2,}\.[a-z]{2,}$/i.test(value);
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