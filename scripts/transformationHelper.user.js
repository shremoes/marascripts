// ==UserScript==
// @name        Transformation Helper
// @namespace   Marascripts
// @description Adds Check Price links for missing transformations.
// @author      marascripts
// @version     2.0.0
// @require     https://raw.githubusercontent.com/marascript/userscripts/master/scripts/data/transformations.js
// @grant       none
// @match       https://www.marapets.com/transformations.php*
// @run-at      document-end
// @downloadURL https://raw.githubusercontent.com/marascript/userscripts/master/scripts/transformationHelper.user.js
// @homepageURL https://github.com/marascript/userscripts
// @supportURL  https://github.com/marascript/userscripts/issues
// @license     MIT
// ==/UserScript==

// TODO: Inline transformations (doesn't work on my Mac)

(() => {
    'use strict'

    // Function creates "Check Price" links
    function createCheckPrice(item, itemId, label) {
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
        // All missing costumes on current page
        const missing = document.querySelectorAll(".itemwidth.fixborders .bigger")

        for (const costume in missing) {
            if (missing[costume] instanceof Node) {
                // Costume name with species i.e. "Advent Addow"
                const petCostume = missing[costume].innerText

                // Create container to hold "Check Price" links for all costumes
                const linkContainer = document.createElement("div")
                linkContainer.id = petCostume // Set the id to the transformation name, i.e. "Advent Addow"
                missing[costume].appendChild(linkContainer)

                // Get costume name without the species. Example, "Advent" instead of "Advent Addow"
                const petCostumeName = petCostume.split(" ")
                petCostumeName.pop()
                const costumeName = petCostumeName.join(" ")

                // Potions
                if (potions[petCostume]) {
                    createCheckPrice(petCostume, potions[petCostume], "Potion")
                }

                // Enchanted Plushies
                if (plushies[petCostume]) {
                    createCheckPrice(petCostume, plushies[petCostume], "Plushie")
                }

                // Costumes
                if (realCostumes[costumeName]) {
                    createCheckPrice(petCostume, realCostumes[costumeName], "Real")
                }

                // Fake Costumes
                if (fakeCostumes[costumeName]) {
                    createCheckPrice(petCostume, fakeCostumes[costumeName], "Fake")
                }

                // Poisions (for Zombie)
                if (poisons[petCostume]) {
                    createCheckPrice(petCostume, poisons[petCostume], "Poison")
                    createCheckPrice(petCostume, 927, "Toxic Potion")
                }

                // Mummy Dolls (for Mummy)
                if (mummyDolls[petCostume]) {
                    createCheckPrice(petCostume, mummyDolls[petCostume], "Doll")
                }
            }
        }
    }
})()