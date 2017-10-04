const from = require("../rillet.js").from;
const t = require("./t.js");

const array = [1,2,3,4,5,6,7,8];

describe("take", () => {
  const take_tests = [
    [ 1, [ 1 ] ],
    [ 3, [ 1, 2, 3 ] ],
    [ 7, [ 1, 2, 3, 4, 5, 6, 7 ] ],
    [ 8, [ 1, 2, 3, 4, 5, 6, 7, 8 ] ],
    [ 0, [] ],
    [ 13, [ 1, 2, 3, 4, 5, 6, 7, 8 ] ]
  ]

  for (const [len, expected] of take_tests)
    t(`take(${len})`, from(array).take(len), expected)
});

describe("takeWhile", () => {
  const take_while_tests = [
    [ 'true', () => true, array ],
    [ 'false', () => false, [] ],
    [ '< 6', n => n < 6, [ 1, 2, 3, 4, 5 ]]
  ]

  for (const [label, predicate, expected] of take_while_tests)
    t(`takeWhile(${label})`, from(array).takeWhile(predicate), expected)
});
