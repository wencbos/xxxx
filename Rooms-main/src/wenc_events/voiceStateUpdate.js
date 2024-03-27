const client = global.client;
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, Modal, TextInputBuilder, OAuth2Scopes, Partials, resolveColor, Client, Collection, GatewayIntentBits,SelectMenuBuilder,ActivityType,ChannelType,PermissionFlagsBits } = require("discord.js");
const wenc_config = require("../../wenc_config.json")
module.exports = async (oldFive,newFive) => {
let data = client.db.get(`özeloda_${newFive.member.id}`)
if(newFive.channelId == wenc_config.odaOlusturID){
    if(!data){
    let odaisim = newFive.member.displayName.length > 10 ? newFive.member.displayName.substring(0, 10).trim() + ".." : newFive.member.displayName;
    newFive.guild.channels.create({
        name: `#${odaisim}`,
        type: ChannelType.GuildVoice,
        parent: wenc_config.kategoriID,
        userLimit: 1,
        permissionOverwrites: [{id: newFive.member.id,
        allow: [PermissionFlagsBits.Connect,PermissionFlagsBits.ViewChannel, PermissionFlagsBits.MuteMembers, PermissionFlagsBits.DeafenMembers,PermissionFlagsBits.Stream,PermissionFlagsBits.Speak]
        }, 
        {
        id: newFive.guild.id,
        deny: [PermissionFlagsBits.Connect,PermissionFlagsBits.ViewChannel, PermissionFlagsBits.MuteMembers, PermissionFlagsBits.DeafenMembers,PermissionFlagsBits.Stream,PermissionFlagsBits.Speak]
        }]
    }).then(async(wenc) => { 
    await newFive.member.voice.setChannel(wenc.id)
    await client.db.set(`özeloda_${newFive.member.id}`,wenc.id)
    await client.db.set(`${wenc.id}`,`${newFive.member.id}`)
    await client.db.push(`members_${wenc.id}`,newFive.member.id)
    })
    }else{
    let channel = newFive.guild.channels.cache.get(data);
    if(!channel)return;
    newFive.member.voice.setChannel(channel.id);
    }
}

}
module.exports.conf = {
name: "voiceStateUpdate"
}
