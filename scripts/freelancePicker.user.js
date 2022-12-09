// ==UserScript==
// @name        Freelance Picker
// @namespace   Marascripts
// @description Automatically selects the best value job.
// @author      marascripts
// @version     1.1.0
// @require     https://raw.githubusercontent.com/marascript/userscripts/master/scripts/utilities/captcha.js
// @grant       none
// @match       https://www.marapets.com/agency.php
// @run-at      document-idle
// @downloadURL https://raw.githubusercontent.com/marascript/userscripts/master/scripts/freelancePicker.user.js
// @homepageURL https://github.com/marascript/userscripts
// @supportURL	https://github.com/marascript/userscripts/issues
// @license     MIT
// ==/UserScript==
/*jshint -W033 */

(function () {
    'use strict'

    if (!document.querySelector(".bigger.middleit.comebackbox")) {
        const unqualified = [...document.querySelectorAll(".fadeit3")]
        const allJobs = [...document.querySelectorAll(".itemwidth.fixborders")]

        let bestRatio = 0
        let bestJob = ""

        for (const allJob of allJobs) {
            if (!unqualified.includes(allJob)) {
                const job = allJob.innerText.split(" ")
                const time = getJobTime(job)
                const ratio = getJobRatio(job, time)

                if (ratio > bestRatio) {
                    bestRatio = ratio
                    bestJob = allJob.id
                }
            }
        }

        document.querySelector(`#${bestJob} a`).click()
    }

    // TODO: Split thousand demonination jobs at comma
    function getJobRatio (job, time) {
        const pay = parseInt(job[0].split("MP")[0])
        return pay / time
    }

    function getJobTime (job) {
        const time = parseInt(job[1])
        const timeUnit = job[2].split("\n")[0]
        return timeUnit !== "minutes" ? time * 60 : time
    }
})()
