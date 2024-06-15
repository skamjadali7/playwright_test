import {expect, test} from '@playwright/test'

test.beforeEach(async({page})=>{
    await page.goto('http://localhost:4200/');
    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()
})

test('select Days from current Month {common datepicker}',async({page})=>{
    const commonDatePicker = await page.getByPlaceholder('Form Picker')
    commonDatePicker.click()

    await page.locator('[class="day-cell ng-star-inserted"]').getByText("1",{exact:true}).click()
    // {exact:true} taken bcoz text of 1 is partial search with result 1,11,12,13...19 so to match excat search used this query

    //Assertion
    expect(commonDatePicker).toHaveValue('Jun 1, 2024')
})