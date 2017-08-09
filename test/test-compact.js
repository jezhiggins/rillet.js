const from = require("../rillet.js").from;
const t = require("./t.js");
const array = [1,2,3,4,5,6,7,8];

describe("compact", () => {
  t("compact(array)",
    from(array).compact(),
    array
   );
  t("compact(0, 1, false, 2, null, 3, undefined, 4, '', 5, NaN, 6)",
    from([0, 1, false, 2, null, 3, undefined, 4, '', 5, NaN, 6]).compact(),
    [1,2,3,4,5,6]
   );
});
