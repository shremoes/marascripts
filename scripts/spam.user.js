// ==UserScript==
// @name        Forum Spammer
// @namespace   Marascripts
// @description Posts a random emoji every 2 minutes.
// @author      marascripts
// @version     1.0.0
// @grant       GM_setValue
// @grant       GM_getValue
// @match       https://www.marapets.com/topics.php*
// @run-at      document-idle
// @downloadURL https://raw.githubusercontent.com/marascript/userscripts/master/scripts/spam.user.js
// @homepageURL https://github.com/marascript/userscripts
// @supportURL	https://github.com/marascript/userscripts/issues
// @license     MIT
// ==/UserScript==
/*jshint -W033 */
/*jshint -W117 */ // Avoid JSHint errors in editor for GM* functions

(function () {
    'use strict'

    const URL = document.URL

    if (URL.includes("fid=20")) {
        /**
         * * Set this to your spam threads ID
         * ? The ID is the #: https://www.marapets.com/topics.php?post=1&id=#######&fid=20
         */
        const MY_SPAM = 111111

        if (URL.includes(`id=${MY_SPAM}`)) {
            setTimeout(() => {
                // Get all the emojis, and shuffle the array
                const emoticons = [...document.querySelectorAll(".postmessage_emoticons a")].sort(() => Math.random() - 0.5)

                // Get the last emoji used (the onclick)
                const lastEmoticon = GM_getValue("lastEmoji", "")


                for (const emoticon in emoticons) {
                    const emojiType = emoticons[emoticon].getAttribute("onclick")
                    // Compare the onclick event to the last, to avoid double post
                    // Pick the first one that is different, and make a new post
                    if (emojiType !== lastEmoticon) {
                        emoticons[emoticon].click()
                        GM_setValue("lastEmoji", emojiType) // Save the new emoji for next post
                        document.querySelector(".postmessage_button.forums_sendbutton input").click()
                        break
                    }
                }
            }, Math.random() * (125000 - 60000) + 60000)
        }
    }
})()
