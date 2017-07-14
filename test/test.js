const RilletRange = require("../rillet.js");
const from = RilletRange.from;
const of = RilletRange.of;
const assert = require("assert");

function t(msg, src, expected) {
  const result = (src && src.toArray) ? src.toArray() : src;

  if (Number.isNaN(expected)) {
    it(msg, () => assert.ok(Number.isNaN(result)));
    return;
  } // if ...

  it(msg, () => assert.deepStrictEqual(result, expected));
} // compare

function exhausted(label, fn) {
  let msg = "[didn't throw]";
  try {
    fn();
  } catch (err) {
    msg = err;
  }
  t(label, msg, "Sequence is exhausted");
} // exhausted

const array = [1,2,3,4,5,6,7,8];

const isEven = function(n) { return n%2==0; }

describe("RilletRange", () => {
  describe("from", () => {
    // should behave in a similar way to Array.from, except single objects are convert as
    // if they were an array of length one, rather than to the empty range
    t("array", from([1,2,3]), Array.from([1,2,3]));
    t("string array", from(["pig", "dog"]), Array.from(["pig", "dog"]));
    t("string", from("rillet"), Array.from("rillet"));
    t("string", from("rillet"), ["r", "i", "l", "l", "e", "t"]);
    t("nested array", from([1,2,3,['a','b','c',[7,8,9]]]), Array.from([1,2,3,['a','b','c',[7,8,9]]]));
    t("int", from(1), [1]);
    t("float", from(1.234), [1.234]);
    t("true", from(true), [true]);
    t("false", from(false), [false]);
    t("null", from(null), []);
    t("undefined", from(undefined), []);
  });

  describe("of", () => {
    // should behave in a similar way to Array.of, except single objects are convert as
    // if they were an array of length one, rather than to the empty range
    t("empty", of(), Array.of());
    t("array", of(array), Array.of(array));
    t("...array", of(...array), Array.of(...array));
    t("params", of(1,2,3), Array.of(1,2,3));
    t("string array", of(["pig", "dog"]), Array.of(["pig", "dog"]));
    t("strings", of("pig", "dog"), Array.of("pig", "dog"));
    t("string", of("rillet"), Array.of("rillet"));
    t("nested array", of([1,2,3,['a','b','c',[7,8,9]]]), Array.of([1,2,3,['a','b','c',[7,8,9]]]));
    t("...nested array", of(1,2,3,['a','b','c',[7,8,9]]), Array.of(1,2,3,['a','b','c',[7,8,9]]));
    t("int", of(1), Array.of(1));
    t("float", of(1.234), Array.of(1.234));
    t("true", of(true), Array.of(true));
    t("false", of(false), Array.of(false));
    t("null", of(null), Array.of(null));
    t("nulls", of(null, null, null), Array.of(null, null, null));
    t("undefined", of(undefined), Array.of(undefined));
  });

  describe("filter", () => {
    t("filter(true)", from(array).filter(() => true), [1,2,3,4,5,6,7,8])
    t("filter(false)", from(array).filter(() => false), []);
    t("filter(n > 3)", from(array).filter(n => n > 3), [4,5,6,7,8]);
    t("filter(n < 6)", from(array).filter(n => n < 6), [1,2,3,4,5]);
    t("filter(n > 2).filter(n < 6)", from(array).filter(n => n > 2).filter(n => n < 6), [3,4,5]);
  });

  describe("take", () => {
    t("take(1)", from(array).take(1), [1]);
    t("take(3)", from(array).take(3), [1,2,3]);
    t("take(7)", from(array).take(7), [1,2,3,4,5,6,7]);
    t("take(8)", from(array).take(8), [1,2,3,4,5,6,7,8]);
    t("take(0)", from(array).take(0), []);
    t("take(13)", from(array).take(13), [1,2,3,4,5,6,7,8]);
  });

  describe("drop", () => {
    t("drop(1)", from(array).drop(1), [2,3,4,5,6,7,8]);
    t("drop(3)", from(array).drop(3), [4,5,6,7,8]);
    t("drop(7)", from(array).drop(7), [8]);
    t("drop(8)", from(array).drop(8), []);
    t("drop(0)", from(array).drop(0), [1,2,3,4,5,6,7,8]);
    t("drop(13)", from(array).drop(13), []);
  });

  describe("take/drop", () => {
    t("take(5).drop(3)", from(array).take(5).drop(3), [4,5]);
    t("drop(3).take(3)", from(array).drop(3).take(3), [4,5,6]);
  });

  describe("concat", () => {
    // should behave in a similar way to Array.concat
    t("concat(array)", from(array).concat(array), array.concat(array));
    t("concat(1,2,3)", from(array).concat(1,2,3), array.concat(1,2,3));
    t("concat([4,5,6]", from(array).concat([4,5,6]), array.concat([4,5,6]));
    t("concat('a','b','c',[4,5,6], 'def')", from(array).concat('a','b','c',[4,5,6], 'def'), array.concat('a','b','c',[4,5,6], 'def'));
  });

  describe("map", () => {
    t("map(toString)", from(array).map(i => i.toString()), array.map(i => i.toString()));
  });

  describe("forEach", () => {
    let m = "";
    let a = "";

    from(array).forEach(i => m += (i + ","));
    array.forEach(i => a += (i + ","));

    t("forEach", m, a);
  });

  describe("first", () => {
    t("first", from(array).first(), array[0]);
    t("filter(isEven).first", from(array).filter(isEven).first(), array.filter(isEven)[0]);

    exhausted("filter(false).first", () =>
          from(array).filter(() => false).first())
  });

  describe("firstOrDefault", () => {
    t("firstOrDefault", from(array).firstOrDefault("DEFAULT"), array[0]);
    t("filter(filter).firstOrDefault", from(array).filter(isEven).firstOrDefault("DEFAULT"), array.filter(isEven)[0]);
    t("filter(false).firstOrDefault", from(array).filter(() => false).firstOrDefault("DEFAULT"), "DEFAULT");
  });

  describe("last", () => {
    t("last", from(array).last(), array[array.length-1]);
    const filtered_array = array.filter(isEven);
    t("filter(isEven).last", from(array).filter(isEven).last(), filtered_array[filtered_array.length-1]);

    exhausted("filter(false).last", () =>
          from(array).filter(() => false).last());
  });

  describe("lastOrDefault", () => {
    t("lastOrDefault", from(array).lastOrDefault("DEFAULT"), array[array.length-1]);
    const filtered_array = array.filter(isEven);
    t("filter(isEven).lastOrDefault", from(array).filter(isEven).lastOrDefault("DEFAULT"), filtered_array[filtered_array.length-1]);
    t("filter(false).lastOrDefault", from(array).filter(() => false).lastOrDefault("DEFAULT"), "DEFAULT");
  });

  describe("flatten", () => {
    t("flatten([1,2,3,4])", from([1,2,3,4]).flatten(), [1,2,3,4]);
    t("flatten([[1, 2], [3, 4]])", from([[1, 2], [3, 4]]).flatten(), [1,2,3,4]);
    t("flatten([[[[1],2],3],4])", from([[[[1],2],3],4]).flatten(), [1,2,3,4]);
    t("flatten([1,[2,[3,[4]]]])", from([1,[2,[3,[4]]]]).flatten(), [1,2,3,4]);
    t("flatten([undefined, undefined])", from([undefined, undefined]).flatten(), [undefined, undefined]);
    t("flatten([undefined, [undefined, 'fish'], undefined]).flatten()", from([undefined, [undefined, 'fish'], undefined]).flatten(), [undefined, undefined, 'fish', undefined]);
  });

  describe("reduce", () => {
    t("reduce(array, 0)", from(array).reduce((x, y) => x + y, 0), array.reduce((x, y) => x + y, 0));
    t("reduce(array, 99)", from(array).reduce((x, y) => x + y, 99), array.reduce((x, y) => x + y, 99));
    t("reduce(array)", from(array).reduce((x, y) => x + y), array.reduce((x, y) => x + y));
    t("reduce([], 56)", from([]).reduce((x, y) => x + y, 56), [].reduce((x, y) => x + y, 56));
    exhausted("reduce([])", () =>
          from([]).reduce((x, y) => x + y));
  });

  describe("count", () => {
    t("count", from(array).count(), array.length);
    t("take(4).count", from(array).take(4).count(), 4);
    t("drop(4).count", from(array).drop(4).count(), array.length-4);
  });

  describe("none", () => {
    t("none(true)", from(array).none(() => true), array.find(() => true) === undefined);
    t("none(<5)", from(array).none(n => n < 5), array.find(n => n < 5) === undefined);
    t("none(>5)", from(array).none(n => n > 5), array.find(n => n > 5) === undefined);
    t("none(==1)", from(array).none(n => n == array[0]), array.find(n => n == array[0]) === undefined);
    t("none(==8)", from(array).none(n => n == array[array.length-1]), array.find(n => n == array[array.length-1]) === undefined);

    t("none(false)", from(array).none(() => false), array.find(() => false) === undefined);
    t("none(<0)", from(array).none(n => n < 0), array.find(n => n < 0) === undefined);
    t("none(>10)", from(array).none(n => n > 10), array.find(n => n > 10) === undefined);

    t("[].none(false)", from([]).none(() => false), [].find(() => false) === undefined);
    t("[].none(true)", from([]).none(() => true), [].find(() => true) === undefined);
  });

  describe("every", () => {
    t("every(true)", from(array).every(() => true), array.every(() => true));
    t("every(<5)", from(array).every(n => n < 5), array.every(n => n < 5));
    t("every(>5)", from(array).every(n => n > 5), array.every(n => n > 5));
    t("every(==1)", from(array).every(n => n == array[0]), array.every(n => n == array[0]));
    t("every(==8)", from(array).every(n => n == array[array.length-1]), array.every(n => n == array[array.length-1]));

    t("every(false)", from(array).every(() => false), array.every(() => false));
    t("every(<0)", from(array).every(n => n < 0), array.every(n => n < 0));
    t("every(>10)", from(array).every(n => n > 10), array.every(n => n > 10));

    t("[].every(false)", from([]).every(() => false), [].every(() => false));
    t("[].every(true)", from([]).every(() => true), [].every(() => true));
  });

  describe("some", () => {
    t("some(true)", from(array).some(() => true), array.some(() => true));
    t("some(<5)", from(array).some(n => n < 5), array.some(n => n < 5));
    t("some(>5)", from(array).some(n => n > 5), array.some(n => n > 5));
    t("some(==1)", from(array).some(n => n == array[0]), array.some(n => n == array[0]));
    t("some(==8)", from(array).some(n => n == array[array.length-1]), array.some(n => n == array[array.length-1]));

    t("some(false)", from(array).some(() => false), array.some(() => false));
    t("some(<0)", from(array).some(n => n < 0), array.some(n => n < 0));
    t("some(>10)", from(array).some(n => n > 10), array.some(n => n > 10));

    t("[].some(false)", from([]).some(() => false), [].some(() => false));
    t("[].some(true)", from([]).some(() => true), [].some(() => true));
  });

  describe("join", () => {
    t("join", from(array).join(), array.join());
    t("join(' - ')", from(array).join(' - '), array.join(' - '));
    t("[].join", from([]).join(), [].join());
    t("['fruit'].join", of('fruit').join(), ['fruit'].join());
    t("['fruit','veg'].join", of('fruit', 'veg').join(), ['fruit','veg'].join());
  });

  describe("max", () => {
    t("max()", from(array).max(), 8);
    t("[8,7,6,5,4,3,2,1].max()", of(8,7,6,5,4,3,2,1).max(), 8);
    t("[5,6,7,8,7,6,5].max()", of(8,7,6,5,4,3,2,1).max(), 8);
    t("max(a,b => -a > -b)", from(array).max((a,b) => -a > -b), 1);
    t("['a','c','b'].max()", from('acb').max(), 'c');
    t("[5].max()", of(5).max(), 5);
    t("[].max()", from([]).max(), undefined);
  });

  describe("min", () => {
    t("min()", from(array).min(), 1);
    t("[8,7,6,5,4,3,2,1].min()", of(8,7,6,5,4,3,2,1).min(), 1);
    t("[5,6,7,8,7,6,5].min()", of(8,7,6,5,4,3,2,1).min(), 1);
    t("min(a,b => -a < -b)", from(array).min((a,b) => -a < -b), 8);
    t("['a','c','b'].min()", from('acb').min(), 'a');
    t("[5].min()", of(5).min(), 5);
    t("[].min()", from([]).min(), undefined);
  });

  describe("sum", () => {
    t("sum()", from(array).sum(), 36);
    t("[2].sum()", of(2).sum(), 2);
    t("[].sum()", of().sum(), 0);
    t("['1','2','3']", of('1','2','3').sum(), 6);
    t("[2,null,3].sum()", of(2,null,3).sum(), 5);
    t("[null].sum()", of(null).sum(), 0);
    t("[undefined].sum()", of(undefined).sum(), NaN);
    t("[1, undefined].sum()", of(1, undefined).sum(), NaN);
    t("[1, 'fruit', 2].sum()", of(1, 'fruit', 2).sum(), NaN);
  });

  describe("uniq", () => {
    t("uniq()", from(array).uniq(), array);
    t("uniq(array, array)", from(array).concat(array).uniq(), array);
    t("uniq(a => a%2 ? a+1 : a)", from(array).uniq(a => a%2 ? a+1 : a), [1,3,5,7]);
  });

  describe("compact", () => {
    t("compact()", from(array).compact(), array);
    t("compact(0, 1, false, 2, null, 3, undefined, 4, '', 5, NaN, 6)", from([0, 1, false, 2, null, 3, undefined, 4, '', 5, NaN, 6]).compact(), [1,2,3,4,5,6]);
  });
});
