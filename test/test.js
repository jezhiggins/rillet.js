const MangoRange = require("../mango.js");
const from = MangoRange.from;
const of = MangoRange.of;
const assert = require("assert");

function t(msg, src, expected) {
    it(msg, () => assert.deepStrictEqual(src.toArray(), expected));
} // compare

const array = [1,2,3,4,5,6,7,8];

describe("MangoRange", () => {
    describe("from", () => {
	// should behave in a similar way to Array.from, except single objects are convert as
	// if they were an array of length one, rather than to the empty range
	t("array", from([1,2,3]), Array.from([1,2,3]));
	t("string array", from(["pig", "dog"]), Array.from(["pig", "dog"]));
	t("string", from("mango"), Array.from("mango"));
	t("string", from("mango"), ["m", "a", "n", "g", "o"]);
	t("nested array", from([1,2,3,['a','b','c',[7,8,9]]]), Array.from([1,2,3,['a','b','c',[7,8,9]]]));
	t("int", from(1), [1]);
	t("float", from(1.234), [1.234]);
	t("true", from(true), [true]);
	t("false", from(false), [false]);
	t("null", from(null), []);
	t("undefined", from(undefined), []);
    });

    describe("of", () => {
	// should behave in a similar way to Array.of, except single objects are convert as
	// if they were an array of length one, rather than to the empty range
	t("empty", of(), Array.of());
	t("array", of(array), Array.of(array));
	t("...array", of(...array), Array.of(...array));
	t("params", of(1,2,3), Array.of(1,2,3));
	t("string array", of(["pig", "dog"]), Array.of(["pig", "dog"]));
	t("strings", of("pig", "dog"), Array.of("pig", "dog"));
	t("string", of("mango"), Array.of("mango"));
	t("nested array", of([1,2,3,['a','b','c',[7,8,9]]]), Array.of([1,2,3,['a','b','c',[7,8,9]]]));
	t("...nested array", of(1,2,3,['a','b','c',[7,8,9]]), Array.of(1,2,3,['a','b','c',[7,8,9]]));
	t("int", of(1), Array.of(1));
	t("float", of(1.234), Array.of(1.234));
	t("true", of(true), Array.of(true));
	t("false", of(false), Array.of(false));
	t("null", of(null), Array.of(null));
	t("nulls", of(null, null, null), Array.of(null, null, null));
	t("undefined", of(undefined), Array.of(undefined));
    });

    describe("where", () => {
	t("where(true)", from(array).where(() => true), [1,2,3,4,5,6,7,8])
	t("where(false)", from(array).where(() => false), []);
	t("where(n > 3)", from(array).where(n => n > 3), [4,5,6,7,8]);
	t("where(n < 6)", from(array).where(n => n < 6), [1,2,3,4,5]);
	t("where(n > 2).where(n < 6)", from(array).where(n => n > 2).where(n => n < 6), [3,4,5]);
    });

    describe("take", () => {
	t("take(1)", from(array).take(1), [1]);
	t("take(3)", from(array).take(3), [1,2,3]);
	t("take(7)", from(array).take(7), [1,2,3,4,5,6,7]);
	t("take(8)", from(array).take(8), [1,2,3,4,5,6,7,8]);
	t("take(0)", from(array).take(0), []);
	t("take(13)", from(array).take(13), [1,2,3,4,5,6,7,8]);
    });

    describe("drop", () => {
	t("drop(1)", from(array).drop(1), [2,3,4,5,6,7,8]);
	t("drop(3)", from(array).drop(3), [4,5,6,7,8]);
	t("drop(7)", from(array).drop(7), [8]);
	t("drop(8)", from(array).drop(8), []);
	t("drop(0)", from(array).drop(0), [1,2,3,4,5,6,7,8]);
	t("drop(13)", from(array).drop(13), []);
    });

    describe("take/drop", () => {
	t("take(5).drop(3)", from(array).take(5).drop(3), [4,5]);
	t("drop(3).take(3)", from(array).drop(3).take(3), [4,5,6]);
    });

    describe("concat", () => {
	// should behave in a similar way to Array.concat
	t("concat(array)", from(array).concat(array), array.concat(array));
	t("concat(1,2,3)", from(array).concat(1,2,3), array.concat(1,2,3));
	t("concat([4,5,6]", from(array).concat([4,5,6]), array.concat([4,5,6]));
	t("concat('a','b','c',[4,5,6], 'def')", from(array).concat('a','b','c',[4,5,6], 'def'), array.concat('a','b','c',[4,5,6], 'def'));
    });

});
