import { ActionRowBuilder, ApplicationCommandOptionType, ButtonBuilder, ButtonInteraction, ButtonStyle, CommandInteraction, EmbedBuilder, GuildMember, MessageActionRowComponentBuilder, Role, TextChannel, User } from "discord.js";
import { ButtonComponent, Discord, Guild, Slash, SlashChoice, SlashGroup, SlashOption } from "discordx";

@Discord()
class DeleteMessage {
    @Slash({description: "Apaga mensagens de um canal"})
    async apagarmensagens(@SlashOption({
        description: "Define a quantidade de mensagens a seram apagadas (100 se não for informado)",
        name: 'quantidade',
        type: ApplicationCommandOptionType.Number
    })
    quantidade: number,
    interaction: CommandInteraction) {
        let deletedMessages = 0;

        const channel = interaction.channel as TextChannel

        await interaction.deferReply({ ephemeral: true });

        try {
            while (true) {
                const messages = await channel.messages.fetch({limit: quantidade})
                if (messages.size === 0) break

                await channel.bulkDelete(messages)
                deletedMessages += messages.size
            }

            await interaction.editReply(`As mensagens do canal foram apagadas com sucesso! Total de mensagens deletadas: ${deletedMessages}`);
        } catch (error) {
            await interaction.editReply("Ocorreu um erro ao tentar apagar as mensagens. Tente novamente.");
        }
    }
}
