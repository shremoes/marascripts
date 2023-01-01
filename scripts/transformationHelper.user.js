// ==UserScript==
// @name        Transformation Helper
// @namespace   Marascripts
// @description Adds Check Price links for missing transformations.
// @author      marascripts
// @version     1.3.0
// @require     https://raw.githubusercontent.com/marascript/userscripts/master/scripts/utilities/transformations.js
// @grant       none
// @match       https://www.marapets.com/transformations.php*
// @run-at      document-end
// @downloadURL https://raw.githubusercontent.com/marascript/userscripts/master/scripts/transformationHelper.user.js
// @homepageURL https://github.com/marascript/userscripts
// @supportURL  https://github.com/marascript/userscripts/issues
// @license     MIT
// ==/UserScript==
/*jshint -W033 */
/*jshint -W107 */
/*jshint -W117 */

(function () {
    function createCheckPrice (item, itemId, label) {
        const checkPrice = document.createElement("b")
        checkPrice.innerText = label
        checkPrice.classList.add("pricecheck")

        const link = document.createElement("a")
        link.appendChild(checkPrice)
        link.href = "javascript:;"
        link.classList.add("dopricecheck")
        link.style.fontSize = "11px"
        link.style.display = "inline-flex"
        link.setAttribute("data-id", itemId)

        const linkContainer = document.createElement("div")
        linkContainer.classList.add("itempadding")
        linkContainer.style.textAlign = "center"
        linkContainer.appendChild(link)

        document.getElementById(item).appendChild(linkContainer)
    }

    if (document.URL.includes("missing=1")) {
        const missing = document.querySelectorAll(".itemwidth.fixborders .bigger")

        for (const costume in missing) {
            if (missing[costume] instanceof Node) {
                const petCostume = missing[costume].innerText

                const linkContainer = document.createElement("div")
                linkContainer.id = petCostume
                missing[costume].appendChild(linkContainer)

                const petCostumeName = petCostume.split(" ")
                petCostumeName.pop()
                const costumeName = petCostumeName.join(" ")

                if (potions[petCostume]) {
                    createCheckPrice(petCostume, potions[petCostume], "Potion")
                }

                if (plushies[petCostume]) {
                    createCheckPrice(petCostume, plushies[petCostume], "Plushie")
                }

                if (realCostumes[costumeName]) {
                    createCheckPrice(petCostume, realCostumes[costumeName], "Real")
                }

                if (fakeCostumes[costumeName]) {
                    createCheckPrice(petCostume, fakeCostumes[costumeName], "Fake")
                }

                if (poisons[petCostume]) {
                    createCheckPrice(petCostume, poisons[petCostume], "Poison")
                }

                if (mummyDolls[petCostume]) {
                    createCheckPrice(petCostume, mummyDolls[petCostume], "Doll")
                }
            }
        }
    }
})()
