import { parsePathString, printStats } from "../../utils/helper";
import { parseGitignore } from "../../utils/ignore";
import { printTreeWithLines } from "../core/printer";
import { folderMapper, getFiles } from "../core/scanner";
import { buildTree } from "../core/tree";
import ora from "ora"; // Loading indicator for terminal 

/**
 * 
 * @returns gitignore content array 
 */
export function read_git_ignore(content : string): string[] {
  try {
    let ignore_files = parseGitignore(content);
    return ignore_files;
  } catch (error) {
    console.error('Error reading .gitignore:', error);
    return[]
  }
}

/**
 * 
 * @param source_path 
 * @param output_path 
 */
export function scan_dir_build_tree(source_path: string, output_path: string , ignore : string): void {
  const spinner = ora("Loading the project").start();
  let parsedPath = parsePathString(source_path);
  let parsedOutputPath = parsePathString(output_path);
  
  let ignore_options_array : string[] = [];
  
  if(ignore){
    ignore_options_array = ignore.split(',');
  }
    
    try {
    const startTime = Date.now();
    let files : string[] = [];
      
    folderMapper(parsedPath , ignore_options_array);
    
    files = getFiles();
    
    spinner.text = "Building tree Structure...";
    const tree = buildTree(files);
    
    spinner.text = "Writing the structure to file... "
    printTreeWithLines(tree, "" , true, parsedOutputPath);
    
    const endTime = Date.now();
    const duration = endTime - startTime;
    spinner.succeed(`Structure built in ${duration}ms`);
    
    // print the log stats
    printStats({
      scanned_files: files.length,
      output_path : parsedOutputPath, 
      time_taken: duration
    }, files )
    
  } catch (error) {
    console.error('Error reading .gitignore:', error);
  }
}
