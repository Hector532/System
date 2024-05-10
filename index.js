const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(() => console.log(`Project has been started.!`))

const moment = require("moment")
const ms = require("ms")
const { Client, Intents, MessageEmbed, Interaction, MessageButton, MessageActionRow, Modal, WebhookClient, MessageSelectMenu, Collection, Permissions, TextInputComponent, MessageFlags, GatewayIntentBits } = require("discord.js");
const Discord = require('discord.js');
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, 32767]
});
client.setMaxListeners(0)

client.on("ready", () => {
  console.log(`Shnider Ready : ${client.user.username}`)
  client.user.setActivity(`O'Byrd.`, { type: 'WATCHING' });
  client.application.commands.set([
    {
      name:'add_record',
      description: '.اضافة سجل الي عصو',
      options: [
        {
          name: "العضو",
            description: ".اختار العضو اللذي تريد اضفة سجل له",
            required: true,
            type: "USER"
        },
        {
          name: "نوع_السجل",
            description: "اختار السجل اذا كان ايجابي/سلبي",
            required: true,
            type: 3,
          choices: [
          {
              name: "ايجابي",
              value: "ايجابي"
          },
          {
              name: "سلبي",
              value: "سلبي"
          }]
        },
        {
          name: "السبب",
            description: ".يرجي كتابة سبب السجل",
            required: true,
            type: "STRING"
        }
      ]
    }
  ])

})
////////// 
const emj = require('./emj.json');
const db = require("pro.db")
const databaseimage = ["./done.json"]
const prefix = "$"
const fs = require('fs');
const lineLink = { files: ["lineee.gif"] }; // الخط
const guild = client.guilds.cache.get('1186397978114666669');  
const shnider = '767450021343657994'
const channelId = '1197036595476435024';
const familynewrole = '1209345834160750673'
const specificRoleId = '1212776458473312287'
const supportrole = '1209338803811127387'
let shniderbank = '';
client.login(process.env.token)

client.on('messageCreate', async (message) =>{ 
  if (message.content.startsWith('$Setp')) {
    if (message.member.roles.cache.has(specificRoleId) || message.member.permissions.has('ADMINISTRATOR')) {

    let embed = new MessageEmbed()
    .setTitle("O'Byrd Family Apply")
    .addFields(
      { name: 'شروط التقديم ..', value: `**1. مستوى خبرتك يكون اعلى من 40 لفل\n2. حضور السيناريوهات والمزارع الخاصه بالعائله\n3. التفاعل اليومي الخاص بك لا يقل عن 5 ساعات يوميا\n4. دفع تأمين قدره 500 الف\n5. الألتزام بـ تقارير العائله والفزعات**` },
    )
    .setFooter({ text: "O'Byrd Family Apply"})
    .setImage('https://cdn.discordapp.com/icons/1206400196217405472/a_5b0a8bac35f9dbaff8c73b643f364277.gif?size=1024')
    
    .setColor('YELLOW');

    const menu = new MessageActionRow()
    .addComponents(
      new MessageSelectMenu()
      .setCustomId('menu')
      .setPlaceholder('O.Byrd Family Apply')
      .addOptions(
        { label: 'Apply On O.Byrd Family', description: 'الـتـقـديـم عـلـي الـعـآئـلـة', value: 'apply' },
        { label: 'Support', description: 'الدعم الفني', value: 'technical_support' },
      )
    )
    message.channel.send({ embeds: [embed], components: [menu] })
  }
  }
});

      client.on('interactionCreate', async (interaction) => {
      if (interaction.isSelectMenu()) {
        if (interaction.customId === 'menu') {
          if (interaction.values[0] === 'apply') {
            const applicationStatus = db.get('applicationStatus');

            if (applicationStatus === 'off') {
              return interaction.reply({ content: 'حالة التقديم مغلقة حاليًا.', ephemeral: true });
            }

            const memberData = db.get(`${interaction.user.id}`);

            if (memberData && memberData.blacklist) {
              return interaction.reply({ content: 'لقد تم رفضك من التقديم من قبل الرجاء الانتظار التقديم القادم أو تواصل مع الدعم الفني', ephemeral: true });
            }

            const modal = new Modal()
              .setCustomId('apply')
              .setTitle("O'Byrd Family Apply");

            const name = new TextInputComponent()
              .setCustomId('name')
              .setLabel('اسم حسابك')
              .setStyle('SHORT')
              .setRequired(true);

            const namecr = new TextInputComponent()
              .setCustomId('namecr')
              .setLabel('اسم شخصيتك داخل المدينة')
              .setStyle('SHORT')
              .setRequired(true);

            const level = new TextInputComponent()
              .setCustomId('level')
              .setLabel('مستوى خبرتك')
              .setStyle('SHORT')
              .setRequired(true);

            const hours = new TextInputComponent()
              .setCustomId('hours')
              .setLabel('الأيدي الخاص بك ( رقمك فالسيرفر )')
              .setStyle('SHORT')
              .setRequired(true);

            const sglat = new TextInputComponent()
              .setCustomId('sglat')
              .setLabel('عدد السجلات الرقابية التي عندك')
              .setStyle('SHORT')
              .setRequired(true);

            const a = new MessageActionRow().addComponents(name);
            const b = new MessageActionRow().addComponents(namecr);
            const c = new MessageActionRow().addComponents(level);
            const d = new MessageActionRow().addComponents(hours);
            const e = new MessageActionRow().addComponents(sglat);

            modal.addComponents(a, b, c, d, e);

            await interaction.showModal(modal);
          }
      if (interaction.values[0] === 'technical_support') {
      const modaal = new Modal()
        .setCustomId('support')
        .setTitle("O'Byrd Ticket Support")
        const mm = new TextInputComponent()
        .setCustomId('supporte')
        .setLabel('اشرح مشكلتك :')
        .setStyle('PARAGRAPH')
        .setRequired(true)
        const a = new MessageActionRow().addComponents(mm);
        modaal.addComponents(a);
        await interaction.showModal(modaal);
          }
        }
      }
});

