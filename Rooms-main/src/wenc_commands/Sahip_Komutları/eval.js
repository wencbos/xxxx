const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, Modal, TextInputBuilder, OAuth2Scopes, Partials, resolveColor, Client, Collection, GatewayIntentBits,SelectMenuBuilder,ActivityType } = require("discord.js");
const moment = require("moment");
const ms = require("ms");
const wenc_config = require("../../../wenc_config.json")
module.exports = {name: "eval",aliases: [],execute: async (client, message, args, wenc_embed) => {
if(message.author.id != wenc_config.botOwner)return;
if (!args[0]) return message.reply({content:`> **Kod Nerede Canımın İçi!**`});
let code = args.join(" ");
if (code.includes(client.token)) return message.reply({content:"> **Bu Token Wency Tarafından Koruma Altında ;)**"});
try {var sonuç = eval_wenc(await eval(code));
if (sonuç.includes(client.token))
return message.reply({content:"> **Bu Token Wency Tarafından Koruma Altında ;)**"});} catch (err) {}},};function eval_wenc(wenc) {if (typeof text !== "string")wenc = require("util").inspect(wenc, { depth: 0 });wenc = wenc.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));return wenc;}