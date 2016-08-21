export declare const isRequired: _.CurriedFunction2<(value: any) => string, string | boolean, string>;
export declare const isMinLength: _.CurriedFunction3<number, (value: any) => string, string, string>;
export declare const isMaxLength: _.CurriedFunction3<number, (value: any) => string, string, string>;
export declare const isEqualLength: _.CurriedFunction3<number, (value: any) => string, string, string>;
export declare const isEmail: _.CurriedFunction2<(value: any) => string, string, string>;
export declare const isMatching: _.CurriedFunction3<RegExp, (value: any) => string, string, string>;
export declare const isPassing: _.CurriedFunction3<(value: any) => boolean, (value: any) => string, string, string>;
