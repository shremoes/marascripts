// ==UserScript==
// @name        Mystery Item Guesser
// @namespace   Marascripts
// @description Fills in known Mystery Items, WIP as I add more.
// @author      marascripts
// @version     1.1.10
// @require     https://raw.githubusercontent.com/marascript/userscripts/master/scripts/utilities/mysteryItems.js     
// @grant       none
// @match       https://www.marapets.com/icefairy.php
// @run-at      document-idle
// @downloadURL https://raw.githubusercontent.com/marascript/userscripts/master/scripts/mysteryItem.user.js
// @homepageURL https://github.com/marascript/userscripts
// @supportURL	https://github.com/marascript/userscripts/issues
// @license     MIT
// ==/UserScript==
/*jshint -W033 */
/*jshint -W117 */

// ! Some answers may be incorrect or misspelled.

(function () {
    'use strict'

    const todaysItem = document.querySelector(".middleit .marapets_border").src.split("/")[4]

    if (knownItems[todaysItem]) {
        document.querySelector("input[name='item']").value = knownItems[todaysItem]
    }
})()
