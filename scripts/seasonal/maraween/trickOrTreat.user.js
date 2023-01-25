// ==UserScript==
// @name        Trick or Treater
// @namespace   Marascripts
// @description Trick or treats.
// @author      marascripts
// @version     1.0.2
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_registerMenuCommand
// @match       https://www.marapets.com/profile.php?id=*
// @match       https://www.marapets.com/online.php
// @run-at      document-idle
// @downloadURL https://raw.githubusercontent.com/marascript/userscripts/master/scripts/seasonal/maraween/trickOrTreat.user.js
// @homepageURL https://github.com/marascript/userscripts
// @supportURL	https://github.com/marascript/userscripts/issues
// @license     MIT
// ==/UserScript==
/*jshint -W033 */
/*jshint -W117 */ // Avoid JSHint errors in editor for GM* functions

(function () {
    'use strict'

    const visited = GM_getValue("visited", [])

    GM_registerMenuCommand("Reset visited", function () { GM_setValue("visited", []) })

    if (document.URL.includes("online")) {
        const allOnline = document.querySelectorAll(".mainfeature_start a")

        for (const profile in allOnline) {
            const profileLink = allOnline[profile].href
            if (visited.includes(profileLink)) {
                allOnline[profile].href = ""
            }
        }

        for (const profile in allOnline) {
            const href = allOnline[profile].href
            if (href && href !== "" && href.includes("id=")) {
                const goTo = allOnline[profile].href + "&halloween=1"
                setTimeout(() => {
                    location.href = goTo
                }, Math.random() * (2000 - 1500) + 1500)
                break
            }
        }
    }

    if (document.URL.includes("profile") && document.URL.includes("&halloween=1")) {
        visited.push(location.href.split("&")[0])
        GM_setValue("visited", visited)
        setTimeout(() => {
            location.href = "https://www.marapets.com/online.php"
        }, Math.random() * (2000 - 1500) + 1500)
    }
})()
