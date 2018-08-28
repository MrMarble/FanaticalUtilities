// ==UserScript==
// @name         Fanatical Steam Cards
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Show if a game contains steam trading cards
// @author       MrMarble
// @match        https://www.fanatical.com/*/bundle/*
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// ==/UserScript==

(function() {
    'use strict';
    $.noConflict();
    let runAgain = true;

    document.getElementsByTagName('body')[0].onload = displayCards;
    jQuery(document).ajaxComplete(function() {
    console.log('DONE!');
    });

    function displayCards(){
        let cardIcon = "https://steamstore-a.akamaihd.net/public/images/v6/ico/ico_cards.png";
        let games = document.querySelectorAll('[href*="steam-trading-cards"]');

        for(let game of games){
            let parent = game.closest(".p-3").previousSibling;
            parent.style.borderRight = "3px solid gold";
            let icon = document.createElement("span").appendChild(document.createTextNode("TEST TEST"));
            parent.closest("svg").parentElement.appendChild(icon);
        }

        if (games == null && runAgain) {
            runAgain = false;
            setTimeout(displayCards, 250);
        }
    }
})();
