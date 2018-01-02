const Discord = require("discord.js");
const client = new Discord.Client();
const dateFormat = require('dateformat');
const moment = require("moment");
const weather = require('weather-js');
const request = require('request');
const striptags = require('striptags');
const http = require('http');
const express = require('express');
const app = express();
const sql = require('sqlite');
sql.open("./score.sqlite");
require("moment-duration-format");

// Ayarları config.json'dan alması için burası gerekli.
const config = require("./config.json");

app.get("/", (request, response) => {
  console.log(Date.now() + "Ping alındı. Bu botun hayatta kalmasını sağlar!");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

client.on("ready", () => {
  // Bot düzgünce başladığında bu eylem çalışır
  console.log(`[BOT]: ${client.users.size} kullanıcıya ve ${client.guilds.size} sunucuya yardıma hazırım! Silahlandım!`); 
  // Botunuzun oyununu değiştirir, örn: !yardım | 21 sunucuda oynuyor şeklinde.
  // Bunu yayında olarak da yapabilirsin. örn: !yardım yayında şeklinde
  // client.user.setGame(`@Parham yardım | parham.cf`);
});

const prefix = "p!";
client.on("message", message => {
  if (message.author.bot) return;
  if (message.channel.type !== "text") return;

  sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
    if (!row) {
      sql.run("INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)", [message.author.id, 1, 0]);
    } else {
      let curLevel = Math.floor(0.1 * Math.sqrt(row.points + 1));
      if (curLevel > row.level) {
        row.level = curLevel;
        sql.run(`UPDATE scores SET points = ${row.points + 1}, level = ${row.level} WHERE userId = ${message.author.id}`);
        message.reply(`**${curLevel}** seviye oldun canımın içi! Devam et!`);
      }
      sql.run(`UPDATE scores SET points = ${row.points + 1} WHERE userId = ${message.author.id}`);
    }
  }).catch(() => {
    console.error;
    sql.run("CREATE TABLE IF NOT EXISTS scores (userId TEXT, points INTEGER, level INTEGER)").then(() => {
      sql.run("INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)", [message.author.id, 1, 0]);
    });
  });

  if (!message.content.startsWith(prefix)) return;

  if (message.content.startsWith(prefix + "level")) {
    sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
      if (!row) return message.reply("Şuanki seviyeniz 0");
      message.reply(`Şuanki seviyeniz ${row.level}`);
    });
  } else

  if (message.content.startsWith(prefix + "points")) {
    sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
      if (!row) return message.reply("Yazıık hiç puanın yok!");
      message.reply(`Toplamda ${row.points} puanın var, İyi gidiyorsun!`);
    });
  }
});

client.on("guildCreate", guild => {
  // Bu eylem bot yeni bir sunucuya katıldığında botunuzu tetikler.
  console.log(`Yeni sunucuya katıldım: ${guild.name}\n. Bu sunucu ${guild.memberCount} üye!`);

//client.user.setGame(`parham.cf | p!yardım | ${client.guilds.size} sunucu`);
});

client.on("guildDelete", guild => {
  // Bu eylem bot bir sunucudan ayrıldığında botunuzu tetikler.
  console.log(`Hey beni çıkardılar ;(: ${guild.name}`);
  //client.user.setGame(`parham.cf | p!yardım | ${client.guilds.size} sunucu`);
});

// Yeni üye mesajları
client.on('guildMemberAdd', member => {
const channel = member.guild.channels.find('name', 'sehirmeydani');
if (!channel) return;
  let embed = new Discord.RichEmbed()
  .setColor(Math.floor(Math.random() * (0xFFFFFF + 1)))
  .setDescription(`${member}, sunucuya katıldı! Merhaba dostum!`)
  .setImage("https://media.giphy.com/media/OkJat1YNdoD3W/giphy.gif")
channel.send(embed);
});


// Yeni üye mesajları
client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find('name', 'hosgeldin');
  if (!channel) return;
  let embed = new Discord.RichEmbed()
  .setColor(Math.floor(Math.random() * (0xFFFFFF + 1)))
  .setDescription(`${member}, sunucuya katıldı! Merhaba dostum!`)
  .setImage("https://media.giphy.com/media/OkJat1YNdoD3W/giphy.gif")
  channel.send(embed);
});

// Yeni üye mesajları
client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find('name', 'sohbet');
  if (!channel) return;
  let embed = new Discord.RichEmbed()
  .setColor(Math.floor(Math.random() * (0xFFFFFF + 1)))
  .setDescription(`${member}, sunucuya katıldı! Merhaba dostum!`)
  .setImage("https://media.giphy.com/media/OkJat1YNdoD3W/giphy.gif")
  channel.send(embed);
});

