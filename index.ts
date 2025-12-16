import { file } from 'bun';
import fs from 'fs';
import path from 'path';
import type { TypeElement } from 'typescript';

let files = [];

interface TreeNode {
  [key: string]: TreeNode | null;
}

const folderMapper = (dirpath: string): unknown[] => {
  // first get the files in from the first level directory 
  const dirfiles = fs.readdirSync(dirpath);
  // const types = type(files, dirpath);
  
  dirfiles.forEach((file) =>{
    const absolute = path.join(dirpath, file);
    
    if(fs.statSync(absolute).isDirectory()) {
      return folderMapper(absolute);
    }
    
    else return files.push(absolute);
  })
};

folderMapper("./")


// const tempFiles = [
//   ".gitignore", 
//   "bun.lock", 
//   "index.ts", 
//   "node_modules\\.bin\\tsc.bunx", 
//   "node_modules\\.bin\\tsc.exe",
//   "node_modules\\.bin\\tsserver.bunx", 
//   "node_modules\\.bin\\tsserver.exe", 
//   "node_modules\\@types\\bun\\index.d.ts",
//   "node_modules\\@types\\bun\\LICENSE", 
//   "node_modules\\@types\\bun\\package.json", 
//   "node_modules\\@types\\bun\\README.md",
//   "index.ts", 
//   "temp.ts", 
// ]

function buildTree(paths: string[]): TreeNode {
  const tree: TreeNode = {};
  
  paths.forEach(strpath => {
    const parts = strpath.split('\\');
    let currentLevel = tree;
    
    parts.forEach((part , index) =>{
      if(index === parts.length - 1){
        if(!currentLevel[part]){
          currentLevel[part] = null;
        }
      } else {
        if(!currentLevel[part]){
          currentLevel[part] = {};
        }
        currentLevel = currentLevel[part] as TreeNode;
      }
      
    })
  })
  
  return tree;
}
function printTreeWithLines(tree: TreeNode, prefix: string = "", isLast: boolean = true) {
  const entries = Object.entries(tree).sort(([a], [b]) => {
    const aIsDir = tree[a] !== null;
    const bIsDir = tree[b] !== null;
    if (aIsDir && !bIsDir) return -1;
    if (!aIsDir && bIsDir) return 1;
    return a.localeCompare(b);
  });
  
  entries.forEach(([name, children], index) => {
    const isLastEntry = index === entries.length - 1;
    const connector = isLastEntry ? "└── " : "├── ";
    
    console.log(prefix + connector + name);
    
    if (children !== null) {
      const newPrefix = prefix + (isLastEntry ? "    " : "│   ");
      printTreeWithLines(children, newPrefix, isLastEntry);
    }
  });
}


const tree = buildTree(files);
printTreeWithLines(tree);
