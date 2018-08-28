// ==UserScript==
// @name         Fanatical Steam Cards
// @namespace    https://github.com/MrMarble/FanaticalUtilities
// @version      0.5
// @description  Show if a game contains steam trading cards
// @author       MrMarble
// @match        https://www.fanatical.com/*/bundle/*
// @updateURL    https://raw.githubusercontent.com/MrMarble/FanaticalUtilities/master/FanaticalUtilities.user.js
// @downloadURL  https://raw.githubusercontent.com/MrMarble/FanaticalUtilities/master/FanaticalUtilities.user.js
// @grant        GM_addStyle
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// @require      https://raw.githubusercontent.com/MrMarble/FanaticalUtilities/master/waitForKeyElements.js
// ==/UserScript==
(function() {
  'use strict';
  $.noConflict();
  GM_addStyle('div.has-cards {border-right: 3px solid gold}');
  GM_addStyle('span > img.card-icon {width: 26px !important;height: 16px;margin-bottom: 4px;}');

  function displayCards() {
    setTimeout(function() {
      jQuery('[href*="steam-trading-cards"]').each((index, element) => {
        if (!jQuery(element).data('has-cards')) {
          jQuery(element).data('has-cards', true);
          jQuery(element)
            .parents(".p-3")
            .prev()
            .addClass('has-cards')
            .find('span > svg')
            .parent().parent()
            .append('<span><img src="https://steamstore-a.akamaihd.net/public/images/v6/ico/ico_cards.png" class="card-icon"></span>');
        }
      });
    }, 250);
  }

  jQuery(window).on('load', function() {
    waitForKeyElements('div.bundle-accordion', displayCards);
  });
})();
