/* This will check if the node version you are running is the required Node version, if it isn't it will throw the following error to inform you.
* Commented out incase it doesn't work with heroku
*/
//if (process.version.slice(1).split(".")[0] < 8) throw new Error("Node 8.0.0 or higher is required. Update Node on your system.");

const Discord = require("discord.js");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const Enmap = require("enmap");
const client = new Discord.Client();
require("./modules/functions.js")(client);
client.config = require("./config.js");
client.commands = new Enmap();
client.aliases = new Enmap();
const slFunction = require('./modules/slFunctions.js');
const moment = require('moment');

client.timer;
//it will automatically run, once program starts.
var runDaily = function () {
  client.timer = setTimeout(()=>{
    daily();
    //Notifies owner bot just started up/restarted
    client.sendOwnerMsg("Bot is now online!");
  }, 2000);
};
runDaily();

//ensure at reset, the date are updated so, spotlight is accurate to game.
function daily(){
  slFunction(client);
  var timeToMidnight;

  timeToMidnight = client.resetTime();
  console.log('Reset in: '+timeToMidnight+'\n');
  clearTimeout(client.timer);
  client.timer = setTimeout(daily, timeToMidnight);
};

/**
 * If you are using one bot then client.isBotOffline function is only required, you can delete timedCheckBotsOffline() function and client.config.myBotsID variable and replace line 47 with client.isBotOffline();
 * 3600000 is the time in milliseconds for an hr
 * times X for >1hours or divide by X to run the function in mins or secs
 * It is optimal to run it hours so you don't want to use too many of the server resources. 
 * You should not be running this function in a time frame of minutes or seconds, if your bot crashes frequently then you shouldn't be using the function below as it will be spamming the bot owner DMs
 * Recommended times are 1 hour, 4 hr, 6hr, 12hr or 30 mins (if a must)
 */
var botStatusCheck = function () {
  client.timedCheckBotsOffline();
  setTimeout(botStatusCheck,3600000*6);
}
botStatusCheck();

const init = async () => {

  // Here we load **commands** into memory, as a collection, so they're accessible
  // here and everywhere else.
  const cmdFiles = await readdir("./commands/");
  client.log("log", `Loading a total of ${cmdFiles.length} commands.`);
  cmdFiles.forEach(file => {
    if (!file.endsWith(".js")) return;
    const response = client.loadCommand(file);
    if (response) console.log(response);
  });

  // Then we load events, which will include our message and ready event.
  const evtFiles = await readdir("./events/");
  client.log("log", `Loading a total of ${evtFiles.length} events.`);
  evtFiles.forEach(file => {
    const eventName = file.split(".")[0];
    const event = require(`./events/${file}`);
    // This line is awesome by the way. Just sayin'.
    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
  });

  // Generate a cache of client permissions for pretty perms
  client.levelCache = {};
  for (let i = 0; i < client.config.permLevels.length; i++) {
    const thisLevel = client.config.permLevels[i];
    client.levelCache[thisLevel.name] = thisLevel.level;
  }

  // Here we login the client.
  client.login(process.env.token);

// End top-level async/await function.
};

init();
