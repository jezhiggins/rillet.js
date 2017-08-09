const assert = require("assert");

function compareSequences(msg, src, expected) {
  const result = (src && src.toArray) ? src.toArray() : src;

  if (Number.isNaN(expected))
    return it(msg, () => assert.ok(Number.isNaN(result)));

  it(msg, () => assert.deepStrictEqual(result, expected));
} // compareSequences

module.exports = compareSequences;
