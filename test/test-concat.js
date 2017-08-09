const from = require("../rillet.js").from;
const t = require("./t.js");

const array = [1,2,3,4,5,6,7,8];

describe("concat", () => {
  // should behave in a similar way to Array.concat
  t("concat(array)",
    from(array).concat(array),
    array.concat(array)
   );
  t("concat(1,2,3)",
    from(array).concat(1,2,3),
    array.concat(1,2,3)
   );
  t("concat([4,5,6]",
    from(array).concat([4,5,6]),
    array.concat([4,5,6])
   );
  t("concat('a','b','c',[4,5,6], 'def')",
    from(array).concat('a','b','c',[4,5,6], 'def'),
    array.concat('a','b','c',[4,5,6], 'def')
   );
});
