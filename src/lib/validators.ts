import * as curry from "lodash/curry";
import { Message } from "./policeman";

export const isRequired = curry((message: Message, value: string | boolean) => {
  const valid = value !== null && value !== undefined && value !== "" && value;
  return valid ? null : message(value);
});

export const minLength = curry((min: number, message: Message, value: string) => {
  const valid = value.length >= min;
  return valid ? null : message(value);
});

export const maxLength = curry((max: number, message: Message, value: string) => {
  const valid = value.length <= max;
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
