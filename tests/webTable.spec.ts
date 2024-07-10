import {expect, test} from '@playwright/test'

test.beforeEach(async({page})=>{
    await page.goto('/')
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()
})

test('get row and edit the email',async({page})=>{
    const tableRowEmail = page.getByRole('row',{name:"snow@gmail.com"})
    await tableRowEmail.locator('.nb-edit').click()
    await tableRowEmail.getByPlaceholder('Age').clear()
    await tableRowEmail.getByPlaceholder('Age').fill('21')
    await tableRowEmail.locator('.nb-checkmark').click()
})
test('{complex scenario}get row and edit ID',async({page})=>{
    await page.locator('.ng2-smart-pagination').getByText('2').click()
    const tableRowIDLevel = page.getByRole('row',{name:"14"}).filter({has:page.locator('td').nth(1).getByText('14')})
    await tableRowIDLevel.locator('.nb-edit').click()
    await page.locator('input-editor').getByPlaceholder('Last Name').clear()
    await page.locator('input-editor').getByPlaceholder('Last Name').fill('test123')
    await page.locator('.nb-checkmark').click()
    await expect(tableRowIDLevel.locator('td').nth(3)).toHaveText('test123')
})

test('filter search result on table',async({page})=>{
    // search filter on age

    let ages = ["20","30","40","100"]
    for (let age of ages){
        await page.locator('input-filter').getByPlaceholder('Age').clear()
        await page.locator('input-filter').getByPlaceholder('Age').fill(age)
        await page.waitForTimeout(500) // table take some time to load the result

        const agesRow = await page.locator('tbody tr').all()
        // Validate the ages
        for (let row of agesRow){
            const cellValue = await row.locator('td').last().textContent()

            if (age =="100"){
                expect(await page.getByRole('table').textContent()).toContain('No data found')
            } else {
                expect(cellValue).toEqual(age)
            }
        }
    }
})