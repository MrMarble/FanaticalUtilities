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
// @grant        GM_getResourceText
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// @require      https://raw.githubusercontent.com/MrMarble/FanaticalUtilities/master/waitForKeyElements.js
// @require      https://openuserjs.org/src/libs/sizzle/GM_config.js
// @resource     style https://raw.githubusercontent.com/MrMarble/FanaticalUtilities/master/style.css
// ==/UserScript==
(function() {
  'use strict';
  $.noConflict();
  GM_addStyle(GM_getResourceText('style'));

  GM_config.init({
    'id': 'fanatical-utilities', // The id used for this instance of GM_config
    'title': 'Fanatical Utilities Settings', // Panel Title
    'fields': // Fields object
    {
      'Name': // This is the id of the field
      {
        'label': 'Steam Api Key', // Appears next to field
        'type': 'text', // Makes this setting a text field
      }
    }
  });

  function configButton() {
    jQuery('body').append('<div id="utilities-settings"><img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMS4xLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDI2OC43NjUgMjY4Ljc2NSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMjY4Ljc2NSAyNjguNzY1OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCI+CjxnIGlkPSJTZXR0aW5ncyI+Cgk8Zz4KCQk8cGF0aCBzdHlsZT0iZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7IiBkPSJNMjY3LjkyLDExOS40NjFjLTAuNDI1LTMuNzc4LTQuODMtNi42MTctOC42MzktNi42MTcgICAgYy0xMi4zMTUsMC0yMy4yNDMtNy4yMzEtMjcuODI2LTE4LjQxNGMtNC42ODItMTEuNDU0LTEuNjYzLTI0LjgxMiw3LjUxNS0zMy4yMzFjMi44ODktMi42NDEsMy4yNC03LjA2MiwwLjgxNy0xMC4xMzMgICAgYy02LjMwMy04LjAwNC0xMy40NjctMTUuMjM0LTIxLjI4OS0yMS41Yy0zLjA2My0yLjQ1OC03LjU1Ny0yLjExNi0xMC4yMTMsMC44MjVjLTguMDEsOC44NzEtMjIuMzk4LDEyLjE2OC0zMy41MTYsNy41MjkgICAgYy0xMS41Ny00Ljg2Ny0xOC44NjYtMTYuNTkxLTE4LjE1Mi0yOS4xNzZjMC4yMzUtMy45NTMtMi42NTQtNy4zOS02LjU5NS03Ljg0OWMtMTAuMDM4LTEuMTYxLTIwLjE2NC0xLjE5Ny0zMC4yMzItMC4wOCAgICBjLTMuODk2LDAuNDMtNi43ODUsMy43ODYtNi42NTQsNy42ODljMC40MzgsMTIuNDYxLTYuOTQ2LDIzLjk4LTE4LjQwMSwyOC42NzJjLTEwLjk4NSw0LjQ4Ny0yNS4yNzIsMS4yMTgtMzMuMjY2LTcuNTc0ICAgIGMtMi42NDItMi44OTYtNy4wNjMtMy4yNTItMTAuMTQxLTAuODUzYy04LjA1NCw2LjMxOS0xNS4zNzksMTMuNTU1LTIxLjc0LDIxLjQ5M2MtMi40ODEsMy4wODYtMi4xMTYsNy41NTksMC44MDIsMTAuMjE0ICAgIGM5LjM1Myw4LjQ3LDEyLjM3MywyMS45NDQsNy41MTQsMzMuNTNjLTQuNjM5LDExLjA0Ni0xNi4xMDksMTguMTY1LTI5LjI0LDE4LjE2NWMtNC4yNjEtMC4xMzctNy4yOTYsMi43MjMtNy43NjIsNi41OTcgICAgYy0xLjE4MiwxMC4wOTYtMS4xOTYsMjAuMzgzLTAuMDU4LDMwLjU2MWMwLjQyMiwzLjc5NCw0Ljk2MSw2LjYwOCw4LjgxMiw2LjYwOGMxMS43MDItMC4yOTksMjIuOTM3LDYuOTQ2LDI3LjY1LDE4LjQxNSAgICBjNC42OTgsMTEuNDU0LDEuNjc4LDI0LjgwNC03LjUxNCwzMy4yM2MtMi44NzUsMi42NDEtMy4yNCw3LjA1NS0wLjgxNywxMC4xMjZjNi4yNDQsNy45NTMsMTMuNDA5LDE1LjE5LDIxLjI1OSwyMS41MDggICAgYzMuMDc5LDIuNDgxLDcuNTU5LDIuMTMxLDEwLjIyOC0wLjgxYzguMDQtOC44OTMsMjIuNDI3LTEyLjE4NCwzMy41MDEtNy41MzZjMTEuNTk5LDQuODUyLDE4Ljg5NSwxNi41NzUsMTguMTgxLDI5LjE2NyAgICBjLTAuMjMzLDMuOTU1LDIuNjcsNy4zOTgsNi41OTUsNy44NWM1LjEzNSwwLjU5OSwxMC4zMDEsMC44OTgsMTUuNDgxLDAuODk4YzQuOTE3LDAsOS44MzUtMC4yNywxNC43NTItMC44MTcgICAgYzMuODk3LTAuNDMsNi43ODQtMy43ODYsNi42NTMtNy42OTZjLTAuNDUxLTEyLjQ1NCw2Ljk0Ni0yMy45NzMsMTguMzg2LTI4LjY1N2MxMS4wNTktNC41MTcsMjUuMjg2LTEuMjExLDMzLjI4MSw3LjU3MiAgICBjMi42NTcsMi44OSw3LjA0NywzLjIzOSwxMC4xNDIsMC44NDhjOC4wMzktNi4zMDQsMTUuMzQ5LTEzLjUzNCwyMS43NC0yMS40OTRjMi40OC0zLjA3OSwyLjEzLTcuNTU5LTAuODAzLTEwLjIxMyAgICBjLTkuMzUzLTguNDctMTIuMzg4LTIxLjk0Ni03LjUyOS0zMy41MjRjNC41NjgtMTAuODk5LDE1LjYxMi0xOC4yMTcsMjcuNDkxLTE4LjIxN2wxLjY2MiwwLjA0MyAgICBjMy44NTMsMC4zMTMsNy4zOTgtMi42NTUsNy44NjUtNi41ODhDMjY5LjA0NCwxMzkuOTE3LDI2OS4wNTgsMTI5LjYzOSwyNjcuOTIsMTE5LjQ2MXogTTEzNC41OTUsMTc5LjQ5MSAgICBjLTI0LjcxOCwwLTQ0LjgyNC0yMC4xMDYtNDQuODI0LTQ0LjgyNGMwLTI0LjcxNywyMC4xMDYtNDQuODI0LDQ0LjgyNC00NC44MjRjMjQuNzE3LDAsNDQuODIzLDIwLjEwNyw0NC44MjMsNDQuODI0ICAgIEMxNzkuNDE4LDE1OS4zODUsMTU5LjMxMiwxNzkuNDkxLDEzNC41OTUsMTc5LjQ5MXoiIGZpbGw9IiNGRkZGRkYiLz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K" /></div>');
    jQuery('#utilities-settings').on('click', function() {
      GM_config.open()
    });
  }

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
    configButton();
    waitForKeyElements('div.bundle-accordion', displayCards);
  });
})();
