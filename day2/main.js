const { readFileSync } = require("fs");

const inputStr = readFileSync("./input.txt").toString();

let input_array = inputStr.split("\n");

input_array = input_array.map(item => item.slice(0, 3).split(" "));
input_array = input_array.map(item => {
  return { theirs: item[0], mine: item[1] };
});

let score1 = 0;
input_array.forEach(match => {
  if (match.mine === "X") {
    score1 += 1;
    if (match.theirs === "C") {
      score1 += 6;
    } else if (match.theirs === "A") {
      score1 += 3;
    }
  } else if (match.mine === "Y") {
    score1 += 2;
    if (match.theirs === "A") {
      score1 += 6;
    } else if (match.theirs === "B") {
      score1 += 3;
    }
  } else if (match.mine === "Z") {
    score1 += 3;
    if (match.theirs === "B") {
      score1 += 6;
    } else if (match.theirs === "C") {
      score1 += 3;
    }
  }
});

console.log("Part 1:", score1);

let score2 = 0;

function getBasePoints(char) {
  if (char === "A" || char === "X") {
    return 1;
  } else if (char === "B" || char === "Y") {
    return 2;
  } else if (char === "C" || char === "Z") {
    return 3;
  }
}

function getWin(char) {
  if (char === "A") {
    return "Y";
  } else if (char === "B") {
    return "Z";
  } else if (char === "C") {
    return "X";
  }
}

function getLoss(char) {
  if (char === "A") {
    return "Z";
  } else if (char === "B") {
    return "X";
  } else if (char === "C") {
    return "Y";
  }
}

input_array.forEach(match => {
  // X lose
  // Y draw
  // Z win
  if (match.mine === "X") {
    score2 += getBasePoints(getLoss(match.theirs));
  } else if (match.mine === "Y") {
    score2 += 3 + getBasePoints(match.theirs);
  } else if (match.mine === "Z") {
    score2 += 6 + getBasePoints(getWin(match.theirs));
  }
});

console.log("Part 2:", score2);
