// ==UserScript==
// @name        Feeding Easier
// @namespace   Marascripts
// @description Only shows available options for Aquarium, Hump Racing, Knutt House, Robot Repair, and Eleka Prison.
// @author      marascripts
// @version     1.0.1
// @grant       none
// @match       https://www.marapets.com/aquarium.php*
// @match       https://www.marapets.com/humpracing.php*
// @match       https://www.marapets.com/knutthouse.php*
// @match       https://www.marapets.com/robots.php*
// @match       https://www.marapets.com/elekaprison.php*
// @downloadURL https://raw.githubusercontent.com/marascript/userscripts/master/scripts/feedingEasier.user.js
// @homepageURL https://github.com/marascript/userscripts
// @supportURL	https://github.com/marascript/userscripts/issues
// @license     MIT
// ==/UserScript==

(() => {
    'use strict'

    if (document.URL.includes("/aquarium.php") || document.URL.includes("/robots.php") || document.URL.includes("/elekaprison.php")) {
        const allOptions = document.querySelectorAll("#eachitemdiv")

        for (const option in allOptions) {
            const currentOption = allOptions[option]

            // Hide fed option
            if (currentOption.classList.contains("fadeit2")) {
                currentOption.remove()
            }
        }
    }

    if (document.URL.includes("/humpracing.php") || document.URL.includes("/knutthouse.php")) {
        const fedPets = document.querySelectorAll(".fadeit2")

        for (const pet in fedPets) {
            fedPets[pet].parentElement.parentElement.remove()
        }
    }
})()
