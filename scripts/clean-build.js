import fs from 'fs';
import path from 'path';

// Remove package.json from dist if accidentally copied
const distPackageJson = path.join('dist', 'package.json');
if (fs.existsSync(distPackageJson)) {
  fs.unlinkSync(distPackageJson);
}

console.log('Build cleaned successfully');