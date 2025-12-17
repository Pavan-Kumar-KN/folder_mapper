import { describe, expect, test } from "bun:test";
import { parseGitignore } from "../utils/ignore";

describe("parseGitignore", () => {
  test("should parse simple ignore patterns", () => {
    const content = `node_modules
dist
.env`;
    const result = parseGitignore(content);
    
    expect(result).toContain("node_modules");
    expect(result).toContain("dist");
    expect(result).toContain(".env");
    expect(result).toContain(".git"); // Always added by default
  });

  test("should skip comments", () => {
    const content = `# This is a comment
node_modules
# Another comment
dist`;
    const result = parseGitignore(content);
    
    expect(result).toContain("node_modules");
    expect(result).toContain("dist");
    expect(result).not.toContain("# This is a comment");
    expect(result).not.toContain("# Another comment");
  });

  test("should skip empty lines", () => {
    const content = `node_modules

dist

.env`;
    const result = parseGitignore(content);
    
    expect(result).toContain("node_modules");
    expect(result).toContain("dist");
    expect(result).toContain(".env");
    expect(result.length).toBe(4); // 3 patterns + .git
  });

  test("should handle inline comments", () => {
    const content = `node_modules # Dependencies
dist # Build output`;
    const result = parseGitignore(content);
    
    expect(result).toContain("node_modules");
    expect(result).toContain("dist");
  });

  test("should handle escaped # symbols", () => {
    const content = `file\\#name.txt
folder\\#test`;
    const result = parseGitignore(content);
    
    expect(result).toContain("file#name.txt");
    expect(result).toContain("folder#test");
  });

  test("should trim whitespace", () => {
    const content = `  node_modules  
  dist  
  .env  `;
    const result = parseGitignore(content);
    
    expect(result).toContain("node_modules");
    expect(result).toContain("dist");
    expect(result).toContain(".env");
  });

  test("should always include .git", () => {
    const content = `node_modules`;
    const result = parseGitignore(content);
    
    expect(result).toContain(".git");
  });

  test("should handle empty content", () => {
    const content = ``;
    const result = parseGitignore(content);
    
    expect(result).toContain(".git");
    expect(result.length).toBe(1);
  });

  test("should handle only comments", () => {
    const content = `# Comment 1
# Comment 2
# Comment 3`;
    const result = parseGitignore(content);
    
    expect(result).toContain(".git");
    expect(result.length).toBe(1);
  });

  test("should handle glob patterns", () => {
    const content = `*.log
*.tmp
build/
*.cache`;
    const result = parseGitignore(content);
    
    expect(result).toContain("*.log");
    expect(result).toContain("*.tmp");
    expect(result).toContain("build/");
    expect(result).toContain("*.cache");
  });

  test("should handle mixed content", () => {
    const content = `# Dependencies
node_modules

# Build output
dist
build/

# Logs
*.log

# Environment
.env # Secret keys
.env.local`;
    const result = parseGitignore(content);
    
    expect(result).toContain("node_modules");
    expect(result).toContain("dist");
    expect(result).toContain("build/");
    expect(result).toContain("*.log");
    expect(result).toContain(".env");
    expect(result).toContain(".env.local");
  });
});
