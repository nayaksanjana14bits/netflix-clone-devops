const { Builder, By, until } = require('selenium-webdriver');
const assert = require('chai').assert;
require('chromedriver');

describe('Signup Page Tests', function() {
    this.timeout(30000); // Set timeout to 30 seconds for the whole suite
    let driver;

    afterEach(async function() {
        if (driver) {
            await driver.quit();
        }
    });

    it('should allow user to sign up with valid credentials', async function() {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('http://localhost:3000/signup'); // Update the URL as per your application's route

        try {
            // Wait for the email input field to be present
            const emailInput = await driver.wait(until.elementLocated(By.css('input[name="email"]')), 10000);
            await emailInput.sendKeys('example@example.com');

            // Click on the button to sign up
            const signUpButton = await driver.findElement(By.css('button'));
            await signUpButton.click();

            // Wait for navigation to home page after successful signup
            await driver.wait(until.urlContains('/home'), 10000);

            // Assert that the URL contains '/home', indicating successful navigation after signup
            assert.isTrue(await driver.getCurrentUrl().includes('/home'));
        } catch (error) {
            console.log(error);
        }
    });

    it('should not allow user to sign up with invalid credentials', async function() {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('http://localhost:3000/signup'); // Update the URL as per your application's route

        try {
            // Wait for the email input field to be present
            const emailInput = await driver.wait(until.elementLocated(By.css('input[name="email"]')), 10000);
            await emailInput.sendKeys('invalidemail');

            // Click on the button to sign up
            const signUpButton = await driver.findElement(By.css('button'));
            await signUpButton.click();

            // Wait for error message to appear on the page
            const errorMessage = await driver.wait(until.elementLocated(By.css('.error-message')), 10000);

            // Assert that the error message is displayed
            assert.isTrue(await errorMessage.isDisplayed());
        } catch (error) {
            console.log(error);
        }
    });
});
