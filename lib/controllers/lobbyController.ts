import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, failureResponse, getUserIdFromReq, notImplementedError } from '../modules/common/service';
import { ILobby } from '../modules/lobby/model';
import UserService from '../modules/users/service';
import LobbyService from '../modules/lobby/service';
import { io } from '../server';

export class LobbyController
{
    private user_service: UserService = new UserService();
    private lobby_service: LobbyService = new LobbyService();

    public async get_lobby(req: Request, res: Response)
    {
        try
        {
            const data = await this.lobby_service.filterLobby({ _id: req.params.id });
            successResponse('get_game_success', data, res);
        }
        catch (error)
        {
            failureResponse(error.toString(), null, res);
        }
    }

    public async create_and_join_lobby(req: Request, res: Response)
    {
        try
        {
            const user_id = getUserIdFromReq(req);
            const user_data = await this.user_service.filterUser({ _id: user_id });
            let data: ILobby = null;
            if (user_data.lobby_id)
            {
                data = await this.lobby_service.updateLobby({ _id: user_data.lobby_id }, { $set: { game_id: req.body.game_id } });
            }
            else
            {
                data = await this.lobby_service.createLobby({ game_id: req.body.game_id, owner_id: user_id });
            }
            await this.user_service.updateUser({ _id: user_id }, { $set: { lobby_id: data._id } });
            io.emit('user_updated', user_id);
            successResponse('create_and_join_lobby_success', data, res);
        }
        catch (error)
        {
            failureResponse(error.toString(), null, res);
        }
    }

    public async join_lobby(req: Request, res: Response)
    {
        try
        {
            const user_id = getUserIdFromReq(req);
            const lobby_data = await this.lobby_service.filterLobby({ _id: req.params.id });
            const user_data = await this.user_service.updateUser({ _id: user_id }, { $set: { lobby_id: lobby_data._id } });
            io.emit('user_updated', user_id);
            successResponse('join_lobby_success', user_data, res);
        }
        catch (error)
        {
            failureResponse(error.toString(), null, res);
        }
    }

    public async update_lobby(req: Request, res: Response)
    {
        notImplementedError(res);
    }

    public async leave_lobby(req: Request, res: Response)
    {
        try
        {
            const user_id = getUserIdFromReq(req);
            const user_data = await this.user_service.filterUser({ _id: user_id });
            const lobby_data = await this.lobby_service.filterLobby({ _id: user_data.lobby_id });
            const updated_user_data = await this.user_service.updateUser({ _id: user_id }, { $set: { lobby_id: null } });
            io.emit('user_updated', user_id);
            if (lobby_data.owner_id === user_id)
            {
                const next_user_data = await this.user_service.filterUser({ lobby_id: lobby_data._id });
                if (next_user_data)
                {
                    await this.lobby_service.updateLobby({ _id: lobby_data._id }, { $set: { owner_id: next_user_data._id } });
                }
                else
                {
                    await this.lobby_service.deleteLobby({ _id: lobby_data._id });
                }
            }
            successResponse('leave_lobby_success', updated_user_data, res);
        }
        catch (error)
        {
            failureResponse(error.toString(), null, res);
        }
    }
}
