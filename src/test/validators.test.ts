import * as tape from "tape";
import {
  isRequired,
  isMinLength,
  isMaxLength,
  isEqualLength,
  isEmail,
  isMatching,
  isPassing,
} from "../lib/policeman";

function testIsRequired(t: tape.Test) {
  const required = isRequired(() => "is required");
  t.is(required(""), "is required", "isRequired fails on empty string");
  t.is(required(null), "is required", "isRequired fails on null");
  t.is(required(undefined), "is required", "isRequired fails on undefined");
  t.is(required(false), null, "isRequired accepts false");
  t.is(required("foo"), null, "isRequired accepts not empty strings");
}

function testIsMinLengthValidator(t: tape.Test) {
  const isMinLength4 = isMinLength(4, () => "should be at least 4");
  t.is(isMinLength4("foo bar"), null, "isMinLength(4) accepts strings with 4+ characters");
  t.is(isMinLength4("fooz"), null, "isMinLength(4) accepts strings with 4 characters");
  t.is(isMinLength4("foo"), "should be at least 4", "isMinLength(4) fails on strings with 4- characters");
}

function testIsMaxLengthValidator(t: tape.Test) {
  const isMaxLength4 = isMaxLength(4, () => "should be at most 4");
  t.is(isMaxLength4("foo bar"), "should be at most 4", "isMaxLength(4) fails on strings with 4+ characters");
  t.is(isMaxLength4("fooz"), null, "isMaxLength(4) accepts strings with 4 characters");
  t.is(isMaxLength4("foo"), null, "isMaxLength(4) accepts strings with 4- characters");
}

function testIsEqualLengthValidator(t: tape.Test) {
  const isEqualLength4 = isEqualLength(4, () => "should be 4 characters long");
  t.is(isEqualLength4("abc"), "should be 4 characters long", "isEqualLength(4) fails on 3 characters long string");
  t.is(isEqualLength4("abcde"), "should be 4 characters long", "isEqualLength(4) fails on 5 characters long string");
  t.is(isEqualLength4("abcd"), null, "isEqualLength(4) accepts 4 characters long string");
}

function testIsEmail(t: tape.Test) {
  const email = isEmail(() => "is invalid email");
  t.is(email("foo@bar.com"), null, "isEmail accepts valid email");
  t.is(email("foo+1@bar.com"), null, "isEmail accepts valid email");
  t.is(email("foo@.com"), "is invalid email", "isEmail fails on invalid email");
}

function testIsMatching(t: tape.Test) {
  const matching = isMatching(/^\d{3}-?\d{3}-?\d{3}$/, () => "is invalid number");
  t.is(matching("777-888-999"), null, "isMatching(/^\d{3}-?\d{3}-?\d{3}$/) accepts valid number");
  t.is(matching("777888999"), null, "isMatching(/^\d{3}-?\d{3}-?\d{3}$/) accepts valid number");
  t.is(matching("aaa-bbb-ccc"), "is invalid number", "isMatching(/^\d{3}-?\d{3}-?\d{3}$/) fails on invalid number");
}

function testIsPassing(t: tape.Test) {
  const isFoo = (str: string) => str === "foo";
  const matching = isPassing(isFoo, () => "must be \"foo\"");
  t.is(matching("foo"), null, "predicate returns true on \"foo\"");
  t.is(matching("bar"), "must be \"foo\"", "predicate returns false on not \"foo\"");
}

tape("validators", (t: tape.Test) => {
  t.plan(22);
  testIsRequired(t);
  testIsMinLengthValidator(t);
  testIsMaxLengthValidator(t);
  testIsEqualLengthValidator(t);
  testIsEmail(t);
  testIsMatching(t);
  testIsPassing(t);
});
