// ==UserScript==
// @name        User Shop Search
// @namespace   Marascripts
// @description Adds link to search user shops in check price window.
// @author      marascripts
// @version     1.0.0
// @grant       none
// @match       https://www.marapets.com/*
// @downloadURL https://raw.githubusercontent.com/marascript/userscripts/master/scripts/userShopSearch.user.js
// @homepageURL https://github.com/marascript/userscripts
// @supportURL	https://github.com/marascript/userscripts/issues
// @license     MIT
// ==/UserScript==

(() => {
    'use strict'

    /**
     * ELEMENT_LOADED - Set to lowest possible so the link loads (default 100)
     */
    const ELEMENT_LOADED = 100

    const priceChecks = document.querySelectorAll('.dopricecheck')

    for (let i = 0; i < priceChecks.length; i++) {
        priceChecks[i].addEventListener('click', function () {
            setTimeout(function () {
                const form = document.createElement('form')
                form.method = 'POST'
                form.action = 'shopsearch.php?do=search'
                form.style.textAlign = 'center'

                const identical = document.createElement('input')
                identical.setAttribute('value', '2')
                identical.name = 'type'
                identical.hidden = true
                form.appendChild(identical)

                const item = document.createElement('input')
                const itemName = document.querySelector('.pricechecktable .sbigger').textContent
                item.setAttribute('value', itemName)
                item.name = 'item'
                item.hidden = true
                form.appendChild(item)

                const button = document.createElement('input')
                button.type = 'submit'
                button.value = 'Check User Shops'
                button.style.border = 'none'
                button.style.background = 'none'
                button.style.fontWeight = 700
                button.style.fontSize = '1rem'
                button.style.color = '#037ad6'
                button.style.padding = 0
                form.appendChild(button)

                document.querySelector('.pricechecktable').appendChild(form)
            }, ELEMENT_LOADED)
        });
    }
})()
