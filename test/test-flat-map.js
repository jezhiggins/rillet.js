const from = require("../rillet.js").from;
const t = require("./t.js");

const array = [1,2,3,4];

describe("flatMap", () => {
  t("flatMap(i => i*i)",
    from(array).flatMap(i => i*i),
    [1,4,9,16]
  );

  t("flatMap(i => [i,i*i])",
    from(array).flatMap(i => [i, i*i]),
    [1,1,2,4,3,9,4,16]
  );

  t("flatMap(i => [i,[i*i, i*i*i])",
    from(array).flatMap(i => [i, [i*i, i*i*i]]),
    [1,[1,1],2,[4,8],3,[9,27],4,[16,64]]
  );
});
