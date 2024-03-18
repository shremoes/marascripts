// ==UserScript==
// @name        Battle Helper
// @namespace   Marascripts
// @description Automates battling.
// @author      marascripts
// @version     1.3.1
// @require     https://raw.githubusercontent.com/marascript/userscripts/master/scripts/utilities/captcha.js
// @grant       none
// @match       https://www.marapets.com/battle.php*
// @match       https://www.marapets.com/talon.php*
// @match       https://www.marapets.com/sumo.php*
// @match       https://www.marapets.com/knight.php*
// @downloadURL https://raw.githubusercontent.com/marascript/userscripts/master/scripts/battleHelper.user.js
// @homepageURL https://github.com/marascript/userscripts
// @supportURL	https://github.com/marascript/userscripts/issues
// @license     MIT
// ==/UserScript==

// TODO: Add an easier way to stop

(() => {
    'use strict'

    // * USER VARIABLES *

    /**
     * * Time between actions, increase for more time
     * ? Default 100
     */
    const BATTLE_AGAIN_TIME = 100

    /**
     * * Increase to heal more often
     * ? Default 25
     */
    const HEALTH_VARIANCE = 25



    const doc = document
    if (!doc.querySelector('.middleit .more.italic') && doc.querySelector('.opponents')) {
        setTimeout(() => {
            const playerHealth = doc.querySelector('.bigger.alsotry')?.innerText.split(' ')
            const attack = doc.querySelector(".move1 input[type='submit']")
            if (playerHealth) {
                const playerCurrent = parseInt(playerHealth[0])

                parseInt(playerHealth[2]) - playerCurrent + HEALTH_VARIANCE >= playerCurrent ?
                    doc.querySelector("input[value='Heal']")?.click()
                    : attack?.click()
            }

            else { attack?.click() }
            doc.querySelector('.g-recaptcha')?.click()
        }, BATTLE_AGAIN_TIME)
    }

    if (!doc.URL.includes('/battle.php')) {
        setTimeout(() => {
            const startBattle = doc.querySelector('button.g-recaptcha')
            const questAgain = doc.querySelector("form[action='?do=quest'] input")
            const battleAction = startBattle ? startBattle : questAgain

            battleAction.click()
        }, 150)
    }
})()
