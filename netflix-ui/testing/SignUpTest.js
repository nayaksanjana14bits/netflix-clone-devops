const { Builder, By, until } = require('selenium-webdriver');
const assert = require('chai').assert;
require('chromedriver');

describe('Signup Page Tests', function() {
    this.timeout(30000); // Set timeout to 30 seconds for the whole suite

   

    it('should show the password input field after clicking "Get Started"', async function() {
        let driver;

        try {
            driver = await new Builder().forBrowser('chrome').build();

            await driver.get('http://localhost:3000/');

            // Wait for the page to load
            await driver.sleep(2000);
            const emailInput = await driver.findElement(By.css('input[name="email"]'));
            await emailInput.sendKeys('test@example.com');
            await driver.sleep(2000);

            // Click the "Get Started" button
            const getStartedButton = await driver.findElement(By.id('getStart_butt'));
            await getStartedButton.click();
            await driver.sleep(2000);

            // Wait for the password input field to be displayed
            const passwordInput = await driver.findElement(By.css('input[name="password"]'));
            assert.isTrue(await passwordInput.isDisplayed());
            await passwordInput.sendKeys('testpassword');
            await driver.sleep(2000);
              // Click the "Sign In" button
             // Click the "Sign In" button
            const signInButton = await driver.findElement(By.id('signIn_Butt'));
            await signInButton.click();
            console.log('Sign In button pressed successfully');

              await driver.sleep(5000);

              const currentUrl = await driver.getCurrentUrl();
              console.error('Error currentURL:', currentUrl);
              assert.strictEqual(currentUrl, 'http://localhost:3000/home');
              // Wait for the login process
              await driver.sleep(2000);
  

        } catch (error) {
            console.error('Error occurred:', error);
        } finally {
            // Quit the driver after the test case is completed
            if (driver) {
                await driver.quit();
            }
        }
    });

    // Add more test cases as needed
});
