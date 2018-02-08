import { isEmpty, uniq, flatten } from 'lodash';
import axios from 'axios';

import { WHEEL, ADMIN, STANDARD, ALL_PROJETCS } from '@/utils/constants';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR, GET_PROJECTS_SUCCESS } from '@/store/mutation-types';
import { logIn } from '@/api/auth-api';
import { getProjects } from '@/api/project-api';
import router from '@/router';

/**
 * @method
 * @name computePrivilege2ProjectMap
 * @param{Object} user - a user Object
 */
function computePrivilege2ProjectMap(user) {
    const privilege2ProjectMap = {};
    privilege2ProjectMap[ADMIN] = [];
    privilege2ProjectMap[STANDARD] = [];

    for (const group of user.groups) {
        if (group.privilegeLevel === WHEEL) {
            privilege2ProjectMap[ADMIN].push(group.projects.map(proj => proj.id));
        } else {
            privilege2ProjectMap[group.privilegeLevel].push(group.projects.map(proj => proj.id));
        }
    }
    return privilege2ProjectMap;
}

const state = {
    isPending: false,
    user: null,
    token: null,
    error: null,
    /*
    adminProjects: [],
    isWheel: false,
    isAdmin: false,
    canAccessPersonalData: false,
    canAccessSensitiveData: false,
    */
    projects: [],
    activeProject: ALL_PROJETCS

};

const getters = {
    user: state => state.user,
    isAuthenticated: state => state.user !== null,
    hasToken: state => state.token !== null,
    error: state => state.error,

    isWheel: state => {
        const { user } = state;
        if (isEmpty(user)) return false;
        return user.groups.map(item => item.privilegeLevel).indexOf(WHEEL) > -1;
    },

    isAdmin: state => {
        const { user } = state;
        if (isEmpty(user)) return false;
        const privilegeLevels = user.groups.map(item => item.privilegeLevel);
        return privilegeLevels.indexOf(WHEEL) > -1 || privilegeLevels.indexOf(ADMIN) > -1;
    },

    adminProjects: state => {
        const { user } = state;
        if (isEmpty(user)) return [];
        return uniq(flatten(computePrivilege2ProjectMap(user)[ADMIN]));
    },

    canAccessPersonalData: state => {
        const { user } = state;
        if (isEmpty(user)) return false;
        return user.groups.map(group => group.canAccessPersonalData).indexOf(true) > -1;
    },

    canAccessSensitiveData: state => {
        const { user } = state;
        if (isEmpty(user)) return false;
        return user.groups.map(group => group.canAccessSensitiveData).indexOf(true) > -1;
    },

    projects: state => state.projects,
    activeProject: state => state.activeProject

};

const actions = {

    async authenticate({commit, state}, payload) {
        commit(LOGIN_REQUEST);
        try {
            let res = await logIn(payload);
            commit(LOGIN_SUCCESS, res.data);

            res = await getProjects();
            commit(GET_PROJECTS_SUCCESS, res.data);

            router.push('/subjects');
        } catch (err) {
            const { response } = err;
            commit(LOGIN_ERROR, response);
        }
    },

    storeUserInfo({commit, state}, userInfo) {
        commit(LOGIN_SUCCESS, userInfo);
    }

};

const mutations = {

    [LOGIN_REQUEST](state) {
        state.isPending = true;
    },

    [LOGIN_SUCCESS](state, { user, token }) {
        state.isPending = false;
        // state.user = user;
        state.user = user;
        state.token = token;
        state.error = null;

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    },

    [GET_PROJECTS_SUCCESS](state, projects) {
        state.isPending = false;
        state.projects = projects;
    },

    [LOGIN_ERROR](state, errorResponse) {
        state.isPending = false;
        state.user = null;
        state.token = null;
        state.error = {
            status: errorResponse && errorResponse.status
        };
        state.projects = [];
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
