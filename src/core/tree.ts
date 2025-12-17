import { parsePathString } from "../../utils/helper";
import path from 'path';

function buildTree(paths: string[]): TreeNode {
  const tree: TreeNode = {};
  
  paths.forEach(strpath => {
    let parsePath = parsePathString(strpath);
    
    if(!parsePath){
      return;
    }
    
    const parts = parsePath.split(path.sep); // returns ['string 1' , 'string 2' , 'string 3']
    let currentLevel = tree; // {}
    
    parts.forEach((part , index) =>{ // ['string 1' , 'string 2' , 'string 3'] traversing this array 
      // checking if we reached the last part of the path
      if(index === parts.length - 1){ 
        if(!currentLevel[part]){ // return value of the corrosponding key
          currentLevel[part] = null;
        }
      } else {
        if(!currentLevel[part]){
          currentLevel[part] = {};
        }
        currentLevel = currentLevel[part] as TreeNode;
      }
      
    })
  })

  return tree;
}

export {
  buildTree
}