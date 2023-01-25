// ==UserScript==
// @name        User Shop Search
// @namespace   Marascripts
// @description Adds link to items that directs to the user shop search for that item.
// @author      marascripts
// @version     1.0.2
// @grant       none
// @match       https://www.marapets.com/*
// @run-at      document-idle
// @downloadURL https://raw.githubusercontent.com/marascript/userscripts/master/scripts/ui/shopSearch.user.js
// @homepageURL https://github.com/marascript/userscripts
// @supportURL	https://github.com/marascript/userscripts/issues
// @license     MIT
// ==/UserScript==
/*jshint -W033 */

(function () {
    'use strict'

    const items = document.querySelectorAll(".dopricecheck")
    if (items) {
        for (const item in items) {
            if (items[item] instanceof Node) {
                const itemSearch = document.createElement("form")
                itemSearch.action = "shopsearch.php?do=search"
                itemSearch.method = "POST"
                itemSearch.target = "_blank"

                const searchTerm = document.createElement("input")
                searchTerm.type = "hidden"
                searchTerm.name = "item"
                searchTerm.value = items[item].parentElement.parentElement.querySelector(".itempadding a span.bigger").innerText

                const exactInput = document.createElement("input")
                exactInput.type = "hidden"
                exactInput.name = "type"
                exactInput.value = "2"

                const search = document.createElement("input")
                search.type = "submit"
                search.value = "Shop Search"
                search.style.padding = "0 0 0 0 !important"
                search.style.border = "none"
                search.style.background = "none"
                search.style.color = "gray"
                search.style.fontWeight = "700"
                search.style.fontSize = "11px"

                itemSearch.appendChild(searchTerm)
                itemSearch.appendChild(exactInput)
                itemSearch.appendChild(search)

                const linkContainer = document.createElement("div")
                linkContainer.appendChild(itemSearch)
                items[item].parentElement.appendChild(linkContainer)
            }
        }
    }
})()
