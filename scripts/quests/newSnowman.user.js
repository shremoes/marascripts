// ==UserScript==
// @name    Snowman redo
// @match    https://www.marapets.com/snowman.php*
// @match    https://www.marapets.com/attic.php*
// @version          1.0
// @require     https://raw.githubusercontent.com/marascript/userscripts/master/scripts/utilities/priceCheck.js
// @require     https://raw.githubusercontent.com/marascript/userscripts/master/scripts/utilities/captcha.js
// @grant  GM.xmlHttpRequest
// ==/UserScript==
/*jshint -W033 */
/*jshint -W117 */ // Avoid JSHint errors in editor for GM* functions

/**
 * ! NOT DONE
 */

if (document.URL.includes("/snowman.php")) {
    const domObserver = new MutationObserver((_mutationList, observer) => {
        document.querySelector(".dopricecheck").click()

        const priceCheckTable = document.querySelector(".pricechecktable")

        if (priceCheckTable) {
            observer.disconnect()
            const itemURL = doPriceCheck()
            location.href = itemURL + "&SNOWMANORSANTA"
        }
    })

    domObserver.observe(document.body, { childList: true, subtree: true })
}



if (document.URL.includes("SNOWMANORSANTA")) {
    if (document.URL.includes("/attic.php")) {
        if (!document.URL.includes("?remove=1")) {
            GM.xmlHttpRequest({
                url: document.querySelector("form[name='POST']").action,
                method: 'POST',
                data: "amountmove=1&a=Inventory",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                onload: () => {
                    location.href = "https://www.marapets.com/market.php?SNOWMANORSANTA"
                },
            })
        }
    }
}
