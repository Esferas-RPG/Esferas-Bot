import { ButtonInteraction, CacheType, CommandInteraction } from 'discord.js';
import { IAPIData } from 'src/interfaces/IAPIData';
import { injectable } from 'tsyringe';
import {request, Response} from 'undici'

type IInteraction = CommandInteraction | ButtonInteraction

interface SuccessRequest {
    url: string
}

interface ErrorRequest {
    error: string
}

@injectable()
export class ApiService {
    interaction: IInteraction
    data: IAPIData
    constructor(interaction: IInteraction, data: IAPIData) {
        this.interaction = interaction
        this.data = data
    }

    async response() {
        try {
            const response = await request('http://localhost:5101/character/newcharacter', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    playerId: this.data.playerId,
                    newCharacterName: this.data.newCharacterName
                })
            })

            const responseData = await response.body.json()
            console.log(responseData)
            return responseData
        } catch (error) {
            console.error('Erro na requisição', error)
        }
    }
}
