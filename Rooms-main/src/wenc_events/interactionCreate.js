const client = global.client;
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, Modal, TextInputBuilder, OAuth2Scopes, Partials, resolveColor, Client, Collection, GatewayIntentBits,SelectMenuBuilder,ActivityType,TextInputStyle,ModalBuilder,PermissionFlagsBits,ChannelType,permissionOverwrites} = require("discord.js");
const wenc_config = require("../../wenc_config.json")
module.exports = async button => {
 let value = button.customId;
 if(button.isButton()){

if(value == "oda-oluştur"){
    let data = client.db.get(`özeloda_${button.member.id}`)
    if(data)return button.reply({content:`> **Zaten Bir Özel Odan Var!**`,ephemeral:true})

    const wencModal = new ModalBuilder()
    .setCustomId('oda-create')
    .setTitle("Özel Oda Oluştur")

     let odaisim = new TextInputBuilder()
    .setCustomId('oda-adı')
    .setPlaceholder(`örn; Wency Is Perfect`)
    .setLabel("Oda Adı Belirtin")
    .setStyle(TextInputStyle.Short)
    .setMinLength(2)
    .setMaxLength(10)
    .setRequired(true)
     
    const name = new ActionRowBuilder().addComponents(odaisim);
	const limit = new ActionRowBuilder().addComponents(odalimit);
    wencModal.addComponents(name,limit);

await button.showModal(wencModal);


    await button.showModal(wencModal);
    
    }else if(value == "oda-bilgi"){
        let data = client.db.get(`özeloda_${button.member.id}`)
        if(!data)return button.reply({content:`> **Bir Özel Odan Bulunmamakta!**`,ephemeral:true})
        
        let channel = button.guild.channels.cache.get(data)
        let users = client.db.get(`members_${data}`)
           
button.reply({content:
`\`\`\`fix
Oda Sahibi; ${button.member.user.tag}
Oda Adı; ${channel.name}
Oda Limiti; ${channel.userLimit == 0 ? "Sınırsız" : channel.userLimit} Kişilik
Odaya Giriş İzni Olan Kullanıcılar; ${users ? users.map((wenc,n) => `${n+1}).${button.guild.members.cache.get(wenc).user.tag}`).join(", ") : "Bulunamadı"}
\`\`\``,ephemeral:true})
        }else if(value == "oda-isim"){
        let data = client.db.get(`özeloda_${button.member.id}`)
        if(!data)return button.reply({content:`> **Bir Özel Odan Bulunmamakta!**`,ephemeral:true})
        
        const wencModal = new ModalBuilder()
        .setCustomId('oda-name')
        .setTitle("Özel Oda Sistemi")
    
         let odaisim = new TextInputBuilder()
        .setCustomId('oda-adı')
        .setPlaceholder(`örn; Wency Is Perfect`)
        .setLabel("Oda Adı Belirtin")
        .setStyle(TextInputStyle.Short)
        .setMinLength(2)
        .setMaxLength(10)
        .setRequired(true)

        const name = new ActionRowBuilder().addComponents(odaisim);
        wencModal.addComponents(name);
        await button.showModal(wencModal);

    }else if(value == "oda-sil"){
        let data = client.db.get(`özeloda_${button.member.id}`)
        if(!data)return button.reply({content:`> **Bir Özel Odan Bulunmamakta!**`,ephemeral:true})
        let channel = button.guild.channels.cache.get(data);
        channel.delete({reason:`Oda Silindi`})
        client.db.delete(`members_${data}`)
        client.db.delete(`${data}`)
        client.db.delete(`özeloda_${button.member.id}`)
       button.reply({content:`> **Odan Başarıyla Silindi!**`,ephemeral:true})
    }else if(value == "sesten-at"){
            let data = client.db.get(`özeloda_${button.member.id}`)
            if(!data)return button.reply({content:`> **Bir Odan Bulunmamakta!**`,ephemeral:true})
    
             let kisi = new TextInputBuilder()
            .setCustomId('limit')
            .setPlaceholder(`örn; 31`)
            .setLabel("Bir Oda Limit Sayisi Giriniz")
            .setStyle(TextInputStyle.Short)
            .setMinLength(1)
            .setMaxLength(2)
            .setRequired(true)
             
            const kisirow = new ActionRowBuilder().addComponents(kisi);
            wencModal.addComponents(kisirow);
            await button.showModal(wencModal);
        }

}



