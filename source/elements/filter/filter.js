"use strict";

(function() {
    class Filter {
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
            this.filter = document.querySelector('.filter');
            if (this.filter == null) {
                return;
            }
            this.container = document.querySelector("[data-container=" + this.filter.getAttribute('data-target') + "]");
            let inputs = this.filter.querySelectorAll('input[data-filter]');
            [].forEach.call(inputs, (input) => {
                input.addEventListener('change', this.filterFields.bind(this));
            });
        }

        filterFields (event) {
            let input = event.currentTarget
                , tag = input.getAttribute('data-filter');

            if (tag == 'all') {
                [].forEach.call(this.container.querySelectorAll('[data-tag]'), (tr) => {
                    tr.classList.toggle('hidden', false);
                });
            } else {
                [].forEach.call(this.container.querySelectorAll('[data-tag]'), (tr) => {
                    if(tr.getAttribute('data-tag').toLowerCase() == tag.toLowerCase()){
                        tr.classList.toggle('hidden', false);
                    } else {
                        tr.classList.toggle('hidden', true);
                    }
                });
            }
        }
    }
    new Filter;
})();
