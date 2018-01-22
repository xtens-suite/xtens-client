import { expect } from 'chai';

import superUser from '../fixtures/users/superUser.json';

import { LOGIN_REQUEST, LOGIN_SUCCESS, GET_PROJECTS_SUCCESS, LOGIN_ERROR } from '@/store/mutation-types';
import account from '@/store/account';
import * as authApi from '@/api/auth-api';
import * as projApi from '@/api/project-api';
const projects = [];

describe('account', function() {

    const testCorrectCredentials = {
        identifier: 'Geeno',
        password: 'suck£r'
    };
    const testWrongCredentials = {
        identifier: 'Geeno',
        password: 'Mouck3r'
    };

    const testToken = '$0m3f4k3tøk3n';

    const loginApiResponse = {
        data: {
            user: superUser,
            token: testToken
        }
    };

    const testError = {};

    describe('getters', function() {

        describe('isAuthenticated', function() {

            it('returns true if user is not null', function() {
                const state = {
                    user: superUser
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
                    user: superUser,
                    token: testToken
                };
                expect(account.getters.hasToken(state)).to.be.true;
            });

            it('returns false if token is null', function() {
                const state = {
                    user: superUser,
                    token: null
                };
                expect(account.getters.hasToken(state)).to.be.false;
            });

        });

        describe('error', function() {

            it('returns the error property', function() {
                const state = {
                    user: superUser,
                    token: testToken,
                    error: testError
                };
                expect(account.getters.error(state)).to.eql(testError);
            });

        });

        describe('isWheel', function() {

            it('returns false if user is empty', function() {
                const state = {
                    user: {},
                    token: null
                };
                expect(account.getters.isWheel(state)).to.be.false;
            });

            it('returns true if user is superuser', function() {
                const state = {
                    user: superUser,
                    token: null
                };
                expect(account.getters.isWheel(state)).to.be.true;
            });

        });

        describe('isAdmin', function() {

            it('returns false if user is empty', function() {
                const state = {
                    user: {},
                    token: null
                };
                expect(account.getters.isAdmin(state)).to.be.false;
            });

            it('returns true if user is superuser', function() {
                const state = {
                    user: superUser,
                    token: null
                };
                expect(account.getters.isAdmin(state)).to.be.true;
            });

        });

        describe('adminProjects', function() {

            it('returns an empty array if user is empty', function() {
                const state = {
                    user: {},
                    token: null
                };
                expect(account.getters.adminProjects(state)).to.eql([]);
            });

            it('returns the list of projects IDs of the SuperAdmin group', function() {
                const state = {
                    user: superUser,
                    token: null
                };
                expect(account.getters.adminProjects(state)).to.eql(superUser.groups[0].projects.map(proj => proj.id));
            });

        });

        describe('canAccessPersonalData', function() {

            it('returns false if user is empty', function() {
                const state = {
                    user: {},
                    token: null
                };
                expect(account.getters.canAccessPersonalData(state)).to.be.false;
            });

            it('returns true if user is superuser', function() {
                const state = {
                    user: superUser,
                    token: null
                };
                expect(account.getters.canAccessPersonalData(state)).to.be.true;
            });

        });

        describe('canAccessSensitiveData', function() {

            it('returns false if user is empty', function() {
                const state = {
                    user: {},
                    token: null
                };
                expect(account.getters.canAccessSensitiveData(state)).to.be.false;
            });

            it('returns true if user is superuser', function() {
                const state = {
                    user: superUser,
                    token: null
                };
                expect(account.getters.canAccessSensitiveData(state)).to.be.true;
            });

        });

        describe('projects', function() {
            it('returns the projects property of the state', function() {
                const state = {
                    user: {},
                    token: null,
                    projects: [],
                    activeProject: {}
                };
                expect(account.getters.projects(state)).to.eql(state.projects);
            });
        });

        describe('activeProject', function() {
            it('returns the activeProject property of the state', function() {
                const state = {
                    user: {},
                    token: null,
                    projects: [],
                    activeProject: {}
                };
                expect(account.getters.activeProject(state)).to.eql(state.activeProject);
            });
        });

    });

    describe('mutations', function() {

        describe('LOGIN_REQUEST', function() {

            it('sets the isPending property of the state to true', function() {
                const state = {};
                account.mutations[LOGIN_REQUEST](state);
                expect(state.isPending).to.be.true;
            });

        });

        describe('LOGIN_SUCCESS', function() {

            it('sets the user and token property of the state', function() {
                const state = {};
                account.mutations[LOGIN_SUCCESS](state, {
                    user: superUser,
                    token: testToken
                });
                expect(state.user).to.eql(superUser);
                expect(state.token).to.equal(testToken);
            });

            it('sets the error to null and isPending to false', function() {
                const state = {};
                account.mutations[LOGIN_SUCCESS](state, {
                    user: superUser,
                    token: testToken
                });
                expect(state.error).to.be.null;
                expect(state.isPending).to.be.false;
            });

        });

        describe('GET_PROJECTS_SUCCESS', function() {

            it('writes into the state the projects object and sets isPending to false', function() {
                const state = {
                    user: superUser,
                    token: testToken,
                    isPending: true,
                    error: null
                };

                account.mutations[GET_PROJECTS_SUCCESS](state, projects);
                expect(state.isPending).to.be.false;
                expect(state.projects).to.eql(projects);
            });

        });

        describe('LOGIN_ERROR', function() {

            it('writes the error object and sets isPending to false', function() {
                const state = {
                    user: superUser,
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

            let commit, logInFnc, getProjectsFnc, payload, state;

            beforeEach(function() {
                commit = sinon.stub();
                logInFnc = sinon.stub(authApi, 'logIn');
                getProjectsFnc = sinon.stub(projApi, 'getProjects').returns({
                    data: projects
                });
                logInFnc.withArgs(testCorrectCredentials).returns(loginApiResponse);
                logInFnc.withArgs(testWrongCredentials).throws();
                payload = {};
                state = {};
            });

            afterEach(function() {
                logInFnc.restore();
                getProjectsFnc.restore();
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

            it('commits a GET_PROJECTS_SUCCESS event', function(done) {
                account.actions.authenticate({
                    commit,
                    state
                }, testCorrectCredentials).then(() => {
                    expect(commit.calledWithExactly(GET_PROJECTS_SUCCESS, projects)).to.be.true;
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
