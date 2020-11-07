import { Request, Response } from 'express';
import { success_response, failure_response } from '../modules/common/service';
import UserService from '../modules/users/service';

export class UserController
{
    private user_service: UserService = new UserService();

    public async get_user(req: Request, res: Response)
    {
        try
        {
            const data = await this.user_service.filter_user({ _id: req.params.id });
            success_response('get_user_success', data, res);
        }
        catch (error)
        {
            failure_response(error.toString(), null, res);
        }
    }

}