client.on('interactionCreate', async (interaction) => {
  if (interaction.isCommand()){
    if ( interaction.commandName === 'add_record'){
      if (interaction.member.permissions.has('ADMINISTRATOR')) {
        const member = interaction.options.getMember('العضو');
        const type = interaction.options.getString('نوع_السجل');
        const reason = interaction.options.getString('السبب');
        const channel = interaction.guild.channels.cache.get("1225084936772386987");
        const embed = new MessageEmbed()
          .setTitle('تم اضافة سجل جديد')
          .setDescription(`**العضو : ${member}\nنوع السجل : ${type}\nالسبب : ${reason}\nالمسؤول : ${interaction.user}**`)
          .setColor('YELLOW')
          .setFooter({ text: `O'Byrd Family Apply` });
        db.set(member.id+`_record`, { member_id: member.id, type: type, reason: reason, by: interaction.user.id });
        channel.send({ embeds: [embed] });
        interaction.reply({ content: `### تم اضافة السجل بنجاح.\n* <#1225084936772386987>`, ephemeral: true });
      }
    }
  }
  if (interaction.isModalSubmit()){
    if (interaction.customId === 'apply') {
      const member = interaction.member.id;
      const membername = interaction.user.username;

      const name = interaction.fields.getTextInputValue('name');
      const namecr = interaction.fields.getTextInputValue('namecr');
      const level = interaction.fields.getTextInputValue('level');
      const hours = interaction.fields.getTextInputValue('hours');
      const sglat = interaction.fields.getTextInputValue('sglat');
      const role = interaction.guild.roles.cache.get(specificRoleId);

      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId('delete')
            .setLabel('Delete')
            .setStyle('DANGER'),
          new MessageButton()
            .setCustomId('startTest')
            .setLabel('بدأ الأختبار')
            .setStyle('PRIMARY'),
        )

      const embed = new MessageEmbed()
      .setTitle("O'Byrd Family Apply")
      .addFields(
        { name: 'اسم الحساب :', value: `${name}` },
        { name: 'اسم الشخصية :', value: `${namecr}` },
        { name: 'مستوى الخبرة :', value: `${level}` },
        { name: 'الأيدي :', value: `${hours}` },
        { name: 'عدد السجلات :', value: `${sglat}` }
      )
      .setColor('YELLOW');

      let q = db.set(`${member}`, {
        name: name,
        namecr: namecr,
        level: level,
        hours: hours,
        sglat: sglat
      });
    const channel = await interaction.guild.channels.create(`Apply-${membername}`, {
        type: 'text',
      permissionOverwrites: [
     {
      id: interaction.guild.id,
    deny: ['VIEW_CHANNEL'],
    },
    {
  id: member,
   allow: ['VIEW_CHANNEL'],
   },
 {
   id: role.id,
   allow: ['VIEW_CHANNEL'],
    },
 ],
    });
            channel.send({ content: `**مرحبا <@${member}> .. الرجاء بدأ الأختبار عن طريق الضغط علي الزر لـ معرفه مدى خبرتك وبعد ذلك انتظر رد المسؤولين** <:Spcial:1217205746043719680>`, embeds: [embed], components: [row] });
      interaction.reply({content: `تم ارسال تقديمك بنجاح ${channel}`, ephemeral: true})
          }
  if (interaction.customId === 'support') {
    const mm = interaction.fields.getTextInputValue('supporte');
    const member = interaction.user.username;
    const mme = interaction.member.id;
    const role1 = interaction.guild.roles.cache.get(supportrole);
    const row = new MessageActionRow()
    .addComponents(
      new MessageButton()
      .setCustomId('delete')
      .setLabel('حذف التذكرة')
      .setStyle('DANGER'),
      new MessageButton()
      .setCustomId('Claim')
      .setLabel('استلام')
      .setStyle('PRIMARY'),
    )
    
    const createchannel = await interaction.guild.channels.create(`ticket-${member}`, {
      type: 'text',
      permissionOverwrites: [
        {
          id: interaction.guild.id,
          deny: ['VIEW_CHANNEL'],
        },
        {
          id: mme,
          allow: ['VIEW_CHANNEL'],
        },
        {
          id: role1.id,
          allow: ['VIEW_CHANNEL'],
        },
      ]
    });
    const embed = new MessageEmbed()
    .setTitle("O'Byrd Ticket Support")
    .addFields(
      { name: 'المشكلة :', value: `${mm}` },
    )
    .setColor('YELLOW')
    .setDescription('**مرحبا بك في الدعم الفني الخاص بالعائلة .. نعلمك أن تم تقديم طلبك بنجاح الرجاء انتظار رد المسؤولين لحل المشكلة لك في أسرع وقت\nالرجاء عدم الازعاج بالمنشن وان تعلم ان التأخير في رد المسؤولين هو الضغط الواقع عليهم من التكتات **')
    .setFooter("O'Byrd Ticket Support")
    .setTimestamp();


    createchannel.send({content: `<@&${supportrole}>`, embeds: [embed], components: [row] })
    interaction.reply({content: `تم فتح التذكره بنجاح ${createchannel}`, ephemeral: true})
      }
}
      });

