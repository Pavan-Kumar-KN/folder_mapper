import fs from 'fs';
import path from 'path';
import { checkFileExists } from '../../utils/helper';

async function printTreeWithLines(tree: TreeNode, prefix: string = "", isLast: boolean = true, outputPathmdFile?: string) {
  // If outputPath is provided and it's the first call, clear the file
  if (outputPathmdFile && prefix === "") {
     const fullPath = path.join(outputPathmdFile, 'structure.md');
     console.log("The structure md path ", outputPathmdFile);
     
    const isExists = await checkFileExists(fullPath);
    if (isExists) {
      fs.unlinkSync(fullPath);
    }
    fs.writeFileSync(fullPath, '');
  }
  
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
     const line = prefix + connector + name;
     
    // console.log(prefix + connector + name);
    
    // Only write to file if outputPath is provided
        if (outputPathmdFile) {
          const fullPath = path.join(outputPathmdFile, 'structure.md');
          const mdFileContent = `${line}\n`;
          fs.appendFileSync(fullPath, mdFileContent);
        }
    
    if (children !== null) {
      const newPrefix = prefix + (isLastEntry ? "    " : "│   ");
      printTreeWithLines(children, newPrefix, isLastEntry , outputPathmdFile);
    }
  });
}

export {
  printTreeWithLines
};
