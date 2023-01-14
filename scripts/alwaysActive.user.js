// ==UserScript==
// @name        Always Active
// @namespace   Marascripts
// @description Makes window always appear as active.
// @author      marascripts
// @version     1.0.0
// @grant       none
// @match       https://www.marapets.com/*
// @run-at      document-idle
// @downloadURL https://raw.githubusercontent.com/marascript/userscripts/master/scripts/alwaysActive.user.js
// @homepageURL https://github.com/marascript/userscripts
// @supportURL	https://github.com/marascript/userscripts/issues
// @license     MIT
// ==/UserScript==
/*jshint -W033 */

/**
 * Makes it so you can play games and they will still run if the tab is not focused.
 */

(function () {
    'use strict'

    Object.defineProperty(document, "hidden", { value: false })
    Object.defineProperty(document, "mozHidden", { value: false })
    Object.defineProperty(document, "msHidden", { value: false })
    Object.defineProperty(document, "webkitHidden", { value: false })
    Object.defineProperty(document, 'visibilityState', { get: function () { return "visible" } })

    for (const event_name of [
        "visibilitychange",
        "webkitvisibilitychange",
        "blur",
        "mozvisibilitychange",
        "msvisibilitychange"
    ]) {
        window.addEventListener(event_name, (event) => {
            event.stopImmediatePropagation()
        }, true)
    }
})()
