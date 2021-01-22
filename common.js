const discord = require('discord.js');

module.export.isUserInChannel = async (message) =>{
    return message.member.voice.channel;
}

