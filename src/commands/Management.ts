import {
	ApplicationCommandOptionType,
	CommandInteraction,
	TextChannel,
} from 'discord.js';
import { Discord, Slash, SlashGroup, SlashOption } from 'discordx';
import { MessageService } from '../services/index.js';
import { injectable } from 'tsyringe';

@Discord()
@SlashGroup({ description: 'Apagar mensagens do canal', name: 'gerencia' })
@SlashGroup('gerencia')
@injectable()
class Management {
	constructor(private _messageService: MessageService) {}

	@Slash({
		description: 'Apaga mensagens de um canal',
		defaultMemberPermissions: ['ManageMessages'],
	})
	async apagar_mensagens(
		@SlashOption({
			description:
				'Define a quantidade de mensagens a seram apagadas (100 se não for informado)',
			name: 'quantidade',
			type: ApplicationCommandOptionType.Number,
		})
		quantidade: number,
		interaction: CommandInteraction
	) {
		this._messageService.deleteMessages(interaction, quantidade);
	}
}
