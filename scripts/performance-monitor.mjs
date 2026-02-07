import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

console.log('🚀 Performance Monitor - Svasam Wellness Platform\n');

// Check if Lighthouse is available
try {
  execSync('lighthouse --version', { stdio: 'pipe' });
} catch (error) {
  console.log('❌ Lighthouse not found. Installing...');
  execSync('npm install -g lighthouse', { stdio: 'inherit' });
}

console.log('📊 Running performance audit...\n');

// Run Lighthouse audit
const lighthouseCommand = `lighthouse http://localhost:3000 --output=json --output-path=./performance-report.json --chrome-flags="--headless" --quiet`;

try {
  execSync(lighthouseCommand, { stdio: 'inherit' });
  
  // Read and analyze results
  const report = JSON.parse(readFileSync('./performance-report.json', 'utf8'));
  const categories = report.categories;
  
  console.log('📈 Performance Results:');
  console.log('========================');
  
  Object.entries(categories).forEach(([key, category]) => {
    const score = Math.round(category.score * 100);
    const emoji = score >= 90 ? '🟢' : score >= 70 ? '🟡' : '🔴';
    console.log(`${emoji} ${category.title}: ${score}/100`);
  });
  
  console.log('\n🎯 Key Metrics:');
  console.log('================');
  
  const audits = report.audits;
  
  // Core Web Vitals
  console.log(`⚡ LCP (Largest Contentful Paint): ${audits['largest-contentful-paint'].displayValue}`);
  console.log(`🔄 FID (First Input Delay): ${audits['max-potential-fid'].displayValue}`);
  console.log(`📊 CLS (Cumulative Layout Shift): ${audits['cumulative-layout-shift'].displayValue}`);
  
  // Other important metrics
  console.log(`🖼️  Image Optimization: ${audits['uses-webp-images'].score ? '✅' : '❌'}`);
  console.log(`💾 Cache Efficiency: ${audits['uses-long-cache-ttl'].score ? '✅' : '❌'}`);
  console.log(`🚦 Render Blocking: ${audits['render-blocking-resources'].score ? '✅' : '❌'}`);
  console.log(`📱 Responsive Images: ${audits['responsive-images'].score ? '✅' : '❌'}`);
  
  // Recommendations
  console.log('\n💡 Recommendations:');
  console.log('==================');
  
  const opportunities = Object.values(audits)
    .filter(audit => audit.score < 0.9 && audit.details && audit.details.type === 'opportunity')
    .sort((a, b) => (b.numericSavings || 0) - (a.numericSavings || 0))
    .slice(0, 5);
  
  opportunities.forEach(opportunity => {
    const savings = opportunity.numericSavings ? ` (Est. savings: ${opportunity.displayValue})` : '';
    console.log(`🔧 ${opportunity.title}${savings}`);
  });
  
  console.log('\n🎉 Performance audit complete!');
  console.log('📁 Detailed report saved to: performance-report.json');
  
} catch (error) {
  console.error('❌ Error running performance audit:', error.message);
  console.log('\n💡 Make sure the development server is running:');
  console.log('   npm run dev');
  console.log('\nThen run this script again.');
}
