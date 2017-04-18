#!/usr/bin/env node
"use strict";

function* where(iterable, predicate) {
    for (const a of iterable) {
	if (predicate(a))
	    yield a;
    }
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

function* concat(...items) {
    for (let item of items) {
	for (const a of MangoRange.from(item))
	    yield a;
    }
} // concat

class MangoRange {
    static from(iterable) {
	if (iterable == null)
	    return new MangoRange([]);

	if (Array.isArray(iterable)) {
	    if (iterable.length == 1)
		return MangoRange.from(iterable[0]);
	    return new MangoRange(iterable);
	}
	if (iterable[Symbol.iterator])
	    return new MangoRange(iterable);
	return new MangoRange([iterable]);
    } // from

    ///////////////////////////
    constructor(iterable) {
	this.iterable = iterable;
    } // constructor


    *[Symbol.iterator]() {
	for (const a of this.iterable)
	    yield a;
    }

    where(predicate) { return new MangoRange(where(this.iterable, predicate)); }
    take(count) { return new MangoRange(take(this.iterable, count)); }
    drop(count) { return new MangoRange(drop(this.iterable, count)); }
    concat(...iterable2) { return new MangoRange(concat(this.iterable, iterable2)); }

    toArray() { return Array.from(this.iterable); }
} // class MangoRange

module.exports = MangoRange;
