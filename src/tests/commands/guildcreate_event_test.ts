import {PermissionFlagsBits, type CommandInteraction, type Guild, type GuildMemberRoleManager} from "discord.js";
import type {Client, SimpleCommandMessage} from 'discordx';
import { Discord, SimpleCommand, Slash } from "discordx";
import {injectable} from 'tsyringe';

@Discord()
@injectable()
export class TestComnands {
    private allowedRoleId = '1294142903345479701'

    @SimpleCommand({
        name: 'test_guild',
        description: "Testa o evento de entrada na guilda",
    })
    async testGuild(command: SimpleCommandMessage, client: Client): Promise<void> {
        const member = command.message.member?.roles as GuildMemberRoleManager;
        const hasRole = member?.cache.has(this.allowedRoleId);

        if (!hasRole) {
            //await command.message.reply("Você não tem permissão para usar este comando.");
            return;
        }

        const guild: Guild | undefined = client.guilds.cache.get(command.message.guildId ?? "");

        if (guild) {
            client.emit('guildCreate', guild);
            //await command.message.reply(`Simulado a entrada na guilda: ${guild.name}`);
        }else {
            //await command.message.reply(`Guilda não encontrada.`)
        }
    }
}
