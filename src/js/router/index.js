import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);


/**
 * ==================================================================================
 * Setup VUE Router
 * ==================================================================================
 **/

/**
 * Define VUE components
 * ==================================================================================
 **/

//


/**
 * Define VUE pages
 * ==================================================================================
 **/

const Home = () => import('../views/Home.vue');

const VueButtonPage = () => import('../views/VueButtonPage.vue');
const VueSelectPage = () => import('../views/VueSelectPage.vue');
const SortTablePage = () => import('../views/SortTablePage.vue');


/**
 * Setup VUE Routes
 * ==================================================================================
 **/

export default new VueRouter({

    /**
     * Set to `history` to remove hasbang (#!) on URL
     */
    // mode: 'history',

    routes: [
        { path: '/', component: Home, name: 'Home' },
        { path: '*', redirect: { name: Home }},

        {
            path: '/vue-button', component: VueButtonPage, name: 'VueButtonPage',
            label: 'VUE Button', title: 'vue-button',
            desc: 'Simple button w/ added features mostly base on the <button> element',
        },
        {
            path: '/vue-select', component: VueSelectPage, name: 'VueSelectPage',
            label: 'VUE Select', title: 'vue-select',
            desc: 'Custom select field w/ search and multi-select features',
        },
        {
            path: '/sortable-table', component: SortTablePage, name: 'SortTablePage',
            label: 'Sortable Table', title: 'sortable-table',
            desc: '<table> element w/ draggable rows for sorting',
        },
    ]
});