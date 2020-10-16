/*Spotlight commands, tell the current and next spotlight, as well as next cw spotlight. The following cw spotlight is mentioned when command is just cw or cwsl*/
const Discord = require('discord.js');
exports.run = async (client, message, args, level) => {
  console.log(`Time until next spotlight is `+client.timeToNextSL+` Days.`);
  console.log(`Current Spotlight is: ${client.currentSL}`);
  console.log(`Next Spotlight is: ${client.nextSL}`);
  let cw = client.cw;

  if(cw != "NOW"){
    cw=cw+` days`;
  }

  var embed = new Discord.MessageEmbed()
    .addField(`Current Spotight:`,client.currentSL)
    .addField(`Next Spotight in ${client.timeToNextSL} days is:`,client.nextSL);

  if(client.currentSL != "Castle Wars"){
    embed.addField(`Castle Wars SpotLight:`,cw);
  }

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
  aliases: ['Spotlight', 'sl'],
  permLevel: "User"
};

exports.help = {
  name: "spotlight",
  category: "Miscellaneous",
  description: "State what is the current and when the next Castle Wars-minigame spotlight is for RuneScape 3",
  usage: "spotlight"
};
