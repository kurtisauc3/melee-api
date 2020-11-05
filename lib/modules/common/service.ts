import { Response, Request } from 'express';
import { response_status_codes } from './model';
import * as decode from 'jwt-decode';

export function successResponse(message: string, DATA: any, res: Response) {
    res.status(response_status_codes.success).json({
        SUCCESS: true,
        MESSAGE: message,
        DATA
    });
}

export function failureResponse(message: string, DATA: any, res: Response) {
    res.status(response_status_codes.success).json({
        SUCCESS: false,
        MESSAGE: message,
        DATA
    });
}

export function insufficientParameters(res: Response) {
    res.status(response_status_codes.bad_request).json({
        SUCCESS: false,
        MESSAGE: 'Insufficient parameters',
        DATA: {}
    });
}

export function mongoError(err: any, res: Response) {
    res.status(response_status_codes.internal_server_error).json({
        SUCCESS: false,
        MESSAGE: 'MongoDB error',
        DATA: err
    });
}

export function notImplementedError(res: Response) {
    res.status(response_status_codes.not_implemented).json({
        SUCCESS: false,
        MESSAGE: 'Not Implimented error',
        DATA: null
    });
}

export function getUserIdFromReq(req: Request): String
{
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
    {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = decode(token);
        if (decoded?.sub.split('|')[0] === 'auth0')
        {
            return decoded.sub.split('|')[1];
        }
    }
    return null;
}