client.on('interactionCreate', async (interaction) => {
  if (interaction.isButton()) {
    if (interaction.customId === 'startTest') {
      const questions = [
        { question: "هل انت في وظيفه معتمده او منظمه ؟ اذكرها", time: 30000 },
        { question: "ماذا ستفعل اذا طلب منك صديق فالعائله دعم او فزعه في مكان معين ؟؟", time: 60000 },
        { question: "سبب دخولك للعائله ؟", time: 60000 },
        { question: "هل ستهتم ب تقارير العائله ؟", time: 60000 },
        { question: "هل يمكنك ان تقوم بـ اهمال العائله وعدم التفاعل !!", time: 30000 },
      ];
      let currentQuestionIndex = 0;
      let answers = [];
      await interaction.reply('بدء الأسئلة...');
      const askQuestion = async () => {
        if (answers.length === currentQuestionIndex) {
          const { question, time } = questions[currentQuestionIndex];
          await interaction.followUp({ content: question, ephemeral: true });
          const filter = m => m.author.id === interaction.user.id;
          const response = await interaction.channel.awaitMessages({ filter, max: 1, time });
          if (response.size === 0) {
            return await interaction.followUp('انتهاء الوقت ..');
          }
          answers.push(`**${question}**:\n- ${response.first().content}`);
          currentQuestionIndex++;

          if (currentQuestionIndex < questions.length) {
            await askQuestion();
          } else {
            let memberData = db.get(`${interaction.user.id}`);

            if (memberData) {
              const answersEmbed = new MessageEmbed()
                .setTitle('أجوبات المستخدم')
                .setDescription(answers.join('\n'))
                .addField('الاسم:', memberData.name)
                .addField('اسم الشخصيه:', memberData.namecr)
                .addField('المستوى:', memberData.level)
                .addField('الأيدي : ', memberData.hours)
                .addField('السجلات:', memberData.sglat)
                .setColor('YELLOW');

              await interaction.followUp({
                content: `**تم استلام الأجابات .. الرجاء انتظار المسؤولين وعدم الأزعاج بالمنشن** <@&${specificRoleId}>`,
                embeds: [answersEmbed]
              });
              interaction.channel.send(`**الرجاء ارسال صورة للفل الخاص بك و صورة لعدد السجلات الخاصه بك** ${interaction.user}`);
            } else {
              await interaction.followUp('لم يتم العثور على بيانات العضو في قاعدة البيانات.');
            }
          }
        }
      };

      await askQuestion();
    }
  }
});


