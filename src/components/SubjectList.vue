<template>
    <div id="main">
        <h1>Subject List</h1>
        <b-table striped hover :items="records" />
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { find } from 'lodash';

import { ALL_PROJETCS } from '@/utils/constants';

export default {

    computed: {
        ...mapGetters({
            projects: 'account/projects',
            activeProject: 'account/activeProject',
            records: 'records/subjects'
        })
    },

    methods: {},

    mounted() {
        const { projects } = this;
        const activeProject = this.activeProject !== ALL_PROJETCS ? find(projects, { name: this.activeProject }) : undefined;
        this.$store.dispatch('records/getSubjects', activeProject);
    }
};
</script>
