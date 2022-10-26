// ==UserScript==
// @name        Page Refresher
// @namespace   Marascripts
// @description Refreshes a pages at a given interval.
// @author      marascripts
// @version     1.0.0
// @grant       none
// @match       
// @run-at      document-idle
// @downloadURL https://raw.githubusercontent.com/marascript/userscripts/main/scripts/utilities/refresher.user.js
// @homepageURL https://github.com/marascript/userscripts
// @supportURL	https://github.com/marascript/userscripts/issues
// @license     MIT
// ==/UserScript==
/*jshint -W033 */

/**
 * ! Add URLS you want to match on their own line in the block above
 * ! This won't do anything unless another script interact with the page
 * 
 * * This just reloads the page, and if another script clicks or does something
 * * this will do it again, and then go back to the original page.
 */

(function () {
    'use strict'

    // * Set the amount of time in milliseconds
    const INTERVAL = 100000

    setTimeout(() => {
        location.href = document.URL.split("?")[0]
        location.reload()
    }, INTERVAL)
})()
