#!/usr/bin/env node
"use strict";

function* where(iterable, predicate) {
    for (const a of iterable)
	if (predicate(a))
	    yield a;
} // where

function* take(iterable, count) {
    for (const a of iterable) {
	if (count == 0)
	    break;
        --count;
	yield a;
    } // for ...
} // take

function* drop(iterable, count) {
    const iter = iterable[Symbol.iterator]();
    for (let i = 0; i != count; ++i)
	iter.next();
    for (const a of iter)
	yield a;
} // drop

function* concat(first, second) {
    for (const a of from(first))
	yield a;
    for (const a of from(second))
	yield a;
} // concat

function mango_range(iterable) {
    return {
	[Symbol.iterator]: function*() {
	    for (const a of iterable)
		yield a;
	},
	where: predicate => mango_range(where(iterable, predicate)),
	take: count => mango_range(take(iterable, count)),
	drop: count => mango_range(drop(iterable, count)),
	concat: seq2 => mango_range(concat(iterable, seq2))
    }
} // mango_range

function from(iterable) {
    return mango_range(iterable);
} // from


//////////////////////
const array = [1, 2, 3, 4, 5, 6, 7];

function dump(iterable, msg) {
    console.log("============");
    console.log(msg);
    for(const a of iterable)
	console.log(a);
}


dump(from(array), "from");

dump(from(array).where(n => n < 6), "where < 6");
dump(from(array).where(n => n > 2), "where > 2");
dump(from(array).where(n => n > 2).where(n => n < 6), "where > 2 and where < 6");

dump(from(array).take(3), "take 3");
dump(from(array).take(13), "take 13");

dump(from(array).drop(3), "drop 3");
dump(from(array).drop(13), "drop 13");

dump(from(array).take(5).drop(3), "take 5 drop 3");

dump(from(array).concat(array), "concat(array)");
