/*
pliny.value({
  parent: "Primrose.Text.Grammars",
  name: "TestResults",
  description: "A grammar for displaying the results of Unit Tests."
});
*/

import Grammar from "./Grammar";
export default new Grammar("TestResults", [
  ["newlines", /(?:\r\n|\r|\n)/, true],
  ["numbers", /(\[)(o+)/, true],
  ["numbers", /(\d+ succeeded), 0 failed/, true],
  ["numbers", /^    Successes:/, true],
  ["functions", /(x+)\]/, true],
  ["functions", /[1-9]\d* failed/, true],
  ["functions", /^    Failures:/, true],
  ["comments", /(\d+ms:)(.*)/, true],
  ["keywords", /(Test results for )(\w+):/, true],
  ["strings", /        \w+/, true]
]);
