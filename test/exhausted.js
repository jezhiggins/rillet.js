const t = require("./t.js");

function exhausted(label, fn) {
  let msg = "[didn't throw]";
  try {
    fn();
  } catch (err) {
    msg = err;
  }
  t(label, msg, "Sequence is exhausted");
} // exhausted

module.exports = exhausted;
