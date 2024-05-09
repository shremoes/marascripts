// ==UserScript==
// @name        Avatar Solution Linker
// @namespace   Marascripts
// @description Adds direct links to Maraforce to missing avatar solution
// @author      marascripts
// @version     2.0.0
// @grant       none
// @match       https://www.marapets.com/avatars.php?missing=1*
// @downloadURL https://raw.githubusercontent.com/marascript/userscripts/master/scripts/avatarSolutionLinker.user.js
// @homepageURL https://github.com/marascript/userscripts
// @supportURL	https://github.com/marascript/userscripts/issues
// @license     MIT
// ==/UserScript==

(() => {
    'use strict'

    if (document.URL.includes('/avatars.php')) {
        const missingAvatars = document.querySelectorAll('#eachitemdiv')

        for (const avatar in missingAvatars) {
            missingAvatars[avatar].style.paddingBottom = '15px'

            if (!missingAvatars[avatar].querySelector('.offline')) {
                const name = missingAvatars[avatar].querySelector('.itempadding .bigger').innerText.replace(/ /g, '+')
                const link = document.createElement('a')
                const linkText = document.createTextNode('Check Solution')

                link.appendChild(linkText)
                link.href = `https://www.maraforce.com/avatars.php?search=${name}`
                link.target = '_blank'
                link.style.color = 'gray'
                link.style.fontWeight = 700

                missingAvatars[avatar].appendChild(link)
            }
        }
    }
})()
