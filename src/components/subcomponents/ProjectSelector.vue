<template>
    <b-modal id="activeProjectSelectorModal" hide-footer ref="projectSelectorModal" title="Select Project">
        <p class='alert-danger'>Changing project, all unsaved data will be lost.</p>
        <div>
            <b-form-checkbox ref="changeEnabledCheckbox" v-model="changeEnabled">Enable project selection.</b-form-checkbox>
        </div>
        <b-form>
            <div v-if="changeEnabled">
                <b-form-group horizontal :label-cols="4" breakpoint="md"
                    label="Please select a project" label-for="activeProjectSelect">
                    <b-form-select id="activeProjectSelect" v-model="selectedProject"
                        :options="projOpts" />
                </b-form-group>
                <b-button @click="changeActiveProject">Submit Change</b-button>
            </div>
        </b-form>
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
                    value: proj.name,
                    text: proj.name
                };
            });
            opts.push({
                value: '',
                text: 'All Projects'
            });
            return opts;
        }
    },

    methods: {

        changeActiveProject() {
            // TODO set this on Submit not on change
            this.$store.dispatch('account/changeActiveProject', this.selectedProject);
            this.$root.$emit('bv::hide::modal', 'activeProjectSelectorModal');
        },

        openModal() {
            this.$root.$emit('bv::show::modal', 'activeProjectSelectorModal');
        }

    }
};
</script>
