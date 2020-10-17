const config = {
  "ownerID": process.env.ownerID,
  "admins": process.env.ownerID,
  "support": process.env.ownerID,
  "serverLink": process.env.serverLink,
  "botID": process.env.botID,
  "prefix": "~",

  "defaultSettings" : {
    "modLogChannel": "mod-log",
    "modRole": "Mod",
    "adminRole": "Admin",
    "systemNotice": "true", // This gives a notice when a user tries to run a command that they do not have permission to use.
    "welcomeChannel": "welcome",
    "welcomeMessage": "Welcome, {{user}}!\nI am the Doctor!\nEnjoy your stay in the server!",
    "welcomeEnabled": "true",
    "leaveChannel": "welcome",
    "leaveMessage": "GoodBye {{user}}! \nThank you for showing me your planet \n- Love, the Doctor!",
    "leaveEnabled": "true"
  },

  // PERMISSION LEVEL DEFINITIONS.
  // 1-4 are skipped to leave room for further permission levels to add by bot owner/script editors
  permLevels: [
    // This is the lowest permisison level, this is for non-roled users.
    { level: 0,
      name: "User",
      check: () => true
    },
    // This is your permission level, the staff levels should always be above the rest of the roles.
    { level: 5,
      name: "Moderator",
      // The following lines check the guild the message came from for the roles.
      // Then it checks if the member that authored the message has the role.
      // If they do return true, which will allow them to execute the command in question.
      // If they don't then return false, which will prevent them from executing the command.
      check: (message) => {
        try {
          const moderatorRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.modRole.toLowerCase());
          if (moderatorRole && message.member.roles.has(moderatorRole.id)) return true;
        } catch (e) {
          return false;
        }
      }
    },
    { level: 6,
      name: "Administrator",
      // The check is by reading if an ID is part of this array. Yes, this means you need to
      // change this and reboot the bot to add a support user. Make it better yourself!
      check: (message) => {
        try {
          const adminRole = message.guild.roles.find(r =>  r.name.toLowerCase() === message.settings.adminRole.toLowerCase());
          return (adminRole && message.member.roles.has(adminRole.id));
        } catch (e) {
          return false;
        }
      }
    },

    // This is the server owner.
    { level: 7,
      name: "Server Owner",
      // Simple check, if the guild owner id matches the message author's ID, then it will return true.
      // Otherwise it will return false.
      check: (message) => message.channel.type === "text" ? (message.guild.owner.user.id === message.author.id ? true : false) : false
    },
    // Bot Support is a special inbetween level that has the equivalent of server owner access
    // to any server they joins, in order to help troubleshoot the bot on behalf of owners.
    { level: 8,
      name: "Bot Support",
      // The check is by reading if an ID is part of this array. Yes, this means you need to
      // change this and reboot the bot to add a support user. Make it better yourself!
      check: (message) => config.support.includes(message.author.id)
    },
    // Bot Admin has some limited access like rebooting the bot or reloading commands.
    { level: 9,
      name: "Bot Admin",
      check: (message) => config.admins.includes(message.author.id)
    },
    // This is the bot owner, this should be the highest permission level available.
    // The reason this should be the highest level is because of dangerous commands such as eval
    // or exec (if the owner has that).
    { level: 10,
      name: "Bot Owner",
      // Another simple check, compares the message author id to the one stored in the config file.
      check: (message) => message.client.config.ownerID === message.author.id
    }
  ]
};

module.exports = config;
