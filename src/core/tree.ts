import path from 'path';

function buildTree(paths: string[]): TreeNode {
  const tree: TreeNode = {};
  
  paths.forEach(strpath => {
    // let parsePath = parsePathString(strpath);
    
    // if(!parsePath){
    //   return;
    // }
    
    // currently only supported for windows paths
    
    // const parts = strpath.split("\\"); // returns ['string 1' , 'string 2' , 'string 3']
  
    const normalizedPath = strpath.replace(/[\\/]+/g, path.posix.sep);
    
    const parts = normalizedPath
      .split(path.posix.sep)
      .filter(Boolean); // drops empty strings from leading slashes
    
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