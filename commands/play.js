const discord = require('discord.js');
const config = require('../config');
const common = require('../common');


// De esta forma llamamos a la funcion run desde otros archivos
module.exports.run = async (client, message, args) => {
    console.log('Running');
    if (common.isUserInChannel(message)) {//Si esta en el canal del usuario
        console.log('en canal');
    } else {
        console.log('no en canal');
    }
}


