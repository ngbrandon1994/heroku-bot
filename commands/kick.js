const Discord = require('discord.js');
exports.run = async (client, message, args, level) => {
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  let modlog = message.guild.channels.find(ch => ch.name === 'mod-log');
  if (!modlog) return message.reply('I cannot find a mod-log channel');
  if (reason.length < 1) return message.reply('You must supply a reason for the ban.');
  if (message.mentions.users.size < 1) return message.reply('You must mention someone to kick them.').catch(console.error);

  if (!message.guild.member(user).kickable) return message.reply('I cannot kick that member');
  message.guild.member(user).kick(reason);
  message.delete();

  const embed = new Discord.MessageEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .setAuthor(`${message.author.username}#${message.author.discriminator}`,`${message.author.displayAvatarURL()}`)
    .addField(`User:`,user.tag, true)
    .addField(`User ID:`, user.id, true)
    .addField(`Action:`,`Kick`,true)
    .addField(`Reason:`, reason, true);
    // .setDescription(`**Action:** Kick\n**Target:** ${user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`);
  modlog.send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["k"],
  permLevel: "Administrator"
};

exports.help = {
  name: "kick",
  category: "Admin",
  description: "kick someone from server /sarcasm",
  usage: "kick <@user> <reason>"
};
