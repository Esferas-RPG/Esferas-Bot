import { CommandInteraction, EmbedBuilder, GuildMember } from 'discord.js';
import { injectable } from 'tsyringe';
import EphemeralReply from './Message/InteractionEphemeralReplyService.js';
import Reply from './Message/InteractionReplyService.js';

@injectable()
export class MissaoService {
	async iniciaMissao(
		interaction: CommandInteraction,
		nomeDaMissao: string,
		jogadores: string
	) {
		if (!interaction.guild) {
			return interaction.reply(
				'Este comando só pode ser usado em servidores.'
			);
		}

		const mentionRegex = /<@!?(\d+)>/g;
		const memberIds = [...jogadores.matchAll(mentionRegex)].map(
			(match) => match[1]
		);

		if (memberIds.length === 0) {
			return EphemeralReply(interaction, 'Nenhum membro mencionado.');
		}

		const emMissaoRole = '1292978633505378425'; // ID do cargo
		const members: GuildMember[] = [];
		const membrosComCargo: GuildMember[] = [];

		// 🔎 Verificar se o MESTRE tem o cargo
		const mestre = await interaction.guild.members.fetch(
			interaction.user.id
		);
		let mestreEmMissao = false;

		if (mestre.roles.cache.has(emMissaoRole)) {
			mestreEmMissao = true;
		}

		// 🔎 Verificar se os JOGADORES mencionados têm o cargo
		for (const id of memberIds) {
			if (!id) continue;

			const member = await interaction.guild.members
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

		// 🔴 Caso o mestre e/ou jogadores já estejam em missão, bloquear o início
		if (mestreEmMissao || membrosComCargo.length > 0) {
			let mensagem = '';

			if (mestreEmMissao) {
				mensagem += `❌ Você (${mestre.toString()}) já está em uma missão e não pode iniciar outra.\n\n`;
			}

			if (membrosComCargo.length > 0) {
				const mencoesBloqueadas = membrosComCargo
					.map((m) => m.toString())
					.join(', ');
				mensagem += `❌ Os seguintes jogadores já estão em uma missão e não podem participar: ${mencoesBloqueadas}`;
			}

			return Reply(interaction, mensagem);
		}

		// ✅ Se ninguém está em missão, adicionar o cargo aos jogadores
		for (const member of members) {
			try {
				await member.roles.add(emMissaoRole);
			} catch (error) {
				console.error(
					`Erro ao adicionar cargo a ${member.user.tag}:`,
					error
				);
			}
		}

		// Criando embed para resposta
		const mentions = members
			.map((member) => `• ${member.toString()}`)
			.join('\n');

		const embed = new EmbedBuilder()
			.addFields(
				{
					name: `Mestre:`,
					value: `<@${interaction.user.id}>`,
					inline: false,
				},
				{
					name: `Missão: ${nomeDaMissao}`,
					value: '­',
					inline: false,
				},
				{
					name: 'Jogadores:',
					value: `${mentions}`,
					inline: false,
				}
			)
			.setColor('#00b0f4')
			.setFooter({
				text: `Data de início: ${new Date().toLocaleString('pt-BR', {
					day: '2-digit',
					month: '2-digit',
					year: 'numeric',
					hour: '2-digit',
					minute: '2-digit',
					second: '2-digit',
				})}`,
			});

		const usersMentioned = members
			.map((member) => `${member.toString()}`)
			.join(' | ');

		await interaction.deferReply();
		await interaction.followUp({
			content: `|| ${usersMentioned} ||`,
			embeds: [embed],
		});
	}
}
