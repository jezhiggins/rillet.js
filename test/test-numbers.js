const numbers = require("../rillet.js").numbers;
const t = require("./t.js");

describe("numbers", () => {
  t("numbers()",
    numbers().take(5), [0, 1, 2, 3, 4]);

  t("numbers(5)",
    numbers(5).take(3), [5, 6, 7]);

  t("numbers(-5)",
    numbers(-5).take(3), [-5, -4, -3]);

  t("numbers(0, 1)",
    numbers(0, 1).take(3), [0, 1, 2]);

  t("numbers(0, 2)",
    numbers(0, 2).take(3), [0, 2, 4]);

  t("numbers(0, -2)",
    numbers(0, -2).take(3), [0, -2, -4]);

  t("numbers(-5, -1)",
    numbers(-5, -1).take(3), [-5, -6, -7]);
});
