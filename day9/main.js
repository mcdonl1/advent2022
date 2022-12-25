var readFileSync = require("fs").readFileSync;
var inputStr = readFileSync("test.txt").toString();
//const inputStr: string = readFileSync("input.txt").toString();
var inputArr = inputStr.split("\n").map(function (line) {
    var args = line.split(" ");
    return { dir: args[0], dist: parseInt(args[1]) };
});
console.log(inputArr);
var head = {
    x: 0,
    y: 0,
    next: {
        x: 0,
        y: 0,
        next: null
    }
};
var path = [];
var tailLocations = new Set();
var printState = function (label, node1, node2) {
    console.log("".concat(label, ":  H(").concat(node1.x, ", ").concat(node1.y, ") - T(").concat(node2.x, ", ").concat(node2.y, ")"));
};
var p = head;
inputArr.forEach(function (move, index) {
    for (var i = 0; i < move.dist; i++) {
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
            if (p.next.x === p.x && p.next.y === p.y)
                continue; //Overlap
            if (p.next.x === p.x) {
                // Same column
                if (Math.abs(p.y - p.next.y) > 1) {
                    //printState("x=x");
                    p.next.y += Math.sign(p.y - p.next.y);
                }
            }
            else if (p.next.y === p.y) {
                // Same row
                if (Math.abs(p.x - p.next.x) > 1) {
                    //printState("y=y");
                    p.next.x += Math.sign(p.x - p.next.x);
                }
            }
            else if (Math.abs(p.x - p.next.x) > 1 || Math.abs(p.y - p.next.y) > 1) {
                // Diagonally separated
                //printState("Diag");
                p.next.x += Math.sign(p.x - p.next.x);
                p.next.y += Math.sign(p.y - p.next.y);
            }
            printState("All", p, p.next);
            tailLocations.add("".concat(p.next.x, ", ").concat(p.next.y));
            p = p.next;
        }
        console.log("exit while");
    }
    console.log("exit for:", index === inputArr.length - 1);
});
console.log("Part 1: ".concat(tailLocations.size));
