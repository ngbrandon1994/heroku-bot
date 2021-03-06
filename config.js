const config = {
  "ownerID": process.env.ownerID,
  "admins": process.env.ownerID,
  "support": process.env.ownerID,
  "prefix": "-",

  //defines the mod role and admin role names for permissions.
  "modRole": "Mod",
  "adminRole": "Admin",

  // PERMISSION LEVEL DEFINITIONS.
  permissions: [
    //Default 
    {
      level: 0,
      name: "User",
      check: () => true
    }, 
    { 
      level: 3,
      name: "Moderator",
      check: (message) => {
        try {
          const modRole = message.guild.roles.cache.find(r => 
            r.name.toLowerCase() === config.modRole.toLowerCase()
          );
          if (modRole && message.member._roles.has(modRole.id)) return true;
        } catch (e) {
          return false;
        }
      }
    },
    { 
      level: 4,
      name: "Administrator",
      check: (message) => {
        try {
          const adminRole = message.guild.roles.cache.find(r => 
            r.name.toLowerCase() === config.adminRole.toLowerCase()
          );
          return (adminRole && message.member._roles.has(adminRole.id));
        } catch (e) {
          return false;
        }
      }
    },
    { 
      level: 5,
      name: "Server Owner",
      check: (message) => {
        message.channel.type === "text" ? (message.guild.owner.user.id === message.author.id ? true : false) : false
      }
    },
    // Level 5 6 7, are defined whatever feel fits
    { 
      level: 8,
      name: "Bot Support",
      // The check is by reading if an ID is part of this array. Yes, this means you need to
      // change this and reboot the bot to add a support user. Make it better yourself!
      check: (message) => {
        if(!config.support){
          if(config.ownerID === message.author.id){
            return true;
          } else {
            return false;
          }
        }
        
        return config.support.includes(message.author.id);
      }
    },

    // Bot Admin has some limited access like rebooting the bot or reloading commands.
    { 
      level: 9,
      name: "Bot Admin",
      check: (message) => {
        if(!config.admins){
          if(config.ownerID === message.author.id){
            return true;
          } else {
            return false;
          }
        }
        
        return config.admins.includes(message.author.id);
      }
    },
    //Highest Permissions because of dangerous commands such as eval is only ran by the owner
    { 
      level: 10,
      name: "Bot Owner",
      // Another simple check, compares the message author id to the one stored in the config file.
      check: (message) => config.ownerID === message.author.id
    }

  ],
};

module.exports = config;
