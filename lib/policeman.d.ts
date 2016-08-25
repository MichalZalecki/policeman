export interface Filter {
    (value: any, source: Object): boolean;
}
export interface Validator {
    (value: any, source: Object): string;
}
export declare type Validate = Validator | Validator[];
export declare type Schema = Array<[string, string, Validate] | [string, string, Validate, Filter]>;
/**
 * Produce validator based on provided schema
 *
 * @returns Validator based on provided schema
 */
export default function policeman(schema: Schema): (source: Object) => {
    errors: any;
    valid: any;
};
/**
 * Combines list of validators passed as params into single validator
 *
 * @returns Validator capable of performing multiple validations, returning first error
 */
export declare function combineValidators(...validators: Validator[]): Validator;
export * from "./validators";
