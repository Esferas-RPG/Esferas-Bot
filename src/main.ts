import 'reflect-metadata';
import { dirname, importx } from '@discordx/importer';
import type { Interaction, Message } from 'discord.js';
import { IntentsBitField } from 'discord.js';
import { Client, DIService, tsyringeDependencyRegistryEngine } from 'discordx';
import 'dotenv/config';
import { container } from 'tsyringe';
import express from 'express';

DIService.engine = tsyringeDependencyRegistryEngine.setInjector(container);

export const bot = new Client({
	intents: [
		IntentsBitField.Flags.Guilds,
		IntentsBitField.Flags.GuildMembers,
		IntentsBitField.Flags.GuildMessages,
		IntentsBitField.Flags.GuildMessageReactions,
		IntentsBitField.Flags.GuildVoiceStates,
		IntentsBitField.Flags.MessageContent,
	],

	silent: false,

	simpleCommand: {
		prefix: '!',
	},
});

bot.once('ready', async () => {
	await bot.guilds.fetch();

	await bot.initApplicationCommands();
	//   await bot.clearApplicationCommands()
	//   await bot.clearApplicationCommands(...bot.guilds.cache.map((g) => g.id))

	console.log('Bot started');
});

bot.on('interactionCreate', (interaction: Interaction) => {
	bot.executeInteraction(interaction);
});

bot.on('messageCreate', async (message: Message) => {
	await bot.executeCommand(message);
});

async function fetchApi() {
	try {
		const response = await fetch(
			'https://esferas-bot-api.onrender.com/heartbeat'
		);
		if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
		const data = await response.json();
		console.log('Heartbeat:', data);
	} catch (error) {
		console.error('Erro ao buscar dados:', error);
	}
}

async function run() {
	await importx(`${dirname(import.meta.url)}/{events,commands}/**/*.{ts,js}`);
	await importx(
		`${dirname(import.meta.url)}/{modules,services,interfaces}/**/*.{ts,js}`
	);

	if (!process.env.BOT_TOKEN) {
		throw Error('Could not find BOT_TOKEN in your environment');
	}

	await bot.login(process.env.BOT_TOKEN);

	fetchApi();
	setInterval(() => {
		fetchApi;
	}, 30000);
}

const app = express();
app.get('/', (req, res) => {
	res.send('Alive!');
});

app.listen('3000', () => {
	console.log('App está rodando!');
});

void run();
