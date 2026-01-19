const { test } = require('@playwright/test');

async function humanType(page, label, text) {
  const locator = page.getByRole('textbox', { name: label });
  await locator.waitFor();       // ensure the textbox is visible
  await locator.click();

  if (label === "server url" || label === "site"){
    for (const char of text) {
        await page.keyboard.type(char);
        await page.waitForTimeout(1);
    }
  } else {
    await locator.fill(text);
    await page.waitForTimeout(1000);
  }

}

test.use({ video: 'on' });
test.use({viewport: { width: 1300, height: 750 }})

test('human typing demo', async ({ page }) => {
  test.setTimeout(120000);

  await page.goto('http://localhost:3000');

  await page.getByTestId('start-demo').click();

  await page.waitForTimeout(1000);

  await page.getByRole('checkbox', { name: 'checkbox' }).check();

  await page.waitForTimeout(500);

  await humanType(page, "server url", 'https://10ax.online.tableau.com/');
  await humanType(page, "site", 'tableau-dev');
  await humanType(page, "token", process.env.TB_TOKEN);
  await humanType(page, "name", process.env.TB_TOKEN_NAME);

  await page.waitForTimeout(1000);

  await page.getByRole('button', { name: 'submit' }).click();

  await page.waitForTimeout(5000);

});
