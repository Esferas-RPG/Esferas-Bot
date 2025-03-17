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
			description: 'Define a quantidade de mensagens a seram apagadas',
			name: 'quantidade',
			type: ApplicationCommandOptionType.Number,
			required: true,
		})
		quantidade: number,
		@SlashOption({
			description: 'Apaga as mensagens com o valor especificado',
			name: 'a_mensagem_contem',
			type: ApplicationCommandOptionType.String,
		})
		a_mensagem_contem: string,
		interaction: CommandInteraction
	) {
		this._messageService.deleteMessages(
			interaction,
			quantidade,
			a_mensagem_contem
		);
	}
}
