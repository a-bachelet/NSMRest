/** Interfaces Imports */
import IController from '../Interfaces/IController';

/** Classes Imports */
import AuthController from '../Controllers/AuthController';
import DefautltController from '../Controllers/DefaultController';
import RoleController from '../Controllers/RoleController';
import UserController from '../Controllers/UserController';

export const CONTROLLERS: IController[] = [
    new AuthController(),
    new DefautltController(),
    new RoleController(),
    new UserController()
];
