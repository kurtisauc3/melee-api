import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, failureResponse, notImplementedError } from '../modules/common/service';
import { IUser } from '../modules/users/model';
import UserService from '../modules/users/service';

export class UserController
{
    private user_service: UserService = new UserService();

    public async get_user(req: Request, res: Response)
    {
        try
        {
            const data = await this.user_service.filterUser({ _id: req.params.id });
            successResponse('get_user_success', data, res);
        }
        catch (error)
        {
            failureResponse(error.toString(), null, res);
        }
    }

}
