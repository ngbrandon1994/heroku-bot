//Returns the invite link to the discord.
const Discord = require('discord.js');
exports.run = async (client, message, args, level) => {
  let cw = client.cw;
  if(cw != "NOW"){
    cw=cw+` days`;
  }

  var embed = new Discord.MessageEmbed()
    .setTimestamp()
    .setAuthor(`${message.author.username}#${message.author.discriminator}`, `${message.author.displayAvatarURL}`)
    .addField(`Castle Wars Spotlight in ${cw}`,`${client.nextCWSLDate}`)
    .addField(`Following Castle Wars Spotlight in ${client.followingCW} days`,`${client.followingCWSLDate}`);

  try{
    let mention = message.mentions.channels.first() ? message.mentions.channels.first() :  message.mentions.users.first();
    if(level >= 5 && mention){
      return mention.send({embed});
    }
    message.channel.send({embed});
  }catch(e){
    console.log(e);
    message.channel.send("Embed has failed...");
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["cw"],
  permLevel: "User"
};

exports.help = {
  name: "cwsl",
  category: "Miscellaneous",
  description: "State the date of next castle wars spotlight and the following.",
  usage: "cwsl"
};
