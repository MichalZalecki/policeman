import * as tape from "tape";
import { EntryValidator } from "../lib/policeman";
import {
  isRequired,
  minLength,
  maxLength,
  isEmail,
  isMatching,
} from "../lib/validators";

function testIsRequired(t: tape.Test) {
  const required = isRequired(() => "is required");
  t.is(required(""), "is required", "isRequired fails on empty string");
  t.is(required(null), "is required", "isRequired fails on null");
  t.is(required(undefined), "is required", "isRequired fails on undefined");
  t.is(required(false), "is required", "isRequired fails on false");
  t.is(required("foo"), null, "isRequired accepts not empty strings");
}

function testMinLengthValidator(t: tape.Test) {
  const minLength4: EntryValidator = minLength(4, () => "should be at least 4");
  t.is(minLength4("foo bar"), null, "minLength(4) accepts strings with 4+ characters");
  t.is(minLength4("fooz"), null, "minLength(4) accepts strings with 4 characters");
  t.is(minLength4("foo"), "should be at least 4", "minLength(4) fails on strings with 4- characters");
}

function testMaxLengthValidator(t: tape.Test) {
  const maxLength4: EntryValidator = maxLength(4, () => "should be at most 4");
  t.is(maxLength4("foo bar"), "should be at most 4", "maxLength(4) fails on strings with 4+ characters");
  t.is(maxLength4("fooz"), null, "maxLength(4) accepts strings with 4 characters");
  t.is(maxLength4("foo"), null, "maxLength(4) accepts strings with 4- characters");
}

function testIsEmail(t: tape.Test) {
  const email = isEmail(() => "is invalid email");
  t.is(email("foo@bar.com"), null, "isEmail accepts valid email");
  t.is(email("foo@.com"), "is invalid email", "isEmail fails on invalid email");
}

function testIsMatching(t: tape.Test) {
  const matching = isMatching(/^\d{3}-?\d{3}-?\d{3}$/, () => "is invalid number");
  t.is(matching("777-888-999"), null, "isMatching(/^\d{3}-?\d{3}-?\d{3}$/) accepts valid number");
  t.is(matching("777888999"), null, "isMatching(/^\d{3}-?\d{3}-?\d{3}$/) accepts valid number");
  t.is(matching("aaa-bbb-ccc"), "is invalid number", "isMatching(/^\d{3}-?\d{3}-?\d{3}$/) fails on invalid number");
}

tape("validators", (t: tape.Test) => {
  t.plan(16);
  testIsRequired(t);
  testMinLengthValidator(t);
  testMaxLengthValidator(t);
  testIsEmail(t);
  testIsMatching(t);
});
