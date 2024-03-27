const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, Modal, TextInputBuilder, OAuth2Scopes, Partials, resolveColor, Client, Collection, GatewayIntentBits,StringSelectMenuBuilder,ActivityType } = require("discord.js");
const moment = require("moment")
require('moment-duration-format');
const wenc_config = require("../../../wenc_config.json")
module.exports = {
name: "oda-panel",
aliases: ["panel"],
execute: async (client, message, args, wenc_embed) => {     

    const wencbutton = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId('oda-oluştur')
            .setLabel(`Özel Oda Oluştur`)
            .setStyle('Success'),
            new ButtonBuilder()
            .setCustomId('oda-isim')
            .setLabel(`Oda Adı Değiştir`)
            .setStyle('Success'),
            )
            const wencbutton2 = new ActionRowBuilder()
    .addComponents(
            new ButtonBuilder()
            .setCustomId('sil')
            .setLabel(`Sil`)
            .setStyle('Danger')
  )

            const wencbutton3 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('oda-bilgi')
                    .setLabel(`Oda Bilgisi`)
                    .setStyle('Primary'))

message.channel.send({content:`**Merhaba!** Özel Oda Oluşturma Sistemine Hoş Geldiniz! 

Bu kısımdan kendin belirleyeceğin isimde ve senin yöneteceğin bir kanal oluşturabilirsin.
Ayrıca bu kanala istediklerin girebilir, istemediklerini odaya almayabilirsin. 

Belki odanı gizli yaparak devlet sırlarını konuşabilir,
Ya da herkese açık yaparak halka seslenebilirsin.

Aşağıda bulunan "Özel Oda Oluştur" düğmesine basarak oluşturabilirsiniz, iyi sohbetler dilerim.`,components:[wencbutton,wencbutton2]})
message.channel.send({components:[wencbutton3]})
message.delete();



}}