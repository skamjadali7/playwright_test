import { Page, expect } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class Calender extends HelperBase{
    constructor(page:Page){
        super(page)
    }

    async commonDatePicker (day:string) {
    const commonDatePicker = await this.page.getByPlaceholder('Form Picker')
    commonDatePicker.click()
    await this.page.locator('[class="day-cell ng-star-inserted"]').getByText(day,{exact:true}).click()
    // {exact:true} taken bcoz text of 1 is partial search with result 1,11,12,13...19 so to match excat search used this query
    //Assertion
    expect(commonDatePicker).toHaveValue('Jun 1, 2024')
    }
}