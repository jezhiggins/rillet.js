const from = require("../rillet.js").from;
const t = require("./t.js");

const array = [1,2,3,4,5,6,7,8];

describe("take", () => {
  t("take(1)", from(array).take(1), [1]);
  t("take(3)", from(array).take(3), [1,2,3]);
  t("take(7)", from(array).take(7), [1,2,3,4,5,6,7]);
  t("take(8)", from(array).take(8), [1,2,3,4,5,6,7,8]);
  t("take(0)", from(array).take(0), []);
  t("take(13)", from(array).take(13), [1,2,3,4,5,6,7,8]);
});

describe("takeWhile", () => {
  t("takeWhile(true)", from(array).takeWhile(() => true), array);
  t("takeWhile(false)", from(array).takeWhile(() => false), []);
  t("takeWhile(< 6)", from(array).takeWhile(n => n < 6), [1, 2, 3, 4, 5]);
});
