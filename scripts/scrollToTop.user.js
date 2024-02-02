// ==UserScript==
// @name        Scroll to Top
// @namespace   Marascripts
// @description Adds a button on every page which scrolls to the top.
// @author      marascripts
// @version     1.0.1
// @grant       none
// @match       https://www.marapets.com*
// @downloadURL https://raw.githubusercontent.com/marascript/userscripts/master/scripts/scrollToTop.user.js
// @homepageURL https://github.com/marascript/userscripts
// @supportURL	https://github.com/marascript/userscripts/issues
// @license     MIT
// ==/UserScript==

(() => {
    'use strict'

    const toTopButton = document.createElement('a')
    toTopButton.innerText = '⬆️'
    toTopButton.style.cursor = 'pointer'
    toTopButton.style.fontSize = '3em'

    // Anchor to bottom of page
    toTopButton.style.position = 'fixed'
    toTopButton.style.bottom = '5%'
    toTopButton.style.right = '2%'

    // Make button slightly opaque until hover
    toTopButton.style.opacity = 0.25
    toTopButton.onmouseenter = () => toTopButton.style.opacity = 1
    toTopButton.onmouseleave = () => toTopButton.style.opacity = 0.25

    // Scroll to top, without modifying URL
    toTopButton.onclick = () => window.scrollTo(0, 0)

    document.querySelector('body').appendChild(toTopButton)
})()
