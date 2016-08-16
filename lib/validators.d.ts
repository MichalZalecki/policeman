import { Message } from "./policeman";
export declare const isRequired: (message: Message) => (value: string | boolean) => string;
export declare const minLength: (min: number) => (message: Message) => (value: string) => string;
export declare const maxLength: (max: number) => (message: Message) => (value: string) => string;
export declare const isEmail: (message: Message) => (value: string) => string;
