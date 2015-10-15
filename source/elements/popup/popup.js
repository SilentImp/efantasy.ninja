"use strict";

(function() {

    /**
     * @description Popup class
     * @class
     */
    class Popup {

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
            this.popup = document.querySelector('.popup');
            if (this.popup == null) {
                return;
            }

            this.lightbox = document.querySelector('.popup__lightbox');

            let close = document.querySelector('.popup__close')
                , links = document.querySelectorAll('.popup__button')
                , open_links = document.querySelectorAll('[data-action="open popup"]')

            this.current_button = document.querySelector('.popup__button_current');
            this.current_tab = document.querySelector('.popup__tab_current');

            close.addEventListener('click', this.closePopup.bind(this));
            this.lightbox.addEventListener('click', this.closePopup.bind(this));
            [].forEach.call(links, (link) => {
                link.addEventListener('click', this.openTab.bind(this));
            });
            [].forEach.call(open_links, (link) => {
                link.addEventListener('click', this.openPopup.bind(this));
            });
        }

        /**
         * @description Open tab
         * @param event Event {Event} to get button user have clicked
         */
        openTab(event) {
            let button = event.currentTarget
                , target = button.getAttribute('data-target')
                , tab = document.querySelector('[data-tab="' + target + '"]');

            this.current_button.classList.remove('popup__button_current');
            this.current_tab.classList.remove('popup__tab_current');
            button.classList.add('popup__button_current');
            tab.classList.add('popup__tab_current');

            this.current_button = button;
            this.current_tab = tab;
        }

        /**
         * @description Close popup and lightbox
         */
        closePopup() {
            Velocity(this.lightbox, "stop");
            Velocity(this.lightbox, "fadeOut", {duration: 250});
            Velocity(this.popup, "stop");
            Velocity(this.popup, "fadeOut", {duration: 250});
        }

        /**
         * @description Close popup and lightbox
         */
        openPopup() {
            Velocity(this.lightbox, "stop");
            Velocity(this.lightbox, "fadeIn", {duration: 250});
            Velocity(this.popup, "stop");
            Velocity(this.popup, "fadeIn", {duration: 250});
        }

    }

    window.popup = new Popup;
})();
