const rillet = require("../rillet.js");
const from = rillet.from;
const of = rillet.of;
const t = require("./t.js");

const array = [1,2,3,4,5,6,7,8];

describe("max", () => {
  t("max()", from(array).max(), 8);
  t("[8,7,6,5,4,3,2,1].max()", of(8,7,6,5,4,3,2,1).max(), 8);
  t("[5,6,7,8,7,6,5].max()", of(8,7,6,5,4,3,2,1).max(), 8);
  t("max(a,b => -a > -b)", from(array).max((a,b) => -a > -b), 1);
  t("['a','c','b'].max()", from('acb').max(), 'c');
  t("[5].max()", of(5).max(), 5);
  t("[].max()", from([]).max(), undefined);
});

describe("min", () => {
  t("min()", from(array).min(), 1);
  t("[8,7,6,5,4,3,2,1].min()", of(8,7,6,5,4,3,2,1).min(), 1);
  t("[5,6,7,8,7,6,5].min()", of(8,7,6,5,4,3,2,1).min(), 1);
  t("min(a,b => -a < -b)", from(array).min((a,b) => -a < -b), 8);
  t("['a','c','b'].min()", from('acb').min(), 'a');
  t("[5].min()", of(5).min(), 5);
  t("[].min()", from([]).min(), undefined);
});
