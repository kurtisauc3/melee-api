import { Request, Response } from 'express';
import { Game, GameFormat, GameType } from '../modules/common/model';
import { success_response, failure_response } from '../modules/common/service';

export class GameController
{
    public get_game(req: Request, res: Response)
    {
        try
        {
            const data = this.games.find(game => game._id === req.params.id);
            success_response('get_game_success', data, res);
        }
        catch (error)
        {
            failure_response(error.toString(), null, res);
        }
    }

    public get_games(req: Request, res: Response)
    {
        try
        {
            success_response('get_games_success', this.games, res);
        }
        catch (error)
        {
            failure_response(error.toString(), null, res);
        }
    }

    private get games(): Game[]
    {
        return [
            {
                _id: "quickplay_singles",
                format: GameFormat.SINGLES,
                type: GameType.QUICKPLAY,
                disabled: false
            },
            {
                _id: "custom_singles",
                format: GameFormat.SINGLES,
                type: GameType.CUSTOM,
                disabled: false
            },
            {
                _id: "ranked_singles",
                format: GameFormat.SINGLES,
                type: GameType.RANKED,
                disabled: false
            },
            {
                _id: "quickplay_doubles",
                format: GameFormat.DOUBLES,
                type: GameType.QUICKPLAY,
                disabled: true
            },
            {
                _id: "custom_doubles",
                format: GameFormat.DOUBLES,
                type: GameType.CUSTOM,
                disabled: true
            },
            {
                _id: "ranked_doubles",
                format: GameFormat.DOUBLES,
                type: GameType.RANKED,
                disabled: true
            },
        ];
    }
}
