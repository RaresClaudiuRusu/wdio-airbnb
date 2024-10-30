import moment from "moment";

class SearchResultsPage {

    get locationInfo() { return $('h2[elementtiming="LCP-target"]'); } 
    get dateRangeInfo() { return $('div[data-testid="availability-calendar-date-range"]'); } 
    get guestsInfo() { return $('//span[contains(text(),"guests maximum")]'); }
    get pageProperties() { return $$('//div[@role="group"]'); }
    get Pages() { return $('a[aria-label="Next"]'); }

    get bedroomInfo() { return $('//li[contains(text(),"bedrooms")]'); }
    get poolInfo() { return $('//div[contains(text(),"ool")]'); } ////div[@data-section-id="AMENITIES_DEFAULT"]
    get amenitiesShowAll() { return $('//button[contains(text(),"Show all")]'); }

    // Verify the location
    async verifyLocation(expectedLocation: string) {
        const locationText = await this.locationInfo.getText();
        await console.log("THE TEXT BELOW THE IMAGES IS  :::::::", locationText);
        await expect(locationText).toContain(expectedLocation);
    }

    // Verify number of guests
    async verifyGuestCapacity(expectedGuests: number) {
        const guestsElement = await this.guestsInfo.getText();
        const noOfGuests = await parseInt((guestsElement).substring(0, 1));
        await expect(noOfGuests).toBeGreaterThanOrEqual(expectedGuests);
        await console.log("GUESTS CAPACITY FROM DOWN BELLOW THE PAGE ::::::::", guestsElement, "IS >>>>>>==== " ,expectedGuests)
    }

    // Verify date period
    async verifyDatePeriod(checkInDate: moment.Moment, checkOutDate: moment.Moment) {
        const dateText = await this.dateRangeInfo.getText();
        await expect(dateText).toContain(checkInDate.format('MMM D'));
        await expect(dateText).toContain(checkOutDate.format('MMM D'));
        await console.log("THE PERIOD OF STAY :::::::::", dateText)
    }

    // Verify number of bedrooms
    async verifyNoOfBedrooms(expectedBedrooms:number) {
        const bedroomsText = await this.bedroomInfo.getText();
        console.log(await bedroomsText);
        const noOfBedrooms = await parseInt((bedroomsText).substring(3, 4));
        console.log(await noOfBedrooms);
        await expect(noOfBedrooms).toBeGreaterThanOrEqual(expectedBedrooms);
        await console.log("THE TEXT WITH BEDROOMS BELOW THE IMAGES ::::::::", bedroomsText, "IS >>>>>>==== " ,expectedBedrooms)
    }

    // Verify pool in amenities
    async verifyPoolAvailability(){
        const isPool = await this.poolInfo;
        await browser.pause(2000);
        await this.amenitiesShowAll.click();
        await expect(isPool).toExist();
    }
}

export default new SearchResultsPage();