// ==UserScript==
// @name        Shop Sales Saver
// @namespace   Marascripts
// @description Creates SQL insert for shop sales
// @author      marascripts
// @version     1.0.0
// @grant       GM_setClipboard
// @match       https://www.marapets.com/saleshistory.php*
// @homepageURL https://github.com/marascript/userscripts
// @supportURL	https://github.com/marascript/userscripts/issues
// @license     MIT
// ==/UserScript==

const allSales = document.querySelectorAll("#eachitemdiv")

let query = "INSERT INTO ShopSales (item, price, user) VALUES "

for (let i = 0; i < allSales.length; i++) {
	
	const item = allSales[i].querySelector(".bigger").textContent

	const user = allSales[i].querySelector(".alsotry")
	const userName = user.textContent
	const userId = user.parentElement.href.split("id=")[1]

	const mpText = allSales[i].querySelector(".mp").textContent
	const mp = parseInt(mpText.split("MP")[0].replace(/,/g, ""))

	const currentDate = new Date()
	const relativeTime = allSales[i].querySelectorAll("b")[2].textContent

	query += `("${item}", ${mp}, "${user}"), `
}

GM_setClipboard(query)
