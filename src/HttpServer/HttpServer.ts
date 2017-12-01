/** Classes Imports */
import Console from '../Console/Console';

/** Dependencies Imports */
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as helmet from 'helmet';
import * as morgan from 'morgan';

export default class HttpServer {

    private _console: Console;

    private _express: express.Application;
    private _expressPort: number;

    private _apiRouter: express.Router;
    private _webRouter: express.Router;

    constructor(expressPort: number) {
        this._console = new Console();
        this._express = express();
        this._expressPort = expressPort;
    }

    public start(): void {
        this._console.success('| (s) Welcome On NodeServerMonitor !' + '\n');
        this.init();
        this._express.listen(this._expressPort, () => {
            this._console.success('| (s) Server is listening on port -> ' + this._expressPort);
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

    private init(): void {
        this._console.info('| (i) Initialization started...' + '\n');
        this.initRouters();
        this.initControllers();
        this.initMiddlewares();
        this._console.success('| (s) Server successfully initialized !' + '\n');
    }

}
