export declare type Message = (value: any) => string;
export declare const isRequired: _.CurriedFunction2<Message, string | boolean, string>;
export declare const isMinLength: _.CurriedFunction3<number, Message, string, string>;
export declare const isMaxLength: _.CurriedFunction3<number, Message, string, string>;
export declare const isEqualLength: _.CurriedFunction3<number, Message, string, string>;
export declare const isEmail: _.CurriedFunction2<Message, string, string>;
export declare const isMatching: _.CurriedFunction3<RegExp, Message, string, string>;
export declare const isPassing: _.CurriedFunction3<(value: any) => boolean, Message, string, string>;
