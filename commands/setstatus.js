//Sets the bot online status
exports.run = async (client, message, args, level) => {
	var action = message.content.split(' ').slice(1).join(' ');

	if(message.channel.type != "dm") return;
	client.user.setStatus(action);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['ss'],
  permLevel: 9
};

exports.help = {
  name: "setstatus",
  category: "System",
  description: "Set Status Online, Idle, Don't not Disturb, Invisible.",
  usage: "setstatus <on|idle|dnd|invisible|>"
};
