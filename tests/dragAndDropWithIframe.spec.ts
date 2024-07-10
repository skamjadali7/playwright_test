import {test} from './../test-options'

test.beforeEach(async({page,globalQAurl})=>{
    await page.goto(globalQAurl)
})

test('drag and drop on iframe in using dragTo()',async({page})=>{
    const frame = await page.frameLocator('[rel-title="Photo Manager"] iframe')
    const imageIcon = await frame.locator('li h5',{hasText:"High Tatras 2"})
    const dragLoc = await frame.locator('#trash')
    await imageIcon.dragTo(dragLoc)
})

test('drag and drop on iframe using mouse action',async({page})=>{
    const frame = await page.frameLocator('[rel-title="Photo Manager"] iframe')
    const imageIcon = await frame.locator('li h5',{hasText:"High Tatras 4"})
    const dragLoc = await frame.locator('#trash')
    await imageIcon.hover()
    await page.mouse.down()
    await dragLoc.hover()
    await page.mouse.up()
})