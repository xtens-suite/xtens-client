import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import LoginForm from '@/components/LoginForm';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Hello',
            component: HelloWorld
        },
        {
            path: '/login',
            name: 'LoginForm',
            component: LoginForm,
            props: true
        }
    ]
});
