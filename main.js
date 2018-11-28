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
		const members = message.channel.members;
		members.forEach(value, key, map) {
			console.log("key:", key, "value:", value);
		}

		const member = message.mentions.members.first();
		console.log("username:", member.username, '\n\n\n');
		console.log("lastMessageID:", member.lastMessageID, '\n\n\n');
		console.log("lastMessage.content", member.lastMessage.content, '\n\n\n');
		const spongeCase = s => s.toLowerCase().split('').map((v, i) => i % 2 === 0 ? v : v.toUpperCase()).join('');
		const mockedMessage = spongeCase(lastMessage);
		message.channel.send(mockedMessage);
	}

}