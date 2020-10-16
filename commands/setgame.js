//Set the current activity the bot is 'playing'
exports.run = async (client, message, args, level) => {
  if(message.channel.type != "dm") return;
  var action = message.content.split(' ').slice(1).join(' ');
  client.user.setActivity(action);

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['sg', 'setactivity'],
  permLevel: "Bot Admin"
};

exports.help = {
  name: "setgame",
  category: "System",
  description: "Set Activity that the bot is playing.",
  usage: "setgame"
};
