import IRoute from './IRoute';

export default interface IController {
    controllerPath: string;
    getRoutes(): IRoute[];
}
