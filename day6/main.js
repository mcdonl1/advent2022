const { readFileSync } = require("fs");

const inputStr = readFileSync("input.txt").toString();
const isAllUnique = str => {
  let result = true;
  let strCopy = str.slice(0, str.length);
  str.split("").forEach((char, index) => {
    if (
      index < str.length - 1 &&
      str.slice(index + 1, str.length).includes(char)
    ) {
      result = false;
    }
  });
  return result;
};

let ans1 = 0;
for (let i = 0; i < inputStr.length; i++) {
  let subStr = inputStr.slice(i, i + 4);
  if (isAllUnique(subStr)) {
    ans1 = i + 4;
    break;
  }
}

let ans2 = 0;
for (let i = 0; i < inputStr.length; i++) {
  let subStr = inputStr.slice(i, i + 14);
  if (isAllUnique(subStr)) {
    ans2 = i + 14;
    break;
  }
}
console.log("Part 1:", ans1);
console.log("Part 2:", ans2);
