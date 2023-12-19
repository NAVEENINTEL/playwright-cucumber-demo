const { Before, After, Given, When, Then } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const LoginPage = require('../../pages/LoginPage');
const ProductsPage = require('../../pages/ProductsPage');
const CartPage = require('../../pages/CartPage');
const fs = require('fs');

let browser;
let page;
let loginPage;
let productsPage;
let cartPage;
let logs = []; // To store logs

Before(async () => {
  browser = await chromium.launch();
  const context = await browser.newContext();
  context.setDefaultTimeout(10000);
  page = await context.newPage();
  loginPage = new LoginPage(page);
  productsPage = new ProductsPage(page);
  cartPage = new CartPage(page);
});

After(async (scenario) => {
  if (scenario.result.status === 'failed') {
    const failedTestName = scenario.pickle.name.replace(/ /g, '_');
    const page = await browser.newPage();
    await page.video.startRecording({ path: `./failedTests/${failedTestName}.mp4` });
    await page.video.stopRecording();
    await page.close();
  }
  await browser.close();
 
});

Given('I am on the SauceDemo login page', async () => {
  await loginPage.navigateTo();
});

When('I log in with {string} and {string}', async (username, password) => {
  await loginPage.login(username, password);
  logs.push(`Logged in with username: ${username}`);
});

Then('I should be logged in successfully', async () => {
  const isLoggedIn = await loginPage.isLoggedIn();
  logs.push(`Is logged in: ${isLoggedIn}`);
  const assert = require('assert');
  assert.strictEqual(isLoggedIn, true, 'Expected to be logged in');
});

When('I add items to the cart', async () => {
  await productsPage.sortByPriceLowToHigh();
  const leastExpensiveItemName = await productsPage.getLeastExpensiveItemName();
  await productsPage.addToCart(leastExpensiveItemName);
  logs.push(`Added item: ${leastExpensiveItemName} to cart`);

  await productsPage.sortByAlphabeticalOrder();
  const firstAlphabeticalItemName = await productsPage.getFirstAlphabeticalItemName();
  await productsPage.addToCart(firstAlphabeticalItemName);
  logs.push(`Added item: ${firstAlphabeticalItemName} to cart`);
});

When('I proceed to checkout', async () => {
  await cartPage.goToCart();
});

When('I fill shipping details with {string}, {string}, and {string}', async (firstName, lastName, postalCode) => {
    return 'pending';
  });

Then('I verify the total price accuracy', async () => {
  const subtotal = await cartPage.calculateSubtotal();
  const actualTotal = await cartPage.getTotalPrice();
  const expectedTotal = (subtotal * 1.08).toFixed(2);
  expect(actualTotal).toBe(expectedTotal);
  console.log("Final price:")
  console.log(`Expected price: ${expectedTotal} || Actual Price: ${actualTotal}`);
});

When('I complete the checkout', async () => {
  return 'pending';
});

Then('I verify the Thank You page', async () => {
   return 'pending';
});
