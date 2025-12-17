import fs from 'fs';
import path from 'path';

/**
 * 
 * @param file 
 * @returns boolean
 */
function checkFileExists(file : string) {
  return fs.promises.access(file, fs.constants.F_OK)
           .then(() => true)
           .catch(() => false)
}

/**
 * 
 * @param stats 
 * @param files 
 */
function printStats(stats : Stats , files: string[]) {
     console.log('\n📊 Stats:');
     console.log(`├─ Total files: ${files.length}`);
     console.log(`├─ Total directories: ${countDirectories(files)}`);
     console.log(`├─ Output path: ${path.join(stats.output_path, 'structure.md')}`);
     console.log(`└─ Time taken: ${stats.time_taken}s`);
}

function printHelp() {
  console.log(`
┌─────────────────────────────────────────────────────────────────┐
│                      FOLDER MAPPER v1.0.0                       │
│         Generate beautiful directory tree structures            │
└─────────────────────────────────────────────────────────────────┘

📖 USAGE:
  folder_mapper run <path> <output_path> [options]

📝 ARGUMENTS:
  <path>              Source directory to scan (required)
  <output_path>       Directory where structure.md will be saved (required)

⚙️  OPTIONS:
  -i, --ignore <patterns>    Additional patterns to ignore (comma-separated)
  -h, --help                 Show this help message
  -v, --version              Show version number

🎯 EXAMPLES:

  Basic usage (current directory):
    $ folder_mapper run . ./output

  Scan specific directory:
    $ folder_mapper run ./src ./docs

  Add custom ignore patterns:
    $ folder_mapper run . ./output --ignore "build,temp,cache"
    $ folder_mapper run ./src ./docs -i "*.log,*.tmp"

  Ignore multiple patterns:
    $ folder_mapper run . ./output --ignore "dist,coverage,.next,out"

📋 FEATURES:
  ✅ Automatic .gitignore support
  ✅ Custom ignore patterns
  ✅ Beautiful tree visualization
  ✅ Markdown output (structure.md)
  ✅ File and directory statistics
  ✅ Fast recursive scanning

📂 OUTPUT:
  Creates 'structure.md' in the specified output directory with:
  - Tree structure using box-drawing characters (├── └──)
  - Sorted directories first, then files
  - Respects .gitignore and custom ignore patterns

ℹ️  NOTES:
  • .gitignore patterns are automatically detected and applied
  • Custom --ignore patterns are merged with .gitignore
  • Symlinks are followed during scanning
  • Empty directories are included in output

🐛 ISSUES & FEEDBACK:
  GitHub: https://github.com/yourusername/folder_mapper
  Author: Pavan Kumar KN

📄 LICENSE: MIT
`);
}

/**
 * 
 * @param files 
 * @returns 
 */
function countDirectories(files: string[]): number {
  const directories = new Set<string>();
  
  files.forEach(file => {
    const dir = path.dirname(file);
    const parts = dir.split(path.sep);
    
    // Add each level of directory
    for (let i = 1; i <= parts.length; i++) {
      directories.add(parts.slice(0, i).join(path.sep));
    }
  });
  
  return directories.size;
}


export {
  checkFileExists,
  printStats,
  printHelp
};