import HomePage from '../pageobjects/home.page';
import SearchResultsPage from '../pageobjects/searchResults.page';
import moment from "moment/moment";

describe('Airbnb Rome search with guests and dates', () => {
    it('should search Rome, Italy with correct dates and guests', async () => {
        HomePage.open();
        await browser.pause(5000)
        await HomePage.enterLocation('Rome, Italy');

        await browser.pause(1000)
        HomePage.selectDates();
        await browser.pause(2000);

        HomePage.setGuests();
        await browser.pause(2000);

        HomePage.clickSearchButton();
        await browser.pause(2000);

        // Set the Translation pop-up to local storage
        await browser.execute(() => {window.localStorage.setItem('__amplify__translation_engine/TRANSLATION_ANNOUNCEMENT', {"data":{"pdp":1730047838965},"expires":null})}) 

        const properties = SearchResultsPage.pageProperties;
        const numberOfProperties = await properties.length;
        const nextPage = await SearchResultsPage.Pages;

        for (let j = 0; j <= 13; j++){

            for (let i = 1; i < numberOfProperties; i = i + 2) {
                // Open each property in a new tab and verify
                await properties[i].click();
                await browser.pause(3000);
                
                // Switch to new tab
                await browser.switchWindow("https://www.airbnb.com/rooms");
                await browser.pause(2000);

                await SearchResultsPage.verifyLocation('Rome');
                await SearchResultsPage.verifyGuestCapacity(3);

                const checkInDate = moment().add(7,'days');
                const checkOutDate = moment(checkInDate).add(7, 'days');
                await SearchResultsPage.verifyDatePeriod(checkInDate, checkOutDate)

                // Close the current tab
                await browser.closeWindow();
                await browser.pause(3000);
                // Switch back to the main results tab
                await browser.switchWindow('https://www.airbnb.com/s/Rome--Italy/');
                await browser.pause(3000);
            }

            await nextPage.click();
            await browser.pause(2000);
        }

    });
    
});