/** Dependencies Imports */
import * as bcrypt from 'bcrypt-nodejs';
import * as express from 'express';

/** Interfaces Imports */
import IController from '../Interfaces/IController';
import IRoute from '../Interfaces/IRoute';

/** Entities Imports */
import User, { IUser } from '../Entities/User';

/** Middlewares Imports */
import AuthMiddleware from '../Middlewares/AuthMiddleware';

export default class UserController implements IController {

    public controllerPath: string = '/users';

    public routes: IRoute[] = [
        { method: 'GET', path: '/', callable: this.getAll, middlewares: [AuthMiddleware] },
        { method: 'GET', path: '/:id', callable: this.getById, middlewares: [AuthMiddleware] },
        { method: 'POST', path: '/', callable: this.create, middlewares: [AuthMiddleware] },
        { method: 'POST', path: '/:id', callable: this.updateById, middlewares: [AuthMiddleware] },
        { method: 'DELETE', path: '/:id', callable: this.removeById, middlewares: [AuthMiddleware] }
    ];

    public getRoutes(): IRoute[] {
        return this.routes;
    }

    public getAll(req: express.Request, res: express.Response): void {
        User.find({})
            .populate('role')
            .exec((err: any, users: IUser[]) => {
                if (err) {
                    res.status(500).send({ success: false, message: 'Internal server error.' });
                } else {
                    res.status(200).send({ success: true, users });
                }
            });
    }

    public getById(req: express.Request, res: express.Response): void {
        User.findById(req.params.id)
            .populate('role')
            .exec((err: any, user: IUser) => {
                if (err) {
                    res.status(500).send({ success: false, message: 'Internal server error.' });
                } else {
                    if (!user) {
                        res.status(404).send({ success: false, message: 'User not found.' });
                    } else {
                        res.status(200).send({ success: true, user });
                    }
                }
            });
    }

    public create(req: express.Request, res: express.Response): void {
        if (!(req.body.password.first && req.body.password.second)) {
            res.status(400).send({ success: false, message: 'Both Password and Password Repeat fields are required.' });
        } else {
            if (req.body.password.first !== req.body.password.second) {
                res.status(400).send({
                    success: false,
                    message: 'Password and Password Repeat fields are not equals.'
                });
            } else {
                req.body.password = bcrypt.hashSync(req.body.password.first);
            }
        }
        User.create(req.body, (errBefore: any, userBefore: IUser) => {
            if (errBefore) {
                res.status(400).send({ success: false, message: 'An error occured.', error: errBefore });
            } else {
                User.findById(userBefore)
                    .populate('role')
                    .exec((err: any, user: IUser) => {
                        if (err) {
                            res.status(500).send({ success: false, message: 'Internal server error.' });
                        } else {
                            res.status(201).send({ success: true, user });
                        }
                    });
            }
        });
    }

    public updateById(req: express.Request, res: express.Response): void {
        delete req.body.password;
        User.findByIdAndUpdate(req.params.id, req.body)
            .populate('role')
            .exec((err: any, user: IUser) => {
                if (err) {
                    res.status(400).send({ success: false, message: 'An error occured.', error: err });
                } else {
                    res.status(200).send({ success: true, user });
                }
            });
    }

    public removeById(req: express.Request, res: express.Response): void {
        User.findByIdAndRemove(req.params.id, (err: any) => {
            if (err) {
                res.status(500).send({ success: false, message: 'Internal server error.' });
            } else {
                res.status(204).send({ success: true, message: 'User successfully removed.' });
            }
        });
    }

}
