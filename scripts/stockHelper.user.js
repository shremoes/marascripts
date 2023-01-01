// ==UserScript==
// @name        Stock Helper
// @namespace   Marascripts
// @description Automatically selects the cheapest stock.
// @author      marascripts
// @version     1.0.1
// @grant       none
// @match       https://www.marapets.com/shares.php*
// @run-at      document-idle
// @downloadURL https://raw.githubusercontent.com/marascript/userscripts/master/scripts/stockHelper.user.js
// @homepageURL https://github.com/marascript/userscripts
// @supportURL	https://github.com/marascript/userscripts/issues
// @license     MIT
// ==/UserScript==
/*jshint -W033 */

(function () {
    'use strict'

    if (!document.querySelector(".middleit.comebackbox")) {
        const ON_BUY_PAGE = document.URL.includes("?do=company")

        if (!ON_BUY_PAGE) {
            let lowestPrice = 99999
            let buyLink = ""

            document.querySelectorAll(".fairyreward_box .itempadding span.currencytext b").forEach((company) => {
                const price = parseInt(company.innerText.split("MP")[0].replace(/,/g, ""))
                if (price < lowestPrice && price >= 100) {
                    lowestPrice = price
                    buyLink = company.parentElement.parentElement.parentElement.parentElement
                }
            })

            buyLink.click()
        }

        if (ON_BUY_PAGE) {
            document.querySelector("input[name='amount']").value = 100
            document.querySelector("input[name='Submit']").click()
        }
    }
})()
