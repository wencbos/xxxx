const client = global.client;
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, Modal, TextInputBuilder, OAuth2Scopes, Partials, resolveColor, Client, Collection, GatewayIntentBits,SelectMenuBuilder,ActivityType } = require("discord.js");
const wenc_config = require("../../wenc_config.json");
const ms = require('ms');
module.exports = async (oldMessage,newMessage) => {
if (wenc_config.prefix && !newMessage.content.startsWith(wenc_config.prefix)) return;
const args = newMessage.content.slice(1).trim().split(/ +/g);
const commands = args.shift().toLowerCase();
const cmd = client.commands.get(commands) || [...client.commands.values()].find((e) => e.aliases && e.aliases.includes(commands));
const wenc_embed = new EmbedBuilder().setColor(`#2f3136`).setAuthor({name: newMessage.member.displayName, iconURL: newMessage.author.avatarURL({ dynamic: true, size: 2048 })}).setFooter({text: wenc_config.clientPresence ? wenc_config.clientPresence : `Wenc Was Here` , iconURL: message.author.avatarURL({ dynamic: true, size: 2048 })})
if (cmd) {
cmd.execute(client, newMessage, args, wenc_embed)} }
module.exports.conf = {name: "messageUpdate"}
