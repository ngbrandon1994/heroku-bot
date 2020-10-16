//Returns the invite link to the discord.
const Discord = require('discord.js');
exports.run = async (client, message, args, level) => {

  const embed = new Discord.MessageEmbed()
    .setTimestamp()
    .setTitle(`You tossed a coin!`);
  const flipResult = Math.floor(Math.random() * 2) == 0 ? "**HEADS**" : "**TAILS**";
  embed.setDescription(`Landed on: `+flipResult);
  return message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["coin","coinflip","heads", "tails", "toss"],
  permLevel: "User"
};

exports.help = {
  name: "flip",
  category: "Miscellaneous",
  description: "Flip a coin, heads or tails?",
  usage: "~flip"
};
