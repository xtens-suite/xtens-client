import { expect } from 'chai';
import sinon from 'sinon';
import { mount } from 'vue-test-utils';

// import Vue from 'vue';
// import Vuex from 'vuex';
// import bButton from 'bootstrap-vue/es/components/button/button';

import store from '@/store';
import LoginForm from '@/components/LoginForm.vue';
// import account from '@/store/account';

describe('LoginForm.vue', function() {

    describe('data()', function() {
        it('sets the correct default data', function() {
            expect(typeof LoginForm.data).to.equal('function');
            const defaultData = LoginForm.data();
            expect(defaultData.form).to.have.property('login', '');
            expect(defaultData.form).to.have.property('password', '');
        });
    });

    describe('onSubmit()', function() {

        let stub;

        beforeEach(function() {
            stub = sinon.stub(store, 'dispatch');
        });

        afterEach(function() {
            stub.restore();
        });

        it('triggers the account/authenticate() action when submit button is clicked', function() {
            const wrapper = mount(LoginForm, { store });
            const formWrapper = wrapper.find({ref: 'loginForm'});
            formWrapper.trigger('submit');
            expect(stub.calledOnce).to.equal(true);
            expect(stub.calledWith('account/authenticate')).to.equal(true);
        });

    });

});
