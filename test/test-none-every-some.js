const from = require("../rillet.js").from;
const t = require("./t.js");

const array = [1,2,3,4,5,6,7,8];


describe("none", () => {
  t("none(true)", from(array).none(() => true), array.find(() => true) === undefined);
  t("none(<5)", from(array).none(n => n < 5), array.find(n => n < 5) === undefined);
  t("none(>5)", from(array).none(n => n > 5), array.find(n => n > 5) === undefined);
  t("none(==1)", from(array).none(n => n == array[0]), array.find(n => n == array[0]) === undefined);
  t("none(==8)", from(array).none(n => n == array[array.length-1]), array.find(n => n == array[array.length-1]) === undefined);

  t("none(false)", from(array).none(() => false), array.find(() => false) === undefined);
  t("none(<0)", from(array).none(n => n < 0), array.find(n => n < 0) === undefined);
  t("none(>10)", from(array).none(n => n > 10), array.find(n => n > 10) === undefined);

  t("[].none(false)", from([]).none(() => false), [].find(() => false) === undefined);
  t("[].none(true)", from([]).none(() => true), [].find(() => true) === undefined);
});

describe("every", () => {
  t("every(true)", from(array).every(() => true), array.every(() => true));
  t("every(<5)", from(array).every(n => n < 5), array.every(n => n < 5));
  t("every(>5)", from(array).every(n => n > 5), array.every(n => n > 5));
  t("every(==1)", from(array).every(n => n == array[0]), array.every(n => n == array[0]));
  t("every(==8)", from(array).every(n => n == array[array.length-1]), array.every(n => n == array[array.length-1]));

  t("every(false)", from(array).every(() => false), array.every(() => false));
  t("every(<0)", from(array).every(n => n < 0), array.every(n => n < 0));
  t("every(>10)", from(array).every(n => n > 10), array.every(n => n > 10));

  t("[].every(false)", from([]).every(() => false), [].every(() => false));
  t("[].every(true)", from([]).every(() => true), [].every(() => true));
});

describe("some", () => {
  t("some(true)", from(array).some(() => true), array.some(() => true));
  t("some(<5)", from(array).some(n => n < 5), array.some(n => n < 5));
  t("some(>5)", from(array).some(n => n > 5), array.some(n => n > 5));
  t("some(==1)", from(array).some(n => n == array[0]), array.some(n => n == array[0]));
  t("some(==8)", from(array).some(n => n == array[array.length-1]), array.some(n => n == array[array.length-1]));

  t("some(false)", from(array).some(() => false), array.some(() => false));
  t("some(<0)", from(array).some(n => n < 0), array.some(n => n < 0));
  t("some(>10)", from(array).some(n => n > 10), array.some(n => n > 10));

  t("[].some(false)", from([]).some(() => false), [].some(() => false));
  t("[].some(true)", from([]).some(() => true), [].some(() => true));
});
