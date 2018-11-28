const Discord = require('discord.js');
const client = new Discord.Client();
client.login(process.env.BOT_TOKEN);

client.on('message', message => {

	utOgh(message);

	if (message.content === 'mimic my idiot self') {
		message.channel.send('miMiC mY iDiOt sELf');
	}

});

function utOgh (message) {
	if (message.content.match(/u+\s*t+\s*o+\s*g+\s*h+/i) && !message.author.bot) {
		const s = message.content.match(/u+\s*t+\s*o+\s*g+\s*h+/i)[0].toUpperCase();
		const us = s.match(/U/g).join('').length;
		const os = s.match(/O/g).join('').length;
		
		let result = '';
		[...new Set(s)].forEach(v => {
			result += s.match(new RegExp(v, 'ig')).join('');
			if (v === 'U') {
				while (result.length < us * 2) result += v;
			}
			if (v === 'O') {
				const lengthSoFar = result.length;
				while (result.length - lengthSoFar < os * 2) result += v;
			}
		});
		result = `***${result}***`;

		message.channel.send(result);
	}
}