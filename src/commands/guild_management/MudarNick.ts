import { ApplicationCommandOptionType, CommandInteraction, GuildMember, User } from "discord.js";
import { Discord, Guild, Slash, SlashGroup, SlashOption } from "discordx";
import { injectable } from "tsyringe";

@Discord()
@Guild("1288321418089725982", "958940026991943710")
@SlashGroup({name: "mudar", description: "Alterar nome do caba"})
class AlterarNick {
    @Slash({description: "alterar nome"})
    @SlashGroup("mudar")
    async nick(@SlashOption({
        description: "Nome do personagem",
        name: "user",
        type: ApplicationCommandOptionType.User,
        required: true
    }) @SlashOption({
        description: "Nome do personagem",
        name: "name",
        type: ApplicationCommandOptionType.String,
        required: true
    }) user: GuildMember, characterName: string, interaction: CommandInteraction) {
        try {
            const member = interaction.member as GuildMember

            if (!member.permissions.has("ChangeNickname")) {
                await interaction.reply({
                    content: "Você não tem permissão para alterar o próprio apelido.",
                    ephemeral: true,
                });
                return;
            }

            await user.setNickname(`${characterName}`)

            await interaction.reply({
                content: "Nome do usuario alterado!",
                ephemeral: true
            })
        } catch (error) {
            console.log(error);
        }

    }
}
