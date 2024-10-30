import moment from 'moment';
import { browser } from '@wdio/globals';
import { $ } from '@wdio/globals';

class HomePage {
    get searchInput() { return $('input[name="query"]'); }
    get openCalendar() { return $('(.//div[contains(text(),"Check")])[1]'); }
    get guestsButton() { return $('div=Who'); }
    get addAdultButton() { return $('(.//button[@aria-label="increase value"])[1]'); }
    get addChildButton() { return $('(.//button[@aria-label="increase value"])[2]'); }
    get searchButton() { return $('button=Search'); }

    get filters() { return $('button[data-testid="category-bar-filter-button"]'); }
    get pool() { return $('button[id="filter-item-amenities-7"]'); }
    get bedrooms() { return $('(.//button[@aria-label="increase value"])[1]'); }
    get applyFilters() { return $('//a[contains(text(),"Show")]'); }
    get amenitiesShowMore() { return $('//span[contains(text(),"Show more")]'); }

    async open() {
        await browser.url('https://www.airbnb.com/');
    }

    async enterLocation(location: string) {
        await this.searchInput.setValue(location);
    }

    async selectDates() {
       // Select check-in and check-out dates
       //await browser.pause(1000)
       // Open the calendar
       await this.openCalendar.click();
       
       // Select Check-In Date
       const checkInDate = moment().add(7,'days');
       const indateFormated = checkInDate.format('D, dddd, MMMM YYYY');
       const checkInSelector = `td[aria-label*="${indateFormated}"]`;
       await $(checkInSelector).click();

       //await browser.pause(1000)
       // // Select Check-Out Date
       const checkOutDate = moment(checkInDate).add(7, 'days');
       const outdateFormated = checkOutDate.format('D, dddd, MMMM YYYY');
       const checkOutSelector = `td[aria-label*="${outdateFormated}"]`;
       await $(checkOutSelector).click();
    }

    async setGuests() {
        await this.guestsButton.click();
        await this.addAdultButton.click();
        await this.addAdultButton.click();
        await this.addChildButton.click();
    }

    async clickSearchButton() {
        await this.searchButton.click();
        await browser.pause(2000);
    }

    async setExtraFilters(noOfBedrooms: number, withPool: boolean){
        await this.filters.click();
        await this.amenitiesShowMore.click();
        //await browser.maximizeWindow();
        await browser.pause(2000);

        if (withPool){
            await this.pool.click();
        }

        for(let roomIndex = 1; roomIndex <= noOfBedrooms; roomIndex++ ) {
            await this.bedrooms.click();
            
        }

        await this.applyFilters.click();
    }
}

export default new HomePage();