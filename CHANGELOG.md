# CHANGELOG

## 0.2.4

* Update Email Regexp

## 0.2.3

* Target ES5

## 0.2.2

* Improve example in README

## 0.2.1

* Fix #1
* Add example to the README.md

## 0.2.0

* Errors format corresponds to validation format ([more](src/test/policeman.test.ts))
* Direct validators import i.e. `import { isEmail } from "policeman"`
* Rename maxLength and minLength to isMaxLength and isMinLength
* Add isEqualLength validator

## 0.1.0

* Allow for filtering schema entries
* Add `isEmail`, `isMatching` and `isPassing` validators
