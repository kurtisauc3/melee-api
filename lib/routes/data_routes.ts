import { Application, Request, Response } from 'express';
import { DataController } from '../controllers/dataController';

export class DataRoutes
{
    private data_controller: DataController = new DataController();

    public route(app: Application)
    {
        app.get('/api/data/all', (req: Request, res: Response) => {
            this.data_controller.get_data_all(req, res);
        });
    }
}
