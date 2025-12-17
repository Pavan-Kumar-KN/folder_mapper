import { parseGitignore } from "../../utils/ignore";

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