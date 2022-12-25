const { readFileSync } = require("fs");
//const inputStr: string = readFileSync("test.txt").toString();
const inputStr: string = readFileSync("input.txt").toString();

const inputArr = inputStr.split("\n").map(line => {
  let args = line.split(" ");
  return { instr: args[0], arg: args.length > 1 ? parseInt(args[1]) : null };
});

console.log(inputArr);

var cycles = 0;
var x = 1;
let ans1 = 0;

const initCRT = (rows: number, columns: number): string[][] => {
  let crt: string[][] = [];
  for (let i = 0; i < rows; i++) {
    crt.push(new Array(columns).fill("."));
  }
  return crt;
};

let crt = initCRT(6, 40);

const cycle = (n: number): void => {
  for (let i = 0; i < n; i++) {
    draw(crt, Math.floor(cycles / 40), cycles % 40, x);
    cycles++;
    if ((cycles - 20) % 40 === 0 && cycles !== 0) {
      ans1 += cycles * x;
      console.log(cycles * x);
    }
  }
};

const renderCRT = (crt: string[][]) => {
  crt.forEach(row => {
    console.log(row.join(""));
  });
};

const draw = (crt: string[][], row: number, col: number, x: number) => {
  if (col === x || col === x - 1 || col === x + 1) crt[row][col] = "#";
};

inputArr.forEach(line => {
  if (line.instr === "noop") {
    cycle(1);
  } else if (line.instr === "addx") {
    cycle(2);
    x += line.arg;
    console.log(cycles, line.arg, x);
  }
});

console.log(`Part 1: ${ans1}`);
console.log("\n\nPart2:\n");
renderCRT(crt);
