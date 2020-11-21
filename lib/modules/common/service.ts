import { Response, Request } from 'express';
import { ResponseStatusCodes } from './model';
import { exceptions } from './exceptions';
import * as decode from 'jwt-decode';
import * as env from '../../../env-variables.json';
import e = require('express');

export function success_response(message: string, DATA: any, res: Response) {
    clear_password_property(DATA);
    res.status(ResponseStatusCodes.success).json({
        SUCCESS: true,
        MESSAGE: message,
        DATA
    });
}

export function failure_response(message: string, DATA: any, res: Response) {
    res.status(ResponseStatusCodes.success).json({
        SUCCESS: false,
        MESSAGE: message,
        DATA
    });
}

export function insufficient_parameters(res: Response) {
    res.status(ResponseStatusCodes.bad_request).json({
        SUCCESS: false,
        MESSAGE: 'insufficient_parameters',
        DATA: {}
    });
}

export function mongo_error(err: any, res: Response) {
    res.status(ResponseStatusCodes.internal_server_error).json({
        SUCCESS: false,
        MESSAGE: 'mongo_error',
        DATA: err
    });
}

export function not_implemented_error(res: Response) {
    res.status(ResponseStatusCodes.not_implemented).json({
        SUCCESS: false,
        MESSAGE: 'not_implemented_error',
        DATA: null
    });
}

export function getUserIdFromReq(req: Request): String
{
    if (env.bypassAuthentication) {
        let bypass_id: string = env.bypassAccountId;
        if (bypass_id == undefined) { throw exceptions.AUTH_BYPASS_ERROR; }
        return bypass_id;
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

export function clear_password_property(data)
{
    const password_key = 'password';
    if (Array.isArray(data)) data.forEach(d => clear_password_property(d))
    else if (typeof data === 'object')
    {
        for(let key in data)
        {
            if (Array.isArray(data[key])) data[key].forEach(d => clear_password_property(d))
            else if (key === password_key) data[key] = null;
        }
    }
}
