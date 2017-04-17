#!/usr/bin/env node
"use strict";

function* where(src, predicate) {
    return from(src).where(predicate);
}


function from(src) {
    return {
	[Symbol.iterator]: function*() {
	    for (const a of src)
		yield a;
	},
	where: function*(predicate) {
	    for (const a of src)
		if (predicate(a))
		    yield a;
	}
    }
} // from...


//////////////////////
const array = [1, 2, 3, 4, 5, 6, 7];

for(const a of from(array)) {
    console.log(a);
} //
for(const a of from(from(array))) {
    console.log(a);
} //

console.log(from(array));
console.log(where(array, n => n > 4));

for(const b of from(array).where(n => n > 2))
    console.log(b);

console.log(from(array).where(n => n > 4));
