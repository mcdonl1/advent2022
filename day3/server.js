const { readFileSync } = require("fs");

const inputString = readFileSync("input.txt").toString();

let inputs = inputString.split("\n");

function getPriority(char) {
  if (char === char.toUpperCase()) {
    return char.charCodeAt() - 38;
  } else if (char === char.toLowerCase()) {
    return char.charCodeAt() - 96;
  } else {
    return 0;
  }
}

let sum = 0;
inputs.forEach(bag => {
  let halfWay = Math.ceil(bag.length / 2);
  let compartment1 = bag.slice(0, halfWay);
  let compartment2 = bag.slice(halfWay, bag.length);
  for (let i = 0; i < compartment1.length; i++) {
    if (compartment2.includes(compartment1[i])) {
      sum += getPriority(compartment1[i]);
      break;
    }
  }
});

console.log("Part 1:", sum);

let badgeSum = 0;
for (let i = 0; i < Math.floor(inputs.length / 3); i++) {
  let group = [inputs[i * 3], inputs[i * 3 + 1], inputs[i * 3 + 2]];

  for (let j = 0; j < group[0].length; j++) {
    if (group[1].includes(group[0][j]) && group[2].includes(group[0][j])) {
      badgeSum += getPriority(group[0][j]);
      break;
    }
  }
}

console.log("Part 2:", badgeSum);
