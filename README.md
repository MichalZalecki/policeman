# policeman

[![CircleCI](https://circleci.com/gh/MichalZalecki/policeman.svg?style=svg)](https://circleci.com/gh/MichalZalecki/policeman)

Lightweight yet powerful schema validator

***
[API Docs](https://michalzalecki.github.io/policeman) | [Examples](#examples)
***

* Validate objects based on provided schema
* Inspired by [mappet](https://github.com/MichalZalecki/mappet/)

## Installation ([npm](https://www.npmjs.com/package/policeman))

```
npm i -S policeman
```

## Examples

```js
import policeman, { isRequired, isEmail, isMatching, combineValidators } from "policeman";

// setup entry validators
const requiredValidator = isRequired(() => "is required");
const emailValidator = isEmail(() => "is invalid email");
const phoneNumberValidator = isMatching(/\d{3}-?\d{3}-?\d{3}/, () => "is invalid phone");

// setup entry filter predicates
const skipIfGift: Filter = (value: any, source: User) => source.gift === true;

// define schema
const schema = [
  // 1. array of validators - multiple errors
  // 2. combine validators - first of many errors
  // 3. single validator - single error
  // 4. skip validation based on filter predicate
  ["email", "email", [requiredValidator, emailValidator]], // #1
  ["phone", "phone", combineValidators(requiredValidator, phoneNumberValidator)], // #2
  ["name", "name", requiredValidator], // #3
  ["giftCode", "giftCode", requiredValidator, skipIfGift], // #4
];

// create validator
const validator = policeman(schema);

// validate
validator({ gift: false, email: "invalid@example", phone: "777-666-55" });

// {
//   valid: false,
//   errors: {
//     email: ["is invalid email"],
//     phone: "is invalid phone",
//     name: "is required"
//   }
// }
```

See [tests](src/test/policeman.test.ts) for more examples.

## Built-in validators

All built-in validators are [curried](https://lodash.com/docs#curry).

### `isRequired(() => message, value)`

Validates presence. Fails on `null`, empty string or `undefined`.

### `isMinLength(min, () => message, value)`

Passed `value` must be a string longer or with length equal to `min`.

### `isMaxLength(max, () => message, value)`

Passed `value` must be a string shorther or with length equal to `max`.

### `isEqualLength(equal, () => message, value)`

Passed `value` must be a string shorther or with length equal to `max`.

### `isEmail(() => message, value)`

Passed `value` must be a valid email. It's a simple check, if you need more complex solution use
`isMatching` or `isPassing`.

### `isMatching(regexp, () => message, value)`

Passed `value` must pass `regexp`.

### `isPassing(predicate, () => message, value)`

Passed `predicate` answers on "Is `value` valid?". When `predicate` returns `true` validator passes,
when `predicate` returns `false` error message is returned.

It makes `policeman` compatible with all available validators i.e. [validator](https://www.npmjs.com/package/validator).

```js
import validator from "validator";
import { isPassing } from "policeman";

const isCreditCard = isPassing(validator.isCreditCard, () => "is invalid credit card");
const isUUID4 = isPassing(value => validator.isUUID(value, 4), () => "is invalid UUID v4");
const isFTP = isPassing(value => validator.isURL(value, { protocols: ["ftp"] }, () => "is invalid FTP address");
```

See [tests](src/test/validators.test.ts) for more examples.
