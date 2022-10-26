// ==UserScript==
// @name        Quest Helper
// @namespace   Marascripts
// @description Quest automater.
// @author      marascripts
// @version     1.0.0
// @require     https://raw.githubusercontent.com/marascript/userscripts/master/scripts/utilities/priceCheck.user.js
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

    function isUserShopCheaper () {
        const userPrice = parseInt(document.querySelector(".alsotry.same.strong").innerText.split(" ")[2].split("MP")[0].replace(/,/g, ""))
        const shopPrice = parseInt(document.querySelector("span.sitedate.same.italic").innerText.split(" ").pop().split("MP")[0].replace(/,/g, ""))
        return shopPrice <= userPrice ? false : true
    }

    function checkInStock () {
        const itemSource = document.querySelector(".pricechecktable .sitedate.same.italic")
        if (itemSource) {
            const stock = itemSource.innerText
            return (stock.includes("stock") && stock.split(" ")[0] !== "0") ? itemSource.parentElement.href : null
        } else { return null }
    }

    function checkRetired () {
        const retired = document.querySelector(".pricechecktable .banned.same.italic")
        const retiredAlt = document.querySelector(".pricechecktable .offline.same.italic")
        return retired || retiredAlt ? true : false
    }

    function getAttic () {
        const atticCount = document.querySelector(".pricecheckcontent .banned.same")
        return parseInt(atticCount.innerText.split(" ")[0]) === 0 ? null : atticCount.parentElement.href
    }

    function getUserShop () {
        const userShopLink = document.querySelector(".pricechecktable .alsotry.same.strong")
        return userShopLink ? userShopLink.parentElement.href : null
    }

    function goToItem (url) {
        location.href = url
    }

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

    function getItems () {
        const questItemsTable = document.querySelector(".bigsearchbox.middleit .flex-table2")

        if (questItemsTable) {
            const itemsNeeded = {}
            const itemElements = [...questItemsTable.children]

            let index = 0
            itemElements.forEach((item) => {
                const obtained = item.querySelector(".bigger").innerHTML.includes("/tick.png")

                if (!obtained) {
                    const itemName = item.querySelector(".bigger").innerText
                    const priceCheck = item.querySelector(".petpadding a").getAttribute("data-id")

                    itemsNeeded[index] = {
                        "name": itemName,
                        "check": priceCheck
                    }

                    index += 1
                }
            })

            GM_setValue("items", itemsNeeded)
            return itemsNeeded
        }
    }

    async function checkFirstItem () {
        const questItems = getItems()

        if (questItems[0]) {
            const itemId = questItems[0].check
            document.querySelector(`a[data-id='${itemId}']`).click()

            setTimeout(function () {
                let itemURL = ""

                const atticURL = getAttic()
                if (atticURL !== null) { itemURL = atticURL }

                else {
                    const userShopURL = getUserShop()
                    const inStockURL = checkInStock()

                    const retired = checkRetired()
                    if (retired || !inStockURL) { itemURL = userShopURL }

                    else {
                        const userCheaper = isUserShopCheaper()
                        if (!userCheaper) { itemURL = inStockURL }
                        else { itemURL = userShopURL }
                    }
                }

                goToItem(itemURL)
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
