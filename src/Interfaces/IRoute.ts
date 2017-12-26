/** Dependencies Imports */
import * as express from 'express';

export default interface IRoute {
    method: string;
    path: string;
    callable: (req: express.Request, res: express.Response) => void;
    middlewares?: Array<(req: express.Request, res: express.Response, next: express.NextFunction) => void>;
}
