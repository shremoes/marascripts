// ==UserScript==
// @name        Buy Item Faster
// @description Buys one of each item in a shop, then goes to another.
// @namespace   Marascripts
// @author      marascripts
// @version     1.2.0
// @grant       GM_setValue
// @grant       GM_getValue
// @version     1.0.0
// @match       https://www.marapets.com/shop.php*
// @downloadURL https://raw.githubusercontent.com/marascript/userscripts/master/scripts/buyItems.user.js
// @homepageURL https://github.com/marascript/userscripts
// @supportURL	https://github.com/marascript/userscripts/issues
// @license     MIT
// ==/UserScript==

(() => {
    'use strict'

    const doc = document
    const AUTO_BUY = true
    const PURCHASED_ITEMS = JSON.parse(localStorage.getItem("purchased")) || []
    const BUY_TIMEOUT_MIN = 1000
    const BUY_TIMEOUT_MAX = 3000

    const TIMEOUT = Math.random() * (BUY_TIMEOUT_MAX - BUY_TIMEOUT_MIN) + BUY_TIMEOUT_MIN

    const shopkeeper = doc.querySelector(".mainfeature_art a")

    /*
    ** Comment out (//) stores you don't want to visit.
    ** Function will pick randomly from the "storesToVisit" variable.
    */
    function findNewStore() {
        const stores = [
            38, // Armour
            33, // Bakery
            27, // Balloons
            61, // Batteries
            9,  // Books
            66, // Candles
            18, // Candy
            59, // Canned Food
            39, // Car Parts
            25, // CDs
            71, // Cereal
            35, // Cheese
            17, // Chocolate
            36, // Cleaning Products
            46, // Clothing
            63, // Coffee
            41, // Computer Parts
            51, // Contact Lenses
            77, // Diner
            21, // DVDs
            68, // Eye Makeup
            70, // Face Makeup
            29, // Fast Food
            16, // Flowers
            53, // Footwear
            26, // Frozen Food
            19, // Fruits
            2,  // Glowing Eggs
            64, // Gourmet Mutant Food
            49, // Hair Dye
            23, // Halloween Treats
            14, // Ice Cream
            50, // Lipsticks
            8,  // Meat
            10, // Medicine
            101, // Mining Tools
            57, // Minipet Food
            22, // Minipets
            11, // Musical Instruments
            47, // Pearls
            67, // Perfume
            13, // Pizza
            12, // School Supplies
            62, // Seeds
            102, // Smoothies
            80, // Spices
            15, // Stamps
            44, // Stars
            37, // Sushi
            69, // Tattoos
            72, // Toiletries
            31, // Tools
            5,  // Toys
            30, // Trading Cards
            65, // Traps
            28, // Soft Drinks
            6,  // Vegetables
            7,  // Weapons
            5,  // Wigs
        ];

        const visited = GM_getValue("visited", [])
        let nextStore = stores.filter((store) => !visited.includes(store))[0];

        if (nextStore) {
            visited.push(nextStore)
            GM_setValue("visited", visited)
        } else {
            GM_setValue("visited", [])
            nextStore = stores[0]
        }

        location.href = `https://www.marapets.com/shop.php?id=${nextStore}`
    }

    
    const buyPage = doc.URL.includes("?do=buy")
    const idPage = doc.URL.includes("id=")

    if (doc.querySelector(".middleit.bigger .petpadding") && AUTO_BUY) {
        const allItems = Array.from(document.querySelectorAll(".itemwidth"))
        const itemToBuy = allItems.find(el => !PURCHASED_ITEMS.includes(el.querySelector(".bigger").innerText.trim()))

        if (itemToBuy) {
            setTimeout(() => {
                itemToBuy.querySelector(".fixborders.itempadding.middleit a").click()
            }, TIMEOUT)
        }

        else {
            findNewStore()
        }
    }
    else if (idPage && !buyPage && !doc.querySelector(".middleit.bigger .petpadding")) {
        findNewStore()
    }

    if (!idPage) {
        setTimeout(() => {
            // If we dont have an unsuccesful message, add item to list of purchased items
            if (!doc.querySelector(".maralayoutmiddle .middleit span.bigger")) {
                const message = doc.querySelector(".bigger.middleit .bigger.middleit.btmpad6").innerText
                if (message.includes("I accept")) {
                    PURCHASED_ITEMS.push(message.split(" for ")[1].split("\n")[0])
                }
                else {
                    PURCHASED_ITEMS.push(message.split("buying ")[1].split(" for ")[0])
                }

                localStorage.setItem("purchased", JSON.stringify(PURCHASED_ITEMS))
            }

            // Return to the shop
            shopkeeper.click()
        }, Math.random() * (500 - 100) + 200)
    }

    else if (buyPage) {
        const captcha = doc.querySelector("input[name='code']")
        // No captcha buy the item
        if (!captcha) {
            doc.querySelector("button").click()
        }

        // "Sorry just sold the last..."
        else if (!doc.querySelector("button")) {
            doc.querySelector(".mainfeature_art a").click()
        }

        // If we are auto buying just skip the item
        else if (AUTO_BUY) {
            PURCHASED_ITEMS.push(doc.querySelector(".mainfeature_art2 b.bigger").innerText)
            localStorage.setItem("purchased", JSON.stringify(PURCHASED_ITEMS))
            shopkeeper.click()
        }

        // We have a captcha, focus it and submit after 6 digits
        else {
            captcha.focus()
            captcha.oninput = () => {
                // Once six numbers are inpt
                if (captcha.value.length === 6) {
                    doc.querySelector("button").click()
                }
            }
        }
    }

    else {
        const IN_SHOP_ID = doc.querySelector(".mainfeature_art a").href.split("id=")[1] // Shop ID from the URL
        const SHOP_ID = localStorage.getItem("shopId") || IN_SHOP_ID // Saved shop ID, or the current shop ID if none is saved

        // Check id the saved shop ID and current shop ID match, or if there is no saved ID
        // If either is true save the current shops ID
        if (SHOP_ID !== IN_SHOP_ID || !localStorage.getItem("shopId")) {
            localStorage.setItem("shopId", IN_SHOP_ID)
            localStorage.removeItem("purchased")
        }
    }
})()
