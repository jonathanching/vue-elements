<template>

	<page-section id="sort-table-page"
    :control-label="'console'">

		<div slot="content" class="page__content">

            <sortable-table
            :headers="headers"
            :items="items"

            @sorted="setItem"

            ></sortable-table>

		</div>
        <div slot="controls" class="page__controls">

            <div class="controls__item">
                <p class="controls__item__label">Items</p>
            </div>
            <pre>{{ items }}</pre>

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

    import SortableTable from '../components/SortableTable.vue';

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
            'sortable-table': SortableTable,
        },

        mixins: [
            //
        ],

        data () {
            return {
                headers: ['name', 'occupation'],
                items: [
                    { id: 1, name: "April Douglas", occupation: 'Health Educators' },
                    { id: 2, name: "Ronald Mcbride", occupation: 'Mental Health Counselors' },
                    { id: 3, name: "Kassandra Donovan", occupation: 'Makeup Artists' },
                    { id: 4, name: "Yosef Hartman", occupation: 'Theatrical and Performance' },
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

            /**
             * Set items
             * @param {array} item
             */
            setItem: function(item) {
                this.items = item;
            },


            /**
             * ==================================================================================
             * @Checker
             * ==================================================================================
             **/

            //
        },
    }
</script>
