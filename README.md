# rillet.js
Lazily evaluated ranges/streams/fp library built around ES6 generators

The Javascript Array methods provide a number of methods that we typically associate with functional languages - filter/concat/forEach/etc.  However, they're generally eagerly and exhaustively evaluated.

Mango.js uses ES6 iterators to build these same methods in a lazily evaluated, streamable style, along the lines of .NET LINQ methods, Java 8 Streams, that kind of thing.


## Trivial Example

```javascript
const from = require('rillet').from;

const array_or_other_iterable = fn();

from(array_or_other_iterable).where(n => n > 100).forEach(x => console.log(x));
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


### Terminal methods
A terminal method drains the pipeline producing some, possible a null, result.

* `Range.prototype.forEach(fn)` applies `fn` to each item in the sequence
* `Range.prototype.count` returns the count of items in the sequence
* `Range.prototype.first()` returns the first value in the sequence, or throws if the sequence is empty
* `Range.prototype.firstOrDefault(defaultValue)` returns the first value in the sequence, or the defaultValue if the sequence is empty
* `Range.prototype.last()` returns the last value in the sequence, or throws if the sequence is empty.  Will never return if the sequence is unbounded.
* `Range.prototype.lastOrDefault(defaultValue)` returns the last value in the sequence, or the defaultValue if the sequence is empty.  Will never return if the sequence is unbounded.
* `Range.prototype.reduce(fn, [initial])` applies `fn` against an accumulator and each element in the sequence, to reduce to a single value. The optional `initial` is used as the first argument to the first call of `fn`. If no `initial` is given, the first element in the sequence is used. Calling reduce on an empty sequence without an initial value will throw.
