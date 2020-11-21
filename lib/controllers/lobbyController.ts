import { Request, Response } from 'express';
import { success_response, failure_response, getUserIdFromReq, not_implemented_error } from '../modules/common/service';
import { ILobby } from '../modules/lobby/model';
import UserService from '../modules/users/service';
import LobbyService from '../modules/lobby/service';
import { io } from '../server';
import { SocketEvent } from '../modules/common/model';
import { IUser } from 'modules/users/model';

export class LobbyController
{
    private user_service: UserService = new UserService();
    private lobby_service: LobbyService = new LobbyService();

    public async get_lobby(req: Request, res: Response)
    {
        try
        {
            const lobby_data = await this.lobby_service.filter_lobby({ _id: req.params.id });
            success_response('get_game_success', lobby_data, res);
        }
        catch (error)
        {
            failure_response(error.toString(), null, res);
        }
    }

    public async get_lobby_users(req: Request, res: Response)
    {
        try
        {
            const users_data = await this.user_service.filter_users({ lobby_id: req.params.id });
            success_response('get_lobby_users_success', users_data, res);
        }
        catch (error)
        {
            failure_response(error.toString(), null, res);
        }
    }

    public async create_and_join_lobby(req: Request, res: Response)
    {
        try
        {
            const user_id = getUserIdFromReq(req);
            const user_data = await this.user_service.filter_user({ _id: user_id });
            let lobby_data: ILobby = null;
            if (user_data.lobby_id)
            {
                // check to make sure they are party leader
                lobby_data = await this.lobby_service.update_lobby({ _id: user_data.lobby_id }, { $set: { game_id: req.body.game_id } });
            }
            else
            {
                lobby_data = await this.lobby_service.create_lobby({ game_id: req.body.game_id, owner_id: user_id });
            }
            await this.lobby_updated(lobby_data._id);
            await this.user_service.update_user({ _id: user_id }, { $set: { lobby_id: lobby_data._id } });
            this.user_updated(user_id);
            success_response('create_and_join_lobby_success', lobby_data, res);
        }
        catch (error)
        {
            failure_response(error.toString(), null, res);
        }
    }

    public async join_lobby(req: Request, res: Response)
    {
        try
        {
            const user_id = getUserIdFromReq(req);
            const lobby_data = await this.lobby_service.filter_lobby({ _id: req.params.id });
            const user_data = await this.user_service.update_user({ _id: user_id }, { $set: { lobby_id: lobby_data._id } });
            this.user_updated(user_id);
            await this.lobby_updated(lobby_data._id);
            success_response('join_lobby_success', user_data, res);
        }
        catch (error)
        {
            failure_response(error.toString(), null, res);
        }
    }

    public async update_lobby(req: Request, res: Response)
    {
        not_implemented_error(res);
    }

    public async leave_lobby(req: Request, res: Response)
    {
        try
        {
            const user_id = getUserIdFromReq(req);
            const user_data = await this.user_service.filter_user({ _id: user_id });
            const lobby_data = await this.lobby_service.filter_lobby({ _id: user_data.lobby_id });
            const updated_user_data = await this.user_service.update_user({ _id: user_id }, { $set: { lobby_id: null } });
            this.user_updated(user_id);
            if (lobby_data.owner_id === user_id)
            {
                const next_user_data = await this.user_service.filter_user({ lobby_id: lobby_data._id });
                if (next_user_data)
                {
                    await this.lobby_service.update_lobby({ _id: lobby_data._id }, { $set: { owner_id: next_user_data._id } });
                }
                else
                {
                    await this.lobby_service.delete_lobby({ _id: lobby_data._id });
                }
            }
            await this.lobby_updated(lobby_data._id);
            success_response('leave_lobby_success', updated_user_data, res);
        }
        catch (error)
        {
            failure_response(error.toString(), null, res);
        }
    }

    private user_updated(user_id: String)
    {
        io.to(user_id.toString()).emit(SocketEvent.user_updated, user_id);
    }

    private async lobby_updated(lobby_id: String)
    {
        const users_data = await this.user_service.filter_users({ lobby_id: lobby_id });
        for(let user of users_data)
        {
            io.to(user._id.toString()).emit(SocketEvent.lobby_updated, lobby_id);
        }
    }
}
