/*jshint -W033 */

/**
 * Script to include with others to target a captcha,
 * and once six numbers are entered, click submit.
 * 
 * Paste the following in any userscript:
 * @require https://github.com/marascript/userscripts/raw/master/scripts/utilities/captcha.js
 */

const captcha = document.querySelector("input[name='code']")

if (captcha) {
    captcha.focus()
    captcha.oninput = () => {
        if (captcha.value.length === 6) {
            const submitType = document.querySelector("input[type='submit']")
            const submitButton = document.querySelector("button.g-recaptcha")
            if (submitType) {
                submitType.click()
            }
            else {
                submitButton.click()
            }
        }
    }
}
