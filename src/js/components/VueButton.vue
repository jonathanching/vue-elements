<template>

    <component @click="trigger"
    :is="type"

    :id="id"
    :name="name"
    :placeholder="placeholder"
    :class="buttonStyles"
    :disabled="disabled"

    :href="href"
    :target="target"

    v-on="listeners">

        <i v-if="showIcon"
        :class="iconStyles"
        class="vue-button__icon"></i>

        <span v-if="showLabel"
        class="vue-button__label">{{ label }}</span>

    </component>

</template>
<script>

    /**
     * ==================================================================================
     * Vue Button Component
     * ==================================================================================
     **/

    export default {

        props: {

            /**
             * Specify the button label
             */
            label: {
                type: String,
                default: null,
            },

            /**
             * Specify button classes
             */
            buttonClasses: {
                type: Array,
                default: () => { return []; },
            },

            /**
             * Specify icon classes
             */
            iconClasses: {
                type: Array,
                default: () => { return []; },
            },


            /**
             * Attributes
             * ==========================================================================
             **/

            /**
             * Specify the `id` attribute
             */
            id: {
                type: String,
                default: null,
            },

            /**
             * Specify the `name` attribute
             */
            name: {
                type: String,
                default: 'name',
            },

            /**
             * Specify the `placeholder` attribute
             */
            placeholder: {
                type: String,
                default: 'Placeholder',
            },

            /**
             * Specify the `target` attribute. Automatically transforms the component type to a `anchor` element.
             * Disregards the `onClick` event when set.
             */
            href: {
                type: String,
                default: null,
            },

            /**
             * Specify the `target` attribute
             */
            target: {
                type: String,
                default: null,
            },

            /**
             * Indicates the button interactivity
             */
            disabled: {
                type: Boolean,
                default: false,
            },

            /**
             * Indicates the button's `loading` state
             */
            loading: {
                type: Boolean,
                default: false,
            },


            /**
             * Styles
             * ==========================================================================
             **/

            /**
             * Display button as flat (No border & shadow)
             */
            flat: {
                type: Boolean,
                default: false,
            },

            /**
             * Display button as block (Full width)
             */
            block: {
                type: Boolean,
                default: false,
            },

            /**
             * Display button as round
             */
            round: {
                type: Boolean,
                default: false,
            },

            /**
             * Display shadow
             */
            shadow: {
                type: Boolean,
                default: true,
            },


            /**
             * Sizes
             * ==========================================================================
             **/

            /**
             * Specify the size
             */
            size: {
                type: String,
                default: 'm',
                validator: function(value) {
                    return ['s', 'm', 'l'].indexOf(value) !== -1
                }
            },


            /**
             * Themes
             * ==========================================================================
             **/

            /**
             * Display `error` theme. Overwrites both `warning` & `success` states
             */
            error: {
                type: Boolean,
                default: false,
            },

            /**
             * Display `warning` theme. Overwrites `success` state
             */
            warning: {
                type: Boolean,
                default: false,
            },

            /**
             * Display `success` theme
             */
            success: {
                type: Boolean,
                default: false,
            },


            /**
             * Events/Functions
             * ==========================================================================
             **/

            /**
             * Event fired on button click
             */
            onClick: {
                type: Function,
                default: () => {},
            },


            /**
             * Settings/Options
             * ==========================================================================
             **/

            /**
             * Indicates if the button is clickable on `error` state
             */
            submitOnError: {
                type: Boolean,
                default: true,
            },

            /**
             * Indicates if the button will fire an `onClick` event upon button click
             */
            emitOnClick: {
                type: Boolean,
                default: false,
            },
        },

        computed: {

            /**
             * Returns either a `button` or `anchor` depending on the options, attributes, or properties set.
             * @return string
             */
            type: function() {
                /* Check for `href` attribute */
                if(this.href)
                    return 'a';

                return 'button';
            },


            /**
             * Complete button styles/classes
             * @return array
             */
            buttonStyles: function() {
                let classStr = [];

                /* Add `attribute` classes */
                classStr = classStr.concat(this.getAttributeClasses());
                /* Add `style` classes */
                classStr = classStr.concat(this.getStyleClasses());


                return classStr;
            },

            /**
             * Complete icon styles/classes
             * @return array
             */
            iconStyles: function() {
                let classStr = [];

                /* Add specified icon classes */
                classStr = classStr.concat(this.iconClasses);


                return classStr;
            },


            /**
             * Hide/Show icon element
             * @return boolean
             */
            showIcon: function() {
                /* Check icon classes*/
                if(this.iconClasses.length > 0)
                    return true;

                return false;
            },

            /**
             * Hide/Show label element
             * @return boolean
             */
            showLabel: function() {
                /* Check `label` props */
                if(this.label)
                    return true;

                return false;
            },


            /**
             * Bind all available listener of the `button`/`a` element to the component
             */
            listeners: function() {
                return {
                    ...this.$listeners
                };
            },
        },

        data: function() {
            return {
                //
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

            /**
             * On click event
             */
            trigger: function() {
                /* Check `trigger` event possibility */
                if(!this.canTrigger()) return;


                /* Fire event if `emit` settings is enabled */
                if(this.emitOnClick) {
                    this.$emit('onClick');
                }

                /* Fire specified `onClick` event */
                this.onClick();
            },


            /**
             * ==================================================================================
             * @Controllers
             * ==================================================================================
             **/

            //


            /**
             * ==================================================================================
             * @Getter/Setter
             * ==================================================================================
             **/

            /**
             * Get all `style` specific classes
             * @return array
             */
            getStyleClasses: function() {
                let result = [];

                /* Add theme classes */
                if(this.error) result.push('vue-button--error');
                if(this.success) result.push('vue-button--success');
                if(this.warning) result.push('vue-button--warning');

                /* Add size classes */
                switch(this.size) {
                    case 's': case 'small': result.push('vue-button--small'); break;
                    case 'm': case 'medium': result.push('vue-button--medium'); break;
                    case 'l': case 'large': result.push('vue-button--large'); break;
                }

                /* Add style classes */
                if(this.block) result.push('vue-button--block');
                if(this.flat) result.push('vue-button--flat');
                if(this.round) result.push('vue-button--' + (this.label ? 'semi-round' : 'round'));
                if(this.shadow) result.push('vue-button--shadow');


                return result;
            },

            /**
             * Get all `attribute` specific classes
             * @return array
             */
            getAttributeClasses: function() {
                let result = [];

                /* Add button class */
                result.push('vue-button');
                /* Add specified button classes */
                result = result.concat(this.buttonClasses);

                /* Add `disabled` classes */
                if(this.disabled) result.push('vue-button--disabled');


                return result;
            },


            /**
             * ==================================================================================
             * @Checker
             * ==================================================================================
             **/

            /**
             * Check if `trigger` event can proceed
             * @return boolean
             */
            canTrigger: function() {
                /* Prevent event when type is not `button` */
                if(this.isAnchor()) return false;
                /* Prevent event on `loading` state */
                if(this.loading) return false;
                /* Prevent event on `disabled` state */
                if(this.disabled) return false;
                /* Prevent event on `error` state */
                if(!this.submitOnError && this.error) return false;

                return true;
            },

            /**
             * Check if component type is `button`
             * @return boolean
             */
            isButton: function() {
                return this.type == 'button';
            },

            /**
             * Check if component type is `anchor`
             * @return boolean
             */
            isAnchor: function() {
                return this.type == 'a';
            },
        },
    }
</script>