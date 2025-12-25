import { parsePathString, printStats } from "../../utils/helper";
import { parseGitignore } from "../../utils/ignore";
import { printTreeWithLines } from "../core/printer";
import { folderMapper, getFiles } from "../core/scanner";
import { buildTree } from "../core/tree";
import ora from "ora"; // Loading indicator for terminal
import fs from "fs";
import path from "path";
import { compareTreeStructures, formatDiffSummary } from "../../utils/parser";

/**
 *
 * @returns gitignore content array
 */
export function read_git_ignore(content: string): string[] {
    try {
        let ignore_files = parseGitignore(content);
        return ignore_files;
    } catch (error) {
        console.error("Error reading .gitignore:", error);
        return [];
    }
}

/**
 *
 * @param source_path
 * @param output_path
 */
export function scan_dir_build_tree(
    source_path: string,
    output_path: string,
    ignore: string,
): void {
    const spinner = ora("Loading the project").start();
    let parsedPath = parsePathString(source_path);
    let parsedOutputPath = parsePathString(output_path);

    let ignore_options_array: string[] = [];

    if (ignore) {
        ignore_options_array = ignore.split(",");
    }

    try {
        const startTime = Date.now();
        let files: string[] = [];

        folderMapper(parsedPath, ignore_options_array);

        files = getFiles();

        spinner.text = "Building tree Structure...";
        const tree = buildTree(files);

        // Define output paths
        const jsonPath = path.join(parsedOutputPath, "structure.json");

        let shouldRegenerate = true;

        spinner.text = "Adding the snapshot of the project structure";

        if (fs.existsSync(jsonPath)) {
            spinner.text = "Comparing with previous structure...";
            const oldTree = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
            const diff = compareTreeStructures(oldTree, tree);

            if (!diff.hasChanges) {
                // No changes detected - skip regeneration
                spinner.succeed(
                    "No structural changes detected. Skipping document generation.",
                );
                console.log("\n✨ Structure is up to date!");
                return;
            }

            // Changes detected - show summary
            console.log("\n" + formatDiffSummary(diff));
            shouldRegenerate = true;
        } else {
            spinner.text = "No previous structure found, generating fresh...";
        }

        // Regenerate only if changes detected or first run
        if (shouldRegenerate) {
            spinner.text = "Saving structure snapshot (JSON)...";

            // Ensure directory exists
            if (!fs.existsSync(parsedOutputPath)) {
                fs.mkdirSync(parsedOutputPath, { recursive: true });
            }

            fs.writeFileSync(jsonPath, JSON.stringify(tree, null, 2));

            spinner.text = "Generating structure.md...";
            printTreeWithLines(tree, "", true, parsedOutputPath);

            const endTime = Date.now();
            const duration = endTime - startTime;
            spinner.succeed(`Structure updated in ${duration}ms`);

            // print the log stats
            printStats(
                {
                    scanned_files: files.length,
                    output_path: parsedOutputPath,
                    time_taken: duration,
                },
                files,
            );
        }
        // fs.writeFile(`${parsedOutputPath}/project_structure.json`, JSON.stringify(tree, null, 2), (error) => {
        //     if (error) {
        //         console.error("Error writing file:", error);
        //     } else {
        //         spinner.text = "Writing the structure to file... ";
        //         printTreeWithLines(tree, "", true, parsedOutputPath);
        //     }
        // });

        // const endTime = Date.now();
        // const duration = endTime - startTime;
        // spinner.succeed(`Structure built in ${duration}ms`);

        // // print the log stats
        // printStats(
        //     {
        //         scanned_files: files.length,
        //         output_path: parsedOutputPath,
        //         time_taken: duration,
        //     },
        //     files,
        // );
    } catch (error) {
        console.error("Error reading .gitignore:", error);
    }
}
/**
 * @abstract
 *
 */
export function add_pr_tree_changes(source_path: string, output_path: string) {}
