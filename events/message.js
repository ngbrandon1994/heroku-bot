// The MESSAGE event runs anytime a message is received
// Note that due to the binding of client to every event, every event
// goes `client, other, args` when this function is run.

module.exports = (client, message) => {
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if (message.author.bot) return;

  //List of replies to certain phase(s) or word(s) stated by a user.
  var msg = message.content;
  msg = msg.toLowerCase;
  const saying =  {
    "ayy": "Ayy, lmao!",
    "wat": "Say what?",
    "good game": "gg",
    "legit": "Seems legit"
  };

  //If you want to see if someone spamming your bot can cause lagg if doing something with it.
  //not really checking or doing anything with it, just logging it
  if(message.channel.type === 'dm' && message.author.id != client.config.ownerID){
    console.log("[DM] from "+message.author+":\n\n"+message.content);
  }
  //reply to user if they say something listed in the saying array.
  //personal preferences
  if(message.channel.type != 'dm' && saying[msg]){
    message.channel.send(saying[msg])
  }
  /**
   * Fun responses for when a user mentions the bot 
   * --This is assuming if you aren't using if mentioning the bot then respond with list of commands, otherwise you can remove the next 8 lines of code after the comments and use the commented sudo codes.
   * const regex = new RegExp(`^(<@!?${client.user.id}>)`);
   * message.content.match(regex) -> if true can set cmd = help 
   */
  let mention = message.mentions.users.first();
  if(!mention){
    if(mention.id === client.config.botID && message.content.indexOf(client.config.prefix) !== 0){
      const myArray = ['I am a bot, How can I bot you away','Annoy someone else','Shoo!','Grrr!'];
      let rdm = Math.floor(Math.random() * myArray.length);
      message.reply(myArray[rdm]);
    }
  }

  if (message.content.indexOf(client.config.prefix) !== 0) return;

  // Here we separate our "command" name, and our "arguments" for the command.
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // Get the user or member's permission level from the elevation
  const level = client.permlevel(message);

  // Check whether the command, or alias, exist in the collections defined
  // in index.js.
  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
  // using this const varName = thing OR otherthign; is a pretty efficient
  // and clean way to grab one of 2 values!
  if (!cmd) return;

  // Some commands may not be useable in DMs. This check prevents those commands from running
  // and return a friendly error message.
  if (cmd && !message.guild && cmd.conf.guildOnly)
    return message.channel.send("This command is unavailable via private message. Please run this command in a guild.");

  if (level < client.levelCache[cmd.conf.permLevel]) {
    /**
     * cmd.conf.permLevel < 10
     * disable bot owner cmd to be noticeable by other users who isn't the bot owner. 
     * This ensure any high end commands that shouldn't be touched won't be unless their the bot owner 
     * (Any users who isn't the bot owner runs bot owner cmds, won't see permission deny message, they will set to believe the commands doesn't exist)
     */
    if (settings.systemNotice === "true" && cmd.conf.permLevel < 10) {
      const embed = new Discord.RichEmbed()
      .setColor(0x00AE86)
      .setTimestamp()
      .setTitle(`Permission Denied!`)
      .setDescription(`You do not have permission to use this command.
    Your permission level is ${level} (${client.config.permLevels.find(l => l.level === level).name}. \nThis command requires level ${client.levelCache[cmd.conf.permLevel]} (${cmd.conf.permLevel})`);
      try{
        return message.channel.send({embed});
      }catch(e){
        console.log(e);
        return message.channel.send(`You do not have permission to use this command.
        Your permission level is ${level} (${client.config.permLevels.find(l => l.level === level).name})
        This command requires level ${client.levelCache[cmd.conf.permLevel]} (${cmd.conf.permLevel})`);
      }

    } else {
      return;
    }
  }

  // To simplify message arguments, the author's level is now put on level (not member so it is supported in DMs)
  // The "level" command module argument will be deprecated in the future.
  message.author.permLevel = level;

  message.flags = [];
  while (args[0] && args[0][0] === "-") {
    message.flags.push(args.shift().slice(1));
  }
  // If the command exists, **AND** the user has permission, run it.
  client.log("log", `${client.config.permLevels.find(l => l.level === level).name} ${message.author.username} (${message.author.id}) ran command ${cmd.help.name}`, "CMD");
  cmd.run(client, message, args, level);
};
