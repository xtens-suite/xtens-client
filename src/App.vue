<template>
  <div id="app">
    <app-navbar />
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import AppNavbar from '@/components/subcomponents/AppNavbar.vue';

const USER_INFO = 'userInfo';

export default {

    name: 'app',

    components: {
        appNavbar: AppNavbar
    },

    computed: {
        ...mapGetters({
            'userInfo': 'account/userInfo'
        })
    },

    created() {

        window.addEventListener('beforeunload', this.leaving);

        if (!sessionStorage || !sessionStorage.getItem(USER_INFO)) {
            this.$router.push('login');
            return;
        }

        try {
            const userInfo = JSON.parse(window.sessionStorage.getItem(USER_INFO));
            sessionStorage.removeItem(USER_INFO);

            // TODO: add some validation step to the userInfo object
            this.$store.dispatch('account/storeUserInfo', userInfo);
        } catch (err) {
            console.log(`Error caught: ${err.message}`);
            this.$router.push('login');
        }

        console.log('App.created() - done!');
    },

    destroyed() {
        window.removeEventListener('beforeunload', this.leaving);
    },

    methods: {

        leaving() {
            const userInfo = JSON.stringify(this.userInfo);
            console.log(`User Info is: ${userInfo}`);
            sessionStorage.setItem(USER_INFO, userInfo);
        }

    }

};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
