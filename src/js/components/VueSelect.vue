<template>

    <div ref="root"
    @focus="setFocus(true)" @click.self="setFocus(true)" @mouseleave="setFocus(false)"
    @keyup.enter="keyEnter()" @keyup.up="keyUp()" @keyup.down="keyDown()"

    :tabindex="tabindex"
    :id="id"
    :name="name"
    :class="selectStyles"

    v-on="listeners">

        <div class="vue-select__input">

            <template v-if="!showPlaceholder">
                <template v-if="multi">

                    <span v-for="(v, n) in _value"
                    class="vue-select__multi">

                        {{ v[labelColumn] }}

                        <!-- <i @click.self="setFocus(false)"
                        class="vue-select__multi__close">x</i> -->

                    </span>

                </template>
                <template v-else>

                    <span ref="labelfield"
                    class="vue-select__single">{{ _value }}</span>

                </template>
            </template>
            <span v-else
            class="vue-select__placeholder">{{ placeholder }}</span>


            <i ref="icon"
            :class="{
                'vue-select__icon--reversed': focused,
            }"
            class="vue-select__icon"></i>

        </div>

        <transition name="fade-to-top">
            <div v-show="showOption"
            class="vue-select__box">

                <input ref="searchfield" v-model="search"
                :placeholder="searchPlaceholder"
                type="text" class="vue-select__searchfield">

                <div ref="optionBox"
                class="vue-select__options">

                    <template v-if="hasItem">

                        <div v-for="(option, index) in _items"
                        @click="select(option)"

                        :data-index="index"
                        :class="{
                            'vue-select__options__item--selected': isSelected(option),
                            'vue-select__options__item--focus': index === options.focused,
                        }"

                        class="vue-select__options__item">

                            <template v-if="hasSlot">
                                <slot :option="option"></slot>
                            </template>
                            <template v-else>
                                {{ option[labelColumn] }}
                            </template>

                        </div>

                    </template>
                    <template v-else>
                        <p class="vue-select__options--msg">No items found</p>
                    </template>

                </div>

            </div>
        </transition>

    </div>

