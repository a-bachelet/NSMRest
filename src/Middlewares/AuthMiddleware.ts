/** Dependencies Imports */
import * as express from 'express';
import * as jwt from 'jsonwebtoken';

/** Entities Imports */
import User, {IUser} from '../Entities/User';

const AuthMiddleware: (req: express.Request, res: express.Response, nex: express.NextFunction) => void =
    (req: express.Request, res: express.Response, next: express.NextFunction): void => {
        if (!req.headers['x-access-token']) {
            res.status(401).send({ succes: false, message: 'Please login before calling this url.' });
        } else {
            User.findOne({ loginToken: req.headers['x-access-token'] }, (err: any, user: IUser) => {
                if (err) {
                    res.status(500).send({ success: false, message: 'Internal server error.' });
                } else {
                    if (!user) {
                        res.status(401).send({ success: false, message: 'Invalid token.' });
                    } else {
                        jwt.verify(
                            user.loginToken || '',
                            process.env.JWT_SECRET || 'ILOVESECRETAPIS !',
                            (errToken: any) => {
                                if (errToken) {
                                    res.status(401).send({ success: false, message: 'Invalid token.' });
                                } else {
                                    if (!user.validUntil) {
                                        res.status(401).send({ success: false, message: 'Expired token.' });
                                    } else {
                                        const validUntimTimestamp: number = user.validUntil.getTime();
                                        const newTimestamp: number = (new Date()).getTime();
                                        if (validUntimTimestamp < newTimestamp) {
                                            res.status(401).send({ success: false, message: 'Expired token.' });
                                        } else {
                                            User.update(
                                                user,
                                                { validUntil: new Date(newTimestamp + 3600000) },
                                                (errUpdate: any, userUpdate: IUser) => {
                                                    if (errUpdate) {
                                                        res.status(500).send({
                                                            success: false,
                                                            message: 'Internal server error.'
                                                        });
                                                    } else {
                                                        next();
                                                    }
                                                }
                                            );
                                        }
                                    }
                                }
                            }
                        );
                    }
                }
            });
        }
    };

export default AuthMiddleware;
