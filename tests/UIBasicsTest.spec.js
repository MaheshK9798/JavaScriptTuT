const { test, expect } = require('@playwright/test');

test('@Web UI Controls', async ({ page }) => {
  const userName = page.locator('#username');
  const signIn = page.locator("#signInBtn");
  const cardTitles = page.locator(".card-body a");

  page.on('request', request => console.log(request.url()));
  page.on('response', response => console.log(response.url(), response.status()));

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await page.pause();

  console.log(await page.title());

  await userName.fill("rahulshetty");
  await page.locator("[type='password']").fill("learning");

  const dropdown = page.locator("select.form-control");
  await dropdown.selectOption("consult");

  await page.locator(".radiotextsty").last().click();
  await page.locator("#okayBtn").click();

  console.log(await page.locator(".radiotextsty").last().isChecked());
  await expect(page.locator(".radiotextsty").last()).toBeChecked();

  await page.locator("#terms").click();
  await expect(page.locator("#terms")).toBeChecked();
  await page.locator("#terms").uncheck();
  expect(await page.locator("#terms").isChecked()).toBeFalsy();

  const documentLink = page.locator("[href*='documents-request']");
  await expect(documentLink).toHaveAttribute("class", "blinkingText");

  await userName.fill("rahulshetty");
  await page.locator("[type='password']").fill("learning");
  await signIn.click();

  console.log(await page.locator("[style*='block']").textContent());
  await expect(page.locator("[style*='block']")).toContainText('Incorrect');

  await userName.fill("");
  await userName.fill("rahulshettyacademy");
  await signIn.click();

  console.log(await cardTitles.first().textContent());
  console.log(await cardTitles.nth(1).textContent());

  const allTitles = await cardTitles.allTextContents();
  console.log(allTitles);
});
