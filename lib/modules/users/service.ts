import { IUser } from './model';
import users from './schema';

export default class UserService
{
    public update_user(query, value): Promise<IUser>
    {
        return users.findOneAndUpdate(query, value, {new: true});
    }

    public filter_user(query): Promise<IUser>
    {
        return users.findOne(query);
    }

    public filter_users(query): Promise<IUser[]>
    {
        return users.find(query);
    }
}
