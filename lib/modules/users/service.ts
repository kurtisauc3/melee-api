import { IUser } from './model';
import users from './schema';

export default class UserService
{
    public updateUser(query, value): Promise<IUser>
    {
        return users.updateOne(query, value);
    }

    public filterUser(query): Promise<IUser>
    {
        return users.findOne(query);
    }

    public filterUsers(query): Promise<IUser[]>
    {
        return users.find(query);
    }
}
