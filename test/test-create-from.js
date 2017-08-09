const from = require("../rillet.js").from;
const t = require("./t.js");

describe("from", () => {
  // should behave in a similar way to Array.from, except single objects are convert as
  // if they were an array of length one, rather than to the empty range
  t("array", from([1,2,3]), Array.from([1,2,3]));
  t("string array", from(["pig", "dog"]), Array.from(["pig", "dog"]));
  t("string", from("rillet"), Array.from("rillet"));
  t("string", from("rillet"), ["r", "i", "l", "l", "e", "t"]);
  t("nested array",
    from([1,2,3,['a','b','c',[7,8,9]]]),
    Array.from([1,2,3,['a','b','c',[7,8,9]]])
   );
  t("int", from(1), [1]);
  t("float", from(1.234), [1.234]);
  t("true", from(true), [true]);
  t("false", from(false), [false]);
  t("null", from(null), []);
  t("undefined", from(undefined), []);
});
