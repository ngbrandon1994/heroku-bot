/**
 * Generate a dice roll or two dice roll.
 * @dieResult is for one dice roll, as in the old french word for a singular dice is die; modern term die is fading away as a singular term for dice.
 */
const Discord = require('discord.js');
exports.run = async (client, message, args, level) => {

  const embed = new Discord.MessageEmbed()
    .setTimestamp();
  const dieResult = Math.floor(Math.random() * 6)+1;
  const diceResult = Math.floor(Math.random() * 6)+1;
  if(args === "two" || args === "dices"){
    embed.setTitle(`You rolled two dice!`);
    embed.setDescription(`Landed on: `+dieResult+" "+diceResult);
  }else {
    embed.setTitle(`You rolled a dice!`);
    embed.setDescription(`Landed on: `+dieResult);
  }
  return message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["die"],
  permLevel: "User"
};

exports.help = {
  name: "dice",
  category: "Miscellaneous",
  description: "Roll a die or two",
  usage: "~dice"
};
