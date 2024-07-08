import {expect, test} from '@playwright/test'
import tags from '../../mock-api-data/tags.json'
import { request } from 'http'

// test.beforeEach(async({page})=>{
//     await page.goto('https://conduit.bondaracademy.com/')
//     await page.getByText('Global Feed').click()
// })


test('mock api request',async({page})=>{
    await page.route('https://demo.playwright.dev/api-mocking/api/v1/fruits',async route =>{
        const json = [{ name: 'Strawberry', id: 21 },{ name: 'Mango', id: 3 },{ name: 'Apple', id: 5 }]
        await route.fulfill({
            status: 200,
            body: JSON.stringify(json)
        })
    })
    await page.goto('https://demo.playwright.dev/api-mocking')
    const subTitleText= await page.locator('h1.py-4').textContent()
    await expect(subTitleText).toContain('Render a List of Fruits')
})

test('post request',async({page,request})=>{
    // Create Article 
    const createArticle = await request.post('https://conduit-api.bondaracademy.com/api/articles/',{
        data : {
            "article": {"title":"New Article 1","description":"About Playwright Test","body":"Hey this playwright api test POST request one","tagList":[]}
        }
    })
    const articleResponse = await createArticle.json()
    const slugAccess = await articleResponse.article.slug

    // Delete Article   
    await request.delete('https://conduit-api.bondaracademy.com/api/articles/'+`${slugAccess}`,{})

    test('UI create article',async({page})=>{
        await page.locator('[routerlink="/editor"]').click()
        await page.getByPlaceholder('Article Title').fill('Article on Playwright')
        await page.getByPlaceholder("What's this article about?").fill('Playwright API Call')
        await page.getByPlaceholder("Write your article (in markdown)").fill("This is for Playwright article creation")
        await page.getByRole('button',{name:' Publish Article '}).click()
    })

    test('UI search and edit article',async({page})=>{
        const articleTitle = await page.locator('a h1').all()
        for (let title of articleTitle){
            const titleText = await title.locator('h1').textContent()
            if (titleText==='Article on Playwright'){
                await page.locator('.article-preview .preview-link h1').click()
            }
        }
    })
})