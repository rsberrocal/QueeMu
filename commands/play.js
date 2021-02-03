const discord = require('discord.js');
const config = require('../config');
const yt = require('ytdl-core-discord');
const ytdl = require('ytdl-core');
const common = require('../common');

//const Spotify = require('spotify-web-api.js');
//const Spoti = new Spotify();

// De esta forma llamamos a la funcion run desde otros archivos
module.exports.run = async (client, message, args) => {
    if (common.isUserInChannel(message)) {//Si esta en el canal del usuario
        //const connection = await message.member.voice.channel.join();
        const link = args[0];
        console.log('link', link);
        const songInfo = await yt(link)

        song = {
            title: songInfo.videoDetails.title,
            url: songInfo.videoDetails.video_url,
            duration: songInfo.videoDetails.lengthSeconds,
            thumbnail: songInfo.videoDetails.thumbnail.thumbnails[3].url
        };

        const connection = await message.member.voice.channel.join();
        const dispatcher = connection.connection
            .play(yt(song.url))
        console.log(song);
        console.log('connected');
        return message.channel.send(`Escuchando ${song.title}`);
    } else {
        return message.channel.send('No estas en un canal de voz');
    }
}

module.exports.name = 'play';


