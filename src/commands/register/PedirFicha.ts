import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, ChannelType, CommandInteraction, GuildMember, InteractionDeferReplyOptions, InteractionReplyOptions, MessageActionRowComponentBuilder, ModalBuilder, ModalSubmitInteraction, TextChannel, TextInputBuilder, TextInputStyle, ThreadAutoArchiveDuration } from "discord.js";
import { ButtonComponent, Discord, Guild, ModalComponent, Slash, SlashGroup } from "discordx";
import { ApiService } from "../../services/index.js";
import { IAPIData } from "../../interfaces/index.js";

@Discord()
@Guild("1288321418089725982", "958940026991943710")
@SlashGroup({description: "Registro de jogadores", name: "pedir"})
class PedirFicha {
    data: IAPIData
    constructor() {
        this.data = {}
    }

    @Slash({description: "Pedir ficha"})
    @SlashGroup("pedir")
    async ficha(interaction: CommandInteraction) {
        try {
            const guild = interaction.guild
            const roles = await guild?.roles.fetch()
            const recrutadores = roles?.find(role => role.name.includes("Recrutamento"))
            const user = interaction.member?.user
            const channel = interaction.channel as TextChannel

            const existingThread = channel.threads.cache.find(t => t.name === `Ficha de ${user?.username}`);

            if (existingThread) {
                return interaction.reply({
                    content: `Já existe uma thread chamada "Ficha de ${user?.username}"`,
                    ephemeral: true
                })
            }

            const thread = await channel.threads.create({
                name: `Ficha de ${user?.username}`,
                autoArchiveDuration: ThreadAutoArchiveDuration.OneHour,
                type: ChannelType.PrivateThread,
                invitable: false
            })

            this.data.playerId = user?.id; // Salva o ID do usuário em data


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
        try {
            if (!interaction.isButton()) return;

            // Verifica se o membro tem a role de "Recrutamento"
            const member = interaction.member as GuildMember;
            const hasRecruitmentRole = await member.roles.cache.some(role =>
                role.name.includes("Recrutamento")
            );

            const user = member.user

            this.data.recruiterId = user?.id; // Armazena o ID do recrutador em data

            if(!hasRecruitmentRole) {
                await interaction.followUp("‎ ")
                await interaction.deleteReply()
                await interaction.followUp({
                    content: "Você não tem permissão para clicar neste botão.",
                    ephemeral: true
                } as InteractionReplyOptions);
                return;
            }

            const modal = new ModalBuilder()
                .setTitle("Informação da Ficha")
                .setCustomId('Form')

            const characterName = new TextInputBuilder()
                .setCustomId('characterName')
                .setLabel("Nome do Personagem ou do Player")
                .setStyle(TextInputStyle.Short)

            const row = new ActionRowBuilder<TextInputBuilder>().addComponents(characterName)
            modal.addComponents(row)

            await interaction.showModal(modal)
        } catch (error) {
            console.log('Erro', error);
        }
    }

    @ModalComponent()
    async Form(interaction: ModalSubmitInteraction): Promise<void> {
        try {
            const characterName = interaction.fields.getTextInputValue("characterName");

            this.data.newCharacterName = characterName // passar o valor de newCharacterName em data como sendo characterName

            await interaction.deferReply();

            console.log(this.data)

            const api = new ApiService(interaction, this.data); // passar todos os valores anteriores combinados para a apiservice
            const apiRes = await api.response();

            await interaction.followUp({
                content: `Ficha criada \nSegue o link: \n${apiRes.url}`
            } as InteractionDeferReplyOptions);
        } catch (error) {
            console.log(error)
        }
    }
}
