import {expect, test} from '@playwright/test'

test.beforeEach(async({page})=>{
    await page.goto('/')
})

test('slider selection by updating attribute value',async({page})=>{
    const tempDragerBtn = await page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')

    // first focus your element by scrollto ecaxt location
    await page.locator('[tabtitle="Temperature"] ngx-temperature-dragger').scrollIntoViewIfNeeded()

    // Execute JavaScript code in the page, taking the matching element as an argument.
    await tempDragerBtn.evaluate(node =>{
        node.setAttribute('cx','232.6309')
        node.setAttribute('cy','232.6309')
    })
    // Always perform click action make event happen on UI level
    await tempDragerBtn.click()
    await expect(page.locator('[class="value temperature h1"]')).toContainText('30')
})

test('slider selection using mouse movement',async({page})=>{
    const tempDragerBox = await page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
    // first focus your element by scrollto ecaxt location
    await page.locator('[tabtitle="Temperature"] ngx-temperature-dragger').scrollIntoViewIfNeeded()

    /*
    This method returns the bounding box of the element matching the locator, 
    or null if the element is not visible. The bounding box is calculated relative 
    to the main frame viewport - which is usually the same as the browser window.
    **/

    const box = await tempDragerBox.boundingBox()
    const x = box.x + box.width / 2
    const y = box.y + box.height / 2
    await page.mouse.move(x,y)
    await page.mouse.down()
    await page.mouse.move(x+100,y)
    await page.mouse.move(x+100,y+100)
    await page.mouse.up()
    await expect(tempDragerBox).toContainText('30')
})