const { test } = require('@playwright/test');

async function humanType(page, selector, text) {
  await page.click(selector);
  for (const char of text) {
    await page.keyboard.type(char);
    await page.waitForTimeout(30 + Math.random() * 70);
  }
}

test('human typing demo', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.getByTestId('start-demo').click();

  await humanType(page, '#email', 'demo@company.com');
  await humanType(page, '#password', 'SuperSecure123!');

  await page.click('button[type="submit"]');
});
