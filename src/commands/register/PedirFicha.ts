import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, ChannelType, CommandInteraction, GuildMember, InteractionReplyOptions, MessageActionRowComponentBuilder, Role, TextChannel, ThreadAutoArchiveDuration } from "discord.js";
import { ButtonComponent, Discord, Guild, Slash, SlashGroup } from "discordx";

@Discord()
@Guild("1288321418089725982", "958940026991943710")
@SlashGroup({description: "Registro de jogadores", name: "pedir"})
class PedirFicha {
    @Slash({description: "Pedir ficha"})
    @SlashGroup("pedir")
    async ficha(interaction: CommandInteraction) {
        try {
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
                interaction.reply(`Role não existe`)
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

            const btn = new ButtonBuilder()
                .setLabel("Gerar Log")
                .setStyle(ButtonStyle.Primary)
                .setCustomId("generate")

            const rowButton = new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(btn)

            await webhook.send({
                content: `<@&${recrutadores?.id}> ${user}`,
                threadId: thread.id,
                allowedMentions: {
                    roles: [`${recrutadores?.id}`]
                },
                components: [rowButton]
            })

            await webhook.delete()

            const registrationMessage = await interaction.reply({
                content: `<#${thread.id}> criado! aguarde um <@&${recrutadores?.id}> atender sua solicitação!`,
                ephemeral: true
            })

        } catch (error) {
            console.error("Erro ao criar", error)
        }
    }

    @ButtonComponent()
    async generate(interaction: ButtonInteraction) {
        if (!interaction.isButton()) return

        const member = interaction.member as GuildMember
        const recruiter = await member.roles.cache.some(role => role.name.includes("Recrutamento"))

        if(!recruiter) {
            await interaction.reply({
                content: "Você não tem permissão para usar este commando. Aguarde um recrutador",
                ephemeral: true
            })
            return
        }

        await interaction.reply({
            content: "Vovê é um recrutador parabens, pode usar o botao",
            ephemeral: true
        } as InteractionReplyOptions)

    }
}
