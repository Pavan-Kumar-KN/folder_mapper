import { describe, expect, test, beforeEach, afterEach } from "bun:test";
import { checkFileExists, printStats } from "../utils/helper";
import fs from "fs";
import path from "path";

describe("checkFileExists", () => {
  const testDir = path.join(process.cwd(), "tests", "fixtures");
  const testFile = path.join(testDir, "test-file.txt");

  beforeEach(() => {
    // Create test directory if it doesn't exist
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
  });

  afterEach(() => {
    // Clean up test files
    if (fs.existsSync(testFile)) {
      fs.unlinkSync(testFile);
    }
  });

  test("should return true for existing file", async () => {
    // Create test file
    fs.writeFileSync(testFile, "test content");
    
    const exists = await checkFileExists(testFile);
    expect(exists).toBe(true);
  });

  test("should return false for non-existing file", async () => {
    const nonExistentFile = path.join(testDir, "non-existent.txt");
    
    const exists = await checkFileExists(nonExistentFile);
    expect(exists).toBe(false);
  });

  test("should return true for existing directory", async () => {
    const exists = await checkFileExists(testDir);
    expect(exists).toBe(true);
  });

  test("should return false for non-existing directory", async () => {
    const nonExistentDir = path.join(testDir, "non-existent-dir");
    
    const exists = await checkFileExists(nonExistentDir);
    expect(exists).toBe(false);
  });
});

describe("printStats", () => {
  test("should print stats without throwing error", () => {
    const stats = {
      scanned_files: 10,
      output_path: "./output",
      time_taken: 150
    };
    const files = [
      "src\\file1.ts",
      "src\\file2.ts",
      "src\\utils\\helper.ts",
      "tests\\test1.test.ts",
      "README.md",
      "package.json",
      "src\\core\\scanner.ts",
      "src\\core\\tree.ts",
      "src\\handlers\\handler.ts",
      "index.ts"
    ];

    // This should not throw an error
    expect(() => printStats(stats, files)).not.toThrow();
  });

  test("should handle empty files array", () => {
    const stats = {
      scanned_files: 0,
      output_path: "./output",
      time_taken: 50
    };
    const files: string[] = [];

    expect(() => printStats(stats, files)).not.toThrow();
  });

  test("should handle single file", () => {
    const stats = {
      scanned_files: 1,
      output_path: "./output",
      time_taken: 25
    };
    const files = ["README.md"];

    expect(() => printStats(stats, files)).not.toThrow();
  });

  test("should handle complex directory structure", () => {
    const stats = {
      scanned_files: 5,
      output_path: "./docs",
      time_taken: 200
    };
    const files = [
      "src\\a\\b\\c\\file1.ts",
      "src\\a\\b\\file2.ts",
      "src\\a\\file3.ts",
      "src\\file4.ts",
      "file5.ts"
    ];

    expect(() => printStats(stats, files)).not.toThrow();
  });

  test("should handle long paths", () => {
    const stats = {
      scanned_files: 2,
      output_path: "C:\\Users\\User\\Documents\\Projects\\output",
      time_taken: 100
    };
    const files = [
      "very\\long\\path\\to\\some\\nested\\directory\\file1.txt",
      "another\\very\\long\\path\\file2.txt"
    ];

    expect(() => printStats(stats, files)).not.toThrow();
  });
});
