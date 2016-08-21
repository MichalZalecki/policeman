import * as tape from "tape";
import policeman, { combineValidators, Filter } from "../lib/policeman";
import { isRequired, isEmail } from "../lib/validators";

type Test = tape.Test;

function appliesSignleValidator(t: Test) {
  const requiredCheck = isRequired(() => "is required");

  const validator = policeman([
    ["fullName", "full_name", requiredCheck],
  ]);

  const actual = validator({});
  const expected = {
    valid: false,
    errors: {
      fullName: "is required",
    },
  };

  t.deepEqual(actual, expected, "results in single error if single validator was specified");
}

function appliesMultipleValidators(t: Test) {
  const requiredCheck = isRequired(() => "is required");
  const emailCheck = isEmail(() => "is invalid email");

  const validator = policeman([
    ["email", "email", [requiredCheck, emailCheck]],
  ]);

  const actual = validator({});
  const expected = {
    valid: false,
    errors: {
      email: ["is required", "is invalid email"],
    },
  };

  t.deepEqual(actual, expected, "results in multiple errors if multiple validators were specified");
}

function combinesMultipleValidators(t: Test) {
  const requiredCheck = isRequired(() => "is required");
  const emailCheck = isEmail(() => "is invalid email");

  const validator = policeman([
    ["email", "email", combineValidators(requiredCheck, emailCheck)],
  ]);

  const actual = validator({ email: "invalid" });
  const expected = {
    valid: false,
    errors: {
      email: "is invalid email",
    },
  };

  t.deepEqual(actual, expected, "results in single error if multiple validators were combined");
}

function skipValidationByFilter(t: Test) {
  interface User {
    guest: boolean;
    email?: string;
  }
  const requiredCheck = isRequired(() => "is required");
  const emailCheck = isEmail(() => "is invalid email");
  const isntGuest: Filter = (value: any, source: User) => source.guest !== true;

  const validator = policeman([
    ["email", "email", [requiredCheck, emailCheck], isntGuest],
  ]);

  const actual = validator({ guest: true });
  const expected = {
    valid: true,
    errors: {},
  };

  t.deepEqual(actual, expected, "skips entry validation if filter gives false");
}

tape("policeman", (t: Test) => {
  t.plan(4);
  appliesSignleValidator(t);
  appliesMultipleValidators(t);
  combinesMultipleValidators(t);
  skipValidationByFilter(t);
});
