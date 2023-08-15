// ==UserScript==
// @name        Balloon Popper
// @namespace   Marascripts
// @description Click balloons when they appear.
// @author      marascripts
// @version     1.0.2
// @grant       none
// @include     https://www.marapets.com/*
// @run-at      document-idle
// @downloadURL https://raw.githubusercontent.com/marascript/userscripts/master/scripts/seasonal/birthday/balloonPopper.user.js
// @homepageURL https://github.com/marascript/userscripts
// @supportURL	https://github.com/marascript/userscripts/issues
// @license     MIT
// ==/UserScript==
/*jshint -W033 */

(function () {
    "use strict"

    const balloon = document.querySelector(".birthdayeventbox a")
    if (balloon) {
        window.open(balloon.href, 'balloon', 'width=100,height=100,top=0,left=0,resizable=no')
    }
})()
