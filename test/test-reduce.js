const from = require("../rillet.js").from;
const t = require("./t.js");
const exhausted = require("./exhausted.js");

const array = [1,2,3,4,5,6,7,8];


describe("reduce", () => {
  t("reduce(array, 0)",
    from(array).reduce((x, y) => x + y, 0),
    array.reduce((x, y) => x + y, 0)
   );
  t("reduce(array, 99)",
    from(array).reduce((x, y) => x + y, 99),
    array.reduce((x, y) => x + y, 99)
   );
  t("reduce(array)",
    from(array).reduce((x, y) => x + y),
    array.reduce((x, y) => x + y)
   );
  t("reduce([], 56)",
    from([]).reduce((x, y) => x + y, 56),
    [].reduce((x, y) => x + y, 56)
   );
  exhausted("reduce([])", () =>
    from([]).reduce((x, y) => x + y)
   );
});
