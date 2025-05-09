import { IInteraction } from 'src/type';

export default async function EphemeralReply(
	interaction: IInteraction,
	message: string
) {
	await interaction.deferReply();
	await interaction.followUp('‎ ');
	await interaction.deleteReply();
	await interaction.followUp({
		content: message,
		ephemeral: true,
	});
}
