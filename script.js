// script.js
const burger = document.getElementById('burger');
const navMenu = document.getElementById('nav-menu');

burger.addEventListener('click', () => {
    navMenu.querySelector('ul').classList.toggle('active');
});
