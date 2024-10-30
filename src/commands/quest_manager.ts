import { ApplicationCommandOptionType, CommandInteraction } from "discord.js";
import { Discord, Guild, Slash, SlashChoice, SlashGroup, SlashOption } from "discordx";

@Discord()
@Guild("958940026991943710", '1288321418089725982')
class QuestManager {
    @Slash({description: "Gerenciar Missão"})
    missao(
        @SlashChoice({name: "Iniciar", value: 'iniciar'})
        @SlashChoice({name: 'Terminar', value: 'terminar'})
        @SlashOption({
            description: 'O que deseja fazer?',
            name: 'acao',
            type: ApplicationCommandOptionType.String,
        })
        acao: string, interaction: CommandInteraction) {
            if(acao === 'iniciar') {
                interaction.reply('Iniciando missao!')
            }else if (acao === 'terminar') {
                interaction.reply('Finalizando Missao')
            }
    }
}
