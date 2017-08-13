const RilletRange = require("../rillet.js");
const of = RilletRange.of;
const cycle = RilletRange.cycle;
const t = require("./t.js");

describe("cycle", () => {
  t("nothing", cycle(), []);
  t("empty array", cycle([]), []);
  t("array", cycle([1, 2, 3]).take(7), [1, 2, 3, 1, 2, 3, 1]);

  t("iterable", cycle(of('a', 'b', 'c')).take(7), ['a', 'b', 'c', 'a', 'b', 'c', 'a']);
});
