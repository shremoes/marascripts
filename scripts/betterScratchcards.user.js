// ==UserScript==
// @name        Better Scratchcards
// @namespace   Marascripts
// @description Improves scratchcards by adding a "Next Card" link, to make it more fun.
// @author      marascripts
// @version     1.0.1
// @grant       GM_setValue
// @grant       GM_getValue
// @match       https://www.marapets.com/scratchcards*
// @run-at      document-idle
// @downloadURL https://raw.githubusercontent.com/marascript/userscripts/master/scripts/betterScratchcards.user.js
// @homepageURL https://github.com/marascript/userscripts
// @supportURL	https://github.com/marascript/userscripts/issues
// @license     MIT
// ==/UserScript==
/*jshint -W033 */
/*jshint -W117 */ // Avoid JSHint errors in editor for GM* functions

(function () {
    'use strict'

    // If we are on scratchcard selection page, save all links for use later
    if (document.querySelector(".middleit.flex-table .fixborders img")) {
        const cards = document.querySelectorAll(".middleit.flex-table .fixborders img")

        let links = []
        for (let card of cards) {
            card.parentElement.setAttribute("onclick", "")
            links.push(card.parentElement.href)
        }

        GM_setValue("links", links)
    }

    if (document.URL.includes("scratch=") && !document.querySelector(".middleit.flex-table .fixborders img")) {
        const cards = GM_getValue("links", [])
        const url = document.URL
        const newCards = cards.filter(card => card !== url)
        GM_setValue("links", newCards)

        let cardStatus = ""
        if (newCards.length !== 0) {
            document.querySelector(".friendsbackground").addEventListener('mousemove', () => {
                cardStatus = document.querySelector(".scratchcard_win").innerText

                // If we have more cards, and are finished with current card, show "Next Card >" button
                if (!document.getElementById("nextcard") && !cardStatus.includes("You've Scratched") && cardStatus !== "Scratch off all the circles to see if you're a winner") {
                    const btn = document.createElement("a")
                    btn.innerHTML = "Next Card >"
                    btn.href = newCards[0]
                    btn.style.color = "white"
                    btn.id = "nextcard"
                    btn.style.fontWeight = "bold"
                    btn.style.fontSize = "2em"

                    document.querySelector(".scratchcard_outside").appendChild(btn)
                }
            })
        }
    }
})()
