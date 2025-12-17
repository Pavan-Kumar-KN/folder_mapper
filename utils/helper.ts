import fs from 'fs';

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

export {
  checkFileExists
};