import { Source, Result } from "mappet";
export interface Message {
    (value: any): string;
}
export interface EntryValidator {
    (value: any): string;
}
export interface SchemaValidator {
    (source: Source): {
        errors: Result;
        valid: boolean;
    };
}
export declare type SchemaEntry = [string, string, EntryValidator[]];
export declare type Schema = SchemaEntry[];
/**
 * Produce validator based on provided schema
 *
 * @returns Validator based on provided schema
 */
export default function policeman(schema: Schema): SchemaValidator;
