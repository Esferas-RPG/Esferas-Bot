import { CommandInteraction } from 'discord.js';
import { IniciarMissao, EncerrarMissao } from '../modules/MissaoModules.js';
import { injectable } from 'tsyringe';

@injectable()
export class MissaoService {
	async iniciaMissao(
		interaction: CommandInteraction,
		nomeDaMissao: string,
		jogadores: string
	) {
		new IniciarMissao(interaction, nomeDaMissao, jogadores);
	}

	async encerrarMissao(
		interaction: CommandInteraction,
		nomeDaMissao: string,
		jogadores: string,
		ouro: number,
		xp: number,
		data: string
	) {
		new EncerrarMissao(
			interaction,
			nomeDaMissao,
			jogadores,
			ouro,
			xp,
			data
		);
	}
}
