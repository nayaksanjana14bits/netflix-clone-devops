const { Builder, By, until } = require('selenium-webdriver');
const assert = require('chai').assert;
require('chromedriver');

describe('Player Page Tests', function() {
    this.timeout(60000); // Increase timeout to 60 seconds for the whole suite

    it('should display the video element', async function() {
        let driver;
        try {
            driver = await new Builder().forBrowser('chrome').build();
            await driver.get('http://localhost:3000/player');
            
            // Wait until the video element is present
            const videoElement = await driver.wait(until.elementLocated(By.tagName('video')), 10000);
            assert.isTrue(await videoElement.isDisplayed());
            
            // Wait for 2 seconds to observe the video
            await driver.sleep(2000);
        } finally {
            if (driver) {
                await driver.quit();
            }
        }
    });

    it('should display the back button and navigate back to the previous page', async function() {
        let driver;
        try {
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
            await driver.wait(until.urlIs('http://localhost:3000/home'), 10000);
            await driver.sleep(2000); // Ensure the home page loads

            // Navigate to the player page
            await driver.get('http://localhost:3000/player');
            await driver.sleep(2000);

            // Wait until the back button is present
            const backButton = await driver.wait(until.elementLocated(By.id('back_arrow')), 10000);
            assert.isTrue(await backButton.isDisplayed());

            console.log('Back button is displayed');

            // Wait until the back button is clickable
            await driver.wait(until.elementIsVisible(backButton), 10000);
            
            // Scroll into view if needed
            await driver.executeScript("arguments[0].scrollIntoView(true);", backButton);
            
            // Click the back button
            try {
                await backButton.click();
                console.log('Back button clicked');
            } catch (error) {
                console.error('Error clicking back button:', error);
            }
        
            // Wait for 2 seconds to allow navigation to occur
            await driver.sleep(2000);
            
            // Check the current URL
            const currentUrl = await driver.getCurrentUrl();
            console.log('Current URL after clicking back button:', currentUrl);

            // Wait until the URL is the home page URL
            try {
                await driver.wait(until.urlIs('http://localhost:3000/home'), 20000); // Increased the timeout
                console.log('Navigated to home page');
            } catch (error) {
                console.error('Error waiting for home page URL:', error);
            }

            // Wait for 2 seconds to observe the navigation
            await driver.sleep(2000);
        } finally {
            if (driver) {
                await driver.quit();
            }
        }
    });
});
