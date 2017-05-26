export interface FunctionType {
  type: "Function",
  id?: string
  params: Parameter[],
  returns?: ReturnType
}

export interface ArrayType {
  type: "Array",
  typeParams: [Type]
}

export interface ObjectType {
  type: "Object",
  properties: { [propertyName: string]: Property }
}

export interface OtherType {
  type: string,
  typeParams?: Type[]
}

export type Type = FunctionType | ArrayType | ObjectType | OtherType

export interface ParameterArgs {
  rest?: boolean,
  name?: string,
  optional?: boolean
}

export type Parameter = Type & ParameterArgs

export type ReturnType = Type & { optional?: boolean }

export type Property = Type & { optional?: boolean }

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

export interface ClassOrInterfaceDeclaration {
  type: "class" | "interface"
  typeParams?: Type[]
  extends?: Type
  properties?: { [propName: string]: Property }
  staticProperties?: { [propName: string]: Property }
}

export type Declaration = ClassOrInterfaceDeclaration | Type

export function isClassOrInterfaceDeclaration(decl: Declaration): decl is ClassOrInterfaceDeclaration {
  return decl.type == "class" || decl.type == "interface"
}

export interface ModuleContents {
  items?: { [name: string]: Declaration }
  all?: { [id: string]: Declaration }
}