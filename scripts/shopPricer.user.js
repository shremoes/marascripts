// ==UserScript==
// @name        Shop Pricer Easymode
// @namespace   Marascripts
// @description Automatically prices shop, requires the Gift Box.
// @author      marascripts
// @version     1.1.0
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
  
    const TIMEOUT = 150000;
    const IGNORE_LARGE_DROPS = 1;
    const IGNORE_MEDIUM_DROPS = 1;
  
    const noReprice = document.querySelector('.maralayoutmiddle .bigger.banned.middleit');
    const changed = document.querySelector('.maralayoutmiddle .bigger.middleit').innerText.search('You have changed');
    const autoPriced = document.querySelector('.maralayoutmiddle .bigger.middleit').innerText.search('has changed');
  
    // Click the "Auto Price" button, if none of the messages are present
    if (autoPriced === -1 && changed === -1 && !noReprice) {
      document.querySelector("input[value='Auto Price']").click();
    }
  
    // Click the "Update Prices" button, if the auto pricer message is there
    if (autoPriced !== -1) {
      if (!IGNORE_LARGE_DROPS) {
        const largeDrop = document.querySelectorAll('.marapets_border15');
        if (largeDrop.length !== 0) {
          ignoreReprice(largeDrop);
        }
      }
  
      if (!IGNORE_MEDIUM_DROPS) {
        const mediumDrop = document.querySelectorAll('.marapets_border14');
        if (mediumDrop.length !== 0) {
          ignoreReprice(mediumDrop);
        }
      }
  
      document.querySelector("input[value='Update Prices']").click();
    }
  
    // Go to the next page, or alert that we are finished
    if (noReprice || changed !== -1) {
      const secondToLastPageButton = [...document.querySelectorAll('.pages_all')[0].querySelectorAll('.pages_each a')].slice(-2, -1)[0];
  
      // If the second to last button says "Next >", click it otherwise notify we are finished
      if (secondToLastPageButton.innerText === 'Next ›') {
        secondToLastPageButton.click();
      } else {
        setTimeout(() => {
          window.location.href = 'https://www.marapets.com/viewstock.php?page=1';
        }, TIMEOUT);
      }
    }
  
    function ignoreReprice(items) {
      items.forEach((item) => {
        const oldPrice = item.querySelector('.mp').innerText.split('MP')[0].replace(/,/g, '');
        item.querySelector('input').value = oldPrice;
      });
    }
  })();
  
