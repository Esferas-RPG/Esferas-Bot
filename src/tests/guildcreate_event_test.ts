import {PermissionFlagsBits, type CommandInteraction, type Guild, type GuildMemberRoleManager} from "discord.js";
import type {Client} from 'discordx';
import { Discord, Slash } from "discordx";
import {injectable} from 'tsyringe';

@Discord()
@injectable()
export class TestComnands {
    private allowedRoleId = '1294142903345479701'

    @Slash({
        name: 'test_guild',
        dmPermission: false,
        description: "Testa o evento de entrada na guilda",
        defaultMemberPermissions: PermissionFlagsBits.Administrator,
    })
    async testGuild(interaction: CommandInteraction, client: Client): Promise<void> {
        const member = interaction.member?.roles as GuildMemberRoleManager;
        const hasRole = member?.cache.has(this.allowedRoleId);

        if (!hasRole) {
            await interaction.reply("Você não tem permissão para usar este comando.");
            return;
        }

        const guild: Guild | undefined = client.guilds.cache.get(interaction.guildId ?? "");

        if (guild) {
            client.emit('guildCreate', guild);
            await interaction.reply(`Simulado a entrada na guilda: ${guild.name}`);
        }else {
            await interaction.reply(`Guilda não encontrada.`)
        }
    }
}
