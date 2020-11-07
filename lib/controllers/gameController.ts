import { Request, Response } from 'express';
import { insufficient_parameters, mongo_error, success_response, failure_response } from '../modules/common/service';
import { IGame } from '../modules/game/model';
import GameService from '../modules/game/service';

export class GameController
{
    private game_service: GameService = new GameService();

    public async get_game(req: Request, res: Response)
    {
        try
        {
            const data = await this.game_service.filter_game({ _id: req.params.id });
            success_response('get_game_success', data, res);
        }
        catch (error)
        {
            failure_response(error.toString(), null, res);
        }
    }

    public async get_games(req: Request, res: Response)
    {
        try
        {
            const data = await this.game_service.all_games();
            success_response('get_games_success', data, res);
        }
        catch (error)
        {
            failure_response(error.toString(), null, res);
        }
    }
}
