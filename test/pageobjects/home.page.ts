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
    }
}

export default new HomePage();