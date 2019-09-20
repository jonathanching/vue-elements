import Vue from 'vue';

Vue.mixin({

    methods: {

        /**
         * Find and return the `route` depending on specified name
         * @param  {string}  name
         * @param  {boolean} type
         * @return {$route}
         */
        redirectTo: function(name, type = true) {
            let route = this.$store.getters.findByName(name);

            if(route)
                return type ? route.path : route;

            return '';
        },


        /**
         * ==================================================================================
         * @Getter/Setter
         * ==================================================================================
         **/

        /**
         * Get logo asset's path
         * @return {String}
         */
        getLogo: function() {
            return this.getAssetPath() + '/images/vue.svg';
        },



        /**
         * Get asset path
         * @return {String}
         */
        getAssetPath: function() {
            return './';
        },

        /**
         * Get current `route` object
         * @return {$route}
         */
        getCurrentRoute: function() {
            return this.$store.getters.findByName(this.$route.name);
        },

        /**
         * Get current `route` name
         * @return {String}
         */
        getCurrentRouteName: function() {
            let route = this.getCurrentRoute();
            return route ? route.name : null;
        },

        /**
         * Get current `route` title
         * @return {String}
         */
        getCurrentRouteTitle: function() {
            let route = this.getCurrentRoute();
            return route ? route.title : null;
        },

        /**
         * Get current `route` description
         * @return {String}
         */
        getCurrentRouteDesc: function() {
            let route = this.getCurrentRoute();
            return route ? route.desc : null;
        },



        /**
         * ==================================================================================
         * @Checker
         * ==================================================================================
         **/

         //
    },
});