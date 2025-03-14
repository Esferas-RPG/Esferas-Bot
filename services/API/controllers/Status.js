class StatusResController {
    index(req, res) {
        res.json({
            status: 'ok',
            statusCode: res.statusCode,
        });
    }
}
export const StatusController = new StatusResController();