if(button.isModalSubmit()){

if(value == "oda-create"){
var name = button.fields.getTextInputValue('oda-adı');
var limit = button.fields.getTextInputValue('oda-limit');

if(isNaN(limit)) limit = 1;
if(limit < 0) limit = 0;
if(limit > 99) limit = 99;

button.guild.channels.create({
        name: `#${name}`,
        type: ChannelType.GuildVoice,
        parent: wenc_config.kategoriID,
        userLimit: limit,
        permissionOverwrites: [{id: button.member.id,
        allow: [PermissionFlagsBits.Connect,PermissionFlagsBits.ViewChannel, PermissionFlagsBits.MuteMembers, PermissionFlagsBits.DeafenMembers,PermissionFlagsBits.Stream,PermissionFlagsBits.Speak]
        }, 
        {
        id: button.guild.id,
        deny: [PermissionFlagsBits.Connect,PermissionFlagsBits.ViewChannel, PermissionFlagsBits.MuteMembers, PermissionFlagsBits.DeafenMembers,PermissionFlagsBits.Stream,PermissionFlagsBits.Speak]
        }]
    }).then(async (wenc) => {
        let invite = await wenc.createInvite({maxUses: 1});
        await button.reply({content:`> **Özel Odan Başarıyla Açıldı!**\n> **Oda Adı; \`${name}\`**\n> **Oda Limit; \`${limit == 0 ? "Sınırsız":limit}\`**\n> **Oda Link'i;** https://discord.gg/${invite.code}`,ephemeral:true})
        await client.db.set(`özeloda_${button.member.id}`,`${wenc.id}`)
        await client.db.set(`${wenc.id}`,`${button.member.id}`)
        await client.db.push(`members_${wenc.id}`,button.member.id)
        })
    let invite = channel.createInvite({maxUses: 1});
    member.user.send({content:`> **${button.user.username} Kullanıcısı Seni Özel Odasına Ekledi!**\n> **Odaya Katıl;** ${invite.code}`}).catch(e => { });
    client.db.push(`members_${data}`,member.id)
    button.reply({content:`> **${member} Kullanıcısı Kanala Başarıyla Eklendi!**`,ephemeral:true})

    client.db.pull(`members_${data}`,(element, index, array) => element == member.id, true)
    button.reply({content:`> **${member} Kullanıcısı Kanaldan Başarıyla Çıkartıldı!**`,ephemeral:true})
}else if(value == "oda-name"){
    var isim = button.fields.getTextInputValue('oda-adı');
    let data = await client.db.get(`özeloda_${button.member.id}`)
    button.guild.channels.edit(data,{name:`#${isim}`});
    button.reply({content:`> **Oda Adı Başarıyla \`${isim}\` Olarak Değiştirildi!**`,ephemeral:true})
    wenc.voice.disconnect()
    } err => { button.reply({content:`> **Böyle Bir Kullanıcı Bulunmamakta!**`,ephemeral:true})}
        button.reply({content:`> **Özel Odanın Bit Hızı Başarıyla \`${bit}\` Olarak Ayarlandı!**`,ephemeral:true})
        }else if(value == "oda-sayı"){
            let data = client.db.get(`özeloda_${button.member.id}`)
            var sayı = button.fields.getTextInputValue('limit');
            if(isNaN(sayı))sayı = 99;
            if(sayı > 99) sayı = 99;
            if(sayı < 0) sayı = 0;
            let channel = button.guild.channels.cache.get(data);
            channel.setUserLimit(sayı)
            button.reply({content:`> **Özel Odanın Kişi Sayısı Başarıyla \`${sayı == 0 ? "Sınırsız": sayı}\` Olarak Ayarlandı!**`,ephemeral:true})
            }



}

module.exports.conf = {
name: "interactionCreate"
}
