// ==UserScript==
// @name        Captcha Helper
// @namespace   Marascripts
// @description Focuses captcha input and submits once six numbers are entered.
// @author      marascripts
// @version     1.0.0
// @grant       none
// @match       https://www.marapets.com/elitegym.php*
// @match       https://www.marapets.com/gym.php*
// @match       https://www.marapets.com/school.php*
// @match       https://www.marapets.com/university.php*
// @match       https://www.marapets.com/agency.php*
// @match       https://www.marapets.com/shop.php*
// @match       https://www.marapets.com/brew.php*
// @match       https://www.marapets.com/candytree.php*
// @match       https://www.marapets.com/carpenter.php*
// @match       https://www.marapets.com/computer.php*
// @match       https://www.marapets.com/cosmonaut.php*
// @match       https://www.marapets.com/spy.php*
// @match       https://www.marapets.com/drew.php*
// @match       https://www.marapets.com/farm.php*
// @match       https://www.marapets.com/garage.php*
// @match       https://www.marapets.com/elger.php*
// @match       https://www.marapets.com/traveller.php*
// @match       https://www.marapets.com/leprechaun.php*
// @match       https://www.marapets.com/personaltrainer.php*
// @match       https://www.marapets.com/bee.php*
// @match       https://www.marapets.com/santa.php*
// @match       https://www.marapets.com/inn.php*
// @match       https://www.marapets.com/secret.php*
// @match       https://www.marapets.com/monster.php*
// @match       https://www.marapets.com/socks.php*
// @match       https://www.marapets.com/excavator.php*
// @match       https://www.marapets.com/explorer.php*
// @match       https://www.marapets.com/stalker.php*
// @match       https://www.marapets.com/snowman.php*
// @match       https://www.marapets.com/truck.php*
// @match       https://www.marapets.com/battle.php*
// @match       https://www.marapets.com/sumo.php*
// @match       https://www.marapets.com/talon.php*
// @match       https://www.marapets.com/shop.php*
// @match       https://www.marapets.com/agency.php*
// @run-at      document-idle
// @downloadURL https://raw.githubusercontent.com/marascript/userscripts/main/scripts/captchaHelper.user.js
// @homepageURL https://github.com/marascript/userscripts
// @supportURL	https://github.com/marascript/userscripts/issues
// @license     MIT
// ==/UserScript==
/*jshint -W033 */

(function () {
  'use strict'

  const captcha = document.querySelector("input[name='code']")

  if (captcha) {
    captcha.focus();
    captcha.oninput = () => {
      if (captcha.value.length === 6) {
        const submit = document.querySelector("input[type='submit']");
        submit.click();
      }
    };
  }
})()
