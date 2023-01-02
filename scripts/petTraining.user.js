// ==UserScript==
// @name        Pet Training Helper
// @namespace   Marascripts
// @description Pays for pet training and school.
// @author      marascripts
// @version     1.0.0
// @require     https://raw.githubusercontent.com/marascript/userscripts/master/scripts/utilities/priceCheck.js
// @grant       GM_setValue
// @grant       GM_getValue
// @match       https://www.marapets.com/school.php*
// @match       https://www.marapets.com/gym.php*
// @match       https://www.marapets.com/elitegym.php*
// @match       https://www.marapets.com/shops.php*
// @match       https://www.marapets.com/shop.php*
// @run-at      document-idle
// @downloadURL https://raw.githubusercontent.com/marascript/userscripts/master/scripts/petTraining.user.js
// @homepageURL https://github.com/marascript/userscripts
// @supportURL	https://github.com/marascript/userscripts/issues
// @license     MIT
// ==/UserScript==
/*jshint -W033 */
/*jshint -W117 */ // Avoid JSHint errors in editor for GM* functions

/**
 * TODO: Use utilities file for checking prices.
 */

(function () {
    'use strict'

    function payFromAttic () {
        const radio = document.getElementById("location2")
        if (radio) {
            radio.click()
            GM_setValue("attic", 1)
        }
    }

    function setUrl () {
        const pet = document.querySelector(".petwidth a").href.split("?")[1]

        let url = ""
        if (document.URL.includes("/school.php")) { url = `https://www.marapets.com/school.php?do=subjects&${pet}` }
        if (document.URL.includes("/elitegym.php")) { url = `https://www.marapets.com/elitegym.php?do=dogym&${pet}` }
        if (document.URL.includes("/gym.php")) { url = `https://www.marapets.com/gym.php?do=dogym&${pet}` }

        GM_setValue("training", url)
    }

    function getPayButton () {
        const school = document.querySelector("input[value='Pay for Lesson']")
        const gyms = document.querySelector("input[value='Pay for Training']")
        return gyms ? gyms : school
    }

    function clickShopItem () {
        const itemToBuy = GM_getValue("item")
        const allItems = document.querySelectorAll(".itempadding a span.bigger")
        allItems.forEach((item) => {
            const itemName = item.innerText
            if (itemName === itemToBuy) {
                item.click()
            }
        })
    }

    function goToItem (itemToBuy) {
        setTimeout(() => {
            const userShopURL = getUserShop() // Direct URL to buy from user shop
            const inStockURL = checkInStock() // URL to the shop where item is sold
            let itemURL = ""

            // Check if the item is retired, if so, buy from user shop
            const retired = checkRetired()
            if (retired || !inStockURL) { itemURL = userShopURL }

            // Item is not retired, and is in stock
            else {
                // Compare user shop price to NPC shop
                GM_setValue("item", itemToBuy.parentElement.parentElement.querySelector(".itempadding .bigger").innerText)
                const userCheaper = isUserShopCheaper()
                itemURL = !userCheaper ? inStockURL : userShopURL
            }

            window.location.href = itemURL
        }, 1000)
    }

    const TRAINING_URL = GM_getValue("training", "")

    if (!document.URL.includes("shop") && document.URL.includes("?do=")) {
        setUrl()

        const paid = document.querySelector(".maralayoutmiddle span.bigger.middleit")
        if (paid) {
            if (paid.innerText.search("will be finished") > 0) {
                GM_setValue("attic", 0)
                GM_setValue("training", "")
                const goTo = document.URL.split("?")[0]
                window.location.href = goTo
            }
        }

        const payForTraining = getPayButton()
        if (payForTraining) {
            const paidFromAttic = GM_getValue("attic", 0)
            if (paidFromAttic === 0) {
                payFromAttic()
                payForTraining.click()
            }

            if (GM_getValue("bought", 0) === 1) {
                GM_setValue("bought", 0)
                payForTraining.click()
            } else {
                const itemToBuy = document.querySelectorAll(".middleit.flex-table .itemwidth.fixborders a")[0]
                if (itemToBuy) {
                    itemToBuy.click()
                    goToItem(itemToBuy)
                }
            }
        }
    }

    if (document.URL.includes("/shops.php")) {
        GM_setValue("bought", 1)
        window.location.href = TRAINING_URL
    }

    if (document.URL.includes("/shop.php")) {
        clickShopItem()
    }

    if (document.URL.includes("/shop.php?do=buy&id=")) {
        const buyButton = document.querySelector("button")
        buyButton.click()
    }

    const thanksForBuying = document.querySelector(".bigger.middleit.btmpad6")
    if (thanksForBuying) {
        GM_setValue("bought", 1)
        GM_setValue("item", "")
        window.location = TRAINING_URL
    }
})()
