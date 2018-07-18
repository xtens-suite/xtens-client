<template>
    <b-modal id="activeProjectSelectorModal" hide-footer ref="projectSelectorModal" title="Select Project">
        <p class='alert-danger'>Changing project, all unsaved data will be lost.</p>
        <div>
            <b-form-checkbox ref="changeEnabledCheckbox" v-model="changeEnabled">Enable project selection.</b-form-checkbox>
        </div>
        <b-form v-if="changeEnabled">
            <div>
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
import Vue from 'vue';
import bModal from 'bootstrap-vue/es/components/modal/modal';
import bForm from 'bootstrap-vue/es/components/form/form';
import bFormGroup from 'bootstrap-vue/es/components/form-group/form-group';
import bFormSelect from 'bootstrap-vue/es/components/form-select/form-select';
import bButton from 'bootstrap-vue/es/components/button/button';
import bFormCheckbox from 'bootstrap-vue/es/components/form-checkbox/form-checkbox';

Vue.component('b-modal', bModal);
Vue.component('b-form', bForm);
Vue.component('b-form-group', bFormGroup);
Vue.component('b-form-select', bFormSelect);
Vue.component('b-button', bButton);
Vue.component('b-form-checkbox', bFormCheckbox);

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
