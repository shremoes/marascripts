// ==UserScript==
// @name        Snowman and Secret Santa Helper
// @namespace   Marascripts
// @description Automates Snowman and Secret Santa quests.
// @author      marascripts
// @version     1.1.0
// @require     https://raw.githubusercontent.com/marascript/userscripts/master/scripts/utilities/priceCheck.js
// @require     https://raw.githubusercontent.com/marascript/userscripts/master/scripts/utilities/captcha.js
// @grant       none
// @match       https://www.marapets.com/item.php*
// @match       https://www.marapets.com/market.php*
// @match       https://www.marapets.com/secret.php*
// @match       https://www.marapets.com/snowman.php*
// @match       https://www.marapets.com/shop.php*
// @match       https://www.marapets.com/shops.php*
// @match       https://www.marapets.com/attic.php*
// @run-at      document-idle
// @downloadURL https://raw.githubusercontent.com/marascript/userscripts/master/scripts/snowmanSantaHelper.user.js
// @homepageURL https://github.com/marascript/userscripts
// @supportURL	https://github.com/marascript/userscripts/issues
// @license     MIT
// ==/UserScript==
/*jshint -W033 */

/**
 * TODO: Use the utilities file for checking prices.
 */

(function () {
    "use strict"

    const captcha = document.querySelector("input[name='code']")

    function getAttic () {
        const atticCount = document.querySelector(".pricecheckcontent .banned.same")
        return parseInt(atticCount.innerText.split(" ")[0]) === 0 ? null : atticCount.parentElement.href
    }

    if (document.URL.includes("secret.php") || document.URL.includes("snowman.php")) {
        const again = document.querySelector("input[value='Quest Secret Santa Again']")
        const snowmanAgain = document.querySelector("input[value='Quest Snowman Again']")
        const accept = document.querySelector("input[value='Accept Quest']")
        const complete = document.querySelector("input[value='Complete Quest']")
        const hasItem = document.querySelector("form[action='?do=doquest'] img[src='https://images.marapets.com/tick.png']")

        if (again && !captcha) { again.click() }
        if (snowmanAgain && !captcha) { snowmanAgain.click() }
        if (accept) { accept.click() }

        if (!hasItem) {
            const priceCheck = document.querySelector(".dopricecheck")
            priceCheck.click()

            setTimeout(function () {
                const itemSource = document.querySelector(".pricechecktable .sitedate.same.italic")
                const userShopLink = document.querySelector(".pricechecktable .alsotry.same.strong")

                const atticURL = getAttic()
                if (atticURL !== null) { location.href = atticURL }

                else if (itemSource) {
                    const stock = itemSource.innerText
                    // It must include the word "stock", be more than 0
                    window.location.href = stock.includes("stock") && stock.split(" ")[0] !== "0" ? itemSource.parentElement.href : userShopLink.parentElement.href
                }
                else { window.location.href = userShopLink.parentElement.href }
            }, 1000)
        }

        else {
            if (!captcha && hasItem) { complete.click() }
            if (captcha && hasItem) {
                captcha.oninput = () => {
                    if (captcha.value.length === 6) {
                        document.querySelector("input[value='Complete Quest']").click()
                    }
                }
                captcha.focus()
            }
        }
    }

    // We bought from a user shop, go to inventory now
    if (document.URL.includes("shops.php")) { window.location.href = "https://www.marapets.com/market.php" }

    // The inventory page
    if (document.URL.includes("market.php")) {
        // When looking at your items, check if one has the dashed blue border
        const questItem = document.querySelector(".marapets_border5 .itempadding a")
        if (questItem) { questItem.click() }

        // If you just sent the item, return to Santa
        const santa = document.querySelector("a[href='secret.php']")
        const snowman = document.querySelector("a[href='snowman.php']")
        if (santa) { santa.click() }
        if (snowman) { snowman.click() }
    }


    // The items page
    if (document.URL.includes("item.php")) {
        // Dropdown to select a quest
        const sendTo = document.querySelectorAll("form[name='chat'] select option")

        if (sendTo.length > 1) {
            const quest = sendTo[1].innerText.split(" - ")

            if (quest[0] === "Secret Santa" || quest[0] === "Snowman") {
                const user = quest[1]
                const userInput = document.querySelector("input[name='username']")
                userInput.value = user
                document.querySelector("input[value='Send Item']").click()
            }
        }
    }

    if (document.URL.includes("/attic.php")) {
        // If we have not yet removed the item, remove it
        if (!document.URL.includes("?remove=1")) {
            const inventory = document.querySelector("input[value='Inventory']")
            if (inventory) { inventory.click() }
        }

        else { window.location.href = "https://www.marapets.com/market.php" }
    }

    // NPC shop
    if (document.URL.includes("shop.php")) {
        // Check if we are at the storefront, and find the item
        if (!document.URL.includes("do=buy")) {
            const returnToShop = document.querySelector("input[type='submit']")
            if (!returnToShop) {
                const itemToBuy = document.querySelector("div.marapets_border5 a")
                itemToBuy.click()
            } else {
                window.location.href = "https://www.marapets.com/market.php"
            }
        }

        if (document.URL.includes("do=buy")) {
            const buyButton = document.querySelector(".g-recaptcha")
            buyButton.click()
        }
    }
})()
