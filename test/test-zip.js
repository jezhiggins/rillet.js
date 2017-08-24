const zip = require("../rillet.js").zip;
const t = require("./t.js");

describe("zip", () => {
  t("zip()",
    zip(), []);

  t("zip(undefined)",
    zip(undefined), []);

  t("zip([])",
    zip([]), []);

  t("zip([], [])",
    zip([], []), []);

  t("zip([], [], []",
    zip([], [], []), []);

  t("zip([a], [b])",
    zip(['a'], ['b']), [['a','b']]);

  t("zip([a, b], [b, c])",
    zip(['a', 'b'], ['b', 'c']), [['a','b'], ['b','c']]);

  t("zip([a], [b, c])",
    zip(['a'], ['b', 'c']), [['a','b']]);

  t("zip([a, b], [b])",
    zip(['a', 'b'], ['b']), [['a','b']]);

  t("zip([a, b, c], [b, c, d])",
    zip(['a', 'b', 'c'], ['b', 'c', 'd']), [['a','b'], ['b','c'], ['c', 'd']]);

  t("zip([a, A], [b, B], [c, C])",
    zip(['a', 'A'], ['b', 'B'], ['c', 'C']), [['a', 'b', 'c'], ['A', 'B', 'C']]);
});
