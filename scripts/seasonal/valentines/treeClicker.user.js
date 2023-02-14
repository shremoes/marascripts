// ==UserScript==
// @name        Candy Tree Clicker
// @namespace   Marascripts
// @description Clicks Candy Tree every 15 minutes.
// @author      marascripts
// @version     1.0.0
// @grant       none
// @match       https://www.marapets.com/candytree.php*
// @run-at      document-idle
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
        location.href = "https://www.marapets.com/candytree.php"
    }

    else {
        if (!document.querySelector(".middleit.comebackbox")) {
            location.href = `https://www.marapets.com/candytree.php?do=valentines&pet_id=${PET_ID}`
        }

        else {
            setTimeout(() => {
                location.href = "https://www.marapets.com/candytree.php"
            }, 15000)
        }
    }
})()
