import fs from 'fs';

/*
 * 
 * @returns gitignore content array 
 */
export function parseGitignore(content: string) : string[] {
  // @ts-ignore
  let ignore_files : string[] = content
    .split("\n")
    .map(rawLine => {
      const line = rawLine.trim();

      // Skip full-line comments and empty lines
      if (!line || line.startsWith("#")) return null;

      let value = "";
      let comment = "";

      // Find first unescaped #
      for (let i = 0; i < line.length; i++) {
        if (line[i] === "#" && line[i - 1] !== "\\") {
          value = line.slice(0, i).trim();
          comment = line.slice(i + 1).trim();
          break;
        }
      }

      // No inline comment found
      if (!value) value = line.replace(/\\#/g, "#");

        return value;
    })
    .filter(Boolean)
  
  // this file will not be added .gitignore file 
  ignore_files.push('.git');
  return ignore_files;
}

