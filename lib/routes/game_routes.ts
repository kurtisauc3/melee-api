import { Application, Request, Response } from 'express';
import { GameController } from '../controllers/gameController';

export class GameRoutes {

    private game_controller: GameController = new GameController();

    public route(app: Application) {

        app.get('/api/game/getGameModes', (req: Request, res: Response) => {
            this.game_controller.get_game_modes(req, res);
        });

    }
}