client.on('messageCreate', async (message) => {
  if (message.content.startsWith("انفو")) {
    if (message.member.roles.cache.has(specificRoleId)) {
    const mentionuser = message.mentions.users.first();
    if (mentionuser) return message.reply('منشن شخص')
    let memberData = db.get(`${mentionuser.id}`);
    if (memberData) {
    const aa = new MessageEmbed()
    .setTitle('معلومات المستخدم ')
    .addField('الاسم:', memberData.name)
    .addField('اسم الشخصيه:', memberData.namecr)
    .addField('المستوى:', memberData.level)
    .addField('عدد الساعات:', memberData.hours)
    .addField('السجلات:', memberData.sglat)
    .setColor('YELLOW');
    message.reply({ embeds: [aa] })
    } else {
      message.reply('لم يتم العثور على بيانات العضو في قاعدة البيانات.');
    }
  }
  }
});


client.on('messageCreate', async (message) => {
  if (message.content.startsWith('-رفض')) {
      if (message.member.roles.cache.has(specificRoleId) || message.member.permissions.has('ADMINISTRATOR')) {
    const mentionUser = message.mentions.users.first();
    const reason = message.content.slice('-رفض'.length).trim().split(/ +/).slice(1).join(' ');
    if (!mentionUser) {
      return await message.reply('يجب تحديد شخص للرفض.');
    }
    if (!reason) {
      return await message.reply('يجب تحديد سبب الرفض.');
    }
    let memberData = db.get(`${mentionUser.id}`);
    if (memberData) {
      memberData.blacklist = true;
      memberData.reason = reason;
      db.set(`${mentionUser.id}`, memberData);
      return await message.reply(`تم رفض ${mentionUser.tag} بسبب: ${reason}`);
    } else {
      return await message.reply('لم يتم العثور على بيانات لهذا الشخص في قاعدة البيانات.');
    }
    }
  }
});

client.on('messageCreate', async (message) => {
  if (message.content.startsWith('-قبول')) {
    if (message.member.roles.cache.has(specificRoleId) || message.member.permissions.has('ADMINISTRATOR')) {
      const role = message.guild.roles.cache.get(familynewrole);
      const mentionUser = message.mentions.users.first();

      if (mentionUser) {
        try {
          const member = await message.guild.members.fetch(mentionUser);

          if (role) {
            member.roles.add(role);
            return await message.reply(`تم قبول ${mentionUser.tag} في العائلة.`);
          } else {
            return await message.reply('لا يمكن العثور على الدور المحدد.');
          }
        } catch (error) {
          console.error(error);
          return await message.reply('حدث خطأ أثناء محاولة إعطاء الدور.');
        }
      } else {
        return await message.reply('يجب تحديد شخص للقبول.');
      }
    }
  }
});


        


