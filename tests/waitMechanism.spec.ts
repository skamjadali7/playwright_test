import {expect, test} from '@playwright/test'
const waitURL = process.env.URL ?? ''  // Define the URL by .env process

test.beforeEach(async({page})=>{
    await page.goto(waitURL)
})

test('auto wait mechanisim with waitFor state',async({page})=>{
    await page.locator('#ajaxButton').click()
    const successText = page.locator('.bg-success')
     // waiting as per state
    await successText.waitFor({state:"attached"})
   await expect(successText).toHaveText('Data loaded with AJAX get request.')
})

test('auto wait mechanisim with default timeout',async({page})=>{
    await page.locator('#ajaxButton').click()
    const successText = page.locator('.bg-success')
    
    await expect(successText).toHaveText('Data loaded with AJAX get request.',{timeout:10000})
})

test('alternative wait with element',async({page})=>{
    await page.locator('#ajaxButton').click()
    const successText = page.locator('.bg-success')
    await page.waitForSelector('.bg-success')
    await expect(successText).toHaveText('Data loaded with AJAX get request.')
})

test('alternative wait for response',async({page})=>{
    await page.locator('#ajaxButton').click()
    const successText = page.locator('.bg-success')
    await page.waitForResponse('http://uitestingplayground.com/ajaxdata')
    await expect(successText).toHaveText('Data loaded with AJAX get request.')
})

test('alternative wait for network call completed',async({page})=>{  // not ideal but we can check 
    await page.locator('#ajaxButton').click()
    const successText = page.locator('.bg-success')
    await page.waitForLoadState('networkidle')
    await expect(successText).toHaveText('Data loaded with AJAX get request.')
})