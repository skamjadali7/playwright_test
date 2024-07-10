import {test as base} from '@playwright/test'
export type TestOptions = {
    globalQAurl:string
}
export const test = base.extend<TestOptions>({
    globalQAurl: ['',{option:true}]
})