const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting custom Vercel build script...');
console.log(`📁 Current directory: ${process.cwd()}`);
console.log(`🔄 Node.js version: ${process.version}`);
console.log(`🌐 NODE_ENV: ${process.env.NODE_ENV || 'not set'}`);

// Ensure we're in the correct directory
const rootDir = path.resolve(__dirname);
process.chdir(rootDir);
console.log(`📂 Project root: ${rootDir}`);

// Log directory contents
console.log('\n📂 Directory contents:');
fs.readdirSync('.').forEach(file => {
  console.log(`- ${file} (${fs.statSync(file).isDirectory() ? 'dir' : 'file'})`);
});

// Install dependencies
console.log('\n🔧 Installing dependencies...');
try {
  execSync('npm install --force', { stdio: 'inherit' });
  console.log('✅ Dependencies installed successfully');
  
  // Verify critical modules
  console.log('\n🔍 Verifying critical modules...');
  const modules = ['tailwindcss', 'postcss', 'autoprefixer', 'vite'];
  modules.forEach(module => {
    try {
      const modulePath = require.resolve(module);
      console.log(`✅ ${module} found at: ${modulePath}`);
    } catch (e) {
      console.error(`❌ ${module} not found: ${e.message}`);
    }
  });
  
  // Run the build
  console.log('\n🏗️  Starting build...');
  execSync('npx vite build', { stdio: 'inherit' });
  
  // Verify build output
  if (fs.existsSync('dist')) {
    console.log('\n📦 Build output:');
    const listFiles = (dir, indent = '') => {
      fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        console.log(`${indent}- ${file} (${stat.isDirectory() ? 'dir' : stat.size + ' bytes'})`);
        if (stat.isDirectory()) {
          listFiles(fullPath, indent + '  ');
        }
      });
    };
    listFiles('dist');
    console.log('\n🎉 Build completed successfully!');
    process.exit(0);
  } else {
    throw new Error('Build completed but no dist directory was created');
  }
} catch (error) {
  console.error('\n❌ Build failed with error:', error.message);
  
  // Additional debug information
  console.log('\n🔍 Additional debug information:');
  console.log('- Node.js path:', process.execPath);
  console.log('- NPM version:', execSync('npm -v').toString().trim());
  console.log('- NPX version:', execSync('npx -v').toString().trim());
  
  process.exit(1);
}
