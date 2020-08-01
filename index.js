const Discord = require('discord.js');
const client = new Discord.Client();
let queue = [];
let {
    prefix,
    token,
    bot_age,
    words_array,
    bot_info
} = require('./config.json');

client.once('ready', () => {
    console.log("bot is online");
});
client.on('message', message => {
    if (message.content.toLowerCase() === `${prefix}youtube`) {
        const MessageEmbed = new Discord.MessageEmbed()
            .setColor('#DB0626')
            .setTitle('Rishav Times')
            .setThumbnail('https://yt3.ggpht.com/a/AATXAJzLkBZmupP4RJe2M_PazLi35S5JTG4_4zMo7aO9=s288-c-k-c0xffffffff-no-rj-mo')
            .setURL("https://www.youtube.com/channel/UCmdS34PAiOAqA9hMdZZlypA")
            .setDescription("Hi Im Rishav Times and my channel is based on gaming. I mainly play .io games and sometimes do HACK videos. Hope you enjoy watching my videos and would appreciate it if you would hit that subscribe button")
            .setFooter("Stick around for fun videos every two weeks or so.", "https://yt3.ggpht.com/a/AATXAJzLkBZmupP4RJe2M_PazLi35S5JTG4_4zMo7aO9=s288-c-k-c0xffffffff-no-rj-mo");
        message.channel.send(MessageEmbed);
    } else if (message.content.toLowerCase() === `${prefix}join`) {

        for (var i = 0; i < queue.length; i++) {
            if (queue[i] === message.author.username) {
                let joinMessage = new Discord.MessageEmbed()
                    .setTitle('You already in the queue.')
                    .setColor('#DB0626')
                message.channel.send(joinMessage);
                queue.splice(i, 1)
            }
        }
        queue.push(message.author.username);
        let joinMessage = new Discord.MessageEmbed()
            .setTitle('You have been sucessfully added to the queue.')
            .setColor('#58FA58')
        message.channel.send(joinMessage);
    } else if (message.content.toLowerCase() === `${prefix}next`) {
        if (message.member.hasPermission('MANAGE_GUILD')) {
            if (queue.length === 0) {
                let joinMessage = new Discord.MessageEmbed()
                    .setTitle('The queue is empty.')
                    .setColor('#DB0626')
                message.channel.send(joinMessage);
            } else {
                let joinMessage = new Discord.MessageEmbed()
                    .setTitle("The next person in the queue is " + queue[0])
                    .setColor('#58FA58')
                message.channel.send(joinMessage);
                queue.shift();
                is_in_queue = false;
            }
        } else {
            let joinMessage = new Discord.MessageEmbed()
                .setTitle("You dont have permission to use this command.")
                .setColor('#DB0626')
            message.channel.send(joinMessage);
        }
    } else if (message.content.toLowerCase() === `${prefix}remove-next`) {
        if (message.member.hasPermission('MANAGE_GUILD')) {
            if (queue.length === 0) {
                let joinMessage = new Discord.MessageEmbed()
                    .setTitle("There is nobody to remove from the queue.")
                    .setColor('#DB0626')
                message.channel.send(joinMessage);
            } else {
                let joinMessage = new Discord.MessageEmbed()
                    .setTitle(queue[0] + " has been sucessfully removed from the queue.")
                    .setColor('#58FA58')
                message.channel.send(joinMessage);
                queue.shift();
                is_in_queue = false;
            }
        } else {
            let joinMessage = new Discord.MessageEmbed()
                .setTitle('You dont have permission to use this command.')
                .setColor('#DB0626')
            message.channel.send(joinMessage);
        }
    } else if (message.content.toLowerCase() === `${prefix}queue`) {
        if (queue.length === 0) {
            let joinMessage = new Discord.MessageEmbed()
                .setTitle('The queue is empty.')
                .setColor('#DB0626')
            message.channel.send(joinMessage);
        } else {
            for (var i = 0; i < queue.length; i++) {
                message.channel.send(String(i + 1) + '. ' + queue[i]);
            }
        }
    } else if (message.content.toLowerCase() === `${prefix}clear`) {
        if (message.member.hasPermission('MANAGE_GUILD')) {
            if (queue.length === 0) {
                let joinMessage = new Discord.MessageEmbed()
                    .setTitle('The queue is already empty.')
                    .setColor('#DB0626')
                message.channel.send(joinMessage);
            } else {
                let joinMessage = new Discord.MessageEmbed()
                    .setTitle('The queue was cleared.')
                    .setColor('#58FA58')
                message.channel.send(joinMessage);
                queue.splice(0, queue.length);
            }
        } else {
            let joinMessage = new Discord.MessageEmbed()
                .setTitle('You dont have permission to use this command.')
                .setColor('#DB0626')
            message.channel.send(joinMessage);
        }
    } else if (message.content.toLowerCase() === `${prefix}howtojoin`) {
        let joinMessage = new Discord.MessageEmbed()
            .setTitle('How to join queue')
            .setDescription(`You can use the ${prefix}join function to join the queue and to view the queue type ;queue. Only type ${prefix}join once cause if you spam it will crowd up the chat`)
            .setColor('#38ADDC')
        message.channel.send(joinMessage);
        queue.splice(0, queue.length);
    } else if (message.content.toLowerCase() === `${prefix}about-bot`) {
        let joinMessage = new Discord.MessageEmbed()
            .setTitle("Rishav's pet bot")
            .setThumbnail('https://cdn.discordapp.com/attachments/732081965246709884/732474199154622514/Picture1.jpg')
            .addFields({
                name: 'Creator',
                value: 'Randomgamer22#5345'
            }, {
                name: 'Purpose',
                value: 'This is a bot that creates a queueing system. This bot can be useful for people who play with their viewers often and without randomly picking the viewers this bot allows them to organize their viewers in a queue based on first come first service system.'
            }, {
                name: 'Commands',
                value: `${prefix}join, ${prefix}queue, ${prefix}leave, ${prefix}clear, ${prefix}next, ${prefix}remove-next, ${prefix}howtojoin, ${prefix}youtube (for more info about what each command does type ${prefix}commands).`,
            }, {
                name: 'Version',
                value: '1.0.0',
            }, )
            .setColor('#38ADDC')
        message.channel.send(joinMessage);
    } else if (message.content.toLowerCase() === `${prefix}commands`) {
        let joinMessage = new Discord.MessageEmbed()
            .setTitle('Bot Commands')
            .setThumbnail('https://cdn.discordapp.com/attachments/732081965246709884/732474199154622514/Picture1.jpg')
            .addFields({
                name: `${prefix}join`,
                value: 'Adds your username into the queue.'
            }, {
                name: `${prefix}queue`,
                value: 'It gives you a list of people in the queue'
            }, {
                name: `${prefix}next`,
                value: 'Tells the next person in the queue and automatically removes them from the queue(can only be used by host).',
            }, {
                name: `${prefix}remove-next`,
                value: 'Removes the next person from the queue(can only be used by host).',
            }, {
                name: `${prefix}clear`,
                value: 'Clears the entire queue(can only be used by host).',
            }, {
                name: `${prefix}about-bot`,
                value: 'Tells you about the bot'
            }, {
                name: `${prefix}youtube`,
                value: 'Gives you the link to "Rishav Times" Youtube channel.'
            }, {
                name: `${prefix}prefix`,
                value: 'Gives you the prefix that each command starts with.',
            }, {
                name: `${prefix}leave`,
                value: 'Removes you from the queue',
            })
            .setColor('#38ADDC')
        message.channel.send(joinMessage);
    } else if (message.content.toLowerCase() === `${prefix}prefix`) {
        let joinMessage = new Discord.MessageEmbed()
            .setDescription(`The current prefix is ${prefix}`)
            .setColor('#38ADDC')
        message.channel.send(joinMessage);
    } else if (message.content.toLowerCase() === `${prefix}leave`) {
        for (var i = 0; i < queue.length; i++) {
            if (queue[i] === message.author.username) {
                queue.splice(i, 1)
            }
        }
        let joinMessage = new Discord.MessageEmbed()
            .setTitle(`You have been sucessfully removed from the queue.`)
            .setColor('#58FA58')
        message.channel.send(joinMessage);
    }
})
client.login(token);
