// ==UserScript==
// @name        Drew and Shusan Helper
// @namespace   Marascripts
// @description Does Drew and Shusan, and prompts when item is missing.
// @author      marascripts
// @version     1.2.0
// @grant       none
// @match       https://www.marapets.com/drew.php*
// @match       https://www.marapets.com/socks.php*
// @downloadURL https://raw.githubusercontent.com/marascript/userscripts/master/scripts/drewShusanHelper.user.js
// @homepageURL https://github.com/marascript/userscripts
// @supportURL	https://github.com/marascript/userscripts/issues
// @license     MIT
// ==/UserScript==

/**
 * Completes Drew/Shusan quests and accepts the next one.
 * If there are missing items, it will show an alert, and then it is up to the user to get them.
 * 
 * TODO: Account for max amount of socks on Shusan quests
 * TODO: Use the captcha utiliy
 */

(() => {
    'use strict'

    if (document.querySelector('.flex-table2')) {
        const itemsRequested = document.querySelectorAll('.dopricecheck').length
        const checks = document.querySelectorAll("img[src='https://images.marapets.com/tick.png']").length

        if (checks !== itemsRequested) { alert('Missing items.') }

        else {
            const captcha = document.querySelector("input[name='code']")
            const complete = document.querySelector("input[type='submit']")

            if (!captcha) { complete.click() }

            else {
                captcha.focus()
                captcha.oninput = () => {
                    if (captcha.value.length === 6) {
                        complete.click()
                    }
                }
            }
        }
    }

    const questAgain = document.querySelector('.middleit input')
    if (questAgain.value.includes('Again')) {
        questAgain.click()
    }
})()
