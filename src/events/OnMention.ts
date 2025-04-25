import { ArgsOf, Client, Discord, On } from 'discordx';
import { injectable } from 'tsyringe';
import { AIService } from '../services/index.js';

@Discord()
@injectable()
class OnMention {
	constructor(private _aiService: AIService) {}

	@On({ event: 'messageCreate' })
	async onMessage(
		[message]: ArgsOf<'messageCreate'>,
		client: Client
	): Promise<void> {
		if (message.author.bot) return;
		const wasMentioned = message.mentions.has(client.user?.id ?? '');

		if (!wasMentioned) return;

		const contentWithoutMention = message.content
			.replace(/<@!?(\d+)>/, '')
			.trim();

		if (contentWithoutMention.toLocaleLowerCase() !== '') {
			await this._aiService.sendWebhook({
				serverId: message.guild?.id ?? '',
				channelId: message.channel.id,
				userId: message.author.id,
				prompt: contentWithoutMention,
			});
		} else {
			await message.reply(
				'Desculpa mas sem nada eu não consigo entender o que você quer 😊'
			);
		}
	}
}
