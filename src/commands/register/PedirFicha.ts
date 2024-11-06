import { ChannelType, CommandInteraction, TextChannel, ThreadAutoArchiveDuration } from "discord.js";
import { Discord, Guild, Slash, SlashGroup } from "discordx";

@Discord()
@Guild("1288321418089725982", "958940026991943710")
@SlashGroup({description: "Registro de jogadores", name: "pedir"})
class PedirFicha {
    @Slash({description: "Pedir ficha"})
    @SlashGroup("pedir")
    async ficha(interaction: CommandInteraction) {
        try {
            await interaction.deferReply()

            const guild = interaction.guild
            const roles = await guild?.roles.fetch()
            const recrutadores = roles?.find(role => role.name.includes("Recrutamento"))
            const user = interaction.member?.user
            const channel = interaction.channel as TextChannel

            const thread = await channel.threads.create({
                name: `Ficha de ${user?.username}`,
                autoArchiveDuration: ThreadAutoArchiveDuration.OneHour,
                type: ChannelType.PrivateThread,
                invitable: false
            })

            if(!recrutadores) {
                interaction.followUp(`Role não existe`)
                return
            }

            const webhooks = await channel.fetchWebhooks()
            let webhook = webhooks.find((wh) => wh.name === "Registrador")

            if(!webhook) {
                webhook = await channel.createWebhook({
                    name: "Registrador"
                })
            }

            // await thread.members.add(`${user?.id}`)
            const tMessage = await thread.send({
                content: `<@&${recrutadores?.id}> ${user}`
            })

            setTimeout(() => {
                tMessage.delete().catch(error => console.log("Erro ao excluir", error))
            }, 1000);

            await webhook.send({
                content: `<@&${recrutadores?.id}> ${user}`,
                threadId: thread.id,
                allowedMentions: {
                    roles: [`${recrutadores?.id}`]
                }
            })

            await webhook.delete()

            const registrationMessage = await interaction.followUp(`<@&${recrutadores?.id}>! <#${thread.id}> criado para o usuário ${user} `)

        } catch (error) {
            console.error("Erro ao criar", error)
        }
    }
}
