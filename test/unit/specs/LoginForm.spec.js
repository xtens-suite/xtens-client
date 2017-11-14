import { expect } from 'chai';
import Vue from 'vue';
// import { shallow } from 'vue-test-utils';

import LoginForm from '@/components/LoginForm.vue';

describe('LoginForm.vue', function() {

    describe('data()', function() {
        it('sets the correct default data', function() {
            expect(typeof LoginForm.data).to.equal('function');
            const defaultData = LoginForm.data();
            expect(defaultData.form).to.have.property('login', '');
            expect(defaultData.form).to.have.property('password', '');
            expect(defaultData.loginFailed).to.be.false;
            expect(defaultData.serverErrorOnLogin).to.be.false;
        });
    });

    describe('onError()', function() {

        it('sets loginFailed to true if the response status is Unauthorized', function() {
            const error = {
                response: {
                    status: 401,
                    data: {}
                }
            };
            const Constructor = Vue.extend(LoginForm);
            const vm = new Constructor();
            vm.onError(error);
            expect(vm.loginFailed).to.be.true;
        });

    });
});
