import { Response, Request } from 'express';
import { response_status_codes } from './model';
import { exceptions } from './exceptions';
import * as decode from 'jwt-decode';
import * as env from '../../../env-variables.json';

export function success_response(message: string, DATA: any, res: Response) {
    res.status(response_status_codes.success).json({
        SUCCESS: true,
        MESSAGE: message,
        DATA
    });
}

export function failure_response(message: string, DATA: any, res: Response) {
    res.status(response_status_codes.success).json({
        SUCCESS: false,
        MESSAGE: message,
        DATA
    });
}

export function insufficient_parameters(res: Response) {
    res.status(response_status_codes.bad_request).json({
        SUCCESS: false,
        MESSAGE: 'insufficient_parameters',
        DATA: {}
    });
}

export function mongo_error(err: any, res: Response) {
    res.status(response_status_codes.internal_server_error).json({
        SUCCESS: false,
        MESSAGE: 'mongo_error',
        DATA: err
    });
}

export function not_implemented_error(res: Response) {
    res.status(response_status_codes.not_implemented).json({
        SUCCESS: false,
        MESSAGE: 'not_implemented_error',
        DATA: null
    });
}

export function getUserIdFromReq(req: Request): String
{
    if (env.bypassAuthentication) {
        let bypassId: string = env.bypassAccountId;
        if (bypassId == undefined) { throw exceptions.AUTH_BYPASS_ERROR; }
        return bypassId;
    } else {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = decode(token);
            if (decoded?.sub.split('|')[0] === 'auth0') {
                return decoded.sub.split('|')[1];
            }
        }
        return null;
    }
}
