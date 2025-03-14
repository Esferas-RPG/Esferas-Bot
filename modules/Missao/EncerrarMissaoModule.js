import EphemeralReply from '../../services/Message/InteractionEphemeralReplyService.js';
export default class EncerrarMissao {
    interaction;
    nomeDaMissao;
    jogadores;
    ouro;
    xp;
    data;
    constructor(interaction, nomeDaMissao, jogadores, ouro, xp, data) {
        this.interaction = interaction;
        this.nomeDaMissao = nomeDaMissao;
        this.jogadores = jogadores;
        this.ouro = ouro;
        this.xp = xp;
        this.data = data;
    }
    async exec() {
        if (!this.interaction.guild) {
            return this.interaction.reply('Este comando só pode ser usado em servidores.');
        }
        const mentionRegex = /<@!?(\d+)>/g;
        const memberIds = [...this.jogadores.matchAll(mentionRegex)].map((match) => match[1]);
        if (memberIds.length === 0) {
            return EphemeralReply(this.interaction, 'Nenhum membro mencionado.');
        }
        const emMissaoRole = '1292978633505378425'; // ID do cargo
        const members = [];
        const membrosComCargo = [];
        // 🔎 Verificar se os JOGADORES mencionados têm o cargo
        for (const id of memberIds) {
            if (!id)
                continue;
            const member = await this.interaction.guild.members
                .fetch(id)
                .catch(() => null);
            if (member) {
                if (member.roles.cache.has(emMissaoRole)) {
                    membrosComCargo.push(member); // Armazena membros já em missão
                }
                else {
                    members.push(member); // Adiciona os que podem participar
                }
            }
        }
        if (membrosComCargo.length > 0) {
        }
        else {
        }
    }
}
