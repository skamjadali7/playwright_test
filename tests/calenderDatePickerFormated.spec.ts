import {test} from '@playwright/test'
import { Navigations } from './page-object/sideNavigation';
import { Calender } from './page-object/calenderPicker';
test('common date picker',async({page})=>{
    const datePicker = new Navigations(page)
    const calender = new Calender(page)
    await page.goto('http://localhost:4200/');
    await datePicker.datePicketNivgation()
    await calender.commonDatePicker("1")
})