import {test as setup } from '@playwright/test'
import user from '../.auth/user.json'
import fs from 'fs'

const authFile = '.auth/user.json'

setup('authentication',async({page,request})=>{
    /**
     * This is for UI login Authientication Handling 
     */
    // await page.goto('https://conduit.bondaracademy.com/')
    // await page.getByText('Sign in').click()
    // await page.locator('[placeholder="Email"]').fill('test123_1@test.com')
    // await page.locator('[placeholder="Password"]').fill('test@1')
    // await page.getByRole('button').click()
    // await page.waitForResponse('https://conduit-api.bondaracademy.com/api/tags')

    // await page.context().storageState({path:authFile})
        
        /**
     * This is for api side login Authientication Handling 
     */

        const login = await request.post('https://conduit-api.bondaracademy.com/api/users/login',{
            data: {
                "user":{"email":"test123_1@test.com","password":"test@1"}
            }
        })
        const response = await login.json()
        const accessToken = await response.user.token

        // maintaining the token
        user.origins[0].localStorage[0].value = accessToken
        
        fs.writeFileSync(authFile,JSON.stringify(user))

        //storing access toek globally using process environment
        process.env['ACCESS_TOKEN'] = accessToken
})