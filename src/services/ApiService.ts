import 'reflect-metadata';

import { ButtonInteraction, CacheType, CommandInteraction } from 'discord.js';
import type { IInteraction } from '../type.js';
import { injectable, singleton } from 'tsyringe';
import { request, Response } from 'undici';
import {
	INewCharacterProps,
	IDeleteCharacterProps,
	IValidateCharacterProps,
	IMoveCharacterProps,
} from '../interfaces/index.js';
import ErrorHandler from './Errors/ErrorHandle.js';
import 'dotenv/config';

@injectable()
export class ApiService {
	url: string | undefined;
	constructor() {
		this.url = process.env.API_URL;
	}

	async newCharacterResponse(data: INewCharacterProps) {
		try {
			const response = await request(
				`${this.url}/character/newcharacter`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(data),
				}
			);

			const responseData = await response.body.json();
			console.log(responseData);
			return responseData;
		} catch (error) {
			return ErrorHandler(error);
		}
	}

	async deleteCharacterResponse(data: IDeleteCharacterProps) {
		try {
			const response = await request(
				`${this.url}/character/deletecharacter`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(data),
				}
			);

			const responseData = await response.body.json();
			console.log(responseData);
			return responseData;
		} catch (error) {
			return ErrorHandler(error);
		}
	}

	async moveCharacterResponse(data: IMoveCharacterProps) {
		try {
			const response = await request(`${this.url}/character/movefile`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			const responseData = await response.body.json();
			console.log(responseData);
			return responseData;
		} catch (error) {
			return ErrorHandler(error);
		}
	}

	async validateCharacterResponse(data: IValidateCharacterProps) {
		try {
			const response = await request(
				`${this.url}/character/validatecharacter`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(data),
				}
			);

			const responseData = await response.body.json();
			console.log(responseData);
			return responseData;
		} catch (error) {
			return ErrorHandler(error);
		}
	}
}
