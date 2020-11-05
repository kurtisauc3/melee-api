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
