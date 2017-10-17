const from = require("../rillet.js").from;
const t = require("./t.js");
const exhausted = require("./exhausted.js");

const array = [1,2,3,4,5,6,7,8];


describe("reduce", () => {
  const reduce_tests = [
    [ array, 0 ],
    [ array, 99 ],
    [ array, 56 ],
    [ array, -1 ],
    [ array, -10 ],
    [ array, null ],
    [ [], 56 ],
    [ [1], 37 ],
    [ [1], null ]
  ];

  const sum = (x, y) => x + y;
  const mult = (x, y) => x * y;
  for(const [label, fn] of [ ['sum', sum], ['multiply', mult]])
    for(const [data, seed] of reduce_tests)
      t(
        `[${data}].reduce(${label}, ${seed})`,
        from(data).reduce(fn, seed),
        data.reduce(fn, seed)
      )

  exhausted("reduce([])", () =>
    from([]).reduce((x, y) => x + y)
   );
});
