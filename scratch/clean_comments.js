const fs = require('fs');

function cleanFile(filePath, regex) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(regex, '');
    fs.writeFileSync(filePath, content);
    console.log(`Cleaned ${filePath}`);
  } catch (err) {
    console.error(`Error cleaning ${filePath}: ${err.message}`);
  }
}

// Clean HTML comments
cleanFile('index.html', /<!--[\s\S]*?-->/g);

// Clean CSS comments
cleanFile('src/input.css', /\/\*[\s\S]*?\*\//g);

// Clean JS comments
try {
  let jsContent = fs.readFileSync('app.js', 'utf8');
  // Remove multi-line comments
  jsContent = jsContent.replace(/\/\*[\s\S]*?\*\//g, '');
  // Remove single-line comments (careful with URLs)
  // This regex matches // only if it's not preceded by : (to avoid http://)
  jsContent = jsContent.replace(/(^|[^\:])\/\/.*/g, '$1');
  fs.writeFileSync('app.js', jsContent);
  console.log('Cleaned app.js');
} catch (err) {
  console.error(`Error cleaning app.js: ${err.message}`);
}
