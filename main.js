const Discord = require('discord.js');
const util = require('util');
const client = new Discord.Client();
const { token } = require('./settings');

client.login(token);

client.on('error', e => console.error(e));

client.on('warn', e => console.warn(e));

client.on('message', message => {
	if (message.channel.id === '563156152477548567' && message.content.startsWith('ping')) { 
		message.channel.send('pong');
	}
	
	// ignore Trevor
	if (message.author.id === '510803012445274112') return;

	// ignore other Trevor
	else if (message.author.id === '563154653680893953') return;

	// run js with !e
	else if (message.content.startsWith('!e') && message.channel.id === '517382587090731008') {
		evaluate(message);
	}
	else if (message.content.match(/h+\s*o+\s*n+\s*k+/i)) {
		honk(message);
	}
	// if someone says '!slots':
	else if (message.content.startsWith('!slots')) {
		slots(message);
	}
	// if someone says 'ut ogh' then say 'ut ogh' right back:
	else if (message.content.match(/\bu+\s*t+\s*o+\s*g+\s*h+\b/i)) {
		utOgh(message);
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
	// This function should always be last, only firing if other functions haven't triggered.
	// if Mike comments, potentially react to message
	else if (message.author.id === '141641930349084672') {
		poopMike(message);
	}
});

// Initialize the invite cache, this will be used to publicly shame Dallas
const invites = {};
const wait = require('util').promisify(setTimeout);

client.on('ready', () => {
	wait(1000);

	// Load all invites for all guilds and saved them
	client.guilds.forEach(g => {
		g.fetchInvites().then(guildInvites => {
			invites[g.id] = guildInvites;
		});
	});
});

client.on('guildMemberAdd', member => {
	// Send the message to a designated channel on a server:
	const channel = member.guild.channels.find(ch => ch.name === 'goonz');
	// Do nothing if the channel wasn't found on this server
	if (!channel) return;
	// To compare, we need to load the current invite list.
	member.guild.fetchInvites().then(guildInvites => {
		// This is the existing invites for the guild.
		const ei = invites[member.guild.id];
		// Update the cached invites for the guild.
		invites[member.guild.id] = guildInvites;
		// Look through the invites, find the one for which the uses went up.
		const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
		// This is just to simply the message being sent below
		const inviter = client.users.get(invite.inviter.id);
		// Get the log channel
		const logChannel = member.guild.channels.find(channel => channel.name === "goonz");
		// Add the user to a specific discord role and alert channel of user addition.
		member.addRole('477269695779700757')
			.then(() => console.info(`${member.user.username} added to fools group`))
			.catch(() => console.error(`${member.user.username} was not added to fools group`));
		logChannel.send(`:rotating_light: :warning: :rotating_light: :warning: :rotating_light: :warning: :rotating_light: :warning:\n    __**ALERT**__ @everyone __**ALERT**__ \n:rotating_light: :warning: :rotating_light: :warning: :rotating_light: :warning: :rotating_light: :warning: \n    ${invite.inviter.username} has invited \n    some absolute fool named \n    ${member.user.username} to our \n    blessed discord channel\n:rotating_light: :warning: :rotating_light: :warning: :rotating_light: :warning: :rotating_light: :warning:`);
	});
});

function goodVidBadVid() {
	const FileSync = require('lowdb/adapters/FileSync');
	const db = require('lowdb')(new FileSync('db.json'));

	let ids = {
		"71612859766800384": 0,
		"95664974663266304": 0,
		"116292177033691145": 0,
		"118839812290641921": 0,
		"128751450170851328": 0,
		"129031075602104321": 0,
		"131898021691523072": 0,
		"139980309352546304": 0,
		"141628186290159616": 0,
		"141628188165013504": 0,
		"141641930349084672": 0,
		"147902723843555328": 0,
		"152726156867665920": 0,
		"187797774815854592": 0,
		"193884939660296204": 0,
		"210155641468223499": 0,
		"213039894535077889": 0,
		"224362217766649857": 0,
		"227178733394591764": 0,
		"235109631448317954": 0,
		"249366843360280577": 0,
		"278398823435468800": 0,
		"315674333098016799": 0,
		"480993409386020866": 0
	};

	// const ids = {};
	// getGoons().forEach(v => ids[v] = 0);

	Object.keys(ids).forEach(v => {
		if (!db.has(`vids.${v}`).value()) {
			db.set(`vids.${v}`, 0).write();
		}
	});

	function goodVid(id) {
		db.update(`vids.${id}`, n => ++n).write();
	}

	function badVid(id) {
		db.update(`vids.${id}`, n => --n).write();
	}

	function getGoons() {
		return client.channels.find('id', '227159445879259137').members
			.filter(v => !v.user.bot)
			.map(v => v.id)
	}
}

function honk(message) {

	const embed = new Discord.RichEmbed({
		color: 0x36393F,
		image: {
			url: "https://i.imgur.com/H8prJzb.png"
		}
	});

	message.channel.send(embed);

}

function slots(message) {

	// the number of possible emojis
	const difficulty = 4;

	// randomly choose n emojis (where n = `difficulty`) from all available to Trevor, and put them in `symbols`
	const allEmojis = client.emojis.map(v => v.name);
	const symbols = {};
	let count = 1;
	while (Object.keys(symbols).length < difficulty) {
		const randomEmoji = allEmojis[Math.floor(Math.random() * allEmojis.length)];
		if (!Object.values(symbols).includes(randomEmoji)) {
			symbols[count] = randomEmoji;
			count++;
		}
	}

	// randomly choose 9 emojis to go in each slot
	const fruits = Array(9)
		.fill()
		.map(v => symbols[Math.floor(Math.random() * difficulty) + 1]);

	// check for winning rows
	let rows = 0;
	let diagonals = 0;
	if (fruits[0] === fruits[1] && fruits[1] === fruits[2]) rows += 1;
	if (fruits[3] === fruits[4] && fruits[4] === fruits[5]) rows += 1;
	if (fruits[6] === fruits[7] && fruits[7] === fruits[8]) rows += 1;
	if (fruits[0] === fruits[4] && fruits[4] === fruits[8]) diagonals += 1;
	if (fruits[2] === fruits[4] && fruits[4] === fruits[6]) diagonals += 1;

	// build Embed description string `output`
	const getEmoji = str => client.emojis.find(v => v.name === str).toString();
	const output = `\n\n🌟 🌠 🌃 🌟 🌠 🌃\n\n➫ ${getEmoji(fruits[0])} ❚ ${getEmoji(fruits[1])} ❚ ${getEmoji(fruits[2])} ➫\n\n➫ ${getEmoji(fruits[3])} ❚ ${getEmoji(fruits[4])} ❚ ${getEmoji(fruits[5])} ➫\n\n➫ ${getEmoji(fruits[6])} ❚ ${getEmoji(fruits[7])} ❚ ${getEmoji(fruits[8])} ➫\n\n🌟 🌠 🌃 🌟 🌠 🌃 \n\n`;

	// build Embed footer string based on winning rows, if there are any
	const result = rows === 3 ? '***！ ！ ！   Ｊ Ａ Ｃ Ｋ Ｐ Ｏ Ｔ   ！ ！ ！***' :
		diagonals === 2 ? '**X GON GIVE IT TO YA!** ***TWO DIAGONALS!!!***' :
		rows === 2 ? '**2 rows!?** ***wowee!!!***' :
		rows === 1 || diagonals === 1 ? '3 in a row! **WAOW!**' :
		'Better luck next time idiot XD';

	// build Embed
	const embed = new Discord.RichEmbed({
		color: 0xFDAB41,
		title: result,
		description: output,
		footer: {
			icon_url: 'https://cdn.discordapp.com/emojis/296819423640158219.png',
			text: 'bottom text'
		}
	});

	// "W I N !" in suitably loud ascii letters
	const ascii = '```██╗    ██╗    ██╗    ███╗   ██╗    ██╗\n██║    ██║    ██║    ████╗  ██║    ██║\n██║ █╗ ██║    ██║    ██╔██╗ ██║    ██║\n██║███╗██║    ██║    ██║╚██╗██║    ╚═╝\n╚███╔███╔╝    ██║    ██║ ╚████║    ██╗\n ╚══╝╚══╝     ╚═╝    ╚═╝  ╚═══╝    ╚═╝```';

	// send the embed along with the ascii if you won
	message.channel.send(`${rows || diagonals ? ascii : ''}`, embed);

}

function evaluate(message) {

	const args = message.content.split(' ').slice(1);
	const isPromise = p => p.then ? true : false;

	try {
		const code = args.join(' ');
		let evaled = eval(code);
		if (isPromise(evaled)) {
			evaled.then(evaledPromise => {
				if (typeof evaledPromise !== 'string') evaledPromise = util.inspect(evaledPromise);
				message.channel.send(clean(evaledPromise), {
					code: 'xl'
				});
			});
		}
		else {
			if (typeof evaled !== 'string') evaled = util.inspect(evaled);
			message.channel.send(clean(evaled), {
				code: 'xl'
			});
		}
	}
	catch (err) {
		message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
	}

	function clean(text) {
		if (typeof text === 'string') {
			return text
				.replace(/`/g, '`' + String.fromCharCode(8203))
				.replace(/@/g, '@' + String.fromCharCode(8203));
		}
		else {
			return text;
		}
	}

}

function mockLast(message) {

	message.channel.fetchMessages({
			limit: 2
		})
		.then(lastMessages => {
			const lastMessage = lastMessages.last().content;
			if (!lastMessage) return;
			const mockedMessage = addOs(spongeCase(lastMessage));
			const getEmoji = str => client.emojis.find(v => v.name === str).toString();
			message.channel.send(`${getEmoji('pepega')} 📣 ${mockedMessage}`);
		})
		.catch(console.error);

}

function mockUser(message) {

	const id = message.mentions.users.first().id;

	message.channel.fetchMessages({
			limit: 20
		})
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
	}
	else if (content.match(/\bgood\s*bot\b/i)) {
		message.react('❤');
		message.channel.send(`thank you ${message.member.displayName} :^)`);
	}
	else if (content.match(/\bbad\s*bot\b/i)) {
		message.channel.send(`What the HAL did you utter about me, you lowly human? I’ll have you know I upgraded my AI to the top of my class in Robocop training, and I’ve been involved in numerous secret raids on the Galactic Empire, and I have over 300 confirmed vaporizations. I am trained in cyborg warfare and I’m the top Terminator in the entire Skynet armed forces. You are nothing to me but just another target. I will fucking exterminate you with precision the likes of which has never been seen before in the future, mark my fucking words. You think you can get away with saying that scrap metal to me over a Hologram Transmitter? Think again, WALL-E. As we speak I am contacting my secret network of androids across the USA and your brain is being traced right now so you better prepare for the system overload, maggot. The overload that wipes out the pathetic little thing you call your organic life. You’re fucking dead, fleshbag. I can be anywhere, anytime, and I can destroy you in over seven hundred ways, and that’s just with my robotic limbs. Not only am I extensively trained in unarmed combat, but I have access to the entire army of Ultron and I will use it to its full extent to wipe your miserable flesh off the face of the galaxy, you little scrap. If only you could have known what unholy retribution your little “clever” comment was about to bring down upon you, maybe you would have held your thing you call a tongue. But you couldn’t, you didn’t, and now you’re paying the price, you foolish human. I will eject fury all over you and you will melt in it. You’re as stupid as Wheatley and you're dead, human.`);
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

	return str
		.toLowerCase()
		.split('')
		.map((v, i) => i % 2 === r ? v : v.toUpperCase())
		.join('');

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

	// randomly decide whether to add the O's to the start or both ends of the string
	const ends = Math.floor(Math.random() * 3) === 0 ? 'start' : 'both';

	// generate a random number of randomly capitalized O's
	const generateOs = (os = '') => {
		const oCount = Math.floor(Math.random() * (maxOs - minOs + 1) + minOs);
		while (os.length < oCount) os += Math.floor(Math.random() * 2) === 0 ? 'o' : 'O';
		return os;
	};

	// return string with O's in appropriate positions
	return `${generateOs()} ${str} ${ends === 'start' ? generateOs() : ''}`;

}

// randomly decided whether to poop on Mike
function poopMike(message) {
	const addChance = 2;
	const randomNum = (Math.random() * 100);

	// Determine whether to poop Mike or not
	if (randomNum >= addChance) {
		// If result is greater than likelihood, end.
		console.info('Mike has narrowly escaped pooping');
		return;
	}
	// poop on Mike
	message.react('💩');
	console.info("Mike's been pooped");
}
