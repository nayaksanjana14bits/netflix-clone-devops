const { Builder, By, until } = require('selenium-webdriver');
const assert = require('chai').assert;
require('chromedriver');

describe('TVShows Page Tests', function() {
    this.timeout(30000); // Set timeout to 30 seconds for the whole suite
    let driver;

    afterEach(async function() {
        if (driver) {
            await driver.quit();
        }
    });

    it('should render TVShows page and display necessary elements', async function() {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('http://localhost:3000/tvshows'); // Update the URL as per your application's route

        // Check if Navbar is present
        const navbar = await driver.findElement(By.className('navbar'));
        assert.isTrue(await navbar.isDisplayed());

        // Check if SelectGenre component is present
        const selectGenre = await driver.findElement(By.className('select-genre'));
        assert.isTrue(await selectGenre.isDisplayed());

        // Check if Slider component or NotAvailable component is present based on data availability
        const slider = await driver.findElement(By.className('slider'));
        const notAvailable = await driver.findElement(By.className('not-available'));
        const moviesLoaded = await driver.executeScript(() => window.moviesLoaded);

        if (moviesLoaded) {
            assert.isTrue(await slider.isDisplayed());
        } else {
            assert.isTrue(await notAvailable.isDisplayed());
        }
    });
});
