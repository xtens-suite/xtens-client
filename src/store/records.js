import { REMOTE_REQUEST, SUBJECTS_SUCCESS, REMOTE_ERROR } from '@/store/mutation-types';
import * as api from '@/api/records-api';
import { parseLinkHeader } from '@/utils/funcs';

const state = {

    isPending: false,

    subjects: [],
    samples: [],
    data: [],

    paginationInfo: {
        currentPage: 0
    },

    error: null
};

const getters = {
    subjects: state => state.subjects,
    paginationInfo: state => state.paginationInfo
};

const actions = {

    async getSubjects({commit, state}, payload) {
        commit(REMOTE_REQUEST);
        try {
            const res = await api.getSubjects(payload);
            commit(SUBJECTS_SUCCESS, {
                subjects: res.data,
                headers: res.headers
            });
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

    [SUBJECTS_SUCCESS](state, {subjects = [], headers = {}}) {
        console.log(headers);
        state.isPending = false;
        state.subjects = subjects;
        state.paginationInfo = {
            currentPage: Number.parseInt(headers['x-current-page']),
            pageSize: Number.parseInt(headers['x-page-size']),
            totalItems: Number.parseInt(headers['x-total-count']),
            totalPages: Number.parseInt(headers['x-total-pages']),
            links: parseLinkHeader(headers['link'])
        };
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
