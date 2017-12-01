/** Classes Imports */
import Console from '../Console/Console';

/** Dependencies Imports */
import * as express from 'express';

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
        this._apiRouter = express.Router();
        this._webRouter = express.Router();
        this._express.use('/api', this._apiRouter);
        this._express.use('/web', this._webRouter);
    }

    private initControllers(): void {
        this._console.action('|      -> Controllers initialization...');
        this._console.action('|      -> Controllers initialized !');
    }

    private initMiddlewares(): void {
        this._console.action('|      -> Middlewares initialization...');
        this._console.action('|      -> Middlewares initialized !');
    }

    private init(): void {
        this._console.info('| (i) Initialization started...');
        this.initRouters();
        this.initControllers();
        this.initMiddlewares();
        this._console.success('| (s) Server successfully initialized !' + '\n');
    }

}
