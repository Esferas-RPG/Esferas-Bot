import 'reflect-metadata'
import { CommandInteraction } from "discord.js";
import { injectable } from 'tsyringe';

@injectable()
export class MessageService {
    async sendReply(interaction: CommandInteraction, message: string) {
        await interaction.reply(message)
    }
}
