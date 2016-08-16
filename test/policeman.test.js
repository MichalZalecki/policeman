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
        },
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
function makeUseOfMapperFilter(t) {
    var required = validators_1.isRequired(function () { return "is required"; });
    var isUnderage = function (_value, source) { return source.age < 18; };
    var schema = [
        ["name", "name", [required]],
        ["clubCard", "clubCard", [required], isUnderage],
    ];
    var validator = policeman_1.default(schema);
    t.is(validator({ name: "Foo", age: 18 }).valid, true);
    t.is(validator({ name: "Foo", age: 17 }).valid, false);
    t.deepEqual(validator({ name: "Foo", age: 17 }).errors.clubCard, ["is required"]);
    t.is(validator({ name: "Foo", age: 17, clubCard: "123ABC" }).valid, true);
}
tape("policeman", function (t) {
    t.plan(7);
    returnsErrorObjects(t);
    determinesWhetherSourceIsValid(t);
    makeUseOfMapperFilter(t);
});
//# sourceMappingURL=policeman.test.js.map