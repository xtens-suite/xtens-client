import { expect } from 'chai';

import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR } from '@/store/mutation-types';
import account from '@/store/account';
import * as authApi from '@/api/auth-api';

describe('account', function() {

    const testCorrectCredentials = {
        identifier: 'Geeno',
        password: 'suck£r'
    };
    const testWrongCredentials = {
        identifier: 'Geeno',
        password: 'Mouck3r'
    };

    const testUser = {};
    const testToken = '$0m3f4k3tøk3n';

    const loginApiResponse = {
        data: {
            user: testUser,
            token: testToken
        }
    };

    const testError = {};

    describe('getters', function() {

        describe('isAuthenticated', function() {

            it('returns true if user is not null', function() {
                const state = {
                    user: testUser
                };
                expect(account.getters.isAuthenticated(state)).to.be.true;
            });

            it('returns false if user is null', function() {
                const state = {
                    user: null
                };
                expect(account.getters.isAuthenticated(state)).to.be.false;
            });

        });

        describe('hasToken', function() {

            it('returns true if the token is not null', function() {
                const state = {
                    user: testUser,
                    token: testToken
                };
                expect(account.getters.hasToken(state)).to.be.true;
            });

            it('returns false if token is null', function() {
                const state = {
                    user: testUser,
                    token: null
                };
                expect(account.getters.hasToken(state)).to.be.false;
            });

        });

        describe('error', function() {

            it('returns the error property', function() {
                const state = {
                    user: testUser,
                    token: testToken,
                    error: testError
                };
                expect(account.getters.error(state)).to.eql(testError);
            });

        });

    });

    describe('mutations', function() {

        describe('LOGIN_REQUEST()', function() {

            it('sets the isPending property of the state to true', function() {
                const state = {};
                account.mutations[LOGIN_REQUEST](state);
                expect(state.isPending).to.be.true;
            });

        });

        describe('LOGIN_SUCCESS()', function() {

            it('sets the user and token property of the state', function() {
                const state = {};
                account.mutations[LOGIN_SUCCESS](state, {
                    user: testUser,
                    token: testToken
                });
                expect(state.user).to.eql(testUser);
                expect(state.token).to.equal(testToken);
            });

            it('sets the error to null and isPending to false', function() {
                const state = {};
                account.mutations[LOGIN_SUCCESS](state, {
                    user: testUser,
                    token: testToken
                });
                expect(state.error).to.be.null;
                expect(state.isPending).to.be.false;
            });

        });

        describe('LOGIN_ERROR()', function() {

            it('writes the error object and sets isPending to false', function() {
                const state = {
                    user: testUser,
                    token: testToken,
                    isPending: true,
                    error: null
                };
                const ERROR_STATUS = 500;
                account.mutations[LOGIN_ERROR](state, {
                    status: ERROR_STATUS
                });
                expect(state.user).to.be.null;
                expect(state.token).to.be.null;
                expect(state.error).to.eql({
                    status: ERROR_STATUS
                });
                expect(state.isPending).to.be.false;
            });

        });

    });

    describe('actions', function() {

        describe('authenticate()', function() {

            let commit, logInFnc, payload, state;

            beforeEach(function() {
                commit = sinon.stub();
                logInFnc = sinon.stub(authApi, 'logIn');
                logInFnc.withArgs(testCorrectCredentials).returns(loginApiResponse);
                logInFnc.withArgs(testWrongCredentials).throws();
                payload = {};
                state = {};
            });

            afterEach(function() {
                logInFnc.restore();
            });

            it('commits a LOGIN_REQUEST mutation', function(done) {
                account.actions.authenticate({
                    commit,
                    state
                }, payload).then(() => {
                    expect(commit.calledWithExactly(LOGIN_REQUEST)).to.be.true;
                    done();
                }).catch(err => {
                    done(err);
                });
            });

            it('commits a LOGIN_SUCCESS mutation', function(done) {
                account.actions.authenticate({
                    commit,
                    state
                }, testCorrectCredentials).then(() => {
                    expect(commit.calledWithExactly(LOGIN_SUCCESS, loginApiResponse.data)).to.be.true;
                    done();
                }).catch(err => {
                    done(err);
                });
            });

            it('commits a LOGIN_ERROR mutation if an error occurs on auth', function(done) {
                account.actions.authenticate({
                    commit,
                    state
                }, testWrongCredentials).then(() => {
                    expect(commit.calledWith(LOGIN_ERROR)).to.be.true;
                    done();
                }).catch(err => {
                    done(err);
                });
            });

        });

    });

});
