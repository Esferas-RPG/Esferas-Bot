import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonInteraction,
	ButtonStyle,
	ChannelType,
	CommandInteraction,
	EmbedBuilder,
	GuildMember,
	InteractionDeferReplyOptions,
	InteractionReplyOptions,
	MessageActionRowComponentBuilder,
	ModalBuilder,
	ModalSubmitInteraction,
	TextChannel,
	TextInputBuilder,
	TextInputStyle,
	ThreadAutoArchiveDuration,
} from 'discord.js';
import { IMoveCharacterProps } from '../interfaces/index.js';
import { ApiService } from './index.js';
import { injectable } from 'tsyringe';
import {
	IDeleteCharacterProps,
	INewCharacterProps,
	IValidateCharacterProps,
} from 'src/interfaces/Api.js';
import { guildEmojis } from '../configs/index.js';
import EphemeralReply from './Message/InteractionEphemeralReplyService.js';
import { guildRegisterRoles } from '../configs/index.js';

@injectable()
export class FichaService {
	newCharacterdata: INewCharacterProps;
	constructor(private _apiService: ApiService) {
		this.newCharacterdata = {};
	}

	async move(interaction: CommandInteraction, data: IMoveCharacterProps) {
		const response: any =
			await this._apiService.moveCharacterResponse(data);
		EphemeralReply(
			interaction,
			response.message ? 'Ficha movida com sucesso!' : response
		);
	}

	async delete(interaction: CommandInteraction, data: IDeleteCharacterProps) {
		try {
			const requiredRoles = ['Recrutamento', 'Administração'];

			const member = interaction.member as GuildMember;

			const hasRequiredRoles = requiredRoles.some((roleName) =>
				member.roles.cache.some((role) => role.name.includes(roleName))
			);

			if (!hasRequiredRoles) {
				EphemeralReply(
					interaction,
					'Você não tem permissão para clicar neste botão.'
				);
				return;
			}

			const apiRes: any =
				await this._apiService.deleteCharacterResponse(data);

			if (!apiRes.message) {
				EphemeralReply(interaction, 'Não foi possivel apagar a ficha.');
				return;
			}

			EphemeralReply(interaction, 'Ficha deleta com sucesso!');
		} catch (error) {
			console.log(error);
		}
	}

	async pedir(interaction: CommandInteraction) {
		try {
			const guild = interaction.guild;
			const roles = await guild?.roles.fetch();
			const recrutadores = roles?.find((role) =>
				role.name.includes('Recrutamento')
			);
			const administradores = roles?.find((role) =>
				role.name.includes('Administração')
			);
			const user = interaction.member?.user;
			const channel = interaction.channel as TextChannel;

			const existingThread = channel.threads.cache.find(
				(t) => t.name === `Ficha de ${user?.username}`
			);

			if (existingThread) {
				return interaction.reply({
					content: `Já existe uma thread chamada "Ficha de ${user?.username}"`,
					ephemeral: true,
				});
			}

			const thread = await channel.threads.create({
				name: `Ficha de ${user?.username}`,
				autoArchiveDuration: ThreadAutoArchiveDuration.OneHour,
				type: ChannelType.PrivateThread,
				invitable: false,
			});

			this.newCharacterdata.playerId = user?.id; // Salva o ID do usuário em data

			if (!recrutadores || !administradores) {
				interaction.reply(`Role não existe`);
				return;
			}

			const webhooks = await channel.fetchWebhooks();
			let webhook = webhooks.find((wh) => wh.name === 'Registrador');

			if (!webhook) {
				webhook = await channel.createWebhook({
					name: 'Registrador',
				});
			}

			// await thread.members.add(`${user?.id}`)
			const tMessage = await thread.send({
				content: `<@&${recrutadores?.id}> ${user}`,
			});

			setTimeout(() => {
				tMessage
					.delete()
					.catch((error) => console.log('Erro ao excluir', error));
			}, 1000);

			const btn = new ButtonBuilder()
				.setLabel('Gerar Log')
				.setStyle(ButtonStyle.Primary)
				.setCustomId('generate');

			const rowButton =
				new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(
					btn
				);

			await webhook.send({
				content: `<@&${recrutadores?.id}> ${user}`,
				threadId: thread.id,
				allowedMentions: {
					roles: [`${recrutadores?.id}`],
				},
				components: [rowButton],
			});

			await webhook.delete();

			const registrationMessage = await interaction.reply({
				content: `<#${thread.id}> criado! aguarde um <@&${recrutadores?.id}> atender sua solicitação!`,
				ephemeral: true,
			});
		} catch (error) {
			console.error('Erro ao criar', error);
		}
	}

	async generate(interaction: ButtonInteraction) {
		try {
			if (!interaction.isButton()) return;

			const requiredRoles = ['Recrutamento', 'Administração'];

			const member = interaction.member as GuildMember;

			const hasRequiredRoles = requiredRoles.some((roleName) =>
				member.roles.cache.some((role) => role.name.includes(roleName))
			);

			const user = member.user;

			this.newCharacterdata.registerId = user?.id;

			if (!hasRequiredRoles) {
				await interaction.deferReply();
				await interaction.followUp('‎ ');
				await interaction.deleteReply();
				await interaction.followUp({
					content: 'Você não tem permissão para clicar neste botão.',
					ephemeral: true,
				} as InteractionReplyOptions);
				return;
			}

			const modal = new ModalBuilder()
				.setTitle('Informação da Ficha')
				.setCustomId('Form');

			const characterName = new TextInputBuilder()
				.setCustomId('characterName')
				.setLabel('Nome do Personagem ou do Player')
				.setStyle(TextInputStyle.Short);

			const row = new ActionRowBuilder<TextInputBuilder>().addComponents(
				characterName
			);
			modal.addComponents(row);

			await interaction.showModal(modal);
		} catch (error) {
			console.log('Erro', error);
		}
	}

