import { REMOTE_REQUEST, SUBJECTS_SUCCESS, REMOTE_ERROR } from '@/store/mutation-types';
import * as api from '@/api/records-api';

const state = {

    isPending: false,

    subjects: [],
    samples: [],
    data: [],

    error: null
};

const getters = {
    subjects: state => state.subjects
};

const actions = {

    async getSubjects({commit, state}, activeProject) {
        commit(REMOTE_REQUEST);
        try {
            const res = await api.getSubjects(activeProject);
            commit(SUBJECTS_SUCCESS, res.data);
        } catch (err) {
            const { response } = err;
            commit(REMOTE_ERROR, response);
        }
    }

};

const mutations = {

    [REMOTE_REQUEST](state) {
        state.isPending = true;
    },

    [SUBJECTS_SUCCESS](state, subjects) {
        state.isPending = false;
        state.subjects = subjects;
    },

    [REMOTE_ERROR](state, errorResponse) {
        state.isPending = false;
        state.error = errorResponse;
    }

};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
