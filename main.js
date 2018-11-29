const Discord = require('discord.js');
const client = new Discord.Client();
client.login(process.env.BOT_TOKEN);

client.on('message', message => {

	utOgh(message);
	mimic(message);
	mock(message);
	acknowledge(message);
	
});

function acknowledge(message) {

	const goodMatch = message.content.match(/\bgood\s*bot\b/i);
	const badMatch = message.content.match(/\bbad\s*bot\b/i);

	if (goodMatch && badMatch && !message.author.bot) {
		message.channel.send('not today *bucko*');
	}
	else if (goodMatch && !message.author.bot) {
		message.channel.send(`thank you ${message.author.username} :^)`);
	}
	else if (badMatch && !message.author.bot) {
		message.channel.send('rude :(');
	}

}

function utOgh(message) {

	const match = message.content.match(/\bu+\s*t+\s*o+\s*g+\s*h+\b/i);

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

	// only I may dance :^)
	// if (message.author.username !== "Darren") return;

	// if you type "mock" and don't @ anyone:
	if (message.content.match(/^mock$/i) && !message.author.bot) {
		message.channel.fetchMessages({ limit: 2 })
		.then(lastMessages => {
			const lastMessage = lastMessages.last().content;
			const mockedMessage = `*${addOs(spongeCase(lastMessage))}*`;
			message.channel.send(mockedMessage);
		})
		.catch(console.error);
	}

	// if you type "mock" and @ someone:
	if (message.content.match(/^mock/i) && message.mentions.users.size > 0 && !message.author.bot) {
		const id = message.mentions.users.first().id;
		message.channel.fetchMessages({ limit: 20 })
		.then(lastMessages => {
			lastMessages = Array.from(lastMessages.values());
			for (let i = 0; i < lastMessages.length; i++) {
				if (id === lastMessages[i].author.id) {
					const mockedMessage = `*${addOs(spongeCase(lastMessages[i].content))}*`;
					message.channel.send(mockedMessage);
					break;
				}
			}
		})
		.catch(console.error);
	}

}

// transform a string into either sPoNgEbObCaSe or SpOnGeBoBcAsE
function spongeCase(str) {

	const r = Math.floor(Math.random() * 2);

	str = str.toLowerCase()
		.split('')
			.map((v, i) => i % 2 === r ? v : v.toUpperCase())
				.join('');

	return str;

}

// randomly add a random number of randomly capitalized O's to a string
function addOs(str) {

	const addChance = 20;
	const minOs = 2;
	const maxOs = 10;

	// decide whether to add them or not. Probability expressed as percentage by addChance
	if (Math.floor(Math.random() * 100 / addChance) + 1 !== 100 / addChance) {
		return str;
	}
	
	// randomly decide whether to add the O's to the start, end or both ends of the string
	const startOrEnd = () => {
		if (Math.floor(Math.random() * 3) === 0) {
			return 'start';
		}
		else if (Math.floor(Math.random() * 3) === 1) {
			return 'end';
		}
		else {
			return 'both';
		}
	};

	// generate a random number of randomly capitalized O's
	const generateOs = (os = '') => {
		const oCount = Math.floor(Math.random() * (maxOs - minOs + 1) + minOs);
		while (os.length < oCount) os += Math.floor(Math.random() * 2) === 0 ? 'o' : 'O';
		return os;
	};

	// return string with O's in appropriate positions
	if (startOrEnd() === 'start') {
		return `${generateOs()} ${str}`;
	}
	else if (startOrEnd === 'end') {
		return `${str} ${generateOs()}`;
	}
	else {
		return `${generateOs()} ${str} ${generateOs()}`;
	}

}
