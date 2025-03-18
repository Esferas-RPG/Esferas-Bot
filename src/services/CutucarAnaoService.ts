import { CommandInteraction, TextChannel } from 'discord.js';
import { IniciarMissao, EncerrarMissao } from '../modules/MissaoModules.js';
import { injectable } from 'tsyringe';

@injectable()
export class CutucarAnaoService {
	async cutucarAnao(interaction: CommandInteraction) {
		const channel = interaction.channel as TextChannel;

		interaction.reply('Você cutucou o anão!');

		const webhooks = await channel.fetchWebhooks();
		let webhook = webhooks.find((wh) => wh.name === 'Vechter Zanker');

		if (!webhook) {
			webhook = await channel.createWebhook({
				name: 'Vechter Zanker',
				avatar: 'https://media.discordapp.net/attachments/1348313985270681712/1351257220712763513/Token_Zanker.png?ex=67d9b7da&is=67d8665a&hm=8043dbfd53c70c51479a34aa6f3701b98b28c0a311c0b1d7cfc4898a69a34e10&=&format=webp&quality=lossless',
			});
		}

		await webhook.send({
			content: `Vai cutucar o cu do outro`,
		});

		await webhook.delete();
	}
}
