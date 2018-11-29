const Discord = require('discord.js');
const client = new Discord.Client();
client.login(process.env.BOT_TOKEN);

client.on('message', message => {

	utOgh(message);
	mimic(message);
	mock(message);	

});

function utOgh(message) {

	const match = message.content.match(/u+\s*t+\s*o+\s*g+\s*h+/i);

	if (match && !message.author.bot) {
		const str = match[0].toUpperCase();
		const us = str.match(/U/g).join('').length;
		const os = str.match(/O/g).join('').length;
		
		let result = '';
		[...new Set(str)].forEach(v => {
			result += str.match(new RegExp(v, 'ig')).join('');
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

function mimic(message) {

	if (message.content === 'mimic my idiot self') {
		message.channel.send('miMiC mY iDiOt sELf');
	}

}

function mock(message) {

	console.log(message.mentions.users);
	console.log(message.mentions.users.keys().length);

	if (message.content.startsWith('mock') && message.mentions.users.length > 0) {
		const id = message.mentions.users.first().id;
		message.channel.fetchMessages().then(lastMessages => {
			lastMessages = Array.from(lastMessages.values());
			for (let i = 0; i < lastMessages.length; i++) {
				if (id === lastMessages[i].author.id) {
					const spongeCase = s => s.toLowerCase().split('').map((v, i) => i % 2 === 0 ? v : v.toUpperCase()).join('');
					const mockedMessage = spongeCase(lastMessages[i].content);
					message.channel.send(mockedMessage);
					break;
				}
			}
		})
		.catch(console.error);
	}

}

// https://discordapp.com/oauth2/authorize?client_id=510803012445274112&scope=bot&permissions=515136&response_type=code