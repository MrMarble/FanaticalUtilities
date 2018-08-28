// ==UserScript==
// @name         Fanatical Steam Cards
// @namespace    https://github.com/MrMarble/FanaticalUtilities
// @version      0.2
// @description  Show if a game contains steam trading cards
// @author       MrMarble
// @match        https://www.fanatical.com/*/bundle/*
// @updateURL    https://raw.githubusercontent.com/MrMarble/FanaticalUtilities/master/FanaticalUtilities.user.js
// @downloadURL  https://raw.githubusercontent.com/MrMarble/FanaticalUtilities/master/FanaticalUtilities.user.js
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// @require      https://raw.githubusercontent.com/MrMarble/FanaticalUtilities/master/waitForKeyElements.js
// @resource     https://steamstore-a.akamaihd.net/public/images/v6/ico/ico_cards.png
// ==/UserScript==
(function() {
  'use strict';
  $.noConflict();

  function displayCards() {
    let games = document.querySelectorAll('[href*="steam-trading-cards"]');

    for (let game of games) {
      let parent = game.closest(".p-3").previousSibling;
      parent.style.borderRight = "3px solid gold";
    }
  }

  waitForKeyElements('[data-product-id]', displayCards);
})();
