<template>
    <b-navbar toggleable="md" type="dark" variant="info">
        <b-navbar-toggle target="navCollapse" />

        <b-navbar-brand class="logo" href="#">XTENS</b-navbar-brand>

        <b-collapse is-nav id="navCollapse">

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
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
import ProjectSelector from '@/components/subcomponents/ProjectSelector';

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
