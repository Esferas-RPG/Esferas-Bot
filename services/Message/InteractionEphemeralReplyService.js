export default async function EphemeralReply(interaction, message) {
    await interaction.deferReply();
    await interaction.followUp('‎ ');
    await interaction.deleteReply();
    await interaction.followUp({
        content: message,
        ephemeral: true,
    });
}
