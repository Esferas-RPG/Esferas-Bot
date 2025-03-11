import {
	Discord,
	ButtonComponent,
	Guild,
	ModalComponent,
	Slash,
	SlashGroup,
	SlashOption,
} from 'discordx';
import { injectable } from 'tsyringe';
import { allowedGuilds } from '../configs/index.js';
import {
	ApplicationCommandOptionType,
	GuildMember,
	CommandInteraction,
	ButtonInteraction,
	ModalSubmitInteraction,
} from 'discord.js';
import { MissaoService } from '../services/index.js';

@Discord()
@Guild(allowedGuilds)
@SlashGroup({ description: 'Controle de Missao', name: 'missao' })
@SlashGroup('missao')
@injectable()
class ControleMissao {
	constructor(private _missao: MissaoService) {}

	@Slash({ description: 'Iniciar Missão' })
	async iniciar(
		@SlashOption({
			description: 'Insira o nome da missão',
			name: 'nome_da_missao',
			type: ApplicationCommandOptionType.String,
			required: true,
		})
		nomeDaMissao: string,
		@SlashOption({
			description: 'Mencione (@) os jogadores que participarão da missão',
			name: 'jogadores',
			type: ApplicationCommandOptionType.String,
			required: true,
		})
		jogadores: string,
		interaction: CommandInteraction
	) {
		this._missao.iniciaMissao(interaction, nomeDaMissao, jogadores);
	}
}
