// ==UserScript==
// @name        Event Item Clicker
// @namespace   Marascripts
// @description Click event boxes when they appear.
// @author      marascripts
// @version     1.0.2
// @grant       none
// @match       https://www.marapets.com/*
// @homepageURL https://github.com/marascript/userscripts
// @supportURL	https://github.com/marascript/userscripts/issues
// @license     MIT
// ==/UserScript==

(() => {
    "use strict"

    const boxToClick = document.querySelector(".birthdayeventbox a")
        ? document.querySelector(".birthdayeventbox a")
        : document.querySelector(".pumpkineventbox a")

    if (boxToClick) {
        window.open(boxToClick.href, 'eventitem', 'width=100,height=100,top=0,left=0,resizable=no')
    }
})()
