import 'reflect-metadata';
import { injectable } from 'tsyringe';
import { request } from 'undici';
import { IAIData } from '../interfaces/index.js';
import 'dotenv/config';

@injectable()
export class AIService {
	url: string | undefined;
	token: string | undefined;
	constructor() {
		this.url = process.env.AI_API_URL;
		this.token = process.env.AI_TOKEN;
	}

	async sendWebhook(data: IAIData) {
		try {
			const response = await request(`${this.url}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${this.token}`,
				},
				body: JSON.stringify(data),
			});

			const responseData = await response.body.json();
			console.log(responseData);
			return responseData;
		} catch (error) {
			console.error(error);
		}
	}
}
