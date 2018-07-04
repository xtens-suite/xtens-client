import { expect } from 'chai';
import sinon from 'sinon';
import { shallow } from '@vue/test-utils';

import store from '@/store';
import router from '@/router';
import AppNavbar from '@/components/subcomponents/AppNavbar';

const appNavbarProps = {
    login: 'Pippo',
    userId: 1,
    isAuthenticated: true
};

describe('AppNavbar.vue', function() {

    let dstub, pstub;

    beforeEach(function() {
        dstub = sinon.stub(store, 'dispatch');
        pstub = sinon.stub(router, 'push');
    });

    afterEach(function() {
        dstub.restore();
        pstub.restore();
    });

    it('renders the user name in the appropriate <em> tag', function() {
        const wrapper = shallow(AppNavbar, {
            propsData: appNavbarProps
        });
        expect(wrapper.find('#navbarUsername').text()).to.equal(appNavbarProps.login);
    });

    it('renders the user profile dropdown if client not authenticated', function() {
        const wrapper = shallow(AppNavbar, {
            propsData: appNavbarProps
        });
        expect(wrapper.find('#navbarUserProfileDropdown').exists()).to.be.true;
    });

    it('does not render the user profile dropdown if client not authenticated', function() {
        const wrapper = shallow(AppNavbar);
        expect(wrapper.find('#navbarUserProfileDropdown').exists()).to.be.false;
    });

    describe('methods', function() {

        describe('signOut', function() {

            let wrapper;

            beforeEach(function() {
                wrapper = shallow(AppNavbar, {
                    propsData: appNavbarProps,
                    store,
                    router
                });
            });

            it('dispatches an account/signOut event', function() {
                wrapper.find('#navbarSignOut').trigger('click');
                expect(dstub.calledOnce).to.be.true;
                expect(dstub.calledWithExactly('account/signOut')).to.equal(true);
            });

            it('redirects the client to the /login address', function() {
                wrapper.find('#navbarSignOut').trigger('click');
                expect(pstub.calledOnce).to.be.true;
                expect(pstub.calledWithExactly('login')).to.equal(true);
            });

        });

    });

});