client.on('messageCreate', async (message) => {
  if (message.content.startsWith('-سبب')) {
    const mentionUser = message.mentions.users.first();
    if (!mentionUser) {
      return await message.reply('يجب تحديد شخص للبحث عن السبب.');
    }
    const memberData = db.get(`${mentionUser.id}`);
    if (memberData && memberData.reason) {
      return await message.reply(`سبب رفض ${mentionUser.tag}: ${memberData.reason}`);
    } else {
      return await message.reply('لم يتم توفير سبب رفض لهذا الشخص.');
    }
  }
});




client.on('messageCreate', async (message) => {
  if (message.content.startsWith('-تفعيل') && message.mentions.users.size > 0) {
    const mentionUser = message.mentions.users.first();
    const userData = db.get(`${mentionUser.id}`);

    if (userData && userData.blacklist) {
      delete userData.blacklist;
      delete userData.reason;
      db.set(`${mentionUser.id}`, userData);
      return await message.reply(`تم تفعيل ${mentionUser.tag}.`);
    } else {
      return await message.reply('هذا الشخص غير موجود في القائمة السوداء.');
    }
  }

  // Add the new condition to activate everyone
  if (message.content === '-تفعيل-الجميع') {
    // Iterate through all users and remove them from the blacklist
    db.all().forEach(entry => {
      const userData = entry.data;
      if (userData && userData.blacklist) {
        delete userData.blacklist;
        delete userData.reason;
        db.set(entry.key, userData);
      }
    });

    return await message.reply('تم تفعيل الجميع.');
  }
});


client.on('messageCreate', async (message) => {
  if (message.content.startsWith('$emrules')) {
    const embed = new MessageEmbed()
      .setTitle('O.Byrd Family Rules')
      .setDescription(`┄┉┉┉┉┉┉══ ✽ ══┉┉┉┉┉┉┄

**- 1 : المحافظة على الأدب العام

- 2 : يمنع الحديث أو الإشارة بالكتابة او الصور او المنشورات او روابط خارجية أو بحالتك في البروفايل عن اي موضوع يتعلق في السياسة او الدين او القبلية أو العنصرية بكل أنواعها أو الخادشة للحياء العام.

- 3 : يمنع الشتم واللعن أو ارسال صور أو مقاطع فديو أو كتابة أو ارسال مقاطع صوتية تحتوي على عبارات خادشه للحياء العام.

- 4 : يمنع إرسال روابط خارجية للترويج للسيرفرات او إعلانات تجارية سواء بالعام او الخاص دون الحصول على اذن كتابي مسبق من إدارة السيرفر.

- 5 :  يمنع طلب المساعدة او الدعم من الإداريين بالخاص
وعليك التقيد بطلب الدعم عن طريق التكت او الروم المختص لموضوعك

- 6 : احذر من التعامل مع أي شخص بالخاص على أساس ان من طاقم الإدارة. 
وإدارة السيرفر لن تطلب منك معلومات شخصية او باسوورد حسابك او تحويل فلوس بالخاص.

- 7 :  انما الدين اخلاق تحلى بأخلاق حسنة واطلب وتكلم مع اللاعبين بلطف وشاركنا رأيك وانطباعك عن السيرفر بأسلوبك الراقي.

- 8 :  يحق للإدارة حظرك من استعمال سيرفراتها وبدون تنبيه او اعذار متى رأت ذلك ضروري للحفاظ على النظام العام او بسبب مخالفتك للقوانين سواء كانت مكتوبة او عرفيه

- 9 :  يمنع استخدام دسكورد ماسون للمحادثات بين اثنين وانقل موضوع عبر خاص بدون لاتكتب تعالي خاص. بكل بساطة ارسل رسالة مباشرة بالخاص وكمل أو ابدأ موضوعك.

- 10 :  يمنع ارسال مجرد احرف او حرف او نقطة أو علامة إلخ.

- 11 :  يمنع منشن الإدارين أو اللاعبين من غير هدف أو متكرر أو للسوالف وهو غير متفاعل معك بالسالفة.

┄┉┉┉┉┉┉══ ✽ ══┉┉┉┉┉┉┄

> - أدارة ألعائلة تتمني لكم ألتوفيق داما و أبدا **

> - @everyone`)
      .setFooter('O.Byrd Family Rules')
      .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
      .setTimestamp()
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .setColor('YELLOW');
    message.channel.send({ embeds: [embed] });
  }
});

