import { CommandInteraction, TextChannel } from 'discord.js';

export default async function deleteMessages(
	interaction: CommandInteraction,
	quantidade: number = 500
) {
	let deletedMessages = 0;
	const channel = interaction.channel as TextChannel;

	await interaction.deferReply({ ephemeral: true });

	try {
		while (deletedMessages < quantidade) {
			const remaining = quantidade - deletedMessages;
			const messages = await channel.messages.fetch({
				limit: Math.min(remaining, 100),
			});

			if (messages.size === 0) break;

			// Filtra mensagens com menos de 14 dias para evitar erros.
			const deletableMessages = messages.filter(
				(message) =>
					new Date().getTime() - message.createdTimestamp <
					14 * 24 * 60 * 60 * 1000
			);

			if (deletableMessages.size === 0) break;

			await channel.bulkDelete(deletableMessages, true);
			deletedMessages += deletableMessages.size;
		}

		await interaction.editReply(
			`As mensagens do canal foram apagadas com sucesso! Total de mensagens deletadas: ${deletedMessages}`
		);
	} catch (error) {
		console.error(error);
		await interaction.editReply(
			'Ocorreu um erro ao tentar apagar as mensagens. Tente novamente.'
		);
	}
}
