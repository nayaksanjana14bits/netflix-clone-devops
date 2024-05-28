const { Builder, By, until } = require('selenium-webdriver');
const assert = require('chai').assert;
require('chromedriver');

describe('Login Page Tests', function() {
    this.timeout(30000); // Set timeout to 30 seconds for the whole suite
    let driver;

    afterEach(async function() {
        if (driver) {
            await driver.quit();
        }
    });

    it('should display email and password input fields', async function() {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('http://localhost:3000/login');

        // Wait for 2 seconds before interacting with the email input field
        await driver.sleep(2000);

        // Locate email and password input fields
        const emailInput = await driver.findElement(By.css('input[type="text"][placeholder="Email"]'));
        const passwordInput = await driver.findElement(By.css('input[type="password"][placeholder="Password"]'));

        // Assert that email and password input fields are displayed
        assert.isTrue(await emailInput.isDisplayed(), 'Email input field should be displayed');
        assert.isTrue(await passwordInput.isDisplayed(), 'Password input field should be displayed');
    });

    it('should login successfully', async function() {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('http://localhost:3000/login');

        // Wait for 2 seconds before interacting with the email input field
        await driver.sleep(2000);

        // Enter email and password
        const emailInput = await driver.findElement(By.css('input[type="text"][placeholder="Email"]'));
        const passwordInput = await driver.findElement(By.css('input[type="password"][placeholder="Password"]'));
        await emailInput.sendKeys('sanju@gmail.com');
        await passwordInput.sendKeys('123456');

        // Click the login button
        const loginButton = await driver.findElement(By.id('LoginButt'));
        await loginButton.click();

        // Wait for the home page to load
        await driver.wait(until.urlIs('http://localhost:3000/home'), 10000); // Adjust the timeout as needed

       
    });
});
