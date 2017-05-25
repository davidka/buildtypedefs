export interface BaseType {
  id: string,
  optional?: boolean,
  isReturn?: boolean /* TODO: get rid of this */
}

export interface FunctionType extends BaseType {
  type: "Function",
  params: Parameter[],
  returns?: Type
}

export interface ArrayType extends BaseType {
  type: "Array",
  typeParams: [Type]
}

export interface ObjectType extends BaseType {
  type: "Object",
  properties: { [propertyName: string]: Type }
}

export interface OtherType extends BaseType {
  type: string,
  typeParams?: Type[]
}

export type Type = FunctionType | ArrayType | ObjectType | OtherType

export interface ParameterArgs {
  rest?: boolean,
  name?: string
}

export type Parameter = Type & ParameterArgs

export function isFunction(t: Type): t is FunctionType {
  return t.type == "Function";
}

export function isArray(t: Type): t is ArrayType {
  return t.type == "Array";
}

export function isObject(t: Type): t is ObjectType {
  return t.type == "Object" && typeof t['properties'] == 'object';
}

export function isOther(t: Type): t is OtherType {
  return !(isFunction(t) || isArray(t) || isObject(t));
}