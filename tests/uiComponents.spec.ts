import {expect, test} from '@playwright/test'

// In this we use force:true query becoz those elemetns are hidden

// This will run in entrie file
test.beforeEach(async({page})=>{
    await page.goto('http://localhost:4200/');
})
// this is specific test suite
test.describe('Input Filed and Radio Validation',()=>{
    // before running this suite it will run above beforeEach for url and then this beforeEach hook
    test.beforeEach(async({page})=>{
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    // Actual Test 
    test('form input filed validation',async({page})=>{
        const usingGridEmailFiled = await page.locator('nb-card',{hasText: "Using the Grid"}).getByRole('textbox',{name:"Email"})

        await usingGridEmailFiled.fill('test@test.com');
        await usingGridEmailFiled.clear()
        await usingGridEmailFiled.pressSequentially('test1@test.com',{delay:500}) // here we will enter each char in deplay of .5sec late sequentially

        // Generic Assetion
        const entredValue = await usingGridEmailFiled.inputValue()
        await expect(entredValue).toEqual('test1@test.com')

        // Locator Assertion
        await expect(usingGridEmailFiled).toHaveValue('test1@test.com')
    })

    test('form radio label validation',async({page})=>{
        const usingGridForm = await page.locator('nb-card',{hasText:"Using the Grid"})
        
        await usingGridForm.getByRole('radio',{name:"Option 1"}).check({force:true})
        const radioBtn1Status = await usingGridForm.getByRole('radio',{name:"Option 1"}).isChecked()
        // Validation with True or False
        await expect(radioBtn1Status).toBeTruthy

        // Validation with toChecked() inbuild method
        await expect(usingGridForm.getByRole('radio',{name:"Option 1"})).toBeChecked()


        // Second Validation by clicking Option 2 and check Option 1 is not checked

        await usingGridForm.getByRole('radio',{name:"Option 2"}).check({force: true});
        const radioBtn2Status = await usingGridForm.getByRole('radio',{name:"Option 2"}).isChecked()
        // Validation
        await expect(usingGridForm.getByRole('radio',{name:"Option 2"})).toBeChecked()
        await expect(radioBtn2Status).toBeTruthy()    
        
    })
})

test.describe('CheckBox Validation',()=>{
    test.beforeEach('Select Side Menu Modal & Overlays',async({page})=>{
        await page.getByText('Modal & Overlays').click()
        await page.getByText('Toastr').click()
    })

    test('Check and Uncheck Box',async({page})=>{
        const checkBox = await page.getByRole('checkbox',{name:"Hide on click"})
        //check 
        await checkBox.check({force:true})
        // uncheck
        await checkBox.uncheck({force:true})
    })

    test('check uncheck all list of elements',async({page})=>{
        const checkBox = await page.getByRole('checkbox').all() // this will result all the checkbox in array list

        for (let ch of checkBox){
            await ch.uncheck({force:true}) // uncan make it checkas well
            expect(ch.isChecked()).toBeFalsy
        }
    })
})

test.describe('list and Dropdown',()=>{
    test('select drop down option',async({page})=>{
        page.getByRole('list') // This will applicable when the list has UL tag
        page.getByRole('listitem') // This will applicable when list has LI tag

        const dropDownMenu = await page.locator('ngx-header nb-select')
        await dropDownMenu.click();
        const list = ['Light','Dark','Cosmic','Corporate']
        const dropMenuOptions = await page.locator('nb-option-list nb-option') // For lsit of drop options
        expect(dropMenuOptions).toHaveText(list)
    })

    test('select all dropOptions and validate',async({page})=>{
        const colorCode = {
            "Light" : "rgb(255, 255, 255)",
            "Dark" : "rgb(34, 43, 69)",
            "Cosmic" : "rgb(50, 50, 89)",
            "Corporate" : "rgb(255, 255, 255)"
        }
        const dropDownMenu = await page.locator('ngx-header nb-select')
        const dropMenuOptions = await page.locator('nb-option-list nb-option')
        const header = page.locator('nb-layout-header')
        await dropDownMenu.click();

        for (let menu in colorCode){
            await dropMenuOptions.filter({hasText: menu}).click()
            await expect(header).toHaveCSS('background-color',colorCode[menu])
            if (menu != 'Corporate'){
                await dropDownMenu.click()
            }
        }
        
    })
})

test.describe('tool tip',()=>{
    test.beforeEach('Select side menu Modal and Tooltip',async({page})=>{
        await page.getByText('Modal & Overlays').click()
        await page.getByText('Tooltip').click()
    })
    
    test('validating tool tip',async({page})=>{
        const tooltipPlacementBox = await page.locator('nb-card').getByRole('button',{name: "Right"})
        await tooltipPlacementBox.hover()
        
        page.getByRole('tooltip') // this locator can be used but in this application it it not supported
        const tooltipTxt = await page.locator('nb-tooltip').textContent()
        await expect(tooltipTxt).toEqual('This is a tooltip');

    })
})

test.describe('Dailog box',()=>{
    test.beforeEach('Select side menu Tables and Smart Tables',async({page})=>{
        await page.getByText('Tables & Data').click()
        await page.getByText('Smart Table').click()
    })
    
    test('validating browser dailogbox on data table',async({page})=>{

         // To handle browser side dailog box we need to have an listener event to accept
         page.on('dialog', dailog=>{
            expect(dailog.message()).toEqual('Are you sure you want to delete?')
            dailog.accept()
        })
        const tableFirstElement = await page.getByRole('table').locator('tr',{hasText:"@mdo"}).locator('.nb-trash')
        await tableFirstElement.click()
        // Verify the deleted 
        await expect(page.locator('tbody tr').first()).not.toHaveText('@mdo')
    })
})