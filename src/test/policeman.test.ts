import * as tape from "tape";
import policeman, { Schema } from "../lib/policeman";
import { isRequired, minLength } from "../lib/validators";

function returnsErrorObjects(t: tape.Test) {
  const required = isRequired(() => "is required");
  const minLength20 = minLength(20)(() => "should contain at least 10 characters");

  const schema: Schema = [
    ["firstName", "personal.first_name", [required]],
    ["lastName", "personal.last_name", [required]],
    ["other.bio", "bio", [required, minLength20]],
  ];
  const validator = policeman(schema);
  const source = {
    personal: {
      first_name: "Foo",
    },
    bio: "Lorem ipsum",
  }
  const expected = {
    firstName: <any[]>[],
    lastName: ["is required"],
    other: {
      bio: ["should contain at least 10 characters"],
    }
  };
  const { errors } = validator(source);
  t.deepEqual(errors, expected, "validator returns errors object defined by schema");
}

function determinesWhetherSourceIsValid(t: tape.Test) {
  const required = isRequired(() => "is required");
  const schema: Schema = [["name", "name", [required]]];
  const validator = policeman(schema);
  t.is(validator({}).valid, false, "validator determines whether source is valid");
  t.is(validator({ name: "foo" }).valid, true, "validator determines whether source is not valid");
}

tape("policeman", (t: tape.Test) => {
  t.plan(3);
  returnsErrorObjects(t);
  determinesWhetherSourceIsValid(t);
});