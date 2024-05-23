const { Builder, By, until } = require('selenium-webdriver');
const assert = require('chai').assert;
require('chromedriver');

describe('Player Page Tests', function() {
    this.timeout(30000); // Set timeout to 30 seconds for the whole suite
    let driver;

    afterEach(async function() {
        if (driver) {
            await driver.quit();
        }
    });

    it('should display the video element', async function() {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('http://localhost:3000/player');
        const videoElement = await driver.findElement(By.tagName('video'));
        assert.isTrue(await videoElement.isDisplayed());
    });

    it('should display the back button', async function() {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('http://localhost:3000/player');

        // Wait for the back button to be present
        await driver.wait(until.elementLocated(By.css('.back svg')), 10000);

        const backButton = await driver.findElement(By.css('.back svg'));
        assert.isTrue(await backButton.isDisplayed());
    });
});
