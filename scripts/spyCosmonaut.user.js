// ==UserScript==
// @name        Desert Spy and Cosmonaut Helper
// @namespace   Marascripts
// @description Automates Desert Spy and Cosmonaut quests.
// @author      marascripts
// @version     1.1.0
// @require     https://raw.githubusercontent.com/marascript/userscripts/master/scripts/utilities/captcha.js
// @require     https://raw.githubusercontent.com/marascript/userscripts/master/scripts/utilities/priceCheck.js
// @grant       none
// @match       https://www.marapets.com/spy.php*
// @match       https://www.marapets.com/shop.php*
// @match       https://www.marapets.com/cosmonaut.php*
// @run-at      document-idle
// @downloadURL https://raw.githubusercontent.com/marascript/userscripts/master/scripts/spyCosmonaut.user.js
// @homepageURL https://github.com/marascript/userscripts
// @supportURL	https://github.com/marascript/userscripts/issues
// @license     MIT
// ==/UserScript==
/*jshint -W033 */

/**
 * TODO: Use the utilities file for checking prices.
 */

(function () {
    'use strict'

    function checkPrice () {
        const priceCheck = document.querySelector(".dopricecheck")
        priceCheck.click()
    }

    function beginQuest () {
        const accept = document.querySelector("input[value='Accept Quest']")
        const spyAgain = document.querySelector("input[value='Quest Desert Spy Again']")
        const cosmoAgain = document.querySelector("input[value='Quest Cosmonaut Again']")

        if (accept) { accept.click() }
        else if (cosmoAgain) { cosmoAgain.click() }
        else if (spyAgain) { spyAgain.click() }
        else { return }
    }

    function buyItem () {
        const itemToBuy = document.querySelector("div.marapets_border5 a")
        if (itemToBuy) { itemToBuy.click() }

        const yourOffer = document.querySelector("div.middleit.flex-table div span.bigger")
        if (document.URL.includes("do=buy") && yourOffer && !document.getElementById("securitycode")) {
            const buyButton = document.querySelector(".g-recaptcha")
            buyButton.click()
        }

        const completeQuest = document.querySelector("input[value='Complete Quest']")
        if (completeQuest && !document.querySelector(".comebackbox.middleit img")) { completeQuest.click() }
    }

    if (document.URL.includes("shop.php")) { buyItem() }

    if (document.URL.includes("spy.php") || document.URL.includes("cosmonaut.php")) {
        beginQuest()
        checkPrice()

        setTimeout(function () {
            const itemSource = document.querySelector(".pricechecktable .sitedate.same.italic")

            if (itemSource) {
                const stock = itemSource.innerText
                if (stock.includes("stock") && stock.split(" ")[0] !== "0") {
                    window.location.href = itemSource.parentElement.href
                }
            }
        }, 1000)
    }
})()
