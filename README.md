# mango.js
Lazily evaluated ranges/streams/fp library built around ES6 generators

The Javascript Array methods (and libraries like LoDash and Underscore) provide a number of methods that we typically associate with functional languages - filter/concat/forEach/etc.  However, they're generally eagerly and exhaustively evaluated.

Mango.js uses ES6 iterators to build these same methods in a lazily evaluated, streamable style, along the lines of .NET LINQ methods, Java 8 Streams, that kind of thing.


## Trivial Examples

```javascript
const from = require('mango').from;
const array_or_other_iterable = fn();

// find large values
for (const v in from(array_or_other_iterable).where(n => n > 100))
    do_something(v);

```
