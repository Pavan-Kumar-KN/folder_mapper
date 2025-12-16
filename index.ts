import fs from 'fs';
import path from 'path';

let files : string[] = [];

/**
 In javascript this is an Object
 
 TreeNode{
  key : {
    key: value
  }
 }
 
*/
interface TreeNode { 
  [key: string]: TreeNode | null;
}

const folderMapper = (dirpath: string): void => {
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

folderMapper("D:\\test\\calendar") // D:\test\calendar


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
    const parts = strpath.split('\\'); // returns ['string 1' , 'string 2' , 'string 3']
    let currentLevel = tree; // {}
    
    parts.forEach((part , index) =>{ // ['string 1' , 'string 2' , 'string 3'] traversing this array 
      // checking if we reached the last part of the path
      if(index === parts.length - 1){ 
        if(!currentLevel[part]){ // return value of the corrosponding key
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
    
    // write the structure to the structure md file
    const mdFilePath = 'structure.md';
    const mdFileContent = `${prefix}${connector}${name}\n`;
    fs.appendFileSync(mdFilePath, mdFileContent);
    
    if (children !== null) {
      const newPrefix = prefix + (isLastEntry ? "    " : "│   ");
      printTreeWithLines(children, newPrefix, isLastEntry);
    }
  });
}


const tree = buildTree(files);
printTreeWithLines(tree);
