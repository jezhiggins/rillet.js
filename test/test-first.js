const from = require("../rillet.js").from;
const t = require("./t.js");
const exhausted = require("./exhausted.js");

const array = [1,2,3,4,5,6,7,8];
const isEven = function(n) { return n%2==0; }

describe("first", () => {
  t("first", from(array).first(), array[0]);
  t("filter(isEven).first",
    from(array).filter(isEven).first(),
    array.filter(isEven)[0]
   );

  exhausted("filter(false).first", () =>
    from(array).filter(() => false).first()
  );
});

describe("firstOrDefault", () => {
  t("firstOrDefault",
    from(array).firstOrDefault("DEFAULT"),
    array[0]
   );
  t("filter(filter).firstOrDefault",
    from(array).filter(isEven).firstOrDefault("DEFAULT"),
    array.filter(isEven)[0]
   );
  t("filter(false).firstOrDefault",
    from(array).filter(() => false).firstOrDefault("DEFAULT"),
    "DEFAULT"
   );
});
