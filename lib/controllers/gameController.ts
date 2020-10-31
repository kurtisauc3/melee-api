import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, failureResponse } from '../modules/common/service';
import { IGameMode } from '../modules/game/model';

export class GameController {

    public get_game_modes(req: Request, res: Response) {
        const data: IGameMode[] = [
            {
                name: "1v1 Unranked",
                _id: 1
            },
            {
                name: "1v1 Ranked",
                _id: 2
            },
            {
                name: "2v2 Unranked",
                _id: 3
            },
            {
                name: "2v2 Ranked",
                _id: 4
            }
        ]
        successResponse('Success', data, res);
    }
}
