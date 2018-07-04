import Vue from 'vue';
import Router from 'vue-router';
import LoginForm from '@/components/LoginForm';
import SubjectList from '@/components/SubjectList';
import DataTypeList from '@/components/DataTypeList';
import DataTypeEdit from '@/components/DataTypeEdit';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        /*
        {
            path: '/',
            name: 'Hello',
            component: HelloWorld
        }, */
        {
            path: '/login',
            name: 'LoginForm',
            component: LoginForm,
            props: true
        },
        {
            path: '/subjects',
            name: 'SubjectList',
            component: SubjectList,
            props: true
        },
        {
            path: '/data-types',
            name: 'DataTypeList',
            component: DataTypeList,
            props: true
        },
        {
            path: '/data-type/:id',
            name: 'DataTypeEdit',
            component: DataTypeEdit,
            props: true
        }
    ]
});
