import * as get from "lodash/get";
import mappet, { Source, Result, Modifier, Filter, Schema as MappetSchema } from "mappet";

export interface Message {
  (value: any): string;
}

export interface EntryValidator {
  (value: any): string;
}

export interface SchemaValidator {
  (source: Source): { errors: Result, valid: boolean };
}

export type BasicSchemaEntry = [string, string, EntryValidator[]];
export type FilterableSchemaEntry = [string, string, EntryValidator[], Filter];
export type Schema = [BasicSchemaEntry | FilterableSchemaEntry];

function buildModifier(validators: EntryValidator[]): Modifier {
  return (value, source) => validators
    .map(validator => validator(value))
    .filter(error => error !== null);
}

function checkValidity(schema: Schema, errors: Source): boolean {
  return schema.reduce((valid, [dest]) => {
    const err = get(errors, dest);
    return valid && (err === undefined || (<string[]> get(errors, dest)).length === 0);
  }, true);
}

/**
 * Produce validator based on provided schema
 *
 * @returns Validator based on provided schema
 */
export default function policeman(schema: Schema): SchemaValidator {
  const validationSchema = <MappetSchema> schema
    .map(<FilterableSchemaEntry>([dest, source, validators, filter]) =>
      [dest, source, buildModifier(validators), filter]);

  return (source: Source) => {
    const errors = mappet(validationSchema)(source);
    const valid = checkValidity(schema, errors);
    return { errors, valid };
  };
}
