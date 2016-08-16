import { Source, Result, Filter } from "mappet";
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
export declare type BasicSchemaEntry = [string, string, EntryValidator[]];
export declare type FilterableSchemaEntry = [string, string, EntryValidator[], Filter];
export declare type Schema = [BasicSchemaEntry | FilterableSchemaEntry];
/**
 * Produce validator based on provided schema
 *
 * @returns Validator based on provided schema
 */
export default function policeman(schema: Schema): SchemaValidator;
