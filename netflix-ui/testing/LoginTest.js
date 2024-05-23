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
        
        const emailInput = await driver.findElement(By.css('input[type="text"][placeholder="Email"]'));
        assert.isTrue(await emailInput.isDisplayed());

        const passwordInput = await driver.findElement(By.css('input[type="password"][placeholder="Password"]'));
        assert.isTrue(await passwordInput.isDisplayed());
    });

    it('should display the login button', async function() {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('http://localhost:3000/login');
        
        const loginButton = await driver.findElement(By.css('button'));
        assert.isTrue(await loginButton.isDisplayed());
    });

    
});
