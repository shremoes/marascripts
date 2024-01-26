// ==UserScript==
// @name        Freelance Picker
// @namespace   Marascripts
// @description Automatically selects the best value job.
// @author      marascripts
// @version     2.0.0
// @require     https://raw.githubusercontent.com/marascript/userscripts/master/scripts/utilities/captcha.js
// @grant       none
// @match       https://www.marapets.com/agency.php*
// @downloadURL https://raw.githubusercontent.com/marascript/userscripts/master/scripts/freelancePicker.user.js
// @homepageURL https://github.com/marascript/userscripts
// @supportURL	https://github.com/marascript/userscripts/issues
// @license     MIT
// ==/UserScript==

(() => {
    'use strict'

    /**
     * * Set to 1 to pick the best MP/time reatio job.
     * * Set to 0 to just pick the highest paying job.
     */
    const IGNORE_RATIO = 0

    const allJobs = [...document.querySelectorAll(".itemwidth.fixborders")]
    const unqualified = [...document.querySelectorAll(".fadeit3")]
    const availableJobs = allJobs.filter(job => !unqualified.includes(job))

    const bestJob = availableJobs.reduce((best, job) => {
        let pay = parseInt(job.innerText.split(" ")[0].split("MP")[0])

        if (!IGNORE_RATIO) {
            const timeNumber = parseInt(job.innerText.split(" ")[1])
            const time = timeNumber < 5 ? timeNumber * 60 : timeNumber
            pay = pay / time
        }

        return pay > best.pay ? { id: job.id, pay } : best
    }, { id: "", pay: 0 })

    if (bestJob.id) {
        document.querySelector(`#${bestJob.id} a`).click()
    }
})()
