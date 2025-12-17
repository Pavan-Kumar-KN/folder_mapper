import { describe, expect, test } from "bun:test";
import { buildTree } from "../src/core/tree";

describe("buildTree", () => {
  test("should build a simple tree from single file path", () => {
    const paths = ["folder\\file.txt"];
    const result = buildTree(paths);
    
    expect(result).toEqual({
      folder: {
        "file.txt": null
      }
    });
  });

  test("should build a tree from multiple file paths", () => {
    const paths = [
      "src\\index.ts",
      "src\\utils\\helper.ts",
      "README.md"
    ];
    const result = buildTree(paths);
    
    expect(result).toEqual({
      src: {
        "index.ts": null,
        utils: {
          "helper.ts": null
        }
      },
      "README.md": null
    });
  });

  test("should handle nested directories", () => {
    const paths = [
      "a\\b\\c\\d\\file.txt",
      "a\\b\\other.js"
    ];
    const result = buildTree(paths);
    
    expect(result).toEqual({
      a: {
        b: {
          c: {
            d: {
              "file.txt": null
            }
          },
          "other.js": null
        }
      }
    });
  });

  test("should handle multiple files in same directory", () => {
    const paths = [
      "folder\\file1.txt",
      "folder\\file2.txt",
      "folder\\file3.txt"
    ];
    const result = buildTree(paths);
    
    expect(result).toEqual({
      folder: {
        "file1.txt": null,
        "file2.txt": null,
        "file3.txt": null
      }
    });
  });

  test("should handle empty array", () => {
    const paths: string[] = [];
    const result = buildTree(paths);
    
    expect(result).toEqual({});
  });

  test("should handle complex nested structure", () => {
    const paths = [
      "src\\core\\scanner.ts",
      "src\\core\\tree.ts",
      "src\\core\\printer.ts",
      "src\\handlers\\handler.ts",
      "tests\\tree.test.ts",
      "package.json"
    ];
    const result = buildTree(paths);
    
    expect(result).toHaveProperty("src");
    expect(result).toHaveProperty("tests");
    // expect(result).toHaveProperty("package.json");
    expect(result.src).toHaveProperty("core");
    expect(result.src).toHaveProperty("handlers");
  });
});
