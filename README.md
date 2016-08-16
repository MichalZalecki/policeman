# policeman

Lightweight yet powerful schema validator

***
[API Docs](https://michalzalecki.github.io/policeman) | [Examples](#examples)
***

* Validate objects based on provided schemas
* Build with [mappet](https://github.com/MichalZalecki/mappet/)

## Installation ([npm](https://www.npmjs.com/package/policeman))

```
npm i -S policeman
```

## Built-in validators

### `isRequired(message, value)`

Validates presence.

### `minLength(min, message, value)`

Passed `value` must be a string longer or with length equal to `min`.

### `maxLength(max, message, value)`

Passed `value` must be a string shorther or with length equal to `max`.

### `isEmail(message, value)`

Passed `value` must be a valid email.

### `isMaching(regexp, message, value)`

Passed `value` must pass `regexp`.

### `isPassing(predicate, message, value)`

Passed `predicate` answers on "Is `value` valid?". When `predicate` returns `true` validator passes,
when `predicate` returns `false` error message is returned.

## Examples

TODO
