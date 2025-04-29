import { CommandInteraction, TextChannel } from 'discord.js';
import { injectable } from 'tsyringe';
import * as crypto from 'crypto';

@injectable()
export class CutucarAnaoService {
    async cutucarAnao(interaction: CommandInteraction) {
        const user = interaction.member?.user;
        const radNum = (): integer => Math.floor(Math.random()*100);
        try {
            const choose = (arr: readonly string[]): string => {
                if (arr.length === 0) {
                    throw new Error("O array está vazio e não é possível escolher um elemento.");
                }
                return arr[crypto.randomInt(0, arr.length)]!; // Corrigido
            };

            const channel = interaction.channel as TextChannel;

            var message: string[] = [
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

            if(Math.floor(Math.random() * 100) + 1 <= 100)
            {
                switch(user?.id)
                {
                    case "681082000291135490":
                        message = [
                            "Lisa, vai cutucar o cu do dimitre",
                            "**Zanker Cutucou de volta**",
                            "Tomar no cu Lisabela",
                            "Se não for para ir beber, não enche o saco"
                        ]
                    break;
                    case "517071325819305995":
                            message = [
                                "Porra luan, me deixa em paz carai",
                                "Chatão tu em"
                            ]
                        break;
                    case "887428623844397126":
                        message = [
                            "O anão **PUTO** te cutucou agressivamente de volta "
                        ]
                        break;
                    case "316023621367889920":
                        message = ["Chato para caralho, mas funciono"]
                        break;
                }
                    
            }

            await webhook.send({
                content: choose(message),
            });
    

            await webhook.delete();
        } catch (error) {
            console.error('Erro ao cutucar o anão: ', error);
            await interaction.reply('**O anão está puto e não te responde**');
        }
    }
}