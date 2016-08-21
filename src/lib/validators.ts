import * as curry from "lodash/curry";

type Message = (value: any) => string;

export const isRequired = curry((message: Message, value: string | boolean) => {
  const valid = value !== null && value !== undefined && value !== "";
  return valid ? null : message(value);
});

export const isMinLength = curry((min: number, message: Message, value: string) => {
  const valid = value.length >= min;
  return valid ? null : message(value);
});

export const isMaxLength = curry((max: number, message: Message, value: string) => {
  const valid = value.length <= max;
  return valid ? null : message(value);
});

export const isEqualLength = curry((equal: number, message: Message, value: string) => {
  const valid = value.length === equal;
  return valid ? null : message(value);
});

export const isEmail = curry((message: Message, value: string) => {
  const valid = /^[a-z0-9_\-\.]{2,}@[a-z0-9_\-\.]{2,}\.[a-z]{2,}$/i.test(value);
  return valid ? null : message(value);
});

export const isMatching = curry((regexp: RegExp, message: Message, value: string) => {
  const valid = regexp.test(value);
  return valid ? null : message(value);
});

export const isPassing = curry((predicate: ((value: any) => boolean), message: Message, value: string) => {
  const valid = predicate(value);
  return valid ? null : message(value);
});
