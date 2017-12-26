/** Classes Imports */
import Console from '../Console/Console';
import Database from '../Database/Database';

/** Dependencies Imports */
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as helmet from 'helmet';
import * as mongodb from 'mongodb';
import * as morgan from 'morgan';

/** Constants Imports */
import { CONTROLLERS } from '../Constants/CONTROLLERS';

/** Interfaces */
import IController from '../Interfaces/IController';
import IRoute from '../Interfaces/IRoute';

export default class HttpServer {

    private _console: Console;

    private _database: Database;
    private _databaseUrl: string;

    private _express: express.Application;
    private _expressPort: number;

    private _apiRouter: express.Router;
    private _webRouter: express.Router;

    constructor(databaseUrl: string, expressPort: number) {
        this._console = new Console();
        this._databaseUrl = databaseUrl;
        this._database = new Database(this._databaseUrl);
        this._express = express();
        this._expressPort = expressPort;
    }

    public async start(): Promise<any> {
        this._console.success('| (s) Welcome On NodeServerMonitor !' + '\n');
        await this.init();
        this._express.listen(this._expressPort, () => {
            this._console.info('| (i) Server is listening on port -> ' + this._expressPort);
        });
    }

    private initDatabase(): Promise<null> {
        return new Promise((resolve) => {
            this._console.action('|      -> Database initialization...');
            this._database.connect().then(() => {
                this._console.action('|      -> Database initialized !' + '\n');
                resolve(null);
            }).catch((err: mongodb.MongoError) => {
                this._console.error('|      -> ERROR : ' + err.message);
                process.exit(0);
            });
        });
    }

    private initRouters(): void {
        this._console.action('|      -> Routers initialization...');
        this._apiRouter = express.Router();
        this._webRouter = express.Router();
        this._express.use('/api', this._apiRouter);
        this._console.success('|            -> API Router loaded !');
        this._express.use('/web', this._webRouter);
        this._console.success('|            -> WEB Router loaded !');
        this._console.action('|      -> Routers initialized !' + '\n');
    }

    private initControllers(): void {
        this._console.action('|      -> Controllers initialization...');
        CONTROLLERS.forEach((controller: IController) => {
            controller.getRoutes().forEach((route: IRoute) => {
                this.addRoute(controller.controllerPath, route);
            });
            this._console.success('|         -> ' + controller.constructor.name + ' successfully loaded !');
        });
        this._console.action('|      -> Controllers initialized !' + '\n');
    }

    private initMiddlewares(): void {
        this._console.action('|      -> Middlewares initialization...');
        this._express.use(bodyParser.urlencoded({ extended: true }));
        this._express.use(bodyParser.json());
        this._console.success('|         -> Body Parser Middleware successfully loaded !');
        this._express.use(helmet());
        this._console.success('|         -> Helmet Middleware succesfully loaded !');
        this._express.use(morgan('dev'));
        this._console.success('|         -> Morgan Middleware succesfully loaded !');
        this._console.action('|      -> Middlewares initialized !' + '\n');
    }

    private async init(): Promise<any> {
        this._console.info('| (i) Initialization started...' + '\n');
        await this.initDatabase();
        this.initMiddlewares();
        this.initRouters();
        this.initControllers();
        this._console.success('| (s) Server successfully initialized !' + '\n');
    }

    private addRoute(path: string, route: IRoute): void {
        this._express[route.method.toLowerCase()](
            path + route.path,
            route.middlewares ? [...route.middlewares, route.callable] : route.callable
        );
    }

}
