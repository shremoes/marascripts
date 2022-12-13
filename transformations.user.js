// ==UserScript==
// @name        Transformer
// @namespace   Marascripts
// @description Adds Check Price links to collection pages and user shops.
// @author      marascripts
// @version     1.0.0
// @grant       none
// @match       https://www.marapets.com/transformations.php*
// @run-at      document-end
// @homepageURL https://github.com/marascript/userscripts
// @supportURL	https://github.com/marascript/userscripts/issues
// @license     MIT
// ==/UserScript==
/*jshint -W033 */

(function () {
    'use strict'

    function createCheckPrice(item, itemId) {
        const checkPrice = document.createElement("b")
        checkPrice.innerText = "Fake"
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

    if (!document.URL.includes("missing")) {
        const costumes = document.querySelectorAll(".itemwidth.fixborders .bigger")

        const fakeCostumes = {
            "American": 62985,
            "Angel": 53733,
            "Aqua": 53728,
            "Arcade": 45766,
            "Armoured": 45163,
            "Baby": 53734,
            "Beige": 44207,
            "Black": 1075,
            "Blue": 1076,
            "Bootleg": 45213,
            "Breeze": 45155,
            "British": 62986,
            "Bronze": 1317,
            "Brown": 1077,
            "Candle": 45323,
            "Candy": 68592,
            "Cartoon": 45218,
            "Cheese": 62987,
            "Chibi": 45310,
            "Chinese": 62989,
            "Chocolate": 68591,
            "Coral": 53729,
            "Cursed": 54662,
            "Dalmation": 62990,
            "Dark Fairy": 72035,
            "Daylight": 50656,
            "Desert": 45226,
            "Devil": 53735,
            "Digital": 45151,
            "Doll": 45331,
            "Dragon": 45159,
            "Eleka": 44742,
            "Fancy": 45332,
            "Fat": 45210,
            "Galaxy": 50490,
            "Gold": 1078,
            "Green": 1080,
            "Grey": 1081,
            "Hobo": 45153,
            "Ice Fairy": 56547,
            "Island": 66874,
            "Leopard": 62988,
            "Light Fairy": 50804,
            "Lilac": 45317,
            "Magenta": 43587,
            "Maroon": 53730,
            "Midnight": 62992,
            "Minipet": 45313,
            "Monster": 45168,
            "Moonlight": 45209,
            "Musical": 59455,
            "Native": 51923,
            "Navy": 53731,
            "Negative": 44550,
            "Neon": 45762,
            "Ninja": 66873,
            "Old": 45327,
            "Olive": 53732,
            "Orange": 1082,
            "Pampered": 45156,
            "Panda": 62991,
            "Party": 45349,
            "Pink": 1083,
            "Pirate": 1079,
            "Pixel": 62993,
            "Plushie": 45215,
            "Punk": 59457,
            "Purple": 1084,
            "Radioactive": 1319,
            "Rainbow": 45124,
            "Red": 1085,
            "Royal": 45154,
            "Scout": 45281,
            "Silver": 1318,
            "Space Fairy": 45277,
            "Spring": 44812,
            "Starry": 45207,
            "Stone": 45221,
            "Summer": 44848,
            "Swamp": 45223,
            "Teal": 1320,
            "Tornado": 45206,
            "Toy": 45152,
            "Underwater": 45208,
            "Vampire": 45229,
            "Water": 45224,
            "White": 1087,
            "Witch": 62994,
            "Yellow": 1086
        }

        for (const item in costumes) {
            if (costumes[item] instanceof Node) {
                const petCostume = costumes[item].innerText.split(" ")
                petCostume.pop()
                const costume = petCostume.join(" ")
                createCheckPrice(costumes[item], fakeCostumes[costume])
            }
        }
    }
})()
