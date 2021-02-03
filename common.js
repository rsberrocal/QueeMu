const discord = require('discord.js');

module.exports.isUserInChannel = async (message) => {
    return message.member.voice.channel == null;
}

