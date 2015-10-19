"use strict";
(function() {

    /**
     * @description Questions class
     * @class
     */
    class Questions {

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
            let questions = document.querySelectorAll('.questions__item');
            [].forEach.call(questions, (question) => {
                question.addEventListener('click', this.toggleQuestion.bind(this));
            });
        }

        /**
         * @description Show answer
         * @param event Event {Event} to get button user have clicked
         */
        toggleQuestion(event) {
            event.currentTarget.classList.toggle("questions__item_open");
        }
    }

    new Questions;
})();
