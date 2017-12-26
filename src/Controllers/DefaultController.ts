/** Dependencies Imports */
import * as express from 'express';

/** Interfaces Imports */
import IController from '../Interfaces/IController';
import IRoute from '../Interfaces/IRoute';

export default class DefaultController implements IController {

    public controllerPath: string = '/';

    private routes: IRoute[] = [
        { method: 'GET', path: '/', callable: this.get.bind(this) }
    ];

    public getRoutes(): IRoute[] {
        return this.routes;
    }

    private get(req: express.Request, res: express.Response) {
        res.status(200).send({
            success: true,
            message: 'Welcome to NodeServerMonitor API !'
        });
    }

}
