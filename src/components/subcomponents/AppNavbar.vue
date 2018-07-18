<template>
    <b-navbar toggleable="md" type="dark" variant="info">
        <b-navbar-toggle target="navCollapse" />

        <b-navbar-brand class="logo" href="#">XTENS</b-navbar-brand>

        <b-collapse is-nav id="navCollapse">

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">

                <b-nav-item-dropdown id="" v-if="isAdmin" text="Admin Pages">
                    <b-dropdown-item href="/data-types">Data Types</b-dropdown-item>
                </b-nav-item-dropdown>

                <div v-if="isAuthenticated">
                    <b-button @click="openProjectModal" >{{ activeProject }}</b-button>
                    <project-selector ref="activeProjectSelector" :projects="projects" />
                </div>

                <b-nav-item-dropdown id="navbarUserProfileDropdown" v-if="isAuthenticated" right>
                    <template slot="button-content">
                        <em id="navbarUsername">{{ login }}</em>
                    </template>
                    <b-dropdown-item id="navbarProfile" href="#">Profile</b-dropdown-item>
                    <b-dropdown-item id="navbarSignOut" @click.prevent="signOut" href="#">Signout</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>
<script>
import Vue from 'vue';
import bNavbar from 'bootstrap-vue/es/components/navbar/navbar';
import bNavbarNav from 'bootstrap-vue/es/components/navbar/navbar-nav';
import bNavbarBrand from 'bootstrap-vue/es/components/navbar/navbar-brand';
import bNavbarToggle from 'bootstrap-vue/es/components/navbar/navbar-toggle';
import bNavItemDropdown from 'bootstrap-vue/es/components/nav/nav-item-dropdown';
import bDropDownItem from 'bootstrap-vue/es/components/dropdown/dropdown-item';
import bCollapse from 'bootstrap-vue/es/components/collapse/collapse';
import bButton from 'bootstrap-vue/es/components/button/button';

import ProjectSelector from '@/components/subcomponents/ProjectSelector';

Vue.component('b-navbar', bNavbar);
Vue.component('b-navbar-nav', bNavbarNav);
Vue.component('b-navbar-brand', bNavbarBrand);
Vue.component('b-navbar-toggle', bNavbarToggle);
Vue.component('b-nav-item-dropdown', bNavItemDropdown);
Vue.component('b-dropdown-item', bDropDownItem);
Vue.component('b-collapse', bCollapse);
Vue.component('b-button', bButton);

export default {

    components: {
        projectSelector: ProjectSelector
    },
    /*
    data() {
        return {
            selectedProject: null
        };
    }, */

    props: {
        login: String,
        userId: Number,
        isAuthenticated: Boolean,
        isAdmin: Boolean,
        projects: Array,
        activeProject: String
    },

    /*
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
    }, */

    methods: {

        signOut() {
            this.$store.dispatch('account/signOut');
            this.$router.push('login');
        },

        openProjectModal() {
            this.$refs.activeProjectSelector.openModal();
        }
    }

};
</script>
<style scoped lang="scss">
$logo-border-radius: 4px;
.logo {
    border: 2px solid #fff;
    padding: 0.01em $logo-border-radius;
    border-radius: $logo-border-radius;
    font-weight: bolder;
}
</style>
