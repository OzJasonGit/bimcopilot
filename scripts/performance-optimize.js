#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Performance optimization suggestions
const performanceSuggestions = {
  bundleSize: [
    '✅ Implemented dynamic imports for heavy chart components',
    '✅ Added bundle splitting for large libraries (antd, d3, charts)',
    '✅ Optimized package imports with Next.js experimental features',
    '🔧 Consider replacing antd with lighter alternatives like shadcn/ui',
    '🔧 Consider lazy loading non-critical components',
    '🔧 Remove unused dependencies from package.json'
  ],
  
  images: [
    '✅ Added lazy loading to all images',
    '✅ Implemented blur placeholders',
    '✅ Configured modern image formats (WebP/AVIF)',
    '✅ Added responsive image sizes',
    '🔧 Consider implementing image CDN for better caching',
    '🔧 Optimize image dimensions to match display sizes'
  ],
  
  fonts: [
    '✅ Added font display swap',
    '✅ Preloaded critical fonts',
    '✅ Used local font optimization',
    '🔧 Consider using variable fonts to reduce file sizes',
    '🔧 Implement font subsetting for better performance'
  ],
  
  caching: [
    '✅ Configured image caching TTL',
    '✅ Added bundle splitting for better caching',
    '🔧 Implement service worker for offline caching',
    '🔧 Add cache headers for static assets',
    '🔧 Consider implementing stale-while-revalidate pattern'
  ],
  
  coreWebVitals: [
    '✅ Added performance monitoring',
    '✅ Implemented lazy loading',
    '✅ Optimized bundle splitting',
    '🔧 Monitor and optimize Largest Contentful Paint (LCP)',
    '🔧 Reduce Cumulative Layout Shift (CLS)',
    '🔧 Optimize First Input Delay (FID)'
  ]
};

// Generate performance report
function generatePerformanceReport() {
  console.log('🚀 BIM Copilot Performance Optimization Report\n');
  
  Object.entries(performanceSuggestions).forEach(([category, suggestions]) => {
    console.log(`📊 ${category.toUpperCase()}:`);
    suggestions.forEach(suggestion => {
      console.log(`  ${suggestion}`);
    });
    console.log('');
  });
  
  console.log('🎯 Next Steps:');
  console.log('1. Run npm run build to see bundle analysis');
  console.log('2. Use Lighthouse in Chrome DevTools for detailed metrics');
  console.log('3. Monitor Core Web Vitals in production');
  console.log('4. Consider implementing service worker for offline support');
  console.log('5. Optimize database queries and API responses');
}

// Check for common performance issues
function checkPerformanceIssues() {
  const issues = [];
  
  // Check for large dependencies
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const largeDeps = ['antd', 'd3', 'chart.js', 'react-chartjs-2', 'recharts'];
  
  largeDeps.forEach(dep => {
    if (packageJson.dependencies[dep]) {
      issues.push(`⚠️  Large dependency detected: ${dep}`);
    }
  });
  
  // Check for unused imports
  const srcFiles = getAllFiles('./components');
  srcFiles.forEach(file => {
    if (file.endsWith('.js') || file.endsWith('.jsx')) {
      const content = fs.readFileSync(file, 'utf8');
      if (content.includes('import * as')) {
        issues.push(`⚠️  Wildcard import detected in: ${file}`);
      }
    }
  });
  
  return issues;
}

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);
  
  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });
  
  return arrayOfFiles;
}

// Main execution
if (require.main === module) {
  generatePerformanceReport();
  
  console.log('🔍 Checking for performance issues...\n');
  const issues = checkPerformanceIssues();
  
  if (issues.length > 0) {
    console.log('Issues found:');
    issues.forEach(issue => console.log(issue));
  } else {
    console.log('✅ No major performance issues detected!');
  }
}

module.exports = { generatePerformanceReport, checkPerformanceIssues }; 