const { readFileSync } = require("fs");
//const inputStr: string = readFileSync("test.txt").toString();
const inputStr: string = readFileSync("input.txt").toString();

// Map chars to ints, with start = 0 and end = -1
let start: string, end: string;

let inputArr = inputStr.split("\n").map((line, row) =>
  line.split("").map((char, column) => {
    if (char === "S") {
      start = `${row + 1}_${column + 1}`;
      return 1;
    } else if (char === "E") {
      end = `${row + 1}_${column + 1}`;
      return 26;
    } else {
      return char.charCodeAt(0) - 96;
    }
  })
);

let rendering = new Array(inputArr.length).fill(
  new Array(inputArr[0].length).fill(".")
);

const getNodeId = (row: number, col: number) => {
  rendering[row][col] = "#";
  return `${row + 1}_${col + 1}`;
};

console.log(inputArr);

type AdjList = {
  [key: string]: number;
};

type Graph = {
  [key: string]: AdjList;
};

let graph = {};
let currentId = "";

for (let i = 0; i < inputArr.length; i++) {
  for (let j = 0; j < inputArr[i].length; j++) {
    let currentId = getNodeId(i, j);
    graph[currentId] = {};
    if (i > 0) {
      if (inputArr[i - 1][j] - inputArr[i][j] <= 1) {
        graph[currentId][getNodeId(i - 1, j)] = 1;
      }
    }
    if (i < inputArr.length - 1) {
      if (inputArr[i + 1][j] - inputArr[i][j] <= 1) {
        graph[currentId][getNodeId(i + 1, j)] = 1;
      }
    }
    if (j > 0) {
      if (inputArr[i][j - 1] - inputArr[i][j] <= 1) {
        graph[currentId][getNodeId(i, j - 1)] = 1;
      }
    }
    if (j < inputArr[i].length - 1) {
      if (inputArr[i][j + 1] - inputArr[i][j] <= 1) {
        graph[currentId][getNodeId(i, j + 1)] = 1;
      }
    }
  }
}
console.log(rendering);
const printTable = table => {
  return Object.keys(table)
    .map(vertex => {
      var { vertex: from, cost } = table[vertex];
      return `${vertex}: ${cost} via ${from}`;
    })
    .join("\n");
};

const tracePath = (table, start, end) => {
  var path = [];
  var next = end;
  while (true) {
    path.unshift(next);
    if (next === start) {
      break;
    }
    next = table[next].vertex;
  }

  return path;
};

const formatGraph = g => {
  const tmp = {};
  Object.keys(g).forEach(k => {
    const obj = g[k];
    const arr = [];
    Object.keys(obj).forEach(v => arr.push({ vertex: v, cost: obj[v] }));
    tmp[k] = arr;
  });
  return tmp;
};

const dijkstra = (graph, start, end) => {
  var map = formatGraph(graph);
  console.log(graph);

  var visited = [];
  var unvisited = [start];
  var shortestDistances = { [start]: { vertex: start, cost: 0 } };

  var vertex;
  while ((vertex = unvisited.shift())) {
    // Explore unvisited neighbors
    var neighbors = map[vertex].filter(n => !visited.includes(n.vertex));

    // Add neighbors to the unvisited list
    unvisited.push(...neighbors.map(n => n.vertex));

    var costToVertex = shortestDistances[vertex].cost;

    for (let { vertex: to, cost } of neighbors) {
      var currCostToNeighbor =
        shortestDistances[to] && shortestDistances[to].cost;
      var newCostToNeighbor = costToVertex + cost;
      if (
        currCostToNeighbor == undefined ||
        newCostToNeighbor < currCostToNeighbor
      ) {
        // Update the table
        shortestDistances[to] = { vertex, cost: newCostToNeighbor };
      }
    }

    visited.push(vertex);
  }

  console.log("Table of costs:");
  console.log(printTable(shortestDistances));

  const path = tracePath(shortestDistances, start, end);

  console.log(
    "Shortest path is: ",
    path.join(" -> "),
    " with weight ",
    shortestDistances[end].cost
  );
};

dijkstra(graph, start, end);

console.log(`Goal: ${31}`);
