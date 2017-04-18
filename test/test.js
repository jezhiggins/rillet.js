const MangoRange = require("../mango.js");
const from = MangoRange.from;
const assert = require("assert");

function t(msg, src, expected) {
    it(msg, () => assert.deepStrictEqual(src.toArray(), expected));
} // compare

const array = [1,2,3,4,5,6,7,8];

describe("MangoRange", () => {
    describe("from", () => {
	// should behave in a similar way to Array.from, except single objects are convert as
	// if they were an array of length one, rather than to the empty range
	t("array to range", from([1,2,3]), [1,2,3]);
	t("string array to range", from(["pig", "dog"]), ["pig", "dog"]);
	t("string to range", from("mango"), ['m', 'a', 'n', 'g', 'o']);
	t("int to range", from(1), [1]);
	t("true to range", from(true), [true]);
	t("false to range", from(false), [false]);
	t("null to range", from(null), []);
	t("undefined to range", from(undefined), []);
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



});
