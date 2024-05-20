// ==UserScript==
// @name        Shop Pricer Easymode
// @namespace   Marascripts
// @description Automatically prices shop, requires the Gift Box.
// @author      marascripts
// @version     2.0.0
// @grant       none
// @match       https://www.marapets.com/viewstock.php*
// @downloadURL https://raw.githubusercontent.com/marascript/userscripts/master/scripts/shopPricer.user.js
// @homepageURL https://github.com/marascript/userscripts
// @supportURL	https://github.com/marascript/userscripts/issues
// @license     MIT
// ==/UserScript==

// TODO: Add a button instead of the shopkeeper

(() => {
    'use strict';

    /**
     * ! Requires Shop Pricer Giftbox!
     * TIMEOUT - Set to amount of milliseconds to wait before restarting
     * IGNORE_LARGE_DROPS - Set to 1 to ignore large price drops (red box)
     * IGNORE_MEDIUM_DROPS - Set to 1 to ignore medium price drops (yellow box)
     */
    const TIMEOUT = 1200000;
    const IGNORE_LARGE_DROPS = 0;
    const IGNORE_MEDIUM_DROPS = 0;

    
    function getStatus() {
        // We use the message above the shopkeeper to determine the next step
        const message = document.querySelector('.maralayoutmiddle .bigger.middleit').textContent;
        if (message.includes("changed")) {
            // "...have repriced"/"...not changed...", go to the next page
            if (message.includes('not') || message.includes('have')) {
                getNextPage();
            }

            // "... has repriced...", save new prices
            else if (message.includes('has')) {
                // Reset prices for items with large drops (if set)
                if (!IGNORE_LARGE_DROPS) { ignoreReprice('.marapets_border15'); }
                if (!IGNORE_MEDIUM_DROPS) { ignoreReprice('.marapets_border14'); }

                // Clicks "Update Prices"
                document.querySelector("input[value='Update Prices']").click();
            }
        }

        // Update prices
        else {
            document.querySelector("input[value='Auto Price']").click();      
        }
    }

    // Go to the next page of items, or restart pricing
    function getNextPage() {
        const pageButtons = document.querySelectorAll('.pages_all .pages_each a');
        const secondToLastPageButton = pageButtons[pageButtons.length - 2];

        // Click the next page button, if it exists
        if (secondToLastPageButton.textContent === '›') {
            secondToLastPageButton.click();
        }

        // On the last page, wait for TIMEOUT and restart at page 1
        else {
            setTimeout(() => {
                document.querySelector(".mainfeature_art a").click();
            }, TIMEOUT);
        }
    }

    // Resets items with large price drops to their previous price
    function ignoreReprice(selector) {
        const items = document.querySelectorAll(selector);

        items.forEach((item) => {
            const oldPrice = item.querySelector('.mp').textContent.split('MP')[0].replace(/,/g, '');
            item.querySelector('input').value = oldPrice;
        });
    }

    getStatus();
})();
