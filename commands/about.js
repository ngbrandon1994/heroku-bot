//Returns an about embed, that describe the bot and the bot owner + server.
const { version } = require("discord.js");
const pack = require("../package.json");
const Discord = require('discord.js');
exports.run = (client, message, args) => {
  const embed = new Discord.MessageEmbed()
    .setColor(0x800000)
    .setThumbnail(`${client.user.avatarURL}`)
    .setTitle(`About Me`)
    .setDescription(`I am a bot created for my personal server!`)
    .setAuthor(`${pack.name} v${pack.version}`)
    .addField(`Developer:`,`${client.users.cache.get(client.config.ownerID)}`)
    .addField(`Library:`,`Discord.js v${version}\nNode ${process.version}`,true)
    .addField(`My Server:`,client.config.serverLink,true);

  try{
    message.channel.send({embed});
  }catch(e){
    console.log(e);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['aboutme',"cwu"],
  permLevel: "User"
};

exports.help = {
  name: 'about',
  category: "System",
  description: 'Returns the information about this bot, not the bot statistics',
  usage: 'about'
};
