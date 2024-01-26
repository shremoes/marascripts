// ==UserScript==
// @name        Banking Assistant
// @namespace   Marascripts
// @description Collects interest at banks, and enters PIN at ATM.
// @author      marascripts
// @version     1.0.0
// @grant       none
// @match       https://www.marapets.com/atm.php
// @match       https://www.marapets.com/bpbank.php
// @match       https://www.marapets.com/rpbank.php
// @match       https://www.marapets.com/bank.php
// @downloadURL https://raw.githubusercontent.com/marascript/userscripts/master/scripts/bankingAssistant.user.js
// @homepageURL https://github.com/marascript/userscripts
// @supportURL	https://github.com/marascript/userscripts/issues
// @license     MIT
// ==/UserScript==

(() => {
    'use strict'

    // At ATM automatically fill in PIN fields
    if (location.pathname === "/atm.php") {
        /**
         * * Put PIN here. Don't think it matters though.
         */
        const MY_PIN = "0000"

        document.querySelector("form[action='https://www.marapets.com/atm.php?do=deposit'] input[name='pin']").value = MY_PIN
        document.querySelector("form[action='https://www.marapets.com/atm.php?do=withdraw'] input[name='pin']").value = MY_PIN
    }

    // If at any bank collect interest, and return to banking page
    else {
        const collectInterest = [...document.querySelectorAll("input")].find((e) => e.value.includes("Interest"))
        if (collectInterest) {
            collectInterest.click()
        }

        if (document.querySelector(".emailtop")) {
            document.querySelector(".mainfeature_art a").click()
        }
    }
})()
