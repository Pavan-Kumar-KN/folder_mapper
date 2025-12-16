/**
 In javascript this is an Object
 
 TreeNode{
  key : {
    key: value
  }
 }
 
*/
interface TreeNode { 
  [key: string]: TreeNode | null;
}