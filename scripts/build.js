#!/usr/bin/env node
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

console.log('🔨 Building package for npm...');

// Clean dist folder
console.log('🧹 Cleaning dist folder...');
if (fs.existsSync(path.join(rootDir, 'dist'))) {
  fs.rmSync(path.join(rootDir, 'dist'), { recursive: true });
}

// Build TypeScript
console.log('📦 Compiling TypeScript...');
try {
  execSync('tsc --project tsconfig.build.json', { stdio: 'inherit' });
} catch (error) {
  console.error('❌ TypeScript compilation failed');
  process.exit(1);
}

// Fix imports: add .js extensions to relative imports
console.log('🔧 Fixing ESM imports...');
function addJsExtensions(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      addJsExtensions(filePath);
    } else if (file.endsWith('.js')) {
      let content = fs.readFileSync(filePath, 'utf-8');
      
      // Add .js to relative imports that don't have an extension
      content = content.replace(
        /from ['"](\.\.?\/[^'"]+)['"]/g,
        (match, p1) => {
          if (!p1.endsWith('.js') && !p1.includes('node_modules')) {
            return `from '${p1}.js'`;
          }
          return match;
        }
      );
      
      content = content.replace(
        /import ['"](\.\.?\/[^'"]+)['"]/g,
        (match, p1) => {
          if (!p1.endsWith('.js') && !p1.includes('node_modules')) {
            return `import '${p1}.js'`;
          }
          return match;
        }
      );
      
      fs.writeFileSync(filePath, content);
    }
  });
}

addJsExtensions(path.join(rootDir, 'dist'));

// Fix shebang in index.js
console.log('🔧 Fixing entry point shebang...');
const indexPath = path.join(rootDir, 'dist', 'index.js');
let indexContent = fs.readFileSync(indexPath, 'utf-8');
indexContent = indexContent.replace('#!/usr/bin/env bun', '#!/usr/bin/env node');
fs.writeFileSync(indexPath, indexContent);
fs.chmodSync(indexPath, '755');

console.log('✅ Build complete!');
console.log('📁 Output: dist/');
console.log('\n🧪 Test locally: npm link && folder_mapper --help');
console.log('📦 Publish: npm publish');
