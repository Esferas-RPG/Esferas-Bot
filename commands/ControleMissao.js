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
import { Discord, Guild, Slash, SlashGroup, SlashOption, } from 'discordx';
import { injectable } from 'tsyringe';
import { allowedGuilds } from '../configs/index.js';
import { ApplicationCommandOptionType, CommandInteraction, } from 'discord.js';
import { MissaoService } from '../services/index.js';
let ControleMissao = class ControleMissao {
    _missao;
    constructor(_missao) {
        this._missao = _missao;
    }
    async iniciar(nomeDaMissao, jogadores, interaction) {
        this._missao.iniciaMissao(interaction, nomeDaMissao, jogadores);
    }
};
__decorate([
    Slash({ description: 'Iniciar Missão' }),
    __param(0, SlashOption({
        description: 'Insira o nome da missão',
        name: 'nome_da_missao',
        type: ApplicationCommandOptionType.String,
        required: true,
    })),
    __param(1, SlashOption({
        description: 'Mencione (@) os jogadores que participarão da missão',
        name: 'jogadores',
        type: ApplicationCommandOptionType.String,
        required: true,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, CommandInteraction]),
    __metadata("design:returntype", Promise)
], ControleMissao.prototype, "iniciar", null);
ControleMissao = __decorate([
    Discord(),
    Guild(allowedGuilds),
    SlashGroup({ description: 'Controle de Missao', name: 'missao' }),
    SlashGroup('missao'),
    injectable(),
    __metadata("design:paramtypes", [MissaoService])
], ControleMissao);
