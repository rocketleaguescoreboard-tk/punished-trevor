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

	if (message.content.startsWith('mock') && message.author.username === 'Darren') {
		const id = message.mentions.users.first().id;
		message.channel.fetchMessages({ limit: 10 })
			.then(lastMessages => {
				console.log(lastMessages.values().author.values().id);
			})
			.catch(console.error);
		// console.log("lastMessage.content", lastMessage, '\n\n\n');
		// const spongeCase = s => s.toLowerCase().split('').map((v, i) => i % 2 === 0 ? v : v.toUpperCase()).join('');
		// const mockedMessage = spongeCase(lastMessage);
		// message.channel.send(mockedMessage);
	}

}

// https://discordapp.com/oauth2/authorize?client_id=510803012445274112&scope=bot&permissions=515136&response_type=code