module.exports = async client => {
  // Why await here? Because the ready event isn't actually ready, sometimes
  // guild information will come in *after* ready. 1s is plenty, generally,
  // for all of them to be loaded.
  await client.wait(5000);
  // Both `wait` and `client.log` are in `./modules/functions`.
  client.log("log", `${client.user.tag}, ready to serve ${client.users.cache.size} users in ${client.guilds.cache.size} servers.`, "Ready!");
  // We check for any guilds added while the bot was offline, if any were, they get a default configuration.
};
