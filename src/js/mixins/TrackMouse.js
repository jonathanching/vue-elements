/**
 * ==================================================================================
 * Mouse tracking helper
 * 
 * ==================================================================================
 **/

export default {

    data: function() {
        return {
            mouseX: 0,
            mouseY: 0,
        };
    },

    computed: {
        //
    },

    mounted: function() {
        this.bindTrackMouse();
    },

    beforeDestroy: function() {
        /* Remove mouse event tracking on removal of component */
        this.removeTrackMouseEvent();
    },

    methods: {

        /**
         * ==================================================================================
         * @Methods
         * ==================================================================================
         **/

        /**
         * Add mouse event
         */
        bindTrackMouse: function() {
            this.removeTrackMouseEvent();
            this.addTrackMouseEvent();
        },

        /**
         * Add mouse tracking event
         */
        addTrackMouseEvent: function() {
            document.addEventListener('mousemove', this.getTrackMouseCoords);
        },

        /**
         * Remove existing mouse tracking event
         */
        removeTrackMouseEvent: function() {
            document.removeEventListener('mousemove', this.getTrackMouseCoords);
        },


        /**
         * ==================================================================================
         * @Getter/Setter
         * ==================================================================================
         **/

        /**
         * Get the mouse coordinate from a document event
         * @param Event
         */
        getTrackMouseCoords: function(event) {
            this.mouseX = event.clientX;
            this.mouseY = event.clientY;
        },


        /**
         * ==================================================================================
         * @Checker
         * ==================================================================================
         **/

        //
    }
};