// Yeni üye mesajları
client.on('guildMemberRemove', member => {
  const channel = member.guild.channels.find('name', 'hosgeldin');
  if (!channel) return;
  let embed = new Discord.RichEmbed()
  .setColor(Math.floor(Math.random() * (0xFFFFFF + 1)))
  .setDescription(`Hoşçakal :wave:, ${member}. Seni özleyeceğiz :cry:`)
  .setImage("https://media1.tenor.com/images/860550d763f170f72b6a0f4f5bd95592/tenor.gif?itemid=5340846")
  channel.send(embed);
});

// Yeni üye mesajları
client.on('guildMemberRemove', member => {
  const channel = member.guild.channels.find('name', 'sehirmeydani');
  if (!channel) return;
  let embed = new Discord.RichEmbed()
  .setColor(Math.floor(Math.random() * (0xFFFFFF + 1)))
  .setDescription(`Hoşçakal :wave:, ${member}. Seni özleyeceğiz :cry:`)
  .setImage("https://media1.tenor.com/images/860550d763f170f72b6a0f4f5bd95592/tenor.gif?itemid=5340846")
  channel.send(embed);
});

// Yeni üye mesajları
client.on('guildMemberRemove', member => {
  const channel = member.guild.channels.find('name', 'sohbet');
  if (!channel) return;
  let embed = new Discord.RichEmbed()
  .setColor(Math.floor(Math.random() * (0xFFFFFF + 1)))
  .setDescription(`Hoşçakal :wave:, ${member}. Seni özleyeceğiz :cry:`)
  .setImage("https://media1.tenor.com/images/860550d763f170f72b6a0f4f5bd95592/tenor.gif?itemid=5340846")
  channel.send(embed);
});

client.on("message", message => {
  if (message.author.bot) return;
if (message.channel.type !== "text") return;

  if (!message.content.startsWith(prefix)) return;

  if (message.content.startsWith(prefix + "seviyem")) {
    sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
      if (!row) return message.reply("Yazııık seviyesi yok ;(");
      message.reply(`Şuanki seviyeniz ${row.level}`);
    });
  } else

  if (message.content.startsWith(prefix + "puanlarım")) {
    sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
      if (!row) return message.reply("Yazıık hiç puanın yok!");
      message.reply(`Toplamda ${row.points} puanın var, İyi gidiyorsun!`);
    });
  }
});

client.on('message', message => {
  if (message.content.toLowerCase() === 'sa') {
    message.channel.send(`Aleyküm selam, hoşgeldin ^^`)
    message.react(`👋`);
  }
});

client.on('message', message => {
  if (message.content.toLowerCase() === 'sea') {
    message.channel.send(`Aleyküm selam, hoşgeldin ^^`)
    message.react(`👋`);
  }
});

client.on('message', message => {
  if (message.content.toLowerCase() === 'selamun aleyküm') {
    message.channel.send(`Aleyküm selam, hoşgeldin ^^`)
    message.react(`👋`);
  }
});

client.on('message', message => {
  if (message.content.toLowerCase() === 'selamın aleyküm') {
    message.channel.send(`Aleyküm selam, hoşgeldin ^^`)
    message.react(`👋`);
  }
});

client.on('message', message => {
  let member = message.author.username
  if (message.content.toLowerCase() === 'orospu') {
    message.channel.send(`**${member}** Hey! Öyle söyleme! :tired_face:`)
    message.delete().catch(O_o=>{}); 
  }
});

client.on('message', message => {
  let member = message.author.username
  if (message.content.toLowerCase() === 'yarrak') {
    message.channel.send(`**${member}** Hey! Öyle söyleme! :tired_face:`)
    message.delete().catch(O_o=>{}); 
  }
});

client.on('message', message => {
  let member = message.author.username
  if (message.content.toLowerCase() === 'am') {
    message.channel.send(`**${member}** Hey! Öyle söyleme! :tired_face:`)
    message.delete().catch(O_o=>{}); 
  }
});


client.on('message', message => {
  let member = message.author.username
  if (message.content.toLowerCase() === 'sik') {
    message.channel.send(`**${member}** Hey! Öyle söyleme! :tired_face:`)
    message.delete().catch(O_o=>{}); 
  }
});

client.on('message', message => {
  let member = message.author.username
  if (message.content.toLowerCase() === 'sikerim') {
    message.channel.send(`**${member}** Hey! Öyle söyleme! :tired_face:`)
    message.delete().catch(O_o=>{}); 
  }
});

