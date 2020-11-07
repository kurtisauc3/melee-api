import { Application, Request, Response } from 'express';
import { LobbyController } from '../controllers/lobbyController';

export class LobbyRoutes {

    private lobby_controller: LobbyController = new LobbyController();

    public route(app: Application)
    {
        app.get('/api/lobby/:id', (req: Request, res: Response) => {
            this.lobby_controller.get_lobby(req, res);
        });

        app.get('/api/lobby/users/:id', (req: Request, res: Response) => {
            this.lobby_controller.get_lobby_users(req, res);
        });

        app.post('/api/lobby', (req: Request, res: Response) => {
            this.lobby_controller.create_and_join_lobby(req, res);
        });

        app.post('/api/lobby/join', (req: Request, res: Response) => {
            this.lobby_controller.join_lobby(req, res);
        });

        app.post('/api/lobby/update', (req: Request, res: Response) => {
            this.lobby_controller.update_lobby(req, res);
        });

        app.post('/api/lobby/leave', (req: Request, res: Response) => {
            this.lobby_controller.leave_lobby(req, res);
        });
    }
}
