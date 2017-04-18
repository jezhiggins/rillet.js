const MangoRange = require("../mango.js");
const from = MangoRange.from;
const assert = require("assert");

function t(msg, src, expected) {
    it(msg, () => assert.deepStrictEqual(src.toArray(), expected));
} // compare

describe("MangoRange", () => {
    describe("from", () => {
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
	const array = [1,2,3,4,5,6,7,8];
	t("where(true)", from(array).where(() => true), [1,2,3,4,5,6,7,8])
	t("where(false)", from(array).where(() => false), []);
	t("where(n > 3)", from(array).where(n => n > 3), [4,5,6,7,8]);
	t("where(n < 6)", from(array).where(n => n < 6), [1,2,3,4,5]);
	t("where(n > 2).where(n < 6)", from(array).where(n => n > 2).where(n => n < 6), [3,4,5]);
    });
});
