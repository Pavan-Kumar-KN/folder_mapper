import { describe, expect, test, beforeEach, afterEach } from "bun:test";
import { folderMapper, getFiles } from "../src/core/scanner";
import { createTestStructure, createTestGitignore, cleanupTestStructure } from "./helpers/fixture";
import path from "path";
import fs from "fs";

describe("folderMapper Integration", () => {
  const testDir = path.join(process.cwd(), "tests", "fixtures", "test-project");
  const originalCwd = process.cwd();

  beforeEach(() => {
    // Clean up before each test
    cleanupTestStructure(testDir);
    
    // Create test structure
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
    createTestStructure(testDir);
    
    // Change to test directory for .gitignore reading
    process.chdir(testDir);
    
    // Create a basic .gitignore
    createTestGitignore(testDir, `node_modules
dist
*.log`);
  });

  afterEach(() => {
    // Restore original directory
    process.chdir(originalCwd);
    
    // Clean up after each test
    cleanupTestStructure(testDir);
  });

  test("should scan directory and return files", () => {
    folderMapper(testDir);
    const files = getFiles();
    
    expect(files.length).toBeGreaterThan(0);
    expect(files.some(f => f.includes("file1.txt"))).toBe(true);
    expect(files.some(f => f.includes("index.ts"))).toBe(true);
  });

  test("should ignore files from .gitignore", () => {
    // Create node_modules directory
    const nodeModulesDir = path.join(testDir, "node_modules");
    fs.mkdirSync(nodeModulesDir, { recursive: true });
    fs.writeFileSync(path.join(nodeModulesDir, "package.json"), "{}");
    
    folderMapper(testDir);
    const files = getFiles();
    
    expect(files.some(f => f.includes("node_modules"))).toBe(false);
  });

  test("should respect custom ignore patterns", () => {
    // Create docs directory with files
    const docsDir = path.join(testDir, "custom-ignore");
    fs.mkdirSync(docsDir, { recursive: true });
    fs.writeFileSync(path.join(docsDir, "file.txt"), "content");
    
    const customIgnore = ["custom-ignore"];
    folderMapper(testDir, customIgnore);
    const files = getFiles();
    
    expect(files.some(f => f.includes("custom-ignore"))).toBe(false);
  });

  test("should scan nested directories", () => {
    folderMapper(testDir);
    const files = getFiles();
    
    expect(files.some(f => f.includes("src") && f.includes("utils"))).toBe(true);
    expect(files.some(f => f.includes("helper.ts"))).toBe(true);
  });

  test("should handle multiple ignore patterns", () => {
    // Create multiple directories to ignore
    const tempDir = path.join(testDir, "temp");
    const cacheDir = path.join(testDir, "cache");
    fs.mkdirSync(tempDir, { recursive: true });
    fs.mkdirSync(cacheDir, { recursive: true });
    fs.writeFileSync(path.join(tempDir, "temp.txt"), "temp");
    fs.writeFileSync(path.join(cacheDir, "cache.txt"), "cache");
    
    const customIgnore = ["temp", "cache"];
    folderMapper(testDir, customIgnore);
    const files = getFiles();
    
    expect(files.some(f => f.includes("temp"))).toBe(false);
    expect(files.some(f => f.includes("cache"))).toBe(false);
  });
});
