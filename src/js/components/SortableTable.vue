<template>

	<table ref="table" :class="{
		'sortable-table--dragging': mouseDrag
	}"
	class="sortable-table" cellspacing="0">
		<thead>

			<template v-for="header in headers">
				<th>{{ header }}</th>
			</template>

		</thead>
		<tbody>

			<template v-for="item in tableItems">
				<tr :data-sort="item.id"
				:class="{
					'is-dragging': item.id == dragItem.id
				}">
					<template v-for="header in headers">
						<td>{{ item[header] }}</td>
					</template>
				</tr>
			</template>

		</tbody>

	</table>

</template>
<script>

    /**
     * ==================================================================================
     * Sortable Table component
     *
     * ==================================================================================
     **/

    export default {
        props: {

        	/**
        	 * Array of items & headers
        	 */
        	headers: {
        		type: Array,
        		default: () => { return []; }
        	},

        	items: {
        		type: Array,
        		default: () => { return []; }
        	},
        },

        watch: {

        	/**
        	 * Update clone of items on change
        	 */
        	items: function(newItem, oldItem) {
        		if(newItem != oldItem)
        			this._copyItems();
        	},
        },

        data () {
            return {

            	/* Cloned table items and headers */
                tableItems: [],

				/* Collection of `td` elements */
				rows: [],

				/* Current element being dragged/sorted */
				dragElement: null,
				dragItem: {
					id: null,
				},


				/**
				 * Mouse Tracking
				 *
				 */

	            mouseX: 0,
	            mouseY: 0,

	            mouseDownX: 0,
	            mouseDownY: 0,

	            mouseDrag: false,
            };
        },

        mounted: function() {
            this.init();

            this._bindTrackMouse();
        },

	    beforeDestroy: function() {
	        /* Remove mouse event tracking on removal of component */
	        this._removeAllEvent();
	    },

        methods: {

            init: function() {
                this._copyItems();
            },


            /**
             * ==================================================================================
             * @Methods
             * ==================================================================================
             **/

            /**
             * Clone table items
             */
            _copyItems: function() {
            	this.tableItems = JSON.parse(JSON.stringify(this.items));
            },


			/**
	         * Add mouse event
	         */
	        _bindTrackMouse: function() {
	            this._addAllEvent();
	        },

	        /**
	         * Add/Remove mouse down event
	         */
	        _removeMouseDownEvent: function() { this._removeMouseEvent('mousedown', 'touchstart', this.getMouseDownCoords); },
	        _addMouseDownEvent: function() {    this._addMouseEvent('mousedown', 'touchstart', this.getMouseDownCoords); },

	        /**
	         * Add/Remove mouse up event
	         */
	        _removeMouseUpEvent: function() { this._removeMouseEvent('mouseup', 'touchend', this.getMouseUpCoords); },
	        _addMouseUpEvent: function() {    this._addMouseEvent('mouseup', 'touchend', this.getMouseUpCoords); },

	        /**
	         * Add/Remove mouse move event
	         */
	        _removeMouseMoveEvent: function() { this._removeMouseEvent('mousemove', 'touchmove', this.getMouseMoveCoords); },
	        _addMouseMoveEvent: function() {    this._addMouseEvent('mousemove', 'touchmove', this.getMouseMoveCoords); },

	        /**
	         * Add all mouse event
	         */
	        _addAllEvent: function() {
	            this._addMouseUpEvent();
	            this._addMouseMoveEvent();
	            this._addMouseDownEvent();
	        },

	        /**
	         * Remove all mouse event
	         */
	        _removeAllEvent: function() {
	            this._removeMouseUpEvent();
	            this._removeMouseMoveEvent();
	            this._removeMouseDownEvent();
	        },

	        /**
	         * Add/Remove specified event on both `mouse` and `touch` events
	         * @param {string} mouse
	         * @param {string} touch
	         * @param {func}   onTrigger
	         */
	        _addMouseEvent: function(mouse, touch, onTrigger) {
	            document.addEventListener(mouse, onTrigger);
	            document.addEventListener(touch, onTrigger);
	        },

	        _removeMouseEvent: function(mouse, touch, onTrigger) {
	            document.removeEventListener(mouse, onTrigger);
	            document.removeEventListener(touch, onTrigger);
	        },


            /**
             * ==================================================================================
             * @Controller
             * ==================================================================================
             **/

            /**
             * Emit of `sorted` event after item arrangement changes
             */
            handleSorted: function() {
            	this.$emit('sorted', this.tableItems);
            },

            /**
             * Swap current dragging element to specified row
             * @param {DOMElement} row
             */
            swapRow: function(row) {
            	let currRow = this.getRowById(this.dragItem.id, false),
            		swapRow = this.getRowById(row.dataset.sort, false),

	            	minRow = Math.min(currRow, swapRow), maxRow = Math.max(currRow, swapRow),
            		rows = [this.tableItems[minRow], this.tableItems[maxRow]];


            	/* Swap elements in collection */
				this.tableItems.splice(minRow, 2, rows[1], rows[0]);


				this.handleSorted();
            },

            /**
             * Drag/Move the `td` element
             * @param  {float} x
             * @param  {float} y
             */
            moveRow: function(x, y) {
                this.dragElement.style.transform = "translate3d(" + x + "px, " + y + "px, 0)";


                /* Check boundery to all `td`s */
          		let	dragPos = this.dragElement.getBoundingClientRect(),
          			currStartY = dragPos.y, currEndY = currStartY + dragPos.height,
          			rows = this.getRows();

              	for(var i = 0; i < rows.length; i++) {
              		let rowElem = rows[i],
              			rowSize = rowElem.getBoundingClientRect(),
              			rowStartY = rowSize.y, rowEndY = rowStartY + rowSize.height;

	                if(
	                	/* Don't check itself */
	                	this.dragItem.id != rowElem.dataset.sort &&
	                	/* Only proceed if the rows are intersecting */
		                this.isIntersecting(
	                        currStartY, currEndY,
	                        rowStartY, rowEndY
						)
					) {
	                	/* Check if equal or more than half of the height is intersecting */
						if(Math.abs(currStartY - rowStartY) < rowSize.height / 2)
							this.swapRow(rowElem);
	                }
              	}
            },

            /**
             * Return the current element being dragged
             */
            returnRow: function() {
            	this.removeDragElement();

                this.dragElement = null;
                this.mouseDrag = false;
            },


           	/**
           	 * Add/Remove draggable element
           	 * @param {DOMElement} target
           	 */
            addDragElement: function(target) {
            	this.dragElement = target.cloneNode(true);

            	/* Set styles */
            	this.dragElement.classList.add('sortable-table__drag');
            	this.dragElement.style.background = this.getStyle(target, 'backgroundColor');
            	/* Set `tr` sizing */
            	this.dragElement.style.height = this.getStyle(target, 'height');
            	/* Set `td` sizing */
            	for(var i = 0; i < target.children.length; i++) {
            		let oldTD = target.children[i],
            			newTD = this.dragElement.children[i];
                    /* Copy sizes as the draggable `tr` doesn't have the proper sizes */
					newTD.style.width = this.getStyle(oldTD, 'width');
            		newTD.style.height = this.getStyle(oldTD, 'height');
            		newTD.style.padding = this.getStyle(oldTD, 'padding');
            		newTD.style.margin = this.getStyle(oldTD, 'margin');
            	}

            	/* Add to `sortable table` */
            	this.$refs['table'].appendChild(this.dragElement);

            	/* Set `tr` position */
            	let targetPos = target.getBoundingClientRect(),
            		dragPos = this.dragElement.getBoundingClientRect();

            	this.dragElement.style.bottom = ((dragPos.y - targetPos.y) - targetPos.height) + "px";
            	this.dragElement.style.left = "-1px";


            	/* Trigger `mousemove` manually to position element */
            	document.dispatchEvent(new MouseEvent('mousemove',
            		{ view: window, cancelable: true, bubbles: true }
            	));
            },

            removeDragElement: function() {
            	this.$refs['table'].removeChild(this.dragElement);
            	this.dragElement = null;
            	this.dragItem = { id: null };
            },


            /**
             * ==================================================================================
             * @Getter/Setter
             * ==================================================================================
             **/

            /**
             * Set element for dragging
             * @param {DOMElement} target
             */
            setDragTarget: function(target) {
            	this.dragItem = this.getRowById(target.dataset.sort);

            	this.addDragElement(target);

                this.mouseDrag = true;
            },

	        /**
	         * Get specific `row` clicked
	         * @param  {DOMElement} target
	         * @return {DOMElement}
	         */
	        getTargetRow: function(target) {
	        	let elemName = target.tagName.toLowerCase();

	        	if(elemName == 'tr') return target;
	        	if(elemName == 'td') return target.closest('tr');
	        },

	        /**
	         * Get `row` by id
	         * @param  {int} 	id
	         * @param  {bool} 	type
	         * @return {Object}
	         */
	        getRowById: function(id, type = true) {
	        	for(var i = 0; i < this.tableItems.length; i++) {
	        		let row = this.tableItems[i];
	        		if(row.id == id)
	        			return type ? row : i;
	        	}

	        	return null;
	        },

	        /**
	         * Get `tr` by sort id
	         * @param  {int} 	id
	         * @return {Object}
	         */
	        getRowElemById: function(id) {
	        	let rows = this.getRows();
	        	for(var i = 0; i < rows.length; i++) {
	        		let row = rows[i];
	        		if(row.dataset.sort == id)
	        			return row;
	        	}

	        	return null;
	        },

	        /**
	         * Get all `row` elements
	         * @return {Array}
	         */
	        getRows: function() {
	        	return document.querySelectorAll('.sortable-table tbody tr');
	        },

	        /**
	         * Get elements specified style
	         * @param  {DOMElement} target
	         * @param  {string} 	styleName
	         * @return {String}
	         */
	        getStyle: function(target, styleName) {
	        	let compStyle = getComputedStyle(target),
	        		style = compStyle[styleName];

	        	return style ? style : null;
	        },



            /**
             * Get the mouse coordinate on down
             * @param {MouseEvent} event
             */
            getMouseDownCoords: function(event) {
                /* Only capture left mouse button */
                if(event.button != 0) return true;
                /* Check if clicked on a `tr` element */
            	let target = this.getTargetRow(event.target);
                if(!this._isTableRow(target)) return;


                this.setDragTarget(target);

                let coords = this.getMouseCoords(event);
                this.mouseDownX = coords.x;
                this.mouseDownY = coords.y;
            },

            /**
             * Get the mouse coordinate when moving
             * @param {MouseEvent} event
             */
            getMouseMoveCoords: function(event) {
                if(!this.mouseDrag) return;

                let coords = this.getMouseCoords(event);
                this.mouseX = coords.x - this.mouseDownX;
                this.mouseY = coords.y - this.mouseDownY;


                this.moveRow(this.mouseX, this.mouseY);
            },

            /**
             * Get the mouse coordinate on down
             * @param {MouseEvent} event
             */
            getMouseUpCoords: function(event) {
				if(!this.mouseDrag) return;

                this.returnRow();
            },

	        /**
	         * Get the mouse coordinate
	         * @param  {MouseEvent}  event
	         * @return {Object}
	         */
	        getMouseCoords: function(event) {
	            return {
	                x: this._isTouchEvent(event) ? event.touches[0].clientX : event.clientX,
	                y: this._isTouchEvent(event) ? event.touches[0].clientY : event.clientY
	            };
	        },


            /**
             * ==================================================================================
             * @Checker
             * ==================================================================================
             **/

		    /**
		     * Check if the range intersects w/ another range
		     * @param  {int} 	 min0
		     * @param  {int} 	 max0
		     * @param  {int} 	 min1
		     * @param  {int} 	 max1
		     * @return {Boolean}
		     */
		    isIntersecting: function(min0, max0, min1, max1) {
		        return Math.max(min0, max0) >= Math.min(min1, max1) &&
		               Math.min(min0, max0) <= Math.max(min1, max1);
		    },


            /**
             * Check if element is a `tr` element
             * @param  {DOMElement}  target
             * @return {Boolean}
             */
            _isTableRow(target) {
            	if(target) {
            		let rows = this.getRows();
            		for(var i = 0; i < rows.length; i++) {
            			/* Check if `tr` and belongs to the sortable table */
            			if(rows[i] === target && rows[i].closest('table') == this.$refs['table'])
            				return true;
            		}
            	}

        		return false;
            },

	        /**
	         * Check if `touch` event
	         * @param  {MouseEvent}  event
	         * @return {Boolean}
	         */
	        _isTouchEvent(event) {
	            return event.type === 'touchmove' || event.type === 'touchstart';
	        },
        },
    }
</script>
