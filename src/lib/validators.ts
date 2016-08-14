import { Message } from "./policeman";

export const isRequired = (message: Message) => (value: string) => {
  const valid = value !== null && value !== undefined && value !== "";
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
