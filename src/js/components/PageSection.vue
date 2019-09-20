<template>

	<div class="section">

		<div class="section__content">

            <div class="section__header">
                <h2 class="section__header__title">
                    <i class="section__header__icon fa fa-angle-left"></i>
                    {{ getCurrentRouteTitle() }}
                    <i class="section__header__icon fa fa-angle-right"></i>
                </h2>
                <h5 class="section__header__desc">{{ getCurrentRouteDesc() }}</h5>
            </div>

			<slot name="content"></slot>

            <span @click="back()"
            class="section__back">Back to list</span>

		</div>

		<div v-if="hasControls"
        :class="{
            'section__controls--visible': isControlOpen,
        }"
        class="section__controls">

            <p @click="toggle()"
            class="section__controls__btn">
                <i class="fa fa-plus"></i>
                {{ controlLabel }}
            </p>

			<slot name="controls"></slot>

		</div>

	</div>

</template>
<script>

    /**
     * ==================================================================================
     * Page Section base component
     *
     * ==================================================================================
     **/

    // import {Library} from '../Library.js';

    export default {
        props: {

            /**
             * Control label
             */
            controlLabel: {
                type: String,
                default: 'Controls'
            },
        },

        watch: {
            //
        },

        computed: {

            /**
             * Check if there `Controls` setup
             * @return {Boolean}
             */
            hasControls: function() {
                return this.$slots['controls'];
            },
        },

        mixins: [
            //
        ],

        data () {
            return {
                /**
                 * `Control Panel` state to show/hide
                 */
                isControlOpen: false,

                /**
                 * Delay on the opening of the `Control Panel` on page open
                 */
                controlPanelOpenDelay: 500,
            };
        },

        mounted: function() {
            this.init();
        },

        methods: {

            init: function() {
                setTimeout(this.toggle, this.controlPanelOpenDelay);
            },


            /**
             * ==================================================================================
             * @Controller
             * ==================================================================================
             **/

            /**
             * Show/Hide the control panel
             * @param {boolean} open
             */
            toggle: function(open = null) {
                let isOpen = open == null ? !this.isControlOpen : open;
                this.isControlOpen = isOpen;
            },

            /**
             * Redirect to Home page
             * @return {$route}
             */
            back: function() {
                this.toggle(false);
                this.$router.push(this.redirectTo('Home'));
            },


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