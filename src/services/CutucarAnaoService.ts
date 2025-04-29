import { CommandInteraction, TextChannel } from 'discord.js';
import { injectable } from 'tsyringe';
import * as crypto from 'crypto';

@injectable()
export class CutucarAnaoService {
	async cutucarAnao(interaction: CommandInteraction) {
		const user = interaction.member?.user;

		const choose = (arr: readonly string[]): string => {
			if (arr.length === 0) {
				throw new Error(
					'O array está vazio e não é possível escolher um elemento.'
				);
			}
			return arr[crypto.randomInt(0, arr.length)]!;
		};

		const defaultMessages: readonly string[] = [
			`Não enche!`,
			`Vai cutucar o cu do outro`,
			`**Cara**, eu vou te bater.`,
			`**Para**`,
			`**VAI TOMAR NO CU**`,
		];

		const customMessages: Record<string, readonly string[]> = {
			'681082000291135490': [
				'Lisa, vai cutucar o cu do dimitre',
				'**Zanker Cutucou de volta**',
				'Tomar no cu Lisabela',
				'Se não for para ir beber, não enche o saco',
			],
			'517071325819305995': [
				'Porra luan, me deixa em paz carai',
				'Chatão tu em',
			],
			'887428623844397126': [
				'O anão **PUTO** te cutucou agressivamente de volta ',
			],
			'316023621367889920': ['Chato para caralho, mas funciono'],
		};

		try {
			const channel = interaction.channel as TextChannel;

			if (!channel) {
				throw new Error('Canal de texto inválido ou indefinido.');
			}

			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({ content: 'Você cutucou o anão!' });
			} else {
				await interaction.reply('Você cutucou o anão!');
			}

			let webhooks = await channel.fetchWebhooks();
			let webhook = webhooks.find((wh) => wh.name === 'Vechter Zanker');

			if (!webhook) {
				webhook = await channel.createWebhook({
					name: 'Vechter Zanker',
					avatar: 'https://i.imgur.com/CgBksj0.png',
				});
			}

			const messages: readonly string[] =
                Math.random() < 0.5
                ? customMessages[user?.id ?? ''] ?? defaultMessages
                : defaultMessages;

			await webhook.send({
				content: choose(messages),
			});

			// Mantém o webhook, não deleta pra evitar rate limit
		} catch (error: any) {
			console.error('Erro ao cutucar o anão:', error);

			try {
				if (interaction.replied || interaction.deferred) {
					await interaction.followUp({
						content: '**O anão está puto e não te responde**',
						ephemeral: true,
					});
				} else {
					await interaction.reply({
						content: '**O anão está puto e não te responde**',
						ephemeral: true,
					});
				}
			} catch (err) {
				console.error('Erro ao enviar mensagem de erro:', err);
			}
		}
	}
}
