/** Dependencies Imports */
import * as express from 'express';

/** Interfaces Imports */
import IController from '../Interfaces/IController';
import IRoute from '../Interfaces/IRoute';

/** Entities Imports */
import Role, { IRole } from '../Entities/Role';

export default class RoleController implements IController {

    public controllerPath: string = '/roles';

    private routes: IRoute[] = [
        { method: 'GET', path: '/', callable: this.getAll },
        { method: 'GET', path: '/:id', callable: this.getById },
        { method: 'POST', path: '/', callable: this.create },
        { method: 'POST', path: '/:id', callable: this.updateById },
        { method: 'DELETE', path: '/:id', callable: this.removeById }
    ];

    public getRoutes(): IRoute[] {
        return this.routes;
    }

    private getAll(req: express.Request, res: express.Response): void {
        Role.find({}, (err: any, roles: IRole[]) => {
            if (err) {
                res.status(500).send({ success: false, message: 'Internal server error.' });
            } else {
                res.status(200).send({ success: true, roles });
            }
        });
    }

    private getById(req: express.Request, res: express.Response): void {
        Role.findById(req.params.id, (err: any, role: IRole) => {
            if (err) {
                res.status(500).send({ success: false, message: 'Internal server error.' });
            } else {
                if (!role) {
                    res.status(404).send({ success: false, message: 'Role not found.' });
                } else {
                    res.status(200).send({ success: true, role });
                }
            }
        });
    }

    private create(req: express.Request, res: express.Response): void {
        Role.create(req.body, (err: any, role: IRole) => {
            if (err) {
                res.status(400).send({ success: false, message: 'An error occured.', error: err });
            } else {
                res.status(201).send({ success: true, role });
            }
        });
    }

    private updateById(req: express.Request, res: express.Response): void {
        Role.findByIdAndUpdate(
            req.params.id, req.body,
            { new: true },
            (err: any, role: IRole | null) => {
                if (err) {
                    res.status(400).send({ success: false, message: 'An error occured.', error: err });
                } else {
                    res.status(200).send({ success: true, role });
                }
            }
        );
    }

    private removeById(req: express.Request, res: express.Response): void {
        Role.findByIdAndRemove(req.params.id, (err: any) => {
            if (err) {
                res.status(500).send({ success: false, message: 'Internal server error.' });
            } else {
                res.status(204).send({ success: true, message: 'Role successfully removed.' });
            }
        });
    }

}
