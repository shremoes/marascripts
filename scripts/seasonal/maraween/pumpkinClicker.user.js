// ==UserScript==
// @name        Pumpkin Clicker
// @namespace   Marascripts
// @description Clicks pumpkins as they appear around the site.
// @author      marascripts
// @version     2.0.0
// @grant       GM_setValue
// @grant       GM_getValue
// @match       https://www.marapets.com/*
// @run-at      document-idle
// @downloadURL https://raw.githubusercontent.com/marascript/userscripts/master/scripts/seasonal/maraween/pumpkinClicker.user.js
// @homepageURL https://github.com/marascript/userscripts
// @supportURL	https://github.com/marascript/userscripts/issues
// @license     MIT
// ==/UserScript==
/*jshint -W033 */
/*jshint -W117 */ // Avoid JSHint errors in editor for GM* functions

(function () {
    "use strict"

    const balloon = document.querySelector(".pumpkineventbox a")
    if (balloon) {
        window.open(balloon.href, 'balloon', 'width=100,height=100,top=0,left=0,resizable=no')
    }
})()
