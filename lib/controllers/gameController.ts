import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, failureResponse } from '../modules/common/service';
import { IGame } from '../modules/game/model';
import GameService from '../modules/game/service';

export class GameController
{
    private game_service: GameService = new GameService();

    public async get_game(req: Request, res: Response)
    {
        try
        {
            const data = await this.game_service.filterGame({ _id: req.params.id });
            successResponse('get_game_success', data, res);
        }
        catch (error)
        {
            failureResponse(error.toString(), null, res);
        }
    }

    public async get_games(req: Request, res: Response)
    {
        try
        {
            const data = await this.game_service.allGames();
            successResponse('get_games_success', data, res);
        }
        catch (error)
        {
            failureResponse(error.toString(), null, res);
        }
    }
}
