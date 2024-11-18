const from = require("../rillet.js").from;
const t = require("./t.js");

const array = [1,2,3,4,5,6,7,8];

describe("distinct", () => {
  t("distinct()",
    from(array).distinct(),
    array
   );
  t("distinct(array, array)",
    from(array).concat(array).distinct(),
    array
   );
  t("distinct(a => a%2 ? a+1 : a)",
    from(array).distinct(a => a%2 ? a+1 : a),
    [1,3,5,7]
   );
});
