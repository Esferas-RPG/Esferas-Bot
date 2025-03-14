export default async function Reply(interaction, message) {
    await interaction.deferReply();
    await interaction.followUp('‎ ');
    await interaction.deleteReply();
    await interaction.followUp({
        content: message,
    });
}