client.on('messageCreate', async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'setavatar') {
    if (!message.attachments.first()) {
      return message.reply('الرجاء إرفاق صورة لتحديث الصورة.');
    }

    const attachmentURL = message.attachments.first().url;

    try {
      await client.user.setAvatar(attachmentURL);
      message.reply('تم تحديث صورة البوت بنجاح.');
    } catch (error) {
      console.error(error);
      message.reply('حدث خطأ أثناء تحديث صورة البوت.');
    }
  }
});


client.on('messageCreate', async (message) => {
  if (message.content.startsWith('mute')) {
    const args = message.content.split(' ');
    const target = message.mentions.members.first();

    if (!target) {
      message.reply('قم بـ منشنة الشخص الذي تريد إعطائه ميوت.');
      return;
    }
    let time = 0;
    let duration = 'Indefinite';
    if (args.length > 2) {
      time = ms(args[2]);
      if (time) {
        duration = ms(time, { long: true });
      } else {
        message.reply('حط الوقت.');
        return;
      }
    }
    const role = message.guild.roles.cache.find(role => role.name === 'Muted');

    if (!role) {
      message.reply('مفيش رول ميوت فالسيرفر دا');
      return;
    }
    if (!target.roles.cache.has(role.id)) {
      target.roles.add(role);
      message.reply(`**Successfully muted ${target} for ${duration}. <:emoji_6:1210066250026197002>**`);

      if (time) {
        setTimeout(() => {
          target.roles.remove(role);
          message.channel.send(`**${target} has been unmuted after ${duration}.**`);
        }, time);
      }
    } else {
      message.reply(`**${target} is already muted.**`);
    }
  }
});

client.on('messageCreate', async (message) => {
  if (!message.guild) return;
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'apply') {
    if (!message.member.permissions.has('ADMINISTRATOR')) {
      return message.reply('ليس لديك الصلاحيات اللازمة لتنفيذ هذا الأمر.');
    }
    const validStatuses = ['on', 'off'];
    const newStatus = args[0];
    if (!newStatus || !validStatuses.includes(newStatus)) {
      return message.reply('الرجاء تحديد حالة صحيحة (on أو off).');
    }
    db.set('applicationStatus', newStatus);
    return message.reply(`تم تحديث حالة التقديم إلى: ${newStatus}.`);
  }
});


client.on('messageCreate', async message => {
  if (message.content.startsWith('dm')) {
      if (message.member.roles.cache.has(sellerRoleId) || message.member.permissions.has("ADMINISTRATOR") || message.member.roles.cache.has(staffRoleId)) {
        try {
        const args = message.content.split(' ');
        const msglink = `https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`;
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
        const test = message.content.split(" ").slice(2).join(" ");
        if (!user) return message.reply("**منشن الشخص أولاً أو ضع الإيدي !**");
        if (!test) return message.reply("**قم بكتابة الرسالة !**");

        const embed = new Discord.MessageEmbed()
      .setDescription(`${test}`)

        await user.send({ content:`** رسالة من : ${message.author} **\n**رسالة الإستدعاء : ${msglink} **`, embeds: [embed] });
        await user.send(link)
        await message.reply(`${emj.done} ** تم ارسال الرسالة الى ${user} بنجاح !**`);
      } catch {
        await message.reply(`** لا يمكنني ارسال رسالة لهذا الشخص !**`);
      }
    }
  }
});

client.on('interactionCreate', async interaction => {
if (!interaction.isCommand()) return;

const { commandName } = interaction;

if (commandName === 'hello') {
  await interaction.reply('Hello World!');
}
});