// ==UserScript==
// @name        Forum Spammer
// @namespace   Marascripts
// @description Posts a random emoji every 2 minutes.
// @author      marascripts
// @version     2.0.0
// @grant       GM_setValue
// @grant       GM_getValue
// @match       https://www.marapets.com/topics.php*
// @downloadURL https://raw.githubusercontent.com/marascript/userscripts/master/scripts/spam.user.js
// @homepageURL https://github.com/marascript/userscripts
// @supportURL	https://github.com/marascript/userscripts/issues
// @license     MIT
// ==/UserScript==

(() => {
    'use strict'

    /**
     * * SETTINGS
     * ? MY_SPAM - Set to spam threads ID (...topics.php?post=1&id=111111&...)
     * ! MAX_TIME_TO_WAIT - MIN_TIME_TO_WAIT needs to be less than 60000
     * ? MAX_TIME_TO_WAIT - Max time in milliseconds between posts (125000 default)
     * ? MIN_TIME_TO_WAIT - Minimum time in milliseconds between posts (70000 default)
     */
    const MY_SPAM = 111111
    const MAX_TIME_TO_WAIT = 125000
    const MIN_TIME_TO_WAIT = 70000

    const URL = document.URL

    if (URL.includes(`id=${MY_SPAM}`) && URL.includes('fid=20')) {
        setTimeout(() => {
            const emoticons = [...document.querySelectorAll('.postmessage_emoticons a')].sort(() => Math.random() - 0.5)
            const lastEmoticon = GM_getValue('lastEmoji', '')

            for (const emoticon in emoticons) {
                const emojiType = emoticons[emoticon].getAttribute('onclick')
                if (emojiType !== lastEmoticon) {
                    emoticons[emoticon].click()
                    GM_setValue('lastEmoji', emojiType)
                    document.querySelector('.postmessage_button.forums_sendbutton input').click()
                    break
                }
            }
        }, Math.random() * (MAX_TIME_TO_WAIT - MIN_TIME_TO_WAIT) + MIN_TIME_TO_WAIT)
    }
})()
