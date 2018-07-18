<template>
    <div id="main">
        <h1>Subject List</h1>
        <b-table striped hover paginate :items="records" :fields="fields" >
            <template slot="links" slot-scope="data">
                <div>
                    <a href="">Edit</a>
                    <a href="">New Derivative Sample</a>
                    <a href="">New Derivative Data</a>
                </div>
            </template>
        </b-table>
        <pagination record-type="subject" :projects="projects"
            :active-project="activeProject" :current-page="paginationInfo.currentPage"
            :total-items="paginationInfo.totalItems" :total-pages="paginationInfo.totalPages"
            :items-per-page="paginationInfo.pageSize" :links="paginationInfo.links" />
        <!--
        <b-pagination size="md" :total-rows="paginationInfo.totalCount" v-model="paginationInfo.currentPage"
            :per-page="paginationInfo.pageSize" />
        -->
    </div>
</template>
<script>
import find from 'lodash/find';

import Vue from 'vue';
import bTable from 'bootstrap-vue/es/components/table/table';
import { mapGetters } from 'vuex';

import { ALL_PROJECTS } from '@/utils/constants';
const Pagination = () => import('@/components/subcomponents/Pagination');

Vue.component('b-table', bTable);

export default {

    components: {
        pagination: Pagination
    },

    data() {
        return {
            fields: [
                {
                    key: 'code',
                    label: 'Code',
                    sortable: true
                },
                {
                    key: 'givenName',
                    label: 'Name',
                    sortable: true
                },
                {
                    key: 'surname',
                    label: 'Surname',
                    sortable: true
                },
                {
                    key: 'birthDate',
                    label: 'Birth Date',
                    sortable: true
                },
                {
                    key: 'sex',
                    label: 'Sex',
                    sortable: true
                },
                // virtual column for links
                {
                    key: 'links',
                    label: 'Links'
                }
            ]
        };
    },

    computed: {
        ...mapGetters({
            projects: 'account/projects',
            activeProject: 'account/activeProject',
            records: 'records/subjects',
            paginationInfo: 'records/paginationInfo'
        })
    },

    methods: {
        getSubjects() {
            const { projects } = this;
            const activeProject = this.activeProject !== ALL_PROJECTS ? find(projects, { name: this.activeProject }) : undefined;
            this.$store.dispatch('records/getSubjects', { activeProject });
        }
    },

    watch: {
        activeProject() {
            this.getSubjects();
        }
    },

    mounted() {
        this.getSubjects();
    }
};
</script>
