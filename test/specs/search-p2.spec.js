import HomePage from '../pageobjects/home.page';
import SearchResultsPage from '../pageobjects/searchResults.page';
import moment from "moment/moment";

describe('Airbnb Rome search with bedrooms and pools', () => {
    it('Verify that the results and details page match the extra filters', async () => {
        HomePage.open();
        await browser.pause(5000)
        await HomePage.enterLocation('Rome, Italy');

        await HomePage.selectDates();
        await browser.pause(3000);

        await HomePage.setGuests();
        await browser.pause(3000);

        await HomePage.clickSearchButton();
        await browser.pause(4000);

        await HomePage.setExtraFilters(5, true);
        await browser.pause(4000);

        // Set the Translation pop-up to local storage
        await browser.execute(() => {window.localStorage.setItem('__amplify__translation_engine/TRANSLATION_ANNOUNCEMENT', {"data":{"pdp":1730047838965},"expires":null})}) 

        const properties = SearchResultsPage.pageProperties;
        const numberOfProperties = await properties.length;

            for (let i = 1; i < numberOfProperties; i = i + 2) {
                // Open each property in a new tab and verify
                await properties[i].click();
                await browser.pause(3000);
                
                // Switch to new tab
                await browser.switchWindow("https://www.airbnb.com/rooms");
                await browser.pause(2000);

                await SearchResultsPage.verifyNoOfBedrooms(5);
                await SearchResultsPage.verifyPoolAvailability();

                // Close the current tab
                await browser.closeWindow();
                await browser.pause(3000);
                // Switch back to the main results tab
                await browser.switchWindow('https://www.airbnb.com/s/Rome--Italy/');
                await browser.pause(3000);
            }

    });
    
});