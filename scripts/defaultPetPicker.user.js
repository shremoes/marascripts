// ==UserScript==
// @name        Default Pet Picker
// @namespace   Marascripts
// @description Automatically selects your default pet, and does the daily.
// @author      marascripts
// @version     1.0.0
// @grant       none
// @match       https://www.marapets.com/guillotine.php
// @match       https://www.marapets.com/pond.php?i_id=*
// @match       https://www.marapets.com/sewerpipes.php
// @match       https://www.marapets.com/icecaves.php
// @match       https://www.marapets.com/reservoir.php
// @match       https://www.marapets.com/whirlpool.php
// @match       https://www.marapets.com/genie.php
// @match       https://www.marapets.com/pixie.php
// @match       https://www.marapets.com/statue.php
// @match       https://www.marapets.com/elekafountain.php
// @match       https://www.marapets.com/rollercoaster.php
// @match       https://www.marapets.com/portal.php
// @run-at      document-idle
// @downloadURL https://raw.githubusercontent.com/marascript/userscripts/main/scripts/defaultPetPicker.user.js
// @homepageURL https://github.com/marascript/userscripts
// @supportURL	https://github.com/marascript/userscripts/issues
// @license     MIT
// ==/UserScript==
/*jshint -W033 */

(function () {
    'use strict'

    const defaultPetImg = document.querySelector(".defaultpet")

    if (defaultPetImg) {
        const defaultPetLink = defaultPetImg.parentElement
        defaultPetLink.onclick = ""
        defaultPetLink.click()
    }
})()
