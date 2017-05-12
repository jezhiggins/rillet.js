const RilletRange = require("../rillet.js");
const from = RilletRange.from;
const of = RilletRange.of;
const assert = require("assert");

function t(msg, src, expected) {
    const result = src.toArray ? src.toArray() : src;

    it(msg, () => assert.deepStrictEqual(result, expected));
} // compare

function exhausted(label, fn) {
    let msg = "[didn't throw]";
    try {
	fn();
    } catch (err) {
	msg = err;
    }
    t(label, msg, "Sequence is exhausted");
} // exhausted

const array = [1,2,3,4,5,6,7,8];

const isEven = function(n) { return n%2==0; }

describe("RilletRange", () => {
    describe("from", () => {
	// should behave in a similar way to Array.from, except single objects are convert as
	// if they were an array of length one, rather than to the empty range
	t("array", from([1,2,3]), Array.from([1,2,3]));
	t("string array", from(["pig", "dog"]), Array.from(["pig", "dog"]));
	t("string", from("rillet"), Array.from("rillet"));
	t("string", from("rillet"), ["r", "i", "l", "l", "e", "t"]);
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
	t("string", of("rillet"), Array.of("rillet"));
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

    describe("filter", () => {
	t("filter(true)", from(array).filter(() => true), [1,2,3,4,5,6,7,8])
	t("filter(false)", from(array).filter(() => false), []);
	t("filter(n > 3)", from(array).filter(n => n > 3), [4,5,6,7,8]);
	t("filter(n < 6)", from(array).filter(n => n < 6), [1,2,3,4,5]);
	t("filter(n > 2).filter(n < 6)", from(array).filter(n => n > 2).filter(n => n < 6), [3,4,5]);
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

    describe("map", () => {
	t("map(toString)", from(array).map(i => i.toString()), array.map(i => i.toString()));
    });

    describe("forEach", () => {
	let m = "";
	let a = "";

	from(array).forEach(i => m += (i + ","));
	array.forEach(i => a += (i + ","));

	t("forEach", m, a);
    });

    describe("first", () => {
	t("first", from(array).first(), array[0]);
	t("filter(isEven).first", from(array).filter(isEven).first(), array.filter(isEven)[0]);

	exhausted("filter(false).first", () =>
		  from(array).filter(() => false).first())
    });

    describe("firstOrDefault", () => {
	t("firstOrDefault", from(array).firstOrDefault("DEFAULT"), array[0]);
	t("filter(filter).firstOrDefault", from(array).filter(isEven).firstOrDefault("DEFAULT"), array.filter(isEven)[0]);
	t("filter(false).firstOrDefault", from(array).filter(() => false).firstOrDefault("DEFAULT"), "DEFAULT");
    });

    describe("last", () => {
	t("last", from(array).last(), array[array.length-1]);
	const filtered_array = array.filter(isEven);
	t("filter(isEven).last", from(array).filter(isEven).last(), filtered_array[filtered_array.length-1]);

	exhausted("filter(false).last", () =>
		  from(array).filter(() => false).last());
    });

    describe("lastOrDefault", () => {
	t("lastOrDefault", from(array).lastOrDefault("DEFAULT"), array[array.length-1]);
	const filtered_array = array.filter(isEven);
	t("filter(isEven).lastOrDefault", from(array).filter(isEven).lastOrDefault("DEFAULT"), filtered_array[filtered_array.length-1]);
        t("filter(false).lastOrDefault", from(array).filter(() => false).lastOrDefault("DEFAULT"), "DEFAULT");
    });

    describe("flatten", () => {
	t("flatten([1,2,3,4])", from([1,2,3,4]).flatten(), [1,2,3,4]);
	t("flatten([[1, 2], [3, 4]])", from([[1, 2], [3, 4]]).flatten(), [1,2,3,4]);
	t("flatten([[[[1],2],3],4])", from([[[[1],2],3],4]).flatten(), [1,2,3,4]);
	t("flatten([1,[2,[3,[4]]]])", from([1,[2,[3,[4]]]]).flatten(), [1,2,3,4]);
    });

    describe("reduce", () => {
	t("reduce(array, 0)", from(array).reduce((x, y) => x + y, 0), array.reduce((x, y) => x + y, 0));
	t("reduce(array, 99)", from(array).reduce((x, y) => x + y, 99), array.reduce((x, y) => x + y, 99));
	t("reduce(array)", from(array).reduce((x, y) => x + y), array.reduce((x, y) => x + y));
	t("reduce([], 56)", from([]).reduce((x, y) => x + y, 56), [].reduce((x, y) => x + y, 56));
	exhausted("reduce([])", () =>
		  from([]).reduce((x, y) => x + y));
    });

    describe("count", () => {
	t("count", from(array).count(), array.length);
	t("take(4).count", from(array).take(4).count(), 4);
	t("drop(4).count", from(array).drop(4).count(), array.length-4);
    });

    describe("none", () => {
	t("none(true)", from(array).none(() => true), false);
	t("none(<5)", from(array).none(n => n < 5), false);
	t("none(>5)", from(array).none(n => n > 5), false);
	t("none(==1)", from(array).none(n => n == array[0]), false);
	t("none(==8)", from(array).none(n => n == array[array.length-1]), false);

	t("none(false)", from(array).none(() => false), true);
	t("none(<0)", from(array).none(n => n < 0), true);
	t("none(>10)", from(array).none(n => n > 10), true);
    });
});
