/** Dependencies Imports */
import * as bcrypt from 'bcrypt-nodejs';
import * as express from 'express';
import * as jwt from 'jsonwebtoken';

/** Interfaces Imports */
import IController from '../Interfaces/IController';
import IRoute from '../Interfaces/IRoute';

/** Entities Imports */
import User, { IUser } from '../Entities/User';

export default class AuthController implements IController {

    public controllerPath: string = '/auth';

    private routes: IRoute[] = [
        { method: 'POST', path: '/login', callable: this.login },
        { method: 'GET', path: '/logout', callable: this.logout }
    ];

    public getRoutes(): IRoute[] {
        return this.routes;
    }

    public login(req: express.Request, res: express.Response): void {
        if (!req.body.email || !req.body.password) {
            res.status(400).send({ success: false, message: 'Both Email and Password fields are required.' });
        } else {
            User.findOne({ email: req.body.email }, (err: any, user: IUser) => {
                if (err) {
                    res.status(500).send({ success: false, message: 'Internal server error.' });
                } else {
                    if (!user) {
                        res.status(400).send({ success: false, message: 'Wrong Email or Password.' });
                    } else {
                        if (!bcrypt.compareSync(req.body.password, user.password || '')) {
                            res.status(400).send({ success: false, message: 'Wrong Email or Password' });
                        } else {
                            jwt.sign(
                                {},
                                process.env.JWT_SECRET || 'ILOVESECRETAPIS !',
                                (tokenErr: any, loginToken: string) => {
                                    if (tokenErr) {
                                        res.status(500).send({ success: false, message: 'Internal server error.' });
                                    } else {
                                        const validUntil: Date = new Date((new Date()).getTime() + 3600000);
                                        user.update({ loginToken, validUntil }).populate('role').exec(
                                            (errUpdate: any) => {
                                                if (errUpdate) {
                                                    res.status(500).send(
                                                        { success: false, message: 'Internal server error.' }
                                                    );
                                                } else {
                                                    user.loginToken = loginToken;
                                                    user.validUntil = validUntil;
                                                    res.status(200).send({ success: true, user });
                                                }
                                            }
                                        );
                                    }
                                }
                            );
                        }
                    }
                }
            });
        }
    }

    public logout(req: express.Request, res: express.Response): void {
        const loginToken = req.headers['x-access-token'];
        User.findOneAndUpdate(
            { loginToken },
            { loginToken: null, validUntil: null },
            {},
            (err: any, user: IUser | null) => {
                if (err) {
                    res.status(500).send({ success: false, message: 'Internal server error.' });
                } else {
                    res.status(204).send({ success: true, message: 'Successfull logout.' });
                }
            }
        );
    }

}
