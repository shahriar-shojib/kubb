import { createJSDocBlockText } from '@kubb/core/transformers'

import { createParams, getParams, isParamItems, type Param } from '../shared/utils/getParams.ts'
import { Text } from './Text.tsx'

import type { ReactElement } from 'react'
import type { Params } from '../shared/utils/getParams.ts'
import type { JSDoc, KubbNode } from '../types.ts'

type Props = {
  /**
   * Name of the function.
   */
  name: string
  /**
   * Parameters/options/props that need to be used.
   */
  params?: string | Params
  /**
   * Does this function need to be exported.
   */
  export?: boolean
  /**
   * Does the function has async/promise behaviour.
   * This will also add `Promise<returnType>` as the returnType.
   */
  async?: boolean
  /**
   * Generics that needs to be added for TypeScript.
   */
  generics?: string | string[]

  /**
   * ReturnType(see async for adding Promise type).
   */
  returnType?: string
  /**
   * Options for JSdocs.
   */
  JSDoc?: JSDoc
  children?: KubbNode
}

export function Function({ name, export: canExport, async, generics, params, returnType, JSDoc, children }: Props): KubbNode {
  return (
    <>
      {JSDoc?.comments && (
        <>
          {createJSDocBlockText({ comments: JSDoc?.comments })}
          <br />
        </>
      )}
      {canExport && (
        <Text>
          export
          <Text.Space />
        </Text>
      )}
      {async && (
        <Text>
          async
          <Text.Space />
        </Text>
      )}
      <Text>function {name}</Text>
      {generics && (
        <>
          <Text>{'<'}</Text>
          <Text>{Array.isArray(generics) ? generics.join(', ').trim() : generics}</Text>
          <Text>{'>'}</Text>
        </>
      )}
      {isParamItems(params) ? <Text>({getParams(params, { type: 'constructor' })})</Text> : <Text>({params})</Text>}
      {returnType && !async && <Text>: {returnType}</Text>}
      {returnType && async && (
        <Text>
          : Promise{'<'}
          {returnType}
          {'>'}
        </Text>
      )}
      <Text>{' {'}</Text>
      <br />
      <Text indentSize={2}>{children}</Text>
      <br />
      <Text>{'}'}</Text>
      <br />
    </>
  )
}

type ArrowFunctionProps = Props & {
  /**
   * Create Arrow function in one line
   */
  singleLine?: boolean
}

export function ArrowFunction({ name, export: canExport, async, generics, params, returnType, JSDoc, singleLine, children }: ArrowFunctionProps): KubbNode {
  return (
    <>
      {JSDoc?.comments && (
        <>
          {createJSDocBlockText({ comments: JSDoc?.comments })}
          <br />
        </>
      )}
      {canExport && (
        <Text>
          export
          <Text.Space />
        </Text>
      )}
      <Text>
        const {name} =<Text.Space />
      </Text>
      {async && (
        <Text>
          async
          <Text.Space />
        </Text>
      )}
      {generics && (
        <>
          <Text>{'<'}</Text>
          <Text>{Array.isArray(generics) ? generics.join(', ').trim() : generics}</Text>
          <Text>{'>'}</Text>
        </>
      )}
      {isParamItems(params) ? <Text>({getParams(params, { type: 'constructor' })})</Text> : <Text>({params})</Text>}
      {returnType && !async && <Text>: {returnType}</Text>}
      {returnType && async && (
        <Text>
          : Promise{'<'}
          {returnType}
          {'>'}
        </Text>
      )}
      {singleLine && (
        <>
          <Text>{' => '}</Text>
          <Text indentSize={2}>{children}</Text>
          <br />
        </>
      )}

      {!singleLine && (
        <>
          <Text>{' => {'}</Text>
          <br />
          <Text indentSize={2}>{children}</Text>
          <br />
          <Text>{'}'}</Text>
          <br />
        </>
      )}
    </>
  )
}

type CreateCallTo<TName extends string,  TAsync extends boolean, TParams extends Params> ={
    name: TName
    async?: TAsync
    params?: TParams
}

// https://github.com/type-challenges/type-challenges/issues/737
type UnionToIntersection<T> = (T extends any ? (x: T) => any : never) extends (
    x: infer U
  ) => any
  ? U
  : never

// get last Union: LastUnion<1|2> => 2
// ((x: A) => any) & ((x: B) => any) is overloaded function then Conditional types are inferred only from the last overload
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#type-inference-in-conditional-types
type LastUnion<T> = UnionToIntersection<
  T extends any ? (x: T) => any : never
> extends (x: infer L) => any
  ? L
  : never

type UnionToTuple<T, Last = LastUnion<T>> = [T] extends [never]
  ? []
  : [...UnionToTuple<Exclude<T, Last>>, Last]

type JoinRes<P extends string[], D extends string> = P extends [infer A, ...infer B]
  ? B extends [] ? `${Extract<P[0], string>}` : B extends string[] ? `${Extract<P[0], string>}${D}${JoinRes<B, D>}` : never
  : ''

type ToParamsString<TParams extends Params>= JoinRes<Extract<UnionToTuple<keyof TParams>, string[]>,", ">

type test = ToParamsString<{method: {type: 'string'}, url: {type: 'string'}}>

type CreateCallResult<TName extends string, TToName extends string, TAsync extends boolean, TParams extends Params> = `const ${TName} = ${TAsync extends true? 'await': ''} ${TToName}({ ${ToParamsString<TParams>} })`

export function createCall<TName extends string, TToName extends string, TAsync extends boolean, const TParams extends Params>(name: TName, to: CreateCallTo<TToName, TAsync, TParams>): CreateCallResult<TName, TToName, TAsync, TParams> {
  const params = getParams(createParams({
    data: {
      mode: "object",
      children: to.params
    }
  }), { type: 'call' })

  return `const ${name} = ${to.async? 'await': ''} ${to.name}(${to.params ? params:''})` as CreateCallResult<TName, TToName, TAsync, TParams>
}

type CallFunctionProps = {
  /**
   * Name of the caller.
   */
  name: string
  to: ReactElement<Props>
}

export function CallFunction({ name, to }: CallFunctionProps) {
  const { params, name: fnName, generics, async } = to.props

  return (
    <>
      const <Text>{name}</Text>
      <Text> = </Text>
      {async && (
        <Text>
          await
          <Text.Space />
        </Text>
      )}
      {fnName}
      {generics && (
        <>
          <Text>{'<'}</Text>
          <Text>{Array.isArray(generics) ? generics.join(', ').trim() : generics}</Text>
          <Text>{'>'}</Text>
        </>
      )}
      {isParamItems(params) ? <Text>({getParams(params, { type: 'call' })})</Text> : <Text>({params})</Text>}
      <br />
    </>
  )
}

type ReturnFunctionProps = {
  children: KubbNode
}

export function ReturnFunction({ children }: ReturnFunctionProps) {
  return (
    <Text indentSize={2}>
      return <Text>{children}</Text>
    </Text>
  )
}

Function.Arrow = ArrowFunction
Function.Call = CallFunction
Function.createCall = createCall
Function.Return = ReturnFunction

export const Fun = Function
