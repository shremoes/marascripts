// ==UserScript==
// @name        Shop Pricer Easymode
// @namespace   Marascripts
// @description Automatically prices shop, requires the Gift Box.
// @author      marascripts
// @version     1.0.0
// @grant       none
// @match       https://www.marapets.com/viewstock.php*
// @run-at      document-idle
// @downloadURL https://raw.githubusercontent.com/marascript/userscripts/master/scripts/shopPricer.user.js
// @homepageURL https://github.com/marascript/userscripts
// @supportURL	https://github.com/marascript/userscripts/issues
// @license     MIT
// ==/UserScript==
/*jshint -W033 */

(function () {
    "use strict"

    if (document.referrer.includes("/viewstock")) {
        /**
         * * Set this to the amount of seconds to delay, in milliseconds
         * */
        const TIMEOUT = 150000

        const noReprice = document.querySelector(".maralayoutmiddle .bigger.banned.middleit") // Nothing to reprice
        const changed = document.querySelector(".maralayoutmiddle .bigger.middleit").innerText.search("You have changed") // Confirmed reprices
        const autoPriced = document.querySelector(".maralayoutmiddle .bigger.middleit").innerText.search("has changed") // Repricer changed prices

        // Click the "Auto Price" button, if none of the messages are present
        if (autoPriced === -1 && changed === -1 && !noReprice) {
            document.querySelector("input[value='Auto Price']").click()
        }

        // Click the "Update Prices" button, if the auto pricer message is there
        if (autoPriced !== -1) {
            // const mediumDrop = document.querySelectorAll(".marapets_border14")
            const largeDrop = document.querySelectorAll(".marapets_border15")
            if (largeDrop.length !== 0) {
                largeDrop.forEach((item) => {
                    const oldPrice = item.querySelector(".mp").innerText.split("MP")[0].replace(/,/g, "")
                    item.querySelector("input").value = oldPrice
                })
            }

            document.querySelector("input[value='Update Prices']").click()
        }

        // Go to the next page, or alert that we are finished
        if (noReprice || changed !== -1) {
            const pageButtons = document.querySelectorAll(".pages_all")[0].querySelectorAll(".pages_each a") // Array of the page selector
            const secondToLastPageButton = pageButtons[pageButtons.length - 2] // The second to last button

            // If the second to last button says "Next >", click it otherwise notify we are finished
            if (secondToLastPageButton.innerText === "Next ›") {
                secondToLastPageButton.click()
            } else {
                setTimeout(() => {
                    window.location.href = "https://www.marapets.com/viewstock.php?page=1"
                }, TIMEOUT)
            }
        }
    }
})()
