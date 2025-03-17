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
import { CutucarAnaoService } from '../services/index.js';

@Discord()
@Guild(allowedGuilds)
@SlashGroup({ description: 'Controle de Missao', name: 'cutucar' })
@SlashGroup('cutucar')
@injectable()
class CutucarOAnao {
	constructor(private _anao: CutucarAnaoService) {}

	@Slash({ description: 'Iniciar Missão' })
	async o_anao(interaction: CommandInteraction) {
		this._anao.cutucarAnao(interaction);
	}
}
