<template>

    <div id="home">

        <div class="home__project-list">
            <ul v-for="i in columnCount">
                <li v-for="project in projects.slice((i - 1) * itemsPerColumn, i * itemsPerColumn)">

                    <router-link :to="project.path">{{ project.label }}</router-link>
                    <p>{{ project.desc }}</p>

                </li>
            </ul>
        </div>

    </div>

</template>
<script>

    /**
     * ==================================================================================
     * Home Page VUE component
     * ==================================================================================
     **/

    export default {
        props: {
            //
        },

        computed: {

            /**
             * Get all projects
             * @return array
             */
            projects: function() {
                return this.$store.state.projects;
            },

            /**
             * Calculate column per item
             */
            columnCount: function() {
                return Math.ceil(this.projects.length / this.itemsPerColumn);
            },
        },

        data: function() {
            return {
                itemsPerColumn: 10,
            };
        },

        mounted: function() {
            this.init();
        },

        methods: {

            init: function() {
                //
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

            //


            /**
             * ==================================================================================
             * @Checker
             * ==================================================================================
             **/

            //
        }
    };
</script>