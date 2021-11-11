// Credit for this code goes to Olia Lialina from haveagood.today,
// this is a reimplementation of that existing code for use in an
// IRC bot.
//
// https://haveagood.today/calendar.js

const seedrandom = require("seedrandom")
const fs = require("fs")

const images = JSON.parse(fs.readFileSync("images.json").toString())

function imageForDate(date) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const dom = date.getDate()
    const dow = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][date.getDay()]

    const seedString = `${year}-${month < 10 ? "0" : ""}${month}-${dom < 10 ? "0" : ""}${dom}-${dow}`
    const random = seedrandom(seedString)
    
    let directory = ["0-sunday", "1-monday", "2-tuesday", "3-wednesday", "4-thursday", "5-friday", "6-saturday"][date.getDay()]
    if (random() < 0.01) {
        let alt = ["anyday"]
        if (dow == "Monday")
            alt.push("weekstart")
        if (dow == "Friday" || dow == "Saturday")
            alt.push("weekend")

        directory = alt[Math.floor(random() * alt.length)]
    }
    image = images[directory][Math.floor(random() * images[directory].length)]
    return `https://haveagood.today/${image.p}`
}
exports.imageForDate = imageForDate

function todaysImage() {
    return imageForDate(new Date())
}
exports.todaysImage = todaysImage
