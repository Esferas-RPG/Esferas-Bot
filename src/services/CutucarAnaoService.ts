import { CommandInteraction, TextChannel } from 'discord.js';
import { injectable } from 'tsyringe';
import * as crypto from 'crypto';

@injectable()
export class CutucarAnaoService {
    async cutucarAnao(interaction: CommandInteraction) {
        try {
            const choose = (arr: readonly string[]): string => {
                if (arr.length === 0) {
                    throw new Error("O array está vazio e não é possível escolher um elemento.");
                }
                return arr[crypto.randomInt(0, arr.length)];
            };

            const channel = interaction.channel as TextChannel;

            const message: readonly string[] = [
                `Não enche!`,
                `Vai cutucar o cu do outro`,
                `**Cara**, eu vou te bater.`,
                `**Para**`,
                `**VAI TOMAR NO CU**`
            ];

            interaction.reply('Você cutucou o anão!');

            const webhooks = await channel.fetchWebhooks();
            let webhook = webhooks.find((wh) => wh.name === 'Vechter Zanker');

            if (!webhook) {
                webhook = await channel.createWebhook({
                    name: 'Vechter Zanker',
                    avatar: 'https://i.imgur.com/CgBksj0.png',
                });
            }

            await webhook.send({
                content: choose(message), // Corrigido
            });

            await webhook.delete();
        } catch (error) {
            console.error('Erro ao cutucar o anão: ', error);
            await interaction.reply('**O anão está puto e não te responde**');
        }
    }
}