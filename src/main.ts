import 'reflect-metadata';
import { dirname, importx } from '@discordx/importer';
import type { Interaction, Message } from 'discord.js';
import { IntentsBitField } from 'discord.js';
import { Client, DIService, tsyringeDependencyRegistryEngine } from 'discordx';
import 'dotenv/config';
import { container } from 'tsyringe';
import express from 'express';
import { EventEmitter } from 'stream';
import { HeartbeatService } from './services/index.js';

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

container.registerInstance(Client, bot);

bot.once('ready', async () => {
	await bot.guilds.fetch();

	await bot.initApplicationCommands();
	// await bot.clearApplicationCommands(); // Limpa comandos globais
	// await bot.clearApplicationCommands(...bot.guilds.cache.map((g) => g.id)); // Limpa comandos de guilda

	console.log('Bot started');
});

bot.on('interactionCreate', (interaction: Interaction) => {
	bot.executeInteraction(interaction);
});

bot.on('messageCreate', async (message: Message) => {
	await bot.executeCommand(message);
});

async function run() {
	await importx(`${dirname(import.meta.url)}/{events,commands}/**/*.{ts,js}`);
	await importx(
		`${dirname(import.meta.url)}/{modules,services,interfaces}/**/*.{ts,js}`
	);

	if (!process.env.BOT_TOKEN) {
		throw Error('Could not find BOT_TOKEN in your environment');
	}

	await bot.login(process.env.BOT_TOKEN);
}

const app = express();

const heartbeatService = container.resolve(HeartbeatService);

app.get('/heartbeat', async (req, res) => {
	try {
		await heartbeatService.sendHeartbeat();
		res.json({ success: true, message: 'Heartbeat enviado!' });
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			error: 'Erro ao enviar heartbeat',
		});
	}
});

app.listen('3000', () => {
	console.log('App está rodando!');
});

void run();
