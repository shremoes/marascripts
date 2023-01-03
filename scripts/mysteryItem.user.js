// ==UserScript==
// @name        Mystery Item Guesser
// @namespace   Marascripts
// @description Fills in known Mystery Items, WIP as I add more.
// @author      marascripts
// @version     1.0.0
// @grant       none
// @match       https://www.marapets.com/icefairy.php
// @run-at      document-idle
// @downloadURL https://raw.githubusercontent.com/marascript/userscripts/master/scripts/mysteryItem.user.js
// @homepageURL https://github.com/marascript/userscripts
// @supportURL	https://github.com/marascript/userscripts/issues
// @license     MIT
// ==/UserScript==
/*jshint -W033 */

(function () {
    'use strict'

    /**
     * Use these sites to get the answer (maybe):
     * https://mara.guide/mysteryitem.php
     * https://www.marasites.com/?name=Dani&page=MysteryItemGuide
     * https://mara.page/Dani/MysteryItemGuide2
     * 
     * If the answers image URL is is hosted on Marapets, add the image name and answer to knownItems
     */

    const knownItems = {
        "sjdjdidosos.gif": "Ball Of Bronze Yarn",
        "ikjjeesydepaaenfinda.png": "Nutcracker Action Figure",
        "maanydemadennarmankan.png": "Spooks"
    }

    const todaysItem = document.querySelector(".middleit .marapets_border").src.split("/")[4]

    if (knownItems[todaysItem]) {
        document.querySelector("input[name='item']").value = knownItems[todaysItem]
    }
})()

