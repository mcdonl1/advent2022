const { readFileSync } = require("fs");

//const inputStr: string = readFileSync("test.txt").toString();
const inputStr: string = readFileSync("input.txt").toString();

type Tree = {
  row: number;
  col: number;
};

const inputArr: number[][] = inputStr
  .split("\n")
  .map(line => line.split("").map(char => parseInt(char)));

let visible: Tree[] = [];
let scenicScore = 0;

const addUnique = (item: Tree, arr: Tree[]): void => {
  if (
    arr.find(
      element => item.row === element.row && item.col === element.col
    ) === undefined
  ) {
    arr.push(item);
  }
};

const getScenicScore = (a: number, b: number, c: number, d: number): number => {
  return a * b * c * d;
};

for (let row = 0; row < inputArr.length; row++) {
  for (let col = 0; col < inputArr.length; col++)
    if (
      row === 0 ||
      row === inputArr.length - 1 ||
      col === 0 ||
      col === inputArr[row].length - 1
    ) {
      // Tree is on outside -> visible
      visible.push({ row, col });
    } else {
      let fromTop = true,
        fromBottom = true,
        fromLeft = true,
        fromRight = true;
      let scoreTop = 0,
        scoreBottom = 0,
        scoreLeft = 0,
        scoreRight = 0;
      let currentTreeHeight = inputArr[row][col];
      for (
        let offset = 1;
        row + offset < inputArr[row].length ||
        row - offset >= 0 ||
        col + offset < inputArr.length ||
        col - offset >= 0;
        offset++
      ) {
        // Spread out in 4 directions from current location
        if (fromTop && row - offset >= 0) {
          if (currentTreeHeight <= inputArr[row - offset][col]) {
            fromTop = false;
          }
          scoreTop = offset;
        }
        if (fromBottom && row + offset < inputArr[row].length) {
          if (currentTreeHeight <= inputArr[row + offset][col]) {
            fromBottom = false;
          }
          scoreBottom = offset;
        }
        if (fromLeft && col - offset >= 0) {
          if (currentTreeHeight <= inputArr[row][col - offset]) {
            fromLeft = false;
          }
          scoreLeft = offset;
        }
        if (fromRight && col + offset < inputArr.length) {
          if (currentTreeHeight <= inputArr[row][col + offset]) {
            fromRight = false;
          }
          scoreRight = offset;
        }
      }
      if (fromTop || fromBottom || fromLeft || fromRight) {
        visible.push({ row, col });
        let newScore = getScenicScore(
          scoreTop,
          scoreBottom,
          scoreLeft,
          scoreRight
        );
        scenicScore = newScore > scenicScore ? newScore : scenicScore;
      } else {
      }
    }
}

console.log(`Part 1: ${visible.length}`);
console.log(`Part 2: ${scenicScore}`);
