import fs from 'fs';
import path from 'path';

/**
 * Renames test files to have .test.ts extension
 */
function renameTestFiles() {
  const testsDir = path.join(process.cwd(), 'tests');
  
  const filesToRename = [
    'tree.ts',
    'ignore.ts',
    'helper.ts',
    'scanner.ts',
    'printer.ts'
  ];

  console.log('🔄 Renaming test files...\n');

  filesToRename.forEach(fileName => {
    const oldPath = path.join(testsDir, fileName);
    const newFileName = fileName.replace('.ts', '.test.ts');
    const newPath = path.join(testsDir, newFileName);

    if (fs.existsSync(oldPath)) {
      fs.renameSync(oldPath, newPath);
      console.log(`✅ Renamed: ${fileName} → ${newFileName}`);
    } else {
      console.log(`⚠️  File not found: ${fileName}`);
    }
  });

  console.log('\n✨ Done! Run "bun test" to execute tests.\n');
}

renameTestFiles();
