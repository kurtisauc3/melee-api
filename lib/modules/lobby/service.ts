import { DeleteResult } from 'modules/common/model';
import { ILobby } from './model';
import lobby from './schema';

export default class LobbyService
{
    public createLobby(lobby_params: ILobby): Promise<ILobby>
    {
        const _session = new lobby(lobby_params);
        return _session.save();
    }

    public filterLobby(query): Promise<ILobby>
    {
        return lobby.findOne(query);
    }

    public updateLobby(query, value): Promise<ILobby>
    {
        return lobby.findOneAndUpdate(query, value);
    }

    public deleteLobby(query): Promise<DeleteResult>
    {
        return lobby.deleteOne(query);
    }
}
