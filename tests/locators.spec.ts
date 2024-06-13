import {expect, test} from '@playwright/test'

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

test('locating parent elements',async({page})=>{
    // First way using "hastext"&"has" concept
    await page.locator('nb-card',{hasText: "Using the Grid"}).getByRole('textbox',{name:"Email"}).click();
    await page.locator('nb-card',{has: page.locator('#inputPassword2')}).getByRole('textbox',{name:"Password"}).click()

    // Second way using single filter and has concept
    await page.locator('nb-card').filter({hasText:"Basic form"}).getByRole('button',{name:"Submit"}).click()

    // Third way using multilevel filter with has and hasText concept
    await page.locator('nb-card').filter({hasText:"Remember me"}).filter({has: page.locator('#inputPassword3')})
    .getByRole('button',{name:"Sign in"}).click()

    // Fourth way
    await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox',{name:"Password"}).click()

})

test('Reusing the locators - formatting',async({page})=>{
    // Lets create simple Login validation for this 
    const blockForm = await page.locator('nb-card').filter({hasText:"Block form"})
    const Email =   await blockForm.getByLabel('Website')
    
    // Form Inputs
    await blockForm.locator('#inputFirstName').fill("Test")
    await blockForm.locator('#inputLastName').fill("Playwright")
    await blockForm.getByRole('textbox',{name:"Email"}).fill("test@test.com")
    await Email.fill("https://www.playright.com")
    await blockForm.getByRole('button',{name:"Submit"}).click()

    // assertion
    await expect(Email).toHaveValue("https://www.playright.com")
})

test('extracting values',async({page})=>{
    // Extracting single text value 
    const blockForm = await page.locator('nb-card').filter({hasText:"Block form"})
    const submitBtn = await blockForm.getByRole('button').textContent()
    await expect(submitBtn).toEqual("Submit")

    // Extracting All text value from list
    const usingGrid = await page.locator('nb-card').filter({hasText:"Using the Grid"})
    const allCheckBoxOptions = await usingGrid.locator('nb-radio').allTextContents();  // It will list all element in array ['Option 1','Option 2',...]
    await expect(allCheckBoxOptions).toContain('Option 1')

    // Input Value text extraction
    const webSite = blockForm.locator('#inputWebsite')
    await webSite.fill("text@test.com")
    const webValue = await webSite.inputValue();
    await expect(webValue).toEqual('text@test.com')

    // Attribute Value extraction
    const lastName = await blockForm.locator('#inputLastName').getAttribute('placeholder')
    await expect(lastName).toEqual('Last Name')


})