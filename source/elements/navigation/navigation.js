"use strict";

(function() {

    /**
     * @description Navigation class
     * @class
     */
    class Navigation {

        /**
         * @description Start initialization on domload
         * @constructor
         */
        constructor() {
            let ready = new Promise((resolve, reject) => {
                if (document.readyState != "loading") return resolve();
                document.addEventListener("DOMContentLoaded", () => resolve());
            });
            ready.then(this.init.bind(this));
        }

        /**
         * @description Adding events and properties
         */
        init() {
            this.menu = document.querySelector('.navigation');
            if (this.menu == null) {
                return;
            }
            this.open = false;
            this.wrapper = this.menu.querySelector('.navigation__wrapper');
            let toggle = this.menu.querySelector('.navigation__toggle');
            toggle.addEventListener('click', this.toggleMenu.bind(this));
            window.addEventListener('resize', this.resized.bind(this));
        }

        /**
         * @description Resize window
         */
        resized() {
            if ( Modernizr.mq('(min-width: 1000px)') && this.open ) {
                this.open = false;
                this.wrapper.removeAttribute('style');
                this.menu.classList.toggle("navigation_open", false);
            }
        }

        /**
         * @description Open tab
         * @param event Event {Event} to get button user have clicked
         */
        toggleMenu() {
            this.open = !this.open;
            Velocity(this.wrapper, "stop");
            this.menu.classList.toggle("navigation_open");
            if (this.open) {
                Velocity(this.wrapper, {
                    translateY: this.wrapper.offsetHeight + this.menu.offsetHeight
                }, {duration: 250});
            } else {
                Velocity(this.wrapper, {
                    translateY: 0
                }, {duration: 250});
            }
        }
    }

    new Navigation;
})();
