const from = require("../rillet.js").from;
const t = require("./t.js");

const array = [1,2,3,4,5,6,7,8];

describe("forEach", () => {
  let m = "";
  let a = "";

  from(array).forEach(i => m += (i + ","));
  array.forEach(i => a += (i + ","));

  t("forEach", m, a);
});
