import { ActionRowBuilder, ApplicationCommandOptionType, Attachment, AttachmentBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, CommandInteraction, EmbedBuilder, InteractionReplyOptions, MessageActionRowComponent, MessageActionRowComponentBuilder, ModalBuilder, ModalSubmitInteraction, TextInputBuilder, TextInputStyle } from "discord.js";
import { ButtonComponent, Client, Discord, Guild, ModalComponent, Slash, SlashChoice, SlashGroup, SlashOption } from "discordx";

interface FieldType {
    id: string
    label: string
    style: TextInputStyle
    placeholder?: string
}

interface ButtonType {
    id: string
    label: string
    style: ButtonStyle
}

@Discord()
@Guild('958940026991943710')
@SlashGroup({description: "manage quests", name: "criar"})
@SlashGroup('criar')
class CreateQuest {
    @ButtonComponent({id: 'subscribeBtn'})
    async subscribe(interaction: ButtonInteraction): Promise<void> {
        if(!interaction.isButton()) return

        await interaction.user.send("Para se inscrever na missão preencha o Formulário abaixo")

        await interaction.reply({ephemeral: true, content: 'Formulário de inscrição enviado!'} as InteractionReplyOptions)
    }

    @Slash({description: 'Create'})
    async missao(interaction: CommandInteraction): Promise<void> {
        const questModal = new ModalBuilder()
            .setTitle("Form")
            .setCustomId('MissaoForm')

        const fields: FieldType[] = [
            {id: 'nameInput', label: 'Nome da Missão', style: TextInputStyle.Short },
            {id: 'descriptionInput', label: 'Descrição da Missão', style: TextInputStyle.Paragraph},
            {id: 'imageUrlInput', label: 'URL da Imagem', style: TextInputStyle.Short, placeholder: 'Insira a URL da imagem' }
        ]

        const actionRows = fields.map(field => {
            const inputComponent = new TextInputBuilder()
                .setCustomId(field.id)
                .setLabel(field.label)
                .setStyle(field.style)

            if (field.placeholder) {
                inputComponent.setPlaceholder(field.placeholder)
            }

            return new ActionRowBuilder<TextInputBuilder>().addComponents(inputComponent)
        })


        questModal.addComponents(...actionRows)

        interaction.showModal(questModal)
    }

    @ModalComponent()
    async MissaoForm(interaction: ModalSubmitInteraction): Promise<void> {
        const [nameInput, descriptionInput, imageUrlInput] = ['nameInput', 'descriptionInput', 'imageUrlInput'].map((id) =>
            interaction.fields.getTextInputValue(id)
        )

        const buttons: ButtonType[] = [
            {id: 'subscribeBtn', label: 'Inscreva-se', style: ButtonStyle.Primary},
        ]

        const buttonRow = buttons.map(button => {
            const buttonComponent = new ButtonBuilder()
                .setCustomId(button.id)
                .setLabel(button.label)
                .setStyle(button.style)

            return new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(buttonComponent)
        })

        const embed = new EmbedBuilder()
            .setTitle(nameInput)
            .setDescription(descriptionInput || "Descrição não fornecida.")
            .setColor("#00FF00")

        if (imageUrlInput && imageUrlInput.match(/\.(jpeg|jpg|gif|png)$/)) {
            embed.setImage(imageUrlInput)
        } else {
            embed.addFields({name: "Aviso", value: "Imagem não válida ou não fornecida. Insira um link de imagem válido (jpeg, jpg, gif, png).", inline: true});
        }

        await interaction.reply({components: [...buttonRow], embeds: [embed]})

        return
    }
}
