/** Interfaces Imports */
import IController from '../Interfaces/IController';

/** Classes Imports */
import DefautltController from '../Controllers/DefaultController';
import RoleController from '../Controllers/RoleController';

export const CONTROLLERS: IController[] = [
    new DefautltController(),
    new RoleController()
];
