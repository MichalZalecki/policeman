import * as tape from "tape";
import policeman, { combineValidators, Filter } from "../lib/policeman";
import { isRequired, isEmail, isMatching } from "../lib/validators";

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

function validCombinesMultipleValidators(t: Test) {
  const requiredCheck = isRequired(() => "is required");
  const emailCheck = isEmail(() => "is invalid email");

  const validator = policeman([
    ["email", "email", combineValidators(requiredCheck, emailCheck)],
  ]);

  const actual = validator({ email: "test@example.com" });
  const expected = {
    valid: true,
    errors: {
      email: null,
    },
  };

  t.deepEqual(actual, expected, "passes validation with combined multiple validators");
}

function skipValidationByFilter(t: Test) {
  interface User {
    gift: boolean;
    giftCode?: boolean;
    phone: string;
  }
  const requiredCheck = isRequired(() => "is required");
  const emailCheck = isEmail(() => "is invalid email");
  const phoneNumberCheck = isMatching(/\d{3}-?\d{3}-?\d{3}/, () => "is invalid phone");
  const skipGift: Filter = (value: any, source: User) => source.gift === true;

  const validator = policeman([
    ["email", "email", [requiredCheck, emailCheck]],
    ["phone", "phone", combineValidators(requiredCheck, phoneNumberCheck)],
    ["giftCode", "giftCode", requiredCheck, skipGift],
  ]);

  const actual = validator({ gift: false, email: "invalid@example", phone: "777-666-55" });
  const expected = {
    valid: false,
    errors: {
      email: ["is invalid email"],
      phone: "is invalid phone",
    },
  };

  t.deepEqual(actual, expected, "skips entry validation if filter gives false");
}

function validSkipValidationByFilter(t: Test) {
  interface User {
    guest: boolean;
    email?: string;
  }
  const requiredCheck = isRequired(() => "is required");
  const emailCheck = isEmail(() => "is invalid email");
  const isntGuest: Filter = (value: any, source: User) => source.guest !== true;

  const validator = policeman([
    ["email", "email", [requiredCheck, emailCheck], isntGuest],
    ["name", "name", requiredCheck],
  ]);

  const actual = validator({ guest: true, name: "Foo" });
  const expected = {
    valid: true,
    errors: {
      name: null,
    },
  };

  t.deepEqual(actual, expected, "skips entry validation if filter gives false");
}

tape("policeman", (t: Test) => {
  t.plan(6);
  appliesSignleValidator(t);
  appliesMultipleValidators(t);
  combinesMultipleValidators(t);
  validCombinesMultipleValidators(t);
  skipValidationByFilter(t);
  validSkipValidationByFilter(t);
});
