import Vue from 'vue';
import Vuex from 'vuex';
import account from './account';
import records from './records';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    strict: debug,
    modules: {
        account,
        records
    }
});
