import * as get from "lodash/get";
import * as set from "lodash/set";

export interface Filter {
  (value: any, source: Object): boolean;
}

export interface Validator {
  (value: any, source: Object): string;
}

export type Validate = Validator | Validator[];
type Error = string | string[];

/**
 * Default filter function which accepts each entry
 */
function always(...args: Array<any>): boolean {
  return true;
}

/**
 * Apply validator for specified value and source
 */
function applyValidators(value: any, source: Object, validators: Validator[]) {
  return validators.map(validator => validator(value, source)).filter(Boolean);
}

function appendValue(
  source: Object,
  errorPath: string,
  sourcePath: string,
  validate: Validate,
  filter: Filter = always
): [string, string, Validate, Filter, any] {
  const value = get(source, sourcePath);
  return [errorPath, sourcePath, validate, filter, value];
}

function omitByFilter(
  source: Object,
  errorPath: string,
  sourcePath: string,
  validate: Validate,
  filter: Filter,
  value: any
): boolean {
  return filter(value, source);
}

function validateToErrors(
  source: Object,
  errorPath: string,
  sourcePath: string,
  validate: Validate,
  filter: Filter,
  value: any
): [string, Error, boolean] {
  if (validate instanceof Array) {
    const errors = applyValidators(value, source, validate);
    const valid = !errors.length;
    return [errorPath, errors, valid];
  } else {
    const error = validate(value, source);
    const valid = error === null;
    return [errorPath, error, valid];
  }
}

export type Schema = Array<[string, string, Validate] | [string, string, Validate, Filter]>;

/**
 * Produce validator based on provided schema
 *
 * @returns Validator based on provided schema
 */
export default function policeman(schema: Schema) {
  return (source: Object) => {
    const validated = schema
      .map(entry => appendValue.apply(null, [source, ...entry]))
      .filter(entry => omitByFilter.apply(null, [source, ...entry]))
      .map(entry => validateToErrors.apply(null, [source, ...entry]));

    const errors = validated.reduce((errs: Object, [errorPath, error]) => set(errs, errorPath, error), {});
    const valid = validated.reduce((val, [_errorPath, _error, correct]) => val && correct, true);

    return { errors, valid };
  };
}

/**
 * Combines list of validators passed as params into single validator
 *
 * @returns Validator capable of performing multiple validations, returning first error
 */
export function combineValidators(...validators: Validator[]): Validator {
  return (value: any, source: Object) => applyValidators(value, source, validators)[0] || null;
}

export * from "./validators";
