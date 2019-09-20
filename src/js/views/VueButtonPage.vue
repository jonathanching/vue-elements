<template>

	<page-section id="vue-button-page">

		<div slot="content" class="page__content">

            <template v-for="attr in ['', 'success', 'warning', 'error']">

                <div>
                    <vue-button :success="attr == 'success'" :warning="attr == 'warning'" :error="attr == 'error'"
                    :href="!type ? 'https://github.com/jonathanching?tab=repositories' : null"
                    :target="!type ? '_blank' : null"
                    :label="label"
                    :size="size"
                    :shadow="shadow"
                    :icon-classes="icon"></vue-button>
                    <vue-button :success="attr == 'success'" :warning="attr == 'warning'" :error="attr == 'error'"
                    :href="!type ? 'https://github.com/jonathanching?tab=repositories' : null"
                    :target="!type ? '_blank' : null"
                    :round="true"
                    :label="label"
                    :size="size"
                    :shadow="shadow"
                    :icon-classes="icon"></vue-button>
                    <vue-button :success="attr == 'success'" :warning="attr == 'warning'" :error="attr == 'error'"
                    :href="!type ? 'https://github.com/jonathanching?tab=repositories' : null"
                    :target="!type ? '_blank' : null"
                    :round="true"
                    :size="size"
                    :shadow="shadow"
                    :icon-classes="['fa', 'fa-home']"></vue-button>
                    <vue-button :success="attr == 'success'" :warning="attr == 'warning'" :error="attr == 'error'"
                    :href="!type ? 'https://github.com/jonathanching?tab=repositories' : null"
                    :target="!type ? '_blank' : null"
                    :flat="true"
                    :label="label"
                    :size="size"
                    :shadow="shadow"
                    :icon-classes="icon"></vue-button>
                </div>

            </template>

		</div>

		<div slot="controls" class="page__controls">

            <div class="controls__item">
                <p class="controls__item__label">Label</p>
                <input v-model="label" type="text" name="label">
            </div>

            <div class="controls__item">
                <p class="controls__item__label">Shadow</p>
                <input v-model="shadow" type="radio" name="shadow" :value="true"><span>Show</span>
                <input v-model="shadow" type="radio" name="shadow" :value="false"><span>Hide</span>
            </div>

            <div class="controls__item">
                <p class="controls__item__label">Icon</p>
                <input v-model="icon" type="radio" name="icon" :value="['fa', 'fa-home']"><span>Show</span>
                <input v-model="icon" type="radio" name="icon" :value="[]"><span>Hide</span>
            </div>

            <div class="controls__item">
                <p class="controls__item__label">Size</p>
                <input v-model="size" type="radio" name="size" value="s"><span>Small</span>
                <input v-model="size" type="radio" name="size" value="m"><span>Medium</span>
                <input v-model="size" type="radio" name="size" value="l"><span>Large</span>
            </div>

            <div class="controls__item">
                <p class="controls__item__label">Type</p>
                <input v-model="type" type="radio" name="type" :value="true"><span>Button</span>
                <input v-model="type" type="radio" name="type" :value="false"><span>Anchor</span>
            </div>

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

    import VueButton from '../components/VueButton.vue';

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
            'vue-button': VueButton,
        },

        mixins: [
            //
        ],

        data () {
            return {
                label: 'Button',
                shadow: true,
                icon: [],
                size: 'm',
                type: true,
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
