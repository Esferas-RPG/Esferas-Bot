import express, { Express, Request, Response } from 'express';
import 'dotenv/config';

import { router as Status } from './routes/index.js';

class App {
	app: Express;
	constructor() {
		this.app = express();
		this.middlewares();
		this.routes();
	}

	middlewares() {
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(express.json());
	}

	routes() {
		this.app.use('/api', Status);
	}
}

export const app = new App().app;
