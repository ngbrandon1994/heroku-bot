/**
 * Reloads commands when its updated, without restarting the bot by entering the name of the command to reload as the args.
 */

exports.run = async (client, message, args, level) => {
  if (!args || args.size < 1) return message.reply("Must provide a command to reload. Derp.");
  try {
    let response = await client.unloadCommand(args[0]);
    if (response) return message.reply(`Error Unloading: ${response}`);

    response = client.loadCommand(args[0]);
    if (response) return message.reply(`Error Loading: ${response}`);

    return message.reply(`The command \`${args[0]}\` has been reloaded`);
  } catch (e){

    try {
      const cmd = client.commands.get(args[0]) || client.commands.get(client.aliases.get(args[0]));
      if (!cmd) throw `Can't find Command File`;
      cmdName = cmd.help.name;
      let response = await client.unloadCommand(cmdName);
      if (response) return message.reply(`Error Unloading: ${response}`);
  
      response = client.loadCommand(cmdName);
      if (response) return message.reply(`Error Loading: ${response}`);
  
      return message.reply(`The command \`${args[0]}\` has been reloaded`);
    }catch (e){
      console.log(e);
      return message.reply(`The command \`${args[0]}\` does not exist! Try again by using its filename!`);
    }

  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Bot Admin"
};

exports.help = {
  name: "reload",
  category: "System",
  description: "Reloads a command that\"s been modified.",
  usage: "reload [command]"
};
