const Discord = require('discord.js');
const client = new Discord.Client();

client.on('message', message => {
	const uo = message.content.match(/u+\s*t+\s*o+\s*g+\s*h+/i);
	if (uo) {
		const s = uo[0].toUpperCase();
		const us = uo[0].match(/u/ig).join('').length;
		const os = uo[0].match(/o/ig).join('').length;
		
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
});

client.login(process.env.BOT_TOKEN);