const { readFileSync } = require("fs");

const inputStr = readFileSync("input.txt").toString();

const inputArr = inputStr
  .split("\n")
  .map(line =>
    line.split(",").map(set => set.split("-").map(val => parseInt(val)))
  );
inputArr.pop();
function isContainedPair(pair) {
  console.log(pair);
  return (
    (pair[0][0] <= pair[1][0] && pair[0][1] >= pair[1][1]) ||
    (pair[1][0] <= pair[0][0] && pair[1][1] >= pair[0][1])
  );
}

function isBetween(a, b, c) {
  return (b <= a && a <= c) || (c <= a && a <= b);
}
function isOverlapPair(pair) {
  return (
    isBetween(pair[0][0], pair[1][0], pair[1][1]) ||
    isBetween(pair[0][1], pair[1][0], pair[1][1]) ||
    isBetween(pair[1][0], pair[0][0], pair[0][1]) ||
    isBetween(pair[1][0], pair[0][0], pair[0][1])
  );
}

const ans1 = inputArr.filter(pair => isContainedPair(pair)).length;
const ans2 = inputArr.filter(pair => isOverlapPair(pair)).length;
console.log("Part 1:", ans1);
console.log("Part 2:", ans2);
