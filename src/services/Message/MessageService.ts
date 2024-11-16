import { injectable } from 'tsyringe';
import deleteMessage from './DeleteMessageService.js';
import { CommandInteraction } from 'discord.js';

@injectable()
export class MessageService {
	constructor() {}

	async deleteMessages(interaction: CommandInteraction, quantidade: number) {
		deleteMessage(interaction, quantidade);
	}
}
