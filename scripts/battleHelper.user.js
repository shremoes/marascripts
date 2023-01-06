// ==UserScript==
// @name        Battle Helper
// @namespace   Marascripts
// @description Automates battling.
// @author      marascripts
// @version     1.1.0
// @require     https://raw.githubusercontent.com/marascript/userscripts/master/scripts/utilities/captcha.js
// @grant       none
// @match       https://www.marapets.com/battle.php*
// @match       https://www.marapets.com/talon.php*
// @match       https://www.marapets.com/sumo.php*
// @match       https://www.marapets.com/knight.php*
// @run-at      document-idle
// @downloadURL https://raw.githubusercontent.com/marascript/userscripts/master/scripts/battleHelper.user.js
// @homepageURL https://github.com/marascript/userscripts
// @supportURL	https://github.com/marascript/userscripts/issues
// @license     MIT
// ==/UserScript==
/*jshint -W033 */

(function () {
    'use strict'

    const doc = document

    function getOpponentsTurn () {
        const battleLogs = doc.querySelectorAll(".battle_logs")
        if (battleLogs[0].innerText !== "") {
            const currentHealth = parseInt(doc.querySelectorAll(".opponents2")[0].querySelector(".bigger.healthtxt").innerText)
            const opponentsAttack = parseInt(battleLogs[1].querySelector(".flex-table4.marapets_border.itempadding .itempadding.bigger").innerText.split(" ")[0])

            // TODO: Better calculation
            // ! Sometimes, the attack is too large and we don't heal.
            // ? You can subtract an amount from currentHealth, to heal sooner
            // ! If you subtract to much, it will get stuck in a healing loop
            if (opponentsAttack >= currentHealth - opponentsAttack) { heal() }
            else { attack() }
        }

        else { attack() }
    }

    function heal () {
        const heal = doc.getElementById("heal")
        if (heal) { heal.click() }

        const confirmHeal = doc.querySelector("input[value='Heal']")
        if (confirmHeal) { confirmHeal.click() }
    }

    function attack () {
        const attack = doc.getElementById("attack")
        if (attack) { attack.click() }

        const confirmAttack = doc.querySelector("input[type='submit']")
        if (confirmAttack) { confirmAttack.click() }
    }

    function battleAgain () {
        const battleAgain = doc.querySelector(".g-recaptcha")
        if (battleAgain) { battleAgain.click() }
    }

    // If there is no captcha, proceed
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
