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
    for (const item of items)
	for (const a of MangoRange.from(item))
	    yield a;
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
} // class MangoRange

//////////////////////
const array = [1, 2, 3, 4, 5, 6, 7];

function dump(iterable, msg) {
    console.log("============");
    console.log(msg);

    let first = true;
    for(const a of iterable) {
	if (!first)
	    process.stdout.write(", ");
	process.stdout.write(a.toString());
	first = false;
    }
    process.stdout.write("\n");
}


dump(MangoRange.from(array), `from(${array})`);
dump(MangoRange.from(1), "from(1)");
dump(MangoRange.from(true), "from(true)");
dump(MangoRange.from(false), "from(false)");
dump(MangoRange.from(["pig","dog"]), "from(['pig','dog'])");
dump(MangoRange.from("pigeon"), "from('pigeon')");
dump(MangoRange.from(null), "from(null)");
dump(MangoRange.from(undefined), "from(undefined)");

dump(MangoRange.from(array).where(n => n < 6), "where < 6");
dump(MangoRange.from(array).where(n => n > 2), "where > 2");
dump(MangoRange.from(array).where(n => n > 2).where(n => n < 6), "where > 2 and where < 6");

dump(MangoRange.from(array).take(3), "take 3");
dump(MangoRange.from(array).take(13), "take 13");

dump(MangoRange.from(array).drop(3), "drop 3");
dump(MangoRange.from(array).drop(13), "drop 13");

dump(MangoRange.from(array).take(5).drop(3), "take 5 drop 3");

dump(MangoRange.from(array).concat(array), "concat(array)");
dump(MangoRange.from(array).concat(1, 2, 3), "concat(1, 2, 3)");
dump(MangoRange.from(array).concat([4,5,6]), "concat([4, 5, 6])");
dump(MangoRange.from(array).concat('a','b','c',[4,5,6],'d','e','f','grout'), "concat'a','b','c',[4, 5, 6],'d','e','f', 'grout')");
