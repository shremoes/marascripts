// ==UserScript==
// @name        More Check Price
// @namespace   Marascripts
// @description Adds Check Price links to collection pages and shops.
// @author      marascripts
// @version     1.1.2
// @grant       none
// @match       https://www.marapets.com/books.php*
// @match       https://www.marapets.com/cds.php*
// @match       https://www.marapets.com/dvds.php*
// @match       https://www.marapets.com/food.php*
// @match       https://www.marapets.com/nest.php*
// @match       https://www.marapets.com/plates.php*
// @match       https://www.marapets.com/wardrobe.php*
// @match       https://www.marapets.com/deck.php*
// @match       https://www.marapets.com/spell.php*
// @match       https://www.marapets.com/collections.php*
// @match       https://www.marapets.com/photo.php?do=album*
// @match       https://www.marapets.com/books.php?type=2*
// @match       https://www.marapets.com/giftbox.php*
// @match       https://www.marapets.com/instruments.php*
// @match       https://www.marapets.com/play.php*
// @match       https://www.marapets.com/books.php?type=1*
// @match       https://www.marapets.com/stamps.php?do=album&page=*
// @match       https://www.marapets.com/shops.php*
// @match       https://www.marapets.com/club.php*
// @run-at      document-end
// @downloadURL https://raw.githubusercontent.com/marascript/userscripts/master/scripts/ui/moreCheckPrice.user.js
// @homepageURL https://github.com/marascript/userscripts
// @supportURL	https://github.com/marascript/userscripts/issues
// @license     MIT
// ==/UserScript==
/*jshint -W033 */
/*jshint -W107 */

(function () {
    'use strict'

    function createCheckPrice (item, itemId) {
        const checkPrice = document.createElement("b")
        checkPrice.innerText = "Check Price"
        checkPrice.classList.add("pricecheck")

        const link = document.createElement("a")
        link.appendChild(checkPrice)
        link.href = "javascript:;"
        link.classList.add("dopricecheck")
        link.setAttribute("data-id", itemId)

        const linkContainer = document.createElement("div")
        linkContainer.classList.add("itempadding")
        linkContainer.style.textAlign = "center"
        linkContainer.appendChild(link)

        item.appendChild(linkContainer)
    }

    if (!document.URL.includes("missing") && !document.URL.includes("stamps")) {
        const items = document.querySelectorAll(".itemwidth.fixborders")

        for (const item in items) {
            if (items[item] instanceof Node) {
                createCheckPrice(items[item], items[item].id.split("eachitemdiv")[1])
            }
        }
    }

    if (document.URL.includes("stamps")) {
        const stamps = document.querySelectorAll(".itemwidth.fixborders a")

        for (const stamp in stamps) {
            if (stamps[stamp] instanceof Node) {
                const stampLink = stamps[stamp]
                if (stampLink) {
                    const stampId = stampLink.href.split("item=")[1]
                    createCheckPrice(stamps[stamp], stampId)
                }
            }
        }
    }
})()
