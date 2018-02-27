<template>
    <b-modal ref="projectSelectorModal" title="Select Project">
        <p>Changing project, all unsaved data will be lost.</p>
        <b-form-checkbox v-model="changeEnabled"  />
        <b-form-group v-if="changeEnabled" horizontal
            :label-cols="4"
            breakpoint="md"
            label="Please select a project"
            label-for="activeProjectSelect">
            <b-form-select id="activeProjectSelect" v-model="selectedProject"
                :options="projOpts" @change="activeProjectOnChange"
            />
        </b-form-group>
    </b-modal>
</template>
<script>
export default {

    data() {
        return {
            changeEnabled: false,
            selectedProject: ''
        };
    },

    props: {
        projects: Array
    },

    computed: {
        projOpts() {
            const opts = this.projects.map(proj => {
                return {
                    value: proj.id,
                    text: proj.name
                };
            });
            opts.push({
                value: null,
                text: 'All Projects'
            });
            return opts;
        }
    },

    methods: {

        activeProjectOnChange() {
            // TODO set this on Submit not on change
            this.$store.dispatch('account/changeActiveProject', this.selectedProject);
            this.$refs.projectSelectorModal.hide();
        }

    }
};
</script>
