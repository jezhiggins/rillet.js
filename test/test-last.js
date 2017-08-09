const from = require("../rillet.js").from;
const t = require("./t.js");
const exhausted = require("./exhausted.js");

const array = [1,2,3,4,5,6,7,8];
const isEven = function(n) { return n%2==0; }

describe("last", () => {
  t("last",
    from(array).last(),
    array[array.length-1]
   );

  const filtered_array = array.filter(isEven);
  t("filter(isEven).last",
    from(array).filter(isEven).last(),
    filtered_array[filtered_array.length-1]
   );

  exhausted("filter(false).last", () =>
    from(array).filter(() => false).last()
   );
});

describe("lastOrDefault", () => {
  t("lastOrDefault",
    from(array).lastOrDefault("DEFAULT"),
    array[array.length-1]
   );

  const filtered_array = array.filter(isEven);
  t("filter(isEven).lastOrDefault",
    from(array).filter(isEven).lastOrDefault("DEFAULT"),
    filtered_array[filtered_array.length-1]
   );

  t("filter(false).lastOrDefault",
    from(array).filter(() => false).lastOrDefault("DEFAULT"),
    "DEFAULT"
   );
});
