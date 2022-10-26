// ==UserScript==
// @name        Pumpkin Clicker
// @namespace   Marascripts
// @description Clicks pumpkins as they appear around the site.
// @author      marascripts
// @version     1.0.5
// @grant       none
// @match       https://www.marapets.com/*
// @run-at      document-idle
// @downloadURL https://raw.githubusercontent.com/marascript/userscripts/master/scripts/maraween/pumpkinClicker.user.js
// @homepageURL https://github.com/marascript/userscripts
// @supportURL	https://github.com/marascript/userscripts/issues
// @license     MIT
// ==/UserScript==
/*jshint -W033 */

(function () {
    'use strict'

    /**
     * Needs to be changed every year.
     */
    const IMG_SRC = "https://images.marapets.com/items/2022-pumpkin.png"

    const pumpkin = document.querySelector(`.pumpkineventbox img[src='${IMG_SRC}']`)
    if (pumpkin) {
        window.open(pumpkin.parentElement.href, 'pumpkin', 'width=100,height=100,top=0,left=0,resizable=no')
    }
})()
