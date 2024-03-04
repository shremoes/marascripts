// ==UserScript==
// @name        Quest Helper
// @namespace   Marascripts
// @description Quest automater.
// @author      marascripts
// @version     1.2.0
// @require     https://raw.githubusercontent.com/marascript/userscripts/master/scripts/utilities/priceCheck.js
// @require     https://raw.githubusercontent.com/marascript/userscripts/master/scripts/utilities/captcha.js
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
// @match       https://www.marapets.com/leprechaun.php*
// @license     MIT
// @downloadURL https://raw.githubusercontent.com/marascript/userscripts/master/scripts/questHelper.user.js
// @homepageURL https://github.com/marascript/userscripts
// @supportURL	https://github.com/marascript/userscripts/issues
// @license     MIT
// ==/UserScript==

/**
 * ! Conflicts with other questing scripts.
 * TODO: Log cost vs. reward, and prizes
 * TODO: Allow setting limit for all quests
 * TODO: Save requested items instead of using image selectors
 * TODO: Fix duplicate item bug
 */

(() => {
    'use strict'

    function checkCaptcha() {
        return document.getElementById("securitycode") ? true : false
    }

    function setQuestUrl() {
        const questGiver = document.querySelector(".maralayoutmiddle .mainfeature_start .mainfeature_npc")
        if (questGiver) {
            const moreQuests = questGiver.innerText.trim()
            if (moreQuests === "Complete more Quests") {
                const questUrl = document.URL.split("?")[0]
                localStorage.setItem("quest", questUrl)
            }
        }
    }

    async function checkFirstItem() {
        const questItems = getQuestItems()
        localStorage.setItem("items", questItems)

        if (questItems[0]) {
            priceCheckById(questItems[0].check)
            setTimeout(function () {
                const itemURL = doPriceCheck()
                goTo(itemURL)
            }, 1500)
        } else if (!checkCaptcha()) { document.querySelector("input[value='Complete Quest']").click() }
    }

    function getLocation() {
        setQuestUrl()
        const questURL = localStorage.getItem("quest", "")

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

        if (document.URL.includes("/shop.php?do=buy&id=") && !document.querySelector("input[name='code']")) {
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

        /**
         * Computer Repair settings
         * ? For jobs, you can set the amount of quests to do for Magic stats
         * Set this to the amount of quests to do.
         */
        let questsToDo = 0

        const questsProgress = GM_getValue("comp_quests", 0)
        const questComp = document.querySelector("input[value='Quest Computer Repair Again']")

        if (questComp && questsToDo !== questsProgress) {
            GM_setValue("comp_quests", questsProgress + 1)
            console.log(questsProgress)
            questComp.click()
        }

        if (document.URL.includes("/viewstock.php")) { window.location.href = questURL }
    }

    getLocation()
})()
