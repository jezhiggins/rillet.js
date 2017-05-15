#!/usr/bin/env node

function* filter(iterable, predicate) {
    for (const a of iterable)
	if (predicate(a))
	    yield a;
} // filter

function* map(iterable, fn) {
    for (const a of iterable)
	yield fn(a);
} // map

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
    yield* iter;
} // drop

function* concat(...items) {
    for (const item of items) {
	for (const a of MangoRange.from(item)) {
	    // embedded iterable - flatten
	    if (a[Symbol.iterator] && typeof a != "string")
		yield* concat(...a)
	    else
		yield a;
	} // for ...
    } /// for ...
} // concat

function* flatten(iterable) {
    for (const item of iterable)
	if (item[Symbol.iterator] && typeof item != "string")
	    yield* flatten(item);
        else
	    yield item;
} // flatten

function first(iterable, fn) {
    const {done, value} = iterable[Symbol.iterator]().next();
    if (done)
	return fn();
    return value;
} // first

function last(iterable, fn) {
    const iter = iterable[Symbol.iterator]();
    let {done, value} = iter.next();
    if (done)
	return fn();
    while(true) {
	let {done, value: nextvalue} = iter.next();
	if (done)
	    return value;
	value = nextvalue;
    } // while
} // last

function reduce(iterable, fn, seed) {
    if (seed === undefined)
	[seed, iterable] = advance(iterable);
    let total = seed;
    for (const v of iterable)
	total = fn(total, v);
    return total;
} // reduce

function advance(iterable) {
    const iterator = iterable[Symbol.iterator]();
    const head = iterator.next();
    if (head.done)
	exhausted();
    return [head.value, new MangoRange(iterator)];
} // advance

function none(iterable, predicate) {
    return test(iterable, predicate, false, true);
} // none

function every(iterable, predicate) {
    return none(iterable, i => !predicate(i));
} // every

function some(iterable, predicate) {
    return test(iterable, predicate, true, false);
} // some

function test(iterable, predicate, early, all) {
    for (const item of iterable)
	if (predicate(item))
	    return early;
    return all;
} // test

function join(iterable, separator = ',') {
    const iterator = iterable[Symbol.iterator]();
    let head = iterator.next();
    if (head.done)
	return "";

    let s = head.value.toString();

    head = iterator.next();
    while(!head.done) {
	s += separator;
	s += head.value.toString();
	head = iterator.next();
    } // while

    return s;
} // join

function exhausted() {
    throw "Sequence is exhausted";
} // exhausted

////////////////////////////
class MangoRange {
    static of(...params) {
	if (params.length == 0)
	    return new MangoRange([]);
	if (params.length == 1) {
	    return new MangoRange(params);
	} // if ...
	return MangoRange.from(params);
    } // MangoRange
    static from(iterable) {
	if (iterable == null)
	    return new MangoRange([]);

	if (Array.isArray(iterable)) {
	    if (iterable.length == 1)
		return MangoRange.from(iterable[0]);
	    return new MangoRange(iterable);
	} // if ...
	if (iterable[Symbol.iterator])
	    return new MangoRange(iterable);
	return new MangoRange([iterable]);
    } // from

    ///////////////////////////
    constructor(iterable) {
	this.iterable = iterable;
    } // constructor

    *[Symbol.iterator]() {
        yield* this.iterable;
    }

    filter(predicate) { return new MangoRange(filter(this.iterable, predicate)); }
    map(fn) { return new MangoRange(map(this.iterable, fn)); }
    take(count) { return new MangoRange(take(this.iterable, count)); }
    drop(count) { return new MangoRange(drop(this.iterable, count)); }
    concat(...iterable2) { return new MangoRange(concat(this.iterable, iterable2)); }
    flatten() { return new MangoRange(flatten(this.iterable)); }

    count() { let count = 0; for (const a of this.iterable) ++count; return count; }
    forEach(fn) { for (const a of this.iterable) fn(a); }
    first() { return first(this.iterable, exhausted); }
    firstOrDefault(defaultValue) { return first(this.iterable, () => defaultValue); }
    last() { return last(this.iterable, exhausted); }
    lastOrDefault(defaultValue) { return last(this.iterable, () => defaultValue); }
    reduce(fn, seed) { return reduce(this.iterable, fn, seed); }
    max(comparator = (a,b) => a > b) { return reduce(this.iterable, (a,b) => comparator(a,b) ? a : b); }
    min(comparator = (a,b) => a < b) { return reduce(this.iterable, (a,b) => comparator(a,b) ? a : b); }

    none(predicate) { return none(this.iterable, predicate); }
    every(predicate) { return every(this.iterable, predicate); }
    some(predicate) { return some(this.iterable, predicate); }

    join(separator) { return join(this.iterable, separator); }
    toArray() { return Array.from(this.iterable); }
} // class MangoRange

module.exports = MangoRange;
