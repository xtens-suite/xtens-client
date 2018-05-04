<template>
    <div id="main">
        <h1>Data Type List</h1>
        <b-table striped hover paginate :items="records" :fields="fields" >
            <template slot="links" slot-scope="data">
                <div>
                    <a :href="`/data-type/${id}`">Edit</a>
                </div>
            </template>
        </b-table>
        <!--
        <pagination record-type="subject" :projects="projects"
            :active-project="activeProject" :current-page="paginationInfo.currentPage"
            :total-items="paginationInfo.totalItems" :total-pages="paginationInfo.totalPages"
            :items-per-page="paginationInfo.pageSize" :links="paginationInfo.links" />
        -->
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

import { ALL_PROJECTS } from '@/utils/constants';

import Pagination from '@/components/subcomponents/Pagination';

export default {

    components: {
        pagination: Pagination
    },

    data() {
        return {
            fields: [
                {
                    key: 'id',
                    label: 'ID',
                    sortable: true
                },
                {
                    key: 'name',
                    label: 'Name',
                    sortable: true
                },
                {
                    key: 'model',
                    label: 'Model',
                    sortable: true
                },
                {
                    key: 'parents',
                    label: 'Parent Data Types',
                    formatter: parents => {
                        return parents.map(parent => parent.name).join(', ');
                    }
                },
                {
                    key: 'project.name',
                    label: 'project',
                    sortable: true
                },
                {
                    key: 'links',
                    label: 'links'
                }
            ]
        };
    },

    computed: {
        ...mapGetters({
            projects: 'account/projects',
            activeProject: 'account/activeProject',
            records: 'records/dataTypes',
            paginationInfo: 'records/paginationInfo'
        })
    },

    methods: {
        getDataTypes() {
            const { projects } = this;
            const activeProject = this.activeProject !== ALL_PROJECTS ? find(projects, { name: this.activeProject }) : undefined;
            this.$store.dispatch('records/getDataTypes', { activeProject });
        }
    },

    watch: {
        activeProject() {
            this.getDataTypes();
        }
    },

    mounted() {
        this.getDataTypes();
    }

};
</script>
