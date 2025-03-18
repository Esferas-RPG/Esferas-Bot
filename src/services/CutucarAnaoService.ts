import { CommandInteraction, TextChannel } from 'discord.js';
import { IniciarMissao, EncerrarMissao } from '../modules/MissaoModules.js';
import { injectable } from 'tsyringe';
import * as crypto from 'crypto';

@injectable()
export class CutucarAnaoService {
	async cutucarAnao(interaction: CommandInteraction) {
		const channel = interaction.channel as TextChannel;
		
		const message: readonly string[] = [
			`Não enche!`,
			`Vai cutucar o cu do outro`,
			`Cara, eu vou te bater.`,
			`Para`,
			`VAI TOMAR NO CU`
		 ];
		const choose = <T>(arr: readonly T[]): T => {
			 const randomIndex = Math.floor(Math.random() * arr.length);
			return arr[randomIndex];
		};
										           
		//let randomIndex = Math.floor(Math.random()*message.length);

		interaction.reply('Você cutucou o anão!');

		const webhooks = await channel.fetchWebhooks();
		let webhook = webhooks.find((wh) => wh.name === 'Vechter Zanker');

		if (!webhook) {
			webhook = await channel.createWebhook({
				name: 'Vechter Zanker',
				avatar: 'https://i.imgur.com/CgBksj0.png',
			});
		}

		await webhook.send({
			content: choose(messages),
		});

		await webhook.delete();
	}
}
