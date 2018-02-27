const credentials = require('../secrets').testUserCredentials;

module.exports = {
    'login test with page refresh': function(browser) {
        const devServer = browser.globals.devServerURL;
        browser.url(`${devServer}/login`).waitForElementVisible('#app', 500);
        browser.expect.element('h1').text.to.equal('Account Login:');
        browser.expect.element('#login').to.be.present;
        browser.expect.element('#password').to.be.present;
        browser.setValue('#login', credentials.login);
        browser.setValue('#password', credentials.password);
        browser.submitForm('form');
        browser.waitForElementNotPresent('#login', 5000).waitForElementVisible('#main', 10000);
        browser.assert.urlEquals(`${devServer}/subjects`);
        browser.refresh();
        browser.waitForElementVisible('#main', 10000);
        // after refresh we should still be logged in
        browser.assert.urlEquals(`${devServer}/subjects`);
        browser.expect.element('#navbarUsername').text.to.equal(credentials.login);
        browser.end();

    },

    'login and logout': function(browser) {
        const devServer = browser.globals.devServerURL;
        browser.url(`${devServer}/login`).waitForElementVisible('#app', 500);
        browser.setValue('#login', credentials.login);
        browser.setValue('#password', credentials.password);
        browser.submitForm('form');
        browser.waitForElementNotPresent('#login', 5000).waitForElementVisible('#navbarUsername', 10000);
        browser.assert.urlEquals(`${devServer}/subjects`);
        browser.click('#navbarUsername').waitForElementVisible('#navbarSignOut', 5000);
        browser.click('#navbarSignOut').waitForElementNotPresent('#main', 5000);
        browser.assert.urlEquals(`${devServer}/login`);
        browser.end();
    }
};
