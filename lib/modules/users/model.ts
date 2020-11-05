export interface IUser
{
    _id?: String;
    tenant: String;
    client_id: String;
    connection: String;
    email: String;
    password: String;
    username: String;
    request_language: String;
    lobby_id?: String;
}
