module.exports = {
    'login test with page refresh': function(browser) {

        const devServer = browser.globals.devServerURL;

        browser.url(`${devServer}/login`).waitForElementVisible('#app', 500);
        browser.expect.element('h1').text.to.equal('Account Login:');
        browser.expect.element('#login').to.be.present;
        browser.expect.element('#password').to.be.present;
        browser.setValue('#login', 'admin');
        browser.setValue('#password', 'admin1982');
        browser.submitForm();
        browser.end();

    }
};
