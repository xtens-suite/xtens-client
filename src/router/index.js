import Vue from 'vue';
import Router from 'vue-router';

const LoginForm = () => import('@/components/LoginForm');
const SubjectList = () => import('@/components/SubjectList');
const DataTypeList = () => import('@/components/DataTypeList');
const DataTypeEdit = () => import('@/components/DataTypeEdit');

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
