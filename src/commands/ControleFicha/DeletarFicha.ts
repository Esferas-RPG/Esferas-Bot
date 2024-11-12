import { ApplicationCommandOptionType, ChannelType, CommandInteraction, GuildMember, InteractionDeferReplyOptions, InteractionReplyOptions, TextChannel, ThreadChannel } from "discord.js";
import { Discord, Slash, SlashGroup, Guild, SlashOption } from "discordx";
import { ApiService } from "../../services/index.js";
import { IDeleteCharacterProps } from "../../interfaces/index.js";
import { injectable } from "tsyringe";

@Discord()
@Guild("1288321418089725982", "958940026991943710")
@SlashGroup({description: "Deletar ficha do jogador", name: "deletar"})
@injectable()
class DeleteFicha {
    data: IDeleteCharacterProps
    constructor() {
        this.data = {}
    }


    @Slash({description: "Comando para deletar ficha do jogador"})
    @SlashGroup("deletar")
    async ficha(
        @SlashOption({
            description: "Link do Log a ser deletado",
            name: "link",
            required: true,
            type: ApplicationCommandOptionType.String,
          })
          logsLink: string,
        interaction: CommandInteraction
    ) {
        try {
            await interaction.deferReply()

            this.data.logsLink = logsLink

            console.log(this.data)

            const requiredRoles = ["Recrutamento", "Administração"];

            const member = interaction.member as GuildMember;

            const hasRequiredRoles = requiredRoles.some(roleName =>
                member.roles.cache.some(role => role.name.includes(roleName))
            );

            if (!hasRequiredRoles) {
                await interaction.followUp("‎ ")
                await interaction.deleteReply()
                await interaction.followUp({
                    content: "Você não tem permissão para clicar neste botão.",
                    ephemeral: true
                } as InteractionReplyOptions);
                return;
            }

            const api = new ApiService(interaction);
            const apiRes = await api.deleteCharacterResponse(this.data);

            if (!apiRes.message) {
                await interaction.followUp("‎ ")
                await interaction.deleteReply()
                await interaction.followUp({
                    content: "Não foi possive deletar a ficha",
                    ephemeral: true
                } as InteractionReplyOptions)
                return
            }

            await interaction.followUp("‎ ")
            await interaction.deleteReply()
            await interaction.followUp({
                content: `Ficha deletada com sucesso`,
                ephemeral: true
            } as InteractionDeferReplyOptions);
        } catch (error) {
            console.log(error)
        }
    }
}
