import { printTreeWithLines } from "../src/core/printer";
import { folderMapper, getFiles } from "../src/core/scanner";
import { buildTree } from "../src/core/tree";


let files : string[] = [];

folderMapper("D:\\Private Docs\\startup_projects\\@novagate") // folder path 
// folderMapper("./")
files = getFiles();


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

const tree = buildTree(files);
printTreeWithLines(tree, "" , true, './');


// const paths = [
//   "\\src\\index.ts",
//   "/src/utils/helper.ts"
// ];

//   const result = buildTree(paths);
   
// console.log(result);