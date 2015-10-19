"use strict";

(function() {

    /**
     * @description Navigation class
     * @class
     */
    class LandingPopup {

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
            this.popup_login = document.querySelector('.landing-popup_login');
            this.popup_register = document.querySelector('.landing-popup_register');
            this.lightbox =  document.querySelector('.landing-popup__lightbox');
            if (
                this.popup_login == null
                || this.popup_register == null
                || this.lightbox == null
            ) {
                return;
            }

            let register_buttons = document.querySelectorAll('.landing__register, .landing-popup__open-register')
                , login_buttons = document.querySelectorAll('.landing__login, .landing-popup__open-login')
                , close_buttons = document.querySelectorAll('.landing-popup__close, .landing-popup__lightbox');

                this.open = false;
                document.body.classList.toggle('popup_open', this.open);


            [].forEach.call(register_buttons, (button) => {
                button.addEventListener('click', this.openRegistration.bind(this));
            });
            [].forEach.call(login_buttons, (button) => {
                button.addEventListener('click', this.openLogin.bind(this));
            });
            [].forEach.call(close_buttons, (button) => {
                button.addEventListener('click', this.closeAll.bind(this));
            });


        }

        /**
         * @description Open registration popup
         */
        openLogin() {
            if (this.open) {
                Velocity(this.popup_register, "fadeOut");
                this.popup_register.reset();
            } else {
                Velocity(this.lightbox, "fadeIn");
            }

            Velocity(this.popup_login, "fadeIn");
            this.open = true;
            document.body.classList.toggle('popup_open', this.open);
        }

        /**
         * @description Open login popup
         */
        openRegistration() {
            if (this.open) {
                Velocity(this.popup_login, "fadeOut");
                this.popup_login.reset();
            } else {
                Velocity(this.lightbox, "fadeIn");
            }

            Velocity(this.popup_register, "fadeIn");
            this.open = true;
            document.body.classList.toggle('popup_open', this.open);
        }

        /**
         * @description Open login popup
         */
        closeAll() {
            Velocity(this.lightbox, "stop");
            Velocity(this.popup_login, "stop");
            Velocity(this.popup_register, "stop");

            Velocity(this.lightbox, "fadeOut");
            Velocity(this.popup_login, "fadeOut");
            Velocity(this.popup_register, "fadeOut");
            this.popup_register.reset();
            this.popup_login.reset();
            this.open = false;
            document.body.classList.toggle('popup_open', this.open);
        }

    }

    new LandingPopup;
})();
