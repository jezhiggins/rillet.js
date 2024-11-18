const from = require("../rillet.js").from;
const t = require("./t.js");

describe("sort", () => {
  t("sort",
    from(new Set([8,6,4,2])).sort(),
    [2,4,6,8]
  );

  t("sort(comp)",
    from([2,4,6,8]).sort((l, r) => r < l),
    [8,6,4,2]
  );
});
