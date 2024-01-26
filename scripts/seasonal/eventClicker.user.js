// ==UserScript==
// @name        Event Quest Clicker
// @namespace   Marascripts
// @description Clicks selected pet every 15 minutes (default) on event quests.
// @author      marascripts
// @version     1.0.0
// @grant       none
// @match       https://www.marapets.com/candytree.php*
// @match       https://www.marapets.com/elger.php*
// @match       https://www.marapets.com/krampus.php*
// @license     MIT
// ==/UserScript==

(() => {
    'use strict'

    const PET_ID = 11111111
    const TIMEOUT = 15000

    const URL = document.URL
    let quest = ""
    let doQuest = ""

    if (URL.includes("elger")) {
        quest = "https://www.marapets.com/elger.php"
        doQuest = `${URL}?do=halloween&pet_id=${PET_ID}`
    }

    if (URL.includes("krampus")) {
        quest = "https://www.marapets.com/krampus.php"
        doQuest = `${URL}?visit=1&pet_id=${PET_ID}`
    }

    if (URL.includes("candytree")) {
        quest = "https://www.marapets.com/candytree.php"
        doQuest = `${URL}?do=valentines&pet_id=${PET_ID}`
    }

    if (URL.includes("pet_id")) {
        location.href = quest
    }

    else {
        if (!document.querySelector(".middleit.comebackbox")) {
            location.href = doQuest
        }

        else {
            setTimeout(() => {
                location.href = quest
            }, TIMEOUT)
        }
    }
})()
