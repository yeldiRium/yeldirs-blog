---
layout: post
title: gen-z -  A library for JavaScript generators
date: 2020-02-16 14:53:14
tags:
---

[gen-z](https://github.com/yeldiRium/gen-z) is a JavaScript helper library for [generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator) I'm developing.

It provides a number of functions for synchronous as well as asynchronous
generators. If you are - like me - a fan of map/filter/reduce and all the good
functional-programming stuff for working with arrays/lists and you want to apply this
to generators, then gen-z is for you.

Let's look at a few things one can do with generator-focused helpers.

## Reading files into strings

Sometimes, when you're working with a stream, all you really just want is the
entire content of the stream. It's better if you don't have to do this, since
you might be underestimating the amount of content you'll receive, but sometimes
it's the best thing to do.
Luckily for us, node.js streams implement the asynchronous iterable interface
and can thus be treated like generators. So we can use gen-z's `async.collect`:

```javascript
const fs = require('fs');
const collect = require('gen-z/async/consume/collect');

(async () => {
  // Open a read stream of some file. You could
  // also pass this through an unzip stream before
  // further collecting it.
  const inputStream = fs.createReadStream(filePath);
    
  // Collect the buffer chunks into an array and
  // concatenate and convert them afterwards.
  // This is the more efficient way as opposed to
  // concatenating each chunk with the next.
  const content = Buffer.concat(await collect(inputStream)).toString();
})();
```

Yes, you could just use `fs.readFile`. But you can apply the concept to any
stream that you receive buffer chunks over. Think a minio file stream or a
download.

## Event sourcing

If you're doing event sourcing, you probably want
to recalculate a state from a stream of events
quite often. An easy way to do this is with `async.consume.reduce`:

```javascript
const reduce = require('gen-z/async/consume/reduce');

const events = getEventStream(fromSomewhere);

const initialState = {
  // Your initial state.
}

(async () => {
  const currentState = await reduce(
    async event => {
      // Your event application logic goes here.
      switch (typeOfEvent(event)) {
        case "this": {
          await doThis(event);
          break;
        }
        default: {
          await whatever();
          break;
        }
      }
    },
    initialState,
    events
  )
})();
```

If you like the concept and the library, leave [a star on github](https://github.com/yeldiRium/gen-z).
Also tell me about your generator applications and whether there are cool things
to do with them that I haven't covered yet.