client.on('message', message => {
  let member = message.author.username
  if (message.content.toLowerCase() === 'siktir') {
    message.channel.send(`**${member}** Hey! Öyle söyleme! :tired_face:`)
    message.delete().catch(O_o=>{}); 
  }
});

client.on('message', message => {
  let member = message.author.username
  if (message.content.toLowerCase() === 'ananı') {
    message.channel.send(`**${member}** Hey! Öyle söyleme! :tired_face:`)
    message.delete().catch(O_o=>{}); 
  }
});


// Bot seption olmaması için bu gerekli yoksa botun ÇILDIRIRRR!
client.on("message", async message => {
  if(message.author.bot) return;
  if(message.content.indexOf(config.prefix) !== 0) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  // Haydi, birkaç komut deneyelim huh? 
  
  //Hey bu bot n'apıyor?
  if(command === "yardım") {
    let embed = new Discord.RichEmbed()
    .setTitle("Parham Beta (Deneyimsel) Komutları")
    .setAuthor("FrostyDonuts","http://panasonicleni.tk\n")
    .setURL("http://parham.cf")
    .setColor(Math.floor(Math.random() * (0xFFFFFF + 1)))
    .addField("**__Kullanıcı Komutları__**",
    "**p!yardım** - Şu anki gibi komutları gösterir! :white_check_mark:\n**p!ping** - Botun Pingi ve API'nin değerini gösterir:desktop:\n**p!avatar** - Avatarını veya başka birininkini gösterir:frame_photo:\n**p!nickdeğiş** - İsmini KLAS bir tarzla değiş! :pencil:\n**p!havanasıl** - Belirli bir lokasyondaki hava durumunu gösterir :cloud_lightning:\n**p!sunucularım** - Bulunduğum sunucuları gösterir :bar_chart:\n**p!afkol / p!afkçık** - AFK olursunuz veya çıkarsınız:zzz:\n**p!profilkartı** -  Özel profil kartınız! :bust_in_silhouette:\n**p!sunucu** - Sunucu bilgisini gösterir :chart_with_upwards_trend:")
    .addField("**__Eğlence Komutları__**", 
    "**p!yazıtura** - Yazı ve tura, açıklanacak bir şey yok.:arrows_clockwise:\n**p!söyle** - Bot yazdığınız şeyi tekrarlar :speech_left:\n**p!sigara** - Sigara yakar:smoking:\n**p!özlüsöz** - Özlü sözler atar:ledger:\n**p!taşkağıtmakas** - :full_moon::ledger::scissors:*(Betada olduğu için çalışmayabilir!)* \n**p!soru** - Evet veya hayırlı sorular sormanıza yarar. :thinking:")
    .addField("**__Moderasyon Komutları__**",
    "**p!kick** - Üyeleri sunucudan atmanıza yarar :hammer:\n**p!ban** - Üyeleri yasaklamanıza yarar :no_entry:\n**p!sil** - Bir miktar mesaj siler:wastebasket:\n**p!sustur** - Kullanıcıyı SUSTURUR!:zipper_mouth:\n**p!davet** - Davet linkini atar. :white_check_mark: \n**p!anket** - Sunucu yöneticileri için alternatif anket sistemi :clipboard: \n**p!duyuru** - Sunucu yöneticileri için alternatif duyuru sistemi :mega:")
    .addField('Ek Özellikler ve dahası',
    '**__Parham\'da çıkan tüm sorunlara hemen erişebilmek için;\nhttps://twitter.com/parhamstatus__**\n\n**__Küfür filtresi, her yaş grubuna veya değerlere uygun olmayan küfürleri engeller.__**')
    .setImage('https://i.hizliresim.com/EyGd4g.jpg')
    message.channel.send(embed)
  }

  // Botun pingi ve API gecikmesi
  if(command === "ping") {
    const m = await message.channel.send("Pingim mi?");
    m.edit(`Pong!\n**Gecikmem: ${m.createdTimestamp - message.createdTimestamp}ms.\nAPI Gecikmesi: ${Math.round(client.ping)}ms**`);
  }

  // Bota bir şey söyletmek için lazım...
  if(command === "söyle") {
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{}); 
    message.channel.send(sayMessage);
  }

  if(command === "anket") {
    if(!message.member.hasPermission("MANAGE_NICKNAMES"))
    return (message.channel.send("Üzgünüm cınım! `Mesajları Yönetme` yetkin yok :tired_face:"))
    const anketYap = args.join(" ");
    message.delete().catch(O_o=>{});
    let embed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setColor(Math.floor(Math.random() * (0xFFFFFF + 1)))
    .setDescription(anketYap) 
    .setTimestamp()
    message.channel.send(embed)
    .then(function (message) {
      message.react("✔")
      message.react("❌")
    }).catch(function() {
      //Something
     });
}

  if(command === "oyundeğiş") {
    if(message.author.id !== '257170205883629580') 
    return message.reply('Üzgünüm cınım! `client.user.setGame` yetkin yok :tired_face: ');
    const sayMessage = args.join(` `);
    client.user.setGame(sayMessage);
    message.channel.send(`Oyun ismi **${sayMessage}** olarak değiştirildi :ok_hand:`)
  }

  if(command === "isimdeğiş") {
    if(message.author.id !== '257170205883629580') 
    return message.reply('Üzgünüm cınım! `client.user.setUsername` yetkin yok :tired_face: ');
    const sayMessage = args.join(` `);
    client.user.setUsername(sayMessage);
    message.channel.send(`İsmim **${sayMessage}** olarak değiştirildi :ok_hand:`)
  }

  if(command === "resimdeğiş") {
    if(message.author.id !== '257170205883629580') 
    return message.reply('Üzgünüm cınım! `client.user.setUsername` yetkin yok :tired_face: ');
    const sayMessage = args.join(` `);
    client.user.setAvatar(sayMessage);
    message.channel.send(`Profil resmim **${sayMessage}** olarak değiştirildi :ok_hand:`)
  }

  if(command === "duyuru") {
    if(!message.member.hasPermission("MANAGE_NICKNAMES"))
    return (message.channel.send("Üzgünüm cınım! `Mesajları Yönetme` yetkin yok :tired_face:"))
    const duyuruYap = args.join(" ");
    message.delete().catch(O_o=>{});
    let embedyaz = new Discord.RichEmbed()
    .setColor(Math.floor(Math.random() * (0xFFFFFF + 1)))
    .setDescription(duyuruYap);
    message.channel.send(embedyaz)
  }

  //AFK
  if(command === "afkol") {
    if (!args[0]) return message.channel.send("AFK Nedeni yazmalısın.");
   let name = message.author.username
   if(message.author.username.startsWith("[AFK]")){
     message.reply("Zaten AFK'sın.")
   }
   else {
     message.reply("Artık AFK'sın.")
      message.member.setNickname(`[AFK]${message.author.username}`);
   }  
 }


   //AFKÇIK
   if(command === "afkçık") {
      message.member.setNickname(`${message.author.username}`);
      message.channel.send("Artık AFK Değilsin.")
   }  

   //Davet Linki
   if(command === "davet") {
      message.channel.send({embed: {
          color: Math.floor(Math.random() * (0xFFFFFF + 1)),
          author: {
            name: message.author.username,
            icon_url: message.author.avatarURL
          },
        fields: [
            {
              name: "Davet et",
              value: "**Yerli Botlar Discord Sunucusu** [https://discord.me/yerlibotlar] \n**Sunucuna eklemek için tıkla** [https://www.kisa.link/parham]"
            }
          ],
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: "© FrostyDonuts | Rebecca Parham 2017"
          }
        }
      })
   }


  //SUNUCULAR
  if(command === "sunucularım") {
    const servers = client.guilds.map(g => g.name).join("\n");
    message.channel.send(`**__Bulunduğum sunucular__** **\n\n${servers}**\n\nAyrıca toplam **${client.users.size}** kullanıcıya hizmet veriyorum! :wink: `);}

    // Kullanıcı Bilgi
    
    if(command === "profilkartı") {
    
      var user;
    let member = message.mentions.users.first();
        let author = message.author; 
        if(member) {
             user = member;
        } else {
             user = author;
        }
    member = message.guild.member(user);
    let roles = member.roles.array().slice(1).sort((a, b) => a.comparePositionTo(b)).reverse().map(role => role.name);
       if (roles.length < 1) roles = ['AHH! BU KULLANICININ ROLÜ YOK!'];
    const millisCreated = new Date().getTime() - user.createdAt.getTime();
    const daysCreated = moment.duration(millisCreated).format("Y [yıl], D [gün], H [saat], m [dakika], s [saniye]")
    const millisJoined = new Date().getTime() - member.joinedAt.getTime();
    const userJoined = moment.duration(millisJoined).format("Y [yıl], D [gün], H [saat], m [dakika], s [saniye]")
    if(user.presence.status === "dnd"){
      var durum = "Rahatsız Etmeyin"
    }
    else if(user.presence.status === "online"){
      var durum = "Çevrimiçi"
    }
    else if(user.presence.status === "idle"){
      var durum = "Boşta"
    }
      else {
      var durum = "Görünmez"
    }
     const embed5 = new Discord.RichEmbed() 
         .setColor(Math.floor(Math.random() * (0xFFFFFF + 1)))
         .setTimestamp() 
         .setThumbnail(`${user.displayAvatarURL}`)
         .addField("Kullanıcı", `${user}`, true)
         .addField("Şu anda oynadığı oyun", user.presence.game ? user.presence.game.name : 'Oynadığı bir oyun yok', true) 
         .addField("Durum", `${durum}` , true)
         .addField('Katılım tarihi (Sunucu)', `${userJoined}`, true)
         .addField('Katılım Tarihi (Discord)', `${daysCreated}`, true)
         .addField("Hesabın Kuruluş Tarihi", `${dateFormat(user.createdAt)}`)
         .addField('Bu sunucudaki rolleri', `${roles.join(', ')}`, true)  
         .setFooter(`FrostyDonuts`); 
         message.channel.send({embed: embed5})
    
    }

    if(command === "yapımcı") {
      const yapimci = new Discord.RichEmbed()
      .setAuthor("FrostyDonuts", "http://panasonicleni.tk")
      .setThumbnail("https://cdn.discordapp.com/avatars/257170205883629580/cbd80492928cfd766c921aece9190609.png?size=2048")
      .setColor(Math.floor(Math.random() * (0xFFFFFF + 1)))
      .setDescription("Kendisi bir Tasarımcı, Website SEO'su ayrıca Bot Geliştiricisi :flushed: \n**Yerli Botlar sunucusu [http://discord.me/yerlibotlar]**")
      return message.channel.send(yapimci)
    }

    //SUNUCUBİLGİ
    if(command === "sunucu") {
      const Discord = require('discord.js')
      const kullanicibilgimk = new Discord.RichEmbed()
      .setAuthor('Sunucu Bilgileri', message.guild.avatarURL)
      .setThumbnail(message.guild.iconURL)
      .setColor(Math.floor(Math.random() * (0xFFFFFF + 1)))
      .setTimestamp()
      .addField('Sunucu İsmi', message.guild.name, true )
      .addField('Sunucu ID', message.guild.id, true)
      .addField('Varsayılan Kanal',message.guild.defaultChannel, true)
      .addField('Sunucu Bölgesi',message.guild.region, true)
      .addField('Sunucu Kurucusu',message.guild.owner, true)
      .addField('Toplan Kullanıcı', message.guild.members.size, true)
      .addField('Toplam kanal', message.guild.channels.size, true)
      .addField('AFK kanalı',message.guild.AFKChannel,true)
      .addField('Doğrulama Seviyesi',message.guild.verificationLevel, true)
      .addField('Oluşturulma Tarihi', message.guild.createdAt, true)
      .addField('Sunucu İkonunun Bağlantısı',message.guild.iconURL)
      return message.channel.send(kullanicibilgimk);
}

  if(command === "soru") {
    var cevaplar = [
      'Evet',  'Hayır', 'Sanırım', 'Kesinlikle', 'Bilemedim...', 'Bulgularım hayır diyor.', 'Şimdilik evet görünüyor...', 'Cevabım hayır.', 'Pek de evetmiş gibi görünmüyor...', 'Tamamiyle evet.', 'Bunu bilmek istemezsin :flushed:', 'Tam bilemedimdi şimdi :thinking:', 'Nasıl anlatsam bilemedimdi :cold_sweat:', 'Odaklanıp tekrar sormaya ne dersin?', 'Bunun cevabını bildiğinden eminim :unamused:'
    ];
    // if(message.channel.id === "324213139866648576" || message.channel.id === "310486176920371211")return message.channel.send(":no_entry_sign:Yasaklı komut. Bu kanalda soru soramazsın.")
    var cevap = cevaplar[Math.floor(Math.random() * cevaplar.length)]
    message.channel.send(cevap.toString())
   }

  //Özlü sözler
  if(command === "özlüsöz") {
    let ozlusoz=[
      "",
      "Küçük şeylere gereğinden çok önem verenIer, elinden büyük iş gelmeyenlerdir.",
      "Beni güzeI hatırIa. Sana unutuImaz geceIer bıraktım, sana en yorgun sabahIar, güIüşümü, gözIerimi, sonra sesimi bıraktım",
      "Sende, ben, imkânsızIığı seviyorum, fakat asIa ümitsizIiği değiI…",
      "Sen benim hiçbir şeyimsin, yabancı bir şarkı gibi yarım, yağmurIu bir ağaç gibi ısIak, hiç kimse misin biImem ki nesin?",
      "AçaIım yüreğimizin kapıIarını sonuna kadar, seveIim seveIim seveIim, sevebiIeceğimiz kadar.",
      "Bütün sevgiIeri atıp içimden, varIığımı yaInız ona verdim ben, eIverir ki bir gün bana derinden, ta derinden bir gün bana “GeI” desin.",
      "Ona şefkatIe eğiIirken, pır diye uçtu birden, kırık sandığım kanatIarındaki sahteIik ve inancımIa birIikte.",
      "Bir kere sevdaya tutuImaya gör; ateşIere yandığının resmidir.",
      "Aşk dediğin nedir ki, tenden bedenden sıyrık, çocukIarın içinde, yaşadığı bir çığIık.",
      "Can paramparça ve eIIerim, keIepçede, tütünsüz, uykusuz kaIdım, terk etmedi sevdan beni…",
      "Yaşamak değiI, beni bu teIaş öIdürecek.",
      "Tanrı kuşIarı sevdi ve ağaçIarı yarattı.İnsan kuşIarı sevdi ve kafesIeri yarattı",
      "KuşIar gibi havada uçmayı öğrendik, baIık gibi denizde yüzmeyi ama haIa şu basit kardeş gibi yaşama sanatını öğrenemedik.",
      "Kimse senin gözyaşIarını hak etmiyor, hak eden seni ağIatmaz zaten",
      "Sırtından vurana kızma, ona güvenip arkanı dönen sensin. Arkandan konuşana da darıIma, onu insan yerine koyan yine sensin! ",
      "Her canlı şu üç şeyi tadacaktır; İhanet, hıyanet, cehalet.",
    ]
    message.channel.send(`${ozlusoz[Math.floor(Math.random() * 16)]}.`)
    }

  //Hava DURUMUUUUUUUUİİİİİ
  if(command === "havanasıl") {
  if (!args[0]) return message.channel.send("Şehir girmen gerekiyor :unamused:");
weather.find({search: args.join(" "), degreeType: 'C'}, function(err, result) { 
         if (err) message.channel.send("Dönüşü olmayan hata! Kim bilir ne oldu!?");
         if (!result) {
             message.channel.send("Düzgün bir şehir gir.")
             return; 
         }
         var current = result[0].current; 
         var location = result[0].location;   
         const embed = new Discord.RichEmbed()
             .setDescription(`**${current.skytext}**`) 
             .setTimestamp()
             .setAuthor(`${current.observationpoint} İçin Hava Durumu`)
             .setThumbnail(current.imageUrl)
             .setColor(0x00AE86) 
             .addField('Sıcaklık',`${current.temperature} Derece`, true)
             .addField('Hissedilen Sıcaklık',`${current.feelslike} Derece`, true)
             .addField('Rüzgar',current.winddisplay, true)
             .addField('Rüzgar Hızı',current.windspeed, true)
             .addField('Nem', `${current.humidity}%`, true)
             message.channel.send({embed});
     });
}

  // Yazı mı Tura mı? *_*
  if(command === "yazıtura") {
  var flip = Math.floor(Math.random() * 2 + 1);
  if (flip === 1) {
let embed = new Discord.RichEmbed()
.setColor(Math.floor(Math.random() * (0xFFFFFF + 1)))
.setImage('https://i.hizliresim.com/MaNL2a.jpg')
message.channel.send(embed);
}
  
  else {
let embed = new Discord.RichEmbed()
.setColor(Math.floor(Math.random() * (0xFFFFFF + 1)))
.setImage('https://i.hizliresim.com/LOk1GJ.jpg')
message.channel.send(embed);
} 
}

