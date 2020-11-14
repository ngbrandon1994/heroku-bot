// This event executes when a member leaves a server.
const Discord = require('discord.js');
module.exports = async (client, member) => {
  // Load the guild's settings
  const settings = client.settings.get(member.guild.id);

  // If leave is off, don't proceed
  if (settings.leaveEnabled !== "true") return;

  const guild = member.guild;
 
  console.log(`Someone left ${guild.name} server!`);

  let memberlog = guild.channels.find(ch => ch.name === "welcome");
  if(!memberlog) return;

  /**
   * Check if main bot offline, if true then proceed with functions
   */
  var botOffline = await client.isBotOffline();
  if(!botOffline) return;

  const embed = new Discord.MessageEmbed()
    .setColor(0xff0300)
    .setAuthor(`${member.user.tag} (${member.user.id})`, `${member.user.displayAvatarURL()}`)
    .setTimestamp()
    .setFooter(`User Left`);
  try{
    memberlog.send(embed);
  }catch(e){
    memberlog.send({embed: {
        color: 12589339,
        author: {
          name: `${member.user.tag} (${member.user.id})`,
          icon_url: `${member.user.displayAvatarURL()}`
        },
        footer: {
          text: `User Left | ${client.timeNow()}`
        }
     }
   });
   console.log(e);
 }
};
