<template>

    <div id="app">

        <section class="app__header">
            <div class="app__header__logo">
                <img :src="getLogo()">
            </div
            ><div class="app__header__content">

                <h1 class="app__header__title">VUE Elements</h1>
                <p class="app__header__body">
                    A collection of vue elements with added functionality/feature to be used primarily as a base framework for feasibility testing or as a base element
                </p>

            </div>

        </section>

        <div class="app__content">

            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>

        </div>

    </div>

</template>
<script>

    /**
     * ==================================================================================
     * Main VUE Component
     * ==================================================================================
     **/

    export default {
        props: {
            //
        },

        computed: {
            //
        },

        data: function() {
            return {
                //
            };
        },

        mounted: function() {
            this.init();

            this.testScript();
        },

        methods: {

            init: function() {
                this.setStore();
            },


            /**
             * ==================================================================================
             * @Methods
             * ==================================================================================
             **/

            //


            /**
             * ==================================================================================
             * @Getter/Setter
             * ==================================================================================
             **/

            /**
             * Set VUEX variables
             */
            setStore: function() {
                this.$store.commit('setProjects', this.$router.options.routes);
            },


            /**
             * ==================================================================================
             * @Checker
             * ==================================================================================
             **/

            //




            /**
             * ==================================================================================
             * @DEVELOPMENT
             * ==================================================================================
             **/

            testScript: function() {
                //
            },
        }
    };
</script>