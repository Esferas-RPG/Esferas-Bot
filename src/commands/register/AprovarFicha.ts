import { ChannelType, CommandInteraction, TextChannel, ThreadChannel } from "discord.js";
import { Discord, Slash, SlashGroup, Guild } from "discordx";

// TODO: 1. Implementar funcionalidade de aprovar ficha
// TODO: 2. Decidir qual o destino final da Thread

@Discord()
@Guild("1288321418089725982", "958940026991943710")
@SlashGroup({description: "Aprovar ficha do jogador", name: "aprovar"})
class AprovarFicha {
    @Slash({description: "Comando para aprovar ficha do jogador"})
    @SlashGroup("aprovar")
    async ficha(interaction: CommandInteraction) {
        try {
            const channel = interaction.channel as ThreadChannel
            if(!channel.isThread()) {
                await interaction.reply({content: 'Esse comando não pode ser executado nesse tipo de canal, somente em um topico de ficha!', ephemeral: true})
                return
            }

            await interaction.reply(`${channel.name}`)

            // Deleta a thread (Temporário)
            await channel.delete()
        } catch (error) {
            console.log(error)
        }
    }
}
