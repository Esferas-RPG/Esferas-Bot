import { CommandInteraction, EmbedBuilder, GuildMember } from 'discord.js';
import EphemeralReply from '../../services/Message/InteractionEphemeralReplyService.js';
import Reply from '../../services/Message/InteractionReplyService.js';

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

		this.exec();
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
		const membrosSemCargo: GuildMember[] = [];

		// 🔎 Verificar se os JOGADORES mencionados têm o cargo
		for (const id of memberIds) {
			if (!id) continue;

			const member = await this.interaction.guild.members
				.fetch(id)
				.catch(() => null);

			if (member) {
				if (member.roles.cache.has(emMissaoRole)) {
					members.push(member); // Armazena membros que estão em missão
				} else {
					membrosSemCargo.push(member); // Armazena quem não está em missão
				}
			}
		}

		// 🔴 Caso algum jogador não esteja em missão, avisar
		if (membrosSemCargo.length > 0) {
			const mencoesInvalidas = membrosSemCargo
				.map((m) => m.toString())
				.join(', ');
			return Reply(
				this.interaction,
				`❌ Os seguintes jogadores não estão em uma missão: ${mencoesInvalidas}`
			);
		}

		// ✅ Se todos estão em missão, remover o cargo
		for (const member of members) {
			try {
				await member.roles.remove(emMissaoRole);
			} catch (error) {
				console.error(
					`Erro ao remover cargo de ${member.user.tag}:`,
					error
				);
			}
		}

		// Criando embed para resposta
		const mentions = members
			.map((member) => `✦ ${member.toString()}`)
			.join('\n');

		const usersMentioned = members
			.map((member) => `${member.toString()}`)
			.join(' | ');

		const embed = new EmbedBuilder()
			.setTitle(`𓂃⊹ Missão Encerrada: ${this.nomeDaMissao}`)
			.addFields(
				{
					name: `☆̱ Mestre:`,
					value: `<@${this.interaction.user.id}>`,
					inline: true,
				},
				{
					name: '　ꜛ Participantes:',
					value: `${mentions}`,
					inline: false,
				},
				{
					name: '➥ Recompensas ˚‧｡:',
					value: `💰 Ouro: ${this.ouro}\n✨ XP: ${this.xp}`,
					inline: false,
				},
				{
					name: '♯ Data de conclusão ⋆ ₊   ˚ ⊹:',
					value: this.data,
					inline: true,
				}
			)
			.setColor('#00b0f4')
			.setTimestamp();

		await this.interaction.deferReply();
		await this.interaction.followUp({
			content: `|| ${usersMentioned} ||`,
			embeds: [embed],
		});
	}
}
