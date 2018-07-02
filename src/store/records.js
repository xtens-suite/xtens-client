import { find } from 'lodash';

import {
    REMOTE_REQUEST, SUBJECTS_SUCCESS, REMOTE_ERROR, DATA_TYPES_SUCCESS,
    DATA_TYPE_SUCCESS
} from '@/store/mutation-types';
import * as api from '@/api/records-api';
import { parseLinkHeader } from '@/utils/funcs';

const state = {

    isPending: false,

    dataTypes: [],

    subjects: [],
    samples: [],
    data: [],

    currentDataTypeId: 0,
    isMultiProject: false,

    paginationInfo: {
        currentPage: 0
    },

    error: null
};

const getters = {
    // lists
    dataTypes: state => state.dataTypes,
    subjects: state => state.subjects,

    // single instances/records
    dataType: state => find(state.dataTypes, {id: state.currentDataTypeId}),
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
    },

    async getDataTypeForEdit({commit, state}, payload) {
        try {
            console.log('records.getDataTypeForEdit - committing REMOTE_REQUEST');
            commit(REMOTE_REQUEST);
            console.log('records.getDataTypeForEdit - committed REMOTE_REQUEST');
            const dataTypeRes = await api.getDataType({id: payload.id});
            console.log(`records.getDataTypeForEdit - DataTypeRes is: ${JSON.stringify(dataTypeRes)}`);
            const dataType = dataTypeRes.data;
            console.log(`records.getDataTypeForEdit - DataType is: ${JSON.stringify(dataType)}`);
            console.log(`records.getDataTypeForEdit - SuperType ID is: ${JSON.stringify(dataType.superType.id)}`);
            const dataTypesRes = await api.getDataTypes();
            const metaRes = await api.getSuperTypeMeta(dataType.superType.id);
            console.log(`records.getDataTypeForEdit - Data Types are:: ${JSON.stringify(dataTypesRes.data)}`);
            console.log(`records.getDataTypeForEdit - Meta is: ${JSON.stringify(metaRes.data)}`);
            const commitParams = {
                dataType,
                dataTypes: dataTypesRes.data,
                meta: metaRes.data
            };
            console.log(`Meta is: ${JSON.stringify(commitParams.meta)}`);
            commit(DATA_TYPES_SUCCESS, commitParams);
            return 'success';
        } catch (err) {
            const { response } = err;
            console.log(`records.getDataTypeForEdit - Error caught: ${response}`);
            commit(REMOTE_ERROR, response);
            return 'failure';
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

    [DATA_TYPE_SUCCESS](state, {
        dataType = {},
        dataTypes = [],
        meta: {
            isMultiProject = false
        } = {}
    }) {
        state.isPending = false;
        state.dataType = {
            ...dataType,
            superType: {
                ...dataType.superType,
                isMultiProject
            }
        };
        state.dataTypes = dataTypes;
        state.paginationInfo = {};
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
