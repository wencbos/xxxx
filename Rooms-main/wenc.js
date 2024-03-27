const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, Modal, TextInputBuilder, OAuth2Scopes, Partials, resolveColor, Client, Collection, GatewayIntentBits,SelectMenuBuilder,ActivityType } = require("discord.js");
const client = global.client = new Client({fetchAllMembers: true,intents:[GatewayIntentBits.Guilds,GatewayIntentBits.GuildMembers,GatewayIntentBits.GuildBans,GatewayIntentBits.GuildEmojisAndStickers,GatewayIntentBits.GuildIntegrations,GatewayIntentBits.GuildWebhooks,GatewayIntentBits.GuildInvites,GatewayIntentBits.GuildVoiceStates,GatewayIntentBits.GuildPresences,GatewayIntentBits.GuildMessages,GatewayIntentBits.GuildMessageReactions,GatewayIntentBits.GuildMessageTyping,GatewayIntentBits.MessageContent],scopes:[OAuth2Scopes.Bot, OAuth2Scopes.ApplicationsCommands],partials: [Partials.Message, Partials.Channel, Partials.Reaction, Partials.User,Partials.GuildMember, Partials.ThreadMember, Partials.GuildScheduledEvent],ws: {version: "10"}});
const wenc_config = require("./wenc_config.json")
const { readdir } = require("fs");
const { REST } = require('@discordjs/rest');
const { Routes } = require("discord-api-types/v10");
const commands = client.commands = new Collection();
const aliases = client.aliases = new Collection();
const {JsonDatabase} = require("wio.db");
const db = client.db = new JsonDatabase({databasePath:"./wenc_database.json"});
readdir("./src/wenc_commands/", (err, files) => {if (err) console.error(err)
files.forEach(f => {readdir("./src/wenc_commands/" + f, (err2, files2) => {
if (err2) console.log(err2)
files2.forEach(file => {let wenc_prop = require(`./src/wenc_commands/${f}/` + file);
console.log(`🧮 [Wency - COMMANDS] ${wenc_prop.name} Yüklendi!`);
commands.set(wenc_prop.name, wenc_prop);
wenc_prop.aliases.forEach(alias => {aliases.set(alias, wenc_prop.name);});});});});});
readdir("./src/wenc_events", (err, files) => {
if (err) return console.error(err);
files.filter((file) => file.endsWith(".js")).forEach((file) => {let wenc_prop = require(`./src/wenc_events/${file}`);
if (!wenc_prop.conf) return;
client.on(wenc_prop.conf.name, wenc_prop);
console.log(`📚 [Wency _ EVENTS] ${wenc_prop.conf.name} Yüklendi!`);});});
const commands2 = client.commands2 = (global.commands2 = []);
client.on("ready", async () => {
    const rest = new REST({ version: "9" }).setToken(wenc_config.token);
  try {
    await rest.put(Routes.applicationCommands(client.user.id), {body: client.commands2,});
  } catch (error) {
    console.error(error);
  }
});
client.on('interactionCreate', (button) => {
  if (button.isUserContextMenuCommand()){

      }});
Collection.prototype.array = function() {return [...this.values()]}
client.login(wenc_config.token).then(() => console.log(`🟢 ${client.user.tag} Başarıyla Giriş Yaptı!`)).catch((wenc_err) => console.log(`🔴 Bot Giriş Yapamadı / Sebep: ${wenc_err}`));

