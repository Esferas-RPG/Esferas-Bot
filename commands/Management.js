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
import { ApplicationCommandOptionType, CommandInteraction, } from 'discord.js';
import { Discord, Slash, SlashGroup, SlashOption } from 'discordx';
import { MessageService } from '../services/index.js';
import { injectable } from 'tsyringe';
let Management = class Management {
    _messageService;
    constructor(_messageService) {
        this._messageService = _messageService;
    }
    async apagar_mensagens(quantidade, interaction) {
        this._messageService.deleteMessages(interaction, quantidade);
    }
};
__decorate([
    Slash({
        description: 'Apaga mensagens de um canal',
        defaultMemberPermissions: ['ManageMessages'],
    }),
    __param(0, SlashOption({
        description: 'Define a quantidade de mensagens a seram apagadas (100 se não for informado)',
        name: 'quantidade',
        type: ApplicationCommandOptionType.Number,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, CommandInteraction]),
    __metadata("design:returntype", Promise)
], Management.prototype, "apagar_mensagens", null);
Management = __decorate([
    Discord(),
    SlashGroup({ description: 'Apagar mensagens do canal', name: 'gerencia' }),
    SlashGroup('gerencia'),
    injectable(),
    __metadata("design:paramtypes", [MessageService])
], Management);
