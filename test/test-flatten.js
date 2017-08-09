const from = require("../rillet.js").from;
const t = require("./t.js");

const array = [1,2,3,4,5,6,7,8];

describe("flatten", () => {
  t("flatten([1,2,3,4])",
    from(array).flatten(),
    array
   );
  t("flatten([[1, 2], [3, 4]])",
    from([[1, 2], [3, 4]]).flatten(),
    [1,2,3,4]
   );
  t("flatten([[[[1],2],3],4])",
    from([[[[1],2],3],4]).flatten(),
    [1,2,3,4]
   );
  t("flatten([1,[2,[3,[4]]]])",
    from([1,[2,[3,[4]]]]).flatten(),
    [1,2,3,4]
   );
  t("flatten([undefined, undefined])",
    from([undefined, undefined]).flatten(),
    [undefined, undefined]
   );
  t("flatten([undefined, [undefined, 'fish'], undefined]).flatten()",
    from([undefined, [undefined, 'fish'], undefined]).flatten(),
    [undefined, undefined, 'fish', undefined]
   );
});
