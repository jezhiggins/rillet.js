# mango.js
Lazily evaluated ranges/streams/fp library built around ES6 generators

The Javascript Array methods (and libraries like LoDash and Underscore) provide a number of methods that we typically associate with functional languages - filter/concat/forEach/etc.  However, they're generally eagerly and exhaustively evaluated.

Mango.js uses ES6 iterators to build these same methods in a lazily evaluated, streamable style, along the lines of .NET LINQ methods, Java 8 Streams, that kind of thing.


## Trivial Example

```javascript
const from = require('mango').from;
const array_or_other_iterable = fn();

// find large values
for (const v in from(array_or_other_iterable).where(n => n > 100))
    do_something(v);

```

## Methods
`Range.from(o)` creates a new Range from an array-like or other iterable object (similar to `Array.from()`)
`Range.of(...items)` creates a new Range with a variable number of arguments (similar to `Array.of`)

The returned range is an iterable object, and so can be used in all the places where Javascript accepts an iterable - eg for/of loop, etc

`Range.prototype.where(predicate)` filters the returned sequence so only those elements that pass the test implemented by `predicate`
`Range.prototype.take(count)` returns only the first `count` items in the sequence
`Range.prototype.drop(count)` discards the first `count` items of the sequence, and returns the remainder
`Range.prototype.concat(...items)` creates a lazily concatenated iterable who's elements are all the elements of the sequence followed by all the elements of items

Each method returns a new Range which can be iterated on, or modified with further chained operations.