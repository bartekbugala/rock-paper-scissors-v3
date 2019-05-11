'use strict';
(function () {

   const modals = document.querySelectorAll('.modal');

    const showModal = function (event) {
        event.preventDefault();
        for (let i = 0; i < modalLinks.length; i++) {
            modals[i].classList.remove('show');
        }
        document.querySelector('#modal-overlay').classList.add('show');
        document.querySelector(this.getAttribute('href')).classList.add('show');
    };

    const modalLinks = document.querySelectorAll('.show-modal');

    for (let i = 0; i < modalLinks.length; i++) {
        modalLinks[i].addEventListener('click', showModal);

    }

    const hideModal = function (event) {
        event.preventDefault();
        document.querySelector('#modal-overlay').classList.remove('show');
    };

    const closeButtons = document.querySelectorAll('.modal .close');

    for (let i = 0; i < closeButtons.length; i++) {
        closeButtons[i].addEventListener('click', hideModal);
    }
    document.querySelector('#modal-overlay').addEventListener('click', hideModal);


    for (let i = 0; i < modals.length; i++) {
        modals[i].addEventListener('click', function (event) {
            event.stopPropagation();
        });
    }

})(); 