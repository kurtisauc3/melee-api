export enum response_status_codes {
    success = 200,
    bad_request = 400,
    internal_server_error = 500,
    not_implemented = 501
}
export class DeleteResult
{
    acknowledged: boolean;
    deletedCount: number;
}
export enum GameFormat
{
    SINGLES = 1,
    DOUBLES = 2
}
export enum GameType
{
    QUICKPLAY = 1,
    CUSTOM = 2,
    RANKED = 3
}
export enum SocketEvent
{
    connect = 'connect',
    disconnect = 'disconnect',
    user_updated = 'user_updated',
    lobby_updated = 'lobby_updated'
}
