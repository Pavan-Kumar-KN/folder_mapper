interface DiffResult {
  added: string[];
  removed: string[];
  unchanged: string[];
  hasChanges: boolean;
}

/**
 * Compares two tree structures and returns differences
 * @param oldTree - Previous structure from target branch
 * @param newTree - Current structure from PR branch
 * @param currentPath - Internal tracker for recursive path building
 */
export function compareTreeStructures(
  oldTree: TreeNode,
  newTree: TreeNode,
  currentPath: string = ""
): DiffResult {
  const diff: DiffResult = {
    added: [],
    removed: [],
    unchanged: [],
    hasChanges: false
  };

  const oldKeys = new Set(Object.keys(oldTree));
  const newKeys = new Set(Object.keys(newTree));

  // Find added nodes (in new but not in old)
  for (const key of newKeys) {
    const fullPath = currentPath ? `${currentPath}/${key}` : key;
    
    if (!oldKeys.has(key)) {
      diff.added.push(fullPath);
      diff.hasChanges = true;
      // Also add all children as "added"
      if (newTree[key] !== null) {
        collectAllPaths(newTree[key]!, fullPath, diff.added);
      }
    } else {
      // Key exists in both - check if it's a directory and recurse
      if (oldTree[key] !== null && newTree[key] !== null) {
        const subDiff = compareTreeStructures(
          oldTree[key] as TreeNode,
          newTree[key] as TreeNode,
          fullPath
        );
        diff.added.push(...subDiff.added);
        diff.removed.push(...subDiff.removed);
        diff.unchanged.push(...subDiff.unchanged);
        if (subDiff.hasChanges) {
          diff.hasChanges = true;
        }
      } else {
        diff.unchanged.push(fullPath);
      }
    }
  }

  // Find removed nodes (in old but not in new)
  for (const key of oldKeys) {
    if (!newKeys.has(key)) {
      const fullPath = currentPath ? `${currentPath}/${key}` : key;
      diff.removed.push(fullPath);
      diff.hasChanges = true;
      // Also collect all children as removed
      if (oldTree[key] !== null) {
        collectAllPaths(oldTree[key] as TreeNode, fullPath, diff.removed);
      }
    }
  }

  return diff;
}

/**
 * Recursively collect all paths from a tree node
 */
function collectAllPaths(
  tree: TreeNode,
  basePath: string,
  collector: string[]
): void {
  for (const [key, children] of Object.entries(tree)) {
    const fullPath = `${basePath}/${key}`;
    collector.push(fullPath);
    
    if (children !== null) {
      collectAllPaths(children, fullPath, collector);
    }
  }
}

/**
 * Formats diff result as markdown for PR comments or console output
 */
export function formatDiffSummary(diff: DiffResult): string {
  const lines: string[] = ['## 📂 Structure Changes\n'];
  
  if (diff.added.length > 0) {
    lines.push('### ➕ Added');
    diff.added.forEach(path => lines.push(`- \`${path}\``));
    lines.push('');
  }
  
  if (diff.removed.length > 0) {
    lines.push('### ➖ Removed');
    diff.removed.forEach(path => lines.push(`- \`${path}\``));
    lines.push('');
  }
  
  return lines.join('\n');
}
