import {
    REMOTE_REQUEST, SUBJECTS_SUCCESS, REMOTE_ERROR, DATA_TYPES_SUCCESS
} from '@/store/mutation-types';
import * as api from '@/api/records-api';
import { parseLinkHeader } from '@/utils/funcs';

const state = {

    isPending: false,

    dataTypes: [],

    subjects: [],
    samples: [],
    data: [],

    paginationInfo: {
        currentPage: 0
    },

    error: null
};

const getters = {
    dataTypes: state => state.dataTypes,
    subjects: state => state.subjects,
    paginationInfo: state => state.paginationInfo
};

const actions = {

    async getDataTypes({commit, state}, payload) {
        commit(REMOTE_REQUEST);
        try {
            const res = await api.getDataTypes(payload);
            commit(DATA_TYPES_SUCCESS, {
                dataTypes: res.data,
                headers: res.headers
            });
        } catch (err) {
            const { response } = err;
            commit(REMOTE_ERROR, response);
        }
    },

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

    [DATA_TYPES_SUCCESS](state, {dataTypes = [], headers = {}}) {
        state.isPending = false;
        state.dataTypes = dataTypes;
        state.paginationInfo = {
            currentPage: Number.parseInt(headers['x-current-page']),
            pageSize: Number.parseInt(headers['x-page-size']),
            totalItems: Number.parseInt(headers['x-total-count']),
            totalPages: Number.parseInt(headers['x-total-pages']),
            links: parseLinkHeader(headers['link'])
        };
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
