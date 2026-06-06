const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let original = content;
      content = content.replace(/import\s+React(,\s*\{[^}]+\})?\s+from\s+['"]react['"];\n/g, (match, p1) => {
        return p1 ? 'import ' + p1.replace(/^,\s*/, '') + ' from \'react\';\n' : '';
      });
      content = content.replace(/import\s+React\s+from\s+['"]react['"];\n/g, '');
      if (content !== original) {
        fs.writeFileSync(fullPath, content);
      }
    }
  }
}
processDir('src');
