const from = require("../rillet.js").from;
const t = require("./t.js");

const array = [1,2,3,4,5,6,7,8];

describe("count", () => {
  t("count", from(array).count(), array.length);
  t("take(4).count", from(array).take(4).count(), 4);
  t("drop(4).count", from(array).drop(4).count(), array.length-4);
  t("count([])", from([]).count(), 0);
});
