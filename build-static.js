#!/usr/bin/env node

// Simple build script for static site deployment
import fs from 'fs';
import path from 'path';

console.log('Building static site...');

// Ensure dist directory exists
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist', { recursive: true });
}

// Copy all files from public to dist
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const files = fs.readdirSync(src);
  
  for (const file of files) {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);
    
    if (fs.statSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

try {
  copyDir('public', 'dist');
  
  // Copy root index.html for Vite compatibility
  if (fs.existsSync('index.html')) {
    fs.copyFileSync('index.html', 'dist/index.html');
  }
  
  console.log('✓ Static site built successfully!');
  console.log('✓ Files copied from public/ to dist/');
  console.log('✓ Root index.html added for deployment compatibility');
  console.log('✓ Site ready for deployment at dist/');
} catch (error) {
  console.error('✗ Build failed:', error.message);
  process.exit(1);
}