const RilletRange = require("../rillet.js");
const of = RilletRange.of;
const from = RilletRange.from;
const t = require("./t.js");

describe("cycle", () => {
  t("nothing", from().cycle(), []);
  t("empty array", from([]).cycle(), []);

  const cycle_tests = [
    [1, ['a']],
    [3, ['a', 'b', 'c']],
    [5, ['a', 'b', 'c', 'a', 'b']],
    [7, ['a', 'b', 'c', 'a', 'b', 'c', 'a']],
    [11, ['a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b']],
  ]

  for (const [len, expected] of cycle_tests) {
    t(`array take(${len})`, from('abc').cycle().take(len), expected);
    t(`iterable take(${len})`, of('a', 'b', 'c').cycle().take(len), expected);
  } // for ...
});
