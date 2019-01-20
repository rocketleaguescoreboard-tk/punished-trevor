// bonsai

const Discord = require('discord.js');
const util = require('util');
const client = new Discord.Client();
client.login(process.env.BOT_TOKEN);

client.on("error", e => console.error(e));
client.on("warn", e => console.warn(e));

client.on('message', message => {

	// ignore ourself
	if (message.author.id === '510803012445274112') return;

	// run js with !e
	if (message.content.startsWith("!e") && message.channel.id === '517382587090731008') {
		evaluate(message);
	}
	// if someone says 'ut ogh' then say 'ut ogh' right back:
	else if (message.content.match(/\bu+\s*t+\s*o+\s*g+\s*h+\b/i)) {
		utOgh(message);
	}
	// if you type 'mimic', mimic the chat from bits of the last 1,000 messages
	else if (message.content.match(/^mimic my idiot self$|^mimic$/i)) {
		mimic(message);
	}
	// if you type 'mimic @someone', mimic that someone
	else if (message.content.match(/^mimic/i) && message.mentions.users.size > 0) {
		mimicUser(message);
	}
	// if you type 'mysterymimic', mimic a random person in the chat
	else if (message.content.match(/^mysterymimic/i)) {
		mimicMystery(message);
	}
	// if you type 'mock' and don't @ anyone:
	else if (message.content.match(/^mock$/i)) {
		mockLast(message);
	}
	// if you type 'mock' and @ someone:
	else if (message.content.match(/^mock/i) && message.mentions.users.size > 0) {
		mockUser(message);
	}
	// if you say 'good bot' or 'bad bot':
	else if (message.content.match(/\b(good|bad)\s*bot\b/i)) {
		acceptCriticism(message);
	}

});

function evaluate(message) {

	const args = message.content.split(" ").slice(1);
	const isPromise = p => p.then ? true : false;

	try {
		const code = args.join(" ");
		let evaled = eval(code);
		if (isPromise(evaled)) {
			evaled.then(evaledPromise => {
				if (typeof evaledPromise !== "string") evaledPromise = util.inspect(evaledPromise);
				message.channel.send(clean(evaledPromise), { code: "xl" });
			});
		}
		else {
			if (typeof evaled !== "string") evaled = util.inspect(evaled);
			message.channel.send(clean(evaled), { code: "xl" });
		}		
	}
	catch (err) {
		message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
	}

	function clean(text) {
		if (typeof text === "string") {
			return text
				.replace(/`/g, "`" + String.fromCharCode(8203))
				.replace(/@/g, "@" + String.fromCharCode(8203));
		}
		else {
			return text;
		}
	}

}

function mimic(message) {

	// placeholder
	message.channel.send('miMiC mY iDiOt sElF');

}

function mimicUser(message) {

	// placeholder
	message.channel.send('miMiC mY iDiOt sElF');

}

function mimicMystery(message) {

	// placeholder
	message.channel.send('miMiC mY iDiOt sElF');

}

function mockLast(message) {

	message.channel.fetchMessages({ limit: 2 })
		.then(lastMessages => {
			const lastMessage = lastMessages.last().content;
			if (!lastMessage) return;
			const mockedMessage = addOs(spongeCase(lastMessage));
			message.channel.send(mockedMessage);
		})
		.catch(console.error);

}

function mockUser(message) {

	const id = message.mentions.users.first().id;

	message.channel.fetchMessages({ limit: 20 })
		.then(lastMessages => {
			lastMessages = Array.from(lastMessages.values());
			for (let i = 0; i < lastMessages.length; i++) {
				if (id === lastMessages[i].author.id) {
					if (!lastMessages[i].content) return;
					const mockedMessage = addOs(spongeCase(lastMessages[i].content));
					message.channel.send(mockedMessage);
					break;
				}
			}
		})
		.catch(console.error);

}

function acceptCriticism(message) {

	const content = message.content;

	if (content.match(/\bgood\s*bot\b/i) && content.match(/\bbad\s*bot\b/i)) {
		message.channel.send('not today *bucko*');
	} else if (content.match(/\bgood\s*bot\b/i)) {
		message.react('❤');
		message.channel.send(`thank you ${message.member.displayName} :^)`);
	} else if (content.match(/\bbad\s*bot\b/i)) {
		(async () => {
			await message.react('🆔');
			await message.react('🇮');
			await message.react('🇴');
			await message.react('🇹');
		})()
		.catch(console.error);
	}

}

function utOgh(message) {

	const match = message.content.match(/\bu+\s*t+\s*o+\s*g+\s*h+\b/i);
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

// transform a string into sPoNgEbObCaSe
function spongeCase(str) {

	const r = Math.floor(Math.random() * 2);

	str = str
		.toLowerCase()
		.split('')
		.map((v, i) => i % 2 === r ? v : v.toUpperCase())
		.join('');

	return str;

}

// randomly add a random number of randomly capitalized O's to a string
function addOs(str) {

	const addChance = 50;
	const minOs = 3;
	const maxOs = 10;

	// decide whether to add them or not. Probability expressed as percentage by addChance
	if (Math.floor(Math.random() * 100 / addChance) + 1 !== Math.floor(100 / addChance)) {
		return str;
	}

	// randomly decide whether to add the O's to the start, end or both ends of the string
	const startOrEnd = () => {
		if (Math.floor(Math.random() * 3) === 0) {
			return 'start';
		} else if (Math.floor(Math.random() * 3) === 1) {
			return 'end';
		} else {
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
	} else if (startOrEnd === 'end') {
		return `${str} ${generateOs()}`;
	} else {
		return `${generateOs()} ${str} ${generateOs()}`;
	}

}
