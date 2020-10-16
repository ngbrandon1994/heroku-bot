# Heroku Discord Bot
A discord js bot is a back-up bot, I made for fun for my server that is being used among friends. This bot is coded using JavaScript with discord.js library and node.js platform and is using heroku as the host server. As it is being hosted on heroku it will run 24/7 but only for 23 days a month. 

If you are interested in seeing my bot in action, you are welcome to join my server
=======

If you are interested in seeing my bot in action, you are welcome to join my server,
[**Link will be provided in near future**](https://github.com/ngbrandon1994/heroku-bot)

# What is this project about?

 This project is about me learning a how to code and hosting on heroku and running 24/7 for groups of friends on my discord. This bot is intended as a backup bot incase my main server bot crashed and failed to restart despite using `pm2 start index.js`. My main bot is called Doctor, while this bot is called Master. This bot will be running similar commands if not the same commands, mostly borderline commands that doesn't impact on the hosting server.


# What are some goal of this project?

- [x] Developing a working generic discord bot for anyone to use
- [x] Learn how to code a discord bot
- [ ] Added in commands to look up data online
- [x] Use alias for commands instead of the command file name to run the command

# How to run and test this bot?

Remove process.env from config.js file:
* process.env.ownerID = your own discord user ID
* process.env.token = your bot token
* process.env.serverLink = your own discord server invite link

You can run the bot using command line with one of the two commands listed:
* Node index.js
* pm2 start index.js

*Recommended to use pm2 if you want the bot to run 24/7, and restart if it crashes or encounters a bug. Also able to restarts upon using the restart command*

# Bugs / Support / Suggestions

If you find a problem with the bot, please file an issue.

Please also state how the issue can be reproduced and the expected and unexpected behavior of the bot. If any screenshots please feel free to show it, so the issue can be solved as quickly as possible.

[Report an Issue](https://github.com/ngbrandon1994/heroku-bot/issues/new)

# Credits:
- Starting foundation of this bot is based off [An-Idiots-Guide](https://github.com/An-Idiots-Guide/guidebot)