	async Form(interaction: ModalSubmitInteraction): Promise<void> {
		try {
			const characterName =
				interaction.fields.getTextInputValue('characterName');

			this.newCharacterdata.newCharacterName = characterName; // passar o valor de newCharacterName em data como sendo characterName

			await interaction.deferReply();

			const apiRes: any = await this._apiService.newCharacterResponse(
				this.newCharacterdata
			);

			await interaction.followUp({
				content: `Ficha criada \nSegue o link: \n${apiRes.url}`,
			} as InteractionDeferReplyOptions);
		} catch (error) {
			console.log(error);
		}
	}

	async aprovar(
		interaction: CommandInteraction,
		player: GuildMember,
		data: IValidateCharacterProps
	) {
		try {
			const requiredRoles = ['Recrutamento', 'Administração'];
			const member = interaction.member as GuildMember;

			const hasRequiredRoles = requiredRoles.some((roleName) =>
				member.roles.cache.some((role) => role.name.includes(roleName))
			);

			if (!hasRequiredRoles) {
				await interaction.deferReply();
				await interaction.followUp('‎ ');
				await interaction.deleteReply();
				await interaction.followUp({
					content: 'Você não tem permissão para clicar neste botão.',
					ephemeral: true,
				} as InteractionReplyOptions);
				return;
			}

			await interaction.deferReply();

			let apiRes;

			try {
				apiRes = await this._apiService.validateCharacterResponse(data);
			} catch (apiError) {
				console.error('Erro ao validar resposta da API:', apiError);
				await interaction.followUp({
					content: 'Ocorreu um erro ao validar a ficha do jogador.',
				});
				return;
			}

			if (apiRes.conclusion.includes('Novo aventureiro registrado!')) {
				const {
					characterName,
					characterRace,
					characterClass,
					characterBackground,
					characterGuild,
					characterImageLink,
				} = apiRes.playerData;

				await interaction.followUp({
					content: `${player} o seu personagem ${characterName} foi aprovado`,
				});

				const channelId = '1291567595799056425';

				const embed = new EmbedBuilder()
					.setTitle('Aprovação de Ficha')
					.setDescription('Novo aventureiro registrado com sucesso!')
					.addFields({
						name: 'Informações do Personagem',
						value: `• **Nome do Personagem:** ${characterName}\n• **Raça:** ${characterRace}\n• **Classe:** ${characterClass}\n• **Antecedente:** ${characterBackground}\n• **Guilda:** ${characterGuild}\n• **Imagem:**`,
						inline: false,
					})
					.setImage(characterImageLink || '')
					.setColor('#00ff00');

				try {
					const guildEmoji: any = guildEmojis.find(
						(e) => e.guild === characterGuild
					);

					const targetChannel =
						(await interaction.client.channels.fetch(
							channelId
						)) as TextChannel;
					if (targetChannel) {
						await targetChannel.send({
							content: `${player} Seja bem vindo a ${characterGuild}!`,
							embeds: [embed],
						});
						await player.setNickname(
							`𖥔${guildEmoji?.emoji}𖥔 ‧₊˚ ${characterName}`
						);

						await player.roles.remove(
							guildRegisterRoles.noRegisteredRoleId
						);
						await player.roles.add([
							guildRegisterRoles.registeredRoleId,
							guildEmoji?.roleId,
							guildRegisterRoles.inicianteRoleId,
						]);
					} else {
						console.log(
							'Canal não encontrado ou não é um canal de texto.'
						);
					}
				} catch (error: any) {
					if (error.code === 50013) {
						// Verifica o código de erro `Missing Permissions`
						console.error(
							'Erro: Permissões ausentes para alterar o nickname ou enviar mensagem no canal.'
						);

						await interaction.deferReply();
						await interaction.followUp('‎ ');
						await interaction.deleteReply();
						await interaction.followUp({
							content:
								'Desculpe, mas o bot não tem permissão para alterar o apelido do usuário ou enviar mensagens neste canal.',
							ephemeral: true,
						});
					} else {
						// Tratamento genérico para outros erros
						console.error(
							'Erro ao enviar mensagem para o canal:',
							error
						);
						await interaction.deferReply();
						await interaction.followUp('‎ ');
						await interaction.deleteReply();
						await interaction.followUp({
							content:
								'Ocorreu um erro ao tentar enviar a mensagem para o canal específico.',
							ephemeral: true,
						});
					}
				}
			} else {
				await interaction.followUp({
					content: `${player} \n ${apiRes.conclusion}`,
				});
				return;
			}
		} catch (error) {
			console.error('Erro inesperado:', error);
			await interaction.followUp({
				content: 'Ocorreu um erro inesperado ao executar o comando.',
				ephemeral: true,
			});
		}
	}
}