// Dvayne, Mario, Mega Man!
if(command === "taşkağıtmakas") {
  var flip = Math.floor(Math.random() * 4);
  if (flip === 1) {
let embed = new Discord.RichEmbed()
.setDescription("Taş!")
.setColor(Math.floor(Math.random() * (0xFFFFFF + 1)))
.setImage('https://i.hizliresim.com/jQ0qrm.jpg')
message.channel.send(embed);
}
    if(flip === 2) {
let embed = new Discord.RichEmbed()
.setDescription("Kağıt!")
.setColor(Math.floor(Math.random() * (0xFFFFFF + 1)))
.setImage('https://i.hizliresim.com/PO87N5.jpg')
message.channel.send(embed);
  }
  else {  
    if(flip === 3) {
    let embed = new Discord.RichEmbed()
    .setDescription("Makas!")
    .setColor(Math.floor(Math.random() * (0xFFFFFF + 1)))
    .setImage('https://i.hizliresim.com/7y9BdN.jpg')
    message.channel.send(embed);
    }
  }
}

  // İsim değiştir
  if(command === "nickdeğiş") {
  if(!message.member.hasPermission("MANAGE_NICKNAMES")) 
  return message.channel.send("Üzgünüm! Bunu kullanmak için yetkin yok!")
let member = message.mentions.members.first();
if(!member)
  return message.channel.send("Düzgünce etiketlemeyi denesen?")
let yeniisim = args.slice(1).join(" ");
if(!yeniisim)
  return message.channel.send("Yeni Kullanıcı Adını girmen gerekiyor.")
member.setNickname(yeniisim)
message.channel.send("Değiştirdim, ama olmadı mı? Rolümün yüksekte olduğundan emin ol ve yazdığın ismin 32 karakterden kısa olmasına dikkat et. :ok_hand:")
}

  // Bazen Müslüm Babaya bağlarsın...
  if(command === "sigara") {
  message.channel.send(':smoking:')
  .then(message => message.edit(':confused::smoking::cloud::cloud::cloud::cloud::cloud:'))
  .then(message => message.edit(':confused::smoking::cloud::cloud::cloud::cloud:'))
  .then(message => message.edit(':confused::smoking::cloud::cloud::cloud:'))
  .then(message => message.edit(':confused::smoking::cloud::cloud:'))
  .then(message => message.edit(':confused::smoking::cloud:'))
  .then(message => message.edit(':confused::smoking:'))
  .then(message => message.edit(':confused::cloud:'))
  .then(message => message.edit(':confused::cloud::cloud:'))
  .then(message => message.edit(':confused::cloud::cloud::cloud:'))
  .then(message => message.edit(':confused::cloud::cloud::cloud::cloud:'))
  .then(message => message.edit(':confused::cloud::cloud::cloud::cloud::cloud:'))
  .then(message => message.edit(':confused::cloud::cloud::cloud::cloud:'))
  .then(message => message.edit(':confused::cloud::cloud::cloud::cloud:'))
  .then(message => message.edit(':confused::cloud::cloud::cloud:'))
  .then(message => message.edit(':confused::cloud::cloud:'))
  .then(message => message.edit(':confused::cloud:'))
  .then(message => message.edit(':confused::smoking:'))
  .then(message => message.edit(':confused::smoking::cloud::cloud:'))
  .then(message => message.edit(':confused::smoking::cloud::cloud::cloud:'))
  .then(message => message.edit(':confused::smoking::cloud::cloud::cloud::cloud:'))
  .then(message => message.edit(':confused::smoking::cloud::cloud::cloud::cloud::cloud:'))
  .then(message => message.edit(':confused::smoking::cloud::cloud::cloud::cloud:'))
  .then(message => message.edit(':confused::smoking::cloud::cloud::cloud:'))
  .then(message => message.edit(':confused::smoking::cloud::cloud:'))
  .then(message => message.edit(':confused::smoking::cloud:'))
  .then(message => message.edit(':confused::smoking:'))
  .then(message => message.edit(':triumph:'))
  .then(message => message.edit('Sigara bitti. Fakat üzgünsen acın hala dinmedi. Biz de sana yakalım dostum.'))
}

  // ＭＵＴＥＬＥＮＤＩＮ　ば屋や
  if(command === "sustur") {
  if(!message.member.hasPermission("MANAGE_CHANNELS")) 
  return message.channel.send("Üzgünüm! Bunu kullanmak için yetkin yok!")
  
            let susturulacak = message.guild.member(message.mentions.users.first()) || message.guild.member(args[0]);
            if(!susturulacak) 
            return message.channel.send("Düzgünce etiketlemeyi denesen?")

            if(susturulacak.id === message.author.id) 
            return message.channel.send("Neden kendini susturasın ki? Kendine zarar vermeni istemiyorum")
            if(susturulacak.highestRole.position >= message.member.highestRole.position) 
            return message.channel.send("Hey bu kullanıcıyı susturamıyorum. Benden yüksek rolleri mi var >:(")
            let role = message.guild.roles.find(r => r.name === "Susturulmuş");
            if(!role) {
            try {
                role = await message.guild.createRole({
                      name: "Susturulmuş",
                      color: "#0b0a0a",
                      permission:[]
              });
  
              message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(role, {
                  SEND_MESSAGES: false,
                  ADD_REACTIONS: false
                });
              });
            } catch(e) {
                console.log(e.stack);
            }
  
          }
  
          if(susturulacak.roles.has(role.id)) return message.channel.send("")
  
          await susturulacak.addRole(role);
          message.channel.send("ＳＵＳＴＵＲＵＬＤＵＮ　ロ・デ!")
  }

  // MUTE AÇMA
  if(command === "susturaç") {
    if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("Üzgünüm, Yetkin yetersiz!")
    
                let susturulacak = message.guild.member(message.mentions.users.first()) || message.guild.member(args[0]);
                if(!susturulacak) return message.channel.send("Düzgünce etiketlenmeyen komutlar Rebecca'yı SİNİRLENDİRİİİİİRRRR")
    
                let role = message.guild.roles.find(r => r.name === "Susturulmuş");
    
              if(!role || !susturulacak.roles.has(role.id)) return message.channel.send("Zaten cezalı değil ki?");
    
              susturulacak.removeRole(role);
              message.channel.send("Kullanıcının ＳＵＳＴＵＲＭＡＳＩぷゼ嵐 kaldırıldı.")
    }

  // Bazı kullanıcılar rahatsız edicidir. Suratlarına tekmeyi bas!
  if(command === "kick") {
    if(!message.member.hasPermission("KICK_MEMBERS"))
      return message.reply("Üzgünüm! Bunu kullanmak için yetkin yok!");
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Kullanıcıyı düzgünce etiketlemeyi denesen?");
    if(!member.kickable) 
      return message.reply("Hey bu kullanıcıyı sunucudan atamıyorum. Benden yüksek rolleri mi var >:(");
    let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply("Diyelim ki bu kullanıcıyı attım. Ama neden? Sebep belirt lütfen.");
    await member.kick(reason)
      .catch(error => message.reply(`Üzgünüm ${message.author}! Bu kullanıcıyı atamadım çünkü ${error} hatası meydana geldi!`));
    message.channel.send(`**${member.user.tag}**,** ${reason}** sebebiyle, **${message.author.tag}** tarafından sunucudan atıldı.`);

  }
  
  // Banlama Komutu
  if(command === "ban") {
    if(!message.member.hasPermission("BAN_MEMBERS"))
      return message.reply("Üzgünüm! Bunu kullanmak için yetkin yok!");
    
    let member = message.mentions.members.first();
    if(!member)
    return message.reply("Kullanıcıyı düzgünce etiketlemeyi denesen?");
  if(!member.kickable) 
    if(!member.bannable) 
      return message.reply("Hey bu kullanıcıyı sunucudan atamıyorum. Benden yüksek rolleri mi var >:(");

    let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply("Diyelim ki bu kullanıcıyı yasakladım. Ama neden? Sebep belirt lütfen.");
    
    await member.ban(reason)
      .catch(error => message.reply(`Üzgünüm ${message.author}! Bu kullanıcıyı atamadım çünkü ${error} hatası meydana geldi!`));
    message.channel.send(`**${member.user.tag}**,** ${reason}** sebebiyle, **${message.author.tag}** tarafından sunucudan yasaklandı.`);
  }
  
  // Bir kullanıcının Profil Fotoğrafını (Avatarını) gösterir.
  if(command === "avatar") {
    let member = message.mentions.members.first()
    if(!member)
    return message.reply("Kullanıcıyı düzgünce etiketlemeyi denesen?");
 // EMBEDLER HARİKADIR! MÜKKEMMEL MESAJLAR YARATMAK İÇİN BUNLARI SİLME <3
    const Discord = require('discord.js')
         const profl = new Discord.RichEmbed()
         .setImage(member.user.avatarURL)
         .setFooter("FrostyDonuts tarafından oluşturuldu - 2017")
         return message.channel.send(profl);
 }
 
 // Mesaj silme komutu
  if(command === "sil") {
    if (!message.guild) {
      return message.author.send('`temizle` komutu sadece sunucularda kullanılabilir.');
    }
    let mesajsayisi = parseInt(args.join(' '));
    if (mesajsayisi.length < 1) return message.channel.send('Kaç mesaj silmem gerektiğini belirtmedin.')
    if (mesajsayisi > 100) return message.channel.send('100 adetden fazla mesaj silemem!');
    message.channel.bulkDelete(mesajsayisi + 1);
    message.channel.send(mesajsayisi +' adet mesajı yok ettim :fire: ')
  };
});
client.login(config.token);
           