// import { isEmpty } from 'lodash';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR } from '@/store/mutation-types';
import { logIn } from '@/api/auth-api';

const state = {
    isPending: false,
    user: null,
    token: null,
    error: null
};

const getters = {
    isAuthenticated: state => state.user !== null,
    hasToken: state => state.token !== null,
    error: state => state.error
};

const actions = {

    async authenticate({commit, state}, payload) {
        commit(LOGIN_REQUEST);
        try {
            const res = await logIn(payload);
            commit(LOGIN_SUCCESS, res.data);
        } catch (err) {
            const { response } = err;
            commit(LOGIN_ERROR, response);
        }
    }

};

const mutations = {

    [LOGIN_REQUEST](state) {
        state.isPending = true;
    },

    [LOGIN_SUCCESS](state, { user, token }) {
        state.isPending = false;
        state.user = user;
        state.token = token;
        state.error = null;
    },

    [LOGIN_ERROR](state, errorResponse) {
        state.isPending = false;
        state.user = null;
        state.token = null;
        state.error = {
            status: errorResponse && errorResponse.status
        };
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
