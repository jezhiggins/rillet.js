const from = require("../rillet.js").from;
const t = require("./t.js");

const array = [1,2,3,4,5,6,7,8];

describe("filter", () => {
  t("filter(true)",
    from(array).filter(() => true),
    array.filter(() => true)
   )
  t("filter(false)",
    from(array).filter(() => false),
    array.filter(() => false)
   );
  t("filter(n > 3)",
    from(array).filter(n => n > 3),
    array.filter(n => n > 3)
   );
  t("filter(n < 6)",
    from(array).filter(n => n < 6),
    array.filter(n => n < 6)
   );
  t("filter(n > 2).filter(n < 6)",
    from(array).filter(n => n > 2).filter(n => n < 6),
    array.filter(n => n > 2).filter(n => n < 6)
   );
});
