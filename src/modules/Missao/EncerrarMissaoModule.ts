import { CommandInteraction, GuildMember } from 'discord.js';
import EphemeralReply from '../../services/Message/InteractionEphemeralReplyService.js';

export default class EncerrarMissao {
	private interaction: CommandInteraction;
	private nomeDaMissao: string;
	private jogadores: string;
	private ouro: number;
	private xp: number;
	private data: string;
	constructor(
		interaction: CommandInteraction,
		nomeDaMissao: string,
		jogadores: string,
		ouro: number,
		xp: number,
		data: string
	) {
		this.interaction = interaction;
		this.nomeDaMissao = nomeDaMissao;
		this.jogadores = jogadores;
		this.ouro = ouro;
		this.xp = xp;
		this.data = data;
	}

	async exec() {
		if (!this.interaction.guild) {
			return this.interaction.reply(
				'Este comando só pode ser usado em servidores.'
			);
		}

		const mentionRegex = /<@!?(\d+)>/g;
		const memberIds = [...this.jogadores.matchAll(mentionRegex)].map(
			(match) => match[1]
		);

		if (memberIds.length === 0) {
			return EphemeralReply(
				this.interaction,
				'Nenhum membro mencionado.'
			);
		}

		const emMissaoRole = '1292978633505378425'; // ID do cargo
		const members: GuildMember[] = [];
		const membrosComCargo: GuildMember[] = [];

		// 🔎 Verificar se os JOGADORES mencionados têm o cargo
		for (const id of memberIds) {
			if (!id) continue;

			const member = await this.interaction.guild.members
				.fetch(id)
				.catch(() => null);

			if (member) {
				if (member.roles.cache.has(emMissaoRole)) {
					membrosComCargo.push(member); // Armazena membros já em missão
				} else {
					members.push(member); // Adiciona os que podem participar
				}
			}
		}

		if (membrosComCargo.length > 0) {
		} else {
		}
	}
}
