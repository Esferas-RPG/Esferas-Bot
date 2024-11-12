import { ApplicationCommandOptionType, CommandInteraction, EmbedBuilder, GuildMember, InteractionReplyOptions, TextChannel, User } from "discord.js";
import { Discord, Slash, SlashGroup, Guild, SlashOption } from "discordx";
import { IValidateCharacterProps } from "../../interfaces/index.js";
import { ApiService } from "../../services/index.js";
import { injectable } from "tsyringe";

@Discord()
@Guild("1288321418089725982", "958940026991943710")
@SlashGroup({ description: "Aprovar ficha do jogador", name: "aprovar" })
@injectable()
class AprovarFicha {
    data: IValidateCharacterProps;
    constructor() {
        this.data = {};
    }

    @Slash({ description: "Comando para aprovar ficha do jogador" })
    @SlashGroup("aprovar")
    async ficha(
        @SlashOption({
            description: "Link do Log a ser deletado",
            name: "link",
            required: true,
            type: ApplicationCommandOptionType.String,
        }) logsLink: string,

        @SlashOption({
            description: "Marque o player dono da ficha",
            name: "player",
            required: true,
            type: ApplicationCommandOptionType.User,
        }) player: GuildMember,

        interaction: CommandInteraction
    ) {
        try {
            const requiredRoles = ["Recrutamento", "Administração"];
            const member = interaction.member as GuildMember;
            this.data.logsLink = logsLink;

            const hasRequiredRoles = requiredRoles.some(roleName =>
                member.roles.cache.some(role => role.name.includes(roleName))
            );

            if (!hasRequiredRoles) {
                await interaction.deferReply();
                await interaction.followUp("‎ ");
                await interaction.deleteReply();
                await interaction.followUp({
                    content: "Você não tem permissão para clicar neste botão.",
                    ephemeral: true
                } as InteractionReplyOptions);
                return;
            }

            await interaction.deferReply();

            const api = new ApiService(interaction);
            let apiRes;

            try {
                apiRes = await api.validateCharacterResponse(this.data);
            } catch (apiError) {
                console.error("Erro ao validar resposta da API:", apiError);
                await interaction.followUp({ content: "Ocorreu um erro ao validar a ficha do jogador." });
                return;
            }

            if (apiRes.conclusion.includes("Novo aventureiro registrado!")) {
                const { characterName, characterRace, characterClass, characterBackground, characterGuild, characterImageLink } = apiRes.playerData;

                await interaction.followUp({
                    content: `${player} o seu personagem ${characterName} foi aprovado`
                });

                const channelId = '1291567595799056425';

                const embed = new EmbedBuilder()
                    .setTitle("Aprovação de Ficha")
                    .setDescription("Novo aventureiro registrado com sucesso!")
                    .addFields(
                        {
                            name: "Informações do Personagem",
                            value: `• **Nome do Personagem:** ${characterName}\n• **Raça:** ${characterRace}\n• **Classe:** ${characterClass}\n• **Antecedente:** ${characterBackground}\n• **Guilda:** ${characterGuild}\n• **Imagem:**`,
                            inline: false
                        }
                    )
                    .setImage(characterImageLink || "")
                    .setColor("#00ff00");

                try {
                    const emojis = [
                        { guild: "Guilda Hasperia", emoji: "🎭" },
                        { guild: "Guilda Belkaris", emoji: "🧭" },
                        { guild: "Guilda Hian", emoji: "⚔️" },
                        { guild: "Guilda Asael", emoji: "🪽" },
                        { guild: "Guilda Argyris", emoji: "🪙" },
                        { guild: "Guilda Quinn", emoji: "🔮" },
                        { guild: "Guilda Marx", emoji: "🛠️" }
                    ];

                    const guildEmoji = emojis.find(e => e.guild === characterGuild)?.emoji

                    const targetChannel = await interaction.client.channels.fetch(channelId) as TextChannel;
                    if (targetChannel) {
                        await targetChannel.send({ content: `${player} Seja bem vindo a ${characterGuild}!`, embeds: [embed] });
                        await player.setNickname(`𖥔${guildEmoji}𖥔 ‧₊˚ ${characterName}`)
                    } else {
                        console.log("Canal não encontrado ou não é um canal de texto.");
                    }
                } catch (channelError) {
                    console.error("Erro ao enviar mensagem para o canal:", channelError);
                    await interaction.followUp({ content: "Ocorreu um erro ao tentar enviar a mensagem para o canal específico." });
                }
            } else {
                await interaction.followUp({
                    content: `${apiRes.conclusion}`
                });
                return;
            }
        } catch (error) {
            console.error("Erro inesperado:", error);
            await interaction.followUp({
                content: "Ocorreu um erro inesperado ao executar o comando.",
                ephemeral: true
            });
        }
    }
}
