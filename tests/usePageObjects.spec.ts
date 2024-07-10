import {test} from '@playwright/test'
import { Navigations } from '../page-object/sideNavigation'
test.beforeEach(async({page})=>{
    await page.goto('/')
})

test('naviagte each sidemenu',async({page})=>{
    const navigate = new Navigations(page)
    await navigate.datePicketNivgation()
    await navigate.formLayoutNavigation()
    await navigate.smartTablesNavigation()
    await navigate.toastrNavigation()
    await navigate.tooltipNavigation()
})