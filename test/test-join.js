const rillet = require("../rillet.js");
const from = rillet.from;
const of = rillet.of;
const t = require("./t.js");

const array = [1,2,3,4,5,6,7,8];

describe("join", () => {
  t("join",
    from(array).join(),
    array.join()
   );
  t("join(' - ')",
    from(array).join(' - '),
    array.join(' - ')
   );
  t("[].join",
    from([]).join(),
    [].join()
   );
  t("['fruit'].join",
    of('fruit').join(),
    ['fruit'].join()
   );
  t("['fruit','veg'].join",
    of('fruit', 'veg').join(),
    ['fruit','veg'].join()
   );
});
