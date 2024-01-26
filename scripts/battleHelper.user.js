// ==UserScript==
// @name        _Battle Helper
// @namespace   Marascripts
// @description Automates battling.
// @author      marascripts
// @version     1.2.0
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

    const doc = document

    function getOpponentsTurn () {
      const playerHealth = document.querySelector(".bigger.alsotry")?.innerText.split(" ")
      if (playerHealth) {
        const playerCurrent = parseInt(playerHealth[0])

        // Adding 25 to our health account for crits, may need to be adjusted
        parseInt(playerHealth[2]) - playerCurrent + 25 >= playerCurrent ?
          document.querySelector("input[value='Heal']")?.click()
          : document.querySelector(".move1 input[type='submit']")?.click()
      }

       else { document.querySelector(".move1 input[type='submit']")?.click() }
    }

    function battleAgain () {
        const battleAgain = doc.querySelector(".g-recaptcha")
        if (battleAgain) { battleAgain.click() }
    }

    if (!doc.querySelector(".middleit .more.italic") && doc.querySelector(".opponents")) {
        setTimeout(() => {
            getOpponentsTurn()
            battleAgain()
        }, 600)
    }

    if (!document.URL.includes("/battle.php")) {
        setTimeout(() => {
            const startBattle = doc.querySelector("button.g-recaptcha")
            const questAgain = doc.querySelector("form[action='?do=quest'] input")

            const battleAction = startBattle ? startBattle : questAgain
            battleAction.click()
        }, 750)
    }
})()
