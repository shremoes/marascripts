// ==UserScript==
// @name        Elger Clicker
// @namespace   Marascripts
// @description Clicks Elger every 15 minutes.
// @author      marascripts
// @version     1.0.0
// @grant       none
// @match       https://www.marapets.com/elger.php*
// @run-at      document-idle
// @downloadURL https://raw.githubusercontent.com/marascript/userscripts/main/scripts/maraween/elgerClicker.user.js
// @homepageURL https://github.com/marascript/userscripts
// @supportURL	https://github.com/marascript/userscripts/issues
// @license     MIT
// ==/UserScript==
/*jshint -W033 */

(function () {
    'use strict'
    /**
     * Put pets ID here.
     */
     const PET_ID = 11111111

     if (document.URL.includes("pet_id")) {
         location.href = "https://www.marapets.com/elger.php"
     }

     else {
        if (!document.querySelector(".middleit.comebackbox")) {
            location.href = `https://www.marapets.com/elger.php?do=halloween&pet_id=${PET_ID}`
        }

        else {
            setTimeout(() => {
                location.href = "https://www.marapets.com/elger.php"
            }, 15000)
        }
     }
})()
