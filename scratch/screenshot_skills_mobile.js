import { chromium } from 'playwright';

async function run() {
  console.log("Launching browser in mobile emulation for skills...");
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  // Emulate mobile viewport (iPhone 12/13/14 Pro)
  await page.setViewportSize({ width: 375, height: 812 });
  
  console.log("Navigating to http://localhost:5173/ ...");
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  
  // Wait a bit for animations
  await page.waitForTimeout(2000);
  
  console.log("Scrolling to skills section...");
  const skillsSection = await page.$('#skills');
  if (skillsSection) {
    await skillsSection.scrollIntoViewIfNeeded();
    
    // Scroll up by 80px to clear any sticky elements
    await page.evaluate(() => {
      window.scrollBy(0, -90);
    });
    await page.waitForTimeout(1000);
    
    const screenshotPath = '/Users/rifqithufail/.gemini/antigravity-ide/brain/48af5bc1-6297-4a2a-8f97-2bfd34e0d3ed/skills_mobile.png';
    console.log(`Taking screenshot: ${screenshotPath}`);
    await page.screenshot({ path: screenshotPath });
  } else {
    console.log("Could not find skills section!");
  }
  
  await browser.close();
  console.log("Browser closed successfully.");
}

run().catch(err => {
  console.error("Error running screenshot script:", err);
  process.exit(1);
});
