import * as get from "lodash/get";
import mappet, { Source, Result, Modifier, Schema as MappetSchema } from "mappet";

export interface Message {
  (value: any): string;
}

export interface EntryValidator {
  (value: any): string;
}

export interface SchemaValidator {
  (source: Source): { errors: Result, valid: boolean };
}

export type SchemaEntry = [string, string, EntryValidator[]];
export type Schema = SchemaEntry[];

function buildModifier(validators: EntryValidator[]): Modifier {
  return (value, source) => validators
    .map(validator => validator(value))
    .filter(error => error !== null);
}

function checkValidity(schema: Schema, errors: Source): boolean {
  return schema.reduce((valid, [dest]) => valid && !(<string[]>get(errors, dest)).length, true);
}

/**
 * Produce validator based on provided schema
 * 
 * @returns Validator based on provided schema
 */
export default function policeman(schema: Schema): SchemaValidator {
  const validationSchema = <MappetSchema>schema
    .map(([dest, source, validators]) => [dest, source, buildModifier(validators)]);

  return (source: Source) => {
    const errors: Result = mappet(validationSchema)(source);
    const valid: boolean = checkValidity(schema, errors);
    return { errors, valid };
  };
}