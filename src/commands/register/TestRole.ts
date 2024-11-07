import { CommandInteraction, GuildMember } from "discord.js";
import { Discord, Guild, Slash } from "discordx";
import { MessageService } from "../../services/index.js";
import { inject, injectable } from "tsyringe";

@Discord()
@injectable()
@Guild("958940026991943710")
export class TesteMessage {
    constructor(@inject(MessageService) private messageService: MessageService) {}

    @Slash({name: "sendmessage", description: 'send a message'})
    async execute(interaction: CommandInteraction) {
        const content = "Teste"
        this.messageService.sendReply(interaction, content)
    }
}
