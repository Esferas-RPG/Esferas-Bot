import {
	ApplicationCommandOptionType,
	CommandInteraction,
	GuildMember,
	User,
} from 'discord.js';
import {
	Discord,
	Guild,
	Slash,
	SlashChoice,
	SlashGroup,
	SlashOption,
} from 'discordx';
import { guildEmojis } from '../../configs/index.js';
import { injectable } from 'tsyringe';

@Discord()
@Guild('1288321418089725982', '958940026991943710')
@SlashGroup({ name: 'mudar', description: 'Alterar nome do caba' })
@injectable()
class AlterarNick {
	@Slash({ description: 'alterar nome' })
	@SlashGroup('mudar')
	async nick(
		@SlashOption({
			description: 'Selecione o usuario',
			name: 'usuario',
			type: ApplicationCommandOptionType.User,
			required: true,
		})
		user: GuildMember,

		@SlashOption({
			description: 'Selecione a guilda',
			name: 'guilda',
			type: ApplicationCommandOptionType.String,
			required: true,
		})
		@SlashChoice(
			...guildEmojis.map((item) => ({
				name: `${item.guild} ${item.emoji}`,
				value: item.emoji,
			}))
		)
		guild: string,

		@SlashOption({
			description: 'Nome do personagem',
			name: 'novo_nome',
			type: ApplicationCommandOptionType.String,
			required: true,
		})
		characterName: string,

		interaction: CommandInteraction
	) {
		try {
			const member = interaction.member as GuildMember;

			if (!member.permissions.has('ChangeNickname')) {
				await interaction.reply({
					content:
						'Você não tem permissão para alterar o próprio apelido.',
					ephemeral: true,
				});
				return;
			}

			await user.setNickname(`𖥔${guild}𖥔 ‧₊˚ ${characterName}`);

			await interaction.reply({
				content: 'Nome do usuario alterado!',
				ephemeral: true,
			});
		} catch (error) {
			console.log(error);
		}
	}
}
