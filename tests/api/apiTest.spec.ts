import {expect, test} from '@playwright/test'
import tags from '../../mock-api-data/tags.json'
import { request } from 'http'


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
    // Login
    const login = await request.post('https://conduit-api.bondaracademy.com/api/users/login',{
        data: {
            "user":{"email":"test123_1@test.com","password":"test@1"}
        }
    })
    const response = await login.json()
    const accessToken = await response.user.token

    // Create Article 
    const createArticle = await request.post('https://conduit-api.bondaracademy.com/api/articles/',{
        data : {
            "article": {"title":"New Article 1","description":"About Playwright Test","body":"Hey this playwright api test POST request one","tagList":[]}
        },
        headers :{
            Authorization : `Token ${accessToken}`
        }
    })

    const articleResponse = await createArticle.json()
    const slugAccess = await articleResponse.article.slug

    // Delete Article   
    await request.delete('https://conduit-api.bondaracademy.com/api/articles/'+`${slugAccess}`,{
        headers:{
            Authorization : `Token ${accessToken}`
        }
    })
})