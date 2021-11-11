# haveagood.today-irc
IRC bot version of [haveagood.today](https://haveagood.today), an art project by [Olia Lialina](http://art.teleportacia.org/olia.html), commissioned by [the Internet Archive](https://archive.org/) to produce a unique GIF for every day. Credit for the concept, images and image generation code goes to Olia Lialina, this is a re-implementation of the website as an IRC bot.

This project is not affiliated, associated, authorized, endorsed by, or in any way officially connected with haveagood.today.

## What does it do?

Every day at midnight the IRC bot will post the URL to the daily GIF and an espresso shot of motivation :-), you can preview the messages in `index.js`.

## Setup

1. Clone the project
2. Grab the images file: `wget https://haveagood.today/images.json`
2. `npm i` to grab all the dependencies.
3. Setup the environment variables, table below.
4. `npm start`

### Environment Variables

|Variable|Description|Required|Default|
|-|-|-|-|
|`BOTNAME`|The name of the IRC bot.|No|`havegoodtoday`|
|`IRCSERVER`|Address of the IRC server.|Yes|N/A|
|`IRCCHANS`|Command separated list of IRC channels to send messages in, with the # included.|Yes|N/A|
|`IRCPORT`|Port of the IRC server.|No|6667|
|`IRCPASSWORD`|Password to connect to the IRC server.|No|N/A|
|`IRCSECURE`|Does the IRC server use SSL?|No|`false`|
