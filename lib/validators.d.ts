import { Message } from "./policeman";
export declare const isRequired: _.CurriedFunction2<Message, string | boolean, string>;
export declare const minLength: _.CurriedFunction3<number, Message, string, string>;
export declare const maxLength: _.CurriedFunction3<number, Message, string, string>;
export declare const isEmail: _.CurriedFunction2<Message, string, string>;
export declare const isMatching: _.CurriedFunction3<RegExp, Message, string, string>;
