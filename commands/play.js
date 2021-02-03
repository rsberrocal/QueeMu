const discord = require('discord.js');
const config = require('../config');
const yt = require('ytdl-core-discord');
const ytdl = require('ytdl-core');
const common = require('../common');

//const Spotify = require('spotify-web-api.js');
//const Spoti = new Spotify();

// De esta forma llamamos a la funcion run desde otros archivos
module.exports.run = async (client, message, args) => {
    console.log('Running');
    console.log('in chan', common.isUserInChannel(message));
    if (common.isUserInChannel(message)) {//Si esta en el canal del usuario
        console.log('en canal');
        //const connection = await message.member.voice.channel.join();

        const link = args[0];
        console.log('link', link);
        const songInfo = await ytdl(link).then((data) => {
            console.log('data', data);

        });
        console.log(songInfo);
        console.log('connected');

    } else {
        console.log('no en canal');
        message.channel.send('No estas en un canal de voz');
    }
}

module.exports.help = {
    name: 'play',
};


