// This event executes when a new member joins a server. Let's welcome them!

module.exports = async (client, member) => {
  // Load the guild's settings
  const settings = client.settings.get(member.guild.id);

  // If welcome is off, don't proceed (don't welcome the user)
  if (settings.welcomeEnabled !== "true") return;

  const guild = member.guild;

  console.log(`Someone joined ${guild.name} server!`);

  let memberlog = guild.channels.find(ch => ch.name === "welcome");
  if(!memberlog) return;
  
  /**
   * Check if main bot offline, if true then proceed with functions
   */
  var botOffline = await client.isBotOffline();
  if(!botOffline) return;

  try{
    setTimeout(function(){
      const embed = new Discord.MessageEmbed()
        .setColor(0x34f937)
        .setAuthor(`${member.user.tag} (${member.user.id})`, `${member.user.displayAvatarURL}`)
        .setTimestamp()
        .addField("Account created At", `${client.users.find(x => x.id === member.user.id).createdAt.toString()}`)
        .setFooter(`User Joined`);
      memberlog.send({embed});
    },500);
  }catch(e){
    console.log(e);
    client.sendOwnerMsg(`Member Join Log message failed to send.`);
    setTimeout(function(){memberlog.send(`${member.user.tag} (${member.user.id})\n\n Account created At: ${client.users.find(x => x.id === member.user.id).createdAt.toString()} \n\n User Joined | ${client.timeNow()}`);},500);
  }

  // Replace the placeholders in the welcome message with actual data
  const welcomeMessage = settings.welcomeMessage.replace("{{user}}", member.user.tag);

  // Send the welcome message to the welcome channel
  // There's a place for more configs here.
  member.guild.channels.find("name", settings.welcomeChannel).send(welcomeMessage).catch(console.error);
};
