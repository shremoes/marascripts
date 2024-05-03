// ==UserScript==
// @name        Shop Pricer Easymode
// @namespace   Marascripts
// @description Automatically prices shop, requires the Gift Box.
// @author      marascripts
// @version     1.2.0
// @grant       none
// @match       https://www.marapets.com/viewstock.php*
// @downloadURL https://raw.githubusercontent.com/marascript/userscripts/master/scripts/shopPricer.user.js
// @homepageURL https://github.com/marascript/userscripts
// @supportURL	https://github.com/marascript/userscripts/issues
// @license     MIT
// ==/UserScript==

// TODO: Add a button instead of the shopkeeper

(() => {
  'use strict';


  /**
   * Settings
   * 
   * TIMEOUT - Set to amount of milliseconds to wait before restarting
   * IGNORE_LARGE_DROPS - Set to 1 to ignore large price drops (red box)
   * IGNORE_MEDIUM_DROPS - Set to 1 to ignore medium price drops (yellow box)
   */
  const TIMEOUT = 1200000;
  const IGNORE_LARGE_DROPS = 0;
  const IGNORE_MEDIUM_DROPS = 0;


  function getNextStep() {
    const message = document.querySelector('.maralayoutmiddle .bigger.middleit')
    const changed = message.innerText.includes('have');
    const autoPriced = message.innerText.includes('has');
    const noReprice = message.innerText.includes('not');

    if (autoPriced) { updatePrices() }
    if (noReprice || changed) { nextPageOrRestart() }
    else { document.querySelector("input[value='Auto Price']").click(); }
  }

  function nextPageOrRestart() {
    const pageButtons = document.querySelectorAll('.pages_all .pages_each a');
    const secondToLastPageButton = pageButtons[pageButtons.length - 2];

    if (secondToLastPageButton.innerText === 'Next ›') {
      secondToLastPageButton.click();
    } else {
      setTimeout(() => {
        location.href = 'https://www.marapets.com/viewstock.php?page=1';
      }, TIMEOUT);
    }
  }

  function updatePrices() {
    if (!IGNORE_LARGE_DROPS) { ignoreReprice('.marapets_border15'); }
    if (!IGNORE_MEDIUM_DROPS) { ignoreReprice('.marapets_border14'); }

    document.querySelector("input[value='Update Prices']").click();
  }

  function ignoreReprice(selector) {
    const items = document.querySelectorAll(selector);
    items.forEach((item) => {
      const oldPrice = item.querySelector('.mp').innerText.split('MP')[0].replace(/,/g, '');
      item.querySelector('input').value = oldPrice;
    });
  }

  getNextStep()
})();
