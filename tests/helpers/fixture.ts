import fs from "fs";
import path from "path";

/**
 * Creates a test directory structure for testing
 */
export function createTestStructure(baseDir: string): void {
  const structure = {
    "file1.txt": "content1",
    "file2.md": "content2",
    "src": {
      "index.ts": "export const main = () => {};",
      "utils": {
        "helper.ts": "export const help = () => {};",
        "validator.ts": "export const validate = () => {};"
      },
      "core": {
        "scanner.ts": "export const scan = () => {};",
        "printer.ts": "export const print = () => {};"
      }
    },
    "tests": {
      "test1.test.ts": "test('test1', () => {});",
      "test2.test.ts": "test('test2', () => {});"
    },
    "docs": {
      "README.md": "# Documentation",
      "guide.md": "# Guide"
    }
  };

  createStructureRecursive(baseDir, structure);
}

/**
 * Recursively creates directory structure
 */
function createStructureRecursive(currentPath: string, structure: any): void {
  for (const [name, content] of Object.entries(structure)) {
    const fullPath = path.join(currentPath, name);

    if (typeof content === "string") {
      // It's a file
      fs.writeFileSync(fullPath, content);
    } else {
      // It's a directory
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
      }
      createStructureRecursive(fullPath, content);
    }
  }
}

/**
 * Creates a .gitignore file for testing
 */
export function createTestGitignore(baseDir: string, content: string): void {
  const gitignorePath = path.join(baseDir, ".gitignore");
  fs.writeFileSync(gitignorePath, content);
}

/**
 * Removes test directory structure
 */
export function cleanupTestStructure(baseDir: string): void {
  if (fs.existsSync(baseDir)) {
    fs.rmSync(baseDir, { recursive: true, force: true });
  }
}

/**
 * Gets all files in a directory recursively
 */
export function getAllFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
    } else {
      arrayOfFiles.push(filePath);
    }
  });

  return arrayOfFiles;
}
