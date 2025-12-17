import path from 'path';
import fs from 'fs';
import { read_git_ignore } from '../handlers/handler';

let files: string[] = [];

const folderMapper = (dirpath: string , ignore_option_files?: string[]): void => {
  // first get the files in from the first level directory 
  const dirfiles = fs.readdirSync(dirpath);
  // const types = type(files, dirpath);
  
  // here we have to parse the .gitignore file
  let ignore_files: string[] = read_git_ignore(fs.readFileSync('.gitignore', 'utf8'));
  
  // custom files from the terminal "--ignore="node_modules , doc"
  if(ignore_option_files && ignore_option_files?.length > 0){
    ignore_files =  ignore_files.concat(ignore_option_files);
  }
  
  // filter out the ignored files
  const filtered_files = dirfiles.filter(file => !ignore_files.includes(file));
  
  filtered_files.forEach((file) =>{
    const absolute = path.join(dirpath, file);
    
    if(fs.statSync(absolute).isDirectory()) {
      return folderMapper(absolute);
    }
    
    else return files.push(absolute);
  })
  
};

const getFiles = (): string[] => {
  return files;
};

export {
  folderMapper,
  getFiles
};

