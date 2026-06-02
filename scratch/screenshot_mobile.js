import { chromium } from 'playwright';

async function run() {
  console.log("Launching browser in mobile emulation...");
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  // Emulate mobile viewport (iPhone 12/13/14 Pro)
  await page.setViewportSize({ width: 375, height: 812 });
  
  console.log("Navigating to http://localhost:5173/ ...");
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  
  // Wait a bit for animations
  await page.waitForTimeout(2000);
  
  console.log("Scrolling to dashboard mockup...");
  const dashboard = await page.$('.db-container');
  if (dashboard) {
    await dashboard.scrollIntoViewIfNeeded();
    // Scroll up by 80px to clear the sticky header
    await page.evaluate(() => {
      window.scrollBy(0, -90);
    });
    await page.waitForTimeout(1000);
    
    const screenshotPath = '/Users/rifqithufail/.gemini/antigravity-ide/brain/48af5bc1-6297-4a2a-8f97-2bfd34e0d3ed/dashboard_mobile_scrolled.png';
    console.log(`Taking screenshot: ${screenshotPath}`);
    // Take a screenshot of the viewport instead of the element, to see how it fits under the sticky header
    await page.screenshot({ path: screenshotPath });
  } else {
    console.log("Could not find dashboard container!");
  }
  
  await browser.close();
  console.log("Browser closed successfully.");
}

run().catch(err => {
  console.error("Error running screenshot script:", err);
  process.exit(1);
});
