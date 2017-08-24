const RilletRange = require("../rillet.js");
const of = RilletRange.of;
const from = RilletRange.from;
const t = require("./t.js");

describe("cycle", () => {
  t("nothing", from().cycle(), []);
  t("empty array", from([]).cycle(), []);
  t("array take(1)", from('abc').cycle().take(1), ['a']);
  t("array take(3)", from('abc').cycle().take(3), ['a', 'b', 'c']);
  t("array take(5)", from('abc').cycle().take(5), ['a', 'b', 'c', 'a', 'b']);
  t("array take(7)", from('abc').cycle().take(7), ['a', 'b', 'c', 'a', 'b', 'c', 'a']);
  t("array take(11)", from('abc').cycle().take(11), ['a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b']);


  t("iterable take(1)", of('a', 'b', 'c').cycle().take(1), ['a']);
  t("iterable take(3)", of('a', 'b', 'c').cycle().take(3), ['a', 'b', 'c']);
  t("iterable take(5)", of('a', 'b', 'c').cycle().take(5), ['a', 'b', 'c', 'a', 'b']);
  t("iterable take(7)", of('a', 'b', 'c').cycle().take(7), ['a', 'b', 'c', 'a', 'b', 'c', 'a']);
  t("iterable take(11)", of('a', 'b', 'c').cycle().take(11), ['a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b']);
});
