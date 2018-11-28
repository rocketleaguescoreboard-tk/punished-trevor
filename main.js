const Discord = require('discord.js');
const client = new Discord.Client();
client.login(process.env.BOT_TOKEN);

client.on('message', message => {

	utOgh(message);

	mock(message);

	if (message.content === 'mimic my idiot self') {
		message.channel.send('miMiC mY iDiOt sELf');
	}

});

function mock(message) {

	if (message.content.startsWith('mock')) {
		const spongeCase = s => s.toLowerCase().split('').map((v, i) => i % 2 === 0 ? v : v.toUpperCase()).join('');
		console.log(message.mentions.users);
		const user = message.mentions.users.id;
		console.log(user);
		const lastMessage = message.channel.fetchMessage(user);
		console.log(lastMessage);
		const mockedMessage = spongeCase(lastMessage);
		message.channel.send(mockedMessage);
	}

}

function utOgh(message) {

	if (message.content.match(/u+\s*t+\s*o+\s*g+\s*h+/i) && !message.author.bot) {
		const str = message.content.match(/u+\s*t+\s*o+\s*g+\s*h+/i)[0].toUpperCase();
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