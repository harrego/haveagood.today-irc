const irc = require("irc")
const cron = require("node-cron")
const img = require("./img")

const botname = process.env.BOTNAME || "haveagoodtoday"
const ircserver = process.env.IRCSERVER
if (typeof ircserver !== "string") {
    console.log("[error] no irc server specified, use env var IRCSERVER")
    process.exit(1)
}
const ircport = process.env.IRCPORT || 6667
let ircchans = process.env.IRCCHANS
if (typeof ircchans === "string") {
    ircchans = process.env.IRCCHANS.split(",")
    if (ircchans.length <= 0) {
        console.log("[error] no channels specified, use env var IRCCHANS")
        process.exit(1)
    }
} else {
    console.log("[error] no channels specified, use env var IRCCHANS")
    process.exit(1)
}

const ircpassword = process.env.IRCPASSWORD || null
const ircsecure = process.env.IRCSECURE == "true" || false

// re-iterate connection settings
console.log(`[status] connecting to irc server:
  bot name: ${botname}
  server:   ${ircserver}
  port:     ${ircport}
  channels: ${ircchans.join(", ")}
  password: ${ircpassword}
  ssl:      ${ircsecure}`)

let sentTimeStatus = false
const startConnectionDate = new Date()

const client = new irc.Client("irc.harry.city", botname, {
    userName: botname,
    realName: botname,
    port: ircport,
    autoRejoin: true,
    autoConnect: true,
    channels: ircchans,
    password: ircpassword,
    secure: ircsecure,
    floodProtection: false
})

function randomGreeting() {
    const greetings = [
        "wishing u a day full of success",
        "hoping u achieve what u need to",
        "don't worry about the haters..... they're just there to make u laugh!!!!",
        "wishing u a discord-free day",
        "make today the best day of this week",
        "u now have 24 hrs...................... go :-)",
        "lets get it",
        "#yolo... do what u wanna do!!!!!!!!!",
        "mmmmmmmmmm.... uhhhhhhhh... oh yeah: have an amazing day",
        "Wishing you best at college, sweatheart!",
        "the world is urs",
        "gotta make the world in ur eyes.... not someone elses",
        "ur the best.... of all time.... period bitch",
        "another day another pay",
        "cmon bro.... u know its time to make it count",
        "Just do it.",
        "\"anyone got a watch??\"... yeah u jerk, its time u Just do it. and #makeitcount",
        "u know what u wanna do today???? go and do it",
        "ferb i know what we're gonna do today..... THIS SHOULD BE U!!!!!!!!",
        "make it harder make it stronger our work is never overrrrrr...",
        "wishing u a blessed day",
        "the angels around u pray for u to succeed",
        "can't wait to see what u do today!!!!!!!!!!!!!!! dont dm me about it tho :-)",
        "I KNOW NO ONE LIKE U...... GO AND DO SMTH AWESOME",
        "ur awesome, ur awesome, ur awesome.... oops sorry was affirming myself.... uhhh... go and have a great day :-)",
        "I LOVE YOU!!!!!!!! .... no not u, was talking to myself. still wishing u a great day tho... :-)",
        "WE THE BEST MUSIC!!! DJ KHALED!!!!!",
        "ANOTHER ONE!!!! AKA ANOTHER DAY!!!!!!!!!!!",
        "GABE NEWELL LEFT HIS MILLION DOLLAR JOB AT MSOFT TO MAKE HALF LIFE..... ur as awesome as gabe...do smth dope",
        "DON'T EVER TELL ME u cant do shit......u say that...i say [BUZZZZZZZZZZ] WRONG!!!",
        "U THE BEST!!! ANOTHER ONE!!!!!! DJ KHALED STYLEEEEEE",
        "cmon bro.. u already know what im gonna say, could probs do a better job, feeling not good today!!! PSYCH!!!",
        "trump became president... WASNT SO GOOD FOR EVERYONE....but it proves ANYTHING IS POSSIBLE!!!!!",
        "wishing love and happyness to my bestie... YOU!!!!! :-) (talking to the mirror)"
    ]
    return greetings[Math.floor(Math.random() * greetings.length)]
}

client.addListener("join", (chan, nick) => {
    if (nick == botname) {
        if (!sentTimeStatus) {
            sentTimeStatus = true
            const connectedDate = new Date()
            const difference = connectedDate.getTime() - startConnectionDate.getTime()
            console.log(`[irc connected] connected in ${Math.floor(Math.abs(difference))}ms`)
        }
    }

})

cron.schedule("0 0 * * *", () => {
    ircchans.forEach(chan => {
        client.say(chan, randomGreeting())
        client.say(chan, img.todaysImage())
    })
})

client.addListener("error", msg => {
    console.log(`[irc warning] recieved an error:`)
    console.log(msg)
})
