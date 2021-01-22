// Bot de discord sobre musica
// Genera Quizzes musicales
const Discord = require('discord.js'); // Variable constante para acceder a la API de discord
const fs = require('fs'); // Variable para tratar con archivos
const config = require('./config'); // Variable para usar parametros de configuracion
const config_priv = require('./config-priv.json'); // Variable para usar parametros de configuracion
const client = new Discord.Client(); // Variable que representa el usuario actual

// Funcion al iniciar
// Es un listener que se ejecuta al ejecutarse el index
client.on('ready', () => {
    console.log('bot ready');
    // Añadir logs en archivo

    client.user.setStatus('dnd'); // Añadimos el estado de no molestar
});

// Funcion para vincular el bot a los servidores de discord
client.login(config_priv.token).then(() => {
    // Si queremos hacer algo en ese momento, ponerlo aqui.
});

// Los servidores en discord son tratados como "guild"
// todo comprobar que esto funciona
client.on('guildCreate', guild => {
    // Itera por cada canal del servidor, hasta encontra uno en el que pueda escribir, normalmente suele ser el general
    guild.channels.cache.every(channel => {
        if (channel.type === 'text' && channel.permissionsFor(guild.me).has('SEND_MESSAGES')) {
            channel.send('Sergi pwt0');
            return false;
        }
        return true;
    });
});

// Loading commands
// Collections es un diccionario definido por discord
client.commands = new Discord.Collection();
fs.readdir('./commands/', ((err, files) =>{
    // En caso de error se muestra por consola
    // Seria mejor guardarlo en un log
    if (err) console.error(err);

    // Se consigues los archivos de los comandos, filtrado por js
    const jsFiles = files.filter(f => f.split('.').pop() === 'js');
    if (jsFiles.length === 0) {
        console.error('No se han cargado comandos');
    }

    console.log(`Cargando ${jsfiles.length} comandos`);
    jsFiles.forEach((f, i) =>{
        // Comando
        const props = require(`./commands/${f}`);
        console.log(`${f} cargado`);
        // Se añade en le diccionario el comando
        client.commands.set(props.help.name, props);
    });
}));

// Evento para los mensajes del servidor, escuchamos al prefijo siempre
client.on('message', async message => {
    // Mientras no sea un mensaje propio o un mensaje directo
    if (!message.author.bot && message.channel.type !== 'dm'){
        const prefix = config.prefix; // Recogemos el prefijo
        // Separamos el mensaje por espacios
        const msg = message.content.split(" ");
        // Conseguimos el comando
        const command = msg[0].toLowerCase();
        // Parametros para el comando
        const args = msg.slice(1);

        // Miramos si el mensaje empieza con un prefijo
        if (command.startsWith(prefix)){
            // Conseguimos el comando sin el prefijo
            const input = command.slice(prefix.length);
            // Conseguimos el comando para ejecutar
            const cmd = client.commands.get(input);
            // Separamos el comando por la ayuda
            if (args[0] === 'help'){
                // Mostramos mensaje de ayuda
                showHelp(message);
            } else if (cmd){
                // Ejecutamos el comando
                cmd.run(client, message, args);
            }
        }
    }
})

function showHelp(msg){

}