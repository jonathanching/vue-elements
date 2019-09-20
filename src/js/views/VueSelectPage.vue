<template>

	<page-section id="vue-select-page">

		<div slot="content" class="page__content">

            <vue-select v-model="value"
            :item-per-page="5"
            :items="list"
            :block="true"
            :multi="true"
            :emit-on-open="true"
            :emit-on-close="true">

                <template v-slot:default="props">
                    ({{ props.option.id }}) {{ props.option.label }}
                </template>

            </vue-select>

		</div>

	</page-section>

</template>
<script>

    /**
     * ==================================================================================
     * VUE Button Page
     *
     * ==================================================================================
     **/

    import PageSection from '../components/PageSection.vue';

    import VueSelect from '../components/VueSelect.vue';

    export default {

        props: {
            //
        },

        watch: {
            //
        },

        computed: {
            //
        },

        components: {
            'page-section': PageSection,
            'vue-select': VueSelect,
        },

        mixins: [
            //
        ],

        data () {
            return {
                value: '',

                list: [
                    'Alpha', 'Bravo', 'Charlie', 'Delta', 'Echo', 'Foxtrot',
                    'g', 'h' ,'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
                ],
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
        },
    }
</script>
