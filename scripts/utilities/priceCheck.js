/**
 * Various helper functions for price checking.
 * 
 * Paste the following in any userscript:
 * @require https://github.com/marascript/userscripts/raw/master/scripts/utilities/priceCheck.js
 */

/** Compares user shop price to shop price */
function isUserShopCheaper() {
    const userPrice = parseInt(document.querySelector(".alsotry.same.strong").innerText.split(" ")[2].split("MP")[0].replace(/,/g, ""))
    const shopPrice = parseInt(document.querySelector("span.sitedate.same.italic").innerText.split(" ").pop().split("MP")[0].replace(/,/g, ""))
    return shopPrice <= userPrice ? false : true
}

/** Checks if an item is in stock */
function checkInStock() {
    const itemSource = document.querySelector(".pricechecktable .sitedate.same.italic")
    if (itemSource) {
        const stock = itemSource.innerText
        return (stock.includes("stock") && stock.split(" ")[0] !== "0") ? itemSource.parentElement.href : null
    } else { return null }
}

/** 
 * Checks if item is retired
 * TODO: Update for new retired style
 */
function checkRetired() {
    const retired = document.querySelector(".pricechecktable .banned.same.italic")
    const retiredAlt = document.querySelector(".pricechecktable .offline.same.italic")
    return retired || retiredAlt ? true : false
}

/** Checks if we have the item in the attic */
function getAttic() {
    const atticCount = document.querySelector(".pricecheckcontent .banned.same")
    return parseInt(atticCount.innerText.split(" ")[0]) === 0 ? null : atticCount.parentElement.href
}

/** Checks if sold in user shop and returns URL */
function getUserShop() {
    const userShopLink = document.querySelector(".pricechecktable .alsotry.same.strong")
    return userShopLink ? userShopLink.parentElement.href : null
}

/** Clicks "Check Price" based on items id */
function priceCheckById(itemId) {
    document.querySelector(`a[data-id='${itemId}']`).click()
}

/** Clicks "Check Price", for use if there is only one itme */
function priceCheck() {
    document.querySelector(".dopricecheck").click()
}

/** Goes to the a URL */
function goTo(url) {
    location.href = url
}

/** Finds best price for item and returns the URL */
function doPriceCheck() {
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

    return itemURL
}

/** Gets quest items
 * TODO: Don't base of checkmark
 */
function getQuestItems() {
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

        return itemsNeeded
    }
}
