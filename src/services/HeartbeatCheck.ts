import { CommandInteraction, TextChannel } from 'discord.js';
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

		await channel.send('Teste testado em teste pelo testador!');
	}
}
