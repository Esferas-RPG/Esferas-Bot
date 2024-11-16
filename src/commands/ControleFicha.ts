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
import { FichaService } from '../services/index.js';

@Discord()
@Guild(allowedGuilds)
@SlashGroup({ description: 'Controle de Ficha', name: 'ficha' })
@SlashGroup('ficha')
@injectable()
class ControleFicha {
	constructor(private _ficha: FichaService) {}

	@Slash({ description: 'Pedir Ficha' })
	pedir(interaction: CommandInteraction) {
		this._ficha.pedir(interaction);
	}

	@ButtonComponent()
	async generate(interaction: ButtonInteraction) {
		this._ficha.generate(interaction);
	}

	@ModalComponent()
	async Form(interaction: ModalSubmitInteraction) {
		this._ficha.Form(interaction);
	}

	@Slash({ description: 'Aprovar Ficha' })
	aprovar(
		@SlashOption({
			description: 'Link do Log a ser deletado',
			name: 'link',
			required: true,
			type: ApplicationCommandOptionType.String,
		})
		logsLink: string,

		@SlashOption({
			description: 'Marque o player dono da ficha',
			name: 'player',
			required: true,
			type: ApplicationCommandOptionType.User,
		})
		player: GuildMember,

		interaction: CommandInteraction
	) {
		this._ficha.aprovar(interaction, player, { logsLink: logsLink });
	}

	@Slash({ description: 'Mover Ficha' })
	mover(
		@SlashOption({
			description: 'Link do Log a ser deletado',
			name: 'link',
			required: true,
			type: ApplicationCommandOptionType.String,
		})
		fileLink: string,

		@SlashOption({
			description: 'Marque o player dono da ficha',
			name: 'destiny',
			required: true,
			type: ApplicationCommandOptionType.String,
		})
		destinationLink: string,

		interaction: CommandInteraction
	) {
		this._ficha.move(interaction, {
			fileLink: fileLink,
			destinationLink: destinationLink,
		});
	}

	@Slash({ description: 'Deletar Ficha' })
	deletar(
		@SlashOption({
			description: 'Link do Log a ser deletado',
			name: 'link',
			required: true,
			type: ApplicationCommandOptionType.String,
		})
		logsLink: string,

		interaction: CommandInteraction
	) {
		this._ficha.delete(interaction, { logsLink: logsLink });
	}
}