</template>
<script>

    /**
     * ==================================================================================
     * Vue Select Component
     * ==================================================================================
     **/

    export default {

        props: {

            /**
             * Binded prop on `v-model`
             */
            value: null,

            /**
             * Specify list of option items
             */
            items: {
                type: Array,
                default: () => { return []; },
            },

            /**
             * Specify select classes
             */
            selectClasses: {
                type: Array,
                default: () => { return []; },
            },

            /**
             * Column to get the value of the item.
             */
            idColumn: {
                type: String,
                default: 'id',
            },

            /**
             * Column to get the label of the item.
             */
            labelColumn: {
                type: String,
                default: 'label',
            },

            /**
             * Columns to compare the searchfield value on filter
             */
            searchColumn: {
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
             * Specify the tab `index` attribute
             */
            tabindex: {
                type: Number,
                default: 0,
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
             * Specify the searchfield's `placeholder` attribute
             */
            searchPlaceholder: {
                type: String,
                default: 'Search here...',
            },

            /**
             * Allow multiple selected item
             */
            multi: {
                type: Boolean,
                default: false,
            },

            /**
             * Indicates the select box interactivity
             */
            disabled: {
                type: Boolean,
                default: false,
            },

            /**
             * Indicates the select box interactivity
             */
            readonly: {
                type: Boolean,
                default: false,
            },


            /**
             * Styles
             * ==========================================================================
             **/

            /**
             * Display select as flat (No border & shadow)
             */
            flat: {
                type: Boolean,
                default: false,
            },

            /**
             * Display select as block (Full width)
             */
            block: {
                type: Boolean,
                default: false,
            },

            /**
             * Display select as round
             */
            round: {
                type: Boolean,
                default: false,
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
             * Indicates if the select will fire an `onSelect` event upon selection
             */
            emitOnSelect: {
                type: Boolean,
                default: false,
            },

            /**
             * Indicates if the select will fire a `close` event upon option box closing
             */
            emitOnClose: {
                type: Boolean,
                default: false,
            },

            /**
             * Indicates if the select will fire a `open` event upon option box opening
             */
            emitOnOpen: {
                type: Boolean,
                default: false,
            },


            /**
             * Options
             * ==========================================================================
             **/

            /**
             * Indicate the return type on `select` event
             */
            returnType: {
                type: String,
                default: 'id',
                validator: function(value) {
                    return ['id', 'label', 'object'].indexOf(value) !== -1
                }
            },

            /**
             * No. of items to be added per paginate.
             * If value specified is less than 0, show all option items
             */
            itemPerPage: {
                type: Number,
                default: 100,
            },

            /**
             * Indicate if the option items should refresh on prop `item` changes
             */
            syncItems: {
                type: Boolean,
                default: true,
            },

            /**
             * Specify pagination transition delay
             */
            transitionDelay: {
                type: Number,
                default: 100,
            },

            /**
             * Indicate if the `searchfield` will clear on option box closing
             */
            preserveSearch: {
                type: Boolean,
                default: false,
            },


            /**
             * !TODO
             * Indicate if the selected value should update on prop `value` changes
             */
            syncValue: {
                type: Boolean,
                default: true,
            },

            /**
             * !@TODO
             * Indicate if the option box element will close after `onSelect` event
             */
            closeOnSelect: {
                type: Boolean,
                default: true,
            },
        },

        watch: {

            items: function() {

                /**
                 * Checking of option item syncing
                 */
                if(this.syncItems)
                    this.setOptionBox();
            },

            search: function() {

                /**
                 * Checking of option item filtering
                 */
                if(!this.search || this.search.length == 0) {
                    this.options.filteredList = this.options.list;
                } else {
                    this.filter();
                }
            },
        },

        computed: {

            /**
             * Displayed selected value(s)
             * @return string|array
             */
            _value: function() {
                if(this.multi) {
                    return this.options.selected;
                } else {
                    return this.getLabel();
                }
            },

            /**
             * Final list of items to be shown on the option box
             * @return array
             */
            _items: function() {
                /* Check if set to show all items */
                if(this.itemPerPage <= 0)
                    return this.options.filteredList;


                let options = this.options.filteredList.slice(0);

                /* Cut the item to the current max number of items */
                return options.splice(0, this.paginationCount);
            },

            /**
             * Final column list for the `searchColumn` prop
             * @return array
             */
            _searchColumn: function() {
                if(this.searchColumn.length == 0)
                    return [this.labelColumn];

                return this.searchColumn;
            },


            /**
             * Complete select styles/classes
             * @return array
             */
            selectStyles: function() {
                let classStr = [];

                /* Add `attribute` classes */
                classStr = classStr.concat(this.getAttributeClasses());
                /* Add `style` classes */
                classStr = classStr.concat(this.getStyleClasses());


                return classStr;
            },

            /**
             * Current number of items to show
             * @return int
             */
            paginationCount: function() {
                return this.pagination.current * this.itemPerPage;
            },


            /**
             * Indicate if the option box should be shown/hidden
             * @return boolean
             */
            showOption: function() {
                return this.focused === true;
            },

            /**
             * Indicate if the placholder text should be shown/hidden
             * @return boolean
             */
            showPlaceholder: function() {
                return !this.hasValue;
            },


            /**
             * Check if there are items selected
             * @return boolean
             */
            hasValue: function() {
                if(this.isArray(this.options.selected))
                    return this.options.selected.length > 0;

                return this.options.selected;
            },

            /**
             * Check if option item is available after `filter`
             * @return boolean
             */
            hasItem: function() {
                return this._items.length > 0;
            },

            /**
             * Check if default slot exists
             * @return boolean
             */
            hasSlot: function() {
                return !!this.$scopedSlots.default;
            },


            /**
             * Bind all available listener to the component
             */
            listeners: function() {
                return {
                    ...this.$listeners
                };
            },
        },

        data: function() {
            return {

                /**
                 * Searchfield value
                 */
                search: null,


                /**
                 * Collection of elements
                 */
                elements: {
                    root: null,
                    labelfield: null,
                    icon: null,

                    searchfield: null,
                    optionBox: null,
                },

                options: {

                    /**
                     * Selected option item
                     * @type string|object
                     */
                    selected: null,

                    /**
                     * Current focused option item
                     * @type int
                     */
                    focused: -1,

                    /**
                     * List of the unfiltered option items
                     * @type array
                     */
                    list: [],

                    /**
                     * List of filtered option items
                     * @type array
                     */
                    filteredList: [],
                },


                /**
                 * Attributes
                 * ==========================================================================
                 **/

                /**
                 * Indicates if there is an on-going process
                 * @type boolean
                 */
                loading: false,

                /**
                 * Indicates if there is an on-going animation or transition
                 * @type boolean
                 */
                transition: false,

                /**
                 * Indicates if the select box is on `focus`
                 * @type boolean
                 */
                focused: false,


                /**
                 * Settings/Options
                 * ==========================================================================
                 **/

                /**
                 * Pagination settings
                 */
                pagination: {

                    /**
                     * Specify current pagination index
                     * @type number
                     */
                    current: 1,

                    /**
                     * Indicates the pagination `transition` state
                     * @type boolean
                     */
                    transitioning: false,
                },
            };
        },

        mounted: function() {
            this.init();
        },

        methods: {
            init: function() {

                /* Set elements */
                this.elements.root = this.$refs.root;
                this.elements.labelfield = this.$refs.labelfield;
                this.elements.icon = this.$refs.icon;
                this.elements.searchfield = this.$refs.searchfield;
                this.elements.optionBox = this.$refs.optionBox;


                /* Initialize elements */
                this.initOptionBox();
                this.initInputfield();
            },

            /**
             * Initialize option box element
             */
            initOptionBox: function() {
                /* Set items */
                this.setOptionBox();

                /* Bind events */
                this.bindOptionBox();
            },

            /**
             * Initialize input field element
             */
            initInputfield: function() {
                /* Set holder depending on select type */
                this.options.selected = this.multi ? [] : null;

                /* Set default value */
                if(this.value) {
                    if(this.isArray(this.value)) {
                        this.setValues(this.value);
                    } else {
                        this.setValue(this.value);
                    }
                }
            },


            /**
             * ==================================================================================
             * @Methods
             * ==================================================================================
             **/

            /**
             * Bind event for the option box element
             */
            bindOptionBox: function() {
                /* Set scroll event */
                this.elements.optionBox.addEventListener('scroll', () => {
                    this.validateLoadMore();
                }, false);
            },

            /**
             * Checking if loading of next option item should trigger
             */
            validateLoadMore: function() {
                /* Check load more possibility */
                if(!this.canLoadMore()) return false;


                /* Get scroll vars */
                let elemHeight = Math.round(this.elements.optionBox.getBoundingClientRect().height),
                    scrollHeight = Math.round(this.elements.optionBox.scrollHeight - this.elements.optionBox.scrollTop),
                    allowance = 50;


                /* Check if scroll exists, preventing `loadMore` to be triggered normally */
                if(scrollHeight <= 0) {
                    this.loadMore();
                    this.validateLoadMore();
                }

                /* Check if scroll is at the bottom of the element */
                if(elemHeight >= (scrollHeight - 50)) {
                    this.loadMore();
                }
            },

            /**
             * Create object for option box
             * @return object
             */
            convertToOptionArray: function(item) {
                let newObj = {};

                /* Check type of object */
                if(this.isObject(item)) {
                    newObj = item;
                } else {
                    newObj[this.idColumn] = item;
                    newObj[this.labelColumn] = item;
                }

                return newObj;
            },


            /**
             * @Keyboard Events
             * ==================================================================================
             **/

            /**
             * Enter key event on the search field element
             */
            keyEnter: function() {
                /* Select current focused option item */
                this.selectFocusedOption();
            },

            /**
             * Arrow up key event on the search field element
             */
            keyUp: function() {
                /* Set prev option item to focus */
                this.setFocusedOption(0);
            },

            /**
             * Arrow down key event on the search field element
             */
            keyDown: function() {
                /* Set next option item to focus */
                this.setFocusedOption(1);
            },


            /**
             * ==================================================================================
             * @Controllers
             * ==================================================================================
             **/

            /**
             * Select the specified option item
             */
            select: function(item) {

                /* Update value */
                if(this.multi) {

                    /* Attach/remove item */
                    if(!this.isSelected(item)) {
                        this.options.selected.push(item);
                    } else {
                        this.remove(item);
                    }

                } else {
                    this.options.selected = item;
                }

                this.$emit('input', this.getValue());


                /* Emit `onSelect` event */
                if(this.emitOnSelect)
                    this.$emit('onSelect', this.getValue());


                /* Remove focus */
                this.setFocus(false);
            },

            /**
             * Remove specified option to the selected array
             * Only when component has `multi` enabled
             */
            remove: function(item) {
                if(!this.multi) return;

                let index = this.findByID(this.options.selected, item.id, 2);

                if(index !== -1)
                    this.options.selected.splice(index, 1);
            },

            /**
             * Select the currently focused option item
             */
            selectFocusedOption: function() {
                let index = this.options.focused === -1 ? 0 : this.options.focused,
                    item = this._items[index];

                /* Check if item exists */
                if(item)
                    this.select(item);
            },

            /**
             * Search the option list for the closest value
             * @return array
             */
            filter: function() {
                let result = [];


                for(var i = 0; i < this.options.list.length; i++) {
                    let optionItem = this.options.list[i];

                    /* Search per specified column */
                    for(var u = 0; u < this._searchColumn.length; u++) {
                        let searchKey = this._searchColumn[u],
                            done = false;

                        /* Check column availability */
                        if(!done && optionItem[searchKey]) {
                            let optionValue = optionItem[searchKey].toString().toLowerCase(),
                                searchValue = this.search.toString().toLowerCase();

                            /* Compare search to column value */
                            if(optionValue.indexOf(searchValue) >= 0) {
                                result.push(optionItem);

                                done = true;
                            }
                        }
                    }
                }

                this.options.filteredList = result;
            },

            /**
             * Show next set of options items
             */
            loadMore: function() {
                /* Check load more possibility */
                if(!this.canLoadMore()) return false;


                this.pagination.transitioning = true;

                setTimeout(() => {

                    this.pagination.current++;
                    this.pagination.transitioning = false;

                }, this.transitionDelay);
            },

            /**
             * Scroll to focused option item
             */
            scrollTo: function() {
                let target = this.getFocusedOption();

                if(target)
                    target.scrollIntoView({
                        block: 'center'
                    });
            },

            /**
             * Reset fields on focus out
             */
            reset: function() {
                /* Remove focus on elements */
                this.$nextTick(() => {
                    this.elements.root.blur();
                    this.elements.searchfield.blur();
                });

                /* Revert pagination to start */
                this.pagination.current = 1;

                /* Reset focused option item */
                this.options.focused = -1;

                /* Clear search */
                if(!this.preserveSearch)
                    this.search = '';
            },


            /**
             * ==================================================================================
             * @Getter/Setter
             * ==================================================================================
             **/

            /**
             * Set selected value
             * @param string|object
             */
            setValue: function(item = null) {
                let id = this.isObject(item) ? item[this.idColumn] : item,
                    option = this.findByID(this._items, id);

                /* Update selected */
                if(option)
                    this.select(option);
            },

            /**
             * Set selected values
             * @param array $arr
             */
            setValues: function(arr) {
                for(var i = 0; i < arr.length; i++) {
                    this.setValue(arr[i]);
                }
            },

            /**
             * Get selected value
             * @return string|object
             */
            getValue: function() {
                if(!this.hasValue) return null;

                /* Check specified return type */
                switch(this.returnType) {
                    case 'id': return this.getID();
                    case 'label': return this.getLabel();
                    case 'object': return this.getObject();
                }
            },

            /**
             * Get selected value id
             * @return string|array
             */
            getID: function() {
                if(this.multi) {
                    return this.getToArray(this.idColumn);
                } else {
                    return this.options.selected ? this.options.selected[this.idColumn] : null;
                }
            },

            /**
             * Get selected value label
             * @return string|array
             */
            getLabel: function() {
                if(this.multi) {
                    return this.getToArray(this.labelColumn);
                } else {
                    return this.options.selected ? this.options.selected[this.labelColumn] : null;
                }
            },

            /**
             * Get selected value object
             * @return object|array
             */
            getObject: function() {
                if(this.multi) {
                    return this.getToArray();
                } else {
                    return this.options.selected ? this.options.selected : null;
                }
            },

            /**
             * Get selected value to array
             * @return array
             */
            getToArray: function(column = null) {
                if(this.isArray(this.options.selected)) {
                    let result = [];

                    for(var i = 0; i < this.options.selected.length; i++) {
                        let select = this.options.selected[i];

                        result.push(column ? select[column] : select);
                    }

                    return result;

                } else {
                    return [this.options.selected[column]]
                }
            },

            /**
             * Set option items
             */
            setOptionBox: function() {
                let list = [];

                for(var i = 0; i < this.items.length; i++) {
                    let item = this.items[i],
                        newObj = this.convertToOptionArray(item);

                    list.push(newObj);
                }

                this.options.filteredList = this.options.list = list;
            },

            /**
             * Set `focus` state
             * @param boolean
             */
            setFocus: function(focus) {
                /* Check state */
                if(this.transition || this.disabled || this.readonly)
                    return this.focused = false;

                /* Check current value */
                if(this.focused == focus)
                    return;


                this.transition = true;
                this.focused = focus;


                /* On searchfield focus */
                if(this.focused) {
                    /* Set focus on searchfield */
                    this.$nextTick(() => { this.elements.searchfield.focus(); });

                    /* Check if `loadMore` needs to be triggered */
                    this.validateLoadMore();


                    /* Emit `open` event */
                    if(this.emitOnOpen)
                        this.$emit('open');

                } else {
                    this.reset();


                    /* Emit `close` event */
                    if(this.emitOnClose)
                        this.$emit('close', this.getValue());
                }

                this.transition = false;
            },

            /**
             * Set the focus for the option items to the next or previous
             * @param int movement (0 = Previous, 1 = Next)
             */
            setFocusedOption: function(movement = 1) {
                let index = movement ? this.options.focused + 1 : this.options.focused - 1,
                    length = this._items.length;


                /* Check index limit */
                if(index < 0) {
                    index = length - 1;
                } else if(index >= length) {
                    index = 0;
                }

                /* Check if it exists */
                if(this._items[index]) {
                    this.options.focused = index;

                    /* Scroll to focused option */
                    this.scrollTo();
                }
            },

            /**
             * Get the focused option item element
             * @return DOM Element
             */
            getFocusedOption: function() {
                return this.elements.optionBox.querySelector('.vue-select__options__item--focus');
            },

            /**
             * Get all `style` specific classes
             * @return array
             */
            getStyleClasses: function() {
                let result = [];

                /* Add style classes */
                if(this.block) result.push('vue-select--block');
                if(this.flat) result.push('vue-select--flat');


                return result;
            },

            /**
             * Get all `style` specific classes
             * @return array
             */
            getStyleClasses: function() {
                let result = [];

                /* Add theme classes */
                if(this.error) result.push('vue-select--error');
                if(this.success) result.push('vue-select--success');
                if(this.warning) result.push('vue-select--warning');

                /* Add style classes */
                if(this.block) result.push('vue-select--block');
                if(this.flat) result.push('vue-select--flat');


                return result;
            },

            /**
             * Get all `attribute` specific classes
             * @return array
             */
            getAttributeClasses: function() {
                let result = [];

                /* Add select class */
                result.push('vue-select');
                /* Add specified select classes */
                result = result.concat(this.selectClasses);

                /* Add state classes */
                if(this.multi) result.push('vue-select--multi');
                if(this.disabled) result.push('vue-select--disabled');
                if(this.readonly) result.push('vue-select--readonly');


                return result;
            },


            /**
             * ==================================================================================
             * @Checker
             * ==================================================================================
             **/

            /**
             * Check if option box can load next item
             * @return boolean
             */
            canLoadMore: function() {
                /* Check pagination `transition` state */
                if(this.pagination.transitioning) return false;
                /* Check total items loaded */
                if(this._items.length === this.options.filteredList.length) return false;

                return true;
            },


            /**
             * Find option item by using the `idColumn` props
             * @param  array $arr
             * @param  mixed $id
             * @param  int   $return
             * @return array
             */
            findByID: function(arr, id, returnType = 1) {
                for(var i = 0; i < arr.length; i++) {
                    let option = arr[i];

                    if(option[this.idColumn] == id) {
                        switch(returnType) {
                            /* Object */
                            case 1: return option;
                            /* Index */
                            case 2: return i;
                        }
                    }
                }

                return [];
            },

            /**
             * Check if specified item is already selected
             * @param  object $item
             * @return boolean
             */
            isSelected: function(item) {
                for(var i = 0; i < this.options.selected.length; i++) {
                    let option = this.options.selected[i];

                    if(option[this.idColumn] == item[this.idColumn])
                        return true;
                }

                return false;
            },

            /**
             * Check if parameter specified is an Object
             * @return boolean
             */
            isObject: function(obj) {
                return obj === Object(obj);
            },

            /**
             * Check if param is Array
             * @return boolean
             */
            isArray: function(value) {
                return value && typeof value === 'object' && value.constructor === Array;
            },
        },
    }
</script>