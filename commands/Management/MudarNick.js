var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { ApplicationCommandOptionType, CommandInteraction, GuildMember, } from 'discord.js';
import { Discord, Guild, Slash, SlashChoice, SlashGroup, SlashOption, } from 'discordx';
import { allowedGuilds, guildEmojis } from '../../configs/index.js';
import { injectable } from 'tsyringe';
let AlterarNick = class AlterarNick {
    async nickname(user, guild, characterName, interaction) {
        try {
            const member = interaction.member;
            if (!member.permissions.has('ChangeNickname')) {
                await interaction.reply({
                    content: 'Você não tem permissão para alterar apelido.',
                    ephemeral: true,
                });
                return;
            }
            await user.setNickname(`𖥔${guild}𖥔 ‧₊˚ ${characterName}`);
            await interaction.reply({
                content: 'Nome do usuario alterado!',
                ephemeral: true,
            });
        }
        catch (error) {
            console.log(error);
        }
    }
};
__decorate([
    Slash({
        description: 'alterar nome',
        defaultMemberPermissions: ['ChangeNickname'],
    }),
    SlashGroup('mudar'),
    __param(0, SlashOption({
        description: 'Selecione o usuario',
        name: 'usuario',
        type: ApplicationCommandOptionType.User,
        required: true,
    })),
    __param(1, SlashOption({
        description: 'Selecione a guilda',
        name: 'guilda',
        type: ApplicationCommandOptionType.String,
        required: true,
    })),
    __param(1, SlashChoice(...guildEmojis.map((item) => ({
        name: `${item.guild} ${item.emoji}`,
        value: item.emoji,
    })))),
    __param(2, SlashOption({
        description: 'Nome do personagem',
        name: 'novo_nome',
        type: ApplicationCommandOptionType.String,
        required: true,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GuildMember, String, String, CommandInteraction]),
    __metadata("design:returntype", Promise)
], AlterarNick.prototype, "nickname", null);
AlterarNick = __decorate([
    Discord(),
    Guild(allowedGuilds),
    SlashGroup({ name: 'mudar', description: 'Alterar nome do caba' }),
    injectable()
], AlterarNick);
