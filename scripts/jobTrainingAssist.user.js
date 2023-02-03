// ==UserScript==
// @name        Job Training Assistant
// @namespace   Marascripts
// @description Shows stats needed for each job on training pages, and profiles.
// @author      marascripts
// @version     1.0.0
// @grant       none
// @match       https://www.marapets.com/school.php*
// @match       https://www.marapets.com/gym.php*
// @match       https://www.marapets.com/elitegym.php*
// @match       https://www.marapets.com/university.php*
// @match       https://www.marapets.com/pets.php*
// @match		https://www.marapets.com/inn.php
// @match       https://www.marapets.com/computer.php
// @downloadURL https://raw.githubusercontent.com/marascript/userscripts/master/scripts/jobTrainingAssist.user.js
// @homepageURL https://github.com/marascript/userscripts
// @supportURL	https://github.com/marascript/userscripts/issues
// @license     MIT
// ==/UserScript==
/*jshint -W033 */

/**
 * TODO: Computer repair and Percilla aren't working.
 * TODO: Show on collections/rewards pages.
 * TODO: After completing, numbers do not show.
 */

(function () {
    'use strict'

    /**
     * * Put pets IDs in quotes in whichever job the have.
     * ? Example: https://www.marapets.com/pets.php?id=0000000
     */
    const actors = ['0000000']
    const architects = []
    const astronauts = []
    const athletes = []
    const bankers = []
    const entrepeneurs = []
    const chefs = []
    const clowns = []
    const doctors = []
    const fireFighters = []
    const hackers = []
    const journalists = []
    const mechanics = []
    const models = []
    const police = []
    const politicians = []
    const popStars = []
    const programmers = []
    const scientists = []
    const soldiers = []
    const spys = []
    const teachers = []
    const thieves = []
    const vets = []

    // University
    const environment = document.querySelector("img[src='https://images.marapets.com/decade/pets/enviroment.png']")
    const computer = document.querySelector("img[src='https://images.marapets.com/decade/pets/computer.png']")
    const sociology = document.querySelector("img[src='https://images.marapets.com/decade/pets/sociology.png']")
    const politics = document.querySelector("img[src='https://images.marapets.com/decade/pets/politics.png']")
    const business = document.querySelector("img[src='https://images.marapets.com/decade/pets/business.png']")
    const molecular = document.querySelector("img[src='https://images.marapets.com/decade/pets/molecular.png']")
    const humanities = document.querySelector("img[src='https://images.marapets.com/decade/pets/humanities.png']")
    const law = document.querySelector("img[src='https://images.marapets.com/decade/pets/law.png']")

    // School
    const art = document.querySelector("img[src='https://images.marapets.com/decade/pets/art.png']")
    const math = document.querySelector("img[src='https://images.marapets.com/decade/pets/math.png']")
    const geography = document.querySelector("img[src='https://images.marapets.com/decade/pets/geography.png']")
    const science = document.querySelector("img[src='https://images.marapets.com/decade/pets/science.png']")
    const music = document.querySelector("img[src='https://images.marapets.com/decade/pets/music.png']")
    const language = document.querySelector("img[src='https://images.marapets.com/decade/pets/english.png']")
    const sports = document.querySelector("img[src='https://images.marapets.com/decade/pets/sports.png']")
    const historyy = document.querySelector("img[src='https://images.marapets.com/decade/pets/history.png']") // Two y's to avoid global JS error

    // Gym
    const health = document.querySelector("img[src='https://images.marapets.com/decade/pets/small_health.png']")
    const level = document.querySelector("img[src='https://images.marapets.com/decade/pets/small_level_arrow.png']")
    const speed = document.querySelector("img[src='https://images.marapets.com/decade/pets/small_speed.png']")
    const defence = document.querySelector("img[src='https://images.marapets.com/decade/pets/small_def.png']")
    const strength = document.querySelector("img[src='https://images.marapets.com/decade/pets/small_str.png']")

    // Elite Gym
    const balance = document.querySelector("img[src='https://images.marapets.com/decade/pets/bal_small.png']")
    const coordination = document.querySelector("img[src='https://images.marapets.com/decade/pets/small_coord.png']")
    const stamina = document.querySelector("img[src='https://images.marapets.com/decade/pets/stam_small.png']")

    // Collections
    const dvds = document.querySelector("img[src='https://images.marapets.com/decade/icon_dvdstat.png']")
    const cds = document.querySelector("img[src='https://images.marapets.com/decade/icon_cdstat.png']")
    const spells = document.querySelector("img[src='https://images.marapets.com/decade/icon_spellstat.png']")
    const books = document.querySelector("img[src='https://images.marapets.com/decade/icon_bookstat.png']")
    const instruments = document.querySelector("img[src='https://images.marapets.com/decade/icon_instrumentstat.png']")

    // Misc Stats
    const charisma = document.querySelector("img[src='https://images.marapets.com/decade/pets/small_char.png']")
    const magic = document.querySelector("img[src='https://images.marapets.com/decade/pets/small_magic.png']")

    // Locations
    const onProfile = document.URL.includes('pets.php?id')
    const atGym = document.URL.includes('gym.php?do')
    const atUniversity = document.URL.includes('university.php?do')
    const atSchool = document.URL.includes('school.php?do')
    const atEliteGym = document.URL.includes('elitegym.php?do')
    const atPerscilla = document.URL === "https://www.marapets.com/inn.php"
    const atComputerRepair = document.URL === "https://www.marapets.com/computer.php"

    function updateSkill (skill, needed) {
        const toReplace = skill.parentElement.parentElement.querySelector(".text-right b")
        const currentStats = toReplace.innerText.split("/")[0]

        if (currentStats < needed) {
            toReplace.innerText = `${currentStats}/${needed}`
            toReplace.style.color = 'red'
        }
    }

    // Actor
    function updateActor () {
        if (onProfile || atEliteGym) {
            updateSkill(coordination, 100)
            updateSkill(balance, 130)
        }

        if (onProfile || atSchool) {
            updateSkill(music, 120)
            updateSkill(language, 150)
        }

        if (onProfile || atGym) {
            updateSkill(health, 125)
        }

        if (onProfile) {
            updateSkill(dvds, 100)
            updateSkill(books, 70)
            updateSkill(instruments, 200)
        }

        if (onProfile || atUniversity) {
            updateSkill(sociology, 28)
            updateSkill(politics, 37)
        }

        if (onProfile || atPerscilla) {
            updateSkill(charisma, 150)
        }
    }

    function updateArchitect () {
        if (onProfile || atEliteGym) {
            updateSkill(coordination, 100)
        }

        if (onProfile || atSchool) {
            updateSkill(art, 110)
            updateSkill(geography, 75)
            updateSkill(math, 100)
            updateSkill(science, 100)
        }

        if (onProfile || atGym) {
            updateSkill(health, 160)
        }

        if (onProfile) {
            updateSkill(books, 95)
        }

        if (onProfile || atUniversity) {
            updateSkill(environment, 32)
            updateSkill(computer, 30)
            updateSkill(business, 40)
        }
    }

    function updateAstronaut () {
        if (onProfile || atEliteGym) {
            updateSkill(stamina, 300)
            updateSkill(coordination, 200)
            updateSkill(balance, 200)
        }

        if (onProfile || atGym) {
            updateSkill(level, 300)
            updateSkill(strength, 300)
            updateSkill(speed, 300)
            updateSkill(health, 500)
        }

        if (onProfile || atSchool) {
            updateSkill(geography, 300)
            updateSkill(math, 300)
            updateSkill(science, 300)
            updateSkill(sports, 300)
        }

        if (onProfile || atUniversity) {
            updateSkill(environment, 45)
            updateSkill(computer, 45)
            updateSkill(molecular, 45)
        }

        if (onProfile || atPerscilla) {
            updateSkill(charisma, 125)
        }

        if (onProfile || atComputerRepair) {
            updateSkill(magic, 250)
        }

        if (onProfile) {
            updateSkill(cds, 85)
            updateSkill(dvds, 110)
            updateSkill(books, 100)
            updateSkill(spells, 100)
        }
    }

    function updateAthlete () {
        if (onProfile || atEliteGym) {
            updateSkill(stamina, 200)
            updateSkill(coordination, 200)
            updateSkill(balance, 200)
        }

        if (onProfile || atSchool) {
            updateSkill(sports, 250)
        }

        if (onProfile || atGym) {
            updateSkill(level, 300)
            updateSkill(strength, 250)
            updateSkill(speed, 250)
            updateSkill(health, 250)
        }

        if (onProfile || atPerscilla) {
            updateSkill(charisma, 100)
        }

        if (onProfile || atComputerRepair) {
            updateSkill(magic, 200)
        }
    }

    function updateBanker () {
        if (onProfile || atSchool) {
            updateSkill(math, 200)
        }

        if (onProfile || atGym) {
            updateSkill(defence, 100)
        }

        if (onProfile) {
            updateSkill(cds, 45)
            updateSkill(dvds, 55)
            updateSkill(books, 110)
        }

        if (onProfile || atPerscilla) {
            updateSkill(charisma, 50)
        }

        if (onProfile || atUniversity) {
            updateSkill(business, 45)
            updateSkill(computer, 40)
            updateSkill(law, 23)
            updateSkill(humanities, 23)
        }
    }

    function updateEntrepeneur () {
        if (onProfile || atPerscilla) {
            updateSkill(charisma, 175)
        }

        if (onProfile) {
            updateSkill(books, 200)
        }

        if (onProfile || atUniversity) {
            updateSkill(business, 46)
            updateSkill(humanities, 30)
        }

        if (onProfile || atSchool) {
            updateSkill(language, 175)
            updateSkill(historyy, 175)
            updateSkill(math, 175)
            updateSkill(geography, 175)
        }
    }

    function updateChef () {
        if (onProfile || atEliteGym) {
            updateSkill(stamina, 125)
            updateSkill(coordination, 125)
        }

        if (onProfile || atGym) {
            updateSkill(level, 125)
            updateSkill(health, 100)
        }

        if (onProfile || atSchool) {
            updateSkill(art, 80)
            updateSkill(science, 125)
        }

        if (onProfile || atUniversity) {
            updateSkill(business, 32)
            updateSkill(environment, 20)
        }

        if (onProfile || atPerscilla) {
            updateSkill(charisma, 60)
        }

        if (onProfile) {
            updateSkill(cds, 125)
            updateSkill(dvds, 125)
            updateSkill(books, 120)
        }
    }

    function updateClown () {
        if (onProfile || atEliteGym) {
            updateSkill(stamina, 200)
            updateSkill(coordination, 250)
            updateSkill(balance, 200)
        }

        if (onProfile) {
            updateSkill(cds, 100)
            updateSkill(dvds, 100)
            updateSkill(instruments, 200)
        }

        if (onProfile || atPerscilla) {
            updateSkill(charisma, 200)
        }

        if (onProfile || atComputerRepair) {
            updateSkill(magic, 150)
        }

        if (onProfile || atGym) {
            updateSkill(strength, 160)
            updateSkill(health, 200)
            updateSkill(speed, 220)
        }

        if (onProfile || atSchool) {
            updateSkill(art, 70)
            updateSkill(music, 100)
            updateSkill(sports, 175)
        }
    }

    function updateDoctor () {
        if (onProfile || atEliteGym) {
            updateSkill(stamina, 200)
            updateSkill(coordination, 250)
        }

        if (onProfile) {
            updateSkill(cds, 80)
            updateSkill(dvds, 60)
            updateSkill(books, 110)
        }

        if (onProfile || atPerscilla) {
            updateSkill(charisma, 65)
        }

        if (onProfile || atGym) {
            updateSkill(defence, 150)
            updateSkill(health, 140)
            updateSkill(level, 160)
        }

        if (onProfile || atSchool) {
            updateSkill(math, 150)
            updateSkill(language, 100)
            updateSkill(science, 175)
        }

        if (onProfile || atUniversity) {
            updateSkill(humanities, 20)
            updateSkill(environment, 44)
            updateSkill(molecular, 45)
            updateSkill(computer, 30)
        }
    }

    function updateFireFighter () {
        if (onProfile || atEliteGym) {
            updateSkill(stamina, 200)
            updateSkill(coordination, 100)
            updateSkill(balance, 175)
        }

        if (onProfile) {
            updateSkill(cds, 45)
            updateSkill(dvds, 55)
            updateSkill(books, 90)
        }

        if (onProfile || atPerscilla) {
            updateSkill(charisma, 100)
        }

        if (onProfile || atComputerRepair) {
            updateSkill(magic, 125)
        }

        if (onProfile || atGym) {
            updateSkill(defence, 300)
            updateSkill(health, 220)
            updateSkill(level, 125)
            updateSkill(strength, 300)
        }

        if (onProfile || atSchool) {
            updateSkill(geography, 125)
            updateSkill(language, 125)
            updateSkill(sports, 300)
        }

        if (onProfile || atUniversity) {
            updateSkill(environment, 45)
            updateSkill(law, 45)
        }

    }

    function updateHacker () {
        if (onProfile || atEliteGym) {
            updateSkill(stamina, 200)
        }

        if (onProfile) {
            updateSkill(cds, 100)
            updateSkill(dvds, 200)
            updateSkill(books, 200)
        }

        if (onProfile || atPerscilla) {
            updateSkill(charisma, 60)
        }

        if (onProfile || atGym) {
            updateSkill(speed, 145)
            updateSkill(level, 150)
        }

        if (onProfile || atSchool) {
            updateSkill(language, 145)
            updateSkill(math, 200)
            updateSkill(science, 125)
        }

        if (onProfile || atUniversity) {
            updateSkill(politics, 38)
            updateSkill(computer, 45)
            updateSkill(business, 30)
        }
    }

    function updateJournalist () {
        if (onProfile || atEliteGym) {
            updateSkill(stamina, 110)
        }

        if (onProfile) {
            updateSkill(cds, 55)
            updateSkill(dvds, 50)
            updateSkill(books, 90)
        }

        if (onProfile || atPerscilla) {
            updateSkill(charisma, 65)
        }

        if (onProfile || atGym) {
            updateSkill(speed, 100)
            updateSkill(level, 100)
        }

        if (onProfile || atSchool) {
            updateSkill(language, 100)
            updateSkill(geography, 70)
            updateSkill(historyy, 75)
        }

        if (onProfile || atUniversity) {
            updateSkill(humanities, 30)
            updateSkill(computer, 23)
            updateSkill(sociology, 20)
        }
    }

    function updateMechanic () {
        if (onProfile || atEliteGym) {
            updateSkill(balance, 80)
            updateSkill(coordination, 70)
        }

        if (onProfile) {
            updateSkill(cds, 90)
            updateSkill(dvds, 60)
            updateSkill(books, 100)
        }

        if (onProfile || atPerscilla) {
            updateSkill(charisma, 50)
        }

        if (onProfile || atGym) {
            updateSkill(strength, 125)
            updateSkill(level, 125)
        }

        if (onProfile || atSchool) {
            updateSkill(math, 100)
            updateSkill(sports, 70)
            updateSkill(science, 120)
        }

        if (onProfile || atUniversity) {
            updateSkill(business, 20)
            updateSkill(environment, 30)
        }
    }

    function updateModel () {
        if (onProfile || atEliteGym) {
            updateSkill(balance, 200)
            updateSkill(coordination, 200)
        }

        if (onProfile) {
            updateSkill(cds, 150)
            updateSkill(dvds, 150)
            updateSkill(instruments, 145)
        }

        if (onProfile || atPerscilla) {
            updateSkill(charisma, 125)
        }

        if (onProfile || atGym) {
            updateSkill(health, 200)
        }

        if (onProfile || atSchool) {
            updateSkill(language, 125)
            updateSkill(sports, 120)
            updateSkill(art, 100)
        }

        if (onProfile || atUniversity) {
            updateSkill(business, 28)
        }
    }

    function updatePoliceOfficer () {
        if (onProfile || atEliteGym) {
            updateSkill(stamina, 175)
        }

        if (onProfile) {
            updateSkill(books, 100)
        }

        if (onProfile || atPerscilla) {
            updateSkill(charisma, 85)
        }

        if (onProfile || atGym) {
            updateSkill(health, 125)
            updateSkill(level, 100)
            updateSkill(strength, 300)
            updateSkill(defence, 220)
            updateSkill(speed, 125)
        }

        if (onProfile || atSchool) {
            updateSkill(language, 85)
            updateSkill(sports, 100)
            updateSkill(historyy, 75)
        }

        if (onProfile || atUniversity) {
            updateSkill(sociology, 45)
            updateSkill(law, 45)
        }
    }

    function updatePolitician () {
        if (onProfile || atEliteGym) {
            updateSkill(stamina, 200)
        }

        if (onProfile) {
            updateSkill(books, 160)
        }

        if (onProfile || atPerscilla) {
            updateSkill(charisma, 250)
        }

        if (onProfile || atGym) {
            updateSkill(health, 200)
        }

        if (onProfile || atSchool) {
            updateSkill(language, 250)
            updateSkill(geography, 160)
            updateSkill(historyy, 160)
        }

        if (onProfile || atUniversity) {
            updateSkill(sociology, 30)
            updateSkill(law, 45)
            updateSkill(politics, 45)
        }
    }

    function updatePopStar () {
        if (onProfile || atEliteGym) {
            updateSkill(coordination, 250)
        }
        if (onProfile) {
            updateSkill(cds, 180)
            updateSkill(dvds, 200)
            updateSkill(instruments, 550)
        }

        if (onProfile || atPerscilla) {
            updateSkill(charisma, 200)
        }

        if (onProfile || atGym) {
            updateSkill(health, 175)
        }

        if (onProfile || atSchool) {
            updateSkill(language, 175)
            updateSkill(art, 175)
            updateSkill(music, 240)
        }
    }

    function updateProgrammer () {
        if (onProfile || atEliteGym) {
            updateSkill(stamina, 120)
        }

        if (onProfile) {
            updateSkill(books, 200)
            updateSkill(dvds, 200)
        }

        if (onProfile || atPerscilla) {
            updateSkill(charisma, 50)
        }

        if (onProfile || atGym) {
            updateSkill(speed, 200)
        }

        if (onProfile || atSchool) {
            updateSkill(language, 200)
            updateSkill(math, 250)
            updateSkill(science, 140)
        }

        if (onProfile || atUniversity) {
            updateSkill(business, 45)
            updateSkill(computer, 45)
        }
    }

    function updateScientist () {
        if (onProfile || atEliteGym) {
            updateSkill(coordination, 175)
        }
        if (onProfile) {
            updateSkill(books, 170)
        }

        if (onProfile || atPerscilla) {
            updateSkill(charisma, 60)
        }

        if (onProfile || atGym) {
            updateSkill(speed, 150)
        }

        if (onProfile || atSchool) {
            updateSkill(language, 125)
            updateSkill(math, 200)
            updateSkill(science, 200)
        }

        if (onProfile || atUniversity) {
            updateSkill(environment, 45)
            updateSkill(molecular, 45)
            updateSkill(computer, 45)
        }
    }

    function updateSoldier () {
        if (onProfile || atEliteGym) {
            updateSkill(coordination, 150)
            updateSkill(stamina, 150)
            updateSkill(balance, 225)
        }

        if (onProfile) {
            updateSkill(books, 90)
            updateSkill(dvds, 150)
            updateSkill(cds, 110)
            updateSkill(spells, 100)
        }

        if (onProfile || atPerscilla) {
            updateSkill(charisma, 105)
        }

        if (onProfile || atComputerRepair) {
            updateSkill(magic, 400)
        }

        if (onProfile || atGym) {
            updateSkill(speed, 300)
            updateSkill(level, 200)
            updateSkill(defence, 300)
            updateSkill(strength, 300)
            updateSkill(health, 300)
        }

        if (onProfile || atSchool) {
            updateSkill(language, 75)
            updateSkill(sports, 100)
        }

        if (onProfile || atUniversity) {
            updateSkill(business, 20)
            updateSkill(computer, 25)
        }
    }

    function updateSpy () {
        if (onProfile || atEliteGym) {
            updateSkill(coordination, 125)
            updateSkill(stamina, 125)
            updateSkill(balance, 100)
        }

        if (onProfile) {
            updateSkill(books, 95)
            updateSkill(spells, 70)
        }

        if (onProfile || atPerscilla) {
            updateSkill(charisma, 100)
        }

        if (onProfile || atComputerRepair) {
            updateSkill(magic, 75)
        }

        if (onProfile || atGym) {
            updateSkill(speed, 125)
            updateSkill(defence, 200)
            updateSkill(strength, 200)
            updateSkill(health, 100)
        }

        if (onProfile || atSchool) {
            updateSkill(math, 100)
            updateSkill(geography, 125)
            updateSkill(sports, 125)
            updateSkill(language, 120)
        }

        if (onProfile || atUniversity) {
            updateSkill(law, 35)
            updateSkill(computer, 35)
        }
    }

    function updateTeacher () {
        if (onProfile || atEliteGym) {
            updateSkill(stamina, 150)
        }

        if (onProfile) {
            updateSkill(books, 100)
            updateSkill(cds, 80)
            updateSkill(dvds, 80)
            updateSkill(instruments, 200)
        }

        if (onProfile || atPerscilla) {
            updateSkill(charisma, 110)
        }

        if (onProfile || atGym) {
            updateSkill(health, 200)
        }

        if (onProfile || atSchool) {
            updateSkill(math, 200)
            updateSkill(geography, 200)
            updateSkill(music, 100)
            updateSkill(historyy, 200)
            updateSkill(science, 200)
            updateSkill(sports, 80)
            updateSkill(language, 200)
        }

        if (onProfile || atUniversity) {
            updateSkill(environment, 45)
            updateSkill(humanities, 45)
            updateSkill(sociology, 45)
            updateSkill(molecular, 45)
            updateSkill(computer, 45)
        }
    }

    function updateThief () {
        if (onProfile || atEliteGym) {
            updateSkill(stamina, 160)
            updateSkill(coordination, 20)
        }

        if (onProfile) {
            updateSkill(cds, 70)
            updateSkill(dvds, 125)
            updateSkill(spells, 100)
        }

        if (onProfile || atPerscilla) {
            updateSkill(charisma, 70)
        }

        if (onProfile || atComputerRepair) {
            updateSkill(magic, 150)
        }

        if (onProfile || atGym) {
            updateSkill(speed, 200)
            updateSkill(strength, 150)
            updateSkill(level, 150)
        }

        if (onProfile || atSchool) {
            updateSkill(sports, 200)
        }

        if (onProfile || atUniversity) {
            updateSkill(law, 45)
        }
    }

    function updateVterinarian () {
        if (onProfile || atEliteGym) {
            updateSkill(stamina, 125)
            updateSkill(coordination, 100)
            updateSkill(balance, 125)
        }

        if (onProfile) {
            updateSkill(books, 110)
        }

        if (onProfile || atPerscilla) {
            updateSkill(charisma, 80)
        }

        if (onProfile || atGym) {
            updateSkill(speed, 100)
            updateSkill(strength, 150)
            updateSkill(defence, 100)
        }

        if (onProfile || atSchool) {
            updateSkill(geography, 100)
            updateSkill(math, 180)
            updateSkill(science, 220)
            updateSkill(sports, 80)
            updateSkill(language, 70)
        }

        if (onProfile || atUniversity) {
            updateSkill(molecular, 45)
            updateSkill(environment, 45)
        }
    }

    const petId = document.querySelector(".specialpet").parentElement.href.split("id=")[1]

    if (actors.includes(petId)) { updateActor() }
    if (architects.includes(petId)) { updateArchitect() }
    if (astronauts.includes(petId)) { updateAstronaut() }
    if (athletes.includes(petId)) { updateAthlete() }
    if (bankers.includes(petId)) { updateBanker() }
    if (entrepeneurs.includes(petId)) { updateEntrepeneur() }
    if (chefs.includes(petId)) { updateChef() }
    if (clowns.includes(petId)) { updateClown() }
    if (doctors.includes(petId)) { updateDoctor() }
    if (fireFighters.includes(petId)) { updateFireFighter() }
    if (hackers.includes(petId)) { updateHacker() }
    if (journalists.includes(petId)) { updateJournalist() }
    if (mechanics.includes(petId)) { updateMechanic() }
    if (models.includes(petId)) { updateModel() }
    if (police.includes(petId)) { updatePoliceOfficer() }
    if (politicians.includes(petId)) { updatePolitician() }
    if (popStars.includes(petId)) { updatePopStar() }
    if (programmers.includes(petId)) { updateProgrammer() }
    if (scientists.includes(petId)) { updateScientist() }
    if (soldiers.includes(petId)) { updateSoldier() }
    if (spys.includes(petId)) { updateSpy() }
    if (teachers.includes(petId)) { updateTeacher() }
    if (thieves.includes(petId)) { updateThief() }
    if (vets.includes(petId)) { updateVterinarian() }
})()
