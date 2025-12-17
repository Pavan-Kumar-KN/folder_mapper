import { describe, expect, test, beforeEach, afterEach } from "bun:test";
import { printTreeWithLines } from "../src/core/printer";
import { buildTree } from "../src/core/tree";
import fs from "fs";
import path from "path";

describe("printTreeWithLines", () => {
  const testOutputDir = path.join(process.cwd(), "tests", "fixtures", "output");
  const outputFile = path.join(testOutputDir, "structure.md");

  beforeEach(() => {
    // Create output directory
    if (!fs.existsSync(testOutputDir)) {
      fs.mkdirSync(testOutputDir, { recursive: true });
    }
  });

  afterEach(() => {
    // Clean up output file
    if (fs.existsSync(outputFile)) {
      fs.unlinkSync(outputFile);
    }
    if (fs.existsSync(testOutputDir)) {
      fs.rmSync(testOutputDir, { recursive: true });
    }
  });

  test("should create structure.md file", async () => {
    const tree = buildTree(["src\\index.ts", "README.md"]);
    
    await printTreeWithLines(tree, "", true, testOutputDir);
    
    expect(fs.existsSync(outputFile)).toBe(true);
  });

  test("should write correct tree structure", async () => {
    const tree = buildTree([
      "src\\index.ts",
      "src\\utils\\helper.ts",
      "README.md"
    ]);
    
    await printTreeWithLines(tree, "", true, testOutputDir);
    
    const content = fs.readFileSync(outputFile, "utf8");
    expect(content).toContain("README.md");
    expect(content).toContain("src");
    expect(content).toContain("index.ts");
    expect(content).toContain("utils");
    expect(content).toContain("helper.ts");
  });

  test("should use tree characters correctly", async () => {
    const tree = buildTree([
      "folder\\file1.txt",
      "folder\\file2.txt"
    ]);
    
    await printTreeWithLines(tree, "", true, testOutputDir);
    
    const content = fs.readFileSync(outputFile, "utf8");
    expect(content).toContain("├──");
    expect(content).toContain("└──");
  });

  test("should handle nested directories", async () => {
    const tree = buildTree([
      "a\\b\\c\\file.txt"
    ]);
    
    await printTreeWithLines(tree, "", true, testOutputDir);
    
    const content = fs.readFileSync(outputFile, "utf8");
    expect(content).toContain("a");
    expect(content).toContain("b");
    expect(content).toContain("c");
    expect(content).toContain("file.txt");
  });

  test("should clear existing file before writing", async () => {
    // Create existing file with content
    fs.writeFileSync(outputFile, "old content");
    
    const tree = buildTree(["new\\file.txt"]);
    await printTreeWithLines(tree, "", true, testOutputDir);
    
    const content = fs.readFileSync(outputFile, "utf8");
    expect(content).not.toContain("old content");
    expect(content).toContain("new");
  });
});
