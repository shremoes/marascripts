// ==UserScript==
// @name        Quest Helper
// @namespace   Marascripts
// @description Quest automater.
// @author      marascripts
// @version     1.1.1
// @require     https://raw.githubusercontent.com/marascript/userscripts/master/scripts/utilities/priceCheck.js
// @grant       GM_setValue
// @grant       GM_getValue
// @match       https://www.marapets.com/carpenter.php*
// @match       https://www.marapets.com/shop.php*
// @match       https://www.marapets.com/shops.php*
// @match       https://www.marapets.com/attic.php*
// @match       https://www.marapets.com/elger.php*
// @match       https://www.marapets.com/bee.php*
// @match       https://www.marapets.com/brew.php*
// @match       https://www.marapets.com/viewstock.php*
// @match       https://www.marapets.com/traveller.php*
// @match       https://www.marapets.com/excavator.php*
// @match       https://www.marapets.com/farm.php*
// @match       https://www.marapets.com/computer.php*
// @match       https://www.marapets.com/explorer.php*
// @match       https://www.marapets.com/candytree.php*
// @match       https://www.marapets.com/inn.php*
// @match       https://www.marapets.com/monster.php*
// @match       https://www.marapets.com/brew.php*
// @match       https://www.marapets.com/garage.php*
// @match       https://www.marapets.com/santa.php*
// @match       https://www.marapets.com/truck.php*
// @license     MIT
// @run-at      document-idle
// @downloadURL https://raw.githubusercontent.com/marascript/userscripts/master/scripts/questHelper.user.js
// @homepageURL https://github.com/marascript/userscripts
// @supportURL	https://github.com/marascript/userscripts/issues
// @license     MIT
// ==/UserScript==
/*jshint -W033 */
/*jshint -W117 */ // Avoid JSHint errors in editor for GM* functions

(function () {
    'use strict'

    function checkCaptcha () {
        return document.getElementById("securitycode") ? true : false
    }

    function setQuestUrl () {
        const questGiver = document.querySelector(".maralayoutmiddle .mainfeature_start .mainfeature_npc")
        if (questGiver) {
            const moreQuests = questGiver.innerText.trim()
            if (moreQuests === "Complete more Quests") {
                const questUrl = document.URL.split("?")[0]
                GM_setValue("quest", questUrl)
            }
        }
    }

    async function checkFirstItem () {
        const questItems = getQuestItems()
        GM_setValue("items", questItems)

        if (questItems[0]) {
            priceCheckById(questItems[0].check)
            setTimeout(function () {
                const itemURL = doPriceCheck()
                goTo(itemURL)
            }, 1500)
        } else if (!checkCaptcha()) { document.querySelector("input[value='Complete Quest']").click() }
    }

    function getLocation () {
        setQuestUrl()
        const questURL = GM_getValue("quest", "")

        if (document.URL.includes(questURL)) {
            const message = document.querySelector(".maralayoutmiddle div.bigger.middleit.btmpad6")
            if (message) {
                if (message.innerText.includes("Thank you for finishing my quest")) {
                    const questAgain = document.querySelector(".maralayoutmiddle form input")
                    questAgain.click()
                }
            }
            else { checkFirstItem() }
        }

        if (document.URL.includes("/shops.php")) { window.location = questURL }

        if (document.URL.includes("/shop.php")) {
            const itemToBuy = document.querySelector("div.marapets_border5 a")
            if (itemToBuy) { itemToBuy.click() }

            const thanksForBuying = document.querySelector(".bigger.middleit.btmpad6")
            if (thanksForBuying) { window.location = questURL }
        }

        if (document.URL.includes("/shop.php?do=buy&id=")) {
            const buyButton = document.querySelector("button")
            buyButton.click()
        }

        if (document.URL.includes("/attic.php")) {
            if (!document.URL.includes("?remove=1")) {
                const inventory = document.querySelector("input[value='Inventory']")
                if (inventory) { inventory.click() }
            }
            else { window.location.href = questURL }
        }

        if (document.URL.includes("/viewstock.php")) { window.location.href = questURL }
    }

    getLocation()
})()
