import { describe, expect, test } from "bun:test";
import { buildTree } from "../src/core/tree";

describe("buildTree – exhaustive test suite", () => {

  test("should build a simple tree from a single file path", () => {
    const paths = ["folder\\file.txt"];

    expect(buildTree(paths)).toEqual({
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

    expect(buildTree(paths)).toEqual({
      src: {
        "index.ts": null,
        utils: {
          "helper.ts": null
        }
      },
      "README.md": null
    });
  });

  test("should handle deeply nested directories", () => {
    const paths = [
      "a\\b\\c\\d\\file.txt",
      "a\\b\\other.js"
    ];

    expect(buildTree(paths)).toEqual({
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

  test("should handle multiple files in the same directory", () => {
    const paths = [
      "folder\\file1.txt",
      "folder\\file2.txt",
      "folder\\file3.txt"
    ];

    expect(buildTree(paths)).toEqual({
      folder: {
        "file1.txt": null,
        "file2.txt": null,
        "file3.txt": null
      }
    });
  });

  test("should return empty object for empty input", () => {
    expect(buildTree([])).toEqual({});
  });

  test("should handle mixed path separators (\\ and /)", () => {
    const paths = [
      "src/index.ts",
      "src\\utils/helper.ts",
      "src/more\\deep/file.js"
    ];

    expect(buildTree(paths)).toEqual({
      src: {
        "index.ts": null,
        utils: {
          "helper.ts": null
        },
        more: {
          deep: {
            "file.js": null
          }
        }
      }
    });
  });

  test("should ignore duplicate file paths (idempotent)", () => {
    const paths = [
      "src\\index.ts",
      "src\\index.ts",
      "src\\index.ts"
    ];

    expect(buildTree(paths)).toEqual({
      src: {
        "index.ts": null
      }
    });
  });

  test("should handle same filenames in different directories", () => {
    const paths = [
      "apps\\web\\index.ts",
      "apps\\api\\index.ts",
      "packages\\shared\\index.ts"
    ];

    expect(buildTree(paths)).toEqual({
      apps: {
        web: { "index.ts": null },
        api: { "index.ts": null }
      },
      packages: {
        shared: { "index.ts": null }
      }
    });
  });

  test("should handle extremely deep nesting (stress test)", () => {
    const paths = [
      "a\\b\\c\\d\\e\\f\\g\\h\\i\\j\\file.txt"
    ];

    const result = buildTree(paths);

    expect(result.a.b.c.d.e.f.g.h.i.j["file.txt"]).toBeNull();
  });

  test("should handle root-level files mixed with folders", () => {
    const paths = [
      "README.md",
      "package.json",
      "tsconfig.json",
      "src\\index.ts"
    ];

    expect(buildTree(paths)).toEqual({
      "README.md": null,
      "package.json": null,
      "tsconfig.json": null,
      src: {
        "index.ts": null
      }
    });
  });

  test("should handle directories containing dots in their names", () => {
    const paths = [
      "config\\.env\\local.json",
      "config\\.env\\prod.json"
    ];

    expect(buildTree(paths)).toEqual({
      config: {
        ".env": {
          "local.json": null,
          "prod.json": null
        }
      }
    });
  });

  test("should handle files without extensions", () => {
    const paths = [
      "bin\\start",
      "bin\\stop",
      "scripts\\deploy"
    ];

    expect(buildTree(paths)).toEqual({
        bin: {
          start: null,
          stop: null
        },
        scripts: {
          deploy: null
        }
    });
  });

  test("should gracefully handle trailing slashes", () => {
    const paths = [
      "src\\utils\\",
      "src\\utils\\helper.ts"
    ];

    expect(buildTree(paths)).toEqual({
      src: {
        utils: {
          "helper.ts": null
        }
      }
    });
  });

  test("should handle leading slashes in paths", () => {
    const paths = [
      "\\src\\index.ts",
      "/src/utils/helper.ts"
    ];

    expect(buildTree(paths)).toEqual({
      src: {
        "index.ts": null,
        utils: {
          "helper.ts": null
        }
      }
    });
  });

  test("should handle large number of files without crashing", () => {
    const paths = Array.from({ length: 1000 }, (_, i) =>
      `src\\files\\file${i}.ts`
    );

    const result = buildTree(paths);

    expect(Object.keys(result.src.files).length).toBe(1000);
  });

  test("should handle real-world monorepo structure", () => {
    const paths = [
      "apps\\web\\src\\main.ts",
      "apps\\web\\src\\components\\Button.tsx",
      "apps\\api\\src\\server.ts",
      "apps\\api\\src\\routes\\user.ts",
      "packages\\ui\\Button.tsx",
      "packages\\utils\\date.ts",
      "tests\\tree.test.ts",
      "README.md",
      "package.json"
    ];

    const result = buildTree(paths);

    expect(result.apps.web.src.components["Button.tsx"]).toBeNull();
    expect(result.apps.api.src.routes["user.ts"]).toBeNull();
    expect(result.packages.ui["Button.tsx"]).toBeNull();
    expect(result.tests["tree.test.ts"]).toBeNull();
    expect(result["README.md"]).toBeNull();
    expect(result["package.json"]).toBeNull();
  });

});
