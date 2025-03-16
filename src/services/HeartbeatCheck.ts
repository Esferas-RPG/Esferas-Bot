import { CommandInteraction, EmbedBuilder, TextChannel } from 'discord.js';
import { Client } from 'discordx';
import { inject, injectable } from 'tsyringe';

@injectable()
export class HeartbeatService {
	private botStatusChannelId: string = '1288322074598703176';
	private apiStatusChannelId: string = '1288322074598703176';

	constructor(@inject(Client) private bot: Client) {}

	async sendHeartbeat() {
		const channel = this.bot.channels.cache.get(
			this.botStatusChannelId
		) as TextChannel;
		if (!channel) {
			console.error('Canal não encontrado');
			return;
		}

		const embed = new EmbedBuilder()
			.setColor(0x00ff00)
			.setTitle('💓 Heartbeat do Bot')
			.setDescription('O bot está online e funcionando corretamente!')
			.addFields(
				{ name: 'Status', value: '✅ Operacional', inline: true },
				{
					name: 'Última verificação',
					value: new Date().toLocaleString(),
					inline: true,
				}
			)
			.setTimestamp();

		await channel.send({ embeds: [embed] });
	}

	async checkApiHeartbeat() {
		const channel = this.bot.channels.cache.get(
			this.apiStatusChannelId
		) as TextChannel;
		if (!channel) {
			console.error('Canal não encontrado');
			return;
		}

		try {
			const response = await fetch(
				'https://esferas-bot-api.onrender.com/heartbeat'
			);
			const apiOnline = response.ok;

			const embed = new EmbedBuilder()
				.setColor(apiOnline ? 0x00ff00 : 0xff0000)
				.setTitle('💓 Heartbeat da API')
				.setDescription(
					apiOnline
						? 'A API está online e funcionando corretamente!'
						: 'A API está offline!'
				)
				.addFields(
					{
						name: 'Status',
						value: apiOnline ? '✅ Operacional' : '❌ Parado!',
						inline: true,
					},
					{
						name: 'Última verificação',
						value: new Date().toLocaleString(),
						inline: true,
					}
				)
				.setTimestamp();

			await channel.send({ embeds: [embed] });
		} catch (error) {
			console.error('Erro ao consultar a API:', error);
		}
	}

	startHeartbeatCheck() {
		this.checkApiHeartbeat(); // Primeira execução imediata
		setInterval(() => this.checkApiHeartbeat(), 30000); // Executa a cada 30 segundos
	}
}
