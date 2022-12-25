const { readFileSync } = require("fs");
//const inputStr: string = readFileSync("test.txt").toString();
const inputStr: string = readFileSync("input.txt").toString();

type Monkey = {
  id: number;
  items: number[];
  operation: string;
  divisor: number;
  onTrue: number;
  onFalse: number;
  inspected: number;
};
let inputArr = (function (inputStr: string): Monkey[] {
  return inputStr.split("\n\n").map((block, index): Monkey => {
    let blockArr = block.split("\n");

    //console.log(blockArr);

    let testLine = blockArr[3].split(" ");
    let trueLine = blockArr[4].split(" ");
    let falseLine = blockArr[5].split(" ");

    let monkeyObj: Monkey = {
      id: index,
      items: blockArr[1]
        .split(":")[1]
        .split(", ")
        .map(worry => parseInt(worry)),
      operation: blockArr[2].split(" = ")[1],
      divisor: parseInt(testLine[testLine.length - 1]),
      onFalse: parseInt(falseLine[falseLine.length - 1]),
      onTrue: parseInt(trueLine[trueLine.length - 1]),
      inspected: 0,
    };

    return monkeyObj;
  });
})(inputStr);

const doOperation = (old: number, operation: string): number => {
  let operands = operation.split(" ");
  let op = operands[1];
  let b = operands[2] === "old" ? old : parseInt(operands[2]);
  if (op === "*") {
    return old * b;
  } else if (op === "/") {
    return Math.floor(old / b);
  } else if (op === "+") {
    return old + b;
  } else if (op === "-") {
    return old - b;
  }
};

const PART: number = 2;
const ROUNDS = PART === 1 ? 20 : 10000;
const TARGET = 2713310158;
let currentItem: number;
let monkeyBusiness: number;

let reducer = inputArr
  .map(monkey => monkey.divisor)
  .reduce((prev, curr, index) => prev * curr, 1);
for (let round = 0; round < ROUNDS; round++) {
  inputArr.forEach(monkey => {
    //console.log(monkey);
    while (monkey.items.length > 0) {
      currentItem = monkey.items.shift();
      if (PART === 1) {
        currentItem = Math.floor(
          doOperation(currentItem, monkey.operation) / 3
        );
      } else {
        currentItem = Math.floor(
          doOperation(currentItem, monkey.operation) % reducer
        );
      }
      if (currentItem % monkey.divisor === 0) {
        inputArr[monkey.onTrue].items.push(currentItem);
      } else {
        inputArr[monkey.onFalse].items.push(currentItem);
      }
      monkey.inspected++;
    }
  });
}
//console.log(inputArr);
monkeyBusiness = inputArr
  .map(monkey => monkey.inspected)
  .sort((a, b) => b - a)
  .reduce((prev, current, index) => (index < 2 ? prev * current : prev), 1);

//console.log(monkeyBusiness);
console.log(`Part ${PART}: ${monkeyBusiness}`);
