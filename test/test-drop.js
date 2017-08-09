const from = require("../rillet.js").from;
const t = require("./t.js");

const array = [1,2,3,4,5,6,7,8];

describe("drop", () => {
  t("drop(1)", from(array).drop(1), [2,3,4,5,6,7,8]);
  t("drop(3)", from(array).drop(3), [4,5,6,7,8]);
  t("drop(7)", from(array).drop(7), [8]);
  t("drop(8)", from(array).drop(8), []);
  t("drop(0)", from(array).drop(0), [1,2,3,4,5,6,7,8]);
  t("drop(13)", from(array).drop(13), []);
});

describe("dropWhile", () => {
  t("dropWhile(true)", from(array).dropWhile(() => true), []);
  t("dropWhile(false)", from(array).dropWhile(() => false), array);
  t("dropWhile(< 6)", from(array).dropWhile(n => n < 6), [6, 7, 8]);
});

describe("take/drop", () => {
  t("take(5).drop(3)", from(array).take(5).drop(3), [4,5]);
  t("drop(3).take(3)", from(array).drop(3).take(3), [4,5,6]);
});
