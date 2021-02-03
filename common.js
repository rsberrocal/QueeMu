const discord = require('discord.js');

module.exports.isUserInChannel = async (message) => {
    console.log(message.member.voice.channel);
    return message.member.voice.channel;
}

