import path from 'path';
import fs, { readFileSync } from 'fs';
import { read_git_ignore } from '../handlers/handler';

let files: string[] = [];

const folderMapper = (dirpath: string , ignore_option_files?: string[]): void => {
  // first get the files in from the first level directory 
  const dirfiles = fs.readdirSync(dirpath);
  
  // const types = type(files, dirpath);
  const gitignorePath: string = path.join(dirpath , '.gitignore')
  let isgitExists: boolean = fs.existsSync(gitignorePath);
  let git_ignore_content : string = '';
  
  // here we have to parse the .gitignore file
  let ignore_files: string[] = [];
  
  if(isgitExists){
    git_ignore_content = readFileSync(gitignorePath, 'utf-8');
    ignore_files = read_git_ignore(git_ignore_content);
  }
  
  // custom files from the terminal "--ignore="node_modules , doc"
  if(ignore_option_files && ignore_option_files?.length > 0){
    ignore_files =  ignore_files.concat(ignore_option_files);
  }
  
  // filter out the ignored files
  const filtered_files : string[] = dirfiles.filter(file => !ignore_files.includes(file));
  
  filtered_files.forEach((file) =>{
    const absolute : string = path.join(dirpath, file);
    
    if(fs.statSync(absolute).isDirectory()) {
      folderMapper(absolute , ignore_option_files);
    }
    
    else return files.push(absolute);
  })
  
};

const getFiles = (): string[] => {
  return files;
};

const resetFiles = (): void => {
  files = [];
};

export {
  folderMapper,
  getFiles,
  resetFiles
};

