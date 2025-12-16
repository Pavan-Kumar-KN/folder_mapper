import fs from 'fs';

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

export {
  printTreeWithLines
} ;
