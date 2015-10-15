"use strict";

(function() {
    class Edit {
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
            this.widget = document.querySelector('.edit');
            if (this.widget == null) {
                return;
            }
            let add_buttons = this.widget.querySelectorAll('.button_add')
                , remove_buttons = this.widget.querySelectorAll('.button_remove');
            this.players = this.widget.querySelector('.edit__available-players');
            this.team = this.widget.querySelector('.edit__players');
            this.form = this.widget.querySelector('form.edit__teamer');
            this.popup = this.widget.querySelector('.edit__popup');
            this.popup_close = this.popup.querySelector('.edit__popup-close');
            [].forEach.call(add_buttons, (button) => {
                button.addEventListener('click', this.addPlayer.bind(this));
            });
            [].forEach.call(remove_buttons, (button) => {
                button.addEventListener('click', this.removePlayer.bind(this));
            });
            this.popup_close.addEventListener('click', this.closePopup.bind(this));
            this.form.addEventListener('submit', this.checkTeam.bind(this));
        }

        closePopup (event) {
            this.popup.style.display = "none";
        }

        checkTeam (event) {

            let players = event.currentTarget.querySelectorAll('.teamer');
            if (players.length < 8) {
                this.popup.style.display = "block";
                event.preventDefault();
                return;
            }
        }

        removePlayer (event) {
            let player = event.currentTarget.closest('.teamer')
                , id = parseInt(player.getAttribute('data-id'), 10)
                , li = document.createElement('li');
            li.classList.add('edit__player');
            player.parentNode.parentNode.removeChild(player.parentNode);
            this.players.querySelector('[data-id="' + id + '"]').classList.remove('edit__available_added');
            this.team.appendChild(li);
        }

        addPlayer (event) {
            let player = event.currentTarget.closest('tr');
            if (player.classList.contains('edit__available_added')) {
                return;
            }
            let teamers = this.team.querySelectorAll('.teamer')
                , container;
            if (teamers.length == 0) {
                container = this.team.querySelector('.edit__player');
            } else {
                container = teamers[teamers.length-1].parentNode.nextElementSibling;
                if (container == null) {
                    return;
                }
            }
            let name = player.querySelector('.edit__available-name').textContent
                , salary = player.querySelector('.edit__available-players-salary').textContent
                , src = player.querySelector('.edit__available-avatar').getAttribute('src')
                , id = player.getAttribute('data-id')
                , member = this.createPlayer(id, src, name, salary);

            container.appendChild(member);
            player.classList.add('edit__available_added');
        }

        createPlayer (id, src, name, salary) {
            let container = document.createElement('DIV')
                , p_name = document.createElement('P')
                , p_salary = document.createElement('P')
                , button = document.createElement('BUTTON')
                , input = document.createElement('INPUT')
                , img = document.createElement('IMG');
            container.setAttribute('data-id', id);
            container.classList.add('teamer');
            p_name.classList.add('teamer__name');
            p_name.appendChild(document.createTextNode(name));
            p_salary.classList.add('teamer__salary');
            p_salary.appendChild(document.createTextNode(salary));
            img.classList.add('teamer__avatar');
            img.setAttribute('alt', 'Avatar')
            img.setAttribute('src', src)
            input.setAttribute('type', 'hidden');
            input.setAttribute('name', 'team[]');
            input.setAttribute('value', id);
            button.classList.add('button');
            button.classList.add('button_remove');
            button.classList.add('teamer__remove');
            button.setAttribute('type','button');
            button.appendChild(document.createTextNode('-'));
            button.addEventListener('click', this.removePlayer.bind(this));
            container.appendChild(img);
            container.appendChild(p_name);
            container.appendChild(p_salary);
            container.appendChild(button);
            container.appendChild(input);
            return container;
        }
    }
    new Edit;
})();
