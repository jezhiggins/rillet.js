const from = require("../rillet.js").from;
const t = require("./t.js");

const array = [1,2,3,4,5,6,7,8];
const expected = new Set([1,2,3,4,5,6,7,8])

describe("toSet", () => {
    t("toSet()",
        from(array).toSet(),
        expected
    );
    t("concat(array, array).toSet()",
        from(array).concat(array).toSet(),
        expected
    );
    t("map(a => a%2 ? a+1 : a).toSet()",
        from(array).map(a => a%2 ? a-1 : a).toSet(),
        new Set([0,2,4,6,8])
    );
});
