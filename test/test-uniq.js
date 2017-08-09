const from = require("../rillet.js").from;
const t = require("./t.js");

const array = [1,2,3,4,5,6,7,8];

describe("uniq", () => {
  t("uniq()",
    from(array).uniq(),
    array
   );
  t("uniq(array, array)",
    from(array).concat(array).uniq(),
    array
   );
  t("uniq(a => a%2 ? a+1 : a)",
    from(array).uniq(a => a%2 ? a+1 : a),
    [1,3,5,7]
   );
});
