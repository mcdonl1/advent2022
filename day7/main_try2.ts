const { readFileSync } = require("fs");

// const inputStr: string = readFileSync("test.txt").toString();
const inputStr: string = readFileSync("input.txt").toString();

const inputArr: string[] = inputStr.split("\n");

type FileType = {
  name: string;
  size: number;
};

type Directory = {
  name: string;
  files: FileType[];
  children: Directory[];
  parent: Directory;
};

// Create tree

const mkdir = (path: string[], root: Directory): void => {
  let pointer = root;
  path.forEach((dir, index) => {
    if (pointer.children.filter(child => child.name === dir).length > 0) {
      pointer = pointer.children.find(child => child.name === dir);
    } else if (index === path.length - 1) {
      // Last dir name in path, mkdir here
      pointer.children.push({
        name: dir,
        files: [],
        children: [],
        parent: pointer,
      });
    }
  });
};

const addFiles = (path: string[], root: Directory, files: FileType[]) => {
  let pointer = root;
  path.forEach((dir, index) => {
    if (pointer.children.filter(child => child.name === dir).length > 0) {
      pointer = pointer.children.find(child => child.name === dir);
    }
    if (index === path.length - 1) {
      // Last dir name in path, mkdir here
      pointer.files = files;
    }
  });
};

const traverseDirs = (root: Directory, callback: Function): void => {
  let pointer = root;
  callback(pointer);
  if (pointer.children.length > 0) {
    pointer.children.forEach(child => {
      traverseDirs(child, callback);
    });
  }
};
//df
console.log();

const createTree = (commands: string[]): Directory => {
  let fs: Directory = {
    name: "root",
    files: [],
    children: [],
    parent: null,
  };
  let path = [];
  let files: FileType[] = [];
  commands.forEach(cmd => {
    let args = cmd.split(" ");
    if (args[0] === "$") {
      // Is command
      // Add files from previous ls
      if (files.length > 0) {
        addFiles(path, fs, files);
        files = [];
      }
      if (args[1] === "cd") {
        // mkdir
        if (args[2] === "..") {
          path.pop();
        } else {
          path.push(args[2]);
          mkdir(path, fs);
        }
      }
    } else if (!isNaN(parseInt(args[0]))) {
      // add file
      files.push({ size: parseInt(args[0]), name: args[1] });
    }
  });
  if (files.length > 0) {
    addFiles(path, fs, files);
    files = [];
  }
  return fs;
};

let fs = createTree(inputArr); // DONE

let ans1 = 0;
const getDirSize = (dir: Directory): number => {
  let size = 0;
  size += getSizeFromFiles(dir.files);
  dir.children.forEach(child => (size += getDirSize(child)));

  return size;
};

let getSizeFromFiles = (files: FileType[]): number => {
  return files.reduce((pSum, file) => pSum + file.size, 0);
};

traverseDirs(fs, (dir: Directory) => {
  let dirSize = getDirSize(dir);
  if (dirSize <= 100000) {
    ans1 += dirSize;
  }
});

console.log(`Part 1: ${ans1}`);

// Part 2
let totalSpace = 70000000;
let freeSpace = totalSpace - getDirSize(fs);
let spaceNeeded = 30000000 - freeSpace;

let bestDirSize = getDirSize(fs);

traverseDirs(fs, dir => {
  let dirSize = getDirSize(dir);
  if (dirSize > spaceNeeded && dirSize < bestDirSize) {
    bestDirSize = dirSize;
  }
});

console.log(`Part 2: ${bestDirSize}`);
