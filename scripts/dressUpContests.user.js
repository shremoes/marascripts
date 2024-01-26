// ==UserScript==
// @name        Show Dress Up Contest Themes
// @namespace   marascripts
// @description Show beauty/ugly contest themes when they are blank.
// @author      marascript
// @version     1.1.0
// @grant       none
// @match       https://www.marapets.com/beautycontest.php*
// @match       https://www.marapets.com/uglycontest.php*
// @downloadURL https://raw.githubusercontent.com/marascript/userscripts/master/scripts/dressUpContests.user.js
// @homepageURL https://github.com/marascript/userscripts
// @supportURL	https://github.com/marascript/userscripts/issues
// @license     MIT
// ==/UserScript==

// TODO: Show on the News page also.

(() => {
    "use strict"

    // "The theme this week is []"
    const themeBanner = document.querySelector(".middleit .manager");

    // If blank, show the theme
    if (themeBanner.innerText === "") {
        /**
         * Themes are the same each week of every year
         * Thanks to MommaCats:
         * https://www.marapets.com/blogs.php?entry=504247&id=3934884
         */
        const uglyContest = {
            1: "Royal Aliens",
            2: "In the Shadows",
            3: "Unlucky Exporer",
            4: "Radioactive Waste",
            5: "Medieval Villain",
            6: "Head in the Clouds",
            7: "Heartbreak",
            8: "Chinese Zodiac",
            9: "Feeling Underdressed",
            10: "Rainy Monday",
            11: "Cunning Leprechaun",
            12: "Too Much Sugar",
            13: "April Fool",
            14: "Lively and Crazy",
            15: "Rebel Style",
            16: "Hero's Sidekick",
            17: "Unappreciated Villain",
            18: "Walker of Shadows",
            19: "Philosophic Bugs",
            20: "Underworld",
            21: "Cold Feet",
            22: "New Fairy",
            23: "Bold Musician",
            24: "Devoted Servant",
            25: "Hardworking Understudy",
            26: "Tropical Storm",
            27: "In Davy Jones' Locker",
            28: "Thrift Shop Bargains",
            29: "Rain All Summer",
            30: "Staying Home",
            31: "Friends on the Other Side",
            32: "No Gifts this Year",
            33: "Birthday Entertainment",
            34: "High School Cliché",
            35: "70s, 80s, or 90s",
            36: "Just Wrong",
            37: "Homemade Costume",
            38: "Personal Trainer",
            39: "Dragon Food",
            40: "Autumn is Here",
            41: "Inhabitants of Suartalfar",
            42: "Masked Mystery",
            43: "Bloody Maniac",
            44: "Scary Decoration",
            45: "Master of Disguise",
            46: "No Shave November",
            47: "Turkey Dinner",
            48: "Ugly Sweater",
            49: "Sour Candy",
            50: "Christmas Decoration",
            51: "Overworked Santa",
            52: "Too Much Glitter"
        };

        const beautyContest = {
            1: "Futuristic Warrior",
            2: "Seeking the Light",
            3: "Gods of Atlantis",
            4: "Antarctic Inhabitants",
            5: "Knights of Camelot",
            6: "You're a Star",
            7: "Cupid in Love",
            8: "Chinese New Year",
            9: "Feeling Overdressed",
            10: "Sunny Spring",
            11: "At the End of the Rainbow",
            12: "Easter Candy",
            13: "Pastel Critter",
            14: "Elegant and Mature",
            15: "Bohemian Style",
            16: "Secret Agent",
            17: "Fairytale Royalty",
            18: "Cherry Flowers Blooming",
            19: "Talking Flowers",
            20: "Overworld",
            21: "I Hear the Bells",
            22: "Earthly Magic",
            23: "Gifted with a Talent",
            24: "El Dorado",
            25: "Hollywood Next!",
            26: "Summer Vacation",
            27: "Pirate Captain",
            28: "Extravagant Dress Up",
            29: "Pool Party",
            30: "1001 Nights",
            31: "Four Elements",
            32: "Birthday Party",
            33: "Treat me like Royalty",
            34: "Out of this World",
            35: "Adorable Nostalgia",
            36: "Marapets Inhabitants",
            37: "Cheeky Time Traveler",
            38: "Campus Queen Bee",
            39: "Dragon Trainer",
            40: "Masquerade Ball",
            41: "Inhabitants of Aagard",
            42: "Bewitching Night",
            43: "Nocturnal Killer",
            44: "Posessed Demon",
            45: "King/Queen of the Night",
            46: "Winter is Coming",
            47: "Sailing for a New Continent",
            48: "Beautiful Winter",
            49: "Sweet Candy",
            50: "Gifted Angel",
            51: "Santa's Helper",
            52: "New Year's Ball"
        };

        const themes = document.URL.includes("ugly") ? uglyContest : beautyContest;
        const week = getWeek();

        themeBanner.innerText = themes[week];
    }

    /**
     * Returns the week of the current year
     * https://stackoverflow.com/questions/6117814/get-week-of-year-in-javascript-like-in-php
     */
    function getWeek() {
        const now = new Date();
        const oneJan = new Date(now.getFullYear(), 0, 1);
        return Math.ceil((((now.getTime() - oneJan.getTime()) / 86400000) + oneJan.getDay() + 1) / 7);
    }
})()
