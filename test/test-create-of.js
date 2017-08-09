const of = require("../rillet.js").of;
const t = require("./t.js");

const array = [1,2,3,4,5,6,7,8];

describe("of", () => {
  // should behave in a similar way to Array.of, except single
  // objects are convert as if they were an array of length one,
  // rather than to the empty range
  t("empty", of(), Array.of());
  t("array", of(array), Array.of(array));
  t("...array", of(...array), Array.of(...array));
  t("params", of(1,2,3), Array.of(1,2,3));
  t("string array", of(["pig", "dog"]), Array.of(["pig", "dog"]));
  t("strings", of("pig", "dog"), Array.of("pig", "dog"));
  t("string", of("rillet"), Array.of("rillet"));
  t("nested array",
    of([1,2,3,['a','b','c',[7,8,9]]]),
    Array.of([1,2,3,['a','b','c',[7,8,9]]])
   );
  t("...nested array",
    of(1,2,3,['a','b','c',[7,8,9]]),
    Array.of(1,2,3,['a','b','c',[7,8,9]])
   );
  t("int", of(1), Array.of(1));
  t("float", of(1.234), Array.of(1.234));
  t("true", of(true), Array.of(true));
  t("false", of(false), Array.of(false));
  t("null", of(null), Array.of(null));
  t("nulls", of(null, null, null), Array.of(null, null, null));
  t("undefined", of(undefined), Array.of(undefined));
});
