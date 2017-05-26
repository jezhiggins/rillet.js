# rillet.js
Lazily evaluated ranges/streams/fp library built around ES6 generators

The Javascript Array class provide a number of methods that we typically associate with functional languages - filter/concat/forEach/etc.  However, they're generally eagerly and exhaustively evaluated.

Rillet.js uses ES6 iterators to build these same methods in a lazily evaluated, streamable style, along the lines of .NET LINQ methods, Java 8 Streams, that kind of thing.

## Installation

Rillet.js is available from npm
```npm install rillet```

## Trivial Example

```javascript
const from = require('rillet').from;

const array_or_other_iterable = fn();

from(array_or_other_iterable).filter(n => n > 100).forEach(x => console.log(x));
```

## Methods
### Creation methods
* `Range.from(o)` creates a new Range from an array-like or other iterable object (similar to `Array.from()`)
* `Range.of(...items)` creates a new Range with a variable number of arguments (similar to `Array.of`)

The returned range is an iterable object, and so can be used in all the places where Javascript accepts an iterable - eg for/of loop, etc

### Modifiers
Each modifier method returns a new Range which can be iterated on, or modified with further chained operations.

* `Range.prototype.filter(predicate)` filters the returned sequence so only those elements that pass the test that `predicate` implements.
* `Range.prototype.map(fn)` returns the result of applying `fn` to each item in the sequence
* `Range.prototype.take(count)` returns only the first `count` items in the sequence
* `Range.prototype.drop(count)` discards the first `count` items of the sequence, and returns the remainder
* `Range.prototype.concat(...items)` creates a lazily concatenated iterable who's elements are all the elements of the sequence followed by all the elements of items
* `Range.prototype.flatten()` flattens any iterables in the sequence, creating a new stream which is entirely flat
* `Range.prototype.uniq([fn])` filters duplicates from the stream.  The projection `fn` is optional, defaulting to the identity function.

### Terminal methods
A terminal method drains the range producing a single result.

* `Range.prototype.reduce(bifn, [initial])` applies `fn` against an accumulator and each element in the sequence, to reduce to a single value. The optional `initial` is used as the first argument to the first call of `fn`. If no `initial` is given, the first element in the sequence is used. Calling reduce on an empty sequence without an initial value will throw

Strictly speaking, reduce is all you need.  However, for readability and expressiveness, rillet.js provides a number of methods implementing common terminal operations

* `Range.prototype.forEach(fn)` applies `fn` to each item in the sequence.  Returns undefined
* `Range.prototype.count` returns the count of items in the sequence
* `Range.prototype.first()` returns the first value in the sequence, or throws if the sequence is empty
* `Range.prototype.firstOrDefault(defaultValue)` returns the first value in the sequence, or the defaultValue if the sequence is empty
* `Range.prototype.last()` returns the last value in the sequence, or throws if the sequence is empty.  Will never return if the sequence is unbounded.
* `Range.prototype.lastOrDefault(defaultValue)` returns the last value in the sequence, or the defaultValue if the sequence is empty.
* `Range.prototype.max([comparator])` finds the maximum item of the stream, according to the provided comparator.  If no comparator is provided, it defaults to `(item, currentmax) => item > currentmax`. Returns undefined if the sequence is empty.
* `Range.prototype.min([comparator])` finds the minimum item of the stream, according to the provided comparator.  If no comparator is provided, it defaults to `(item, currentmax) => item < currentmax`. Returns undefined if the sequence is empty.
* `Range.prototype.sum()` calculates the arithmetic sum of the items in the sequence, calling Number(x) on each item.  The sum of the empty range is 0.
* `Range.prototype.none(predicate)` returns true if none of the items in the sequence match the predicate, and false otherwise
* `Range.prototype.every(predicate)` returns true if all of the items in the sequence match the predicate, and false otherwise
* `Range.prototype.some(predicate)` returns true if one or more of the items in the sequence match the predicate, and false otherwise
* `Range.prototype.join(separator)` join all the items in the sequence into a string, using the provided separator.  If the separator is not given, the items are separated with a comma.
* `Range.prototype.toArray()` gathers all the items in the sequence into an array.

In the notes above,
* `fn` has the form `x => operation(x)`, where operation returns a value
* `bifn` has the form `(x,y) => operation(x, y)`, where operation returns a value
* `predicate` has the form `x => test(x)`, where test returns a boolean
* `comparator` has the form `(x,y) => compare(x, y)`, where compare returns true if the comparison of x and y succeeds
* where a method has the same name and form as a method on Array, it will exhibit the same behaviour

## License

Copyright (c) 2017 JezUK Ltd

Licensed under the terms of the MIT License.
