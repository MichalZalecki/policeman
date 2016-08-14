"use strict";
var tape = require("tape");
var policeman_1 = require("../lib/policeman");
var validators_1 = require("../lib/validators");
function returnsErrorObjects(t) {
    var required = validators_1.isRequired(function () { return "is required"; });
    var minLength20 = validators_1.minLength(20)(function () { return "should contain at least 10 characters"; });
    var schema = [
        ["firstName", "personal.first_name", [required]],
        ["lastName", "personal.last_name", [required]],
        ["other.bio", "bio", [required, minLength20]],
    ];
    var validator = policeman_1.default(schema);
    var source = {
        personal: {
            first_name: "Foo",
        },
        bio: "Lorem ipsum",
    };
    var expected = {
        firstName: [],
        lastName: ["is required"],
        other: {
            bio: ["should contain at least 10 characters"],
        }
    };
    var errors = validator(source).errors;
    t.deepEqual(errors, expected, "validator returns errors object defined by schema");
}
function determinesWhetherSourceIsValid(t) {
    var required = validators_1.isRequired(function () { return "is required"; });
    var schema = [["name", "name", [required]]];
    var validator = policeman_1.default(schema);
    t.is(validator({}).valid, false, "validator determines whether source is valid");
    t.is(validator({ name: "foo" }).valid, true, "validator determines whether source is not valid");
}
tape("policeman", function (t) {
    t.plan(3);
    returnsErrorObjects(t);
    determinesWhetherSourceIsValid(t);
});
//# sourceMappingURL=policeman.test.js.map