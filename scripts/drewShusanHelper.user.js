// ==UserScript==
// @name        Drew and Shusan Helper
// @namespace   Marascripts
// @description Does Drew and Shusan, and prompts when item is missing.
// @author      marascripts
// @version     1.0.3
// @require     https://raw.githubusercontent.com/marascript/userscripts/master/scripts/utilities/captcha.js
// @grant       none
// @match       https://www.marapets.com/drew.php*
// @match       https://www.marapets.com/socks.php*
// @run-at      document-idle
// @downloadURL https://raw.githubusercontent.com/marascript/userscripts/master/scripts/drewShusanHelper.user.js
// @homepageURL https://github.com/marascript/userscripts
// @supportURL	https://github.com/marascript/userscripts/issues
// @license     MIT
// ==/UserScript==
/*jshint -W033 */

/**
 * Completes Drew/Shusan quests and accepts the next one.
 * If there are missing items, it will show an alert, and then it is up to the user to get them.
 * 
 * TODO: Account for max amount of socks on Shusan quests
 */

(function () {
    'use strict'

    if (document.querySelector(".flex-table2")) {
        const itemsRequested = document.querySelectorAll(".dopricecheck").length
        const checks = document.querySelectorAll("img[src='https://images.marapets.com/tick.png']").length

        // If we don't have all items, show an alert.
        // Due to the cost of some items, and that some are unbuyable, this is the best option.
        if (checks !== itemsRequested) {
            alert("Missing items.")
        }

        // If we have all items complete the quest.
        else {
            document.querySelector("input[type='submit']").click()
        }
    }

    // If we can quest again, click the button.
    const questAgain = document.querySelector(".middleit input")
    if (questAgain.value.includes("Again")) {
        questAgain.click()
    }
})()
