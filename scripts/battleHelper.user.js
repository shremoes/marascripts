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

    /**
     * ! These may need to be adjusted depending on the opponent
     * ? BATTLE_AGAIN_TIME - Time between actions, increase for more time (default 100)
     * ? HEALTH_VARIANCE - Increase to heal more often (default 25)
     * ? BATTLE_AGAIN_TIME - Maximum time before starting a new battle (default 150)
     */
    const BATTLE_TURN_TIME = 100
    const HEALTH_VARIANCE = 25
    const BATTLE_AGAIN_TIME = 150

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
        }, BATTLE_TURN_TIME)
    }

    if (!doc.URL.includes('/battle.php')) {
        setTimeout(() => {
            const startBattle = doc.querySelector('button.g-recaptcha')
            const questAgain = doc.querySelector("form[action='?do=quest'] input")
            const battleAction = startBattle ? startBattle : questAgain

            battleAction.click()
        }, BATTLE_AGAIN_TIME)
    }
})()
