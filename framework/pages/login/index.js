const chai = require('chai');
const { assert } = require('chai');
const expect = chai.expect
chai.use(require('chai-string'));

class LoginPage {
    constructor(page) {
        this.page = page;
    }

    async performLogin(name, password) {
        await this.page.fill('#user-name', name)
        await this.page.fill('#password', password)
        await this.page.click('#login-button');
    }

    async perfromLoginExpectedSuccesfull(name, password) {
        await this.performLogin(name, password);
        assert.endsWith(this.page.url(), "inventory.html");
    }
}

module.exports = {
    LoginPage
}