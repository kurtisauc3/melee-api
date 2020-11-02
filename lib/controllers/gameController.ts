import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, failureResponse } from '../modules/common/service';
import { IGame } from '../modules/game/model';
import GameService from '../modules/game/service';

export class GameController
{
    private game_service: GameService = new GameService();

    public get_game(req: Request, res: Response)
    {
        if (req.params.id)
        {
            const game_filter = { _id: req.params.id };
            this.game_service.getGameMode(game_filter, (err: any, game_data: IGame) =>
            {
                if (err)
                {
                    mongoError(err, res);
                }
                else
                {
                    successResponse('get game successfull', game_data, res);
                }
            });
        }
        else
        {
            insufficientParameters(res);
        }
    }

    public get_games(req: Request, res: Response)
    {
        const game_filter = {};
        this.game_service.getGameModes(game_filter, (err: any, game_data: IGame[]) =>
        {
            if (err)
            {
                mongoError(err, res);
            }
            else
            {
                successResponse('get games successfull', game_data, res);
            }
        });
    }
}
