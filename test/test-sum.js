const rillet = require("../rillet.js");
const from = rillet.from;
const of = rillet.of;
const t = require("./t.js");

const array = [1,2,3,4,5,6,7,8];

describe("sum", () => {
  t("sum()", from(array).sum(), 36);
  t("[2].sum()", of(2).sum(), 2);
  t("[].sum()", of().sum(), 0);
  t("['1','2','3']", of('1','2','3').sum(), 6);
  t("[2,null,3].sum()", of(2,null,3).sum(), 5);
  t("[null].sum()", of(null).sum(), 0);
  t("[undefined].sum()", of(undefined).sum(), NaN);
  t("[1, undefined].sum()", of(1, undefined).sum(), NaN);
  t("[1, 'fruit', 2].sum()", of(1, 'fruit', 2).sum(), NaN);
});
