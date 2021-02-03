const discord = require('discord.js');

module.exports.isUserInChannel = (message) => {
    return message.member.voice.channel;
}

