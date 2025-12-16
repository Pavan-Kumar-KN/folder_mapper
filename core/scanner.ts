import path from 'path';
import fs from 'fs';

let files: string[] = [];

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

const getFiles = (): string[] => {
  return files;
};

export {
  folderMapper,
  getFiles
};
