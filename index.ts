import { folderMapper, getFiles } from './core/scanner';
import { buildTree } from './core/tree';
import { printTreeWithLines } from './core/printer';

let files : string[] = [];

// folderMapper("D:\\Projects\\micro-frontend\\book-call") // folder path 
folderMapper("D:\\open source projects\\Baileys")
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
printTreeWithLines(tree, "" , true, 'D:\\');


