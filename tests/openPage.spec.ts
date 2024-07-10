import {test} from '@playwright/test'

test.beforeEach(async({page})=>{
    await page.goto('/');
    await page.getByText('Forms').click()
})

test.describe('open form page',()=>{
    test('open both form page',async({page})=>{
        await page.getByText('Form Layouts').click()
     })
})

test.describe('open datepicker',()=>{
    test('open both datepicker', async({page})=>{
        await page.getByText('Datepicker').click()
    })
})
