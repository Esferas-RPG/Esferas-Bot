import type { ArgsOf, Client } from "discordx";
import { Discord, On } from "discordx";
import { injectable } from "tsyringe";
import { IntentsBitField } from "discord.js";

@Discord()
@injectable()
export class GuildEvents {
  // Evento quando o bot entra em uma guilda
  @On({ event: "guildCreate" })
  onGuildCreate([guild]: ArgsOf<"guildCreate">, client: Client): void {
    const defaultChannel = guild.systemChannelId
      ? guild.channels.cache.get(guild.systemChannelId)
      : null;

    if (defaultChannel && defaultChannel.isTextBased()) {
      defaultChannel.send(`Obrigado por me adicionar ao servidor, ${guild.name}! Estou pronto para ajudar.`);
    } else {
      console.log(`Não foi possível encontrar um canal padrão no servidor ${guild.name}`);
    }
  }
}
