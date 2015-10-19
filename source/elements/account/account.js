"use strict";

(function() {
    class Account {
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
            let date = document.querySelector('.account__input_date');
            if (date != null) {
                this.dirthday = new Pikaday({
                    field: document.querySelector('.account__input_date')
                    , format: 'YYYY-MM-DD'
                });
            }
        }
    }
    new Account;
})();
