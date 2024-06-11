import {test} from '@playwright/test'

test.beforeEach(async({page})=>{
    await page.goto('http://localhost:4200/');
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('common locators',async({page})=>{
    // by tag name
    page.locator('input')

    // by Id
    page.locator('#inputEmail1')

    // by class Name
    page.locator('.shape-rectangle')

    // by attribute value 
    await page.locator('[placeholder="Email"]').first().click()

    // by partial text
    page.locator(':text("Using")')

    // by full text
   page.locator(':text-is("Using the grid")')
})

test('user facing locators',async({page})=>{
    await page.getByRole('textbox',{name:"Jane Doe"}).click()
    await page.getByRole('button',{name:"Sign In"}).first().click();

    await page.getByLabel('Email address').click()

    await page.getByText('Inline form').isVisible()

    await page.getByTitle('IoT Dashboard').click();
})

test('locating child elements',async({page})=>{
    // First way
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()

    // Second way 
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()

    // Third way for button selecting woth get method type
    await page.locator('nb-card').getByRole('button',{name:"Sign in"}).first().click();
})