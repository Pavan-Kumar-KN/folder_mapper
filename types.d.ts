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

interface Stats {
  scanned_files : number;
  output_path : string;
  time_taken : number;
}

interface DiffResult {
  added: string[];
  removed: string[];
  unchanged: string[];
}