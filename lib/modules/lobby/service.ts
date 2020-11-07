import { DeleteResult } from 'modules/common/model';
import { ILobby } from './model';
import lobby from './schema';

export default class LobbyService
{
    public create_lobby(lobby_params: ILobby): Promise<ILobby>
    {
        const _session = new lobby(lobby_params);
        return _session.save();
    }

    public filter_lobby(query): Promise<ILobby>
    {
        return lobby.findOne(query);
    }

    public update_lobby(query, value): Promise<ILobby>
    {
        return lobby.findOneAndUpdate(query, value, {new: true});
    }

    public delete_lobby(query): Promise<DeleteResult>
    {
        return lobby.deleteOne(query);
    }

}
