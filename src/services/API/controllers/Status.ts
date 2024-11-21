import type { Request, Response } from 'express';

class StatusResController {
	index(req: Request, res: Response) {
		res.json({
			status: 'ok',
			statusCode: res.statusCode,
		});
	}
}

export const StatusController = new StatusResController();
