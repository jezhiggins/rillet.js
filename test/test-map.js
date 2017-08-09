const from = require("../rillet.js").from;
const t = require("./t.js");

const array = [1,2,3,4,5,6,7,8];

describe("map", () => {
  t("map(toString)",
    from(array).map(i => i.toString()),
    array.map(i => i.toString())
   );
});
