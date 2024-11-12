import { ButtonInteraction, CacheType, CommandInteraction } from 'discord.js';
import type { IInteraction } from '../type.js';
import { injectable } from 'tsyringe';
import { request, Response} from 'undici'
import { INewCharacterProps, IDeleteCharacterProps, IValidateCharacterProps } from '../interfaces/index.js';

@injectable()
export class ApiService {
    interaction: IInteraction
    url: string
    constructor(interaction: IInteraction) {
        this.interaction = interaction
        this.url = 'localhost:5101'
    }

    async newCharacterResponse(data: INewCharacterProps) {
        try {
            const response = await request(`http://${this.url}/character/newcharacter`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            const responseData = await response.body.json()
            console.log(responseData)
            return responseData
        } catch (error) {
            console.error('Erro na requisição', error)
        }
    }

    async deleteCharacterResponse(data: IDeleteCharacterProps) {
        try {
            const response = await request(`http://${this.url}/character/deletecharacter`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            const responseData = await response.body.json()
            console.log(responseData)
            return responseData
        } catch (error) {
            console.error('Erro na requisição', error)
            await this.interaction.deferReply()
            await this.interaction.followUp("‎ ")
            await this.interaction.deleteReply()
            await this.interaction.followUp({
                content: "Link informado não encontrado!",
                ephemeral: true
            })
        }
    }

    async validateCharacterResponse(data: IValidateCharacterProps) {
        try {
            const response = await request(`http://${this.url}/character/validatecharacter`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            const responseData = await response.body.json()
            console.log(responseData)
            return responseData
        } catch (error) {
            console.error('Erro na requisição', error)
            await this.interaction.deferReply()
            await this.interaction.followUp("‎ ")
            await this.interaction.deleteReply()
            await this.interaction.followUp({
                content: "Link informado não encontrado!",
                ephemeral: true
            })
        }
    }
}
