/** Dependencies Imports */
import * as diskinfo from 'diskinfo';
import * as express from 'express';
import * as os from 'os';

/** Interfaces Imports */
import IController from '../Interfaces/IController';
import IRoute from '../Interfaces/IRoute';

/** Middlewares Imports */
import AuthMiddleware from '../Middlewares/AuthMiddleware';

export default class SystemController implements IController {

    public controllerPath: string = '/system';

    private routes: IRoute[] = [
        { method: 'GET', path: '/common', callable: this.getCommon, middlewares: [AuthMiddleware] },
        { method: 'GET', path: '/cpus', callable: this.getCpus, middlewares: [AuthMiddleware] },
        { method: 'GET', path: '/disks', callable: this.getDisks, middlewares: [AuthMiddleware] },
        { method: 'GET', path: '/networks', callable: this.getNetworks, middlewares: [AuthMiddleware] }
    ];

    public getRoutes(): IRoute[] {
        return this.routes;
    }

    private getCommon(req: express.Request, res: express.Response): void {
        const arch = os.arch();
        const hostname = os.hostname();
        const platform = os.platform();
        const release = os.release();
        const type = os.type();
        const uptime = Math.floor(os.uptime());
        res.status(200).send({
            success: true,
            arch,
            hostname,
            platform,
            release,
            type,
            uptime
        });
    }

    private getCpus(req: express.Request, res: express.Response): void {
        const cpus = os.cpus();
        res.status(200).send({
            success: true,
            cpus
        });
    }

    private getDisks(req: express.Request, res: express.Response): void {
        diskinfo.getDrives((err: any, disks: any[]) => {
            res.status(200).send({
                success: true,
                disks
            });
        });
    }

    private getNetworks(req: express.Request, res: express.Response): void {
        const networks = os.networkInterfaces();
        res.status(200).send({
            success: true,
            networks
        });
    }

}
