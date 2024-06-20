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

test('customize calender selection',async({page})=>{
    const commonDatePicket = await page.getByPlaceholder('Form Picker')
    commonDatePicket.click()

    let date = new Date()
    date.setDate(date.getDate()+7)
    const expectedDate = date.getDate().toString()
    const expectedMonthShort = date.toLocaleString('En-US',{month:'short'})
    const expectedMonthLong = date.toLocaleString('En-US',{month:'long'})
    const expectedYear = date.getFullYear()
    const datetoAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`

    let calenderMonthAndYear = await page.locator('nb-calendar-view-mode button').textContent()
    const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`

    while(!calenderMonthAndYear?.includes(expectedMonthAndYear)){
        await page.locator('button.next-month').click()  // for future date selection
        calenderMonthAndYear = await page.locator('nb-calendar-view-mode button').textContent()
    }

    await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate,{exact:true}).click()
    await expect(commonDatePicket).toHaveValue(datetoAssert)
})