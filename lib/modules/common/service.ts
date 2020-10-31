import { Response } from 'express';
import { response_status_codes } from './model';

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
