import moment from "moment";

class SearchResultsPage {

    get locationInfo() { return $('h2[elementtiming="LCP-target"]'); } 
    get dateRangeInfo() { return $('div[data-testid="availability-calendar-date-range"]'); } 
    get guestsInfo() { return $('//span[contains(text(),"guests maximum")]'); }
    get pageProperties() { return $$('//div[@role="group"]'); }
    get Pages() { return $('a[aria-label="Next"]'); }

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
        await console.log("GUESTS CAPACITY FROM DOWN BELLOW THE PAGE ::::::::", guestsElement, "IS >>>>>> " ,expectedGuests)
    }

    // Verify date period
    async verifyDatePeriod(checkInDate: moment.Moment, checkOutDate: moment.Moment) {
        const dateText = await this.dateRangeInfo.getText();
        await expect(dateText).toContain(checkInDate.format('MMM D'));
        await expect(dateText).toContain(checkOutDate.format('MMM D'));
        await console.log("THE PERIOD OF STAY :::::::::", dateText)
    }
}

export default new SearchResultsPage();