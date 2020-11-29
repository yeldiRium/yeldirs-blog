---
layout: post
title: Grouping exports with ES6 modules in TypeScript
description: A short guide on how to structure large amounts of exports in a TypeScript entrypoint using ES6 modules.
date: 2020-011-29 20:52:00
tags:
  - JavaScript
  - TypeScript
category:
  - development
  - TypeScript
---
I've been rather late to the TypeScript party. I have worked with TypeScript for a bit over a year now and started with version 3.7. This means that I sometimes stumble across deprecated or discouraged features and want to find out why they are no longer used. This can lead to fun rabbitholes, as it does in systems that start to out-grow their beginnings.

One thing in particular, however, made me wonder *how* instead of *why*:

After [`namespaces` were replaced with `modules` in TypeScript 1.5](https://www.typescriptlang.org/docs/handbook/namespaces.html), and since `modules` in TypeScript seemed to be [discouraged in favor of ES6 modules](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-namespace.md), how am I supposed to achieve the effect of TypeScript `modules` with ES6 `modules`?

To make this rather abstract intro a bit more concrete:

Sometimes, mostly when writing a library's entrypoint, I have to export a large amount of things. Be it types or functions or whatever. Often I want to group these things together to make them more intuitive and searchable. Basically, I want my library to be usable like this:

```typescript
import { Stuff } from 'some-library';

const x: Stuff.Foo;

Stuff.bar();
```

To achive this in plain JavaScript, I would write:

```javascript
export {
  Stuff: { bar }
};
```

But this of course does not work with TypeScript's types, since I cannot put those into objects. And nothing more is `Stuff` in my export attempt above.

Using ES6 modules, the desired effect can be achived this way:

```typescript
// Stuff.ts
type Foo = any;

const bar = function () {};

export { Foo, bar };
```

```typescript
// index.ts
import * as Stuff from './Stuff';

export { Stuff };
```

Now TypeScript happily accepts `Stuff.Foo` after importing `Stuff`. You can even access it from the outermost level:

```typescript
import * as SomeLibrary from 'some-library';

const x: SomeLibrary.Stuff.Foo;

SomeLibrary.Stuff.bar();
```

Unfortunately I know of no way to group exports comparably inside a single file.
