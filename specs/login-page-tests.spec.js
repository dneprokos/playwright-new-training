const playwright = require('playwright');
const config = require('config');
const { LoginPage } = require('../framework');
const { assert } = require('chai');

let page, browser, context;
const BASE_URL = config.get('Environment.baseUrl');

describe('PLAYWRIGHT - LOGIN PAGE TESTS', () => {
    beforeEach(async () => {
        browser = await playwright['chromium'].launch({ headless: false, slowMo: 250 })
        context = await browser.newContext()
        page = await context.newPage()
        await page.goto(BASE_URL);
    })

    afterEach(async function() {
        if (this.currentTest.state == 'failed') {
            await page.screenshot({ path: `results/${this.currentTest.title.replace(/\s+/g, '_')}.png` })
        }
        await browser.close()
    })

    it(`Perform succesfull login with Standard User`, async() => {
        //Arrange
        const loginPage = new LoginPage(page);
        const standardUser = config.get('Environment.standardUser');
        const password = config.get('Environment.password');

        //Act and Assert
        await loginPage.perfromLoginExpectedSuccesfull(standardUser, password);
    })

    it(`Perform unsuccesfull login`, async() => {
        //Arrange
        const loginPage = new LoginPage(page);
        const standardUser = 'fake_user'
        const password = 'fake_password';
        const expectedErrorText = "Epic sadface: Username and password do not match any user in this service";

        //Act
        await loginPage.performLogin(standardUser, password);

        //Assert
        const errorText = await page.innerText('//h3[@data-test]');
        assert.equal(errorText, expectedErrorText);
        assert.equal(page.url(), BASE_URL);
    })
})