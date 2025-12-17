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
  printStats
};