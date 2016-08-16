import { Message } from "./policeman";

export const isRequired = (message: Message) => (value: string | boolean) => {
  const valid = value !== null && value !== undefined && value !== "" && value;
  return valid ? null : message(value);
};

export const minLength = (min: number) => (message: Message) => (value: string) => {
  const valid = value.length >= min;
  return valid ? null : message(value);
};

export const maxLength = (max: number) => (message: Message) => (value: string) => {
  const valid = value.length <= max;
  return valid ? null : message(value);
};

export const isEmail = (message: Message) => (value: string) => {
  const valid = /^[a-z0-9_\-\.]{2,}@[a-z0-9_\-\.]{2,}\.[a-z]{2,}$/i.test(value);
  return valid ? null : message(value);
};
