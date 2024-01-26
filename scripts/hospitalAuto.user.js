// ==UserScript==
// @name        Hospital Auto
// @namespace   Marascripts
// @description Cures all pets at the hospital.
// @author      marascripts
// @version     1.0.0
// @grant       none
// @match       https://www.marapets.com/hospital.php*
// @downloadURL https://raw.githubusercontent.com/marascript/userscripts/master/scripts/hospitalAuto.user.js
// @homepageURL https://github.com/marascript/userscripts
// @supportURL	https://github.com/marascript/userscripts/issues
// @license     MIT
// ==/UserScript==

(() => {
    'use strict'

    const selectAll = document.querySelector("input[value='Select All Pets']")
    selectAll.click()

    const curePets = document.querySelector("input[value='Cure Pets']")
    curePets.click()
})()
