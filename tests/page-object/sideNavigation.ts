import { Page } from "@playwright/test";

export class Navigations {
    readonly page: Page
    constructor (page:Page) {
        this.page =page
    }

    private async expandSideMenu (groupItemTitle :string) {
        const groupMenuItem = this.page.getByTitle(groupItemTitle)
        const expandableState = await groupMenuItem.getAttribute('aria-expanded')

        if (expandableState=='false'){
            await groupMenuItem.click()
        }
    }

    async formLayoutNavigation () {
        await this.expandSideMenu('Forms')
        await this.page.getByText('Form Layouts').click()
    }

    async datePicketNivgation () {
        await this.expandSideMenu('Forms')
        await this.page.getByText('Datepicker').click()
    }

    async tooltipNavigation() {
        await this.expandSideMenu('Modal & Overlays')
        await this.page.getByText('Tooltip').click()
    }

    async toastrNavigation() {
        await this.expandSideMenu('Modal & Overlays')
        await this.page.getByText('Toastr').click()
    }

    async smartTablesNavigation () {
        await this.expandSideMenu('Tables & Data')
        await this.page.getByText('Smart Table').click()
    }
}