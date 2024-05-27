const { Builder, By, until } = require('selenium-webdriver');
const assert = require('chai').assert;
require('chromedriver');




describe('Removing from list Test', function() {
    this.timeout(30000); // Set timeout to 30 seconds for the whole suite

    it('should Remove movies from list', async function() {
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
           await driver.wait(until.urlIs('http://localhost:3000/home'), 50000);
          // Wait for the content to load
          
            await driver.get('http://localhost:3000/mylist');
            await driver.sleep(2000);
       
              
            // Wait for redirection to the movies page after login
            await driver.wait(until.elementLocated(By.css('.content')), 10000);

             // Debugging: Log the page source to inspect the DOM
         const pageSource = await driver.getPageSource();
         console.log(pageSource);

        // Check for the presence of Card elements 
        let cards = await driver.findElements(By.css('.grid img'));
        console.log(`Number of cards: ${cards.length}`);
         // Perform hover action on the card
        const actions = driver.actions({ async: true });
        await actions.move({ origin: cards[0] }).perform();
        await driver.sleep(2000);

        // Wait for the remove button to become visible
     await driver.wait(until.elementLocated(By.id('remove')), 5000);
     await driver.sleep(2000);
     // Find and click the "Remove from List" button
     const removeButton = await driver.findElement(By.id('remove'));
     await removeButton.click();
     console.log("removed");
     await driver.sleep(2000);
     
}
catch (error) {
    console.error('Error occurred:', error);
} finally {
 await driver.quit();
}
});


    //           await driver.sleep(2000);
    //           console.log("card clicked");
    //         //   await driver.executeScript('window.scrollBy(0, 100);');

    //         const addToListButton =await driver.findElement(By.id('liked'));
           
    //         await addToListButton.click();
    //         await driver.sleep(2000);
    //         console.log("clicked");
           
           
    //     } catch (error) {
    //         console.error('Error occurred:', error);
    //     } finally {
    //         // Quit the driver after the test case is completed
    //         if (driver) {
    //             await driver.quit();
    //         }
    //     }
    // });

    // Add more test cases as needed
});








    

