// ==UserScript==
// @name        Online Players Visitor
// @namespace   Marascripts
// @description Visits online players during events.
// @author      marascripts
// @version     1.0.2
// @grant       GM_setValue
// @grant       GM_getValue
// @match       https://www.marapets.com/profile.php?id=*
// @match       https://www.marapets.com/online.php
// @homepageURL https://github.com/marascript/userscripts
// @supportURL	https://github.com/marascript/userscripts/issues
// @license     MIT
// ==/UserScript==

// TODO: Clear entries when done

(() => {
    'use strict'

    /**
     * Set to either one of the following:
     * birthday
     * christmas
     * halloween
     */
    const holiday = "birthday"

    const visited = GM_getValue("visited", [])

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
                const goTo = allOnline[profile].href + `&${holiday}=1`
                setTimeout(() => {
                    location.href = goTo
                }, Math.random() * (2000 - 1500) + 1500)
                break
            }
        }
    }

    if (document.URL.includes("profile") && document.URL.includes(`&${holiday}=1`)) {
        visited.push(location.href.split("&")[0])
        GM_setValue("visited", visited)
        setTimeout(() => {
            location.href = "https://www.marapets.com/online.php"
        }, Math.random() * (2000 - 1500) + 1500)
    }
})()
