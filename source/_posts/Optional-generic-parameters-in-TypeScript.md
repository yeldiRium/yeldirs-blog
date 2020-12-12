---
layout: post
title: Optional generic parameters in TypeScript
date: 2020-12-12 14:01:32
tags:
  - JavaScript
  - TypeScript
category:
  - development
  - TypeScript
---
Take this function from an earlier iteration of [@yeldirium/result](https://github.com/yeldiRium/result) that takes a value and constructs a wrapper type around it:

```typescript
const okay = function <TValue>(value: TValue): Okay<TValue> {
  return {
    isFailed: false,
    value
  }
}
```

What if you want the value to be `undefined`? You can call `okay` like so:

```typescript
const result = okay(undefined);
```

That works, but it is ugly and contains superfluous code. Someone might use `null` instead of `undefined` and an inconsistent mess starts to spread.

The problem here is that optional parameters and parameters that may be undefined are not the same thing in TypeScript. See these two examples and the slight difference between them:

```typescript
const okay = function <TValue>(value?: TValue): Okay<TValue> {

const okay = function <TValue>(value: TValue | undefined): Okay<TValue> {
```

Only the first version, the one with special syntax, allows calls without a parameter: `okay()`. In the second version the parameter is still required, it just may be `undefined`: `okay(undefined)`.

*In neither case TypeScript realizes that `TValue` is supposed to be `undefined`*. If you try to return `value` inside your wrapper type as in the first code block above, you will always hit the problem that `Okay<TValue | undefined>` is not assignable to `Okay<TValue>`.

The solution to this is overloading:

```typescript
const okay: {
  <TValue extends undefined>(): Okay<TValue>;
  <TValue>(value: TValue): Okay<TValue>;
} = function <TValue>(value?: TValue): Okay<TValue | undefined> {
  return {
    isFailed: false,
    value
  };
};
```

The signature on the actual function expression must include every possible way to use it. Thus `function <TValue>(value?: TValue): Okay<TValue | undefined>`. This makes the parameter optional and has the return type include `undefined` as a possibility. This signature on its own is definitely not what we want, since `TValue` and `undefined` are still disconnected types.

In the type annotation on okay there are two call signatures. The first of them omits the parameter entirely and is only active if `TValue extends undefined`, which is a fancy way of telling TypeScript that `TValue` is `undefined`. So if `TValue` is undefined, the function takes no parameter and returns `Okay<TValue>`, which translates to `Okay<undefined>`.

The second call signature includes the parameter and makes no assumptions about `TValue`. This is actually the same signature that `okay` had initially. This catches all other cases in which `TValue` is not `undefined` and thus a parameter is required.

## References

- [Issue in TypeScript repo that solved my problem](https://github.com/Microsoft/TypeScript/issues/16731)
- [Blogpost by Dmitrijs Minajevs that talks about the same problem but does not solve it in a way that makes `TValue` be `undefined`](https://medium.com/@dmitrijsminajevs/how-to-make-function-parameters-optional-in-typescript-8cb4fa22171d)
