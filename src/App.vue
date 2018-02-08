<template>
  <div id="app">
    <app-navbar />
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import AppNavbar from '@/components/AppNavbar.vue';

const USER_INFO = 'userInfo';

export default {

    name: 'app',

    components: {
        appNavbar: AppNavbar
    },

    computed: {
        ...mapGetters({
            'user': 'account/user',
            'token': 'account/token'
        })
    },

    created() {
        let userInfo;

        if (!window.sessionStorage) return;

        // retrieve user session info from sessionStorage on page reload (if available)
        if (window.sessionStorage.getItem(USER_INFO)) {
            try {
                userInfo = JSON.parse(window.sessionStorage.getItem(USER_INFO));
            } catch (err) {
                console.log(`Error caught: ${err.message}`);
            }
        }
        window.sessionStorage.removeItem(USER_INFO);

        // TODO: add some validation step to the userInfo object
        this.$store.dispatch('account/storeUserInfo', userInfo);
    },

    beforeDestroy() {
        const userInfo = JSON.stringify({
            user: this.user,
            token: this.token
        });
        console.log(`User Info is: ${userInfo}`);
        window.sessionStorage.setItem(USER_INFO, userInfo);
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
