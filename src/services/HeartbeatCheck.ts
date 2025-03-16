import { CommandInteraction, EmbedBuilder, TextChannel } from 'discord.js';
import { Client } from 'discordx';
import { inject, injectable } from 'tsyringe';

@injectable()
export class HeartbeatService {
	constructor(@inject(Client) private bot: Client) {}

	async sendHeartbeat() {
		const channelId: string = '1288322074598703176';

		const channel = this.bot.channels.cache.get(channelId) as TextChannel;
		if (!channel) {
			console.error('Canal não encontrado');
			return;
		}

		const embed = new EmbedBuilder()
			.setColor(0x0099ff) // Cor azul
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
}
