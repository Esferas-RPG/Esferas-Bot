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
import { Discord, ButtonComponent, Guild, ModalComponent, Slash, SlashGroup, SlashOption, } from 'discordx';
import { injectable } from 'tsyringe';
import { allowedGuilds } from '../configs/index.js';
import { ApplicationCommandOptionType, GuildMember, CommandInteraction, ButtonInteraction, ModalSubmitInteraction, } from 'discord.js';
import { FichaService } from '../services/index.js';
let ControleFicha = class ControleFicha {
    _ficha;
    constructor(_ficha) {
        this._ficha = _ficha;
    }
    pedir(interaction) {
        this._ficha.pedir(interaction);
    }
    async generate(interaction) {
        this._ficha.generate(interaction);
    }
    async Form(interaction) {
        this._ficha.Form(interaction);
    }
    aprovar(logsLink, player, interaction) {
        this._ficha.aprovar(interaction, player, { logsLink: logsLink });
    }
    mover(fileLink, destinationLink, interaction) {
        this._ficha.move(interaction, {
            fileLink: fileLink,
            destinationLink: destinationLink,
        });
    }
    deletar(logsLink, interaction) {
        this._ficha.delete(interaction, { logsLink: logsLink });
    }
};
__decorate([
    Slash({ description: 'Pedir Ficha' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CommandInteraction]),
    __metadata("design:returntype", void 0)
], ControleFicha.prototype, "pedir", null);
__decorate([
    ButtonComponent(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ButtonInteraction]),
    __metadata("design:returntype", Promise)
], ControleFicha.prototype, "generate", null);
__decorate([
    ModalComponent(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ModalSubmitInteraction]),
    __metadata("design:returntype", Promise)
], ControleFicha.prototype, "Form", null);
__decorate([
    Slash({ description: 'Aprovar Ficha' }),
    __param(0, SlashOption({
        description: 'Link do Log a ser deletado',
        name: 'link',
        required: true,
        type: ApplicationCommandOptionType.String,
    })),
    __param(1, SlashOption({
        description: 'Marque o player dono da ficha',
        name: 'player',
        required: true,
        type: ApplicationCommandOptionType.User,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, GuildMember,
        CommandInteraction]),
    __metadata("design:returntype", void 0)
], ControleFicha.prototype, "aprovar", null);
__decorate([
    Slash({ description: 'Mover Ficha' }),
    __param(0, SlashOption({
        description: 'Link do Log a ser deletado',
        name: 'link',
        required: true,
        type: ApplicationCommandOptionType.String,
    })),
    __param(1, SlashOption({
        description: 'Marque o player dono da ficha',
        name: 'destiny',
        required: true,
        type: ApplicationCommandOptionType.String,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, CommandInteraction]),
    __metadata("design:returntype", void 0)
], ControleFicha.prototype, "mover", null);
__decorate([
    Slash({ description: 'Deletar Ficha' }),
    __param(0, SlashOption({
        description: 'Link do Log a ser deletado',
        name: 'link',
        required: true,
        type: ApplicationCommandOptionType.String,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, CommandInteraction]),
    __metadata("design:returntype", void 0)
], ControleFicha.prototype, "deletar", null);
ControleFicha = __decorate([
    Discord(),
    Guild(allowedGuilds),
    SlashGroup({ description: 'Controle de Ficha', name: 'ficha' }),
    SlashGroup('ficha'),
    injectable(),
    __metadata("design:paramtypes", [FichaService])
], ControleFicha);
