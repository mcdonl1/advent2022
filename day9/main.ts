const { readFileSync } = require("fs");
//const inputStr: string = readFileSync("test.txt").toString();
const inputStr: string = readFileSync("input.txt").toString();

const inputArr = inputStr.split("\n").map(line => {
  let args = line.split(" ");
  return { dir: args[0], dist: parseInt(args[1]) };
});

//console.log(inputArr);

type Point = {
  x: number;
  y: number;
  next: Point | null;
};

const setupPart1 = (): Point => {
  return {
    x: 0,
    y: 0,
    next: {
      x: 0,
      y: 0,
      next: null,
    },
  };
};

const setupPart2 = (): Point => {
  let head = { x: 0, y: 0, next: null };
  let p = head;
  for (let i = 0; i < 9; i++) {
    p.next = { x: 0, y: 0, next: null };
    p = p.next;
  }
  return head;
};
//let head = setupPart1();
let head = setupPart2();
let path = [];
let tailLocations = new Set<string>();

const printState = (label: string, node1: Point, node2: Point) => {
  console.log(
    `${label}:  H(${node1.x}, ${node1.y}) - T(${node2.x}, ${node2.y})`
  );
};

let p = head;
inputArr.forEach((move, index) => {
  for (let i = 0; i < move.dist; i++) {
    // Move move.dist times
    switch (move.dir) {
      case "U":
        head.y++;
        break;
      case "D":
        head.y--;
        break;
      case "L":
        head.x--;
        break;
      case "R":
        head.x++;
        break;
      default:
        break;
    }
    p = head;
    while (p.next !== null) {
      if (p.next.x === p.x && p.next.y === p.y) {
        p = p.next;
        continue;
      } //Overlap
      if (p.next.x === p.x) {
        // Same column
        if (Math.abs(p.y - p.next.y) > 1) {
          //printState("x=x");
          p.next.y += Math.sign(p.y - p.next.y);
        }
      } else if (p.next.y === p.y) {
        // Same row
        if (Math.abs(p.x - p.next.x) > 1) {
          //printState("y=y");
          p.next.x += Math.sign(p.x - p.next.x);
        }
      } else if (Math.abs(p.x - p.next.x) > 1 || Math.abs(p.y - p.next.y) > 1) {
        // Diagonally separated
        //printState("Diag");

        p.next.x += Math.sign(p.x - p.next.x);
        p.next.y += Math.sign(p.y - p.next.y);
      }
      if (p.next.next === null) tailLocations.add(`${p.next.x}, ${p.next.y}`);
      p = p.next;
    }
  }
});
console.log(`Answer: ${tailLocations.size}`);
