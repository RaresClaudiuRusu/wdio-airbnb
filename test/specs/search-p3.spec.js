import HomePage from '../pageobjects/home.page';
import searchResultsPage from '../pageobjects/searchResults.page';
import SearchResultsPage from '../pageobjects/searchResults.page';

describe('Airbnb Rome search with guests and dates', () => {
    it('Verify that a property is displayed on the map correctly', async () => {
        HomePage.open();
        await browser.pause(5000)
        await HomePage.enterLocation('Rome, Italy');

        await HomePage.selectDates();
        await browser.pause(3000);

        await HomePage.setGuests();
        await browser.pause(3000);

        await HomePage.clickSearchButton();
        await browser.maximizeWindow();
        await browser.pause(4000);

        

        // Verify map pin color change on hover
        const titleOfPropertyText = await searchResultsPage.titleOfProperty.getText();
        await browser.pause(1000);
        await console.log("THE TITLE IS ::::::::", titleOfPropertyText);

        const priceOnPropertyText = await searchResultsPage.priceOfFirstProperty.getText();
        const priceOnProperty = priceOnPropertyText.split(" ")[0];
        await browser.pause(1000);
        await console.log("THE PRICE IS ::::::::", priceOnProperty);
        
        // Concatenate the Title and the Price
        const titleAndPrice = await `${titleOfPropertyText}, ${priceOnProperty}`;
        console.log("TITLE AND PRICE PROPERTY :::::::::", titleAndPrice);

        // Look for Pin on map before hover mouse
        const searchPinOnMap = await $(`//span[contains(text(),"${titleAndPrice}")]`); ////div[@aria-label="Map"]
        const colorMapPinBefore = await searchPinOnMap.getCSSProperty('background-color');
        await browser.pause(1000);
        await console.log("PIN COLOR BEFORE HOVER  :::::::", colorMapPinBefore);

        // Hover over the first property to trigger map pin change
        const firstProperty = SearchResultsPage.pageProperties[1];
        await firstProperty.moveTo();
        await browser.pause(2000);

        const mapPinAfter = await searchResultsPage.mapPinInfo;
        const colorMapPinAfter = await mapPinAfter.getCSSProperty('background-color');
        await browser.pause(1000);
        await console.log("PIN COLOR AFTER HOVER  :::::::", colorMapPinAfter);
        await browser.pause(2000);
        
        // Verify color change
        await expect(colorMapPinBefore.value).to.not.equal(colorMapPinAfter.value);

    });
    
});