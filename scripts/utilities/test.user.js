// ==UserScript==
// @name							Function test
// @match             https://www.reddit.com/*
// @grant							GM_setValue
// @grant							GM_getValue
// @version          1.0
// ==/UserScript==

function set(key, value) {
  GM_setValue(key, value)
}

function get(key) {
  return GM_getValue(key)
}
