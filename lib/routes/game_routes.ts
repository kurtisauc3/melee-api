import { Application, Request, Response } from 'express';
import { GameController } from '../controllers/gameController';

export class GameRoutes {

    private game_controller: GameController = new GameController();

    public route(app: Application) {

        app.get('/api/game', (req: Request, res: Response) => {
            this.game_controller.get_games(req, res);
        });

        app.get('/api/game/:id', (req: Request, res: Response) => {
            this.game_controller.get_game(req, res);
        });

    }
}
