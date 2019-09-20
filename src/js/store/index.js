import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


/**
 * ==================================================================================
 * Setup VUEX
 * ==================================================================================
 **/

export default new Vuex.Store({
    state: {
        projects: [],
    },

    getters: {

        /**
         * Find project by name
         * @param  string name
         * @return object
         */
        findByName: (state) => (name) => {
            return state.projects.filter(project => project.name == name)[0];
        },
    },

    mutations: {

        /**
         * Set projects array
         * @param array array
         */
        setProjects: (state, array) => {
            state.projects = array.filter(project => project.name);
        },
    },

});