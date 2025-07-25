const { execSync } = require('child_process');
const fs = require('fs');

console.log('Running Vercel build script...');

// Ensure the build directory exists
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

// Run the build command
try {
  console.log('Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });

  console.log('Running build...');
  execSync('npm run build', { stdio: 'inherit' });
  
  console.log('Build completed successfully!');
  process.exit(0);
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
